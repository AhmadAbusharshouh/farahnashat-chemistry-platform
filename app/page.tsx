'use client';

import { useState } from 'react';
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
  FileText
} from 'lucide-react';
import { SUBSTANCES_DATA, ChemicalSubstance } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

export default function HomePage() {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Mini Virtual Lab State on Homepage
  const [selectedSubstance, setSelectedSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[1]); // HCl default
  const [probeActive, setProbeActive] = useState(true);

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
      
      {/* 1. HERO MASTER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/80 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Top Interview Logistics Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {t(
                  'المقابلة والحصة النموذجية | الأربعاء 02 / 09 / 2026 - الساعة 08:00 صباحاً',
                  'Interview & Demo Lesson | Wednesday 02/09/2026 - 08:00 AM'
                )}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t('المدرسة الإسلامية الحديثة - إربد (حكما)', 'Modern Islamic School - Irbid (Hikma)')}</span>
            </div>
          </div>

          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left/Right Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider bg-emerald-100/60 px-2.5 py-1 rounded-md">
                  {t('الملف التعليمي والتحضيري الشامل', 'Comprehensive Teaching Dossier')}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-[1.2] tracking-tight">
                  {t('المعلمة فرح نشأت', 'Teacher Farah Nashat')} <br />
                  <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-8">
                    {t('كيمياء الصف التاسع الأساسي', 'Grade 9 Chemistry Specialist')}
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-normal">
                {t(
                  'أهلاً وسهلاً بلجنة المقابلة الكريمة وإدارة المدرسة الإسلامية الحديثة. يضم هذا الموقع تحضيري الكامل للحصة النموذجية (10 دقائق) لدرس "الحموض والقواعد والكواشف" من كتاب كولينز (ص 43 - 55)، شاملاً خطة الدرس المبرمجة بالثواني، المختبر الافتراضي التفاعلي، خارطة المفاهيم، والتقويم التكويني.',
                  'Welcome to the official teaching dossier of Ms. Farah Nashat for the 10-minute demo lesson (Collins Grade 9 Chemistry, pp. 43-55) at Modern Islamic School - Irbid (Hikma), featuring a timed lesson plan, virtual laboratory, curriculum maps, and formative assessments.'
                )}
              </p>

              {/* Quick Jump Action Buttons */}
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
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-sm shadow-2xs transition"
                >
                  <FlaskConical className="w-4 h-4 text-emerald-400" />
                  <span>{t('المختبر الافتراضي (6 محطات)', 'Launch Virtual Lab (6 Stations)')}</span>
                </Link>
              </div>

              {/* Quick Highlights Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/80 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="font-bold text-slate-500">{t('الزمن الكلي', 'Duration')}</div>
                  <div className="font-black text-emerald-800 text-sm mt-0.5"><span className="num-en">10</span> {t('دقائق', 'Mins')}</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="font-bold text-slate-500">{t('مرجع الكتاب', 'Curriculum')}</div>
                  <div className="font-black text-slate-900 text-sm mt-0.5">{t('كولينز ص', 'pp.')} <span className="num-en">43-55</span></div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="font-bold text-slate-500">{t('محطات المختبر', 'Lab Stations')}</div>
                  <div className="font-black text-emerald-800 text-sm mt-0.5"><span className="num-en">6</span> {t('محطات', 'Stations')}</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="font-bold text-slate-500">{t('المؤهل', 'Degree')}</div>
                  <div className="font-black text-slate-900 text-sm mt-0.5">{t('بكالوريوس كيمياء', 'B.Sc. Chem')}</div>
                </div>
              </div>
            </div>

            {/* Right/Left Interactive Mini Lab Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-emerald-700" />
                    <h3 className="font-extrabold text-slate-900 text-sm">
                      {t('محطة الفحص السريع للمواد', 'Quick Substance pH Probe')}
                    </h3>
                  </div>
                  <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                    {selectedSubstance.curriculumPage}
                  </span>
                </div>

                {/* Substance Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 block">اختر مادة للاختبار الفوري:</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {SUBSTANCES_DATA.slice(0, 4).map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubstance(sub)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-right transition flex items-center justify-between ${
                          selectedSubstance.id === sub.id 
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-1 ring-emerald-300' 
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{sub.name.split('(')[0]}</span>
                        <span 
                          className="w-3 h-3 rounded-full shrink-0 ml-1.5"
                          style={{ backgroundColor: sub.color }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mini Visual Beaker & Display */}
                <div className="bg-slate-950 rounded-2xl p-4 text-white text-center space-y-2 relative overflow-hidden">
                  <div className="text-[10px] text-slate-400 font-mono">Digital pH Readout</div>
                  <div className="text-4xl font-mono font-black text-emerald-400">
                    pH = {selectedSubstance.ph.toFixed(1)}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {selectedSubstance.typeName} • {selectedSubstance.formula}
                  </div>
                </div>

                {/* Instant Chemistry Reaction Details */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 text-right">
                  <p><strong>ورق تباع الشمس:</strong> {selectedSubstance.litmusReaction}</p>
                  <p><strong>الملفوف الأحمر:</strong> {selectedSubstance.cabbageReaction}</p>
                </div>

                <Link
                  href="/virtual-lab"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>فتح المختبر الكامل (الموصلية، الفلزات، المعايرة)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. PORTAL HUB CARDS - ALL PAGES ACCESSIBLE DIRECTLY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
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
            className="group bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="num-en">10</span> دقائق
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition">
                {t('خطة الحصة النموذجية المعيارية', '10-Minute Demo Lesson Blueprint')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'توزيع زمني دقيق بالثواني (0-2 تهيئة، 2-5 مفاهيم، 5-8 مختبر واستقصاء، 8-10 تقويم)، متوافقة مع نموذج 5Es والتعلم النشط.',
                  'Minute-by-minute execution plan calibrated for the 10-minute demo lesson with active learning strategies.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 pt-2 border-t border-slate-100">
              <span>{t('عرض خطة الدرس التفصيلية', 'View Lesson Blueprint')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Virtual Lab */}
          <Link
            href="/virtual-lab"
            className="group bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="num-en">6</span> محطات تجريبية
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition">
                {t('مختبر الكيمياء الافتراضي الاستقصائي', 'Virtual Chemistry Lab (6 Stations)')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'محاكاة رقمية متقدمة: مقياس pH، إضاءة المصباح والموصلية، تفاعل الفلزات وتصاعد H₂، محطة الكواشف الخمسة، ومعالجة التربة بـ Ca(OH)₂.',
                  'Interactive laboratory: digital pH probe, conductivity lamp, metal reactions with Pop Test, 5 indicators, and soil neutralization.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 pt-2 border-t border-slate-100">
              <span>{t('دخول المختبر الافتراضي', 'Open Virtual Lab')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Curriculum Map */}
          <Link
            href="/curriculum-map"
            className="group bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  ص <span className="num-en">43 - 55</span>
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition">
                {t('خارطة منهاج كولينز وبنك أسئلة "أتحقق"', 'Collins Grade 9 Concept Map & Checkpoints')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'تفكيك شامل لـ 5 محاور دراسية مع كافة المعادلات الكيميائية، الربط بالصناعة والرياضة والزراعة، والحلول النموذجية لكافة أسئلة أتحقق.',
                  'Breakdown of all 5 Collins Grade 9 units with balanced ionic equations and complete solutions to textbook checkpoints.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 pt-2 border-t border-slate-100">
              <span>{t('استعراض خارطة المنهاج', 'Explore Concept Map')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 4: Quiz */}
          <Link
            href="/quiz"
            className="group bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <span className="num-en">10</span> أسئلة معيارية
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition">
                {t('اختبار التقويم التكويني والختامي', 'Formative Assessment & Diagnostic Quiz')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'اختبار تفاعلي يقيس استيعاب المفاهيم، المعادلات، والربط الحياتي مع تحليل فوري وتفسير علمي لكل سؤال.',
                  'Diagnostic assessment testing conceptual mastery, chemical reactions, and real-world linkages with instant feedback.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 pt-2 border-t border-slate-100">
              <span>{t('بدء الاختبار التشخيصي', 'Take Diagnostic Quiz')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 5: Assistant */}
          <Link
            href="/assistant"
            className="group bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  مساعد فوري
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition">
                {t('المساعد التعليمي لمراجعة المنهاج', 'Chemistry Study & Concept Assistant')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'محرك استرجاع وإجابة فورية عن أي سؤال في كتاب كيمياء التاسع، مبرمج وفق نموذج GLM 5.3 Flash.',
                  'Interactive concept assistant powered by cf/zai-org/glm-5.3-flash model answering syllabus queries instantly.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 pt-2 border-t border-slate-100">
              <span>{t('محادثة المساعد التعليمي', 'Open Study Assistant')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 6: About Teacher */}
          <Link
            href="/about"
            className="group bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  السيرة والمؤهلات
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition">
                {t('عن المعلمة والرؤية التربوية', 'Teacher Bio & Educational Vision')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'المؤهلات الأكاديمية (بكالوريوس كيمياء)، الخبرات في التعليم التفاعلي، ورؤية غرس القيم الإسلامية في تدريس العلوم.',
                  'Academic background (B.Sc. Chemistry), active pedagogy credentials, and Islamic educational values.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 pt-2 border-t border-slate-100">
              <span>{t('قراءة السيرة الذاتية والرؤية', 'Read Bio & Credentials')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

        </div>
      </section>

      {/* 3. TIMED 10-MINUTE LESSON PLAN STEPPER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                التخطيط التنفيذي للحصة المصغرة
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                التوزيع الزمني الدقيق لأركان الحصة النموذجية (10 دقائق)
              </h2>
            </div>
            <Link
              href="/lesson-plan"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-xs transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>عرض وثيقة التحضير الكاملة</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-slate-900 text-emerald-400 font-mono text-[11px] font-bold rounded">
                  00:00 - 02:00
                </span>
                <span className="text-[10px] font-bold text-slate-400">المرحلة 1</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">التهيئة وإثارة الفضول</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                لغز طعم الليمون الحامض مقابل ملمس الصابون الزلق وطعمه المر، وربطه بالاتزان الإلهي.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-slate-900 text-emerald-400 font-mono text-[11px] font-bold rounded">
                  02:00 - 05:00
                </span>
                <span className="text-[10px] font-bold text-slate-400">المرحلة 2</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">بناء المفاهيم والكواشف</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تأين الحمض لإنتاج H⁺ وتأين القاعدة لإنتاج OH⁻، واستعراض كاشف الملفوف وتباع الشمس.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-slate-900 text-emerald-400 font-mono text-[11px] font-bold rounded">
                  05:00 - 08:00
                </span>
                <span className="text-[10px] font-bold text-slate-400">المرحلة 3</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">المختبر الافتراضي والمعايرة</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                غمس قطب مقياس pH في المحاليل ومعايرة قطرات NaOH مع HCl للوصول لنقطة التعادل الوردي.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-slate-900 text-emerald-400 font-mono text-[11px] font-bold rounded">
                  08:00 - 10:00
                </span>
                <span className="text-[10px] font-bold text-slate-400">المرحلة 4</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">التقويم التكويني والختام</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تحدي تشخيصي سريع بأسئلة تفاعلية فورية للتأكد من تحقق نتاجات التعلم لدى جميع الطالبات.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LIVE INTERACTIVE AI STUDY ASSISTANT ON HOMEPAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>المساعد التعليمي الذكي (cf/zai-org/glm-5.3-flash)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                اسأل المساعد التعليمي مباشرة من الصفحة الرئيسية
              </h2>
            </div>
            <Link
              href="/assistant"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>فتح صفحة المحادثة الكاملة</span>
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
                className="text-[11px] font-bold bg-slate-800 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 px-3 py-1.5 rounded-xl border border-slate-700 transition text-right"
              >
                💡 {chip}
              </button>
            ))}
          </div>

          {/* Chat Message Box */}
          <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 max-h-[300px] overflow-y-auto space-y-3">
            {homeChatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                  msg.sender === 'user'
                    ? 'mr-auto bg-emerald-950 border border-emerald-800 text-emerald-100 text-left'
                    : 'ml-auto bg-slate-900 border border-slate-800 text-slate-200 text-right'
                }`}
              >
                <div className="font-bold mb-1 text-[10px] text-slate-400">
                  {msg.sender === 'user' ? 'سؤالك:' : 'المساعد التعليمي:'}
                </div>
                <div className="whitespace-pre-line">{msg.text}</div>
              </div>
            ))}

            {homeChatLoading && (
              <div className="text-xs text-slate-400 flex items-center gap-2 p-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>جاري معالجة الإجابة العلمية وفق المنهاج...</span>
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
              className="flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-400 text-xs outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleHomeChatSend()}
              disabled={!homeChatInput.trim() || homeChatLoading}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              <span>إرسال</span>
              <Send className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. INTERVIEW & VENUE CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
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
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-xs"
            >
              تواصل عبر واتساب
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition"
            >
              عرض السيرة الذاتية
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
