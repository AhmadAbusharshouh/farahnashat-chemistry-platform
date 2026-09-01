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
      max-width: 150px;
      max-height: 150px;
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

    /* =========================================================================
       ANIMATION 1: ATOMIC ORBITAL & ELECTRON PULSE (Modern Chemistry Splash)
       ========================================================================= */
    .anim-box-1 .logo-svg-wrap {
      width: 155px;
      height: 155px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .anim-box-1 .top-orbital-arc {
      transform-origin: 628px 280px;
      animation: a1-arc-breathe calc(3s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }

    .anim-box-1 .electron-nodes {
      transform-origin: 628px 500px;
      animation: a1-nodes-pulse calc(1.8s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }

    .anim-box-1 .inner-emerald-swirl {
      transform-origin: 628px 500px;
      animation: a1-swirl-glow calc(2.5s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }

    .anim-box-1 .dark-orbital-wings {
      transform-origin: 628px 500px;
      animation: a1-wings-breathe calc(3s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }

    .anim-box-1 .a1-halo {
      position: absolute;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 70%);
      animation: a1-halo-pulse calc(2.4s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
      pointer-events: none;
    }

    @keyframes a1-arc-breathe {
      0% { transform: scale(0.96) translateY(2px); }
      100% { transform: scale(1.03) translateY(-4px); filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.8)); }
    }

    @keyframes a1-nodes-pulse {
      0% { transform: scale(0.9); opacity: 0.6; filter: brightness(1); }
      100% { transform: scale(1.15); opacity: 1; filter: brightness(1.4) drop-shadow(0 0 10px #34d399); }
    }

    @keyframes a1-swirl-glow {
      0% { filter: drop-shadow(0 0 2px rgba(16,185,129,0.2)); opacity: 0.85; }
      100% { filter: drop-shadow(0 0 14px rgba(16,185,129,0.9)); opacity: 1; }
    }

    @keyframes a1-wings-breathe {
      0% { transform: scale(0.98); opacity: 0.8; }
      100% { transform: scale(1.02); opacity: 1; filter: drop-shadow(0 0 8px rgba(45, 55, 72, 0.8)); }
    }

    @keyframes a1-halo-pulse {
      0% { transform: scale(0.8); opacity: 0.3; }
      100% { transform: scale(1.3); opacity: 0.85; }
    }

    /* =========================================================================
       ANIMATION 2: CHEMICAL RESONANCE & ENERGY GLOW (Laboratory Reaction)
       ========================================================================= */
    .anim-box-2 .logo-svg-wrap {
      width: 155px;
      height: 155px;
      position: relative;
    }

    .anim-box-2 .inner-emerald-swirl {
      transform-origin: 628px 500px;
      animation: a2-swirl-surge calc(2.2s * var(--anim-speed-factor, 1)) ease-in-out infinite;
    }

    .anim-box-2 .electron-nodes {
      animation: a2-nodes-energize calc(1.4s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }

    .anim-box-2 .dark-core-bonds {
      animation: a2-core-flicker calc(3s * var(--anim-speed-factor, 1)) infinite alternate;
    }

    .anim-box-2 .a2-reaction-ripple {
      position: absolute;
      inset: -15px;
      border: 2px solid rgba(52, 211, 153, 0.4);
      border-radius: 50%;
      animation: a2-ripple-out calc(2.2s * var(--anim-speed-factor, 1)) cubic-bezier(0.1, 0.7, 0.1, 1) infinite;
      pointer-events: none;
    }

    @keyframes a2-swirl-surge {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px #047857); }
      50% { transform: scale(1.06); filter: drop-shadow(0 0 18px #10b981) brightness(1.3); }
    }

    @keyframes a2-nodes-energize {
      0% { opacity: 0.5; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1.2); filter: drop-shadow(0 0 12px #ffffff); }
    }

    @keyframes a2-core-flicker {
      0% { opacity: 0.75; }
      100% { opacity: 1; filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.5)); }
    }

    @keyframes a2-ripple-out {
      0% { transform: scale(0.6); opacity: 0.9; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    /* =========================================================================
       ANIMATION 3: CYBERNETIC LINE-DRAW & FLASH (High-Tech Splash Reveal)
       ========================================================================= */
    .anim-box-3 .logo-svg-wrap {
      width: 155px;
      height: 155px;
      position: relative;
    }

    .anim-box-3 svg path {
      stroke-dasharray: 2200;
      stroke-dashoffset: 2200;
      animation: a3-draw-and-flash calc(3.6s * var(--anim-speed-factor, 1)) cubic-bezier(0.65, 0, 0.35, 1) infinite;
    }

    .anim-box-3 .top-orbital-arc path { animation-delay: 0s; }
    .anim-box-3 .dark-orbital-wings path { animation-delay: 0.25s; }
    .anim-box-3 .inner-emerald-swirl path { animation-delay: 0.45s; }
    .anim-box-3 .electron-nodes path { animation-delay: 0.65s; }

    @keyframes a3-draw-and-flash {
      0% {
        stroke-dashoffset: 2200;
        stroke: #34d399;
        stroke-width: 8px;
        fill-opacity: 0;
        filter: drop-shadow(0 0 10px #10b981);
      }
      45% {
        stroke-dashoffset: 0;
        stroke: #34d399;
        stroke-width: 4px;
        fill-opacity: 0.25;
      }
      60% {
        stroke-dashoffset: 0;
        stroke-width: 0px;
        fill-opacity: 1;
        filter: drop-shadow(0 0 24px rgba(16, 185, 129, 0.95));
      }
      85% {
        stroke-dashoffset: 0;
        stroke-width: 0px;
        fill-opacity: 1;
        filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.3));
      }
      100% {
        stroke-dashoffset: 0;
        stroke-width: 0px;
        fill-opacity: 0;
      }
    }

    /* =========================================================================
       ANIMATION 4: 3D GYROSCOPIC ATOM SPIN (Continuous Fast Loader)
       ========================================================================= */
    .anim-box-4 .logo-svg-wrap {
      width: 155px;
      height: 155px;
      perspective: 800px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .anim-box-4 .logo-stage-3d {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      animation: a4-gyro-tilt calc(4s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }

    .anim-box-4 .top-orbital-arc {
      transform-origin: 628px 500px;
      animation: a4-arc-orbit calc(3.5s * var(--anim-speed-factor, 1)) linear infinite;
    }

    .anim-box-4 .electron-nodes {
      transform-origin: 628px 500px;
      animation: a4-nodes-rotate calc(2s * var(--anim-speed-factor, 1)) linear infinite reverse;
    }

    .anim-box-4 .dark-core-bonds {
      transform-origin: 628px 500px;
      animation: a4-nucleus-beat calc(1.2s * var(--anim-speed-factor, 1)) cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes a4-gyro-tilt {
      0% { transform: rotateX(15deg) rotateY(-22deg); }
      100% { transform: rotateX(-15deg) rotateY(22deg); }
    }

    @keyframes a4-arc-orbit {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes a4-nodes-rotate {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.15); filter: drop-shadow(0 0 10px #34d399); }
      100% { transform: rotate(360deg) scale(1); }
    }

    @keyframes a4-nucleus-beat {
      0%, 100% { transform: scale(0.95); filter: brightness(1); }
      50% { transform: scale(1.08); filter: brightness(1.3) drop-shadow(0 0 14px #34d399); }
    }

    /* =========================================================================
       ANIMATION 5: BIOLUMINESCENT AURORA & 3D LEVITATION (Organic & Elegant)
       ========================================================================= */
    .anim-box-5 .logo-svg-wrap {
      width: 155px;
      height: 155px;
      position: relative;
      animation: a5-float calc(4s * var(--anim-speed-factor, 1)) ease-in-out infinite;
    }

    .anim-box-5 .a5-aurora {
      position: absolute;
      inset: -20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(6, 95, 70, 0.2) 40%, transparent 70%);
      filter: blur(14px);
      animation: a5-aurora-breathe calc(3.2s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
      z-index: 0;
    }

    .anim-box-5 svg {
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
    }

    .anim-box-5 .inner-emerald-swirl {
      animation: a5-core-shimmer calc(2.8s * var(--anim-speed-factor, 1)) ease-in-out infinite alternate;
    }

    .anim-box-5 .electron-nodes {
      animation: a5-bubble-pop calc(2.4s * var(--anim-speed-factor, 1)) ease-in-out infinite;
    }

    @keyframes a5-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-14px) rotate(1.5deg); }
    }

    @keyframes a5-aurora-breathe {
      0% { transform: scale(0.85); opacity: 0.4; filter: blur(16px) hue-rotate(0deg); }
      100% { transform: scale(1.2); opacity: 0.95; filter: blur(10px) hue-rotate(25deg); }
    }

    @keyframes a5-core-shimmer {
      0% { opacity: 0.8; filter: drop-shadow(0 0 2px #047857); }
      100% { opacity: 1; filter: drop-shadow(0 0 16px #34d399) brightness(1.2); }
    }

    @keyframes a5-bubble-pop {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.25); opacity: 1; filter: drop-shadow(0 0 8px #ffffff); }
    }

    /* Splash Screen Simulation Modal */
    .splash-modal {
      position: fixed;
      inset: 0;
      background: #090d12;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }

    .splash-modal.active {
      opacity: 1;
      pointer-events: auto;
    }

    .splash-content {
      text-align: center;
      max-width: 480px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .splash-logo-holder {
      width: 180px;
      height: 180px;
      margin-bottom: 2.5rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .splash-title {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      color: #ffffff;
    }

    .splash-subtitle {
      color: #34d399;
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 2rem;
      letter-spacing: 0.5px;
    }

    .splash-progress {
      width: 240px;
      height: 5px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 1rem;
      position: relative;
    }

    .splash-progress-bar {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 40%;
      background: linear-gradient(90deg, #10b981, #34d399);
      border-radius: 999px;
      animation: progress-slide 1.8s ease-in-out infinite;
    }

    @keyframes progress-slide {
      0% { right: -40%; width: 20%; }
      50% { right: 40%; width: 60%; }
      100% { right: 100%; width: 20%; }
    }

    .splash-status {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 2.5rem;
    }

    .btn-close-splash {
      position: absolute;
      top: 2rem;
      left: 2rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      padding: 0.5rem 1.25rem;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
    }

    .btn-close-splash:hover {
      background: rgba(255, 255, 255, 0.25);
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

    /* Code Modal */
    .code-modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(10px);
      z-index: 1500;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }

    .code-modal.active {
      opacity: 1;
      pointer-events: auto;
    }

    .code-window {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 18px;
      max-width: 800px;
      width: 100%;
      max-height: 80vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }

    .code-header {
      padding: 1rem 1.5rem;
      background: #1e293b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .code-title {
      font-weight: 700;
      font-size: 0.95rem;
      color: #f1f5f9;
    }

    .code-body {
      padding: 1.5rem;
      overflow-y: auto;
      background: #090d16;
    }

    pre {
      color: #38bdf8;
      font-family: 'Consolas', 'Fira Code', monospace;
      font-size: 0.8rem;
      white-space: pre-wrap;
      word-break: break-all;
    }

    @media (max-width: 768px) {
      h1 { font-size: 1.8rem; }
      .controls-bar { flex-direction: column; align-items: stretch; }
      .control-group { justify-content: space-between; }
    }
  </style>
</head>
<body>

  <div class="ambient-glow"></div>

  <div class="container">
    
    <!-- Top Header -->
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
      <!-- Icon Dark Mode -->
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
          <span>حجم خفيف جداً (~57KB)</span>
        </div>
      </div>

      <!-- Icon Light Mode -->
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
          <span class="card-tag tag-anim">Splash & App Boot</span>
        </div>
        <div class="anim-title">1. المدار الذري ونبض الإلكترونات (Orbital Flow)</div>
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
            <span>معاينة شاشة كاملة (Splash)</span>
          </button>
          <button class="btn-copy-code" onclick="showCSS(1)">كود CSS</button>
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
            <span>معاينة شاشة كاملة (Splash)</span>
          </button>
          <button class="btn-copy-code" onclick="showCSS(2)">كود CSS</button>
        </div>
      </div>

      <!-- Example 3 -->
      <div class="anim-card anim-box-3" id="anim-card-3">
        <span class="anim-number">03</span>
        <div class="card-header">
          <span class="card-tag tag-anim">Cyber Stroke Reveal</span>
        </div>
        <div class="anim-title">3. رسم الخطوط المتجهية والوميض (Cyber Line-Draw)</div>
        <div class="anim-desc">رسم مسارات الأيقونة التقنية خطاً بخط متبوعاً بوميض زمردي كامل يثبت الأيقونة لشاشات البداية والـ Splash.</div>
        <div class="anim-stage">
          <div class="logo-svg-wrap">
            __SVG_ICON__
          </div>
        </div>
        <div class="anim-actions">
          <button class="btn-splash-preview" onclick="openSplash(3)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            <span>معاينة شاشة كاملة (Splash)</span>
          </button>
          <button class="btn-copy-code" onclick="showCSS(3)">كود CSS</button>
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
            <span>معاينة شاشة كاملة (Splash)</span>
          </button>
          <button class="btn-copy-code" onclick="showCSS(4)">كود CSS</button>
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
            <span>معاينة شاشة كاملة (Splash)</span>
          </button>
          <button class="btn-copy-code" onclick="showCSS(5)">كود CSS</button>
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

  <!-- Fullscreen Splash Simulation Modal -->
  <div class="splash-modal" id="splashModal">
    <button class="btn-close-splash" onclick="closeSplash()">إغلاق المعاينة ✕</button>
    <div class="splash-content">
      <div class="splash-logo-holder" id="splashLogoHolder"></div>
      <div class="splash-title">منصة أ. فرح نشأت للكيمياء</div>
      <div class="splash-subtitle">Farah Nashat Chemistry Platform & 3D Lab</div>
      <div class="splash-progress">
        <div class="splash-progress-bar"></div>
      </div>
      <div class="splash-status">جاري تهيئة المختبر الافتراضي ومكتبة التفاعلات...</div>
    </div>
  </div>

  <!-- Code View Modal -->
  <div class="code-modal" id="codeModal">
    <div class="code-window">
      <div class="code-header">
        <div class="code-title" id="codeModalTitle">كود CSS للحركة</div>
        <button class="btn-action" style="padding: 0.25rem 0.75rem;" onclick="closeCodeModal()">إغلاق ✕</button>
      </div>
      <div class="code-body">
        <pre id="codeModalContent"></pre>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
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

    const cssSnippets = {
      1: `/* 1. Atomic Orbital & Electron Pulse */
.top-orbital-arc {
  transform-origin: 628px 280px;
  animation: arc-breathe 3s ease-in-out infinite alternate;
}
.electron-nodes {
  transform-origin: 628px 500px;
  animation: nodes-pulse 1.8s ease-in-out infinite alternate;
}
.inner-emerald-swirl {
  animation: swirl-glow 2.5s ease-in-out infinite alternate;
}
@keyframes arc-breathe {
  0% { transform: scale(0.96); }
  100% { transform: scale(1.03); filter: drop-shadow(0 0 12px #34d399); }
}`,
      2: `/* 2. Chemical Resonance & Energy Glow */
.inner-emerald-swirl {
  transform-origin: 628px 500px;
  animation: swirl-surge 2.2s ease-in-out infinite;
}
.electron-nodes {
  animation: nodes-energize 1.4s ease-in-out infinite alternate;
}
@keyframes swirl-surge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); filter: drop-shadow(0 0 18px #10b981) brightness(1.3); }
}`,
      3: `/* 3. Cyber Line-Draw & Flash Reveal */
svg path {
  stroke-dasharray: 2200;
  stroke-dashoffset: 2200;
  animation: draw-and-flash 3.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
@keyframes draw-and-flash {
  0% { stroke-dashoffset: 2200; stroke: #34d399; fill-opacity: 0; }
  45% { stroke-dashoffset: 0; stroke: #34d399; fill-opacity: 0.25; }
  60% { stroke-dashoffset: 0; stroke-width: 0; fill-opacity: 1; filter: drop-shadow(0 0 24px rgba(16,185,129,0.95)); }
  100% { fill-opacity: 0; }
}`,
      4: `/* 4. 3D Gyroscopic Atom Spin */
.logo-stage-3d {
  transform-style: preserve-3d;
  animation: gyro-tilt 4s ease-in-out infinite alternate;
}
.top-orbital-arc {
  transform-origin: 628px 500px;
  animation: arc-orbit 3.5s linear infinite;
}
@keyframes gyro-tilt {
  0% { transform: rotateX(15deg) rotateY(-22deg); }
  100% { transform: rotateX(-15deg) rotateY(22deg); }
}`,
      5: `/* 5. Bioluminescent Aurora & Levitation */
.logo-svg-wrap {
  animation: float 4s ease-in-out infinite;
}
.a5-aurora {
  animation: aurora-breathe 3.2s ease-in-out infinite alternate;
}
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(1.5deg); }
}`
    };

    function showCSS(index) {
      document.getElementById('codeModalTitle').innerText = 'كود CSS للنموذج رقم ' + index;
      document.getElementById('codeModalContent').innerText = cssSnippets[index] || '';
      document.getElementById('codeModal').classList.add('active');
    }

    function closeCodeModal() {
      document.getElementById('codeModal').classList.remove('active');
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSplash();
        closeCodeModal();
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

print("Updated logo-loading-animations.html with exact top icon!")
