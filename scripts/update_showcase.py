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
  <title>أيقونة شعار أ. فرح نشأت للكيمياء - 100% SVG Vector وتأثيرات التحميل</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --brand-emerald: #027555;
      --brand-emerald-light: #059669;
      --brand-emerald-glow: rgba(2, 117, 85, 0.45);
      --bg-dark: #090d12;
      --bg-card: #111822;
      --bg-card-border: #1e293b;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --anim-speed-factor: 1;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Tajawal', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-main);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.6;
    }

    .ambient-glow {
      position: fixed;
      top: -20%;
      left: 50%;
      transform: translateX(-50%);
      width: 900px;
      height: 550px;
      background: radial-gradient(circle, rgba(2, 117, 85, 0.28) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 75%);
      pointer-events: none;
      z-index: 0;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem 5rem;
      position: relative;
      z-index: 1;
    }

    /* Header */
    header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(2, 117, 85, 0.15);
      border: 1px solid rgba(5, 150, 105, 0.35);
      color: #34d399;
      padding: 0.35rem 1.1rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
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
      font-size: 2.3rem;
      font-weight: 900;
      letter-spacing: -0.5px;
      margin-bottom: 0.75rem;
      background: linear-gradient(135deg, #ffffff 30%, #a7f3d0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 1.05rem;
      max-width: 760px;
      margin: 0 auto 2rem;
    }

    /* Controls Bar */
    .controls-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      background: rgba(17, 24, 34, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid var(--bg-card-border);
      border-radius: 16px;
      padding: 1rem 1.5rem;
      margin-bottom: 3rem;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .control-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-muted);
    }

    .btn-group {
      display: flex;
      background: rgba(15, 23, 42, 0.8);
      padding: 3px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .btn-toggle {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 0.4rem 0.85rem;
      border-radius: 7px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .btn-toggle.active {
      background: var(--brand-emerald);
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(2, 117, 85, 0.4);
    }

    .btn-action {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      padding: 0.5rem 1.1rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: inherit;
    }

    .btn-action:hover {
      background: var(--brand-emerald);
      border-color: var(--brand-emerald);
      transform: translateY(-1px);
    }

    .section-title {
      font-size: 1.4rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .section-title::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 24px;
      background: var(--brand-emerald-light);
      border-radius: 4px;
    }

    /* Comparison Grid */
    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-bottom: 4rem;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--bg-card-border);
      border-radius: 20px;
      padding: 1.75rem;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .card-tag {
      font-size: 0.75rem;
      font-weight: 800;
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      text-transform: uppercase;
    }

    .tag-png { background: #334155; color: #cbd5e1; }
    .tag-svg { background: rgba(2, 117, 85, 0.25); color: #34d399; border: 1px solid rgba(5, 150, 105, 0.3); }
    .tag-anim { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }

    .preview-canvas {
      height: 220px;
      background: radial-gradient(circle at center, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.9) 100%);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      border: 1px dashed rgba(255, 255, 255, 0.08);
    }

    .preview-canvas.theme-light {
      background: radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%);
      border-color: #cbd5e1;
    }

    .preview-canvas img, .preview-canvas svg {
      max-width: 140px;
      max-height: 140px;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .card-footer {
      margin-top: 1.25rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Animations Grid */
    .animations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .anim-card {
      background: var(--bg-card);
      border: 1px solid var(--bg-card-border);
      border-radius: 20px;
      padding: 1.75rem;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .anim-card:hover {
      border-color: rgba(16, 185, 129, 0.45);
      transform: translateY(-4px);
      box-shadow: 0 12px 30px -10px rgba(2, 117, 85, 0.25);
    }

    .anim-number {
      font-family: 'Outfit', sans-serif;
      font-size: 1.75rem;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.1);
      position: absolute;
      top: 1.25rem;
      left: 1.5rem;
    }

    .anim-title {
      font-size: 1.15rem;
      font-weight: 800;
      margin-bottom: 0.35rem;
      color: #ffffff;
    }

    .anim-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 1.25rem;
      min-height: 2.8rem;
    }

    .anim-stage {
      height: 250px;
      background: radial-gradient(circle at center, #131c2a 0%, #0b1017 100%);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.05);
      margin-bottom: 1.25rem;
      overflow: hidden;
    }

    .anim-stage.theme-light {
      background: radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%);
      border-color: #e2e8f0;
    }

    .anim-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }

    .btn-splash-preview {
      flex: 1;
      background: rgba(2, 117, 85, 0.18);
      border: 1px solid rgba(5, 150, 105, 0.35);
      color: #34d399;
      padding: 0.6rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-splash-preview:hover {
      background: var(--brand-emerald);
      color: #ffffff;
    }

    .btn-copy-code {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-muted);
      padding: 0.6rem 0.9rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-copy-code:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
    }

    .logo-svg-wrap {
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .logo-svg-wrap svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* Animation 1 */
    .anim-box-1 .logo-svg-wrap {
      animation: a1-breathe calc(2.4s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }
    .anim-box-1 .a1-halo {
      position: absolute;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 70%);
      animation: a1-halo-pulse calc(2.4s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
      pointer-events: none;
    }
    @keyframes a1-breathe {
      0% { transform: scale(0.95); filter: drop-shadow(0 0 2px rgba(16,185,129,0.2)); }
      100% { transform: scale(1.05); filter: drop-shadow(0 0 16px rgba(16,185,129,0.8)); }
    }
    @keyframes a1-halo-pulse {
      0% { transform: scale(0.8); opacity: 0.3; }
      100% { transform: scale(1.3); opacity: 0.85; }
    }

    /* Animation 2 */
    .anim-box-2 .logo-svg-wrap {
      animation: a2-surge calc(2s * var(--anim-speed-factor, 1)) ease-in-out infinite;
    }
    .anim-box-2 .a2-reaction-ripple {
      position: absolute;
      inset: -15px;
      border: 2px solid rgba(52, 211, 153, 0.5);
      border-radius: 50%;
      animation: a2-ripple-out calc(2s * var(--anim-speed-factor, 1)) cubic-bezier(0.1, 0.7, 0.1, 1) infinite;
      pointer-events: none;
    }
    @keyframes a2-surge {
      0%, 100% { transform: scale(0.98); filter: drop-shadow(0 0 4px #047857); }
      50% { transform: scale(1.06); filter: drop-shadow(0 0 20px #10b981) brightness(1.2); }
    }
    @keyframes a2-ripple-out {
      0% { transform: scale(0.6); opacity: 0.9; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    /* Animation 3 (Selected Splash) */
    .anim-box-3 .logo-svg-wrap {
      animation: a3-entrance calc(2s * var(--anim-speed-factor, 1)) cubic-bezier(0.16, 1, 0.3, 1) infinite alternate;
    }
    @keyframes a3-entrance {
      0% {
        transform: scale(0.85);
        filter: drop-shadow(0 0 4px rgba(4, 120, 87, 0.4));
        opacity: 0.7;
      }
      50% {
        transform: scale(1.05);
        filter: drop-shadow(0 0 28px rgba(16, 185, 129, 0.95)) brightness(1.2);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        filter: drop-shadow(0 4px 14px rgba(4, 120, 87, 0.3));
        opacity: 1;
      }
    }

    /* Animation 4 */
    .anim-box-4 .logo-stage-3d {
      width: 100%;
      height: 100%;
      perspective: 800px;
      animation: a4-gyro calc(4s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }
    @keyframes a4-gyro {
      0% { transform: rotateX(15deg) rotateY(-20deg) scale(0.98); }
      100% { transform: rotateX(-15deg) rotateY(20deg) scale(1.04); filter: drop-shadow(0 0 14px #34d399); }
    }

    /* Animation 5 */
    .anim-box-5 .logo-svg-wrap {
      animation: a5-float calc(3.6s * var(--anim-speed-factor, 1)) ease-in-out infinite;
    }
    .anim-box-5 .a5-aurora {
      position: absolute;
      inset: -15px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(6, 95, 70, 0.2) 40%, transparent 70%);
      filter: blur(14px);
      animation: a5-aurora-breathe calc(3s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
      z-index: 0;
    }
    @keyframes a5-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); filter: drop-shadow(0 10px 18px rgba(16, 185, 129, 0.4)); }
    }
    @keyframes a5-aurora-breathe {
      0% { transform: scale(0.85); opacity: 0.4; }
      100% { transform: scale(1.2); opacity: 0.9; }
    }

    /* Fullscreen Splash Simulation Modal (Light Mode) */
    .splash-modal {
      position: fixed;
      inset: 0;
      background: #fafbfb;
      z-index: 1000;
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

    .splash-content {
      text-align: center;
      max-width: 440px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .splash-logo-holder {
      width: 150px;
      height: 150px;
      margin-bottom: 1.75rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .splash-title {
      font-size: 1.6rem;
      font-weight: 900;
      margin-bottom: 0.35rem;
      color: #0f172a;
    }

    .splash-subtitle {
      color: #047857;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      letter-spacing: 0.5px;
    }

    .splash-progress {
      width: 200px;
      height: 5px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 0.75rem;
      position: relative;
    }

    .splash-progress-bar {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 40%;
      background: linear-gradient(90deg, #059669, #34d399);
      border-radius: 999px;
      animation: progress-slide 1.6s ease-in-out infinite;
    }

    @keyframes progress-slide {
      0% { right: -40%; width: 20%; }
      50% { right: 40%; width: 60%; }
      100% { right: 100%; width: 20%; }
    }

    .splash-status {
      font-size: 0.8rem;
      color: #64748b;
    }

    .btn-close-splash {
      position: absolute;
      top: 2rem;
      left: 2rem;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
      padding: 0.4rem 1.1rem;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      font-family: inherit;
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #10b981;
      color: #064e3b;
      padding: 0.75rem 1.75rem;
      border-radius: 999px;
      font-size: 0.9rem;
      font-weight: 800;
      box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.5);
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 2000;
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
        <span>100% Pure Vector SVG • أيقونة الشعار الحقيقية المفرغة</span>
      </div>
      <h1>أيقونة الشعار المتجهية ونماذج التحميل المتحركة</h1>
      <p class="subtitle">
        تم استخلاص وتجهيز رمز الأيقونة الكيميائية الدقيقة من أعلى الشعار كملف SVG متجهي نقي بدون نصوص، مع ضبط إحداثيات الـ viewBox والطبقات البرمجية لإنشاء 5 حركات تحميل مخصصة لشاشات البداية (Splash & Loaders).
      </p>
    </header>

    <!-- Global Controls Toolbar -->
    <div class="controls-bar">
      <!-- Speed Control -->
      <div class="control-group">
        <span class="control-label">سرعة الحركة:</span>
        <div class="btn-group">
          <button class="btn-toggle" onclick="setSpeed(0.5, this)">0.5x بطيء</button>
          <button class="btn-toggle active" onclick="setSpeed(1.0, this)">1.0x قياسي</button>
          <button class="btn-toggle" onclick="setSpeed(1.5, this)">1.5x سريع</button>
          <button class="btn-toggle" onclick="setSpeed(2.0, this)">2.0x فائق</button>
        </div>
      </div>

      <!-- Theme Background Control -->
      <div class="control-group">
        <span class="control-label">خلفية العرض:</span>
        <div class="btn-group">
          <button class="btn-toggle active" onclick="setCanvasTheme('dark', this)">الوضع الليلي</button>
          <button class="btn-toggle" onclick="setCanvasTheme('light', this)">الوضع المضيء</button>
        </div>
      </div>

      <!-- Global Actions -->
      <div class="control-group">
        <button class="btn-action" onclick="downloadSVG()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>تحميل أيقونة SVG</span>
        </button>
        <button class="btn-action" onclick="copySVGSource()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>نسخ كود SVG</span>
        </button>
      </div>
    </div>

    <!-- Section 1: Side-by-Side Icon Comparison -->
    <div class="section-title">الأيقونة المتجهية المفرغة (100% Pure Vector Icon)</div>
    <div class="comparison-grid">
      <div class="card">
        <div class="card-header">
          <span style="font-weight: 700;">أيقونة الرمز المتجهية (الوضع المظلم)</span>
          <span class="card-tag tag-svg">Pure SVG Icon</span>
        </div>
        <div class="preview-canvas theme-dark">
          __SVG_ICON__
        </div>
        <div class="card-footer">
          <span>دقة فيكتور مطلقة لا نهائية</span>
          <span>حجم خفيف (~42KB)</span>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span style="font-weight: 700;">أيقونة الرمز المتجهية (الوضع المضيء)</span>
          <span class="card-tag tag-svg">Crisp Vector</span>
        </div>
        <div class="preview-canvas theme-light">
          __SVG_ICON__
        </div>
        <div class="card-footer">
          <span>تدرجات زمردية + رمادي كربوني</span>
          <span>متوافقة مع كل المقاسات</span>
        </div>
      </div>
    </div>

    <!-- Section 2: 5 Animation Examples -->
    <div class="section-title">خمسة نماذج حركية لشاشات البداية والتحميل (5 Splash / Loading Animations)</div>
    <div class="animations-grid">
      
      <!-- Example 1 -->
      <div class="anim-card anim-box-1" id="anim-card-1">
        <span class="anim-number">01</span>
        <div class="card-header">
          <span class="card-tag tag-anim">Atomic Pulse</span>
        </div>
        <div class="anim-title">1. المدار الذري ونبض الطاقة (Atomic Pulse)</div>
        <div class="anim-desc">نبض إشعاعي للقوس الزمردي العلوي مع حركة تنفس انسيابية للأجنحة الكيميائية وتوهج متقطع للجسيمات الذرية.</div>
        <div class="anim-stage">
          <div class="a1-halo"></div>
          <div class="logo-svg-wrap">
            __SVG_ICON__
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(1)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة (Light Splash)</span>
          </button>
        </div>
      </div>

      <!-- Example 2 -->
      <div class="anim-card anim-box-2" id="anim-card-2">
        <span class="anim-number">02</span>
        <div class="card-header">
          <span class="card-tag tag-anim">Chemical Reaction</span>
        </div>
        <div class="anim-title">2. التوهج التفاعلي وفوران الطاقة (Reaction Surge)</div>
        <div class="anim-desc">موجات إشعاعية دائرية متلاحقة مع اندفاع الطاقة عبر الحلزون الزمردي وتألق الأيونات عند ذروة كل تفاعل.</div>
        <div class="anim-stage">
          <div class="a2-reaction-ripple"></div>
          <div class="logo-svg-wrap">
            __SVG_ICON__
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(2)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة (Light Splash)</span>
          </button>
        </div>
      </div>

      <!-- Example 3 (Selected Splash) -->
      <div class="anim-card anim-box-3" id="anim-card-3">
        <span class="anim-number">03</span>
        <div class="card-header">
          <span class="card-tag tag-anim" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border-color: #10b981;">★ المعتمد للموقع</span>
        </div>
        <div class="anim-title">3. الانبثاق والوميض الزمردي (Emerald Flash Splash)</div>
        <div class="anim-desc">انبثاق حيوي للأيقونة مع وميض طاقة زمردي ساطع يملأ الرمز بدقة ثم يثبته بشكل فخم، المعتمد لشاشة البداية في الموقع.</div>
        <div class="anim-stage">
          <div class="logo-svg-wrap">
            __SVG_ICON__
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(3)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة (Light Splash)</span>
          </button>
        </div>
      </div>

      <!-- Example 4 -->
      <div class="anim-card anim-box-4" id="anim-card-4">
        <span class="anim-number">04</span>
        <div class="card-header">
          <span class="card-tag tag-anim">3D Gyroscope Loader</span>
        </div>
        <div class="anim-title">4. الجيروسكوب الذري ثلاثي الأبعاد (Atomic 3D Gyro)</div>
        <div class="anim-desc">دوران متعدد المحاور في فضاء 3D للأقواس المدارية مع نبضات للقلب الجزيئي، مثالي كمؤشر تحميل سريع للعمليات.</div>
        <div class="anim-stage">
          <div class="logo-svg-wrap">
            <div class="logo-stage-3d">
              __SVG_ICON__
            </div>
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(4)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة (Light Splash)</span>
          </button>
        </div>
      </div>

      <!-- Example 5 -->
      <div class="anim-card anim-box-5" id="anim-card-5">
        <span class="anim-number">05</span>
        <div class="card-header">
          <span class="card-tag tag-anim">Aurora & Levitation</span>
        </div>
        <div class="anim-title">5. الطفو الحيوي مع هالة الشفق (Aurora Levitation)</div>
        <div class="anim-desc">حركة طفو فيزيائية انسيابية هادئة مع هالة شفقية حيوية متغيرة الأطياف ولمعان برّاق يعطي طابعاً علمياً فاخراً.</div>
        <div class="anim-stage">
          <div class="logo-svg-wrap">
            <div class="a5-aurora"></div>
            __SVG_ICON__
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(5)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة (Light Splash)</span>
          </button>
        </div>
      </div>

    </div>

    <!-- Full Logo Branding Showcase -->
    <div class="section-title">الشعار الكامل مع النصوص المدمجة (Full Logo Vector)</div>
    <div class="card" style="margin-bottom: 2rem;">
      <div class="preview-canvas" style="height: 200px; padding: 2rem;">
        __SVG_FULL__
      </div>
      <div class="card-footer" style="padding-top: 1rem;">
        <span>مسارات متجهة كاملة (Icon + Typography)</span>
        <span>جاهز للترويسات، الطباعة، والشهادات التعليمية</span>
      </div>
    </div>

  </div>

  <!-- Fullscreen Splash Simulation Modal (Light Mode) -->
  <div class="splash-modal" id="splashModal">
    <button class="btn-close-splash" onclick="closeSplash()">إغلاق المعاينة ✕</button>
    <div class="splash-content">
      <div class="splash-logo-holder" id="splashLogoHolder"></div>
      <div class="splash-title">منصة أ. فرح نشأت للكيمياء</div>
      <div class="splash-subtitle">FARAH NASHAT • CHEMISTRY & 3D LAB</div>
      <div class="splash-progress">
        <div class="splash-progress-bar"></div>
      </div>
      <div class="splash-status">جاري تجهيز المختبر والمفاهيم الكيميائية...</div>
    </div>
  </div>

  <!-- Toast -->
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

    function setCanvasTheme(theme, btn) {
      const stages = document.querySelectorAll('.preview-canvas, .anim-stage');
      stages.forEach(s => {
        s.classList.remove('theme-dark', 'theme-light');
        s.classList.add('theme-' + theme);
      });

      const buttons = btn.parentElement.querySelectorAll('.btn-toggle');
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }

    function openSplash(animIndex) {
      const holder = document.getElementById('splashLogoHolder');
      const modal = document.getElementById('splashModal');
      
      holder.className = 'splash-logo-holder anim-box-' + animIndex;
      
      if (animIndex === 1) {
        holder.innerHTML = '<div class="a1-halo"></div><div class="logo-svg-wrap">' + rawSvgCode + '</div>';
      } else if (animIndex === 2) {
        holder.innerHTML = '<div class="a2-reaction-ripple"></div><div class="logo-svg-wrap">' + rawSvgCode + '</div>';
      } else if (animIndex === 4) {
        holder.innerHTML = '<div class="logo-svg-wrap"><div class="logo-stage-3d">' + rawSvgCode + '</div></div>';
      } else if (animIndex === 5) {
        holder.innerHTML = '<div class="logo-svg-wrap"><div class="a5-aurora"></div>' + rawSvgCode + '</div>';
      } else {
        holder.innerHTML = '<div class="logo-svg-wrap">' + rawSvgCode + '</div>';
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
        showToast('✓ تم نسخ كود أيقونة SVG بالكامل إلى الحافظة');
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
      showToast('✓ تم بدء تحميل أيقونة SVG');
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

print("Updated logo-loading-animations.html successfully!")
