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
  MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Teacher Profile Card */}
      <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-700 flex items-center justify-center text-white text-4xl font-black shadow-md border-4 border-white">
              ف.ن
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">أ. فرح نشأت</h1>
              <p className="text-xs text-emerald-700 font-bold mt-0.5">معلمة كيمياء وعلوم عامة متميزة</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>إربد - المملكة الأردنية الهاشمية</span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 text-right border-t md:border-t-0 md:border-r border-slate-100 pt-6 md:pt-0 md:pr-8">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200">
              ملف الترشح الوظيفي | المدرسة الإسلامية الحديثة (حكما)
            </div>

            <h2 className="text-2xl font-black text-slate-900 leading-snug">
              شغف علمي وتربوي راسخ في تبسيط العلوم وصناعة أجيال مفكرة
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              معلمة كيمياء تمتلك رؤية تربوية حديثة ترتكز على التعلم النشط، ربط المفاهيم الكيميائية النظرية بالتجارب المعملية والحياة اليومية، وغرس القيم والأخلاق الإسلامية السامية في نفوس الطلبة من خلال تأمل إعجاز الخلق والاتزان الطبيعي.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">بكالوريوس كيمياء</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">خبير في منهاج كولينز المطور</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">دمج الذكاء الاصطناعي والمختبرات الافتراضية</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Qualifications & Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Academic & Professional Credentials */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">المؤهلات والدورات التدريبية</h3>
          </div>

          <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>المؤهل الأكاديمي:</strong> درجة البكالوريوس في تخصص الكيمياء مع الإلمام التام بفروع الكيمياء العامة، التحليلية، والعضوية.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>استراتيجيات التدريس الحديثة:</strong> تدريب متخصص في التعلم القائم على الاستقصاء (Inquiry-Based Learning)، التعلم التعاوني، وخرائط المفاهيم.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>إدارة وسلامة المختبرات المدرسية:</strong> دورات مكثفة في معايير الأمن والسلامة، التعامل مع المواد الكيميائية الخطرة وإجراءات الطوارئ.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>دمج التكنولوجيا بالتعليم:</strong> توظيف أدوات المحاكاة الرقمية، EdTech، وبوابات التعلم الإلكتروني لدعم بيئة الصف.</span>
            </li>
          </ul>
        </div>

        {/* Educational Philosophy & Values */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">الرؤية والقيم في بيئة المدرسة الإسلامية</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              تتوافق رؤيتي التدريسية قلباً وقالباً مع رسالة <strong>جمعية المركز الإسلامي الخيرية</strong> في بناء الشخصية الإسلامية المتوازنة التي تجمع بين التفوق الأكاديمي والتحصيل العلمي المتقدم من جهة، والأخلاق الفاضلة والوعي المجتمعي من جهة أخرى.
            </p>
            <p>
              أعتمد على إبراز إسهامات العلماء المسلمين الأوائل كـ <em>جابر بن حيان</em> وأبو بكر الرازي في تأسيس علم الكيمياء التجريبي، لتعزيز الاعتزاز بالهوية الإسلامية والحضارية لدى طالباتنا.
            </p>
          </div>
        </div>

      </section>

      {/* Action Footer */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
        <h3 className="text-sm font-bold text-slate-900">هل تود التواصل المباشر أو إرسال تغذية راجعة؟</h3>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
          <Link
            href="/whatsapp-connect"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition"
          >
            بوابة التواصل عبر واتساب
          </Link>
          <Link
            href="/lesson-plan"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition"
          >
            مشاهدة خطة الحصة النموذجية
          </Link>
        </div>
      </div>

    </div>
  );
}
