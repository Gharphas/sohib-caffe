# -*- coding: utf-8 -*-
"""
==============================================================================
SOHIB CAFFE & RESTO — SECURITY ENGINE & CRYPTOGRAPHY UTILITIES (security_utils.py)
Owner: Muh Ikhsan Anggara
Deskripsi: Modul enkripsi, hashing password, sanitasi input, token JWT HMAC,
           CSRF protection, dan pendeteksi serangan siber (WAF Core Engine).
==============================================================================
"""

import re
import hmac
import hashlib
import secrets
import base64
import json
import time
import threading
from typing import Dict, Any, Tuple, List, Optional

# Secret key untuk HMAC hashing & token signing
SECRET_KEY = secrets.token_hex(32)

# ==============================================================================
# 1. ENKRIPSI & HASHING KATA SANDI (PBKDF2-HMAC-SHA256)
# ==============================================================================
def hash_password(password: str, salt: Optional[str] = None) -> str:
    """
    Menghasilkan password hash aman dengan algoritma PBKDF2-HMAC-SHA256 (100.000 iterasi).
    Format output: pbkdf2_sha256$iterations$salt$hash
    """
    if not salt:
        salt = secrets.token_hex(16)
    iterations = 100000
    key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('utf-8'),
        iterations,
        dklen=32
    )
    b64_hash = base64.b64encode(key).decode('ascii')
    return f"pbkdf2_sha256${iterations}${salt}${b64_hash}"

def verify_password(password: str, hashed_password: str) -> bool:
    """
    Memverifikasi apakah password cocok dengan hash yang tersimpan secara timing-attack safe.
    """
    try:
        parts = hashed_password.split('$')
        if len(parts) != 4 or parts[0] != 'pbkdf2_sha256':
            return False
        iterations = int(parts[1])
        salt = parts[2]
        expected_hash = parts[3]

        key = hashlib.pbkdf2_hmac(
            'sha256',
            password.encode('utf-8'),
            salt.encode('utf-8'),
            iterations,
            dklen=32
        )
        calculated_hash = base64.b64encode(key).decode('ascii')
        return hmac.compare_digest(expected_hash, calculated_hash)
    except Exception:
        return False

# ==============================================================================
# 2. DEFAULT SECURE USER DATABASE DENGAN PBKDF2 HASH
# ==============================================================================
# Pre-computed secure password hashes
DEFAULT_SECURE_USERS = {
    "owner": {
        "id": 1,
        "username": "owner",
        "email": "owner@sohibcaffe.com",
        "full_name": "Muh Ikhsan Anggara",
        "role": "owner",
        "role_badge": "Owner & General Manager",
        "avatar": "MIA",
        "password_hash": hash_password("sohib2024", salt="sohib_owner_salt_2024")
    },
    "kasir1": {
        "id": 2,
        "username": "kasir1",
        "email": "kasir@sohibcaffe.com",
        "full_name": "Fajar Pratama",
        "role": "kasir",
        "role_badge": "Kasir Utama (Shift 1)",
        "avatar": "FP",
        "password_hash": hash_password("kasir1234", salt="sohib_kasir_salt_2024")
    },
    "barista1": {
        "id": 3,
        "username": "barista1",
        "email": "barista@sohibcaffe.com",
        "full_name": "Rian Anggara",
        "role": "barista",
        "role_badge": "Barista & Staff",
        "avatar": "RA",
        "password_hash": hash_password("barista1234", salt="sohib_barista_salt_2024")
    }
}

# ==============================================================================
# 3. HMAC SIGNED TOKEN & CSRF PROTECTION
# ==============================================================================
def generate_session_token(user_id: int, role: str, email: str, expires_in_sec: int = 86400) -> str:
    """
    Membuat token sesi terenkripsi dan ditandatangani digital dengan batas kedaluwarsa.
    """
    payload = {
        'uid': user_id,
        'role': role,
        'email': email,
        'exp': int(time.time()) + expires_in_sec,
        'nonce': secrets.token_hex(8)
    }
    raw_json = json.dumps(payload, separators=(',', ':')).encode('utf-8')
    b64_payload = base64.urlsafe_b64encode(raw_json).decode('ascii').rstrip('=')
    
    signature = hmac.new(SECRET_KEY.encode('utf-8'), b64_payload.encode('ascii'), hashlib.sha256).hexdigest()
    return f"{b64_payload}.{signature}"

def verify_session_token(token: str) -> Tuple[bool, Dict[str, Any]]:
    """
    Memverifikasi integritas dan masa berlaku token sesi.
    """
    try:
        parts = token.split('.')
        if len(parts) != 2:
            return False, {'error': 'Format token tidak valid'}
        
        b64_payload, signature = parts
        expected_sig = hmac.new(SECRET_KEY.encode('utf-8'), b64_payload.encode('ascii'), hashlib.sha256).hexdigest()
        
        if not hmac.compare_digest(signature, expected_sig):
            return False, {'error': 'Tanda tangan token tidak valid (Upaya pemalsuan)'}
        
        padding = '=' * (4 - len(b64_payload) % 4)
        raw_json = base64.urlsafe_b64decode(b64_payload + padding).decode('utf-8')
        payload = json.loads(raw_json)
        
        if payload.get('exp', 0) < time.time():
            return False, {'error': 'Token sesi telah kedaluwarsa'}
            
        return True, payload
    except Exception as e:
        return False, {'error': f'Gagal memverifikasi token: {str(e)}'}

def generate_csrf_token(session_seed: str = "") -> str:
    """Menghasilkan token CSRF unik yang ditandatangani."""
    timestamp = str(int(time.time()))
    entropy = secrets.token_hex(16)
    raw = f"{session_seed}:{timestamp}:{entropy}"
    sig = hmac.new(SECRET_KEY.encode('utf-8'), raw.encode('utf-8'), hashlib.sha256).hexdigest()[:32]
    return f"{base64.urlsafe_b64encode(raw.encode('utf-8')).decode('ascii')}.{sig}"

def verify_csrf_token(token: str) -> bool:
    """Memverifikasi keabsahan CSRF token."""
    try:
        if not token or "." not in token:
            return False
        b64_raw, sig = token.split(".", 1)
        raw = base64.urlsafe_b64decode(b64_raw.encode('ascii')).decode('utf-8')
        expected_sig = hmac.new(SECRET_KEY.encode('utf-8'), raw.encode('utf-8'), hashlib.sha256).hexdigest()[:32]
        return hmac.compare_digest(sig, expected_sig)
    except Exception:
        return False

# ==============================================================================
# 4. ADVANCED WEB APPLICATION FIREWALL (WAF) RULES
# ==============================================================================

# Pola serangan SQL Injection (SQLi)
SQLI_PATTERNS = [
    r"(\b(UNION|SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|EXEC|EXECUTE)\b\s+.*\b(FROM|INTO|TABLE|DATABASE)\b)",
    r"(--|#|/\*|\*/|;\s*$)",
    r"(\b(OR|AND)\b\s+[\'\"]?\w+[\'\"]?\s*=\s*[\'\"]?\w+[\'\"]?)",
    r"(\'|\")\s*(OR|AND)\s*(\'|\")?\d+(\'|\")?\s*=\s*(\'|\")?\d+",
    r"(SLEEP\s*\(|BENCHMARK\s*\(|WAITFOR\s+DELAY)",
    r"(\b(INFORMATION_SCHEMA|SCHEMA_NAME|TABLE_NAME|LOAD_FILE|INTO\s+OUTFILE)\b)",
    r"(\bxp_cmdshell\b|\bpg_sleep\b|\bextractvalue\b|\bupdatexml\b)"
]

# Pola serangan Cross-Site Scripting (XSS)
XSS_PATTERNS = [
    r"(<\s*script[^>]*>.*<\s*/\s*script\s*>)",
    r"(javascript\s*:\s*[^\s]+)",
    r"(onerror\s*=\s*|onload\s*=\s*|onclick\s*=\s*|onmouseover\s*=\s*|onfocus\s*=\s*)",
    r"(<\s*iframe|<\s*embed|<\s*object|<\s*svg\s+onload|<\s*body\s+onload)",
    r"(document\.cookie|document\.location|window\.location|eval\s*\(|Function\s*\()",
    r"(<\s*img\s+[^>]*src\s*=\s*[\"']?javascript:)",
    r"(data:\s*text\/html;base64)",
    r"(\b(alert|prompt|confirm)\s*\([^\)]*\))"
]

# Pola serangan Path Traversal & Local/Remote File Inclusion (LFI/RFI)
PATH_TRAVERSAL_PATTERNS = [
    r"(\.\./|\.\.\\|\.\.%2f|\.\.%5c|%2e%2e%2f|%2e%2e\/)",
    r"(/etc/passwd|/etc/shadow|/windows/system32|boot\.ini|win\.ini)",
    r"(WEB-INF|\.env|\.git|\.htaccess|\.config|\.ssh|id_rsa)",
    r"(php://filter|php://input|data://text|expect://)"
]

# Pola serangan Remote Code Execution (RCE) / Command Injection
RCE_PATTERNS = [
    r"(\b(system|exec|passthru|shell_exec|popen|proc_open)\s*\()",
    r"(;\s*(ls|cat|dir|whoami|id|uname|nc|netcat|curl|wget|bash|sh|powershell|cmd)\b)",
    r"(`.*`)",
    r"(\b(__proto__|constructor\.prototype)\b)",
    r"(%00|\x00)"
]

# Pola Scanner & Bad Bot User-Agents
BAD_BOT_PATTERNS = [
    r"(sqlmap|nikto|dirbuster|nmap|acunetix|w3af|havij|nessus|metasploit|masscan|zgrab|gobuster|ffuf|hydra|burpcollaborator)"
]

def inspect_request_payload(text: str) -> Tuple[bool, str]:
    """
    Memeriksa teks input/payload HTTP untuk mendeteksi berbagai jenis payload serangan siber.
    Return: (is_malicious, threat_category)
    """
    if not text or not isinstance(text, str):
        return False, "CLEAN"
    
    text_clean = text.strip()

    # 1. Cek SQL Injection
    for pattern in SQLI_PATTERNS:
        if re.search(pattern, text_clean, re.IGNORECASE):
            return True, f"SQL Injection (SQLi): Pola terdeteksi '{pattern}'"

    # 2. Cek XSS
    for pattern in XSS_PATTERNS:
        if re.search(pattern, text_clean, re.IGNORECASE):
            return True, f"Cross-Site Scripting (XSS): Pola terdeteksi '{pattern}'"

    # 3. Cek Path Traversal / LFI
    for pattern in PATH_TRAVERSAL_PATTERNS:
        if re.search(pattern, text_clean, re.IGNORECASE):
            return True, f"Path Traversal / LFI: Pola terdeteksi '{pattern}'"

    # 4. Cek Remote Code Execution / Command Injection
    for pattern in RCE_PATTERNS:
        if re.search(pattern, text_clean, re.IGNORECASE):
            return True, f"Command Injection / RCE: Pola terdeteksi '{pattern}'"

    return False, "CLEAN"

def sanitize_html(text: str) -> str:
    """
    Membersihkan string dari karakter berbahaya untuk mencegah Stored XSS.
    """
    if not isinstance(text, str):
        return text
    replacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;"
    }
    return "".join(replacements.get(c, c) for c in text)

# ==============================================================================
# 5. REAL-TIME SECURITY AUDIT LOGGER & STATS TRACKER
# ==============================================================================
_lock = threading.Lock()
_security_logs_buffer: List[Dict[str, Any]] = []
_security_stats = {
    "total_waf_requests": 0,
    "total_blocked": 0,
    "sqli_blocked": 0,
    "xss_blocked": 0,
    "traversal_blocked": 0,
    "rce_blocked": 0,
    "bot_blocked": 0,
    "ddos_blocked": 0,
    "brute_force_blocked": 0,
    "started_at": time.time()
}

def record_waf_request():
    with _lock:
        _security_stats["total_waf_requests"] += 1

def log_security_event(event_type: str, ip_address: str, details: str, severity: str = "WARNING"):
    """
    Mencatat log ancaman keamanan ke memory buffer dan file security_audit.log.
    """
    timestamp_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
    epoch = time.time()
    
    entry = {
        "timestamp": timestamp_str,
        "epoch": epoch,
        "severity": severity,
        "ip": ip_address,
        "event_type": event_type,
        "details": details
    }
    
    with _lock:
        _security_stats["total_blocked"] += 1
        if "SQL" in event_type or "SQLi" in details:
            _security_stats["sqli_blocked"] += 1
        elif "XSS" in event_type or "Cross-Site" in details:
            _security_stats["xss_blocked"] += 1
        elif "Traversal" in event_type or "LFI" in details:
            _security_stats["traversal_blocked"] += 1
        elif "RCE" in event_type or "Command" in details:
            _security_stats["rce_blocked"] += 1
        elif "SCANNER" in event_type or "Bot" in event_type:
            _security_stats["bot_blocked"] += 1
        elif "RATE_LIMIT" in event_type:
            _security_stats["ddos_blocked"] += 1
        elif "BRUTE_FORCE" in event_type or "LOGIN" in event_type:
            _security_stats["brute_force_blocked"] += 1
            
        _security_logs_buffer.insert(0, entry)
        if len(_security_logs_buffer) > 200:
            _security_logs_buffer.pop()

    log_line = f"[{timestamp_str}] [{severity}] [IP: {ip_address}] [{event_type}] {details}\n"
    try:
        with open("security_audit.log", "a", encoding="utf-8") as f:
            f.write(log_line)
    except Exception as e:
        print(f"Error writing to security log: {e}")
    
    print(f"\033[91m🚨 WAF BLOCKED [{severity}] IP: {ip_address} | {event_type} -> {details}\033[0m")

def get_security_stats() -> Dict[str, Any]:
    """Mengambil metrik keamanan real-time untuk dashboard."""
    with _lock:
        stats = dict(_security_stats)
        uptime_sec = int(time.time() - stats["started_at"])
        stats["uptime_human"] = f"{uptime_sec // 3600}j {(uptime_sec % 3600) // 60}m {uptime_sec % 60}d"
        return stats

def get_recent_security_logs(limit: int = 50) -> List[Dict[str, Any]]:
    """Mengambil log ancaman keamanan terbaru."""
    with _lock:
        return list(_security_logs_buffer[:limit])
