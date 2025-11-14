// assets/js/importSections.js - Phiên bản Hoàn Chỉnh (Đã sửa lỗi)

const LANGUAGE_DATA = {
    'vi': {
        // --- HEADER ---
        'page_title': 'Vicinity Safety | Công Nghệ Dập Lửa Chính Xác VFEP',
        'header_main_title': 'Thông Tin Dự Án',
        'header_subtitle': '| Công Nghệ VFEP',
        'language_switch': 'English',
        'language_current': 'VN',

        // --- OVERVIEW (MỚI CẬP NHẬT) ---
        'overview_hero_title': 'Vicinity Safety: Công Nghệ Dập Lửa VFEP',
        'overview_hero_p1': 'Chào mừng bạn đến với phân tích tương tác của Vicinity Safety. Chúng tôi phát triển công nghệ VFEP: giải pháp dập lửa bằng đạn phóng (projectile) thế hệ mới, được thiết kế đặc biệt để bảo vệ các tài sản giá trị cao, ví dụ như ',
        'overview_highlight_1': 'trung tâm dữ liệu',
        'overview_hero_p2': ' và ',
        'overview_highlight_2': 'dây chuyền sản xuất điện tử',
        'overview_hero_p3': ', khỏi bị phá hủy bởi các phương pháp chữa cháy truyền thống.',
        'overview_card1_title': 'Công Nghệ Cốt Lõi',
        'overview_card1_p': 'Đạn phóng VFEP© chính xác cao, không gây hư hại (non-corrosive).',
        'overview_card2_title': 'Mô Hình Kinh Doanh',
        'overview_card2_p': '"Vốn mỏng" (Asset-light), tập trung vào cấp phép Sở Hữu Trí Tuệ (IP).',
        'overview_card3_title': 'Mục Tiêu Thực Tế',
        'overview_card3_p': 'Trung tâm Dữ liệu, Nhà máy Sản xuất, và Hạ tầng Pin Năng lượng.',

        // --- NAVIGATION (CHO PLACEHOLDER) ---
        'nav_overview': 'Tổng quan',
        'nav_vision': 'Tầm nhìn & Sứ mệnh',
        'nav_lean_canvas': 'Mô hình Lean Canvas',
        'nav_technology': 'Công nghệ',
        'nav_strategy': 'Chiến lược',
        'nav_market': 'Phân tích Thị trường',
        'nav_financials': 'Tài chính',
        'nav_advantage': 'Lợi thế Cạnh tranh',

        // --- FOOTER ---
        'footer_text': '© 2024 Vicinity Safety. Bảo lưu mọi quyền.',
    },
    'en': {
        // --- HEADER ---
        'page_title': 'Vicinity Safety | Precise Fire Extinguishing Technology VFEP',
        'header_main_title': 'Project Information',
        'header_subtitle': '| VFEP Technology',
        'language_switch': 'Tiếng Việt',
        'language_current': 'EN',

        // --- OVERVIEW (MỚI CẬP NHẬT) ---
        'overview_hero_title': 'Vicinity Safety: VFEP Fire Suppression Technology',
        'overview_hero_p1': 'Welcome to the interactive analysis of Vicinity Safety. We are developing VFEP technology: a next-generation projectile-based fire suppression solution, specifically designed to protect high-value assets, such as ',
        'overview_highlight_1': 'data centers',
        'overview_hero_p2': ' and ',
        'overview_highlight_2': 'electronics manufacturing lines',
        'overview_hero_p3': ', from being destroyed by traditional fire suppression methods.',
        'overview_card1_title': 'Core Technology',
        'overview_card1_p': 'High-precision, non-corrosive VFEP© projectiles.',
        'overview_card2_title': 'Business Model',
        'overview_card2_p': 'Asset-light, focusing on Intellectual Property (IP) licensing.',
        'overview_card3_title': 'Target Markets',
        'overview_card3_p': 'Data Centers, Manufacturing Plants, and Battery Energy Infrastructure.',

        // --- NAVIGATION (CHO PLACEHOLDER) ---
        'nav_overview': 'Overview',
        'nav_vision': 'Vision & Mission',
        'nav_lean_canvas': 'Lean Canvas Model',
        'nav_technology': 'Technology',
        'nav_strategy': 'Strategy',
        'nav_market': 'Market Analysis',
        'nav_financials': 'Financials',
        'nav_advantage': 'Competitive Advantage',

        // --- FOOTER ---
        'footer_text': '© 2024 Vicinity Safety. All rights reserved.',
    }
};

let currentLang = localStorage.getItem('lang') || 'vi';

async function importSections() {
    const sections = [
        'header', 'overview', 'vision', 'lean-canvas', 'technology', 
        'strategy', 'market', 'financials', 'advantage', 'footer'
    ];

    for (const section of sections) {
        const path = `sections/${section}.html`; 
        try {
            const response = await fetch(path);
            if (response.ok) {
                const html = await response.text();
                document.getElementById(section).innerHTML = html;
            } else {
                console.error(`Failed to load section: ${path}`);
            }
        } catch (error) {
            console.error(`Error fetching section ${section}:`, error);
        }
    }
    
    // 1. ÁP DỤNG BẢN DỊCH SAU KHI TẢI
    applyTranslations(currentLang);
    
    // 2. GỌI initializeApp() trong main.js sau khi tải và dịch
    if (typeof window.initializeApp === 'function') {
        window.initializeApp();
    } else {
        console.error('CRITICAL ERROR: initializeApp() not found. main.js not loaded or defined.');
    }
}


window.switchLanguage = function(lang) {
    if (lang === currentLang) return; 

    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    document.documentElement.lang = lang;
    
    // Hàm applyTranslations sẽ tự động cập nhật tiêu đề trang
    applyTranslations(lang);
};

function applyTranslations(lang) {
    // A. Dịch nội dung tĩnh/tải về (bao gồm cả tiêu đề trang)
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = LANGUAGE_DATA[lang][key];
        if (translation) {
            element.innerHTML = translation; 
        }
    });

    // B. Cập nhật nút chuyển đổi ngôn ngữ/hiển thị
    const switchBtn = document.getElementById('language-switch-btn');
    const displaySpan = document.getElementById('lang-display');
    
    if (switchBtn) {
        const targetLang = lang === 'vi' ? 'en' : 'vi';
        switchBtn.setAttribute('onclick', `switchLanguage('${targetLang}')`);
        
        // Sửa lỗi logic: Văn bản của nút phải lấy từ ngôn ngữ HIỆN TẠI (lang)
        switchBtn.textContent = LANGUAGE_DATA[lang]['language_switch'];
    }

    if (displaySpan) {
        displaySpan.textContent = LANGUAGE_DATA[lang]['language_current'];
    }

    // C. Dịch các tiêu đề phần (placeholder cho các div trống)
    const sectionIds = ['overview', 'vision', 'lean-canvas', 'technology', 'strategy', 'market', 'financials', 'advantage'];
    sectionIds.forEach(id => {
        const titleKey = 'nav_' + id.replace('-', '_');
        const element = document.getElementById(id);
        if (element && element.tagName === 'DIV' && element.children.length === 0) {
            element.innerHTML = `<h2 class="text-3xl font-bold mb-6">${LANGUAGE_DATA[lang][titleKey]}</h2><p>Content for this section will be translated inside ${id}.html.</p>`;
        }
    });
}


// Chạy hàm import khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', importSections);
