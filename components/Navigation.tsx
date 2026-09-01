'use client';

import Link from 'next/link';
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
    { href: '/lesson-plan', label: t('الحصة النموذجية (10 د)', 'Demo Lesson (10m)') },
    { href: '/virtual-lab', label: t('المختبر الافتراضي', 'Virtual Lab'), badge: t('تفاعلي', 'Live') },
    { href: '/curriculum-map', label: t('خريطة المنهاج', 'Curriculum Map') },
    { href: '/quiz', label: t('التقويم التكويني', 'Quiz') },
    { href: '/assistant', label: t('المساعد الذكي (AI)', 'AI Tutor') },
    { href: '/about', label: t('الملف التعريفي', 'About Bio') },
    { href: '/whatsapp-connect', label: t('تواصل واتساب', 'WhatsApp') },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Refined Minimalist Brand Stamp */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-slate-950 text-emerald-400 flex items-center justify-center font-bold text-sm border border-slate-800 tracking-tight transition-transform group-hover:scale-102">
              <span className="num-en font-black text-xs">FN</span>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                  {t('أ. فرح نشأت', 'Farah Nashat')}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {t('معلمة كيمياء', 'Chemistry')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {t('المدرسة الإسلامية الحديثة - إربد (حكما)', 'Modern Islamic School - Irbid (Hikma)')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Clean Editorial Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                        isActive ? 'bg-emerald-500 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Clean Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
              title="تغيير اللغة / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="num-en text-[11px] uppercase tracking-wider">{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            <Link
              href="/virtual-lab"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-2xs"
            >
              <span>{t('المختبر الافتراضي', 'Launch Lab')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-md">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">
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
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-right">
          
          {/* Main School & Teacher Profile Section (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="font-extrabold text-white text-base">
                {t('منصة تدريس الكيمياء التفاعلية', 'Interactive Chemistry Teaching Platform')}
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t(
                'ملف تحضيري ومهني متكامل للحصة النموذجية (10 دقائق) لدرس الحموض والقواعد من كتاب الكيمياء للصف التاسع (منهاج كولينز ص 43-55)، مُعد لمقابلة شاغر معلمة الكيمياء لدى المدرسة الإسلامية الحديثة - إربد (حكما) التابعة لجمعية المركز الإسلامي الخيرية.',
                'A comprehensive pedagogical dossier and virtual chemistry laboratory tailored for the 10-minute demo lesson (Acids and Bases, Collins Grade 9 pp. 43-55) at Modern Islamic School - Irbid (Hikma), Islamic Centre Charity Society.'
              )}
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-200">{t('إعداد وإشراف:', 'Prepared By:')}</strong> {t('أ. فرح نشأت (بكالوريوس كيمياء)', 'Farah Nashat (B.Sc. Chemistry)')}</div>
              <div><strong className="text-slate-200">{t('المؤسسة المستهدفة:', 'Target Institution:')}</strong> {t('المدرسة الإسلامية الحديثة - إربد (حكما)', 'Modern Islamic School - Irbid (Hikma)')}</div>
            </div>
          </div>

          {/* Quick Syllabus & Lab Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('أركان المنهاج والمختبر', 'Syllabus & Lab Modules')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/lesson-plan" className="hover:text-emerald-400 transition">{t('خطة الحصة النموذجية (10 دقائق)', '10-Minute Demo Lesson Plan')}</Link></li>
              <li><Link href="/virtual-lab" className="hover:text-emerald-400 transition">{t('مقياس الرقم الهيدروجيني pH الرقمي', 'Digital pH Meter Simulator')}</Link></li>
              <li><Link href="/virtual-lab" className="hover:text-emerald-400 transition">{t('محاكاة تفاعل التعادل والمعايرة', 'Neutralization & Titration Chamber')}</Link></li>
              <li><Link href="/curriculum-map" className="hover:text-emerald-400 transition">{t('خريطة منهاج كولينز (تاسع)', 'Collins Grade 9 Concept Map')}</Link></li>
              <li><Link href="/quiz" className="hover:text-emerald-400 transition">{t('التقويم التكويني وبنك الأسئلة', 'Formative Quiz & Assessment')}</Link></li>
            </ul>
          </div>

          {/* Interview & Location Details (4 cols) */}
          <div className="md:col-span-4 space-y-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              {t('بيانات المقابلة والحصة النموذجية', 'Interview & Venue Logistics')}
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
                <strong className="text-white">{t('الموقع المعتمد:', 'Venue:')}</strong>{' '}
                <span>{t('إربد - شارع عمان - شمال مخابز السنبلة - بداية حكما', 'Irbid - Amman Street - North of Al-Sunbula Bakeries - Entrance of Hikma')}</span>
              </p>
              <p className="pt-1">
                <strong className="text-white">{t('الدرس المقرر:', 'Topic:')}</strong>{' '}
                <span>{t('الحموض والقواعد والكواشف (كتاب الكيمياء ص 43-55)', 'Acids, Bases, Indicators & pH (pp. 43-55)')}</span>
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
              {t('منهاج كولينز المطور - المملكة الأردنية الهاشمية', 'Collins Chemistry Curriculum - Hashemite Kingdom of Jordan')}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
