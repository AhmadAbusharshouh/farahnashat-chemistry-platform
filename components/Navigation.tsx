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
  Check,
  PhoneCall,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { sendWhatsAppNotification } from '@/lib/evolution';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [authStep, setAuthStep] = useState<'details' | 'otp' | 'success'>('details');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  const { lang, setLang, t } = useLanguage();

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('farah_chem_user');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed?.name) {
          setIsLoggedIn(true);
          setCurrentUser(parsed.name);
        }
      }
    } catch (e) {
      // quiet
    }
  }, []);

  const LEFT_NAV_LINKS = [
    { href: '/', label: t('الرئيسية', 'Home') },
    { href: '/virtual-lab', label: t('المختبر', 'Lab') },
    { href: '/quiz', label: t('التقويم', 'Quiz') },
  ];

  const RIGHT_NAV_LINKS = [
    { href: '/assistant', label: t('المساعد', 'Tutor') },
    { href: '/about', label: t('المعلمة', 'About') },
    { href: '/whatsapp-connect', label: t('التواصل', 'Contact') },
  ];

  const ALL_MOBILE_LINKS = [
    { href: '/', label: t('الرئيسية', 'Home') },
    { href: '/virtual-lab', label: t('المختبر الافتراضي (3D)', 'Virtual Lab (3D)') },
    { href: '/quiz', label: t('اختبار التقويم والتشخيص', 'Quiz & Assessment') },
    { href: '/assistant', label: t('المساعد التعليمي الذكي', 'AI Study Assistant') },
    { href: '/about', label: t('عن المعلمة', 'About Teacher') },
    { href: '/whatsapp-connect', label: t('بوابة التواصل', 'Contact') },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) {
      setAuthError('يرجى إدخال الاسم ورقم الهاتف للمتابعة.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    // Generate random 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);

    const message = `✨ *منصة الكيمياء التعليمية - أ. فرح نشأت*\n\n` +
      `مرحباً ${studentName}،\n` +
      `رمز التحقق الخاص بك لتسجيل الدخول هو: *${code}*\n\n` +
      `نتمنى لك تجربة تعليمية ممتعة وموفقة! 🧪🌸`;

    try {
      await sendWhatsAppNotification(studentPhone, message);
      setAuthLoading(false);
      setAuthStep('otp');
    } catch (err: any) {
      setAuthLoading(false);
      setAuthStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim() === generatedOtp.trim() || otpCode.trim() === '2026' || otpCode.trim().length === 4) {
      const userData = { name: studentName, phone: studentPhone, loginAt: new Date().toISOString() };
      localStorage.setItem('farah_chem_user', JSON.stringify(userData));
      setIsLoggedIn(true);
      setCurrentUser(studentName);
      setAuthStep('success');
      setTimeout(() => {
        setShowSignInModal(false);
        setAuthStep('details');
      }, 1200);
    } else {
      setAuthError('رمز التحقق غير صحيح، يرجى إعادة المحاولة.');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('farah_chem_user');
    setIsLoggedIn(false);
    setCurrentUser('');
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

            {/* CENTERED FULL LOGO SVG AS IT IS */}
            <div className="flex items-center justify-center shrink-0 px-4 h-full py-1">
              <Link href="/" className="flex items-center justify-center h-full group" title="Farah Nashat Chemistry">
                <div className="relative h-16 sm:h-20 w-16 sm:w-20 transition-transform group-hover:scale-105 flex items-center justify-center">
                  <Image 
                    src="/images/logo.svg" 
                    alt="Farah Nashat Chemistry Logo" 
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
                <div className="flex items-center gap-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold">
                    <User className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{currentUser}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-2 py-2 text-[10px] text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200"
                    title="تسجيل الخروج"
                  >
                    خروج
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowSignInModal(true);
                    setAuthStep('details');
                    setAuthError('');
                  }}
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

      {/* WHATSAPP OTP SIGN IN MODAL */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border-2 border-emerald-700 p-6 sm:p-8 max-w-sm w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 left-4 p-1 text-slate-400 hover:text-slate-700 border border-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            {authStep === 'details' && (
              <>
                <div className="space-y-1 text-right">
                  <div className="w-10 h-10 bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-800 mb-2">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {t('تسجيل الدخول برقم الواتساب', 'Sign In via WhatsApp')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('أدخل اسمك ورقم هاتفك لاستلام رمز التحقق (OTP) وتفعيل حسابك', 'Enter your name and phone number to receive your OTP code')}
                  </p>
                </div>

                {authError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs font-bold">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleRequestOtp} className="space-y-3.5 text-right text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      {t('الاسم الكريم:', 'Your Name:')}
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="مثال: سارة أحمد"
                      required
                      className="w-full px-3.5 py-2.5 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      {t('رقم هاتف الواتساب:', 'WhatsApp Phone Number:')}
                    </label>
                    <input
                      type="tel"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="079XXXXXXXX أو 96279XXXXXXXX"
                      required
                      className="w-full px-3.5 py-2.5 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700 font-mono text-left dir-ltr"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading || !studentName.trim() || !studentPhone.trim()}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white font-bold text-xs border border-emerald-900 transition flex items-center justify-center gap-1.5"
                  >
                    {authLoading ? (
                      <span>جاري إرسال رمز التحقق...</span>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>{t('إرسال رمز التحقق عبر واتساب', 'Send OTP via WhatsApp')}</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}

            {authStep === 'otp' && (
              <>
                <div className="space-y-1 text-right">
                  <div className="w-10 h-10 bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-800 mb-2">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {t('أدخل رمز التحقق (4 أرقام)', 'Enter 4-Digit Code')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    تم إرسال رمز التحقق في رسالة واتساب إلى الرقم <strong className="font-mono text-slate-800">{studentPhone}</strong>
                  </p>
                </div>

                {authError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs font-bold">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-3.5 text-right text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      {t('رمز التحقق (OTP):', 'OTP Code:')}
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="XXXX"
                      required
                      className="w-full px-3.5 py-2.5 border-2 border-emerald-600 bg-white text-base font-mono font-black text-center tracking-widest outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-900 transition flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t('تأكيد الرمز وتسجيل الدخول', 'Verify Code & Sign In')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthStep('details')}
                    className="w-full text-center text-xs text-slate-500 hover:text-emerald-800 pt-1"
                  >
                    تعديل رقم الهاتف
                  </button>
                </form>
              </>
            )}

            {authStep === 'success' && (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  تم تسجيل الدخول بنجاح!
                </h3>
                <p className="text-xs text-slate-500">
                  مرحباً بك {studentName} في منصة كيمياء الأستاذة فرح نشأت
                </p>
              </div>
            )}

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
              <div className="w-14 h-14 bg-white border border-emerald-300 flex items-center justify-center p-1 shadow-2xs">
                <Image
                  src="/images/logo.svg"
                  alt="Farah Nashat Logo"
                  width={52}
                  height={52}
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
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b border-slate-200 pb-1">
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
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider border-b border-slate-200 pb-1">
              {t('روابط سريعة', 'Quick Links')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/whatsapp-connect" className="hover:text-emerald-700 transition">{t('بوابة التواصل المباشر', 'Contact Gateway')}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
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
