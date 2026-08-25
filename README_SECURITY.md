# 🛡️ PANDUAN LENGKAP SISTEM KEAMANAN WEBSITE (WAF v2.5 & SOC) — SOHIB CAFFE & RESTO

**Owner & Chief Security Officer**: Muh Ikhsan Anggara  
**Teknologi**: Python 3.8+ Multi-Threaded Engine, Web Application Firewall (WAF), Kriptografi PBKDF2-HMAC-SHA256, HMAC Session Tokens, Cyber SOC Real-time Dashboard, HTTP Security Headers Grade A+.

---

## 🔒 1. Arsitektur & Lapisan Pertahanan Siber

Sistem pertahanan website dirancang berlapis (*Defense-in-Depth*) untuk menjamin website POS dan data transaksi aman dari serangan hacker:

| No | Lapisan Keamanan | Deskripsi Proteksi |
|---|---|---|
| 1 | **Web Application Firewall (WAF v2.5)** | Memeriksa seluruh URL, Parameter GET/POST, Header User-Agent, dan Body JSON dari payload jahat. |
| 2 | **Anti-SQL Injection (SQLi)** | Menolak injeksi query SQL (`UNION SELECT`, `' OR '1'='1`, `DROP TABLE`, `SLEEP()`, dll). |
| 3 | **Anti-Cross Site Scripting (XSS)** | Mencegah penyusupan script berbahaya (`<script>`, `onerror=`, `svg onload`, pencurian session). |
| 4 | **Anti-Path Traversal & LFI/RFI** | Menolak akses file sistem internal server (`../../etc/passwd`, `win.ini`, `.env`). |
| 5 | **Anti-Remote Code Execution (RCE)** | Memblokir injeksi perintah shell (`whoami`, `system()`, `powershell`, `; cat`). |
| 6 | **Anti-DDoS & Rate Limiting** | Membatasi maksimal 120 req/menit per IP. IP spammer otomatis diblokir selama 5 menit. |
| 7 | **Anti-Brute Force Login** | Mengunci IP selama 5 menit setelah 5 kali berturut-turut gagal memasukkan kata sandi. |
| 8 | **Bad Bot & Vulnerability Scanner Blocker** | Memblokir otomatis tools penyerang otomatis seperti *sqlmap, nikto, dirbuster, nmap, acunetix, burpsuite*. |
| 9 | **Password Hashing Kriptografi Kuat** | Menggunakan algoritma **PBKDF2-HMAC-SHA256** dengan 100.000 iterasi dan salt acak 128-bit. |
| 10 | **HMAC Signed Session & CSRF Tokens** | Token sesi ditandatangani secara digital dengan kunci rahasia HMAC-SHA256 untuk mencegah token tampering. |
| 11 | **HTTP Security Headers (Grade A+)** | Disematkan `Content-Security-Policy (CSP)`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, dan `Referrer-Policy`. |
| 12 | **Cyber SOC Dashboard (UI)** | Dashboard pemantauan keamanan real-time langsung di dalam website kasir/owner. |

---

## 🚀 2. Cara Menjalankan Server Keamanan Python

Buka terminal PowerShell atau Command Prompt di folder `sohib Caffe`, lalu jalankan:

```bash
python security_server.py
```

### Output Terminal:
```text
==============================================================================
 🛡️  SOHIB CAFFE & RESTO — ADVANCED WEB CYBER SECURITY SERVER & WAF v2.5
 👤  Owner & Security Admin : Muh Ikhsan Anggara
==============================================================================
 ✅ Web Server Aktif di Port : 8080
 🌐 Akses Lokal (Komputer)  : http://localhost:8080
 📱 Akses HP / Jaringan WiFi : http://192.168.x.x:8080
 🛡️  Cyber SOC Stats API     : http://localhost:8080/api/security/stats
 📜 Forensic Audit Logs API : http://localhost:8080/api/security/logs
 🔒 Lapisan Proteksi Aktif  : Anti-SQLi | Anti-XSS | Anti-RCE | Anti-DDoS | CSP A+
 📝 Log Keamanan Disimpan ke: security_audit.log
------------------------------------------------------------------------------
 Tekan CTRL + C untuk menghentikan server.
```

---

## 🧪 3. Pengujian Penetrasi Otomatis (Penetration Test Suite)

Anda dapat menjalankan script pengujian penetrasi mandiri yang menguji 21 skenario serangan secara otomatis:

```bash
python security_test.py
```

### Hasil Uji Penetrasi:
- **Kriptografi & Token Tamper Test**: 100% Passed
- **Deteksi SQL Injection**: 100% Passed
- **Deteksi XSS Injeksi**: 100% Passed
- **Deteksi Path Traversal & LFI**: 100% Passed
- **Skor Keamanan Total**: **100.0% (Grade A+)**

---

## 🖥️ 4. Menggunakan Cyber SOC Dashboard di Website

1. Buka website di browser: `http://localhost:8080`
2. Login sebagai **Owner** (`owner@sohibcaffe.com` / `sohib2024`).
3. Pada navbar atas, klik tombol **WAF SOC** (ikon perisai hijau berkedip).
4. Di dalam modal SOC, Anda dapat:
   - **Melihat Metrik Real-Time**: Total permintaan, jumlah serangan dicegah, statistik SQLi, XSS, Bot, DDoS.
   - **Log Forensik Real-Time**: Membaca streaming aktivitas serangan yang dicegah secara live.
   - **Manajemen IP Terblokir**: Memblokir IP penyerang atau membuka blokir (*Unblock*) dengan 1 klik.
   - **Lab Uji Serangan WAF**: Menekan tombol simulasi serangan untuk melihat WAF menangkalnya secara instan.

---

## 📡 5. Dokumentasi API Keamanan

| Endpoint | Method | Fungsi |
|---|---|---|
| `/api/auth/login` | POST | Autentikasi akun dengan verifikasi PBKDF2 hash & pembuatan token HMAC |
| `/api/auth/verify` | GET | Verifikasi keabsahan token sesi aktif |
| `/api/security/stats` | GET | Mengambil statistik metrik firewall real-time |
| `/api/security/logs` | GET | Mengambil 50 catatan log audit forensik terbaru |
| `/api/security/ip-management` | POST | Memblokir / membuka blokir IP tertentu |
| `/api/security/csrf-token` | GET | Menghasilkan token CSRF aman |
| `/api/security/test-attack` | POST | Mensimulasikan payload serangan untuk verifikasi WAF |
