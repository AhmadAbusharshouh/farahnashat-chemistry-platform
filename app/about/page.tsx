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
  FlaskConical
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Teacher Profile Card - Sharp Architectural Style */}
      <section className="bg-white border-2 border-slate-900 p-8 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
            <div className="w-32 h-32 bg-slate-950 border-2 border-emerald-500 overflow-hidden relative flex items-center justify-center p-1 shadow-sm">
              <Image 
                src="/images/logo.png" 
                alt="Farah Nashat Chemistry Crest" 
                width={128} 
                height={128}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-950">أ. فرح نشأت</h1>
              <p className="text-xs text-emerald-800 font-bold mt-0.5">معلمة كيمياء وعلوم عامة متميزة</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>إربد - المملكة الأردنية الهاشمية</span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 text-right border-t md:border-t-0 md:border-r-2 border-slate-200 pt-6 md:pt-0 md:pr-8">
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-950 text-xs font-mono font-bold border border-emerald-300">
              ملف الترشح الوظيفي | المدرسة الإسلامية الحديثة (حكما)
            </div>

            <h2 className="text-2xl font-black text-slate-950 leading-snug">
              شغف علمي وتربوي راسخ في تبسيط العلوم وصناعة أجيال مفكرة
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              معلمة كيمياء تمتلك رؤية تربوية حديثة ترتكز على التعلم النشط، ربط المفاهيم الكيميائية النظرية بالتجارب المعملية والحياة اليومية، وغرس القيم والأخلاق الإسلامية السامية في نفوس الطالبات من خلال تأمل إعجاز الخلق والاتزان الطبيعي.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-800 bg-slate-100 px-3 py-1.5 border border-slate-300">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">بكالوريوس كيمياء</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 bg-slate-100 px-3 py-1.5 border border-slate-300">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">خبير في منهاج كولينز المطور</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 bg-slate-100 px-3 py-1.5 border border-slate-300">
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">المختبرات الافتراضية والنمذجة ثلاثية الأبعاد (3D)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Qualifications & Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Credentials */}
        <div className="bg-white border-2 border-slate-900 p-6 space-y-4">
          <div className="flex items-center gap-2.5 border-b-2 border-slate-900 pb-3">
            <div className="w-8 h-8 bg-slate-950 text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-slate-950">المؤهلات والدورات التدريبية</h3>
          </div>

          <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <span><strong>المؤهل الأكاديمي:</strong> درجة البكالوريوس في تخصص الكيمياء مع الإلمام التام بفروع الكيمياء العامة، التحليلية، والعضوية.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <span><strong>استراتيجيات التدريس الحديثة:</strong> تدريب متخصص في التعلم القائم على الاستقصاء (Inquiry-Based Learning)، التعلم التعاوني، وخرائط المفاهيم.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <span><strong>إدارة وسلامة المختبرات المدرسية:</strong> دورات مكثفة في معايير الأمن والسلامة، التعامل مع المواد الكيميائية الخطرة وإجراءات الطوارئ.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <span><strong>دمج التكنولوجيا بالتعليم:</strong> توظيف المحاكاة ثلاثية الأبعاد، EdTech، وبوابات التعلم الإلكتروني لدعم بيئة الصف.</span>
            </li>
          </ul>
        </div>

        {/* Philosophy */}
        <div className="bg-white border-2 border-slate-900 p-6 space-y-4">
          <div className="flex items-center gap-2.5 border-b-2 border-slate-900 pb-3">
            <div className="w-8 h-8 bg-emerald-700 text-white flex items-center justify-center font-bold">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-slate-950">الرؤية والقيم في بيئة المدرسة الإسلامية</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
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
      <div className="bg-slate-950 text-white border-2 border-emerald-600 p-6 text-center space-y-4">
        <h3 className="text-sm font-black">هل تود التواصل المباشر أو إرسال تغذية راجعة؟</h3>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
          <Link
            href="/whatsapp-connect"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white transition border border-emerald-500"
          >
            بوابة التواصل عبر واتساب
          </Link>
          <Link
            href="/lesson-plan"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition"
          >
            مشاهدة خطة الحصة النموذجية
          </Link>
        </div>
      </div>

    </div>
  );
}
