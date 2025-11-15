// financials.js – Final Version for New CSV Format (Year, Quarter, Gain, Lost, CashFlow, Balance)

let cashFlowChart = null;

window.loadFinancialData = async function () {
  console.log("Financial module started...");

  showLoadingState();

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv";

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error("Google Sheet is unreachable");

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    console.log("Parsed rows:", rows);

    const labels = rows.map(r => `${r.Year} ${r.Quarter}`);
    const gains = rows.map(r => toNumber(r.Gain));
    const lost = rows.map(r => toNumber(r.Lost));
    const cashflow = rows.map(r => toNumber(r.CashFlow));
    const balance = rows.map(r => toNumber(r.Balance));

    restoreCanvas();
    renderCashFlowChart(labels, gains, lost, cashflow, balance);
    renderFinancialTable(rows);
  } catch (error) {
    console.error("Financial load error:", error);
    showErrorFallback();
  }
};


// ------------------------------------------------------------
// CSV Parsing
// ------------------------------------------------------------
function parseCSV(text) {
  const lines = text.trim().split("\n");
  const header = lines.shift().split(",");

  return lines.map(line => {
    const cols = line
      .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
      .map(s => s.replace(/^"|"$/g, "").trim());

    const obj = {};
    header.forEach((h, i) => {
      obj[h.trim()] = cols[i] ?? "";
    });
    return obj;
  });
}

function toNumber(val) {
  if (!val) return 0;
  return Number(val.replace(/[\$,]/g, "").replace(/,/g, "").trim()) || 0;
}


// ------------------------------------------------------------
// Chart Rendering
// ------------------------------------------------------------
function renderCashFlowChart(labels, gains, lost, cashflow, balance) {
  const ctx = document.getElementById("cashFlowChart");
  if (!ctx) return;

  if (cashFlowChart) cashFlowChart.destroy();

  cashFlowChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Gain",
          data: gains,
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 4
        },
        {
          label: "Lost",
          data: lost,
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.35
        },
        {
          label: "Cash Flow",
          data: cashflow,
          borderWidth: 3,
          pointRadius: 4,
          fill: true,
          tension: 0.35
        },
        {
          label: "Balance",
          data: balance,
          borderWidth: 2,
          tension: 0.35
        }
      ]
    },
    options: {
      responsive: true,
      animation: { duration: 1000, easing: "easeOutQuart" },
      plugins: { legend: { position: "top" } },
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
// Table Rendering
// ------------------------------------------------------------
function renderFinancialTable(rows) {
  const body = document.getElementById("financialTableBody");
  if (!body) return;

  body.innerHTML = rows
    .map(
      r => `
      <tr class="fin-row">
        <td class="fin-col">${r.Year} ${r.Quarter}</td>
        <td class="fin-col">${formatUSD(r.Gain)}</td>
        <td class="fin-col">${formatUSD(r.Lost)}</td>
        <td class="fin-col">${formatUSD(r.CashFlow)}</td>
        <td class="fin-col">${formatUSD(r.Balance)}</td>
      </tr>`
    )
    .join("");
}

function formatUSD(val) {
  return toNumber(val).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}


// ------------------------------------------------------------
// UI States
// ------------------------------------------------------------
function showLoadingState() {
  const chartBox = document.getElementById("chartContainer");
  const tableBody = document.getElementById("financialTableBody");

  if (chartBox) {
    chartBox.innerHTML = `<div class="spinner"></div>`;
  }

  if (tableBody) {
    tableBody.innerHTML = `${"<tr><td colspan='5' class='skeleton'></td></tr>".repeat(6)}`;
  }
}

function restoreCanvas() {
  const chartBox = document.getElementById("chartContainer");
  if (chartBox) {
    chartBox.innerHTML = `<canvas id="cashFlowChart"></canvas>`;
  }
}

function showErrorFallback() {
  const chartBox = document.getElementById("chartContainer");
  const tableBody = document.getElementById("financialTableBody");

  if (chartBox) {
    chartBox.innerHTML = `<div class="error-box">Failed to load financial data.</div>`;
  }

  if (tableBody) {
    tableBody.innerHTML = `<tr><td colspan="5" class="error-box">No financial data available.</td></tr>`;
  }
}
