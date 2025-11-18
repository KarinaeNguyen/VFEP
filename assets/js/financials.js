async function loadFinancialData(url) {
  // Find the loading spinner, which is now inside the chartContainer
  const chartContainer = document.getElementById('chartContainer');
  const spinner = chartContainer ? chartContainer.querySelector('.spinner') : null;

  function showLoading(isLoading) {
    if (spinner) {
      spinner.style.display = isLoading ? 'block' : 'none';
    }
    // Also hide/show the canvas itself
    const canvas = document.getElementById('cashFlowChart');
    if (canvas) {
      canvas.style.display = isLoading ? 'none' : 'block';
    }
  }

  showLoading(true);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const csvText = await response.text();
    
    // FIX 1: Use the correct CSVParser object
    if (typeof window.CSVParser === 'object' && typeof window.CSVParser.parse === 'function') {
      const data = window.CSVParser.parse(csvText);
      
      // Check if data was parsed correctly
      if (data && data.length > 0) {
        createChart(data);
        // createTable(data); // You can re-enable this if you fix the table part too
        showLoading(false); // Hide loading *after* chart is created
      } else {
        throw new Error("CSV data was empty or parsed incorrectly.");
      }
      
    } else {
      console.error("CSVParser.parse function not found. Did csvParser.js load?");
      throw new Error("CSVParser not found.");
    }

  } catch (error) {
    console.error('Failed to load or parse financial data:', error);
    if (chartContainer) {
      chartContainer.innerHTML = `<div class="error-box">Error: Failed to load financial data. Please check the CSV link and data format.</div>`;
    }
  }
  // Note: showLoading(false) is now handled on success, error is handled by replacing HTML
}

function createChart(data) {
  // FIX 2: Use the correct canvas ID 'cashFlowChart'
  const ctx = document.getElementById('cashFlowChart').getContext('2d');
  
  // FIX 3: Use OBJECT KEYS (from your screenshot) instead of array indices
  // We skip the header row, which csvParser.js does automatically.
  const labels = data.map(row => `${row['Year']} ${row['Quarter']}`); 
  const cashFlow = data.map(row => parseFloat(row['Quarterly Cash Flow']));
  const cumulativeCash = data.map(row => parseFloat(row['Cumulative Cash Position']));

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
          ticks: { color: '#374151' }, // Darker text for gray-100 bg
          grid: { color: 'rgba(0, 0, 0, 0.05)' }
        },
        yBar: {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          ticks: { 
            color: '#374151',
            callback: value => `$${(value / 1000).toFixed(0)}k`
          },
          grid: { color: 'rgba(0, 0, 0, 0.05)' },
          title: {
            display: true,
            text: 'Quarterly Cash Flow',
            color: '#1f2937'
          }
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
          title: {
            display: true,
            text: 'Cumulative Cash',
            color: '#1f2937'
          }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#1f2937' } // Darker text for legend
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

// NOTE: The createTable function is still using the old array logic.
// It will need to be updated just like createChart if you want to use it.
function createTable(data) {
  const tableContainer = document.getElementById('financials-table-container');
  if (!tableContainer) return;

  // This function is now broken because 'data' is an array of objects, not arrays.
  // It needs to be rewritten to use object keys.
  console.warn("createTable() function is not yet updated for the new object-based data structure.");
  
  /* // Example of how to fix createTable:
  
  if (data.length === 0) return;

  const headers = Object.keys(data[0]); // Get headers from object keys
  
  let table = '<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200">';
  
  // Header
  table += '<thead class="bg-gray-50"><tr>';
  headers.forEach(header => {
    table += `<th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${header}</th>`;
  });
  table += '</tr></thead>';

  // Body
  table += '<tbody class="bg-white divide-y divide-gray-200">';
  data.forEach(rowObject => {
    table += '<tr>';
    headers.forEach(header => {
      let cell = rowObject[header];
      let cellClass = 'px-4 py-4 whitespace-nowrap text-sm text-gray-700';
      
      // Simple currency formatting (you can make this more robust)
      if (header === 'Quarterly Cash Flow' || header === 'Cumulative Cash Position' || header === 'Revenue') {
         const value = parseFloat(cell);
         if (!isNaN(value)) {
           cell = value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
           if (value < 0) {
             cellClass = 'px-4 py-4 whitespace-nowrap text-sm text-red-500';
           }
         }
      }
      table += `<td class="${cellClass}">${cell}</td>`;
    });
    table += '</tr>';
  });
  table += '</tbody></table></div>';
  
  tableContainer.innerHTML = table;
  */
}
