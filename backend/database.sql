-- ========================================================
-- CSDL SHOP HOA QUẢ (shop_hoa_qua)
-- Tương thích: MySQL 5.7+ / MariaDB / XAMPP
-- ========================================================

CREATE DATABASE IF NOT EXISTS shop_hoa_qua CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shop_hoa_qua;

-- 1. Bảng Categories (Danh mục sản phẩm)
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng Order Items (Chi tiết sản phẩm từng đơn hàng)
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  product_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(15,2) NOT NULL DEFAULT 0,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Bảng Plugins (Các tiện ích marketing mở rộng)
CREATE TABLE IF NOT EXISTS plugins (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT DEFAULT NULL,
  version VARCHAR(50) DEFAULT '1.0.0',
  author VARCHAR(100) DEFAULT 'FruitWP Team',
  active BOOLEAN DEFAULT FALSE,
  settings LONGTEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Bảng Settings (Cài đặt chung: thông tin liên hệ, hotline, voucher)
CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value LONGTEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
