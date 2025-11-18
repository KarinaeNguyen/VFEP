(() => {
  let cashFlowChartInstance = null;

  function applyStyles() {
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
      chartContainer.style.position = 'relative';
      chartContainer.style.width = '100%';
      chartContainer.style.maxWidth = '900px';
      chartContainer.style.margin = '0 auto 1.5rem';
      chartContainer.style.padding = '12px';
      chartContainer.style.boxSizing = 'border-box';
    }
    const chartArea = document.getElementById('chartArea') || (() => {
      const a = document.createElement('div');
      a.id = 'chartArea';
      const canvas = document.getElementById('cashFlowChart');
      if (canvas && canvas.parentNode) canvas.parentNode.insertBefore(a, canvas);
      a.appendChild(canvas);
      return a;
    })();
    if (chartArea) {
      chartArea.style.width = '100%';
      chartArea.style.height = '360px';
      chartArea.style.position = 'relative';
    }
    const canvas = document.getElementById('cashFlowChart');
    if (canvas) {
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
    }
    const spinner = chartContainer ? chartContainer.querySelector('.spinner') : null;
    if (spinner) {
      spinner.style.display = 'none';
      spinner.style.textAlign = 'center';
      spinner.style.padding = '24px';
      spinner.style.fontWeight = '600';
      spinner.style.color = '#374151';
    }
    const tableContainer = document.getElementById('financials-table-container');
    if (tableContainer) {
      tableContainer.style.maxWidth = '1000px';
      tableContainer.style.margin = '0 auto';
      tableContainer.style.boxSizing = 'border-box';
    }
  }

  function showLoading(isLoading) {
    const chartContainer = document.getElementById('chartContainer');
    const spinner = chartContainer ? chartContainer.querySelector('.spinner') : null;
    const chartArea = document.getElementById('chartArea');
    if (spinner) spinner.style.display = isLoading ? 'block' : 'none';
    if (chartArea) chartArea.style.display = isLoading ? 'none' : 'block';
  }

  function toNumberSafe(value) {
    if (value === null || value === undefined) return NaN;
    const str = String(value).trim();
    const negativeParens = /^\((.*)\)$/.test(str);
    const cleaned = str.replace(/[$,\s]/g, '').replace(/[()]/g, '');
    const n = parseFloat(cleaned);
    if (isNaN(n)) return NaN;
    return negativeParens ? -Math.abs(n) : n;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function parseCSV(text) {
    const txt = text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim();
    if (!txt) return [];
    const lines = txt.split('\n').filter(l => l.trim() !== '');
    if (lines.length < 1) return [];
    function parseLine(line) {
      const res = [];
      let cur = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === ',' && !inQuotes) {
          res.push(cur);
          cur = '';
        } else {
          cur += ch;
        }
      }
      res.push(cur);
      return res.map(v => v.trim());
    }
    const headers = parseLine(lines[0]).map(h => h.replace(/^"|"$/g, '').trim());
    const out = [];
    for (let r = 1; r < lines.length; r++) {
      const values = parseLine(lines[r]).map(v => v.replace(/^"|"$/g, '').trim());
      const obj = {};
      for (let i = 0; i < headers.length; i++) obj[headers[i]] = values[i] ?? '';
      out.push(obj);
    }
    return out;
  }

  function createChart(data) {
    const canvas = document.getElementById('cashFlowChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const labels = data.map(row => {
      const y = row['Year'] ?? '';
      const q = row['Quarter'] ?? '';
      const label = `${String(y).trim()} ${String(q).trim()}`.trim();
      return label || '(n/a)';
    });
    const cashFlow = data.map(row => toNumberSafe(row['CashFlow']));
    const cumulative = data.map(row => toNumberSafe(row['Balance']));
    const sanitizedCash = cashFlow.map(v => isNaN(v) ? 0 : v);
    const sanitizedCum = cumulative.map(v => isNaN(v) ? 0 : v);
    if (cashFlowChartInstance) {
      try { cashFlowChartInstance.destroy(); } catch (e) {}
      cashFlowChartInstance = null;
    }
    cashFlowChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Quarterly Cash Flow',
            data: sanitizedCash,
            backgroundColor: 'rgba(37, 99, 235, 0.6)',
            borderRadius: 3,
            yAxisID: 'yBar'
          },
          {
            label: 'Cumulative Balance',
            data: sanitizedCum,
            type: 'line',
            borderColor: 'rgba(16, 185, 129, 1)',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            tension: 0.25,
            yAxisID: 'yLine',
            fill: false,
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: { ticks: { color: '#374151' }, grid: { color: 'rgba(0,0,0,0.05)' } },
          yBar: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            ticks: { color: '#374151', callback: value => `$${(value / 1000).toFixed(0)}k` },
            grid: { color: 'rgba(0,0,0,0.05)' },
            title: { display: true, text: 'Quarterly Cash Flow', color: '#1f2937' }
          },
          yLine: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            ticks: { color: '#374151', callback: value => `$${(value / 1000).toFixed(0)}k` },
            grid: { display: false },
            title: { display: true, text: 'Cumulative Balance', color: '#1f2937' }
          }
        },
        plugins: {
          legend: { labels: { color: '#1f2937' } },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) label += ': ';
                const raw = context.parsed.y;
                if (raw != null && !isNaN(raw)) label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(raw);
                return label;
              }
            }
          }
        }
      }
    });
  }

  function createTable(data) {
    const container = document.getElementById('financials-table-container');
    if (!container || data.length === 0) return;
    const headers = Object.keys(data[0]);
    let html = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">';
    html += '<thead><tr>';
    for (let h of headers) html += `<th style="padding:10px 12px;text-align:left;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">${escapeHtml(h)}</th>`;
    html += '</tr></thead><tbody>';
    for (let row of data) {
      html += '<tr>';
      for (let h of headers) {
        let cell = row[h];
        let style = 'padding:10px 12px;text-align:left;border-bottom:1px solid #e5e7eb;color:#374151;font-size:14px';
        const currencyCols = ['CashFlow', 'Balance'];
        if (currencyCols.indexOf(h) !== -1) {
          const v = toNumberSafe(cell);
          if (!isNaN(v)) {
            cell = v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
            if (v < 0) style += ';color:#dc2626';
          } else {
            cell = escapeHtml(cell ?? '');
          }
        } else {
          cell = escapeHtml(cell ?? '');
        }
        html += `<td style="${style}">${cell}</td>`;
      }
      html += '</tr>';
    }
    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  async function loadFinancialData(url) {
    applyStyles();
    showLoading(true);
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error('Network response not ok');
      const txt = await res.text();
      const parsed = (typeof window.CSVParser === 'object' && typeof window.CSVParser.parse === 'function') ? window.CSVParser.parse(txt) : parseCSV(txt);
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('CSV parsed empty');
      createChart(parsed);
      createTable(parsed);
      showLoading(false);
    } catch (err) {
      console.error('Failed to load or parse financial data:', err);
      const chartContainer = document.getElementById('chartContainer');
      if (chartContainer) {
        chartContainer.innerHTML = `<div style="padding:20px;border:1px solid #fecaca;background:#fef2f2;color:#b91c1c;border-radius:8px"><strong>Error:</strong> Failed to load financial data.<ul style="list-style:disc;margin-left:20px;margin-top:10px"><li>Check Google Sheet is Published to the web</li><li>Ensure CSV headers Year, Quarter, CashFlow, Balance</li><li>Link used: ${escapeHtml(url)}</li></ul></div>`;
      }
    }
  }

  window.loadFinancialData = loadFinancialData;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof Chart === 'undefined') return;
      loadFinancialData('https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv');
    });
  } else {
    if (typeof Chart !== 'undefined') loadFinancialData('https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv');
  }
})();
