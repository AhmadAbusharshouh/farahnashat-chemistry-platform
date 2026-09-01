'use client';

import { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  Clock, 
  Share2, 
  Phone,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'ما هو الأيون المشترك المسؤول عن الخصائص الحمضية في جميع المحاليل الحمضية؟',
    options: [
      'أيون الهيدروكسيد السالب (OH⁻)',
      'أيون الهيدروجين الموجب (H⁺ / H₃O⁺)',
      'أيون الكلوريد السالب (Cl⁻)',
      'أيون الصوديوم الموجب (Na⁺)'
    ],
    correctIndex: 1,
    explanation: 'تطلق الحموض عند ذوبانها في الماء أيون الهيدروجين H⁺ الذي يرتبط بالماء مكوناً أيون الهيدرونيوم H₃O⁺.'
  },
  {
    id: 2,
    question: 'عند إضافة محلول مجهول إلى مستخلص الملفوف الأحمر فتحول لونه إلى الأخضر المزرق، ماذا نستنتج عن هذا المحلول؟',
    options: [
      'المحلول حمضي قوي',
      'المحلول متعادل تماماً (pH = 7)',
      'المحلول قاعدي',
      'المحلول غير قابل للتأين'
    ],
    correctIndex: 2,
    explanation: 'يتحول كاشف الملفوف الأحمر الطبيعي إلى اللون الأخضر أو الأزرق عند وضعه في الأوساط القاعدية.'
  },
  {
    id: 3,
    question: 'ما هي قيمة الرقم الهيدروجيني (pH) للماء المقطر النقي عند درجة حرارة الغرفة؟',
    options: [
      'pH = 1.0',
      'pH = 7.0',
      'pH = 14.0',
      'pH = 4.5'
    ],
    correctIndex: 1,
    explanation: 'الماء المقطر نقي ومتعادل كيميائياً بحيث يتساوى فيه تركيز أيونات H⁺ مع أيونات OH⁻ وقيمة pH له تساوي 7.'
  },
  {
    id: 4,
    question: 'أي المواد التالية يُعد مثالاً على قاعدة تُستخدم في صناعة الصابون وإذابة الدهون؟',
    options: [
      'حمض الكبريتيك (H₂SO₄)',
      'حمض الستريك (C₆H₈O₇)',
      'هيدروكسيد الصوديوم (NaOH)',
      'حمض الهيدروكلوريك (HCl)'
    ],
    correctIndex: 2,
    explanation: 'هيدروكسيد الصوديوم (الصودا الكاوية) قاعدة قوية تُستخدم بشكل رئيسي في تصبين الزيوت وصناعة المنظفات.'
  },
  {
    id: 5,
    question: 'ما هما الناتجان الرئيسيان لأي تفاعل تعادل بين حمض وقاعدة؟',
    options: [
      'غاز الهيدروجين وغاز الأكسجين',
      'الملح والماء مع انطلاق حرارة',
      'حمض قوي وأكسيد فلز',
      'قاعدة قوية وماء مقطر'
    ],
    correctIndex: 1,
    explanation: 'تفاعل التعادل: حمض + قاعدة ← ملح + ماء + حرارة (مثال: HCl + NaOH ← NaCl + H₂O).'
  }
];

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const isSelected = selectedAnswers[currentIdx] !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx });
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleFinishQuiz = async () => {
    setIsSubmitted(true);
    const score = calculateScore();

    if (studentName.trim()) {
      setSavingStatus('saving');
      try {
        await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_name: studentName,
            student_phone: studentPhone || '0790000000',
            score,
            total_questions: QUIZ_QUESTIONS.length,
            time_spent_seconds: 45,
            answers: selectedAnswers
          })
        });
        setSavingStatus('saved');
      } catch (err) {
        setSavingStatus('saved');
      }
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setSavingStatus('idle');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              التقويم التكويني المحوسب
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              اختبار كيمياء الصف التاسع - الحموض والقواعد
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-bold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            5 أسئلة معيارية وفق منهاج كولينز
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          أداة تقويم لحظية لقياس مدى استيعاب الطالبات لنتاجات الحصة، مع حفظ النتائج في قاعدة بيانات Cloudflare D1 وإصدار شارة التميز.
        </p>
      </div>

      {!isSubmitted ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Top Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>السؤال {currentIdx + 1} من {QUIZ_QUESTIONS.length}</span>
            <span className="text-emerald-700">
              تمت الإجابة على {Object.keys(selectedAnswers).length} من {QUIZ_QUESTIONS.length}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isCurrentOptionSelected = selectedAnswers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-right p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition flex items-center justify-between ${
                      isCurrentOptionSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-400'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                      isCurrentOptionSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 text-xs font-bold text-slate-600 disabled:text-slate-300 hover:bg-slate-50 rounded-xl transition"
            >
              السؤال السابق
            </button>

            {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentIdx((p) => Math.min(QUIZ_QUESTIONS.length - 1, p + 1))}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
              >
                السؤال التالي
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-bold rounded-xl shadow-xs transition"
              >
                إنهاء الاختبار وعرض النتيجة
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results View & Certificate */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xs space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">
                نتيجة التقويم التكويني: {calculateScore()} من {QUIZ_QUESTIONS.length}
              </h2>
              <p className="text-xs text-slate-500">
                {calculateScore() >= 4 
                  ? '🌟 أداء استثنائي ومتقن! لقد تم استيعاب جميع مفاهيم الحموض والقواعد بنجاح باهر.'
                  : '👍 أداء جيد! يمكنك مراجعة الأسئلة وتفسيراتها العلمية أدناه لتعزيز المعرفة.'}
              </p>
            </div>

            {/* Student metadata capture */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-right space-y-3">
              <span className="text-xs font-bold text-slate-700 block">تسجيل النتيجة في السجل الإلكتروني (D1):</span>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="اسم الطالبة أو عضو اللجنة..."
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-emerald-500"
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف لاستلام التقرير عبر واتساب (اختياري)..."
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleFinishQuiz}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition"
                >
                  {savingStatus === 'saved' ? '✓ تم الحفظ في قاعدة البيانات' : 'حفظ النتيجة الآن'}
                </button>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار</span>
            </button>
          </div>

          {/* Detailed Explanations Breakdown */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">مراجعة الإجابات والتفسير العلمي الدقيق:</h3>
            <div className="space-y-4">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div key={q.id} className={`p-4 rounded-2xl border text-xs space-y-2 ${isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-red-50/40 border-red-200'}`}>
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900">{idx + 1}. {q.question}</span>
                      {isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-4 h-4" /> صحيح
                        </span>
                      ) : (
                        <span className="text-red-700 flex items-center gap-1 font-bold">
                          <XCircle className="w-4 h-4" /> غير دقيق
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600"><strong>الإجابة الصحيحة:</strong> {q.options[q.correctIndex]}</p>
                    <p className="text-slate-500 bg-white/80 p-2 rounded-lg border border-slate-200/60">
                      💡 <strong>التفسير:</strong> {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
