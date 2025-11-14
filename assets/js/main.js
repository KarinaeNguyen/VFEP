// main.js - Chứa logic khởi tạo sau khi tất cả nội dung HTML đã được tải (qua importSections.js).

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

        container.querySelectorAll(`.${buttonClass}`).forEach(button => {
            button.addEventListener('click', function() {
                // Xử lý nút: Xóa 'active' khỏi tất cả, thêm vào nút hiện tại
                container.querySelectorAll(`.${buttonClass}`).forEach(btn => btn.classList.remove('active'));
                this.classList.add('active'); 
                
                // Xử lý nội dung: Ẩn tất cả, hiển thị nội dung mục tiêu
                document.querySelectorAll(`.${contentClass}`).forEach(content => content.classList.remove('active'));
                
                const targetId = this.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
        
        // Đảm bảo chỉ tab đầu tiên được hiển thị khi khởi tạo (do HTML có thể đã đặt 'active' cho nhiều tab)
        const allContents = document.querySelectorAll(`.${contentClass}`);
        allContents.forEach((content, index) => {
            content.classList.remove('active');
            if (index === 0) {
                content.classList.add('active'); // Kích hoạt tab đầu tiên
            }
        });

        // Kích hoạt nút đầu tiên
        const firstButton = container.querySelector(`.${buttonClass}`);
        if (firstButton) {
            firstButton.classList.add('active');
        }
    }

    // 1. Thiết lập Tabs Công nghệ (technology.html)
    // containerId: 'technology-tabs', buttonClass: 'tech-tab-btn', contentClass: 'tech-tab-content'
    setupTabs('technology-tabs', 'tech-tab-btn', 'tech-tab-content');

    // 2. Thiết lập Tabs Lợi thế Cạnh tranh (advantage.html)
    // containerId: 'advantage-tabs', buttonClass: 'advantage-tab-btn', contentClass: 'advantage-tab-content'
    setupTabs('advantage-tabs', 'advantage-tab-btn', 'advantage-tab-content');

    // 3. Thiết lập Tabs Thị trường (market.html)
    // containerId: 'market-tabs', buttonClass: 'market-tab-btn', contentClass: 'market-tab-content'
    setupTabs('market-tabs', 'market-tab-btn', 'market-tab-content');

    // --- LOGIC TẢI DỮ LIỆU TÀI CHÍNH (financials.html) ---
    
    // Hàm mô phỏng việc tải dữ liệu tài chính (thay thế cho việc tích hợp Google Sheet/Chart.js thực tế)
    window.loadFinancialData = function() {
        const loadingMsg = document.getElementById('financials-loading');
        const chartWrapper = document.getElementById('chart-wrapper');
        const tableWrapper = document.getElementById('table-wrapper');

        // Bỏ qua nếu không tìm thấy các phần tử (chẳng hạn khi chỉ tải một phần trang)
        if (!loadingMsg || !chartWrapper || !tableWrapper) return;
        
        // Mô phỏng thời gian tải dữ liệu
        setTimeout(() => {
            loadingMsg.classList.add('hidden'); // Ẩn thông báo đang tải
            chartWrapper.classList.remove('hidden'); // Hiển thị khung biểu đồ
            tableWrapper.classList.remove('hidden'); // Hiển thị khung bảng chi tiết
            
            // LƯU Ý: Nếu sử dụng Chart.js, mã khởi tạo biểu đồ sẽ nằm ở đây.
            
            console.log("Financial data loaded successfully and wrappers displayed.");
        }, 1200); // Giả lập độ trễ 1.2 giây
    };

    // Gọi hàm tải dữ liệu tài chính ngay khi ứng dụng khởi tạo
    window.loadFinancialData();
};
