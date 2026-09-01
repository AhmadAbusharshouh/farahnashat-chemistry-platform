'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  FlaskConical, 
  Layers, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

interface TopicNode {
  id: string;
  title: string;
  pages: string;
  summary: string;
  keyPoints: string[];
  equation?: string;
  conceptQuestion: string;
  conceptAnswer: string;
}

const CURRICULUM_TOPICS: TopicNode[] = [
  {
    id: 'acids',
    title: '1. مفهوم الحموض وخصائصها (Acids)',
    pages: 'ص 44 - 47',
    summary: 'مركبات كيميائية تطلق أيون الهيدروجين الموجب (H⁺) عند ذوبانها في الماء، وتتميز بطعمها الحامضي وموصليتها للتيار الكهربائي.',
    keyPoints: [
      'حموض طبيعية (عضوية): حمض الستريك في الليمون، حمض اللاكتيك في اللبن، حمض الأسيتيك في الخل.',
      'حموض صناعية (معدنية): حمض الهيدروكلوريك HCl، حمض الكبريتيك H₂SO₄، حمض النيتريك HNO₃.',
      'التأين في الماء: تنتج أيونات الهيدرونيوم H₃O⁺ المسؤولة عن الخصائص الحمضية.',
      'التفاعل مع الفلزات النشطة: يتصاعد غاز الهيدروجين H₂ وتتشكل أملاح الفلز.'
    ],
    equation: 'HCl (g) + H₂O (l) → H₃O⁺ (aq) + Cl⁻ (aq)',
    conceptQuestion: 'لماذا تُحفظ الحموض في أوعية زجاجية أو بلاستيكية خاصة بدلاً من الأواني الفلزية؟',
    conceptAnswer: 'لأن الحموض تتفاعل مع الفلزات مسببة تآكلها وتصاعد غاز الهيدروجين سريع الاشتعال.'
  },
  {
    id: 'bases',
    title: '2. مفهوم القواعد وخصائصها (Bases)',
    pages: 'ص 48 - 50',
    summary: 'مركبات كيميائية تنتج أيون الهيدروكسيد السالب (OH⁻) عند ذوبانها في الماء، وتتميز بملمسها الصابوني الزلق وطعمها المر.',
    keyPoints: [
      'قواعد شائعة: هيدروكسيد الصوديوم NaOH، هيدروكسيد الكالسيوم Ca(OH)₂ (الجير المطفأ)، والأمونيا NH₃.',
      'محاليلها موصلة للكهرباء لاحتوائها على أيونات حرة الحركة في المحلول.',
      'استخدامات حياتية: صناعة المنظفات المنزلية، معالجة حموضة التربة الزراعية، وأدوية مضادات الحموضة.'
    ],
    equation: 'NaOH (s) + H₂O (l) → Na⁺ (aq) + OH⁻ (aq)',
    conceptQuestion: 'ما هو الأيون المسؤول عن الخصائص القاعدية في جميع المحاليل القاعدية؟',
    conceptAnswer: 'أيون الهيدروكسيد السالب (OH⁻).'
  },
  {
    id: 'indicators',
    title: '3. الكواشف ومقياس الرقم الهيدروجيني (Indicators & pH Scale)',
    pages: 'ص 51 - 53',
    summary: 'مواد يتغير لونها تبعاً لطبيعة المحلول (حمضي أو قاعدي)، وتُقسم إلى كواشف طبيعية وصناعية وكاشف عام ورقم هيدروجيني.',
    keyPoints: [
      'الكواشف الطبيعية: مثل منقوع الملفوف الأحمر ومغلي الشاي وأزهار الجوري.',
      'الكواشف الصناعية: ورق تباع الشمس (أحمر وأزرق)، الفينولفثالين، والميثيل البرتقالي.',
      'مقياس الرقم الهيدروجيني (pH): مدرج من 0 إلى 14 (أقل من 7 حمضي، 7 متعادل، أكبر من 7 قاعدي).',
      'الكاشف العام (Universal Indicator): مزيج يعطي تدرجاً لونياً واسعاً يحدد قيمة pH تقريبية.'
    ],
    conceptQuestion: 'كيف يتغير لون مستخلص الملفوف الأحمر في الوسط الحمضي مقارنة بالوسط القاعدي؟',
    conceptAnswer: 'يتحول إلى درجات الأحمر والوردي في الوسط الحمضي، بينما يتحول إلى الأخضر أو الأزرق في الوسط القاعدي.'
  },
  {
    id: 'neutralization',
    title: '4. تفاعلات التعادل وتطبيقاتها (Neutralization Reactions)',
    pages: 'ص 54 - 55',
    summary: 'تفاعل كيميائي بين حمض وقاعدة ينتج عنه ملح وماء وتنطلق منه طاقة حرارية، وتكون المحاليل الناتجة غالباً متعادلة.',
    keyPoints: [
      'المعادلة العامة: حمض + قاعدة ← ملح + ماء + حرارة.',
      'معايرة الأحماض والقواعد: استخدام السحاحة والمخبار المدرج لتحديد نقطة التكافؤ بدقة.',
      'تطبيقات عملية: معالجة لدغات الحشرات الحمضية (مثل لسعة النمل بمحلول قاعدي كالبيكنج صودا)، وعلاج حموضة المعدة.'
    ],
    equation: 'HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l) + حرارة',
    conceptQuestion: 'ماذا يحدث لقيمة pH عند إضافة قطرات من محلول NaOH تدريجياً إلى كأس يحتوي على حمض HCl؟',
    conceptAnswer: 'ترتفع قيمة pH تدريجياً من 1 باتجاه 7 (نقطة التعادل) ثم تستمر بالارتفاع متجاوزة 7 لتصبح قاعدية.'
  }
];

export default function CurriculumMapPage() {
  const [selectedTopic, setSelectedTopic] = useState<TopicNode>(CURRICULUM_TOPICS[0]);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              خريطة المفاهيم الشاملة
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              منهاج كيمياء الصف التاسع - كتاب كولينز (ص 43 - 55)
            </h1>
          </div>
          <Link
            href="/virtual-lab"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>تطبيق في المختبر الافتراضي</span>
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
          استكشف وحدات الدرس الأربعة المترابطة، مع مراجعة النتاجات العلمية، المعادلات الأيونية، وبنك الأسئلة الاستقصائية لكل وحدة.
        </p>
      </div>

      {/* Main Grid: Sidebar Navigator + Detail Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Topic Selector Tabs (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider px-2">وحدات الدرس ومفاهيمه</h2>
          {CURRICULUM_TOPICS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setShowAnswer(false);
                }}
                className={`w-full text-right p-4 rounded-2xl border transition-all duration-150 flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs ring-1 ring-emerald-300'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-xs sm:text-sm">{topic.title}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{topic.pages}</div>
                </div>
                <ChevronLeft className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-700 -translate-x-1' : 'text-slate-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Topic Deep View (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Title & Page Tag */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900">{selectedTopic.title}</h3>
              <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                كتاب كولينز: {selectedTopic.pages}
              </span>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 text-xs text-emerald-950 leading-relaxed font-medium">
              {selectedTopic.summary}
            </div>

            {/* Key Scientific Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>أبرز المحاور والمفاهيم الأساسية:</span>
              </h4>
              <div className="space-y-2">
                {selectedTopic.keyPoints.map((pt, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chemical Equation (if exists) */}
            {selectedTopic.equation && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">معادلة التأين والتفاعل الكيميائي</span>
                <div className="text-sm sm:text-base font-mono font-bold text-emerald-200 dir-ltr text-center py-1">
                  {selectedTopic.equation}
                </div>
              </div>
            )}

            {/* Concept Check Question Card */}
            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>سؤال استقصائي وتفكير ناقد:</span>
              </div>
              <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                {selectedTopic.conceptQuestion}
              </p>

              <div>
                {!showAnswer ? (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition"
                  >
                    إظهار الإجابة النموذجية
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-950 font-medium leading-relaxed mt-2">
                    <strong className="text-emerald-800 block mb-1">الإجابة العلمية:</strong>
                    {selectedTopic.conceptAnswer}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
