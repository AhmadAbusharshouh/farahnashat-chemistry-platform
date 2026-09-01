import os

# Read the path data from public/images/logo-icon.svg or build script
with open('public/images/logo-icon.svg', 'r', encoding='utf-8') as f:
    raw_svg = f.read()

# Let's extract the paths
import re

arc_match = re.search(r'class="emblem-path path-arc"[^>]*d="([^"]+)"', raw_svg)
swirl_match = re.search(r'class="emblem-path path-swirl"[^>]*d="([^"]+)"', raw_svg)
nodes_match = re.search(r'class="emblem-path path-nodes"[^>]*d="([^"]+)"', raw_svg)
wing_l_match = re.search(r'class="emblem-path path-wing-left"[^>]*d="([^"]+)"', raw_svg)
wing_r_match = re.search(r'class="emblem-path path-wing-right"[^>]*d="([^"]+)"', raw_svg)
core_match = re.search(r'class="emblem-path path-core"[^>]*d="([^"]+)"', raw_svg)

arc_d = arc_match.group(1) if arc_match else ""
swirl_d = swirl_match.group(1) if swirl_match else ""
nodes_d = nodes_match.group(1) if nodes_match else ""
wing_l_d = wing_l_match.group(1) if wing_l_match else ""
wing_r_d = wing_r_match.group(1) if wing_r_match else ""
core_d = core_match.group(1) if core_match else ""

all_green_d = f"{arc_d} {swirl_d} {nodes_d}"
all_dark_d = f"{wing_l_d} {wing_r_d} {core_d}"

print(f"Extracted paths: arc={len(arc_d)}, swirl={len(swirl_d)}, nodes={len(nodes_d)}, wings={len(wing_l_d) + len(wing_r_d)}, core={len(core_d)}")

# =========================================================================
# 1. NATIVE SMIL SVG 1: Quantum Accelerator & Photon Orbit
# =========================================================================
smil_1 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 546 630" width="100%" height="100%" shape-rendering="geometricPrecision">
  <defs>
    <linearGradient id="smil1-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669">
        <animate attributeName="stop-color" values="#059669;#10b981;#059669" dur="3s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="#027555">
        <animate attributeName="stop-color" values="#027555;#047857;#027555" dur="3s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
    <linearGradient id="smil1-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="smil1-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur">
        <animate attributeName="stdDeviation" values="4;14;4" dur="2.4s" repeatCount="indefinite" />
      </feGaussianBlur>
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Ambient Pulsing Aura -->
  <circle cx="273" cy="315" r="180" fill="rgba(16, 185, 129, 0.08)">
    <animate attributeName="r" values="160;210;160" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" />
    <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.8s" repeatCount="indefinite" />
  </circle>

  <!-- Native Orbital Guide Ellipse -->
  <ellipse cx="273" cy="315" rx="230" ry="210" fill="none" stroke="#047857" stroke-width="2" stroke-dasharray="8 12" opacity="0.35">
    <animateTransform attributeName="transform" type="rotate" from="0 273 315" to="360 273 315" dur="12s" repeatCount="indefinite" />
  </ellipse>

  <!-- Native Revolving Photon Particle -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="0 273 315" to="360 273 315" dur="3.5s" repeatCount="indefinite" />
    <circle cx="503" cy="315" r="9" fill="#10b981" filter="url(#smil1-glow)">
      <animate attributeName="r" values="7;11;7" dur="1.75s" repeatCount="indefinite" />
    </circle>
    <circle cx="503" cy="315" r="4" fill="#ffffff" />
  </g>

  <!-- Counter Photon Particle -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="360 273 315" to="0 273 315" dur="5s" repeatCount="indefinite" />
    <circle cx="43" cy="315" r="7" fill="#34d399" filter="url(#smil1-glow)" />
    <circle cx="43" cy="315" r="3" fill="#ffffff" />
  </g>

  <!-- Main Emblem Group with Native Breathing Scale -->
  <g id="smil1-emblem-core">
    <animateTransform attributeName="transform" type="scale" values="0.96;1.03;0.96" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" additive="sum" />
    <animateTransform attributeName="transform" type="translate" values="10.9 12.6; -8.2 -9.4; 10.9 12.6" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" additive="sum" />

    <!-- Emerald Elements -->
    <path fill="url(#smil1-emerald)" fill-rule="evenodd" d="{all_green_d}">
      <animate attributeName="opacity" values="0.85;1;0.85" dur="2.4s" repeatCount="indefinite" />
    </path>

    <!-- Dark Molecular Elements -->
    <path fill="url(#smil1-dark)" fill-rule="evenodd" d="{all_dark_d}" />
  </g>
</svg>'''

# =========================================================================
# 2. NATIVE SMIL SVG 2: Chemical Liquid Fill & Effervescent Bubbles
# =========================================================================
smil_2 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 546 630" width="100%" height="100%" shape-rendering="geometricPrecision">
  <defs>
    <linearGradient id="smil2-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#027555" />
    </linearGradient>
    <linearGradient id="smil2-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    
    <!-- Native Rising Wave Clip -->
    <clipPath id="smil2-liquid-clip">
      <path d="M-100 0 Q 150 -30, 400 0 T 900 0 L 900 700 L -100 700 Z">
        <animateTransform attributeName="transform" type="translate" values="0 650; 0 50; 0 0" keyTimes="0; 0.8; 1" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.2 0 0 1" />
      </path>
    </clipPath>
  </defs>

  <!-- Base Translucent Ghost Silhouette -->
  <g opacity="0.2">
    <path fill="#047857" fill-rule="evenodd" d="{all_green_d}" />
    <path fill="#0f172a" fill-rule="evenodd" d="{all_dark_d}" />
  </g>

  <!-- Liquid Filled Layer -->
  <g clip-path="url(#smil2-liquid-clip)">
    <path fill="url(#smil2-emerald)" fill-rule="evenodd" d="{all_green_d}">
      <animate attributeName="filter" values="none; drop-shadow(0 0 16px #10b981); none" dur="3s" repeatCount="indefinite" />
    </path>
    <path fill="url(#smil2-dark)" fill-rule="evenodd" d="{all_dark_d}" />
  </g>

  <!-- Native Buoyant Ascending Micro-Bubbles -->
  <g>
    <!-- Bubble 1 -->
    <circle cx="260" cy="520" r="7" fill="#10b981">
      <animate attributeName="cy" values="540; 260" dur="2s" repeatCount="indefinite" />
      <animate attributeName="cx" values="260; 275; 255; 268" dur="2s" repeatCount="indefinite" />
      <animate attributeName="r" values="3; 8; 0" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" />
    </circle>

    <!-- Bubble 2 -->
    <circle cx="290" cy="500" r="5" fill="#34d399">
      <animate attributeName="cy" values="520; 230" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
      <animate attributeName="cx" values="290; 280; 295; 285" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
      <animate attributeName="r" values="2; 7; 0" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0; 1; 1; 0" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
    </circle>

    <!-- Bubble 3 -->
    <circle cx="235" cy="480" r="9" fill="#059669">
      <animate attributeName="cy" values="500; 200" dur="2.8s" begin="0.8s" repeatCount="indefinite" />
      <animate attributeName="cx" values="235; 250; 230; 245" dur="2.8s" begin="0.8s" repeatCount="indefinite" />
      <animate attributeName="r" values="4; 10; 0" dur="2.8s" begin="0.8s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0; 1; 1; 0" dur="2.8s" begin="0.8s" repeatCount="indefinite" />
    </circle>
  </g>
</svg>'''

# =========================================================================
# 3. NATIVE SMIL SVG 3: Sci-Fi Laser Scan & Hologram Facet Lock
# =========================================================================
smil_3 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 546 630" width="100%" height="100%" shape-rendering="geometricPrecision">
  <defs>
    <linearGradient id="smil3-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#027555" />
    </linearGradient>
    <linearGradient id="smil3-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="smil3-laser-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent" />
      <stop offset="30%" stop-color="#10b981" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="70%" stop-color="#10b981" />
      <stop offset="100%" stop-color="transparent" />
    </linearGradient>
  </defs>

  <!-- Background HUD Grid Target Rings -->
  <circle cx="273" cy="315" r="210" fill="none" stroke="#047857" stroke-width="1.5" stroke-dasharray="12 24" opacity="0.3">
    <animateTransform attributeName="transform" type="rotate" from="0 273 315" to="360 273 315" dur="16s" repeatCount="indefinite" />
  </circle>
  <circle cx="273" cy="315" r="160" fill="none" stroke="#10b981" stroke-width="1" stroke-dasharray="6 18" opacity="0.25">
    <animateTransform attributeName="transform" type="rotate" from="360 273 315" to="0 273 315" dur="10s" repeatCount="indefinite" />
  </circle>

  <!-- Main Emblem with Native Holographic Shimmer -->
  <g id="smil3-hologram">
    <path fill="url(#smil3-emerald)" fill-rule="evenodd" d="{all_green_d}">
      <animate attributeName="opacity" values="0.75; 1; 0.75" dur="2.2s" repeatCount="indefinite" />
    </path>
    <path fill="url(#smil3-dark)" fill-rule="evenodd" d="{all_dark_d}" />
  </g>

  <!-- Native Laser Scanning Bar -->
  <g>
    <line x1="20" y1="0" x2="526" y2="0" stroke="url(#smil3-laser-grad)" stroke-width="4">
      <animateTransform attributeName="transform" type="translate" values="0 40; 0 590; 0 40" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" />
    </line>
    <line x1="120" y1="0" x2="426" y2="0" stroke="#ffffff" stroke-width="2" opacity="0.9">
      <animateTransform attributeName="transform" type="translate" values="0 40; 0 590; 0 40" dur="2.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" />
    </line>
  </g>
</svg>'''

# =========================================================================
# 4. NATIVE SMIL SVG 4: 3D Kinetic Gyroscope & Atomic Rotor
# =========================================================================
smil_4 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 546 630" width="100%" height="100%" shape-rendering="geometricPrecision">
  <defs>
    <linearGradient id="smil4-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#027555" />
    </linearGradient>
    <linearGradient id="smil4-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>

  <!-- Top Orbital Arc Rotating on Orbit Axis -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="-6 273 250" to="6 273 250" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1" />
    <path fill="url(#smil4-emerald)" fill-rule="evenodd" d="{arc_d}" />
  </g>

  <!-- Chemical Swirl & Electron Nodes Pulsing -->
  <g>
    <animateTransform attributeName="transform" type="scale" values="0.95; 1.05; 0.95" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" additive="sum" />
    <animateTransform attributeName="transform" type="translate" values="13.6 15.7; -13.6 -15.7; 13.6 15.7" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" additive="sum" />
    
    <path fill="url(#smil4-emerald)" fill-rule="evenodd" d="{swirl_d}" />
    <path fill="url(#smil4-emerald)" fill-rule="evenodd" d="{nodes_d}">
      <animate attributeName="opacity" values="0.6; 1; 0.6" dur="1.2s" repeatCount="indefinite" />
    </path>
  </g>

  <!-- Lateral Wings with Harmonic Sway -->
  <g>
    <animateTransform attributeName="transform" type="rotate" from="3 273 315" to="-3 273 315" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1" />
    <path fill="url(#smil4-dark)" fill-rule="evenodd" d="{wing_l_d} {wing_r_d}" />
  </g>

  <!-- Core Molecular Bonds -->
  <g>
    <path fill="url(#smil4-dark)" fill-rule="evenodd" d="{core_d}" />
  </g>
</svg>'''

# =========================================================================
# 5. NATIVE SMIL SVG 5: Bioluminescent Aurora Waves & Harmonic Float
# =========================================================================
smil_5 = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 546 630" width="100%" height="100%" shape-rendering="geometricPrecision">
  <defs>
    <linearGradient id="smil5-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669">
        <animate attributeName="stop-color" values="#059669;#10b981;#34d399;#059669" dur="4s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="#027555" />
    </linearGradient>
    <linearGradient id="smil5-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>

  <!-- Native Expanding Energy Shockwave Rings -->
  <circle cx="273" cy="315" r="40" fill="none" stroke="#10b981" stroke-width="2.5">
    <animate attributeName="r" values="40; 240" dur="2.4s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.8; 0" dur="2.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="273" cy="315" r="40" fill="none" stroke="#34d399" stroke-width="2">
    <animate attributeName="r" values="40; 240" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.8; 0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
  </circle>
  <circle cx="273" cy="315" r="40" fill="none" stroke="#059669" stroke-width="1.5">
    <animate attributeName="r" values="40; 240" dur="2.4s" begin="1.6s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.8; 0" dur="2.4s" begin="1.6s" repeatCount="indefinite" />
  </circle>

  <!-- Floating Emblem Assembly -->
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -14; 0 0" dur="3.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" />
    
    <path fill="url(#smil5-emerald)" fill-rule="evenodd" d="{all_green_d}">
      <animate attributeName="opacity" values="0.8; 1; 0.8" dur="2s" repeatCount="indefinite" />
    </path>
    <path fill="url(#smil5-dark)" fill-rule="evenodd" d="{all_dark_d}" />
  </g>
</svg>'''

# Write individual native SMIL SVG files to public/images/
os.makedirs('public/images/smil', exist_ok=True)
with open('public/images/smil/native-anim-1.svg', 'w', encoding='utf-8') as f:
    f.write(smil_1)
with open('public/images/smil/native-anim-2.svg', 'w', encoding='utf-8') as f:
    f.write(smil_2)
with open('public/images/smil/native-anim-3.svg', 'w', encoding='utf-8') as f:
    f.write(smil_3)
with open('public/images/smil/native-anim-4.svg', 'w', encoding='utf-8') as f:
    f.write(smil_4)
with open('public/images/smil/native-anim-5.svg', 'w', encoding='utf-8') as f:
    f.write(smil_5)

# Also update the main public/images/logo-icon.svg to be native SMIL animated SVG!
with open('public/images/logo-icon.svg', 'w', encoding='utf-8') as f:
    f.write(smil_1)

print("Saved all 5 native SMIL SVGs to public/images/smil/!")
