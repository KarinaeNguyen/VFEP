// assets/js/importSections.js - Phiên BẢN CUỐI CÙNG (100% HOÀN CHỈNH)

const LANGUAGE_DATA = {
    'vi': {
        // --- HEADER ---
        'page_title': 'Vicinity Safety | Công Nghệ Dập Lửa Chính Xác VFEP',
        'header_main_title': 'Thông Tin Dự Án',
        'header_subtitle': '| Công Nghệ VFEP',
        'language_switch': 'English',
        'language_current': 'VN',

        // --- OVERVIEW ---
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

        // --- VISION & MISSION ---
        'vision_h': 'Tầm Nhìn (Vision)',
        'vision_p': 'Trở thành tiêu chuẩn toàn cầu về dập tắt hỏa hoạn chính xác, không gây hư hại cho các tài sản công nghệ cao và cơ sở hạ tầng quan trọng, bắt đầu từ các trung tâm dữ liệu và nhà máy sản xuất trên mặt đất, và vươn đến các ứng dụng hàng không vũ trụ.',
        'mission_h': 'Sứ Mệnh (Mission)',
        'mission_p': 'Sứ mệnh của Vicinity Safety là dẫn đầu R&D tại Việt Nam, nắm giữ Sở Hữu Trí Tuệ (IP) cho thiết kế và quy trình sản xuất của Firefighting Bullet-VFEV©, đồng thời cung cấp giấy phép chiến lược, miễn phí bản quyền cho các cơ quan chính phủ (Quốc phòng, PCCC) để đảm bảo an toàn cho cơ sở hạ tầng quốc gia.',

        // --- LEAN CANVAS ---
        'lc_main_title': 'Mô Hình Kinh Doanh Tinh Gọn (Lean Business Canvas)',
        'lc_intro_p': 'Mô hình "vốn mỏng" (asset-light) tập trung vào việc giải quyết các vấn đề thực tế, cấp bách bằng tài sản trí tuệ (IP), không phải bằng vốn sản xuất khổng lồ (CAPEX).',
        'lc_col1_title': '1. Vấn Đề (Problems)',
        'lc_col1_item1': 'Thiệt hại thứ cấp (do nước/khí) lớn hơn thiệt hại ban đầu cho thiết bị.',
        'lc_col1_item2': 'Rủi ro từ Pin Lithium-ion: Cháy nổ "thoát nhiệt" (thermal runaway) không thể kiểm soát.',
        'lc_col1_item3': 'Thiết bị PCCC truyền thống chậm và thiếu chính xác.',
        'lc_col2_title': '2. Giải Pháp (Solution)',
        'lc_col2_item1': 'Hệ thống Phóng đạn Firefighting Bullet-VFEV©.',
        'lc_col2_item2': 'Chất chữa cháy Potassium Bicarbonate (Purple K) siêu mịn, không ăn mòn.',
        'lc_col2_item3': 'Phần mềm định vị mục tiêu chính xác (AI-driven).',
        'lc_col3_title': '3. Giá Trị Độc Quyền (UVP)',
        'lc_col3_item1': 'Dập lửa "vi mô": Chỉ ảnh hưởng đến vị trí cháy, không cần sơ tán/ngừng hoạt động.',
        'lc_col3_item2': 'Không gây hư hại (Non-corrosive) cho các thiết bị điện tử.',
        'lc_col3_item3': 'Giấy phép miễn phí cho Chính phủ, tạo thị trường cho đối tác OEM.',
        'lc_col4_title': '4. Lợi Thế Không Thể Bắt Chước',
        'lc_col4_item1': 'Bằng sáng chế thiết kế và quy trình sản xuất (IP House).',
        'lc_col4_item2': 'Chất chữa cháy độc quyền với hiệu quả tối ưu.',
        'lc_col4_item3': 'Mô hình kinh doanh \'Vốn Mỏng\' tạo biên lợi nhuận cao.',
        'lc_col5_title': '5. Phân Khúc Khách Hàng',
        'lc_col5_item1': 'OEM/Nhà cung cấp Hệ thống PCCC Công nghiệp lớn (Đối tác Cấp phép).',
        'lc_col5_item2': 'Chính phủ/Quốc phòng (Miễn phí bản quyền, Người tạo nhu cầu thị trường).',
        'lc_col5_item3': 'Chủ sở hữu Trung tâm Dữ liệu và Kho Pin (UPS/ESS).',
        'lc_col6_title': '6. Kênh (Channels)',
        'lc_col6_item1': 'Cấp phép trực tiếp cho các OEM và nhà thầu PCCC lớn.',
        'lc_col6_item2': 'Hợp tác R&D với các công ty Quốc phòng/Hàng không vũ trụ.',
        'lc_col6_item3': 'Các sự kiện và triển lãm công nghệ an toàn cháy nổ quốc tế.',
        'lc_col7_title': '7. Các Chỉ Số Chính (Key Metrics)',
        'lc_col7_item1': 'Số lượng Bằng sáng chế và IP được nộp/cấp.',
        'lc_col7_item2': 'Số lượng hợp đồng Cấp phép IP đang hoạt động (Active Licensing Deals).',
        'lc_col7_item3': 'Tỷ suất lợi nhuận gộp (Gross Margin) > 70%.',
        'lc_col7_item4': 'Đạt chứng nhận (Ví dụ: TCVN, UL) cho sản phẩm MVP.',
        'lc_col8_title': '8. Cấu Trúc Chi Phí (Cost Structure)',
        'lc_col8_item1': 'Chi phí R&D và Tạo mẫu (Prototyping) tại Việt Nam.',
        'lc_col8_item2': 'Chi phí Đăng ký/Bảo vệ IP toàn cầu (Singapore).',
        'lc_col8_item3': 'Chi phí Nhân sự Kỹ thuật cao.',
        'lc_col9_title': '9. Dòng Doanh Thu (Revenue Streams)',
        'lc_col9_item1': 'Phí Cấp phép Công nghệ (Licensing Fees): Thanh toán trả trước (NRE).',
        'lc_col9_item2': 'Tiền bản quyền (Royalty Payments): Phần trăm định kỳ trên mỗi đơn vị hệ thống được bán ra bởi đối tác.',
        'lc_col9_item3': 'Hợp đồng Hỗ trợ/Tư vấn Kỹ thuật.',

        // --- TECHNOLOGY ---
        'tech_main_title': 'Khám Phá Công Nghệ Cốt Lõi',
        'tech_intro_p': 'Hệ thống VFEP bao gồm ba thành phần chính hoạt động đồng bộ. Trái tim của hệ thống là ',
        'tech_intro_highlight': 'Viên Đạn Chữa Cháy-VFP©',
        'tech_tab1_btn': '1. Đạn Phóng VFP© (MVP)',
        'tech_tab2_btn': '2. Chất Chữa Cháy (Agent)',
        'tech_tab3_btn': '3. Cảm Biến & AI',
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
        'tech_agent_h': 'Chất Chữa Cháy: Potassium Bicarbonate (Purple K)',
        'tech_agent_p': 'Sử dụng hóa chất khô hiệu suất cao, không ăn mòn để bảo vệ các thiết bị điện tử nhạy cảm.',
        'tech_agent_l1_strong': 'Loại:',
        'tech_agent_l1_item': ' Hóa chất khô, dạng bột siêu mịn (Micronized).',
        'tech_agent_l2_strong': 'Hiệu quả:',
        'tech_agent_l2_item': ' Dập tắt đám cháy Loại B (chất lỏng) và C (điện) bằng cách ngăn chặn chuỗi phản ứng hóa học của đám cháy.',
        'tech_agent_l3_strong': 'Ưu điểm:',
        'tech_agent_l3_item': ' Không ăn mòn, không độc hại (so với Halon), an toàn cho thiết bị điện tử và không gây ô nhiễm thứ cấp.',
        'tech_agent_l4_strong': 'Màu sắc:',
        'tech_agent_l4_item': ' Màu tím (Purple) - mã màu công nghiệp tiêu chuẩn.',
        'tech_sensor_h': 'Hệ Thống Phát Hiện Tự Động (AI-Driven)',
        'tech_sensor_p': 'Mục tiêu cuối cùng của hệ thống là hoàn toàn tự động, sử dụng AI để phát hiện và phản ứng nhanh hơn con người.',
        'tech_sensor_l1_strong': 'Cảm biến:',
        'tech_sensor_l1_item': ' Đa phương thức (ví dụ: nhiệt, khói, quang phổ) để giám sát liên tục.',
        'tech_sensor_l2_strong': 'Trí tuệ nhân tạo (AI):',
        'tech_sensor_l2_item': ' Các thuật toán thông minh để phân loại mối đe dọa, định vị đám cháy và kích hoạt hệ thống phóng.',
        'tech_sensor_l3_strong': 'Mục tiêu:',
        'tech_sensor_l3_item': ' Phản ứng tức thì tại các khoang không người lái hoặc ở xa, đảm bảo dập tắt đám cháy "trước khi chúng có thể vượt khỏi tầm kiểm soát."',

        // --- STRATEGY ---
        'strategy_main_title': 'Mô Hình Của Vicinity Safety: "Vốn Mỏng" & Lấy IP Làm Trung Tâm',
        'strategy_intro_p': 'Vicinity Safety không phải là một công ty sản xuất. Chúng tôi là một trung tâm R&D "không nhà máy" (fabless). Chiến lược của chúng tôi là phát triển, cấp bằng sáng chế, và cấp phép công nghệ cho các đối tác lớn, tạo ra doanh thu từ tài sản trí tuệ (IP) thay vì bán phần cứng vật lý.',
        'strategy_h1': '1. Cấu Trúc Pháp Lý & IP (Thiết thực)',
        'strategy_l1_strong1': 'Nắm giữ IP tại Singapore:',
        'strategy_l1_item1': ' Thành lập một pháp nhân tại Singapore, một khu vực pháp lý ổn định và thân thiện với IP, để bảo vệ tài sản cốt lõi và thuận tiện cho giao dịch quốc tế.',
        'strategy_l1_strong2': 'R&D tại Việt Nam:',
        'strategy_l1_item2': ' Tận dụng nguồn nhân lực kỹ thuật chất lượng cao và chi phí R&D, tạo mẫu (prototyping) hiệu quả để tối ưu hóa chi phí.',
        'strategy_h2': '2. Mô Hình Doanh Thu (Lợi nhuận cao)',
        'strategy_l2_strong1': 'Phí Cấp Phép (Licensing Fees):',
        'strategy_l2_item1': ' Phí trả trước từ các OEM và đối tác tích hợp hệ thống (ví dụ: các nhà thầu PCCC lớn) để được quyền sử dụng công nghệ.',
        'strategy_l2_strong2': 'Tiền Bản Quyền (Royalties):',
        'strategy_l2_item2': ' Doanh thu phần trăm định kỳ trên mỗi đơn vị hệ thống được bán ra bởi các đối tác.',
        'strategy_h_key_strategy': 'Chiến Lược Then Chốt: Hợp Tác Với Chính Phủ',
        'strategy_p_key_strategy': 'Cung cấp giấy phép miễn phí bản quyền (royalty-free) cho các cơ quan chính phủ (Quốc phòng, PCCC, An ninh). Chiến lược này tạo dựng lòng tin, biến chính phủ thành đối tác và tạo ra một "con hào thị trường" (market moat) khổng lồ. Các nhà sản xuất được cấp phép (người trả tiền cho Vicinity Safety) sẽ có một thị trường chính phủ được đảm bảo.',
        'strategy_h_value_prop': 'Đề Xuất Giá Trị (Value Proposition)',
        'strategy_p_value_prop': 'Đầu tư vào Vicinity Safety là cơ hội để sở hữu IP có lợi nhuận cao và đảm bảo vị thế trong thế hệ công nghệ dập lửa chuyên biệt, giảm thiểu thiệt hại, tận dụng mô hình kinh doanh "vốn mỏng" bền vững và thực tế tại Việt Nam.',
        'strategy_card1_h': '1. Tác Động Bền Vững & Giá Trị Cao',
        'strategy_card1_p': 'Giải quyết các mối đe dọa cháy nổ tốn kém nhất mà không gây ra hậu quả phá hủy. Cung cấp giải pháp chữa cháy không dùng nước (waterless), giảm thiểu thiệt hại thứ cấp và chi phí dọn dẹp cho trung tâm dữ liệu, nhà máy. ',
        'strategy_card2_h': '2. Mô Hình Cấp Phép Linh Hoạt & "Vốn Mỏng"',
        'strategy_card2_p': 'Mô hình kinh doanh là một "IP House". Doanh thu chính đến từ việc bán giấy phép công nghệ VFB©. Điều này bỏ qua nhu cầu chi tiêu vốn (CAPEX) khổng lồ cho nhà máy, kho bãi và logistics toàn cầu.',
        'strategy_card3_h': '3. Chiến Lược Phát Triển Đã Giảm Thiểu Rủi Ro',
        'strategy_card3_p': 'Sử dụng phương pháp MVP tinh gọn, tập trung vốn vào thử nghiệm và xác nhận IP. Bằng cách điều chỉnh các thành phần có sẵn (như súng paintball), chúng tôi có thể nhanh chóng chứng minh tính khả thi trước khi đầu tư vào sản xuất hàng loạt.',
        
        // --- MARKET ---
        'market_main_title': 'Thị Trường & Tầm Nhìn',
        'market_intro_p': 'Chiến lược của chúng tôi là tập trung vào các thị trường ',
        'market_highlight': 'thiết thực, có nhu cầu ngay lập tức',
        'market_tab_ground_btn': '1. Thị Trường Trọng Tâm (Mặt Đất)',
        'market_tab_space_btn': '2. Tầm Nhìn Tương Lai (Hàng Không & Vũ Trụ)',
        'market_ground_h': 'Thị Trường Trọng Tâm (Trung Tâm Dữ Liệu, Nhà máy, Pin Li-ion)',
        'market_ground_p_intro': 'Bảo vệ cơ sở hạ tầng quan trọng nơi mà thiệt hại thứ cấp (secondary damage) còn tốn kém hơn cả đám cháy.',
        'market_ground_item1_strong': 'Mục tiêu:',
        'market_ground_item1': ' Trung tâm dữ liệu (Data Centers) (Viettel, FPT, VNG, CMC) và các nhà máy sản xuất điện tử FDI (Samsung, LG, Foxconn).',
        'market_ground_item2_strong': 'Vấn đề:',
        'market_ground_item2': ' Cháy pin Lithium-ion (trong hệ thống UPS) có thể gây ra hiện tượng "thoát nhiệt" (thermal runaway) cực kỳ nguy hiểm.',
        'market_ground_item3_strong': 'Giải pháp VFEP:',
        'market_ground_item3': ' Cung cấp khả năng dập lửa chính xác, không dùng nước, không ăn mòn, ngăn chặn đám cháy lây lan mà không phá hủy toàn bộ hàng rack máy chủ.',
        'market_space_h': 'Tầm Nhìn Tương Lai (Hàng Không & Vũ Trụ)',
        'market_space_p_intro': 'Đây là thị trường R&D dài hạn. Bằng cách giải quyết các vấn đề trên mặt đất, chúng tôi xây dựng nền tảng (dữ liệu, IP, chứng nhận) để trở thành nhà cung cấp cho NASA, ESA, Boeing... trong tương lai, khi công nghệ đã được chứng minh.',
        'market_space_item1_strong': 'Vấn đề 1: Độ tin cậy Zero-G:',
        'market_space_item1': ' Chất chữa cháy truyền thống phân tán không thể đoán trước trong môi trường vi trọng lực. Hệ thống đạn phóng của VFEP là một giải pháp tiềm năng.',
        'market_space_item2_strong': 'Vấn đề 2: Không Gây Ô nhiễm:',
        'market_space_item2': ' Chất Purple K bảo vệ các hệ thống quang học nhạy cảm và hệ thống hỗ trợ sự sống.',

        // --- FINANCIALS ---
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

        // --- ADVANTAGE ---
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

        // --- OVERVIEW ---
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
        
        // --- VISION & MISSION ---
        'vision_h': 'Vision',
        'vision_p': 'To become the global standard for precise, non-damaging fire suppression for high-tech assets and critical infrastructure, starting with terrestrial data centers and manufacturing, and expanding to aerospace applications.',
        'mission_h': 'Mission',
        'mission_p': 'Vicinity Safety’s mission is to lead R&D in Vietnam, holding the Intellectual Property (IP) for the design and manufacturing process of the Firefighting Bullet-VFEV©, while strategically licensing it royalty-free to government agencies (Defense, Fire Dept.) to secure national infrastructure.',

        // --- LEAN CANVAS ---
        'lc_main_title': 'Lean Business Canvas',
        'lc_intro_p': 'Our "asset-light" model focuses on solving urgent, real-world problems with intellectual property (IP), not massive manufacturing capital (CAPEX).',
        'lc_col1_title': '1. Problems',
        'lc_col1_item1': 'Secondary damage (from water/gas) is greater than the initial fire damage to equipment.',
        'lc_col1_item2': 'Lithium-ion Battery Risk: Uncontrollable thermal runaway fires.',
        'lc_col1_item3': 'Traditional suppression systems are slow and imprecise.',
        'lc_col2_title': '2. Solution',
        'lc_col2_item1': 'Firefighting Bullet-VFEV© Projectile System.',
        'lc_col2_item2': 'Ultra-fine, non-corrosive Potassium Bicarbonate (Purple K) agent.',
        'lc_col2_item3': 'AI-driven precision targeting software.',
        'lc_col3_title': '3. Unique Value Proposition (UVP)',
        'lc_col3_item1': '"Micro" suppression: Affects only the fire source, no need for evacuation/shutdown.',
        'lc_col3_item2': 'Non-corrosive and non-conductive, safe for electronics.',
        'lc_col3_item3': 'Royalty-free government license, creating a market for OEM partners.',
        'lc_col4_title': '4. Unfair Advantage',
        'lc_col4_item1': 'Patented design and manufacturing process (IP House).',
        'lc_col4_item2': 'Proprietary agent formulation for optimal performance.',
        'lc_col4_item3': 'Asset-light business model enabling high profit margins.',
        'lc_col5_title': '5. Customer Segments',
        'lc_col5_item1': 'Large Industrial Fire Suppression OEMs / System Integrators (Licensing Partners).',
        'lc_col5_item2': 'Government/Defense (Royalty-free user, Market-maker).',
        'lc_col5_item3': 'Data Center & Battery Storage (UPS/ESS) Owners.',
        'lc_col6_title': '6. Channels',
        'lc_col6_item1': 'Direct licensing to major OEMs and fire safety contractors.',
        'lc_col6_item2': 'R&D partnerships with Defense/Aerospace firms.',
        'lc_col6_item3': 'International fire safety tech expos and conferences.',
        'lc_col7_title': '7. Key Metrics',
        'lc_col7_item1': 'Number of Patents & IPs filed/granted.',
        'lc_col7_item2': 'Number of Active Licensing Deals.',
        'lc_col7_item3': 'Gross Margin > 70%.',
        'lc_col7_item4': 'Achieving certification (e.g., TCVN, UL) for MVP.',
        'lc_col8_title': '8. Cost Structure',
        'lc_col8_item1': 'R&D and Prototyping costs in Vietnam.',
        'lc_col8_item2': 'Global IP Filing/Protection costs (Singapore).',
        'lc_col8_item3': 'High-caliber Engineering Personnel costs.',
        'lc_col9_title': '9. Revenue Streams',
        'lc_col9_item1': 'Technology Licensing Fees (Upfront NRE).',
        'lc_col9_item2': 'Royalty Payments: Recurring percentage per system unit sold by partners.',
        'lc_col9_item3': 'Technical Support/Consulting Contracts.',

        // --- TECHNOLOGY ---
        'tech_main_title': 'Exploring the Core Technology',
        'tech_intro_p': 'The VFEP system consists of three main components working in synergy. The heart of the system is the non-damaging ',
        'tech_intro_highlight': 'VFP© Firefighting Projectile',
        'tech_tab1_btn': '1. VFP© Projectile (MVP)',
        'tech_tab2_btn': '2. Extinguishing Agent',
        'tech_tab3_btn': '3. Sensors & AI',
        'tech_proj_h': 'Detailed Specifications: VFP© Projectile',
        'tech_proj_p': 'The VFP© projectile is the core IP, designed to balance compatibility with existing launchers and effective agent dispersal upon impact.',
        'tech_proj_table_h1': 'Property',
        'tech_proj_table_h2': 'Design Specification',
        'tech_proj_table_h3': 'Technical Rationale & Notes',
        'tech_proj_row1_h': 'Form Factor',
        'tech_proj_row1_p1': 'Spherical (Round Ball)',
        'tech_proj_row1_p2': 'Compatible with standard 0.68-caliber paintball markers.',
        'tech_proj_row2_h': 'Caliber',
        'tech_proj_row2_p1': '0.68 inch (approx. 17.3 mm)',
        'tech_proj_row2_p2': 'Standard paintball marker caliber.',
        'tech_proj_row3_h': 'Shell Material',
        'tech_proj_row3_p1': 'Frangible Gelatin or Ultra-thin Biodegradable Polymer',
        'tech_proj_row3_p2': 'Must be strong enough to fire, but shatter reliably on impact.',
        'tech_proj_row4_h': 'Agent',
        'tech_proj_row4_p1': 'Potassium Bicarbonate (Purple K)',
        'tech_proj_row4_p2': 'Highly effective dry chemical (per unit mass) for Class B & C fires.',
        'tech_proj_row5_h': 'Agent State',
        'tech_proj_row5_p1': 'Micronized Ultra-Fine Powder',
        'tech_proj_row5_p2': 'Necessary for rapid, wide "mist" dispersal (including corners).',
        'tech_proj_row6_h': 'Velocity',
        'tech_proj_row6_p1': '250-300 FPS',
        'tech_proj_row6_p2': 'Standard limit for paintball markers. Provides kinetic energy for shell break.',
        'tech_proj_row7_h': 'Effective Range',
        'tech_proj_row7_p1': '15-30 meters',
        'tech_proj_row7_p2': 'Dependent on weight and drag; a realistic operational range.',
        'tech_proj_row8_h': 'Total Weight',
        'tech_proj_row8_p1': '3.0-4.0 grams',
        'tech_proj_row8_p2': 'Balance between agent payload and velocity/range.',
        'tech_proj_row9_h': 'Color',
        'tech_proj_row9_p1': 'Purple',
        'tech_proj_row9_p2': 'Matches industrial color code for Purple K.',
        'tech_proj_row10_h': 'Effectiveness',
        'tech_proj_row10_p1': 'High on Class B & C (Breaks chain reaction)',
        'tech_proj_row10_p2': 'Note: Reliant on precise aim at the base of the fire.',
        'tech_proj_row11_h': 'Residue',
        'tech_proj_row11_p1': 'Leaves non-corrosive residue',
        'tech_proj_row11_p2': 'Better than ABC powder for electronics, but still requires cleanup (not a "clean agent").',
        'tech_agent_h': 'Extinguishing Agent: Potassium Bicarbonate (Purple K)',
        'tech_agent_p': 'Utilizing a high-efficiency, non-corrosive dry chemical to protect sensitive electronics.',
        'tech_agent_l1_strong': 'Type:',
        'tech_agent_l1_item': ' Dry chemical, Micronized Ultra-Fine Powder.',
        'tech_agent_l2_strong': 'Effectiveness:',
        'tech_agent_l2_item': ' Suppresses Class B (liquid) and C (electrical) fires by interrupting the fire\'s chemical chain reaction.',
        'tech_agent_l3_strong': 'Advantages:',
        'tech_agent_l3_item': ' Non-corrosive, non-toxic (vs. Halon), safe for electronics, and no secondary contamination.',
        'tech_agent_l4_strong': 'Color:',
        'tech_agent_l4_item': ' Purple - the standard industrial code.',
        'tech_sensor_h': 'Automated Detection System (AI-Driven)',
        'tech_sensor_p': 'The system\'s ultimate goal is full automation, using AI to detect and react faster than human operators.',
        'tech_sensor_l1_strong': 'Sensors:',
        'tech_sensor_l1_item': ' Multi-modal (e.g., thermal, smoke, spectral) for continuous monitoring.',
        'tech_sensor_l2_strong': 'Artificial Intelligence (AI):',
        'tech_sensor_l2_item': ' Intelligent algorithms to classify threats, pinpoint the fire, and activate the launch system.',
        'tech_sensor_l3_strong': 'Objective:',
        'tech_sensor_l3_item': ' Instantaneous response in unmanned or remote bays, ensuring fires are suppressed "before they can escalate."',

        // --- STRATEGY ---
        'strategy_main_title': 'Vicinity Safety\'s Model: Asset-Light & IP-Centric',
        'strategy_intro_p': 'Vicinity Safety is not a manufacturing company. We are a "fabless" R&D center. Our strategy is to develop, patent, and license our technology to major partners, generating revenue from intellectual property (IP) rather than selling physical hardware.',
        'strategy_h1': '1. Legal & IP Structure (Practical)',
        'strategy_l1_strong1': 'IP Holding in Singapore:',
        'strategy_l1_item1': ' Establish a Singaporean entity, an IP-friendly and stable jurisdiction, to protect core assets and facilitate international transactions.',
        'strategy_l1_strong2': 'R&D in Vietnam:',
        'strategy_l1_item2': ' Leverage high-quality technical talent and cost-effective R&D and prototyping to optimize expenses.',
        'strategy_h2': '2. Revenue Model (High-Margin)',
        'strategy_l2_strong1': 'Licensing Fees:',
        'strategy_l2_item1': ' Upfront fees from OEMs and system integrators (e.g., major fire contractors) for the right to use the technology.',
        'strategy_l2_strong2': 'Royalties:',
        'strategy_l2_item2': ' Recurring percentage revenue on every system unit sold by our partners.',
        'strategy_h_key_strategy': 'The Key Strategy: Government Partnership',
        'strategy_p_key_strategy': 'Offer royalty-free licenses to government bodies (Defense, Fire Dept., Security). This builds trust, makes the government a partner, and creates a massive market moat. Our licensed manufacturers (who pay us) gain a secured government market.',
        'strategy_h_value_prop': 'Value Proposition',
        'strategy_p_value_prop': 'An investment in Vicinity Safety is an opportunity to own high-margin IP and secure a position in the next generation of specialized, damage-mitigating fire suppression, leveraging a sustainable and practical "asset-light" business model based in Vietnam.',
        'strategy_card1_h': '1. Sustainable & High-Value Impact',
        'strategy_card1_p': 'Solves the most expensive fire threats without destructive consequences. Provides a waterless solution, minimizing secondary damage and cleanup costs for data centers and factories.',
        'strategy_card2_h': '2. Asset-Light & Scalable Licensing Model',
        'strategy_card2_p': 'The business model is an "IP House." Primary revenue comes from selling VFB© technology licenses. This bypasses the need for massive CAPEX on factories, warehousing, and global logistics.',
        'strategy_card3_h': '3. De-Risked Development Strategy',
        'strategy_card3_p': 'Uses a lean MVP approach, focusing capital on testing and IP validation. By modifying off-the-shelf components (like paintball markers), we can rapidly prove feasibility before investing in mass production.',
        
        // --- MARKET ---
        'market_main_title': 'Market & Vision',
        'market_intro_p': 'Our strategy is to focus on ',
        'market_highlight': 'practical, immediate-need markets',
        'market_tab_ground_btn': '1. Core Market (Terrestrial)',
        'market_tab_space_btn': '2. Future Vision (Aerospace)',
        'market_ground_h': 'Core Market (Data Centers, Factories, Li-ion Batteries)',
        'market_ground_p_intro': 'Protecting critical infrastructure where secondary damage is more costly than the fire itself.',
        'market_ground_item1_strong': 'Target:',
        'market_ground_item1': ' Data Centers (Viettel, FPT, VNG, CMC) and FDI electronics manufacturing plants (Samsung, LG, Foxconn).',
        'market_ground_item2_strong': 'Problem:',
        'market_ground_item2': ' Lithium-ion battery fires (in UPS systems) can cause extremely dangerous thermal runaway.',
        'market_ground_item3_strong': 'VFEP Solution:',
        'market_ground_item3': ' Provides precise, waterless, non-corrosive suppression, stopping fire spread without destroying entire server racks.',
        'market_space_h': 'Future Vision (Aerospace)',
        'market_space_p_intro': 'This is a long-term R&D market. By solving terrestrial problems, we build the foundation (data, IP, certification) to become a future supplier for NASA, ESA, Boeing, etc., once the technology is proven.',
        'market_space_item1_strong': 'Problem 1: Zero-G Reliability:',
        'market_space_item1': ' Traditional agents disperse unpredictably in microgravity. VFEP\'s projectile system is a potential solution.',
        'market_space_item2_strong': 'Problem 2: Non-Contaminating:',
        'market_space_item2': ' Purple K agent protects sensitive optics and life-support systems.',

        // --- FINANCIALS ---
        'fin_main_title': 'Financial Projections & Funding Ask',
        'fin_intro_p': 'This section details the 2-year (8-quarter) cash flow forecast based on the IP licensing model and key milestones. Data is loaded live from our Google Sheet.',
        'fin_chart_title': '8-Quarter Cash Flow Projection (USD)',
        'fin_loading_msg': 'Loading live financial data from Google Sheet...',
        'fin_table_title': 'Detailed Financial Plan (USD)',
        'fin_card1_h': 'Seed Funding Ask',
        'fin_card1_amount': '$100,000',
        'fin_card1_p': '(For Y1 Q1)',
        'fin_card2_h': 'VC/Angel Round (Next)',
        'fin_card2_amount': '$250,000',
        'fin_card2_p': '(Projected Y2 Q1)',
        'fin_card3_h': 'Total 2-Year Funding',
        'fin_card3_amount': '$350,000',
        'fin_card3_p': '(To achieve milestones)',

        // --- ADVANTAGE ---
        'adv_main_title': 'Competitive Advantage & Comparison',
        'adv_intro_p': 'Vicinity Safety\'s advantage comes not just from technology, but from its unique "micro" strategy, which is in direct contrast to the "macro" solutions currently on the market.',
        'adv_tab1_btn': '1. Competitor Analysis',
        'adv_tab2_btn': '2. Core Value (USP)',
        'adv_direct_h': 'Strategic Comparison: Precision (Vicinity) vs. Flooding (Competitors)',
        'adv_direct_p': 'We do not compete directly; we create a new niche market for "asset protection".',
        'adv_direct_table_h1': 'System',
        'adv_direct_table_h2': 'Design Philosophy',
        'adv_direct_table_h3': 'Objective',
        'adv_direct_table_h4': 'Weakness',
        'adv_direct_r1_c1': 'VFEP (Vicinity Safety)',
        'adv_direct_r1_c2_strong': 'Micro-Strategy:',
        'adv_direct_r1_c2_p': 'Uses minimal kinetic energy (3-4g) as an activation mechanism to precisely disperse chemicals.',
        'adv_direct_r1_c3': 'Protect local assets, non-corrosive (server racks, electronics).',
        'adv_direct_r1_c4': 'Not effective for large-scale, outdoor fires.',
        'adv_direct_r2_c1': 'Stat-X (Global) / Gas Systems',
        'adv_direct_r2_c2': 'Passive, high-mass. Activates to disperse aerosol/gas to flood an entire room.',
        'adv_direct_r2_c3': 'Room-scale flooding, non-directional.',
        'adv_direct_r2_c4': 'Costly, requires sealed room, potential for secondary damage.',
        'adv_direct_r3_c1': 'Launcher Systems (VN Defense)',
        'adv_direct_r3_c2_strong': 'Macro-Strategy:',
        'adv_direct_r3_c2_p': 'Uses extremely high kinetic energy to deliver large mass (250m range).',
        'adv_direct_r3_c3': 'Suppress large, inaccessible fires (e.g., forest fires, buildings).',
        'adv_direct_r3_c4': 'Completely destructive to target; cannot be used indoors/near equipment.',
        'adv_usp_h': 'Unique Selling Proposition (USP)',
        'adv_usp_p': 'These are the values we commit to our customers, categorized.',
        'adv_usp_table_h1': 'Category',
        'adv_usp_table_h2': 'Benefit (USP)',
        'adv_usp_table_h3': 'Value to Customer',
        'adv_usp_r1_c1': 'I. Technology (Product)',
        'adv_usp_r1_c2': 'Precise, Non-Corrosive Suppression',
        'adv_usp_r1_c3': 'Ensures suppression of Class C (electrical) and B (liquid) fires with minimal damage to assets (servers, robots).',
        'adv_usp_r2_c1': '',
        'adv_usp_r2_c2': 'Lithium-ion Battery Customization',
        'adv_usp_r2_c3': 'Provides a specialized extinguishing and cooling option (with gel-core) to handle thermal runaway.',
        'adv_usp_r3_c1': '',
        'adv_usp_r3_c2': 'Delivery Mechanism (0.68 Cal)',
        'adv_usp_r3_c3': 'Ensures rapid deployment, simple training, and immediate access to a mass-producible launch platform (non-firearm).',
        'adv_usp_r4_c1': 'II. Strategy (Model)',
        'adv_usp_r4_c2': '"Open Source" Government Licensing',
        'adv_usp_r4_c3': 'Creates a global market moat; governments become loyal partners, securing the market for manufacturers (who pay royalties).',
        'adv_usp_r5_c1': '',
        'adv_usp_r5_c2': 'High Financial Leverage',
        'adv_usp_r5_c3': 'Delivers exceptional profit margins and scalability, reducing production capital while securing high, recurring revenue.',
        'adv_usp_r6_c1': '',
        'adv_usp_r6_c2': 'IP Structure (SG) / R&D (SEA)',
        'adv_usp_r6_c3': 'Minimizes risk by protecting core assets under best-in-class legal frameworks, while maximizing cost-efficiency in development.',

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

// =========================================================================
// PHẦN LOGIC DƯỚI ĐÂY GIỮ NGUYÊN (Không cần thay đổi)
// =========================================================================

let currentLang = localStorage.getItem('lang') || 'vi';

async function importSections() {
    // Thứ tự này khớp với index.html
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
                // Tải HTML vào đúng thẻ <section id="...">
                document.getElementById(section).innerHTML = html;
            } else {
                console.error(`Failed to load section: ${path}`);
            }
        } catch (error) {
            console.error(`Error fetching section ${section}:`, error);
        }
    }
    
    // 1. ÁP DỤNG BẢN DỊCH SAU KHI TẢI
    // (Bây giờ tất cả data-key đã có mặt trên trang)
    applyTranslations(currentLang);
    
    // 2. GỌI initializeApp() (từ main.js)
    // (Bây giờ tất cả các nút tab và biểu đồ đã có mặt trên trang)
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
    
    // Hàm applyTranslations sẽ tự động cập nhật mọi thứ
    applyTranslations(lang);
};

function applyTranslations(lang) {
    // A. Dịch nội dung tĩnh/tải về (bao gồm cả tiêu đề trang)
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = LANGUAGE_DATA[lang][key];
        
        // Chỉ dịch nếu tìm thấy key
        if (translation !== undefined) {
            if (translation === "") { 
                // Xử lý các trường hợp key rỗng (như trong bảng)
                element.innerHTML = "";
            } else {
                element.innerHTML = translation;
            }
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
    // (Phần này chỉ chạy nếu tệp .html bị lỗi 404 không tải được)
    const sectionIds = ['overview', 'vision', 'lean-canvas', 'technology', 'strategy', 'market', 'financials', 'advantage'];
    sectionIds.forEach(id => {
        const titleKey = 'nav_' + id.replace('-', '_');
        const element = document.getElementById(id);
        // Chỉ chèn placeholder nếu div đó rỗng
        if (element && element.tagName === 'DIV' && element.children.length === 0) {
            element.innerHTML = `<h2 class="text-3xl font-bold mb-6">${LANGUAGE_DATA[lang][titleKey]}</h2><p>Content for this section will be translated inside ${id}.html.</p>`;
        }
    });
}


// Chạy hàm import khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', importSections);
