/* ==========================================================================
   SOHIB CAFFE & RESTO (POSify Pro v3.0) — COMPLETE SYSTEM LOGIC
   Features:
   - 1. Middle Eastern & Arabian Resto Menu (42 items)
   - 2. Drink Customization & Modifier Engine
   - 3. Web Audio API Sound Synthesizer Engine (Zero-dependency)
   - 4. Kitchen Display System (KDS) & Bar Station
   - 5. Interactive Floor Plan & Table Management
   - 6. Customer Self-Order QR Mode
   - 7. Cash Drawer, Shift Management & Z-Report
   - 8. Member CRM & Promo Voucher Engine
   - 9. PWA Service Worker & Offline Sync
   - 10. Thermal Receipt & WAF Cyber Security SOC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. DEFAULT ARABIAN RESTO PRODUCTS (42 MENU)
    // ----------------------------------------------------------------------
    const DEFAULT_PRODUCTS = [
        // HIDANGAN UTAMA ARAB (MAKANAN)
        { id: 'ARAB-001', name: 'Nasi Mandhi Kambing Muda Oven', category: 'makanan', price: 68000, stock: 35, barcode: '8992001', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
        { id: 'ARAB-002', name: 'Nasi Kebuli Daging Sapi Spesial', category: 'makanan', price: 52000, stock: 40, barcode: '8992002', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
        { id: 'ARAB-003', name: 'Nasi Biryani Ayam Tandoori', category: 'makanan', price: 45000, stock: 30, barcode: '8992003', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80' },
        { id: 'ARAB-004', name: 'Nasi Kabsah Daging Kambing Hadramaut', category: 'makanan', price: 65000, stock: 25, barcode: '8992004', img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=400&q=80' },
        { id: 'ARAB-005', name: 'Shawarma Daging Kebab Jumbo', category: 'makanan', price: 35000, stock: 45, barcode: '8992005', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80' },
        { id: 'ARAB-006', name: 'Shish Tawook Ayam Rempah Arab', category: 'makanan', price: 42000, stock: 28, barcode: '8992006', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80' },
        { id: 'ARAB-023', name: 'Nasi Mandhi Daging Unta Rempah Zafaran', category: 'makanan', price: 85000, stock: 15, barcode: '8992023', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
        { id: 'ARAB-024', name: 'Kebab Kofta Daging Domba Panggang', category: 'makanan', price: 48000, stock: 30, barcode: '8992024', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80' },
        { id: 'ARAB-025', name: 'Lamb Shank Hadramaut Panggang Kuah Kental', category: 'makanan', price: 95000, stock: 12, barcode: '8992025', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
        { id: 'ARAB-026', name: 'Nasi Bukhari Ayam Panggang Kismis', category: 'makanan', price: 46000, stock: 32, barcode: '8992026', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
        { id: 'ARAB-027', name: 'Falafel Wrap with Tahini & Pickles', category: 'makanan', price: 32000, stock: 40, barcode: '8992027', img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80' },
        { id: 'ARAB-028', name: 'Shakshuka Telur Pedas Tomat & Warm Pita Bread', category: 'makanan', price: 35000, stock: 25, barcode: '8992028', img: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=400&q=80' },

        // KOPI TIMUR TENGAH & GAHWA
        { id: 'ARAB-007', name: 'Kopi Gahwa Arabica Cardamom & Saffron', category: 'kopi', price: 28000, stock: 50, barcode: '8992007', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80' },
        { id: 'ARAB-008', name: 'Karak Chai Spiced Tea Latte', category: 'kopi', price: 22000, stock: 60, barcode: '8992008', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80' },
        { id: 'ARAB-009', name: 'Turkish Coffee Espresso Pasir', category: 'kopi', price: 25000, stock: 35, barcode: '8992009', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80' },
        { id: 'ARAB-029', name: 'Gahwa Hijau Rempah Cardamom Pot (Teko Arab)', category: 'kopi', price: 35000, stock: 40, barcode: '8992029', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80' },
        { id: 'ARAB-030', name: 'Es Kopi Susu Kurma Ajwa Creamy', category: 'kopi', price: 25000, stock: 50, barcode: '8992030', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80' },
        { id: 'ARAB-031', name: 'Arabian Saffron Gold Latte', category: 'kopi', price: 32000, stock: 45, barcode: '8992031', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80' },

        // MINUMAN KHAS ARAB & TEH ADEN
        { id: 'ARAB-010', name: 'Shahi Adani (Teh Susu Rempah Yaman)', category: 'minuman', price: 22000, stock: 55, barcode: '8992010', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80' },
        { id: 'ARAB-011', name: 'Jus Kurma Madu Ajwa Royal', category: 'minuman', price: 26000, stock: 40, barcode: '8992011', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80' },
        { id: 'ARAB-012', name: 'Moroccan Fresh Mint Iced Tea', category: 'minuman', price: 18000, stock: 50, barcode: '8992012', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
        { id: 'ARAB-013', name: 'Limonana (Mint Lemonade Dingin Khas Arab)', category: 'minuman', price: 20000, stock: 45, barcode: '8992013', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
        { id: 'ARAB-032', name: 'Teh Karkadeh Mesir (Hibiscus Iced Tea Segar)', category: 'minuman', price: 19000, stock: 60, barcode: '8992032', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
        { id: 'ARAB-033', name: 'Jus Delima Pomegranate Segar Arab', category: 'minuman', price: 28000, stock: 35, barcode: '8992033', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80' },
        { id: 'ARAB-034', name: 'Sahlab Warm Milk Drink with Cinnamon & Coconut', category: 'minuman', price: 24000, stock: 40, barcode: '8992034', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80' },
        { id: 'ARAB-035', name: 'Es Sirup Rooh Afza Mawar Rempah', category: 'minuman', price: 18000, stock: 50, barcode: '8992035', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },

        // SNACK, ROTI MARYAM & DESSERT
        { id: 'ARAB-014', name: 'Roti Maryam Madu Yaman & Keju Melt', category: 'snack', price: 24000, stock: 35, barcode: '8992014', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
        { id: 'ARAB-015', name: 'Hummus & Fresh Warm Pita Bread', category: 'snack', price: 32000, stock: 25, barcode: '8992015', img: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=400&q=80' },
        { id: 'ARAB-016', name: 'Samosa Daging Kambing Rempah (4 pcs)', category: 'snack', price: 28000, stock: 30, barcode: '8992016', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
        { id: 'ARAB-017', name: 'Baklava Pistachio Turkish Gold (3 pcs)', category: 'snack', price: 36000, stock: 20, barcode: '8992017', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400&q=80' },
        { id: 'ARAB-018', name: 'Umm Ali (Puding Roti Susu Hangat Arab)', category: 'snack', price: 30000, stock: 20, barcode: '8992018', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
        { id: 'ARAB-036', name: 'Kunafa Keju Molor Turkish Pistachio (Warm)', category: 'snack', price: 45000, stock: 25, barcode: '8992036', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400&q=80' },
        { id: 'ARAB-037', name: 'Mutabbaq Manis / Martabak Arab Pisang Keju', category: 'snack', price: 26000, stock: 30, barcode: '8992037', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
        { id: 'ARAB-038', name: 'Kibbeh Daging Cincang & Pine Nuts (3 pcs)', category: 'snack', price: 32000, stock: 25, barcode: '8992038', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' },
        { id: 'ARAB-039', name: 'Baba Ganoush Terong Panggang & Olive Oil', category: 'snack', price: 29000, stock: 20, barcode: '8992039', img: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=400&q=80' },
        { id: 'ARAB-040', name: 'Ma\'amoul Kurma & Walnut Cookies (4 pcs)', category: 'snack', price: 22000, stock: 40, barcode: '8992040', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },

        // PAKET SULTAN NAMPAN
        { id: 'ARAB-019', name: 'Paket Sultan Nampan Mandhi (4-5 Orang)', category: 'paket', price: 245000, stock: 15, barcode: '8992019', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
        { id: 'ARAB-020', name: 'Paket Kencan Berdua (Kebuli + Biryani + 2 Shahi Adani)', category: 'paket', price: 110000, stock: 20, barcode: '8992020', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
        { id: 'ARAB-021', name: 'Paket Ngemil Arab (Shawarma + Samosa + Limonana)', category: 'paket', price: 68000, stock: 25, barcode: '8992021', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80' },
        { id: 'ARAB-041', name: 'Paket Sultan Kambing Guling Mini (3-4 Orang)', category: 'paket', price: 280000, stock: 12, barcode: '8992041', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
        { id: 'ARAB-042', name: 'Paket Sarapan Arab (Shakshuka + Falafel + 2 Shahi Adani)', category: 'paket', price: 68000, stock: 20, barcode: '8992042', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' }
    ];

    // Load / Persist Products State
    let loadedProducts = DEFAULT_PRODUCTS;
    try {
        const stored = localStorage.getItem('posify_products');
        if (stored) loadedProducts = JSON.parse(stored);
        else localStorage.setItem('posify_products', JSON.stringify(DEFAULT_PRODUCTS));
    } catch (e) {
        loadedProducts = DEFAULT_PRODUCTS;
    }

    // Main App State
    let state = {
        products: loadedProducts,
        cart: JSON.parse(localStorage.getItem('posify_cart')) || [],
        transactions: JSON.parse(localStorage.getItem('posify_transactions')) || [],
        holdBills: JSON.parse(localStorage.getItem('posify_hold_bills')) || [],
        currentOrderId: generateOrderId(),
        orderType: 'dine-in',
        customerName: '',
        tableNumber: '',
        selectedCategory: 'all',
        searchQuery: '',
        theme: localStorage.getItem('posify_theme') || 'dark',
        activePayTab: 'tab-cash',
        appliedVoucher: null,
        activeMember: null,
        soundEnabled: localStorage.getItem('posify_sound') !== 'false',
        activeKdsStation: 'all',
        activeZoneFilter: 'all',
        isCustomerMode: false
    };

    // ----------------------------------------------------------------------
    // 2. WEB AUDIO API SOUND SYNTHESIZER ENGINE (ZERO-DEPENDENCY)
    // ----------------------------------------------------------------------
    const SoundEngine = (function () {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        let ctx = null;

        function getCtx() {
            if (!ctx) ctx = new AudioContextClass();
            if (ctx.state === 'suspended') ctx.resume();
            return ctx;
        }

        return {
            beep() {
                if (!state.soundEnabled) return;
                try {
                    const c = getCtx();
                    const osc = c.createOscillator();
                    const gain = c.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(880, c.currentTime);
                    gain.gain.setValueAtTime(0.08, c.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
                    osc.connect(gain);
                    gain.connect(c.destination);
                    osc.start();
                    osc.stop(c.currentTime + 0.08);
                } catch (e) {}
            },

            ding() {
                if (!state.soundEnabled) return;
                try {
                    const c = getCtx();
                    const now = c.currentTime;
                    const osc = c.createOscillator();
                    const gain = c.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(587.33, now);
                    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
                    gain.gain.setValueAtTime(0.12, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                    osc.connect(gain);
                    gain.connect(c.destination);
                    osc.start();
                    osc.stop(now + 0.25);
                } catch (e) {}
            },

            kitchenAlert() {
                if (!state.soundEnabled) return;
                try {
                    const c = getCtx();
                    const now = c.currentTime;
                    [440, 659.25, 880].forEach((freq, i) => {
                        const osc = c.createOscillator();
                        const gain = c.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, now + i * 0.1);
                        gain.gain.setValueAtTime(0.15, now + i * 0.1);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
                        osc.connect(gain);
                        gain.connect(c.destination);
                        osc.start(now + i * 0.1);
                        osc.stop(now + i * 0.1 + 0.3);
                    });
                } catch (e) {}
            },

            success() {
                if (!state.soundEnabled) return;
                try {
                    const c = getCtx();
                    const now = c.currentTime;
                    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                        const osc = c.createOscillator();
                        const gain = c.createGain();
                        osc.type = 'triangle';
                        osc.frequency.setValueAtTime(freq, now + i * 0.08);
                        gain.gain.setValueAtTime(0.15, now + i * 0.08);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
                        osc.connect(gain);
                        gain.connect(c.destination);
                        osc.start(now + i * 0.08);
                        osc.stop(now + i * 0.08 + 0.3);
                    });
                } catch (e) {}
            },

            buzz() {
                if (!state.soundEnabled) return;
                try {
                    const c = getCtx();
                    const now = c.currentTime;
                    const osc = c.createOscillator();
                    const gain = c.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(150, now);
                    gain.gain.setValueAtTime(0.15, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                    osc.connect(gain);
                    gain.connect(c.destination);
                    osc.start();
                    osc.stop(now + 0.2);
                } catch (e) {}
            }
        };
    })();

    // ----------------------------------------------------------------------
    // 3. UTILITIES & HELPER FUNCTIONS
    // ----------------------------------------------------------------------
    function formatRupiah(num) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(num || 0);
    }

    function generateOrderId() {
        return '#ORD-' + Math.floor(1000 + Math.random() * 9000);
    }

    function showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'pos-toast';
        const icon = type === 'success' ? 'ri-checkbox-circle-fill' : type === 'warning' ? 'ri-error-warning-fill' : 'ri-information-fill';
        const color = type === 'success' ? 'var(--primary-emerald)' : type === 'warning' ? 'var(--primary-amber)' : 'var(--primary-rose)';

        toast.innerHTML = `
            <i class="${icon}" style="color: ${color}; font-size: 1.25rem;"></i>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function updateLiveClock() {
        const now = new Date();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} WIB`;

        const dateEl = document.getElementById('currentDateDisplay');
        const timeEl = document.getElementById('currentTimeDisplay');
        if (dateEl) dateEl.textContent = dateStr;
        if (timeEl) timeEl.textContent = timeStr;
    }
    setInterval(updateLiveClock, 1000);
    updateLiveClock();

    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
        }
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    }

    function saveState() {
        localStorage.setItem('posify_products', JSON.stringify(state.products));
        localStorage.setItem('posify_cart', JSON.stringify(state.cart));
        localStorage.setItem('posify_transactions', JSON.stringify(state.transactions));
        localStorage.setItem('posify_hold_bills', JSON.stringify(state.holdBills));
    }

    // ----------------------------------------------------------------------
    // 4. PRODUCT CATALOG RENDERING & SEARCH
    // ----------------------------------------------------------------------
    function renderProductCatalog() {
        const grid = document.getElementById('productsGrid') || document.getElementById('productGridContainer');
        if (!grid) return;

        let filtered = state.products;

        // Filter Category
        if (state.selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === state.selectedCategory);
        }

        // Filter Search Query
        if (state.searchQuery.trim() !== '') {
            const q = state.searchQuery.toLowerCase().trim();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(q) ||
                (p.barcode && p.barcode.includes(q)) ||
                p.category.toLowerCase().includes(q)
            );
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-catalog-state" style="grid-column: 1 / -1; padding: 3rem 1rem; text-align: center; color: var(--text-muted);">
                    <i class="ri-search-eye-line" style="font-size: 3rem; margin-bottom: 0.5rem; display: block;"></i>
                    <h3>Menu Tidak Ditemukan</h3>
                    <p>Coba kata kunci pencarian lain atau pilih kategori yang berbeda.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(product => {
            const stockClass = product.stock <= 0 ? 'stock-out' : product.stock <= 10 ? 'stock-low' : 'stock-in';
            const stockText = product.stock <= 0 ? 'Habis' : `Stok: ${product.stock}`;

            return `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-img-wrap">
                        <img src="${product.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'}" alt="${product.name}" class="product-img" loading="lazy">
                        <span class="product-badge-category">${product.category.toUpperCase()}</span>
                        <span class="product-badge-stock ${stockClass}">${stockText}</span>
                    </div>
                    <div class="product-info">
                        <h4 class="product-name">${product.name}</h4>
                        <div class="product-meta-row">
                            <span class="product-price">${formatRupiah(product.price)}</span>
                            <button class="btn-add-product" title="Tambah Ke Pesanan" ${product.stock <= 0 ? 'disabled' : ''}>
                                <i class="ri-add-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach Card Click Event
        grid.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const prodId = card.getAttribute('data-id');
                const product = state.products.find(p => p.id === prodId);
                if (product) {
                    if (product.stock <= 0) {
                        SoundEngine.buzz();
                        showToast(`Stok ${product.name} telah habis!`, 'warning');
                        return;
                    }

                    // If product is drink or coffee, open options modal
                    if (product.category === 'minuman' || product.category === 'kopi') {
                        openDrinkOptionsModal(product);
                    } else {
                        addToCart(product);
                    }
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // 5. DRINK CUSTOMIZATION MODAL LOGIC
    // ----------------------------------------------------------------------
    let currentCustomizingDrink = null;

    function openDrinkOptionsModal(product) {
        currentCustomizingDrink = product;
        const imgEl = document.getElementById('optDrinkImg');
        const nameEl = document.getElementById('optDrinkName');
        const priceEl = document.getElementById('optDrinkBasePrice');
        const noteInput = document.getElementById('optDrinkSpecialNote');

        if (imgEl) imgEl.src = product.img || '';
        if (nameEl) nameEl.textContent = product.name;
        if (priceEl) priceEl.textContent = formatRupiah(product.price);
        if (noteInput) noteInput.value = '';

        // Reset pills
        document.querySelectorAll('#modalDrinkOptions .opt-pill').forEach(pill => {
            if (pill.getAttribute('data-val').includes('Dingin') || pill.getAttribute('data-val') === 'Regular' || pill.getAttribute('data-val').includes('Normal')) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });

        document.querySelectorAll('#modalDrinkOptions .addon-checkbox').forEach(cb => cb.checked = false);

        updateDrinkFinalPricePreview();
        openModal('modalDrinkOptions');
    }

    function calculateCurrentDrinkModifiers() {
        if (!currentCustomizingDrink) return { finalPrice: 0, optionsText: '' };
        let extraPrice = 0;
        let selectedOptions = [];

        const activeTemp = document.querySelector('#tempOptionGroup .opt-pill.active');
        if (activeTemp) selectedOptions.push(activeTemp.getAttribute('data-val'));

        const activeSize = document.querySelector('#sizeOptionGroup .opt-pill.active');
        if (activeSize) {
            const val = activeSize.getAttribute('data-val');
            const price = parseInt(activeSize.getAttribute('data-price')) || 0;
            extraPrice += price;
            if (val !== 'Regular') selectedOptions.push(val);
        }

        const activeSugar = document.querySelector('#sugarOptionGroup .opt-pill.active');
        if (activeSugar) {
            const val = activeSugar.getAttribute('data-val');
            const price = parseInt(activeSugar.getAttribute('data-price')) || 0;
            extraPrice += price;
            selectedOptions.push(val);
        }

        const isHot = activeTemp && activeTemp.getAttribute('data-val').includes('Hangat');
        if (!isHot) {
            const activeIce = document.querySelector('#iceOptionGroup .opt-pill.active');
            if (activeIce) {
                const val = activeIce.getAttribute('data-val');
                if (val !== 'Normal Ice') selectedOptions.push(val);
            }
        }

        document.querySelectorAll('#toppingOptionGroup .addon-checkbox:checked').forEach(cb => {
            const name = cb.getAttribute('data-name');
            const price = parseInt(cb.getAttribute('data-price')) || 0;
            extraPrice += price;
            selectedOptions.push(`+${name} (${formatRupiah(price)})`);
        });

        const finalPrice = currentCustomizingDrink.price + extraPrice;
        return { finalPrice, optionsText: selectedOptions.join(' • ') };
    }

    function updateDrinkFinalPricePreview() {
        const preview = calculateCurrentDrinkModifiers();
        const finalPriceEl = document.getElementById('optDrinkFinalPrice');
        if (finalPriceEl) finalPriceEl.textContent = formatRupiah(preview.finalPrice);
    }

    // Modal Option Click Handlers
    document.querySelectorAll('#modalDrinkOptions .opt-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            const parent = pill.parentElement;
            parent.querySelectorAll('.opt-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            if (pill.getAttribute('data-group') === 'temp') {
                const isHot = pill.getAttribute('data-val').includes('Hangat');
                const iceSec = document.getElementById('iceModifierSection');
                if (iceSec) iceSec.style.display = isHot ? 'none' : 'block';
            }

            updateDrinkFinalPricePreview();
        });
    });

    document.querySelectorAll('#modalDrinkOptions .addon-checkbox').forEach(cb => {
        cb.addEventListener('change', updateDrinkFinalPricePreview);
    });

    document.getElementById('btnConfirmDrinkOptions')?.addEventListener('click', () => {
        if (!currentCustomizingDrink) return;
        const mod = calculateCurrentDrinkModifiers();
        const note = document.getElementById('optDrinkSpecialNote')?.value.trim() || '';

        addToCart(currentCustomizingDrink, 1, mod.finalPrice, mod.optionsText, note);
        closeModal('modalDrinkOptions');
    });

    // ----------------------------------------------------------------------
    // 6. CART MANAGEMENT & BILLING CALCULATIONS
    // ----------------------------------------------------------------------
    function addToCart(product, qty = 1, customPrice = null, optionsText = '', note = '') {
        const itemPrice = customPrice !== null ? customPrice : product.price;
        const cartItemKey = `${product.id}_${optionsText}_${note}`;

        const existing = state.cart.find(it => it.key === cartItemKey);
        if (existing) {
            if (existing.qty + qty > product.stock) {
                SoundEngine.buzz();
                showToast(`Stok tidak mencukupi! Sisa stok: ${product.stock}`, 'warning');
                return;
            }
            existing.qty += qty;
        } else {
            if (qty > product.stock) {
                SoundEngine.buzz();
                showToast(`Stok tidak mencukupi! Sisa stok: ${product.stock}`, 'warning');
                return;
            }
            state.cart.push({
                key: cartItemKey,
                id: product.id,
                name: product.name,
                category: product.category,
                price: itemPrice,
                qty: qty,
                optionsText: optionsText,
                note: note
            });
        }

        SoundEngine.ding();
        saveState();
        renderCart();
        showToast(`${product.name} ditambahkan ke pesanan!`, 'success');
    }

    function updateCartQty(key, delta) {
        const item = state.cart.find(it => it.key === key || it.id === key);
        if (!item) return;

        const product = state.products.find(p => p.id === item.id);
        const newQty = item.qty + delta;

        if (newQty <= 0) {
            removeFromCart(key);
            return;
        }

        if (product && newQty > product.stock) {
            SoundEngine.buzz();
            showToast(`Stok tidak mencukupi! Sisa: ${product.stock}`, 'warning');
            return;
        }

        item.qty = newQty;
        saveState();
        renderCart();
    }

    function removeFromCart(key) {
        state.cart = state.cart.filter(it => it.key !== key && it.id !== key);
        saveState();
        renderCart();
    }

    function renderCart() {
        const listEl = document.getElementById('cartItemsList');
        const countEl = document.getElementById('cartTotalItemsCount');
        const subtotalEl = document.getElementById('calcSubtotal');
        const discountRow = document.getElementById('discountRow');
        const discountRowLabel = document.getElementById('discountRowLabel');
        const calcDiscountEl = document.getElementById('calcDiscount');
        const taxEl = document.getElementById('calcTax');
        const grandTotalEl = document.getElementById('calcGrandTotal');
        const checkoutBtn = document.getElementById('btnProceedCheckout');
        const holdBillCountEl = document.getElementById('holdBillCount');
        const mMenuHoldCount = document.getElementById('mMenuHoldCount');
        const floatingBar = document.getElementById('mobileFloatingCartBar');
        const floatingBadge = document.getElementById('floatingCartBadge');
        const floatingTotal = document.getElementById('floatingCartTotal');
        const floatingCount = document.getElementById('floatingCartCount');
        const mobileNavBadge = document.getElementById('mobileNavCartBadge');

        if (holdBillCountEl) holdBillCountEl.textContent = state.holdBills.length;
        if (mMenuHoldCount) mMenuHoldCount.textContent = state.holdBills.length;

        if (state.cart.length === 0) {
            listEl.innerHTML = `
                <div class="cart-empty-view">
                    <i class="ri-shopping-cart-2-line"></i>
                    <h3>Keranjang Masih Kosong</h3>
                    <p>Klik menu di katalog untuk menambahkan hidangan Arab & minuman.</p>
                </div>
            `;
            if (countEl) countEl.textContent = '0';
            if (subtotalEl) subtotalEl.textContent = 'Rp 0';
            if (discountRow) discountRow.style.display = 'none';
            if (taxEl) taxEl.textContent = 'Rp 0';
            if (grandTotalEl) grandTotalEl.textContent = 'Rp 0';
            if (checkoutBtn) checkoutBtn.disabled = true;
            if (floatingBar) floatingBar.classList.remove('active');
            if (floatingBadge) floatingBadge.textContent = '0';
            if (mobileNavBadge) mobileNavBadge.textContent = '0';
            return;
        }

        const totalItemsCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        // Voucher Calculation
        let discountAmount = 0;
        if (state.appliedVoucher) {
            const vRes = SohibDB.validateVoucher(state.appliedVoucher.code, subtotal);
            if (vRes.valid) {
                discountAmount = vRes.discountAmount;
                if (discountRow) {
                    discountRow.style.display = 'flex';
                    if (discountRowLabel) discountRowLabel.textContent = `Diskon (${state.appliedVoucher.title})`;
                    if (calcDiscountEl) calcDiscountEl.textContent = `- ${formatRupiah(discountAmount)}`;
                }
            } else {
                state.appliedVoucher = null;
                if (discountRow) discountRow.style.display = 'none';
            }
        } else {
            if (discountRow) discountRow.style.display = 'none';
        }

        const taxableAmount = Math.max(0, subtotal - discountAmount);
        const tax = Math.round(taxableAmount * 0.10); // 10% PB1
        const grandTotal = taxableAmount + tax;

        if (countEl) countEl.textContent = totalItemsCount;
        if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
        if (taxEl) taxEl.textContent = formatRupiah(tax);
        if (grandTotalEl) grandTotalEl.textContent = formatRupiah(grandTotal);
        if (checkoutBtn) checkoutBtn.disabled = false;

        if (floatingBar) floatingBar.classList.add('active');
        if (floatingBadge) floatingBadge.textContent = totalItemsCount;
        if (floatingTotal) floatingTotal.textContent = formatRupiah(grandTotal);
        if (floatingCount) floatingCount.textContent = `${totalItemsCount} item dipilih`;
        if (mobileNavBadge) mobileNavBadge.textContent = totalItemsCount;

        listEl.innerHTML = state.cart.map(item => `
            <div class="cart-item" data-id="${item.key || item.id}">
                <div class="cart-item-header">
                    <div>
                        <h5 class="cart-item-title">${item.name}</h5>
                        <span class="cart-item-unit-price">${formatRupiah(item.price)} / pcs</span>
                    </div>
                    <button class="btn-remove-item" data-remove="${item.key || item.id}" title="Hapus dari Pesanan">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
                ${item.optionsText ? `<div class="cart-item-options-badge"><i class="ri-cup-fill"></i> ${item.optionsText}</div>` : ''}
                <div class="cart-item-controls">
                    <div class="qty-stepper">
                        <button class="qty-btn" data-minus="${item.key || item.id}" title="Kurangi">-</button>
                        <span class="qty-val">${item.qty}</span>
                        <button class="qty-btn" data-plus="${item.key || item.id}" title="Tambah">+</button>
                    </div>
                    <span class="cart-item-subtotal">${formatRupiah(item.price * item.qty)}</span>
                </div>
                <div class="cart-item-note-row">
                    <i class="ri-edit-2-line"></i>
                    <input type="text" class="cart-item-note-input" data-note-key="${item.key || item.id}" placeholder="Tambah catatan (cth: jangan terlalu manis, extra sambal)..." value="${item.note || ''}">
                </div>
            </div>
        `).join('');

        listEl.querySelectorAll('[data-plus]').forEach(b => b.addEventListener('click', () => updateCartQty(b.getAttribute('data-plus'), 1)));
        listEl.querySelectorAll('[data-minus]').forEach(b => b.addEventListener('click', () => updateCartQty(b.getAttribute('data-minus'), -1)));
        listEl.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => removeFromCart(b.getAttribute('data-remove'))));

        listEl.querySelectorAll('.cart-item-note-input').forEach(inp => {
            inp.addEventListener('input', (e) => {
                const key = inp.getAttribute('data-note-key');
                const it = state.cart.find(item => (item.key || item.id) === key);
                if (it) {
                    it.note = e.target.value;
                    saveState();
                }
            });
        });

        if (typeof updateCustomerCartBar === 'function') {
            updateCustomerCartBar();
        }
    }

    // Voucher & CRM Event Handlers
    document.getElementById('btnApplyVoucher')?.addEventListener('click', () => {
        const input = document.getElementById('voucherCodeInput');
        const code = input ? input.value.trim() : '';
        if (!code) {
            showToast('Masukkan kode voucher terlebih dahulu!', 'warning');
            return;
        }

        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const res = SohibDB.validateVoucher(code, subtotal);
        if (res.valid) {
            state.appliedVoucher = { code: res.voucher.code, title: res.voucher.title, discountAmount: res.discountAmount };
            document.getElementById('activeVoucherTag').style.display = 'flex';
            document.getElementById('activeVoucherText').textContent = res.message;
            document.getElementById('cartVoucherInputRow').style.display = 'none';
            SoundEngine.ding();
            renderCart();
            showToast(res.message, 'success');
        } else {
            SoundEngine.buzz();
            showToast(res.message, 'warning');
        }
    });

    // ----------------------------------------------------------------------
    // 7. CHECKOUT, ORDER PROCESSING & KDS DISPATCH
    // ----------------------------------------------------------------------
    document.getElementById('btnProceedCheckout')?.addEventListener('click', () => {
        if (state.cart.length === 0) {
            SoundEngine.buzz();
            showToast('Keranjang pesanan masih kosong!', 'warning');
            return;
        }

        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const discount = state.appliedVoucher ? state.appliedVoucher.discountAmount : 0;
        const taxable = Math.max(0, subtotal - discount);
        const tax = Math.round(taxable * 0.10);
        const grandTotal = taxable + tax;

        // Populate Amounts in Checkout Modal
        const dueEl = document.getElementById('checkoutDueAmountDisplay');
        const qrisTag = document.getElementById('qrisExactAmountTag');
        const cashInput = document.getElementById('cashReceivedInput');

        if (dueEl) dueEl.textContent = formatRupiah(grandTotal);
        if (qrisTag) qrisTag.textContent = `Total Pas: ${formatRupiah(grandTotal)}`;
        if (cashInput) {
            cashInput.value = grandTotal; // Default uang pas
        }

        calculateCashChange(grandTotal, grandTotal);

        // Reset to active pay tab
        state.activePayTab = state.activePayTab || 'tab-cash';
        document.querySelectorAll('.pay-tab').forEach(t => {
            if (t.getAttribute('data-tab') === state.activePayTab) t.classList.add('active');
            else t.classList.remove('active');
        });
        document.querySelectorAll('.pay-tab-content').forEach(c => {
            if (c.id === state.activePayTab) c.classList.add('active');
            else c.classList.remove('active');
        });

        openModal('modalCheckout');
        SoundEngine.ding();
    });

    // Payment Tabs Switcher Listener
    document.querySelectorAll('.pay-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.pay-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const targetTab = tab.getAttribute('data-tab');
            state.activePayTab = targetTab;
            const targetContent = document.getElementById(targetTab);
            if (targetContent) targetContent.classList.add('active');
            SoundEngine.beep();
        });
    });

    // Quick Cash Preset Buttons Listener
    document.querySelectorAll('.btn-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const discount = state.appliedVoucher ? state.appliedVoucher.discountAmount : 0;
            const taxable = Math.max(0, subtotal - discount);
            const tax = Math.round(taxable * 0.10);
            const grandTotal = taxable + tax;

            const val = btn.getAttribute('data-val');
            const cashInput = document.getElementById('cashReceivedInput');
            if (val === 'exact') {
                if (cashInput) cashInput.value = grandTotal;
                calculateCashChange(grandTotal, grandTotal);
            } else {
                const amt = parseFloat(val) || 0;
                if (cashInput) cashInput.value = amt;
                calculateCashChange(grandTotal, amt);
            }
            SoundEngine.beep();
        });
    });

    function calculateCashChange(dueAmount, receivedAmount) {
        const changeBox = document.getElementById('changeResultBox');
        const changeLabel = document.getElementById('changeLabel');
        const changeVal = document.getElementById('changeAmountDisplay');
        const diff = receivedAmount - dueAmount;

        if (diff >= 0) {
            if (changeBox) changeBox.classList.remove('insufficient');
            if (changeLabel) changeLabel.textContent = 'Kembalian:';
            if (changeVal) changeVal.textContent = formatRupiah(diff);
        } else {
            if (changeBox) changeBox.classList.add('insufficient');
            if (changeLabel) changeLabel.textContent = 'Kurang:';
            if (changeVal) changeVal.textContent = formatRupiah(Math.abs(diff));
        }
    }

    document.getElementById('cashReceivedInput')?.addEventListener('input', (e) => {
        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const discount = state.appliedVoucher ? state.appliedVoucher.discountAmount : 0;
        const taxable = Math.max(0, subtotal - discount);
        const tax = Math.round(taxable * 0.10);
        const grandTotal = taxable + tax;
        calculateCashChange(grandTotal, parseFloat(e.target.value) || 0);
    });

    // Order Type Selector Switch (Dine In, Take Away, Delivery)
    document.querySelectorAll('.order-type-switch .type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.order-type-switch .type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.orderType = btn.getAttribute('data-type') || 'dine-in';
            SoundEngine.beep();
            showToast(`Tipe pesanan: ${btn.textContent.trim()}`, 'info');
        });
    });

    // Clear / Reset Cart
    document.getElementById('btnClearCart')?.addEventListener('click', () => {
        if (state.cart.length === 0) return;
        state.cart = [];
        state.appliedVoucher = null;
        document.getElementById('activeVoucherTag').style.display = 'none';
        document.getElementById('cartVoucherInputRow').style.display = 'flex';
        saveState();
        renderCart();
        showToast('Keranjang pesanan berhasil dikosongkan.', 'info');
    });

    // Hold Current Bill Logic
    document.getElementById('btnHoldCurrentBill')?.addEventListener('click', () => {
        if (state.cart.length === 0) {
            showToast('Tidak ada pesanan di keranjang untuk disimpan.', 'warning');
            return;
        }

        const customerName = document.getElementById('customerNameInput')?.value.trim() || 'Umum';
        const tableNumber = document.getElementById('tableNumberInput')?.value.trim() || '-';
        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        const draft = {
            id: 'DRAFT-' + Date.now().toString().slice(-4),
            orderId: state.currentOrderId,
            cart: [...state.cart],
            customerName: customerName,
            tableNumber: tableNumber,
            orderType: state.orderType,
            subtotal: subtotal,
            appliedVoucher: state.appliedVoucher,
            time: new Date().toISOString()
        };

        state.holdBills.unshift(draft);
        state.cart = [];
        state.appliedVoucher = null;
        state.currentOrderId = generateOrderId();
        document.getElementById('currentOrderIdDisplay').textContent = state.currentOrderId;
        document.getElementById('customerNameInput').value = '';
        document.getElementById('tableNumberInput').value = '';

        saveState();
        renderCart();
        SoundEngine.ding();
        showToast(`Pesanan ${draft.orderId} (${customerName}) berhasil disimpan sebagai Draft!`, 'success');
    });

    // Hold Bills Modal Viewer
    function renderHoldBills() {
        const container = document.getElementById('holdBillsContainer');
        if (!container) return;

        if (state.holdBills.length === 0) {
            container.innerHTML = `
                <div class="cart-empty-view" style="padding: 2rem 1rem; text-align: center; color: var(--text-muted);">
                    <i class="ri-draft-line" style="font-size: 3rem; margin-bottom: 0.5rem; display: block;"></i>
                    <h4>Tidak Ada Pesanan yang Ditahan</h4>
                    <p>Pesanan yang disimpan sementara (Hold Bill) akan muncul di sini.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = state.holdBills.map((draft, idx) => `
            <div class="hold-bill-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 0.85rem 1rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h5 style="font-weight: 800; color: var(--primary-amber); margin: 0 0 2px;">${draft.orderId} &bull; ${draft.customerName}</h5>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${draft.tableNumber} &bull; ${draft.cart.length} menu &bull; ${formatRupiah(draft.subtotal)}</div>
                    <small style="color: #6b7280; font-size: 0.7rem;">${new Date(draft.time).toLocaleTimeString()}</small>
                </div>
                <div style="display: flex; gap: 0.4rem;">
                    <button class="btn-primary-action btn-sm btn-restore-draft" data-draft-idx="${idx}">
                        <i class="ri-refresh-line"></i> Pulihkan
                    </button>
                    <button class="btn-secondary btn-sm btn-delete-draft" data-draft-idx="${idx}" style="color: #ef4444;">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.btn-restore-draft').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-draft-idx'));
                const draft = state.holdBills[idx];
                if (draft) {
                    state.cart = [...draft.cart];
                    state.currentOrderId = draft.orderId;
                    state.orderType = draft.orderType || 'dine-in';
                    state.appliedVoucher = draft.appliedVoucher || null;
                    document.getElementById('currentOrderIdDisplay').textContent = state.currentOrderId;
                    document.getElementById('customerNameInput').value = draft.customerName || '';
                    document.getElementById('tableNumberInput').value = draft.tableNumber || '';

                    state.holdBills.splice(idx, 1);
                    saveState();
                    renderCart();
                    closeModal('modalHoldBills');
                    SoundEngine.ding();
                    showToast(`Pesanan ${draft.orderId} dipulihkan ke keranjang!`, 'success');
                }
            });
        });

        container.querySelectorAll('.btn-delete-draft').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-draft-idx'));
                state.holdBills.splice(idx, 1);
                saveState();
                renderHoldBills();
                renderCart();
                showToast('Draft pesanan dihapus.', 'info');
            });
        });
    }

    document.getElementById('btnOpenHoldBills')?.addEventListener('click', () => {
        renderHoldBills();
        openModal('modalHoldBills');
    });

    // Mobile View Cart Button Click -> Proceeds to Checkout
    document.getElementById('btnFloatingViewCart')?.addEventListener('click', () => {
        if (state.cart.length > 0) {
            document.getElementById('btnProceedCheckout')?.click();
        }
    });

    document.getElementById('btnConfirmPayment')?.addEventListener('click', () => {
        processPaymentSubmission();
    });

    function processPaymentSubmission() {
        if (state.cart.length === 0) {
            showToast('Keranjang kosong!', 'warning');
            return;
        }

        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const discount = state.appliedVoucher ? state.appliedVoucher.discountAmount : 0;
        const taxable = Math.max(0, subtotal - discount);
        const tax = Math.round(taxable * 0.10);
        const grandTotal = taxable + tax;

        let payMethod = 'Tunai (Cash)';
        let receivedAmount = grandTotal;

        if (state.activePayTab === 'tab-cash') {
            const cashVal = parseFloat(document.getElementById('cashReceivedInput').value) || 0;
            if (cashVal < grandTotal) {
                SoundEngine.buzz();
                showToast('Nominal uang diterima kurang dari total tagihan!', 'warning');
                return;
            }
            receivedAmount = cashVal;
            payMethod = 'Tunai (Cash)';
        } else if (state.activePayTab === 'tab-qris') {
            payMethod = 'Dynamic QRIS';
            receivedAmount = grandTotal;
        } else if (state.activePayTab === 'tab-card') {
            const edc = document.getElementById('edcBankSelect')?.value || 'BCA';
            payMethod = `Kartu Debit/EDC (${edc})`;
            receivedAmount = grandTotal;
        } else {
            const selectedEwallet = document.querySelector('input[name="ewalletOption"]:checked')?.value || 'GoPay';
            payMethod = `E-Wallet (${selectedEwallet})`;
            receivedAmount = grandTotal;
        }

        const customerName = document.getElementById('customerNameInput')?.value.trim() || 'Umum';
        const tableNumber = document.getElementById('tableNumberInput')?.value.trim() || '-';

        // 1. Deduct Product Stocks
        state.cart.forEach(cartItem => {
            const prod = state.products.find(p => p.id === cartItem.id);
            if (prod) {
                prod.stock = Math.max(0, prod.stock - cartItem.qty);
            }
        });

        // 2. Save Transaction Record
        const transactionRecord = {
            orderId: state.currentOrderId,
            dateTime: new Date().toISOString(),
            customerName: customerName,
            tableNumber: tableNumber,
            orderType: state.orderType,
            items: [...state.cart],
            subtotal: subtotal,
            discount: discount,
            tax: tax,
            grandTotal: grandTotal,
            payMethod: payMethod,
            receivedAmount: receivedAmount,
            changeAmount: Math.max(0, receivedAmount - grandTotal),
            cashier: 'Muh Ikhsan Anggara (Owner)'
        };

        state.transactions.unshift(transactionRecord);
        SohibDB.addSale(transactionRecord);

        // 3. Dispatch Order to Kitchen Display System (KDS)
        SohibDB.addKdsOrder({
            orderId: state.currentOrderId,
            customerName: customerName,
            tableNumber: tableNumber,
            orderType: state.orderType,
            items: [...state.cart]
        });

        // 4. Update Table Status in Floor Plan
        if (tableNumber && tableNumber !== '-') {
            SohibDB.updateTableStatus(tableNumber, 'occupied', {
                orderId: state.currentOrderId,
                customer: customerName,
                amount: grandTotal,
                activeItems: [...state.cart]
            });
        }

        // 5. Update Member Points
        if (state.activeMember) {
            SohibDB.addMemberPointsAndSpend(state.activeMember.phone, grandTotal);
        }

        // 6. Sound & Thermal Receipt
        SoundEngine.success();
        closeModal('modalCheckout');
        populateThermalReceipt(transactionRecord);
        openModal('modalReceipt');

        // Reset Cart
        state.cart = [];
        state.appliedVoucher = null;
        state.currentOrderId = generateOrderId();
        document.getElementById('currentOrderIdDisplay').textContent = state.currentOrderId;
        document.getElementById('customerNameInput').value = '';
        document.getElementById('tableNumberInput').value = '';
        document.getElementById('activeVoucherTag').style.display = 'none';
        document.getElementById('cartVoucherInputRow').style.display = 'flex';

        saveState();
        renderProductCatalog();
        renderCart();
        renderKDS();
        renderFloorPlan();
        updateKdsBadge();
        showToast('Transaksi pembayaran berhasil diselesaikan & terkirim ke dapur!', 'success');
    }

    function populateThermalReceipt(tx) {
        document.getElementById('rcptOrderNo').textContent = tx.orderId;
        const d = new Date(tx.dateTime);
        document.getElementById('rcptDateTime').textContent = d.toLocaleDateString('id-ID', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }) + ' WIB';

        document.getElementById('rcptCashierTable').textContent = `${tx.cashier} / ${tx.tableNumber || 'Walk-in'}`;
        document.getElementById('rcptOrderType').textContent = tx.orderType === 'dine-in' ? 'Dine In' : tx.orderType === 'take-away' ? 'Take Away' : 'Delivery';

        const itemsContainer = document.getElementById('rcptItemsList');
        itemsContainer.innerHTML = tx.items.map(it => `
            <div class="receipt-item-row" style="display:flex; justify-content:space-between; margin-bottom:0.35rem; font-size:0.8rem;">
                <div>
                    <strong>${it.name}</strong>
                    ${it.optionsText ? `<div style="font-size:0.72rem; color:#4b5563;">• ${it.optionsText}</div>` : ''}
                    <div style="color:#6b7280; font-size:0.75rem;">${it.qty} x ${formatRupiah(it.price)}</div>
                    ${it.note ? `<div style="color:#9ca3af; font-size:0.7rem; font-style:italic;">Note: ${it.note}</div>` : ''}
                </div>
                <strong>${formatRupiah(it.price * it.qty)}</strong>
            </div>
        `).join('');

        document.getElementById('rcptSubtotal').textContent = formatRupiah(tx.subtotal);
        if (tx.discount > 0) {
            document.getElementById('rcptDiscountRow').style.display = 'flex';
            document.getElementById('rcptDiscountVal').textContent = `- ${formatRupiah(tx.discount)}`;
        } else {
            document.getElementById('rcptDiscountRow').style.display = 'none';
        }
        document.getElementById('rcptTax').textContent = formatRupiah(tx.tax);
        document.getElementById('rcptGrandTotal').textContent = formatRupiah(tx.grandTotal);
        document.getElementById('rcptPayMethod').textContent = tx.payMethod;
        document.getElementById('rcptAmountPaid').textContent = formatRupiah(tx.receivedAmount);
        document.getElementById('rcptChange').textContent = formatRupiah(tx.changeAmount);
    }

    document.getElementById('btnPrintReceipt')?.addEventListener('click', () => {
        window.print();
    });

    // Share Receipt via WhatsApp
    document.getElementById('btnShareWhatsAppReceipt')?.addEventListener('click', () => {
        const orderNo = document.getElementById('rcptOrderNo')?.textContent || '';
        const total = document.getElementById('rcptGrandTotal')?.textContent || '';
        const msg = `*STRUK SOHIB CAFFE & RESTO*\nNo Order: ${orderNo}\nTotal Pembayaran: ${total}\nTerima kasih telah berkunjung di Sohib Caffe & Resto!`;
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    });

    // ----------------------------------------------------------------------
    // 8. KITCHEN DISPLAY SYSTEM (KDS) LOGIC
    // ----------------------------------------------------------------------
    function renderKDS() {
        const grid = document.getElementById('kdsTicketsGrid');
        const emptyState = document.getElementById('kdsEmptyState');
        if (!grid) return;

        let orders = SohibDB.getKdsOrders();
        if (state.activeKdsStation === 'kitchen') {
            orders = orders.filter(o => o.items.some(it => it.category === 'makanan' || it.category === 'snack' || it.category === 'paket'));
        } else if (state.activeKdsStation === 'bar') {
            orders = orders.filter(o => o.items.some(it => it.category === 'kopi' || it.category === 'minuman'));
        }

        // Count stats
        const allOrders = SohibDB.getKdsOrders().filter(o => o.status !== 'served');
        document.getElementById('kdsCountAll').textContent = allOrders.length;
        document.getElementById('kdsCountKitchen').textContent = allOrders.filter(o => o.items.some(it => it.category !== 'kopi' && it.category !== 'minuman')).length;
        document.getElementById('kdsCountBar').textContent = allOrders.filter(o => o.items.some(it => it.category === 'kopi' || it.category === 'minuman')).length;

        if (orders.length === 0) {
            grid.innerHTML = '';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        grid.innerHTML = orders.map(order => {
            const elapsedMins = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000);
            const statusClass = order.status === 'queue' ? 'ticket-queue' : order.status === 'cooking' ? 'ticket-cooking' : 'ticket-ready';
            const statusLabel = order.status === 'queue' ? '🟡 Antrean' : order.status === 'cooking' ? '🔵 Dimasak' : '🟢 Siap Saji';

            return `
                <div class="kds-ticket-card ${statusClass}">
                    <div class="ticket-header">
                        <span class="ticket-order-id">${order.orderId}</span>
                        <span class="ticket-table-badge"><i class="ri-map-pin-user-fill"></i> ${order.tableNumber || 'Take Away'}</span>
                    </div>
                    <div class="ticket-meta-bar">
                        <span><i class="ri-user-3-line"></i> ${order.customerName}</span>
                        <span class="ticket-timer ${elapsedMins >= 15 ? 'timer-warn' : ''}">
                            <i class="ri-time-line"></i> ${elapsedMins}m lalu
                        </span>
                    </div>
                    <div class="ticket-items-body">
                        ${order.items.map(it => `
                            <div class="ticket-item-row">
                                <div>
                                    <span class="ticket-item-name">${it.name}</span>
                                    ${it.optionsText ? `<div class="ticket-item-modifier">${it.optionsText}</div>` : ''}
                                    ${it.note ? `<div class="ticket-item-modifier" style="color:#fbbf24;">Note: ${it.note}</div>` : ''}
                                </div>
                                <span class="ticket-item-qty">${it.qty}x</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="ticket-actions-foot">
                        ${order.status === 'queue' ? `
                            <button class="btn-ticket-action btn-ticket-cooking" data-kds-action="cooking" data-kds-id="${order.id}">
                                <i class="ri-fire-line"></i> Mulai Masak
                            </button>
                        ` : order.status === 'cooking' ? `
                            <button class="btn-ticket-action btn-ticket-ready" data-kds-action="ready" data-kds-id="${order.id}">
                                <i class="ri-checkbox-circle-line"></i> Siap Saji
                            </button>
                        ` : `
                            <button class="btn-ticket-action btn-ticket-done" data-kds-action="served" data-kds-id="${order.id}">
                                <i class="ri-check-double-line"></i> Selesai Saji
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');

        // Action Handlers
        grid.querySelectorAll('[data-kds-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const kdsId = btn.getAttribute('data-kds-id');
                const action = btn.getAttribute('data-kds-action');
                SohibDB.updateKdsStatus(kdsId, action);
                SoundEngine.ding();
                renderKDS();
                updateKdsBadge();
                showToast(`Status pesanan diperbarui menjadi ${action}!`, 'info');
            });
        });
    }

    function updateKdsBadge() {
        const orders = SohibDB.getKdsOrders().filter(o => o.status !== 'served');
        const badge = document.getElementById('kdsActiveBadge');
        if (badge) badge.textContent = orders.length;
    }

    document.querySelectorAll('.btn-kds-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.btn-kds-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.activeKdsStation = btn.getAttribute('data-station');
            renderKDS();
        });
    });

    document.getElementById('btnClearCompletedKds')?.addEventListener('click', () => {
        SohibDB.clearCompletedKdsOrders();
        renderKDS();
        showToast('Antrean pesanan selesai telah dibersihkan.', 'info');
    });

    document.getElementById('btnOpenKDS')?.addEventListener('click', () => {
        renderKDS();
        openModal('modalKDS');
    });

    // ----------------------------------------------------------------------
    // 9. FLOOR PLAN & RESTAURANT TABLE MANAGEMENT LOGIC
    // ----------------------------------------------------------------------
    function renderFloorPlan() {
        const grid = document.getElementById('floorPlanTablesGrid');
        if (!grid) return;

        let tables = SohibDB.getTables();
        if (state.activeZoneFilter !== 'all') {
            tables = tables.filter(t => t.zone === state.activeZoneFilter);
        }

        const totalActiveOccupied = SohibDB.getTables().filter(t => t.status === 'occupied').length;
        const activeBadge = document.getElementById('activeTablesBadge');
        if (activeBadge) activeBadge.textContent = totalActiveOccupied;

        grid.innerHTML = tables.map(tbl => {
            const isOcc = tbl.status === 'occupied';
            const isBill = tbl.status === 'billing';
            const statusClass = isOcc ? 'status-occupied' : isBill ? 'status-billing' : 'status-available';
            const statusLabel = isOcc ? 'Terisi' : isBill ? 'Billing' : 'Kosong';

            return `
                <div class="table-card-item ${statusClass}" data-table-id="${tbl.id}">
                    <div class="table-card-header">
                        <span class="table-card-name">${tbl.name}</span>
                        <span class="table-status-pill ${tbl.status}">${statusLabel}</span>
                    </div>
                    <div class="table-card-details">
                        <span><i class="ri-group-line"></i> Kapasitas: ${tbl.capacity} Orang</span>
                        ${isOcc ? `<span><i class="ri-user-3-line"></i> Tamu: <b>${tbl.customer || 'Pelanggan'}</b></span>` : ''}
                        ${isOcc && tbl.amount ? `<span class="table-bill-amount">${formatRupiah(tbl.amount)}</span>` : ''}
                    </div>
                    <div class="table-card-actions">
                        <button class="btn-table-action-sm btn-pick-table" data-table-name="${tbl.name}">
                            <i class="ri-checkbox-circle-line"></i> Pilih Meja
                        </button>
                        ${isOcc ? `
                            <button class="btn-table-action-sm btn-clear-table" data-table-id="${tbl.id}" style="color:#ef4444;">
                                <i class="ri-refresh-line"></i> Kosongkan
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Table Selection Event Handlers
        grid.querySelectorAll('.btn-pick-table').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tblName = btn.getAttribute('data-table-name');
                const tableInput = document.getElementById('tableNumberInput');
                if (tableInput) tableInput.value = tblName;
                closeModal('modalFloorPlan');
                showToast(`${tblName} dipilih untuk pesanan saat ini!`, 'success');
            });
        });

        grid.querySelectorAll('.btn-clear-table').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tblId = btn.getAttribute('data-table-id');
                SohibDB.updateTableStatus(tblId, 'available');
                renderFloorPlan();
                showToast(`Meja berhasil dikosongkan!`, 'info');
            });
        });
    }

    document.querySelectorAll('#floorPlanZoneFilters .zone-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('#floorPlanZoneFilters .zone-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            state.activeZoneFilter = pill.getAttribute('data-zone');
            renderFloorPlan();
        });
    });

    document.getElementById('btnOpenFloorPlan')?.addEventListener('click', () => {
        renderFloorPlan();
        openModal('modalFloorPlan');
    });

    document.getElementById('btnQuickPickTable')?.addEventListener('click', () => {
        renderFloorPlan();
        openModal('modalFloorPlan');
    });

    // ----------------------------------------------------------------------
    // 10. TABLE QR CODE GENERATOR FOR SELF-ORDER
    // ----------------------------------------------------------------------
    function initTableQrGenerator() {
        const select = document.getElementById('selectQrTableNumber');
        if (!select) return;
        const tables = SohibDB.getTables();
        select.innerHTML = tables.map(t => `<option value="${t.id}">${t.name} (${t.zone.toUpperCase()})</option>`).join('');

        function updateQrPreview() {
            const tableId = select.value;
            const table = tables.find(t => t.id === tableId);
            const labelEl = document.getElementById('qrDisplayTableLabel');
            const imgEl = document.getElementById('qrGeneratedImg');

            if (labelEl && table) labelEl.textContent = table.name.toUpperCase();
            const selfOrderUrl = `${window.location.origin}${window.location.pathname}?mode=customer&table=${encodeURIComponent(tableId)}`;
            if (imgEl) imgEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(selfOrderUrl)}`;
        }

        select.addEventListener('change', updateQrPreview);
        updateQrPreview();
    }

    document.getElementById('btnOpenTableQrGenerator')?.addEventListener('click', () => {
        initTableQrGenerator();
        openModal('modalTableQr');
    });

    document.getElementById('btnPrintTableQr')?.addEventListener('click', () => {
        window.print();
    });

    // ----------------------------------------------------------------------
    // 11. CASH DRAWER, SHIFT & Z-REPORT LOGIC
    // ----------------------------------------------------------------------
    function renderShiftManager() {
        const shift = SohibDB.getActiveShift();
        const sales = SohibDB.getSales();
        const shiftStart = new Date(shift.startTime).getTime();
        const shiftSales = sales.filter(s => new Date(s.created_at || s.dateTime).getTime() >= shiftStart);

        let cashTotal = 0;
        let nonCashTotal = 0;

        shiftSales.forEach(s => {
            const total = s.total_amount || s.grandTotal || 0;
            const method = (s.payment_method || s.payMethod || '').toLowerCase();
            if (method.includes('tunai') || method.includes('cash')) cashTotal += total;
            else nonCashTotal += total;
        });

        document.getElementById('shiftCashierNameDisplay').textContent = shift.cashierName || 'Kasir';
        document.getElementById('shiftStartingCashDisplay').textContent = formatRupiah(shift.startingCash || 0);
        document.getElementById('shiftCashSalesDisplay').textContent = formatRupiah(cashTotal);
        document.getElementById('shiftNonCashSalesDisplay').textContent = formatRupiah(nonCashTotal);
        document.getElementById('inputStartingCash').value = shift.startingCash || 0;

        // Render Petty Cash Logs
        const tbody = document.getElementById('pettyCashTableBody');
        if (tbody) {
            tbody.innerHTML = (shift.pettyCashLogs || []).map(log => `
                <tr>
                    <td>${new Date(log.time).toLocaleTimeString()}</td>
                    <td><span class="badge ${log.type === 'in' ? 'bg-success' : 'bg-danger'}" style="color:${log.type === 'in' ? '#34d399' : '#f87171'}; font-weight:700;">${log.type === 'in' ? 'Kas Masuk' : 'Kas Keluar'}</span></td>
                    <td>${log.reason}</td>
                    <td><strong>${formatRupiah(log.amount)}</strong></td>
                </tr>
            `).join('');
        }
    }

    document.querySelectorAll('.shift-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.shift-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.shift-tab-pane').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-shift-tab');
            document.getElementById(`shiftPane-${target}`)?.classList.add('active');
        });
    });

    document.getElementById('btnUpdateStartingCash')?.addEventListener('click', () => {
        const val = parseFloat(document.getElementById('inputStartingCash').value) || 0;
        SohibDB.updateStartingCash(val);
        renderShiftManager();
        showToast('Modal awal laci kasir berhasil diperbarui!', 'success');
    });

    document.getElementById('btnAddPettyCash')?.addEventListener('click', () => {
        const type = document.getElementById('pettyCashType').value;
        const amount = parseFloat(document.getElementById('pettyCashAmount').value) || 0;
        const reason = document.getElementById('pettyCashReason').value.trim();

        if (amount <= 0 || !reason) {
            showToast('Nominal dan alasan kas kecil wajib diisi!', 'warning');
            return;
        }

        SohibDB.addPettyCash(type, amount, reason);
        document.getElementById('pettyCashAmount').value = '';
        document.getElementById('pettyCashReason').value = '';
        renderShiftManager();
        showToast('Catatan kas kecil berhasil disimpan!', 'success');
    });

    document.getElementById('btnSubmitCloseShift')?.addEventListener('click', () => {
        const actualCash = parseFloat(document.getElementById('inputActualCashInDrawer').value);
        if (isNaN(actualCash)) {
            showToast('Masukkan nominal total uang fisik yang dihitung di laci!', 'warning');
            return;
        }

        const notes = document.getElementById('inputShiftNotes')?.value || '';
        const zReport = SohibDB.closeShiftAndGenerateZReport(actualCash, notes);

        // Populate Z-Report Receipt
        document.getElementById('zrReportId').textContent = zReport.reportId;
        document.getElementById('zrShiftNo').textContent = `Shift ${zReport.shiftNumber}`;
        document.getElementById('zrCashier').textContent = zReport.cashierName;
        document.getElementById('zrTime').textContent = new Date().toLocaleString('id-ID');
        document.getElementById('zrStartingCash').textContent = formatRupiah(zReport.startingCash);
        document.getElementById('zrCashSales').textContent = formatRupiah(zReport.totalCashSales);
        document.getElementById('zrPettyIn').textContent = formatRupiah(zReport.totalPettyCashIn);
        document.getElementById('zrPettyOut').textContent = `- ${formatRupiah(zReport.totalPettyCashOut)}`;
        document.getElementById('zrExpectedCash').textContent = formatRupiah(zReport.expectedCash);
        document.getElementById('zrActualCash').textContent = formatRupiah(zReport.actualCashInDrawer);
        document.getElementById('zrDiffVal').textContent = `${zReport.cashDifference >= 0 ? '+' : ''}${formatRupiah(zReport.cashDifference)}`;
        document.getElementById('zrQrisSales').textContent = formatRupiah(zReport.totalQrisSales);
        document.getElementById('zrCardSales').textContent = formatRupiah(zReport.totalCardSales + zReport.totalTransferSales);
        document.getElementById('zrTotalTurnover').textContent = formatRupiah(zReport.totalTurnover);

        closeModal('modalShiftManager');
        openModal('modalZReportReceipt');
        SoundEngine.success();
        showToast('Tutup shift & Z-Report berhasil digenerate!', 'success');
    });

    document.getElementById('btnPrintZReport')?.addEventListener('click', () => {
        window.print();
    });

    document.getElementById('btnOpenShiftManager')?.addEventListener('click', () => {
        renderShiftManager();
        openModal('modalShiftManager');
    });

    // ----------------------------------------------------------------------
    // 12. CRM MEMBER & POIN SULTAN LOGIC
    // ----------------------------------------------------------------------
    function renderMemberCRM() {
        const grid = document.getElementById('memberCardsGrid');
        const countEl = document.getElementById('memberTotalCount');
        if (!grid) return;

        const members = SohibDB.getMembers();
        if (countEl) countEl.textContent = members.length;

        grid.innerHTML = members.map(m => `
            <div class="member-item-card">
                <span class="member-tier-tag ${m.tier.toLowerCase()}">${m.tier}</span>
                <h5 style="font-weight:700; color:var(--text-main); margin-bottom:2px;">${m.name}</h5>
                <span style="font-size:0.75rem; color:#9ca3af;"><i class="ri-whatsapp-line"></i> ${m.phone}</span>
                <span style="font-size:0.85rem; font-weight:800; color:#34d399; margin-top:4px;"><i class="ri-copper-coin-fill"></i> ${m.points} Poin Sultan</span>
                <span style="font-size:0.72rem; color:#6b7280;">Total Belanja: ${formatRupiah(m.totalSpend || 0)}</span>
                <button class="btn-table-action-sm btn-use-member-cart" data-phone="${m.phone}" style="margin-top:6px;">
                    <i class="ri-check-line"></i> Pilih Member untuk Pesanan
                </button>
            </div>
        `).join('');

        grid.querySelectorAll('.btn-use-member-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                const phone = btn.getAttribute('data-phone');
                const member = SohibDB.getMemberByPhone(phone);
                if (member) {
                    state.activeMember = member;
                    document.getElementById('cartMemberBadgeRow').style.display = 'flex';
                    document.getElementById('cartMemberName').textContent = member.name;
                    document.getElementById('cartMemberTier').textContent = member.tier;
                    document.getElementById('cartMemberPoints').textContent = member.points;
                    document.getElementById('customerNameInput').value = member.name;
                    closeModal('modalMemberCRM');
                    showToast(`Member ${member.name} (${member.tier}) aktif pada pesanan!`, 'success');
                }
            });
        });
    }

    document.getElementById('btnRegisterNewMember')?.addEventListener('click', () => {
        const name = document.getElementById('inputNewMemberName')?.value.trim();
        const phone = document.getElementById('inputNewMemberPhone')?.value.trim();

        if (!name || !phone) {
            showToast('Nama dan No. WhatsApp wajib diisi!', 'warning');
            return;
        }

        const res = SohibDB.registerMember(name, phone);
        if (res.success) {
            document.getElementById('inputNewMemberName').value = '';
            document.getElementById('inputNewMemberPhone').value = '';
            renderMemberCRM();
            SoundEngine.success();
            showToast(`Member ${name} berhasil didaftarkan dengan bonus 10 Poin Sultan!`, 'success');
        } else {
            showToast(res.message, 'warning');
        }
    });

    document.getElementById('btnRemoveMemberCart')?.addEventListener('click', () => {
        state.activeMember = null;
        document.getElementById('cartMemberBadgeRow').style.display = 'none';
        showToast('Member dilepas dari keranjang.', 'info');
    });

    document.getElementById('btnOpenMemberCRM')?.addEventListener('click', () => {
        renderMemberCRM();
        openModal('modalMemberCRM');
    });

    // ----------------------------------------------------------------------
    // 13. CUSTOMER SELF-ORDER MODE LOGIC (PREMIUM ARABIAN RESTO EXPERIENCES)
    // ----------------------------------------------------------------------
    let custCurrentCategory = 'all';
    let custCurrentSearch = '';
    let custSelectedTable = 'Meja T01';
    let custOrderType = 'dine-in';

    function initCustomerSelfOrder() {
        const params = new URLSearchParams(window.location.search);
        const mode = params.get('mode');
        const table = params.get('table');

        if (mode === 'customer' || state.isCustomerMode) {
            enableCustomerMode(table || 'Meja T01');
        }
        setupCustomerEventListeners();
    }

    function enableCustomerMode(tableName = 'Meja T01') {
        state.isCustomerMode = true;
        custSelectedTable = tableName;
        
        // Hide cashier/POS UI
        const posView = document.getElementById('posMainView');
        const mainHeader = document.getElementById('mainHeader');
        const mainFooter = document.getElementById('mainFooterBar');
        const mobNav = document.getElementById('mobileBottomNav');
        const mobCart = document.getElementById('mobileFloatingCartBar');
        
        if (posView) posView.style.display = 'none';
        if (mainHeader) mainHeader.style.display = 'none';
        if (mainFooter) mainFooter.style.display = 'none';
        if (mobNav) mobNav.style.display = 'none';
        if (mobCart) mobCart.style.display = 'none';

        // Show customer view
        const custView = document.getElementById('customerSelfOrderView');
        if (custView) custView.style.display = 'flex';
        
        const tableLabel = document.getElementById('custActiveTableLabel');
        const drawerTable = document.getElementById('custDrawerTableDisplay');
        if (tableLabel) tableLabel.textContent = custSelectedTable;
        if (drawerTable) drawerTable.textContent = custSelectedTable;

        custCurrentCategory = 'all';
        custCurrentSearch = '';
        const searchInput = document.getElementById('custSearchInput');
        if (searchInput) searchInput.value = '';

        document.querySelectorAll('.cust-cat-pill').forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-category') === 'all');
        });

        renderCustomerMenu();
        updateCustomerCartBar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function disableCustomerMode() {
        state.isCustomerMode = false;
        
        const custView = document.getElementById('customerSelfOrderView');
        if (custView) custView.style.display = 'none';

        // Close any customer modals
        closeModal('modalCustCartDrawer');
        closeModal('modalCustCallWaiter');
        closeModal('modalCustPickTable');
        closeModal('modalCustOrderTracker');

        // Restore cashier UI
        const posView = document.getElementById('posMainView');
        const mainHeader = document.getElementById('mainHeader');
        const mainFooter = document.getElementById('mainFooterBar');
        
        if (posView) posView.style.display = 'flex';
        if (mainHeader) mainHeader.style.display = 'flex';
        if (mainFooter) mainFooter.style.display = 'flex';

        renderProductCatalog();
        renderCart();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderCustomerMenu(category = custCurrentCategory, query = custCurrentSearch) {
        const grid = document.getElementById('custProductGrid');
        const countEl = document.getElementById('custProductCount');
        const emptyEl = document.getElementById('custEmptySearch');
        if (!grid) return;

        let filtered = state.products;

        if (category && category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        if (query && query.trim() !== '') {
            const q = query.toLowerCase().trim();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(q) ||
                (p.category && p.category.toLowerCase().includes(q))
            );
        }

        if (countEl) countEl.textContent = filtered.length;

        if (filtered.length === 0) {
            grid.innerHTML = '';
            if (emptyEl) emptyEl.style.display = 'block';
            return;
        }

        if (emptyEl) emptyEl.style.display = 'none';

        const categoryBadges = {
            makanan: '🍛 Arab Autentik',
            kopi: '☕ Kopi Rempah',
            minuman: '🍹 Segar Dingin',
            snack: '🍰 Camilan Timur Tengah',
            paket: '👑 Porsi Sultan'
        };

        grid.innerHTML = filtered.map(prod => {
            const inCartItems = state.cart.filter(it => it.id === prod.id);
            const totalInCart = inCartItems.reduce((s, it) => s + it.qty, 0);
            const badgeText = categoryBadges[prod.category] || '⭐ Pilihan';

            let actionButtonHtml = '';
            if (totalInCart > 0 && prod.category !== 'kopi' && prod.category !== 'minuman') {
                actionButtonHtml = `
                    <div class="cust-card-stepper">
                        <button class="cust-step-btn cust-minus-btn" data-id="${prod.id}">&minus;</button>
                        <span class="cust-step-val">${totalInCart}</span>
                        <button class="cust-step-btn cust-plus-btn" data-id="${prod.id}">+</button>
                    </div>
                `;
            } else {
                actionButtonHtml = `
                    <button class="btn-cust-add" data-id="${prod.id}" title="Pesan menu ini">
                        <i class="ri-add-line"></i> <span class="btn-cust-add-text">${totalInCart > 0 ? `+ Pesan (${totalInCart})` : 'Pesan'}</span>
                    </button>
                `;
            }

            return `
                <div class="cust-product-card" data-id="${prod.id}">
                    <div class="cust-card-img-wrap">
                        <img src="${prod.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'}" alt="${prod.name}" class="cust-card-img" loading="lazy">
                        <span class="cust-badge-float">${badgeText}</span>
                    </div>
                    <div class="cust-card-body">
                        <span class="cust-card-category">${prod.category}</span>
                        <h4 class="cust-card-title">${prod.name}</h4>
                        <p class="cust-card-desc">Sajian istimewa kaya rempah otentik khas Sohib Caffe & Resto.</p>
                        <div class="cust-card-foot">
                            <span class="cust-price">${formatRupiah(prod.price)}</span>
                            ${actionButtonHtml}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach event listeners for Add & Steppers
        grid.querySelectorAll('.btn-cust-add').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const prodId = btn.getAttribute('data-id');
                const product = state.products.find(p => p.id === prodId);
                if (!product) return;

                if (product.category === 'kopi' || product.category === 'minuman') {
                    openDrinkOptionsModal(product);
                } else {
                    addToCart(product);
                    renderCustomerMenu();
                    updateCustomerCartBar();
                }
            });
        });

        grid.querySelectorAll('.cust-plus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const prodId = btn.getAttribute('data-id');
                const product = state.products.find(p => p.id === prodId);
                if (product) {
                    addToCart(product);
                    renderCustomerMenu();
                    updateCustomerCartBar();
                }
            });
        });

        grid.querySelectorAll('.cust-minus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const prodId = btn.getAttribute('data-id');
                const existing = state.cart.find(it => it.id === prodId);
                if (existing) {
                    updateCartQty(existing.key || existing.id, -1);
                    renderCustomerMenu();
                    updateCustomerCartBar();
                }
            });
        });
    }

    function updateCustomerCartBar() {
        const bar = document.getElementById('custFloatingCartBar');
        const badge = document.getElementById('custCartBadge');
        const total = document.getElementById('custCartTotal');
        const items = document.getElementById('custCartItemsInfo');

        const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        if (totalItems > 0) {
            if (bar) bar.style.display = 'flex';
            if (badge) badge.textContent = totalItems;
            if (total) total.textContent = formatRupiah(subtotal);
            if (items) items.textContent = `${totalItems} Menu Dipilih`;
        } else {
            if (bar) bar.style.display = 'none';
        }

        // Also refresh customer cart drawer if currently open
        const drawer = document.getElementById('modalCustCartDrawer');
        if (drawer && drawer.classList.contains('active')) {
            renderCustCartDrawer();
        }
    }

    function openCustCartDrawer() {
        if (state.cart.length === 0) {
            showToast('Pilih setidaknya 1 menu terlebih dahulu!', 'warning');
            return;
        }

        const nameInput = document.getElementById('custCustomerNameInput');
        if (nameInput && !nameInput.value.trim()) {
            nameInput.value = 'Tamu ' + custSelectedTable;
        }

        const tableDisplay = document.getElementById('custDrawerTableDisplay');
        if (tableDisplay) tableDisplay.textContent = custSelectedTable;

        renderCustCartDrawer();
        openModal('modalCustCartDrawer');
    }

    function renderCustCartDrawer() {
        const listEl = document.getElementById('custCartItemsList');
        const totalQtyEl = document.getElementById('custDrawerTotalQty');
        const subtotalEl = document.getElementById('custDrawerSubtotal');
        const taxEl = document.getElementById('custDrawerTax');
        const grandTotalEl = document.getElementById('custDrawerGrandTotal');
        const qrisAmountTag = document.getElementById('custQrisAmountTag');

        if (!listEl) return;

        const totalQty = state.cart.reduce((sum, it) => sum + it.qty, 0);
        const subtotal = state.cart.reduce((sum, it) => sum + (it.price * it.qty), 0);
        const tax = Math.round(subtotal * 0.10);
        const grandTotal = subtotal + tax;

        if (totalQtyEl) totalQtyEl.textContent = totalQty;
        if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
        if (taxEl) taxEl.textContent = formatRupiah(tax);
        if (grandTotalEl) grandTotalEl.textContent = formatRupiah(grandTotal);
        if (qrisAmountTag) qrisAmountTag.textContent = `Total: ${formatRupiah(grandTotal)}`;

        if (state.cart.length === 0) {
            listEl.innerHTML = `
                <div class="cart-empty-view" style="padding: 2rem 1rem; text-align: center; color: var(--text-muted);">
                    <i class="ri-shopping-bag-3-line" style="font-size: 2.5rem; margin-bottom: 0.5rem; display: block; color: var(--primary-amber);"></i>
                    <p>Keranjang pesanan masih kosong.</p>
                </div>
            `;
            return;
        }

        listEl.innerHTML = state.cart.map((item, idx) => {
            const product = state.products.find(p => p.id === item.id) || {};
            const img = product.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80';
            const modText = item.optionsText ? `<div class="cust-item-modifiers"><i class="ri-settings-3-line"></i> ${item.optionsText}</div>` : '';

            return `
                <div class="cust-cart-item-row" data-key="${item.key || item.id}">
                    <div class="cust-item-main-row">
                        <div class="cust-item-thumb-box">
                            <img src="${img}" alt="${item.name}" class="cust-item-thumb">
                            <span class="cust-item-index">#${idx + 1}</span>
                        </div>
                        <div class="cust-item-info">
                            <div class="cust-item-name">${item.name}</div>
                            <div class="cust-item-unit-price">${formatRupiah(item.price)} / porsi</div>
                            ${modText}
                        </div>
                        <button class="cust-btn-del-item" data-key="${item.key || item.id}" title="Hapus menu dari pesanan">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>

                    <div class="cust-item-note-wrap">
                        <i class="ri-edit-2-line cust-note-icon"></i>
                        <input type="text" class="cust-item-note-input" placeholder="Catatan koki (cth: gak pedas, es dipisah, ekstra sambal)..." value="${item.note || ''}" data-key="${item.key || item.id}">
                    </div>

                    <div class="cust-item-bottom-row">
                        <div class="cust-item-subtotal-block">
                            <span class="cust-item-subtotal-lbl">Subtotal:</span>
                            <span class="cust-item-price">${formatRupiah(item.price * item.qty)}</span>
                        </div>
                        <div class="cust-item-controls">
                            <div class="cust-card-stepper">
                                <button class="cust-step-btn cust-drawer-minus" data-key="${item.key || item.id}" title="Kurangi 1">&minus;</button>
                                <span class="cust-step-val">${item.qty}</span>
                                <button class="cust-step-btn cust-drawer-plus" data-key="${item.key || item.id}" title="Tambah 1">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Listeners inside drawer
        listEl.querySelectorAll('.cust-drawer-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-key');
                updateCartQty(key, 1);
                renderCustCartDrawer();
                renderCustomerMenu();
                updateCustomerCartBar();
            });
        });

        listEl.querySelectorAll('.cust-drawer-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-key');
                updateCartQty(key, -1);
                renderCustCartDrawer();
                renderCustomerMenu();
                updateCustomerCartBar();
            });
        });

        listEl.querySelectorAll('.cust-btn-del-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-key');
                removeFromCart(key);
                renderCustCartDrawer();
                renderCustomerMenu();
                updateCustomerCartBar();
            });
        });

        listEl.querySelectorAll('.cust-item-note-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const key = input.getAttribute('data-key');
                const cartItem = state.cart.find(it => (it.key || it.id) === key);
                if (cartItem) {
                    cartItem.note = e.target.value.trim();
                    saveState();
                }
            });
        });
    }

    function submitCustOrder() {
        if (state.cart.length === 0) {
            showToast('Keranjang Anda kosong!', 'warning');
            return;
        }

        const nameInput = document.getElementById('custCustomerNameInput');
        const customerName = (nameInput?.value.trim()) || ('Tamu ' + custSelectedTable);
        const tableNumber = custSelectedTable;

        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = Math.round(subtotal * 0.10);
        const grandTotal = subtotal + tax;

        const selectedPayRadio = document.querySelector('input[name="custPayMethod"]:checked')?.value || 'cashier';
        const payMethodLabel = selectedPayRadio === 'qris' ? 'QRIS Instan (Self-Order)' : 'Bayar di Kasir (Self-Order)';

        const orderId = '#ORD-CUST-' + Math.floor(1000 + Math.random() * 9000);
        const orderSnapshot = [...state.cart];

        // 1. Deduct Product Stocks
        state.cart.forEach(cartItem => {
            const prod = state.products.find(p => p.id === cartItem.id);
            if (prod) {
                prod.stock = Math.max(0, prod.stock - cartItem.qty);
            }
        });

        // 2. Save Transaction Record
        const transactionRecord = {
            orderId: orderId,
            dateTime: new Date().toISOString(),
            customerName: customerName,
            tableNumber: tableNumber,
            orderType: custOrderType,
            items: orderSnapshot,
            subtotal: subtotal,
            discount: 0,
            tax: tax,
            grandTotal: grandTotal,
            payMethod: payMethodLabel,
            receivedAmount: grandTotal,
            changeAmount: 0,
            cashier: 'Self-Order QR Meja'
        };

        state.transactions.unshift(transactionRecord);
        SohibDB.addSale(transactionRecord);

        // 3. Dispatch to Kitchen Display System (KDS)
        SohibDB.addKdsOrder({
            orderId: orderId,
            customerName: customerName,
            tableNumber: tableNumber,
            orderType: custOrderType,
            items: orderSnapshot
        });

        // 4. Update Table Status in Floor Plan
        SohibDB.updateTableStatus(tableNumber, 'occupied', {
            orderId: orderId,
            customer: customerName,
            amount: grandTotal,
            activeItems: orderSnapshot
        });

        // Sound effect
        SoundEngine.success();
        SoundEngine.kitchenAlert();

        // 5. Clear cart & close drawer
        state.cart = [];
        saveState();
        renderCustomerMenu();
        updateCustomerCartBar();
        closeModal('modalCustCartDrawer');

        // 6. Populate & Open Order Tracker Modal
        const trackerOrderId = document.getElementById('custTrackerOrderId');
        const trackerTable = document.getElementById('custTrackerTableLabel');
        const trackerList = document.getElementById('custTrackerItemsList');
        const trackerTotal = document.getElementById('custTrackerGrandTotal');
        const trackerPayNote = document.getElementById('custTrackerPayNote');

        if (trackerOrderId) trackerOrderId.textContent = orderId;
        if (trackerTable) trackerTable.textContent = tableNumber;
        if (trackerTotal) trackerTotal.textContent = formatRupiah(grandTotal);

        if (trackerPayNote) {
            trackerPayNote.innerHTML = selectedPayRadio === 'qris' 
                ? `<i class="ri-checkbox-circle-fill" style="color: #10b981;"></i> Pembayaran via <b>QRIS Instan</b> berhasil dikonfirmasi. Dapur sedang menyiapkan pesanan Anda.`
                : `<i class="ri-information-line" style="color: #f59e0b;"></i> Pembayaran dipilih: <b>Bayar di Kasir</b>. Silakan selesaikan pembayaran ke kasir saat selesai bersantap.`;
        }

        if (trackerList) {
            trackerList.innerHTML = orderSnapshot.map(it => `
                <div class="tracker-item-row">
                    <span><b>${it.qty}x</b> ${it.name} ${it.optionsText ? `(${it.optionsText})` : ''}</span>
                    <span>${formatRupiah(it.price * it.qty)}</span>
                </div>
            `).join('');
        }

        openModal('modalCustOrderTracker');
        showToast('Pesanan berhasil dikirim langsung ke Dapur & Barista! 🚀', 'success');
    }

    function setupCustomerEventListeners() {
        // Customer Search Input
        const custSearch = document.getElementById('custSearchInput');
        const clearBtn = document.getElementById('custClearSearchBtn');

        custSearch?.addEventListener('input', (e) => {
            custCurrentSearch = e.target.value;
            if (clearBtn) clearBtn.style.display = custCurrentSearch ? 'block' : 'none';
            renderCustomerMenu(custCurrentCategory, custCurrentSearch);
        });

        clearBtn?.addEventListener('click', () => {
            if (custSearch) custSearch.value = '';
            custCurrentSearch = '';
            if (clearBtn) clearBtn.style.display = 'none';
            renderCustomerMenu(custCurrentCategory, '');
        });

        document.getElementById('btnCustResetSearch')?.addEventListener('click', () => {
            if (custSearch) custSearch.value = '';
            custCurrentSearch = '';
            custCurrentCategory = 'all';
            document.querySelectorAll('.cust-cat-pill').forEach(p => {
                p.classList.toggle('active', p.getAttribute('data-category') === 'all');
            });
            renderCustomerMenu('all', '');
        });

        // Category Pills
        document.querySelectorAll('.cust-cat-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('.cust-cat-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                custCurrentCategory = pill.getAttribute('data-category') || 'all';
                renderCustomerMenu(custCurrentCategory, custCurrentSearch);
            });
        });

        // Open Drawer
        document.getElementById('btnCustOpenCartDrawer')?.addEventListener('click', openCustCartDrawer);

        // Clear Cart from Drawer
        document.getElementById('btnCustClearCart')?.addEventListener('click', () => {
            if (state.cart.length === 0) return;
            state.cart = [];
            saveState();
            renderCustCartDrawer();
            renderCustomerMenu();
            updateCustomerCartBar();
            showToast('Keranjang pesanan dikosongkan.', 'info');
        });

        // Order Type Toggle in Drawer
        document.querySelectorAll('.cust-type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.cust-type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                custOrderType = btn.getAttribute('data-cust-type') || 'dine-in';
            });
        });

        // Payment Method Radio in Drawer
        document.querySelectorAll('input[name="custPayMethod"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const qrisBox = document.getElementById('custQrisDisplayBox');
                if (qrisBox) {
                    qrisBox.style.display = radio.value === 'qris' ? 'block' : 'none';
                }
            });
        });

        // Submit Order
        document.getElementById('btnCustSubmitOrder')?.addEventListener('click', submitCustOrder);

        // Header Table Pill -> Open Table Picker
        document.getElementById('custHeaderTablePill')?.addEventListener('click', () => {
            renderCustTablePicker();
            openModal('modalCustPickTable');
        });

        // Call Waiter Button
        document.getElementById('btnCustCallWaiter')?.addEventListener('click', () => {
            openModal('modalCustCallWaiter');
        });

        // Call Waiter Options Actions
        document.querySelectorAll('.cust-call-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.getAttribute('data-call-type');
                const titles = {
                    waiter: 'Pelayan sedang menuju ke meja Anda 🏃‍♂️',
                    cutlery: 'Permintaan alat makan tambahan telah dikirim ke staf 🍴',
                    refill: 'Permintaan tambahan air / es dikirim ke barista ☕',
                    bill: 'Pelayan akan segera mengantarkan tagihan ke meja Anda 🧾'
                };
                SoundEngine.ding();
                closeModal('modalCustCallWaiter');
                showToast(titles[type] || 'Panggilan terkirim ke staf resto!', 'success');
            });
        });

        // Switch to Customer View button in Cashier Header
        document.getElementById('btnSwitchCustomerView')?.addEventListener('click', () => {
            enableCustomerMode('Meja T01');
            showToast('Beralih ke Tampilan Menu Pelanggan (Self-Order QR Meja)', 'info');
        });

        // Exit Customer Mode
        document.getElementById('btnExitCustomerMode')?.addEventListener('click', () => {
            disableCustomerMode();
            showToast('Kembali ke Mode Kasir POS', 'info');
        });

        // Customer Theme Toggle
        document.getElementById('btnCustThemeToggle')?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('posify_theme', newTheme);
            const icon = document.getElementById('custThemeIcon');
            if (icon) icon.className = newTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
        });

        // Order More Button in Tracker
        document.getElementById('btnCustOrderMore')?.addEventListener('click', () => {
            closeModal('modalCustOrderTracker');
        });
    }

    function renderCustTablePicker() {
        const grid = document.getElementById('custTablesListGrid');
        if (!grid) return;

        const tables = [
            { id: 'Meja T01', zone: '🌴 Majlis Lesehan' },
            { id: 'Meja T02', zone: '🌴 Majlis Lesehan' },
            { id: 'Meja T03', zone: '🌴 Majlis Lesehan' },
            { id: 'Meja T04', zone: '🏛️ Indoor Hall' },
            { id: 'Meja T05', zone: '🏛️ Indoor Hall' },
            { id: 'Meja T06', zone: '🏛️ Indoor Hall' },
            { id: 'Meja T07', zone: '🏛️ Indoor Hall' },
            { id: 'Meja T08', zone: '🌿 Outdoor Terrace' },
            { id: 'Meja T09', zone: '🌿 Outdoor Terrace' },
            { id: 'Meja T10', zone: '🌿 Outdoor Terrace' },
            { id: 'Meja VIP 1', zone: '👑 VIP Sultan' },
            { id: 'Meja VIP 2', zone: '👑 VIP Sultan' }
        ];

        grid.innerHTML = tables.map(t => `
            <div class="cust-table-card ${t.id === custSelectedTable ? 'active' : ''}" data-table="${t.id}">
                <span class="cust-table-card-num">${t.id}</span>
                <span class="cust-table-card-zone">${t.zone}</span>
            </div>
        `).join('');

        grid.querySelectorAll('.cust-table-card').forEach(card => {
            card.addEventListener('click', () => {
                custSelectedTable = card.getAttribute('data-table');
                const label = document.getElementById('custActiveTableLabel');
                const drawerLabel = document.getElementById('custDrawerTableDisplay');
                if (label) label.textContent = custSelectedTable;
                if (drawerLabel) drawerLabel.textContent = custSelectedTable;
                SoundEngine.ding();
                closeModal('modalCustPickTable');
                showToast(`Posisi Meja diatur ke: ${custSelectedTable}`, 'success');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 14. SOUND FX & PWA SERVICE WORKER REGISTRATION
    // ----------------------------------------------------------------------
    document.getElementById('btnToggleAudioFx')?.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        localStorage.setItem('posify_sound', state.soundEnabled);
        const icon = document.getElementById('audioFxIcon');
        if (icon) {
            icon.className = state.soundEnabled ? 'ri-volume-up-fill' : 'ri-volume-mute-fill';
        }
        showToast(state.soundEnabled ? 'Efek Suara Aktif 🔊' : 'Efek Suara Dinonaktifkan 🔇', 'info');
    });

    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').then(reg => {
                console.log('✅ Service Worker Registered:', reg.scope);
            }).catch(err => {
                console.log('❌ Service Worker Registration Failed:', err);
            });
        });
    }

    // Network Online / Offline Detection
    window.addEventListener('offline', () => {
        const banner = document.getElementById('networkBanner');
        if (banner) banner.style.display = 'flex';
        showToast('Koneksi internet terputus — POSify berjalan dalam mode offline lokal!', 'warning');
    });

    // ----------------------------------------------------------------------
    // 14B. INVENTORY & SALES REPORTS MODAL
    // ----------------------------------------------------------------------
    function renderInventory() {
        const tbody = document.getElementById('inventoryTableBody');
        if (!tbody) return;
        const query = (document.getElementById('invSearchInput')?.value || '').toLowerCase();
        const filtered = state.products.filter(p => p.name.toLowerCase().includes(query) || (p.barcode && p.barcode.includes(query)));

        tbody.innerHTML = filtered.map(p => `
            <tr>
                <td><strong>${p.name}</strong><br><small style="color:var(--text-muted);">Barcode: ${p.barcode || p.id}</small></td>
                <td><span class="product-category-tag">${p.category.toUpperCase()}</span></td>
                <td>${formatRupiah(p.price)}</td>
                <td>
                    <span style="font-weight:800; color:${p.stock <= 5 ? '#f87171' : '#34d399'};">${p.stock} pcs</span>
                </td>
                <td>
                    <button class="btn-primary-action btn-sm btn-edit-stock" data-prod-id="${p.id}" style="padding:0.25rem 0.6rem; font-size:0.75rem;">
                        <i class="ri-add-circle-line"></i> +5 Stok
                    </button>
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.btn-edit-stock').forEach(b => {
            b.addEventListener('click', () => {
                const id = b.getAttribute('data-prod-id');
                const prod = state.products.find(p => p.id === id);
                if (prod) {
                    prod.stock += 5;
                    saveState();
                    renderInventory();
                    renderProductCatalog();
                    SoundEngine.ding();
                    showToast(`Stok ${prod.name} ditambah 5 pcs (Total: ${prod.stock})`, 'success');
                }
            });
        });
    }

    document.getElementById('btnOpenInventory')?.addEventListener('click', () => {
        renderInventory();
        openModal('modalInventory');
    });

    document.getElementById('invSearchInput')?.addEventListener('input', renderInventory);

    function renderReports() {
        const totalRevEl = document.getElementById('reportTotalRevenue') || document.getElementById('repTotalTurnover');
        const totalTxEl = document.getElementById('reportTotalTxCount') || document.getElementById('repTotalOrders');
        const totalItemsEl = document.getElementById('reportTotalItemsSold');
        const avgOrderEl = document.getElementById('reportAvgOrderValue');
        const tbody = document.getElementById('transactionHistoryTableBody') || document.getElementById('reportsTableBody');

        const sales = SohibDB.getSales();
        let totalRevenue = 0;
        let totalItemsSold = 0;

        sales.forEach(s => {
            const amount = (s.total_amount || s.grandTotal || 0);
            totalRevenue += amount;
            if (s.items && Array.isArray(s.items)) {
                totalItemsSold += s.items.reduce((acc, it) => acc + (it.qty || 1), 0);
            } else {
                totalItemsSold += 1;
            }
        });

        const totalTxCount = sales.length;
        const avgOrder = totalTxCount > 0 ? Math.round(totalRevenue / totalTxCount) : 0;

        if (totalRevEl) totalRevEl.textContent = formatRupiah(totalRevenue);
        if (totalTxEl) totalTxEl.textContent = `${totalTxCount} Trx`;
        if (totalItemsEl) totalItemsEl.textContent = `${totalItemsSold} Pcs`;
        if (avgOrderEl) avgOrderEl.textContent = formatRupiah(avgOrder);

        if (tbody) {
            if (sales.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-muted text-center py-4" style="text-align:center; padding:1.5rem; color:var(--text-muted);">Belum ada riwayat transaksi penjualan hari ini.</td></tr>';
                return;
            }

            tbody.innerHTML = sales.slice(0, 50).map(s => {
                const orderNo = s.invoice_no || s.orderId || '-';
                const timeStr = new Date(s.created_at || s.dateTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                const customerStr = `${s.customer_name || s.customerName || 'Umum'} (${s.table_number || s.tableNumber || '-'})`;
                const orderTypeStr = (s.order_type || s.orderType || 'dine-in') === 'dine-in' ? 'Dine In' : (s.order_type || s.orderType) === 'take-away' ? 'Take Away' : 'Delivery';
                const methodStr = s.payment_method || s.payMethod || 'Tunai';
                const amountStr = formatRupiah(s.total_amount || s.grandTotal || 0);

                return `
                    <tr>
                        <td><strong>${orderNo}</strong></td>
                        <td>${timeStr}</td>
                        <td>${customerStr}</td>
                        <td><span class="badge" style="background:rgba(212,163,115,0.12); color:var(--primary-amber); padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem;">${orderTypeStr}</span></td>
                        <td><span class="badge" style="background:rgba(16,185,129,0.12); color:#34d399; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem;">${methodStr}</span></td>
                        <td><strong>${amountStr}</strong></td>
                    </tr>
                `;
            }).join('');
        }
    }

    // CSV Export Handler
    document.getElementById('btnExportReportCSV')?.addEventListener('click', () => {
        const sales = SohibDB.getSales();
        if (sales.length === 0) {
            showToast('Tidak ada data transaksi untuk diekspor.', 'warning');
            return;
        }

        let csv = 'No Order,Waktu,Pelanggan,Meja,Tipe,Metode Pembayaran,Total Tagihan\n';
        sales.forEach(s => {
            const no = s.invoice_no || s.orderId || '';
            const t = new Date(s.created_at || s.dateTime).toLocaleString('id-ID');
            const c = (s.customer_name || s.customerName || 'Umum').replace(/,/g, ' ');
            const m = s.table_number || s.tableNumber || '-';
            const ty = s.order_type || s.orderType || 'dine-in';
            const pm = (s.payment_method || s.payMethod || 'Tunai').replace(/,/g, ' ');
            const tot = s.total_amount || s.grandTotal || 0;
            csv += `"${no}","${t}","${c}","${m}","${ty}","${pm}",${tot}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Laporan_Penjualan_SohibCaffe_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        SoundEngine.ding();
        showToast('Laporan penjualan CSV berhasil diunduh!', 'success');
    });

    // ----------------------------------------------------------------------
    // 14C. MOBILE BOTTOM NAVIGATION & QUICK MENU SHEET
    // ----------------------------------------------------------------------
    const posCartPanel = document.getElementById('posCartPanel');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    function setActiveMobileNav(viewName) {
        mobileNavItems.forEach(item => {
            if (item.getAttribute('data-mobile-view') === viewName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function openMobileCartView() {
        if (posCartPanel) posCartPanel.classList.add('mobile-view-active');
        setActiveMobileNav('cart');
    }

    function closeMobileCartView() {
        if (posCartPanel) posCartPanel.classList.remove('mobile-view-active');
        setActiveMobileNav('catalog');
    }

    document.getElementById('btnFloatingViewCart')?.addEventListener('click', openMobileCartView);
    document.getElementById('btnMobileCloseCart')?.addEventListener('click', closeMobileCartView);

    // Mobile Bottom Nav Tabs Click Handlers
    document.getElementById('mobileNavCatalog')?.addEventListener('click', () => {
        closeMobileCartView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('mobileNavCart')?.addEventListener('click', openMobileCartView);

    document.getElementById('mobileNavReports')?.addEventListener('click', () => {
        renderReports();
        openModal('modalReports');
    });

    document.getElementById('mobileNavMenu')?.addEventListener('click', () => {
        const mHoldCount = document.getElementById('mMenuHoldCount');
        if (mHoldCount) mHoldCount.textContent = state.holdBills.length;
        openModal('modalMobileMenu');
    });

    // Mobile Menu Sheet Tiles Actions
    document.getElementById('mMenuInventory')?.addEventListener('click', () => {
        closeModal('modalMobileMenu');
        renderInventory();
        openModal('modalInventory');
    });

    document.getElementById('mMenuReports')?.addEventListener('click', () => {
        closeModal('modalMobileMenu');
        renderReports();
        openModal('modalReports');
    });

    document.getElementById('mMenuHoldBills')?.addEventListener('click', () => {
        closeModal('modalMobileMenu');
        renderHoldBills();
        openModal('modalHoldBills');
    });

    document.getElementById('mMenuTheme')?.addEventListener('click', () => {
        document.getElementById('themeToggleBtn')?.click();
    });

    document.getElementById('mMenuMaps')?.addEventListener('click', () => {
        closeModal('modalMobileMenu');
        openModal('modalLocationMap');
    });

    document.getElementById('mMenuLogout')?.addEventListener('click', () => {
        closeModal('modalMobileMenu');
        document.getElementById('btnLogoutHeader')?.click();
    });

    document.getElementById('btnMobileUserLogout')?.addEventListener('click', () => {
        closeModal('modalMobileMenu');
        document.getElementById('btnLogoutHeader')?.click();
    });

    // ----------------------------------------------------------------------
    // 15. INITIALIZATION & CONTROLLERS
    // ----------------------------------------------------------------------
    renderProductCatalog();
    renderCart();
    renderKDS();
    renderFloorPlan();
    initCustomerSelfOrder();
    updateKdsBadge();

    // Auto-update KDS Timers every 10 seconds
    setInterval(() => {
        if (document.getElementById('modalKDS')?.classList.contains('active')) {
            renderKDS();
        }
    }, 10000);

    // Global Modal Close Buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-close');
            closeModal(modalId);
        });
    });

    // Category Pill Filters in Main POS
    document.querySelectorAll('#categoryPillContainer .category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('#categoryPillContainer .category-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            state.selectedCategory = pill.getAttribute('data-category');
            renderProductCatalog();
        });
    });

    // Product Search Input
    document.getElementById('productSearchInput')?.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderProductCatalog();
    });

    document.getElementById('clearSearchBtn')?.addEventListener('click', () => {
        const input = document.getElementById('productSearchInput');
        if (input) input.value = '';
        state.searchQuery = '';
        renderProductCatalog();
    });

    // Barcode Scanner Button
    document.getElementById('btnScanBarcode')?.addEventListener('click', () => {
        const randomProduct = state.products[Math.floor(Math.random() * state.products.length)];
        SoundEngine.beep();
        addToCart(randomProduct);
        showToast(`Barcode [${randomProduct.barcode}] terdeteksi: ${randomProduct.name}!`, 'success');
    });

    // Theme Toggle
    document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('posify_theme', newTheme);
        const icon = document.getElementById('themeIcon');
        if (icon) icon.className = newTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
    });

    // Fullscreen Toggle
    document.getElementById('fullscreenToggleBtn')?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    });

    // Open Maps
    document.getElementById('btnOpenMapsFooter')?.addEventListener('click', () => {
        openModal('modalLocationMap');
    });

    // Cyber Security SOC Button (visible for admin/owner)
    document.getElementById('btnOpenSecuritySOC')?.addEventListener('click', () => {
        openModal('modalSecuritySOC');
    });

    console.log('🚀 Sohib Caffe POSify Pro v3.0 fully initialized.');
});
