'use client';

import { 
  Clock, 
  Target, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight,
  BookOpen,
  FlaskConical,
  CheckCircle2,
  Boxes
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function LessonPlanPage() {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner - Sharp Precision Style */}
      <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-mono font-bold text-emerald-950 bg-emerald-100 px-3 py-1 border border-emerald-300">
              {t('خطة الحصة النموذجية المعيارية (10 دقائق)', 'Standard 10-Minute Demo Lesson Blueprint')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {t('تحضير درس "الحموض والقواعد والكواشف" (', 'Lesson Plan: "Acids, Bases & Indicators" (')}
              <span className="num-en text-emerald-700">10</span> {t('دقائق)', 'Minutes)')}
            </h1>
          </div>
          
          <div className="bg-slate-950 text-white border border-slate-900 px-4 py-2.5 text-xs shrink-0">
            <div className="text-slate-400 font-mono">{t('الزمن الكلي للحصة', 'Total Duration')}</div>
            <div className="text-emerald-400 font-mono font-black text-sm flex items-center gap-1.5 pt-0.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span><span className="num-en text-base">10</span> {t('دقائق محكمة', 'Minutes')}</span>
            </div>
          </div>
        </div>

        {/* Lesson Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-300">
            <span className="text-slate-500 block mb-1 font-medium">{t('المبحث والمرحلة', 'Subject & Grade')}</span>
            <span className="font-black text-slate-950">{t('الكيمياء - الصف التاسع الأساسي', 'Chemistry - Grade 9')}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-300">
            <span className="text-slate-500 block mb-1 font-medium">{t('مرجع المنهاج', 'Curriculum Ref')}</span>
            <span className="font-black text-slate-950">{t('كتاب كولينز (الصفحات ', 'Collins (pp. ')}<span className="num-en font-mono">43 - 55</span>)</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-300">
            <span className="text-slate-500 block mb-1 font-medium">{t('المدرسة المستهدفة', 'Target School')}</span>
            <span className="font-black text-slate-950">{t('الإسلامية الحديثة - إربد (حكما)', 'Modern Islamic - Irbid')}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-300">
            <span className="text-slate-500 block mb-1 font-medium">{t('المعلمة المنفذة', 'Teacher')}</span>
            <span className="font-black text-emerald-800">{t('أ. فرح نشأت (بكالوريوس كيمياء)', 'Farah Nashat (B.Sc.)')}</span>
          </div>
        </div>
      </div>

      {/* Hero Classroom Image & Context Strip */}
      <div className="border-2 border-slate-900 bg-white grid grid-cols-1 md:grid-cols-12 gap-0">
        <div className="md:col-span-5 relative aspect-[16/10] md:aspect-auto bg-slate-900 overflow-hidden min-h-[240px]">
          <Image
            src="/images/demo-lesson-classroom.png"
            alt="Active Learning Chemistry Classroom"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="md:col-span-7 p-6 space-y-3 text-right flex flex-col justify-center">
          <div className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-950 font-mono text-[11px] font-bold border border-emerald-300">
            استراتيجية التدريس: نموذج 5Es والتعلم النشط
          </div>
          <h2 className="text-lg font-black text-slate-950">
            حصة استقصائية تفاعلية تحفز التفكير العلمي لدى الطالبات
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            تمت هندسة هذه الحصة لتجمع بين إثارة الفضول عبر لغز الطعم والملمس، وبناء المفاهيم الكيميائية بدقة، وإجراء التجارب المعملية عبر المختبر الافتراضي، ثم التحقق الفوري من تحقق النتاجات التعليمية.
          </p>
          <div className="pt-2">
            <Link
              href="/virtual-lab"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-950 text-emerald-400 text-xs font-bold border border-slate-900 hover:bg-slate-900 transition"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>فتح مجسمات 3D المرتبطة بالحصة</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <section className="bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-4">
          <div className="w-9 h-9 bg-slate-950 text-emerald-400 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-950">
              {t('نتاجات ومخرجات التعلم المستهدفة', 'Target Learning Outcomes')} <span className="num-en text-sm text-slate-500 font-semibold">(Learning Outcomes)</span>
            </h2>
            <p className="text-xs text-slate-600">
              {t(
                'يتوقع من الطالبة في نهاية الحصة المصغرة (10 دقائق) أن تكون قادرة على تحقيق التالي:',
                'By the end of the 10-minute session, students are expected to demonstrate:'
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
          
          <div className="p-4 bg-slate-50 border border-slate-300 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-emerald-950 text-sm">
                <span className="num-en font-black text-base">01.</span> {t('النتاج المعرفي', 'Cognitive Outcome')}
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-700 bg-white px-1.5 py-0.5 border border-slate-300">Cognitive</span>
            </div>
            <p className="text-slate-700">
              {t(
                'التمييز بين الحموض والقواعد من حيث الخصائص الكيميائية، نوع الأيونات الناتجة في المحلول المائي (H⁺ مقابل OH⁻)، واستخدامات كل منهما.',
                'Differentiate between acids and bases by chemical properties, identifying H⁺ vs OH⁻ aqueous ionization.'
              )}
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-300 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-emerald-950 text-sm">
                <span className="num-en font-black text-base">02.</span> {t('النتاج المهاري والاستقصائي', 'Skill & Inquiry')}
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-700 bg-white px-1.5 py-0.5 border border-slate-300">Skill</span>
            </div>
            <p className="text-slate-700">
              {t(
                'استخدام كاشف تباع الشمس والكواشف الطبيعية (الملفوف الأحمر) ومقياس الرقم الهيدروجيني pH الرقمي لتصنيف المواد الكيميائية بدقة.',
                'Utilize litmus paper, natural red cabbage indicator, and digital pH meters to classify substances accurately.'
              )}
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-300 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-black text-emerald-950 text-sm">
                <span className="num-en font-black text-base">03.</span> {t('النتاج الوجداني والقيمي', 'Affective & Values')}
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-700 bg-white px-1.5 py-0.5 border border-slate-300">Affective</span>
            </div>
            <p className="text-slate-700">
              {t(
                'تقدير عظمة الخالق وإعجاز الاتزان الكيميائي في جسم الإنسان والكون استناداً للآية الكريمة: (وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ).',
                'Appreciate chemical equilibrium in biology connecting to the Quranic verse: (Everything with Him is by due measure).'
              )}
            </p>
          </div>

        </div>
      </section>

      {/* Detailed Stepper Phases */}
      <section className="bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase bg-emerald-100 px-2 py-0.5 border border-emerald-300">
              Execution Stepper
            </span>
            <h2 className="text-xl font-black text-slate-950">
              سير الحصة المبرمج تفصيلياً (التنفيذ خطوة بخطوة)
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          
          {/* Phase 1 */}
          <div className="border border-slate-300 p-5 space-y-2 bg-slate-50">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-slate-950 text-emerald-400 font-mono text-xs font-bold">
                00:00 - 02:00 (دقيقتان)
              </span>
              <span className="text-xs font-bold text-slate-500">المرحلة 1: التهيئة الحافزة وإثارة الدافعية (Engage)</span>
            </div>
            <h3 className="font-black text-sm text-slate-950">إثارة الفضول والتساؤل العلمي</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              عرض عينة من الليمون وعينة من الصابون، وسؤال الطالبات: ما السر الكيميائي وراء الطعم الحامضي لليمون والملمس الصابوني الزلق؟ وتوضيح خطورة تذوق المواد الكيميائية غير المعروفة في المختبر.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="border border-slate-300 p-5 space-y-2 bg-slate-50">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-slate-950 text-emerald-400 font-mono text-xs font-bold">
                02:00 - 05:00 (3 دقائق)
              </span>
              <span className="text-xs font-bold text-slate-500">المرحلة 2: استكشاف المفاهيم والكواشف (Explore & Explain)</span>
            </div>
            <h3 className="font-black text-sm text-slate-950">بناء مفهوم التأين وإنتاج أيونات H⁺ و OH⁻</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              شرح معادلة تأين الحمض في الماء: HCl → H⁺ + Cl⁻ ومعادلة تأين القاعدة: NaOH → Na⁺ + OH⁻. استعراض كاشف الملفوف الأحمر الطبيعي وكاشف تباع الشمس، ورصد تدرج تدريج الرقم الهيدروجيني pH من 0 إلى 14.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="border border-slate-300 p-5 space-y-2 bg-slate-50">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-slate-950 text-emerald-400 font-mono text-xs font-bold">
                05:00 - 08:00 (3 دقائق)
              </span>
              <span className="text-xs font-bold text-slate-500">المرحلة 3: التطبيق بالمختبر الافتراضي والمعايرة (Elaborate)</span>
            </div>
            <h3 className="font-black text-sm text-slate-950">المحاكاة التفاعلية وتفاعل التعادل</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              إشراك الطالبات في تجربة المعايرة الافتراضية عبر إضافة قطرات NaOH إلى كأس HCl مع كاشف الفينولفثالين حتى ظهور اللون الوردي الفاتح عند نقطة التعادل التام (pH = 7).
            </p>
          </div>

          {/* Phase 4 */}
          <div className="border border-slate-300 p-5 space-y-2 bg-slate-50">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-slate-950 text-emerald-400 font-mono text-xs font-bold">
                08:00 - 10:00 (دقيقتان)
              </span>
              <span className="text-xs font-bold text-slate-500">المرحلة 4: التقويم التكويني والختام القيمي (Evaluate)</span>
            </div>
            <h3 className="font-black text-sm text-slate-950">التحدي التشخيصي السريع وبطاقة الخروج</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              طرح سؤالين سريعين للتقويم التكويني، وربط دقة اتزان حموضة دم الإنسان (pH 7.35 - 7.45) بقدرة الخالق وعظمته، وتوجيه الطالبات للواجب البيتي الاستقصائي.
            </p>
          </div>

        </div>
      </section>

      {/* Safety Directive */}
      <div className="p-5 bg-amber-50 border-2 border-amber-400 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-black text-sm text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <span>إرشادات السلامة العامة في مختبر الكيمياء (كتاب كولينز ص 47):</span>
        </div>
        <p className="leading-relaxed">
          الحموض والقواعد الصناعية مثل HCl و NaOH مواد حارقة وكاوية ومسببة للتآكل الشديد؛ يُحظر قطعياً تذوق أو لمس أو استنشاق أبخرة أي مادة كيميائية في المختبر، مع الالتزام التام بارتداء المعطف المخبري، والقفازات، والنظارات الواقية.
        </p>
      </div>

    </div>
  );
}
