// assets/js/main.js - Phiên bản 10+ (CSV robust, number formatting, table row highlight)

/**
 * window.loadFinancialData()
 * Tải và xử lý dữ liệu từ Google Sheet
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

            console.log("--- DEBUG: Parsed CSV Data ---", data);

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

/**
 * parseCSV()
 * Robust CSV parser (handles quotes, commas inside quotes, line endings)
 */
function parseCSV(text) {
    const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    const data = [];

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        const row = [];
        let currentVal = '';
        let inQuote = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (line[i + 1] === '"') {
                    currentVal += '"';
                    i++;
                } else {
                    inQuote = !inQuote;
                }
            } else if (char === ',' && !inQuote) {
                row.push(currentVal.trim());
                currentVal = '';
            } else {
                currentVal += char;
            }
        }
        row.push(currentVal.trim());
        data.push(row);
    }
    return data;
}

/**
 * cleanNumber()
 * Converts strings to numbers safely
 */
function cleanNumber(str) {
    if (!str) return 0;

    let isNegative = false;
    str = str.trim();

    if (str.startsWith('(') && str.endsWith(')')) {
        isNegative = true;
        str = str.slice(1, -1);
    }

    str = str.replace(/[\$,]/g, '');
    let num = parseFloat(str);
    if (isNaN(num)) num = 0;
    if (isNegative) num *= -1;

    return num;
}

/**
 * formatNumber()
 * Optional: format number with commas
 */
function formatNumber(num) {
    return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

/**
 * drawChart()
 * V10+ Chart drawing
 */
function drawChart(csvData) {
    try {
        const headers = csvData[3]; // Quarters header
        let revenueRow, costRow, netRow, cumulativeRow;

        for (const row of csvData) {
            const category = row[0] ? row[0].trim().toUpperCase() : '';

            if (category === "TOTAL CASH RECEIPTS") revenueRow = row;
            if (category === "TOTAL CASH PAID OUT") costRow = row;
            if (category === "NET CASHFLOW FOR PERIOD") netRow = row;
            if (category === "CASH BALANCE") cumulativeRow = row;
        }

        if (!revenueRow || !costRow || !netRow || !cumulativeRow) {
            console.error("Missing financial rows in CSV.");
            document.getElementById('chart-wrapper').innerHTML =
                '<p class="text-red-600 p-4">Lỗi: Dữ liệu Google Sheet bị thiếu hoặc sai định dạng.</p>';
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

        const options = {
            title: 'Dòng Tiền Lũy Kế & Dòng Tiền Ròng (USD)',
            fontName: 'Inter',
            vAxis: { title: 'Số Tiền (USD)', gridlines: { color: '#e5e7eb' }, format: 'short' },
            hAxis: { title: 'Quý' },
            seriesType: 'bars',
            series: {
                2: { type: 'line', color: '#ef4444', lineWidth: 3, pointSize: 6 },
                3: { type: 'line', color: '#10b981', lineWidth: 3, pointSize: 6 }
            },
            colors: ['#4338ca', '#a5b4fc'],
            legend: { position: 'bottom' },
            chartArea: { width: '85%', height: '70%' },
            animation: { startup: true, duration: 1000, easing: 'out' }
        };

        const chart = new google.visualization.ComboChart(document.getElementById('cashFlowChart'));
        chart.draw(dataTable, options);

    } catch (e) {
        console.error("Failed to draw chart:", e);
        document.getElementById('chart-wrapper').innerHTML =
            '<p class="text-red-600 p-4">Đã xảy ra lỗi khi vẽ biểu đồ. Vui lòng kiểm tra Console (F12).</p>';
    }
}

/**
 * createTable()
 * V10+ Table creation with numeric formatting & row highlight
 */
function createTable(csvData) {
    const tableHead = document.getElementById('financial-table-head');
    const tableBody = document.getElementById('financial-table-body');
    if (!tableHead || !tableBody) return;

    const headers = csvData[3];
    let headHtml = '<tr>';
    headers.forEach(header => {
        headHtml += `<th scope="col" class="px-4 py-3 text-left text-sm font-semibold text-indigo-700">${header}</th>`;
    });
    headHtml += '</tr>';
    tableHead.innerHTML = headHtml;

    let bodyHtml = '';
    for (let i = 4; i < csvData.length; i++) {
        const row = csvData[i];
        if (row.length < headers.length || !row[0]) continue;

        // Decide row color based on first numeric column
        const firstNumericIndex = 1; // e.g., Total Revenue column
        const keyNum = cleanNumber(row[firstNumericIndex]);
        let rowClass = '';
        if (keyNum > 0) rowClass = 'bg-green-50';
        else if (keyNum < 0) rowClass = 'bg-red-50';

        bodyHtml += `<tr class="${rowClass}">`;
        row.forEach((cell, index) => {
            if (index === 0) {
                bodyHtml += `<td class="px-4 py-3 text-sm font-medium text-neutral-900">${cell}</td>`;
            } else {
                const num = cleanNumber(cell);
                let colorClass = '';
                if (num > 0) colorClass = 'text-green-600';
                else if (num < 0) colorClass = 'text-red-600';
                else colorClass = 'text-neutral-700';

                bodyHtml += `<td class="px-4 py-3 text-sm ${colorClass}">${formatNumber(num)}</td>`;
            }
        });
        bodyHtml += '</tr>';
    }
    tableBody.innerHTML = bodyHtml;
}

/**
 * window.setupTabs()
 * Tab interaction
 */
window.setupTabs = function(containerId, buttonClass, contentClass) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tabButtons = container.querySelectorAll(`.${buttonClass}`);
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            document.querySelectorAll(`.${contentClass}`).forEach(content => content.classList.remove('active'));

            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    document.querySelectorAll(`.${contentClass}`).forEach(content => content.classList.remove('active'));
    tabButtons.forEach(btn => btn.classList.remove('active'));

    const firstButton = container.querySelector(`.${buttonClass}`);
    if (firstButton) {
        firstButton.classList.add('active');
        const targetId = firstButton.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add('active');
    }
};

/**
 * window.initializeApp()
 * App initialization
 */
window.initializeApp = function() {
    console.log("Vicinity Safety Application Initialized.");

    window.setupTabs('technology-tabs', 'tech-tab-btn', 'tech-tab-content');
    window.setupTabs('advantage-tabs', 'advantage-tab-btn', 'advantage-tab-content');
    window.setupTabs('market-tabs', 'market-tab-btn', 'market-tab-content');

    window.loadFinancialData();
};
