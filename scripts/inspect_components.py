import os
import numpy as np
from PIL import Image
from scipy.ndimage import label
import potrace

def trace_component(comp_mask, scale=4.0, alphamax=0.55, opttol=0.08, turdsize=4):
    w, h = comp_mask.shape[1], comp_mask.shape[0]
    img = Image.fromarray((comp_mask * 255).astype(np.uint8))
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
    return ' '.join(svg_paths)

def main():
    img = Image.open('public/images/logo-icon.png')
    w, h = img.size
    arr = np.array(img)
    a = arr[:,:,3]
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]

    outer_mask = a > 120
    dark_mask = (a > 120) & (r < 75) & (g < 75) & (b < 75)
    white_mask = (a > 120) & (r > 190) & (g > 190) & (b > 190)

    # White components:
    lbl_w, num_w = label(white_mask)
    print(f"White components: {int(num_w)}")
    white_elements = []
    for i in range(1, int(num_w) + 1):
        comp = lbl_w == i
        if np.sum(comp) > 200:
            bbox = Image.fromarray(comp).getbbox()
            d_str = trace_component(comp)
            if d_str:
                white_elements.append({
                    'id': f'white_elem_{i}',
                    'count': int(np.sum(comp)),
                    'bbox': bbox,
                    'd': d_str
                })
                print(f"  White elem {i}: pixels={np.sum(comp)}, bbox={bbox}")

    # Dark components:
    lbl_d, num_d = label(dark_mask)
    print(f"\nDark components: {int(num_d)}")
    dark_elements = []
    for i in range(1, int(num_d) + 1):
        comp = lbl_d == i
        if np.sum(comp) > 200:
            bbox = Image.fromarray(comp).getbbox()
            d_str = trace_component(comp)
            if d_str:
                dark_elements.append({
                    'id': f'dark_elem_{i}',
                    'count': int(np.sum(comp)),
                    'bbox': bbox,
                    'd': d_str
                })
                print(f"  Dark elem {i}: pixels={np.sum(comp)}, bbox={bbox}")

    # Outer components:
    lbl_o, num_o = label(outer_mask)
    print(f"\nOuter components: {int(num_o)}")
    outer_elements = []
    for i in range(1, int(num_o) + 1):
        comp = lbl_o == i
        if np.sum(comp) > 200:
            bbox = Image.fromarray(comp).getbbox()
            d_str = trace_component(comp)
            if d_str:
                outer_elements.append({
                    'id': f'outer_elem_{i}',
                    'count': int(np.sum(comp)),
                    'bbox': bbox,
                    'd': d_str
                })
                print(f"  Outer elem {i}: pixels={np.sum(comp)}, bbox={bbox}")

if __name__ == '__main__':
    main()
