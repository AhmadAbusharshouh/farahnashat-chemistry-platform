with open('public/images/logo.svg', 'r', encoding='utf-8') as f:
    svg_content = f.read()

# Replace viewBox="0 0 1254 1254" with tight bounds viewBox="90 185 1075 845"
# Giving 10-15px padding around the exact bounds min_x=110.1, max_x=1144.9, min_y=202.9, max_y=1011.4
tight_svg = svg_content.replace('viewBox="0 0 1254 1254"', 'viewBox="90 185 1075 845"')

with open('public/images/logo.svg', 'w', encoding='utf-8') as f:
    f.write(tight_svg)

print("Tightened viewBox in public/images/logo.svg to '90 185 1075 845'!")
