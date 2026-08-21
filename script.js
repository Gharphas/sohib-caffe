/* ==========================================================================
   POSify Pro - Intelligent Point of Sale & Cash Register System Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. DEFAULT DATA & INITIALIZATION
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // 2. MIDDLE EASTERN & ARABIAN RESTO DEFAULT PRODUCTS DATA
    // ----------------------------------------------------------------------
    const DEFAULT_PRODUCTS = [
        // HIDANGAN UTAMA ARAB (MAKANAN)
        {
            id: 'ARAB-001',
            name: 'Nasi Mandhi Kambing Muda Oven',
            category: 'makanan',
            price: 68000,
            stock: 35,
            barcode: '8992001',
            img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80'
        },
        {
            id: 'ARAB-002',
            name: 'Nasi Kebuli Daging Sapi Spesial',
            category: 'makanan',
            price: 52000,
            stock: 40,
            barcode: '8992002',
            img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80'
        },
        {
            id: 'ARAB-003',
            name: 'Nasi Biryani Ayam Tandoori',
            category: 'makanan',
            price: 45000,
            stock: 30,
            barcode: '8992003',
            img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80'
        },
        {
            id: 'ARAB-004',
            name: 'Nasi Kabsah Daging Kambing Hadramaut',
            category: 'makanan',
            price: 65000,
            stock: 25,
            barcode: '8992004',
            img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=400&q=80'
        },
        {
            id: 'ARAB-005',
            name: 'Shawarma Daging Kebab Jumbo',
            category: 'makanan',
            price: 35000,
            stock: 45,
            barcode: '8992005',
            img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80'
        },
        {
            id: 'ARAB-006',
            name: 'Shish Tawook Ayam Rempah Arab',
            category: 'makanan',
            price: 42000,
            stock: 28,
            barcode: '8992006',
            img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80'
        },

        // KOPI TIMUR TENGAH & GAHWA
        {
            id: 'ARAB-007',
            name: 'Kopi Gahwa Arabica Cardamom & Saffron',
            category: 'kopi',
            price: 28000,
            stock: 50,
            barcode: '8992007',
            img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80'
        },
        {
            id: 'ARAB-008',
            name: 'Karak Chai Spiced Tea Latte',
            category: 'kopi',
            price: 22000,
            stock: 60,
            barcode: '8992008',
            img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80'
        },
        {
            id: 'ARAB-009',
            name: 'Turkish Coffee Espresso Pasir',
            category: 'kopi',
            price: 25000,
            stock: 35,
            barcode: '8992009',
            img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80'
        },

        // MINUMAN KHAS ARAB & TEH ADEN
        {
            id: 'ARAB-010',
            name: 'Shahi Adani (Teh Susu Rempah Yaman)',
            category: 'minuman',
            price: 22000,
            stock: 55,
            barcode: '8992010',
            img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80'
        },
        {
            id: 'ARAB-011',
            name: 'Jus Kurma Madu Ajwa Royal',
            category: 'minuman',
            price: 26000,
            stock: 40,
            barcode: '8992011',
            img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80'
        },
        {
            id: 'ARAB-012',
            name: 'Moroccan Fresh Mint Iced Tea',
            category: 'minuman',
            price: 18000,
            stock: 50,
            barcode: '8992012',
            img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80'
        },
        {
            id: 'ARAB-013',
            name: 'Limonana (Mint Lemonade Dingin Khas Arab)',
            category: 'minuman',
            price: 20000,
            stock: 45,
            barcode: '8992013',
            img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80'
        },

        // SNACK, ROTI MARYAM & DESSERT
        {
            id: 'ARAB-014',
            name: 'Roti Maryam Madu Yaman & Keju Melt',
            category: 'snack',
            price: 24000,
            stock: 35,
            barcode: '8992014',
            img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80'
        },
        {
            id: 'ARAB-015',
            name: 'Hummus & Fresh Warm Pita Bread',
            category: 'snack',
            price: 32000,
            stock: 25,
            barcode: '8992015',
            img: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=400&q=80'
        },
        {
            id: 'ARAB-016',
            name: 'Samosa Daging Kambing Rempah (4 pcs)',
            category: 'snack',
            price: 28000,
            stock: 30,
            barcode: '8992016',
            img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
        },
        {
            id: 'ARAB-017',
            name: 'Baklava Pistachio Turkish Gold (3 pcs)',
            category: 'snack',
            price: 36000,
            stock: 20,
            barcode: '8992017',
            img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400&q=80'
        },
        {
            id: 'ARAB-018',
            name: 'Umm Ali (Puding Roti Susu Hangat Arab)',
            category: 'snack',
            price: 30000,
            stock: 20,
            barcode: '8992018',
            img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80'
        },

        // PAKET SULTAN NAMPAN TIMUR TENGAH
        {
            id: 'ARAB-019',
            name: 'Paket Sultan Nampan Mandhi (4-5 Orang)',
            category: 'paket',
            price: 245000,
            stock: 15,
            barcode: '8992019',
            img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80'
        },
        {
            id: 'ARAB-020',
            name: 'Paket Kencan Berdua (Kebuli Sapi + Biryani + 2 Shahi Adani)',
            category: 'paket',
            price: 110000,
            stock: 20,
            barcode: '8992020',
            img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
        },
        {
            id: 'ARAB-021',
            name: 'Paket Ngemil Arab (Shawarma + Samosa + Limonana)',
            category: 'paket',
            price: 68000,
            stock: 25,
            barcode: '8992021',
            img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80'
        },

        // HIDANGAN UTAMA & GRILL ARAB TAMBAHAN
        {
            id: 'ARAB-022',
            name: 'Nasi Mandhi Daging Unta Rempah Zafaran',
            category: 'makanan',
            price: 85000,
            stock: 20,
            barcode: '8992022',
            img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80'
        },
        {
            id: 'ARAB-023',
            name: 'Kebab Kofta Daging Domba Panggang',
            category: 'makanan',
            price: 48000,
            stock: 35,
            barcode: '8992023',
            img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80'
        },
        {
            id: 'ARAB-024',
            name: 'Lamb Shank Hadramaut Panggang Kuah Kental',
            category: 'makanan',
            price: 95000,
            stock: 18,
            barcode: '8992024',
            img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80'
        },
        {
            id: 'ARAB-025',
            name: 'Arayes Daging Kambing Roti Panggang Gurih',
            category: 'makanan',
            price: 38000,
            stock: 30,
            barcode: '8992025',
            img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80'
        },
        {
            id: 'ARAB-026',
            name: 'Nasi Bukhari Ayam Panggang Kismis',
            category: 'makanan',
            price: 46000,
            stock: 32,
            barcode: '8992026',
            img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80'
        },
        {
            id: 'ARAB-027',
            name: 'Falafel Wrap with Tahini & Pickles',
            category: 'makanan',
            price: 32000,
            stock: 40,
            barcode: '8992027',
            img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80'
        },
        {
            id: 'ARAB-028',
            name: 'Shakshuka Telur Pedas Tomat & Warm Pita Bread',
            category: 'makanan',
            price: 35000,
            stock: 25,
            barcode: '8992028',
            img: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=400&q=80'
        },

        // KOPI & MINUMAN ARAB TAMBAHAN
        {
            id: 'ARAB-029',
            name: 'Gahwa Hijau Rempah Cardamom Pot (Teko Arab)',
            category: 'kopi',
            price: 35000,
            stock: 40,
            barcode: '8992029',
            img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80'
        },
        {
            id: 'ARAB-030',
            name: 'Es Kopi Susu Kurma Ajwa Creamy',
            category: 'kopi',
            price: 25000,
            stock: 50,
            barcode: '8992030',
            img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80'
        },
        {
            id: 'ARAB-031',
            name: 'Arabian Saffron Gold Latte',
            category: 'kopi',
            price: 32000,
            stock: 45,
            barcode: '8992031',
            img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80'
        },
        {
            id: 'ARAB-032',
            name: 'Teh Karkadeh Mesir (Hibiscus Iced Tea Segar)',
            category: 'minuman',
            price: 19000,
            stock: 60,
            barcode: '8992032',
            img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80'
        },
        {
            id: 'ARAB-033',
            name: 'Jus Delima Pomegranate Segar Arab',
            category: 'minuman',
            price: 28000,
            stock: 35,
            barcode: '8992033',
            img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80'
        },
        {
            id: 'ARAB-034',
            name: 'Sahlab Warm Milk Drink with Cinnamon & Coconut',
            category: 'minuman',
            price: 24000,
            stock: 40,
            barcode: '8992034',
            img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80'
        },
        {
            id: 'ARAB-035',
            name: 'Es Sirup Rooh Afza Mawar Rempah',
            category: 'minuman',
            price: 18000,
            stock: 50,
            barcode: '8992035',
            img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80'
        },

        // SNACK & DESSERT ARAB TAMBAHAN
        {
            id: 'ARAB-036',
            name: 'Kunafa Keju Molor Turkish Pistachio (Warm)',
            category: 'snack',
            price: 45000,
            stock: 25,
            barcode: '8992036',
            img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400&q=80'
        },
        {
            id: 'ARAB-037',
            name: 'Mutabbaq Manis / Martabak Arab Pisang Keju',
            category: 'snack',
            price: 26000,
            stock: 35,
            barcode: '8992037',
            img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80'
        },
        {
            id: 'ARAB-038',
            name: 'Kibbeh Daging Cincang & Pine Nuts (3 pcs)',
            category: 'snack',
            price: 32000,
            stock: 30,
            barcode: '8992038',
            img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
        },
        {
            id: 'ARAB-039',
            name: 'Baba Ganoush Terong Panggang & Olive Oil',
            category: 'snack',
            price: 29000,
            stock: 25,
            barcode: '8992039',
            img: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=400&q=80'
        },
        {
            id: 'ARAB-040',
            name: 'Ma\'amoul Kurma & Walnut Cookies (4 pcs)',
            category: 'snack',
            price: 22000,
            stock: 40,
            barcode: '8992040',
            img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80'
        },

        // PAKET SULTAN TAMBAHAN
        {
            id: 'ARAB-041',
            name: 'Paket Sultan Kambing Guling Mini (3-4 Orang)',
            category: 'paket',
            price: 280000,
            stock: 12,
            barcode: '8992041',
            img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80'
        },
        {
            id: 'ARAB-042',
            name: 'Paket Sarapan Arab (Shakshuka + Falafel + 2 Shahi Adani)',
            category: 'paket',
            price: 68000,
            stock: 20,
            barcode: '8992042',
            img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
        }
    ];

    // Reactive State (with Arabian Menu Auto-Migration v3)
    const isArabianMenuLoaded = localStorage.getItem('posify_arabian_menu_v3');
    let loadedProducts = DEFAULT_PRODUCTS;
    if (isArabianMenuLoaded && localStorage.getItem('posify_products')) {
        try {
            loadedProducts = JSON.parse(localStorage.getItem('posify_products')) || DEFAULT_PRODUCTS;
        } catch (e) {
            loadedProducts = DEFAULT_PRODUCTS;
        }
    } else {
        localStorage.setItem('posify_products', JSON.stringify(DEFAULT_PRODUCTS));
        localStorage.setItem('posify_arabian_menu_v3', 'true');
    }

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
        activePayTab: 'tab-cash'
    };

    // ----------------------------------------------------------------------
    // 2. AUDIO SYNTHESIZER (WEB AUDIO API)
    // ----------------------------------------------------------------------
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playBeepSound() {
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } catch (e) { }
    }

    function playCheckoutChime() {
        try {
            const ctx = getAudioContext();
            const now = ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + i * 0.07);
                gain.gain.setValueAtTime(0.12, now + i * 0.07);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.07);
                osc.stop(now + i * 0.07 + 0.25);
            });
        } catch (e) { }
    }

    function playErrorSound() {
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, ctx.currentTime);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
        } catch (e) { }
    }

    // ----------------------------------------------------------------------
    // 3. UTILITIES & FORMATTING
    // ----------------------------------------------------------------------
    function formatRupiah(num) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(num);
    }

    function generateOrderId() {
        return '#ORD-' + Math.floor(1000 + Math.random() * 9000);
    }

    function showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
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

    function saveState() {
        localStorage.setItem('posify_products', JSON.stringify(state.products));
        localStorage.setItem('posify_cart', JSON.stringify(state.cart));
        localStorage.setItem('posify_transactions', JSON.stringify(state.transactions));
        localStorage.setItem('posify_hold_bills', JSON.stringify(state.holdBills));
        localStorage.setItem('posify_theme', state.theme);
    }

    // ----------------------------------------------------------------------
    // 4. RENDERING ENGINES
    // ----------------------------------------------------------------------

    // Render Product Catalog Cards
    function renderProductCatalog() {
        const grid = document.getElementById('productsGrid');
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
                <div class="empty-catalog-state" style="grid-column: 1 / -1;">
                    <i class="ri-search-eye-line"></i>
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
                        playErrorSound();
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
    // 4B. DRINK CUSTOMIZATION & MODIFIER MODAL LOGIC
    // ----------------------------------------------------------------------
    let currentCustomizingDrink = null;

    function openDrinkOptionsModal(product) {
        currentCustomizingDrink = product;
        
        const imgEl = document.getElementById('optDrinkImg');
        const nameEl = document.getElementById('optDrinkName');
        const priceEl = document.getElementById('optDrinkBasePrice');
        const noteInput = document.getElementById('optDrinkSpecialNote');

        if (imgEl) imgEl.src = product.img || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80';
        if (nameEl) nameEl.textContent = product.name;
        if (priceEl) priceEl.textContent = formatRupiah(product.price);
        if (noteInput) noteInput.value = '';

        // Reset pills to defaults
        document.querySelectorAll('#modalDrinkOptions .opt-pill').forEach(pill => {
            const group = pill.getAttribute('data-group');
            if (pill.getAttribute('data-val').includes('Dingin') || 
                pill.getAttribute('data-val') === 'Regular' || 
                pill.getAttribute('data-val').includes('Normal')) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });

        // Uncheck all addon checkboxes
        document.querySelectorAll('#modalDrinkOptions .addon-checkbox').forEach(cb => {
            cb.checked = false;
        });

        const iceSection = document.getElementById('iceModifierSection');
        if (iceSection) iceSection.style.display = 'block';

        updateDrinkFinalPricePreview();
        openModal('modalDrinkOptions');
    }

    function calculateCurrentDrinkModifiers() {
        if (!currentCustomizingDrink) return { finalPrice: 0, optionsText: '', modifiersList: [] };

        let extraPrice = 0;
        let selectedOptions = [];

        // Temperature
        const activeTemp = document.querySelector('#tempOptionGroup .opt-pill.active');
        if (activeTemp) {
            const val = activeTemp.getAttribute('data-val');
            selectedOptions.push(val);
        }

        // Size
        const activeSize = document.querySelector('#sizeOptionGroup .opt-pill.active');
        if (activeSize) {
            const val = activeSize.getAttribute('data-val');
            const price = parseInt(activeSize.getAttribute('data-price')) || 0;
            extraPrice += price;
            if (val !== 'Regular') selectedOptions.push(val);
        }

        // Sugar
        const activeSugar = document.querySelector('#sugarOptionGroup .opt-pill.active');
        if (activeSugar) {
            const val = activeSugar.getAttribute('data-val');
            const price = parseInt(activeSugar.getAttribute('data-price')) || 0;
            extraPrice += price;
            selectedOptions.push(val);
        }

        // Ice Level (only if cold)
        const isHot = activeTemp && activeTemp.getAttribute('data-val').includes('Hangat');
        if (!isHot) {
            const activeIce = document.querySelector('#iceOptionGroup .opt-pill.active');
            if (activeIce) {
                const val = activeIce.getAttribute('data-val');
                if (val !== 'Normal Ice') selectedOptions.push(val);
            }
        }

        // Add-ons
        document.querySelectorAll('#toppingOptionGroup .addon-checkbox:checked').forEach(cb => {
            const name = cb.getAttribute('data-name');
            const price = parseInt(cb.getAttribute('data-price')) || 0;
            extraPrice += price;
            selectedOptions.push(`+${name} (${formatRupiah(price)})`);
        });

        const finalPrice = currentCustomizingDrink.price + extraPrice;
        const optionsText = selectedOptions.join(' • ');

        return {
            basePrice: currentCustomizingDrink.price,
            extraPrice,
            finalPrice,
            optionsText,
            selectedOptions
        };
    }

    function updateDrinkFinalPricePreview() {
        const previewEl = document.getElementById('optDrinkFinalPrice');
        if (!previewEl || !currentCustomizingDrink) return;

        const { finalPrice } = calculateCurrentDrinkModifiers();
        previewEl.textContent = formatRupiah(finalPrice);
    }

    // Modal Drink Options Pill Click Delegation
    document.querySelectorAll('#modalDrinkOptions .opt-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const group = pill.getAttribute('data-group');
            document.querySelectorAll(`#modalDrinkOptions .opt-pill[data-group="${group}"]`).forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            if (group === 'temp') {
                const isHot = pill.getAttribute('data-val').includes('Hangat');
                const iceSection = document.getElementById('iceModifierSection');
                if (iceSection) iceSection.style.display = isHot ? 'none' : 'block';
            }

            updateDrinkFinalPricePreview();
        });
    });

    document.querySelectorAll('#modalDrinkOptions .addon-checkbox').forEach(cb => {
        cb.addEventListener('change', updateDrinkFinalPricePreview);
    });

    // Confirm Drink Options to Cart
    document.getElementById('btnConfirmDrinkOptions')?.addEventListener('click', () => {
        if (!currentCustomizingDrink) return;

        const { finalPrice, optionsText } = calculateCurrentDrinkModifiers();
        const specialNote = document.getElementById('optDrinkSpecialNote')?.value.trim() || '';

        // Generate unique cart item ID based on product ID and options signature
        const optionsSignature = optionsText + (specialNote ? `_${specialNote}` : '');
        const existing = state.cart.find(i => i.productId === currentCustomizingDrink.id && i.optionsText === optionsText && i.note === specialNote);

        if (existing) {
            if (existing.qty + 1 > currentCustomizingDrink.stock) {
                playErrorSound();
                showToast(`Stok tidak mencukupi (Tersisa: ${currentCustomizingDrink.stock})`, 'warning');
                return;
            }
            existing.qty += 1;
        } else {
            state.cart.push({
                id: 'CART-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
                productId: currentCustomizingDrink.id,
                name: currentCustomizingDrink.name,
                price: finalPrice,
                basePrice: currentCustomizingDrink.price,
                optionsText: optionsText,
                qty: 1,
                note: specialNote
            });
        }

        playBeepSound();
        saveState();
        renderCart();
        closeModal('modalDrinkOptions');
        showToast(`${currentCustomizingDrink.name} berhasil ditambahkan!`, 'success');
    });

    // Render Cart / Order Slip
    function renderCart() {
        const listEl = document.getElementById('cartItemsList');
        const countEl = document.getElementById('cartTotalItemsCount');
        const subtotalEl = document.getElementById('calcSubtotal');
        const taxEl = document.getElementById('calcTax');
        const grandTotalEl = document.getElementById('calcGrandTotal');
        const checkoutBtn = document.getElementById('btnProceedCheckout');
        const holdBillCountEl = document.getElementById('holdBillCount');
        const floatingBar = document.getElementById('mobileFloatingCartBar');
        const floatingBadge = document.getElementById('floatingCartBadge');
        const floatingTotal = document.getElementById('floatingCartTotal');
        const floatingCount = document.getElementById('floatingCartCount');
        const mobileNavBadge = document.getElementById('mobileNavCartBadge');
        const mMenuHoldCount = document.getElementById('mMenuHoldCount');

        if (holdBillCountEl) holdBillCountEl.textContent = state.holdBills.length;
        if (mMenuHoldCount) mMenuHoldCount.textContent = state.holdBills.length;

        if (state.cart.length === 0) {
            listEl.innerHTML = `
                <div class="cart-empty-view">
                    <i class="ri-shopping-cart-2-line"></i>
                    <h3>Keranjang Masih Kosong</h3>
                    <p>Klik menu di katalog atau gunakan pemindai barcode untuk menambahkan pesanan.</p>
                </div>
            `;
            if (countEl) countEl.textContent = '0';
            if (subtotalEl) subtotalEl.textContent = 'Rp 0';
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
        const tax = Math.round(subtotal * 0.10); // 10% PB1 Restaurant Tax
        const grandTotal = subtotal + tax;

        if (countEl) countEl.textContent = totalItemsCount;
        if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
        if (taxEl) taxEl.textContent = formatRupiah(tax);
        if (grandTotalEl) grandTotalEl.textContent = formatRupiah(grandTotal);
        if (checkoutBtn) checkoutBtn.disabled = false;

        // Mobile Floating Cart & Badges update
        if (floatingBar) floatingBar.classList.add('active');
        if (floatingBadge) floatingBadge.textContent = totalItemsCount;
        if (floatingTotal) floatingTotal.textContent = formatRupiah(grandTotal);
        if (floatingCount) floatingCount.textContent = `${totalItemsCount} item dipilih`;
        if (mobileNavBadge) mobileNavBadge.textContent = totalItemsCount;

        listEl.innerHTML = state.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-header">
                    <div>
                        <h5 class="cart-item-title">${item.name}</h5>
                        <span class="cart-item-unit-price">${formatRupiah(item.price)} / pcs</span>
                    </div>
                    <button class="btn-remove-item" data-remove="${item.id}" title="Hapus item">
                        <i class="ri-close-circle-line"></i>
                    </button>
                </div>
                ${item.optionsText ? `<div class="cart-item-options-badge"><i class="ri-sound-module-line"></i> ${item.optionsText}</div>` : ''}
                <div class="cart-item-controls">
                    <div class="qty-stepper">
                        <button class="qty-btn" data-minus="${item.id}">-</button>
                        <span class="qty-val">${item.qty}</span>
                        <button class="qty-btn" data-plus="${item.id}">+</button>
                    </div>
                    <span class="cart-item-subtotal">${formatRupiah(item.price * item.qty)}</span>
                </div>
                <input type="text" class="cart-item-note-input" data-note="${item.id}" placeholder="Catatan khusus (cth: pedas, es dipisah)..." value="${item.note || ''}">
            </div>
        `).join('');

        // Attach Stepper & Remove Event Handlers
        listEl.querySelectorAll('[data-plus]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-plus');
                updateCartQty(id, 1);
            });
        });

        listEl.querySelectorAll('[data-minus]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-minus');
                updateCartQty(id, -1);
            });
        });

        listEl.querySelectorAll('[data-remove]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-remove');
                removeFromCart(id);
            });
        });

        listEl.querySelectorAll('.cart-item-note-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = input.getAttribute('data-note');
                const target = state.cart.find(i => i.id === id);
                if (target) {
                    target.note = e.target.value;
                    saveState();
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // 5. CART OPERATIONS
    // ----------------------------------------------------------------------
    function addToCart(product) {
        const existing = state.cart.find(item => item.id === product.id);

        if (existing) {
            if (existing.qty + 1 > product.stock) {
                playErrorSound();
                showToast(`Stok tidak mencukupi (Tersisa: ${product.stock})`, 'warning');
                return;
            }
            existing.qty += 1;
        } else {
            state.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                qty: 1,
                note: ''
            });
        }

        playBeepSound();
        saveState();
        renderCart();
    }

    function updateCartQty(id, delta) {
        const item = state.cart.find(i => i.id === id);
        const product = state.products.find(p => p.id === id);

        if (!item) return;

        const newQty = item.qty + delta;

        if (newQty <= 0) {
            removeFromCart(id);
            return;
        }

        if (product && newQty > product.stock) {
            playErrorSound();
            showToast(`Maksimal stok tercapai (${product.stock} pcs)`, 'warning');
            return;
        }

        item.qty = newQty;
        playBeepSound();
        saveState();
        renderCart();
    }

    function removeFromCart(id) {
        state.cart = state.cart.filter(i => i.id !== id);
        saveState();
        renderCart();
    }

    function clearCart() {
        if (state.cart.length === 0) return;
        state.cart = [];
        state.customerName = '';
        state.tableNumber = '';
        document.getElementById('customerNameInput').value = '';
        document.getElementById('tableNumberInput').value = '';
        saveState();
        renderCart();
        showToast('Keranjang pesanan telah dikosongkan.', 'info');
    }

    // ----------------------------------------------------------------------
    // 6. CHECKOUT & PAYMENT PROCESSING
    // ----------------------------------------------------------------------
    function openCheckoutModal() {
        if (state.cart.length === 0) {
            showToast('Pilih menu terlebih dahulu sebelum bayar!', 'warning');
            return;
        }

        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = Math.round(subtotal * 0.10);
        const grandTotal = subtotal + tax;

        const dueDisplay = document.getElementById('checkoutCashTotalDue');
        const cashInput = document.getElementById('cashReceivedInput');
        const changeVal = document.getElementById('changeAmountDisplay');
        const changeBox = document.getElementById('changeResultBox');

        if (dueDisplay) dueDisplay.textContent = formatRupiah(grandTotal);
        if (cashInput) cashInput.value = grandTotal; // Default uang pas

        calculateCashChange(grandTotal, grandTotal);

        openModal('modalCheckout');
    }

    function calculateCashChange(dueAmount, receivedAmount) {
        const changeBox = document.getElementById('changeResultBox');
        const changeLabel = document.getElementById('changeLabel');
        const changeVal = document.getElementById('changeAmountDisplay');

        const diff = receivedAmount - dueAmount;

        if (diff >= 0) {
            changeBox.classList.remove('insufficient');
            changeLabel.textContent = 'Kembalian:';
            changeVal.textContent = formatRupiah(diff);
        } else {
            changeBox.classList.add('insufficient');
            changeLabel.textContent = 'Kurang:';
            changeVal.textContent = formatRupiah(Math.abs(diff));
        }
    }

    function processPaymentSubmission() {
        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = Math.round(subtotal * 0.10);
        const grandTotal = subtotal + tax;

        let payMethodName = 'Tunai (Cash)';
        let receivedAmount = grandTotal;

        if (state.activePayTab === 'tab-cash') {
            const cashInputVal = parseFloat(document.getElementById('cashReceivedInput').value) || 0;
            if (cashInputVal < grandTotal) {
                playErrorSound();
                showToast('Nominal uang diterima kurang dari total pembayaran!', 'warning');
                return;
            }
            receivedAmount = cashInputVal;
            payMethodName = 'Tunai (Cash)';
        } else if (state.activePayTab === 'tab-qris') {
            payMethodName = 'QRIS Instan';
            receivedAmount = grandTotal;
        } else if (state.activePayTab === 'tab-card') {
            payMethodName = 'Kartu Debit/EDC';
            receivedAmount = grandTotal;
        } else if (state.activePayTab === 'tab-ewallet') {
            payMethodName = 'E-Wallet';
            receivedAmount = grandTotal;
        } else {
            payMethodName = 'Transfer Bank';
            receivedAmount = grandTotal;
        }

        const changeAmount = receivedAmount - grandTotal;
        const customerName = document.getElementById('customerNameInput').value.trim() || 'Umum';
        const tableNumber = document.getElementById('tableNumberInput').value.trim() || '-';

        // Deduct Stock from Products
        state.cart.forEach(cartItem => {
            const prod = state.products.find(p => p.id === cartItem.id);
            if (prod) {
                prod.stock = Math.max(0, prod.stock - cartItem.qty);
            }
        });

        // Save Transaction Record
        const transactionRecord = {
            orderId: state.currentOrderId,
            dateTime: new Date().toISOString(),
            customerName: customerName,
            tableNumber: tableNumber,
            orderType: state.orderType,
            items: [...state.cart],
            subtotal: subtotal,
            tax: tax,
            grandTotal: grandTotal,
            payMethod: payMethodName,
            receivedAmount: receivedAmount,
            changeAmount: changeAmount,
            cashier: 'M. Ikhsan Anggara (Owner)'
        };

        state.transactions.unshift(transactionRecord);

        // Play Sound Feedback
        playCheckoutChime();

        // Close Checkout & Show Thermal Receipt
        closeModal('modalCheckout');
        populateThermalReceipt(transactionRecord);
        openModal('modalReceipt');

        // Reset Cart and New Order ID
        state.cart = [];
        state.currentOrderId = generateOrderId();
        document.getElementById('currentOrderIdDisplay').textContent = state.currentOrderId;
        document.getElementById('customerNameInput').value = '';
        document.getElementById('tableNumberInput').value = '';

        saveState();
        renderProductCatalog();
        renderCart();
        renderReports();
        showToast('Transaksi pembayaran berhasil diselesaikan!', 'success');
    }

    // ----------------------------------------------------------------------
    // 7. THERMAL RECEIPT GENERATOR
    // ----------------------------------------------------------------------
    function populateThermalReceipt(tx) {
        document.getElementById('rcptOrderNo').textContent = tx.orderId;
        const d = new Date(tx.dateTime);
        document.getElementById('rcptDateTime').textContent = d.toLocaleDateString('id-ID', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }) + ' WIB';

        document.getElementById('rcptCashierTable').textContent = `${tx.cashier} / ${tx.tableNumber || 'Take Away'}`;
        document.getElementById('rcptOrderType').textContent = tx.orderType === 'dine-in' ? 'Dine In' : tx.orderType === 'take-away' ? 'Take Away' : 'Delivery';

        const itemsContainer = document.getElementById('rcptItemsList');
        itemsContainer.innerHTML = tx.items.map(it => `
            <div class="receipt-item-row">
                <div>
                    <span class="receipt-item-name">${it.name}</span>
                    ${it.optionsText ? `<div style="font-size: 0.72rem; color: #374151; margin: 0.15rem 0;">• ${it.optionsText}</div>` : ''}
                    <div class="receipt-item-qty-price">${it.qty} x ${formatRupiah(it.price)}</div>
                    ${it.note ? `<small style="font-style: italic; color: #666;">Note: ${it.note}</small>` : ''}
                </div>
                <strong>${formatRupiah(it.price * it.qty)}</strong>
            </div>
        `).join('');

        document.getElementById('rcptSubtotal').textContent = formatRupiah(tx.subtotal);
        document.getElementById('rcptTax').textContent = formatRupiah(tx.tax);
        document.getElementById('rcptGrandTotal').textContent = formatRupiah(tx.grandTotal);
        document.getElementById('rcptPayMethod').textContent = tx.payMethod;
        document.getElementById('rcptPayReceived').textContent = formatRupiah(tx.receivedAmount);
        document.getElementById('rcptChange').textContent = formatRupiah(tx.changeAmount);
    }

    // ----------------------------------------------------------------------
    // 8. HOLD BILL (DRAFT ORDERS)
    // ----------------------------------------------------------------------
    function holdCurrentBill() {
        if (state.cart.length === 0) {
            showToast('Tidak ada item di keranjang untuk di-hold.', 'warning');
            return;
        }

        const draft = {
            id: 'HOLD-' + Math.floor(1000 + Math.random() * 9000),
            orderId: state.currentOrderId,
            dateTime: new Date().toISOString(),
            customerName: document.getElementById('customerNameInput').value.trim() || 'Pelanggan',
            tableNumber: document.getElementById('tableNumberInput').value.trim() || '-',
            orderType: state.orderType,
            items: [...state.cart],
            totalAmount: state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0)
        };

        state.holdBills.push(draft);
        state.cart = [];
        state.currentOrderId = generateOrderId();
        document.getElementById('currentOrderIdDisplay').textContent = state.currentOrderId;
        document.getElementById('customerNameInput').value = '';
        document.getElementById('tableNumberInput').value = '';

        saveState();
        renderCart();
        renderHoldBills();
        showToast(`Pesanan ${draft.customerName} berhasil disimpan sementara (Hold).`, 'success');
    }

    function renderHoldBills() {
        const container = document.getElementById('holdBillsContainer');
        if (!container) return;

        if (state.holdBills.length === 0) {
            container.innerHTML = '<p class="text-muted text-center py-4">Tidak ada pesanan yang di-hold saat ini.</p>';
            return;
        }

        container.innerHTML = state.holdBills.map(b => `
            <div style="background: var(--bg-card); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h5 style="font-size: 0.95rem; font-weight: 700;">${b.customerName} (${b.tableNumber})</h5>
                    <span style="font-size: 0.775rem; color: var(--text-muted);">${b.items.length} item • ${formatRupiah(b.totalAmount)}</span>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-secondary" data-delete-hold="${b.id}" style="padding: 0.4rem 0.75rem; color: var(--primary-rose);"><i class="ri-delete-bin-line"></i></button>
                    <button class="btn-primary-action" data-restore-hold="${b.id}" style="padding: 0.4rem 0.85rem; font-size: 0.825rem;"><i class="ri-play-line"></i> Lanjutkan</button>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('[data-restore-hold]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-restore-hold');
                restoreHoldBill(id);
            });
        });

        container.querySelectorAll('[data-delete-hold]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-delete-hold');
                state.holdBills = state.holdBills.filter(b => b.id !== id);
                saveState();
                renderHoldBills();
                renderCart();
            });
        });
    }

    function restoreHoldBill(id) {
        const draft = state.holdBills.find(b => b.id === id);
        if (!draft) return;

        state.cart = [...draft.items];
        state.currentOrderId = draft.orderId;
        document.getElementById('currentOrderIdDisplay').textContent = draft.orderId;
        document.getElementById('customerNameInput').value = draft.customerName;
        document.getElementById('tableNumberInput').value = draft.tableNumber;
        state.orderType = draft.orderType;

        // Remove from hold
        state.holdBills = state.holdBills.filter(b => b.id !== id);

        closeModal('modalHoldBills');
        saveState();
        renderCart();
        showToast(`Pesanan ${draft.customerName} siap dilanjutkan!`, 'success');
    }

    // ----------------------------------------------------------------------
    // 9. INVENTORY MANAGEMENT
    // ----------------------------------------------------------------------
    function renderInventoryTable() {
        const tbody = document.getElementById('inventoryTableBody');
        const countEl = document.getElementById('totalProductCount');
        if (!tbody) return;

        if (countEl) countEl.textContent = state.products.length;

        tbody.innerHTML = state.products.map(prod => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 0.6rem;">
                        <img src="${prod.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}" style="width: 34px; height: 34px; border-radius: 6px; object-fit: cover;">
                        <div>
                            <strong>${prod.name}</strong>
                            <div style="font-size: 0.725rem; color: var(--text-muted);">SKU: ${prod.barcode || '-'}</div>
                        </div>
                    </div>
                </td>
                <td><span style="text-transform: capitalize;">${prod.category}</span></td>
                <td><strong>${formatRupiah(prod.price)}</strong></td>
                <td>${prod.stock} pcs</td>
                <td>
                    <span class="product-badge-stock ${prod.stock <= 0 ? 'stock-out' : prod.stock <= 10 ? 'stock-low' : 'stock-in'}" style="position: static;">
                        ${prod.stock <= 0 ? 'Habis' : prod.stock <= 10 ? 'Menipis' : 'Tersedia'}
                    </span>
                </td>
                <td style="text-align: right;">
                    <button class="btn-header-icon" data-edit-prod="${prod.id}" style="width: 30px; height: 30px; font-size: 0.9rem; display: inline-flex;" title="Edit Produk"><i class="ri-edit-line"></i></button>
                    <button class="btn-header-icon" data-delete-prod="${prod.id}" style="width: 30px; height: 30px; font-size: 0.9rem; display: inline-flex; color: var(--primary-rose);" title="Hapus Produk"><i class="ri-delete-bin-line"></i></button>
                </td>
            </tr>
        `).join('');

        tbody.querySelectorAll('[data-edit-prod]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-edit-prod');
                const prod = state.products.find(p => p.id === id);
                if (prod) {
                    document.getElementById('editProductId').value = prod.id;
                    document.getElementById('prodNameInput').value = prod.name;
                    document.getElementById('prodCategorySelect').value = prod.category;
                    document.getElementById('prodPriceInput').value = prod.price;
                    document.getElementById('prodStockInput').value = prod.stock;
                    document.getElementById('prodBarcodeInput').value = prod.barcode || '';
                    document.getElementById('prodImgInput').value = prod.img || '';

                    document.getElementById('productFormTitle').innerHTML = '<i class="ri-edit-line"></i> Edit Produk';
                    document.getElementById('btnCancelEditProd').style.display = 'inline-block';
                }
            });
        });

        tbody.querySelectorAll('[data-delete-prod]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-delete-prod');
                if (confirm('Yakin ingin menghapus produk ini dari daftar katalog?')) {
                    state.products = state.products.filter(p => p.id !== id);
                    saveState();
                    renderInventoryTable();
                    renderProductCatalog();
                    showToast('Produk berhasil dihapus.', 'info');
                }
            });
        });
    }

    // Save New / Edited Product
    document.getElementById('productManageForm')?.addEventListener('submit', () => {
        const editId = document.getElementById('editProductId').value;
        const name = document.getElementById('prodNameInput').value.trim();
        const category = document.getElementById('prodCategorySelect').value;
        const price = parseInt(document.getElementById('prodPriceInput').value) || 0;
        const stock = parseInt(document.getElementById('prodStockInput').value) || 0;
        const barcode = document.getElementById('prodBarcodeInput').value.trim();
        const img = document.getElementById('prodImgInput').value.trim();

        if (editId) {
            const prod = state.products.find(p => p.id === editId);
            if (prod) {
                prod.name = name;
                prod.category = category;
                prod.price = price;
                prod.stock = stock;
                prod.barcode = barcode;
                if (img) prod.img = img;
            }
            showToast('Data produk berhasil diperbarui!', 'success');
        } else {
            const newProd = {
                id: 'PROD-' + String(state.products.length + 1).padStart(3, '0'),
                name: name,
                category: category,
                price: price,
                stock: stock,
                barcode: barcode || String(8991000 + state.products.length + 1),
                img: img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
            };
            state.products.push(newProd);
            showToast('Produk baru berhasil ditambahkan!', 'success');
        }

        // Reset form
        document.getElementById('productManageForm').reset();
        document.getElementById('editProductId').value = '';
        document.getElementById('productFormTitle').innerHTML = '<i class="ri-add-circle-line"></i> Tambah Produk Baru';
        document.getElementById('btnCancelEditProd').style.display = 'none';

        saveState();
        renderInventoryTable();
        renderProductCatalog();
    });

    document.getElementById('btnCancelEditProd')?.addEventListener('click', () => {
        document.getElementById('productManageForm').reset();
        document.getElementById('editProductId').value = '';
        document.getElementById('productFormTitle').innerHTML = '<i class="ri-add-circle-line"></i> Tambah Produk Baru';
        document.getElementById('btnCancelEditProd').style.display = 'none';
    });

    // ----------------------------------------------------------------------
    // 10. SALES REPORTS & ANALYTICS
    // ----------------------------------------------------------------------
    function renderReports() {
        const totalRevEl = document.getElementById('reportTotalRevenue');
        const totalTxEl = document.getElementById('reportTotalTxCount');
        const totalItemsEl = document.getElementById('reportTotalItemsSold');
        const avgOrderEl = document.getElementById('reportAvgOrderValue');
        const tbody = document.getElementById('transactionHistoryTableBody');

        const totalRevenue = state.transactions.reduce((sum, t) => sum + t.grandTotal, 0);
        const totalTxCount = state.transactions.length;
        const totalItemsSold = state.transactions.reduce((sum, t) => {
            return sum + t.items.reduce((s, it) => s + it.qty, 0);
        }, 0);
        const avgOrder = totalTxCount > 0 ? Math.round(totalRevenue / totalTxCount) : 0;

        if (totalRevEl) totalRevEl.textContent = formatRupiah(totalRevenue);
        if (totalTxEl) totalTxEl.textContent = `${totalTxCount} Trx`;
        if (totalItemsEl) totalItemsEl.textContent = `${totalItemsSold} Pcs`;
        if (avgOrderEl) avgOrderEl.textContent = formatRupiah(avgOrder);

        if (!tbody) return;

        if (state.transactions.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-muted text-center py-4">Belum ada riwayat transaksi penjualan.</td></tr>';
            return;
        }

        tbody.innerHTML = state.transactions.map(tx => {
            const d = new Date(tx.dateTime);
            const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) + ' ' + d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            return `
                <tr>
                    <td><strong>${tx.orderId}</strong></td>
                    <td style="font-size: 0.775rem; color: var(--text-muted);">${dateStr}</td>
                    <td>${tx.customerName}</td>
                    <td><span style="text-transform: capitalize;">${tx.orderType}</span></td>
                    <td><span style="font-size: 0.8rem; font-weight: 600;">${tx.payMethod}</span></td>
                    <td><strong style="color: var(--primary-cyan);">${formatRupiah(tx.grandTotal)}</strong></td>
                    <td style="text-align: right;">
                        <button class="btn-header" data-reprint="${tx.orderId}" style="height: 30px; font-size: 0.775rem; padding: 0 0.5rem; display: inline-flex;">
                            <i class="ri-printer-line"></i> Cetak Ulang
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        tbody.querySelectorAll('[data-reprint]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-reprint');
                const tx = state.transactions.find(t => t.orderId === id);
                if (tx) {
                    populateThermalReceipt(tx);
                    openModal('modalReceipt');
                }
            });
        });
    }

    // Export CSV Feature
    document.getElementById('btnExportReportCSV')?.addEventListener('click', () => {
        if (state.transactions.length === 0) {
            showToast('Belum ada transaksi untuk diekspor.', 'warning');
            return;
        }

        let csv = 'No. Order,Tanggal,Pelanggan,Meja,Tipe,Metode Bayar,Subtotal,Pajak,Total Akhir\n';
        state.transactions.forEach(t => {
            csv += `"${t.orderId}","${t.dateTime}","${t.customerName}","${t.tableNumber}","${t.orderType}","${t.payMethod}",${t.subtotal},${t.tax},${t.grandTotal}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Laporan_Penjualan_POSify_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        showToast('Laporan penjualan berhasil diekspor ke CSV!', 'success');
    });

    // ----------------------------------------------------------------------
    // 11. MODAL SYSTEM
    // ----------------------------------------------------------------------
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-close');
            closeModal(target);
        });
    });

    document.querySelectorAll('.pos-modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    });

    // ----------------------------------------------------------------------
    // 12. EVENT LISTENERS & SHORTCUTS
    // ----------------------------------------------------------------------

    // Header buttons
    document.getElementById('btnOpenInventory')?.addEventListener('click', () => {
        renderInventoryTable();
        openModal('modalInventory');
    });

    document.getElementById('btnOpenReports')?.addEventListener('click', () => {
        renderReports();
        openModal('modalReports');
    });

    document.getElementById('btnOpenHoldBills')?.addEventListener('click', () => {
        renderHoldBills();
        openModal('modalHoldBills');
    });

    document.getElementById('btnClearCart')?.addEventListener('click', clearCart);
    document.getElementById('btnProceedCheckout')?.addEventListener('click', openCheckoutModal);
    document.getElementById('btnSubmitPayment')?.addEventListener('click', processPaymentSubmission);
    document.getElementById('btnHoldCurrentBill')?.addEventListener('click', holdCurrentBill);
    document.getElementById('btnPrintReceiptBtn')?.addEventListener('click', () => window.print());

    // Category Pill Filters
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            state.selectedCategory = pill.getAttribute('data-category');
            renderProductCatalog();
        });
    });

    // Search Input
    const searchInput = document.getElementById('productSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    searchInput?.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (clearSearchBtn) clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
        renderProductCatalog();
    });

    clearSearchBtn?.addEventListener('click', () => {
        state.searchQuery = '';
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        renderProductCatalog();
    });

    // Barcode Simulation Button
    document.getElementById('btnScanBarcode')?.addEventListener('click', () => {
        const randomProduct = state.products[Math.floor(Math.random() * state.products.length)];
        if (randomProduct) {
            showToast(`Barcode Scanned: ${randomProduct.barcode} (${randomProduct.name})`, 'info');
            addToCart(randomProduct);
        }
    });

    // Order Type Buttons
    document.querySelectorAll('.order-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.order-type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.orderType = btn.getAttribute('data-type');
        });
    });

    // Payment Nav Tabs in Checkout
    document.querySelectorAll('.payment-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.payment-nav-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.payment-tab-content').forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            const targetPane = item.getAttribute('data-paytab');
            state.activePayTab = targetPane;
            const paneEl = document.getElementById(targetPane);
            if (paneEl) paneEl.classList.add('active');
        });
    });

    // Cash Input in Checkout Modal
    const cashInput = document.getElementById('cashReceivedInput');
    cashInput?.addEventListener('input', (e) => {
        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const grandTotal = subtotal + Math.round(subtotal * 0.10);
        const enteredVal = parseFloat(e.target.value) || 0;
        calculateCashChange(grandTotal, enteredVal);
    });

    // Quick Cash Chips
    document.querySelectorAll('.cash-chip-btn').forEach(chip => {
        chip.addEventListener('click', () => {
            const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const grandTotal = subtotal + Math.round(subtotal * 0.10);
            const type = chip.getAttribute('data-type');

            if (type === 'exact') {
                cashInput.value = grandTotal;
                calculateCashChange(grandTotal, grandTotal);
            } else {
                const val = parseFloat(chip.getAttribute('data-val')) || 0;
                cashInput.value = val;
                calculateCashChange(grandTotal, val);
            }
        });
    });

    // Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        state.theme = theme;
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
        }
        saveState();
    }

    applyTheme(state.theme);

    themeToggleBtn?.addEventListener('click', () => {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        showToast(`Tema diganti ke mode ${nextTheme.toUpperCase()}`, 'info');
    });

    // Fullscreen Toggle
    document.getElementById('fullscreenToggleBtn')?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    });

    // ----------------------------------------------------------------------
    // 13. MOBILE SPECIFIC NAVIGATION & INTERACTIONS
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

    // Floating Cart Click
    document.getElementById('btnFloatingViewCart')?.addEventListener('click', openMobileCartView);
    document.getElementById('btnMobileCloseCart')?.addEventListener('click', closeMobileCartView);

    // Mobile Bottom Nav Tabs
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

    // Mobile Quick Menu Sheet Tiles
    document.getElementById('mMenuInventory')?.addEventListener('click', () => {
        closeModal('modalMobileMenu');
        renderInventoryTable();
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
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        const mThemeIcon = document.getElementById('mMenuThemeIcon');
        if (mThemeIcon) {
            mThemeIcon.className = nextTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
        }
        showToast(`Tema diganti ke mode ${nextTheme.toUpperCase()}`, 'info');
    });

    // Google Maps Location Modal Handlers
    document.getElementById('btnOpenMapsFooter')?.addEventListener('click', () => {
        openModal('modalLocationMap');
    });

    document.getElementById('btnMobileOpenMaps')?.addEventListener('click', () => {
        closeModal('modalMobileMenu');
        openModal('modalLocationMap');
    });

    // Keyboard Shortcuts (F1, F2, F4, F8, Escape)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F1') {
            e.preventDefault();
            searchInput?.focus();
        } else if (e.key === 'F2') {
            e.preventDefault();
            renderInventoryTable();
            openModal('modalInventory');
        } else if (e.key === 'F4') {
            e.preventDefault();
            renderHoldBills();
            openModal('modalHoldBills');
        } else if (e.key === 'F8') {
            e.preventDefault();
            if (state.cart.length > 0) openCheckoutModal();
        } else if (e.key === 'Escape') {
            document.querySelectorAll('.pos-modal-overlay.active').forEach(m => m.classList.remove('active'));
            closeMobileCartView();
        }
    });

    // ----------------------------------------------------------------------
    // 14. INITIAL APP RENDER
    // ----------------------------------------------------------------------
    document.getElementById('currentOrderIdDisplay').textContent = state.currentOrderId;
    renderProductCatalog();
    renderCart();
});
