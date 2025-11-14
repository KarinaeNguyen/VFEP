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
            
            // 1. Phân tích CSV (Hàm v8)
            const data = parseCSV(csvText);
            
            // 2. (DEBUG)
            console.log("--- DEBUG: Dữ liệu đã phân tích (Parsed CSV Data) ---");
            console.log(data);
            console.log("-------------------------------------------------");
            
            loadingMsg.classList.add('hidden');
            chartWrapper.classList.remove('hidden');
            tableWrapper.classList.remove('hidden');

            // 3. Chạy hàm vẽ biểu đồ và bảng (phiên bản 10)
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
 * (V8 - Đã sửa lỗi dấu ngoặc kép)
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
                if (line[i+1] === '"') {
                    currentVal += '"';
                    i++; 
                } else {
                    inQuote = !inQuote;
                }
            } 
            else if (char === ',' && !inQuote) {
                row.push(currentVal.trim()); 
                currentVal = ''; 
            } 
            else {
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
 * Hàm helper (V10 - Sửa lỗi dấu phẩy)
 */
const cleanNumber = (str) => {
    if (!str) return 0;
    let isNegative = false;
    if (str.startsWith('(') && str.endsWith(')')) {
        isNegative = true;
    }
    
    let numStr = str.replace(/[\$,\(\),]/g, ''); 

    let num = parseFloat(numStr) || 0;
    if (isNegative) {
        num = num * -1;
    }
    return num;
};


/**
 * drawChart()
 * VIẾT LẠI (V10)
 * Sửa lại 3 tên hàng cho khớp với Google Sheet
 */
function drawChart(csvData) {
    try {
        // 1. Tìm hàng Tiêu đề (Quý) - Nằm ở hàng index 3
        const headers = csvData[3]; // ["Category", "Q1", "Q2", ...]
        
        // ✅ BƯỚC GỠ LỖI 1: KIỂM TRA HÀNG TIÊU ĐỀ
        console.log("--- DEBUG: Hàng tiêu đề (Headers) đang đọc là:", headers);

        console.log("--- DEBUG: Bắt đầu tìm kiếm các hàng tài chính ---");

        // 2. Tìm các hàng dữ liệu chúng ta cần
        let revenueRow, costRow, netRow, cumulativeRow;
        for (const row of csvData) {
            const category = row[0] ? row[0].trim().toUpperCase() : '';
            // Tạm thời tắt log này để đỡ rối console
            // console.log(`Checking category: '${category}'`); 

            if (category === "TOTAL CASH RECEIPTS") { 
                revenueRow = row;
                console.log(">>> TÌM THẤY: TOTAL CASH RECEIPTS (Doanh thu)");
            }
            if (category === "TOTAL CASH PAID OUT") { 
                costRow = row;
                console.log(">>> TÌM THẤY: TOTAL CASH PAID OUT (Chi phí)");
            }
            if (category === "NET CASHFLOW FOR PERIOD") { 
                netRow = row;
                console.log(">>> TÌM THẤY: NET CASHFLOW FOR PERIOD (Dòng tiền ròng)");
            }
            if (category === "CASH BALANCE") { 
                cumulativeRow = row;
                console.log(">>> TÌM THẤY: CASH BALANCE (Dòng tiền lũy kế)");
            }
        }
        
        console.log("--- DEBUG: Kết thúc tìm kiếm ---");

        // 3. Bảo vệ: Dừng lại nếu không tìm thấy dữ liệu
        if (!revenueRow || !costRow || !netRow || !cumulativeRow) {
            console.error("Could not find all required financial rows in CSV. Check Google Sheet names.");
            document.getElementById('chart-wrapper').innerHTML = 
                '<p class="text-red-600 p-4">Lỗi: Dữ liệu Google Sheet bị thiếu hoặc sai định dạng. (Không tìm thấy đủ 4 hàng: TOTAL CASH RECEIPTS, TOTAL CASH PAID OUT, NET CASHFLOW FOR PERIOD, CASH BALANCE)</p>';
            return;
        }

        // 4. Xây dựng DataTable (Bảng dữ liệu) theo đúng định dạng
        const dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Quarter');
        dataTable.addColumn('number', 'Total Revenue'); 
        dataTable.addColumn('number', 'Total Cost'); 
        dataTable.addColumn('number', 'Net Cashflow'); 
        dataTable.addColumn('number', 'Cumulative Cash'); 

        // 5. Lặp qua các cột (Q1, Q2,...) để thêm vào hàng
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
        
        // ✅ BƯỚC GỠ LỖI 2: KIỂM TRA XEM DATATABLE CÓ RỖNG KHÔNG
        if (dataTable.getNumberOfRows() === 0) {
            console.error("LỖI: dataTable không có hàng nào (getNumberOfRows() === 0). Điều này có thể do 'headers' bị sai hoặc rỗng.");
            document.getElementById('chart-wrapper').innerHTML = 
                '<p class="text-red-600 p-4">Lỗi: Không thể tạo dữ liệu biểu đồ. Hàng tiêu đề (headers) có thể bị sai (không tìm thấy Q1, Q2...).</p>';
            return;
        }

        // 6. Cấu hình và Vẽ (Giữ nguyên)
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
                2: { type: 'line', color: '#ef4444', lineWidth: 3, pointSize: 6 }, 
                3: { type: 'line', color: '#10b981', lineWidth: 3, pointSize: 6 } 
            },
            colors: ['#4338ca', '#a5b4fc'], 
            legend: { position: 'bottom' }, 
            chartArea: {width: '85%', height: '70%'}, 
            animation: {
                startup: true,
                duration: 1000,
                easing: 'out',
            },
        };

        const chart = new google.visualization.ComboChart(document.getElementById('cashFlowChart'));
        
        // ✅ BƯỚC GỠ LỖI 3: KIỂM TRA DỮ LIỆU CUỐI CÙNG TRƯỚC KHI VẼ
        // Chúng ta dùng .toJSON() để xem log cho dễ
        console.log("--- DEBUG: Dữ liệu cuối cùng gửi cho Google Chart (dataTable.toJSON()):", dataTable.toJSON());
        
        chart.draw(dataTable, options);

    } catch (e) {
        console.error("Failed to draw chart:", e);
        document.getElementById('chart-wrapper').innerHTML = 
            '<p class="text-red-600 p-4">Đã xảy ra lỗi khi vẽ biểu đồ. Vui lòng kiểm tra Console (F12) để xem chi tiết lỗi.</p>';
    }
}

/**
 * createTable()
 * VIẾT LẠI (V5)
 * Tạo bảng, bỏ qua 3 hàng rác đầu tiên trong CSV.
 */
function createTable(csvData) {
    const tableHead = document.getElementById('financial-table-head');
    const tableBody = document.getElementById('financial-table-body');
    
    if (!tableHead || !tableBody) return;

    // Hàng tiêu đề (Header) là hàng thứ 4 (index 3)
    const headers = csvData[3];
    // Bảo vệ: Nếu headers không tồn tại thì không làm gì cả
    if (!headers) {
        console.error("Lỗi createTable: Không tìm thấy hàng tiêu đề (headers) tại csvData[3].");
        return;
    }

    let headHtml = '<tr>';
    headers.forEach(header => {
        headHtml += `<th scope="col" class="px-4 py-3 text-left text-sm font-semibold text-indigo-700">${header}</th>`;
    });
    headHtml += '</tr>';
    tableHead.innerHTML = headHtml;

    // Nội dung (Body) bắt đầu từ hàng thứ 5 (index 4)
    let bodyHtml = '';
    for (let i = 4; i < csvData.length; i++) {
        const row = csvData[i];
        if (row.length < headers.length || !row[0]) continue; // Bỏ qua hàng trống
        
        bodyHtml += '<tr>';
        row.forEach((cell, index) => {
            if (index === 0) { // Cột đầu tiên (Category) -> In đậm
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
 * Hàm chung để xử lý việc chuyển đổi tab tương tác (Giữ nguyên)
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
 * Hàm khởi tạo chính (Giữ nguyên)
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
