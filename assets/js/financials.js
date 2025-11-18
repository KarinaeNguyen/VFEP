async function loadFinancialData(url) {
  // Find the chart container and spinner
  const chartContainer = document.getElementById('chartContainer');
  const spinner = chartContainer ? chartContainer.querySelector('.spinner') : null;

  function showLoading(isLoading) {
    if (spinner) {
      spinner.style.display = isLoading ? 'block' : 'none';
    }
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
      
      if (data && data.length > 0) {
        createChart(data);
        // createTable(data); // This is still disabled, as it needs a similar update
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
      // Display a user-friendly error message where the chart should be
      chartContainer.innerHTML = `<div style="padding: 20px; border: 1px solid #fecaca; background: #fef2f2; color: #b91c1c; border-radius: 8px;">
        <strong>Error:</strong> Failed to load financial data.
        <ul style="list-style-type: disc; margin-left: 20px; margin-top: 10px;">
          <li>Please check that the Google Sheet is 'Published to the web'.</li>
          <li>Ensure the CSV column headers (Year, Quarter, CashFlow, Balance) are correct.</li>
        </ul>
      </div>`;
    }
  }
}

function createChart(data) {
  // FIX 2: Use the correct canvas ID 'cashFlowChart'
  const ctx = document.getElementById('cashFlowChart').getContext('2d');
  
  // FIX 3: Use OBJECT KEYS from your provided header:
  // "YearQuarterGainLostCashFlowBalance"
  const labels = data.map(row => `${row['Year']} ${row['Quarter']}`); 
  const cashFlow = data.map(row => parseFloat(row['CashFlow']));
  const cumulativeCash = data.map(row => parseFloat(row['Balance']));

  // Check if data is valid
  if (labels.length === 0 || cashFlow.some(isNaN) || cumulativeCash.some(isNaN)) {
      console.error("Data parsing error: Check your 'CashFlow' and 'Balance' columns. They may contain non-numeric data.");
      // You could show an error on the canvas here
      return;
  }

  const chartConfig = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Quarterly Cash Flow', // This is just a label, the data is from 'CashFlow'
          data: cashFlow,
          backgroundColor: '#4ade80', // green-400
          borderColor: '#4ade80',
          borderWidth: 1,
          yAxisID: 'yBar',
          order: 2
        },
        {
          label: 'Cumulative Balance', // This is just a label, the data is from 'Balance'
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
            text: 'Cumulative Balance',
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
      let cellClass = 'px-4 py-4 whitespace-nowrawrap text-sm text-gray-700';
      
      // Simple currency formatting
      if (header === 'CashFlow' || header === 'Balance' || header === 'Gain' || header === 'Lost') {
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
