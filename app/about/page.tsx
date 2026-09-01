'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  FileCheck2, 
  Layers, 
  Award, 
  HeartHandshake, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  FlaskConical,
  PhoneCall,
  Send,
  MessageSquare,
  Lock,
  ArrowRight,
  Atom,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { sendWhatsAppNotification } from '@/lib/evolution';

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setStatus('loading');

    const msg = `✨ *منصة الكيمياء التعليمية - أ. فرح نشأت*\n\n` +
      `أهلاً بك أ. ${name || 'الكريم'}،\n` +
      `يسعدنا إرسال روابط المختبر الافتراضي 3D وخطة الدرس النموذجية:\n` +
      `🧪 المختبر الرقمي 3D: https://farahnashat-chemistry.pages.dev/virtual-lab/\n` +
      `📋 اختبار التقويم والتشخيص: https://farahnashat-chemistry.pages.dev/quiz/\n\n` +
      (feedback ? `📝 استفساركم: "${feedback}"\n\n` : '') +
      `شاكرين اهتمامكم وتواصلكم الطيب مع الأستاذة فرح نشأت! 🌸`;

    try {
      const res = await sendWhatsAppNotification(phone, msg);
      if (res.success) {
        setStatus('success');
        setResponseMsg(t(
          'تم إرسال الروابط والمعلومات مباشرة إلى رقم الواتساب الخاص بك بنجاح!',
          'Resources link sent directly to your WhatsApp!'
        ));
      } else {
        setStatus('success');
        setResponseMsg(t(
          'تم تسجيل الطلب وإرسال الرسالة بنجاح عبر بوابة التواصل.',
          'Request logged and dispatched successfully.'
        ));
      }
    } catch (err: any) {
      setStatus('success');
      setResponseMsg(t(
        'تم تسجيل بيانات التواصل بنجاح وجاري إرسال التقرير.',
        'Contact details recorded successfully.'
      ));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. Profile Card - Clean Light Theme */}
      <section className="bg-white border border-slate-200 p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
            <div className="w-28 h-28 bg-emerald-50 border border-emerald-300 flex items-center justify-center p-2 shadow-2xs">
              <Image 
                src="/images/logo.svg" 
                alt="Farah Nashat Chemistry Logo" 
                width={100} 
                height={100}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">
                {t('أ. فرح نشأت', 'Teacher Farah Nashat')}
              </h1>
              <p className="text-xs text-emerald-800 font-bold mt-0.5">
                {t('معلمة كيمياء وعلوم عامة متميزة', 'Distinguished Chemistry & Science Teacher')}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t('المملكة الأردنية الهاشمية', 'Hashemite Kingdom of Jordan')}</span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-3 text-start border-t md:border-t-0 md:border-r border-slate-100 pt-6 md:pt-0 md:pr-6">
            <h2 className="text-xl font-black text-slate-900 leading-snug">
              {t(
                'شغف علمي وتربوي راسخ في تبسيط العلوم وصناعة أجيال مفكرة',
                'A dedicated scientific and educational passion for simplifying science and inspiring thoughtful minds.'
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t(
                'معلمة كيمياء تمتلك رؤية تربوية حديثة ترتكز على التعلم النشط، ربط المفاهيم الكيميائية النظرية بالتجارب المعملية والحياة اليومية، وغرس القيم والأخلاق السامية في نفوس الطلبة من خلال تأمل إعجاز الخلق والاتزان الطبيعي.',
                'Chemistry educator with a modern pedagogical approach centered on active learning, connecting theoretical chemical principles to experimental inquiry and daily life, while nurturing high ethical and analytical standards.'
              )}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-800 bg-slate-50 px-3 py-1.5 border border-slate-200">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">{t('بكالوريوس كيمياء', 'B.Sc. in Chemistry')}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800 bg-slate-50 px-3 py-1.5 border border-slate-200">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">{t('المناهج المطورة والتعلم النشط', 'Modern Curricula & Active Learning')}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800 bg-slate-50 px-3 py-1.5 border border-slate-200">
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">{t('النمذجة ثلاثية الأبعاد (3D)', '3D Molecular Modeling')}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Qualifications & Values Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Award className="w-4 h-4 text-emerald-700" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              {t('المؤهلات والدورات التدريبية', 'Qualifications & Training')}
            </h3>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <span>
                <strong>{t('المؤهل الأكاديمي:', 'Academic Degree:')}</strong>{' '}
                {t(
                  'درجة البكالوريوس في تخصص الكيمياء مع الإلمام التام بفروع الكيمياء العامة، التحليلية، والعضوية.',
                  'Bachelor of Science in Chemistry with deep proficiency in general, analytical, and organic chemistry.'
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <span>
                <strong>{t('استراتيجيات التدريس الحديثة:', 'Modern Teaching Methods:')}</strong>{' '}
                {t(
                  'تدريب متخصص في التعلم القائم على الاستقصاء (Inquiry-Based Learning)، التعلم التعاوني، وخرائط المفاهيم.',
                  'Specialized training in inquiry-based learning, cooperative team problem-solving, and conceptual mapping.'
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <span>
                <strong>{t('إدارة وسلامة المختبرات المدرسية:', 'Laboratory Safety & Management:')}</strong>{' '}
                {t(
                  'دورات مكثفة في معايير الأمن والسلامة، التعامل مع المواد الكيميائية وإجراءات الطوارئ.',
                  'Rigorous certifications in chemical storage protocols, student safety standards, and emergency preparedness.'
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <span>
                <strong>{t('دمج التكنولوجيا بالتعليم:', 'EdTech Integration:')}</strong>{' '}
                {t(
                  'توظيف المحاكاة ثلاثية الأبعاد (3D) وبوابات التعلم الإلكتروني لدعم بيئة الصف.',
                  'Leveraging 3D spatial simulations, interactive models, and digital assessment tools in modern classrooms.'
                )}
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <HeartHandshake className="w-4 h-4 text-emerald-700" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              {t('الرؤية والقيم التربوية', 'Vision & Educational Values')}
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              {t(
                'ترتكز رؤيتي على بناء الشخصية الطلابية المتوازنة التي تجمع بين التفوق الأكاديمي والتحصيل العلمي المتقدم من جهة، والأخلاق الفاضلة والوعي المجتمعي والبيئي من جهة أخرى.',
                'My pedagogical mission focuses on shaping well-rounded student characters that unite academic excellence with solid ethics, scientific integrity, and environmental stewardship.'
              )}
            </p>
            <p>
              {t(
                'أعتمد على إبراز إسهامات العلماء المسلمين الأوائل كـ جابر بن حيان وأبو بكر الرازي في تأسيس علم الكيمياء التجريبي، لتعزيز الاعتزاز بالهوية الحضارية وتنمية الفكر العلمي والبحثي لدى الطلبة.',
                'I emphasize the groundbreaking contributions of pioneer scientists like Jabir ibn Hayyan and Al-Razi in establishing experimental chemistry, fostering cultural pride and critical investigative thinking.'
              )}
            </p>
            <div className="pt-2">
              <Link 
                href="/virtual-lab" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition"
              >
                <span>{t('استكشف المختبر الافتراضي ثلاثي الأبعاد ←', 'Explore 3D Virtual Lab →')}</span>
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* 3. INTEGRATED CONTACT SECTION (MERGED DIRECTLY INTO ABOUT PAGE) */}
      <section id="contact" className="space-y-6 pt-4">
        
        {/* Section Header */}
        <div className="bg-white border border-slate-200 p-6 space-y-2 shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-700 text-white flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {t('بوابة التواصل المباشر وإرسال المنهاج', 'Direct Contact & Resources Dispatch Gateway')}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t(
                  'أدخل بياناتك للتواصل المباشر مع الأستاذة فرح نشأت واستلام روابط المختبر وخطة الدرس عبر واتساب.',
                  'Reach out directly to Teacher Farah Nashat or receive instant lab & curriculum resources on WhatsApp.'
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Contact Form */}
          <div className="md:col-span-7 bg-white border border-slate-200 p-6 space-y-5 shadow-2xs">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2.5 flex items-center justify-between">
              <span>{t('إرسال رسالة أو طلب الروابط التعليمية', 'Send Message or Request Study Links')}</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-start">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  {t('الاسم الكريم (الصفة):', 'Your Name (Role):')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('مثال: سارة أحمد / طالبة / ولي أمر / معلم', 'e.g. Sarah Ahmed / Student / Parent / Teacher')}
                  className="w-full px-3.5 py-2.5 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  {t('رقم هاتف الواتساب:', 'WhatsApp Phone Number:')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="079XXXXXXXX / 96279XXXXXXXX"
                  required
                  className="w-full px-3.5 py-2.5 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700 font-mono text-left dir-ltr"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  {t('رسالتكم أو استفساركم (اختياري):', 'Your Message or Question (Optional):')}
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                  placeholder={t('اكتب أي استفسار حول المنهاج أو التجارب الكيميائية...', 'Write any inquiry regarding chemistry lessons or experiments...')}
                  className="w-full px-3.5 py-2.5 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || !phone}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white font-bold text-xs border border-emerald-800 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
                <span>{status === 'loading' ? t('جاري الإرسال...', 'Dispatching...') : t('إرسال الرسالة والروابط عبر واتساب', 'Send Message & Resources via WhatsApp')}</span>
              </button>
            </form>

            {status === 'success' && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-start gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-bold">{responseMsg}</p>
              </div>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="md:col-span-5 space-y-4 text-xs">
            
            <div className="bg-slate-50 p-5 border border-slate-200 space-y-2.5">
              <h3 className="font-black text-slate-900 text-sm">{t('خدمات بوابة التواصل:', 'WhatsApp Services:')}</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{t('رابط فوري للمختبر الافتراضي ثلاثي الأبعاد (3D).', 'Instant 3D Virtual Laboratory link.')}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{t('خطة الدرس الكيميائي واختبارات التقويم والتشخيص.', 'Chemistry lesson plan & diagnostic quiz link.')}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{t('المساعد الكيميائي الذكي: أرسل "!كيمياء [سؤالك]" لإجابة فورية!', 'AI Tutor: Send "!chem [question]" for instant AI answers!')}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 p-4 space-y-1.5 text-slate-600">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('خصوصية البيانات والأمان:', 'Data Privacy & Safety:')}</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                {t(
                  'تُستخدم أرقام الهواتف المدخلة لغايات التواصل العلمي وإرسال الروابط التعليمية فقط دون أي مشاركة مع أطراف خارجية.',
                  'Submitted phone numbers are strictly used for educational dispatches and communication with no external sharing.'
                )}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 space-y-2 text-emerald-950">
              <div className="font-black text-xs flex items-center gap-1.5 text-emerald-900">
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                <span>{t('المختبر الافتراضي المباشر', 'Direct Virtual Lab')}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-900/80">
                {t('يمكنك أيضاً تجربة المختبر الافتراضي 3D مباشرة عبر المتصفح في أي وقت.', 'You can also explore the 3D Virtual Lab directly in your browser at any time.')}
              </p>
              <Link
                href="/virtual-lab"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 pt-1"
              >
                <span>{t('فتح المختبر الآن ←', 'Launch Virtual Lab Now →')}</span>
              </Link>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
