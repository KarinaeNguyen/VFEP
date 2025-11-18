async function loadFinancialData(url) {
  const loadingOverlay = document.getElementById('loading-overlay');
  
  function showLoading(isLoading) {
    if (loadingOverlay) {
      loadingOverlay.style.display = isLoading ? 'flex' : 'none';
    }
  }

  showLoading(true);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const csvText = await response.text();
    
    if (typeof window.CSVParser === 'object' && typeof window.CSVParser.parse === 'function') {
      const data = window.CSVParser.parse(csvText);
      createChart(data);
      createTable(data);
    } else {
      console.error("CSVParser.parse function not found. Did csvParser.js load?");
    }

  } catch (error) {
    console.error('Failed to load or parse financial data:', error);
    if (loadingOverlay) {
      loadingOverlay.innerHTML = `<p class="text-red-400">Error loading financial data.</p>`;
    }
  } finally {
    showLoading(false);
  }
}

function createChart(data) {
  const ctx = document.getElementById('cashFlowChart').getContext('2d');
  
  const labels = data.slice(1).map(row => `${row[0]} ${row[1]}`); // e.g., "Year 1 Q1"
  const revenues = data.slice(1).map(row => parseFloat(row[7]));
  const cashFlow = data.slice(1).map(row => parseFloat(row[8]));
  const cumulativeCash = data.slice(1).map(row => parseFloat(row[9]));

  const chartConfig = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Quarterly Cash Flow',
          data: cashFlow,
          backgroundColor: '#4ade80', // green-400
          borderColor: '#4ade80',
          borderWidth: 1,
          yAxisID: 'yBar',
          order: 2
        },
        {
          label: 'Cumulative Cash Position',
          data: cumulativeCash,
          backgroundColor: '#38bdf8', // sky-400
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
        x: {
          ticks: { color: '#9ca3af' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        yBar: {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          ticks: { 
            color: '#9ca3af',
            callback: value => `$${(value / 1000).toFixed(0)}k`
          },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          title: {
            display: true,
            text: 'Quarterly Cash Flow',
            color: '#9ca3af'
          }
        },
        yLine: {
          type: 'linear',
          position: 'right',
          beginAtZero: true,
          ticks: { 
            color: '#9ca3af',
            callback: value => `$${(value / 1000).toFixed(0)}k`
          },
          grid: { display: false },
          title: {
            display: true,
            text: 'Cumulative Cash',
            color: '#9ca3af'
          }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#e5e7eb' }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      }
    }
  };

  const chart = new Chart(ctx, chartConfig);
}

function createTable(data) {
  const tableContainer = document.getElementById('financials-table-container');
  if (!tableContainer) return;

  const headers = data[0];
  const rows = data.slice(1);

  let table = '<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-700">';
  
  // Header
  table += '<thead class="bg-gray-800"><tr>';
  headers.forEach(header => {
    table += `<th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">${header}</th>`;
  });
  table += '</tr></thead>';

  // Body
  table += '<tbody class="bg-gray-900 divide-y divide-gray-700">';
  rows.forEach(row => {
    table += '<tr>';
    row.forEach((cell, index) => {
      let cellClass = 'px-4 py-4 whitespace-nowrap text-sm text-gray-300';
      // Format currency columns
      if (index >= 2) {
        const value = parseFloat(cell);
        if (!isNaN(value)) {
          cell = value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
          if (value < 0) {
            cellClass = 'px-4 py-4 whitespace-nowrap text-sm text-red-400';
          }
        }
      }
      table += `<td class="${cellClass}">${cell}</td>`;
    });
    table += '</tr>';
  });
  table += '</tbody></table></div>';
  
  tableContainer.innerHTML = table;
}
