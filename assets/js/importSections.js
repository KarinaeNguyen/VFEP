// main.js - Chứa logic khởi tạo sau khi tất cả nội dung HTML đã được tải (qua importSections.js).

/**
 * window.loadFinancialData()
 * Hàm mô phỏng việc tải dữ liệu tài chính (thay thế cho việc tích hợp Google Sheet/Chart.js thực tế)
 * LƯU Ý: Hàm này được giữ lại trong main.js theo yêu cầu.
 */
window.loadFinancialData = function() {
    const loadingMsg = document.getElementById('financials-loading');
    const chartWrapper = document.getElementById('chart-wrapper');
    const tableWrapper = document.getElementById('table-wrapper');

    // Bỏ qua nếu không tìm thấy các phần tử (chẳng hạn khi chỉ tải một phần trang)
    if (!loadingMsg || !chartWrapper || !tableWrapper) return;
    
    // Mô phỏng thời gian tải dữ liệu
    setTimeout(() => {
        // Kiểm tra lại lần nữa trước khi thao tác DOM (để đảm bảo phần tử chưa bị xóa)
        if (loadingMsg) loadingMsg.classList.add('hidden'); // Ẩn thông báo đang tải
        if (chartWrapper) chartWrapper.classList.remove('hidden'); // Hiển thị khung biểu đồ
        if (tableWrapper) tableWrapper.classList.remove('hidden'); // Hiển thị khung bảng chi tiết
        
        // LƯU Ý: Nếu sử dụng Chart.js, mã khởi tạo biểu đồ sẽ nằm ở đây.
        
        console.log("Financial data loaded successfully and wrappers displayed.");
    }, 1200); // Giả lập độ trễ 1.2 giây
};


/**
 * window.initializeApp()
 * Hàm khởi tạo chính. Nó được gọi bởi importSections.js sau khi
 * tất cả các tệp HTML đã được tải và dịch.
 */
window.initializeApp = function() {
    console.log("Vicinity Safety Application Initialized.");

    // --- LOGIC CHUNG CHO CÁC TAB TƯƠNG TÁC (Technology, Market, Advantage) ---
    
    // Hàm chung để xử lý việc chuyển đổi tab (dựa trên cấu trúc HTML đã cung cấp)
    function setupTabs(containerId, buttonClass, contentClass) {
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
                tabContents.forEach(content => content.classList.remove('active'));
                
                const targetId = this.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
        
        // 2. Thiết lập trạng thái ban đầu (buộc tab đầu tiên hoạt động)
        // Đây là cách giải quyết gọn gàng nhất cho cấu trúc này.
        tabContents.forEach(content => content.classList.remove('active'));

        const firstButton = container.querySelector(`.${buttonClass}`);
        if (firstButton) {
            // Kích hoạt nút đầu tiên và nội dung tương ứng
            firstButton.classList.add('active');
            const targetId = firstButton.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                 targetContent.classList.add('active');
            }
        }
    }

    // Khởi tạo Tabs
    setupTabs('technology-tabs', 'tech-tab-btn', 'tech-tab-content');
    setupTabs('advantage-tabs', 'advantage-tab-btn', 'advantage-tab-content');
    setupTabs('market-tabs', 'market-tab-btn', 'market-tab-content');

    // --- LOGIC TẢI DỮ LIỆU TÀI CHÍNH (Được giữ lại trong main.js) ---
    window.loadFinancialData();
};
