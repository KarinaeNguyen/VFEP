const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv";

async function loadFinancialData(url) {
  const chartContainer = document.getElementById('chartContainer');
  const spinner = chartContainer ? chartContainer.querySelector('.spinner') : null;
  const canvas = document.getElementById('cashFlowChart');

  function showLoading(isLoading) {
    if (spinner) spinner.style.display = isLoading ? 'block' : 'none';
    if (canvas) canvas.style.display = isLoading ? 'none' : 'block';
  }

  showLoading(true);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    const csvText = await response.text();

    if (typeof window.CSVParser === 'object' && typeof window.CSVParser.parse === 'function') {
      const data = window.CSVParser.parse(csvText);
      if (data && data.length > 0) {
        createChart(data);
        createTable(data);
        showLoading(false);
      } else {
        throw new Error("CSV data was empty or parsed incorrectly.");
      }
    } else {
      throw new Error("CSVParser.parse function not found.");
    }
  } catch (error) {
    console.error('Failed to load or parse financial data:', error);
    if (chartContainer) {
      chartContainer.innerHTML = `<div style="padding:20px;border:1px solid #fecaca;background:#fef2f2;color:#b91c1c;border-radius:8px;">
        <strong>Error:</strong> Failed to load financial data.
        <ul style="list-style-type:disc;margin-left:20px;margin-top:10px;">
          <li>Please check that the Google Sheet is 'Published to the web'.</li>
          <li>Ensure the CSV column headers (Year, Quarter, CashFlow, Balance) are correct.</li>
          <li>The link being used is: ${url}</li>
        </ul>
      </div>`;
    }
  }
}

function createChart(data) {
  const ctx = document.getElementById('cashFlowChart').getContext('2d');
  const labels = data.map(row => `${row['Year']} ${row['Quarter']}`);
  const cashFlow = data.map(row => parseFloat(row['CashFlow']));
  const cumulativeCash = data.map(row => parseFloat(row['Balance']));

  if (labels.length === 0 || cashFlow.some(isNaN) || cumulativeCash.some(isNaN)) {
    console.error("Data parsing error: Check your 'CashFlow' and 'Balance' columns for non-numeric data.");
    return;
  }

  const chartConfig = {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Quarterly Cash Flow',
          data: cashFlow,
          backgroundColor: '#4ade80',
          borderColor: '#4ade80',
          borderWidth: 1,
          yAxisID: 'yBar',
          order: 2
        },
        {
          label: 'Cumulative Balance',
          data: cumulativeCash,
          backgroundColor: '#38bdf8',
          borderColor: '#38bdf8',
          type: 'line',
          yAxisID: 'yLine',
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { color: '#374151' }, grid: { color: 'rgba(0,0,0,0.05)' } },
        yBar: {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          ticks: { color: '#374151', callback: v => `$${(v/1000).toFixed(0)}k` },
          grid: { color: 'rgba(0,0,0,0.05)' },
          title: { display: true, text: 'Quarterly Cash Flow', color: '#1f2937' }
        },
        yLine: {
          type: 'linear',
          position: 'right',
          beginAtZero: true,
          ticks: { color: '#374151', callback: v => `$${(v/1000).toFixed(0)}k` },
          grid: { display: false },
          title: { display: true, text: 'Cumulative Balance', color: '#1f2937' }
        }
      },
      plugins: {
        legend: { labels: { color: '#1f2937' } },
        tooltip: {
          callbacks: {
            label: ctx => {
              let label = ctx.dataset.label || '';
              if (label) label += ': ';
              if (ctx.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(ctx.parsed.y);
              }
              return label;
            }
          }
        }
      }
    }
  };

  new Chart(ctx, chartConfig);
}

function createTable(data) {
  const tableContainer = document.getElementById('financials-table-container');
  if (!tableContainer || data.length === 0) return;

  const headers = ['Year', 'Quarter', 'CashFlow', 'Balance'];
  let table = '<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200">';
  
  table += '<thead class="bg-gray-50"><tr>';
  headers.forEach(h => {
    table += `<th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${h}</th>`;
  });
  table += '</tr></thead>';

  table += '<tbody class="bg-white divide-y divide-gray-200">';
  data.forEach(row => {
    table += '<tr>';
    headers.forEach(h => {
      let cell = row[h];
      let cellClass = 'px-4 py-4 whitespace-nowrap text-sm text-gray-700';
      if (['CashFlow','Balance'].includes(h)) {
        const value = parseFloat(cell);
        if (!isNaN(value)) {
          cell = value.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:0,maximumFractionDigits:0});
          if (value < 0) cellClass = 'px-4 py-4 whitespace-nowrap text-sm text-red-500';
        }
      }
      table += `<td class="${cellClass}">${cell}</td>`;
    });
    table += '</tr>';
  });
  table += '</tbody></table></div>';

  tableContainer.innerHTML = table;
}

loadFinancialData(GOOGLE_SHEET_CSV_URL);
