import os

with open('public/images/logo-icon.svg', 'r', encoding='utf-8') as f:
    svg_icon = f.read()

with open('public/images/logo.svg', 'r', encoding='utf-8') as f:
    svg_full = f.read()

template = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Farah Nashat Chemistry - 5 World-Class SVG Loading & Splash Animations</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --brand-emerald: #027555;
      --brand-emerald-light: #059669;
      --brand-emerald-neon: #10b981;
      --bg-light: #fafbfb;
      --card-bg: #ffffff;
      --card-border: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --anim-speed-factor: 1;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Tajawal', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg-light);
      color: var(--text-main);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.6;
      background-image: 
        radial-gradient(rgba(4, 120, 87, 0.06) 1.5px, transparent 1.5px),
        linear-gradient(to bottom, #ffffff, #fafbfb);
      background-size: 24px 24px, 100% 100%;
    }

    .ambient-glow {
      position: fixed;
      top: -15%;
      left: 50%;
      transform: translateX(-50%);
      width: 900px;
      height: 500px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(4, 120, 87, 0.04) 50%, transparent 75%);
      pointer-events: none;
      z-index: 0;
    }

    .container {
      max-width: 1300px;
      margin: 0 auto;
      padding: 3rem 1.5rem 6rem;
      position: relative;
      z-index: 1;
    }

    /* Header */
    header {
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(2, 117, 85, 0.08);
      border: 1px solid rgba(4, 120, 87, 0.25);
      color: #047857;
      padding: 0.4rem 1.25rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 800;
      margin-bottom: 1.25rem;
      box-shadow: 0 2px 8px rgba(4, 120, 87, 0.06);
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 10px #10b981;
      animation: pulse-dot 2s infinite;
    }

    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 900;
      letter-spacing: -0.5px;
      margin-bottom: 0.75rem;
      color: #0f172a;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 1.1rem;
      max-width: 780px;
      margin: 0 auto;
    }

    /* Controls Bar */
    .controls-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(16px);
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      padding: 1.1rem 1.75rem;
      margin-bottom: 3.5rem;
      box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.04);
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .control-label {
      font-size: 0.85rem;
      font-weight: 800;
      color: var(--text-muted);
    }

    .btn-group {
      display: flex;
      background: #f1f5f9;
      padding: 4px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .btn-toggle {
      background: transparent;
      border: none;
      color: #64748b;
      padding: 0.45rem 0.95rem;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .btn-toggle.active {
      background: var(--brand-emerald);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(2, 117, 85, 0.35);
    }

    .btn-action {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #0f172a;
      padding: 0.55rem 1.25rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: inherit;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    }

    .btn-action:hover {
      background: var(--brand-emerald);
      color: #ffffff;
      border-color: var(--brand-emerald);
      transform: translateY(-1px);
    }

    .section-title {
      font-size: 1.45rem;
      font-weight: 900;
      margin-bottom: 1.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #0f172a;
    }

    .section-title::before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 24px;
      background: var(--brand-emerald);
      border-radius: 4px;
    }

    /* 5 Animations Grid */
    .animations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .anim-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 22px;
      padding: 1.85rem;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.03);
    }

    .anim-card:hover {
      border-color: rgba(4, 120, 87, 0.4);
      transform: translateY(-5px);
      box-shadow: 0 16px 36px -10px rgba(2, 117, 85, 0.15);
    }

    .anim-badge-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .anim-badge {
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0.3rem 0.75rem;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge-primary {
      background: rgba(4, 120, 87, 0.1);
      color: #047857;
      border: 1px solid rgba(4, 120, 87, 0.2);
    }

    .badge-featured {
      background: rgba(16, 185, 129, 0.15);
      color: #065f46;
      border: 1px solid rgba(16, 185, 129, 0.35);
    }

    .anim-title {
      font-size: 1.25rem;
      font-weight: 900;
      margin-bottom: 0.4rem;
      color: #0f172a;
    }

    .anim-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      min-height: 2.8rem;
    }

    .anim-stage {
      height: 260px;
      background: radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%);
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 1px solid #e2e8f0;
      margin-bottom: 1.5rem;
      overflow: hidden;
    }

    .anim-stage.dark-preview {
      background: radial-gradient(circle at center, #111827 0%, #030712 100%);
      border-color: #1f2937;
    }

    .anim-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: auto;
    }

    .btn-splash-preview {
      flex: 1;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #166534;
      padding: 0.75rem;
      border-radius: 12px;
      font-size: 0.88rem;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-splash-preview:hover {
      background: var(--brand-emerald);
      color: #ffffff;
      border-color: var(--brand-emerald);
      box-shadow: 0 4px 14px rgba(2, 117, 85, 0.25);
    }

    .logo-container {
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .logo-container svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* =========================================================================
       MODEL 1: QUANTUM ACCELERATOR & PHOTON ORBIT (Apple/Linear Tech)
       ========================================================================= */
    .m1-stage {
      position: relative;
    }
    
    .m1-orbital-track {
      position: absolute;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 1.5px dashed rgba(4, 120, 87, 0.25);
      animation: m1-track-spin calc(8s * var(--anim-speed-factor, 1)) linear infinite;
    }

    .m1-photon-particle {
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 10px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 14px 4px #10b981, 0 0 4px #ffffff;
    }

    .m1-logo {
      animation: m1-nucleus-pulse calc(2.2s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }

    @keyframes m1-track-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes m1-nucleus-pulse {
      0% { transform: scale(0.96); filter: drop-shadow(0 2px 6px rgba(4,120,87,0.15)); }
      100% { transform: scale(1.04); filter: drop-shadow(0 6px 20px rgba(16,185,129,0.45)); }
    }

    /* =========================================================================
       MODEL 2: LIQUID CHEMICAL WAVE FILL (Vercel/Stripe Lab Aesthetic)
       ========================================================================= */
    .m2-stage {
      position: relative;
    }

    .m2-fluid-wave {
      position: absolute;
      inset: -10px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
      animation: m2-fluid-surge calc(2.5s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
      border-radius: 50%;
    }

    .m2-bubble {
      position: absolute;
      background: #10b981;
      border-radius: 50%;
      opacity: 0;
      box-shadow: 0 0 8px #34d399;
    }

    .m2-bubble-1 { width: 8px; height: 8px; left: 45%; bottom: 20%; animation: m2-bubble-rise calc(1.8s * var(--anim-speed-factor, 1)) 0.1s infinite ease-in; }
    .m2-bubble-2 { width: 6px; height: 6px; left: 58%; bottom: 25%; animation: m2-bubble-rise calc(2.1s * var(--anim-speed-factor, 1)) 0.5s infinite ease-in; }
    .m2-bubble-3 { width: 10px; height: 10px; left: 35%; bottom: 15%; animation: m2-bubble-rise calc(1.6s * var(--anim-speed-factor, 1)) 0.9s infinite ease-in; }
    .m2-bubble-4 { width: 7px; height: 7px; left: 52%; bottom: 30%; animation: m2-bubble-rise calc(2.4s * var(--anim-speed-factor, 1)) 0.3s infinite ease-in; }

    @keyframes m2-bubble-rise {
      0% { transform: translateY(0) scale(0.6); opacity: 0; }
      30% { opacity: 0.9; }
      80% { opacity: 0.9; }
      100% { transform: translateY(-70px) scale(1.2); opacity: 0; }
    }

    @keyframes m2-fluid-surge {
      0% { transform: scale(0.85); opacity: 0.3; }
      100% { transform: scale(1.15); opacity: 0.9; }
    }

    .m2-logo {
      animation: m2-meniscus-bob calc(2.5s * var(--anim-speed-factor, 1)) ease-in-out infinite;
    }

    @keyframes m2-meniscus-bob {
      0%, 100% { transform: translateY(0); filter: drop-shadow(0 4px 10px rgba(4,120,87,0.2)); }
      50% { transform: translateY(-8px); filter: drop-shadow(0 10px 24px rgba(16,185,129,0.5)); }
    }

    /* =========================================================================
       MODEL 3: HOLOGRAPHIC LASER SCAN & FACET LOCK (Sci-Fi / Modern Clean)
       ========================================================================= */
    .m3-stage {
      position: relative;
    }

    .m3-laser-beam {
      position: absolute;
      left: -15px;
      right: -15px;
      height: 3px;
      background: linear-gradient(90deg, transparent, #10b981 30%, #ffffff 50%, #10b981 70%, transparent);
      box-shadow: 0 0 16px 3px #10b981;
      animation: m3-laser-scan calc(2.4s * var(--anim-speed-factor, 1)) cubic-bezier(0.45, 0, 0.55, 1) infinite;
      z-index: 2;
    }

    @keyframes m3-laser-scan {
      0% { top: 0%; opacity: 0; }
      15% { opacity: 1; }
      85% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }

    .m3-logo {
      animation: m3-hologram-shimmer calc(2.4s * var(--anim-speed-factor, 1)) ease-in-out infinite;
    }

    @keyframes m3-hologram-shimmer {
      0%, 100% { filter: drop-shadow(0 4px 12px rgba(4,120,87,0.25)); }
      50% { filter: drop-shadow(0 0 24px rgba(16,185,129,0.7)) brightness(1.18); }
    }

    /* =========================================================================
       MODEL 4: 3D KINETIC GYROSCOPIC GIMBAL (Luxury Horology / Kinetic Rotor)
       ========================================================================= */
    .m4-stage {
      perspective: 900px;
    }

    .m4-gimbal-frame {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      animation: m4-gimbal-swivel calc(4.5s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }

    @keyframes m4-gimbal-swivel {
      0% { transform: rotateX(20deg) rotateY(-25deg) scale(0.96); }
      50% { transform: rotateX(-12deg) rotateY(18deg) scale(1.04); }
      100% { transform: rotateX(16deg) rotateY(-15deg) scale(0.98); }
    }

    .m4-logo {
      animation: m4-rotor-beat calc(1.5s * var(--anim-speed-factor, 1)) ease-in-out infinite;
    }

    @keyframes m4-rotor-beat {
      0%, 100% { filter: drop-shadow(0 4px 10px rgba(4,120,87,0.2)); }
      50% { filter: drop-shadow(0 0 20px rgba(16,185,129,0.6)); }
    }

    /* =========================================================================
       MODEL 5: BIOLUMINESCENT HARMONIC BLOOM (Organic Zen & Ripple Wave)
       ========================================================================= */
    .m5-stage {
      position: relative;
    }

    .m5-ripple-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid #10b981;
      animation: m5-ripple-expand calc(2.4s * var(--anim-speed-factor, 1)) cubic-bezier(0.1, 0.8, 0.2, 1) infinite;
    }

    .m5-ripple-2 { animation-delay: 0.8s; }
    .m5-ripple-3 { animation-delay: 1.6s; }

    @keyframes m5-ripple-expand {
      0% { transform: scale(0.5); opacity: 0.8; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    .m5-logo {
      animation: m5-harmonic-float calc(3.5s * var(--anim-speed-factor, 1)) ease-in-out infinite;
    }

    @keyframes m5-harmonic-float {
      0%, 100% { transform: translateY(0px); filter: drop-shadow(0 4px 12px rgba(4,120,87,0.2)); }
      50% { transform: translateY(-10px); filter: drop-shadow(0 14px 28px rgba(16,185,129,0.5)); }
    }

    /* Fullscreen Splash Modal (Light Mode) */
    .splash-modal {
      position: fixed;
      inset: 0;
      background: #fafbfb;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
      background-image: 
        radial-gradient(rgba(4, 120, 87, 0.08) 1.5px, transparent 1.5px),
        radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, rgba(250, 251, 251, 0.98) 70%);
      background-size: 24px 24px, 100% 100%;
    }

    .splash-modal.active {
      opacity: 1;
      pointer-events: auto;
    }

    .splash-modal-content {
      text-align: center;
      max-width: 440px;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .splash-holder {
      width: 160px;
      height: 160px;
      margin-bottom: 2rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .splash-title-text {
      font-size: 1.65rem;
      font-weight: 900;
      margin-bottom: 0.35rem;
      color: #0f172a;
    }

    .splash-sub-text {
      color: #047857;
      font-size: 0.85rem;
      font-weight: 800;
      margin-bottom: 1.75rem;
      letter-spacing: 0.5px;
    }

    .splash-bar-wrap {
      width: 220px;
      height: 5px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 0.85rem;
      position: relative;
    }

    .splash-bar-fill {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 40%;
      background: linear-gradient(90deg, #059669, #10b981, #34d399);
      border-radius: 999px;
      animation: progress-slide 1.6s ease-in-out infinite;
    }

    @keyframes progress-slide {
      0% { right: -40%; width: 20%; }
      50% { right: 40%; width: 60%; }
      100% { right: 100%; width: 20%; }
    }

    .splash-status-text {
      font-size: 0.82rem;
      color: #64748b;
      font-weight: 500;
    }

    .btn-modal-close {
      position: absolute;
      top: 2rem;
      left: 2rem;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
      padding: 0.5rem 1.25rem;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      font-family: inherit;
      transition: all 0.2s;
    }

    .btn-modal-close:hover {
      background: #f1f5f9;
      color: #0f172a;
    }

    .toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #047857;
      color: #ffffff;
      padding: 0.75rem 1.75rem;
      border-radius: 999px;
      font-size: 0.9rem;
      font-weight: 800;
      box-shadow: 0 10px 25px -5px rgba(4, 120, 87, 0.4);
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 20000;
      pointer-events: none;
    }

    .toast.show {
      transform: translateX(-50%) translateY(0);
    }
  </style>
</head>
<body>

  <div class="ambient-glow"></div>

  <div class="container">
    
    <header>
      <div class="badge">
        <span class="badge-dot"></span>
        <span>Premium Vector Motion Suite • أحدث مكتبة تحريك متطورة</span>
      </div>
      <h1>5 نماذج تحريك عالمية لأيقونة الكيمياء (Light Mode Splash & Loaders)</h1>
      <p class="subtitle">
        تمت إعادة هندسة الحركات بالكامل وفق أعلى معايير الـ Motion Design لتعكس الهوية العلمية والتفاعلية لمنصة أ. فرح نشأت بوضوح تام ودقة فائقة.
      </p>
    </header>

    <!-- Toolbar -->
    <div class="controls-bar">
      <div class="control-group">
        <span class="control-label">سرعة الحركة:</span>
        <div class="btn-group">
          <button class="btn-toggle" onclick="setSpeed(0.5, this)">0.5x بطيء</button>
          <button class="btn-toggle active" onclick="setSpeed(1.0, this)">1.0x قياسي</button>
          <button class="btn-toggle" onclick="setSpeed(1.5, this)">1.5x سريع</button>
          <button class="btn-toggle" onclick="setSpeed(2.0, this)">2.0x فائق</button>
        </div>
      </div>

      <div class="control-group">
        <button class="btn-action" onclick="downloadSVG()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>تحميل ملف الـ SVG النقي</span>
        </button>
        <button class="btn-action" onclick="copySVGSource()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>نسخ كود الـ SVG</span>
        </button>
      </div>
    </div>

    <!-- Section: 5 Masterpiece Animations -->
    <div class="section-title">اختر النموذج الأنسب لاعتماده فوراً في الموقع</div>
    <div class="animations-grid">
      
      <!-- Model 1 -->
      <div class="anim-card" id="card-1">
        <div class="anim-badge-row">
          <span class="anim-badge badge-primary">Tech / Apple Style</span>
          <span style="font-family: Outfit; font-weight: 900; color: #cbd5e1;">01</span>
        </div>
        <div class="anim-title">1. مسرع الفوتونات المداري (Quantum Accelerator)</div>
        <div class="anim-desc">جسيم فوتوني زمردي مشع يدور بسرعة فائقة حول المدار الخارجي مع نبض مغناطيسي هادئ للنواة الكيميائية.</div>
        <div class="anim-stage">
          <div class="logo-container m1-stage">
            <div class="m1-orbital-track">
              <div class="m1-photon-particle"></div>
            </div>
            <div class="m1-logo">
              __SVG_ICON__
            </div>
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(1)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>تجربة شاشة البداية (Full Splash)</span>
          </button>
        </div>
      </div>

      <!-- Model 2 -->
      <div class="anim-card" id="card-2">
        <div class="anim-badge-row">
          <span class="anim-badge badge-featured">Chemistry Fluid / Stripe Style</span>
          <span style="font-family: Outfit; font-weight: 900; color: #cbd5e1;">02</span>
        </div>
        <div class="anim-title">2. فوران المحلول الكيميائي (Chemical Effervescence)</div>
        <div class="anim-desc">محاكاة تصاعد فقاعات كربونية تفاعلية حية تطفو وتنبثق للأعلى مع تموج مائع فيزيائي داخل الأيقونة.</div>
        <div class="anim-stage">
          <div class="logo-container m2-stage">
            <div class="m2-fluid-wave"></div>
            <div class="m2-bubble m2-bubble-1"></div>
            <div class="m2-bubble m2-bubble-2"></div>
            <div class="m2-bubble m2-bubble-3"></div>
            <div class="m2-bubble m2-bubble-4"></div>
            <div class="m2-logo">
              __SVG_ICON__
            </div>
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(2)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>تجربة شاشة البداية (Full Splash)</span>
          </button>
        </div>
      </div>

      <!-- Model 3 -->
      <div class="anim-card" id="card-3">
        <div class="anim-badge-row">
          <span class="anim-badge badge-primary">Sci-Fi / Hologram Scan</span>
          <span style="font-family: Outfit; font-weight: 900; color: #cbd5e1;">03</span>
        </div>
        <div class="anim-title">3. المسح الليزري الهولوجرامي (Laser Hologram Scan)</div>
        <div class="anim-desc">شعاع ليزر زمردي يمسح الأيقونة عمودياً من الأعلى للأسفل ليضيء أضلاع الفيكتور ببريق زجاجي كريستالي.</div>
        <div class="anim-stage">
          <div class="logo-container m3-stage">
            <div class="m3-laser-beam"></div>
            <div class="m3-logo">
              __SVG_ICON__
            </div>
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(3)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>تجربة شاشة البداية (Full Splash)</span>
          </button>
        </div>
      </div>

      <!-- Model 4 -->
      <div class="anim-card" id="card-4">
        <div class="anim-badge-row">
          <span class="anim-badge badge-primary">3D Horology / Kinetic Rotor</span>
          <span style="font-family: Outfit; font-weight: 900; color: #cbd5e1;">04</span>
        </div>
        <div class="anim-title">4. الجيروسكوب الحركي ثلاثي الأبعاد (3D Kinetic Gimbal)</div>
        <div class="anim-desc">دوران متعدد المحاور في فضاء 3D حقيقي بزوايا ميل انسيابية تبرز عمق الأجنحة المدارية ونواة الذرة.</div>
        <div class="anim-stage">
          <div class="logo-container m4-stage">
            <div class="m4-gimbal-frame">
              <div class="m4-logo">
                __SVG_ICON__
              </div>
            </div>
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(4)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>تجربة شاشة البداية (Full Splash)</span>
          </button>
        </div>
      </div>

      <!-- Model 5 -->
      <div class="anim-card" id="card-5">
        <div class="anim-badge-row">
          <span class="anim-badge badge-primary">Bioluminescent Organic</span>
          <span style="font-family: Outfit; font-weight: 900; color: #cbd5e1;">05</span>
        </div>
        <div class="anim-title">5. موجات الشفق والطفو الحيوي (Aurora Wave Bloom)</div>
        <div class="anim-desc">موجات إشعاعية دائرية متتالية تنطلق من المركز مع طفو انسيابي هادئ للأيقونة يمنح شعوراً بالهيبة والجمال.</div>
        <div class="anim-stage">
          <div class="logo-container m5-stage">
            <div class="m5-ripple-ring"></div>
            <div class="m5-ripple-ring m5-ripple-2"></div>
            <div class="m5-ripple-ring m5-ripple-3"></div>
            <div class="m5-logo">
              __SVG_ICON__
            </div>
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(5)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>تجربة شاشة البداية (Full Splash)</span>
          </button>
        </div>
      </div>

    </div>

  </div>

  <!-- Fullscreen Interactive Light Splash Modal -->
  <div class="splash-modal" id="splashModal">
    <button class="btn-modal-close" onclick="closeSplash()">إغلاق المعاينة ✕</button>
    <div class="splash-modal-content">
      <div class="splash-holder" id="splashHolder"></div>
      <div class="splash-title-text">منصة أ. فرح نشأت للكيمياء</div>
      <div class="splash-sub-text">FARAH NASHAT • CHEMISTRY & 3D LAB</div>
      <div class="splash-bar-wrap">
        <div class="splash-bar-fill"></div>
      </div>
      <div class="splash-status-text">جاري تهيئة المختبر الافتراضي ومكتبة التفاعلات...</div>
    </div>
  </div>

  <div class="toast" id="toast">تم النسخ بنجاح!</div>

  <script>
    const rawSvgCode = `__SVG_ICON__`;
    let currentSpeed = 1.0;

    function setSpeed(factor, btn) {
      currentSpeed = factor;
      document.documentElement.style.setProperty('--anim-speed-factor', 1 / factor);
      
      const buttons = btn.parentElement.querySelectorAll('.btn-toggle');
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast('تم تعديل سرعة الحركة إلى: ' + factor + 'x');
    }

    function openSplash(index) {
      const holder = document.getElementById('splashHolder');
      const modal = document.getElementById('splashModal');
      
      if (index === 1) {
        holder.innerHTML = '<div class="logo-container m1-stage"><div class="m1-orbital-track"><div class="m1-photon-particle"></div></div><div class="m1-logo">' + rawSvgCode + '</div></div>';
      } else if (index === 2) {
        holder.innerHTML = '<div class="logo-container m2-stage"><div class="m2-fluid-wave"></div><div class="m2-bubble m2-bubble-1"></div><div class="m2-bubble m2-bubble-2"></div><div class="m2-bubble m2-bubble-3"></div><div class="m2-logo">' + rawSvgCode + '</div></div>';
      } else if (index === 3) {
        holder.innerHTML = '<div class="logo-container m3-stage"><div class="m3-laser-beam"></div><div class="m3-logo">' + rawSvgCode + '</div></div>';
      } else if (index === 4) {
        holder.innerHTML = '<div class="logo-container m4-stage"><div class="m4-gimbal-frame"><div class="m4-logo">' + rawSvgCode + '</div></div></div>';
      } else if (index === 5) {
        holder.innerHTML = '<div class="logo-container m5-stage"><div class="m5-ripple-ring"></div><div class="m5-ripple-ring m5-ripple-2"></div><div class="m5-logo">' + rawSvgCode + '</div></div>';
      }

      modal.classList.add('active');
    }

    function closeSplash() {
      document.getElementById('splashModal').classList.remove('active');
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    }

    function copySVGSource() {
      navigator.clipboard.writeText(rawSvgCode).then(() => {
        showToast('✓ تم نسخ كود SVG بالكامل إلى الحافظة');
      });
    }

    function downloadSVG() {
      const blob = new Blob([rawSvgCode], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'farah-nashat-chemistry-icon.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('✓ تم بدء تحميل ملف SVG');
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSplash();
      }
    });
  </script>
</body>
</html>"""

final_html = template.replace('__SVG_ICON__', svg_icon).replace('__SVG_FULL__', svg_full)

with open('logo-loading-animations.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

with open('public/logo-loading-animations.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Generated masterpiece animation showcase!")
