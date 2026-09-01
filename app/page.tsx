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
  Zap, 
  Send, 
  User, 
  Droplets, 
  ArrowUpRight, 
  MessageSquare, 
  Boxes, 
  Atom,
  PhoneCall,
  Activity,
  Maximize2,
  RefreshCw,
  Flame,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { SUBSTANCES_DATA, ChemicalSubstance } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import { FormattedChemistryMessage } from '@/lib/format-chemistry';
import { Molecule3DViewer } from '@/components/Molecule3DViewer';
import { Ionization3DChamber } from '@/components/Ionization3DChamber';
import MetallicDodecahedron, { 
  CHEMICAL_FACES_DATA, 
  MetallicDodecahedronHandle, 
  ShapeType, 
  FinishType 
} from '@/components/MetallicDodecahedron';

export default function HomePage() {
  const { lang, t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const threeDSectionRef = useRef<HTMLDivElement>(null);
  const dodecahedronRef = useRef<MetallicDodecahedronHandle>(null);

  // Hero Section 3D Interactive States
  const [heroShape, setHeroShape] = useState<ShapeType>('dodecahedron');
  const [heroFinish, setHeroFinish] = useState<FinishType>('metal');
  const [activeChemIndex, setActiveChemIndex] = useState<number>(0);
  const [burstCount, setBurstCount] = useState<number>(0);

  const activeChemical = CHEMICAL_FACES_DATA[activeChemIndex] || CHEMICAL_FACES_DATA[0];

  // Chemical Reactions Map for Active Formula
  const CHEMICAL_EQUATIONS: Record<string, { eq: string; descAr: string; descEn: string }> = {
    'HCl': {
      eq: 'HCl (g) + H₂O (l) → H₃O⁺ (aq) + Cl⁻ (aq)',
      descAr: 'يتأين حمض الهيدروكلوريك كلياً في الماء مطلقاً أيونات الهيدرونيوم H₃O⁺ بدرجة حموضة عالية.',
      descEn: 'Hydrochloric acid completely ionizes in water releasing hydronium ions H₃O⁺ with strong acidity.'
    },
    'NaOH': {
      eq: 'NaOH (s) + H₂O (l) → Na⁺ (aq) + OH⁻ (aq)',
      descAr: 'تتفكك قاعدة هيدروكسيد الصوديوم كلياً في الماء مطلقة أيونات الهيدروكسيد OH⁻.',
      descEn: 'Sodium hydroxide completely dissociates into hydroxide ions OH⁻ in aqueous solution.'
    },
    'H₂SO₄': {
      eq: 'H₂SO₄ (l) + 2H₂O (l) → 2H₃O⁺ (aq) + SO₄²⁻ (aq)',
      descAr: 'حمض ثنائي البروتون قوي، يتأين في الماء مع انبعاث حراري ملحوظ.',
      descEn: 'Strong diprotic acid releasing two protons in aqueous dissociation with exothermic profile.'
    },
    'CH₃COOH': {
      eq: 'CH₃COOH (aq) + H₂O (l) ⇌ H₃O⁺ (aq) + CH₃COO⁻ (aq)',
      descAr: 'حمض ضعيف أحادي البروتون، يتأين جزئياً ويكون في حالة اتزان ديناميكي.',
      descEn: 'Weak monoprotic acid in dynamic chemical equilibrium in aqueous solution.'
    },
    'Ca(OH)₂': {
      eq: 'Ca(OH)₂ (s) + H₂O (l) → Ca²⁺ (aq) + 2OH⁻ (aq)',
      descAr: 'الجير المطفأ، قاعدة قوية تُستخدم في معالجة حموضة التربة الزراعية.',
      descEn: 'Slaked lime, a strong alkaline base widely utilized for agricultural soil neutralization.'
    },
    'NH₃': {
      eq: 'NH₃ (g) + H₂O (l) ⇌ NH₄⁺ (aq) + OH⁻ (aq)',
      descAr: 'قاعدة ضعيفة تتفاعل مع الماء لتكوين أيونات الأمونيوم والهيدروكسيد.',
      descEn: 'Weak base reacting reversibly with water to generate ammonium and hydroxide ions.'
    },
    'H₂O': {
      eq: '2H₂O (l) ⇌ H₃O⁺ (aq) + OH⁻ (aq)  [Kw = 1.0 × 10⁻¹⁴]',
      descAr: 'التأين الذاتي للماء النقي، حيث تتساوى تراكيز [H₃O⁺] و [OH⁻] عند pH = 7.',
      descEn: 'Auto-ionization of pure water maintaining equilibrium with neutral pH = 7.'
    },
    'NaCl': {
      eq: 'NaCl (s) + H₂O (l) → Na⁺ (aq) + Cl⁻ (aq)',
      descAr: 'ملح متعادل ناتج من تعادل حمض قوي وقاعدة قوية، موصل ممتاز للكهرباء.',
      descEn: 'Neutral salt formed by strong acid-base neutralization with high electrical conductivity.'
    }
  };

  const currentEquation = CHEMICAL_EQUATIONS[activeChemical.formula] || {
    eq: `${activeChemical.formula} (aq) ⇌ Ions in Solution`,
    descAr: activeChemical.nameAr + ' - ' + activeChemical.typeAr,
    descEn: activeChemical.formula + ' - Chemistry element'
  };

  const handleSelectHeroChemical = (index: number) => {
    setActiveChemIndex(index);
    dodecahedronRef.current?.burst();
    setBurstCount((c) => c + 1);
  };

  const handleManualBurst = () => {
    dodecahedronRef.current?.burst();
    setBurstCount((c) => c + 1);
  };

  // Live Chat Assistant State with Typewriter Animation
  const [homeChatInput, setHomeChatInput] = useState('');
  const [homeChatMessages, setHomeChatMessages] = useState<Array<{ id: string; sender: 'user' | 'assistant'; text: string; isTyping?: boolean }>>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'مرحباً بك! أنا المساعد الكيميائي الذكي للأستاذة فرح نشأت. اطرح أي استفسار علمي وسأجيبك فورياً.'
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
      {/* 1. ALL-NEW 3D INTERACTIVE HERO SECTION (FEATURING METALLIC DODECAHEDRON) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-b border-emerald-950/60 pt-8 sm:pt-12 pb-16 sm:pb-20">
        
        {/* Subtle Background Layer with Chemistry Artwork Blend */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-15 mix-blend-screen">
          <Image
            src="/images/abstract-chem-bg.png"
            alt="Chemistry Background Texture"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Ambient Radial Glowing Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Hero Text & Value Proposition */}
            <div className="lg:col-span-6 space-y-6 text-right">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{t('المنصة التفاعلية الرسمية للكيمياء • أ. فرح نشأت', 'Official Interactive Chemistry Platform • Farah Nashat')}</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.2] tracking-tight">
                  {t('استكشف أسرار الكيمياء التفاعلية', 'Explore Interactive Chemistry')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                    {t('بالمجسمات ثلاثية الأبعاد (3D)', 'with 3D Molecular Solids')}
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                  {t(
                    'تجربة تعليمية مبتكرة تجمع بين النمذجة ثلاثية الأبعاد التفاعلية للمركبات والأيونات، ومحاكاة المختبر الافتراضي الرقمي، والمساعد الذكي لتبسيط المفاهيم وبناء الفهم العميق.',
                    'An innovative learning journey integrating real-time 3D solid physics, interactive virtual laboratory experiments, and an intelligent AI chemistry tutor.'
                  )}
                </p>
              </div>

              {/* Chemical Substance Quick Selector Pills */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Atom className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
                    <span>{t('اختر مادة لفحصها وتفجير وجوه المجسم 3D:', 'Select substance to test & burst 3D solid:')}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t('12 مادة كيميائية', '12 Substances')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {CHEMICAL_FACES_DATA.slice(0, 8).map((chem, idx) => {
                    const isSelected = activeChemIndex === idx;
                    return (
                      <button
                        key={chem.formula}
                        onClick={() => handleSelectHeroChemical(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all transform active:scale-95 border ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-105'
                            : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700 hover:border-emerald-500/50'
                        }`}
                      >
                        {chem.formula}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Chemical Reaction Breakdown Panel */}
              <div className="p-4 rounded-xl bg-slate-800/70 border border-emerald-500/30 backdrop-blur-md space-y-2 shadow-xl animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeChemical.color }} />
                    <span className="font-black text-white text-sm">{activeChemical.formula}</span>
                    <span className="text-emerald-400 text-xs">({activeChemical.nameAr})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px] font-bold">
                      {activeChemical.typeAr}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs">
                      pH = {activeChemical.ph}
                    </span>
                  </div>
                </div>

                <div className="font-mono text-xs sm:text-sm text-emerald-300 font-bold pt-1 text-center dir-ltr">
                  {currentEquation.eq}
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed pt-1 text-right">
                  {lang === 'ar' ? currentEquation.descAr : currentEquation.descEn}
                </p>
              </div>

              {/* Hero Action CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/virtual-lab"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(5,150,105,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:scale-103 active:scale-98"
                >
                  <FlaskConical className="w-4 h-4" />
                  <span>{t('دخول المختبر الافتراضي (3D)', 'Launch 3D Virtual Lab')}</span>
                  <Arrow className="w-4 h-4" />
                </Link>

                <Link
                  href="/assistant"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-emerald-300 hover:text-white font-black text-xs sm:text-sm border border-emerald-500/40 hover:border-emerald-400 transition-all hover:scale-103 shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{t('المساعد الكيميائي الذكي', 'AI Study Tutor')}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleManualBurst}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition"
                  title={t('انقر لتفجير وجوه المجسم', 'Click to burst faces')}
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>{t('تفجير الروابط (Burst)', 'Burst Solid')}</span>
                </button>
              </div>

            </div>

            {/* Right Column: 3D Metallic Chemical Dodecahedron Interactive Stage */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-950/90 border border-slate-700/80 p-3 sm:p-4 shadow-2xl backdrop-blur-md overflow-hidden group">
                
                {/* 3D Model Top Status Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 text-xs px-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Boxes className="w-4 h-4" />
                    <span className="capitalize">{heroShape} • {t('مجسم كيميائي تفاعلي', 'Interactive 3D Solid')}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {t('اسحب للتدوير • انقر لتفجير الوجوه', 'Drag to rotate • Click to burst')}
                    </span>
                  </div>
                </div>

                {/* 3D Canvas Container */}
                <div className="relative h-[340px] sm:h-[420px] w-full flex items-center justify-center">
                  
                  <MetallicDodecahedron
                    ref={dodecahedronRef}
                    shape={heroShape}
                    finish={heroFinish}
                    tint="#ffffff"
                    color="#059669"
                    edges={true}
                    edgeColor="#10b981"
                    showChemicalLabels={true}
                    selectedFormula={activeChemical.formula}
                    burst={{ enabled: true, distance: 40, twist: 25 }}
                    transition={{ type: 'tween', duration: 0.65, delay: 0.55, ease: 'easeOut' }}
                    rotation={{ x: 1.8, y: 4.5, z: 0 }}
                    dragSensitivity={10}
                    sizePercent={95}
                    style={{ width: '100%', height: '100%' }}
                  />

                  {/* Corner Visual Indicator */}
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] text-slate-300 flex items-center gap-2 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{t('تفاعل حي 3D', 'Live 3D Physics')}</span>
                  </div>

                  {/* Center Hint on Hover */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-emerald-950/70 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono font-bold pointer-events-none">
                    {activeChemical.formula}
                  </div>
                </div>

                {/* Interactive Controls Toolbar Underneath 3D Canvas */}
                <div className="pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                  
                  {/* Shape Switcher */}
                  <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-700">
                    {(['dodecahedron', 'icosahedron', 'octahedron', 'tetrahedron'] as ShapeType[]).map((shape) => (
                      <button
                        key={shape}
                        onClick={() => setHeroShape(shape)}
                        className={`px-2 py-1 rounded text-[10px] font-bold capitalize transition-all ${
                          heroShape === shape
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {shape.slice(0, 4)}
                      </button>
                    ))}
                  </div>

                  {/* Finish Switcher */}
                  <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-700">
                    {(['metal', 'solid', 'wire'] as FinishType[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setHeroFinish(f)}
                        className={`px-2 py-1 rounded text-[10px] font-bold capitalize transition-all ${
                          heroFinish === f
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {f === 'metal' ? t('معدني', 'Metal') : f === 'solid' ? t('مصمت', 'Solid') : t('هيكلي', 'Wire')}
                      </button>
                    ))}
                  </div>

                  {/* Burst Trigger Button */}
                  <button
                    onClick={handleManualBurst}
                    className="px-3 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 border border-emerald-500/50 text-emerald-200 hover:text-white text-[11px] font-bold transition flex items-center gap-1.5"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>{t('تفكيك الوجوه', 'Burst')}</span>
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* 4 Key Platform Pillars Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-4">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-xs space-y-1">
              <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4" />
                <span>{t('مختبر افتراضي', 'Virtual Lab')}</span>
              </div>
              <div className="text-white font-black text-sm">{t('6 محطات استقصائية', '6 Interactive Labs')}</div>
              <div className="text-[11px] text-slate-400">{t('فحص pH وموصلية وتفاعلات', 'pH & Conductivity tests')}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-xs space-y-1">
              <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <Boxes className="w-4 h-4" />
                <span>{t('نمذجة جزيئية حية', '3D Modeling')}</span>
              </div>
              <div className="text-white font-black text-sm">{t('محاكاة بلورية 3D', 'Crystal Dynamics')}</div>
              <div className="text-[11px] text-slate-400">{t('تتبع حركة الأيونات والمجال', 'Ion mobility & fields')}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-xs space-y-1">
              <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>{t('مساعد كيميائي ذكي', 'AI Tutor')}</span>
              </div>
              <div className="text-white font-black text-sm">{t('استجابة فورية 24/7', 'Instant 24/7 Help')}</div>
              <div className="text-[11px] text-slate-400">{t('تفسير المعادلات والخطوات', 'Step-by-step guidance')}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-xs space-y-1">
              <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>{t('تقويم تشخيصي', 'Formative Quiz')}</span>
              </div>
              <div className="text-white font-black text-sm">{t('تغذية راجعة فورية', 'Instant Assessment')}</div>
              <div className="text-[11px] text-slate-400">{t('تحليل علمي لكل إجابة', 'Scientific rationale')}</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 3D MOLECULE & IONIZATION VISUAL ENGINE */}
      {/* ========================================================================= */}
      <section ref={threeDSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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

            {/* Prominent "Talk with the AI" Button */}
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