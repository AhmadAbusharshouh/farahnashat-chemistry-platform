'use client';

import Link from 'next/link';
import { 
  FlaskConical, 
  Sparkles, 
  BookOpen, 
  ArrowLeft, 
  ArrowRight, 
  GraduationCap, 
  Award, 
  Layers, 
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { SUBSTANCES_DATA } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

export default function HomePage() {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left/Right Column: Teacher Bio & Introduction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {t(
                    'المقابلة والحصة النموذجية | الأربعاء 2/9/2026 - الساعة 8:00 صباحاً',
                    'Interview & Demo Lesson | Wednesday Sep 2, 2026 - 8:00 AM'
                  )}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight">
                {t('الملف التحضيري للمعلمة', 'Teaching Dossier for')} <br />
                <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-8">
                  {t('أ. فرح نشأت | كيمياء الصف التاسع', 'Farah Nashat | Grade 9 Chemistry')}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                {t(
                  'أهلاً وسهلاً بلجنة المقابلة الكريمة وإدارة المدرسة الإسلامية الحديثة في إربد (حكما). يضم هذا الموقع تحضيري الكامل للحصة النموذجية (10 دقائق) لدرس "الحموض والقواعد والكواشف" من كتاب كولينز للصف التاسع (ص 43 - 55)، متضمناً خطة الدرس التفصيلية، المختبر الافتراضي للتجارب، خريطة المفاهيم، والتقويم التكويني.',
                  'Welcome to the official teaching dossier of Ms. Farah Nashat, candidate for the Chemistry Teacher position at Modern Islamic School - Irbid (Hikma). Here you will find the complete 10-minute demo lesson blueprint, interactive virtual chemistry lab experiments, Collins Grade 9 concept maps, and formative assessments.'
                )}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/lesson-plan"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm hover:shadow transition"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t('خطة الحصة النموذجية (10 دقائق)', 'View 10-Minute Lesson Plan')}</span>
                  <Arrow className="w-4 h-4" />
                </Link>

                <Link
                  href="/virtual-lab"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-2xs transition"
                >
                  <FlaskConical className="w-4 h-4 text-emerald-700" />
                  <span>{t('تجارب المختبر الافتراضي', 'Open Virtual Lab')}</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold text-xs">10د</div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-800">{t('خطة الحصة', 'Lesson Plan')}</div>
                    <div className="text-[11px] text-slate-500">{t('مضبوطة بالوقت', '10 Minutes')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold text-xs">pH</div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-800">{t('تجارب عملية', 'Lab Experiments')}</div>
                    <div className="text-[11px] text-slate-500">{t('كواشف ومعايرة', 'pH & Indicators')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold text-xs">ص 43</div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-800">{t('منهاج كولينز', 'Collins Book')}</div>
                    <div className="text-[11px] text-slate-500">{t('ص 43 - 55', 'pp. 43 - 55')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right/Left Column: Live Interactive Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      {t('عينات من مواد المنهاج المدرسي', 'Textbook Substance Samples')}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">
                    {t('كتاب كولينز ص 45 - 54', 'Collins pp. 45-54')}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  {t(
                    'أمثلة من المواد الشائعة في كتاب الصف التاسع وقيم الرقم الهيدروجيني لها وتأثيرها على الكواشف:',
                    'Key chemical substances from the Grade 9 curriculum with their pH values and indicator shifts:'
                  )}
                </p>

                <div className="space-y-3">
                  {SUBSTANCES_DATA.slice(1, 4).map((sub) => (
                    <div 
                      key={sub.id} 
                      className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-emerald-50/40 transition flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">
                            {t(sub.name, sub.nameEn)}
                          </span>
                          <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">{sub.formula}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{sub.curriculumPage} • pH = <strong className="text-emerald-800">{sub.ph.toFixed(1)}</strong></p>
                      </div>

                      <span 
                        className="w-4 h-4 rounded-full border border-white shadow-xs shrink-0" 
                        style={{ backgroundColor: sub.color }}
                        title={`pH ${sub.ph}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {t('المختبر يحتوي على 6 أقسام تجريبية', 'Lab includes 6 interactive experiment stations')}
                  </span>
                  <Link 
                    href="/virtual-lab" 
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                  >
                    <span>{t('دخول المختبر', 'Enter Lab')}</span>
                    <Arrow className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pillars of Active Learning */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest">
            {t('استراتيجيات التدريس المعتمدة في الحصة', 'Instructional Strategies')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('أركان الحصة النموذجية واستراتيجيات التعلم النشط', 'Key Pillars of the 10-Minute Demo Lesson')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t(
              'خطة تدريسية محكمة تطبق استراتيجيات التدريس التفاعلي وفق معايير وزارة التربية والتعليم ومنهاج كولينز.',
              'Designed according to modern Ministry of Education active learning standards and Collins curriculum rubrics.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">01</div>
            <h3 className="font-bold text-slate-900 text-base">{t('التهيئة الحافزة وإثارة الفضول', 'Engaging Hook')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t(
                'بدء الحصة بسؤال مثير للتفكير: لماذا نشعر بالحموضة عند تذوق الليمون بينما يمتلك الصابون ملمساً زلقاً وطعماً مراً؟',
                'Engaging question on sour lemons vs slippery bitter soap to spark curiosity and inquiry.'
              )}
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">02</div>
            <h3 className="font-bold text-slate-900 text-base">{t('بناء المفاهيم الكيميائية', 'Concept Development')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t(
                'توضيح مفهوم تأين الحموض لإنتاج أيونات H⁺ وتأين القواعد لإنتاج أيونات OH⁻ ومقارنة قوتها وتوصيلها للتيار.',
                'Explaining acid ionization into H⁺ and base ionization into OH⁻ with conductivity comparisons.'
              )}
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">03</div>
            <h3 className="font-bold text-slate-900 text-base">{t('التطبيق العملي والاستقصاء', 'Hands-On Inquiry')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t(
                'استخدام الكواشف الطبيعية (الملفوف الأحمر) والصناعية، وقياس الرقم الهيدروجيني pH، ورصد تفاعل التعادل.',
                'Demonstrating red cabbage extract, litmus, pH meter, and titration neutralization.'
              )}
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">04</div>
            <h3 className="font-bold text-slate-900 text-base">{t('التقويم التكويني والربط القيمي', 'Formative Assessment')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t(
                'أسئلة تشخيصية سريعة لقياس مدى الاستيعاب، مع ربط دقة الاتزان الكيميائي في جسم الإنسان بالآية الكريمة: (وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ).',
                'Quick formative check and connecting biological pH balance to the divine cosmic order.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t('منهاج كولينز - الصف التاسع الأساسي (ص 43 - 55)', 'Collins Grade 9 Chemistry (pp. 43-55)')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-snug">
              {t('تغطية شاملة لوحدة الحموض والقواعد والكواشف وتطبيقاتها الحياتية', 'Comprehensive Coverage of Acids, Bases, Indicators & Real-World Links')}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t(
                'شرح تفصيلي للمفاهيم والمعادلات الكيميائية، مع الربط بالصناعة (إنتاج 20 مليون طن من HCl و60 مليون طن من NaOH)، والرياضة (ألم العضلات وحمض اللاكتيك)، وصحة الشعر (كيراتين عند pH 5.5)، والزراعة (معالجة حموضة التربة بـ Ca(OH)₂).',
                'Covers chemical definitions, equations, and real-world connections: industrial scale, sports physiology, hair keratin pH 5.5, and agricultural soil correction.'
              )}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/curriculum-map"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
              >
                {t('خريطة المنهاج والمعادلات', 'View Curriculum Map')}
              </Link>
              <Link
                href="/quiz"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition"
              >
                {t('بدء الاختبار التشخيصي', 'Start Diagnostic Quiz')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
