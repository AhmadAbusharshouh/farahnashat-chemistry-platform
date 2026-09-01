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
import { Indicators3DLab } from '@/components/Indicators3DLab';

export default function VirtualLabPage() {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'indicators' | 'ph_meter' | '3d_molecules' | 'conductivity' | 'metal_reaction' | 'agriculture' | 'titration'>('indicators');

  // TAB 1: pH Meter State
  const [selectedSubstance, setSelectedSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[1]);
  const [probeInserted, setProbeInserted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'acid' | 'base' | 'neutral'>('all');

  // TAB 4: Metal Reaction State
  const [selectedMetal, setSelectedMetal] = useState<'Mg' | 'Zn' | 'Cu'>('Mg');
  const [selectedAcidForMetal, setSelectedAcidForMetal] = useState<'HCl' | 'CH3COOH'>('HCl');
  const [reactionRunning, setReactionRunning] = useState(false);
  const [popTested, setPopTested] = useState(false);

  // TAB 5: Indicators State
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorData>(INDICATORS_DATA[0]);
  const [indicatorTestSubstance, setIndicatorTestSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[1]);
  const [indicatorTested, setIndicatorTested] = useState(false);

  // TAB 6: Agriculture Soil State
  const [soilPh, setSoilPh] = useState(4.8);
  const [limeDoses, setLimeDoses] = useState(0);

  // TAB 7: Titration State
  const [naohDrops, setNaohDrops] = useState(0);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header - Clean Light Theme */}
      <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-slate-900">
              {t('مختبر الكيمياء الافتراضي الاستقصائي (3D)', 'Interactive 3D Virtual Chemistry Laboratory')}
            </h1>
            <p className="text-xs text-slate-500">
              {t('محاكاة رقمية تفاعلية للمفاهيم والتجارب الكيميائية', 'Digital interactive simulation for chemical reactions and 3D modeling')}
            </p>
          </div>

          {/* Clean Sharp Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-50 p-1 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('indicators')}
              className={`px-3.5 py-2 transition flex items-center gap-1.5 ${
                activeTab === 'indicators' ? 'bg-emerald-700 text-white shadow-2xs font-black' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t('الكواشف الخمسة (3D)', '5 Indicators (3D)')}</span>
            </button>
            <button
              onClick={() => setActiveTab('ph_meter')}
              className={`px-3 py-2 transition ${
                activeTab === 'ph_meter' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('مقياس pH', 'pH Meter')}
            </button>
            <button
              onClick={() => setActiveTab('3d_molecules')}
              className={`px-3 py-2 transition ${
                activeTab === '3d_molecules' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('الجزيئات 3D', '3D Molecules')}
            </button>
            <button
              onClick={() => setActiveTab('conductivity')}
              className={`px-3 py-2 transition ${
                activeTab === 'conductivity' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('الموصلية 3D', 'Conductivity 3D')}
            </button>
            <button
              onClick={() => setActiveTab('metal_reaction')}
              className={`px-3 py-2 transition ${
                activeTab === 'metal_reaction' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('تفاعل الفلزات (H₂)', 'Metals + Acids')}
            </button>
            <button
              onClick={() => setActiveTab('agriculture')}
              className={`px-3 py-2 transition ${
                activeTab === 'agriculture' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('معالجة التربة', 'Soil Treatment')}
            </button>
            <button
              onClick={() => setActiveTab('titration')}
              className={`px-3 py-2 transition ${
                activeTab === 'titration' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t('المعايرة', 'Titration')}
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Digital pH Meter Simulator */}
      {activeTab === 'ph_meter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-xs font-bold text-slate-700">
                {t('اختر مادة للفحص المخبري:', 'Select Substance:')}
              </h2>
              <div className="flex gap-1 text-[11px] font-bold">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-2 py-0.5 border ${categoryFilter === 'all' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-slate-700 border-slate-200'}`}
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
            
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredSubstances.map((sub) => {
                const isSelected = selectedSubstance.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubstance(sub);
                      setProbeInserted(false);
                    }}
                    className={`w-full text-right p-3 border transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="space-y-0.5 text-right">
                      <div className="text-xs">{sub.name}</div>
                      <div className="text-[11px] font-mono text-slate-500">{sub.formula} • {sub.curriculumPage}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 border bg-slate-50 border-slate-200 text-slate-700">
                        pH {sub.ph.toFixed(1)}
                      </span>
                      <span 
                        className="w-3 h-3 border border-slate-300 shrink-0"
                        style={{ backgroundColor: sub.color }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 space-y-5 flex flex-col justify-between shadow-2xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-700">{t('حجرة الفحص المخبري الرقمي', 'Digital Test Chamber')}</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 border border-emerald-200">
                  {selectedSubstance.formula}
                </span>
              </div>

              {/* Beaker & Digital Display (Light Theme) */}
              <div className="bg-slate-50 p-6 text-slate-900 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] border border-slate-200">
                <div className="space-y-2 z-10">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    High-Precision Digital pH Meter
                  </div>
                  <div className="text-5xl sm:text-6xl font-mono font-black tracking-wider text-emerald-800">
                    {probeInserted ? selectedSubstance.ph.toFixed(1) : '--.-'}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {probeInserted ? (
                      <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 border border-slate-200">
                        <span>{selectedSubstance.typeName}</span>
                        <span>•</span>
                        <span>[H⁺]: {selectedSubstance.h_ion_relative}%</span>
                      </span>
                    ) : (
                      t('القطب غير مغموس (اضغط لغمس القطب)', 'Electrode probe suspended')
                    )}
                  </div>
                </div>

                <div 
                  className="absolute bottom-0 left-0 right-0 h-16 opacity-30 transition-all duration-500"
                  style={{ backgroundColor: probeInserted ? selectedSubstance.color : '#94a3b8' }}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setProbeInserted(!probeInserted)}
                  className={`flex-1 py-3 font-bold text-xs transition flex items-center justify-center gap-2 border ${
                    probeInserted
                      ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-700'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800'
                  }`}
                >
                  <Pipette className="w-4 h-4" />
                  <span>{probeInserted ? t('رفع القطب من المحلول', 'Retract Electrode') : t('غمس قطب مقياس pH في المحلول', 'Immerse pH Electrode')}</span>
                </button>

                <button
                  onClick={() => setProbeInserted(false)}
                  className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition"
                  title={t('إعادة ضبط', 'Reset')}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {probeInserted && (
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 text-xs space-y-2.5 text-right">
                <div className="font-bold text-slate-900 border-b border-emerald-200 pb-1.5 flex items-center justify-between">
                  <span>التحليل الكيميائي لـ {selectedSubstance.name}:</span>
                  <span className="font-mono text-[11px] text-slate-500">{selectedSubstance.curriculumPage}</span>
                </div>

                <div className="bg-white p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold">معادلة التأين في الماء:</div>
                  <div className="font-mono text-xs font-bold text-emerald-900 dir-ltr text-center">
                    {selectedSubstance.ionizationEquation}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <p><strong>ورق تباع الشمس:</strong> {selectedSubstance.litmusReaction}</p>
                  <p><strong>أزرق البروموثيمول:</strong> {selectedSubstance.bromothymolReaction}</p>
                  <p><strong>الفينولفثالين:</strong> {selectedSubstance.phenolphthaleinReaction}</p>
                  <p><strong>الملفوف الأحمر:</strong> {selectedSubstance.cabbageReaction}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: 3D Molecules */}
      {activeTab === '3d_molecules' && (
        <Molecule3DViewer />
      )}

      {/* TAB 3: 3D Conductivity */}
      {activeTab === 'conductivity' && (
        <Ionization3DChamber />
      )}

      {/* TAB 4: Metal Reactions */}
      {activeTab === 'metal_reaction' && (
        <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                تفاعل الفلزات النشطة مع الحموض وتصاعد غاز الهيدروجين (H₂)
              </h2>
              <p className="text-xs text-slate-500">
                رصد إحلال المغنيسيوم أو الخارصين وتصاعد فقاعات H₂ واختبار الشظية (Pop Test).
              </p>
            </div>

            <button
              onClick={() => {
                setReactionRunning(true);
                setPopTested(false);
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-800 transition flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4" />
              <span>إسقاط شريط الفلز في الحمض</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">اختر الفلز (Metal):</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => { setSelectedMetal('Mg'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-2.5 border text-center font-bold transition ${
                      selectedMetal === 'Mg' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>المغنيسيوم Mg</div>
                    <div className="text-[10px] text-slate-400">نشاط سريع</div>
                  </button>
                  <button
                    onClick={() => { setSelectedMetal('Zn'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-2.5 border text-center font-bold transition ${
                      selectedMetal === 'Zn' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>الخارصين Zn</div>
                    <div className="text-[10px] text-slate-400">نشاط متوسط</div>
                  </button>
                  <button
                    onClick={() => { setSelectedMetal('Cu'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-2.5 border text-center font-bold transition ${
                      selectedMetal === 'Cu' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>النحاس Cu</div>
                    <div className="text-[10px] text-slate-400">لا يتفاعل</div>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">اختر المحلول الحمضي:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setSelectedAcidForMetal('HCl'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-2.5 border text-center font-bold transition ${
                      selectedAcidForMetal === 'HCl' ? 'bg-red-50 border-red-300 text-red-900' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>حمض قوي (HCl)</div>
                    <div className="text-[10px] text-slate-500">تصاعد سريع</div>
                  </button>
                  <button
                    onClick={() => { setSelectedAcidForMetal('CH3COOH'); setReactionRunning(false); setPopTested(false); }}
                    className={`p-2.5 border text-center font-bold transition ${
                      selectedAcidForMetal === 'CH3COOH' ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>حمض ضعيف (CH₃COOH)</div>
                    <div className="text-[10px] text-slate-500">تصاعد بطيء</div>
                  </button>
                </div>
              </div>

              {reactionRunning && selectedMetal !== 'Cu' && (
                <button
                  onClick={() => setPopTested(true)}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs border border-amber-700 transition flex items-center justify-center gap-1.5"
                >
                  <Flame className="w-4 h-4" />
                  <span>تقريب شظية لاختبار فرقعة غاز H₂ (Pop Test)</span>
                </button>
              )}
            </div>

            {/* Reaction Chamber (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50 p-6 text-center space-y-4 border border-slate-200">
              <div className="font-bold text-slate-800 text-sm">
                {selectedMetal === 'Cu' ? 'النحاس يقع بعد الهيدروجين في النشاط ولا يتفاعل' : `${selectedMetal} + ${selectedAcidForMetal}`}
              </div>

              <div className="w-28 h-44 mx-auto border-2 border-slate-400 relative overflow-hidden bg-white flex flex-col justify-end p-2 shadow-2xs">
                <div className="w-full h-28 bg-emerald-100/60 relative">
                  {reactionRunning && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-slate-400" />
                  )}

                  {reactionRunning && selectedMetal !== 'Cu' && (
                    <div className="absolute inset-0 flex flex-wrap justify-around items-end overflow-hidden p-1">
                      <span className="w-2.5 h-2.5 bg-emerald-600/60 rounded-full animate-ping" />
                      <span className="w-2 h-2 bg-emerald-600/70 rounded-full animate-bounce delay-100" />
                      <span className="w-3 h-3 bg-emerald-600/50 rounded-full animate-ping delay-200" />
                    </div>
                  )}
                </div>
              </div>

              {popTested && (
                <div className="p-2.5 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
                  💥 صوت فرقعة مميز (Pop Sound)! يؤكد تصاعد غاز الهيدروجين H₂.
                </div>
              )}

              <div className="bg-white p-2.5 border border-slate-200 font-mono text-xs text-emerald-900 dir-ltr">
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

      {/* TAB: 5 Indicators (Primary 3D Interactive Lab) */}
      {activeTab === 'indicators' && (
        <Indicators3DLab />
      )}

      {/* TAB 6: Agricultural Soil */}
      {activeTab === 'agriculture' && (
        <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                معالجة حموضة التربة الزراعية بمحلول هيدروكسيد الكالسيوم Ca(OH)₂
              </h2>
              <p className="text-xs text-slate-500">
                إضافة الجير المطفأ لرفع pH التربة إلى المدى المثالي (6.0 - 7.0).
              </p>
            </div>
            <button
              onClick={() => { setSoilPh(4.8); setLimeDoses(0); }}
              className="flex items-center gap-1 px-3 py-1 bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط العينة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 bg-slate-50 p-6 text-center space-y-4 border border-slate-200">
              <div className="text-3xl font-mono font-black text-emerald-800">
                pH = {soilPh.toFixed(1)}
              </div>
              <div className="text-xs text-slate-600">
                {soilPh < 6.0 && '⚠️ تربة شديدة الحموضة تعيق نمو المحاصيل'}
                {soilPh >= 6.0 && soilPh <= 7.5 && '🌱 تربة متوازنة ومثالية جداً للنمو الزراعي'}
                {soilPh > 7.5 && 'تربة مائلة للقلوية'}
              </div>

              <div className="w-28 h-28 mx-auto bg-white border border-slate-200 p-3 flex flex-col items-center justify-center">
                <Sprout className={`w-12 h-12 transition-all duration-500 ${
                  soilPh >= 6.0 && soilPh <= 7.5 ? 'text-emerald-600 scale-110' : 'text-amber-500 opacity-60'
                }`} />
                <span className="text-[10px] font-bold text-slate-600 mt-1">
                  {soilPh >= 6.0 && soilPh <= 7.5 ? 'نبات سليم ومزدهر' : 'نبات مجهد بالحموضة'}
                </span>
              </div>
            </div>

            <div className="md:col-span-6 space-y-4 text-right text-xs">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-950">معادلة معادلة حموضة التربة:</div>
                <div className="font-mono text-xs font-bold text-emerald-900 dir-ltr bg-white p-2 border border-emerald-200">
                  2H⁺ (Soil Acid) + Ca(OH)₂ (aq) → Ca²⁺ (aq) + 2H₂O (l)
                </div>
              </div>

              <button
                onClick={() => {
                  setSoilPh((prev) => Math.min(7.8, +(prev + 0.6).toFixed(1)));
                  setLimeDoses((d) => d + 1);
                }}
                disabled={soilPh >= 7.8}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs border border-emerald-800 transition flex items-center justify-center gap-1.5"
              >
                <Sprout className="w-4 h-4" />
                <span>إضافة جرعة Ca(OH)₂ لمعادلة التربة (+0.6 pH)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Titration */}
      {activeTab === 'titration' && (
        <div className="bg-white border border-slate-200 p-6 space-y-5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">محاكاة تجربة المعايرة وتفاعل التعادل</h2>
              <p className="text-xs text-slate-500">
                إضافة قطرات NaOH القاعدي إلى كأس حمض HCl مع كاشف الفينولفثالين.
              </p>
            </div>
            <button
              onClick={() => setNaohDrops(0)}
              className="flex items-center gap-1 px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة التجربة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 bg-slate-50 p-6 text-center space-y-4 border border-slate-200">
              <div className="text-3xl font-mono font-black text-emerald-800">
                pH = {currentTitrationPh}
              </div>
              <div className="text-xs text-slate-600">
                {naohDrops === 0 && 'محلول حمضي عديم اللون (pH 1.0)'}
                {naohDrops > 0 && !isNeutralized && !isBasic && 'محلول حمضي يتناقص تركيز H⁺ فيه'}
                {isNeutralized && '🎉 نقطة التكافؤ والتعادل الوردي! (pH 7.0)'}
                {isBasic && 'محلول قاعدي زائد باللون الوردي/القرمزي'}
              </div>

              <div className="w-28 h-36 mx-auto border-2 border-slate-300 relative overflow-hidden flex flex-col justify-end p-1.5 bg-white">
                <div 
                  className="w-full transition-all duration-300 opacity-80"
                  style={{
                    height: `${40 + (naohDrops * 2.5)}%`,
                    backgroundColor: isNeutralized 
                      ? '#f472b6'
                      : isBasic 
                      ? '#ec4899'
                      : '#e2e8f0'
                  }}
                />
              </div>

              <div className="text-xs text-slate-500 font-mono">
                قطرات NaOH المضافة: <span className="text-slate-900 font-bold">{naohDrops}</span>
              </div>
            </div>

            <div className="md:col-span-6 space-y-4 text-right text-xs">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-950">معادلة تفاعل التعادل الأيونية:</div>
                <div className="font-mono text-xs font-bold text-emerald-900 dir-ltr bg-white p-2 border border-emerald-200">
                  HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l) + Heat
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setNaohDrops((prev) => Math.min(maxDrops, prev + 1))}
                  disabled={naohDrops >= maxDrops}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs border border-emerald-800 transition flex items-center justify-center gap-1.5"
                >
                  <Pipette className="w-4 h-4" />
                  <span>إضافة قطرة NaOH من السحاحة (+1 قطرة)</span>
                </button>

                <button
                  onClick={() => setNaohDrops((prev) => Math.min(maxDrops, prev + 5))}
                  disabled={naohDrops >= maxDrops}
                  className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs transition"
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
