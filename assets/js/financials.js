(() => {
  const sampleCsv = `
Quarter,Revenue,Expenses
Y1-Q1,25000,18000
Y1-Q2,32000,21000
Y1-Q3,42000,26000
Y1-Q4,60000,32000
Y2-Q1,75000,38000
Y2-Q2,90000,45000
Y2-Q3,110000,52000
Y2-Q4,135000,63000
`;

  let financialDataCache = [];
  let chartInstance = null;

  function buildDataset(rows) {
    return rows.map((row) => {
      const revenue = Number(row.Revenue) || 0;
      const expenses = Number(row.Expenses) || 0;
      return {
        quarter: row.Quarter || '',
        revenue,
        expenses,
        cashFlow: revenue - expenses
      };
    });
  }

  function renderChart(data) {
    const ctx = document.getElementById('cashFlowChart');
    if (!ctx || typeof Chart === 'undefined') return;

    if (chartInstance) chartInstance.destroy();

    const lang = window.appLanguage || 'vi';
    const label = window.getTranslation(lang, 'fin_chart_dataset_label') || 'Net cash flow';

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((item) => item.quarter),
        datasets: [
          {
            label,
            data: data.map((item) => item.cashFlow),
            borderColor: '#4338ca',
            backgroundColor: 'rgba(67, 56, 202, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: (value) => `$${value.toLocaleString()}`
            }
          }
        }
      }
    });
  }

  function renderTable(data) {
    const headEl = document.getElementById('financial-table-head');
    const bodyEl = document.getElementById('financial-table-body');
    if (!headEl || !bodyEl) return;

    const lang = window.appLanguage || 'vi';
    const headers = [
      window.getTranslation(lang, 'fin_table_header_quarter') || 'Quarter',
      window.getTranslation(lang, 'fin_table_header_revenue') || 'Revenue (USD)',
      window.getTranslation(lang, 'fin_table_header_expenses') || 'Expenses (USD)',
      window.getTranslation(lang, 'fin_table_header_cashflow') || 'Cash Flow (USD)'
    ];

    headEl.innerHTML = `
      <tr>
        ${headers.map((text) => `<th class="px-4 py-3 text-left text-sm font-semibold text-indigo-800">${text}</th>`).join('')}
      </tr>
    `;

    bodyEl.innerHTML = data
      .map(
        (item) => `
      <tr class="hover:bg-neutral-50">
        <td class="px-4 py-3 text-sm font-medium text-neutral-800">${item.quarter}</td>
        <td class="px-4 py-3 text-sm text-neutral-600">$${item.revenue.toLocaleString()}</td>
        <td class="px-4 py-3 text-sm text-neutral-600">$${item.expenses.toLocaleString()}</td>
        <td class="px-4 py-3 text-sm font-semibold text-indigo-700">$${item.cashFlow.toLocaleString()}</td>
      </tr>
    `
      )
      .join('');
  }

  function toggleVisibility(show = false) {
    const loading = document.getElementById('financials-loading');
    const chartWrapper = document.getElementById('chart-wrapper');
    const tableWrapper = document.getElementById('table-wrapper');

    if (loading) loading.classList.toggle('hidden', show);
    if (chartWrapper) chartWrapper.classList.toggle('hidden', !show);
    if (tableWrapper) tableWrapper.classList.toggle('hidden', !show);
  }

  async function loadFinancials() {
    const rows = CSVParser.parse(sampleCsv);
    financialDataCache = buildDataset(rows);
    toggleVisibility(true);
    renderChart(financialDataCache);
    renderTable(financialDataCache);
  }

  function handleLanguageChange() {
    if (!financialDataCache.length) return;
    renderChart(financialDataCache);
    renderTable(financialDataCache);
  }

  window.addEventListener('app-language-changed', handleLanguageChange);
  window.loadFinancials = loadFinancials;
})();
