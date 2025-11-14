// main.js - CHỨA TẤT CẢ LOGIC KHỞI TẠO, TABS, VÀ GIẢ LẬP TÀI CHÍNH

/**
 * window.loadFinancialData()
 * Hàm mô phỏng việc tải dữ liệu tài chính (thay thế cho việc tích hợp Google Sheet/Chart.js thực tế).
 * * LƯU Ý QUAN TRỌNG: Nếu triển khai thực tế, logic tải/phân tích CSV/JSON 
 * và khởi tạo Chart.js (từ các file csvParser.js và financials.js cũ) sẽ được đặt ở đây.
 */
window.loadFinancialData = function() {
    const loadingMsg = document.getElementById('financials-loading');
    const chartWrapper = document.getElementById('chart-wrapper');
    const tableWrapper = document.getElementById('table-wrapper');

    // Bảo vệ: Bỏ qua nếu không tìm thấy các phần tử
    if (!loadingMsg || !chartWrapper || !tableWrapper) return;
    
    // Mô phỏng thời gian tải dữ liệu (1.2 giây)
    setTimeout(() => {
        if (loadingMsg) loadingMsg.classList.add('hidden'); 
        if (chartWrapper) chartWrapper.classList.remove('hidden');
        if (tableWrapper) tableWrapper.classList.remove('hidden'); 
        
        console.log("Financial data loaded successfully and wrappers displayed.");
    }, 1200); 
};


/**
 * window.setupTabs()
 * Hàm chung để xử lý việc chuyển đổi tab tương tác (Technology, Market, Advantage).
 */
window.setupTabs = function(containerId, buttonClass, contentClass) {
    const container = document.getElementById(containerId);
    if (!container) return; 

    const tabButtons = container.querySelectorAll(`.${buttonClass}`);
    const tabContents = document.querySelectorAll(`.${contentClass}`);

    // 1. Gán sự kiện Click cho các nút
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Xử lý nút: Xóa 'active' khỏi tất cả, thêm vào nút hiện tại
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active'); 
            
            // Xử lý nội dung: Ẩn tất cả, hiển thị nội dung mục tiêu
            tabContents.forEach(content => content.classList.remove('active'));
            
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // 2. Thiết lập trạng thái ban đầu (buộc tab đầu tiên hoạt động)
    tabContents.forEach(content => content.classList.remove('active'));

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
    window.loadFinancialData();
};
