/**
 * SOHIB CAFFE & RESTO — Database Management Client Layer (db.js) v3.0
 * Menyediakan fungsi CRUD lokal terstruktur untuk:
 * - 1. Akun Pengguna & Staf (Users)
 * - 2. Transaksi Penjualan Kasir (Sales)
 * - 3. Pembelian Bahan Baku / Stok (Purchases)
 * - 4. Inventori & Produk Menu (Products & Stock)
 * - 5. Manajemen Meja & Denah Resto (Tables & Floor Plan)
 * - 6. Antrean Dapur & Barista (Kitchen Display System / KDS)
 * - 7. CRM Member Pelanggan & Poin Sultan (Members)
 * - 8. Mesin Kupon & Promo Voucher (Vouchers)
 * - 9. Manajemen Shift, Modal Kas, Kas Kecil & Z-Report (Shifts)
 * - 10. Export & Backup Data (JSON / CSV)
 * 
 * Owner: Muh Ikhsan Anggara
 */

const SohibDB = (function () {
    const STORAGE_KEYS = {
        USERS: 'sohib_db_users',
        PRODUCTS: 'sohib_db_products',
        SALES: 'sohib_db_sales',
        PURCHASES: 'sohib_db_purchases',
        TABLES: 'sohib_db_tables',
        KDS_ORDERS: 'sohib_db_kds_orders',
        MEMBERS: 'sohib_db_members',
        VOUCHERS: 'sohib_db_vouchers',
        SHIFTS: 'sohib_db_shifts_active',
        SHIFT_HISTORY: 'sohib_db_shifts_history',
        CONFIG: 'sohib_db_config'
    };

    // Default Tables Seed Data
    const DEFAULT_TABLES = [
        // Area Majlis Lesehan Khas Arab
        { id: 'M-01', name: 'Majlis 1', zone: 'majlis', capacity: 6, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'M-02', name: 'Majlis 2', zone: 'majlis', capacity: 6, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'M-03', name: 'Majlis 3 (Family)', zone: 'majlis', capacity: 8, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'M-04', name: 'Majlis 4 (Sultan)', zone: 'majlis', capacity: 10, status: 'available', orderId: null, customer: '', amount: 0, time: null },

        // Indoor Dining Hall Resto
        { id: 'T-01', name: 'Meja T01', zone: 'indoor', capacity: 2, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'T-02', name: 'Meja T02', zone: 'indoor', capacity: 2, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'T-03', name: 'Meja T03', zone: 'indoor', capacity: 4, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'T-04', name: 'Meja T04', zone: 'indoor', capacity: 4, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'T-05', name: 'Meja T05', zone: 'indoor', capacity: 4, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'T-06', name: 'Meja T06', zone: 'indoor', capacity: 6, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'T-07', name: 'Meja T07', zone: 'indoor', capacity: 6, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'T-08', name: 'Meja T08', zone: 'indoor', capacity: 8, status: 'available', orderId: null, customer: '', amount: 0, time: null },

        // Outdoor Garden Terrace
        { id: 'O-01', name: 'Outdoor O1', zone: 'outdoor', capacity: 4, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'O-02', name: 'Outdoor O2', zone: 'outdoor', capacity: 4, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'O-03', name: 'Outdoor O3', zone: 'outdoor', capacity: 4, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'O-04', name: 'Outdoor O4 (Kanopi)', zone: 'outdoor', capacity: 6, status: 'available', orderId: null, customer: '', amount: 0, time: null },

        // VIP Room
        { id: 'VIP-01', name: 'VIP Bagdad Room', zone: 'vip', capacity: 12, status: 'available', orderId: null, customer: '', amount: 0, time: null },
        { id: 'VIP-02', name: 'VIP Madinah Room', zone: 'vip', capacity: 10, status: 'available', orderId: null, customer: '', amount: 0, time: null }
    ];

    // Default Seed Members
    const DEFAULT_MEMBERS = [
        { id: 'MB-101', name: 'Habib Ahmad Al-Kaff', phone: '081234567890', tier: 'Sultan', points: 240, totalSpend: 2400000, joinDate: '2026-01-15' },
        { id: 'MB-102', name: 'Faisal Basri', phone: '085298765432', tier: 'Gold', points: 85, totalSpend: 850000, joinDate: '2026-03-10' },
        { id: 'MB-103', name: 'Siti Sarah', phone: '089533221100', tier: 'Silver', points: 30, totalSpend: 300000, joinDate: '2026-06-01' }
    ];

    // Default Seed Promo Vouchers
    const DEFAULT_VOUCHERS = [
        { code: 'SULTANHEMAT10', title: 'Diskon 10% Spesial Sultan', type: 'percent', value: 10, minSpend: 100000, maxDiscount: 35000, active: true },
        { code: 'KOPIARAB', title: 'Potongan Rp 10.000 Pecinta Gahwa', type: 'fixed', value: 10000, minSpend: 50000, maxDiscount: 10000, active: true },
        { code: 'GAHWA20', title: 'Diskon 20% Menu Kopi & Minuman', type: 'percent', value: 20, minSpend: 40000, maxDiscount: 25000, active: true },
        { code: 'RAMADHAN', title: 'Diskon Berkah Rp 25.000 Nampan', type: 'fixed', value: 25000, minSpend: 180000, maxDiscount: 25000, active: true }
    ];

    // Default Active Shift
    const DEFAULT_SHIFT = {
        shiftNumber: 1,
        cashierName: 'Muh Ikhsan Anggara (Owner)',
        startTime: new Date().toISOString(),
        startingCash: 250000, // Modal awal laci kasir Rp 250.000
        pettyCashLogs: [
            { id: 'PC-1', type: 'out', amount: 35000, reason: 'Beli Es Batu Kristal 2 Karung', time: new Date(Date.now() - 3600000).toISOString() }
        ],
        status: 'open'
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
        if (!localStorage.getItem(STORAGE_KEYS.TABLES)) {
            setStored(STORAGE_KEYS.TABLES, DEFAULT_TABLES);
        }
        if (!localStorage.getItem(STORAGE_KEYS.MEMBERS)) {
            setStored(STORAGE_KEYS.MEMBERS, DEFAULT_MEMBERS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.VOUCHERS)) {
            setStored(STORAGE_KEYS.VOUCHERS, DEFAULT_VOUCHERS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.SHIFTS)) {
            setStored(STORAGE_KEYS.SHIFTS, DEFAULT_SHIFT);
        }
        if (!localStorage.getItem(STORAGE_KEYS.KDS_ORDERS)) {
            setStored(STORAGE_KEYS.KDS_ORDERS, []);
        }
        console.log('✅ SohibDB v3.0 Initialized Successfully with KDS, Tables, CRM & Shifts');
    }

    // Auto-run init
    init();

    return {
        STORAGE_KEYS,

        /* -------------------------------------------------------------
           1. MODUL USERS / AKUN PENGGUNA
           ------------------------------------------------------------- */
        getUsers() {
            return getStored(STORAGE_KEYS.USERS, []);
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
                voucher_code: saleData.voucher_code || null,
                member_phone: saleData.member_phone || null,
                payment_status: 'paid',
                created_at: new Date().toISOString()
            };

            sales.unshift(newSale);
            setStored(STORAGE_KEYS.SALES, sales);
            return newSale;
        },

        /* -------------------------------------------------------------
           3. MODUL MEJA & DENAH RESTO (FLOOR PLAN)
           ------------------------------------------------------------- */
        getTables() {
            return getStored(STORAGE_KEYS.TABLES, DEFAULT_TABLES);
        },

        getTableById(tableId) {
            const tables = this.getTables();
            return tables.find(t => t.id === tableId || t.name.toLowerCase() === (tableId || '').toLowerCase());
        },

        updateTableStatus(tableId, status, details = {}) {
            const tables = this.getTables();
            const idx = tables.findIndex(t => t.id === tableId || t.name.toLowerCase() === (tableId || '').toLowerCase());
            if (idx !== -1) {
                tables[idx].status = status; // 'available', 'occupied', 'billing', 'reserved'
                if (status === 'available') {
                    tables[idx].orderId = null;
                    tables[idx].customer = '';
                    tables[idx].amount = 0;
                    tables[idx].time = null;
                    tables[idx].activeItems = [];
                } else {
                    if (details.orderId !== undefined) tables[idx].orderId = details.orderId;
                    if (details.customer !== undefined) tables[idx].customer = details.customer;
                    if (details.amount !== undefined) tables[idx].amount = details.amount;
                    if (details.activeItems !== undefined) tables[idx].activeItems = details.activeItems;
                    tables[idx].time = details.time || tables[idx].time || new Date().toISOString();
                }
                setStored(STORAGE_KEYS.TABLES, tables);
                return tables[idx];
            }
            return null;
        },

        /* -------------------------------------------------------------
           4. MODUL KITCHEN DISPLAY SYSTEM (KDS) & ANTREAN DAPUR
           ------------------------------------------------------------- */
        getKdsOrders() {
            return getStored(STORAGE_KEYS.KDS_ORDERS, []);
        },

        addKdsOrder(order) {
            const orders = this.getKdsOrders();
            const newKdsItem = {
                id: 'KDS-' + Date.now().toString().slice(-6),
                orderId: order.orderId,
                customerName: order.customerName || 'Pelanggan',
                tableNumber: order.tableNumber || '-',
                orderType: order.orderType || 'dine-in',
                items: order.items || [],
                note: order.note || '',
                status: order.status || 'queue', // 'queue' (antre), 'cooking' (dimasak), 'ready' (siap saji), 'served' (selesai)
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isSelfOrder: !!order.isSelfOrder
            };

            orders.unshift(newKdsItem);
            setStored(STORAGE_KEYS.KDS_ORDERS, orders);
            return newKdsItem;
        },

        updateKdsStatus(kdsId, newStatus) {
            const orders = this.getKdsOrders();
            const idx = orders.findIndex(o => o.id === kdsId || o.orderId === kdsId);
            if (idx !== -1) {
                orders[idx].status = newStatus;
                orders[idx].updatedAt = new Date().toISOString();
                setStored(STORAGE_KEYS.KDS_ORDERS, orders);
                return orders[idx];
            }
            return null;
        },

        clearCompletedKdsOrders() {
            const orders = this.getKdsOrders();
            const activeOnly = orders.filter(o => o.status !== 'served');
            setStored(STORAGE_KEYS.KDS_ORDERS, activeOnly);
            return activeOnly;
        },

        /* -------------------------------------------------------------
           5. MODUL CRM MEMBER & POIN SULTAN
           ------------------------------------------------------------- */
        getMembers() {
            return getStored(STORAGE_KEYS.MEMBERS, DEFAULT_MEMBERS);
        },

        getMemberByPhone(phone) {
            if (!phone) return null;
            const cleanPhone = phone.replace(/[^0-9]/g, '');
            const members = this.getMembers();
            return members.find(m => m.phone.replace(/[^0-9]/g, '') === cleanPhone);
        },

        registerMember(name, phone) {
            const existing = this.getMemberByPhone(phone);
            if (existing) return { success: false, message: 'Nomor WhatsApp sudah terdaftar sebagai Member!', member: existing };

            const members = this.getMembers();
            const newMember = {
                id: 'MB-' + (members.length + 101),
                name: name.trim(),
                phone: phone.trim(),
                tier: 'Silver',
                points: 10, // Bonus daftar 10 poin
                totalSpend: 0,
                joinDate: new Date().toISOString().slice(0, 10)
            };

            members.unshift(newMember);
            setStored(STORAGE_KEYS.MEMBERS, members);
            return { success: true, member: newMember };
        },

        addMemberPointsAndSpend(phone, grandTotal) {
            const members = this.getMembers();
            const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
            const idx = members.findIndex(m => m.phone.replace(/[^0-9]/g, '') === cleanPhone);
            if (idx !== -1) {
                const earnedPoints = Math.floor(grandTotal / 10000); // 1 poin per Rp 10.000
                members[idx].points = (members[idx].points || 0) + earnedPoints;
                members[idx].totalSpend = (members[idx].totalSpend || 0) + grandTotal;

                // Auto upgrade tier
                if (members[idx].totalSpend >= 2000000) {
                    members[idx].tier = 'Sultan';
                } else if (members[idx].totalSpend >= 750000) {
                    members[idx].tier = 'Gold';
                }

                setStored(STORAGE_KEYS.MEMBERS, members);
                return members[idx];
            }
            return null;
        },

        redeemMemberPoints(phone, pointsToRedeem) {
            const members = this.getMembers();
            const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
            const idx = members.findIndex(m => m.phone.replace(/[^0-9]/g, '') === cleanPhone);
            if (idx !== -1) {
                if (members[idx].points >= pointsToRedeem) {
                    members[idx].points -= pointsToRedeem;
                    setStored(STORAGE_KEYS.MEMBERS, members);
                    return { success: true, remainingPoints: members[idx].points, discountValue: pointsToRedeem * 1000 };
                }
                return { success: false, message: 'Poin tidak mencukupi!' };
            }
            return { success: false, message: 'Member tidak ditemukan!' };
        },

        /* -------------------------------------------------------------
           6. MODUL PROMO VOUCHER
           ------------------------------------------------------------- */
        getVouchers() {
            return getStored(STORAGE_KEYS.VOUCHERS, DEFAULT_VOUCHERS);
        },

        validateVoucher(code, subtotal) {
            if (!code) return { valid: false, message: 'Kode voucher kosong.' };
            const cleanCode = code.trim().toUpperCase();
            const vouchers = this.getVouchers();
            const v = vouchers.find(item => item.code.toUpperCase() === cleanCode && item.active);

            if (!v) {
                return { valid: false, message: 'Kode kupon promo tidak valid atau sudah kadaluarsa.' };
            }

            if (subtotal < v.minSpend) {
                return { valid: false, message: `Minimal belanja untuk voucher ini adalah Rp ${v.minSpend.toLocaleString('id-ID')}` };
            }

            let discountAmount = 0;
            if (v.type === 'percent') {
                discountAmount = Math.round(subtotal * (v.value / 100));
                if (v.maxDiscount && discountAmount > v.maxDiscount) {
                    discountAmount = v.maxDiscount;
                }
            } else {
                discountAmount = v.value;
            }

            return {
                valid: true,
                voucher: v,
                discountAmount: discountAmount,
                message: `Voucher ${v.title} berhasil diterapkan! Hemat Rp ${discountAmount.toLocaleString('id-ID')}`
            };
        },

        /* -------------------------------------------------------------
           7. MODUL SHIFT KASIR & KAS KECIL (Z-REPORT)
           ------------------------------------------------------------- */
        getActiveShift() {
            return getStored(STORAGE_KEYS.SHIFTS, DEFAULT_SHIFT);
        },

        updateStartingCash(amount) {
            const shift = this.getActiveShift();
            shift.startingCash = parseFloat(amount) || 0;
            setStored(STORAGE_KEYS.SHIFTS, shift);
            return shift;
        },

        addPettyCash(type, amount, reason) {
            const shift = this.getActiveShift();
            if (!shift.pettyCashLogs) shift.pettyCashLogs = [];
            const newLog = {
                id: 'PC-' + Date.now().toString().slice(-4),
                type: type, // 'in' (kas masuk) atau 'out' (kas keluar)
                amount: parseFloat(amount) || 0,
                reason: reason.trim(),
                time: new Date().toISOString()
            };
            shift.pettyCashLogs.push(newLog);
            setStored(STORAGE_KEYS.SHIFTS, shift);
            return newLog;
        },

        closeShiftAndGenerateZReport(actualCashInDrawer, notes = '') {
            const shift = this.getActiveShift();
            const sales = this.getSales();
            const shiftStartTime = new Date(shift.startTime).getTime();

            // Filter transaksi yang terjadi selama shift aktif
            const shiftSales = sales.filter(s => new Date(s.created_at || s.dateTime).getTime() >= shiftStartTime);

            let totalCashSales = 0;
            let totalQrisSales = 0;
            let totalCardSales = 0;
            let totalTransferSales = 0;
            let totalDiscounts = 0;
            let totalGrandSales = 0;

            shiftSales.forEach(s => {
                const total = s.total_amount || s.grandTotal || 0;
                const method = (s.payment_method || s.payMethod || '').toLowerCase();
                totalGrandSales += total;
                totalDiscounts += (s.discount || 0);

                if (method.includes('tunai') || method.includes('cash')) {
                    totalCashSales += total;
                } else if (method.includes('qris')) {
                    totalQrisSales += total;
                } else if (method.includes('kartu') || method.includes('card') || method.includes('edc')) {
                    totalCardSales += total;
                } else {
                    totalTransferSales += total;
                }
            });

            // Hitung Kas Kecil
            let totalPettyCashIn = 0;
            let totalPettyCashOut = 0;
            (shift.pettyCashLogs || []).forEach(log => {
                if (log.type === 'in') totalPettyCashIn += log.amount;
                if (log.type === 'out') totalPettyCashOut += log.amount;
            });

            const expectedCash = (shift.startingCash || 0) + totalCashSales + totalPettyCashIn - totalPettyCashOut;
            const diff = actualCashInDrawer - expectedCash;

            const zReport = {
                reportId: 'ZR-' + Date.now().toString().slice(-6),
                shiftNumber: shift.shiftNumber || 1,
                cashierName: shift.cashierName || 'Kasir Resto',
                startTime: shift.startTime,
                endTime: new Date().toISOString(),
                startingCash: shift.startingCash || 0,
                totalCashSales: totalCashSales,
                totalQrisSales: totalQrisSales,
                totalCardSales: totalCardSales,
                totalTransferSales: totalTransferSales,
                totalDiscounts: totalDiscounts,
                totalPettyCashIn: totalPettyCashIn,
                totalPettyCashOut: totalPettyCashOut,
                expectedCash: expectedCash,
                actualCashInDrawer: actualCashInDrawer,
                cashDifference: diff, // > 0: lebih, < 0: kurang, = 0: balance
                totalTransactions: shiftSales.length,
                totalTurnover: totalGrandSales,
                notes: notes,
                pettyCashLogs: shift.pettyCashLogs || []
            };

            // Simpan riwayat shift
            const history = getStored(STORAGE_KEYS.SHIFT_HISTORY, []);
            history.unshift(zReport);
            setStored(STORAGE_KEYS.SHIFT_HISTORY, history);

            // Buka Shift Baru otomatis
            const newShift = {
                shiftNumber: (shift.shiftNumber % 2) + 1,
                cashierName: shift.cashierName,
                startTime: new Date().toISOString(),
                startingCash: actualCashInDrawer, // Modal awal shift baru dari sisa kas fisik
                pettyCashLogs: [],
                status: 'open'
            };
            setStored(STORAGE_KEYS.SHIFTS, newShift);

            return zReport;
        },

        /* -------------------------------------------------------------
           8. EKSPOR & BACKUP DATABASE LENGKAP
           ------------------------------------------------------------- */
        exportDatabaseJSON() {
            const backup = {
                database_name: 'sohib_caffe_db_v3',
                owner: 'Muh Ikhsan Anggara',
                export_date: new Date().toISOString(),
                tables: this.getTables(),
                kds_orders: this.getKdsOrders(),
                members: this.getMembers(),
                vouchers: this.getVouchers(),
                active_shift: this.getActiveShift(),
                shift_history: getStored(STORAGE_KEYS.SHIFT_HISTORY, []),
                sales: this.getSales()
            };
            return JSON.stringify(backup, null, 2);
        }
    };
})();

// Export globally
if (typeof window !== 'undefined') {
    window.SohibDB = SohibDB;
}
