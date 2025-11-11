// financials.js

/**
 * Fetches and parses CSV data from a Google Sheet.
 * Adds a cache-busting parameter to ensure fresh data is loaded.
 */
async function loadGoogleSheetCSV(sheetUrl) {
  try {
    // Add a cache-busting query parameter to ensure fresh data
    const url = new URL(sheetUrl);
    url.searchParams.append('t', new Date().getTime());

    const response = await fetch(url);
    const text = await response.text();
    return parseCSV(text);
  } catch (err) {
    console.error("Error loading CSV:", err);
    return [];
  }
}

/**
 * Renders a Chart.js chart, styled for the new "Google Site" theme.
 */
function renderChart(canvasId, labels, datasets, title) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) {
    console.warn("Chart canvas not found:", canvasId);
    return;
  }

  // 1. DESTROY EXISTING CHART
  // This allows the function to be called multiple times (e.g., on tab switch)
  const existingChart = Chart.getChart(canvasId);
  if (existingChart) {
    existingChart.destroy();
  }

  // 2. GET STYLES FROM NEW CSS
  // This ensures charts match the new "Google Site" theme
  const style = getComputedStyle(document.documentElement);
  const primaryColor = style.getPropertyValue('--text-primary').trim();
  const secondaryColor = style.getPropertyValue('--text-secondary').trim();
  const borderColor = style.getPropertyValue('--border-color').trim();

  // 3. RENDER NEW CHART
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          color: primaryColor, // Updated color
          font: { size: 16 }
        },
        legend: {
          labels: { color: secondaryColor }, // Updated color
        },
      },
      scales: {
        x: {
          ticks: { color: secondaryColor }, // Updated color
          grid: { color: borderColor } // Updated color
        },
        y: {
          ticks: { color: secondaryColor }, // Updated color
          grid: { color: borderColor } // Updated color
        },
      },
    },
  });
}

/**
 * Main function to load all financial data and render charts.
 */
async function loadFinancialCharts() {
  const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv";

  const data = await loadGoogleSheetCSV(sheetURL);
  if (!data.length) return;

  const labels = data.map((row) => row.Year);
  const style = getComputedStyle(document.documentElement);
  const accentBlue = style.getPropertyValue('--accent-blue').trim();

  // Define datasets with new theme colors
  const revenueDataset = {
    label: "Revenue",
    data: data.map((row) => row.Revenue),
    borderColor: accentBlue,
    backgroundColor: accentBlue + '33', // 20% opacity
    borderWidth: 2,
    tension: 0.1
  };
  
  const profitDataset = {
    label: "Profit",
    data: data.map((row) => row.Profit),
    borderColor: '#34A853', // Google Green
    backgroundColor: '#34A85333',
    borderWidth: 2,
    tension: 0.1
  };

  const cashflowDataset = {
    label: "Cash Flow",
    data: data.map((row) => row.CashFlow || 0),
    borderColor: '#FBBC05', // Google Yellow
    backgroundColor: '#FBBC0533',
    borderWidth: 2,
    tension: 0.1
  };

  // Render all charts
  renderChart("revenueChart", labels, [revenueDataset], "Revenue Projection");
  renderChart("profitChart", labels, [profitDataset], "Profit Projection");
  
  if (document.getElementById("cashflowChart")) {
    renderChart("cashflowChart", labels, [cashflowDataset], "Cash Flow Projection");
  }
}

// 4. EXPORT THE FUNCTION
// We remove the 'DOMContentLoaded' listener.
// Now, your 'importSections.js' or 'tabs.js' can call 'loadFinancialCharts()'
// whenever the financials section is made visible.
window.loadFinancialCharts = loadFinancialCharts;
