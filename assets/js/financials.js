// ===============================
// FINANCIALS.JS – FINAL VERSION
// ===============================

// Globals
let cashFlowChart = null;

// Main loader
window.loadFinancialData = async function () {
  console.log("Financial module started...");

  showLoadingState();

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv";

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error("CSV unreachable");

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    console.log("CSV rows loaded:", rows);

    // Find the two row categories
    const netCashRow = rows.find(r => r.Category?.toUpperCase().includes("NET CASHFLOW"));
    const cashBalRow = rows.find(r => r.Category?.toUpperCase().includes("CASH BALANCE"));

    if (!netCashRow || !cashBalRow) {
      console.error("❌ Required rows missing in CSV.");
      showErrorFallback();
      return;
    }

    // Extract columns dynamically (all except "Category")
    const quarterKeys = Object.keys(netCashRow).filter(k => k !== "Category");

    // Build data arrays
    const netCashFlow = quarterKeys.map(k => toNumber(netCashRow[k]));
    const cashBalance = quarterKeys.map(k => toNumber(cashBalRow[k]));

    // Generate labels based on count
    const labels = quarterKeys.map((_, i) => {
      const year = 1 + Math.floor(i / 4);   // Y1 or Y2
      const q = 1 + (i % 4);                // Q1–Q4
      return `Y${year}-Q${q}`;
    });

    restoreCanvas();
    renderCashFlowChart(labels, netCashFlow, cashBalance);
    renderFinancialTable(labels, netCashFlow, cashBalance);

  } catch (err) {
    console.error("Financial load error:", err);
    showErrorFallback();
  }
};

// ------------------------------------------------------------
// CSV Parsing (correctly handles commas & quotes)
// ------------------------------------------------------------
function parseCSV(text) {
  const lines = text.trim().split("\n");
  const header = lines.shift().split(",").map(h => h.trim());

  return lines.map(line => {
    const cols = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g).map(val => {
      val = val.trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      return val;
    });

    const obj = {};
    header.forEach((h, i) => {
      obj[h] = cols[i]?.trim() ?? "";
    });
    return obj;
  });
}

function toNumber(val) {
  if (!val) return 0;
  return Number(val.replace(/[\$,]/g, "").trim()) || 0;
}

// ------------------------------------------------------------
// Chart Rendering
// ------------------------------------------------------------
function renderCashFlowChart(labels, netCashFlow, cashBalance) {
  const ctx = document.getElementById("cashFlowChart");
  if (!ctx) {
    console.error("Missing #cashFlowChart");
    return;
  }

  if (cashFlowChart) cashFlowChart.destroy();

  cashFlowChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Net Cashflow for Period",
          data: netCashFlow,
          borderWidth: 3,
          pointRadius: 4,
          tension: 0.35,
          fill: true
        },
        {
          label: "Cash Balance",
          data: cashBalance,
          borderWidth: 3,
          pointRadius: 4,
          tension: 0.35
        }
      ]
    },
    options: {
      responsive: true,
      animation: { duration: 900, easing: "easeOutQuart" },
      plugins: {
        legend: { position: "top" }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: v => "$" + v.toLocaleString()
          }
        }
      }
    }
  });
}

// ------------------------------------------------------------
// Table
// ------------------------------------------------------------
function renderFinancialTable(labels, netCashFlow, cashBalance) {
  const body = document.getElementById("financialTableBody");
  if (!body) return;

  body.innerHTML = labels
    .map((label, i) => {
      return `
        <tr class="fin-row">
          <td class="fin-col">${label}</td>
          <td class="fin-col">${formatUSD(netCashFlow[i])}</td>
          <td class="fin-col">${formatUSD(cashBalance[i])}</td>
        </tr>
      `;
    })
    .join("");
}

function formatUSD(num) {
  return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// ------------------------------------------------------------
// Loading & Error
// ------------------------------------------------------------
function showLoadingState() {
  const chartBox = document.getElementById("chartContainer");
  const tableBody = document.getElementById("financialTableBody");

  if (chartBox) chartBox.innerHTML = `<div class="spinner"></div>`;
  if (tableBody)
    tableBody.innerHTML = `${"<tr><td colspan='3' class='skeleton'></td></tr>".repeat(6)}`;
}

function restoreCanvas() {
  const chartBox = document.getElementById("chartContainer");
  if (chartBox) chartBox.innerHTML = `<canvas id="cashFlowChart"></canvas>`;
}

function showErrorFallback() {
  const chartBox = document.getElementById("chartContainer");
  const tableBody = document.getElementById("financialTableBody");

  if (chartBox)
    chartBox.innerHTML = `<div class="error-box">Failed to load financial data.</div>`;
  if (tableBody)
    tableBody.innerHTML = `<tr><td colspan="3" class="error-box">No data available</td></tr>`;
}
