<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Financials Chart</title>
  <style>
    #chartContainer {
      position: relative;
      width: 100%;
      max-width: 900px;
      margin: 0 auto 1.5rem;
      border-radius: 8px;
      background: #fff;
      padding: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }
    #chartArea {
      width: 100%;
      height: 360px;
      position: relative;
    }
    #chartArea canvas { display: block; width: 100%; height: 100%; }
    .spinner {
      display: none;
      text-align: center;
      padding: 24px;
      font-weight: 600;
      color: #374151;
    }
    #financials-table-container { max-width: 1000px; margin: 0 auto; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border-bottom: 1px solid #e5e7eb; padding: 10px 12px; text-align: left; }
    thead th { background: #f9fafb; font-size: 12px; text-transform: uppercase; color: #6b7280; }
    tbody td { color: #374151; font-size: 14px; }
    .text-red { color: #dc2626; }
    .overflow-x-auto { overflow-x: auto; }
  </style>
</head>
<body>
  <div id="chartContainer">
    <div class="spinner">Loading financial data…</div>
    <div id="chartArea">
      <canvas id="cashFlowChart"></canvas>
    </div>
  </div>

  <div id="financials-table-container"></div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script>
    let cashFlowChartInstance = null;

    async function loadFinancialData(url) {
      const chartContainer = document.getElementById('chartContainer');
      const spinner = chartContainer ? chartContainer.querySelector('.spinner') : null;
      const chartArea = document.getElementById('chartArea');

      function showLoading(isLoading) {
        if (spinner) spinner.style.display = isLoading ? 'block' : 'none';
        if (chartArea) chartArea.style.display = isLoading ? 'none' : 'block';
      }

      showLoading(true);

      try {
        const response = await fetch(url, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        const rawText = await response.text();

        const csvText = rawText.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');

        const parseCSV = (text) => {
          const lines = text.trim().split('\n').filter(l => l.trim() !== '');
          if (lines.length < 2) return [];
          const parseLine = (line) => {
            const result = [];
            let current = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                  current += '"';
                  i++;
                } else {
                  inQuotes = !inQuotes;
                }
              } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
              } else {
                current += char;
              }
            }
            result.push(current);
            return result.map(v => v.trim());
          };
          const headers = parseLine(lines[0]).map(h => h.replace(/^"|"$/g, '').trim());
          return lines.slice(1).map(line => {
            const values = parseLine(line).map(v => v.replace(/^"|"$/g, '').trim());
            const obj = {};
            headers.forEach((h, i) => obj[h] = values[i] ?? '');
            return obj;
          });
        };

        const data = (typeof window.CSVParser === 'object' && typeof window.CSVParser.parse === 'function')
          ? window.CSVParser.parse(csvText)
          : parseCSV(csvText);

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('CSV data was empty or parsed incorrectly.');
        }

        createChart(data);
        createTable(data);
        showLoading(false);
      } catch (error) {
        console.error('Failed to load or parse financial data:', error);
        if (chartContainer) {
          chartContainer.innerHTML = `
            <div style="padding: 20px; border: 1px solid #fecaca; background: #fef2f2; color: #b91c1c; border-radius: 8px;">
              <strong>Error:</strong> Failed to load financial data.
              <ul style="list-style-type: disc; margin-left: 20px; margin-top: 10px;">
                <li>Please check that the Google Sheet is Published to the web.</li>
                <li>Ensure the CSV column headers (Year, Quarter, CashFlow, Balance) are correct.</li>
                <li>The link being used is: ${url}</li>
              </ul>
            </div>
          `;
        }
      }
    }

    function toNumberSafe(value) {
      if (value === null || value === undefined) return NaN;
      const cleaned = String(value).replace(/[$,()\s]/g, '');
      if (/^\(.*\)$/.test(String(value).trim())) {
        const n = parseFloat(cleaned.replace(/[()]/g, ''));
        return isNaN(n) ? NaN : -n;
      }
      return parseFloat(cleaned);
    }

    function createChart(data) {
      const canvas = document.getElementById('cashFlowChart');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      const labels = data.map(row => {
        const year = row['Year'] ?? '';
        const quarter = row['Quarter'] ?? '';
        const label = `${String(year).trim()} ${String(quarter).trim()}`.trim();
        return label || '(n/a)';
      });

      const cashFlow = data.map(row => toNumberSafe(row['CashFlow']));
      const cumulativeCash = data.map(row => toNumberSafe(row['Balance']));

      if (labels.length === 0) {
        console.error('No labels found for chart.');
        return;
      }

      const sanitizedCashFlow = cashFlow.map(v => isNaN(v) ? 0 : v);
      const sanitizedCumulative = cumulativeCash.map(v => isNaN(v) ? 0 : v);

      const chartConfig = {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Quarterly Cash Flow',
              data: sanitizedCashFlow,
              backgroundColor: 'rgba(37, 99, 235, 0.6)',
              borderRadius: 3,
              yAxisID: 'yBar'
            },
            {
              label: 'Cumulative Balance',
              data: sanitizedCumulative,
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
            x: {
              ticks: { color: '#374151' },
              grid: { color: 'rgba(0,0,0,0.05)' }
            },
            yBar: {
              type: 'linear',
              position: 'left',
              beginAtZero: true,
              ticks: {
                color: '#374151',
                callback: value => `$${(value / 1000).toFixed(0)}k`
              },
              grid: { color: 'rgba(0,0,0,0.05)' },
              title: { display: true, text: 'Quarterly Cash Flow', color: '#1f2937' }
            },
            yLine: {
              type: 'linear',
              position: 'right',
              beginAtZero: true,
              ticks: {
                color: '#374151',
                callback: value => `$${(value / 1000).toFixed(0)}k`
              },
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
                  if (raw != null && !isNaN(raw)) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(raw);
                  }
                  return label;
                }
              }
            }
          }
        }
      };

      if (cashFlowChartInstance) {
        try { cashFlowChartInstance.destroy(); } catch (e) {}
        cashFlowChartInstance = null;
      }
      cashFlowChartInstance = new Chart(ctx, chartConfig);
    }

    function createTable(data) {
      const tableContainer = document.getElementById('financials-table-container');
      if (!tableContainer || data.length === 0) return;

      const headers = Object.keys(data[0]);

      let table = '<div class="overflow-x-auto"><table>';
      table += '<thead><tr>';
      headers.forEach(header => {
        table += `<th>${escapeHtml(header)}</th>`;
      });
      table += '</tr></thead>';

      table += '<tbody>';
      data.forEach(rowObject => {
        table += '<tr>';
        headers.forEach(header => {
          let cell = rowObject[header];
          let cellClass = '';
          const currencyColumns = ['CashFlow', 'Balance'];
          if (currencyColumns.includes(header)) {
            const value = toNumberSafe(cell);
            if (!isNaN(value)) {
              cell = value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              });
              if (value < 0) cellClass = 'text-red';
            } else {
              cell = escapeHtml(cell ?? '');
            }
          } else {
            cell = escapeHtml(cell ?? '');
          }
          table += `<td class="${cellClass}">${cell}</td>`;
        });
        table += '</tr>';
      });
      table += '</tbody></table></div>';

      tableContainer.innerHTML = table;
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    loadFinancialData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv");
  </script>
</body>
</html>
