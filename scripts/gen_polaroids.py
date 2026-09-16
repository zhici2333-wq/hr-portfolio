# -*- coding: utf-8 -*-
"""生成拍立得占位图：一张取简历头像（职业感），一张为可爱风占位。"""
import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "media", "polaroids")
os.makedirs(OUT, exist_ok=True)

W, H = 600, 800  # 拍立得相纸内照片尺寸（3:4）
ROSE = (217, 108, 140, 255)
ROSE_SOFT = (238, 159, 181, 255)
BEAN = (185, 124, 144, 255)
DEEP = (142, 70, 97, 255)
INK = (59, 36, 48, 255)


def make_cute_placeholder():
    """软粉奶油底 + 柔和散景光斑 + 像素装饰的可爱风占位图。"""
    img = Image.new("RGB", (W, H))
    px = img.load()
    top = (253, 240, 245)
    bottom = (240, 187, 206)
    for y in range(H):
        t = y / (H - 1)
        c = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        for x in range(W):
            px[x, y] = c

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    random.seed(7)
    for _ in range(22):
        cx = random.randint(0, W)
        cy = random.randint(0, H)
        r = random.randint(28, 90)
        a = random.randint(18, 55)
        col = random.choice([(255, 255, 255), ROSE_SOFT, ROSE, BEAN])
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(col[0], col[1], col[2], a))
    overlay = overlay.filter(ImageFilter.GaussianBlur(18))
    img = Image.alpha_composite(img.convert("RGBA"), overlay)

    d2 = ImageDraw.Draw(img)
    heart = [".XX..XX.", "XXXXXXXX", "XXXXXXXX", ".XXXXXX.", "..XXXX..", "...XX..."]
    for j, row in enumerate(heart):
        for i, ch in enumerate(row):
            if ch == "X":
                x0, y0 = 250 + i * 9, 360 + j * 9
                d2.rectangle((x0, y0, x0 + 8, y0 + 8), fill=ROSE)
    f = ImageFont.truetype("C:/Windows/Fonts/msyh.ttc", 26)
    d2.text((W / 2, 470), "可爱日常", font=f, fill=DEEP, anchor="mm")
    d2.text((W / 2, 512), "NO FILTER · JUST ME", font=f, fill=BEAN, anchor="mm")
    img.convert("RGB").save(os.path.join(OUT, "cute.jpg"), quality=92)
    print("polaroid: cute.jpg")


def make_pro_photo():
    avatar = Image.open(os.path.join(ROOT, "work", "resume", "avatar_from_html.jpg")).convert("RGB")
    a = avatar.size  # 591 x 827
    crop_h = min(a[1], int(a[0] * (H / W)))  # 按 3:4 比例，取宽度对应的最大高度
    top_crop = (a[1] - crop_h) // 2
    top_crop = max(0, int(crop_h * 0.06))  # 略偏上，保留人脸
    avatar = avatar.crop((0, top_crop, a[0], top_crop + crop_h))
    avatar = avatar.resize((W, H), Image.LANCZOS)
    avatar.save(os.path.join(OUT, "pro.jpg"), quality=92)
    print("polaroid: pro.jpg")


if __name__ == "__main__":
    make_pro_photo()
    make_cute_placeholder()
