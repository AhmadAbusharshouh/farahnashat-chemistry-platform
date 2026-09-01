import Link from 'next/link';
import { 
  FlaskConical, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Compass, 
  GraduationCap, 
  Clock, 
  Layers,
  Award,
  Zap
} from 'lucide-react';
import { SUBSTANCES_DATA } from '@/lib/types';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Right Column: Teacher Bio & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>المقابلة والحصة النموذجية | الأربعاء 2/9/2026 - 8:00 صباحاً</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight">
                رؤية تعليمية حديثة في <br />
                <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-8">تدريس الكيمياء</span> بالتعلم النشط
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                مرحباً بكم في المنصة الرقمية التفاعلية للأستاذة <strong className="text-slate-900 font-bold">فرح نشأت</strong>، المرشحة لشاغر معلمة الكيمياء لدى <strong className="text-slate-900 font-bold">المدرسة الإسلامية الحديثة - إربد (حكما)</strong>. تم بناء هذه المنصة لإبراز الكفاءة التدريسية، استراتيجيات التعلم التفاعلي، والمختبر الافتراضي لدرس الحموض والقواعد (منهاج كولينز للصف التاسع).
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/lesson-plan"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm hover:shadow transition"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>استعراض خطة الحصة (10 دقائق)</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>

                <Link
                  href="/virtual-lab"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-2xs transition"
                >
                  <FlaskConical className="w-4 h-4 text-emerald-600" />
                  <span>دخول المختبر الافتراضي</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center font-bold text-xs">10د</div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-800">حصة نموذجية</div>
                    <div className="text-[11px] text-slate-500">مخطط زمني دقيق</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center font-bold text-xs">pH</div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-800">محاكي كيميائي</div>
                    <div className="text-[11px] text-slate-500">كواشف ومعايرة</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center font-bold text-xs">AI</div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-800">مساعد فوري</div>
                    <div className="text-[11px] text-slate-500">Cloudflare Workers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column: Quick Interactive Simulation Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h3 className="font-extrabold text-slate-900 text-sm">مختبر الكواشف السريع</h3>
                  </div>
                  <span className="text-[11px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">عينة تفاعلية</span>
                </div>

                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  اختر مادة من المنهاج لرؤية تفاعلها مع كاشف تباع الشمس ومستخلص الملفوف الطبيعي فورياً:
                </p>

                <div className="space-y-3">
                  {SUBSTANCES_DATA.slice(0, 3).map((sub) => (
                    <div 
                      key={sub.id} 
                      className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-emerald-50/40 transition flex items-center justify-between"
                    >
                      <div className="space-y-1 text-right">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">{sub.name}</span>
                          <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">{sub.formula}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{sub.typeName} • pH = <strong className="text-emerald-700">{sub.ph}</strong></p>
                      </div>

                      <span 
                        className="w-4 h-4 rounded-full border border-white shadow-xs" 
                        style={{ backgroundColor: sub.color }}
                        title={`لون الكاشف عند pH ${sub.ph}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">تجربة متكاملة تشمل المعايرة والمقياس الرقمي</span>
                  <Link 
                    href="/virtual-lab" 
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>فتح المختبر الكامل</span>
                    <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pillars of Modern Active Learning */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">فلسفة التدريس والتميز</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">أركان الحصة النموذجية واستراتيجيات التعلم النشط</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            تطبيق أحدث الاستراتيجيات التربوية المتوافقة مع معايير وزارة التربية والتعليم ومنهاج كولينز الدولي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">التهيئة الحافزة وإثارة الفضول</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ربط الكيمياء بالحياة اليومية من خلال ألغاز ومواقف واقعية (طعم الليمون الحامض vs ملمس الصابون الزلق) لإثارة دافعية الاستقصاء.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">التفكير الثنائي والمشاركة (Think-Pair-Share)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              تمكين الطالبات من صياغة الفرضيات العلمية حول أيونات H⁺ و OH⁻ ومناقشتها مع الزميلات لتعزيز مهارات الحوار العلمي.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">المختبر الافتراضي والاستقصاء</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              محاكاة آمنة تفاعلية لقياس الرقم الهيدروجيني pH وتفاعلات التعادل وتغير ألوان الكواشف الطبيعية والصناعية بدقة متناهية.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:border-emerald-300 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">التقويم التكويني والاتزان</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              تحديات واختبارات تفاعلية لحظية، مع ربط علم الكيمياء بقيم الاتزان الكوني والآية الكريمة: *(وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ)*.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Collins Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>منهاج كولينز - الصف التاسع الأساسي (ص 43 - 55)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-snug">
              تغطية علمية شاملة وممنهجة لوحدة الحموض والقواعد وتفاعلات التعادل
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تم إعداد الخطة التدريسية وفق أحدث مخرجات التعلم ونواتج الأداء المعتمدة في المناهج المطورة: تعريف الحموض والقواعد، تفسير أثر الأيونات، استخدام الكواشف الطبيعية والصناعية، مقياس الرقم الهيدروجيني وتطبيقات تفاعل التعادل في الحياة.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/curriculum-map"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
              >
                استعراض خريطة المفاهيم الكاملة
              </Link>
              <Link
                href="/quiz"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition"
              >
                بدء اختبار التقويم التكويني
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
