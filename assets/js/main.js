// assets/js/main.js - Phiên bản Hoàn Chỉnh (Sửa lỗi đọc số USD)

/**
 * window.loadFinancialData()
 * Hàm này tải và xử lý dữ liệu từ Google Sheet.
 */
window.loadFinancialData = function() {
    const loadingMsg = document.getElementById('financials-loading');
    const chartWrapper = document.getElementById('chart-wrapper');
    const tableWrapper = document.getElementById('table-wrapper');

    // Bảo vệ: Bỏ qua nếu không tìm thấy các phần tử (phòng trường hợp HTML chưa tải)
    if (!loadingMsg || !chartWrapper || !tableWrapper) {
        console.error("Financial elements not found. Skipping data load.");
        return;
    }

    // Đường link Google Sheet CSV bạn đã cung cấp
    const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRdnGGLERma9OCgM-Y6hGfFn2RnyjAMZeGT_zHviVrBKdC5h3947vTg66xfwg1RbcrGbgQm1cIAWKhS/pub?output=csv';

    // Tải thư viện Google Charts
    // 'packages':['corechart'] là gói để vẽ biểu đồ đường và cột
    google.charts.load('current', {'packages':['corechart']});
    
    // Đợi thư viện tải xong rồi mới chạy hàm vẽ
    google.charts.setOnLoadCallback(fetchAndDraw);

    async function fetchAndDraw() {
        try {
            const response = await fetch(GOOGLE_SHEET_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const csvText = await response.text();
            
            // Xử lý dữ liệu CSV
            const data = parseCSV(csvText);
            
            // Ẩn loading, hiển thị nội dung
            loadingMsg.classList.add('hidden');
            chartWrapper.classList.remove('hidden');
            tableWrapper.classList.remove('hidden');

            // Vẽ biểu đồ và tạo bảng
            drawChart(data);
            createTable(data);

            console.log("Google Sheet data loaded and rendered successfully.");

        } catch (error) {
            console.error('Error loading or parsing Google Sheet data:', error);
            // Hiển thị lỗi cho người dùng nếu không tải được
            loadingMsg.innerHTML = '<p class="text-red-600">Lỗi: Không thể tải dữ liệu tài chính. Vui lòng kiểm tra đường link Google Sheet.</p>';
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
                row.push(currentVal.trim().replace(/"/g, '')); // Xóa dấu " thừa
                currentVal = '';
            } else {
                currentVal += char;
            }
        }
        row.push(currentVal.trim().replace(/"/g, '')); // Xóa dấu " thừa
        data.push(row);
    }
    return data;
}

/**
 * drawChart()
 * Vẽ biểu đồ cột và đường bằng Google Charts.
 */
function drawChart(csvData) {
    
    // --- SỬA LỖI ĐỌC SỐ (RẤT QUAN TRỌNG) ---
    // Hàm helper này giả định định dạng số là USD (ví dụ: $1,200.50)
    const cleanNumber = (str) => {
        if (!str) return 0;
        
        // 1. Xóa dấu $ và dấu , (ngăn cách hàng nghìn USD)
        // Ví dụ: "$1,200.50" -> "1200.50"
        // (Nó sẽ không xóa dấu . thập phân)
        let numStr = str.replace(/[\$,]/g, ''); 

        // 2. parseFloat bây giờ có thể đọc "1200.50" một cách chính xác
        return parseFloat(numStr) || 0;
    };
    // ------------------------------------

    // Chuyển đổi dữ liệu CSV sang định dạng Google DataTable
    const dataTable = new google.visualization.DataTable();
    const headers = csvData[0]; // Dòng đầu tiên là header
    
    // Thêm các cột (Header)
    dataTable.addColumn('string', headers[0]); // Quý
    dataTable.addColumn('number', headers[1]); // Doanh thu
    dataTable.addColumn('number', headers[2]); // Chi phí
    dataTable.addColumn('number', headers[3]); // Dòng tiền ròng
    dataTable.addColumn('number', headers[4]); // Dòng tiền lũy kế

    // Thêm các hàng (Data)
    for (let i = 1; i < csvData.length; i++) {
        const row = csvData[i];
        if (row.length < headers.length) continue; // Bỏ qua hàng trống

        dataTable.addRow([
            row[0], 
            cleanNumber(row[1]), // Áp dụng hàm cleanNumber
            cleanNumber(row[2]), // Áp dụng hàm cleanNumber
            cleanNumber(row[3]), // Áp dụng hàm cleanNumber
            cleanNumber(row[4])  // Áp dụng hàm cleanNumber
        ]);
    }

    const options = {
        title: 'Dòng Tiền Lũy Kế & Dòng Tiền Ròng (USD)',
        fontName: 'Inter', // Sử dụng font Inter
        vAxis: {
            title: 'Số Tiền (USD)', 
            gridlines: {color: '#e5e7eb'},
            format: 'short' // Hiển thị 100K thay vì 100,000
        },
        hAxis: {title: 'Quý'},
        seriesType: 'bars', // Biểu đồ cột làm mặc định
        series: {
            // Cột 2 (Dòng tiền ròng) là đường màu đỏ
            2: { type: 'line', color: '#ef4444', lineWidth: 3, pointSize: 6 }, // Dòng tiền ròng
            // Cột 3 (Dòng tiền lũy kế) là đường màu xanh
            3: { type: 'line', color: '#10b981', lineWidth: 3, pointSize: 6 }  // Dòng tiền lũy kế
        },
        colors: ['#4338ca', '#a5b4fc'], // Màu cho 2 cột: Doanh thu (Đậm), Chi phí (Nhạt)
        legend: { position: 'bottom' }, // Chú thích ở dưới
        chartArea: {width: '85%', height: '70%'}, // Căn lề biểu đồ
        animation: {
            startup: true,
            duration: 1000,
            easing: 'out',
        },
    };

    // Tìm thẻ canvas và vẽ biểu đồ
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
        if (row.length < headers.length) continue; // Bỏ qua hàng trống
        
        bodyHtml += '<tr>';
        row.forEach((cell, index) => {
            // Hiển thị văn bản gốc từ CSV
            if (index === 0) { // Cột đầu tiên (Tên)
                bodyHtml += `<td class="px-4 py-3 text-sm font-medium text-neutral-900">${cell}</td>`;
            } else { // Các cột số
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
    if (!container) return; // Bảo vệ: Bỏ qua nếu không tìm thấy container

    const tabButtons = container.querySelectorAll(`.${buttonClass}`);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Xử lý nút: Xóa 'active' khỏi tất cả, thêm vào nút hiện tại
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active'); 
            
            // Xử lý nội dung: Ẩn tất cả nội dung thuộc class này
            document.querySelectorAll(`.${contentClass}`).forEach(content => content.classList.remove('active'));
            
            // Hiển thị nội dung mục tiêu
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Thiết lập trạng thái ban đầu (buộc tab đầu tiên hoạt động)
    document.querySelectorAll(`.${contentClass}`).forEach(content => content.classList.remove('active'));
    tabButtons.forEach(btn => btn.classList.remove('active'));

    const firstButton = container.querySelector(`.${buttonClass}`);
    if (firstButton) {
        firstButton.classList.add('active'); // Kích hoạt nút đầu tiên
        const targetId = firstButton.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
             targetContent.classList.add('active'); // Hiển thị nội dung tab đầu tiên
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
