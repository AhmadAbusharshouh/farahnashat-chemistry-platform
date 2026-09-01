'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  ArrowRight,
  Boxes
} from 'lucide-react';
import { SUBSTANCES_DATA, ChemicalSubstance, INDICATORS_DATA, IndicatorData } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';
import { Molecule3DViewer } from '@/components/Molecule3DViewer';
import { Ionization3DChamber } from '@/components/Ionization3DChamber';

export default function VirtualLabPage() {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'ph_meter' | '3d_molecules' | 'conductivity' | 'metal_reaction' | 'indicators' | 'agriculture' | 'titration'>('ph_meter');

  // TAB 1: pH Meter State
  const [selectedSubstance, setSelectedSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[1]); // HCl default
  const [probeInserted, setProbeInserted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'acid' | 'base' | 'neutral'>('all');

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
      
      {/* Header - Sharp Architectural Style */}
      <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-emerald-100 text-emerald-950 font-mono text-xs font-bold border border-emerald-300">
              <Boxes className="w-3.5 h-3.5" />
              <span>{t('المختبر الاستقصائي الافتراضي المجسم 3D', 'Interactive 3D Virtual Chemistry Laboratory')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
              {t('مختبر كيمياء الصف التاسع التفاعلي (3D)', 'Grade 9 Chemistry Virtual Laboratory')}
            </h1>
          </div>

          {/* Sharp Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 border border-slate-300 text-xs font-bold">
            <button
              onClick={() => setActiveTab('ph_meter')}
              className={`px-3 py-1.5 transition ${
                activeTab === 'ph_meter' ? 'bg-slate-950 text-emerald-400 border border-slate-950' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('مقياس pH الرقمي', 'pH Meter')}
            </button>
            <button
              onClick={() => setActiveTab('3d_molecules')}
              className={`px-3 py-1.5 transition ${
                activeTab === '3d_molecules' ? 'bg-slate-950 text-emerald-400 border border-slate-950' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('الجزيئات 3D', '3D Molecules')}
            </button>
            <button
              onClick={() => setActiveTab('conductivity')}
              className={`px-3 py-1.5 transition ${
                activeTab === 'conductivity' ? 'bg-slate-950 text-emerald-400 border border-slate-950' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('الموصلية 3D', 'Conductivity 3D')}
            </button>
            <button
              onClick={() => setActiveTab('metal_reaction')}
              className={`px-3 py-1.5 transition ${
                activeTab === 'metal_reaction' ? 'bg-slate-950 text-emerald-400 border border-slate-950' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('تفاعل الفلزات (H₂)', 'Metals + Acids')}
            </button>
            <button
              onClick={() => setActiveTab('indicators')}
              className={`px-3 py-1.5 transition ${
                activeTab === 'indicators' ? 'bg-slate-950 text-emerald-400 border border-slate-950' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('الكواشف الخمسة', '5 Indicators')}
            </button>
            <button
              onClick={() => setActiveTab('agriculture')}
              className={`px-3 py-1.5 transition ${
                activeTab === 'agriculture' ? 'bg-slate-950 text-emerald-400 border border-slate-950' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('معالجة التربة', 'Soil Treatment')}
            </button>
            <button
              onClick={() => setActiveTab('titration')}
              className={`px-3 py-1.5 transition ${
                activeTab === 'titration' ? 'bg-slate-950 text-emerald-400 border border-slate-950' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('المعايرة والتعادل', 'Titration')}
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          {t(
            'بيئة استقصائية متطورة مبنية طبقاً لمنهاج كولينز للصف التاسع (ص 43 - 55)، تتيح نمذجة الجزيئات ثلاثية الأبعاد (3D)، مقارنة موصلية الكهارل، رصد تصاعد غاز الهيدروجين مع اختبار الفرقعة (Pop Test)، وفحص الكواشف ومعالجة التربة.',
            'Advanced simulation environment calibrated strictly against Collins Grade 9 Chemistry (pp. 43-55), featuring 3D molecular modeling, 3D ionization, metal-acid reactions, and soil remediation.'
          )}
        </p>
      </div>

      {/* TAB 1: Digital pH Meter Simulator */}
      {activeTab === 'ph_meter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Substance Chooser (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                {t('مواد المنهاج الدراسي (12 مادة):', 'Curriculum Substances:')}
              </h2>
              <div className="flex gap-1 text-[11px] font-bold">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-2 py-0.5 border ${categoryFilter === 'all' ? 'bg-slate-950 text-white border-slate-950' : 'bg-white text-slate-700 border-slate-300'}`}
                >
                  {t('الكل', 'All')}
                </button>
                <button
                  onClick={() => setCategoryFilter('acid')}
                  className={`px-2 py-0.5 border ${categoryFilter === 'acid' ? 'bg-red-700 text-white border-red-700' : 'bg-red-50 text-red-800 border-red-200'}`}
                >
                  {t('حمض', 'Acid')}
                </button>
                <button
                  onClick={() => setCategoryFilter('neutral')}
                  className={`px-2 py-0.5 border ${categoryFilter === 'neutral' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}
                >
                  {t('متعادل', 'Neutral')}
                </button>
                <button
                  onClick={() => setCategoryFilter('base')}
                  className={`px-2 py-0.5 border ${categoryFilter === 'base' ? 'bg-purple-700 text-white border-purple-700' : 'bg-purple-50 text-purple-800 border-purple-200'}`}
                >
                  {t('قاعدة', 'Base')}
                </button>
              </div>
            </div>
            
            <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
              {filteredSubstances.map((sub) => {
                const isSelected = selectedSubstance.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubstance(sub);
                      setProbeInserted(false);
                    }}
                    className={`w-full text-right p-3.5 border transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                        : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="space-y-0.5 text-right">
                      <div className="font-bold text-xs">{sub.name}</div>
                      <div className={`text-[11px] font-mono ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>{sub.formula} • {sub.curriculumPage}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${
                        isSelected ? 'bg-slate-900 border-slate-700 text-emerald-400' : 'bg-slate-100 border-slate-300 text-slate-700'
                      }`}>
                        pH {sub.ph.toFixed(1)}
                      </span>
                      <span 
                        className="w-3.5 h-3.5 border border-slate-400 shrink-0"
                        style={{ backgroundColor: sub.color }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* pH Meter Simulator Interactive Rig (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">{t('حجرة الفحص المخبري الرقمي', 'Digital Test Chamber')}</span>
                  <span className="text-[11px] font-mono text-slate-500">({selectedSubstance.curriculumPage})</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-950 bg-emerald-100 px-2.5 py-1 border border-emerald-300">
                  {selectedSubstance.formula}
                </span>
              </div>

              {/* Beaker & Digital Display Visual */}
              <div className="bg-slate-950 p-6 text-white text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[240px] border border-slate-800">
                <div className="space-y-2 z-10">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                    High-Precision Digital pH Meter 9000
                  </div>
                  <div className="text-5xl sm:text-6xl font-mono font-black tracking-wider text-emerald-400">
                    {probeInserted ? selectedSubstance.ph.toFixed(1) : '--.-'}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {probeInserted ? (
                      <span className="inline-flex items-center gap-1.5 bg-slate-900 px-3 py-1 border border-slate-700">
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
              <div className="flex gap-2">
                <button
                  onClick={() => setProbeInserted(!probeInserted)}
                  className={`flex-1 py-3.5 font-bold text-xs transition flex items-center justify-center gap-2 border ${
                    probeInserted
                      ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-800'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-900'
                  }`}
                >
                  <Pipette className="w-4 h-4" />
                  <span>{probeInserted ? t('رفع قطب المقياس من المحلول', 'Retract pH Electrode') : t('غمس قطب مقياس pH في المحلول', 'Immerse pH Electrode Probe')}</span>
                </button>

                <button
                  onClick={() => setProbeInserted(false)}
                  className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition"
                  title={t('إعادة ضبط', 'Reset')}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scientific Analysis Panel */}
            {probeInserted && (
              <div className="p-5 bg-slate-50 border border-slate-300 text-xs space-y-3 text-right">
                <h3 className="font-extrabold text-slate-900 flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="flex items-center gap-1.5 text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>التحليل الكيميائي لـ {selectedSubstance.name}:</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{selectedSubstance.curriculumPage}</span>
                </h3>

                <div className="bg-white p-2.5 border border-slate-300 space-y-1">
                  <div className="text-[11px] text-slate-500 font-bold">معادلة التأين في الماء:</div>
                  <div className="font-mono text-xs font-bold text-emerald-950 dir-ltr text-center">
                    {selectedSubstance.ionizationEquation}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate-700">
                  <p><strong>ورق تباع الشمس:</strong> {selectedSubstance.litmusReaction}</p>
                  <p><strong>أزرق البروموثيمول:</strong> {selectedSubstance.bromothymolReaction}</p>
                  <p><strong>الفينولفثالين:</strong> {selectedSubstance.phenolphthaleinReaction}</p>
                  <p><strong>الملفوف الأحمر:</strong> {selectedSubstance.cabbageReaction}</p>
                  <p className="sm:col-span-2"><strong>الاستخدام الحياتي والصناعي:</strong> {selectedSubstance.dailyUse}</p>
                  <p className="sm:col-span-2 text-amber-950 bg-amber-50 p-2.5 border border-amber-300">
                    <strong>إرشادات السلامة (ص 47):</strong> {selectedSubstance.safetyRule}
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: 3D Molecules Viewer */}
      {activeTab === '3d_molecules' && (
        <div className="space-y-6">
          <Molecule3DViewer />
        </div>
      )}

      {/* TAB 3: 3D Electrical Conductivity Chamber */}
      {activeTab === 'conductivity' && (
        <div className="space-y-6">
          <div className="border-2 border-slate-900 overflow-hidden relative group aspect-[21/9] bg-slate-950 max-h-[220px]">
            <Image
              src="/images/conductivity-experiment.png"
              alt="Electrical Conductivity Experiment"
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase bg-amber-950/80 px-2 py-0.5 border border-amber-700">
                  الموصلية الكهربائية وقوة الحموض والقواعد (ص 52 - 53)
                </span>
                <h3 className="text-lg font-black text-white">
                  مقارنة درجة التأين وتوهج المصباح بين الكهرل القوي والضعيف
                </h3>
              </div>
            </div>
          </div>

          <Ionization3DChamber />
        </div>
      )}

      {/* TAB 4: Metal Reactions with Acids (Mg / Zn + HCl -> H2) */}
      {activeTab === 'metal_reaction' && (
        <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-950">
                {t('محاكاة تفاعل الفلزات مع الحموض وإنتاج غاز الهيدروجين (ص 48، 52 - 53)', 'Metals + Acids Hydrogen Gas Evolution Simulator (pp. 48, 52-53)')}
              </h2>
              <p className="text-xs text-slate-600">
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
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-900 transition flex items-center gap-2"
            >
              <Flame className="w-4 h-4" />
              <span>{t('إسقاط شريط الفلز في أنبوب الحمض', 'Drop Metal Strip into Acid Tube')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Control Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">اختر الفلز (Metal):</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => { setSelectedMetal('Mg'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-3 border text-xs font-bold transition ${
                      selectedMetal === 'Mg' ? 'bg-emerald-50 border-emerald-500 text-emerald-950' : 'bg-white border-slate-300'
                    }`}
                  >
                    <div>المغنيسيوم Mg</div>
                    <div className="text-[10px] text-slate-500">نشاط فائق</div>
                  </button>
                  <button
                    onClick={() => { setSelectedMetal('Zn'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-3 border text-xs font-bold transition ${
                      selectedMetal === 'Zn' ? 'bg-emerald-50 border-emerald-500 text-emerald-950' : 'bg-white border-slate-300'
                    }`}
                  >
                    <div>الخارصين Zn</div>
                    <div className="text-[10px] text-slate-500">نشاط متوسط</div>
                  </button>
                  <button
                    onClick={() => { setSelectedMetal('Cu'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-3 border text-xs font-bold transition ${
                      selectedMetal === 'Cu' ? 'bg-emerald-50 border-emerald-500 text-emerald-950' : 'bg-white border-slate-300'
                    }`}
                  >
                    <div>النحاس Cu</div>
                    <div className="text-[10px] text-slate-500">لا يتفاعل</div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">اختر المحلول الحمضي (Acid):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setSelectedAcidForMetal('HCl'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-3 border text-xs font-bold transition ${
                      selectedAcidForMetal === 'HCl' ? 'bg-red-50 border-red-400 text-red-950' : 'bg-white border-slate-300'
                    }`}
                  >
                    <div>حمض قوي (HCl)</div>
                    <div className="text-[10px] text-slate-500">معدل تصاعد سريع</div>
                  </button>
                  <button
                    onClick={() => { setSelectedAcidForMetal('CH3COOH'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-3 border text-xs font-bold transition ${
                      selectedAcidForMetal === 'CH3COOH' ? 'bg-amber-50 border-amber-400 text-amber-950' : 'bg-white border-slate-300'
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
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs border border-amber-800 transition flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  <span>تقريب شظية مشتعلة لاختبار فرقعة غاز H₂ (Pop Test)</span>
                </button>
              )}
            </div>

            {/* Visual Reaction Chamber (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 p-8 text-white text-center space-y-6 border border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Gas Evolution Chamber</span>
                <div className="text-xl font-bold">
                  {selectedMetal === 'Cu' ? 'النحاس يقع بعد الهيدروجين في النشاط ولا يتفاعل' : `${selectedMetal} + ${selectedAcidForMetal}`}
                </div>
              </div>

              {/* Beaker / Test Tube Animation */}
              <div className="w-32 h-52 mx-auto border-4 border-slate-700 relative overflow-hidden bg-slate-900 flex flex-col justify-end p-2">
                <div className="w-full h-32 bg-sky-600/30 relative">
                  {reactionRunning && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-slate-400" />
                  )}

                  {reactionRunning && selectedMetal !== 'Cu' && (
                    <div className="absolute inset-0 flex flex-wrap justify-around items-end overflow-hidden p-2">
                      <span className="w-3 h-3 bg-white/70 animate-ping" />
                      <span className="w-2 h-2 bg-white/80 animate-bounce delay-100" />
                      <span className="w-3.5 h-3.5 bg-white/60 animate-ping delay-200" />
                      <span className="w-2.5 h-2.5 bg-white/90 animate-bounce delay-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Pop Test Result Alert */}
              {popTested && (
                <div className="p-3 bg-amber-500/20 border border-amber-400 text-amber-200 text-xs animate-pulse">
                  💥 <strong>صوت فرقعة مميز (Pop Sound)!</strong> يدل على اشتعال غاز الهيدروجين المتصاعد H₂ وتفاعله مع أكسجين الهواء.
                </div>
              )}

              {/* Equation Box */}
              <div className="bg-slate-900 p-3 border border-slate-800 font-mono text-xs text-emerald-300 dir-ltr">
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

      {/* TAB 5: 5 Indicators Station */}
      {activeTab === 'indicators' && (
        <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-950">
                {t('محطة الكواشف الخمسة الشاملة (ص 45، 49، 51، 55)', 'Five Chemical Indicators Spectrum Station (pp. 45, 49, 51, 55)')}
              </h2>
              <p className="text-xs text-slate-600">
                {t(
                  'استكشف تباع الشمس، الملفوف الأحمر، الفينولفثالين، أزرق البروموثيمول، والكاشف العام مع أي محلول تريده.',
                  'Test all 5 indicators against any acid, base, or neutral substance.'
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-4 space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider px-1">اختر الكاشف:</h3>
              {INDICATORS_DATA.map((ind) => {
                const isSelected = selectedIndicator.id === ind.id;
                return (
                  <button
                    key={ind.id}
                    onClick={() => {
                      setSelectedIndicator(ind);
                      setIndicatorTested(false);
                    }}
                    className={`w-full text-right p-3.5 border transition ${
                      isSelected
                        ? 'bg-slate-950 text-white border-slate-950'
                        : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="font-bold text-xs">{ind.name}</div>
                    <div className={`text-[11px] ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>{ind.curriculumReference} • {ind.phTransitionRange}</div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-8 bg-slate-50 p-6 border border-slate-300 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-slate-900">{selectedIndicator.name}</h4>
                  <p className="text-xs text-slate-600">{selectedIndicator.description}</p>
                </div>
                <button
                  onClick={() => setIndicatorTested(true)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-900 transition"
                >
                  إضافة قطرات الكاشف للمحلول
                </button>
              </div>

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
                      className={`p-2.5 border text-xs font-bold transition text-right ${
                        indicatorTestSubstance.id === sub.id ? 'bg-slate-950 text-emerald-300 border-slate-950' : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="truncate">{sub.name}</div>
                      <div className={`text-[10px] ${indicatorTestSubstance.id === sub.id ? 'text-emerald-400' : 'text-slate-500'}`}>
                        pH {sub.ph.toFixed(1)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 bg-red-50 border border-red-300">
                  <div className="text-[11px] text-red-800 font-bold mb-1">في الوسط الحمضي</div>
                  <div className="text-xs font-black text-red-950">
                    {selectedIndicator.id === 'litmus' && 'أحمر'}
                    {selectedIndicator.id === 'cabbage' && 'أحمر فاقع / وردي'}
                    {selectedIndicator.id === 'phenolphthalein' && 'عديم اللون (شفاف)'}
                    {selectedIndicator.id === 'bromothymol' && 'أصفر'}
                    {selectedIndicator.id === 'universal' && 'أحمر إلى برتقالي'}
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-300">
                  <div className="text-[11px] text-emerald-800 font-bold mb-1">في الوسط المتعادل (pH 7)</div>
                  <div className="text-xs font-black text-emerald-950">
                    {selectedIndicator.id === 'litmus' && 'لا يتغير'}
                    {selectedIndicator.id === 'cabbage' && 'بنفسجي طبيعي'}
                    {selectedIndicator.id === 'phenolphthalein' && 'عديم اللون'}
                    {selectedIndicator.id === 'bromothymol' && 'أخضر عشبي'}
                    {selectedIndicator.id === 'universal' && 'أخضر زمردي'}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-300">
                  <div className="text-[11px] text-purple-800 font-bold mb-1">في الوسط القاعدي</div>
                  <div className="text-xs font-black text-purple-950">
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
      )}

      {/* TAB 6: Agricultural Soil pH Remediation (الربط بالزراعة ص 55) */}
      {activeTab === 'agriculture' && (
        <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-950 bg-emerald-100 px-2.5 py-1 border border-emerald-300">
                الربط بالزراعة (كتاب كولينز ص 55)
              </span>
              <h2 className="text-xl font-black text-slate-950">
                معالجة حموضة التربة الزراعية بمحلول هيدروكسيد الكالسيوم Ca(OH)₂
              </h2>
            </div>

            <button
              onClick={() => { setSoilPh(4.8); setLimeDoses(0); }}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط العينة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-6 bg-slate-950 p-8 text-white text-center space-y-6 border border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Soil Sample pH Monitor</span>
                <div className="text-4xl font-mono font-black text-emerald-400">
                  pH = {soilPh.toFixed(1)}
                </div>
                <div className="text-xs text-slate-300">
                  {soilPh < 6.0 && '⚠️ تربة شديدة الحموضة تعيق نمو أغلب المحاصيل النباتية'}
                  {soilPh >= 6.0 && soilPh <= 7.5 && '🌱 تربة متوازنة ومثالية جداً للنمو الزراعي والامتصاص الجذري'}
                  {soilPh > 7.5 && 'تربة مائلة للقلوية'}
                </div>
              </div>

              <div className="w-36 h-36 mx-auto bg-slate-900 border border-slate-800 p-4 flex flex-col items-center justify-center">
                <Sprout className={`w-16 h-16 transition-all duration-500 ${
                  soilPh >= 6.0 && soilPh <= 7.5 ? 'text-emerald-400 scale-125' : 'text-amber-500 scale-90 opacity-60'
                }`} />
                <span className="text-[11px] font-bold text-slate-300 mt-2">
                  {soilPh >= 6.0 && soilPh <= 7.5 ? 'نبات سليم ومزدهر' : 'نبات مجهد بسبب الحموضة'}
                </span>
              </div>

              <div className="text-xs text-slate-400">
                جرعات الجير المطفأ Ca(OH)₂ المضافة: <strong className="text-white font-mono">{limeDoses}</strong> جرعات
              </div>
            </div>

            <div className="md:col-span-6 space-y-5 text-right">
              <div className="p-4 bg-emerald-50 border border-emerald-300 space-y-2">
                <h4 className="font-bold text-emerald-950 text-xs">معادلة معادلة حموضة التربة:</h4>
                <div className="font-mono text-xs font-bold text-emerald-950 dir-ltr bg-white p-2 border border-emerald-300">
                  2H⁺ (Soil Acid) + Ca(OH)₂ (aq) → Ca²⁺ (aq) + 2H₂O (l)
                </div>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  تتحد أيونات الهيدروكسيد OH⁻ الناتجة عن الجير المطفأ مع أيونات H⁺ الفائضة في التربة لمعادلتها ورفع الرقم الهيدروجيني إلى النطاق الأمثل (6.0 - 7.0).
                </p>
              </div>

              <button
                onClick={() => {
                  setSoilPh((prev) => Math.min(7.8, +(prev + 0.6).toFixed(1)));
                  setLimeDoses((d) => d + 1);
                }}
                disabled={soilPh >= 7.8}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs border border-emerald-900 transition flex items-center justify-center gap-2"
              >
                <Sprout className="w-4 h-4" />
                <span>إضافة جرعة هيدروكسيد الكالسيوم Ca(OH)₂ لمعادلة التربة (+0.6 pH)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TAB 7: Titration Chamber */}
      {activeTab === 'titration' && (
        <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-950">محاكاة تجربة المعايرة وتفاعل التعادل (Titration)</h2>
              <p className="text-xs text-slate-600">
                إضافة قطرات محلول هيدروكسيد الصوديوم القاعدي (NaOH) إلى كأس حمض الهيدروكلوريك (HCl) مع كاشف الفينولفثالين.
              </p>
            </div>
            <button
              onClick={() => setNaohDrops(0)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة التجربة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-6 bg-slate-950 p-8 text-center text-white space-y-6 border border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Flask Solution Status</span>
                <div className="text-3xl font-mono font-black text-emerald-400">
                  pH = {currentTitrationPh}
                </div>
                <div className="text-xs text-slate-300">
                  {naohDrops === 0 && 'محلول حمضي عديم اللون مع الفينولفثالين (pH 1.0)'}
                  {naohDrops > 0 && !isNeutralized && !isBasic && 'محلول حمضي يتناقص تركيز H⁺ فيه تدريجياً'}
                  {isNeutralized && '🎉 نقطة التكافؤ والتعادل! تحول إلى اللون الوردي الخفيف الدائم (pH 7.0)'}
                  {isBasic && 'محلول قاعدي زائد باللون الوردي/القرمزي الداكن (pH > 7)'}
                </div>
              </div>

              <div className="w-36 h-44 mx-auto border-4 border-slate-700 relative overflow-hidden flex flex-col justify-end p-2 bg-slate-900">
                <div 
                  className="w-full transition-all duration-300 opacity-90"
                  style={{
                    height: `${40 + (naohDrops * 2.5)}%`,
                    backgroundColor: isNeutralized 
                      ? '#f472b6' // Light Pink (Phenolphthalein end point)
                      : isBasic 
                      ? '#ec4899' // Deep Pink
                      : '#cbd5e1' // Clear
                  }}
                />
              </div>

              <div className="text-xs text-slate-400 font-mono">
                عدد قطرات NaOH المضافة: <span className="text-white font-bold">{naohDrops}</span> قطرة
              </div>
            </div>

            <div className="md:col-span-6 space-y-5 text-right">
              <div className="p-4 bg-emerald-50 border border-emerald-300 space-y-2">
                <h4 className="font-bold text-emerald-950 text-xs">معادلة تفاعل التعادل الأيونية:</h4>
                <div className="font-mono text-xs font-bold text-emerald-950 dir-ltr bg-white p-2 border border-emerald-300">
                  HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l) + Heat
                </div>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  تتحد أيونات H⁺ من الحمض مع أيونات OH⁻ من القاعدة لتكوين جزيئات الماء المتعادل وتترسب أملاح كلوريد الصوديوم.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setNaohDrops((prev) => Math.min(maxDrops, prev + 1))}
                  disabled={naohDrops >= maxDrops}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs border border-emerald-900 transition flex items-center justify-center gap-2"
                >
                  <Pipette className="w-4 h-4" />
                  <span>إضافة قطرة NaOH من السحاحة (+1 قطرة)</span>
                </button>

                <button
                  onClick={() => setNaohDrops((prev) => Math.min(maxDrops, prev + 5))}
                  disabled={naohDrops >= maxDrops}
                  className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs transition"
                >
                  إضافة 5 قطرات متتالية
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
