// assets/js/importSections.js

/**
 * 🇻🇳 VIETNAMESE TO 🇬🇧 ENGLISH TRANSLATION DICTIONARY
 * * * Centralized dictionary for translating static text and section titles.
 */
const LANGUAGE_DATA = {
    'vi': {
        // --- GLOBAL/HEADER ---
        'page_title': 'Vicinity Safety | Công Nghệ Dập Lửa Chính Xác VFEP',
        'header_main_title': 'Thông Tin Dự Án', 
        'header_subtitle': '| Công Nghệ VFEP', 
        'language_switch': 'English', 
        'language_current': 'VN', 
        
        // --- SECTION NAVIGATION TITLES (Used in main.js for tabs) ---
        'nav_overview': 'Tổng quan',
        'nav_vision': 'Tầm nhìn & Sứ mệnh',
        'nav_lean_canvas': 'Mô hình Lean Canvas',
        'nav_technology': 'Công nghệ',
        'nav_strategy': 'Chiến lược',
        'nav_market': 'Phân tích Thị trường',
        'nav_financials': 'Tài chính',
        'nav_advantage': 'Lợi thế Cạnh tranh',
        
        // --- FOOTER ---
        'footer_copyright_p1': '© 2025 Vicinity Safety. Mọi quyền sở hữu trí tuệ đang trong quá trình đăng ký.',
        'footer_note_p2': 'Vicinity Safety là một dự án R&D công nghệ cao tại Việt Nam.',

        // --- Content Keys for sections/overview.html ---
        'overview_hero_title': 'Vicinity Safety: Công Nghệ Dập Lửa VFEP',
        'overview_hero_p1': 'Chào mừng bạn đến với phân tích tương tác của Vicinity Safety. Chúng tôi phát triển công nghệ VFEP: giải pháp dập lửa bằng đạn phóng (projectile) thế hệ mới, được thiết kế đặc biệt để bảo vệ các tài sản giá trị cao, ví dụ như khỏi bị phá hủy bởi các phương pháp chữa cháy truyền thống.',
        'overview_highlight_1': 'trung tâm dữ liệu',
        'overview_highlight_2': 'dây chuyền sản xuất điện tử',
        'overview_card1_title': 'Công Nghệ Cốt Lõi',
        'overview_card1_p': 'Đạn phóng VFEP© chính xác cao, không gây hư hại (non-corrosive).',
        'overview_card2_title': 'Mô Hình Kinh Doanh',
        'overview_card2_p': '"Vốn mỏng" (Asset-light), tập trung vào cấp phép Sở Hữu Trí Tuệ (IP).',
        'overview_card3_title': 'Mục Tiêu Thực Tế',
        'overview_card3_p': 'Trung tâm Dữ liệu, Nhà máy Sản xuất, và Hạ tầng Pin Năng lượng.',
        
        // --- Content Keys for sections/vision.html ---
        'vision_h': 'Tầm Nhìn (Vision)',
        'vision_p': 'Trở thành tiêu chuẩn toàn cầu về dập tắt hỏa hoạn chính xác, không gây hư hại cho các tài sản công nghệ cao và cơ sở hạ tầng quan trọng, bắt đầu từ các trung tâm dữ liệu và nhà máy sản xuất trên mặt đất, và vươn đến các ứng dụng hàng không vũ trụ.',
        'mission_h': 'Sứ Mệnh (Mission)',
        'mission_p': 'Sứ mệnh của Vicinity Safety là dẫn đầu R&D tại Việt Nam, nắm giữ Sở Hữu Trí Tuệ (IP) cho thiết kế và quy trình sản xuất của Firefighting Bullet-VFEV©, đồng thời cung cấp giấy phép chiến lược, miễn phí bản quyền cho các cơ quan chính phủ (Quốc phòng, PCCC) để đảm bảo an toàn cho cơ sở hạ tầng quốc gia.',
        
        // --- Content Keys for sections/market.html ---
        'market_main_title': 'Thị Trường & Tầm Nhìn',
        'market_intro_p': 'Chiến lược của chúng tôi là tập trung vào các thị trường tại Việt Nam và khu vực, sau đó mở rộng ra các ứng dụng tương lai có giá trị cao.',
        'market_highlight': 'thiết thực, có nhu cầu ngay lập tức',
        'market_tab_ground_btn': '1. Thị Trường Trọng Tâm (Mặt Đất)',
        'market_tab_space_btn': '2. Tầm Nhìn Tương Lai (Hàng Không & Vũ Trụ)',
        'market_ground_h': 'Thị Trường Trọng Tâm (Trung Tâm Dữ Liệu, Nhà máy, Pin Li-ion)',
        'market_ground_p_intro': 'Bảo vệ cơ sở hạ tầng quan trọng nơi mà thiệt hại thứ cấp (secondary damage) còn tốn kém hơn cả đám cháy.',
        'market_ground_item1_strong': 'Mục tiêu:',
        'market_ground_item1': 'Trung tâm dữ liệu (Data Centers) (Viettel, FPT, VNG, CMC) và các nhà máy sản xuất điện tử FDI (Samsung, LG, Foxconn).',
        'market_ground_item2_strong': 'Vấn đề:',
        'market_ground_item2': 'Cháy pin Lithium-ion (trong hệ thống UPS) có thể gây ra hiện tượng "thoát nhiệt" (thermal runaway) cực kỳ nguy hiểm.',
        'market_ground_item3_strong': 'Giải pháp VFEP:',
        'market_ground_item3': 'Cung cấp khả năng dập lửa chính xác, không dùng nước, không ăn mòn, ngăn chặn đám cháy lây lan mà không phá hủy toàn bộ hàng rack máy chủ.',
        'market_space_h': 'Tầm Nhìn Tương Lai (Hàng Không & Vũ Trụ)',
        'market_space_p_intro': 'Đây là thị trường R&D dài hạn. Bằng cách giải quyết các vấn đề trên mặt đất, chúng tôi xây dựng nền tảng (dữ liệu, IP, chứng nhận) để trở thành nhà cung cấp cho NASA, ESA, Boeing... trong tương lai, khi công nghệ đã được chứng minh.',
        'market_space_item1_strong': 'Vấn đề 1: Độ tin cậy Zero-G:',
        'market_space_item1': 'Chất chữa cháy truyền thống phân tán không thể đoán trước trong môi trường vi trọng lực. Hệ thống đạn phóng của VFEP là một giải pháp tiềm năng.',
        'market_space_item2_strong': 'Vấn đề 2: Không Gây Ô nhiễm:',
        'market_space_item2': 'Chất Purple K bảo vệ các hệ thống quang học nhạy cảm và hệ thống hỗ trợ sự sống.',

        // --- Content Keys for sections/strategy.html ---
        'strategy_main_title': 'Mô Hình Của Vicinity Safety: "Vốn Mỏng" & Lấy IP Làm Trung Tâm',
        'strategy_intro_p': 'Vicinity Safety không phải là một công ty sản xuất. Chúng tôi là một trung tâm R&D "không nhà máy" (fabless). Chiến lược của chúng tôi là phát triển, cấp bằng sáng chế, và cấp phép công nghệ cho các đối tác lớn, tạo ra doanh thu từ tài sản trí tuệ (IP) thay vì bán phần cứng vật lý.',
        'strategy_h1': '1. Cấu Trúc Pháp Lý & IP (Thiết thực)',
        'strategy_l1_strong1': 'Nắm giữ IP tại Singapore:',
        'strategy_l1_item1': 'Thành lập một pháp nhân tại Singapore, một khu vực pháp lý ổn định và thân thiện với IP, để bảo vệ tài sản cốt lõi và thuận tiện cho giao dịch quốc tế.',
        'strategy_l1_strong2': 'R&D tại Việt Nam:',
        'strategy_l1_item2': 'Tận dụng nguồn nhân lực kỹ thuật chất lượng cao và chi phí R&D, tạo mẫu (prototyping) hiệu quả để tối ưu hóa chi phí.',
        'strategy_h2': '2. Mô Hình Doanh Thu (Lợi nhuận cao)',
        'strategy_l2_strong1': 'Phí Cấp Phép (Licensing Fees):',
        'strategy_l2_item1': 'Phí trả trước từ các OEM và đối tác tích hợp hệ thống (ví dụ: các nhà thầu PCCC lớn) để được quyền sử dụng công nghệ.',
        'strategy_l2_strong2': 'Tiền Bản Quyền (Royalties):',
        'strategy_l2_item2': 'Doanh thu phần trăm định kỳ trên mỗi đơn vị hệ thống được bán ra bởi các đối tác.',
        'strategy_h_key_strategy': 'Chiến Lược Then Chốt: Hợp Tác Với Chính Phủ',
        'strategy_p_key_strategy': 'Cung cấp giấy phép miễn phí bản quyền (royalty-free) cho các cơ quan chính phủ (Quốc phòng, PCCC, An ninh). Chiến lược này tạo dựng lòng tin, biến chính phủ thành đối tác và tạo ra một "con hào thị trường" (market moat) khổng lồ. Các nhà sản xuất được cấp phép (người trả tiền cho Vicinity Safety) sẽ có một thị trường chính phủ được đảm bảo.',
        'strategy_h_value_prop': 'Đề Xuất Giá Trị (Value Proposition)',
        'strategy_p_value_prop': 'Đầu tư vào Vicinity Safety là cơ hội để sở hữu IP có lợi nhuận cao và đảm bảo vị thế trong thế hệ công nghệ dập lửa chuyên biệt, giảm thiểu thiệt hại, tận dụng mô hình kinh doanh "vốn mỏng" bền vững và thực tế tại Việt Nam.',
        'strategy_card1_h': '1. Tác Động Bền Vững & Giá Trị Cao',
        'strategy_card1_p': 'Giải quyết các mối đe dọa cháy nổ tốn kém nhất mà không gây ra hậu quả phá hủy. Cung cấp giải pháp chữa cháy không dùng nước (waterless), giảm thiểu thiệt hại thứ cấp và chi phí dọn dẹp cho trung tâm dữ liệu, nhà máy.',
        'strategy_card2_h': '2. Mô Hình Cấp Phép Linh Hoạt & "Vốn Mỏng"',
        'strategy_card2_p': 'Mô hình kinh doanh là một "IP House". Doanh thu chính đến từ việc bán giấy phép công nghệ VFB©. Điều này bỏ qua nhu cầu chi tiêu vốn (CAPEX) khổng lồ cho nhà máy, kho bãi và logistics toàn cầu.',
        'strategy_card3_h': '3. Chiến Lược Phát Triển Đã Giảm Thiểu Rủi Ro',
        'strategy_card3_p': 'Sử dụng phương pháp MVP tinh gọn, tập trung vốn vào thử nghiệm và xác nhận IP. Bằng cách điều chỉnh các thành phần có sẵn (như súng paintball), chúng tôi có thể nhanh chóng chứng minh tính khả thi trước khi đầu tư vào sản xuất hàng loạt.',

        // --- Content Keys for sections/technology.html ---
        'tech_main_title': 'Khám Phá Công Nghệ Cốt Lõi',
        'tech_intro_p': 'Hệ thống VFEP bao gồm ba thành phần chính hoạt động đồng bộ. Trái tim của hệ thống là Viên Đạn Chữa Cháy-VFP© được thiết kế để không gây hư hại. Nhấp vào các tab dưới đây để xem thông số kỹ thuật chi tiết của từng bộ phận.',
        'tech_intro_highlight': 'Viên Đạn Chữa Cháy-VFP©',
        'tech_tab1_btn': '1. Đạn Phóng VFP© (MVP)',
        'tech_tab2_btn': '2. Chất Chữa Cháy (Agent)',
        'tech_tab3_btn': '3. Cảm Biến & AI',

        // Tech Projectile Tab
        'tech_proj_h': 'Thông Số Kỹ Thuật Chi Tiết: Đạn Phóng VFP©',
        'tech_proj_p': 'Đạn VFP© là cốt lõi của IP, được thiết kế để cân bằng giữa khả năng tương thích với súng hiện có và hiệu suất phân tán hóa chất khi va chạm.',
        'tech_proj_table_h1': 'Thuộc Tính',
        'tech_proj_table_h2': 'Thông Số Thiết Kế',
        'tech_proj_table_h3': 'Lý Do Kỹ Thuật & Ghi Chú',
        'tech_proj_row1_h': 'Hình dạng',
        'tech_proj_row1_p1': 'Hình cầu (Round Ball)',
        'tech_proj_row1_p2': 'Tương thích với súng paintball 0.68-caliber tiêu chuẩn.',
        'tech_proj_row2_h': 'Cỡ nòng',
        'tech_proj_row2_p1': '0.68 inch (khoảng 17.3 mm)',
        'tech_proj_row2_p2': 'Cỡ nòng paintball tiêu chuẩn.',
        'tech_proj_row3_h': 'Vật liệu vỏ',
        'tech_proj_row3_p1': 'Gelatin giòn hoặc Polymer phân hủy sinh học siêu mỏng',
        'tech_proj_row3_p2': 'Phải đủ mạnh để bắn, nhưng vỡ tan đáng tin cậy khi va chạm.',
        'tech_proj_row4_h': 'Hóa chất',
        'tech_proj_row4_p1': 'Potassium Bicarbonate (Purple K)',
        'tech_proj_row4_p2': 'Hóa chất khô hiệu quả cao (mỗi đơn vị khối lượng) cho cháy Loại B & C.',
        'tech_proj_row5_h': 'Trạng thái hóa chất',
        'tech_proj_row5_p1': 'Bột siêu mịn (Micronized Ultra-Fine)',
        'tech_proj_row5_p2': 'Cần thiết để phân tán dạng sương mù nhanh, rộng (kể cả trong góc khuất).',
        'tech_proj_row6_h': 'Tốc độ đạn',
        'tech_proj_row6_p1': '250-300 FPS',
        'tech_proj_row6_p2': 'Giới hạn tiêu chuẩn của súng paintball. Cung cấp động năng để vỡ vỏ.',
        'tech_proj_row7_h': 'Tầm bay hiệu quả',
        'tech_proj_row7_p1': '15-30 mét',
        'tech_proj_row7_p2': 'Phụ thuộc vào trọng lượng và lực cản không khí; tầm bắn thực tế.',
        'tech_proj_row8_h': 'Trọng lượng (Tổng)',
        'tech_proj_row8_p1': '3.0-4.0 gram',
        'tech_proj_row8_p2': 'Cân bằng giữa tải trọng hóa chất và tốc độ/tầm bắn.',
        'tech_proj_row9_h': 'Màu sắc',
        'tech_proj_row9_p1': 'Màu tím (Purple)',
        'tech_proj_row9_p2': 'Phù hợp với mã màu công nghiệp của Purple K.',
        'tech_proj_row10_h': 'Hiệu quả',
        'tech_proj_row10_p1': 'Cao với cháy Loại B & C (Ngắt chuỗi phản ứng)',
        'tech_proj_row10_p2': 'Lưu ý: Phụ thuộc vào việc nhắm chính xác vào gốc lửa.',
        'tech_proj_row11_h': 'Dư lượng',
        'tech_proj_row11_p1': 'Để lại dư lượng không ăn mòn (non-corrosive)',
        'tech_proj_row11_p2': 'Tốt hơn bột ABC cho điện tử, nhưng vẫn cần dọn dẹp (không phải "clean agent").',

        // Tech Agent Tab
        'tech_agent_h': 'Chất Chữa Cháy: Potassium Bicarbonate (Purple K)',
        'tech_agent_p': 'Sử dụng hóa chất khô hiệu suất cao, không ăn mòn để bảo vệ các thiết bị điện tử nhạy cảm.',
        'tech_agent_l1_strong': 'Loại:',
        'tech_agent_l1_item': 'Hóa chất khô, dạng bột siêu mịn (Micronized).',
        'tech_agent_l2_strong': 'Hiệu quả:',
        'tech_agent_l2_item': 'Dập tắt đám cháy Loại B (chất lỏng) và C (điện) bằng cách ngăn chặn chuỗi phản ứng hóa học của đám cháy.',
        'tech_agent_l3_strong': 'Ưu điểm:',
        'tech_agent_l3_item': 'Không ăn mòn, không độc hại (so với Halon), an toàn cho thiết bị điện tử và không gây ô nhiễm thứ cấp.',
        'tech_agent_l4_strong': 'Màu sắc:',
        'tech_agent_l4_item': 'Màu tím (Purple) - mã màu công nghiệp tiêu chuẩn.',

        // Tech Sensor Tab
        'tech_sensor_h': 'Hệ Thống Phát Hiện Tự Động (AI-Driven)',
        'tech_sensor_p': 'Mục tiêu cuối cùng của hệ thống là hoàn toàn tự động, sử dụng AI để phát hiện và phản ứng nhanh hơn con người.',
        'tech_sensor_l1_strong': 'Cảm biến:',
        'tech_sensor_l1_item': 'Đa phương thức (ví dụ: nhiệt, khói, quang phổ) để giám sát liên tục.',
        'tech_sensor_l2_strong': 'Trí tuệ nhân tạo (AI):',
        'tech_sensor_l2_item': 'Các thuật toán thông minh để phân loại mối đe dọa, định vị đám cháy và kích hoạt hệ thống phóng.',
        'tech_sensor_l3_strong': 'Mục tiêu:',
        'tech_sensor_l3_item': 'Phản ứng tức thì tại các khoang không người lái hoặc ở xa, đảm bảo dập tắt đám cháy "trước khi chúng có thể vượt khỏi tầm kiểm soát."',

        // --- Content Keys for sections/financials.html ---
        'fin_main_title': 'Dự Báo Tài Chính & Kêu Gọi Vốn',
        'fin_intro_p': 'Phần này trình bày chi tiết về dự báo dòng tiền trong 2 năm (8 quý) dựa trên mô hình kinh doanh cấp phép IP và các mốc quan trọng. Dữ liệu được tải trực tiếp từ Google Sheet của chúng tôi.',
        'fin_chart_title': 'Biểu Đồ Dòng Tiền 8 Quý (USD)',
        'fin_loading_msg': 'Đang tải dữ liệu tài chính trực tiếp từ Google Sheet...',
        'fin_table_title': 'Chi Tiết Kế Hoạch Tài Chính (USD)',
        'fin_card1_h': 'Vốn Kêu Gọi (Seed)',
        'fin_card1_amount': '$100,000',
        'fin_card1_p': '(Cho Q1 Năm 1)',
        'fin_card2_h': 'Vòng VC/Angel (Tiếp theo)',
        'fin_card2_amount': '$250,000',
        'fin_card2_p': '(Dự kiến Q1 Năm 2)',
        'fin_card3_h': 'Tổng Vốn Kêu Gọi (2 Năm)',
        'fin_card3_amount': '$350,000',
        'fin_card3_p': '(Để đạt được các mốc quan trọng)',

        // --- Content Keys for sections/advantage.html ---
        'adv_main_title': 'Lợi Thế Cạnh Tranh & So Sánh',
        'adv_intro_p': 'Lợi thế của Vicinity Safety không chỉ đến từ công nghệ, mà còn từ chiến lược "vi mô" độc đáo, trái ngược hoàn toàn với các giải pháp "vĩ mô" hiện có trên thị trường.',
        'adv_tab1_btn': '1. Phân Tích Đối Thủ',
        'adv_tab2_btn': '2. Giá Trị Cốt Lõi (USP)',
        'adv_direct_h': 'So Sánh Chiến Lược: Chính xác (Vicinity) vs. Bao phủ (Đối thủ)',
        'adv_direct_p': 'Chúng tôi không cạnh tranh trực tiếp; chúng tôi tạo ra một thị trường ngách mới về "bảo vệ tài sản".',
        'adv_direct_table_h1': 'Hệ Thống',
        'adv_direct_table_h2': 'Triết Lý Thiết Kế',
        'adv_direct_table_h3': 'Mục Tiêu',
        'adv_direct_table_h4': 'Điểm Yếu',
        'adv_direct_r1_c1': 'VFEP (Vicinity Safety)',
        'adv_direct_r1_c2_strong': 'Chiến lược Vi mô (Micro):',
        'adv_direct_r1_c2_p': 'Dùng động năng tối thiểu (3-4g) làm cơ chế kích hoạt để phân tán hóa chất chính xác.',
        'adv_direct_r1_c3': 'Bảo vệ tài sản cục bộ, không gây hư hại (tủ rack, thiết bị điện tử).',
        'adv_direct_r1_c4': 'Không hiệu quả cho các đám cháy lớn, ngoài trời.',
        'adv_direct_r2_c1': 'Stat-X (Global) / Hệ thống khí',
        'adv_direct_r2_c2': 'Thụ động, khối lượng lớn. Kích hoạt để phân tán aerosol/khí bao phủ toàn bộ phòng.',
        'adv_direct_r2_c3': 'Bao phủ toàn bộ phòng (room-scale), không định hướng.',
        'adv_direct_r2_c4': 'Tốn kém, cần hệ thống kín, có thể gây thiệt hại thứ cấp.',
        'adv_direct_r3_c1': 'Dàn Phóng (Quốc phòng VN)',
        'adv_direct_r3_c2_strong': 'Chiến lược Vĩ mô (Macro):',
        'adv_direct_r3_c2_p': 'Dùng động năng cực cao để vận chuyển khối lượng lớn (tầm bắn 250m).',
        'adv_direct_r3_c3': 'Dập tắt các đám cháy lớn, không thể tiếp cận (ví dụ: cháy rừng, tòa nhà).',
        'adv_direct_r3_c4': 'Phá hủy hoàn toàn mục tiêu; không thể sử dụng trong nhà/gần thiết bị.',
        'adv_usp_h': 'Giá Trị Cốt Lõi (USP)',
        'adv_usp_p': 'Đây là những giá trị mà chúng tôi cam kết với khách hàng, chia theo danh mục.',
        'adv_usp_table_h1': 'Danh Mục',
        'adv_usp_table_h2': 'Lợi Ích (USP)',
        'adv_usp_table_h3': 'Giá Trị cho Khách Hàng',
        'adv_usp_r1_c1': 'I. Công nghệ (Sản phẩm)',
        'adv_usp_r1_c2': 'Dập tắt chính xác, không ăn mòn',
        'adv_usp_r1_c3': 'Đảm bảo dập tắt cháy Loại C (điện) và B (chất lỏng) với thiệt hại tài sản (máy chủ, robot) ở mức tối thiểu.',
        'adv_usp_r2_c1': '',
        'adv_usp_r2_c2': 'Tùy biến cho Pin Lithium-ion',
        'adv_usp_r2_c3': 'Cung cấp một lựa chọn dập lửa và làm mát chuyên biệt (với lõi gel) để xử lý "thoát nhiệt" (thermal runaway).',
        'adv_usp_r3_c1': '',
        'adv_usp_r3_c2': 'Cơ chế phóng (Cỡ 0.68)',
        'adv_usp_r3_c3': 'Đảm bảo triển khai nhanh, đào tạo đơn giản, và tiếp cận ngay lập tức với nền tảng phóng có thể sản xuất hàng loạt (không phải súng).',
        'adv_usp_r4_c1': 'II. Chiến lược (Mô hình)',
        'adv_usp_r4_c2': 'Giấy phép "Mã Nguồn Mở" cho Chính Phủ',
        'adv_usp_r4_c3': 'Tạo ra một con hào thị trường (market moat) toàn cầu; các chính phủ trở thành đối tác trung thành, đảm bảo thị trường cho nhà sản xuất (người trả tiền bản quyền).',
        'adv_usp_r5_c1': '',
        'adv_usp_r5_c2': 'Đòn bẩy Tài chính Cao',
        'adv_usp_r5_c3': 'Cung cấp biên lợi nhuận đặc biệt và khả năng mở rộng, giảm vốn sản xuất trong khi vẫn đảm bảo doanh thu cao, định kỳ.',
        'adv_usp_r6_c1': '',
        'adv_usp_r6_c2': 'Cấu trúc IP (Sing) / R&D (ĐNÁ)',
        'adv_usp_r6_c3': 'Giảm thiểu rủi ro bằng cách bảo vệ tài sản cốt lõi theo khung pháp lý tốt nhất thế giới, đồng thời tối đa hóa hiệu quả chi phí phát triển.',
        
        // --- Content Keys for sections/lean-canvas.html ---
        'lc_main_title': 'Mô Hình Lean Canvas',
        'lc_intro_p': 'Mô hình kinh doanh của chúng tôi được tóm tắt bằng công cụ Lean Canvas, tập trung vào việc giải quyết các vấn đề tốn kém nhất của khách hàng.',
        'lc_col1_title': '1. Vấn Đề (Problems)',
        'lc_col1_item1': 'Thiệt hại thứ cấp (do nước/khí) lớn hơn thiệt hại ban đầu.',
        'lc_col1_item2': 'Không có giải pháp dập tắt chính xác, cục bộ cho pin Li-ion đang thoát nhiệt.',
        'lc_col1_item3': 'Thời gian dừng hoạt động (Downtime) sau khi chữa cháy quá lâu.',
        'lc_col2_title': '2. Giải Pháp (Solution)',
        'lc_col2_item1': 'Hệ thống phóng viên đạn dập lửa không ăn mòn.',
        'lc_col2_item2': 'Sử dụng hóa chất khô/gel chuyên biệt cho các vụ cháy điện/Li-ion.',
        'lc_col2_item3': 'Phát hiện và phản ứng bằng AI trong vòng <0.5 giây.',
        'lc_col3_title': '3. Chỉ Số Chính (Key Metrics)',
        'lc_col3_item1': 'Tỷ lệ Giảm Thiệt hại Tài sản.',
        'lc_col3_item2': 'Thời gian Phản ứng (Time-to-kill).',
        'lc_col3_item3': 'Doanh thu từ Cấp phép IP & Bản quyền.',
        'lc_col4_title': '4. Đề Xuất Giá Trị Độc Nhất (UVP)',
        'lc_col4_p1': 'Chữa cháy chính xác. Không gây hư hại. Không cần dọn dẹp (Tối thiểu).',
        'lc_col4_p2': 'Bảo vệ thiết bị điện tử tốt hơn 80% so với giải pháp hiện có.',
        'lc_col5_title': '5. Lợi Thế Không Thể Bắt Chước (Unfair Advantage)',
        'lc_col5_item1': 'Cấu trúc IP "Royalty-free" cho Chính phủ.',
        'lc_col5_item2': 'Tối ưu hóa chi phí R&D tại Việt Nam.',
        'lc_col5_item3': 'Kiến thức chuyên môn về vật liệu phóng, hóa học khô, và AI.',
        'lc_col6_title': '6. Kênh (Channels)',
        'lc_col6_item1': 'Cấp phép trực tiếp cho các OEM và nhà thầu PCCC lớn.',
        'lc_col6_item2': 'Hợp tác R&D với các công ty Quốc phòng/Hàng không vũ trụ.',
        'lc_col7_title': '7. Phân Khúc Khách Hàng (Customer Segments)',
        'lc_col7_item1': 'Trung tâm Dữ liệu (Data Centers) và Viễn thông.',
        'lc_col7_item2': 'Sản xuất điện tử và Pin Lithium-ion.',
        'lc_col7_item3': 'Kho chứa vật tư, phòng máy chủ nhỏ.',
        'lc_col8_title': '8. Cấu Trúc Chi Phí (Cost Structure)',
        'lc_col8_item1': 'Chi phí R&D và Tạo mẫu (Prototyping).',
        'lc_col8_item2': 'Chi phí Đăng ký/Bảo vệ IP toàn cầu.',
        'lc_col8_item3': 'Chi phí Nhân sự Kỹ thuật.',
        'lc_col9_title': '9. Dòng Doanh Thu (Revenue Streams)',
        'lc_col9_item1': 'Phí Cấp phép (Licensing fees - trả trước).',
        'lc_col9_item2': 'Tiền Bản quyền (Royalties - định kỳ).',
        'lc_col9_item3': 'Hợp đồng R&D chính phủ (đột xuất).',
    },
    'en': {
        // --- GLOBAL/HEADER ---
        'page_title': 'Vicinity Safety | Precise Fire Extinguishing Technology VFEP',
        'header_main_title': 'Project Information', 
        'header_subtitle': '| VFEP Technology', 
        'language_switch': 'Tiếng Việt', 
        'language_current': 'EN', 

        // --- SECTION NAVIGATION TITLES (Used in main.js for tabs) ---
        'nav_overview': 'Overview',
        'nav_vision': 'Vision & Mission',
        'nav_lean_canvas': 'Lean Canvas Model',
        'nav_technology': 'Technology',
        'nav_strategy': 'Strategy',
        'nav_market': 'Market Analysis',
        'nav_financials': 'Financials',
        'nav_advantage': 'Competitive Advantage',

        // --- FOOTER ---
        'footer_copyright_p1': '© 2025 Vicinity Safety. All intellectual property rights are in the process of registration.',
        'footer_note_p2': 'Vicinity Safety is a high-tech R&D project based in Vietnam.',
        
        // --- Content Keys for sections/overview.html ---
        'overview_hero_title': 'Vicinity Safety: VFEP Extinguishing Technology',
        'overview_hero_p1': 'Welcome to the interactive analysis of Vicinity Safety. We develop VFEP technology: a next-generation projectile-based extinguishing solution specifically designed to protect high-value assets, for example from destruction by traditional fire suppression methods.',
        'overview_highlight_1': 'data centers',
        'overview_highlight_2': 'electronic production lines',
        'overview_card1_title': 'Core Technology',
        'overview_card1_p': 'High-precision, non-corrosive VFEP© projectiles.',
        'overview_card2_title': 'Business Model',
        'overview_card2_p': 'Asset-light approach, focused on Intellectual Property (IP) licensing.',
        'overview_card3_title': 'Target Applications',
        'overview_card3_p': 'Data Centers, Manufacturing Plants, and Energy Battery Infrastructure.',
        
        // --- Content Keys for sections/vision.html ---
        'vision_h': 'Vision',
        'vision_p': "To become the global standard for precise fire suppression that causes zero damage to high-tech assets and critical infrastructure, starting from ground-based data centers and manufacturing plants, and extending to aerospace applications.",
        'mission_h': 'Mission',
        'mission_p': 'Vicinity Safety’s mission is to lead R&D in Vietnam, holding the Intellectual Property (IP) for the design and manufacturing process of the Firefighting Bullet-VFEV©, while strategically offering royalty-free licenses to government agencies (Defense, Fire Services) to ensure national infrastructure safety.',
        
        // --- Content Keys for sections/market.html ---
        'market_main_title': 'Market & Vision',
        'market_intro_p': 'Our strategy is to focus on practical, immediate-demand markets in Vietnam and the region, and then expand to high-value future applications.',
        'market_highlight': 'practical, immediate-demand',
        'market_tab_ground_btn': '1. Core Market (Ground)',
        'market_tab_space_btn': '2. Future Vision (Aerospace & Space)',
        'market_ground_h': 'Core Market (Data Centers, Factories, Li-ion Batteries)',
        'market_ground_p_intro': 'Protecting critical infrastructure where secondary damage is more costly than the fire itself.',
        'market_ground_item1_strong': 'Target:',
        'market_ground_item1': 'Data Centers (Viettel, FPT, VNG, CMC) and FDI electronic manufacturing plants (Samsung, LG, Foxconn).',
        'market_ground_item2_strong': 'Problem:',
        'market_ground_item2': 'Lithium-ion battery fires (in UPS systems) can cause extremely dangerous "thermal runaway" events.',
        'market_ground_item3_strong': 'VFEP Solution:',
        'market_ground_item3': 'Provides precise, non-water, non-corrosive fire suppression, stopping fire spread without destroying entire racks of servers.',
        'market_space_h': 'Future Vision (Aerospace & Space)',
        'market_space_p_intro': 'This is the long-term R&D market. By solving ground-based problems, we build the foundation (data, IP, certification) to become a supplier to NASA, ESA, Boeing... in the future, once the technology is proven.',
        'market_space_item1_strong': 'Problem 1: Zero-G Reliability:',
        'market_space_item1': 'Traditional extinguishing agents disperse unpredictably in microgravity. VFEP’s projectile system is a potential solution.',
        'market_space_item2_strong': 'Problem 2: Non-Contamination:',
        'market_space_item2': 'Purple K protects sensitive optical systems and life support systems.',

        // --- Content Keys for sections/strategy.html ---
        'strategy_main_title': 'Vicinity Safety Model: Asset-Light & IP-Centric',
        'strategy_intro_p': 'Vicinity Safety is not a manufacturing company. We are a "fabless" R&D center. Our strategy is to develop, patent, and license technology to major partners, generating revenue from intellectual property (IP) rather than selling physical hardware.',
        'strategy_h1': '1. Legal & IP Structure (Pragmatic)',
        'strategy_l1_strong1': 'IP Holding in Singapore:',
        'strategy_l1_item1': 'Establish a legal entity in Singapore, a stable and IP-friendly jurisdiction, to protect core assets and facilitate international transactions.',
        'strategy_l1_strong2': 'R&D in Vietnam:',
        'strategy_l1_item2': 'Leverage high-quality technical human resources and cost-effective R&D and prototyping to optimize expenses.',
        'strategy_h2': '2. Revenue Model (High-Margin)',
        'strategy_l2_strong1': 'Licensing Fees:',
        'strategy_l2_item1': 'Upfront fees from OEMs and system integration partners (e.g., large fire protection contractors) for the right to use the technology.',
        'strategy_l2_strong2': 'Royalties:',
        'strategy_l2_item2': 'Recurring percentage revenue on every system unit sold by partners.',
        'strategy_h_key_strategy': 'Key Strategy: Government Partnership',
        'strategy_p_key_strategy': 'Provide royalty-free licenses to government agencies (Defense, Fire Services, Security). This strategy builds trust, turns the government into a partner, and creates a massive "market moat." Licensed manufacturers (who pay Vicinity Safety) will have a guaranteed government market.',
        'strategy_h_value_prop': 'Value Proposition',
        'strategy_p_value_prop': 'Investing in Vicinity Safety is an opportunity to own high-margin IP and secure a position in the next generation of specialized, damage-minimizing fire suppression technology, leveraging a sustainable and pragmatic "asset-light" business model based in Vietnam.',
        'strategy_card1_h': '1. Sustainable & High-Value Impact',
        'strategy_card1_p': 'Addresses the most costly fire threats without causing destructive consequences. Provides a waterless fire solution, minimizing secondary damage and cleanup costs for data centers and factories.',
        'strategy_card2_h': '2. Flexible & Asset-Light Licensing Model',
        'strategy_card2_p': 'The business model is an "IP House." Primary revenue comes from selling licenses for the VFB© technology. This bypasses the need for huge CAPEX spending on factories, warehousing, and global logistics.',
        'strategy_card3_h': '3. De-Risked Development Strategy',
        'strategy_card3_p': 'Uses a lean MVP methodology, focusing capital on testing and IP validation. By adapting existing components (like paintball guns), we can quickly prove feasibility before investing in mass manufacturing.',

        // --- Content Keys for sections/technology.html ---
        'tech_main_title': 'Exploring Core Technology',
        'tech_intro_p': 'The VFEP system comprises three main components working in sync. The heart of the system is the damage-minimizing Firefighting Projectile-VFP©. Click the tabs below for detailed specifications on each part.',
        'tech_intro_highlight': 'Firefighting Projectile-VFP©',
        'tech_tab1_btn': '1. VFP© Projectile (MVP)',
        'tech_tab2_btn': '2. Extinguishing Agent (Agent)',
        'tech_tab3_btn': '3. Sensor & AI',

        // Tech Projectile Tab
        'tech_proj_h': 'Detailed Technical Specifications: VFP© Projectile',
        'tech_proj_p': 'The VFP© projectile is the core of the IP, designed to balance compatibility with existing guns and chemical dispersion efficiency upon impact.',
        'tech_proj_table_h1': 'Attribute',
        'tech_proj_table_h2': 'Design Specification',
        'tech_proj_table_h3': 'Technical Rationale & Note',
        'tech_proj_row1_h': 'Shape',
        'tech_proj_row1_p1': 'Spherical (Round Ball)',
        'tech_proj_row1_p2': 'Compatible with standard 0.68-caliber paintball guns.',
        'tech_proj_row2_h': 'Caliber',
        'tech_proj_row2_p1': '0.68 inch (approx 17.3 mm)',
        'tech_proj_row2_p2': 'Standard paintball caliber.',
        'tech_proj_row3_h': 'Shell Material',
        'tech_proj_row3_p1': 'Brittle Gelatin or Ultra-Thin Biodegradable Polymer',
        'tech_proj_row3_p2': 'Must be strong enough to fire, but reliably shatter on impact.',
        'tech_proj_row4_h': 'Chemical',
        'tech_proj_row4_p1': 'Potassium Bicarbonate (Purple K)',
        'tech_proj_row4_p2': 'Highly effective dry chemical (per unit mass) for Class B & C fires.',
        'tech_proj_row5_h': 'Chemical State',
        'tech_proj_row5_p1': 'Micronized Ultra-Fine Powder',
        'tech_proj_row5_p2': 'Necessary for fast, wide dispersal as a mist (even in hidden areas).',
        'tech_proj_row6_h': 'Projectile Velocity',
        'tech_proj_row6_p1': '250-300 FPS',
        'tech_proj_row6_p2': 'Standard paintball gun limitation. Provides kinetic energy for shell breach.',
        'tech_proj_row7_h': 'Effective Range',
        'tech_proj_row7_p1': '15-30 meters',
        'tech_proj_row7_p2': 'Depends on weight and air drag; realistic range.',
        'tech_proj_row8_h': 'Weight (Total)',
        'tech_proj_row8_p1': '3.0-4.0 grams',
        'tech_proj_row8_p2': 'Balance between chemical payload and velocity/range.',
        'tech_proj_row9_h': 'Color',
        'tech_proj_row9_p1': 'Purple',
        'tech_proj_row9_p2': 'Matches industrial color code for Purple K.',
        'tech_proj_row10_h': 'Efficacy',
        'tech_proj_row10_p1': 'High on Class B & C fires (Interrupts chain reaction)',
        'tech_proj_row10_p2': 'Note: Depends on precise targeting of the fire source.',
        'tech_proj_row11_h': 'Residue',
        'tech_proj_row11_p1': 'Leaves non-corrosive residue',
        'tech_proj_row11_p2': 'Better than ABC powder for electronics, but still requires cleanup (not a "clean agent").',

        // Tech Agent Tab
        'tech_agent_h': 'Extinguishing Agent: Potassium Bicarbonate (Purple K)',
        'tech_agent_p': 'Utilizes a high-performance, non-corrosive dry chemical to protect sensitive electronic equipment.',
        'tech_agent_l1_strong': 'Type:',
        'tech_agent_l1_item': 'Dry chemical, micronized powder form.',
        'tech_agent_l2_strong': 'Efficacy:',
        'tech_agent_l2_item': 'Suppresses Class B (liquid) and C (electrical) fires by interrupting the chemical chain reaction of the fire.',
        'tech_agent_l3_strong': 'Advantage:',
        'tech_agent_l3_item': 'Non-corrosive, non-toxic (compared to Halon), safe for electronics, and does not cause secondary contamination.',
        'tech_agent_l4_strong': 'Color:',
        'tech_agent_l4_item': 'Purple - standard industrial color code.',

        // Tech Sensor Tab
        'tech_sensor_h': 'Automatic Detection System (AI-Driven)',
        'tech_sensor_p': 'The ultimate goal of the system is full automation, using AI to detect and react faster than human intervention.',
        'tech_sensor_l1_strong': 'Sensors:',
        'tech_sensor_l1_item': 'Multi-modal (e.g., thermal, smoke, spectral) for continuous monitoring.',
        'tech_sensor_l2_strong': 'Artificial Intelligence (AI):',
        'tech_sensor_l2_item': 'Smart algorithms for threat classification, fire localization, and projectile system activation.',
        'tech_sensor_l3_strong': 'Goal:',
        'tech_sensor_l3_item': 'Instantaneous reaction in unmanned or remote compartments, ensuring fires are extinguished "before they can get out of control."',

        // --- Content Keys for sections/financials.html ---
        'fin_main_title': 'Financial Forecast & Capital Call',
        'fin_intro_p': 'This section details the 2-year (8-quarter) cash flow forecast based on the IP licensing business model and key milestones. Data is loaded directly from our Google Sheet.',
        'fin_chart_title': '8-Quarter Cash Flow Chart (USD)',
        'fin_loading_msg': 'Loading financial data directly from Google Sheet...',
        'fin_table_title': 'Financial Plan Details (USD)',
        'fin_card1_h': 'Capital Call (Seed)',
        'fin_card1_amount': '$100,000',
        'fin_card1_p': '(For Q1 Year 1)',
        'fin_card2_h': 'VC/Angel Round (Next)',
        'fin_card2_amount': '$250,000',
        'fin_card2_p': '(Projected Q1 Year 2)',
        'fin_card3_h': 'Total Capital Call (2 Years)',
        'fin_card3_amount': '$350,000',
        'fin_card3_p': '(To achieve key milestones)',

        // --- Content Keys for sections/advantage.html ---
        'adv_main_title': 'Competitive Advantage & Comparison',
        'adv_intro_p': 'Vicinity Safety\'s advantage comes not just from technology, but from a unique "micro" strategy that stands in sharp contrast to the existing "macro" solutions on the market.',
        'adv_tab1_btn': '1. Competitor Analysis',
        'adv_tab2_btn': '2. Core Value (USP)',
        'adv_direct_h': 'Strategic Comparison: Precision (Vicinity) vs. Coverage (Competitors)',
        'adv_direct_p': 'We do not compete directly; we create a new niche in "asset protection."',
        'adv_direct_table_h1': 'System',
        'adv_direct_table_h2': 'Design Philosophy',
        'adv_direct_table_h3': 'Goal',
        'adv_direct_table_h4': 'Weakness',
        'adv_direct_r1_c1': 'VFEP (Vicinity Safety)',
        'adv_direct_r1_c2_strong': 'Micro Strategy:',
        'adv_direct_r1_c2_p': 'Uses minimal kinetic energy (3-4g) as an activation mechanism for precise chemical dispersion.',
        'adv_direct_r1_c3': 'Localized asset protection, non-damaging (server rack, electronic equipment).',
        'adv_direct_r1_c4': 'Ineffective for large, outdoor fires.',
        'adv_direct_r2_c1': 'Stat-X (Global) / Gas Systems',
        'adv_direct_r2_c2': 'Passive, high volume. Activated to disperse aerosol/gas covering the entire room.',
        'adv_direct_r2_c3': 'Room-scale coverage, non-directional.',
        'adv_direct_r2_c4': 'Costly, requires sealed systems, potential for secondary damage.',
        'adv_direct_r3_c1': 'Launch System (VN Defense)',
        'adv_direct_r3_c2_strong': 'Macro Strategy:',
        'adv_direct_r3_c2_p': 'Uses extremely high kinetic energy to transport massive volume (250m range).',
        'adv_direct_r3_c3': 'Suppresses large, inaccessible fires (e.g., forest fires, buildings).',
        'adv_direct_r3_c4': 'Complete destruction of target; unusable indoors/near equipment.',
        'adv_usp_h': 'Core Value (USP)',
        'adv_usp_p': 'These are the values we commit to our customers, categorized.',
        'adv_usp_table_h1': 'Category',
        'adv_usp_table_h2': 'Benefit (USP)',
        'adv_usp_table_h3': 'Customer Value',
        'adv_usp_r1_c1': 'I. Technology (Product)',
        'adv_usp_r1_c2': 'Precise, Non-Corrosive Suppression',
        'adv_usp_r1_c3': 'Guarantees suppression of Class C (electrical) and B (liquid) fires with minimal asset damage (servers, robots).',
        'adv_usp_r2_c1': '',
        'adv_usp_r2_c2': 'Customizable for Lithium-ion Batteries',
        'adv_usp_r2_c3': 'Provides a specialized extinguishing and cooling option (with gel core) to handle "thermal runaway."',
        'adv_usp_r3_c1': '',
        'adv_usp_r3_c2': 'Launch Mechanism (Caliber 0.68)',
        'adv_usp_r3_c3': 'Ensures rapid deployment, simple training, and immediate access to a mass-producible launching platform (not a gun).',
        'adv_usp_r4_c1': 'II. Strategy (Model)',
        'adv_usp_r4_c2': '"Open Source" Licensing for Government',
        'adv_usp_r4_c3': 'Creates a global market moat; governments become loyal partners, guaranteeing a market for the licensed manufacturer (who pays royalties).',
        'adv_usp_r5_c1': '',
        'adv_usp_r5_c2': 'High Financial Leverage',
        'adv_usp_r5_c3': 'Provides exceptional margins and scalability, reducing manufacturing capital while ensuring high, recurring revenue.',
        'adv_usp_r6_c1': '',
        'adv_usp_r6_c2': 'IP (Sing) / R&D (SEA) Structure',
        'adv_usp_r6_c3': 'Minimizes risk by protecting core assets under the best legal framework while maximizing development cost efficiency.',
        
        // --- Content Keys for sections/lean-canvas.html ---
        'lc_main_title': 'Lean Canvas Model',
        'lc_intro_p': 'Our business model is summarized using the Lean Canvas tool, focusing on solving the customer\'s most expensive problems.',
        'lc_col1_title': '1. Problems',
        'lc_col1_item1': 'Secondary damage (due to water/gas) is greater than the initial fire damage.',
        'lc_col1_item2': 'No localized, precision suppression solution for Li-ion batteries in thermal runaway.',
        'lc_col1_item3': 'Excessive downtime after fire suppression.',
        'lc_col2_title': '2. Solution',
        'lc_col2_item1': 'Non-corrosive extinguishing projectile system.',
        'lc_col2_item2': 'Uses specialized dry chemical/gel agents for electrical/Li-ion fires.',
        'lc_col2_item3': 'AI-driven detection and reaction in <0.5 seconds.',
        'lc_col3_title': '3. Key Metrics',
        'lc_col3_item1': 'Asset Damage Reduction Rate.',
        'lc_col3_item2': 'Time-to-kill (Reaction Time).',
        'lc_col3_item3': 'IP Licensing & Royalty Revenue.',
        'lc_col4_title': '4. Unique Value Proposition (UVP)',
        'lc_col4_p1': 'Precise suppression. Zero damage. Zero cleanup (Minimal).',
        'lc_col4_p2': '80% better protection for electronic equipment than existing solutions.',
        'lc_col5_title': '5. Unfair Advantage',
        'lc_col5_item1': '"Royalty-free" IP structure for Government.',
        'lc_col5_item2': 'Optimized R&D cost structure in Vietnam.',
        'lc_col5_item3': 'Specialized expertise in projectile material science, dry chemistry, and AI.',
        'lc_col6_title': '6. Channels',
        'lc_col6_item1': 'Direct licensing to major OEMs and fire protection contractors.',
        'lc_col6_item2': 'R&D collaboration with Defense/Aerospace entities.',
        'lc_col7_title': '7. Customer Segments',
        'lc_col7_item1': 'Data Centers and Telecommunications.',
        'lc_col7_item2': 'Electronics Manufacturing and Lithium-ion Batteries.',
        'lc_col7_item3': 'Storage facilities, small server rooms.',
        'lc_col8_title': '8. Cost Structure',
        'lc_col8_item1': 'R&D and Prototyping costs.',
        'lc_col8_item2': 'Global IP Registration/Protection fees.',
        'lc_col8_item3': 'Technical Personnel costs.',
        'lc_col9_title': '9. Revenue Streams',
        'lc_col9_item1': 'Licensing fees (Upfront).',
        'lc_col9_item2': 'Royalties (Recurring).',
        'lc_col9_item3': 'Government R&D contracts (Ad hoc).',
    }
};

let currentLang = localStorage.getItem('lang') || 'vi';

const sections = [
    "header",
    "overview",
    "vision",
    "lean-canvas",
    "technology",
    "strategy",
    "market",
    "financials",
    "advantage",
    "footer",
];

async function loadSection(name) {
    const container = document.getElementById(name);
    if (!container) {
        console.warn(`Container #${name} not found.`);
        return;
    }

    try {
        const response = await fetch(`sections/${name}.html?t=${new Date().getTime()}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch sections/${name}.html - ${response.statusText}`);
        }
        
        const html = await response.text();
        container.innerHTML = html;
    } catch (err) {
        console.error(`Error loading section: ${name}`, err);
    }
}

/**
 * Core function to switch the active language.
 * @param {string} lang - The target language ('vi' or 'en').
 */
window.switchLanguage = function(lang) {
    if (lang === currentLang) return; 

    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // 1. Update global HTML attributes
    document.documentElement.lang = lang;
    
    // 2. Apply translations to all loaded content
    applyTranslations(lang);
};

/**
 * Finds all translatable elements and updates their content.
 * Looks for: 
 * 1. Elements with 'data-key' attribute (for content loaded via fetch)
 * 2. Updates the language switch button text/display.
 * 3. Updates the document title.
 * @param {string} lang - The target language ('vi' or 'en').
 */
window.applyTranslations = function(lang) {
    // A. Translate static/fetched content using data-key
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = LANGUAGE_DATA[lang][key];
        if (translation !== undefined) {
            element.textContent = translation;
        } else {
            // Optional: Log missing key for debugging
            // console.warn(`Missing translation key: ${key} for language ${lang}`);
        }
    });

    // B. Update Language Switch Button/Display
    const switchBtn = document.getElementById('language-switch-btn');
    const displaySpan = document.getElementById('lang-display');
    
    if (switchBtn) {
        const targetLang = lang === 'vi' ? 'en' : 'vi';
        // Ensure switchLanguage is called with the target language
        switchBtn.setAttribute('onclick', `switchLanguage('${targetLang}')`);
        
        // Update the button's text to show what language it *switches to*
        switchBtn.textContent = LANGUAGE_DATA[targetLang]['language_switch'];
    }

    if (displaySpan) {
        // Update the visible language display (e.g., 'VN' or 'EN')
        displaySpan.textContent = LANGUAGE_DATA[lang]['language_current'];
    }

    // C. Update the document title
    document.title = LANGUAGE_DATA[lang]['page_title'];
}


document.addEventListener("DOMContentLoaded", async () => {
    
    const loadingPromises = sections.map(loadSection);

    await Promise.all(loadingPromises);
    
    // ÁP DỤNG BẢN DỊCH NGAY SAU KHI TẢI XONG
    // Điều này đảm bảo trang web bắt đầu bằng ngôn ngữ đã lưu (hoặc mặc định là 'vi')
    if (typeof window.applyTranslations === 'function') {
        window.applyTranslations(currentLang);
    }

    // SAU KHI TẢI TẤT CẢ HTML VÀ DỊCH, chạy file main.js
    if (typeof window.initializeApp === 'function') {
        window.initializeApp();
    } else {
        console.error('CRITICAL ERROR: initializeApp() function not found. Check main.js.');
    }
});
