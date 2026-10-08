#!/usr/bin/env python3
"""Build Murmur into self-contained HTML files (fonts, photos and icons embedded).

  python3 build.py            -> index.html + case-study.html at the repo root (served by GitHub Pages)
"""
import base64, json, pathlib, re

ROOT = pathlib.Path(__file__).parent
SRC, DIST = ROOT / "src", ROOT
DIST.mkdir(exist_ok=True)
REPO = "itsrezaazizi/murmur"
SITE = "https://itsrezaazizi.github.io/murmur/"

def b64(p): return base64.b64encode(p.read_bytes()).decode()

FONTS = [("Bricolage Grotesque", "BricolageGrotesque.woff2", "200 800"),
         ("Geist", "Geist.woff2", "100 900"),
         ("Geist Mono", "GeistMono.woff2", "100 900")]
FONT_CSS = "\n".join(
    f"@font-face{{font-family:'{n}';src:url(data:font/woff2;base64,{b64(ROOT/'fonts'/f)}) format('woff2');font-weight:{w};font-style:normal;font-display:swap}}"
    for n, f, w in FONTS)

MARK = ('<svg class="logo-svg" viewBox="0 0 32 32" aria-hidden="true">'
        '<rect width="32" height="32" rx="9" fill="#0E7C70"/>'
        '<path d="M7 11.5A4.5 4.5 0 0 1 11.5 7h9A4.5 4.5 0 0 1 25 11.5v5a4.5 4.5 0 0 1-4.5 4.5H14l-5 4v-4.4A4.5 4.5 0 0 1 7 16.5z" fill="#fff"/>'
        '<path d="M11 14c1.2-1.9 2.4-1.9 3.3 0s2.1 1.9 3.3 0 2.1-1.9 3.4 0" fill="none" stroke="#0E7C70" stroke-width="2" stroke-linecap="round"/>'
        '<circle cx="25" cy="7" r="4" fill="#FFC94D" stroke="#0E7C70" stroke-width="2"/></svg>')
LOGO = MARK + '<span class="logo-word">murmur</span>'
FAVICON = "data:image/svg+xml;base64," + base64.b64encode(MARK.replace(' class="logo-svg"', ' xmlns="http://www.w3.org/2000/svg"').encode()).decode()

def head(title, desc, extra_css=""):
    return f"""<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#0E7C70">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{SITE}docs/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{FAVICON}">
<style>
{FONT_CSS}
{extra_css}
</style>
</head>
"""

def build_app():
    css = (SRC / "style.css").read_text()
    body = (SRC / "body.html").read_text().replace("{{LOGO}}", LOGO).replace("{{REPO}}", REPO)
    imgs = json.loads((ROOT / "img" / "imgs.json").read_text())
    js = (SRC / "app.js").read_text().replace("{{IMGS}}", json.dumps(imgs))
    html = head("Murmur prototype",
                "Murmur is a design concept for Instagram comment and DM automation: a landing page and a clickable onboarding flow, from sign-up to your first live auto-reply.",
                css) + "<body>\n" + body + "\n<script>\n" + js + "\n</script>\n</body>\n</html>\n"
    (DIST / "index.html").write_text(html)
    return len(html)

def build_case():
    p = SRC / "case-study.html"
    if not p.exists(): return 0
    t = p.read_text()
    css = re.search(r"<style>(.*?)</style>", t, re.S).group(1)
    body = re.search(r"<body>(.*)</body>", t, re.S).group(1).replace("{{LOGO}}", LOGO).replace("{{REPO}}", REPO)
    html = head("Murmur case study",
                "How Murmur's onboarding was designed: the problem, the persona, the principles and every key decision behind a five-minute setup.",
                css) + "<body>" + body + "</body>\n</html>\n"
    (DIST / "case-study.html").write_text(html)
    return len(html)

if __name__ == "__main__":
    print("index.html", build_app())
    print("case-study.html", build_case())
