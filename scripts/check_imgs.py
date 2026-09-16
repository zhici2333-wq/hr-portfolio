from PIL import Image
import os

paths = [
    (r'C:\Users\枳辞\.minimax\v2\assets\2026\09\03\23-57-12-859-asset_20260903-235712-859_596fb3c91195_96295a0b-奇瑞.jpg', 'chirey'),
    (r'C:\Users\枳辞\.minimax\v2\assets\2026\09\03\23-57-12-864-asset_20260903-235712-864_eb8167eac646_a8736cbb-DSC05044.jpg', 'mg'),
    (r'C:\Users\枳辞\.minimax\v2\assets\2026\09\03\23-57-12-867-asset_20260903-235712-867_203b0cb2d8c0_9fa58d58-南方日本1.png', 'nanfang'),
]

for p, name in paths:
    if os.path.exists(p):
        im = Image.open(p)
        print(name, im.size, im.mode)
    else:
        print(name, 'NOT FOUND', p)
