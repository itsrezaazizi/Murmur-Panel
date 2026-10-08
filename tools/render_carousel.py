#!/usr/bin/env python3
"""Render the LinkedIn carousel (1080x1350 JPGs + one PDF) into docs/linkedin/."""
import asyncio, pathlib, re, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))
from playwright.async_api import async_playwright
from PIL import Image
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "linkedin"; OUT.mkdir(parents=True, exist_ok=True)
src = (ROOT / "tools" / "carousel.html").read_text()
mark = re.search(r"MARK = \((.*?)\)\n", (ROOT / "build.py").read_text(), re.S).group(1)
mark = "".join(re.findall(r"'([^']*)'", mark)).replace(' class="logo-svg"', "")
tmp = ROOT / "tools" / "_carousel.html"; tmp.write_text(src.replace("{{MARK}}", mark))
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1080, "height": 1350})
        await pg.goto(tmp.as_uri()); await pg.wait_for_timeout(800)
        ims = []
        for i in range(1, 8):
            f = OUT / f"slide-{i}.jpg"
            await pg.locator(f"#s{i}").screenshot(path=str(f), type="jpeg", quality=90)
            ims.append(Image.open(f).convert("RGB"))
        ims[0].save(OUT / "murmur-carousel.pdf", save_all=True, append_images=ims[1:], resolution=144)
        await b.close()
    tmp.unlink()
    for f in sorted(OUT.iterdir()): print(f.name, f.stat().st_size // 1024, "KB")
asyncio.run(main())
