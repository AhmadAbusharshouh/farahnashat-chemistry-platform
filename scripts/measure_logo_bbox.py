from PIL import Image
import numpy as np

# Load original logo
img = Image.open('public/images/logo.png').convert('RGBA')
arr = np.array(img)
# Find non-white, non-transparent pixels
# Background is white (255,255,255) or transparent (alpha=0)
if arr.shape[2] == 4:
    alpha = arr[:, :, 3]
    rgb = arr[:, :, :3]
    # mask of content: alpha > 10 and not pure white
    is_content = (alpha > 20) & ((rgb[:,:,0] < 245) | (rgb[:,:,1] < 245) | (rgb[:,:,2] < 245))
else:
    is_content = (arr[:,:,0] < 245) | (arr[:,:,1] < 245) | (arr[:,:,2] < 245)

rows = np.any(is_content, axis=1)
cols = np.any(is_content, axis=0)

min_y, max_y = np.where(rows)[0][[0, -1]]
min_x, max_x = np.where(cols)[0][[0, -1]]

w = img.width
h = img.height

print(f"Image dimensions: {w} x {h}")
print(f"Content bbox: min_x={min_x}, max_x={max_x}, min_y={min_y}, max_y={max_y}")
print(f"Content width: {max_x - min_x}, Content height: {max_y - min_y}")
print(f"Top blank space: {min_y}px ({min_y/h*100:.1f}%)")
print(f"Bottom blank space: {h - max_y}px ({(h-max_y)/h*100:.1f}%)")
print(f"Left blank space: {min_x}px ({min_x/w*100:.1f}%)")
print(f"Right blank space: {w - max_x}px ({(w-max_x)/w*100:.1f}%)")
