'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X,
  Globe,
  ArrowUpRight,
  FlaskConical,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const LEFT_NAV_LINKS = [
    { href: '/', label: t('الرئيسية', 'Home') },
    { href: '/virtual-lab', label: t('المختبر الافتراضي', 'Virtual Lab (3D)'), badge: '3D' },
    { href: '/curriculum-map', label: t('خريطة المنهاج', 'Curriculum') },
  ];

  const RIGHT_NAV_LINKS = [
    { href: '/quiz', label: t('التقويم', 'Quiz') },
    { href: '/assistant', label: t('المساعد التعليمي', 'Tutor') },
    { href: '/about', label: t('عن المعلمة', 'About') },
    { href: '/lesson-plan', label: t('خطة الدرس', 'Lesson Plan') },
  ];

  const ALL_MOBILE_LINKS = [
    { href: '/', label: t('الرئيسية', 'Home') },
    { href: '/virtual-lab', label: t('المختبر الافتراضي (3D)', 'Virtual Lab (3D)') },
    { href: '/curriculum-map', label: t('خريطة المنهاج والمعادلات', 'Curriculum Map') },
    { href: '/quiz', label: t('اختبار التقويم والتشخيص', 'Quiz & Assessment') },
    { href: '/assistant', label: t('المساعد التعليمي الذكي', 'AI Study Assistant') },
    { href: '/lesson-plan', label: t('خطة الحصة النموذجية', 'Demo Lesson Plan') },
    { href: '/about', label: t('السيرة الذاتية والمؤهلات', 'Teacher Bio & Vision') },
    { href: '/whatsapp-connect', label: t('بوابة التواصل', 'Contact') },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-start">
            {LEFT_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-bold transition-colors border ${
                    isActive
                      ? 'bg-slate-900 text-emerald-400 border-slate-900'
                      : 'border-transparent text-slate-700 hover:text-slate-950 hover:bg-slate-100 hover:border-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-mono px-1 py-0.2 bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* CENTERED BRAND LOGO - MINIMALIST ENGLISH FOCUS */}
          <div className="flex items-center justify-center shrink-0 px-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-slate-950 border border-slate-800 flex items-center justify-center p-0.5 overflow-hidden transition-transform group-hover:scale-105">
                <Image 
                  src="/images/logo.png" 
                  alt="Farah Nashat Chemistry" 
                  width={32} 
                  height={32}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="text-center md:text-right">
                <div className="font-mono font-black text-xs sm:text-sm tracking-wider uppercase text-slate-950 group-hover:text-emerald-700 transition">
                  FARAH NASHAT
                </div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-slate-600 font-semibold -mt-0.5">
                  Chemistry
                </div>
              </div>
            </Link>
          </div>

          {/* Right Navigation & Controls */}
          <div className="flex items-center gap-1.5 flex-1 justify-end">
            <nav className="hidden lg:flex items-center gap-1">
              {RIGHT_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs font-bold transition-colors border ${
                      isActive
                        ? 'bg-slate-900 text-emerald-400 border-slate-900'
                        : 'border-transparent text-slate-700 hover:text-slate-950 hover:bg-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition ml-1"
              title="تغيير اللغة / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span className="num-en text-[11px] uppercase tracking-wider">{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            <Link
              href="/virtual-lab"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition border border-emerald-900 shadow-2xs"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{t('المختبر', 'Lab')}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {ALL_MOBILE_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-bold border transition ${
                  isActive
                    ? 'bg-slate-950 text-emerald-400 border-slate-950'
                    : 'border-transparent text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-emerald-700 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-right">
          
          {/* Main Profile Info (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-700 flex items-center justify-center font-bold text-xs text-white">
                FN
              </div>
              <div>
                <h3 className="font-mono font-black text-white text-base tracking-wider uppercase">
                  FARAH NASHAT
                </h3>
                <p className="text-[11px] text-emerald-400 font-bold">
                  {t('الموقع التعليمي للمعلمة فرح نشأت - الكيمياء العامة والمناهج المطورة', 'Chemistry Education & Interactive 3D Learning')}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              {t(
                'بيئة تعليمية وبحثية تفاعلية متخصصة في تدريس الكيمياء، تهدف إلى تبسيط المفاهيم العلمية المعقدة من خلال النمذجة ثلاثية الأبعاد (3D)، والمختبرات الافتراضية، وربط الكيمياء بالصناعة والبيئة والحياة اليومية.',
                'Interactive chemistry education portal dedicated to conceptual clarity, 3D molecular modeling, virtual laboratory inquiry, and real-world industrial and biological linkages.'
              )}
            </p>
          </div>

          {/* Quick Syllabus & Lab Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              {t('أقسام الموقع', 'Platform Sections')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/virtual-lab" className="hover:text-emerald-400 transition">{t('المختبر الافتراضي (3D)', '3D Virtual Lab')}</Link></li>
              <li><Link href="/curriculum-map" className="hover:text-emerald-400 transition">{t('خريطة المنهاج والمعادلات', 'Curriculum Map & Equations')}</Link></li>
              <li><Link href="/quiz" className="hover:text-emerald-400 transition">{t('التقويم التكويني والتشخيصي', 'Formative Assessment')}</Link></li>
              <li><Link href="/assistant" className="hover:text-emerald-400 transition">{t('المساعد التعليمي الذكي', 'AI Study Assistant')}</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition">{t('عن المعلمة والسيرة الذاتية', 'Teacher Bio & Vision')}</Link></li>
            </ul>
          </div>

          {/* Contact & Resources (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              {t('روابط سريعة', 'Quick Links')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/lesson-plan" className="hover:text-emerald-400 transition">{t('خطة الحصة النموذجية', 'Demo Lesson Plan')}</Link></li>
              <li><Link href="/whatsapp-connect" className="hover:text-emerald-400 transition">{t('بوابة التواصل المباشر', 'Contact Gateway')}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 font-mono">
          <p>
            {t('جميع الحقوق محفوظة للأستاذة فرح نشأت © 2026', 'All rights reserved © 2026 Farah Nashat')}
          </p>
          <div className="flex items-center gap-3">
            <span>Farah Nashat | Chemistry Education Platform</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
