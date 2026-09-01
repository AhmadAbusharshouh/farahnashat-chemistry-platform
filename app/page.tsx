'use client';

import { useState, useRef, useEffect } from 'react';
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
  Clock, 
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
  Eye,
  Atom,
  PhoneCall
} from 'lucide-react';
import { SUBSTANCES_DATA, ChemicalSubstance } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import { Molecule3DViewer } from '@/components/Molecule3DViewer';
import { Ionization3DChamber } from '@/components/Ionization3DChamber';

export default function HomePage() {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Mini Virtual Lab State on Homepage
  const [selectedSubstance, setSelectedSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[1]);

  // Live Chat Assistant State with Typewriter Animation
  const [homeChatInput, setHomeChatInput] = useState('');
  const [homeChatMessages, setHomeChatMessages] = useState<Array<{ id: string; sender: 'user' | 'assistant'; text: string; isTyping?: boolean }>>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'مرحباً بك! أنا المساعد التعليمي لمادة الكيمياء مع الأستاذة فرح نشأت. يمكنك سؤالي عن المفاهيم الكيميائية، التفاعلات، الكواشف، أو التجارب المخبرية.'
    }
  ]);
  const [homeChatLoading, setHomeChatLoading] = useState(false);
  const homeChatEndRef = useRef<HTMLDivElement>(null);

  const scrollHomeChat = () => {
    homeChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollHomeChat();
  }, [homeChatMessages]);

  const streamHomeResponse = async (msgId: string, fullText: string) => {
    const words = fullText.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      setHomeChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === msgId ? { ...msg, text: currentText, isTyping: i < words.length - 1 } : msg
        )
      );
      scrollHomeChat();
      await new Promise((resolve) => setTimeout(resolve, 22));
    }
  };

  const handleHomeChatSend = async (customPrompt?: string) => {
    const query = (customPrompt || homeChatInput).trim();
    if (!query || homeChatLoading) return;

    const userMsgId = 'user-' + Date.now();
    const aiMsgId = 'ai-' + Date.now();

    setHomeChatMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: query }]);
    setHomeChatInput('');
    setHomeChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      const reply = data.reply || 'تم استرجاع الإجابة العلمية بنجاح.';

      setHomeChatMessages((prev) => [
        ...prev,
        { id: aiMsgId, sender: 'assistant', text: '', isTyping: true }
      ]);
      setHomeChatLoading(false);
      await streamHomeResponse(aiMsgId, reply);

    } catch (err) {
      const fallbackText = 'تتأين الحموض في الماء مطلقة أيونات H⁺ بينما تطلق القواعد أيونات OH⁻، ومقياس pH يحدد درجة الحموضة بدقة.';
      setHomeChatMessages((prev) => [
        ...prev,
        { id: aiMsgId, sender: 'assistant', text: '', isTyping: true }
      ]);
      setHomeChatLoading(false);
      await streamHomeResponse(aiMsgId, fallbackText);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION - CLEAN, ELEGANT, UNCLUTTERED, NO UNDERLINES, NO DARK SECTIONS */}
      <section className="relative overflow-hidden bg-white/90 backdrop-blur-xs border-b border-slate-200 pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                  Chemistry Education Platform
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-[1.15] tracking-tight">
                  {t('تعليم الكيمياء بأسلوب تفاعلي حديث', 'Modern Interactive Chemistry')} <br />
                  <span className="text-emerald-700">
                    {t('مع الأستاذة فرح نشأت', 'with Farah Nashat')}
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                  {t(
                    'منصة تعليمية متكاملة تهدف إلى تبسيط المفاهيم الكيميائية وتعميق الفهم العلمي من خلال النمذجة ثلاثية الأبعاد (3D)، والتجارب المخبرية الرقمية، وربط الكيمياء بالصناعة والبيئة والحياة اليومية.',
                    'A modern educational platform offering interactive 3D molecular visualization, virtual laboratory simulations, and real-world chemical applications.'
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/virtual-lab"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition border border-emerald-800 shadow-2xs"
                >
                  <FlaskConical className="w-4 h-4" />
                  <span>{t('المختبر الافتراضي (3D)', 'Launch 3D Virtual Lab')}</span>
                  <Arrow className="w-4 h-4" />
                </Link>

                <Link
                  href="/lesson-plan"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs border border-slate-300 transition"
                >
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>{t('خطة الدرس النموذجية', 'Demo Lesson Plan')}</span>
                </Link>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-500 font-mono text-[10px] uppercase">3D Lab</div>
                  <div className="font-black text-slate-900 text-sm mt-0.5"><span className="num-en">6</span> محطات تفاعلية</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-500 font-mono text-[10px] uppercase">3D Engine</div>
                  <div className="font-black text-slate-900 text-sm mt-0.5">نمذجة جزيئية 3D</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-500 font-mono text-[10px] uppercase">AI Tutor</div>
                  <div className="font-black text-emerald-800 text-sm mt-0.5">مساعد دراسي ذكي</div>
                </div>
              </div>
            </div>

            {/* Right Visual & Live Substance Tester */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Clean Laboratory Showcase Image */}
              <div className="border border-slate-200 overflow-hidden relative group aspect-[16/10] bg-white shadow-2xs">
                <Image
                  src="/images/clean-beakers-light.png"
                  alt="Modern Chemistry Glassware Apparatus"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xs text-slate-900 p-2.5 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Interactive 3D Chemistry</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Virtual Lab</span>
                </div>
              </div>

              {/* Substance Fast Tester Widget */}
              <div className="bg-white border border-slate-200 p-3.5 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                  <span className="font-bold text-slate-800">فحص خصائص المواد:</span>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 text-[11px]">
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
                          ? 'bg-emerald-700 text-white border-emerald-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
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

      {/* 2. 3D MOLECULE & IONIZATION VISUAL ENGINE (LIGHT THEME) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-emerald-700" />
            <span>النمذجة الجزيئية ثلاثية الأبعاد ومحاكاة الأيونات (3D)</span>
          </h2>
          <Link
            href="/virtual-lab"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 text-white font-bold text-xs border border-emerald-800 hover:bg-emerald-800 transition"
          >
            <span>دخول المختبر الكامل</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Molecule3DViewer />
          <Ionization3DChamber />
        </div>
      </section>

      {/* 3. PLATFORM CORE MODULES TILES (CLEAN & LIGHT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            أقسام المنصة التعليمية
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Tile 1: Virtual Lab */}
          <Link
            href="/virtual-lab"
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold">
                <FlaskConical className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('المختبر الافتراضي ومحاكاة 3D', '3D Virtual Chemistry Lab')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'محاكاة تفاعلية: مقياس pH الرقمي، اختبار الموصلية وإضاءة المصباح، تفاعل الفلزات مع الحموض، ومحطة الكواشف الخمسة.',
                  'Interactive 3D laboratory: digital pH probe, 3D conductivity lamp, metal reactions with Pop Test, and 5 indicators.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-100">
              <span>{t('دخول المختبر الافتراضي', 'Open Virtual Lab')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Tile 2: Demo Lesson Plan */}
          <Link
            href="/lesson-plan"
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-slate-50 text-slate-800 border border-slate-200 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('خطة الدرس النموذجية', 'Demo Lesson Blueprint')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'نموذج تطبيقي لخطة تدريسية مبرمجة زمنياً وفق نموذج 5Es واستراتيجيات التعلم النشط وتوزيع النتاجات.',
                  'Exemplary pedagogical lesson blueprint structured with 5Es and active learning strategies.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-100">
              <span>{t('عرض خطة الدرس', 'View Lesson Blueprint')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Tile 3: Quiz */}
          <Link
            href="/quiz"
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('التقويم التكويني والتشخيصي', 'Formative Assessment & Quiz')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'اختبارات تشخيصية تفاعلية تقيس الفهم العلمي وتمنح تحليلاً وتفسيراً فورياً لكل سؤال وإجابة.',
                  'Interactive diagnostic assessments testing conceptual mastery with immediate scientific rationale.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-100">
              <span>{t('بدء الاختبار التشخيصي', 'Take Diagnostic Quiz')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Tile 4: Assistant */}
          <Link
            href="/assistant"
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('المساعد التعليمي الذكي', 'AI Chemistry Study Assistant')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'محرك بحث وإجابة ذكي للإجابة عن التساؤلات الكيميائية وتفسير المعادلات الكيميائية خطوة بخطوة.',
                  'Intelligent chemistry concept tutor answering questions and providing step-by-step guidance.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-100">
              <span>{t('محادثة المساعد التعليمي', 'Open Study Assistant')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Tile 5: About Teacher */}
          <Link
            href="/about"
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('عن المعلمة والرؤية التربوية', 'Teacher Bio & Vision')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'المؤهلات الأكاديمية والخبرات في تدريس العلوم وغرس القيم الإيمانية في تفكير الطلبة.',
                  'Academic credentials in Chemistry, active teaching philosophy, and educational values.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-100">
              <span>{t('قراءة السيرة الذاتية', 'Read Bio & Credentials')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Tile 6: Direct Contact */}
          <Link
            href="/whatsapp-connect"
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('بوابة التواصل المباشر', 'Contact Gateway')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'إرسال واستقبال الروابط التعليمية وملخصات الدروس مباشرة عبر تطبيق واتساب.',
                  'Send and receive educational links and study summaries directly via WhatsApp.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-100">
              <span>{t('فتح بوابة التواصل', 'Open Contact Gateway')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

        </div>
      </section>

      {/* 4. VISUAL LABORATORY GALLERY (ZERO HUMANS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            معرض الكيمياء التجريبية والتطبيقات
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Visual 1 */}
          <div className="border border-slate-200 bg-white overflow-hidden group space-y-3 shadow-2xs">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src="/images/lab-workstation.png"
                alt="Modern Laboratory Workstation"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </div>
            <div className="p-4 space-y-1 text-right">
              <h3 className="font-extrabold text-sm text-slate-900">محطة القياس والاستقصاء المعملي</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                أجهزة قياس رقمية دقيقة لفحص التفاعلات وتحديد درجة الحموضة وقيم pH للمحاليل.
              </p>
            </div>
          </div>

          {/* Visual 2 */}
          <div className="border border-slate-200 bg-white overflow-hidden group space-y-3 shadow-2xs">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src="/images/indicators-lab-setup.png"
                alt="Chemical Indicators Setup"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </div>
            <div className="p-4 space-y-1 text-right">
              <h3 className="font-extrabold text-sm text-slate-900">طيف الكواشف الكيميائية وتدرج الألوان</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تغيرات لونية دقيقة لكاشف تباع الشمس، الفينولفثالين، أزرق البروموثيمول، والكاشف العام.
              </p>
            </div>
          </div>

          {/* Visual 3 */}
          <div className="border border-slate-200 bg-white overflow-hidden group space-y-3 shadow-2xs">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src="/images/soil-agriculture-lab.png"
                alt="Agricultural Soil Remediation"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </div>
            <div className="p-4 space-y-1 text-right">
              <h3 className="font-extrabold text-sm text-slate-900">تطبيقات الكيمياء الزراعية ومعالجة التربة</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                معادلة حموضة التربة باستخدام محلول هيدروكسيد الكالسيوم Ca(OH)₂ لتوفير بيئة مثالية للنبات.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. LIVE INTERACTIVE AI STUDY ASSISTANT (TALLER CHAT, TYPEWRITER STREAMING) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  المساعد الكيميائي الذكي
                </h2>
                <p className="text-[11px] text-slate-500">
                  اطرح أي استفسار كيميائي وتلقَّ إجابة علمية دقيقة فورياً
                </p>
              </div>
            </div>
            <Link
              href="/assistant"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 border border-emerald-200"
            >
              <span>المحادثة الكاملة</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-1.5">
            {[
              'ما الفرق بين الحمض القوي والحمض الضعيف ودرجة التأين؟',
              'لماذا يُعد غاز ثاني أكسيد الكربون CO₂ أكسيداً حمضياً؟',
              'ما هي علاقة كيراتين الشعر بدرجة حموضة الشامبو (pH 5.5)؟',
              'كيف تُعالج حموضة التربة الزراعية باستخدام Ca(OH)₂؟'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleHomeChatSend(chip)}
                className="text-[11px] font-bold bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2.5 py-1 border border-slate-200 transition text-right"
              >
                💡 {chip}
              </button>
            ))}
          </div>

          {/* Chat Messages Container with Auto-Scroll */}
          <div className="bg-slate-50 p-4 border border-slate-200 h-[380px] overflow-y-auto space-y-3">
            {homeChatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 text-xs leading-relaxed max-w-[85%] border ${
                  msg.sender === 'user'
                    ? 'mr-auto bg-emerald-700 border-emerald-800 text-white text-left'
                    : 'ml-auto bg-white border-slate-200 text-slate-800 text-right'
                }`}
              >
                <div className="font-bold mb-1 text-[10px] opacity-75">
                  {msg.sender === 'user' ? 'سؤالك:' : 'المساعد التعليمي:'}
                </div>
                <div className={`whitespace-pre-line ${msg.isTyping ? 'typing-cursor' : ''}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {homeChatLoading && (
              <div className="text-xs text-slate-500 flex items-center gap-2 p-1 font-mono">
                <span className="w-2 h-2 bg-emerald-600 animate-ping"></span>
                <span>جاري معالجة الإجابة العلمية...</span>
              </div>
            )}
            <div ref={homeChatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={homeChatInput}
              onChange={(e) => setHomeChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleHomeChatSend()}
              placeholder="اكتب سؤالك الكيميائي هنا واضغط Enter..."
              className="flex-1 px-3.5 py-2.5 border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-xs outline-none focus:border-emerald-700"
            />
            <button
              onClick={() => handleHomeChatSend()}
              disabled={!homeChatInput.trim() || homeChatLoading}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white font-bold text-xs transition flex items-center gap-1.5 border border-emerald-800"
            >
              <span>إرسال</span>
              <Send className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
