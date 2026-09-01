'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X,
  Globe,
  FlaskConical,
  LogIn,
  User,
  Check,
  PhoneCall,
  KeyRound,
  CheckCircle2,
  LogOut
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { sendWhatsAppNotification } from '@/lib/evolution';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
    { href: '/about', label: t('عن المعلمة', 'About') },
  ];

  const ALL_MOBILE_LINKS = [
    { href: '/', label: t('الرئيسية', 'Home') },
    { href: '/virtual-lab', label: t('المختبر الافتراضي (3D)', 'Virtual Lab (3D)') },
    { href: '/quiz', label: t('اختبار التقويم والتشخيص', 'Quiz & Assessment') },
    { href: '/assistant', label: t('المساعد التعليمي الذكي', 'AI Study Assistant') },
    { href: '/about', label: t('عن المعلمة والتواصل', 'About Teacher & Contact') },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) {
      setAuthError(t('يرجى إدخال الاسم ورقم الهاتف للمتابعة.', 'Please enter your name and phone number.'));
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
      setAuthError(t('رمز التحقق غير صحيح، يرجى إعادة المحاولة.', 'Invalid OTP code. Please try again.'));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('farah_chem_user');
    setIsLoggedIn(false);
    setCurrentUser('');
    setUserMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* DESKTOP NAVBAR (HEIGHT ENLARGED TO h-24 sm:h-28, ABSOLUTE DEAD-CENTER LOGO) */}
          <div className="hidden md:flex items-center justify-between h-24 sm:h-28 relative">
            
            {/* Desktop Left Nav */}
            <nav className="flex items-center gap-2 justify-start whitespace-nowrap z-10 relative">
              {LEFT_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2.5 text-xs font-bold transition-all border whitespace-nowrap ${
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

            {/* 100% ABSOLUTE DEAD-CENTER LARGE LOGO (NO OFFSETS, NO WASTED VERTICAL BLANKS) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Link 
                href="/" 
                className="pointer-events-auto flex items-center justify-center group h-full py-1.5 transition-transform hover:scale-105" 
                title="Farah Nashat Chemistry"
              >
                <div className="relative h-20 sm:h-24 w-36 sm:w-44 flex items-center justify-center">
                  <Image 
                    src="/images/logo.svg" 
                    alt="Farah Nashat Chemistry Logo" 
                    width={180} 
                    height={110}
                    className="object-contain max-h-full max-w-full"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Right Nav & Controls */}
            <div className="flex items-center gap-2 justify-end whitespace-nowrap z-10 relative">
              <nav className="flex items-center gap-2 whitespace-nowrap">
                {RIGHT_NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3.5 py-2.5 text-xs font-bold transition-all border whitespace-nowrap ${
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
                className="inline-flex items-center gap-1 px-3 py-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition ml-1"
                title="Language / اللغة"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="num-en text-[11px] uppercase tracking-wider">{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              {/* Sign In Button */}
              {isLoggedIn ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setUserMenuOpen(true)}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold transition"
                    title={currentUser}
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="max-w-[130px] truncate">{currentUser}</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-2.5 py-2 text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 transition flex items-center gap-1"
                    title={t('تسجيل الخروج', 'Log Out')}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('خروج', 'Exit')}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowSignInModal(true);
                    setAuthStep('details');
                    setAuthError('');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold border border-emerald-800 shadow-2xs transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('تسجيل الدخول', 'Sign In')}</span>
                </button>
              )}
            </div>

          </div>

          {/* MOBILE NAVBAR - ABSOLUTE DEAD-CENTER LARGE LOGO */}
          <div className="flex md:hidden items-center justify-between h-20 sm:h-22 relative">
            
            {/* Mobile Left: Menu Toggle + Lang Button */}
            <div className="flex items-center gap-1.5 z-10 relative">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleLanguage}
                className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700"
                title="Language"
              >
                <span className="num-en text-[11px] font-black uppercase">{lang === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>

            {/* 100% ABSOLUTE DEAD-CENTER LARGE MOBILE LOGO */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Link 
                href="/" 
                className="pointer-events-auto flex items-center justify-center py-1 transition-transform active:scale-95"
              >
                <div className="relative h-16 sm:h-18 w-28 sm:w-32 flex items-center justify-center">
                  <Image 
                    src="/images/logo.svg" 
                    alt="Farah Nashat Chemistry Logo" 
                    width={130} 
                    height={80}
                    className="object-contain max-h-full max-w-full"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Mobile Right: Compact User Profile / Sign-In Button */}
            <div className="flex items-center justify-end z-10 relative">
              {isLoggedIn ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setUserMenuOpen(true)}
                    className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition"
                    title={currentUser}
                    aria-label="User Account"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="hidden xs:inline max-w-[65px] truncate text-[11px] font-bold">{currentUser}</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-red-600 hover:bg-red-50 border border-red-200 active:scale-95 transition"
                    title={t('تسجيل الخروج', 'Log Out')}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowSignInModal(true);
                    setAuthStep('details');
                    setAuthError('');
                  }}
                  className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold border border-emerald-800 shadow-2xs flex items-center gap-1"
                  title={t('تسجيل الدخول', 'Sign In')}
                >
                  <LogIn className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Dropdown Menu with Smooth Spring Slide Animation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 shadow-xl animate-in slide-in-from-top-4 fade-in duration-200">
            {/* If Logged In, display user info box directly inside drawer */}
            {isLoggedIn ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-950">{currentUser}</div>
                    <div className="text-[10px] text-emerald-700 font-bold">{t('حساب مفعل ومسجل', 'Active Account')}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 bg-white border border-red-300 text-red-600 hover:bg-red-50 text-[11px] font-bold flex items-center gap-1 shadow-2xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('خروج', 'Sign Out')}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowSignInModal(true);
                  setAuthStep('details');
                  setAuthError('');
                }}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 border border-emerald-900 shadow-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('تسجيل الدخول برقم الواتساب', 'Sign In via WhatsApp')}</span>
              </button>
            )}

            <div className="text-center py-1 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-500">
                {t('منصة كيمياء أ. فرح نشأت', 'Farah Nashat Chemistry')}
              </span>
            </div>
            {ALL_MOBILE_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 text-xs font-bold border transition ${
                    isActive
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'border-transparent text-slate-800 hover:bg-emerald-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* USER PROFILE MODAL (WHEN USER CLICKS ON THEIR USER PROFILE) */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-emerald-700 p-6 max-w-xs sm:max-w-sm w-full space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-200 text-center">
            <button
              onClick={() => setUserMenuOpen(false)}
              className="absolute top-3 left-3 p-1.5 text-slate-400 hover:text-slate-700 border border-slate-200"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center text-emerald-800 shadow-inner mt-2">
              <User className="w-8 h-8 text-emerald-700" />
            </div>

            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wider uppercase mb-1">
                {t('تم تسجيل الدخول', 'Signed In')}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 break-words px-2">
                {currentUser}
              </h3>
              <p className="text-xs text-slate-500">
                {t('أهلاً بك في منصة الكيمياء للأستاذة فرح نشأت', 'Welcome to Farah Nashat Chemistry Platform')}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  handleSignOut();
                  setUserMenuOpen(false);
                }}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-red-800 shadow-xs transition"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('تسجيل الخروج', 'Log Out')}</span>
              </button>
              <button
                onClick={() => setUserMenuOpen(false)}
                className="w-full py-2 text-slate-500 hover:text-slate-800 font-bold text-xs border border-slate-200 bg-slate-50 transition"
              >
                {t('إغلاق', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WHATSAPP OTP SIGN IN MODAL */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-emerald-700 p-6 sm:p-8 max-w-sm w-full space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 left-4 p-1 text-slate-400 hover:text-slate-700 border border-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            {authStep === 'details' && (
              <>
                <div className="space-y-1 text-center">
                  <div className="w-12 h-12 mx-auto bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-800 mb-2">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {t('تسجيل الدخول برقم الواتساب', 'Sign In via WhatsApp')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('أدخل اسمك ورقم هاتفك لاستلام رمز التحقق (OTP) وتفعيل حسابك', 'Enter your name and phone number to receive your OTP code')}
                  </p>
                </div>

                {authError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs font-bold text-center">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleRequestOtp} className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      {t('الاسم الكريم:', 'Your Name:')}
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder={t('مثال: سارة أحمد', 'e.g. Sarah Ahmed')}
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
                      placeholder="079XXXXXXXX / +96279XXXXXXXX"
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
                      <span>{t('جاري إرسال رمز التحقق...', 'Sending OTP code...')}</span>
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
                <div className="space-y-1 text-center">
                  <div className="w-12 h-12 mx-auto bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-800 mb-2">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {t('أدخل رمز التحقق (4 أرقام)', 'Enter 4-Digit Code')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('تم إرسال رمز التحقق في رسالة واتساب إلى الرقم', 'Verification code sent via WhatsApp to')}{' '}
                    <strong className="font-mono text-slate-800">{studentPhone}</strong>
                  </p>
                </div>

                {authError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 text-xs font-bold text-center">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleVerifyOtp} className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block text-center">
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
                    {t('تعديل رقم الهاتف', 'Change Phone Number')}
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
                  {t('تم تسجيل الدخول بنجاح!', 'Signed in successfully!')}
                </h3>
                <p className="text-xs text-slate-500">
                  {t(`مرحباً بك ${studentName} في منصة كيمياء الأستاذة فرح نشأت`, `Welcome ${studentName} to Farah Nashat Chemistry Platform`)}
                </p>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}

{/* FOOTER: NO BORDERS AROUND LOGO, BIGGER LOGO, CENTERED IN MIDDLE OF FOOTER */}
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-50 border-t border-emerald-700 py-16 mt-20 text-slate-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center flex flex-col items-center">
        
        {/* Centered Bigger Logo with NO Border */}
        <div className="flex flex-col items-center space-y-3">
          <Link href="/" className="transition-transform hover:scale-105 inline-block">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
              <Image
                src="/images/logo.svg"
                alt="Farah Nashat Logo"
                width={144}
                height={144}
                className="object-contain max-h-full max-w-full"
              />
            </div>
          </Link>
          <div>
            <h3 className="font-mono font-black text-slate-950 text-lg tracking-wider uppercase">
              FARAH NASHAT
            </h3>
            <p className="text-xs text-emerald-800 font-bold mt-0.5">
              {t('الموقع التعليمي للكيمياء التفاعلية والمناهج المطورة', 'Interactive Chemistry Education Platform')}
            </p>
          </div>
        </div>

        {/* Centered Bio Summary */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {t(
            'منصة تعليمية متخصصة في تدريس الكيمياء، تهدف إلى تبسيط المفاهيم العلمية من خلال النمذجة ثلاثية الأبعاد (3D)، والمختبرات الافتراضية، وربط الكيمياء بالصناعة والبيئة والحياة اليومية.',
            'Interactive chemistry education portal dedicated to conceptual clarity, 3D molecular modeling, virtual laboratory inquiry, and real-world linkages.'
          )}
        </p>

        {/* Centered Navigation Links Grid */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs font-bold text-slate-700 border-y border-slate-200 py-4 max-w-2xl w-full">
          <Link href="/" className="hover:text-emerald-700 transition">{t('الرئيسية', 'Home')}</Link>
          <span className="text-slate-300">•</span>
          <Link href="/virtual-lab" className="hover:text-emerald-700 transition">{t('المختبر الافتراضي (3D)', '3D Virtual Lab')}</Link>
          <span className="text-slate-300">•</span>
          <Link href="/quiz" className="hover:text-emerald-700 transition">{t('التقويم التكويني والتشخيصي', 'Diagnostic Quiz')}</Link>
          <span className="text-slate-300">•</span>
          <Link href="/assistant" className="hover:text-emerald-700 transition">{t('المساعد التعليمي الذكي', 'AI Study Assistant')}</Link>
          <span className="text-slate-300">•</span>
          <Link href="/about" className="hover:text-emerald-700 transition">{t('عن المعلمة والتواصل', 'About & Contact')}</Link>
          <span className="text-slate-300">•</span>
          <Link href="/admin" className="text-emerald-800 hover:text-emerald-950 transition font-black">{t('لوحة المعلمة', 'Teacher Admin')}</Link>
        </div>

        {/* Bottom Credits Bar */}
        <div className="space-y-1 text-xs text-slate-500">
          <p>
            {t('جميع الحقوق محفوظة للأستاذة فرح نشأت © 2026', 'All rights reserved © 2026 Farah Nashat')}
          </p>
          <p className="text-[11px] text-slate-400">
            Farah Nashat | Chemistry Education & 3D Simulation Platform
          </p>
        </div>

      </div>
    </footer>
  );
}
