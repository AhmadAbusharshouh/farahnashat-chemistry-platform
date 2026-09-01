import os

# Read all 5 native SMIL SVGs
with open('public/images/smil/native-anim-1.svg', 'r', encoding='utf-8') as f:
    smil_1 = f.read()

with open('public/images/smil/native-anim-2.svg', 'r', encoding='utf-8') as f:
    smil_2 = f.read()

with open('public/images/smil/native-anim-3.svg', 'r', encoding='utf-8') as f:
    smil_3 = f.read()

with open('public/images/smil/native-anim-4.svg', 'r', encoding='utf-8') as f:
    smil_4 = f.read()

with open('public/images/smil/native-anim-5.svg', 'r', encoding='utf-8') as f:
    smil_5 = f.read()

html_content = f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Farah Nashat Chemistry - 5 Pure Native SMIL Animated SVGs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {{
      --brand-emerald: #027555;
      --brand-emerald-light: #059669;
      --brand-emerald-neon: #10b981;
      --bg-light: #fafbfb;
      --card-bg: #ffffff;
      --card-border: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #64748b;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
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
    }}

    .ambient-glow {{
      position: fixed;
      top: -15%;
      left: 50%;
      transform: translateX(-50%);
      width: 900px;
      height: 500px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(4, 120, 87, 0.04) 50%, transparent 75%);
      pointer-events: none;
      z-index: 0;
    }}

    .container {{
      max-width: 1300px;
      margin: 0 auto;
      padding: 3rem 1.5rem 6rem;
      position: relative;
      z-index: 1;
    }}

    header {{
      text-align: center;
      margin-bottom: 3.5rem;
    }}

    .badge {{
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
    }}

    .badge-dot {{
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 10px #10b981;
      animation: pulse-dot 2s infinite;
    }}

    @keyframes pulse-dot {{
      0%, 100% {{ opacity: 1; transform: scale(1); }}
      50% {{ opacity: 0.4; transform: scale(0.8); }}
    }}

    h1 {{
      font-size: 2.5rem;
      font-weight: 900;
      letter-spacing: -0.5px;
      margin-bottom: 0.75rem;
      color: #0f172a;
    }}

    .subtitle {{
      color: var(--text-muted);
      font-size: 1.1rem;
      max-width: 820px;
      margin: 0 auto;
    }}

    .section-title {{
      font-size: 1.45rem;
      font-weight: 900;
      margin-bottom: 1.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #0f172a;
    }}

    .section-title::before {{
      content: '';
      display: inline-block;
      width: 5px;
      height: 24px;
      background: var(--brand-emerald);
      border-radius: 4px;
    }}

    .animations-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }}

    .anim-card {{
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 22px;
      padding: 1.85rem;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.03);
    }}

    .anim-card:hover {{
      border-color: rgba(4, 120, 87, 0.4);
      transform: translateY(-5px);
      box-shadow: 0 16px 36px -10px rgba(2, 117, 85, 0.15);
    }}

    .anim-badge-row {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }}

    .anim-badge {{
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0.3rem 0.75rem;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: rgba(4, 120, 87, 0.1);
      color: #047857;
      border: 1px solid rgba(4, 120, 87, 0.2);
    }}

    .anim-title {{
      font-size: 1.25rem;
      font-weight: 900;
      margin-bottom: 0.4rem;
      color: #0f172a;
    }}

    .anim-desc {{
      font-size: 0.88rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      min-height: 2.8rem;
    }}

    .anim-stage {{
      height: 280px;
      background: radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%);
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 1px solid #e2e8f0;
      margin-bottom: 1.5rem;
      overflow: hidden;
      padding: 1rem;
    }}

    .anim-stage svg {{
      max-width: 170px;
      max-height: 170px;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }}

    .anim-actions {{
      display: flex;
      gap: 0.75rem;
      margin-top: auto;
    }}

    .btn-splash-preview {{
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
    }}

    .btn-splash-preview:hover {{
      background: var(--brand-emerald);
      color: #ffffff;
      border-color: var(--brand-emerald);
      box-shadow: 0 4px 14px rgba(2, 117, 85, 0.25);
    }}

    .btn-dl {{
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition: all 0.2s;
      font-family: inherit;
    }}

    .btn-dl:hover {{
      background: #f1f5f9;
      color: #0f172a;
    }}

    /* Fullscreen Splash Modal (Light Mode) */
    .splash-modal {{
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
    }}

    .splash-modal.active {{
      opacity: 1;
      pointer-events: auto;
    }}

    .splash-modal-content {{
      text-align: center;
      max-width: 440px;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }}

    .splash-holder {{
      width: 170px;
      height: 170px;
      margin-bottom: 2rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }}

    .splash-holder svg {{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }}

    .splash-title-text {{
      font-size: 1.65rem;
      font-weight: 900;
      margin-bottom: 0.35rem;
      color: #0f172a;
    }}

    .splash-sub-text {{
      color: #047857;
      font-size: 0.85rem;
      font-weight: 800;
      margin-bottom: 1.75rem;
      letter-spacing: 0.5px;
    }}

    .splash-bar-wrap {{
      width: 220px;
      height: 5px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 0.85rem;
      position: relative;
    }}

    .splash-bar-fill {{
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 40%;
      background: linear-gradient(90deg, #059669, #10b981, #34d399);
      border-radius: 999px;
      animation: progress-slide 1.6s ease-in-out infinite;
    }}

    @keyframes progress-slide {{
      0% {{ right: -40%; width: 20%; }}
      50% {{ right: 40%; width: 60%; }}
      100% {{ right: 100%; width: 20%; }}
    }}

    .splash-status-text {{
      font-size: 0.82rem;
      color: #64748b;
      font-weight: 500;
    }}

    .btn-modal-close {{
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
    }}

    .btn-modal-close:hover {{
      background: #f1f5f9;
      color: #0f172a;
    }}
  </style>
</head>
<body>

  <div class="ambient-glow"></div>

  <div class="container">
    
    <header>
      <div class="badge">
        <span class="badge-dot"></span>
        <span>100% Pure Native SMIL Vector Animations • حركات مدمجة أصيلة داخل ملفات الـ SVG</span>
      </div>
      <h1>5 نماذج تحريك أصلية (Pure Native SMIL SVG Animations)</h1>
      <p class="subtitle">
        هذه الحركات ليست CSS خارجي ولا وسائط مؤقتة، بل هي **حركات SVG أصلية ومدمجة بالكامل (Native SMIL &lt;animateTransform&gt;, &lt;animate&gt;, &lt;clipPath&gt;)** داخل أكواد الـ XML لملفات الـ SVG نفسها وتعمل ذاتياً في أي متصفح وبرنامج تصميم!
      </p>
    </header>

    <div class="section-title">نماذج الـ SVG الأصلية المتحركة ذاتياً في الوضع المضيء (Light Mode)</div>
    <div class="animations-grid">
      
      <!-- Model 1 -->
      <div class="anim-card">
        <div class="anim-badge-row">
          <span class="anim-badge">SMIL &lt;animateTransform&gt; + Track</span>
          <span style="font-family: Outfit; font-weight: 900; color: #cbd5e1;">01</span>
        </div>
        <div class="anim-title">1. مسرع الفوتونات المداري الأصلي (Native Quantum Orbit)</div>
        <div class="anim-desc">دوران فيزيائي ذاتي لجزيئات الفوتون على مدار بيضاوي مع نبض وتدرج لوني حي داخل كود الـ SVG.</div>
        <div class="anim-stage">
          {smil_1}
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(1)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة</span>
          </button>
          <a href="/images/smil/native-anim-1.svg" download="native-anim-1.svg" class="btn-dl">تحميل SVG</a>
        </div>
      </div>

      <!-- Model 2 -->
      <div class="anim-card">
        <div class="anim-badge-row">
          <span class="anim-badge">SMIL &lt;clipPath&gt; + Particles</span>
          <span style="font-family: Outfit; font-weight: 900; color: #cbd5e1;">02</span>
        </div>
        <div class="anim-title">2. فوران المحلول الكيميائي الأصلي (Native Fluid Rise)</div>
        <div class="anim-desc">قناع مائي موجي يرتفع داخل الأيقونة مع فقاعات متصاعدة تطفو وتنبثق ذاتياً بواسطة وسوم &lt;animate&gt;.</div>
        <div class="anim-stage">
          {smil_2}
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(2)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة</span>
          </button>
          <a href="/images/smil/native-anim-2.svg" download="native-anim-2.svg" class="btn-dl">تحميل SVG</a>
        </div>
      </div>

      <!-- Model 3 -->
      <div class="anim-card">
        <div class="anim-badge-row">
          <span class="anim-badge">SMIL Laser Sweep & HUD</span>
          <span style="font-family: Outfit; font-weight: 900; color: #cbd5e1;">03</span>
        </div>
        <div class="anim-title">3. المسح الليزري الهولوجرامي الأصلي (Native Laser Scan)</div>
        <div class="anim-desc">شعاع ليزري مدمج بـ &lt;line&gt; يمسح الأيقونة عمودياً مع دوران شبكة إحداثيات الـ HUD المحيطة.</div>
        <div class="anim-stage">
          {smil_3}
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(3)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة</span>
          </button>
          <a href="/images/smil/native-anim-3.svg" download="native-anim-3.svg" class="btn-dl">تحميل SVG</a>
        </div>
      </div>

      <!-- Model 4 -->
      <div class="anim-card">
        <div class="anim-badge-row">
          <span class="anim-badge">SMIL Multi-Axis Oscillations</span>
          <span style="font-family: Outfit; font-weight: 900; color: #cbd5e1;">04</span>
        </div>
        <div class="anim-title">4. الجيروسكوب الحركي الأصلي (Native Kinetic Gimbal)</div>
        <div class="anim-desc">اهتزاز وميلان متناغم متعدد المحاور للأقواس المدارية والأجنحة مع نبض مستمر لقلب الذرة.</div>
        <div class="anim-stage">
          {smil_4}
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(4)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة</span>
          </button>
          <a href="/images/smil/native-anim-4.svg" download="native-anim-4.svg" class="btn-dl">تحميل SVG</a>
        </div>
      </div>

      <!-- Model 5 -->
      <div class="anim-card">
        <div class="anim-badge-row">
          <span class="anim-badge">SMIL Cascading Shockwaves</span>
          <span style="font-family: Outfit; font-weight: 900; color: #cbd5e1;">05</span>
        </div>
        <div class="anim-title">5. موجات الشفق والطفو الأصلي (Native Aurora Waves)</div>
        <div class="anim-desc">موجات إشعاعية دائرية متلاحقة &lt;circle&gt; تنطلق من المركز مع طفو فيزيائي انسيابي للأيقونة.</div>
        <div class="anim-stage">
          {smil_5}
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(5)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة</span>
          </button>
          <a href="/images/smil/native-anim-5.svg" download="native-anim-5.svg" class="btn-dl">تحميل SVG</a>
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

  <script>
    const smilSvgs = {{
      1: `{smil_1.replace("`", "\\`")}`,
      2: `{smil_2.replace("`", "\\`")}`,
      3: `{smil_3.replace("`", "\\`")}`,
      4: `{smil_4.replace("`", "\\`")}`,
      5: `{smil_5.replace("`", "\\`")}`
    }};

    function openSplash(index) {{
      const holder = document.getElementById('splashHolder');
      const modal = document.getElementById('splashModal');
      
      holder.innerHTML = smilSvgs[index] || smilSvgs[1];
      modal.classList.add('active');
    }}

    function closeSplash() {{
      document.getElementById('splashModal').classList.remove('active');
    }}

    window.addEventListener('keydown', (e) => {{
      if (e.key === 'Escape') {{
        closeSplash();
      }}
    }});
  </script>
</body>
</html>"""

with open('logo-loading-animations.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

with open('public/logo-loading-animations.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("HTML with pure Native SMIL SVGs written successfully!")
