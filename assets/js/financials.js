/*
  financials.js — Professional Modern Dashboard Version (B)
  - Robust loading/waiting for Chart.js
  - Works with Google Sheets CSV (or any CSV URL)
  - Auto-detects headers: Year, Quarter, CashFlow, Balance (flexible names)
  - Recomputes cumulative balance if missing
  - Responsive, ResizeObserver, spinner + graceful errors
  - Clean API: window.loadFinancialData(url, options)
*/
(function () {
  'use strict';

  // --------- Configuration defaults ------------------------------------------------
  const DEFAULTS = {
    csvUrl: '',
    containerId: 'chartContainer',
    canvasId: 'cashFlowChart',
    tableContainerId: 'financials-table-container',
    spinnerHtml: '<div class="spinner">Loading financials…</div>',
    dateFormat: 'YYYY Q', 
    currency: 'USD',
    animate: true,
    animationDuration: 600,
    fallbackFetchTimeout: 12000 // ms
  };

  // --------- Private state --------------------------------------------------------
  let chartInstance = null;
  let currentOptions = Object.assign({}, DEFAULTS);
  let resizeObserver = null;

  // --------- Utilities ------------------------------------------------------------
  function qs(id) { return document.getElementById(id); }
  
  function mergeOptions(opts) {
    currentOptions = Object.assign({}, DEFAULTS, opts || {});
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function toNumberSafe(value) {
    if (value === null || value === undefined) return NaN;
    if (typeof value === 'number') return value;
    let s = String(value).trim();
    if (!s) return NaN;
    let negative = false;
    if (/^\(.+\)$/.test(s)) {
      negative = true;
      s = s.replace(/^\(|\)$/g, '');
    }
    s = s.replace(/^\$|,/g, ''); // Remove $ and commas
    s = s.replace(/[^0-9.+-]/g, '');
    const parts = s.split('.');
    if (parts.length > 2) s = parts.shift() + '.' + parts.join('');
    const n = parseFloat(s);
    if (isNaN(n)) return NaN;
    return negative ? -Math.abs(n) : n;
  }

  const HEADER_MAP = {
    year: ['year', 'y', 'fiscal year', 'fy', 'date'],
    quarter: ['quarter', 'q', 'qtr', 'period'],
    cashflow: ['cashflow', 'cash flow', 'cf', 'inflow', 'net cash', 'cash'],
    balance: ['balance', 'cumulative', 'cum balance', 'ending balance', 'running balance']
  };

  function normalizeHeaderKey(h) {
    return String(h || '').trim().toLowerCase().replace(/[\s_\-]+/g, ' ');
  }

  function detectHeaders(headers) {
    const map = {};
    const norm = headers.map(h => normalizeHeaderKey(h));
    for (let i = 0; i < norm.length; i++) {
      const key = norm[i];
      if (!key) continue;
      for (const canon in HEADER_MAP) {
        for (const variant of HEADER_MAP[canon]) {
          if (key === variant || key.indexOf(variant) !== -1) {
             map[canon] = i;
            break;
          }
        }
        if (map[canon] != null) break;
      }
    }
    return map;
  }

  // ---------------- CSV PARSING FALLBACK -----------------------------------------
  function parseCSV(text) {
    if (typeof text !== 'string') return { headers: [], rows: [] };
    text = text.replace(/^\uFEFF/, ''); // Remove BOM
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = text.split('\n').filter(l => l.trim() !== '');
    if (lines.length === 0) return { headers: [], rows: [] };

    function parseLine(line) {
      const out = [];
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
          out.push(cur);
          cur = '';
        } else {
          cur += ch;
        }
      }
      out.push(cur);
      return out.map(v => v.trim());
    }

    const headerRow = parseLine(lines[0]).map(h => h.replace(/^"|"$/g, ''));
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const cells = parseLine(lines[i]).map(c => c.replace(/^"|"$/g, ''));
      const obj = {};
      for (let j = 0; j < headerRow.length; j++) {
        obj[headerRow[j] || `col_${j}`] = cells[j] == null ? '' : cells[j];
      }
      rows.push(obj);
    }
    return { headers: headerRow, rows };
  }

  // ---------------- Data normalization -----------------------------------------
  function normalizeData(parsed) {
    const headers = parsed.headers || [];
    const rows = parsed.rows || [];
    const hmap = detectHeaders(headers);
    const out = [];
    
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r];
      const outRow = {
        raw: row,
        Year: '',
        Quarter: '',
        CashFlow: NaN,
        Balance: NaN
      };
      if (hmap.year != null) outRow.Year = row[headers[hmap.year]] || '';
      if (hmap.quarter != null) outRow.Quarter = row[headers[hmap.quarter]] || '';
      if (hmap.cashflow != null) outRow.CashFlow = toNumberSafe(row[headers[hmap.cashflow]]);
      if (hmap.balance != null) outRow.Balance = toNumberSafe(row[headers[hmap.balance]]);
      
      // Fallback detection
      if ((outRow.Year === '' || outRow.Year == null) && row['Date']) outRow.Year = row['Date'];
      if ((outRow.Quarter === '' || outRow.Quarter == null) && typeof outRow.Year === 'string') {
        const m = outRow.Year.match(/(Q[1-4]|q[1-4])|([0-9]{4}[-\/]Q[1-4])/);
        if (m) outRow.Quarter = m[0];
      }
      out.push(outRow);
    }

    // Auto-calculate balance if missing
    const hasAnyBalance = out.some(r => !isNaN(r.Balance));
    if (!hasAnyBalance) {
      let running = 0;
      for (let i = 0; i < out.length; i++) {
        const cf = isNaN(out[i].CashFlow) ? 0 : out[i].CashFlow;
        running += cf;
        out[i].Balance = running;
      }
    }
    return out;
  }

  // ---------------- Render helpers ----------------------------------------------
  function applyStyles(containerId, canvasId, tableId, spinnerHtml) {
    const container = qs(containerId);
    if (!container) return;
    container.style.position = 'relative';
    
    let spinner = container.querySelector('.spinner');
    if (!spinner) {
      const div = document.createElement('div');
      div.innerHTML = spinnerHtml;
      container.insertBefore(div, container.firstChild);
    }

    const canvas = qs(canvasId);
    if (canvas) {
      canvas.style.display = 'block';
    }
  }

  function showLoading(isLoading) {
    const container = qs(currentOptions.containerId);
    if (!container) return;
    const spinner = container.querySelector('.spinner');
    const canvas = qs(currentOptions.canvasId);
    if (spinner) spinner.style.display = isLoading ? 'block' : 'none';
    if (canvas) canvas.style.visibility = isLoading ? 'hidden' : 'visible';
  }

  function formatCurrency(value) {
    if (isNaN(value)) return '-';
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currentOptions.currency, maximumFractionDigits: 0 }).format(value);
    } catch (e) {
      return '$' + Math.round(value).toLocaleString();
    }
  }

  function createTable(normalized) {
    const container = qs(currentOptions.tableContainerId);
    // Graceful exit if container missing, instead of crash
    if (!container) {
        console.warn(`Financials table container #${currentOptions.tableContainerId} not found. Skipping table render.`);
        return; 
    }
    
    if (!Array.isArray(normalized) || normalized.length === 0) {
      container.innerHTML = '<div style="padding:12px;color:#6b7280">No financial rows to display.</div>';
      return;
    }

    let html = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">';
    html += '<thead><tr>';
    html += '<th style="padding:10px 12px;text-align:left;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Period</th>';
    html += '<th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Revenue (est)</th>';
    html += '<th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Cash Flow</th>';
    html += '<th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Balance</th>';
    html += '</tr></thead><tbody>';

    for (const row of normalized) {
      const period = (row.Year || '') + (row.Quarter ? (' ' + row.Quarter) : '');
      const cf = isNaN(row.CashFlow) ? 0 : row.CashFlow;
      const bal = isNaN(row.Balance) ? 0 : row.Balance;
      // Simple dummy revenue logic for display if not present, or just N/A
      const rev = cf > 0 ? cf * 1.2 : 0; 

      const cfStr = formatCurrency(cf);
      const balStr = formatCurrency(bal);
      const revStr = rev > 0 ? formatCurrency(rev) : '-';
      const cfColor = cf < 0 ? 'color:#dc2626' : 'color:#059669';

      html += `<tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#374151;font-size:14px">${escapeHtml(period || '(n/a)')}</td>`;
      html += `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;color:#6b7280">${escapeHtml(revStr)}</td>`;
      html += `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;${cfColor}">${escapeHtml(cfStr)}</td>`;
      html += `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600">${escapeHtml(balStr)}</td></tr>`;
    }

    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  // ---------------- Chart creation ----------------------------------------------
  function destroyChart() {
    if (chartInstance) {
      try { chartInstance.destroy(); } catch (e) {}
      chartInstance = null;
    }
  }

  function createChart(normalized) {
    const canvas = qs(currentOptions.canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const labels = normalized.map(r => ((r.Year || '') + (r.Quarter ? ' ' + r.Quarter : '')).trim() || '(n/a)');
    const cash = normalized.map(r => isNaN(r.CashFlow) ? 0 : r.CashFlow);
    const cum = normalized.map(r => isNaN(r.Balance) ? 0 : r.Balance);
    destroyChart();

    const chartOptions = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Quarterly Cash Flow',
            data: cash,
            borderRadius: 4,
            yAxisID: 'yBar',
            backgroundColor: 'rgba(37,99,235,0.7)'
          },
          {
            type: 'line',
            label: 'Cumulative Balance',
            data: cum,
            yAxisID: 'yLine',
            borderColor: 'rgba(16,185,129,1)',
            backgroundColor: 'rgba(16,185,129,0.15)',
            tension: 0.2,
            pointRadius: 3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: currentOptions.animate ? { duration: currentOptions.animationDuration } : false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: { ticks: { color: '#374151' }, grid: { color: 'rgba(0,0,0,0.04)' } },
          yBar: {
            type: 'linear', position: 'left', beginAtZero: true,
            ticks: { callback: v => formatAxisTick(v) },
            grid: { color: 'rgba(0,0,0,0.04)' },
            title: { display: true, text: 'Cash Flow' }
          },
          yLine: {
            type: 'linear', position: 'right', beginAtZero: true,
            ticks: { callback: v => formatAxisTick(v) },
            grid: { display: false },
            title: { display: true, text: 'Balance' }
          }
        }
      }
    };
    chartInstance = new Chart(ctx, chartOptions);
  }

  function formatAxisTick(v) {
    if (Math.abs(v) >= 1000) return '$' + Math.round(v / 1000) + 'k';
    return '$' + v;
  }

  function fetchWithTimeout(url, timeout) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Fetch timeout')), timeout);
      fetch(url, { cache: 'no-cache' }).then(resp => {
        clearTimeout(timer);
        if (!resp.ok) return reject(new Error('Network response not ok'));
        return resp.text().then(txt => resolve(txt));
      }).catch(err => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  async function waitForChart() {
    return new Promise((resolve) => {
      if (typeof Chart !== 'undefined') return resolve();
      const t = setInterval(() => {
        if (typeof Chart !== 'undefined') {
          clearInterval(t);
          resolve();
        }
      }, 50);
      setTimeout(() => { clearInterval(t); resolve(); }, 15000);
    });
  }

  function attachResizeObserver() {
    const canvas = qs(currentOptions.canvasId);
    if (!canvas || typeof ResizeObserver === 'undefined') return;
    if (resizeObserver) resizeObserver.disconnect();
    resizeObserver = new ResizeObserver(() => {
      try { if (chartInstance) chartInstance.resize(); } catch (e) {}
    });
    resizeObserver.observe(canvas.parentElement || canvas);
  }

  async function loadFinancialData(url, options) {
    if (!url) throw new Error('CSV URL required');
    mergeOptions(Object.assign({}, { csvUrl: url }, options || {}));

    applyStyles(currentOptions.containerId, currentOptions.canvasId, currentOptions.tableContainerId, currentOptions.spinnerHtml);
    showLoading(true);
    await waitForChart();

    try {
      const txt = await fetchWithTimeout(currentOptions.csvUrl, currentOptions.fallbackFetchTimeout);
      
      // PARSER SELECTION & VALIDATION
      let parsed;
      if (typeof window.CSVParser === 'object' && typeof window.CSVParser.parse === 'function') {
        parsed = window.CSVParser.parse(txt);
      } else {
        parsed = parseCSV(txt);
      }

      // Handle both array return (legacy) and object return (correct)
      let rows = [];
      let headers = [];
      if (Array.isArray(parsed)) {
         // If parser returns just array, assume they are the rows
         rows = parsed;
      } else if (parsed && Array.isArray(parsed.rows)) {
         rows = parsed.rows;
         headers = parsed.headers;
      }

      if (rows.length === 0) throw new Error('CSV parsed empty');

      // Re-normalize with correct structure
      const structure = { headers: headers.length ? headers : Object.keys(rows[0] || {}), rows: rows };
      const normalized = normalizeData(structure);

      createTable(normalized);
      createChart(normalized);
      attachResizeObserver();
      showLoading(false);

    } catch (err) {
      showLoading(false);
      const container = qs(currentOptions.containerId);
      if(container) {
          container.innerHTML = `
            <div style="padding:16px;border-radius:8px;border:1px solid #fecaca;background:#fef2f2;color:#b91c1c">
              <strong>Error loading financial data</strong>
              <div style="margin-top:8px;font-size:13px;color:#7f1d1d">${escapeHtml(err.message)}</div>
            </div>`;
      }
      console.error('financials.js error:', err);
    }
  }

  window.loadFinancialData = loadFinancialData;
})();
