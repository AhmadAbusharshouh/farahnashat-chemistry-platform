'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function TopLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Trigger smooth SPA fill loading bar on navigation
    setLoading(true);
    setProgress(20);

    const timer1 = setTimeout(() => setProgress(55), 100);
    const timer2 = setTimeout(() => setProgress(85), 250);
    const timer3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname, searchParams]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent overflow-hidden pointer-events-none">
      {/* Active Route Change Progress Fill */}
      {loading && (
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-all duration-300 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          {/* Glowing head pulse */}
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-white/80 animate-pulse" />
        </div>
      )}

      {/* Subtle idle top ambient line */}
      {!loading && (
        <div className="h-full w-full bg-gradient-to-r from-emerald-600/30 via-emerald-500/60 to-emerald-600/30" />
      )}
    </div>
  );
}
