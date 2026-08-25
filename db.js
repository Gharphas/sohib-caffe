/**
 * SOHIB CAFFE & RESTO — Database Management Client Layer (db.js)
 * Menyediakan fungsi CRUD lokal terstruktur untuk:
 * - 1. Akun Pengguna & Staf (Users - Login & Registrasi Real-time)
 * - 2. Transaksi Penjualan Kasir (Sales)
 * - 3. Pembelian Bahan Baku / Stok (Purchases)
 * - 4. Inventori & Produk Menu (Products & Stock)
 * - 5. Export & Backup Data (JSON / CSV)
 * 
 * Owner: Muh Ikhsan Anggara
 */

const SohibDB = (function () {
    const STORAGE_KEYS = {
        USERS: 'sohib_db_users',
        PRODUCTS: 'sohib_db_products',
        SALES: 'sohib_db_sales',
        PURCHASES: 'sohib_db_purchases',
        SUPPLIERS: 'sohib_db_suppliers',
        LOGS: 'sohib_db_inventory_logs',
        CONFIG: 'sohib_db_config'
    };

    // Initial Seed Data Defaults
    const DEFAULT_DATA = {
        users: [
            {
                id: 1,
                username: 'owner',
                full_name: 'Muh Ikhsan Anggara',
                email: 'owner@sohibcaffe.com',
                phone: '0895325480299',
                pass: 'sohib2024',
                role: 'owner',
                role_badge: 'Owner & General Manager',
                avatar: 'MIA',
                status: 'active',
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                username: 'kasir1',
                full_name: 'Fajar Pratama',
                email: 'kasir@sohibcaffe.com',
                phone: '081298765432',
                pass: 'kasir1234',
                role: 'kasir',
                role_badge: 'Kasir Utama (Shift 1)',
                avatar: 'FP',
                status: 'active',
                created_at: new Date().toISOString()
            },
            {
                id: 3,
                username: 'barista1',
                full_name: 'Rian Anggara',
                email: 'barista@sohibcaffe.com',
                phone: '081345678901',
                pass: 'barista1234',
                role: 'barista',
                role_badge: 'Barista & Staff',
                avatar: 'RA',
                status: 'active',
                created_at: new Date().toISOString()
            }
        ],
        products: [
            { id: 1, category: 'makanan', sku: 'MND-01', name: 'Nasi Mandhi Kambing Spesial', price: 48000, cost_price: 32000, stock: 35, is_drink: false },
            { id: 2, category: 'makanan', sku: 'KBL-01', name: 'Nasi Kebuli Ayam Panggang', price: 38000, cost_price: 24000, stock: 40, is_drink: false },
            { id: 3, category: 'makanan', sku: 'BRY-01', name: 'Nasi Briyani Daging Domba', price: 52000, cost_price: 35000, stock: 25, is_drink: false },
            { id: 4, category: 'minuman', sku: 'GHW-01', name: 'Kopi Gahwa Arabica Saffron', price: 22000, cost_price: 11000, stock: 60, is_drink: true },
            { id: 5, category: 'minuman', sku: 'KRK-01', name: 'Karak Tea Rempah Arab', price: 18000, cost_price: 9000, stock: 80, is_drink: true },
            { id: 6, category: 'snack', sku: 'RYM-01', name: 'Roti Maryam Madu Yaman', price: 16000, cost_price: 8000, stock: 50, is_drink: false },
            { id: 7, category: 'snack', sku: 'SMS-01', name: 'Samosa Daging Kambing (3 Pcs)', price: 20000, cost_price: 11000, stock: 45, is_drink: false }
        ],
        sales: [],
        purchases: []
    };

    // Helper functions
    function getStored(key, defaultVal) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : defaultVal;
        } catch (e) {
            console.error('Error reading localStorage:', key, e);
            return defaultVal;
        }
    }

    function setStored(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error writing to localStorage:', key, e);
            return false;
        }
    }

    // Inisialisasi Database jika pertama kali berjalan
    function init() {
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            setStored(STORAGE_KEYS.USERS, DEFAULT_DATA.users);
        }
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
            setStored(STORAGE_KEYS.PRODUCTS, DEFAULT_DATA.products);
        }
        if (!localStorage.getItem(STORAGE_KEYS.SALES)) {
            setStored(STORAGE_KEYS.SALES, DEFAULT_DATA.sales);
        }
        if (!localStorage.getItem(STORAGE_KEYS.PURCHASES)) {
            setStored(STORAGE_KEYS.PURCHASES, DEFAULT_DATA.purchases);
        }
        console.log('✅ SohibDB Initialized Successfully');
    }

    // Auto-run init
    init();

    return {
        /* -------------------------------------------------------------
           1. MODUL USERS / AKUN PENGGUNA (PENDAFTARAN & LOGIN)
           ------------------------------------------------------------- */
        getUsers() {
            return getStored(STORAGE_KEYS.USERS, DEFAULT_DATA.users);
        },

        getUserByEmail(email) {
            if (!email) return null;
            const users = this.getUsers();
            return users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase().trim());
        },

        getUserByIdentifier(identifier) {
            if (!identifier) return null;
            const users = this.getUsers();
            const idLower = identifier.toLowerCase().trim();
            return users.find(u => 
                (u.email && u.email.toLowerCase() === idLower) ||
                (u.username && u.username.toLowerCase() === idLower) ||
                (u.phone && u.phone === identifier.trim())
            );
        },

        addUser(userData) {
            const users = this.getUsers();
            
            // Cek duplikasi email
            if (this.getUserByEmail(userData.email)) {
                return { success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain atau langsung masuk.' };
            }

            const newId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) + 1 : 1;
            const cleanUsername = userData.username || (userData.email ? userData.email.split('@')[0] : `user${newId}`);
            
            // Inisial avatar
            let avatarLetters = 'MB';
            if (userData.full_name) {
                const parts = userData.full_name.trim().split(' ');
                avatarLetters = parts.length > 1 
                    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() 
                    : parts[0].substring(0, 2).toUpperCase();
            }

            const newUser = {
                id: newId,
                username: cleanUsername,
                full_name: userData.full_name || 'Member Sohib Resto',
                email: userData.email ? userData.email.toLowerCase().trim() : '',
                phone: userData.phone ? userData.phone.trim() : '',
                pass: userData.pass || userData.password || '',
                role: userData.role || 'member',
                role_badge: userData.role_badge || (userData.role === 'owner' ? 'Owner & General Manager' : 'Member Pelanggan'),
                avatar: userData.avatar || avatarLetters,
                status: 'active',
                created_at: new Date().toISOString()
            };

            users.push(newUser);
            setStored(STORAGE_KEYS.USERS, users);
            console.log('✅ Akun Baru Tersimpan di Database SohibDB:', newUser);
            return { success: true, user: newUser };
        },

        authenticateUser(identifier, password) {
            const user = this.getUserByIdentifier(identifier);
            if (!user) {
                return { success: false, message: 'Akun belum terdaftar di database.' };
            }

            // Validasi kata sandi (jika ada sandi tersimpan)
            if (user.pass && password && user.pass !== password) {
                return { success: false, message: 'Kata sandi tidak sesuai.' };
            }

            // Update last login
            user.last_login = new Date().toISOString();
            const users = this.getUsers();
            const idx = users.findIndex(u => u.id === user.id);
            if (idx !== -1) {
                users[idx] = user;
                setStored(STORAGE_KEYS.USERS, users);
            }

            return { success: true, user: user };
        },

        /* -------------------------------------------------------------
           2. MODUL PENJUALAN (SALES)
           ------------------------------------------------------------- */
        getSales() {
            return getStored(STORAGE_KEYS.SALES, []);
        },

        addSale(saleData) {
            const sales = this.getSales();
            const newId = sales.length > 0 ? Math.max(...sales.map(s => s.id || 0)) + 1 : 1;
            const invoiceNo = `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(newId).padStart(4, '0')}`;

            const newSale = {
                id: newId,
                invoice_no: invoiceNo,
                cashier_name: saleData.cashier_name || 'Muh Ikhsan Anggara',
                customer_name: saleData.customer_name || 'Pelanggan',
                table_number: saleData.table_number || 'Meja Walk-in',
                order_type: saleData.order_type || 'dine_in',
                items: saleData.items || [],
                subtotal: saleData.subtotal || 0,
                discount: saleData.discount || 0,
                tax: saleData.tax || 0,
                total_amount: saleData.total_amount || 0,
                payment_method: saleData.payment_method || 'cash',
                amount_paid: saleData.amount_paid || saleData.total_amount || 0,
                change_due: saleData.change_due || 0,
                payment_status: 'paid',
                created_at: new Date().toISOString()
            };

            sales.unshift(newSale);
            setStored(STORAGE_KEYS.SALES, sales);

            // Otomatis kurangi stok produk
            if (Array.isArray(newSale.items)) {
                newSale.items.forEach(item => {
                    if (item.product_id) {
                        this.updateProductStock(item.product_id, -(item.quantity || 1));
                    }
                });
            }

            return newSale;
        },

        /* -------------------------------------------------------------
           3. MODUL PEMBELIAN STOK (PURCHASES / RESTOCK)
           ------------------------------------------------------------- */
        getPurchases() {
            return getStored(STORAGE_KEYS.PURCHASES, []);
        },

        addPurchase(purchaseData) {
            const purchases = this.getPurchases();
            const newId = purchases.length > 0 ? Math.max(...purchases.map(p => p.id || 0)) + 1 : 1;
            const purchaseNo = `PO-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(newId).padStart(4, '0')}`;

            const newPurchase = {
                id: newId,
                purchase_no: purchaseNo,
                supplier_name: purchaseData.supplier_name || 'Supplier Utama',
                purchaser_name: purchaseData.purchaser_name || 'Muh Ikhsan Anggara',
                items: purchaseData.items || [],
                total_amount: purchaseData.total_amount || 0,
                payment_method: purchaseData.payment_method || 'transfer',
                payment_status: purchaseData.payment_status || 'lunas',
                purchase_date: new Date().toISOString(),
                notes: purchaseData.notes || ''
            };

            purchases.unshift(newPurchase);
            setStored(STORAGE_KEYS.PURCHASES, purchases);

            // Tambahkan stok produk masuk jika ada mapping product_id
            if (Array.isArray(newPurchase.items)) {
                newPurchase.items.forEach(item => {
                    if (item.product_id) {
                        this.updateProductStock(item.product_id, (item.quantity || 0));
                    }
                });
            }

            return newPurchase;
        },

        /* -------------------------------------------------------------
           4. MODUL PRODUK & STOK INVENTORI
           ------------------------------------------------------------- */
        getProducts() {
            return getStored(STORAGE_KEYS.PRODUCTS, DEFAULT_DATA.products);
        },

        updateProductStock(productId, changeQty) {
            const products = this.getProducts();
            const prod = products.find(p => p.id === productId);
            if (prod) {
                prod.stock = Math.max(0, (prod.stock || 0) + changeQty);
                setStored(STORAGE_KEYS.PRODUCTS, products);
            }
        },

        /* -------------------------------------------------------------
           5. EKSPOR & BACKUP DATABASE LENGKAP
           ------------------------------------------------------------- */
        exportDatabaseJSON() {
            const backup = {
                database_name: 'sohib_caffe_db',
                owner: 'Muh Ikhsan Anggara',
                export_date: new Date().toISOString(),
                users: this.getUsers(),
                products: this.getProducts(),
                sales: this.getSales(),
                purchases: this.getPurchases()
            };
            return JSON.stringify(backup, null, 2);
        },

        downloadBackupJSON() {
            const jsonString = this.exportDatabaseJSON();
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `backup_sohib_caffe_${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };
})();

// Export globally
if (typeof window !== 'undefined') {
    window.SohibDB = SohibDB;
}
