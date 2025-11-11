// financials.js

async function loadGoogleSheetCSV(sheetUrl) {
  try {
    const response = await fetch(sheetUrl);
    const text = await response.text();
    return parseCSV(text);
  } catch (err) {
    console.error("Error loading CSV:", err);
    return [];
  }
}

function renderChart(canvasId, labels, datasets, title) {
  const ctx = document.getElementById(canvasId);

  if (!ctx) {
    console.warn("Chart canvas not found:", canvasId);
    return;
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets,
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title,
          color: "#ffffff",
        },
        legend: {
          labels: { color: "#ffffff" },
        },
      },
      scales: {
        x: { ticks: { color: "#ffffff" } },
        y: { ticks: { color: "#ffffff" } },
      },
    },
  });
}

async function loadFinancialCharts() {
  const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv";

  const data = await loadGoogleSheetCSV(sheetURL);
  if (!data.length) return;

  const labels = data.map((row) => row.Year);

  renderChart(
    "revenueChart",
    labels,
    [
      {
        label: "Revenue",
        data: data.map((row) => row.Revenue),
        borderWidth: 2,
      },
    ],
    "Revenue Projection"
  );

  renderChart(
    "profitChart",
    labels,
    [
      {
        label: "Profit",
        data: data.map((row) => row.Profit),
        borderWidth: 2,
      },
    ],
    "Profit Projection"
  );

  // Optional future: cashflowChart
  if (document.getElementById("cashflowChart")) {
    renderChart(
      "cashflowChart",
      labels,
      [
        {
          label: "Cash Flow",
          data: data.map((row) => row.CashFlow || 0),
          borderWidth: 2,
        },
      ],
      "Cash Flow Projection"
    );
  }
}

document.addEventListener("DOMContentLoaded", loadFinancialCharts);
