import glob, os

files = sorted(glob.glob('public/images/smil/*.svg'))
print('Found SVG files:', files)
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    has_start = content.strip().startswith('<svg')
    has_end = content.strip().endswith('</svg>')
    print(f'{f}: {len(content):,} bytes | valid svg tags: start={has_start}, end={has_end}')
