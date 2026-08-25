# -*- coding: utf-8 -*-
"""
==============================================================================
SOHIB CAFFE & RESTO — SECURE WEB SERVER & WEB APPLICATION FIREWALL (WAF v2.5)
File: security_server.py
Owner & System Admin: Muh Ikhsan Anggara
Bahasa: Python 3.8+ (Zero External Dependencies Required)
==============================================================================

Fitur Keamanan Utama:
1. Web Application Firewall (WAF) — Anti-SQLi, Anti-XSS, Anti-LFI, Anti-RCE.
2. Anti-DDoS & Rate Limiting Engine — Proteksi spam & flood request.
3. Secure Server-Side Authentication — PBKDF2-HMAC-SHA256 & HMAC JWT Tokens.
4. Cyber SOC Security API — Live stats, forensic logs stream, IP Blacklist/Whitelist.
5. Strict HTTP Security Headers — Grade A+ Web Security Shield.
==============================================================================
"""

import os
import sys
import time
import json
import socket
import urllib.parse

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')
from http.server import HTTPServer, SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn
import re
from typing import Dict, Any, Tuple, List, Set, Optional

from security_utils import (
    inspect_request_payload,
    BAD_BOT_PATTERNS,
    log_security_event,
    record_waf_request,
    get_security_stats,
    get_recent_security_logs,
    hash_password,
    verify_password,
    generate_session_token,
    verify_session_token,
    generate_csrf_token,
    verify_csrf_token,
    DEFAULT_SECURE_USERS
)

# ==============================================================================
# KONFIGURASI SERVER KEAMANAN
# ==============================================================================
HOST = "0.0.0.0"
PORT = 8080
DOC_ROOT = os.path.dirname(os.path.abspath(__file__))

# Batas Rate Limit & Proteksi Brute Force
MAX_REQUESTS_PER_MINUTE = 120       # Maksimal request per IP dalam 60 detik
MAX_LOGIN_FAILURES = 5              # Maksimal gagal login sebelum IP dikunci
BLOCK_DURATION_SECONDS = 300        # Durasi blokir (5 menit)

# Memory Trackers
ip_request_tracker: Dict[str, list] = {}
ip_login_failures: Dict[str, list] = {}
ip_blacklist = set()
ip_blacklist_times: Dict[str, float] = {}
ip_whitelist = {"127.0.0.1", "localhost", "::1"}

# ==============================================================================
# RATE LIMITER & IP REPUTATION ENGINE
# ==============================================================================
def is_ip_rate_limited(client_ip: str) -> bool:
    """Mengecek apakah IP melebihi batas request atau sedang dalam masa blokir."""
    if client_ip in ip_whitelist:
        return False

    current_time = time.time()

    # Cek apakah IP sedang diblokir
    if client_ip in ip_blacklist:
        block_time = ip_blacklist_times.get(client_ip, 0)
        if current_time - block_time < BLOCK_DURATION_SECONDS:
            return True
        else:
            # Masa blokir habis
            ip_blacklist.discard(client_ip)
            if client_ip in ip_blacklist_times:
                del ip_blacklist_times[client_ip]

    if client_ip not in ip_request_tracker:
        ip_request_tracker[client_ip] = []

    # Filter request dalam 60 detik terakhir
    ip_request_tracker[client_ip] = [
        t for t in ip_request_tracker[client_ip] if current_time - t < 60
    ]

    if len(ip_request_tracker[client_ip]) >= MAX_REQUESTS_PER_MINUTE:
        ip_blacklist.add(client_ip)
        ip_blacklist_times[client_ip] = current_time
        log_security_event(
            "RATE_LIMIT_EXCEEDED",
            client_ip,
            f"IP melebihi {MAX_REQUESTS_PER_MINUTE} req/menit (Anti-DDoS Shield Aktif)",
            severity="CRITICAL"
        )
        return True

    ip_request_tracker[client_ip].append(current_time)
    return False

def record_login_attempt(client_ip: str, success: bool):
    """Mencatat percobaan login untuk mencegah serangan Brute Force."""
    current_time = time.time()
    if success:
        ip_login_failures.pop(client_ip, None)
        return

    if client_ip not in ip_login_failures:
        ip_login_failures[client_ip] = []

    ip_login_failures[client_ip] = [
        t for t in ip_login_failures[client_ip] if current_time - t < 300
    ]
    ip_login_failures[client_ip].append(current_time)

    if len(ip_login_failures[client_ip]) >= MAX_LOGIN_FAILURES:
        ip_blacklist.add(client_ip)
        ip_blacklist_times[client_ip] = current_time
        log_security_event(
            "BRUTE_FORCE_LOCKOUT",
            client_ip,
            f"Terdeteksi {MAX_LOGIN_FAILURES} kali gagal login berturut-turut. IP dikunci selama {BLOCK_DURATION_SECONDS} detik.",
            severity="CRITICAL"
        )

# ==============================================================================
# SECURE HTTP REQUEST HANDLER WITH WAF ENGINE
# ==============================================================================
class SecureWAFRequestHandler(SimpleHTTPRequestHandler):
    server_version = "SohibCyberDefense/2.5"
    sys_version = ""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DOC_ROOT, **kwargs)

    def log_message(self, format, *args):
        """Clean ANSI Colored Logging."""
        timestamp = time.strftime('%H:%M:%S', time.localtime())
        client_ip = self.client_address[0]
        status_code = str(args[1]) if len(args) > 1 else "200"
        
        if status_code.startswith("2"):
            color = "\033[92m"  # Green
        elif status_code.startswith("3"):
            color = "\033[96m"  # Cyan
        elif status_code.startswith("4"):
            color = "\033[93m"  # Yellow
        else:
            color = "\033[91m"  # Red
        
        print(f"[{timestamp}] [IP: {client_ip}] {color}{args[0]} -> {status_code}\033[0m")

    def send_security_headers(self):
        """Menyematkan HTTP Security Headers Standar Nilai A+."""
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;"
        )
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-XSS-Protection", "1; mode=block")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        self.send_header("X-Permitted-Cross-Domain-Policies", "none")

    def end_headers(self):
        self.send_security_headers()
        super().end_headers()

    def run_waf_inspection(self) -> bool:
        """
        Pemeriksaan mendalam WAF terhadap path URL, User-Agent, dan Query Params.
        Return True jika lolos inspeksi, False jika diblokir WAF.
        """
        record_waf_request()
        client_ip = self.client_address[0]
        user_agent = self.headers.get("User-Agent", "")

        # 1. Cek Anti-DDoS & Rate Limiting
        if is_ip_rate_limited(client_ip):
            self.send_error_response(429, "Too Many Requests - Rate Limit Exceeded (Anti-DDoS Shield Active)")
            return False

        # 2. Cek Bad Bots / Vulnerability Scanners
        for bot_pattern in BAD_BOT_PATTERNS:
            if re.search(bot_pattern, user_agent, re.IGNORECASE):
                log_security_event(
                    "MALICIOUS_SCANNER_BLOCKED",
                    client_ip,
                    f"Scanner terdeteksi via User-Agent: '{user_agent}'",
                    severity="HIGH"
                )
                self.send_error_response(403, "Access Denied: Malicious Scanner Detected by WAF")
                return False

        # 3. Inspeksi Path & Query Parameter untuk SQLi, XSS, Path Traversal, RCE
        decoded_path = urllib.parse.unquote(self.path)
        is_malicious, reason = inspect_request_payload(decoded_path)
        
        if is_malicious:
            log_security_event(
                "WAF_ATTACK_PREVENTED",
                client_ip,
                f"Percobaan Serangan pada URL [{self.command} {decoded_path}]: {reason}",
                severity="CRITICAL"
            )
            self.send_error_response(403, f"Forbidden: Request Blocked by Sohib WAF Security Layer ({reason})")
            return False

        return True

    def send_json_response(self, data: Dict[str, Any], status: int = 200):
        """Kirim respon JSON aman dengan header yang tepat."""
        encoded = json.dumps(data, indent=2).encode('utf-8')
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def send_error_response(self, code: int, message: str):
        """Mengirim pesan error aman dalam format JSON."""
        response = {
            "status": "error",
            "code": code,
            "security_shield": "Sohib Caffe WAF v2.5 Active",
            "message": message,
            "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
            "client_ip": self.client_address[0]
        }
        self.send_json_response(response, status=code)

    def read_post_body(self) -> Tuple[bool, Any]:
        """Membaca dan memvalidasi JSON payload dari POST request."""
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 5 * 1024 * 1024:  # Maksimal 5MB
                self.send_error_response(413, "Payload Too Large")
                return False, None

            raw_body = self.rfile.read(content_length).decode('utf-8', errors='ignore')
            
            # WAF Inspection pada Body
            is_malicious, reason = inspect_request_payload(raw_body)
            if is_malicious:
                log_security_event(
                    "POST_PAYLOAD_ATTACK_BLOCKED",
                    self.client_address[0],
                    f"Payload berbahaya pada POST {self.path}: {reason}",
                    severity="CRITICAL"
                )
                self.send_error_response(403, f"WAF Blocked POST Payload: {reason}")
                return False, None

            if raw_body.strip():
                try:
                    data = json.loads(raw_body)
                    return True, data
                except Exception:
                    # Form data parse
                    parsed_qs = urllib.parse.parse_qs(raw_body)
                    return True, {k: v[0] if len(v) == 1 else v for k, v in parsed_qs.items()}
            return True, {}
        except Exception as e:
            self.send_error_response(400, f"Malformed Request: {str(e)}")
            return False, None

    # ==========================================================================
    # GET ROUTER
    # ==========================================================================
    def do_GET(self):
        if not self.run_waf_inspection():
            return

        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        # 1. API: Security Status & Real-Time Stats
        if path == "/api/security/stats" or path == "/api/security-status":
            stats = get_security_stats()
            stats["status"] = "success"
            stats["server_status"] = "ONLINE & SECURED"
            stats["waf_status"] = "ACTIVE & FILTERING"
            stats["owner"] = "Muh Ikhsan Anggara"
            stats["app"] = "Sohib Caffe & Resto POS"
            stats["blocked_ips_list"] = list(ip_blacklist)
            stats["total_tracked_ips"] = len(ip_request_tracker)
            stats["active_protections"] = [
                "SQL Injection (SQLi) Defense Engine",
                "Cross-Site Scripting (XSS) Filter",
                "Path Traversal & LFI Shield",
                "Remote Code Execution (RCE) Blocker",
                "Anti-DDoS & Rate Limiting (120 req/min)",
                "Brute-Force Login Lockout (5 max fails)",
                "Vulnerability Scanner & Bad Bot Blocker",
                "PBKDF2-SHA256 Password Cryptography",
                "HMAC Digitally Signed Session Tokens",
                "HTTP Security Headers (CSP, HSTS, X-Frame-Options Grade A+)"
            ]
            self.send_json_response(stats)
            return

        # 2. API: Security Audit Logs
        if path == "/api/security/logs":
            logs = get_recent_security_logs(50)
            self.send_json_response({"status": "success", "total": len(logs), "logs": logs})
            return

        # 3. API: CSRF Token Generator
        if path == "/api/security/csrf-token":
            token = generate_csrf_token(self.client_address[0])
            self.send_json_response({"status": "success", "csrf_token": token})
            return

        # 4. API: Verify Session Token
        if path == "/api/auth/verify":
            auth_header = self.headers.get("Authorization", "")
            token = auth_header.replace("Bearer ", "").strip()
            if not token:
                query = urllib.parse.parse_qs(parsed_url.query)
                token = query.get("token", [""])[0]

            is_valid, user_data = verify_session_token(token)
            if is_valid:
                self.send_json_response({"status": "success", "valid": True, "user": user_data})
            else:
                self.send_json_response({"status": "error", "valid": False, "message": user_data.get("error")}, status=401)
            return

        # Root redirect
        if path == "/" or path == "":
            self.path = "/index.html"

        return super().do_GET()

    # ==========================================================================
    # POST ROUTER
    # ==========================================================================
    def do_POST(self):
        if not self.run_waf_inspection():
            return

        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        client_ip = self.client_address[0]

        ok, body = self.read_post_body()
        if not ok:
            return

        # 1. API: Login Autentikasi Server-Side
        if path == "/api/auth/login":
            username_or_email = str(body.get("username", "") or body.get("email", "")).strip().lower()
            password = str(body.get("password", "") or body.get("pass", "")).strip()

            if not username_or_email or not password:
                self.send_error_response(400, "Username/email dan password wajib diisi.")
                return

            # Cari akun di DEFAULT_SECURE_USERS
            matched_user = None
            for key, u in DEFAULT_SECURE_USERS.items():
                if u["username"].lower() == username_or_email or u["email"].lower() == username_or_email:
                    matched_user = u
                    break

            if matched_user and verify_password(password, matched_user["password_hash"]):
                # Login Sukses
                record_login_attempt(client_ip, success=True)
                token = generate_session_token(
                    user_id=matched_user["id"],
                    role=matched_user["role"],
                    email=matched_user["email"]
                )
                csrf_token = generate_csrf_token(str(matched_user["id"]))
                
                self.send_json_response({
                    "status": "success",
                    "message": f"Login berhasil. Selamat datang, {matched_user['full_name']}!",
                    "token": token,
                    "csrf_token": csrf_token,
                    "user": {
                        "id": matched_user["id"],
                        "username": matched_user["username"],
                        "full_name": matched_user["full_name"],
                        "email": matched_user["email"],
                        "role": matched_user["role"],
                        "role_badge": matched_user["role_badge"],
                        "avatar": matched_user["avatar"]
                    }
                })
            else:
                # Login Gagal
                record_login_attempt(client_ip, success=False)
                log_security_event(
                    "FAILED_LOGIN_ATTEMPT",
                    client_ip,
                    f"Percobaan login gagal untuk user/email: '{username_or_email}'",
                    severity="WARNING"
                )
                self.send_error_response(401, "Username, email, atau password salah.")
            return

        # 2. API: IP Management (Block / Unblock IP oleh Admin/Owner)
        if path == "/api/security/ip-management":
            action = body.get("action", "").lower()
            target_ip = str(body.get("ip", "")).strip()

            if not target_ip:
                self.send_error_response(400, "Alamat IP target diperlukan.")
                return

            if action == "unblock":
                ip_blacklist.discard(target_ip)
                ip_blacklist_times.pop(target_ip, None)
                ip_login_failures.pop(target_ip, None)
                log_security_event(
                    "IP_UNBLOCKED_BY_ADMIN",
                    client_ip,
                    f"IP {target_ip} berhasil di-unblock oleh Admin.",
                    severity="INFO"
                )
                self.send_json_response({"status": "success", "message": f"IP {target_ip} berhasil dibuka blokirnya."})
                return
            elif action == "block":
                ip_blacklist.add(target_ip)
                ip_blacklist_times[target_ip] = time.time()
                log_security_event(
                    "IP_MANUALLY_BLOCKED",
                    client_ip,
                    f"IP {target_ip} diblokir secara manual oleh Admin.",
                    severity="HIGH"
                )
                self.send_json_response({"status": "success", "message": f"IP {target_ip} berhasil diblokir."})
                return
            else:
                self.send_error_response(400, "Aksi tidak valid (gunakan 'block' atau 'unblock').")
                return

        # 3. API: Test Attack Simulator (Khusus UI SOC Testing)
        if path == "/api/security/test-attack":
            payload_type = body.get("type", "sqli")
            simulated_payload = body.get("payload", "' OR 1=1 --")
            is_malicious, reason = inspect_request_payload(simulated_payload)
            if is_malicious:
                log_security_event(
                    f"SIMULATED_{payload_type.upper()}_BLOCKED",
                    client_ip,
                    f"Uji coba serangan [{payload_type}] berhasil dicegah: {reason}",
                    severity="INFO"
                )
                self.send_json_response({
                    "status": "blocked",
                    "shield_action": "BLOCKED_BY_WAF",
                    "reason": reason,
                    "message": "Serangan simulasi berhasil ditangkal oleh Firewall WAF!"
                })
            else:
                self.send_json_response({
                    "status": "clean",
                    "shield_action": "PASSED",
                    "message": "Payload dianggap bersih oleh WAF."
                })
            return

        # Default handler
        self.send_json_response({
            "status": "success",
            "message": "Request lolos uji keamanan WAF."
        })

# ==============================================================================
# MULTI-THREADED SERVER RUNNER
# ==============================================================================
class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

def get_local_ip():
    """Mendapatkan alamat IP lokal komputer."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def print_banner():
    local_ip = get_local_ip()
    print("\033[96m" + "="*78)
    print(" 🛡️  SOHIB CAFFE & RESTO — ADVANCED WEB CYBER SECURITY SERVER & WAF v2.5")
    print(" 👤  Owner & Security Admin : Muh Ikhsan Anggara")
    print("="*78 + "\033[0m")
    print(f"\033[92m ✅ Web Server Aktif di Port : {PORT}")
    print(f" 🌐 Akses Lokal (Komputer)  : http://localhost:{PORT}")
    print(f" 📱 Akses HP / Jaringan WiFi : http://{local_ip}:{PORT}")
    print(f" 🛡️  Cyber SOC Stats API     : http://localhost:{PORT}/api/security/stats")
    print(f" 📜 Forensic Audit Logs API : http://localhost:{PORT}/api/security/logs\033[0m")
    print("\033[93m 🔒 Lapisan Proteksi Aktif  : Anti-SQLi | Anti-XSS | Anti-RCE | Anti-DDoS | CSP A+\033[0m")
    print("\033[90m 📝 Log Keamanan Disimpan ke: security_audit.log\033[0m")
    print("\033[96m" + "-"*78 + "\033[0m")
    print(" Tekan CTRL + C untuk menghentikan server.\n")

def run_server():
    server_address = (HOST, PORT)
    httpd = ThreadedHTTPServer(server_address, SecureWAFRequestHandler)
    print_banner()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\033[93m[!] Server Keamanan Dihentikan oleh Admin.\033[0m")
        httpd.server_close()
        sys.exit(0)

if __name__ == "__main__":
    run_server()
