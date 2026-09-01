'use client';

import { 
  Clock, 
  Target,
  AlertTriangle, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function LessonPlanPage() {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner - Clean Editorial Structure */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {t('خطة الحصة النموذجية المعيارية', 'Standard Demo Lesson Blueprint')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {t('تحضير درس "الحموض والقواعد والكواشف" (', 'Lesson Plan: "Acids, Bases & Indicators" (')}
              <span className="num-en text-emerald-700">10</span> {t('دقائق)', 'Minutes)')}
            </h1>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-xs shrink-0">
            <div className="text-slate-500 font-medium">{t('الزمن الكلي للحصة', 'Total Duration')}</div>
            <div className="text-emerald-800 font-black text-sm flex items-center gap-1.5 pt-0.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span><span className="num-en text-base">10</span> {t('دقائق نموذجية', 'Minutes')}</span>
            </div>
          </div>
        </div>

        {/* Lesson Metadata Grid with Western numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
            <span className="text-slate-500 block mb-1 font-medium">{t('المبحث والمرحلة', 'Subject & Grade')}</span>
            <span className="font-bold text-slate-900">{t('الكيمياء - الصف التاسع الأساسي', 'Chemistry - Grade 9')}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
            <span className="text-slate-500 block mb-1 font-medium">{t('مرجع المنهاج', 'Curriculum Ref')}</span>
            <span className="font-bold text-slate-900">{t('كتاب كولينز (الصفحات ', 'Collins (pp. ')}<span className="num-en">43 - 55</span>)</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
            <span className="text-slate-500 block mb-1 font-medium">{t('المدرسة المستهدفة', 'Target School')}</span>
            <span className="font-bold text-slate-900">{t('الإسلامية الحديثة - إربد (حكما)', 'Modern Islamic - Irbid')}</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70">
            <span className="text-slate-500 block mb-1 font-medium">{t('المعلمة المنفذة', 'Teacher')}</span>
            <span className="font-bold text-emerald-800">{t('أ. فرح نشأت', 'Farah Nashat')}</span>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-950">
              {t('نتاجات ومخرجات التعلم المستهدفة', 'Target Learning Outcomes')} <span className="num-en text-sm text-slate-500 font-semibold">(Learning Outcomes)</span>
            </h2>
            <p className="text-xs text-slate-500">
              {t(
                'يتوقع من الطالبة في نهاية الحصة المصغرة (10 دقائق) أن تكون قادرة على تحقيق التالي:',
                'By the end of the 10-minute session, students are expected to demonstrate:'
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs leading-relaxed">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-emerald-800 text-sm">
                  <span className="num-en font-black text-base">01.</span> {t('النتاج المعرفي', 'Cognitive Outcome')}
                </span>
                <span className="num-en text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Cognitive</span>
              </div>
              <p className="text-slate-600">
                {t(
                  'التمييز بين الحموض والقواعد من حيث الخصائص الكيميائية، نوع الأيونات الناتجة في المحلول المائي (H⁺ مقابل OH⁻)، واستخدامات كل منهما.',
                  'Differentiate between acids and bases by chemical properties, identifying H⁺ vs OH⁻ aqueous ionization.'
                )}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-emerald-800 text-sm">
                  <span className="num-en font-black text-base">02.</span> {t('النتاج المهاري والاستقصائي', 'Skill & Inquiry')}
                </span>
                <span className="num-en text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Skill</span>
              </div>
              <p className="text-slate-600">
                {t(
                  'استخدام كاشف تباع الشمس والكواشف الطبيعية (الملفوف الأحمر) ومقياس الرقم الهيدروجيني pH الرقمي لتصنيف المواد الكيميائية بدقة.',
                  'Utilize litmus paper, natural red cabbage indicator, and digital pH meters to classify substances accurately.'
                )}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-emerald-800 text-sm">
                  <span className="num-en font-black text-base">03.</span> {t('النتاج القيمي والوجداني', 'Affective Outcome')}
                </span>
                <span className="num-en text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Affective</span>
              </div>
              <p className="text-slate-600">
                {t(
                  'تقدير إعجاز الخالق في الاتزان الكيميائي داخل جسم الإنسان والبيئة، والالتزام بإجراءات السلامة العامة الصارمة في المختبر.',
                  'Appreciate the divine balance in chemical systems and strictly comply with laboratory safety protocols.'
                )}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 10-Minute Timeline Breakdown */}
      <section className="space-y-6">
        <div className="space-y-1 text-right">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            {t('التوزيع الزمني الدقيق لأركان الحصة (', 'Precise Step-by-Step Lesson Timeline (')}
            <span className="num-en text-emerald-700">10</span> {t('دقائق)', 'Minutes)')}
          </h2>
          <p className="text-xs text-slate-500">
            {t(
              'خطة تنفيذية مضبوطة بالثواني تضمن إشراك اللجنة وتحقيق التعلم النشط بالكامل.',
              'Calibrated minute-by-minute execution plan to engage the committee and maximize active learning.'
            )}
          </p>
        </div>

        <div className="space-y-4">
          
          {/* Phase 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs border-r-4 border-r-emerald-600 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-950 text-emerald-400 text-xs font-bold font-mono">
                  <span className="num-en">00:00 - 02:00</span>
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {t('التهيئة الحافزة والربط العقدي الحياتي', 'Engaging Hook & Real-World Curiosity')}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {t('استراتيجية: إثارة الفضول والاستمطار الفكري', 'Strategy: Inquiry & Curiosity Hook')}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <p>
                <strong>{t('إجراءات المعلمة:', 'Teacher Action:')}</strong>{' '}
                {t(
                  'عرض لغز بصري سريع: لماذا نشعر بالحموضة عند تذوق الليمون بينما يمتلك الصابون ملمساً زلقاً وطعماً مراً؟',
                  'Presents an everyday mystery: Why do lemons taste sour while soap feels slippery and tastes bitter?'
                )}
              </p>
              <p>
                <strong>{t('الربط القيمي:', 'Values Connection:')}</strong>{' '}
                {t(
                  'الاستشهاد بالآية الكريمة: (وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ) [الرعد: 8] لبيان حكمة الخالق في ضبط حموضة الدم والمعدة بدقة متناهية.',
                  'Reflecting on the verse (And everything with Him is by due measure) for biological homeostasis.'
                )}
              </p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs border-r-4 border-r-emerald-700 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-950 text-emerald-400 text-xs font-bold font-mono">
                  <span className="num-en">02:00 - 05:00</span>
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {t('بناء المفاهيم الكيميائية واستعراض الكواشف', 'Concept Building & Chemical Indicators')}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {t('استراتيجية: فكر - زاوج - شارك (Think-Pair-Share)', 'Strategy: Think-Pair-Share')}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <p>
                <strong>{t('المحتوى العلمي:', 'Scientific Core:')}</strong>{' '}
                {t(
                  'توضيح مفهوم تأين الحموض لإنتاج أيون الهيدروجين (H⁺ / H₃O⁺) وتأين القواعد لإنتاج أيون الهيدروكسيد (OH⁻).',
                  'Explaining acid ionization into H⁺/H₃O⁺ and base ionization into OH⁻ ions.'
                )}
              </p>
              <p>
                <strong>{t('النشاط التفاعلي:', 'Interactive Activity:')}</strong>{' '}
                {t(
                  'عرض كاشف الملفوف الأحمر الطبيعي وكاشف تباع الشمس، وطرح تساؤل على الحضور لتوقع اللون الناتج.',
                  'Demonstrating red cabbage broth color-shifting and litmus paper reactions.'
                )}
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs border-r-4 border-r-emerald-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-950 text-emerald-400 text-xs font-bold font-mono">
                  <span className="num-en">05:00 - 08:00</span>
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {t('المختبر الافتراضي ومحاكاة المعايرة الرقمية', 'Virtual Lab Simulation & Digital Titration')}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {t('استراتيجية: التعلم بالاستقصاء والنمذجة الرقمية', 'Strategy: Digital Modeling')}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <p>
                <strong>{t('التطبيق العملي:', 'Practical Simulation:')}</strong>{' '}
                {t(
                  'فتح صفحة المختبر الافتراضي من شاشة العرض، غمس قطب مقياس pH في محاليل مجهولة وتدريج الرقم الهيدروجيني من 0 إلى 14.',
                  'Dipping digital pH probe into test beakers across 0 to 14 spectrum.'
                )}
              </p>
              <p>
                <strong>{t('تفاعل التعادل:', 'Neutralization Reaction:')}</strong>{' '}
                {t(
                  'إجراء معايرة سريعة بإضافة قطرات من NaOH إلى حمض HCl حتى نقطة التكافؤ (اللون الوردي الخفيف مع الفينولفثالين).',
                  'Titrating NaOH drops into HCl with phenolphthalein reaching permanent faint pink equivalence point.'
                )}
              </p>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs border-r-4 border-r-emerald-950 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-950 text-emerald-400 text-xs font-bold font-mono">
                  <span className="num-en">08:00 - 10:00</span>
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {t('التقويم التكويني والختام المهاري', 'Formative Assessment & Wrap-up')}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {t('استراتيجية: بطاقات الخروج والتغذية الراجعة', 'Strategy: Exit Tickets & Instant Feedback')}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <p>
                <strong>{t('التقييم السريع:', 'Live Quiz:')}</strong>{' '}
                {t(
                  'إطلاق اختبار التقويم التكويني الرقمي (3 أسئلة فورية) للتأكد من رسوخ المفاهيم لدى المتعلمين.',
                  'Launching live interactive 3-question formative assessment.'
                )}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Safety Notice */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 flex items-start gap-4 text-xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-amber-950">{t('إرشادات السلامة العامة في المختبر الكيميائي', 'Laboratory Safety Protocols')}</h4>
          <p className="text-amber-900 leading-relaxed">
            {t(
              'يُحظر قطعياً تذوق أو لمس الحموض والقواعد الصناعية المركزة (مثل HCl و NaOH) نظراً لخاصيتها الكاوية الحارقة للأنسجة، مع وجوب ارتداء معطف المختبر والقفازات الواقية.',
              'Never touch or taste concentrated mineral acids or strong bases (HCl, NaOH). Always wear PPE, lab coats, and safety goggles.'
            )}
          </p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="text-center pt-2">
        <Link
          href="/virtual-lab"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-emerald-400 font-bold text-xs shadow-xs transition"
        >
          <span>{t('الانتقال لتطبيق التجربة في المختبر الافتراضي الآن', 'Launch Interactive Virtual Lab Simulator')}</span>
          <Arrow className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
