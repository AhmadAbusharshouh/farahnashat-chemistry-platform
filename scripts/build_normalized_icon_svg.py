import os
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
        d = [f'M {start.x / scale:.2f} {start.y / scale:.2f}']
        for seg in curve.segments:
            if seg.is_corner:
                c = seg.c
                end = seg.end_point
                d.append(f'L {c.x / scale:.2f} {c.y / scale:.2f} L {end.x / scale:.2f} {end.y / scale:.2f}')
            else:
                c1, c2 = seg.c1, seg.c2
                end = seg.end_point
                d.append(f'C {c1.x / scale:.2f} {c1.y / scale:.2f}, {c2.x / scale:.2f} {c2.y / scale:.2f}, {end.x / scale:.2f} {end.y / scale:.2f}')
        d.append('Z')
        svg_paths.append(' '.join(d))
    return svg_paths

def main():
    img_path = 'public/images/logo.png'
    img = Image.open(img_path)
    arr = np.array(img)
    
    # Exact top icon crop box: [285..915, 455..1001]
    y0, y1 = 285, 915
    x0, x1 = 455, 1001
    icon_crop = arr[y0:y1, x0:x1]
    crop_h, crop_w = icon_crop.shape[0], icon_crop.shape[1]
    
    r_c, g_c, b_c = icon_crop[:,:,0], icon_crop[:,:,1], icon_crop[:,:,2]
    fg_c = (r_c < 235) | (g_c < 235) | (b_c < 235)

    green_c = fg_c & (g_c > 70) & (r_c < 60) & (b_c < 120)
    dark_c = fg_c & (~green_c)

    # Sub-component grouping:
    lbl_g, num_g = label(green_c)
    top_arc_mask = lbl_g == 1
    dots_mask = np.zeros_like(green_c)
    swirl_mask = np.zeros_like(green_c)
    
    for i in range(2, int(num_g) + 1):
        c_mask = lbl_g == i
        cnt = int(np.sum(c_mask))
        if cnt > 30:
            bbox = Image.fromarray(c_mask).getbbox()
            if bbox:
                bw = bbox[2] - bbox[0]
                bh = bbox[3] - bbox[1]
                if max(bw, bh) < 60 and cnt < 2000:
                    dots_mask |= c_mask
                else:
                    swirl_mask |= c_mask

    lbl_d, num_d = label(dark_c)
    dark_left_mask = np.zeros_like(dark_c)
    dark_right_mask = np.zeros_like(dark_c)
    dark_center_mask = np.zeros_like(dark_c)
    
    for i in range(1, int(num_d) + 1):
        c_mask = lbl_d == i
        if np.sum(c_mask) > 50:
            bbox = Image.fromarray(c_mask).getbbox()
            if bbox:
                # Relative to crop width (546):
                # Left < 180, Right > 360, Center in between
                if bbox[0] < 180:
                    dark_left_mask |= c_mask
                elif bbox[0] > 360:
                    dark_right_mask |= c_mask
                else:
                    dark_center_mask |= c_mask

    print(f"Tracing normalized vector paths ({crop_w}x{crop_h})...")
    all_green_paths = trace_mask_to_paths(green_c)
    all_dark_paths = trace_mask_to_paths(dark_c)

    top_arc_paths = trace_mask_to_paths(top_arc_mask)
    dots_paths = trace_mask_to_paths(dots_mask)
    swirl_paths = trace_mask_to_paths(swirl_mask)

    dark_left_paths = trace_mask_to_paths(dark_left_mask)
    dark_right_paths = trace_mask_to_paths(dark_right_mask)
    dark_center_paths = trace_mask_to_paths(dark_center_mask)

    # Clean Normalized SVG
    svg_normalized = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {crop_w} {crop_h}" width="100%" height="100%" shape-rendering="geometricPrecision" class="farah-icon-svg">
  <defs>
    <linearGradient id="fnEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="50%" stop-color="#027555" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="fnDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>

  <!-- Top Emerald Orbital Arch -->
  <g class="icon-layer layer-emerald-arc">
    <path fill="url(#fnEmeraldGrad)" fill-rule="evenodd" d="{' '.join(top_arc_paths)}" />
  </g>

  <!-- Emerald Chemical Helix / Inner Curves -->
  <g class="icon-layer layer-emerald-swirl">
    <path fill="url(#fnEmeraldGrad)" fill-rule="evenodd" d="{' '.join(swirl_paths)}" />
  </g>

  <!-- Atomic Electron Spheres -->
  <g class="icon-layer layer-electron-nodes">
    <path fill="url(#fnEmeraldGrad)" fill-rule="evenodd" d="{' '.join(dots_paths)}" />
  </g>

  <!-- Dark Molecular Wings (Left & Right) -->
  <g class="icon-layer layer-dark-wings">
    <path fill="url(#fnDarkGrad)" fill-rule="evenodd" d="{' '.join(dark_left_paths)}" />
    <path fill="url(#fnDarkGrad)" fill-rule="evenodd" d="{' '.join(dark_right_paths)}" />
  </g>

  <!-- Dark Core Molecular Bonds -->
  <g class="icon-layer layer-dark-core">
    <path fill="url(#fnDarkGrad)" fill-rule="evenodd" d="{' '.join(dark_center_paths)}" />
  </g>
</svg>'''

    with open('public/images/logo-icon.svg', 'w', encoding='utf-8') as f:
        f.write(svg_normalized)
    print("Saved public/images/logo-icon.svg")

    svg_flat = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {crop_w} {crop_h}" width="100%" height="100%" shape-rendering="geometricPrecision">
  <defs>
    <linearGradient id="emeraldBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#027555"/>
    </linearGradient>
  </defs>
  <path fill="url(#emeraldBase)" fill-rule="evenodd" d="{' '.join(all_green_paths)}" />
  <path fill="#0f172a" fill-rule="evenodd" d="{' '.join(all_dark_paths)}" />
</svg>'''
    with open('public/images/logo-icon-clean.svg', 'w', encoding='utf-8') as f:
        f.write(svg_flat)
    print("Saved public/images/logo-icon-clean.svg")

if __name__ == '__main__':
    main()
