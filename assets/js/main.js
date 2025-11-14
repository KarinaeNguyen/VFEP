<section id="lean-canvas" class="bg-white shadow-xl rounded-2xl p-6 md:p-10">
    <h2 class="text-3xl md:text-4xl font-bold text-indigo-900 mb-4" data-key="lc_main_title">
        Mô Hình Lean Canvas
    </h2>
    <p class="text-lg text-neutral-600 mb-8" data-key="lc_intro_p">
        Mô hình kinh doanh của chúng tôi được tóm tắt bằng công cụ Lean Canvas, tập trung vào việc giải quyết các vấn đề tốn kém nhất của khách hàng.
    </p>

    <!-- Lean Canvas Grid Structure -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm font-semibold text-neutral-700">
        
        <!-- Column 1: Problems -->
        <div class="col-span-1 border border-neutral-300 rounded-lg p-3 h-60 flex flex-col justify-between bg-red-50">
            <h3 class="font-bold text-lg text-red-800 border-b pb-2 mb-2" data-key="lc_col1_title">1. Vấn Đề (Problems)</h3>
            <ul class="list-disc list-inside space-y-1 text-neutral-700 flex-grow">
                <li data-key="lc_col1_item1">Thiệt hại thứ cấp (do nước/khí) lớn hơn thiệt hại ban đầu.</li>
                <li data-key="lc_col1_item2">Không có giải pháp dập tắt chính xác, cục bộ cho pin Li-ion đang thoát nhiệt.</li>
                <li data-key="lc_col1_item3">Thời gian dừng hoạt động (Downtime) sau khi chữa cháy quá lâu.</li>
            </ul>
        </div>

        <!-- Column 2: Solutions / Key Metrics -->
        <div class="col-span-1 md:col-span-2 space-y-4">
            <!-- Row A: Solutions / UVP / Advantage -->
            <div class="grid grid-cols-2 gap-4">
                <div class="border border-neutral-300 rounded-lg p-3 h-32 flex flex-col justify-between bg-green-50">
                    <h3 class="font-bold text-lg text-green-800 border-b pb-1 mb-1" data-key="lc_col2_title">2. Giải Pháp (Solution)</h3>
                    <ul class="list-disc list-inside space-y-0.5 text-neutral-700 flex-grow">
                        <li data-key="lc_col2_item1">Hệ thống phóng viên đạn dập lửa không ăn mòn.</li>
                        <li data-key="lc_col2_item2">Sử dụng hóa chất khô/gel chuyên biệt cho các vụ cháy điện/Li-ion.</li>
                        <li data-key="lc_col2_item3">Phát hiện và phản ứng bằng AI trong vòng <0.5 giây.</li>
                    </ul>
                </div>
                <div class="border border-neutral-300 rounded-lg p-3 h-32 flex flex-col justify-center bg-blue-50">
                    <h3 class="font-bold text-lg text-blue-800 mb-1" data-key="lc_col4_title">4. Đề Xuất Giá Trị Độc Nhất (UVP)</h3>
                    <p class="text-neutral-700" data-key="lc_col4_p1">Chữa cháy chính xác. Không gây hư hại. Không cần dọn dẹp (Tối thiểu).</p>
                    <p class="text-neutral-700 font-bold" data-key="lc_col4_p2">Bảo vệ thiết bị điện tử tốt hơn 80% so với giải pháp hiện có.</p>
                </div>
            </div>
            
            <!-- Row B: Key Metrics / Unfair Advantage -->
            <div class="grid grid-cols-2 gap-4">
                <div class="border border-neutral-300 rounded-lg p-3 h-24 bg-yellow-50">
                    <h3 class="font-bold text-lg text-yellow-800 border-b pb-1 mb-1" data-key="lc_col3_title">3. Chỉ Số Chính (Key Metrics)</h3>
                    <ul class="list-disc list-inside space-y-0.5 text-neutral-700">
                        <li data-key="lc_col3_item1">Tỷ lệ Giảm Thiệt hại Tài sản.</li>
                        <li data-key="lc_col3_item2">Thời gian Phản ứng (Time-to-kill).</li>
                        <li data-key="lc_col3_item3">Doanh thu từ Cấp phép IP & Bản quyền.</li>
                    </ul>
                </div>
                <div class="border border-neutral-300 rounded-lg p-3 h-24 bg-purple-50">
                    <h3 class="font-bold text-lg text-purple-800 border-b pb-1 mb-1" data-key="lc_col5_title">5. Lợi Thế Không Thể Bắt Chước (Unfair Advantage)</h3>
                    <ul class="list-disc list-inside space-y-0.5 text-neutral-700">
                        <li data-key="lc_col5_item1">Cấu trúc IP "Royalty-free" cho Chính phủ.</li>
                        <li data-key="lc_col5_item2">Tối ưu hóa chi phí R&D tại Việt Nam.</li>
                        <li data-key="lc_col5_item3">Kiến thức chuyên môn về vật liệu phóng, hóa học khô, và AI.</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Column 4: Customer Segments -->
        <div class="col-span-1 border border-neutral-300 rounded-lg p-3 h-60 flex flex-col justify-between bg-yellow-100">
            <h3 class="font-bold text-lg text-yellow-900 border-b pb-2 mb-2" data-key="lc_col7_title">7. Phân Khúc Khách Hàng (Customer Segments)</h3>
            <ul class="list-disc list-inside space-y-1 text-neutral-800 flex-grow">
                <li data-key="lc_col7_item1">Trung tâm Dữ liệu (Data Centers) và Viễn thông.</li>
                <li data-key="lc_col7_item2">Sản xuất điện tử và Pin Lithium-ion.</li>
                <li data-key="lc_col7_item3">Kho chứa vật tư, phòng máy chủ nhỏ.</li>
            </ul>
        </div>
        
        <!-- Column 5: Channels / Cost / Revenue -->
        <div class="col-span-2 md:col-span-1 space-y-4">
            <div class="border border-neutral-300 rounded-lg p-3 h-20 bg-indigo-50">
                <h3 class="font-bold text-lg text-indigo-800 border-b pb-1 mb-1" data-key="lc_col6_title">6. Kênh (Channels)</h3>
                <ul class="list-disc list-inside space-y-0.5 text-neutral-700">
                    <li data-key="lc_col6_item1">Cấp phép trực tiếp cho các OEM và nhà thầu PCCC lớn.</li>
                    <li data-key="lc_col6_item2">Hợp tác R&D với các công ty Quốc phòng/Hàng không vũ trụ.</li>
                </ul>
            </div>
            
            <div class="border border-neutral-300 rounded-lg p-3 h-20 bg-red-100">
                <h3 class="font-bold text-lg text-red-800 border-b pb-1 mb-1" data-key="lc_col8_title">8. Cấu Trúc Chi Phí (Cost Structure)</h3>
                <ul class="list-disc list-inside space-y-0.5 text-neutral-700">
                    <li data-key="lc_col8_item1">Chi phí R&D và Tạo mẫu (Prototyping).</li>
                    <li data-key="lc_col8_item2">Chi phí Đăng ký/Bảo vệ IP toàn cầu.</li>
                    <li data-key="lc_col8_item3">Chi phí Nhân sự Kỹ thuật.</li>
                </ul>
            </div>

            <div class="border border-neutral-300 rounded-lg p-3 h-20 bg-green-100">
                <h3 class="font-bold text-lg text-green-800 border-b pb-1 mb-1" data-key="lc_col9_title">9. Dòng Doanh Thu (Revenue Streams)</h3>
                <ul class="list-disc list-inside space-y-0.5 text-neutral-700">
                    <li data-key="lc_col9_item1">Phí Cấp phép (Licensing fees - trả trước).</li>
                    <li data-key="lc_col9_item2">Tiền Bản quyền (Royalties - định kỳ).</li>
                    <li data-key="lc_col9_item3">Hợp đồng R&D chính phủ (đột xuất).</li>
                </ul>
            </div>
        </div>
    </div>
</section>
