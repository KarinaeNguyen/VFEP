/*
  financials.js — Professional Modern Dashboard Version (B)
  - Robust loading/waiting for Chart.js
  - Works with Google Sheets CSV (or any CSV URL)
  - Auto-detects headers: Year, Quarter, CashFlow, Balance (flexible names)
  - Recomputes cumulative balance if missing
  - Responsive, ResizeObserver, spinner + graceful errors
  - Clean API: window.loadFinancialData(url, options)

  Usage: include Chart.js before or alongside (defer okay). See the companion HTML snippet in chat.
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
    dateFormat: 'YYYY Q', // just a label format hint
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
  function isObj(x) { return x && typeof x === 'object' && !Array.isArray(x); }

  function mergeOptions(opts) {
    currentOptions = Object.assign({}, DEFAULTS, opts || {});
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function toNumberSafe(value) {
    if (value === null || value === undefined) return NaN;
    if (typeof value === 'number') return value;
    let s = String(value).trim();
    if (!s) return NaN;
    // Detect parentheses for negative: (1,234.56)
    let negative = false;
    if (/^\(.+\)$/.test(s)) {
      negative = true;
      s = s.replace(/^\(|\)$/g, '');
    }
    // Remove non-numeric except dot and minus
    s = s.replace(/[^0-9.+-]/g, '');
    // If more than one dot, remove extras
    const parts = s.split('.');
    if (parts.length > 2) s = parts.shift() + '.' + parts.join('');
    const n = parseFloat(s);
    if (isNaN(n)) return NaN;
    return negative ? -Math.abs(n) : n;
  }

  // Flexible header detection: map common variants to canonical keys
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
    return map; // may have missing fields
  }

  // ---------------- CSV PARSING --------------------------------------------------
  // Lightweight RFC4180-ish parser, resilient to common issues
  function parseCSV(text) {
    if (typeof text !== 'string') return [];
    // Remove BOM
    text = text.replace(/^\uFEFF/, '');
    // Normalize newlines
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = text.split('\n').filter(l => l.trim() !== '');
    if (lines.length === 0) return [];

    function parseLine(line) {
      const out = [];
      let cur = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          // double quote escape
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
    const headers = parsed.headers;
    const rows = parsed.rows;
    const hmap = detectHeaders(headers);

    // If year/quarter missing, try to find a date column
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
      // Year
      if (hmap.year != null) outRow.Year = row[headers[hmap.year]] || '';
      // Quarter
      if (hmap.quarter != null) outRow.Quarter = row[headers[hmap.quarter]] || '';
      // CashFlow
      if (hmap.cashflow != null) outRow.CashFlow = toNumberSafe(row[headers[hmap.cashflow]]);
      // Balance
      if (hmap.balance != null) outRow.Balance = toNumberSafe(row[headers[hmap.balance]]);

      // fallback: try common column names directly
      if ((outRow.Year === '' || outRow.Year == null) && row['Date']) outRow.Year = row['Date'];

      // Add any gentle fallback for Quarter when Quarter is in Year column (e.g., "2024 Q1")
      if ((outRow.Quarter === '' || outRow.Quarter == null) && typeof outRow.Year === 'string') {
        const m = outRow.Year.match(/(Q[1-4]|q[1-4])|([0-9]{4}[-\/]Q[1-4])/);
        if (m) outRow.Quarter = m[0];
      }

      out.push(outRow);
    }

    // If Balance missing, recompute cumulative from CashFlow
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
    container.style.width = '100%';
    container.style.maxWidth = '1000px';
    container.style.margin = '0 auto 1rem';
    container.style.boxSizing = 'border-box';

    let spinner = container.querySelector('.spinner');
    if (!spinner) {
      const div = document.createElement('div');
      div.innerHTML = spinnerHtml;
      container.insertBefore(div, container.firstChild);
    }

    const canvas = qs(canvasId);
    if (canvas) {
      canvas.style.width = '100%';
      canvas.style.height = '360px';
      canvas.style.display = 'block';
    }

    const table = qs(tableId);
    if (table) {
      table.style.maxWidth = '1000px';
      table.style.margin = '0 auto';
      table.style.boxSizing = 'border-box';
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
    // Use Year Quarter CashFlow Balance columns
    let html = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">';
    html += '<thead><tr>';
    html += '<th style="padding:10px 12px;text-align:left;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Period</th>';
    html += '<th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Quarterly Cash Flow</th>';
    html += '<th style="padding:10px 12px;text-align:right;border-bottom:1px solid #e5e7eb;background:#f9fafb;font-size:12px;color:#6b7280;text-transform:uppercase">Cumulative Balance</th>';
    html += '</tr></thead><tbody>';

    for (const row of normalized) {
      const period = (row.Year || '') + (row.Quarter ? (' ' + row.Quarter) : '');
      const cf = isNaN(row.CashFlow) ? 0 : row.CashFlow;
      const bal = isNaN(row.Balance) ? 0 : row.Balance;
      const cfStr = formatCurrency(cf);
      const balStr = formatCurrency(bal);
      const cfColor = cf < 0 ? 'color:#dc2626' : '';
      html += `<tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#374151;font-size:14px">${escapeHtml(period || '(n/a)')}</td>`;
      html += `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;${cfColor}">${escapeHtml(cfStr)}</td>`;
      html += `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right">${escapeHtml(balStr)}</td></tr>`;
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

    // Build labels and data
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
            backgroundColor: (() => {
              // Chart.js supports arrays or strings; leave to user stylesheet but provide fallback
              try { return window.getComputedStyle(qs(currentOptions.containerId)).getPropertyValue('--accent') || 'rgba(37,99,235,0.7)'; } catch (e) { return 'rgba(37,99,235,0.7)'; }
            })()
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
            title: { display: true, text: 'Quarterly Cash Flow' }
          },
          yLine: {
            type: 'linear', position: 'right', beginAtZero: true,
            ticks: { callback: v => formatAxisTick(v) },
            grid: { display: false },
            title: { display: true, text: 'Cumulative Balance' }
          }
        },
        plugins: {
          legend: { position: 'top', labels: { color: '#111827' } },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                const label = ctx.dataset.label || '';
                const val = ctx.parsed.y;
                return (label ? label + ': ' : '') + (isNaN(val) ? '-' : new Intl.NumberFormat('en-US', { style: 'currency', currency: currentOptions.currency }).format(val));
              }
            }
          }
        }
      }
    };

    // Build chart instance (Chart.js v3+ compatible)
    chartInstance = new Chart(ctx, chartOptions);
  }

  function formatAxisTick(v) {
    if (Math.abs(v) >= 1000) return '$' + Math.round(v / 1000) + 'k';
    return '$' + v;
  }

  // ---------------- Fetch with timeout -----------------------------------------
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

  // ---------------- Public loader ---------------------------------------------
  async function loadFinancialData(url, options) {
    if (!url) throw new Error('CSV URL required');
    mergeOptions(Object.assign({}, { csvUrl: url }, options || {}));

    // Ensure DOM elements exist
    applyStyles(currentOptions.containerId, currentOptions.canvasId, currentOptions.tableContainerId, currentOptions.spinnerHtml);
    showLoading(true);

    // Wait for ChartJS to be available
    await waitForChart();

    try {
      const txt = await fetchWithTimeout(currentOptions.csvUrl, currentOptions.fallbackFetchTimeout);
      const parsed = (typeof window.CSVParser === 'object' && typeof window.CSVParser.parse === 'function') ? window.CSVParser.parse(txt) : parseCSV(txt);
      if (!parsed || !Array.isArray(parsed.rows) || parsed.rows.length === 0) throw new Error('CSV parsed empty');

      const normalized = normalizeData(parsed);

      // Update table and chart
      createTable(normalized);
      createChart(normalized);

      attachResizeObserver();

      showLoading(false);
    } catch (err) {
      showLoading(false);
      renderError(err);
      console.error('financials.js error:', err);
    }
  }

  function renderError(err) {
    const container = qs(currentOptions.containerId);
    if (!container) return;
    const html = `\n      <div style="padding:16px;border-radius:8px;border:1px solid #fecaca;background:#fef2f2;color:#b91c1c">\n        <strong>Error loading financial data</strong>\n        <div style="margin-top:8px;font-size:13px;color:#7f1d1d">${escapeHtml(String(err.message || err))}</div>\n        <ul style="margin-top:10px">\n          <li>Make sure the Google Sheet is Published to the web (File → Publish to web) and the link ends with <code>?output=csv</code></li>\n          <li>Ensure CSV has headers like Year, Quarter, CashFlow, Balance (common variants supported)</li>\n          <li>URL used: ${escapeHtml(currentOptions.csvUrl)}</li>\n        </ul>\n      </div>\n    `;
    container.innerHTML = html;
  }

  // ---------------- Helpers: wait for Chart ------------------------------------
  function waitForChart() {
    return new Promise((resolve) => {
      if (typeof Chart !== 'undefined') return resolve();
      const t = setInterval(() => {
        if (typeof Chart !== 'undefined') {
          clearInterval(t);
          resolve();
        }
      }, 50);
      // safety fallback resolve after some time - still proceed but Chart may be missing
      setTimeout(() => { clearInterval(t); resolve(); }, 15000);
    });
  }

  // ---------------- Resize observer for niceness --------------------------------
  function attachResizeObserver() {
    const canvas = qs(currentOptions.canvasId);
    if (!canvas || typeof ResizeObserver === 'undefined') return;
    if (resizeObserver) resizeObserver.disconnect();
    resizeObserver = new ResizeObserver(() => {
      try { if (chartInstance) chartInstance.resize(); } catch (e) {}
    });
    resizeObserver.observe(canvas.parentElement || canvas);
  }

  // ---------------- Expose API --------------------------------------------------
  window.loadFinancialData = loadFinancialData;
  window.financials = {
    load: loadFinancialData,
    destroy: function() { destroyChart(); if (resizeObserver) resizeObserver.disconnect(); }
  };

  // ---------------- Auto-run if script placed after DOM and Chart present ---------
  if (document.readyState !== 'loading') {
    // If a default URL was provided as a data attribute on container, auto-load
    try {
      const container = qs(DEFAULTS.containerId);
      if (container) {
        const dataUrl = container.getAttribute('data-csv-url');
        if (dataUrl) {
          // defer slightly to allow Chart to load if present
          setTimeout(() => {
            loadFinancialData(dataUrl).catch(() => {});
          }, 120);
        }
      }
    } catch (e) {}
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      const container = qs(DEFAULTS.containerId);
      if (container) {
        const dataUrl = container.getAttribute('data-csv-url');
        if (dataUrl) loadFinancialData(dataUrl).catch(() => {});
      }
    });
  }

})();
