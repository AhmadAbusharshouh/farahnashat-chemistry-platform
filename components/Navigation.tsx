'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FlaskConical, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  HelpCircle, 
  MessageSquare, 
  Menu, 
  X,
  PhoneCall,
  Globe
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const NAV_LINKS = [
    { href: '/', label: t('الرئيسية', 'Home'), icon: Sparkles },
    { href: '/lesson-plan', label: t('الحصة النموذجية (10 د)', 'Demo Lesson (10m)'), icon: BookOpen },
    { href: '/virtual-lab', label: t('المختبر الافتراضي', 'Virtual Lab'), icon: FlaskConical, badge: t('تفاعلي', 'Live') },
    { href: '/curriculum-map', label: t('خريطة المنهاج', 'Curriculum Map'), icon: GraduationCap },
    { href: '/quiz', label: t('التقويم التكويني', 'Quiz'), icon: HelpCircle },
    { href: '/assistant', label: t('المساعد الذكي (AI)', 'AI Tutor'), icon: MessageSquare },
    { href: '/about', label: t('الملف التعريفي', 'About Bio'), icon: GraduationCap },
    { href: '/whatsapp-connect', label: t('تواصل واتساب', 'WhatsApp'), icon: PhoneCall },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Teacher Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base tracking-tight">
                  {t('أ. فرح نشأت', 'Farah Nashat')}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                  {t('معلمة كيمياء', 'Chemistry Teacher')}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {t('المدرسة الإسلامية الحديثة - إربد (حكما)', 'Modern Islamic School - Irbid')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors duration-150 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] bg-emerald-600 text-white font-bold px-1 py-0.2 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher & Action CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
              title="تغيير اللغة / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            <Link
              href="/virtual-lab"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all duration-200 hover:shadow"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{t('دخول المختبر', 'Launch Lab')}</span>
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

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
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
    <footer className="bg-white border-t border-slate-200 py-10 mt-20 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <FlaskConical className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-base">
                {t('منصة الكيمياء التفاعلية', 'Interactive Chemistry Platform')}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t(
                'منصة تعليمية مهنية متكاملة صُممت خصيصاً لمقابلة شاغر معلمة الكيمياء لدى المدرسة الإسلامية الحديثة - إربد (حكما) التابعة لجمعية المركز الإسلامي الخيرية.',
                'Professional pedagogical platform designed for the Chemistry Teacher demo lesson at Modern Islamic School - Irbid (Hikma), Islamic Centre Charity Society.'
              )}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t('روابط سريعة', 'Quick Links')}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/lesson-plan" className="hover:text-emerald-600 transition">{t('تحضير الحصة النموذجية (10 دقائق)', '10-Minute Demo Lesson Blueprint')}</Link></li>
              <li><Link href="/virtual-lab" className="hover:text-emerald-600 transition">{t('مختبر الكيمياء الافتراضي (pH & المعايرة)', 'Virtual Lab (pH & Titration)')}</Link></li>
              <li><Link href="/curriculum-map" className="hover:text-emerald-600 transition">{t('خريطة منهاج كولينز - الحموض والقواعد', 'Collins Grade 9 Concept Map')}</Link></li>
              <li><Link href="/assistant" className="hover:text-emerald-600 transition">{t('المساعد الكيميائي الذكي (Cloudflare AI)', 'Smart AI Chemistry Assistant')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t('بيانات المقابلة والحصة', 'Interview & Demo Info')}
            </h4>
            <p className="text-xs text-slate-500 mb-1"><span className="font-semibold text-slate-700">{t('الموعد:', 'Time:')}</span> {t('الأربعاء 2/9/2026 - 8:00 صباحاً', 'Wednesday 2/9/2026 - 08:00 AM')}</p>
            <p className="text-xs text-slate-500 mb-1"><span className="font-semibold text-slate-700">{t('الموقع:', 'Location:')}</span> {t('إربد - شارع عمان - شمال مخابز السنبلة - بداية حكما', 'Irbid - Amman St. - Hikma')}</p>
            <p className="text-xs text-slate-500"><span className="font-semibold text-slate-700">{t('المرشحة:', 'Candidate:')}</span> {t('أ. فرح نشأت (معلمة كيمياء وعلوم)', 'Farah Nashat (Chemistry Specialist)')}</p>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>{t('© 2026 جميع الحقوق محفوظة - أ. فرح نشأت | كيمياء الصف التاسع', '© 2026 Farah Nashat | Grade 9 Chemistry')}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Cloudflare Edge Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
