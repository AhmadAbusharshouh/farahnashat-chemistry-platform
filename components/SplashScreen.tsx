'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [opening, setOpening] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Only run splash screen on first session load
    if (typeof window !== 'undefined') {
      const alreadyShown = sessionStorage.getItem('farah_splash_done');
      if (alreadyShown) {
        setClosed(true);
        return;
      }
      setMounted(true);
      window.scrollTo(0, 0);

      // Lock body scroll during splash
      document.body.style.overflow = 'hidden';

      // Start window opening transition after 1.2s
      const openTimer = setTimeout(() => {
        setOpening(true);
        sessionStorage.setItem('farah_splash_done', 'true');
        document.body.style.overflow = '';
      }, 1300);

      // Fully unmount after curtain animation finishes
      const closeTimer = setTimeout(() => {
        setClosed(true);
      }, 2000);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
          dismiss();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, []);

  const dismiss = () => {
    setOpening(true);
    sessionStorage.setItem('farah_splash_done', 'true');
    document.body.style.overflow = '';
    setTimeout(() => setClosed(true), 600);
  };

  if (!mounted || closed) return null;

  return (
    <div
      onClick={dismiss}
      className={`fixed inset-0 z-[999999] pointer-events-auto select-none cursor-pointer transition-opacity duration-500 ${
        opening ? 'pointer-events-none' : ''
      }`}
      aria-label="شاشة التحميل والترحيب"
    >
      {/* Top Window Shutter / Curtain (slides up) */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#fafbfb] border-b border-emerald-300 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          opening ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          backgroundImage: 'radial-gradient(rgba(4, 120, 87, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Bottom Window Shutter / Curtain (slides down) */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#fafbfb] border-t border-emerald-300 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          opening ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{
          backgroundImage: 'radial-gradient(rgba(4, 120, 87, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Center Stage Floating Window Emblem (Fades & Scales smoothly) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center p-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          opening ? 'opacity-0 scale-110 filter blur-sm' : 'opacity-100 scale-100'
        }`}
      >
        {/* Kinetic Orbital Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-4">
          <div className="absolute inset-0 rounded-full border border-dashed border-emerald-600/30 animate-spin [animation-duration:8s]" />
          
          {/* Glowing Photon Dot */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_12px_#10b981]" />

          {/* Center Logo */}
          <div className="relative w-28 h-28 flex items-center justify-center p-2 bg-white rounded-2xl shadow-lg border border-emerald-200">
            <Image
              src="/images/logo.svg"
              alt="Farah Nashat Chemistry Logo"
              width={100}
              height={100}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            منصة كيمياء أ. فرح نشأت
          </h2>
          <p className="text-xs font-bold text-emerald-800 tracking-wider font-mono uppercase">
            FARAH NASHAT • CHEMISTRY & 3D LAB
          </p>
        </div>

        {/* Progress Fill Bar */}
        <div className="w-44 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-4 mb-2 border border-slate-200">
          <div className="h-full bg-linear-to-r from-emerald-600 via-teal-400 to-emerald-500 rounded-full splash-bar-anim" />
        </div>

        <p className="text-[11px] text-slate-500 font-bold">
          انقر في أي مكان لتخطي الشاشة ✕
        </p>
      </div>

      <style jsx>{`
        .splash-bar-anim {
          animation: loadBar 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          width: 0%;
        }
        @keyframes loadBar {
          0% { width: 0%; }
          60% { width: 75%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
