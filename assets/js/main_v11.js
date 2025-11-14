/**
 * ===============================
 * Load Google Sheet Financial Data
 * ===============================
 */
window.loadFinancialData = function () {
    const loadingMsg = document.getElementById('financials-loading');
    const chartWrapper = document.getElementById('chart-wrapper');
    const tableWrapper = document.getElementById('table-wrapper');

    if (!loadingMsg || !chartWrapper || !tableWrapper) {
        console.error("Financial UI elements missing!");
        return;
    }

    const GOOGLE_SHEET_URL =
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv';

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(fetchAndRender);

    async function fetchAndRender() {
        try {
            const response = await fetch(GOOGLE_SHEET_URL);
            if (!response.ok) throw new Error("Failed to fetch Google Sheet");

            const csvText = await response.text();
            const data = parseCSV(csvText);

            console.log("--- PARSED CSV DATA ---");
            console.log(data);

            // Hiện UI
            loadingMsg.classList.add('hidden');
            chartWrapper.classList.remove('hidden');
            tableWrapper.classList.remove('hidden');

            // Đợi layout render xong (vì wrapper ban đầu hidden)
            setTimeout(() => {
                drawChart(data);
                createTable(data);
            }, 80);

        } catch (err) {
            console.error("Financial data load error:", err);
            loadingMsg.innerHTML =
                `<p class="text-red-600">Lỗi: Không thể tải dữ liệu tài chính.</p>`;
        }
    }
};


/**
 * ===============================
 * CSV PARSER
 * ===============================
 */
function parseCSV(text) {
    const lines = text.split('\n').map(l => l.trim());
    const data = [];

    for (const line of lines) {
        if (!line) continue;
        let row = [], current = '', inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') {
                if (line[i + 1] === '"') { current += '"'; i++; }
                else inQuotes = !inQuotes;
            } else if (ch === ',' && !inQuotes) {
                row.push(current.trim()); current = '';
            } else current += ch;
        }
        row.push(current.trim());
        data.push(row);
    }
    return data;
}

const cleanNumber = (value) => {
    if (!value) return 0;
    let neg = value.startsWith("(") && value.endsWith(")");
    let num = parseFloat(value.replace(/[$,()]/g, "")) || 0;
    return neg ? -num : num;
};


/**
 * ===============================
 * DRAW CHART
 * ===============================
 */
function drawChart(csvData) {
    try {
        // Find header row dynamically (first row with more than 1 column)
        const headersRow = csvData.find(r => r.length > 1);
        if (!headersRow) {
            document.getElementById('chart-wrapper').innerHTML =
                `<p class="text-red-600 p-4">Lỗi: Không tìm thấy tiêu đề trong Google Sheet.</p>`;
            return;
        }
        const headers = headersRow;

        // Find rows by category name
        const findRow = (keyword) =>
            csvData.find(r => r[0]?.trim().toUpperCase() === keyword) || [];

        const revenueRow = findRow("TOTAL CASH RECEIPTS");
        const costRow = findRow("TOTAL CASH PAID OUT");
        const netRow = findRow("NET CASHFLOW FOR PERIOD");
        const cumulativeRow = findRow("CASH BALANCE");

        // If any row missing, fill with zeros
        const safeRow = (row) => row.length ? row : headers.map(() => "0");

        const dataTable = new google.visualization.DataTable();
        dataTable.addColumn("string", "Quarter");
        dataTable.addColumn("number", "Total Revenue");
        dataTable.addColumn("number", "Total Cost");
        dataTable.addColumn("number", "Net Cashflow");
        dataTable.addColumn("number", "Cumulative Cash");

        let rowsAdded = 0;
        for (let i = 1; i < headers.length; i++) {
            dataTable.addRow([
                headers[i] || `Q${i}`,
                cleanNumber(safeRow(revenueRow)[i]),
                cleanNumber(safeRow(costRow)[i]),
                cleanNumber(safeRow(netRow)[i]),
                cleanNumber(safeRow(cumulativeRow)[i]),
            ]);
            rowsAdded++;
        }

        if (rowsAdded === 0) {
            document.getElementById('chart-wrapper').innerHTML =
                `<p class="text-red-600 p-4">Không có dữ liệu để hiển thị biểu đồ.</p>`;
            return;
        }

        const options = {
            title: "Dòng Tiền Lũy Kế & Dòng Tiền Ròng (USD)",
            seriesType: "bars",
            series: {
                2: { type: "line", lineWidth: 3 },
                3: { type: "line", lineWidth: 3 }
            },
            chartArea: { width: "85%", height: "70%" },
            legend: { position: "bottom" }
        };

        const chart = new google.visualization.ComboChart(
            document.getElementById("cashFlowChart")
        );
        chart.draw(dataTable, options);

    } catch (e) {
        console.error("Chart draw failed:", e);
        document.getElementById('chart-wrapper').innerHTML =
            `<p class="text-red-600 p-4">Lỗi: Không thể vẽ biểu đồ.</p>`;
    }
}


/**
 * ===============================
 * TABLE BUILDER
 * ===============================
 */
function createTable(csvData) {
    const headers = csvData[2];
    const tableHead = document.getElementById("financial-table-head");
    const tableBody = document.getElementById("financial-table-body");

    let headHTML = "<tr>";
    headers.forEach(h => headHTML += `<th class="px-4 py-3 font-semibold">${h}</th>`);
    headHTML += "</tr>";
    tableHead.innerHTML = headHTML;

    let bodyHTML = "";
    for (let i = 3; i < csvData.length; i++) {
        bodyHTML += "<tr>";
        csvData[i].forEach(cell => {
            bodyHTML += `<td class="px-4 py-3">${cell}</td>`;
        });
        bodyHTML += "</tr>";
    }
    tableBody.innerHTML = bodyHTML;
}


/**
 * ===============================
 * INITIALIZE APP
 * ===============================
 */
window.initializeApp = function () {
    console.log("Vicinity Safety Application Initialized.");
    window.loadFinancialData();
};
