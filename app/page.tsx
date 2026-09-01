'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FlaskConical, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  GraduationCap, 
  Award, 
  Boxes, 
  Atom,
  PhoneCall,
  Flame,
  ArrowUpRight,
  MessageSquare,
  Send,
  User
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Molecule3DViewer } from '@/components/Molecule3DViewer';
import { Ionization3DChamber } from '@/components/Ionization3DChamber';
import MetallicDodecahedron, { 
  CHEMICAL_FACES_DATA, 
  MetallicDodecahedronHandle 
} from '@/components/MetallicDodecahedron';

export default function HomePage() {
  const { lang, t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const dodecahedronRef = useRef<MetallicDodecahedronHandle>(null);
  const [activeChemIndex, setActiveChemIndex] = useState<number>(0);

  const activeChemical = CHEMICAL_FACES_DATA[activeChemIndex] || CHEMICAL_FACES_DATA[0];

  const handleSelectChemical = (index: number) => {
    setActiveChemIndex(index);
    dodecahedronRef.current?.burst();
  };

  const handleBurst = () => {
    dodecahedronRef.current?.burst();
  };

  // Live Chat Assistant State for Homepage
  const [homeChatInput, setHomeChatInput] = useState('');
  const [homeChatMessages, setHomeChatMessages] = useState<Array<{ id: string; sender: 'user' | 'assistant'; text: string; isTyping?: boolean }>>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'مرحباً بك! أنا المساعد الكيميائي الذكي للأستاذة فرح نشأت. اطرح أي سؤال وسأجيبك فورياً.'
    }
  ]);
  const [homeChatLoading, setHomeChatLoading] = useState(false);
  const homeChatContainerRef = useRef<HTMLDivElement>(null);

  const scrollHomeChat = () => {
    if (homeChatContainerRef.current) {
      homeChatContainerRef.current.scrollTop = homeChatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (homeChatMessages.length > 1) {
      scrollHomeChat();
    }
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
      await new Promise((resolve) => setTimeout(resolve, 20));
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
      let loggedUser: any = null;
      try {
        const saved = localStorage.getItem('farah_chem_user');
        if (saved) loggedUser = JSON.parse(saved);
      } catch (e) {}

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: query,
          userName: loggedUser?.name || undefined,
          registeredName: loggedUser?.name || undefined,
          phoneNumber: loggedUser?.phone || undefined,
          lang
        })
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
      
      {/* ========================================================================= */}
      {/* 1. CLEAN LIGHT-MODE HERO SECTION (WITH 3D METALLIC DODECAHEDRON) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-8 sm:pt-12 pb-12 sm:pb-16">
        
        {/* Soft Chemistry Laboratory Light Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <Image
            src="/images/clean-beakers-light.png"
            alt="Chemistry Laboratory Background"
            fill
            className="object-cover object-right"
            priority
          />
        </div>

        {/* Ambient Soft Emerald Glow Accent */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Teacher Identity & Concise Action Buttons */}
            <div className="lg:col-span-6 space-y-5 text-right">
              
              {/* Teacher Brand Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>{t('منصة الكيمياء التفاعلية • الأستاذة فرح نشأت', 'Interactive Chemistry Platform • Teacher Farah Nashat')}</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-[1.2] tracking-tight">
                  {t('تعلّم الكيمياء بأسلوب تفاعلي', 'Learn Chemistry Interactively')} <br />
                  <span className="text-emerald-700">
                    {t('مع الأستاذة فرح نشأت', 'with Teacher Farah Nashat')}
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg font-normal">
                  {t(
                    'منصة تعليمية متكاملة لشرح مفاهيم الكيمياء عبر النمذجة ثلاثية الأبعاد (3D)، والمختبر الافتراضي، والمساعد الذكي.',
                    'A chemistry platform designed by Teacher Farah Nashat offering 3D molecular solids, virtual lab inquiry, and AI assistance.'
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/virtual-lab"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-all shadow-xs hover:scale-102"
                >
                  <FlaskConical className="w-4 h-4" />
                  <span>{t('المختبر الافتراضي (3D)', 'Launch Virtual Lab')}</span>
                  <Arrow className="w-4 h-4" />
                </Link>

                <Link
                  href="/assistant"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs sm:text-sm border-2 border-emerald-600 rounded-lg transition-all hover:scale-102 shadow-2xs"
                >
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>{t('المساعد الكيميائي الذكي', 'AI Study Tutor')}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleBurst}
                  className="inline-flex items-center gap-1.5 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold border border-slate-300 rounded-lg transition active:scale-95"
                  title={t('انقر لتفجير الوجوه', 'Click to burst faces')}
                >
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>{t('تفكيك الروابط (Burst)', 'Burst 3D Solid')}</span>
                </button>
              </div>

              {/* Quick Chemical Formulas Selector */}
              <div className="pt-2 space-y-2">
                <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <Atom className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('اختر مادة لفحصها في المجسم 3D:', 'Select substance to inspect in 3D:')}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {CHEMICAL_FACES_DATA.slice(0, 6).map((chem, idx) => {
                    const isSelected = activeChemIndex === idx;
                    return (
                      <button
                        key={chem.formula}
                        onClick={() => handleSelectChemical(idx)}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-all border ${
                          isSelected
                            ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                            : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-300 hover:border-emerald-500'
                        }`}
                      >
                        {chem.formula}
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-bold text-emerald-800 bg-emerald-50/80 p-2.5 rounded-md border border-emerald-200 flex items-center justify-between">
                  <span>{activeChemical.nameAr} ({activeChemical.typeAr})</span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-900">
                    pH = {activeChemical.ph}
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Metallic Chemical Dodecahedron */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/80 border border-slate-300 p-3 sm:p-4 shadow-md overflow-hidden">
                
                {/* 3D Header Strip */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs px-1">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <Boxes className="w-4 h-4 text-emerald-700" />
                    <span>{t('مجسم كيميائي تفاعلي (3D)', 'Interactive 3D Solid')}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {t('اسحب للتدوير • انقر للتفكيك', 'Drag to rotate • Click to burst')}
                  </span>
                </div>

                {/* 3D Canvas Area */}
                <div className="relative h-[320px] sm:h-[380px] w-full flex items-center justify-center">
                  <MetallicDodecahedron
                    ref={dodecahedronRef}
                    shape="dodecahedron"
                    finish="metal"
                    tint="#ffffff"
                    color="#059669"
                    edges={true}
                    edgeColor="#10b981"
                    showChemicalLabels={true}
                    selectedFormula={activeChemical.formula}
                    burst={{ enabled: true, distance: 35, twist: 22 }}
                    transition={{ type: 'tween', duration: 0.65, delay: 0.55, ease: 'easeOut' }}
                    rotation={{ x: 1.8, y: 4.5, z: 0 }}
                    dragSensitivity={10}
                    sizePercent={95}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 3D MOLECULE & IONIZATION VISUAL ENGINE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-emerald-700" />
            <span>{t('النمذجة الجزيئية ثلاثية الأبعاد ومحاكاة الأيونات (3D)', '3D Molecular Modeling & Ionization Engine')}</span>
          </h2>
          <Link
            href="/virtual-lab"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 text-white font-bold text-xs border border-emerald-800 hover:bg-emerald-800 transition"
          >
            <span>{t('دخول المختبر الكامل', 'Open Full 3D Lab')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Molecule3DViewer />
          <Ionization3DChamber />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PLATFORM CORE MODULES TILES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            {t('أقسام المنصة التعليمية', 'Platform Core Sections')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Tile 1: Virtual Lab */}
          <Link
            href="/virtual-lab"
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white hover:border-emerald-500 transition-all hover:shadow-md"
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

          {/* Tile 2: 3D Molecular Engine */}
          <Link
            href="/virtual-lab"
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white hover:border-emerald-500 transition-all hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 bg-slate-50 text-emerald-800 border border-slate-200 flex items-center justify-center font-bold">
                <Atom className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="font-black text-slate-950 text-base group-hover:text-emerald-700 transition">
                {t('النمذجة ثلاثية الأبعاد (3D)', '3D Molecular Engine')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'فحص البنية البلورية للجزيئات (H₂O, HCl, NaOH, CH₃COOH) وتتبع حركة الأيونات والمجال الكهربائي في الفراغ ثلاثي الأبعاد.',
                  'Explore molecular crystal geometry and observe ion mobility dynamics in an interactive 3D field.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 pt-3 border-t border-slate-100">
              <span>{t('استكشاف المجسمات', 'Explore 3D Models')}</span>
              <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Tile 3: Quiz */}
          <Link
            href="/quiz"
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white hover:border-emerald-500 transition-all hover:shadow-md"
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
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white hover:border-emerald-500 transition-all hover:shadow-md"
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
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white hover:border-emerald-500 transition-all hover:shadow-md"
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
            className="sharp-card p-6 flex flex-col justify-between space-y-4 group bg-white hover:border-emerald-500 transition-all hover:shadow-md"
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

      {/* ========================================================================= */}
      {/* 4. VISUAL LABORATORY GALLERY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            {t('معرض الكيمياء التجريبية والتطبيقات', 'Experimental Chemistry Showcase')}
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
              <h3 className="font-extrabold text-sm text-slate-900">
                {t('محطة القياس والاستقصاء المعملي', 'Laboratory Investigation Station')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('أجهزة قياس رقمية دقيقة لفحص التفاعلات وتحديد درجة الحموضة وقيم pH للمحاليل.', 'Digital measurement probes for pH monitoring and reaction kinetics.')}
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
              <h3 className="font-extrabold text-sm text-slate-900">
                {t('طيف الكواشف الكيميائية وتدرج الألوان', 'Indicator Colorimetric Spectrum')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('تغيرات لونية دقيقة لكاشف تباع الشمس، الفينولفثالين، أزرق البروموثيمول، والكاشف العام.', 'Precise color transitions for litmus, phenolphthalein, bromothymol blue, and universal indicator.')}
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
              <h3 className="font-extrabold text-sm text-slate-900">
                {t('تطبيقات الكيمياء الزراعية ومعالجة التربة', 'Agricultural Chemistry & Soil Neutralization')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('معادلة حموضة التربة باستخدام محلول هيدروكسيد الكالسيوم Ca(OH)₂ لتوفير بيئة مثالية للنبات.', 'Neutralizing soil acidity with calcium hydroxide Ca(OH)₂ to create optimal crop conditions.')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOMEPAGE AI ASSISTANT SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white border-2 border-emerald-600 p-6 sm:p-8 space-y-5 shadow-lg">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  {t('المساعد الكيميائي الذكي', 'AI Chemistry Study Assistant')}
                </h2>
                <p className="text-xs text-slate-500">
                  {t('اطرح أي استفسار كيميائي وتلقَّ إجابة علمية دقيقة فورياً', 'Ask any chemistry question and get instant step-by-step scientific explanations')}
                </p>
              </div>
            </div>

            <Link
              href="/assistant"
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-800 flex items-center gap-2 shadow-2xs transition hover:scale-103"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('تحدث مع المساعد الذكي', 'Talk with the AI')}</span>
              <Arrow className="w-3.5 h-3.5" />
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

          {/* Chat Messages Container with Internal Auto-Scroll */}
          <div ref={homeChatContainerRef} className="bg-slate-50 p-4 border border-slate-200 h-[380px] overflow-y-auto space-y-3">
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
                  {msg.sender === 'user' ? t('سؤالك:', 'Your question:') : t('المساعد التعليمي:', 'AI Tutor:')}
                </div>
                <div className={`whitespace-pre-line ${msg.isTyping ? 'typing-cursor' : ''}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {homeChatLoading && (
              <div className="text-xs text-slate-500 flex items-center gap-2 p-1 font-mono">
                <span className="w-2 h-2 bg-emerald-600 animate-ping"></span>
                <span>{t('جاري معالجة الإجابة العلمية...', 'Synthesizing scientific answer...')}</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={homeChatInput}
              onChange={(e) => setHomeChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleHomeChatSend()}
              placeholder={t('اكتب سؤالك الكيميائي هنا واضغط Enter...', 'Type your chemistry question here and press Enter...')}
              className="flex-1 px-3.5 py-2.5 border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-xs outline-none focus:border-emerald-700"
            />
            <button
              onClick={() => handleHomeChatSend()}
              disabled={!homeChatInput.trim() || homeChatLoading}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white font-bold text-xs transition flex items-center gap-1.5 border border-emerald-800"
            >
              <span>{t('إرسال', 'Send')}</span>
              <Send className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}