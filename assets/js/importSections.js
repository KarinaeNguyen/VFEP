// assets/js/importSections.js - Phiên bản Đã Sửa Lỗi (Hoàn Chỉnh)

const LANGUAGE_DATA = {
    'vi': {
        'page_title': 'Vicinity Safety | Công Nghệ Dập Lửa Chính Xác VFEP',
        
        // --- SỬA LỖI DỮ LIỆU ---
        // (Cập nhật key để khớp với data-key trong header.html của bạn)
        'header_main_title': 'Thông Tin Dự Án',
        'header_subtitle': '| Công Nghệ VFEP',
        
        'language_switch': 'English', // Văn bản trên nút khi ở Tiếng Việt
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
        'page_title': 'Vicinity Safety | Precise Fire Extinguishing Technology VFEP',
        
        // --- SỬA LỖI DỮ LIỆU ---
        // (Cập nhật key để khớp với data-key trong header.html của bạn)
        'header_main_title': 'Project Information',
        'header_subtitle': '| VFEP Technology',
        
        'language_switch': 'Tiếng Việt', // Văn bản trên nút khi ở Tiếng Anh
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
    
    // --- SỬA LỖI LOGIC 1 ---
    // (Xóa dòng document.title cũ. Hàm applyTranslations sẽ tự động cập nhật
    // tiêu đề qua thẻ <title data-key="page_title"> trong index.html)
    
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
        
        // --- SỬA LỖI LOGIC 2 ---
        // (Văn bản của nút phải lấy từ ngôn ngữ HIỆN TẠI (lang),
        // không phải ngôn ngữ MỤC TIÊU (targetLang))
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
