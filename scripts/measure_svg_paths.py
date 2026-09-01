import re

with open('public/images/logo.svg', 'r', encoding='utf-8') as f:
    svg_text = f.read()

# Extract all path d attributes
paths = re.findall(r'd="([^"]+)"', svg_text)
print(f"Found {len(paths)} paths in SVG")

# Find all numbers in d
all_nums = []
for p in paths:
    # find coordinates: pairs of numbers
    nums = [float(x) for x in re.findall(r'[-+]?\d*\.?\d+', p)]
    all_nums.extend(nums)

# Let's find coordinate bounds by parsing tokens
# Or let's parse standard SVG commands
min_x, max_x = float('inf'), float('-inf')
min_y, max_y = float('inf'), float('-inf')

# In logo.svg, the SVG path contains absolute or relative commands
# Let's parse with simple state machine
for p in paths:
    tokens = re.findall(r'([a-zA-Z]|[-+]?\d*\.?\d+)', p)
    cur_x, cur_y = 0.0, 0.0
    cmd = ''
    i = 0
    while i < len(tokens):
        tok = tokens[i]
        if tok.isalpha():
            cmd = tok
            i += 1
            continue
        
        # Numbers following cmd
        # For M/m, L/l, etc.
        try:
            val1 = float(tok)
            if i + 1 < len(tokens) and not tokens[i+1].isalpha():
                val2 = float(tokens[i+1])
                i += 2
                if cmd in 'ML':
                    cur_x, cur_y = val1, val2
                elif cmd in 'ml':
                    cur_x += val1
                    cur_y += val2
                elif cmd == 'H':
                    cur_x = val1
                    i -= 1 # only consumed 1
                elif cmd == 'h':
                    cur_x += val1
                    i -= 1
                elif cmd == 'V':
                    cur_y = val1
                    i -= 1
                elif cmd == 'v':
                    cur_y += val1
                    i -= 1
                
                min_x = min(min_x, cur_x)
                max_x = max(max_x, cur_x)
                min_y = min(min_y, cur_y)
                max_y = max(max_y, cur_y)
            else:
                if cmd == 'H':
                    cur_x = val1
                elif cmd == 'h':
                    cur_x += val1
                elif cmd == 'V':
                    cur_y = val1
                elif cmd == 'v':
                    cur_y += val1
                min_x = min(min_x, cur_x)
                max_x = max(max_x, cur_x)
                min_y = min(min_y, cur_y)
                max_y = max(max_y, cur_y)
                i += 1
        except Exception:
            i += 1

print(f"SVG exact vector bounds:")
print(f"min_x = {min_x:.1f}, max_x = {max_x:.1f}, width = {max_x - min_x:.1f}")
print(f"min_y = {min_y:.1f}, max_y = {max_y:.1f}, height = {max_y - min_y:.1f}")
