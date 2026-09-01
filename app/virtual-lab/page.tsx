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
  HelpCircle,
  Eye,
  Beaker,
  Thermometer
} from 'lucide-react';
import { SUBSTANCES_DATA, ChemicalSubstance } from '@/lib/types';

export default function VirtualLabPage() {
  const [activeTab, setActiveTab] = useState<'ph_meter' | 'cabbage' | 'titration'>('ph_meter');

  // pH Meter State
  const [selectedSubstance, setSelectedSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[0]);
  const [probeInserted, setProbeInserted] = useState(false);

  // Cabbage Extractor State
  const [cabbageSubstance, setCabbageSubstance] = useState<ChemicalSubstance>(SUBSTANCES_DATA[0]);
  const [dropsAdded, setDropsAdded] = useState(0);

  // Titration State
  const [naohDrops, setNaohDrops] = useState(0); // Each drop = 0.5 pH increase from pH 1.0 (HCl)
  const maxDrops = 24;

  const currentTitrationPh = Math.min(13.5, +(1.0 + (naohDrops * 0.55)).toFixed(1));
  const isNeutralized = naohDrops >= 10 && naohDrops <= 12;
  const isBasic = naohDrops > 12;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              المختبر التفاعلي الذكي
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              مختبر الكيمياء الافتراضي (Virtual Chemistry Lab)
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('ph_meter')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'ph_meter'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              مقياس الرقم الهيدروجيني pH
            </button>
            <button
              onClick={() => setActiveTab('cabbage')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'cabbage'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              كاشف الملفوف الأحمر
            </button>
            <button
              onClick={() => setActiveTab('titration')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'titration'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              محاكاة المعايرة والتعادل
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          بيئة محاكاة استقصائية آمنة تمكّن الطالبات واللجنة من اختبار خواص المواد الكيميائية، قياس pH الرقمي بدقة، ومعايرة التعادل قطرة بقطرة.
        </p>
      </div>

      {/* TAB 1: Digital pH Meter Simulator */}
      {activeTab === 'ph_meter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Substance Chooser (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider px-1">اختر المادة المراد فحصها:</h2>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {SUBSTANCES_DATA.map((sub) => {
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
                    <div className="space-y-0.5">
                      <div className="font-bold text-xs text-slate-900">{sub.name}</div>
                      <div className="text-[11px] text-slate-500">{sub.typeName}</div>
                    </div>
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-slate-300"
                      style={{ backgroundColor: sub.color }}
                    />
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
                <span className="text-xs font-bold text-slate-500">حجرة الفحص المخبري</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {selectedSubstance.formula}
                </span>
              </div>

              {/* Beaker & Digital Display Visual */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
                
                {/* Live Digital Meter Readout */}
                <div className="space-y-1 z-10">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Digital pH Meter 9000</div>
                  <div className="text-5xl font-mono font-black tracking-wider text-emerald-400">
                    {probeInserted ? selectedSubstance.ph.toFixed(1) : '--.-'}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {probeInserted ? selectedSubstance.typeName : 'القطب غير مغموس في المحلول'}
                  </div>
                </div>

                {/* Beaker Fluid Simulation at Bottom */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-16 opacity-75 transition-all duration-500"
                  style={{ backgroundColor: probeInserted ? selectedSubstance.color : '#334155' }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setProbeInserted(!probeInserted)}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                    probeInserted
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  }`}
                >
                  <Pipette className="w-4 h-4" />
                  <span>{probeInserted ? 'رفع قطب المقياس' : 'غمس قطب مقياس pH في المحلول'}</span>
                </button>

                <button
                  onClick={() => setProbeInserted(false)}
                  className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                  title="إعادة ضبط"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scientific Analysis Panel */}
            {probeInserted && (
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-xs space-y-2 text-right">
                <h3 className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>التحليل الكيميائي لـ {selectedSubstance.name}:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-slate-700">
                  <p><strong>تفاعل تباع الشمس:</strong> {selectedSubstance.litmusReaction}</p>
                  <p><strong>أثر الكاشف الطبيعي:</strong> {selectedSubstance.cabbageReaction}</p>
                  <p><strong>الاستخدام الحياتي:</strong> {selectedSubstance.dailyUse}</p>
                  <p><strong>قاعدة السلامة:</strong> {selectedSubstance.safetyRule}</p>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 2: Red Cabbage Natural Indicator */}
      {activeTab === 'cabbage' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl font-black text-slate-900">محاكاة الكاشف الطبيعي (مستخلص الملفوف الأحمر)</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              يحتوي الملفوف الأحمر على صبغة الأنثوسيانين (Anthocyanin) الطبيعية التي يتغير تركيبها الجزيئي ولونها بمرونة مذهلة حسب درجة حموضة الوسط المضاف إليها.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            {/* Acid State */}
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-500 shadow-inner flex items-center justify-center text-white font-bold text-xs">
                pH 1 - 3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">الوسط الحمضي (مثل عصير الليمون والخل)</h3>
              <p className="text-xs text-slate-600">يتحول لون المستخلص فورياً إلى <strong>الأحمر الفاقع أو الوردي</strong>.</p>
            </div>

            {/* Neutral State */}
            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-600 shadow-inner flex items-center justify-center text-white font-bold text-xs">
                pH 7.0
              </div>
              <h3 className="font-bold text-slate-900 text-sm">الوسط المتعادل (الماء المقطر)</h3>
              <p className="text-xs text-slate-600">يبقى اللون <strong>بنفسجياً هادئاً</strong> دون أي تغيير.</p>
            </div>

            {/* Base State */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-600 shadow-inner flex items-center justify-center text-white font-bold text-xs">
                pH 8 - 14
              </div>
              <h3 className="font-bold text-slate-900 text-sm">الوسط القاعدي (الصابون والبيكنج صودا)</h3>
              <p className="text-xs text-slate-600">يتحول اللون إلى <strong>الأزرق النيلي ثم الأخضر أو الأصفر</strong> في القواعد القوية.</p>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: Neutralization & Titration Chamber */}
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
                💡 <strong>ملاحظة هامة للمقابلة:</strong> نقطة التعادل الدقيقة تحدث عند إضافة ما بين 10 إلى 12 قطرة حيث يستقر اللون الوردي الفاتح معلناً نهاية المعايرة.
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
