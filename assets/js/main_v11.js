/**
 * window.loadFinancialData()
 * Hàm này tải và xử lý dữ liệu từ Google Sheet.
 */
window.loadFinancialData = function() {
    const loadingMsg = document.getElementById('financials-loading');
    const chartWrapper = document.getElementById('chart-wrapper');
    const tableWrapper = document.getElementById('table-wrapper');

    if (!loadingMsg || !chartWrapper || !tableWrapper) {
        console.error("Financial elements not found. Skipping data load.");
        return;
    }

    const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv';

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(fetchAndDraw);

    async function fetchAndDraw() {
        try {
            const response = await fetch(GOOGLE_SHEET_URL);
            if (!response.ok) throw new Error('Network response was not ok');

            const csvText = await response.text();
            const data = parseCSV(csvText);

            console.log("--- DEBUG: Parsed CSV Data ---");
            console.log(data);

            loadingMsg.classList.add('hidden');
            chartWrapper.classList.remove('hidden');
            tableWrapper.classList.remove('hidden');

            drawChart(data);
            createTable(data);

            console.log("Google Sheet data loaded and rendered successfully.");
        } catch (error) {
            console.error('Error loading or parsing Google Sheet data:', error);
            loadingMsg.innerHTML = '<p class="text-red-600">Lỗi: Không thể tải dữ liệu tài chính.</p>';
        }
    }
};


/* -------------------- CSV PARSER -------------------- */
function parseCSV(text) {
    const lines = text.split('\n').map(line => line.trim());
    const data = [];

    for (const line of lines) {
        if (!line) continue;
        const row = [];
        let currentVal = '';
        let inQuote = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (line[i+1] === '"') { currentVal += '"'; i++; }
                else inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                row.push(currentVal.trim());
                currentVal = '';
            } else currentVal += char;
        }
        row.push(currentVal.trim());
        data.push(row);
    }
    return data;
}


const cleanNumber = (str) => {
    if (!str) return 0;
    let isNegative = false;
    if (str.startsWith('(') && str.endsWith(')')) isNegative = true;
    let num = parseFloat(str.replace(/[\$,\(\),]/g, '')) || 0;
    return isNegative ? -num : num;
};


/* -------------------- DRAW CHART -------------------- */
function drawChart(csvData) {
    try {
        const headers = csvData[2]; 
        console.log("--- DEBUG Headers:", headers);

        let revenueRow, costRow, netRow, cumulativeRow;
        for (const row of csvData) {
            const category = row[0]?.trim().toUpperCase() || "";
            if (category === "TOTAL CASH RECEIPTS") revenueRow = row;
            if (category === "TOTAL CASH PAID OUT") costRow = row;
            if (category === "NET CASHFLOW FOR PERIOD") netRow = row;
            if (category === "CASH BALANCE") cumulativeRow = row;
        }

        if (!revenueRow || !costRow || !netRow || !cumulativeRow) {
            document.getElementById('chart-wrapper').innerHTML =
                '<p class="text-red-600 p-4">Lỗi: Thiếu hàng dữ liệu cần thiết trong bảng.</p>';
            return;
        }

        const dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Quarter');
        dataTable.addColumn('number', 'Total Revenue');
        dataTable.addColumn('number', 'Total Cost');
        dataTable.addColumn('number', 'Net Cashflow');
        dataTable.addColumn('number', 'Cumulative Cash');

        for (let i = 1; i < headers.length; i++) {
            const quarter = headers[i];
            if (!quarter) continue;
            dataTable.addRow([
                quarter,
                cleanNumber(revenueRow[i]),
                cleanNumber(costRow[i]),
                cleanNumber(netRow[i]),
                cleanNumber(cumulativeRow[i])
            ]);
        }

        const chart = new google.visualization.ComboChart(document.getElementById('cashFlowChart'));

        chart.draw(dataTable, {
            title: 'Dòng Tiền Lũy Kế & Dòng Tiền Ròng (USD)',
            seriesType: 'bars',
            series: {
                2: { type: 'line' },
                3: { type: 'line' }
            }
        });

    } catch (e) {
        console.error("Chart draw failed:", e);
    }
}


/* -------------------- CREATE TABLE -------------------- */
function createTable(csvData) {
    const tableHead = document.getElementById('financial-table-head');
    const tableBody = document.getElementById('financial-table-body');

    const headers = csvData[2];
    let headHtml = '<tr>';
    headers.forEach(h => headHtml += `<th class="px-4 py-3 font-semibold">${h}</th>`);
    headHtml += '</tr>';
    tableHead.innerHTML = headHtml;

    let bodyHtml = '';
    for (let i = 3; i < csvData.length; i++) {
        bodyHtml += '<tr>';
        csvData[i].forEach((cell, index) => {
            bodyHtml += `<td class="px-4 py-3">${cell}</td>`;
        });
        bodyHtml += '</tr>';
    }
    tableBody.innerHTML = bodyHtml;
}


/* -------------------- INITIALIZE APP -------------------- */
window.initializeApp = function() {
    console.log("Vicinity Safety Application Initialized.");
    window.loadFinancialData();
};
