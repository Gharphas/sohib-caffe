-- ==============================================================================
-- DATABASE SCHEMA: SOHIB CAFFE & RESTO
-- Aplikasi Point of Sale (POS) & Manajemen Restoran
-- Owner: Muh Ikhsan Anggara
-- Target DBMS: MySQL 8.0+ / MariaDB 10.5+ / PostgreSQL compatible
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `sohib_caffe_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `sohib_caffe_db`;

-- ------------------------------------------------------------------------------
-- 1. TABEL PENGGUNA & OTENTIKASI AKUN (USERS / ACCOUNTS)
-- Menyimpan data Owner, Kasir, Barista, Staff, dan Member Pelanggan
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) UNIQUE NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('owner', 'kasir', 'barista', 'manager', 'member') NOT NULL DEFAULT 'kasir',
    `avatar` VARCHAR(255) DEFAULT 'MIA',
    `status` ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
    `last_login` DATETIME NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_users_email` (`email`),
    INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- 2. TABEL KATEGORI MENU (CATEGORIES)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category_code` VARCHAR(20) UNIQUE NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(50) DEFAULT 'ri-cup-line',
    `description` TEXT NULL,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- 3. TABEL PRODUK & INVENTORI (PRODUCTS / MENUS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category_id` INT NOT NULL,
    `sku` VARCHAR(50) UNIQUE NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `price` DECIMAL(12, 2) NOT NULL,          -- Harga Jual ke Pelanggan
    `cost_price` DECIMAL(12, 2) NOT NULL,     -- Harga Modal Pokok (HPP)
    `stock` INT NOT NULL DEFAULT 0,            -- Stok Fisik Tersedia
    `min_stock_alert` INT DEFAULT 5,          -- Batas Minimum Peringatan Stok
    `image_url` VARCHAR(255) NULL,
    `is_drink` BOOLEAN DEFAULT FALSE,         -- Penanda minuman (opsi gula/es/topping)
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT,
    INDEX `idx_product_category` (`category_id`),
    INDEX `idx_product_sku` (`sku`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- 4. TABEL SUPPLIER / PEMASOK BAHAN BAKU (SUPPLIERS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `suppliers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `supplier_code` VARCHAR(30) UNIQUE NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `contact_person` VARCHAR(100) NULL,
    `phone` VARCHAR(25) NOT NULL,
    `address` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- 5. TABEL PEMBELIAN STOK & BAHAN BAKU (PURCHASES / RESTOCK)
-- Menyimpan riwayat belanja bahan dan barang masuk dari supplier
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `purchases` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `purchase_no` VARCHAR(50) UNIQUE NOT NULL, -- Format: PO-YYYYMMDD-XXXX
    `supplier_id` INT NULL,
    `user_id` INT NOT NULL,                    -- Petugas yang mencatat belanja
    `purchase_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `total_amount` DECIMAL(12, 2) NOT NULL,    -- Total Nominal Pembelian
    `payment_method` ENUM('tunai', 'transfer', 'tempo') NOT NULL DEFAULT 'transfer',
    `payment_status` ENUM('lunas', 'belum_lunas') NOT NULL DEFAULT 'lunas',
    `notes` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT,
    INDEX `idx_purchase_date` (`purchase_date`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- 6. TABEL DETAIL PEMBELIAN (PURCHASE_ITEMS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `purchase_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `purchase_id` INT NOT NULL,
    `product_id` INT NULL,
    `item_name` VARCHAR(150) NOT NULL,
    `quantity` INT NOT NULL,
    `unit_cost` DECIMAL(12, 2) NOT NULL,       -- Harga Beli per Unit
    `subtotal` DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- 7. TABEL TRANSAKSI PENJUALAN KASIR (SALES / ORDERS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sales` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `invoice_no` VARCHAR(50) UNIQUE NOT NULL,  -- Format: INV-YYYYMMDD-XXXX
    `user_id` INT NOT NULL,                    -- Kasir / User yang melayani
    `customer_name` VARCHAR(100) DEFAULT 'Pelanggan Walk-In',
    `table_number` VARCHAR(30) DEFAULT 'Meja Takeaway',
    `order_type` ENUM('dine_in', 'take_away', 'delivery') NOT NULL DEFAULT 'dine_in',
    `subtotal` DECIMAL(12, 2) NOT NULL,
    `discount_amount` DECIMAL(12, 2) DEFAULT 0,
    `tax_amount` DECIMAL(12, 2) DEFAULT 0,
    `total_amount` DECIMAL(12, 2) NOT NULL,    -- Total Akhir
    `payment_method` ENUM('cash', 'qris', 'debit_card', 'ewallet', 'bank_transfer') NOT NULL DEFAULT 'cash',
    `amount_paid` DECIMAL(12, 2) NOT NULL,     -- Uang yang diterima kasir
    `change_due` DECIMAL(12, 2) DEFAULT 0,     -- Kembalian
    `payment_status` ENUM('paid', 'refunded', 'void') NOT NULL DEFAULT 'paid',
    `shift_number` INT DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT,
    INDEX `idx_sales_invoice` (`invoice_no`),
    INDEX `idx_sales_created_at` (`created_at`),
    INDEX `idx_sales_payment_method` (`payment_method`)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- 8. TABEL DETAIL ITEM PENJUALAN (SALE_ITEMS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sale_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `sale_id` INT NOT NULL,
    `product_id` INT NULL,
    `product_name` VARCHAR(150) NOT NULL,
    `quantity` INT NOT NULL,
    `unit_price` DECIMAL(12, 2) NOT NULL,      -- Harga Jual Satuan
    `cost_price` DECIMAL(12, 2) NOT NULL,      -- HPP Satuan saat transaksi
    `subtotal` DECIMAL(12, 2) NOT NULL,
    `temperature_option` VARCHAR(30) NULL,     -- Ice / Hot
    `sugar_level` VARCHAR(30) NULL,            -- Normal / Less / Madu Arab
    `ice_level` VARCHAR(30) NULL,              -- Normal Ice / Less Ice
    `size_option` VARCHAR(30) NULL,            -- Regular / Large
    `addons_json` JSON NULL,                   -- Contoh: ["Saffron", "Susu Kambing"]
    `special_notes` VARCHAR(255) NULL,
    FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- 9. TABEL LOG MUTASI STOK INVENTORI (INVENTORY_LOGS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `change_type` ENUM('penjualan', 'pembelian_masuk', 'retur', 'penyesuaian_manual', 'rusak_buang') NOT NULL,
    `quantity_change` INT NOT NULL,            -- Positif (masuk) / Negatif (keluar)
    `previous_stock` INT NOT NULL,
    `current_stock` INT NOT NULL,
    `reference_no` VARCHAR(50) NULL,           -- No Invoice / No Purchase Order
    `notes` VARCHAR(255) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
    INDEX `idx_inv_product` (`product_id`)
) ENGINE=InnoDB;

-- ==============================================================================
-- INITIAL SEED DATA (DATA AWAL CONTOH & AKUN RESMI SOHIB CAFFE)
-- ==============================================================================

-- 1. Data Akun Default
INSERT INTO `users` (`username`, `full_name`, `email`, `phone`, `password_hash`, `role`, `avatar`) VALUES
('owner', 'Muh Ikhsan Anggara', 'owner@sohibcaffe.com', '0895325480299', '$2y$10$e8wF9aK...sohib2026', 'owner', 'MIA'),
('admin', 'Admin Keamanan Siber', 'admin@sohibcaffe.com', '089599887766', '$2y$10$e8wF9aK...admin2024', 'admin', 'ADM'),
('kasir1', 'Fajar Pratama', 'kasir@sohibcaffe.com', '081298765432', '$2y$10$e8wF9aK...kasir1234', 'kasir', 'FP'),
('barista1', 'Rian Anggara', 'barista@sohibcaffe.com', '081345678901', '$2y$10$e8wF9aK...barista1234', 'barista', 'RA');

-- 2. Kategori Menu
INSERT INTO `categories` (`category_code`, `name`, `icon`, `description`) VALUES
('MAKANAN', 'Makanan Khas Arab', 'ri-restaurant-line', 'Nasi Mandhi, Kebuli, Briyani, Kabsah Daging Kambing & Ayam'),
('MINUMAN', 'Kopi & Minuman Segar', 'ri-cup-line', 'Kopi Arab Gahwa, Karak Tea, Maryam Shakes & Juice'),
('SNACK', 'Camilan & Roti', 'ri-cake-3-line', 'Roti Maryam Madu, Samosa Daging, Baklava');

-- 3. Data Produk
INSERT INTO `products` (`category_id`, `sku`, `name`, `price`, `cost_price`, `stock`, `is_drink`) VALUES
(1, 'MND-KMB-01', 'Nasi Mandhi Kambing Spesial', 48000.00, 32000.00, 35, FALSE),
(1, 'KBL-AYM-01', 'Nasi Kebuli Ayam Panggang', 38000.00, 24000.00, 40, FALSE),
(1, 'BRY-KMB-01', 'Nasi Briyani Daging Domba', 52000.00, 35000.00, 25, FALSE),
(2, 'GHW-ARB-01', 'Kopi Gahwa Arabica Saffron', 22000.00, 11000.00, 60, TRUE),
(2, 'KRK-TEA-01', 'Karak Tea Rempah Arab', 18000.00, 9000.00, 80, TRUE),
(3, 'RYM-MDU-01', 'Roti Maryam Madu Yaman', 16000.00, 8000.00, 50, FALSE),
(3, 'SMS-DGG-01', 'Samosa Daging Kambing (3 Pcs)', 20000.00, 11000.00, 45, FALSE);

-- 4. Data Supplier Bahan Baku
INSERT INTO `suppliers` (`supplier_code`, `name`, `contact_person`, `phone`, `address`) VALUES
('SUP-01', 'CV Berkah Rempah Nusantara', 'H. Syukri', '081122334455', 'Jl. Sukabangun II, Palembang'),
('SUP-02', 'Peternakan Kambing Barokah', 'Ustadz Mansur', '085277889900', 'Gandus, Kota Palembang');

-- 5. Contoh Transaksi Pembelian Stok (Purchase)
INSERT INTO `purchases` (`purchase_no`, `supplier_id`, `user_id`, `purchase_date`, `total_amount`, `payment_method`, `payment_status`, `notes`) VALUES
('PO-20260825-001', 1, 1, '2026-08-25 09:30:00', 1250000.00, 'transfer', 'lunas', 'Restok beras basmati, rempah kapulaga, dan kopi gahwa');

INSERT INTO `purchase_items` (`purchase_id`, `product_id`, `item_name`, `quantity`, `unit_cost`, `subtotal`) VALUES
(1, 4, 'Biji Kopi Arabica Gahwa 5Kg', 5, 150000.00, 750000.00),
(1, 5, 'Rempah Karak Tea Premium 500g', 5, 100000.00, 500000.00);

-- 6. Contoh Transaksi Penjualan Kasir (Sales)
INSERT INTO `sales` (`invoice_no`, `user_id`, `customer_name`, `table_number`, `order_type`, `subtotal`, `discount_amount`, `tax_amount`, `total_amount`, `payment_method`, `amount_paid`, `change_due`, `payment_status`, `shift_number`) VALUES
('INV-20260825-001', 1, 'Hamba Allah', 'Meja 05', 'dine_in', 70000.00, 0.00, 0.00, 70000.00, 'qris', 70000.00, 0.00, 'paid', 1);

INSERT INTO `sale_items` (`sale_id`, `product_id`, `product_name`, `quantity`, `unit_price`, `cost_price`, `subtotal`, `temperature_option`, `sugar_level`, `size_option`, `special_notes`) VALUES
(1, 1, 'Nasi Mandhi Kambing Spesial', 1, 48000.00, 32000.00, 48000.00, NULL, NULL, NULL, 'Daging empuk'),
(1, 4, 'Kopi Gahwa Arabica Saffron', 1, 22000.00, 11000.00, 22000.00, 'Hangat (Hot)', 'Madu Arab', 'Regular', 'Es dipisah');
