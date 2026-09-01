import { 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  AlertTriangle, 
  FlaskConical,
  Target,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function LessonPlanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              خطة الحصة النموذجية المعيارية
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              تحضير درس "الحموض والقواعد والكواشف" (10 دقائق)
            </h1>
          </div>
          <div className="text-left bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs">
            <div className="text-slate-500 font-medium">الزمن الكلي للحصة</div>
            <div className="text-emerald-700 font-black text-base flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>10 دقائق نموذجية</span>
            </div>
          </div>
        </div>

        {/* Lesson Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5 font-medium">المبحث والمرحلة</span>
            <span className="font-bold text-slate-800">الكيمياء - الصف التاسع الأساسي</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5 font-medium">مرجع المنهاج</span>
            <span className="font-bold text-slate-800">كتاب كولينز (الصفحات 43 - 55)</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5 font-medium">المدرسة المستهدفة</span>
            <span className="font-bold text-slate-800">الإسلامية الحديثة - إربد (حكما)</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5 font-medium">المعلمة المنفذة</span>
            <span className="font-bold text-emerald-800">أ. فرح نشأت</span>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">نتاجات ومخرجات التعلم المستهدفة (Learning Outcomes)</h2>
            <p className="text-xs text-slate-500">يتوقع من الطالبة في نهاية الحصة المصغرة (10 دقائق) أن تكون قادرة على تحقيق التالي:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="font-extrabold text-emerald-700 block">01. النتاج المعرفي (Cognitive)</span>
            <p className="text-slate-600">
              التمييز بين الحموض والقواعد من حيث الخصائص الكيميائية، نوع الأيونات الناتجة في المحلول المائي (H⁺ مقابل OH⁻)، واستخدامات كل منهما.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="font-extrabold text-emerald-700 block">02. النتاج المهاري والاستقصائي (Skill)</span>
            <p className="text-slate-600">
              استخدام كاشف تباع الشمس والكواشف الطبيعية (الملفوف الأحمر) ومقياس الرقم الهيدروجيني pH الرقمي لتصنيف المواد الكيميائية بدقة.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="font-extrabold text-emerald-700 block">03. النتاج القيمي والوجداني (Affective)</span>
            <p className="text-slate-600">
              تقدير إعجاز الخالق في الاتزان الكيميائي داخل جسم الإنسان والبيئة، والالتزام بإجراءات السلامة العامة الصارمة في المختبر.
            </p>
          </div>
        </div>
      </section>

      {/* 10-Minute Timeline Breakdown */}
      <section className="space-y-6">
        <div className="text-right space-y-1">
          <h2 className="text-2xl font-black text-slate-900">التوزيع الزمني الدقيق لأركان الحصة (10 دقائق)</h2>
          <p className="text-xs text-slate-500">خطة تنفيذية مضبوطة بالثواني تضمن إشراك اللجنة وتحقيق التعلم النشط بالكامل.</p>
        </div>

        <div className="space-y-4">
          {/* Phase 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative pl-6 border-r-4 border-r-emerald-500">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black">
                  الدقيقة 00:00 - 02:00
                </span>
                <h3 className="font-bold text-slate-900 text-base">التهيئة الحافزة والربط العقدي الحياتي</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">استراتيجية: إثارة الفضول والاستمطار الفكري</span>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                <strong>إجراءات المعلمة:</strong> عرض لغز بصري سريع: لماذا نشعر بالحموضة عند تذوق الليمون بينما يمتلك الصابون ملمساً زلقاً وطعماً مراً؟
              </p>
              <p>
                <strong>الربط القيمي:</strong> الاستشهاد بالآية الكريمة: <em>(وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ)</em> [الرعد: 8] لبيان حكمة الخالق في ضبط حموضة الدم والمعدة بدقة متناهية.
              </p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative pl-6 border-r-4 border-r-emerald-600">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black">
                  الدقيقة 02:00 - 05:00
                </span>
                <h3 className="font-bold text-slate-900 text-base">بناء المفاهيم الكيميائية واستعراض الكواشف</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">استراتيجية: فكر - زاوج - شارك (Think-Pair-Share)</span>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                <strong>المحتوى العلمي:</strong> توضيح مفهوم تأين الحموض لإنتاج أيون الهيدروجين (H⁺ / H₃O⁺) وتأين القواعد لإنتاج أيون الهيدروكسيد (OH⁻).
              </p>
              <p>
                <strong>النشاط التفاعلي:</strong> عرض كاشف الملفوف الأحمر الطبيعي وكاشف تباع الشمس، وطرح تساؤل على الحضور لتوقع اللون الناتج عند إضافة الخل مقابل البيكنج صودا.
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative pl-6 border-r-4 border-r-emerald-700">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black">
                  الدقيقة 05:00 - 08:00
                </span>
                <h3 className="font-bold text-slate-900 text-base">المختبر الافتراضي ومحاكاة المعايرة الرقمية</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">استراتيجية: التعلم بالاستقصاء والنمذجة الرقمية</span>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                <strong>التطبيق العملي:</strong> فتح صفحة المختبر الافتراضي من شاشة العرض، غمس قطب مقياس pH في محاليل مجهولة وتدريج الرقم الهيدروجيني من 0 إلى 14.
              </p>
              <p>
                <strong>تفاعل التعادل:</strong> إجراء معايرة سريعة بإضافة قطرات من هيدروكسيد الصوديوم إلى حمض الهيدروكلوريك حتى نقطة التكافؤ (اللون الوردي الخفيف مع كاشف الفينولفثالين).
              </p>
            </div>
          </div>

          {/* Phase 4 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative pl-6 border-r-4 border-r-emerald-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black">
                  الدقيقة 08:00 - 10:00
                </span>
                <h3 className="font-bold text-slate-900 text-base">التقويم التكويني والختام المهاري</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">استراتيجية: بطاقات الخروج والتغذية الراجعة اللحظية</span>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p>
                <strong>التقييم السريع:</strong> إطلاق اختبار التقويم التكويني الرقمي (3 أسئلة فورية) للتأكد من رسوخ المفاهيم لدى المتعلمين.
              </p>
              <p>
                <strong>الختام والواجب الاستقصائي:</strong> تكليف الطالبات بتجربة استخلاص كاشف الشاي المنزلي مع الليمون ومسحوق الغسيل وتوثيق الملاحظات في المنصة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Lab Rules Box */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 flex items-start gap-4 text-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-amber-900">إرشادات السلامة العامة في المختبر الكيميائي</h4>
          <p className="text-amber-800 leading-relaxed">
            يُحظر قطعياً تذوق أو لمس الحموض والقواعد الصناعية المركزة (مثل HCl و NaOH) نظراً لخاصيتها الكاوية الحارقة للأنسجة، مع وجوب ارتداء معطف المختبر، القفازات الواقية، ونظارات الحماية أثناء التجارب الفعلية.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center pt-4">
        <Link
          href="/virtual-lab"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
        >
          <FlaskConical className="w-4 h-4" />
          <span>الانتقال لتطبيق التجربة في المختبر الافتراضي الآن</span>
        </Link>
      </div>

    </div>
  );
}
