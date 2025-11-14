// assets/js/importSections.js - Phiên bản Hoàn Chỉnh

const LANGUAGE_DATA = {
    'vi': {
        // ... (Nội dung dịch tiếng Việt) ...
        'page_title': 'Vicinity Safety | Công Nghệ Dập Lửa Chính Xác VFEP',
        'header_title': 'Tài liệu Kế hoạch Kinh doanh',
        'language_switch': 'English',
        'language_current': 'VN',
        'nav_overview': 'Tổng quan',
        'nav_vision': 'Tầm nhìn & Sứ mệnh',
        'nav_lean_canvas': 'Mô hình Lean Canvas',
        'nav_technology': 'Công nghệ',
        'nav_strategy': 'Chiến lược',
        'nav_market': 'Phân tích Thị trường',
        'nav_financials': 'Tài chính',
        'nav_advantage': 'Lợi thế Cạnh tranh',
        'footer_text': '© 2024 Vicinity Safety. Bảo lưu mọi quyền.',
    },
    'en': {
        // ... (Nội dung dịch tiếng Anh) ...
        'page_title': 'Vicinity Safety | Precise Fire Extinguishing Technology VFEP',
        'header_title': 'Business Plan Document',
        'language_switch': 'Tiếng Việt',
        'language_current': 'EN',
        'nav_overview': 'Overview',
        'nav_vision': 'Vision & Mission',
        'nav_lean_canvas': 'Lean Canvas Model',
        'nav_technology': 'Technology',
        'nav_strategy': 'Strategy',
        'nav_market': 'Market Analysis',
        'nav_financials': 'Financials',
        'nav_advantage': 'Competitive Advantage',
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
    
    // Dùng data-key để đổi tiêu đề trang
    const titleEl = document.querySelector('title[data-key="page_title"]');
    if (titleEl) {
        titleEl.innerHTML = LANGUAGE_DATA[lang]['page_title'];
    }

    applyTranslations(lang);
};

function applyTranslations(lang) {
    // A. Dịch nội dung tĩnh/tải về
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = LANGUAGE_DATA[lang][key];
        if (translation) {
            // Dùng innerHTML để giữ định dạng HTML (nếu có)
            element.innerHTML = translation; 
        }
    });

    // B. Cập nhật nút chuyển đổi ngôn ngữ/hiển thị
    const switchBtn = document.getElementById('language-switch-btn');
    const displaySpan = document.getElementById('lang-display');
    
    if (switchBtn) {
        const targetLang = lang === 'vi' ? 'en' : 'vi';
        switchBtn.setAttribute('onclick', `switchLanguage('${targetLang}')`);
        // Cập nhật text của nút sang ngôn ngữ MỚI
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
        // Chỉ chèn placeholder nếu div đó rỗng (chưa tải được .html)
        if (element && element.tagName === 'DIV' && element.children.length === 0) {
            element.innerHTML = `<h2 class="text-3xl font-bold mb-6">${LANGUAGE_DATA[lang][titleKey]}</h2><p>Content for this section will be translated inside ${id}.html.</p>`;
        }
    });
}


// Chạy hàm import khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', importSections);
