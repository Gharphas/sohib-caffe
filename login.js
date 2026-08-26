/**
 * SOHIB CAFFE & RESTO — Authentication Script (login.js)
 * Connected to POS Dashboard (index.html)
 */

let currentRole = null;
let soundEnabled = true;
let redirectTimer = null;

// Preset Demo Accounts for Sohib Caffe & Resto
const DEMO_ACCOUNTS = {
    owner: {
        roleName: 'Owner & General Manager',
        email: 'owner@sohibcaffe.com',
        pass: 'sohib2024',
        name: 'M. Ikhsan Anggara',
        roleBadge: 'Owner',
        avatar: 'MIA',
        rawRole: 'owner'
    },
    admin: {
        roleName: 'Cyber Security Admin (SOC)',
        email: 'admin@sohibcaffe.com',
        pass: 'admin2024',
        name: 'Admin Keamanan Siber',
        roleBadge: 'Admin Security',
        avatar: 'ADM',
        rawRole: 'admin'
    },
    kasir: {
        roleName: 'Kasir Utama (Shift 1)',
        email: 'kasir@sohibcaffe.com',
        pass: 'kasir1234',
        name: 'Fajar Pratama',
        roleBadge: 'Kasir',
        avatar: 'FP',
        rawRole: 'kasir'
    },
    barista: {
        roleName: 'Barista & Staff',
        email: 'barista@sohibcaffe.com',
        pass: 'barista1234',
        name: 'Rian Anggara',
        roleBadge: 'Barista',
        avatar: 'RA',
        rawRole: 'barista'
    }
};

/* 1. PARTICLES */
function initSteamParticles() {
    const container = document.getElementById('steamContainer');
    if (!container) return;

    for (let i = 0; i < 14; i++) {
        const p = document.createElement('div');
        p.className = 'steam-particle';
        const sz = Math.random() * 50 + 20;
        p.style.width = `${sz}px`;
        p.style.height = `${sz}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.animationDuration = `${Math.random() * 5 + 6}s`;
        p.style.animationDelay = `-${Math.random() * 7}s`;
        container.appendChild(p);
    }
}

/* 2. AUDIO SYNTHESIZER */
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function playSound(type) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'success') {
            const notes = [659.25, 830.61, 987.77];
            notes.forEach((freq, idx) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g);
                g.connect(ctx.destination);
                o.type = 'triangle';
                o.frequency.setValueAtTime(freq, now + idx * 0.08);
                g.gain.setValueAtTime(0.08, now + idx * 0.08);
                g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);
                o.start(now + idx * 0.08);
                o.stop(now + idx * 0.08 + 0.4);
            });
        } else if (type === 'error') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        }
    } catch (e) {}
}

function toggleSoundAmbience() {
    soundEnabled = !soundEnabled;
    const soundIcon = document.getElementById('soundIcon');
    const soundText = document.getElementById('soundText');

    if (soundEnabled) {
        soundIcon.className = 'fa-solid fa-volume-high';
        soundText.textContent = 'Suara: Aktif';
        showToast('Efek Suara Diaktifkan 🔊', 'info');
        playSound('click');
    } else {
        soundIcon.className = 'fa-solid fa-volume-xmark';
        soundText.textContent = 'Suara: Hening';
        showToast('Efek Suara Dimatikan 🔇', 'info');
    }
}

/* 3. TOAST NOTIFICATIONS */
function showToast(message, type = 'info', title = '') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info');
    let defaultTitle = type === 'success' ? 'Berhasil' : (type === 'error' ? 'Peringatan' : 'Informasi');

    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${iconClass}"></i></div>
        <div class="toast-body">
            <h5>${title || defaultTitle}</h5>
            <p>${message}</p>
        </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 350);
    }, 3500);
}

/* 4. TAB SWITCHER */
function switchAuthTab(mode) {
    playSound('click');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const tabIndicator = document.getElementById('tabIndicator');
    const formLogin = document.getElementById('formLogin');
    const formRegister = document.getElementById('formRegister');

    if (mode === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        tabIndicator.classList.remove('register-mode');
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
    } else {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        tabIndicator.classList.add('register-mode');
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
    }
}

/* 5. QUICK DEMO AUTO-FILL */
function fillDemo(roleKey) {
    playSound('click');
    switchAuthTab('login');

    const account = DEMO_ACCOUNTS[roleKey];
    if (!account) return;

    currentRole = roleKey;
    document.getElementById('loginEmail').value = account.email;
    document.getElementById('loginPassword').value = account.pass;

    const roleTag = document.getElementById('activeRoleTag');
    const roleLabel = document.getElementById('roleLabel');

    roleLabel.innerHTML = `<i class="fa-solid fa-user-shield"></i> Terpilih: <strong>${account.roleName}</strong> (${account.name})`;
    roleTag.classList.remove('hidden');

    showToast(`Akun ${account.roleName} terisi! Klik 'Masuk Sekarang' untuk ke kasir.`, 'info', 'Auto-fill Demo');
}

function clearSelectedRole() {
    playSound('click');
    currentRole = null;
    document.getElementById('activeRoleTag').classList.add('hidden');
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

/* 6. PASSWORD TOGGLE */
function togglePasswordVisibility(inputId, btnElement) {
    playSound('click');
    const input = document.getElementById(inputId);
    if (!input) return;
    const icon = btnElement.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa-regular fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fa-regular fa-eye';
    }
}

/* 7. PASSWORD STRENGTH */
function checkPasswordStrength(password) {
    const progress = document.getElementById('strengthProgress');
    const label = document.getElementById('strengthText');
    if (!progress || !label) return;

    if (!password) {
        progress.style.width = '0%';
        label.textContent = 'Kekuatan Sandi: Belum diisi';
        label.style.color = 'var(--text-muted)';
        return;
    }

    let score = 0;
    if (password.length >= 6) score += 25;
    if (password.length >= 10) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;

    score = Math.min(100, score);
    progress.style.width = `${score}%`;

    if (score < 40) {
        progress.style.backgroundColor = '#e74c3c';
        label.textContent = 'Kekuatan Sandi: Lemah';
        label.style.color = '#e74c3c';
    } else if (score < 75) {
        progress.style.backgroundColor = '#f39c12';
        label.textContent = 'Kekuatan Sandi: Sedang';
        label.style.color = '#f39c12';
    } else {
        progress.style.backgroundColor = '#2ecc71';
        label.textContent = 'Kekuatan Sandi: Sangat Kuat & Aman! 🔒';
        label.style.color = '#2ecc71';
    }
}

/* 8. FORM SUBMISSION & SECURE BACKEND AUTH */
async function handleLoginSubmit(event) {
    event.preventDefault();
    playSound('click');

    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value.trim();
    const btnSubmit = document.getElementById('btnLoginSubmit');
    const btnText = btnSubmit.querySelector('.btn-text');
    const btnSpinner = btnSubmit.querySelector('.btn-spinner');

    if (!email || !pass) {
        playSound('error');
        showToast('Harap masukkan email/username dan kata sandi.', 'error');
        return;
    }

    // Loading State
    btnSubmit.disabled = true;
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');

    let userData = null;
    let backendSuccess = false;

    // 1. Coba Autentikasi Kriptografi ke Server Python /api/auth/login
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, pass: pass })
        });

        if (response.ok) {
            const result = await response.json();
            if (result.status === 'success') {
                backendSuccess = true;
                const u = result.user;
                userData = {
                    name: u.full_name,
                    role: u.role_badge || u.role,
                    roleBadge: u.role === 'owner' ? 'Owner' : (u.role === 'admin' ? 'Admin Security' : (u.role === 'kasir' ? 'Kasir' : (u.role === 'barista' ? 'Barista' : 'Member'))),
                    rawRole: u.role,
                    avatar: u.avatar || 'US',
                    email: u.email,
                    token: result.token,
                    csrf_token: result.csrf_token,
                    loginTime: new Date().toLocaleTimeString('id-ID')
                };
                if (result.token) sessionStorage.setItem('sohib_auth_token', result.token);
                if (result.csrf_token) sessionStorage.setItem('sohib_csrf_token', result.csrf_token);
            }
        } else if (response.status === 401) {
            const errResult = await response.json();
            btnSubmit.disabled = false;
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
            playSound('error');
            showToast(errResult.message || 'Email atau kata sandi tidak cocok.', 'error', 'Gagal Masuk');
            return;
        } else if (response.status === 403) {
            btnSubmit.disabled = false;
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
            playSound('error');
            showToast('Akses diblokir oleh Firewall WAF.', 'error', 'WAF Shield Blocked');
            return;
        } else if (response.status === 429) {
            btnSubmit.disabled = false;
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
            playSound('error');
            showToast('Terlalu banyak percobaan login gagal. IP dikunci sementara (Anti-Brute Force).', 'error', 'IP Lockout');
            return;
        }
    } catch (e) {
        // Fallback offline mode bila server backend belum dijalankan
    }

    // 2. Client-side Fallback Authentication jika offline
    if (!backendSuccess) {
        if (typeof SohibDB !== 'undefined') {
            const authResult = SohibDB.authenticateUser(email, pass);
            if (authResult.success) {
                const dbUser = authResult.user;
                userData = {
                    name: dbUser.full_name,
                    role: dbUser.role_badge || dbUser.role,
                    roleBadge: dbUser.role === 'owner' ? 'Owner' : (dbUser.role === 'admin' ? 'Admin Security' : (dbUser.role === 'kasir' ? 'Kasir' : (dbUser.role === 'barista' ? 'Barista' : 'Member'))),
                    rawRole: dbUser.role,
                    avatar: dbUser.avatar || 'US',
                    email: dbUser.email,
                    phone: dbUser.phone || '',
                    loginTime: new Date().toLocaleTimeString('id-ID')
                };
            }
        }

        if (!userData) {
            if (currentRole && DEMO_ACCOUNTS[currentRole]) {
                const acc = DEMO_ACCOUNTS[currentRole];
                userData = {
                    name: acc.name,
                    role: acc.roleName,
                    roleBadge: acc.roleBadge,
                    rawRole: acc.rawRole || currentRole,
                    avatar: acc.avatar,
                    email: email,
                    loginTime: new Date().toLocaleTimeString('id-ID')
                };
            } else {
                const cleanName = email.split('@')[0];
                userData = {
                    name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
                    role: 'Kasir / Member',
                    roleBadge: 'Member',
                    rawRole: 'member',
                    avatar: cleanName.substring(0, 2).toUpperCase(),
                    email: email,
                    loginTime: new Date().toLocaleTimeString('id-ID')
                };
            }
        }
    }

    btnSubmit.disabled = false;
    btnText.classList.remove('hidden');
    btnSpinner.classList.add('hidden');

    // Save active user to localStorage for index.html
    try {
        localStorage.setItem('sohib_active_user', JSON.stringify(userData));
    } catch (e) {}

    playSound('success');
    showToast(`Login berhasil! Mengarahkan ke sistem Sohib Caffe...`, 'success');
    openSuccessModal(userData);
}

function handleRegisterSubmit(event) {
    event.preventDefault();
    playSound('click');

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phoneInput = document.getElementById('regPhone');
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const pass = document.getElementById('regPassword').value;
    const btnSubmit = document.getElementById('btnRegSubmit');
    const btnText = btnSubmit.querySelector('.btn-text');
    const btnSpinner = btnSubmit.querySelector('.btn-spinner');

    if (!name || !email || !pass) {
        playSound('error');
        showToast('Mohon lengkapi data pendaftaran.', 'error');
        return;
    }

    btnSubmit.disabled = true;
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');

    setTimeout(() => {
        btnSubmit.disabled = false;
        btnText.classList.remove('hidden');
        btnSpinner.classList.add('hidden');

        // Simpan Akun Baru Langsung ke Database (SohibDB)
        if (typeof SohibDB !== 'undefined') {
            const result = SohibDB.addUser({
                full_name: name,
                email: email,
                phone: phone,
                pass: pass,
                role: 'member',
                role_badge: 'Member Pelanggan'
            });

            if (!result.success) {
                playSound('error');
                showToast(result.message, 'error', 'Pendaftaran Gagal');
                return;
            }
        }

        playSound('success');
        showToast('Pendaftaran akun berhasil & tersimpan di database! Silakan masuk.', 'success', 'Akun Tersimpan');
        switchAuthTab('login');
        document.getElementById('loginEmail').value = email;
        document.getElementById('loginPassword').value = pass;
    }, 900);
}

/* 9. SOCIAL LOGIN */
function simulateSocialLogin(provider) {
    playSound('click');
    showToast(`Menghubungkan ke otentikasi ${provider}...`, 'info');

    setTimeout(() => {
        const userData = {
            name: `${provider} User`,
            role: 'Kasir / Member',
            roleBadge: 'Member',
            avatar: provider.substring(0, 2).toUpperCase(),
            email: `user@${provider.toLowerCase()}.com`,
            loginTime: new Date().toLocaleTimeString('id-ID')
        };
        try {
            localStorage.setItem('sohib_active_user', JSON.stringify(userData));
        } catch (e) {}

        playSound('success');
        openSuccessModal(userData);
    }, 800);
}

/* 10. FORGOT PASSWORD */
function openForgotModal() {
    playSound('click');
    document.getElementById('forgotModal').classList.remove('hidden');
}

function closeForgotModal() {
    playSound('click');
    document.getElementById('forgotModal').classList.add('hidden');
}

function handleForgotSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();
    closeForgotModal();
    playSound('success');
    showToast(`Tautan reset sandi dikirim ke ${email}.`, 'success', 'Email Terkirim');
}

/* 11. SUCCESS MODAL & REDIRECT FLOW */
function openSuccessModal(user) {
    const modal = document.getElementById('successModal');
    const previewName = document.getElementById('previewName');
    const previewRole = document.getElementById('previewRole');
    const previewAvatar = document.getElementById('previewAvatar');
    const redirectFill = document.getElementById('redirectFill');
    const timerDisplay = document.getElementById('countdownTimer');

    previewName.textContent = user.name;
    previewRole.textContent = `Status: ${user.role}`;
    previewAvatar.textContent = user.avatar;

    modal.classList.remove('hidden');

    setTimeout(() => {
        if (redirectFill) redirectFill.style.width = '100%';
    }, 50);

    let count = 2;
    if (timerDisplay) timerDisplay.textContent = count;

    if (redirectTimer) clearInterval(redirectTimer);
    redirectTimer = setInterval(() => {
        count--;
        if (timerDisplay && count >= 0) timerDisplay.textContent = count;
        if (count <= 0) {
            clearInterval(redirectTimer);
            redirectToMainApp();
        }
    }, 800);
}

function redirectToMainApp() {
    window.location.href = 'index.html';
}

function closeSuccessModal() {
    redirectToMainApp();
}

/* INIT */
document.addEventListener('DOMContentLoaded', () => {
    initSteamParticles();

    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('forgotModal')) closeForgotModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeForgotModal();
    });
});
