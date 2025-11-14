// assets/js/main.js - Phiên bản Hoàn Chỉnh (Tích hợp Google Sheet)

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
 * Hàm đơn giản để chuyển đổi văn bản CSV thành mảng 2D.
 */
function parseCSV(text) {
    // Tách CSV thành các dòng, loại bỏ khoảng trắng thừa
    const lines = text.split('\n').map(line => line.trim());
    const data = [];
    
    for (const line of lines) {
        if (!line) continue; // Bỏ qua dòng trống

        const row = [];
        let currentVal = '';
        let inQuote = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                // Xử lý dấu ngoặc kép
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                // Nếu là dấu phẩy và không nằm trong ngoặc kép, đây là cuối 1 ô
                row.push(currentVal.trim());
                currentVal = '';
            } else {
                // Thêm ký tự vào giá trị ô hiện tại
                currentVal += char;
            }
        }
        row.push(currentVal.trim()); // Đẩy giá trị cuối cùng vào
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
    // Hàm helper để xóa tất cả các ký tự không phải số ($, ,, .)
    // Biến "100.000" (VND) -> 100000
    // Biến "$100,000" (USD) -> 100000
    const cleanNumber = (str) => {
        if (!str) return 0;
        
        // 1. Xóa dấu $, dấu phẩy (ngăn cách hàng nghìn USD), và dấu chấm (ngăn cách hàng nghìn VND)
        // Ví dụ: "$1.200.000" -> "1200000"
        let numStr = str.replace(/[\$\.]/g, ''); 

        // 2. Xử lý trường hợp số thập phân (nếu có, ví dụ: "100,50")
        // JavaScript dùng dấu chấm cho số thập phân, nên ta thay thế
        // Ví dụ: "100,50" -> "100.50"
        numStr = numStr.replace(/,/g, '.'); 

        return parseFloat(numStr) || 0;
    };
    // ------------------------------------

    // Chuyển đổi dữ liệu CSV sang định dạng Google DataTable
    const dataTable = new google.visualization.DataTable();
    const headers = csvData[0]; // Dòng đầu tiên là header
    
    // Thêm các cột (Header)
    dataTable.addColumn('string', headers[0]); // Quý (string)
    dataTable.addColumn('number', headers[1]); // Doanh thu (số)
    dataTable.addColumn('number', headers[2]); // Chi phí (số)
    dataTable.addColumn('number', headers[3]); // Dòng tiền ròng (số)
    dataTable.addColumn('number', headers[4]); // Dòng tiền lũy kế (số)

    // Thêm các hàng (Data)
    for (let i = 1; i < csvData.length; i++) {
        const row = csvData[i];
        if (row.length < headers.length) continue; // Bỏ qua hàng trống

        dataTable.addRow([
            row[0], // Quý
            cleanNumber(row[1]), // Doanh thu
            cleanNumber(row[2]), // Chi phí
            cleanNumber(row[3]), // Dòng tiền ròng
            cleanNumber(row[4])  // Dòng tiền lũy kế
        ]);
    }

    const options = {
        title: 'Dòng Tiền Lũy Kế & Dòng Tiền Ròng (USD)',
        fontName: 'Inter', // Sử dụng font Inter
        vAxis: {
            title: 'Số Tiền (USD)', 
            gridlines: {color: '#e5e7eb'},
            format: 'short' // Hiển thị số lớn dạng rút gọn (ví dụ: 100K thay vì 100,000)
        },
        hAxis: {title: 'Quý'},
        seriesType: 'bars', // Biểu đồ cột làm mặc định
        series: {
            // Cột 2 (Dòng tiền ròng) là đường màu đỏ
            2: { type: 'line', color: '#ef4444', lineWidth: 3, pointSize: 6 }, 
            // Cột 3 (Dòng tiền lũy kế) là đường màu xanh
            3: { type: 'line', color: '#10b981', lineWidth: 3, pointSize: 6 }  
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
            // Hiển thị văn bản gốc từ CSV (ví dụ: "100.000")
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
 * Hàm chung để xử lý việc chuyển đổi tab tương tác (Technology, Market, Advantage).
 */
window.setupTabs = function(containerId, buttonClass, contentClass) {
    const container = document.getElementById(containerId);
    if (!container) return; // Bảo vệ: Bỏ qua nếu không tìm thấy container

    const tabButtons = container.querySelectorAll(`.${buttonClass}`);
    const tabContents = document.querySelectorAll(`.${contentClass}`);

    // 1. Gán sự kiện Click cho các nút
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
    
    // 2. Thiết lập trạng thái ban đầu (buộc tab đầu tiên hoạt động)
    tabContents.forEach(content => content.classList.remove('active'));
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
 * Hàm khởi tạo chính. Nó được gọi bởi importSections.js sau khi
 * tất cả các tệp HTML đã được tải và dịch.
 */
window.initializeApp = function() {
    console.log("Vicinity Safety Application Initialized.");

    // --- 1. KHỞI TẠO TABS ---
    window.setupTabs('technology-tabs', 'tech-tab-btn', 'tech-tab-content');
    window.setupTabs('advantage-tabs', 'advantage-tab-btn', 'advantage-tab-content');
    window.setupTabs('market-tabs', 'market-tab-btn', 'market-tab-content');

    // --- 2. TẢI DỮ LIỆU TÀI CHÍNH ---
    // (Bây giờ nó sẽ tải từ Google Sheet)
    window.loadFinancialData();
};
