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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner - Clean Light Style */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 space-y-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1 max-w-2xl">
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 border border-emerald-200">
              {t('نموذج خطة درس تدريسية معيارية', 'Standard Chemistry Lesson Blueprint')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('تحضير درس "الحموض والقواعد والكواشف" (', 'Lesson Plan: "Acids, Bases & Indicators" (')}
              <span className="num-en text-emerald-700">10</span> {t('دقائق)', 'Minutes)')}
            </h1>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 text-xs shrink-0">
            <div className="text-slate-500 font-mono text-[11px]">{t('الزمن الكلي', 'Duration')}</div>
            <div className="text-emerald-800 font-mono font-black text-sm flex items-center gap-1.5 pt-0.5">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span><span className="num-en text-base">10</span> {t('دقائق نموذجية', 'Minutes')}</span>
            </div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block mb-0.5 font-medium">{t('المبحث والمرحلة', 'Subject & Grade')}</span>
            <span className="font-bold text-slate-900">{t('الكيمياء - الصف التاسع الأساسي', 'Chemistry - Grade 9')}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block mb-0.5 font-medium">{t('مرجع المنهاج', 'Curriculum Ref')}</span>
            <span className="font-bold text-slate-900">{t('كتاب كولينز (الصفحات ', 'Collins (pp. ')}<span className="num-en font-mono">43 - 55</span>)</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block mb-0.5 font-medium">{t('المعلمة المنفذة', 'Teacher')}</span>
            <span className="font-bold text-emerald-800">{t('أ. فرح نشأت (بكالوريوس كيمياء)', 'Farah Nashat (B.Sc.)')}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block mb-0.5 font-medium">{t('استراتيجية التدريس', 'Strategy')}</span>
            <span className="font-bold text-slate-900">{t('التعلم النشط ونموذج 5Es', 'Active Learning (5Es)')}</span>
          </div>
        </div>
      </div>

      {/* Classroom Setup Strip */}
      <div className="border border-slate-200 bg-white grid grid-cols-1 md:grid-cols-12 gap-0 shadow-2xs">
        <div className="md:col-span-5 relative aspect-[16/10] md:aspect-auto bg-slate-50 overflow-hidden min-h-[220px]">
          <Image
            src="/images/lab-workstation.png"
            alt="Chemistry Laboratory Workstation"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="md:col-span-7 p-6 space-y-3 text-right flex flex-col justify-center">
          <h2 className="text-base font-black text-slate-900">
            حصة استقصائية تفاعلية تحفز التفكير العلمي وبناء المفاهيم
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            تمت هندسة هذه الحصة لتجمع بين إثارة الفضول العلمي، وبناء المفاهيم الكيميائية بدقة، وإجراء التجارب المعملية عبر المختبر الافتراضي، ثم التحقق الفوري من تحقق النتاجات التعليمية.
          </p>
          <div className="pt-1">
            <Link
              href="/virtual-lab"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold border border-emerald-800 transition"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>فتح مجسمات 3D المرتبطة بالدرس</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <section className="bg-white border border-slate-200 p-6 space-y-5 shadow-2xs">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Target className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">
              {t('نتاجات ومخرجات التعلم المستهدفة', 'Target Learning Outcomes')}
            </h2>
            <p className="text-xs text-slate-500">
              {t(
                'يتوقع من الطالب في نهاية الحصة المصغرة أن يكون قادراً على تحقيق التالي:',
                'By the end of the session, students are expected to demonstrate:'
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
          <div className="p-4 bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-emerald-900 text-sm">
              <span className="num-en font-black">01.</span> {t('النتاج المعرفي', 'Cognitive')}
            </div>
            <p className="text-slate-600">
              {t(
                'التمييز بين الحموض والقواعد من حيث الخصائص الكيميائية، ونوع الأيونات الناتجة في المحلول المائي (H⁺ مقابل OH⁻).',
                'Differentiate between acids and bases identifying H⁺ vs OH⁻ aqueous ionization.'
              )}
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-emerald-900 text-sm">
              <span className="num-en font-black">02.</span> {t('النتاج المهاري', 'Skill & Inquiry')}
            </div>
            <p className="text-slate-600">
              {t(
                'استخدام كاشف تباع الشمس والكواشف الطبيعية (الملفوف الأحمر) ومقياس الرقم الهيدروجيني pH لتصنيف المواد بدقة.',
                'Utilize litmus paper, natural indicators, and digital pH meters to classify substances.'
              )}
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-emerald-900 text-sm">
              <span className="num-en font-black">03.</span> {t('النتاج القيمي', 'Affective & Values')}
            </div>
            <p className="text-slate-600">
              {t(
                'تقدير عظمة الخالق وإعجاز الاتزان الكيميائي في جسم الإنسان والكون استناداً للآية الكريمة: (وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ).',
                'Appreciate chemical equilibrium in biology connecting to the divine order.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Stepper Phases */}
      <section className="bg-white border border-slate-200 p-6 space-y-5 shadow-2xs">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-black text-slate-900">
            سير الحصة المبرمج تفصيلياً (التنفيذ خطوة بخطوة)
          </h2>
        </div>

        <div className="space-y-3">
          <div className="border border-slate-200 p-4 space-y-1.5 bg-slate-50">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 bg-emerald-700 text-white font-mono font-bold text-[11px]">
                00:00 - 02:00 (دقيقتان)
              </span>
              <span className="font-bold text-slate-500">المرحلة 1: التهيئة الحافزة وإثارة الدافعية (Engage)</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900">إثارة الفضول والتساؤل العلمي</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              عرض عينة من الليمون وعينة من الصابون، وسؤال الطلاب: ما السر الكيميائي وراء الطعم الحامضي لليمون والملمس الصابوني الزلق؟ وتوضيح خطورة تذوق المواد الكيميائية في المختبر.
            </p>
          </div>

          <div className="border border-slate-200 p-4 space-y-1.5 bg-slate-50">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 bg-emerald-700 text-white font-mono font-bold text-[11px]">
                02:00 - 05:00 (3 دقائق)
              </span>
              <span className="font-bold text-slate-500">المرحلة 2: استكشاف المفاهيم والكواشف (Explore & Explain)</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900">بناء مفهوم التأين وإنتاج أيونات H⁺ و OH⁻</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              شرح معادلة تأين الحمض في الماء: HCl → H⁺ + Cl⁻ ومعادلة تأين القاعدة: NaOH → Na⁺ + OH⁻. استعراض كاشف الملفوف الأحمر الطبيعي وكاشف تباع الشمس، ورصد تدرج تدريج الرقم الهيدروجيني pH من 0 إلى 14.
            </p>
          </div>

          <div className="border border-slate-200 p-4 space-y-1.5 bg-slate-50">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 bg-emerald-700 text-white font-mono font-bold text-[11px]">
                05:00 - 08:00 (3 دقائق)
              </span>
              <span className="font-bold text-slate-500">المرحلة 3: التطبيق بالمختبر الافتراضي والمعايرة (Elaborate)</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900">المحاكاة التفاعلية وتفاعل التعادل</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              إشراك الطلاب في تجربة المعايرة الافتراضية عبر إضافة قطرات NaOH إلى كأس HCl مع كاشف الفينولفثالين حتى ظهور اللون الوردي الفاتح عند نقطة التعادل التام (pH = 7).
            </p>
          </div>

          <div className="border border-slate-200 p-4 space-y-1.5 bg-slate-50">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 bg-emerald-700 text-white font-mono font-bold text-[11px]">
                08:00 - 10:00 (دقيقتان)
              </span>
              <span className="font-bold text-slate-500">المرحلة 4: التقويم التكويني والختام (Evaluate)</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900">التحدي التشخيصي السريع وبطاقة الخروج</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              طرح سؤالين سريعين للتقويم التكويني، وربط دقة اتزان حموضة دم الإنسان (pH 7.35 - 7.45) بقدرة الخالق وعظمته، وتوجيه الطلاب للواجب البيتي الاستقصائي.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Directive */}
      <div className="p-4 bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>إرشادات السلامة العامة في مختبر الكيمياء:</span>
        </div>
        <p className="leading-relaxed">
          الحموض والقواعد الصناعية مثل HCl و NaOH مواد حارقة وكاوية ومسببة للتآكل؛ يُحظر قطعياً تذوق أو لمس أو استنشاق أبخرة أي مادة كيميائية في المختبر، مع الالتزام بارتداء المعطف المخبري، والقفازات، والنظارات الواقية.
        </p>
      </div>

    </div>
  );
}
