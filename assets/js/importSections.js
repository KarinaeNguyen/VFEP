(() => {
  const LANGUAGE_DATA = {
    vi: {
      page_title: 'Vicinity Safety | Công nghệ VFEP',
      header_title: 'Vicinity Safety',
      header_subtitle: 'Công nghệ dập lửa VFEP',
      language_switch: 'English',
      language_current: 'VN',

      overview_section_title: 'Tổng quan dự án',
      overview_section_body:
        'Vicinity Safety phát triển giải pháp VFEP – đạn chữa cháy chính xác dành cho tài sản giá trị cao như trung tâm dữ liệu, nhà máy điện tử và hạ tầng pin.',
      overview_card1_title: 'Công nghệ cốt lõi',
      overview_card1_body: 'Đạn chữa cháy 0.68-cal không ăn mòn, kích hoạt bằng động năng thấp.',
      overview_card2_title: 'Mô hình kinh doanh',
      overview_card2_body: 'Asset-light, tập trung vào cấp phép IP và dịch vụ hỗ trợ kỹ thuật.',
      overview_card3_title: 'Thị trường ban đầu',
      overview_card3_body: 'Trung tâm dữ liệu, sản xuất điện tử và kho pin Lithium-ion.',

      vision_section_title: 'Tầm nhìn',
      vision_section_intro:
        'Trở thành tiêu chuẩn toàn cầu về dập lửa chính xác cho tài sản công nghệ cao và hạ tầng trọng yếu.',
      mission_section_title: 'Sứ mệnh',
      mission_section_intro:
        'Nghiên cứu, bảo hộ IP tại Việt Nam và Singapore, đồng thời cấp phép chiến lược cho đối tác công – tư.',

      lean_section_title: 'Lean Canvas rút gọn',
      lean_section_intro:
        'Chúng tôi giải quyết vấn đề cháy gây thiệt hại thứ cấp bằng IP và hợp tác sản xuất linh hoạt.',
      lean_card1_title: 'Vấn đề',
      lean_card1_body: 'Thiệt hại do nước/khí, cháy pin Li-ion và sự chậm chạp của hệ thống truyền thống.',
      lean_card2_title: 'Giải pháp',
      lean_card2_body: 'Đạn VFEP + Purple K siêu mịn + phần mềm nhắm mục tiêu chính xác.',
      lean_card3_title: 'Doanh thu',
      lean_card3_body: 'Phí cấp phép, tiền bản quyền định kỳ và tư vấn tích hợp.',

      tech_section_title: 'Công nghệ cốt lõi',
      tech_section_intro: 'Ba thành phần chính phối hợp: đạn, tác nhân chữa cháy và cảm biến/AI.',
      tech_tab1_btn: 'Đạn VFEP',
      tech_tab2_btn: 'Tác nhân Purple K',
      tech_tab3_btn: 'Cảm biến & AI',
      tech_tab1_title: 'Đạn VFEP (MVP)',
      tech_tab1_body: 'Thiết kế tương thích nền tảng paintball để thử nghiệm nhanh.',
      tech_tab1_list1: 'Hình cầu 0.68-cal, vỡ ngay khi chạm mục tiêu.',
      tech_tab1_list2: 'Vỏ gelatin hoặc polymer mỏng, phân hủy sinh học.',
      tech_tab1_list3: 'Tầm bắn hiệu quả 15–30 m cho không gian trong nhà.',
      tech_tab2_title: 'Tác nhân chữa cháy',
      tech_tab2_body: 'Potassium Bicarbonate (Purple K) siêu mịn, không ăn mòn.',
      tech_tab2_list1: 'Ngắt chuỗi phản ứng cháy loại B và C.',
      tech_tab2_list2: 'An toàn cho thiết bị điện tử, không để lại ăn mòn.',
      tech_tab2_list3: 'Màu tím theo chuẩn nhận diện công nghiệp.',
      tech_tab3_title: 'Cảm biến & AI',
      tech_tab3_body: 'Tự động hóa phát hiện – nhắm mục tiêu – kích hoạt.',
      tech_tab3_list1: 'Cảm biến đa phương thức: nhiệt, khói, quang phổ.',
      tech_tab3_list2: 'AI phân loại mối đe dọa và xác định toạ độ đám cháy.',
      tech_tab3_list3: 'Kích hoạt bắn ngay trước khi cháy lan rộng.',

      strategy_section_title: 'Chiến lược IP “vốn mỏng”',
      strategy_section_intro:
        'Vicinity Safety vận hành như một IP House: tập trung R&D, bảo hộ và cấp phép.',
      strategy_card1_title: 'Cấu trúc pháp lý',
      strategy_card1_body: 'IP giữ tại Singapore, R&D tại Việt Nam để tối ưu chi phí và pháp lý.',
      strategy_card2_title: 'Doanh thu hai tầng',
      strategy_card2_body: 'Phí cấp phép trả trước + royalty trên mỗi hệ thống đối tác bán ra.',
      strategy_card3_title: 'Lộ trình MVP',
      strategy_card3_body: 'Ưu tiên thử nghiệm thực địa, dùng linh kiện sẵn có để giảm rủi ro.',
      strategy_key_strategy_title: 'Hợp tác với Chính phủ',
      strategy_key_strategy_body:
        'Cấp phép miễn phí bản quyền cho cơ quan PCCC/Quốc phòng, tạo nhu cầu thị trường cho OEM trả phí.',

      market_section_title: 'Thị trường & tầm nhìn',
      market_section_intro:
        'Chiến lược “mặt đất trước, không gian sau” giúp tích luỹ dữ liệu và chứng nhận.',
      market_tab1_btn: 'Hạ tầng mặt đất',
      market_tab2_btn: 'Không gian & hàng không',
      market_tab1_title: 'Thị trường trọng tâm',
      market_tab1_list1: 'Trung tâm dữ liệu Viettel, FPT, VNG, CMC.',
      market_tab1_list2: 'Nhà máy điện tử Samsung, LG, Foxconn.',
      market_tab1_list3: 'Kho pin UPS/ESS với rủi ro thermal runaway.',
      market_tab2_title: 'Tầm nhìn dài hạn',
      market_tab2_list1: 'Môi trường vi trọng lực cần cơ chế phóng định hướng.',
      market_tab2_list2: 'Purple K bảo vệ hệ thống quang học nhạy cảm.',
      market_tab2_list3: 'Dữ liệu mặt đất tạo lợi thế đấu thầu NASA/ESA.',

      fin_section_title: 'Tài chính & nhu cầu vốn',
      fin_section_intro:
        'Dự phóng dòng tiền 8 quý dựa trên pipeline cấp phép hiện tại.',
      fin_chart_title: 'Biểu đồ dòng tiền (USD)',
      fin_table_title: 'Bảng dòng tiền chi tiết',
      fin_loading_msg: 'Đang tải dữ liệu tài chính...',
      fin_card1_title: 'Seed cần huy động',
      fin_card1_note: '100.000 USD cho 6 tháng R&D/POC.',
      fin_card2_title: 'Bridge/VC tiếp theo',
      fin_card2_note: '250.000 USD để scale sản xuất thử.',
      fin_card3_title: 'Tổng nhu cầu 2 năm',
      fin_card3_note: '350.000 USD đạt mốc cấp phép toàn cầu.',
      fin_chart_dataset_label: 'Dòng tiền ròng',
      fin_table_header_quarter: 'Quý',
      fin_table_header_revenue: 'Doanh thu (USD)',
      fin_table_header_expenses: 'Chi phí (USD)',
      fin_table_header_cashflow: 'Dòng tiền (USD)',

      adv_section_title: 'Lợi thế cạnh tranh',
      adv_section_intro: 'Chiến lược “vi mô” tạo ngách bảo vệ tài sản mà đối thủ chưa khai thác.',
      adv_tab1_btn: 'Phân tích đối thủ',
      adv_tab2_btn: 'USP cốt lõi',
      adv_tab1_title: 'Đối thủ hiện tại',
      adv_tab1_list1: 'Hệ thống khí Stat-X: bao phủ cả phòng, tốn chi phí niêm kín.',
      adv_tab1_list2: 'Launcher quốc phòng: động năng lớn, không dùng được trong nhà.',
      adv_tab1_list3: 'Chưa có giải pháp nào tối ưu cho tài sản điện tử.',
      adv_tab2_title: 'Giá trị độc đáo',
      adv_tab2_list1: 'Dập lửa chính xác, không ăn mòn.',
      adv_tab2_list2: 'Mô hình cấp phép linh hoạt – biên lợi nhuận cao.',
      adv_tab2_list3: 'Chính phủ trở thành đối tác tạo moat thị trường.',

      footer_note: '© 2025 Vicinity Safety. Dự án R&D công nghệ chữa cháy chính xác tại Việt Nam.'
    },
    en: {
      page_title: 'Vicinity Safety | VFEP Technology',
      header_title: 'Vicinity Safety',
      header_subtitle: 'VFEP Fire Technology',
      language_switch: 'Tiếng Việt',
      language_current: 'EN',

      overview_section_title: 'Project overview',
      overview_section_body:
        'Vicinity Safety develops VFEP – precision fire projectiles built for high-value assets such as data centers, electronics factories, and battery infrastructure.',
      overview_card1_title: 'Core technology',
      overview_card1_body: '0.68-cal non-corrosive firefighting rounds triggered with low kinetic energy.',
      overview_card2_title: 'Business model',
      overview_card2_body: 'Asset-light IP licensing plus technical support services.',
      overview_card3_title: 'Initial market',
      overview_card3_body: 'Data centers, electronics manufacturing, and lithium-ion battery depots.',

      vision_section_title: 'Vision',
      vision_section_intro:
        'Become the global standard for precise fire suppression that protects high-tech assets and critical infrastructure.',
      mission_section_title: 'Mission',
      mission_section_intro:
        'Conduct R&D in Vietnam, secure IP in Vietnam & Singapore, and license strategically to public-private partners.',

      lean_section_title: 'Lean Canvas snapshot',
      lean_section_intro:
        'We solve secondary-damage fire problems with IP and flexible manufacturing partnerships.',
      lean_card1_title: 'Problem',
      lean_card1_body: 'Water/gas damage, Li-ion thermal runaway, and slow legacy systems.',
      lean_card2_title: 'Solution',
      lean_card2_body: 'VFEP projectile + micronized Purple K + precision targeting software.',
      lean_card3_title: 'Revenue',
      lean_card3_body: 'Upfront licensing fees, recurring royalties, and integration consulting.',

      tech_section_title: 'Core technology',
      tech_section_intro: 'Three synchronized components: projectile, agent, and sensing/AI.',
      tech_tab1_btn: 'VFEP round',
      tech_tab2_btn: 'Purple K agent',
      tech_tab3_btn: 'Sensors & AI',
      tech_tab1_title: 'VFEP projectile (MVP)',
      tech_tab1_body: 'Compatible with paintball launchers for rapid prototyping.',
      tech_tab1_list1: '0.68-cal sphere that fractures on contact.',
      tech_tab1_list2: 'Gelatin or thin biodegradable polymer shell.',
      tech_tab1_list3: '15–30 m indoor operational range.',
      tech_tab2_title: 'Extinguishing agent',
      tech_tab2_body: 'Micronized Potassium Bicarbonate (Purple K), non-corrosive.',
      tech_tab2_list1: 'Breaks the chemical chain of Class B & C fires.',
      tech_tab2_list2: 'Safe for electronics, leaves no corrosive residue.',
      tech_tab2_list3: 'Purple color for industrial recognition.',
      tech_tab3_title: 'Sensors & AI',
      tech_tab3_body: 'Automates detection, targeting, and launch.',
      tech_tab3_list1: 'Multi-modal sensing: thermal, smoke, spectral.',
      tech_tab3_list2: 'AI classifies threats and pinpoints coordinates.',
      tech_tab3_list3: 'Fires before the incident escalates.',

      strategy_section_title: 'Asset-light IP strategy',
      strategy_section_intro:
        'Vicinity Safety operates as an IP House: focus on R&D, protection, and licensing.',
      strategy_card1_title: 'Legal structure',
      strategy_card1_body: 'Hold IP in Singapore, run R&D in Vietnam for cost and legal efficiency.',
      strategy_card2_title: 'Dual revenue',
      strategy_card2_body: 'Upfront license fees plus per-system royalties.',
      strategy_card3_title: 'MVP roadmap',
      strategy_card3_body: 'Prioritize live pilots using off-the-shelf hardware to de-risk.',
      strategy_key_strategy_title: 'Government partnership',
      strategy_key_strategy_body:
        'Royalty-free licenses for Fire/Defense agencies create guaranteed demand for OEM partners.',

      market_section_title: 'Market & vision',
      market_section_intro: '“Ground first, orbit later” builds data and certifications step by step.',
      market_tab1_btn: 'Terrestrial focus',
      market_tab2_btn: 'Aerospace vision',
      market_tab1_title: 'Core market',
      market_tab1_list1: 'Data centers: Viettel, FPT, VNG, CMC.',
      market_tab1_list2: 'Electronics manufacturing: Samsung, LG, Foxconn.',
      market_tab1_list3: 'UPS/ESS battery rooms facing thermal runaway risks.',
      market_tab2_title: 'Long-term vision',
      market_tab2_list1: 'Microgravity needs directional suppression.',
      market_tab2_list2: 'Purple K safeguards sensitive optics.',
      market_tab2_list3: 'Ground data underpins NASA/ESA bids.',

      fin_section_title: 'Financials & funding ask',
      fin_section_intro: '8-quarter cash-flow outlook based on current licensing pipeline.',
      fin_chart_title: 'Cash-flow chart (USD)',
      fin_table_title: 'Detailed cash-flow table',
      fin_loading_msg: 'Loading financial data...',
      fin_card1_title: 'Seed requirement',
      fin_card1_note: 'US$100k for 6-month R&D/POC.',
      fin_card2_title: 'Next Bridge/VC',
      fin_card2_note: 'US$250k to scale pilot manufacturing.',
      fin_card3_title: 'Total 2-year ask',
      fin_card3_note: 'US$350k to reach global licensing milestones.',
      fin_chart_dataset_label: 'Net cash flow',
      fin_table_header_quarter: 'Quarter',
      fin_table_header_revenue: 'Revenue (USD)',
      fin_table_header_expenses: 'Expenses (USD)',
      fin_table_header_cashflow: 'Cash Flow (USD)',

      adv_section_title: 'Competitive advantage',
      adv_section_intro: 'Our “micro” approach protects assets where others cannot.',
      adv_tab1_btn: 'Competitor view',
      adv_tab2_btn: 'Core USP',
      adv_tab1_title: 'Current landscape',
      adv_tab1_list1: 'Stat-X gas flooding: needs sealed rooms and high CAPEX.',
      adv_tab1_list2: 'Defense launchers: high kinetic force, unusable indoors.',
      adv_tab1_list3: 'No existing solution optimizes for electronics.',
      adv_tab2_title: 'Unique selling points',
      adv_tab2_list1: 'Precise, non-corrosive suppression.',
      adv_tab2_list2: 'Flexible licensing with high margins.',
      adv_tab2_list3: 'Government alliances build a market moat.',

      footer_note: '© 2025 Vicinity Safety. Precision fire R&D project based in Vietnam.'
    }
  };

  let currentLang = localStorage.getItem('lang') || 'vi';
  window.appLanguage = currentLang;

  const sections = [
    'header',
    'overview',
    'vision',
    'lean-canvas',
    'technology',
    'strategy',
    'market',
    'financials',
    'advantage',
    'footer'
  ];

  window.getTranslation = function getTranslation(lang, key) {
    return LANGUAGE_DATA[lang]?.[key] ?? LANGUAGE_DATA.vi?.[key] ?? '';
  };

  async function importSections() {
    const fetches = sections.map((section) =>
      fetch(`sections/${section}.html`)
        .then((res) => (res.ok ? res.text() : `<p class="text-red-600">Không thể tải ${section}</p>`))
        .catch(() => `<p class="text-red-600">Lỗi tải ${section}</p>`)
    );

    const htmlChunks = await Promise.all(fetches);

    htmlChunks.forEach((html, index) => {
      const slot = document.getElementById(sections[index]);
      if (slot) slot.innerHTML = html;
    });

    applyTranslations(currentLang);

    if (typeof window.initializeApp === 'function') {
      window.initializeApp();
    }
  }

  function applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.title = getTranslation(lang, 'page_title') || document.title;

    document.querySelectorAll('[data-key]').forEach((el) => {
      const key = el.getAttribute('data-key');
      if (!key) return;
      const translation = getTranslation(lang, key);
      if (translation !== undefined) {
        el.innerHTML = translation;
      }
    });

    const switchBtn = document.getElementById('language-switch-btn');
    const currentBadge = document.getElementById('language-current');
    if (switchBtn) switchBtn.textContent = getTranslation(lang, 'language_switch');
    if (currentBadge) currentBadge.textContent = getTranslation(lang, 'language_current');

    currentLang = lang;
    window.appLanguage = lang;
    localStorage.setItem('lang', lang);

    window.dispatchEvent(new CustomEvent('app-language-changed', { detail: { lang } }));
  }

  window.switchLanguage = function switchLanguage(nextLang) {
    if (nextLang === currentLang) return;
    applyTranslations(nextLang);
  };

  document.addEventListener('DOMContentLoaded', importSections);
})();
