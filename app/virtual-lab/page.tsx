'use client';

import { useState } from 'react';
import { 
  FlaskConical, 
  Pipette, 
  Sparkles, 
  RotateCcw, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Lightbulb, 
  Flame, 
  Sprout, 
  Beaker, 
  Thermometer, 
  Activity,
  Droplets,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SUBSTANCES_DATA, ChemicalSubstance, INDICATORS_DATA, IndicatorData } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

export default function VirtualLabPage() {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'ph_meter' | 'conductivity' | 'metal_reaction' | 'indicators' | 'agriculture' | 'titration'>('ph_meter');

  // TAB 1: pH Meter State
  const [selectedSubstance, setSelectedSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[1]); // HCl default
  const [probeInserted, setProbeInserted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'acid' | 'base' | 'neutral'>('all');

  // TAB 2: Conductivity State
  const [conductivitySubstanceA, setConductivitySubstanceA] = useState<ChemicalSubstance>(SUBSTANCES_DATA[1]); // HCl (Strong)
  const [conductivitySubstanceB, setConductivitySubstanceB] = useState<ChemicalSubstance>(SUBSTANCES_DATA[3]); // CH3COOH (Weak)
  const [circuitClosed, setCircuitClosed] = useState(false);

  // TAB 3: Metal Reaction State
  const [selectedMetal, setSelectedMetal] = useState<'Mg' | 'Zn' | 'Cu'>('Mg');
  const [selectedAcidForMetal, setSelectedAcidForMetal] = useState<'HCl' | 'CH3COOH'>('HCl');
  const [reactionRunning, setReactionRunning] = useState(false);
  const [popTested, setPopTested] = useState(false);

  // TAB 4: Indicators State
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorData>(INDICATORS_DATA[0]);
  const [indicatorTestSubstance, setIndicatorTestSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[1]);
  const [indicatorTested, setIndicatorTested] = useState(false);

  // TAB 5: Agriculture Soil Correction State
  const [soilPh, setSoilPh] = useState(4.8); // Highly acidic soil
  const [limeDoses, setLimeDoses] = useState(0);

  // TAB 6: Titration State
  const [naohDrops, setNaohDrops] = useState(0); // drops
  const maxDrops = 24;
  const currentTitrationPh = Math.min(13.8, +(1.0 + (naohDrops * 0.55)).toFixed(1));
  const isNeutralized = naohDrops >= 10 && naohDrops <= 12;
  const isBasic = naohDrops > 12;

  const filteredSubstances = SUBSTANCES_DATA.filter((s) => {
    if (categoryFilter === 'acid') return s.type.startsWith('acid');
    if (categoryFilter === 'base') return s.type.startsWith('base');
    if (categoryFilter === 'neutral') return s.type === 'neutral';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {t('المختبر الاستقصائي الافتراضي الذكي', 'Interactive Digital Chemistry Laboratory')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
              {t('مختبر كيمياء الصف التاسع التفاعلي', 'Grade 9 Chemistry Virtual Laboratory')}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('ph_meter')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'ph_meter' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('مقياس pH الرقمي', 'pH Meter')}
            </button>
            <button
              onClick={() => setActiveTab('conductivity')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'conductivity' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('الموصلية وإضاءة المصباح', 'Conductivity')}
            </button>
            <button
              onClick={() => setActiveTab('metal_reaction')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'metal_reaction' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('تفاعل الفلزات مع الحموض', 'Metals + Acids')}
            </button>
            <button
              onClick={() => setActiveTab('indicators')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'indicators' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('محطة الكواشف الخمسة', '5 Indicators')}
            </button>
            <button
              onClick={() => setActiveTab('agriculture')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'agriculture' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('معالجة التربة الزراعية', 'Soil Neutralizer')}
            </button>
            <button
              onClick={() => setActiveTab('titration')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'titration' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('المعايرة والتعادل', 'Titration')}
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
          {t(
            'بيئة محاكاة استقصائية شاملة مبنية طبقاً لمنهاج كولينز للصف التاسع (ص 43 - 55). تمكّن المعلمة والطالبات من فحص المواد، مقارنة موصلية الحموض القوية والضعيفة، رصد تصاعد غاز الهيدروجين، واستكشاف الكواشف بدقة متناهية.',
            'Comprehensive virtual simulator calibrated strictly against Collins Grade 9 curriculum (pp. 43-55). Compare strong vs weak electrolyte conductivity, metal-acid reactions, 5 indicators, and soil neutralization.'
          )}
        </p>
      </div>

      {/* TAB 1: Digital pH Meter Simulator */}
      {activeTab === 'ph_meter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Substance Chooser (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider px-1">
                {t('اختر مادة من المنهاج (12 مادة):', 'Select Curriculum Substance:')}
              </h2>
              <div className="flex gap-1 text-[11px] font-bold">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-2 py-0.5 rounded-md ${categoryFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  {t('الكل', 'All')}
                </button>
                <button
                  onClick={() => setCategoryFilter('acid')}
                  className={`px-2 py-0.5 rounded-md ${categoryFilter === 'acid' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700'}`}
                >
                  {t('حمض', 'Acid')}
                </button>
                <button
                  onClick={() => setCategoryFilter('neutral')}
                  className={`px-2 py-0.5 rounded-md ${categoryFilter === 'neutral' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'}`}
                >
                  {t('متعادل', 'Neutral')}
                </button>
                <button
                  onClick={() => setCategoryFilter('base')}
                  className={`px-2 py-0.5 rounded-md ${categoryFilter === 'base' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700'}`}
                >
                  {t('قاعدة', 'Base')}
                </button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filteredSubstances.map((sub) => {
                const isSelected = selectedSubstance.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubstance(sub);
                      setProbeInserted(false);
                    }}
                    className={`w-full text-right p-3.5 rounded-2xl border transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-0.5 text-right">
                      <div className="font-bold text-xs text-slate-900">{sub.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{sub.formula} • {sub.curriculumPage}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        pH {sub.ph.toFixed(1)}
                      </span>
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                        style={{ backgroundColor: sub.color }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* pH Meter Simulator Interactive Rig (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 flex flex-col justify-between">
            
            {/* Rig Stage */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">{t('حجرة الفحص المخبري الرقمي', 'Digital Test Chamber')}</span>
                  <span className="text-[11px] font-bold text-slate-400">({selectedSubstance.curriculumPage})</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {selectedSubstance.formula}
                </span>
              </div>

              {/* Beaker & Digital Display Visual */}
              <div className="bg-slate-950 rounded-2xl p-6 text-white text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[240px]">
                
                {/* Live Digital Meter Readout */}
                <div className="space-y-2 z-10">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                    High-Precision Digital pH Meter 9000
                  </div>
                  <div className="text-5xl sm:text-6xl font-mono font-black tracking-wider text-emerald-400">
                    {probeInserted ? selectedSubstance.ph.toFixed(1) : '--.-'}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {probeInserted ? (
                      <span className="inline-flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700">
                        <span>{selectedSubstance.typeName}</span>
                        <span>•</span>
                        <span>[H⁺]: {selectedSubstance.h_ion_relative}%</span>
                        <span>•</span>
                        <span>[OH⁻]: {selectedSubstance.oh_ion_relative}%</span>
                      </span>
                    ) : (
                      t('القطب غير مغموس في المحلول (اضغط لغمس القطب)', 'Electrode probe suspended outside solution')
                    )}
                  </div>
                </div>

                {/* Beaker Fluid Simulation at Bottom */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-20 opacity-80 transition-all duration-500"
                  style={{ backgroundColor: probeInserted ? selectedSubstance.color : '#334155' }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setProbeInserted(!probeInserted)}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                    probeInserted
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  <Pipette className="w-4 h-4" />
                  <span>{probeInserted ? t('رفع قطب المقياس من المحلول', 'Retract pH Electrode') : t('غمس قطب مقياس pH في المحلول', 'Immerse pH Electrode Probe')}</span>
                </button>

                <button
                  onClick={() => setProbeInserted(false)}
                  className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                  title={t('إعادة ضبط', 'Reset')}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scientific Analysis Panel */}
            {probeInserted && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3 text-right">
                <h3 className="font-extrabold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>التحليل الكيميائي لـ {selectedSubstance.name}:</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{selectedSubstance.curriculumPage}</span>
                </h3>

                {/* Chemical Equation Box */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-[11px] text-slate-400 font-bold">معادلة التأين في الماء:</div>
                  <div className="font-mono text-xs font-bold text-emerald-900 dir-ltr text-center">
                    {selectedSubstance.ionizationEquation}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                  <p><strong>كاشف تباع الشمس:</strong> {selectedSubstance.litmusReaction}</p>
                  <p><strong>كاشف أزرق البروموثيمول:</strong> {selectedSubstance.bromothymolReaction}</p>
                  <p><strong>كاشف الفينولفثالين:</strong> {selectedSubstance.phenolphthaleinReaction}</p>
                  <p><strong>كاشف الملفوف الأحمر:</strong> {selectedSubstance.cabbageReaction}</p>
                  <p className="sm:col-span-2"><strong>الاستخدام الحياتي والصناعي:</strong> {selectedSubstance.dailyUse}</p>
                  <p className="sm:col-span-2 text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    <strong>إرشادات السلامة (ص 47):</strong> {selectedSubstance.safetyRule}
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: Electrical Conductivity & Lamp Brightness Tester */}
      {activeTab === 'conductivity' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">
                {t('محاكاة التوصيل الكهربائي وقوة الحموض والقواعد (ص 48، 52 - 53)', 'Electrical Conductivity & Strength Simulator (pp. 48, 52-53)')}
              </h2>
              <p className="text-xs text-slate-500">
                {t(
                  'مقارنة حية لشدة إضاءة المصباح ودرجة التأين (درجة تفكك الجزيئات إلى أيونات حرة الحركة H⁺ و OH⁻) بين كهرل قوي وكهرل ضعيف متساويين بالتركيز.',
                  'Live comparison of lamp glow and ion density between strong electrolytes (100% ionization, single arrow →) and weak electrolytes (partial ionization ⇌).'
                )}
              </p>
            </div>

            <button
              onClick={() => setCircuitClosed(!circuitClosed)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
                circuitClosed
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{circuitClosed ? t('فتح الدارة الكهربائية (إيقاف التيار)', 'Open Circuit (Stop Current)') : t('إغلاق الدارة الكهربائية (تشغيل التيار)', 'Close Circuit (Apply Voltage)')}</span>
            </button>
          </div>

          {/* Side by Side Rig Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Rig A: Strong Electrolyte */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-6 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                    حمض قوي (تأين كلي →)
                  </span>
                  <span className="font-mono text-xs text-slate-400">HCl 0.1 M</span>
                </div>
                <h3 className="font-bold text-base text-slate-100">محلول حمض الهيدروكلوريك HCl</h3>
                <p className="text-[11px] text-slate-400">
                  يتأين كلياً في الماء منتجاً وفرة هائلة من أيونات H⁺ و Cl⁻ الحرة الحركة.
                </p>
              </div>

              {/* Lamp & Beaker Visual */}
              <div className="text-center py-6 relative">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ${
                  circuitClosed 
                    ? 'bg-yellow-300 text-yellow-950 shadow-[0_0_50px_rgba(253,224,71,0.9)] scale-110' 
                    : 'bg-slate-800 text-slate-600'
                }`}>
                  <Lightbulb className="w-10 h-10" />
                </div>
                <div className="mt-4 font-bold text-xs text-yellow-300">
                  {circuitClosed ? '💡 إضاءة قوية وساطعة جداً (موصل ممتاز)' : 'المصباح مطفأ'}
                </div>

                {/* Animated Ion Simulation */}
                {circuitClosed && (
                  <div className="flex justify-center gap-2 mt-4 font-mono text-[11px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-red-600/80 text-white animate-bounce">H⁺</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-600/80 text-white animate-bounce delay-100">Cl⁻</span>
                    <span className="px-2 py-0.5 rounded bg-red-600/80 text-white animate-bounce delay-200">H⁺</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-600/80 text-white animate-bounce delay-300">Cl⁻</span>
                  </div>
                )}
              </div>

              {/* Equation */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 text-center dir-ltr">
                HCl (aq) → H⁺ (aq) + Cl⁻ (aq)
              </div>
            </div>

            {/* Rig B: Weak Electrolyte */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-6 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-md border border-amber-800">
                    حمض ضعيف (تأين جزئي ⇌)
                  </span>
                  <span className="font-mono text-xs text-slate-400">CH₃COOH 0.1 M</span>
                </div>
                <h3 className="font-bold text-base text-slate-100">محلول حمض الإيثانويك (الأسيتيك)</h3>
                <p className="text-[11px] text-slate-400">
                  يتأين جزئياً فقط وتبقى أغلب الجزيئات متماسكة مع قلة من الأيونات الحرة.
                </p>
              </div>

              {/* Lamp & Beaker Visual */}
              <div className="text-center py-6 relative">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ${
                  circuitClosed 
                    ? 'bg-amber-400/60 text-amber-950 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-100' 
                    : 'bg-slate-800 text-slate-600'
                }`}>
                  <Lightbulb className="w-10 h-10" />
                </div>
                <div className="mt-4 font-bold text-xs text-amber-300">
                  {circuitClosed ? '💡 إضاءة خافتة وضعيفة (موصل ضعيف)' : 'المصباح مطفأ'}
                </div>

                {/* Animated Ion Simulation */}
                {circuitClosed && (
                  <div className="flex justify-center gap-2 mt-4 font-mono text-[11px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-red-600/40 text-white">H⁺</span>
                    <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300">CH₃COOH</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-600/40 text-white">CH₃COO⁻</span>
                  </div>
                )}
              </div>

              {/* Equation */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-amber-300 text-center dir-ltr">
                CH₃COOH (aq) ⇌ H⁺ (aq) + CH₃COO⁻ (aq)
              </div>
            </div>

          </div>

          {/* Curriculum Key Takeaway (ص 52) */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
            <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>الاستنتاج العلمي وفق منهاج كولينز (ص 52):</span>
            </h4>
            <p className="leading-relaxed">
              كلما كان الحمض أو القاعدة أقوى، زادت درجة تأينه في الماء واحتوى محلوله على نسبة أكبر من الأيونات الموجبة والسالبة الحرة الحركة، فزادت قدرته على توصيل التيار الكهربائي وظهرت إضاءة المصباح أكثر سطوعاً.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Reaction with Metals */}
      {activeTab === 'metal_reaction' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">
                {t('محاكاة تفاعل الفلزات مع الحموض وإنتاج غاز الهيدروجين (ص 48، 52 - 53)', 'Metals + Acids Hydrogen Gas Evolution Simulator (pp. 48, 52-53)')}
              </h2>
              <p className="text-xs text-slate-500">
                {t(
                  'رصد تفاعل إحلال فلز المغنيسيوم Mg أو الخارصين Zn في حمض قوي HCl مقابل حمض ضعيف CH₃COOH، وملاحظة سرعة تصاعد فقاعات H₂ واختبار الشظية المشتعلة (Pop Test).',
                  'Metal single displacement reaction releasing hydrogen gas H2(g) and metal salts. Test flame pop reaction.'
                )}
              </p>
            </div>

            <button
              onClick={() => {
                setReactionRunning(true);
                setPopTested(false);
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition flex items-center gap-2"
            >
              <Flame className="w-4 h-4" />
              <span>{t('إسقاط شريط الفلز في أنبوب الحمض', 'Drop Metal Strip into Acid Tube')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Control Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">اختر الفلز (Metal):</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => { setSelectedMetal('Mg'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      selectedMetal === 'Mg' ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-1 ring-emerald-300' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>المغنيسيوم Mg</div>
                    <div className="text-[10px] text-slate-400">نشاط سريع جداً</div>
                  </button>
                  <button
                    onClick={() => { setSelectedMetal('Zn'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      selectedMetal === 'Zn' ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-1 ring-emerald-300' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>الخارصين Zn</div>
                    <div className="text-[10px] text-slate-400">نشاط متوسط</div>
                  </button>
                  <button
                    onClick={() => { setSelectedMetal('Cu'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      selectedMetal === 'Cu' ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-1 ring-emerald-300' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>النحاس Cu</div>
                    <div className="text-[10px] text-slate-400">لا يتفاعل</div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">اختر المحلول الحمضي (Acid):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setSelectedAcidForMetal('HCl'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      selectedAcidForMetal === 'HCl' ? 'bg-red-50 border-red-300 text-red-950 ring-1 ring-red-300' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>حمض قوي (HCl)</div>
                    <div className="text-[10px] text-slate-500">معدل تصاعد سريع</div>
                  </button>
                  <button
                    onClick={() => { setSelectedAcidForMetal('CH3COOH'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-3 rounded-xl border text-xs font-bold transition ${
                      selectedAcidForMetal === 'CH3COOH' ? 'bg-amber-50 border-amber-300 text-amber-950 ring-1 ring-amber-300' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>حمض ضعيف (CH₃COOH)</div>
                    <div className="text-[10px] text-slate-500">معدل تصاعد بطيء</div>
                  </button>
                </div>
              </div>

              {reactionRunning && selectedMetal !== 'Cu' && (
                <button
                  onClick={() => setPopTested(true)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs shadow-xs transition flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  <span>تقريب شظية مشتعلة لاختبار فرقعة غاز H₂ (Pop Test)</span>
                </button>
              )}
            </div>

            {/* Visual Reaction Chamber (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-8 text-white text-center space-y-6 relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Gas Evolution Chamber</span>
                <div className="text-xl font-bold">
                  {selectedMetal === 'Cu' ? 'النحاس يقع بعد الهيدروجين في النشاط ولا يتفاعل' : `${selectedMetal} + ${selectedAcidForMetal}`}
                </div>
              </div>

              {/* Beaker / Test Tube Animation */}
              <div className="w-32 h-52 mx-auto border-4 border-slate-700 rounded-b-3xl relative overflow-hidden bg-slate-900 flex flex-col justify-end p-2">
                {/* Acid Fluid */}
                <div className="w-full h-32 bg-sky-600/30 rounded-b-2xl relative">
                  {/* Metal Strip at bottom */}
                  {reactionRunning && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-slate-400 rounded-sm" />
                  )}

                  {/* Gas Bubbles */}
                  {reactionRunning && selectedMetal !== 'Cu' && (
                    <div className="absolute inset-0 flex flex-wrap justify-around items-end overflow-hidden p-2">
                      <span className="w-3 h-3 bg-white/70 rounded-full animate-ping" />
                      <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce delay-100" />
                      <span className="w-3.5 h-3.5 bg-white/60 rounded-full animate-ping delay-200" />
                      <span className="w-2.5 h-2.5 bg-white/90 rounded-full animate-bounce delay-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Pop Test Result Alert */}
              {popTested && (
                <div className="p-3 bg-amber-500/20 border border-amber-400 text-amber-200 rounded-xl text-xs animate-pulse">
                  💥 <strong>صوت فرقعة مميز (Pop Sound)!</strong> يدل على اشتعال غاز الهيدروجين المتصاعد H₂ وتفاعله مع أكسجين الهواء.
                </div>
              )}

              {/* Equation Box */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 dir-ltr">
                {selectedMetal === 'Mg' && selectedAcidForMetal === 'HCl' && 'Mg (s) + 2HCl (aq) → MgCl₂ (aq) + H₂ (g) ↑'}
                {selectedMetal === 'Zn' && selectedAcidForMetal === 'HCl' && 'Zn (s) + 2HCl (aq) → ZnCl₂ (aq) + H₂ (g) ↑'}
                {selectedMetal === 'Mg' && selectedAcidForMetal === 'CH3COOH' && 'Mg (s) + 2CH₃COOH (aq) → (CH₃COO)₂Mg (aq) + H₂ (g) ↑'}
                {selectedMetal === 'Zn' && selectedAcidForMetal === 'CH3COOH' && 'Zn (s) + 2CH₃COOH (aq) → (CH₃COO)₂Zn (aq) + H₂ (g) ↑'}
                {selectedMetal === 'Cu' && 'Cu (s) + HCl (aq) → No Reaction (لا يحدث تفاعل)'}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: 5 Indicators Station */}
      {activeTab === 'indicators' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">
                {t('محطة الكواشف الخمسة الشاملة (ص 45، 49، 51، 55)', 'Five Chemical Indicators Spectrum Station (pp. 45, 49, 51, 55)')}
              </h2>
              <p className="text-xs text-slate-500">
                {t(
                  'استكشف تباع الشمس، الملفوف الأحمر، الفينولفثالين، أزرق البروموثيمول، والكاشف العام مع أي محلول تريده.',
                  'Test all 5 indicators against any acid, base, or neutral substance.'
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Indicators Selector (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider px-1">اختر الكاشف:</h3>
              {INDICATORS_DATA.map((ind) => {
                const isSelected = selectedIndicator.id === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => {
                      setSelectedIndicator(ind);
                      setIndicatorTested(false);
                    }}
                    className={`w-full text-right p-3.5 rounded-2xl border transition ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{ind.name}</div>
                    <div className="text-[11px] text-slate-400">{ind.curriculumReference} • {ind.phTransitionRange}</div>
                  </button>
                );
              })}
            </div>

            {/* Test Arena (8 cols) */}
            <div className="lg:col-span-8 bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-slate-900">{selectedIndicator.name}</h4>
                  <p className="text-xs text-slate-500">{selectedIndicator.description}</p>
                </div>
                <button
                  onClick={() => setIndicatorTested(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
                >
                  إضافة قطرات الكاشف للمحلول
                </button>
              </div>

              {/* Substance Selector for Indicator */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">اختر العينة المراد فحصها:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SUBSTANCES_DATA.slice(0, 8).map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setIndicatorTestSubstance(sub);
                        setIndicatorTested(false);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition text-right ${
                        indicatorTestSubstance.id === sub.id ? 'bg-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="truncate">{sub.name}</div>
                      <div className={`text-[10px] ${indicatorTestSubstance.id === sub.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                        pH {sub.ph.toFixed(1)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Reaction Outcome */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-600">نتيجة الفحص البصري</span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    pH {indicatorTestSubstance.ph.toFixed(1)} ({indicatorTestSubstance.typeName})
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                    <div className="text-[11px] text-red-700 font-bold mb-1">في الوسط الحمضي</div>
                    <div className="text-xs font-extrabold text-red-950">
                      {selectedIndicator.id === 'litmus' && 'أحمر'}
                      {selectedIndicator.id === 'cabbage' && 'أحمر فاقع / وردي'}
                      {selectedIndicator.id === 'phenolphthalein' && 'عديم اللون (شفاف)'}
                      {selectedIndicator.id === 'bromothymol' && 'أصفر'}
                      {selectedIndicator.id === 'universal' && 'أحمر إلى برتقالي'}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-[11px] text-emerald-700 font-bold mb-1">في الوسط المتعادل (pH 7)</div>
                    <div className="text-xs font-extrabold text-emerald-950">
                      {selectedIndicator.id === 'litmus' && 'لا يتغير'}
                      {selectedIndicator.id === 'cabbage' && 'بنفسجي طبيعي'}
                      {selectedIndicator.id === 'phenolphthalein' && 'عديم اللون'}
                      {selectedIndicator.id === 'bromothymol' && 'أخضر عشبي'}
                      {selectedIndicator.id === 'universal' && 'أخضر زمردي'}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                    <div className="text-[11px] text-purple-700 font-bold mb-1">في الوسط القاعدي</div>
                    <div className="text-xs font-extrabold text-purple-950">
                      {selectedIndicator.id === 'litmus' && 'أزرق'}
                      {selectedIndicator.id === 'cabbage' && 'أزرق ثم أخضر ثم أصفر'}
                      {selectedIndicator.id === 'phenolphthalein' && 'زهري فاقع (Pink)'}
                      {selectedIndicator.id === 'bromothymol' && 'أزرق صريح'}
                      {selectedIndicator.id === 'universal' && 'أزرق إلى بنفسجي'}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 5: Agricultural Soil pH Remediation (الربط بالزراعة ص 55) */}
      {activeTab === 'agriculture' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                الربط بالزراعة (كتاب كولينز ص 55)
              </span>
              <h2 className="text-xl font-black text-slate-900">
                معالجة حموضة التربة الزراعية بمحلول هيدروكسيد الكالسيوم Ca(OH)₂
              </h2>
            </div>

            <button
              onClick={() => { setSoilPh(4.8); setLimeDoses(0); }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط العينة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Soil Chamber (6 cols) */}
            <div className="md:col-span-6 bg-slate-900 rounded-3xl p-8 text-white text-center space-y-6 relative">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Soil Sample pH Monitor</span>
                <div className="text-4xl font-mono font-black text-emerald-300">
                  pH = {soilPh.toFixed(1)}
                </div>
                <div className="text-xs text-slate-300">
                  {soilPh < 6.0 && '⚠️ تربة شديدة الحموضة تعيق نمو أغلب المحاصيل النباتية'}
                  {soilPh >= 6.0 && soilPh <= 7.5 && '🌱 تربة متوازنة ومثالية جداً للنمو الزراعي والامتصاص الجذري'}
                  {soilPh > 7.5 && 'تربة مائلة للقلوية'}
                </div>
              </div>

              {/* Plant Health Simulation */}
              <div className="w-36 h-36 mx-auto rounded-2xl bg-amber-950/40 border border-amber-800/60 p-4 flex flex-col items-center justify-center">
                <Sprout className={`w-16 h-16 transition-all duration-500 ${
                  soilPh >= 6.0 && soilPh <= 7.5 ? 'text-emerald-400 scale-125' : 'text-amber-600 scale-90 opacity-60'
                }`} />
                <span className="text-[11px] font-bold text-slate-300 mt-2">
                  {soilPh >= 6.0 && soilPh <= 7.5 ? 'نبات سليم ومزدهر' : 'نبات مجهد بسبب الحموضة'}
                </span>
              </div>

              <div className="text-xs text-slate-400">
                جرعات الجير المطفأ Ca(OH)₂ المضافة: <strong className="text-white">{limeDoses}</strong> جرعات
              </div>
            </div>

            {/* Treatment Controls (6 cols) */}
            <div className="md:col-span-6 space-y-5 text-right">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-900 text-xs">معادلة معادلة حموضة التربة:</h4>
                <div className="font-mono text-xs font-bold text-emerald-800 dir-ltr bg-white p-2 rounded-lg border border-emerald-200">
                  2H⁺ (Soil Acid) + Ca(OH)₂ (aq) → Ca²⁺ (aq) + 2H₂O (l)
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  تتحد أيونات الهيدروكسيد OH⁻ الناتجة عن الجير المطفأ مع أيونات H⁺ الفائضة في التربة لمعادلتها ورفع الرقم الهيدروجيني إلى النطاق الأمثل (6.0 - 7.0).
                </p>
              </div>

              <button
                onClick={() => {
                  setSoilPh((prev) => Math.min(7.8, +(prev + 0.6).toFixed(1)));
                  setLimeDoses((d) => d + 1);
                }}
                disabled={soilPh >= 7.8}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold rounded-xl text-xs shadow-xs transition flex items-center justify-center gap-2"
              >
                <Sprout className="w-4 h-4" />
                <span>إضافة جرعة هيدروكسيد الكالسيوم Ca(OH)₂ لمعادلة التربة (+0.6 pH)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TAB 6: Titration Chamber */}
      {activeTab === 'titration' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">محاكاة تجربة المعايرة وتفاعل التعادل (Titration)</h2>
              <p className="text-xs text-slate-500">
                إضافة قطرات محلول هيدروكسيد الصوديوم القاعدي (NaOH) إلى كأس حمض الهيدروكلوريك (HCl) مع كاشف الفينولفثالين.
              </p>
            </div>
            <button
              onClick={() => setNaohDrops(0)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة التجربة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Visual Chamber (6 cols) */}
            <div className="md:col-span-6 bg-slate-900 rounded-3xl p-8 text-center text-white space-y-6 relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Flask Solution Status</span>
                <div className="text-3xl font-mono font-black text-emerald-300">
                  pH = {currentTitrationPh}
                </div>
                <div className="text-xs text-slate-300">
                  {naohDrops === 0 && 'محلول حمضي عديم اللون مع الفينولفثالين (pH 1.0)'}
                  {naohDrops > 0 && !isNeutralized && !isBasic && 'محلول حمضي يتناقص تركيز H⁺ فيه تدريجياً'}
                  {isNeutralized && '🎉 نقطة التكافؤ والتعادل! تحول إلى اللون الوردي الخفيف الدائم (pH 7.0)'}
                  {isBasic && 'محلول قاعدي زائد باللون الوردي/القرمزي الداكن (pH > 7)'}
                </div>
              </div>

              {/* Chemical Color Beaker Simulator */}
              <div className="w-36 h-44 mx-auto border-4 border-slate-700 rounded-b-3xl relative overflow-hidden flex flex-col justify-end p-2 bg-slate-800">
                <div 
                  className="w-full transition-all duration-300 rounded-b-2xl opacity-90"
                  style={{
                    height: `${40 + (naohDrops * 2.5)}%`,
                    backgroundColor: isNeutralized 
                      ? '#f472b6' // Light Pink (Phenolphthalein end point)
                      : isBasic 
                      ? '#ec4899' // Deep Pink
                      : '#cbd5e1' // Clear / water-like in acid
                  }}
                />
              </div>

              <div className="text-xs text-slate-400 font-mono">
                عدد قطرات NaOH المضافة: <span className="text-white font-bold">{naohDrops}</span> قطرة
              </div>
            </div>

            {/* Controls and Theory (6 cols) */}
            <div className="md:col-span-6 space-y-5 text-right">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-900 text-xs">معادلة تفاعل التعادل الأيونية:</h4>
                <div className="font-mono text-xs font-bold text-emerald-800 dir-ltr bg-white p-2 rounded-lg border border-emerald-200">
                  HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l) + Heat
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  تتحد أيونات H⁺ من الحمض مع أيونات OH⁻ من القاعدة لتكوين جزيئات الماء المتعادل وتترسب أملاح كلوريد الصوديوم.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setNaohDrops((prev) => Math.min(maxDrops, prev + 1))}
                  disabled={naohDrops >= maxDrops}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold rounded-xl text-xs shadow-xs transition flex items-center justify-center gap-2"
                >
                  <Pipette className="w-4 h-4" />
                  <span>إضافة قطرة NaOH من السحاحة (+1 قطرة)</span>
                </button>

                <button
                  onClick={() => setNaohDrops((prev) => Math.min(maxDrops, prev + 5))}
                  disabled={naohDrops >= maxDrops}
                  className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold rounded-xl text-xs transition"
                >
                  إضافة 5 قطرات متتالية
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                💡 <strong>ملاحظة المنهاج:</strong> نقطة التعادل الدقيقة تحدث عند إضافة ما بين 10 إلى 12 قطرة حيث يستقر اللون الوردي الفاتح معلناً نهاية المعايرة.
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
