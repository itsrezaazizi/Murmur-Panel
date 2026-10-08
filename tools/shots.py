#!/usr/bin/env python3
"""Render README / case-study screenshots into docs/ (needs Playwright + Pillow)."""
import asyncio, io, pathlib
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"; DOCS.mkdir(exist_ok=True)
URL = (ROOT / "index.html").as_uri()

def save(png, name, size=None, q=84):
    im = Image.open(io.BytesIO(png)).convert("RGB")
    if size: im = im.resize(size, Image.LANCZOS)
    im.save(DOCS / name, quality=q, optimize=True, progressive=True)
    return im

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        # desktop
        d = await b.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        await d.goto(URL); await d.wait_for_timeout(900)
        save(await d.screenshot(), "landing.jpg", (1920, 1200))
        save(await d.screenshot(full_page=True), "landing-full.jpg", None, 78) and None
        im = Image.open(DOCS / "landing-full.jpg"); im.resize((1440, int(im.height * 1440 / im.width)), Image.LANCZOS).save(DOCS / "landing-full.jpg", quality=80, optimize=True, progressive=True)
        await d.goto(URL + "#builder"); await d.reload(); await d.wait_for_timeout(700)
        save(await d.screenshot(), "builder.jpg", (1920, 1200))
        og = await b.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=2)
        await og.goto(URL); await og.wait_for_timeout(900)
        await og.evaluate("document.querySelector('.proto').remove();document.querySelector('.site-head').remove();document.querySelector('.hero').style.paddingBlock='48px'")
        await og.wait_for_timeout(200)
        save(await og.screenshot(), "og.jpg", (1200, 630))
        # mobile
        m = await b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        shots = {}
        await m.goto(URL); await m.wait_for_timeout(900)
        shots["m-landing"] = await m.screenshot()
        await m.goto(URL + "#signup"); await m.reload(); await m.wait_for_timeout(500)
        await m.fill("#email", "hello@linen.studio"); await m.click('[data-act="sendcode"]:visible'); await m.wait_for_timeout(300)
        for i, c in enumerate("4820"): await m.locator("#otp input").nth(i).type(c)
        await m.evaluate("document.activeElement.blur()"); await m.wait_for_timeout(200)
        shots["m-signup"] = await m.screenshot()
        await m.goto(URL + "#connect"); await m.reload(); await m.wait_for_timeout(500)
        await m.click('[data-act="connect"]:visible'); await m.wait_for_timeout(3300)
        shots["m-connect"] = await m.screenshot()
        await m.click('[data-act="builder"]:visible'); await m.wait_for_timeout(600)
        shots["m-builder"] = await m.screenshot()
        await m.click('[data-act="activate"]:visible'); await m.wait_for_timeout(1500)
        await m.click("#simBtn"); await m.wait_for_timeout(3600)
        shots["m-done"] = await m.screenshot()
        await b.close()
    for k, v in shots.items(): save(v, k + ".jpg", (780, 1688), 82)

    # flow strip: four phones on the brand gradient
    W, H = 2400, 1400
    bg = Image.new("RGB", (W, H), "#0A4E47"); g = ImageDraw.Draw(bg)
    for y in range(H):
        t = y / H; g.line([(0, y), (W, y)], fill=(int(15 - 7 * t), int(122 - 74 * t), int(110 - 66 * t)))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0)); ImageDraw.Draw(glow).ellipse((W - 900, -500, W + 300, 500), fill=(255, 201, 77, 70))
    bg = Image.alpha_composite(bg.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(160)))
    pw, ph = 500, 1082; gap = (W - 4 * pw) // 5; top = (H - ph) // 2
    for i, k in enumerate(["m-signup", "m-connect", "m-builder", "m-done"]):
        sc = Image.open(DOCS / f"{k}.jpg").convert("RGBA").resize((pw - 24, ph - 24), Image.LANCZOS)
        frame = Image.new("RGBA", (pw, ph), (0, 0, 0, 0)); fd = ImageDraw.Draw(frame)
        fd.rounded_rectangle((0, 0, pw - 1, ph - 1), 64, fill="#0F1716")
        mask = Image.new("L", sc.size, 0); ImageDraw.Draw(mask).rounded_rectangle((0, 0, sc.width - 1, sc.height - 1), 52, fill=255)
        frame.paste(sc, (12, 12), mask)
        sh = Image.new("RGBA", (W, H), (0, 0, 0, 0)); x = gap + i * (pw + gap)
        ImageDraw.Draw(sh).rounded_rectangle((x + 10, top + 40, x + pw - 10, top + ph + 20), 64, fill=(0, 0, 0, 110))
        bg = Image.alpha_composite(bg, sh.filter(ImageFilter.GaussianBlur(36)))
        bg.alpha_composite(frame, (x, top))
    bg.convert("RGB").save(DOCS / "flow.jpg", quality=84, optimize=True, progressive=True)
    for f in sorted(DOCS.iterdir()): print(f.name, f.stat().st_size // 1024, "KB")

asyncio.run(main())
