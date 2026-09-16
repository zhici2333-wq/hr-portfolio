# -*- coding: utf-8 -*-
"""生成占位视频封面海报 + 处理头像。"""
import math
import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTER_DIR = os.path.join(ROOT, "public", "media", "posters")
VIDEO_DIR = os.path.join(ROOT, "public", "media", "videos")
os.makedirs(POSTER_DIR, exist_ok=True)
os.makedirs(VIDEO_DIR, exist_ok=True)

INK = (59, 36, 48, 255)
ROSE = (217, 108, 140, 255)
ROSE_SOFT = (238, 159, 181, 255)
BEAN = (185, 124, 144, 255)
DEEP = (142, 70, 97, 255)
CREAM = (255, 249, 251, 255)

FONT_BOLD = "C:/Windows/Fonts/msyhbd.ttc"
FONT_REG = "C:/Windows/Fonts/msyh.ttc"


def font(path, size):
    return ImageFont.truetype(path, size)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_gradient_bg(w, h):
    """柔粉纵向渐变底 + 轻微横向光斑。"""
    top = (253, 238, 244)
    mid = (247, 211, 224)
    bottom = (240, 187, 206)
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        if y < h * 0.55:
            t = y / (h * 0.55)
            c = lerp(top, mid, t)
        else:
            t = (y - h * 0.55) / (h * 0.45)
            c = lerp(mid, bottom, t)
        for x in range(w):
            px[x, y] = c
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    cx, cy = w * 0.72, h * 0.18
    for r in range(380, 0, -1):
        a = max(0, int(26 * (1 - r / 380)))
        od.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(255, 255, 255, a))
    img = Image.alpha_composite(img.convert("RGBA"), overlay)
    return img


def draw_grid(draw, w, h, step=36):
    for x in range(0, w, step):
        draw.line((x, 0, x, h), fill=(217, 108, 140, 16))
    for y in range(0, h, step):
        draw.line((0, y, w, y), fill=(217, 108, 140, 16))


PIXEL_HEART = [
    ".XX..XX.",
    "XXXXXXXX",
    "XXXXXXXX",
    ".XXXXXX.",
    "..XXXX..",
    "...XX...",
]

PIXEL_STAR = [
    "..XX..",
    "..XX..",
    "XXXXXX",
    ".XXXX.",
    "..XX..",
]

PIXEL_SPARKLE = [
    "...X...",
    "...X...",
    "XXXXXXX",
    "...X...",
    "...X...",
]


def draw_pixel_art(draw, x, y, art, color, scale=6):
    for j, row in enumerate(art):
        for i, ch in enumerate(row):
            if ch == "X":
                draw.rectangle((x + i * scale, y + j * scale, x + i * scale + scale - 1, y + j * scale + scale - 1), fill=color)


def pixel_border(img, margin=18, thick=10, cut=26):
    """锯齿切角像素边框。"""
    w, h = img.size
    d = ImageDraw.Draw(img)
    x0, y0, x1, y1 = margin, margin, w - margin, h - margin
    # 四边
    d.rectangle((x0 + cut, y0, x1 - cut, y0 + thick - 1), fill=INK)
    d.rectangle((x0 + cut, y1 - thick + 1, x1 - cut, y1), fill=INK)
    d.rectangle((x0, y0 + cut, x0 + thick - 1, y1 - cut), fill=INK)
    d.rectangle((x1 - thick + 1, y0 + cut, x1, y1 - cut), fill=INK)
    # 切角
    for cx, cy, sx, sy in (
        (x0, y0, 1, 1),
        (x1, y0, -1, 1),
        (x0, y1, 1, -1),
        (x1, y1, -1, -1),
    ):
        # 水平缺口
        hx = sorted((cx, cx + sx * (cut - 1)))
        hy = sorted((cy, cy + sy * (thick - 1)))
        d.rectangle((hx[0], hy[0], hx[1], hy[1]), fill=(0, 0, 0, 0))
        # 垂直缺口
        vx = sorted((cx, cx + sx * (thick - 1)))
        vy = sorted((cy, cy + sy * (cut - 1)))
        d.rectangle((vx[0], vy[0], vx[1], vy[1]), fill=(0, 0, 0, 0))


def corner_decor(draw, w, h):
    for cx, cy, sx, sy in (
        (34, 34, 1, 1),
        (w - 34, 34, -1, 1),
        (34, h - 34, 1, -1),
        (w - 34, h - 34, -1, -1),
    ):
        draw_pixel_art(draw, cx - 12, cy - 12, PIXEL_HEART, ROSE, scale=4)
        draw_pixel_art(draw, cx - 36, cy - 30, PIXEL_SPARKLE, BEAN, scale=3)


def text_center(draw, cx, y, text, fnt, fill, shadow=None, spacing=0):
    if spacing:
        total = sum(draw.textlength(ch, font=fnt) + spacing for ch in text) - spacing
        x = cx - total / 2
        for ch in text:
            if shadow:
                draw.text((x + 4, y + 4), ch, font=fnt, fill=shadow)
            draw.text((x, y), ch, font=fnt, fill=fill)
            x += draw.textlength(ch, font=fnt) + spacing
    else:
        if shadow:
            draw.text((cx + 4, y + 4), text, font=fnt, fill=shadow, anchor="ma")
        draw.text((cx, y), text, font=fnt, fill=fill, anchor="ma")


def play_button(draw, cx, cy, radius=58):
    draw.ellipse((cx - radius + 8, cy - radius + 8, cx + radius + 8, cy + radius + 8), fill=(59, 36, 48, 200))
    draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=ROSE, outline=INK, width=7)
    tri = [(cx - 22, cy - 30), (cx - 22, cy + 30), (cx + 34, cy)]
    draw.polygon(tri, fill=CREAM)


def project_poster(name, no, title_lines, label, path):
    W, H = 1280, 720
    img = make_gradient_bg(W, H)
    d = ImageDraw.Draw(img)
    draw_grid(d, W, H)
    pixel_border(img)
    corner_decor(d, W, H)
    draw_pixel_art(d, 104, 118, PIXEL_STAR, ROSE, scale=5)
    draw_pixel_art(d, W - 168, 108, PIXEL_SPARKLE, DEEP, scale=4)
    draw_pixel_art(d, 96, H - 150, PIXEL_SPARKLE, BEAN, scale=4)
    draw_pixel_art(d, W - 190, H - 170, PIXEL_HEART, ROSE, scale=5)

    f_no = font(FONT_BOLD, 34)
    text_center(d, W / 2, 92, no, f_no, DEEP, shadow=(255, 255, 255, 210))
    f_title = font(FONT_BOLD, 58)
    f_label = font(FONT_REG, 30)
    f_small = font(FONT_BOLD, 21)
    title_gap = 88
    first_y = 200
    for i, line in enumerate(title_lines):
        text_center(d, W / 2, first_y + i * title_gap, line, f_title, INK)
    d.rectangle((W / 2 - 120, first_y + len(title_lines) * title_gap + 6, W / 2 + 120, first_y + len(title_lines) * title_gap + 13), fill=ROSE)
    label_y = first_y + len(title_lines) * title_gap + 52
    text_center(d, W / 2, label_y, label, f_label, DEEP, shadow=(255, 255, 255, 190))

    play_button(d, W / 2, label_y + 160)
    text_center(d, W / 2, label_y + 250, "PLACEHOLDER VIDEO  ·  占位视频", f_small, (93, 66, 80, 255))
    img.convert("RGB").save(path, quality=92)
    print("poster:", os.path.basename(path))


def hero_poster(path):
    W, H = 1280, 720
    img = make_gradient_bg(W, H)
    d = ImageDraw.Draw(img)
    draw_grid(d, W, H)
    pixel_border(img)
    corner_decor(d, W, H)
    draw_pixel_art(d, 170, 150, PIXEL_STAR, ROSE, scale=8)
    draw_pixel_art(d, W - 260, 170, PIXEL_HEART, ROSE, scale=9)
    draw_pixel_art(d, 220, H - 220, PIXEL_SPARKLE, BEAN, scale=7)
    draw_pixel_art(d, W - 220, H - 240, PIXEL_SPARKLE, DEEP, scale=6)
    f = font(FONT_BOLD, 46)
    text_center(d, W / 2, H - 118, "CUI ZIYAN · 短视频内容经理", f, (142, 70, 97, 235))
    f2 = font(FONT_REG, 22)
    text_center(d, W / 2, H - 58, "背景视频占位 · 后续替换真实成片", f2, (93, 66, 80, 220))
    img.convert("RGB").save(path, quality=92)
    print("poster:", os.path.basename(path))


def main():
    # 头像：等比缩放，供页面 object-fit 裁切
    avatar = Image.open(os.path.join(ROOT, "work", "resume", "avatar_from_html.jpg")).convert("RGB")
    avatar = avatar.resize((640, 896), Image.LANCZOS)
    avatar.save(os.path.join(ROOT, "public", "media", "avatar.jpg"), quality=88, optimize=True)
    print("avatar: public/media/avatar.jpg")

    projects = [
        ("x11-matrix", "01", ["全国门店新媒体矩阵", "0→1 搭建"], "门店账号内容案例成片"),
        ("x11-official", "02", ["X11 官方账号", "全周期运营"], "官方账号爆款案例视频"),
        ("koc-matrix", "03", ["KOC 素人", "种草矩阵搭建"], "KOC 产出代表案例视频"),
        ("guru-overseas", "04", ["Guru Online", "海外短视频创意"], "海外品牌短视频案例成片"),
    ]
    for name, no, lines, label in projects:
        project_poster(name, no, lines, label, os.path.join(POSTER_DIR, f"{name}.jpg"))
    hero_poster(os.path.join(POSTER_DIR, "hero.jpg"))


if __name__ == "__main__":
    main()
