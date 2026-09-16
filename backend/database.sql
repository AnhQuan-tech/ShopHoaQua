-- ========================================================
-- CSDL SHOP HOA QUẢ CHO TIDB CLOUD / MYSQL
-- Lưu ý: Tạo trực tiếp vào database 'test' mặc định của TiDB
-- ========================================================

-- 1. Bảng Categories (Danh mục sản phẩm)
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(100) DEFAULT NULL
);

-- 2. Bảng Products (Sản phẩm hoa quả)
CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) DEFAULT '',
  category VARCHAR(50) NOT NULL,
  categoryName VARCHAR(255) DEFAULT '',
  price DECIMAL(15,2) NOT NULL DEFAULT 0,
  originalPrice DECIMAL(15,2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  unit VARCHAR(100) DEFAULT '1 Kg',
  origin VARCHAR(255) DEFAULT '',
  sweetness VARCHAR(255) DEFAULT '',
  badge VARCHAR(100) DEFAULT '',
  image TEXT DEFAULT NULL,
  rating DECIMAL(3,2) DEFAULT 5.0,
  reviewCount INT DEFAULT 0,
  description TEXT DEFAULT NULL,
  isFlashSale BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng Orders (Đơn đặt hàng)
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) PRIMARY KEY,
  customer VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  note TEXT DEFAULT NULL,
  subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
  discount DECIMAL(15,2) NOT NULL DEFAULT 0,
  total DECIMAL(15,2) NOT NULL DEFAULT 0,
  paymentMethod VARCHAR(50) DEFAULT 'COD',
  status VARCHAR(50) DEFAULT 'pending',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Bảng Order Items (Chi tiết sản phẩm từng đơn hàng)
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  product_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(15,2) NOT NULL DEFAULT 0,
  quantity INT NOT NULL DEFAULT 1
);

-- 5. Bảng Plugins (Các tiện ích marketing mở rộng)
CREATE TABLE IF NOT EXISTS plugins (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT DEFAULT NULL,
  version VARCHAR(50) DEFAULT '1.0.0',
  author VARCHAR(100) DEFAULT 'FruitWP Team',
  active BOOLEAN DEFAULT FALSE,
  settings LONGTEXT DEFAULT NULL
);

-- 6. Bảng Settings (Cài đặt chung: thông tin liên hệ, hotline, voucher)
CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value LONGTEXT DEFAULT NULL
);

-- ========================================================
-- NẠP DỮ LIỆU MẪU BAN ĐẦU (SEED DATA)
-- ========================================================

-- Categories
INSERT INTO categories (id, name, icon) VALUES
('all', 'Tất Cả Sản Phẩm', 'LayoutGrid'),
('nhap-khau', 'Trái Cây Nhập Khẩu', 'Plane'),
('noi-dia', 'Đặc Sản Nội Địa', 'MapPin'),
('gio-qua', 'Giỏ Quà Biếu Tặng', 'Gift'),
('nuoc-ep', 'Nước Ép & Detox', 'Coffee')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Products
INSERT INTO products (id, name, slug, category, categoryName, price, originalPrice, stock, unit, origin, sweetness, badge, image, rating, reviewCount, description, isFlashSale, featured) VALUES
(1788919302976, 'Việt Quất Tươi Hữu Cơ Nhập Khẩu (Hộp 125g)', 'viet-quat-tuoi', 'nhap-khau', 'Trái Cây Nhập Khẩu', 89000, 110000, 45, 'Hộp 125g', 'Chile / Peru', 'Chua ngọt dịu giàu chất chống oxy hóa', 'Super Food', 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80', 5.0, 1, 'Việt quất tươi nhập khẩu, quả cứng căng mọng phủ phấn tự nhiên.', 1, 1),
(1, 'Táo Envy New Zealand Size 35 (Hộp 1kg)', 'tao-envy-new-zealand', 'nhap-khau', 'Trái Cây Nhập Khẩu', 149000, 185000, 85, 'Hộp 1kg', 'New Zealand', '15° Brix (Giòn ngọt đậm)', 'Bán Chạy Nhất', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80', 4.9, 128, 'Táo Envy New Zealand nhập khẩu đường hàng không, quả to đều, thịt trắng tinh giòn rụm, vị ngọt đậm đà kèm hương thơm đặc trưng cuốn hút. Giàu Vitamin C và chất chống oxy hóa.', 1, 1),
(2, 'Nho Mẫu Đơn Shine Muscat Chuẩn VIP (Chùm 750g)', 'nho-mau-don-shine-muscat', 'nhap-khau', 'Trái Cây Nhập Khẩu', 389000, 450000, 42, 'Chùm 750g', 'Hàn Quốc / Nhật Bản', '18° Brix (Thơm mùi xoài sữa)', 'Siêu Phẩm', 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=600&q=80', 5.0, 94, 'Nho Mẫu Đơn Shine Muscat thượng hạng, quả tròn căng bóng, không hạt, vỏ mỏng ăn được cả vỏ, thịt dẻo ngọt ngào phảng phất hương vị sữa và xoài chín.', 1, 1),
(3, 'Cherry Đỏ Mỹ Size 9.0 Premium (Hộp 500g)', 'cherry-do-my-premium', 'nhap-khau', 'Trái Cây Nhập Khẩu', 289000, 350000, 60, 'Hộp 500g', 'Washington, Hoa Kỳ', '17° Brix (Mọng nước)', 'Sale 20%', 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80', 4.8, 112, 'Cherry đỏ Washington quả to mọng, màu đỏ thẫm bóng bẩy, cuống xanh tươi rói. Cắn ngập răng cảm nhận ngay dòng nước ngọt thanh sảng khoái.', 0, 1),
(4, 'Dâu Tây Bạch Tuyết & Dâu Hàn Quốc (Hộp 330g)', 'dau-tay-han-quoc', 'nhap-khau', 'Trái Cây Nhập Khẩu', 195000, 230000, 35, 'Hộp 330g', 'Hàn Quốc', '14° Brix (Chua ngọt hài hòa)', 'Mới Về', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80', 4.9, 76, 'Dâu tây nhập khẩu chuyển bằng đường bay, quả đỏ tươi mọng nước, hương thơm ngát tự nhiên, cuống xanh mướt.', 1, 1),
(5, 'Sầu Riêng Ri6 Đắk Lắk Cơm Vàng Hạt Lép (Quả 2.5-3kg)', 'sau-rieng-ri6-dak-lak', 'noi-dia', 'Trái Cây Nội Địa', 135000, 160000, 25, '1 Kg (Bao ăn 1 đổi 1)', 'Đắk Lắk, Việt Nam', 'Cơm vàng dẻo, béo ngậy', 'Bao Ăn 1-1', 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=600&q=80', 4.9, 210, 'Sầu riêng Ri6 chín tự nhiên trên cây, múi cơm vàng ươm dày cùi hạt lép, vị ngọt đậm béo ngậy thơm nức mũi. Cam kết bao ăn 1 đổi 1 nếu sượng hoặc nhạt.', 1, 1),
(6, 'Xoài Cát Hòa Lộc Tiền Giang Chuẩn Xuất Khẩu', 'xoai-cat-hoa-loc', 'noi-dia', 'Trái Cây Nội Địa', 85000, 110000, 90, '1 Kg (Khoảng 2 quả)', 'Tiền Giang, Việt Nam', '16° Brix (Ngọt thơm nồng nàn)', 'Đặc Sản', 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80', 4.8, 89, 'Đặc sản xoài cát Hòa Lộc Tiền Giang nổi tiếng, vỏ vàng óng khi chín, thịt quả chắc mịn không xơ, vị ngọt thanh tao thơm lừng khắp nhà.', 0, 0),
(7, 'Bơ Sáp Booth 7 Tây Nguyên Dẻo Quánh (1 Kg)', 'bo-sap-booth-7', 'noi-dia', 'Trái Cây Nội Địa', 65000, 85000, 110, '1 Kg (3-4 quả)', 'Lâm Đồng, Việt Nam', 'Béo ngậy dẻo bơ', 'Organic', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80', 4.7, 65, 'Bơ Booth 7 cơm vàng dẻo quánh, hàm lượng chất béo thực vật lành mạnh cao, ăn trực tiếp, làm salad hay sinh tố đều béo bùi tuyệt hảo.', 0, 0),
(8, 'Dưa Lưới Ruột Cam Ichiba Nhật Bản (Quả 1.5kg)', 'dua-luoi-ichiba', 'noi-dia', 'Trái Cây Nội Địa', 99000, 125000, 48, 'Quả 1.5kg', 'Trồng công nghệ cao tại Đà Lạt', '15° Brix (Mát lành giòn tan)', 'VietGAP', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80', 4.8, 54, 'Dưa lưới vân nổi đều đẹp mắt, ruột cam giòn ngọt lịm và mọng nước. Sản phẩm đạt chứng nhận nông sản sạch VietGAP.', 0, 0),
(9, 'Cam Vàng Navel Úc Không Hạt Mọng Nước (1 Kg)', 'cam-vang-navel-uc', 'nhap-khau', 'Trái Cây Nhập Khẩu', 79000, 95000, 150, '1 Kg (3-4 quả)', 'Úc (Australia)', '13° Brix (Vị chua ngọt thanh)', 'Vitamin C+', 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80', 4.8, 140, 'Cam Navel quả tròn vàng bóng, tép cam mọng đầy nước, dễ bóc vỏ, không hạt, cung cấp dồi dào Vitamin C tăng đề kháng cả gia đình.', 1, 0),
(10, 'Giỏ Quà Trái Cây Biếu Tặng Hoàng Gia VIP', 'gio-trai-cay-hoang-gia-vip', 'gio-qua', 'Giỏ Quà Biếu Tặng', 890000, 1150000, 20, 'Giỏ VIP Kèm Nơ & Thiệp', 'Tuyển chọn 100% Trái Cây Nhập Khẩu', 'Đa dạng hương vị thượng hạng', 'Quà Tặng Sang Trọng', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80', 5.0, 78, 'Giỏ quà thiết kế tinh tế với Táo Envy, Nho Mẫu Đơn, Cherry Đỏ, Kiwi Vàng và Cam Navel. Đi kèm ruy băng lụa cao cấp và thiệp chúc mừng theo yêu cầu.', 0, 1),
(11, 'Giỏ Quà Trái Cây Tri Ân Cảm Ơn Đẳng Cấp', 'gio-qua-tri-an-dang-cap', 'gio-qua', 'Giỏ Quà Biếu Tặng', 550000, 680000, 30, 'Giỏ quà cao cấp', 'Trái cây tuyển chọn loại 1', 'Tươi ngon thanh lịch', 'Bán Chạy', 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80', 4.9, 42, 'Món quà tinh tế thích hợp biếu tặng đối tác, thăm hỏi người thân hay lễ Tết. Đóng gói chuyên nghiệp, bảo quản lạnh tối ưu.', 0, 0),
(12, 'Nước Ép Trái Cây Tươi Cold-Pressed Detox (Chai 350ml)', 'nuoc-ep-cold-pressed-detox', 'nuoc-ep', 'Hoa Quả Sấy & Nước Ép', 45000, 55000, 80, 'Chai 350ml', 'Ép tươi trong ngày', '100% tự nhiên không đường', '100% Nguyên Chất', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80', 4.8, 85, 'Nước ép công nghệ ép chậm giữ trọn 99% enzyme và vitamin. Sự kết hợp hoàn hảo từ Cam Úc, Táo Envy và Cà Rốt hữu cơ.', 0, 0)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Plugins
INSERT INTO plugins (id, name, description, version, author, active, settings) VALUES
('wp_mega_popup', 'WP Fruit Marketing Popup Pro', 'Popup quảng cáo siêu to khổng lồ nhảy ra khi khách vào shop, tặng mã voucher giảm giá 50k-100k, thu thập SĐT khách hàng.', '3.2.0', 'FruitWP Team', 1, '{\"title\":\"🎉 ĐẠI TIỆC HOA QUẢ NHẬP KHẨU GIẢM 50%\",\"subtitle\":\"Chào bạn mới! Tặng ngay voucher 50.000đ cho đơn hàng hoa quả tươi đầu tiên.\",\"couponCode\":\"HOAQUA50\",\"delaySeconds\":1.5,\"badgeText\":\"FLASH DEAL HÔM NAY\",\"ctaText\":\"NHẬN VOUCHER NGAY\",\"imageUrl\":\"https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=700&q=80\"}'),
('wp_social_proof', 'WP Social Proof Live Orders', 'Popup nhảy thông báo đơn hàng liên tục ở góc dưới bên trái (ví dụ: Chị Lan vừa mua 2kg Táo Envy 2 phút trước). Tăng độ uy tín 300%.', '2.4.1', 'FruitWP Team', 1, '{\"intervalSeconds\":9,\"position\":\"bottom-left\"}'),
('wp_lucky_wheel', 'WP Lucky Spin Wheel & Gamification', 'Nút hộp quà lắc lư ở góc màn hình. Khách bấm vào sẽ hiện Vòng Quay May Mắn trúng voucher, dâu tây hoặc quà tặng bất ngờ!', '1.8.0', 'FruitWP Team', 1, '{\"buttonText\":\"Vòng Quay May Mắn 🎁\",\"chancesPerUser\":3}'),
('wp_falling_fruits', 'WP Fruit & Leaf Falling Animation', 'Hiệu ứng các quả dâu tây mini và lá cây xanh rơi bồng bềnh lãng mạn trên trang web, tạo không gian tươi mát sinh động.', '1.2.0', 'FruitWP Team', 1, '{\"density\":\"medium\",\"speed\":\"slow\"}'),
('wp_floating_contact', 'WP Floating Contact & Zalo Hotline', 'Cụm nút liên hệ nổi góc dưới bên phải: Gọi Hotline nhanh, Chat Zalo tư vấn chọn giỏ quà, chat Messenger.', '2.1.0', 'FruitWP Team', 1, '{\"hotline\":\"0921412005\",\"zalo\":\"0921412005\",\"showMessenger\":true}'),
('wp_countdown_bar', 'WP Top Flash Sale Countdown Bar', 'Thanh thông báo đếm ngược thời gian Flash Sale và freeship ghim trên đầu trang web.', '1.0.5', 'FruitWP Team', 1, '{\"message\":\"🔥 SIÊU HỘI TRÁI CÂY TƯƠI SẠCH: FREESHIP MỌI ĐƠN TỪ 300K - TẶNG THIỆP VIP CHO GIỎ QUÀ!\",\"hoursRemaining\":14}')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Settings
INSERT INTO settings (setting_key, setting_value) VALUES
('siteTitle', 'FRUIT PARADISE - Hoa Quả Tươi Sạch Cao Cấp'),
('hotline', '0921412005'),
('phone', '0921412005'),
('email', 'anhquan14011@gmail.com'),
('address', '250 Minh Khai, Phường Hai Bà Trưng, Hà Nội'),
('adminUser', 'admin'),
('adminPass', 'admin'),
('shippingFee', '25000'),
('freeShippingMin', '300000'),
('vouchers', '[{\"code\":\"HOAQUA50\",\"discount\":50000,\"minOrder\":300000,\"desc\":\"Giảm 50k cho đơn từ 300k\"},{\"code\":\"FREESHIP\",\"discount\":25000,\"minOrder\":200000,\"desc\":\"Miễn phí vận chuyển 25k\"},{\"code\":\"VIP100\",\"discount\":100000,\"minOrder\":600000,\"desc\":\"Giảm 100k cho đơn từ 600k\"}]')
ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);
