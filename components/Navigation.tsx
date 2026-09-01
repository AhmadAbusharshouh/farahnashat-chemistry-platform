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
  LogIn,
  User,
  Check
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { lang, setLang, t } = useLanguage();

  // Clean, single-word links that fit in ONE line on desktop
  const LEFT_NAV_LINKS = [
    { href: '/', label: t('الرئيسية', 'Home') },
    { href: '/virtual-lab', label: t('المختبر', 'Lab') },
    { href: '/lesson-plan', label: t('الخطة', 'Plan') },
  ];

  const RIGHT_NAV_LINKS = [
    { href: '/quiz', label: t('التقويم', 'Quiz') },
    { href: '/assistant', label: t('المساعد', 'Tutor') },
    { href: '/about', label: t('المعلمة', 'About') },
  ];

  const ALL_MOBILE_LINKS = [
    { href: '/', label: t('الرئيسية', 'Home') },
    { href: '/virtual-lab', label: t('المختبر الافتراضي (3D)', 'Virtual Lab (3D)') },
    { href: '/quiz', label: t('اختبار التقويم والتشخيص', 'Quiz & Assessment') },
    { href: '/assistant', label: t('المساعد التعليمي الذكي', 'AI Study Assistant') },
    { href: '/lesson-plan', label: t('خطة الدرس النموذجية', 'Demo Lesson Plan') },
    { href: '/about', label: t('عن المعلمة', 'About Teacher') },
    { href: '/whatsapp-connect', label: t('بوابة التواصل', 'Contact') },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      setIsLoggedIn(true);
      setShowSignInModal(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            
            {/* Left Nav: Single-word links in ONE line */}
            <nav className="hidden md:flex items-center gap-2 flex-1 justify-start whitespace-nowrap">
              {LEFT_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 text-xs font-bold transition-all border whitespace-nowrap ${
                      isActive
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                        : 'border-transparent text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 hover:border-emerald-200'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* CENTERED LARGE EMBLEM ICON (FULL HEIGHT, SPACIOUS, ZERO CLIPPING) */}
            <div className="flex items-center justify-center shrink-0 px-4 h-full py-2">
              <Link href="/" className="flex items-center justify-center h-full group" title="Farah Nashat Chemistry">
                <div className="relative h-16 sm:h-20 w-16 sm:w-20 transition-transform group-hover:scale-105 flex items-center justify-center">
                  <Image 
                    src="/images/logo-icon.png" 
                    alt="Farah Nashat Chemistry Emblem" 
                    width={80} 
                    height={80}
                    className="object-contain max-h-full max-w-full"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Right Nav & Controls */}
            <div className="flex items-center gap-2 flex-1 justify-end whitespace-nowrap">
              <nav className="hidden lg:flex items-center gap-2 whitespace-nowrap">
                {RIGHT_NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3.5 py-2 text-xs font-bold transition-all border whitespace-nowrap ${
                        isActive
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                          : 'border-transparent text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 hover:border-emerald-200'
                      }`}
                    >
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 px-2.5 py-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition ml-1"
                title="Language / اللغة"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="num-en text-[11px] uppercase tracking-wider">{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              {/* Prominent Sign In Button */}
              {isLoggedIn ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{studentId}</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold border border-emerald-800 shadow-2xs transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('تسجيل الدخول', 'Sign In')}</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
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

        {/* Mobile Dropdown Menu */}
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
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'border-transparent text-slate-800 hover:bg-emerald-50'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border-2 border-emerald-700 p-6 sm:p-8 max-w-sm w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 left-4 p-1 text-slate-400 hover:text-slate-700 border border-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1.5 text-right">
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-800 mb-2">
                <LogIn className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                {t('تسجيل دخول الطالب / المعلم', 'Sign In')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('أدخل اسمك أو رقمك الأكاديمي لحفظ نتائج الاختبارات والتجارب', 'Enter your name or ID to save quiz results & lab experiments')}
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-3.5 text-right text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  {t('اسم الطالب / الكود الأكاديمي:', 'Student Name / Academic Code:')}
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="مثال: سارة أحمد / Farah2026"
                  required
                  className="w-full px-3.5 py-2.5 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-900 transition"
              >
                {t('دخول المنصة وحفظ الجلسة', 'Sign In & Save Session')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-50 border-t border-emerald-700 py-12 mt-20 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-right">
          
          {/* Main Profile Info with FULL LOGO (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white border border-emerald-300 flex items-center justify-center p-1 shadow-2xs">
                <Image
                  src="/images/logo-icon.png"
                  alt="Farah Nashat Logo"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-mono font-black text-slate-950 text-base tracking-wider uppercase">
                  FARAH NASHAT
                </h3>
                <p className="text-[11px] text-emerald-800 font-bold">
                  {t('الموقع التعليمي للكيمياء التفاعلية والمناهج المطورة', 'Interactive Chemistry Education Platform')}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
              {t(
                'منصة تعليمية متخصصة في تدريس الكيمياء، تهدف إلى تبسيط المفاهيم العلمية من خلال النمذجة ثلاثية الأبعاد (3D)، والمختبرات الافتراضية، وربط الكيمياء بالصناعة والبيئة والحياة اليومية.',
                'Interactive chemistry education portal dedicated to conceptual clarity, 3D molecular modeling, virtual laboratory inquiry, and real-world linkages.'
              )}
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider border-b border-slate-200 pb-1">
              {t('أقسام الموقع', 'Platform Sections')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/virtual-lab" className="hover:text-emerald-700 transition">{t('المختبر الافتراضي (3D)', '3D Virtual Lab')}</Link></li>
              <li><Link href="/quiz" className="hover:text-emerald-700 transition">{t('التقويم التكويني والتشخيصي', 'Formative Assessment')}</Link></li>
              <li><Link href="/assistant" className="hover:text-emerald-700 transition">{t('المساعد التعليمي الذكي', 'AI Study Assistant')}</Link></li>
              <li><Link href="/about" className="hover:text-emerald-700 transition">{t('عن المعلمة والسيرة الذاتية', 'Teacher Bio')}</Link></li>
            </ul>
          </div>

          {/* Contact (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider border-b border-slate-200 pb-1">
              {t('روابط سريعة', 'Quick Links')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/lesson-plan" className="hover:text-emerald-700 transition">{t('خطة الحصة النموذجية', 'Demo Lesson Plan')}</Link></li>
              <li><Link href="/whatsapp-connect" className="hover:text-emerald-700 transition">{t('بوابة التواصل المباشر', 'Contact Gateway')}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-mono">
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
