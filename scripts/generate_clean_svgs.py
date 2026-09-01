import os
import sys
import numpy as np
from PIL import Image
from scipy.ndimage import label
import potrace

def trace_mask_to_paths(mask_bool, scale=4.0, alphamax=0.55, opttol=0.08, turdsize=4):
    w, h = mask_bool.shape[1], mask_bool.shape[0]
    img = Image.fromarray((mask_bool * 255).astype(np.uint8))
    img_up = img.resize((int(w * scale), int(h * scale)), resample=Image.Resampling.LANCZOS)
    arr_up = np.array(img_up) >= 128
    
    bm = potrace.Bitmap(arr_up)
    path = bm.trace(
        turdsize=int(turdsize * scale),
        alphamax=alphamax,
        opttolerance=opttol,
        turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY
    )
    
    svg_paths = []
    for curve in path.curves:
        pts = [curve.start_point] + [s.end_point for s in curve.segments]
        xs = [p.x / scale for p in pts]
        ys = [p.y / scale for p in pts]
        
        if min(xs) == 0.0 and max(xs) >= (w - 1.0) and min(ys) == 0.0 and max(ys) >= (h - 1.0):
            continue
            
        start = curve.start_point
        d = [f'M {start.x / scale:.3f} {start.y / scale:.3f}']
        for seg in curve.segments:
            if seg.is_corner:
                c = seg.c
                end = seg.end_point
                d.append(f'L {c.x / scale:.3f} {c.y / scale:.3f} L {end.x / scale:.3f} {end.y / scale:.3f}')
            else:
                c1, c2 = seg.c1, seg.c2
                end = seg.end_point
                d.append(f'C {c1.x / scale:.3f} {c1.y / scale:.3f}, {c2.x / scale:.3f} {c2.y / scale:.3f}, {end.x / scale:.3f} {end.y / scale:.3f}')
        d.append('Z')
        svg_paths.append(' '.join(d))
    return svg_paths

def generate_logo_icon_svg():
    img_path = 'public/images/logo-icon.png'
    img = Image.open(img_path)
    w, h = img.size
    arr = np.array(img)
    a = arr[:,:,3]
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]

    # Segmentations:
    outer_mask = a > 120
    dark_mask = (a > 120) & (r < 75) & (g < 75) & (b < 75)
    white_mask = (a > 120) & (r > 190) & (g > 190) & (b > 190)

    # 1. Outer Ring / Shield
    lbl_o_res = label(outer_mask)
    lbl_o = lbl_o_res[0]
    ring_mask = lbl_o == 1
    core_mask = lbl_o == 2
    small_outer_mask = (lbl_o > 2) & (lbl_o <= 6)

    # 2. White components
    lbl_w_res = label(white_mask)
    lbl_w = lbl_w_res[0]
    main_white_mask = (lbl_w == 1) | (lbl_w == 3)
    bubble_indices = [2, 4, 5, 6, 7, 8]
    bubble_masks = [lbl_w == i for i in bubble_indices]

    # 3. Dark accents
    lbl_d_res = label(dark_mask)
    lbl_d = lbl_d_res[0]

    print("Tracing individual semantic vector parts...")
    ring_paths = trace_mask_to_paths(ring_mask)
    core_paths = trace_mask_to_paths(core_mask)
    small_outer_paths = trace_mask_to_paths(small_outer_mask)
    dark_paths = trace_mask_to_paths(dark_mask)
    main_white_paths = trace_mask_to_paths(main_white_mask)
    
    bubble_paths = []
    for b_mask in bubble_masks:
        if np.sum(b_mask) > 100:
            bp = trace_mask_to_paths(b_mask)
            if bp:
                bubble_paths.append(' '.join(bp))

    all_outer_paths = trace_mask_to_paths(outer_mask)

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" shape-rendering="geometricPrecision" class="farah-logo-icon">
  <defs>
    <linearGradient id="fn-emerald-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#047857" />
      <stop offset="50%" stop-color="#027555" />
      <stop offset="100%" stop-color="#065f46" />
    </linearGradient>
    <linearGradient id="fn-dark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>

  <!-- Outer Orbital Ring / Shield Frame -->
  <g class="logo-group orbital-ring" id="fn-orbital-ring">
    <path class="logo-path path-ring" fill="url(#fn-emerald-gradient)" fill-rule="evenodd" d="{' '.join(ring_paths)}" />
  </g>

  <!-- Core Hexagonal Emblem / Flask Base -->
  <g class="logo-group core-emblem" id="fn-core-emblem">
    <path class="logo-path path-core" fill="url(#fn-emerald-gradient)" fill-rule="evenodd" d="{' '.join(core_paths)}" />
  </g>

  <!-- Outer Satellite Accents -->
  <g class="logo-group satellite-accents" id="fn-satellites">
    <path class="logo-path path-satellites" fill="url(#fn-emerald-gradient)" fill-rule="evenodd" d="{' '.join(small_outer_paths)}" />
  </g>

  <!-- Dark Molecular / Shadow Accents -->
  <g class="logo-group molecular-dark" id="fn-molecular-dark">
    <path class="logo-path path-dark" fill="url(#fn-dark-gradient)" fill-rule="evenodd" d="{' '.join(dark_paths)}" />
  </g>

  <!-- White Core Chemistry Glyphs / Flask Inner Structure -->
  <g class="logo-group chemistry-white-core" id="fn-white-core">
    <path class="logo-path path-white-main" fill="#ffffff" fill-rule="evenodd" d="{' '.join(main_white_paths)}" />
  </g>

  <!-- Animated Bubbles / Chemical Reactants -->
  <g class="logo-group chemistry-bubbles" id="fn-bubbles">
'''
    for idx, bp in enumerate(bubble_paths):
        svg_content += f'    <path class="logo-path path-bubble bubble-{idx+1}" fill="#ffffff" fill-rule="evenodd" d="{bp}" />\n'

    svg_content += '''  </g>
</svg>'''

    out_path = 'public/images/logo-icon.svg'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated semantic SVG: {out_path} ({os.path.getsize(out_path):,} bytes)")

    svg_unified = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" shape-rendering="geometricPrecision">
  <defs>
    <linearGradient id="emeraldBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#025c43"/>
    </linearGradient>
  </defs>
  <path fill="url(#emeraldBase)" fill-rule="evenodd" d="{' '.join(all_outer_paths)}" />
  <path fill="#1e293b" fill-rule="evenodd" d="{' '.join(dark_paths)}" />
  <path fill="#ffffff" fill-rule="evenodd" d="{' '.join(trace_mask_to_paths(white_mask))}" />
</svg>'''
    with open('public/images/logo-icon-clean.svg', 'w', encoding='utf-8') as f:
        f.write(svg_unified)
    print("Generated unified clean SVG")

def generate_logo_full_svg():
    img = Image.open('public/images/logo.png')
    w, h = img.size
    arr = np.array(img)
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]

    # Foreground
    fg_mask = (r < 235) | (g < 235) | (b < 235)
    green_mask = fg_mask & (g > 70) & (r < 60) & (b < 120)
    dark_mask = fg_mask & (~green_mask)

    print("Tracing full logo.png...")
    green_paths = trace_mask_to_paths(green_mask)
    dark_paths = trace_mask_to_paths(dark_mask)

    svg_full = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" shape-rendering="geometricPrecision" class="farah-full-logo">
  <defs>
    <linearGradient id="fn-full-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#027555"/>
    </linearGradient>
  </defs>
  <path class="logo-emerald-elements" fill="url(#fn-full-emerald)" fill-rule="evenodd" d="{' '.join(green_paths)}" />
  <path class="logo-dark-elements" fill="#1e293b" fill-rule="evenodd" d="{' '.join(dark_paths)}" />
</svg>'''

    with open('public/images/logo.svg', 'w', encoding='utf-8') as f:
        f.write(svg_full)
    print("Generated public/images/logo.svg")

if __name__ == '__main__':
    generate_logo_icon_svg()
    generate_logo_full_svg()
