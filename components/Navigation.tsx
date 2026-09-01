'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const NAV_LINKS = [
    { href: '/', label: t('الرئيسية', 'Home') },
    { href: '/lesson-plan', label: t('خطة الحصة (10 د)', 'Demo Lesson (10m)') },
    { href: '/virtual-lab', label: t('المختبر الافتراضي (3D)', 'Virtual Lab (3D)'), badge: t('3D', '3D') },
    { href: '/curriculum-map', label: t('خريطة المنهاج', 'Curriculum Map') },
    { href: '/quiz', label: t('اختبار تشخيصي', 'Quiz') },
    { href: '/assistant', label: t('المساعد التعليمي', 'Study Assistant') },
    { href: '/about', label: t('عن المعلمة', 'About Teacher') },
    { href: '/whatsapp-connect', label: t('تواصل معنا', 'Contact') },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Sharp Brand Identity with Custom Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-slate-950 border border-slate-900 overflow-hidden relative shrink-0 flex items-center justify-center p-0.5">
              <Image 
                src="/images/logo.png" 
                alt="Farah Nashat Chemistry Logo" 
                width={40} 
                height={40}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-950 text-sm tracking-tight">
                  {t('أ. فرح نشأت', 'Farah Nashat')}
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-300">
                  {t('معلمة كيمياء', 'Chemistry Teacher')}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                {t('المدرسة الإسلامية الحديثة - إربد (حكما)', 'Modern Islamic School - Irbid (Hikma)')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Sharp Precision Style */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-bold transition-all border ${
                    isActive
                      ? 'bg-slate-950 text-emerald-400 border-slate-950 shadow-xs'
                      : 'border-transparent text-slate-700 hover:text-slate-950 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[9px] font-mono px-1 py-0.2 font-bold ${
                        isActive ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition"
              title="تغيير اللغة / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span className="num-en text-[11px] uppercase tracking-wider">{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            <Link
              href="/virtual-lab"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all border border-emerald-800 shadow-2xs"
            >
              <span>{t('المختبر 3D', '3D Lab')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-800 hover:text-slate-950 hover:bg-slate-100 border border-slate-300"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-900 bg-white px-4 pt-3 pb-5 space-y-1 shadow-md">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-bold border transition ${
                  isActive
                    ? 'bg-slate-950 text-emerald-400 border-slate-950'
                    : 'border-transparent text-slate-800 hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-mono bg-emerald-700 text-white px-1.5 py-0.5 font-bold">
                    {link.badge}
                  </span>
                )}
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
    <footer className="bg-slate-950 text-slate-300 border-t-2 border-emerald-600 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-right">
          
          {/* Main School & Teacher Profile Section (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 border border-emerald-400 flex items-center justify-center font-bold text-xs text-white">
                FN
              </div>
              <h3 className="font-black text-white text-base">
                {t('الملف التعليمي للأستاذة فرح نشأت', 'Teacher Farah Nashat Educational Portfolio')}
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t(
                'ملف تحضيري ومهني للحصة النموذجية (10 دقائق) لدرس الحموض والقواعد من كتاب الكيمياء للصف التاسع (منهاج كولينز ص 43-55)، مُعد لمقابلة شاغر معلمة الكيمياء لدى المدرسة الإسلامية الحديثة - إربد (حكما) التابعة لجمعية المركز الإسلامي الخيرية.',
                'A dedicated professional teaching dossier and 3D virtual chemistry laboratory prepared by Ms. Farah Nashat for the 10-minute demo lesson (Collins Grade 9 Chemistry, pp. 43-55) at Modern Islamic School - Irbid (Hikma).'
              )}
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-200">{t('إعداد المعلمة:', 'Teacher:')}</strong> {t('أ. فرح نشأت (بكالوريوس كيمياء)', 'Farah Nashat (B.Sc. Chemistry)')}</div>
              <div><strong className="text-slate-200">{t('المدرسة المستهدفة:', 'School:')}</strong> {t('المدرسة الإسلامية الحديثة - إربد (حكما)', 'Modern Islamic School - Irbid (Hikma)')}</div>
            </div>
          </div>

          {/* Quick Syllabus & Lab Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              {t('محتويات الملف والدرس', 'Dossier Contents')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/lesson-plan" className="hover:text-emerald-400 transition">{t('خطة الحصة النموذجية (10 دقائق)', '10-Minute Demo Lesson Plan')}</Link></li>
              <li><Link href="/virtual-lab" className="hover:text-emerald-400 transition">{t('المختبر الافتراضي ومحاكاة 3D', '3D Virtual Chemistry Lab')}</Link></li>
              <li><Link href="/curriculum-map" className="hover:text-emerald-400 transition">{t('خريطة منهاج كولينز (ص 43 - 55)', 'Collins Grade 9 Concept Map')}</Link></li>
              <li><Link href="/quiz" className="hover:text-emerald-400 transition">{t('التقويم التكويني وأسئلة الفهم', 'Formative Assessment & Quiz')}</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition">{t('السيرة الذاتية والمؤهلات', 'Teacher Bio & Qualifications')}</Link></li>
            </ul>
          </div>

          {/* Interview & Location Details (4 cols) */}
          <div className="md:col-span-4 space-y-3 bg-slate-900 border border-slate-800 p-5">
            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider">
              {t('موعد المقابلة والحصة النموذجية', 'Interview & Demo Schedule')}
            </h4>
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">{t('اليوم والتاريخ:', 'Date & Day:')}</strong>{' '}
                <span>{t('الأربعاء', 'Wednesday')} <span className="num-en font-bold text-white">02 / 09 / 2026</span></span>
              </p>
              <p>
                <strong className="text-white">{t('الوقت المحدد:', 'Time:')}</strong>{' '}
                <span>{t('الساعة', 'At')} <span className="num-en font-bold text-white">08:00 AM</span> {t('صباحاً', '')}</span>
              </p>
              <p>
                <strong className="text-white">{t('المكان:', 'Location:')}</strong>{' '}
                <span>{t('إربد - شارع عمان - شمال مخابز السنبلة - بداية حكما', 'Irbid - Amman Street - North of Al-Sunbula Bakeries - Entrance of Hikma')}</span>
              </p>
              <p className="pt-1">
                <strong className="text-white">{t('موضوع الحصة:', 'Topic:')}</strong>{' '}
                <span>{t('الحموض والقواعد والكواشف (كتاب الكيمياء ص 43 - 55)', 'Acids, Bases, Indicators & pH (pp. 43-55)')}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            {t('جميع الحقوق محفوظة للمعلمة أ. فرح نشأت © 2026', 'All rights reserved to Ms. Farah Nashat © 2026')}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">
              {t('كيمياء الصف التاسع - منهاج كولينز المطور', 'Grade 9 Chemistry - Collins Curriculum')}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
