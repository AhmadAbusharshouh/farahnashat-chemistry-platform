import re
import xml.etree.ElementTree as ET

with open('public/images/logo.svg', 'r', encoding='utf-8') as f:
    svg_text = f.read()

# Let's inspect the SVG viewBox
print("SVG text starts with:", svg_text[:200])

# Let's crop logo.png and logo.svg with tight bounds so the artwork occupies 100% of the SVG viewBox!
# If content is min_x=210, max_x=1244, min_y=302, max_y=1109 in the 1454x1454 image (or corresponding in 1254x1254 SVG)
# Let's measure exact tight crop for PNG and exact viewBox for SVG
from PIL import Image
img = Image.open('public/images/logo.png').convert('RGBA')
# Add small 2% breathing room margin
cw = 1244 - 210
ch = 1109 - 302
pad = int(max(cw, ch) * 0.02)
cropped = img.crop((max(0, 210 - pad), max(0, 302 - pad), min(img.width, 1244 + pad), min(img.height, 1109 + pad)))
cropped.save('public/images/logo-tight.png', 'PNG')
print(f"Saved logo-tight.png with size: {cropped.size}")

# Now let's calculate the SVG viewBox mapping
# Original SVG was 0 0 1254 1254.
# Let's find the SVG content bounds
scale = 1254.0 / 1254.0 # let's check SVG paths
# In SVG:
# Let's render SVG or extract coordinate bounds from path data
# Or adjust viewBox=\"min_x min_y width height\" in logo.svg
"