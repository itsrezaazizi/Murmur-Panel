#!/usr/bin/env python3
"""Record docs/demo.gif: the builder's live preview reacting to edits."""
import asyncio, io, pathlib
from playwright.async_api import async_playwright
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = (ROOT / "index.html").as_uri() + "#builder"
frames, durs = [], []

async def snap(pg, ms=120):
    png = await pg.screenshot(clip={"x": 72, "y": 0, "width": 1296, "height": 900})
    im = Image.open(io.BytesIO(png)).convert("RGB").resize((960, 667), Image.LANCZOS)
    frames.append(im); durs.append(ms)

async def hold(pg, total, step=200):
    for _ in range(total // step):
        await pg.wait_for_timeout(step); await snap(pg, step)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        await pg.goto(URL); await pg.reload(); await pg.wait_for_timeout(800)
        await pg.evaluate("window.scrollTo(0,0)")
        await hold(pg, 1200)
        # type a new keyword
        await pg.click("#kwIn")
        for ch in "sizes":
            await pg.keyboard.type(ch); await snap(pg, 90)
        await pg.keyboard.press("Enter"); await hold(pg, 800)
        # edit the first reply variation
        v = pg.locator('[data-var="0"]'); await v.click(); await v.press("End")
        for _ in range(16): await v.press("Backspace"); await snap(pg, 50)
        for ch in "and sizes in your DMs!": await pg.keyboard.type(ch); await snap(pg, 70)
        await hold(pg, 1000)
        # DM tab: scroll to blocks and add a product carousel
        await pg.evaluate("window.scrollTo({top:document.querySelector('#dmText').getBoundingClientRect().top+scrollY-160})"); await hold(pg, 400)
        await pg.click('[data-add="carousel"]'); await hold(pg, 1600)
        # switch trigger to Live
        await pg.evaluate("window.scrollTo({top:0})"); await pg.wait_for_timeout(200)
        await pg.click('[data-trig="live"]'); await pg.click('#pvTabs [data-tab="comment"]'); await hold(pg, 1600)
        await b.close()
    pal = frames[0].quantize(colors=200, method=Image.MEDIANCUT)
    q = [f.quantize(palette=pal, dither=Image.NONE) for f in frames]
    q[0].save(ROOT / "docs" / "demo.gif", save_all=True, append_images=q[1:], duration=durs, loop=0, optimize=True)
    print(len(frames), "frames", (ROOT / "docs" / "demo.gif").stat().st_size // 1024, "KB")

asyncio.run(main())
