'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function SplashScreen() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setVisible(true);
    setExiting(false);
    setAnimKey((k) => k + 1);

    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 1500);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 1900);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        setExiting(true);
        setTimeout(() => setVisible(false), 250);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      key={animKey}
      onClick={() => {
        setExiting(true);
        setTimeout(() => setVisible(false), 250);
      }}
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#fafbfb]/95 backdrop-blur-2xl select-none cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        exiting ? 'opacity-0 scale-105 pointer-events-none filter blur-sm' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `
          radial-gradient(rgba(4, 120, 87, 0.08) 1.5px, transparent 1.5px),
          radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, rgba(250, 251, 251, 0.98) 70%)
        `,
        backgroundSize: '24px 24px, 100% 100%',
      }}
      aria-label="شاشة التحميل والبداية"
    >
      {/* Ambient Breathing Light Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[480px] h-[480px] rounded-full bg-emerald-500/12 blur-3xl animate-pulse" />
      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setExiting(true);
          setTimeout(() => setVisible(false), 250);
        }}
        className="absolute top-6 left-6 z-10 px-4 py-1.5 rounded-full bg-white/90 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs font-bold transition-all shadow-xs backdrop-blur-md"
      >
        <span>تخطي</span>
        <span className="text-[10px] text-slate-400 mr-1.5 font-mono">✕</span>
      </button>

      {/* Center Showcase */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-sm w-full">
        
        {/* Kinetic Orbital Stage */}
        <div className="relative w-36 sm:w-40 h-36 sm:h-40 flex items-center justify-center mb-5 splash-stage">
          
          {/* Orbital Neon Track with Orbiting Photon */}
          <div className="splash-orbital-track">
            <div className="splash-photon-dot" />
          </div>

          {/* Effervescent Micro Bubbles */}
          <div className="splash-bubble-particle bubble-p1" />
          <div className="splash-bubble-particle bubble-p2" />
          <div className="splash-bubble-particle bubble-p3" />

          {/* 100% Vector SVG Icon */}
          <div className="w-28 sm:w-32 h-28 sm:h-32 flex items-center justify-center relative z-10 splash-icon-pulse">
            <img
              src="/images/logo-icon.svg"
              alt="Farah Nashat Chemistry Icon"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Clean Typography */}
        <div className="splash-text-reveal space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            منصة أ. فرح نشأت للكيمياء
          </h2>
          <p className="text-xs sm:text-sm font-bold text-emerald-700 font-mono tracking-wider uppercase">
            FARAH NASHAT • CHEMISTRY & 3D LAB
          </p>
        </div>

        {/* Smooth Laser Progress Bar */}
        <div className="w-48 h-1.5 bg-slate-200/90 rounded-full overflow-hidden mt-5 mb-2 relative border border-slate-200/80">
          <div className="splash-bar-fill absolute top-0 right-0 h-full bg-linear-to-l from-emerald-600 via-teal-400 to-emerald-500 rounded-full shadow-xs" />
        </div>

        <p className="text-[11px] text-slate-500 font-medium">
          جاري تجهيز المختبر والمفاهيم الكيميائية...
        </p>

      </div>

      <style jsx>{`
        .splash-stage {
          animation: splashEntrance 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .splash-orbital-track {
          position: absolute;
          width: 155px;
          height: 155px;
          border-radius: 50%;
          border: 1.5px dashed rgba(4, 120, 87, 0.3);
          animation: orbitSpin 5s linear infinite;
        }

        .splash-photon-dot {
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

        .splash-icon-pulse {
          animation: iconFloatPulse 2s ease-in-out infinite alternate;
        }

        @keyframes orbitSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes iconFloatPulse {
          0% {
            transform: scale(0.96) translateY(0);
            filter: drop-shadow(0 4px 10px rgba(4, 120, 87, 0.18));
          }
          100% {
            transform: scale(1.04) translateY(-4px);
            filter: drop-shadow(0 12px 28px rgba(16, 185, 129, 0.5));
          }
        }

        .splash-bubble-particle {
          position: absolute;
          background: #10b981;
          border-radius: 50%;
          opacity: 0;
          box-shadow: 0 0 8px #34d399;
          z-index: 5;
        }

        .bubble-p1 {
          width: 7px;
          height: 7px;
          left: 45%;
          bottom: 25%;
          animation: bubbleFloat 1.6s 0.2s infinite ease-in;
        }
        .bubble-p2 {
          width: 5px;
          height: 5px;
          left: 58%;
          bottom: 30%;
          animation: bubbleFloat 1.9s 0.5s infinite ease-in;
        }
        .bubble-p3 {
          width: 8px;
          height: 8px;
          left: 36%;
          bottom: 20%;
          animation: bubbleFloat 1.5s 0.8s infinite ease-in;
        }

        @keyframes bubbleFloat {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          30% { opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { transform: translateY(-60px) scale(1.2); opacity: 0; }
        }

        @keyframes splashEntrance {
          0% {
            opacity: 0;
            transform: scale(0.75) translateY(12px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
        }

        .splash-text-reveal {
          animation: textFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        @keyframes textFadeUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .splash-bar-fill {
          animation: progressFill 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          width: 0%;
        }

        @keyframes progressFill {
          0% { width: 0%; }
          50% { width: 68%; }
          85% { width: 94%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
