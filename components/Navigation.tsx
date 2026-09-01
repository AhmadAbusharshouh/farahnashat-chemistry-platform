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
  PhoneCall
} from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'الرئيسية', icon: Sparkles },
  { href: '/lesson-plan', label: 'الحصة النموذجية (10 د)', icon: BookOpen },
  { href: '/virtual-lab', label: 'المختبر الافتراضي', icon: FlaskConical, badge: 'تفاعلي' },
  { href: '/curriculum-map', label: 'خريطة المنهاج (تاسع)', icon: GraduationCap },
  { href: '/quiz', label: 'التقويم التكويني', icon: HelpCircle },
  { href: '/assistant', label: 'المساعد الذكي', icon: MessageSquare },
  { href: '/about', label: 'الملف التعريفي', icon: GraduationCap },
  { href: '/whatsapp-connect', label: 'تواصل واتساب', icon: PhoneCall },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                <span className="font-extrabold text-slate-900 text-base tracking-tight">أ. فرح نشأت</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-300">معلمة كيمياء</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">المدرسة الإسلامية الحديثة - إربد (حكما)</p>
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

          {/* Action CTA & Mobile Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/virtual-lab"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all duration-200 hover:shadow"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>دخول المختبر</span>
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
  return (
    <footer className="bg-white border-t border-slate-200 py-10 mt-20 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <FlaskConical className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-base">منصة الكيمياء التفاعلية</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              منصة تعليمية مهنية متكاملة صُممت خصيصاً لمقابلة شاغر معلمة الكيمياء لدى المدرسة الإسلامية الحديثة - إربد (حكما) التابعة لجمعية المركز الإسلامي الخيرية.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/lesson-plan" className="hover:text-emerald-600 transition">تحضير الحصة النموذجية (10 دقائق)</Link></li>
              <li><Link href="/virtual-lab" className="hover:text-emerald-600 transition">مختبر الكيمياء الافتراضي (pH & المعايرة)</Link></li>
              <li><Link href="/curriculum-map" className="hover:text-emerald-600 transition">خريطة منهاج كولينز - الحموض والقواعد</Link></li>
              <li><Link href="/assistant" className="hover:text-emerald-600 transition">المساعد الكيميائي الذكي (Cloudflare AI)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">بيانات المقابلة والحصة</h4>
            <p className="text-xs text-slate-500 mb-1"><span className="font-semibold text-slate-700">الموعد:</span> الأربعاء 2/9/2026 - 8:00 صباحاً</p>
            <p className="text-xs text-slate-500 mb-1"><span className="font-semibold text-slate-700">الموقع:</span> إربد - شارع عمان - شمال مخابز السنبلة - بداية حكما</p>
            <p className="text-xs text-slate-500"><span className="font-semibold text-slate-700">المرشحة:</span> أ. فرح نشأت (معلمة كيمياء وعلوم)</p>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 جميع الحقوق محفوظة - أ. فرح نشأت | كيمياء الصف التاسع</p>
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
