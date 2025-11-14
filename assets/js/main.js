// main.js - Chứa logic khởi tạo sau khi tất cả nội dung đã được tải.

window.initializeApp = function() {
    console.log("Vicinity Safety Application Initialized.");

    // --- LOGIC CHO CÁC TAB TƯƠNG TÁC (Technology, Market, Advantage) ---
    
    // Hàm chung để xử lý việc chuyển đổi tab
    function setupTabs(containerId, buttonClass, contentClass) {
        document.getElementById(containerId).querySelectorAll(`.${buttonClass}`).forEach(button => {
            button.addEventListener('click', function() {
                // Xóa trạng thái 'active' khỏi tất cả các nút
                document.getElementById(containerId).querySelectorAll(`.${buttonClass}`).forEach(btn => btn.classList.remove('active'));
                this.classList.add('active'); // Đặt trạng thái 'active' cho nút hiện tại
                
                // Ẩn tất cả nội dung tab
                document.querySelectorAll(`.${contentClass}`).forEach(content => content.style.display = 'none');
                
                // Hiển thị nội dung tab mục tiêu
                const targetId = this.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
            });
        });

        // Thiết lập hiển thị ban đầu (Chỉ hiển thị tab đầu tiên)
        const firstContent = document.querySelector(`.${contentClass}`);
        if (firstContent) {
            document.querySelectorAll(`.${contentClass}`).forEach(content => content.style.display = 'none');
            firstContent.style.display = 'block';
        }
    }

    // 1. Thiết lập Tabs Công nghệ (technology.html)
    setupTabs('technology-tabs', 'tech-tab-btn', 'tech-tab-content');

    // 2. Thiết lập Tabs Lợi thế Cạnh tranh (advantage.html)
    setupTabs('advantage-tabs', 'advantage-tab-btn', 'advantage-tab-content');

    // 3. Thiết lập Tabs Thị trường (market.html)
    setupTabs('market-tabs', 'market-tab-btn', 'market-tab-content');
    
    // --- LOGIC TẢI DỮ LIỆU TÀI CHÍNH (financials.html) ---
    
    // Vì không có Google Sheet, chúng ta sẽ mô phỏng việc hiển thị dữ liệu
    // Hàm này sẽ được gọi ở đây để tải biểu đồ/bảng nếu có thư viện Chart.js.
    window.loadFinancialData = function() {
        const loadingMsg = document.getElementById('financials-loading');
        const chartWrapper = document.getElementById('chart-wrapper');
        const tableWrapper = document.getElementById('table-wrapper');

        // Bỏ qua nếu không tìm thấy các phần tử này
        if (!loadingMsg || !chartWrapper || !tableWrapper) return;
        
        // Mô phỏng thời gian tải
        setTimeout(() => {
            loadingMsg.classList.add('hidden');
            chartWrapper.classList.remove('hidden');
            tableWrapper.classList.remove('hidden');
            
            // Ở đây sẽ là nơi bạn khởi tạo biểu đồ Chart.js
            // Ví dụ: const ctx = document.getElementById('cashFlowChart').getContext('2d');
            // new Chart(ctx, { ... });
            
            console.log("Financial data loaded successfully.");
        }, 1000); // 1 giây giả lập
    };

    // Gọi hàm tải dữ liệu tài chính ngay khi ứng dụng khởi tạo
    window.loadFinancialData();
};
