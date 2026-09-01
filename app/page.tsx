'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  HelpCircle,
  Zap,
  Lightbulb,
  Flame,
  Sprout,
  Send,
  User,
  Bot,
  Droplets,
  ArrowUpRight,
  ShieldCheck,
  HeartHandshake,
  MessageSquare,
  FileText,
  Boxes,
  Eye
} from 'lucide-react';
import { SUBSTANCES_DATA, ChemicalSubstance } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import { Molecule3DViewer } from '@/components/Molecule3DViewer';
import { Ionization3DChamber } from '@/components/Ionization3DChamber';

export default function HomePage() {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Mini Virtual Lab State on Homepage
  const [selectedSubstance, setSelectedSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[1]); // HCl default

  // Live Mini Chat Assistant State on Homepage
  const [homeChatInput, setHomeChatInput] = useState('');
  const [homeChatMessages, setHomeChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: 'أهلاً بك! أنا المساعد التعليمي لكيمياء الصف التاسع للأستاذة فرح نشأت. يمكنك طرح أي سؤال علمي هنا فورياً حول الحموض، القواعد، الكواشف، أو تفاصيل الحصة النموذجية.'
    }
  ]);
  const [homeChatLoading, setHomeChatLoading] = useState(false);

  const handleHomeChatSend = async (customPrompt?: string) => {
    const query = (customPrompt || homeChatInput).trim();
    if (!query || homeChatLoading) return;

    setHomeChatMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setHomeChatInput('');
    setHomeChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      setHomeChatMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: data.reply || 'تم استلام السؤال ومعالجة المفاهيم العلمية.' }
      ]);
    } catch (err) {
      setHomeChatMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: 'تتأين الحموض في الماء منتجة أيونات H⁺ بينما تطلق القواعد أيونات OH⁻، ومقياس pH يعبر عن تركيزها بدقة.' }
      ]);
    } finally {
      setHomeChatLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO MASTER SECTION - SHARP ARCHITECTURAL AESTHETIC */}
      <section className="relative overflow-hidden bg-white border-b-2 border-slate-900 pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Top Interview Logistics Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-400 text-emerald-950 text-xs font-bold">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {t(
                  'المقابلة والحصة النموذجية | الأربعاء 02 / 09 / 2026 - الساعة 08:00 صباحاً',
                  'Interview & Demo Lesson | Wednesday 02/09/2026 - 08:00 AM'
                )}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 border border-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t('المدرسة الإسلامية الحديثة - إربد (حكما)', 'Modern Islamic School - Irbid (Hikma)')}</span>
            </div>
          </div>

          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Right Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-block bg-slate-950 text-emerald-400 text-[11px] font-mono font-bold px-2.5 py-1 tracking-wider uppercase">
                  {t('ملف الترشح الوظيفي والحصة النموذجية', 'Official Teaching Candidate Dossier')}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-[1.15] tracking-tight">
                  {t('المعلمة فرح نشأت', 'Teacher Farah Nashat')} <br />
                  <span className="text-emerald-700 underline decoration-emerald-400 underline-offset-8">
                    {t('كيمياء الصف التاسع الأساسي', 'Grade 9 Chemistry Specialist')}
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-normal">
                {t(
                  'أهلاً وسهلاً بلجنة المقابلة الكريمة وإدارة المدرسة الإسلامية الحديثة. يضم هذا الموقع تحضيري الكامل للحصة النموذجية (10 دقائق) لدرس "الحموض والقواعد والكواشف" من كتاب كولينز (ص 43 - 55)، شاملاً خطة الدرس المبرمجة بالثواني، المختبر الافتراضي التفاعلي ثلاثي الأبعاد (3D)، وخارطة المنهاج، والتقويم التكويني.',
                  'Welcome to the official teaching dossier of Ms. Farah Nashat for the 10-minute demo lesson (Collins Grade 9 Chemistry, pp. 43-55) at Modern Islamic School - Irbid (Hikma), featuring a timed lesson plan, interactive 3D virtual laboratory, curriculum maps, and formative assessments.'
                )}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/lesson-plan"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-900 shadow-sm transition"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t('خطة الحصة النموذجية (10 دقائق)', 'View 10-Minute Lesson Plan')}</span>
                  <Arrow className="w-4 h-4" />
                </Link>

                <Link
                  href="/virtual-lab"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-emerald-400 font-bold text-xs border border-slate-900 shadow-sm transition"
                >
                  <FlaskConical className="w-4 h-4 text-emerald-400" />
                  <span>{t('المختبر الافتراضي ومحاكاة 3D', '3D Virtual Chemistry Lab')}</span>
                </Link>
              </div>

              {/* Quick Highlights Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-200 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-300">
                  <div className="font-bold text-slate-500">{t('الزمن الكلي', 'Duration')}</div>
                  <div className="font-black text-emerald-800 text-sm mt-0.5"><span className="num-en">10</span> {t('دقائق', 'Mins')}</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-300">
                  <div className="font-bold text-slate-500">{t('مرجع الكتاب', 'Curriculum')}</div>
                  <div className="font-black text-slate-900 text-sm mt-0.5">{t('كولينز ص', 'pp.')} <span className="num-en">43-55</span></div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-300">
                  <div className="font-bold text-slate-500">{t('محطات المختبر', 'Lab Stations')}</div>
                  <div className="font-black text-emerald-800 text-sm mt-0.5"><span className="num-en">6</span> {t('محطات', 'Stations')}</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-300">
                  <div className="font-bold text-slate-500">{t('المؤهل', 'Degree')}</div>
                  <div className="font-black text-slate-900 text-sm mt-0.5">{t('بكالوريوس كيمياء', 'B.Sc. Chem')}</div>
                </div>
              </div>
            </div>

            {/* Right/Left Image & Live Lab Card */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Generated Laboratory Hero Visual */}
              <div className="border-2 border-slate-900 overflow-hidden relative group aspect-[16/10] bg-slate-900">
                <Image
                  src="/images/hero-chemistry-lab.png"
                  alt="Farah Nashat Chemistry Lab Setup"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-slate-950/90 text-white p-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-emerald-400" />
                    <span>تجارب درس الحموض والقواعد والكواشف</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 border border-emerald-800">
                    كولينز ص 43 - 55
                  </span>
                </div>
              </div>

              {/* Substance pH Probe Tester */}
              <div className="bg-slate-50 border border-slate-300 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold text-slate-900">فحص المواد المباشر:</span>
                  <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 border border-emerald-300">
                    pH = {selectedSubstance.ph.toFixed(1)}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1 text-xs">
                  {SUBSTANCES_DATA.slice(0, 4).map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubstance(sub)}
                      className={`p-1.5 border text-center font-bold text-[11px] transition ${
                        selectedSubstance.id === sub.id 
                          ? 'bg-slate-950 text-emerald-300 border-slate-950' 
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {sub.name.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. 3D INTERACTIVE MOLECULE & IONIZATION SHOWCASE (PHASE 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-emerald-100 text-emerald-900 font-mono text-xs font-bold border border-emerald-300">
              <Boxes className="w-3.5 h-3.5" />
              <span>Phase 2: 3D Visual Learning Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              المجسمات الجزيئية ثلاثية الأبعاد ومحاكاة حركة الأيونات (3D)
            </h2>
          </div>
          <Link
            href="/virtual-lab"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-950 text-emerald-400 font-bold text-xs border border-slate-900 hover:bg-slate-900 transition"
          >
            <span>دخول المختبر ثلاثي الأبعاد الكامل</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3D Visualizers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 3D Component 1: Molecule Viewer */}
          <div className="border-2 border-slate-900 bg-slate-950">
            <div className="p-3 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-emerald-400" />
                <span>نمذجة الجزيئات ثلاثية الأبعاد (H₃O⁺, OH⁻, HCl, CH₃COOH, NH₃)</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">Three.js WebGL</span>
            </div>
            <Molecule3DViewer />
          </div>

          {/* 3D Component 2: Ionization Chamber */}
          <div className="border-2 border-slate-900 bg-slate-950">
            <div className="p-3 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>محاكاة التأين والموصلية وإضاءة المصباح 3D</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">Ion Chamber</span>
            </div>
            <Ionization3DChamber />
          </div>

        </div>
      </section>

      {/* 3. PORTAL HUB CARDS - ALL PAGES ACCESSIBLE DIRECTLY (SHARP DESIGN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-emerald-900 uppercase tracking-widest bg-emerald-100 px-3 py-1 border border-emerald-300">
            {t('بوابات الملف التعليمي', 'Portfolio Navigation Hub')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            {t('أقسام ومحتويات الملف التحضيري للمقابلة', 'Explore All Dossier Sections')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t(
              'انتقل مباشرة إلى أي قسم من أقسام الحصة والمنهاج والمختبر والتقويم بنقرة واحدة:',
              'Access any section of the demo lesson, curriculum map, virtual lab, and assessment directly:'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Lesson Plan */}
          <Link
            href="/lesson-plan"
            className="group bg-white border-2 border-slate-900 hover:border-emerald-600 p-6 shadow-xs transition-all flex flex-col justify-between space-y-4 relative"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-slate-950 text-emerald-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 border border-slate-300">
                  <span className="num-en">10</span> MINS
                </span>
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('خطة الحصة النموذجية المعيارية', '10-Minute Demo Lesson Blueprint')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'توزيع زمني دقيق بالثواني (0-2 تهيئة، 2-5 مفاهيم، 5-8 مختبر واستقصاء، 8-10 تقويم)، متوافقة مع نموذج 5Es والتعلم النشط.',
                  'Minute-by-minute execution plan calibrated for the 10-minute demo lesson with active learning strategies.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-200">
              <span>{t('عرض خطة الدرس التفصيلية', 'View Lesson Blueprint')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Virtual Lab */}
          <Link
            href="/virtual-lab"
            className="group bg-white border-2 border-slate-900 hover:border-emerald-600 p-6 shadow-xs transition-all flex flex-col justify-between space-y-4 relative"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-emerald-700 text-white flex items-center justify-center font-bold">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-950 bg-emerald-100 px-2.5 py-0.5 border border-emerald-300">
                  <span className="num-en">6</span> STATIONS
                </span>
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('مختبر الكيمياء الافتراضي (3D)', 'Virtual Chemistry Lab (3D)')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'محاكاة رقمية: مقياس pH، إضاءة المصباح والموصلية 3D، تفاعل الفلزات مع Pop Test، محطة الكواشف الخمسة، ومعالجة التربة.',
                  'Interactive laboratory: digital pH probe, 3D conductivity lamp, metal reactions with Pop Test, 5 indicators, and soil neutralization.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-200">
              <span>{t('دخول المختبر الافتراضي', 'Open Virtual Lab')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Curriculum Map */}
          <Link
            href="/curriculum-map"
            className="group bg-white border-2 border-slate-900 hover:border-emerald-600 p-6 shadow-xs transition-all flex flex-col justify-between space-y-4 relative"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-slate-950 text-emerald-400 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 border border-slate-300">
                  pp. <span className="num-en">43 - 55</span>
                </span>
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('خارطة منهاج كولينز وبنك أسئلة "أتحقق"', 'Collins Grade 9 Concept Map & Checkpoints')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'تفكيك شامل لـ 5 محاور دراسية مع كافة المعادلات الكيميائية، الربط بالصناعة والرياضة والزراعة، والحلول النموذجية لكافة أسئلة أتحقق.',
                  'Breakdown of all 5 Collins Grade 9 units with balanced ionic equations and complete solutions to textbook checkpoints.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-200">
              <span>{t('استعراض خارطة المنهاج', 'Explore Concept Map')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 4: Quiz */}
          <Link
            href="/quiz"
            className="group bg-white border-2 border-slate-900 hover:border-emerald-600 p-6 shadow-xs transition-all flex flex-col justify-between space-y-4 relative"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-amber-600 text-white flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-950 bg-amber-100 px-2.5 py-0.5 border border-amber-300">
                  <span className="num-en">10</span> Qs
                </span>
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('اختبار التقويم التكويني والختامي', 'Formative Assessment & Diagnostic Quiz')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'اختبار تفاعلي يقيس استيعاب المفاهيم، المعادلات، والربط الحياتي مع تحليل فوري وتفسير علمي لكل سؤال.',
                  'Diagnostic assessment testing conceptual mastery, chemical reactions, and real-world linkages with instant feedback.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-200">
              <span>{t('بدء الاختبار التشخيصي', 'Take Diagnostic Quiz')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 5: Assistant */}
          <Link
            href="/assistant"
            className="group bg-white border-2 border-slate-900 hover:border-emerald-600 p-6 shadow-xs transition-all flex flex-col justify-between space-y-4 relative"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-slate-950 text-emerald-400 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-950 bg-emerald-100 px-2.5 py-0.5 border border-emerald-300">
                  GLM 5.3
                </span>
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('المساعد التعليمي لمراجعة المنهاج', 'Chemistry Study & Concept Assistant')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'محرك استرجاع وإجابة فورية عن أي سؤال في كتاب كيمياء التاسع، مبرمج وفق نموذج cf/zai-org/glm-5.3-flash.',
                  'Interactive concept assistant powered by cf/zai-org/glm-5.3-flash model answering syllabus queries instantly.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-200">
              <span>{t('محادثة المساعد التعليمي', 'Open Study Assistant')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 6: About Teacher */}
          <Link
            href="/about"
            className="group bg-white border-2 border-slate-900 hover:border-emerald-600 p-6 shadow-xs transition-all flex flex-col justify-between space-y-4 relative"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-emerald-700 text-white flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 border border-slate-300">
                  BIO
                </span>
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('عن المعلمة والرؤية التربوية', 'Teacher Bio & Educational Vision')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'المؤهلات الأكاديمية (بكالوريوس كيمياء)، الخبرات في التعليم التفاعلي، ورؤية غرس القيم الإسلامية في تدريس العلوم.',
                  'Academic background (B.Sc. Chemistry), active pedagogy credentials, and Islamic educational values.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-200">
              <span>{t('قراءة السيرة الذاتية والرؤية', 'Read Bio & Credentials')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

        </div>
      </section>

      {/* 4. VISUAL GALLERY OF EXPERIMENTS & PEDAGOGY (PHASE 3 ASSETS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-2 py-0.5 border border-emerald-300">
              Phase 3: Visual Laboratory Showcase
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">
              معرض التجارب المعملية والربط بالواقع (كولينز ص 43 - 55)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Visual 1: Classroom Active Learning */}
          <div className="border-2 border-slate-900 bg-white overflow-hidden group space-y-3">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <Image
                src="/images/demo-lesson-classroom.png"
                alt="Active Learning Classroom"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </div>
            <div className="p-4 space-y-1 text-right">
              <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                استراتيجيات التعلم النشط
              </span>
              <h3 className="font-extrabold text-sm text-slate-900">التعلم القائم على الاستقصاء والتفكير الثنائي</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                مشاركة الطالبات في صياغة الفرضيات وفحص المحاليل بمستخلص الملفوف في بيئة صفية آمنة.
              </p>
            </div>
          </div>

          {/* Visual 2: Indicators Setup */}
          <div className="border-2 border-slate-900 bg-white overflow-hidden group space-y-3">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <Image
                src="/images/indicators-lab-setup.png"
                alt="Chemical Indicators Setup"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </div>
            <div className="p-4 space-y-1 text-right">
              <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                الكواشف وتدريج pH (ص 54-55)
              </span>
              <h3 className="font-extrabold text-sm text-slate-900">طيف الألوان في الأوساط الحمضية والقاعدية</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تباع الشمس، الفينولفثالين، أزرق البروموثيمول، والكاشف العام من الأحمر إلى الأزرق.
              </p>
            </div>
          </div>

          {/* Visual 3: Agriculture Soil Remediation */}
          <div className="border-2 border-slate-900 bg-white overflow-hidden group space-y-3">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <Image
                src="/images/soil-agriculture-lab.png"
                alt="Agricultural Soil Remediation"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </div>
            <div className="p-4 space-y-1 text-right">
              <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                الربط بالزراعة (كولينز ص 55)
              </span>
              <h3 className="font-extrabold text-sm text-slate-900">معالجة حموضة التربة بـ Ca(OH)₂</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                إضافة الجير المطفأ لرفع pH التربة إلى المدى المثالي (6.0 - 7.0) لنمو المحاصيل.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TIMED 10-MINUTE LESSON PLAN STEPPER (SHARP DESIGN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-slate-900 p-6 sm:p-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-950 bg-emerald-100 px-2.5 py-1 border border-emerald-300">
                التخطيط التنفيذي للحصة المصغرة
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                التوزيع الزمني الدقيق لأركان الحصة النموذجية (10 دقائق)
              </h2>
            </div>
            <Link
              href="/lesson-plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-emerald-400 font-bold text-xs border border-slate-900 hover:bg-slate-900 transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>وثيقة التحضير الكاملة</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 bg-slate-50 border border-slate-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-slate-950 text-emerald-400 font-mono text-[11px] font-bold">
                  00:00 - 02:00
                </span>
                <span className="text-[10px] font-bold text-slate-500 font-mono">PHASE 1</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-950">التهيئة وإثارة الفضول</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                لغز طعم الليمون الحامض مقابل ملمس الصابون الزلق وطعمه المر، وربطه بالاتزان الإلهي.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-slate-950 text-emerald-400 font-mono text-[11px] font-bold">
                  02:00 - 05:00
                </span>
                <span className="text-[10px] font-bold text-slate-500 font-mono">PHASE 2</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-950">بناء المفاهيم والكواشف</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تأين الحمض لإنتاج H⁺ وتأين القاعدة لإنتاج OH⁻، واستعراض كاشف الملفوف وتباع الشمس.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-slate-950 text-emerald-400 font-mono text-[11px] font-bold">
                  05:00 - 08:00
                </span>
                <span className="text-[10px] font-bold text-slate-500 font-mono">PHASE 3</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-950">المختبر الافتراضي والمعايرة</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                غمس قطب مقياس pH في المحاليل ومعايرة قطرات NaOH مع HCl للوصول لنقطة التعادل الوردي.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-slate-950 text-emerald-400 font-mono text-[11px] font-bold">
                  08:00 - 10:00
                </span>
                <span className="text-[10px] font-bold text-slate-500 font-mono">PHASE 4</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-950">التقويم التكويني والختام</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تحدي تشخيصي سريع بأسئلة تفاعلية فورية للتأكد من تحقق نتاجات التعلم لدى جميع الطالبات.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. LIVE INTERACTIVE AI STUDY ASSISTANT ON HOMEPAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white border-2 border-slate-900 p-6 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-mono font-bold border border-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Tutor Engine: cf/zai-org/glm-5.3-flash</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                اسأل المساعد التعليمي مباشرة من الصفحة الرئيسية
              </h2>
            </div>
            <Link
              href="/assistant"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 border border-emerald-800 px-3 py-1 bg-slate-900"
            >
              <span>فتح المحادثة الكاملة</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-2">
            {[
              'ما الفرق بين الحمض القوي والحمض الضعيف ودرجة التأين؟',
              'لماذا يُعد غاز ثاني أكسيد الكربون CO₂ أكسيداً حمضياً؟',
              'ما هي علاقة كيراتين الشعر بدرجة حموضة الشامبو (pH 5.5)؟',
              'كيف تُعالج حموضة التربة الزراعية باستخدام Ca(OH)₂؟'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleHomeChatSend(chip)}
                className="text-[11px] font-bold bg-slate-900 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 px-3 py-1.5 border border-slate-700 transition text-right"
              >
                💡 {chip}
              </button>
            ))}
          </div>

          {/* Chat Message Box */}
          <div className="bg-slate-900 p-4 sm:p-6 border border-slate-800 max-h-[300px] overflow-y-auto space-y-3">
            {homeChatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3.5 text-xs leading-relaxed max-w-[85%] border ${
                  msg.sender === 'user'
                    ? 'mr-auto bg-emerald-950 border-emerald-800 text-emerald-100 text-left'
                    : 'ml-auto bg-slate-950 border-slate-800 text-slate-200 text-right'
                }`}
              >
                <div className="font-bold mb-1 text-[10px] text-slate-400 font-mono">
                  {msg.sender === 'user' ? 'سؤالك:' : 'المساعد التعليمي (GLM 5.3):'}
                </div>
                <div className="whitespace-pre-line">{msg.text}</div>
              </div>
            ))}

            {homeChatLoading && (
              <div className="text-xs text-slate-400 flex items-center gap-2 p-2">
                <span className="w-2 h-2 bg-emerald-500 animate-ping"></span>
                <span>جاري معالجة الإجابة العلمية عبر cf/zai-org/glm-5.3-flash...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={homeChatInput}
              onChange={(e) => setHomeChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleHomeChatSend()}
              placeholder="اكتب سؤالك الكيميائي هنا واضغط إرسال..."
              className="flex-1 px-4 py-3 border border-slate-700 bg-slate-900 text-white placeholder-slate-400 text-xs outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleHomeChatSend()}
              disabled={!homeChatInput.trim() || homeChatLoading}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-1.5 border border-emerald-700"
            >
              <span>إرسال</span>
              <Send className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. INTERVIEW & VENUE CARD (SHARP DESIGN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white p-6 sm:p-10 border-2 border-emerald-600 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-400"></span>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                جاهزية تامة للمقابلة الشخصية
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              المدرسة الإسلامية الحديثة - إربد (حكما)
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              الأربعاء 02 / 09 / 2026 الساعة 08:00 صباحاً | شارع عمان - شمال مخابز السنبلة - بداية حكما.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/whatsapp-connect"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition border border-emerald-500"
            >
              تواصل عبر واتساب
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs transition"
            >
              عرض السيرة الذاتية
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
