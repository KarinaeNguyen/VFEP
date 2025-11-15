// financials.js – Upgraded Professional Edition
// ------------------------------------------------------------
// Features:
// ✔ Modern Chart.js styling
// ✔ Animated chart load
// ✔ Professional financial table styling
// ✔ Loading spinner + table skeleton
// ✔ Graceful fallback if CSV fails
// ✔ Compatible with window.getTranslation()
// ------------------------------------------------------------

window.loadFinancialData = async function () {
    console.log("Financial module started...");

    // Show loading animations
    showLoadingState();

    const csvUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv";

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Google Sheet is unreachable");

        const csvText = await response.text();
        const rows = parseCSV(csvText);

        const labels = rows.map(r => r.Quarter);
        const cashFlow = rows.map(r => toNumber(r.CashFlow));
        const revenue = rows.map(r => toNumber(r.Revenue));
        const expenses = rows.map(r => toNumber(r.Expenses));

        renderCashFlowChart(labels, cashFlow, revenue, expenses);
        renderFinancialTable(rows);

        hideLoadingState();

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
    const head = lines.shift().split(",");

    return lines.map(line => {
        const cols = line.split(",");
        const obj = {};
        head.forEach((h, i) => obj[h.trim()] = cols[i]?.trim());
        return obj;
    });
}

function toNumber(val) {
    if (!val) return 0;
    return Number(val.replace(/,/g, "")) || 0;
}


// ------------------------------------------------------------
// Chart Rendering
// ------------------------------------------------------------
function renderCashFlowChart(labels, cashFlow, revenue, expenses) {
    const ctx = document.getElementById("cashFlowChart");
    if (!ctx) return console.error("#cashFlowChart missing.");

    new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: window.getTranslation("cash_flow_projection") || "Cash Flow",
                    data: cashFlow,
                    borderWidth: 3,
                    pointRadius: 4,
                    fill: true,
                    tension: 0.35
                },
                {
                    label: window.getTranslation("revenue") || "Revenue",
                    data: revenue,
                    borderDash: [5, 5],
                    borderWidth: 2,
                    tension: 0.35
                },
                {
                    label: window.getTranslation("expenses") || "Expenses",
                    data: expenses,
                    borderWidth: 2,
                    tension: 0.35
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: "easeOutQuart"
            },
            plugins: {
                legend: { position: "top" }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => "$" + value.toLocaleString()
                    }
                }
            }
        }
    });
}


// ------------------------------------------------------------
// Financial Table Rendering
// ------------------------------------------------------------
function renderFinancialTable(rows) {
    const body = document.getElementById("financialTableBody");
    if (!body) return;

    body.innerHTML = rows.map(r => `
        <tr class="fin-row">
            <td class="fin-col">${r.Quarter}</td>
            <td class="fin-col">${formatUSD(r.Revenue)}</td>
            <td class="fin-col">${formatUSD(r.Expenses)}</td>
            <td class="fin-col">${formatUSD(r.CashFlow)}</td>
        </tr>
    `).join("");
}

function formatUSD(num) {
    num = toNumber(num);
    return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
}


// ------------------------------------------------------------
// Loading, Skeleton & Fallback
// ------------------------------------------------------------
function showLoadingState() {
    const chartBox = document.getElementById("chartContainer");
    const tableBody = document.getElementById("financialTableBody");

    if (chartBox) {
        chartBox.innerHTML = `<div class="spinner"></div>`;
    }

    if (tableBody) {
        tableBody.innerHTML = `
            ${"<tr><td colspan='4' class='skeleton'></td></tr>".repeat(6)}
        `;
    }
}

function hideLoadingState() {
    // automatically replaced after render
}

function showErrorFallback() {
    const chartBox = document.getElementById("chartContainer");
    const tableBody = document.getElementById("financialTableBody");

    if (chartBox) {
        chartBox.innerHTML = `
            <div class="error-box">Failed to load financial data.</div>
        `;
    }

    if (tableBody) {
        tableBody.innerHTML = `
            <tr><td colspan="4" class="error-box">No financial data available.</td></tr>
        `;
    }
}
