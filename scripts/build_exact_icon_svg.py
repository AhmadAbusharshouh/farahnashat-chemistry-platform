import os
import sys
import numpy as np
from PIL import Image
from scipy.ndimage import label
import potrace

def trace_mask_to_paths(mask_bool, scale=4.0, alphamax=0.55, opttol=0.08, turdsize=3):
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

def main():
    img_path = 'public/images/logo.png'
    img = Image.open(img_path)
    w, h = img.size
    arr = np.array(img)
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]

    # Crop the exact top icon region (y <= 815)
    y_indices = np.arange(h)[:, None]
    is_top_icon = y_indices <= 815
    
    fg_mask = ((r < 235) | (g < 235) | (b < 235)) & is_top_icon
    green_mask = fg_mask & (g > 70) & (r < 60) & (b < 120)
    dark_mask = fg_mask & (~green_mask)

    # Label green components
    lbl_g, num_g = label(green_mask)
    top_arc_mask = lbl_g == 1
    dots_mask = np.zeros_like(green_mask)
    swirl_mask = np.zeros_like(green_mask)
    
    for i in range(2, int(num_g) + 1):
        c_mask = lbl_g == i
        cnt = int(np.sum(c_mask))
        if cnt > 50:
            bbox = Image.fromarray(c_mask).getbbox()
            if bbox:
                bw = bbox[2] - bbox[0]
                bh = bbox[3] - bbox[1]
                if max(bw, bh) < 60 and cnt < 2000:
                    dots_mask |= c_mask
                else:
                    swirl_mask |= c_mask

    # Label dark components
    lbl_d, num_d = label(dark_mask)
    dark_left_mask = np.zeros_like(dark_mask)
    dark_right_mask = np.zeros_like(dark_mask)
    dark_center_mask = np.zeros_like(dark_mask)
    
    for i in range(1, int(num_d) + 1):
        c_mask = lbl_d == i
        if np.sum(c_mask) > 100:
            bbox = Image.fromarray(c_mask).getbbox()
            if bbox:
                if bbox[0] < 450:
                    dark_left_mask |= c_mask
                elif bbox[0] > 740:
                    dark_right_mask |= c_mask
                else:
                    dark_center_mask |= c_mask

    print("Tracing high-precision top icon paths...")
    all_green_paths = trace_mask_to_paths(green_mask, scale=4.0, alphamax=0.55, opttol=0.08)
    all_dark_paths = trace_mask_to_paths(dark_mask, scale=4.0, alphamax=0.55, opttol=0.08)

    top_arc_paths = trace_mask_to_paths(top_arc_mask, scale=4.0, alphamax=0.55, opttol=0.08)
    dots_paths = trace_mask_to_paths(dots_mask, scale=4.0, alphamax=0.55, opttol=0.08)
    swirl_paths = trace_mask_to_paths(swirl_mask, scale=4.0, alphamax=0.55, opttol=0.08)
    
    dark_left_paths = trace_mask_to_paths(dark_left_mask, scale=4.0, alphamax=0.55, opttol=0.08)
    dark_right_paths = trace_mask_to_paths(dark_right_mask, scale=4.0, alphamax=0.55, opttol=0.08)
    dark_center_paths = trace_mask_to_paths(dark_center_mask, scale=4.0, alphamax=0.55, opttol=0.08)

    # Centered bounding box viewBox="340 180 576 630"
    svg_icon_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="340 180 576 630" width="100%" height="100%" shape-rendering="geometricPrecision" class="farah-chemistry-icon">
  <defs>
    <linearGradient id="fn-icon-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#048865" />
      <stop offset="50%" stop-color="#027555" />
      <stop offset="100%" stop-color="#065f46" />
    </linearGradient>
    <linearGradient id="fn-icon-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2d3748" />
      <stop offset="100%" stop-color="#1a202c" />
    </linearGradient>
  </defs>

  <!-- Group 1: Top Emerald Orbital Arch -->
  <g class="icon-group top-orbital-arc" id="fn-top-arc">
    <path class="icon-path path-emerald-arc" fill="url(#fn-icon-emerald)" fill-rule="evenodd" d="{' '.join(top_arc_paths)}" />
  </g>

  <!-- Group 2: Inner Emerald Helix & Reactant Curves -->
  <g class="icon-group inner-emerald-swirl" id="fn-emerald-swirl">
    <path class="icon-path path-emerald-swirl" fill="url(#fn-icon-emerald)" fill-rule="evenodd" d="{' '.join(swirl_paths)}" />
  </g>

  <!-- Group 3: Atomic Electron Nodes / Satellite Spheres -->
  <g class="icon-group electron-nodes" id="fn-electron-nodes">
    <path class="icon-path path-electron-nodes" fill="url(#fn-icon-emerald)" fill-rule="evenodd" d="{' '.join(dots_paths)}" />
  </g>

  <!-- Group 4: Dark Molecular Outer Wings (Left & Right) -->
  <g class="icon-group dark-orbital-wings" id="fn-dark-wings">
    <path class="icon-path path-dark-left" fill="url(#fn-icon-dark)" fill-rule="evenodd" d="{' '.join(dark_left_paths)}" />
    <path class="icon-path path-dark-right" fill="url(#fn-icon-dark)" fill-rule="evenodd" d="{' '.join(dark_right_paths)}" />
  </g>

  <!-- Group 5: Dark Core Bonding Structure -->
  <g class="icon-group dark-core-bonds" id="fn-dark-core">
    <path class="icon-path path-dark-center" fill="url(#fn-icon-dark)" fill-rule="evenodd" d="{' '.join(dark_center_paths)}" />
  </g>
</svg>'''

    out_icon_path = 'public/images/logo-icon.svg'
    with open(out_icon_path, 'w', encoding='utf-8') as f:
        f.write(svg_icon_content)
    print(f"Saved {out_icon_path}")

    # Clean flat icon version
    svg_icon_flat = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="340 180 576 630" width="100%" height="100%" shape-rendering="geometricPrecision">
  <defs>
    <linearGradient id="emeraldBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#027555"/>
    </linearGradient>
  </defs>
  <path fill="url(#emeraldBase)" fill-rule="evenodd" d="{' '.join(all_green_paths)}" />
  <path fill="#1e293b" fill-rule="evenodd" d="{' '.join(all_dark_paths)}" />
</svg>'''
    with open('public/images/logo-icon-clean.svg', 'w', encoding='utf-8') as f:
        f.write(svg_icon_flat)
    print("Saved public/images/logo-icon-clean.svg")

if __name__ == '__main__':
    main()
