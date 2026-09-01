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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Card - Clean Light Theme */}
      <section className="bg-white border border-slate-200 p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
            <div className="w-28 h-28 bg-emerald-50 border border-emerald-300 flex items-center justify-center p-2 shadow-2xs">
              <Image 
                src="/images/logo-icon.png" 
                alt="Farah Nashat Chemistry Logo" 
                width={100} 
                height={100}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">أ. فرح نشأت</h1>
              <p className="text-xs text-emerald-800 font-bold mt-0.5">معلمة كيمياء وعلوم عامة متميزة</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>المملكة الأردنية الهاشمية</span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-3 text-right border-t md:border-t-0 md:border-r border-slate-100 pt-6 md:pt-0 md:pr-6">
            <h2 className="text-xl font-black text-slate-900 leading-snug">
              شغف علمي وتربوي راسخ في تبسيط العلوم وصناعة أجيال مفكرة
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              معلمة كيمياء تمتلك رؤية تربوية حديثة ترتكز على التعلم النشط، ربط المفاهيم الكيميائية النظرية بالتجارب المعملية والحياة اليومية، وغرس القيم والأخلاق السامية في نفوس الطلبة من خلال تأمل إعجاز الخلق والاتزان الطبيعي.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-800 bg-slate-50 px-3 py-1 border border-slate-200">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">بكالوريوس كيمياء</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800 bg-slate-50 px-3 py-1 border border-slate-200">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">المناهج المطورة والتعلم النشط</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-800 bg-slate-50 px-3 py-1 border border-slate-200">
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">النمذجة ثلاثية الأبعاد (3D)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Qualifications */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Award className="w-4 h-4 text-emerald-700" />
            </div>
            <h3 className="text-base font-black text-slate-900">المؤهلات والدورات التدريبية</h3>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
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
              <span><strong>إدارة وسلامة المختبرات المدرسية:</strong> دورات مكثفة في معايير الأمن والسلامة، التعامل مع المواد الكيميائية وإجراءات الطوارئ.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <span><strong>دمج التكنولوجيا بالتعليم:</strong> توظيف المحاكاة ثلاثية الأبعاد (3D) وبوابات التعلم الإلكتروني لدعم بيئة الصف.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <HeartHandshake className="w-4 h-4 text-emerald-700" />
            </div>
            <h3 className="text-base font-black text-slate-900">الرؤية والقيم التربوية</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              ترتكز رؤيتي على بناء الشخصية الطلابية المتوازنة التي تجمع بين التفوق الأكاديمي والتحصيل العلمي المتقدم من جهة، والأخلاق الفاضلة والوعي المجتمعي والبيئي من جهة أخرى.
            </p>
            <p>
              أعتمد على إبراز إسهامات العلماء المسلمين الأوائل كـ <em>جابر بن حيان</em> وأبو بكر الرازي في تأسيس علم الكيمياء التجريبي، لتعزيز الاعتزاز بالهوية الحضارية وتنمية الفكر العلمي والبحثي لدى الطلبة.
            </p>
          </div>
        </div>

      </section>

      {/* Action Footer */}
      <div className="bg-white border border-slate-200 p-6 text-center space-y-3 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900">هل تود التواصل المباشر أو إرسال استفسار؟</h3>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
          <Link
            href="/whatsapp-connect"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white transition border border-emerald-800"
          >
            بوابة التواصل عبر واتساب
          </Link>
          <Link
            href="/virtual-lab"
            className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition"
          >
            دخول المختبر الافتراضي (3D)
          </Link>
        </div>
      </div>

    </div>
  );
}
