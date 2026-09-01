'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function WhatsAppConnectRedirect() {
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    // Automatically redirect to /about#contact
    const timer = setTimeout(() => {
      router.replace('/about#contact');
    }, 400);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white border border-slate-200 p-8 text-center space-y-4 shadow-2xs">
        <div className="w-12 h-12 mx-auto bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center justify-center">
          <PhoneCall className="w-6 h-6 text-emerald-700 animate-pulse" />
        </div>
        <h1 className="text-base font-black text-slate-900">
          {t('جاري التوجيه إلى قسم التواصل...', 'Redirecting to Contact Section...')}
        </h1>
        <p className="text-xs text-slate-500">
          {t(
            'تم دمج بوابة التواصل في صفحة الأستاذة فرح نشأت.',
            'The contact gateway has been merged into the About Teacher page.'
          )}
        </p>
        <div className="pt-2">
          <Link
            href="/about#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition border border-emerald-900"
          >
            <span>{t('الانتقال الفوري إلى قسم التواصل', 'Go to Contact Section')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
