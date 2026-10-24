#!/usr/bin/env python3
"""Stáhne veřejnou startovní listinu z rbr.onlineracing.cz a uloží ji do public/data/startlist.json.

Spouští se denně z GitHub Actions (.github/workflows/startlist.yml), ale jde i ručně:
    python3 tools/fetch_startlist.py

- jen standardní knihovna Pythonu (bez pip)
- soubor se přepíše jen když se seznam změnil a když se podařilo načíst aspoň jednu posádku
  (při výpadku zdroje zůstane na webu poslední známá verze)
- jména jsou ve stejném tvaru jako ve výsledcích (např. "DOUSA Matyas"), takže se dají párovat
"""
import html
import json
import os
import re
import socket
import ssl
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone

HOST = "rbr.onlineracing.cz"
URL = "https://rbr.onlineracing.cz/tour/21e9722b6dbb5eb20e444f7561302cca/startlist"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public/data/startlist.json")
EXTRA_ROOTS = os.path.join(ROOT, "tools/certs/lets-encrypt-gen-y-roots.pem")  # nové kořeny LE, které nemusí být v systému


def clean(s):
    return html.unescape(re.sub(r"<.*?>", "", s, flags=re.S).replace("&nbsp;", " ")).strip()


def parse(page):
    tables = [t for t in re.findall(r"<table.*?</table>", page, flags=re.S) if "Název týmu" in t]
    if not tables:
        return []
    crews = []
    for row in re.findall(r"<tr class=row\d>(.*?)</tr>", tables[0], flags=re.S):
        tds = re.findall(r"<td[^>]*>(.*?)</td>", row, flags=re.S)
        if len(tds) < 5:
            continue
        flag = re.search(r"flgs/([A-Za-z]+)\.gif", tds[1])
        car = re.search(r"<span>(.*?)</span>", tds[2], flags=re.S)
        crews.append({
            "n": clean(tds[1]),
            "cc": flag.group(1).upper() if flag else "",
            "car": clean(car.group(1)) if car else clean(tds[2]),
            "cl": clean(tds[3]),
            "team": clean(tds[4]),
        })
    return crews


def aia_intermediate_pem():
    """rbr.onlineracing.cz posílá jen koncový certifikát bez zprostředkující CA (špatně nastavený server),
    takže Python/OpenSSL ho neověří (prohlížeče si chybějící CA stáhnou samy). Tady ji dohledáme stejně:
    z certifikátu vytáhneme adresu 'CA Issuers' (Let's Encrypt, *.lencr.org) a stáhneme ji.
    Ověřování se nikdy nevypíná: zprostředkující CA musí vést ke kořenové CA (systémové, nebo z tools/certs)."""
    probe = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    probe.check_hostname = False
    probe.verify_mode = ssl.CERT_NONE  # jen přečteme certifikát, neposíláme nic citlivého
    with socket.create_connection((HOST, 443), timeout=30) as sock:
        with probe.wrap_socket(sock, server_hostname=HOST) as tls:  # SNI je nutné, jinak server vrátí jiný certifikát
            der = tls.getpeercert(binary_form=True)
    m = re.search(rb"http://[a-z0-9.\-]+\.lencr\.org/", der)
    if not m:
        raise RuntimeError("V certifikátu jsem nenašel adresu zprostředkující CA (AIA).")
    with urllib.request.urlopen(m.group(0).decode(), timeout=30) as r:
        inter = r.read()
    return ssl.DER_cert_to_PEM_cert(inter) if not inter.startswith(b"-----BEGIN") else inter.decode()


def download():
    headers = {"User-Agent": "Mozilla/5.0 (mikulasrallyonline.cz startlist sync)"}
    req = urllib.request.Request(URL, headers=headers)
    ctx = None
    if os.environ.get("STARTLIST_TEST_AIA"):  # jen pro test: začni bez důvěryhodných CA
        ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    try:
        return urllib.request.urlopen(req, timeout=30, context=ctx).read().decode("utf-8", errors="replace")
    except (ssl.SSLCertVerificationError, urllib.error.URLError) as e:
        reason = getattr(e, "reason", e)
        if not isinstance(reason, ssl.SSLCertVerificationError):
            raise
        print("Ověření certifikátu selhalo (%s) – zkouším doplnit chybějící zprostředkující CA." % reason)
    ctx = ssl.create_default_context()
    if os.path.exists(EXTRA_ROOTS):
        ctx.load_verify_locations(cafile=EXTRA_ROOTS)
    ctx.load_verify_locations(cadata=aia_intermediate_pem())
    return urllib.request.urlopen(req, timeout=30, context=ctx).read().decode("utf-8", errors="replace")


def main():
    page = download()
    crews = parse(page)
    if not crews:
        print("Startovní listina je prázdná nebo se nepodařilo zpracovat stránku – ponechávám původní soubor.")
        return 0 if os.path.exists(OUT) else 1
    old = None
    if os.path.exists(OUT):
        try:
            old = json.load(open(OUT, encoding="utf-8"))
        except Exception:
            old = None
    if old and old.get("crews") == crews:
        print("Beze změny (%d posádek)." % len(crews))
        return 0
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    data = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": URL,
        "count": len(crews),
        "crews": crews,
    }
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    print("Uloženo: %d posádek." % len(crews))
    return 0


if __name__ == "__main__":
    sys.exit(main())
