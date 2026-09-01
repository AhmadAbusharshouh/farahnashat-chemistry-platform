from PIL import Image

# Load original logo
img = Image.open('public/images/logo.png').convert('RGBA')

# Tight bounds from measure: min_x=210, max_x=1244, min_y=302, max_y=1109
pad = 12
crop_box = (210 - pad, 302 - pad, 1244 + pad, 1109 + pad)
tight_img = img.crop(crop_box)
tight_img.save('public/images/logo.png', 'PNG')
print(f"Tight logo.png saved with size: {tight_img.size}")
