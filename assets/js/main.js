// assets/js/main.js - Phiên bản 4 (Sửa lỗi đọc số âm '($100,000)')

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
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const csvText = await response.text();
            
            const data = parseCSV(csvText);
            
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
 * Chuyển đổi văn bản CSV thành mảng 2D.
 */
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
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                row.push(currentVal.trim().replace(/"/g, '')); 
                currentVal = '';
            } else {
                currentVal += char;
            }
        }
        row.push(currentVal.trim().replace(/"/g, '')); 
        data.push(row);
    }
    return data;
}

/**
 * drawChart()
 * Vẽ biểu đồ cột và đường bằng Google Charts.
 */
function drawChart(csvData) {
    
    // --- SỬA LỖI ĐỌC SỐ (V4 - RẤT QUAN TRỌNG) ---
    // Hàm (v4) này đã có thể đọc định dạng số âm ($100,000)
    const cleanNumber = (str) => {
        if (!str) return 0;

        let isNegative = false;
        // 1. Kiểm tra xem có phải là số âm (dạng ngoặc đơn) không
        if (str.startsWith('(') && str.endsWith(')')) {
            isNegative = true;
        }
        
        // 2. Xóa tất cả các ký tự $, ,, (, )
        // Ví dụ: "($100,000)" -> "100000"
        let numStr = str.replace(/[\$,\(\)]/g, ''); 

        // 3. Chuyển đổi thành số
        let num = parseFloat(numStr) || 0;

        // 4. Áp dụng dấu âm nếu có
        if (isNegative) {
            num = num * -1;
        }

        return num;
    };
    // ------------------------------------

    const dataTable = new google.visualization.DataTable();
    const headers = csvData[0]; 
    
    dataTable.addColumn('string', headers[0]); // Quý
    dataTable.addColumn('number', headers[1]); // Doanh thu
    dataTable.addColumn('number', headers[2]); // Chi phí
    dataTable.addColumn('number', headers[3]); // Dòng tiền ròng
    dataTable.addColumn('number', headers[4]); // Dòng tiền lũy kế

    // Thêm các hàng (Data)
    for (let i = 1; i < csvData.length; i++) {
        const row = csvData[i];
        if (row.length < headers.length) continue; 

        dataTable.addRow([
            row[0], 
            cleanNumber(row[1]), // Áp dụng hàm cleanNumber (v4)
            cleanNumber(row[2]), // Áp dụng hàm cleanNumber (v4)
            cleanNumber(row[3]), // Áp dụng hàm cleanNumber (v4)
            cleanNumber(row[4])  // Áp dụng hàm cleanNumber (v4)
        ]);
    }

    const options = {
        title: 'Dòng Tiền Lũy Kế & Dòng Tiền Ròng (USD)',
        fontName: 'Inter', 
        vAxis: {
            title: 'Số Tiền (USD)', 
            gridlines: {color: '#e5e7eb'},
            format: 'short' 
        },
        hAxis: {title: 'Quý'},
        seriesType: 'bars', 
        series: {
            2: { type: 'line', color: '#ef4444', lineWidth: 3, pointSize: 6 }, // Dòng tiền ròng (Đỏ)
            3: { type: 'line', color: '#10b981', lineWidth: 3, pointSize: 6 }  // Dòng tiền lũy kế (Xanh)
        },
        colors: ['#4338ca', '#a5b4fc'], // Doanh thu (Đậm), Chi phí (Nhạt)
        legend: { position: 'bottom' }, 
        chartArea: {width: '85%', height: '70%'}, 
        animation: {
            startup: true,
            duration: 1000,
            easing: 'out',
        },
    };

    const chart = new google.visualization.ComboChart(document.getElementById('cashFlowChart'));
    chart.draw(dataTable, options);
}

/**
 * createTable()
 * Tạo bảng HTML từ dữ liệu CSV (Dữ liệu thô).
 */
function createTable(csvData) {
    const tableHead = document.getElementById('financial-table-head');
    const tableBody = document.getElementById('financial-table-body');
    
    if (!tableHead || !tableBody) return;

    // Tạo Header
    let headHtml = '<tr>';
    const headers = csvData[0];
    headers.forEach(header => {
        headHtml += `<th scope="col" class="px-4 py-3 text-left text-sm font-semibold text-indigo-700">${header}</th>`;
    });
    headHtml += '</tr>';
    tableHead.innerHTML = headHtml;

    // Tạo Body
    let bodyHtml = '';
    for (let i = 1; i < csvData.length; i++) {
        const row = csvData[i];
        if (row.length < headers.length) continue; 
        
        bodyHtml += '<tr>';
        row.forEach((cell, index) => {
            if (index === 0) { 
                bodyHtml += `<td class="px-4 py-3 text-sm font-medium text-neutral-900">${cell}</td>`;
            } else { 
                bodyHtml += `<td class="px-4 py-3 text-sm text-neutral-700">${cell}</td>`;
            }
        });
        bodyHtml += '</tr>';
    }
    tableBody.innerHTML = bodyHtml;
}


/**
 * window.setupTabs()
 * Hàm chung để xử lý việc chuyển đổi tab tương tác.
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
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    document.querySelectorAll(`.${contentClass}`).forEach(content => content.classList.remove('active'));
    tabButtons.forEach(btn => btn.classList.remove('active'));

    const firstButton = container.querySelector(`.${buttonClass}`);
    if (firstButton) {
        firstButton.classList.add('active'); 
        const targetId = firstButton.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
             targetContent.classList.add('active'); 
        }
    }
};


/**
 * window.initializeApp()
 * Hàm khởi tạo chính.
 */
window.initializeApp = function() {
    console.log("Vicinity Safety Application Initialized.");

    // --- 1. KHỞI TẠO TABS ---
    window.setupTabs('technology-tabs', 'tech-tab-btn', 'tech-tab-content');
    window.setupTabs('advantage-tabs', 'advantage-tab-btn', 'advantage-tab-content');
    window.setupTabs('market-tabs', 'market-tab-btn', 'market-tab-content');

    // --- 2. TẢI DỮ LIỆU TÀI CHÍNH ---
    window.loadFinancialData();
};
