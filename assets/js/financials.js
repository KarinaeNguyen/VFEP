/*
  financials.js — Professional Modern Dashboard Version (C)
  - FIX: Handles headers with '#' symbols (e.g., "# Year")
  - FIX: Reads "Gain" and "Lost" columns for the table
  - Robust CSV parsing and number formatting
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
    
    // Cleanup string: remove whitespace, $, and commas
    let s = String(value).trim().replace(/[$,]/g, ''); 
    
    // Handle negative parentheses: (100) -> -100
    let negative = false;
    if (/^\(.+\)$/.test(s)) {
      negative = true;
      s = s.replace(/^\(|\)$/g, '');
    }
    
    const n = parseFloat(s);
    if (isNaN(n)) return NaN;
    return negative ? -Math.abs(n) : n;
  }

  // --------- Header Mapping -------------------------------------------------------
  // Maps CSV headers to internal keys. 
  const HEADER_MAP = {
    year: ['year', 'y', 'date', 'năm', 'nam'],
    quarter: ['quarter', 'q', 'qtr', 'quý', 'quy'],
    // Added 'gain' for Revenue
    revenue: ['revenue', 'gain', 'income', 'thu', 'doanh thu'], 
    // Added 'lost' for Expenses
    expenses: ['expense', 'expenses', 'lost', 'loss', 'cost', 'chi', 'chi phí'],
    cashflow: ['cashflow', 'cash flow', 'cf', 'net cash', 'dòng tiền', 'dong tien'],
    balance: ['balance', 'cumulative', 'ending balance', 'số dư', 'so du']
  };

  function normalizeHeaderKey(h) {
    // SUPER ROBUST: Remove '#', symbols, spaces. Keep only letters/numbers.
    // "# Year" -> "year", "Cash-Flow" -> "cashflow"
    return String(h || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function detectHeaders(headers) {
    const map = {};
    const norm = headers.map(h => normalizeHeaderKey(h));
    
    console.log("Processed Headers:", norm); // Debug log

    for (let i = 0; i < norm.length; i++) {
      const key = norm[i];
      if (!key) continue;
      for (const canon in HEADER_MAP) {
        for (const variant of HEADER_MAP[canon]) {
          if (key.includes(variant)) { // Fuzzy match
             map[canon] = i;
            break;
          }
        }
      }
    }
    return map;
  }

  // ---------------- CSV PARSER FALLBACK -----------------------------------------
  function parseCSV(text) {
    if (typeof text !== 'string') return { headers: [], rows: [] };
    text = text.replace(/^\uFEFF/, ''); 
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
    let hmap = detectHeaders(headers);

    const out = [];
    
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r];
      const val = (idx) => {
          if (idx == null) return null;
          const key = headers[idx];
          return row[key];
      };

      const outRow = {
        raw: row,
        Year: val(hmap.year) || '',
        Quarter: val(hmap.quarter) || '',
        Revenue: toNumberSafe(val(hmap.revenue)),  // Mapped from 'Gain'
        Expenses: toNumberSafe(val(hmap.expenses)), // Mapped from 'Lost'
        CashFlow: toNumberSafe(val(hmap.cashflow)),
        Balance: toNumberSafe(val(hmap.balance))
      };

      // Fallback: if Year is missing, look for Date
      if ((!outRow.Year) && row['Date']) outRow.Year = row['Date'];
      // Fallback: Extract Q1/Q2 from Year if Quarter is empty
      if (!outRow.Quarter && typeof outRow.Year === 'string') {
        const m = outRow.Year.match(/(Q[1-4]|q[1-4])/);
        if (m) outRow.Quarter = m[0];
      }

      out.push(outRow);
    }

    // Auto-calculate balance if missing (using CashFlow)
    const hasAnyBalance = out.some(r => !isNaN(r.Balance) && r.Balance !== 0);
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
    if (!container) return;
    
    if (!Array.isArray(normalized) || normalized.length === 0) {
      container.innerHTML = '<div style="padding:12px;color:#6b7280">No financial rows to display.</div>';
      return;
    }

    let html = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">';
    html += '<thead><tr>';
    html += '<th style="padding:10px 12px;text-align:left;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Period</th>';
    html += '<th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Revenue (Gain)</th>';
    html += '<th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Expenses (Lost)</th>';
    html += '<th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Cash Flow</th>';
    html += '<th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Balance</th>';
    html += '</tr></thead><tbody>';

    for (const row of normalized) {
      const period = (row.Year || '') + (row.Quarter ? (' ' + row.Quarter) : '');
      const cf = isNaN(row.CashFlow) ? 0 : row.CashFlow;
      const bal = isNaN(row.Balance) ? 0 : row.Balance;
      const rev = isNaN(row.Revenue) ? 0 : row.Revenue;
      const exp = isNaN(row.Expenses) ? 0 : row.Expenses;

      const cfColor = cf < 0 ? 'color:#dc2626' : 'color:#059669';

      html += `<tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#374151;font-size:14px">${escapeHtml(period || '(n/a)')}</td>`;
      html += `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;color:#6b7280">${formatCurrency(rev)}</td>`;
      html += `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;color:#dc2626">(${formatCurrency(exp).replace('$','')})</td>`;
      html += `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;${cfColor}">${formatCurrency(cf)}</td>`;
      html += `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600">${formatCurrency(bal)}</td></tr>`;
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
      
      let parsed;
      if (typeof window.CSVParser === 'object' && typeof window.CSVParser.parse === 'function') {
        parsed = window.CSVParser.parse(txt);
      } else {
        parsed = parseCSV(txt);
      }

      let rows = [], headers = [];
      if (Array.isArray(parsed)) {
         rows = parsed;
      } else if (parsed && Array.isArray(parsed.rows)) {
         rows = parsed.rows;
         headers = parsed.headers;
      }

      if (rows.length === 0) throw new Error('CSV parsed empty');

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
