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
            loadingMsg.innerHTML = '<p class="text-red-600">Lỗi: Không thể tải dữ liệu tài chính. Vui lòng kiểm tra đường link Google Sheet.</p>';
        }
    }
};

/**
 * parseCSV()
 * Hàm đơn giản để chuyển đổi văn bản CSV thành mảng 2D.
 */
function parseCSV(text) {
    const lines = text.split('\n').map(line => line.trim());
    const data = [];
    for (const line of lines) {
        // Xử lý các giá trị có dấu phẩy bên trong (ví dụ: "$100,000")
        const row = [];
        let currentVal = '';
        let inQuote = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuote = !inQuote;
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
 * drawChart()
 * Vẽ biểu đồ cột và đường bằng Google Charts.
 */
function drawChart(csvData) {
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
            parseFloat(row[1].replace(/[\$,]/g, '')) || 0, // Doanh thu
            parseFloat(row[2].replace(/[\$,]/g, '')) || 0, // Chi phí
            parseFloat(row[3].replace(/[\$,]/g, '')) || 0, // Dòng tiền ròng
            parseFloat(row[4].replace(/[\$,]/g, '')) || 0  // Dòng tiền lũy kế
        ]);
    }

    const options = {
        title: 'Dòng Tiền Lũy Kế & Dòng Tiền Ròng (USD)',
        fontName: 'Inter',
        vAxis: {title: 'Số Tiền (USD)', gridlines: {color: '#e5e7eb'}},
        hAxis: {title: 'Quý'},
        seriesType: 'bars', // Biểu đồ cột làm mặc định
        series: {
            2: { type: 'line', color: '#ef4444', lineWidth: 3, pointSize: 6 }, // Dòng tiền ròng (Đường)
            3: { type: 'line', color: '#10b981', lineWidth: 3, pointSize: 6 }  // Dòng tiền lũy kế (Đường)
        },
        colors: ['#4338ca', '#a5b4fc'], // Doanh thu (Cột), Chi phí (Cột)
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
 * Tạo bảng HTML từ dữ liệu CSV.
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
            
            // Xử lý nội dung: Ẩn tất cả, hiển thị nội dung mục tiêu
            // (Chúng ta tìm tất cả nội dung, không chỉ trong container này)
            document.querySelectorAll(`.${contentClass}`).forEach(content => content.classList.remove('active'));
            
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // 2. Thiết lập trạng thái ban đầu (buộc tab đầu tiên hoạt động)
    // Đảm bảo tất cả nội dung đều ẩn
    tabContents.forEach(content => content.classList.remove('active'));
    // Đảm bảo tất cả nút không active
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
