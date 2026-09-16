# -*- coding: utf-8 -*-
"""用 PIL 渲染视频中文标签（透明 PNG），供 ffmpeg overlay 叠加。"""
import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "work", "labels")
os.makedirs(OUT, exist_ok=True)

FONT_BOLD = "C:/Windows/Fonts/msyhbd.ttc"
FONT_REG = "C:/Windows/Fonts/msyh.ttc"


def render_label(name, big, small):
    W, H = 1280, 240
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    f_big = ImageFont.truetype(FONT_BOLD, 46)
    f_small = ImageFont.truetype(FONT_REG, 26)
    big_w = d.textlength(big, font=f_big)
    small_w = d.textlength(small, font=f_small)
    d.text(((W - big_w) / 2, 22), big, font=f_big, fill=(142, 70, 97, 255))
    d.text(((W - small_w) / 2, 120), small, font=f_small, fill=(93, 66, 80, 255))
    img.save(os.path.join(OUT, f"{name}.png"))
    print("label:", name)


items = [
    ("x11-matrix", "门店账号内容案例成片", "VIDEO PLACEHOLDER · 占位成片"),
    ("x11-official", "官方账号爆款案例视频", "VIDEO PLACEHOLDER · 占位成片"),
    ("koc-matrix", "KOC 产出代表案例视频", "VIDEO PLACEHOLDER · 占位成片"),
    ("guru-overseas", "海外品牌短视频案例成片", "VIDEO PLACEHOLDER · 占位成片"),
]

for name, big, small in items:
    render_label(name, big, small)
