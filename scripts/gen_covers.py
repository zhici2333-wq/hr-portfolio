# -*- coding: utf-8 -*-
"""为 6 个案例视频生成专属封面图（16:9）。"""
import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "media", "covers")
os.makedirs(OUT, exist_ok=True)

INK = (59, 36, 48, 255)
ROSE = (217, 108, 140, 255)
DEEP = (142, 70, 97, 255)
FONT = "C:/Windows/Fonts/msyhbd.ttc"
FONT_REG = "C:/Windows/Fonts/msyh.ttc"


def bg(w, h):
    top = (253, 238, 244)
    mid = (247, 211, 224)
    bottom = (240, 185, 204)
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        t = y / (h - 1)
        c = tuple(int(top[i] + (mid[i] - top[i]) * t * 2) if y < h / 2 else int(mid[i] + (bottom[i] - mid[i]) * (t * 2 - 1)) for i in range(3))
        c = tuple(min(255, max(0, v)) for v in c)
        for x in range(w):
            px[x, y] = c
    return img


def text_center(d, cx, y, s, fnt, fill):
    w = d.textlength(s, font=fnt)
    d.text((cx - w / 2, y), s, font=fnt, fill=fill)


def make(title, sub, path):
    W, H = 1280, 720
    img = bg(W, H)
    d = ImageDraw.Draw(img)
    for x in range(0, W, 36):
        d.line((x, 0, x, H), fill=(217, 108, 140, 14))
    for y in range(0, H, 36):
        d.line((0, y, W, y), fill=(217, 108, 140, 14))
    d.rectangle((16, 16, W - 16, H - 16), outline=INK, width=8)
    d.rectangle((30, 30, W - 30, H - 30), outline=ROSE, width=4)
    # 播放圆钮
    d.ellipse((W / 2 - 62, H / 2 - 62, W / 2 + 62, H / 2 + 62), fill=ROSE, outline=INK, width=7)
    d.polygon([(W / 2 - 22, H / 2 - 30), (W / 2 - 22, H / 2 + 30), (W / 2 + 34, H / 2)], fill=(255, 249, 251))
    text_center(d, W / 2, 150, title, ImageFont.truetype(FONT, 56), INK)
    if sub:
        text_center(d, W / 2, 250, sub, ImageFont.truetype(FONT_REG, 34), DEEP)
    text_center(d, W / 2, H - 70, "官 方 账 号 全 周 期 运 营", ImageFont.truetype(FONT, 28), DEEP)
    img.save(path, quality=92)
    print("cover:", os.path.basename(path))


items = [
    ("c1", "案例视频 01 · 官方账号爆款", "暹罗厘普吧唧"),
    ("c2", "案例视频 02 · 新品与 IP 联名内容", ""),
    ("c3", "案例视频 03 · 账号增长拆解", ""),
    ("c4", "案例视频 04", ""),
    ("c5", "案例视频 05", ""),
    ("c6", "案例视频 06", ""),
]

for name, title, sub in items:
    make(title, sub, os.path.join(OUT, f"{name}.jpg"))
