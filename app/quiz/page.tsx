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
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  Filter, 
  FlaskConical 
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

interface Question {
  id: number;
  question: string;
  questionEn: string;
  options: string[];
  optionsEn: string[];
  correctIndex: number;
  curriculumRef: string;
  category: 'Acids' | 'Bases' | 'pH' | 'Indicators' | 'Strength' | 'RealWorld';
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'ما هو الأيون المشترك المسؤول عن الخصائص الحمضية في جميع المحاليل الحمضية المائية؟',
    questionEn: 'What is the common ion responsible for acidic properties in all aqueous acid solutions?',
    options: [
      'أيون الهيدروكسيد السالب (OH⁻)',
      'أيون الهيدروجين الموجب (H⁺ / H₃O⁺)',
      'أيون الكلوريد السالب (Cl⁻)',
      'أيون الصوديوم الموجب (Na⁺)'
    ],
    optionsEn: [
      'Hydroxide ion (OH⁻)',
      'Hydrogen ion (H⁺ / H₃O⁺)',
      'Chloride ion (Cl⁻)',
      'Sodium ion (Na⁺)'
    ],
    correctIndex: 1,
    curriculumRef: 'كتاب كولينز: ص 46 - 47',
    category: 'Acids',
    explanation: 'تطلق جميع الحموض عند ذوبانها في الماء أيون الهيدروجين الموجب H⁺ الذي يرتبط بجزيء الماء مكوناً أيون الهيدرونيوم H₃O⁺.'
  },
  {
    id: 2,
    question: 'لماذا يُعد غاز ثاني أكسيد الكربون CO₂ أكسيداً حمضياً (Acidic Oxide)؟',
    questionEn: 'Why is carbon dioxide CO₂ classified as an acidic oxide?',
    options: [
      'لأنه يحتوي على ذرات هيدروجين في تركيبه البلوري',
      'لأنه يذوب في الماء مكوناً حمض الكربونيك H₂CO₃ الذي يتأين منتجاً أيونات H⁺',
      'لأنه يتفاعل مع الحموض لإنتاج قواعد قوية',
      'لأنه يغير لون تباع الشمس الأحمر إلى الأزرق'
    ],
    optionsEn: [
      'Because it contains hydrogen atoms in its crystal structure',
      'Because it dissolves in water forming carbonic acid H₂CO₃ which releases H⁺',
      'Because it reacts with acids to produce strong bases',
      'Because it turns red litmus blue'
    ],
    correctIndex: 1,
    curriculumRef: 'كتاب كولينز: ص 47',
    category: 'Acids',
    explanation: 'أكاسيد اللافلزات مثل CO₂ و NO₂ تذوب في الماء مكونة محاليل حمضية تطلق أيونات الهيدروجين: CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻.'
  },
  {
    id: 3,
    question: 'ما هو السبب العلمي الحقيقي لآلام العضلات التي يشعر بها الشخص بعد 24 ساعة من التمارين الشاقة؟',
    questionEn: 'What is the scientifically proven cause of muscle soreness 24 hours after intense exercise?',
    options: [
      'تراكم دائم لحمض اللاكتيك داخل الألياف العضلية لعدة أيام',
      'تمزقات عضلية دقيقة والتهاب هذه التمزقات، بينما يختفي حمض اللاكتيك بعد ساعة تقريباً',
      'تحول الوسط العضلي إلى وسط قاعدي شديد القلوية',
      'نقص إفراز حمض الهيدروكلوريك في المعدة'
    ],
    optionsEn: [
      'Permanent accumulation of lactic acid for several days',
      'Microscopic muscle tears and inflammation; lactic acid clears within ~1 hour',
      'Muscle cells becoming overly alkaline',
      'Deficiency of hydrochloric acid in the stomach'
    ],
    correctIndex: 1,
    curriculumRef: 'كتاب كولينز: ص 47 (الربط بالرياضة)',
    category: 'RealWorld',
    explanation: 'أثبتت الدراسات الحديثة (ص 47) أن ألم العضلات يحدث بعد 24 ساعة بسبب تمزقات مجهرية والتهابها، بينما يزول حمض اللاكتيك بعد ساعة من التمارين.'
  },
  {
    id: 4,
    question: 'لماذا يُصنف أكسيد الليثيوم Li₂O كقلوي (Alkali)؟',
    questionEn: 'Why is lithium oxide Li₂O classified as an alkali?',
    options: [
      'لأنه أكسيد لا فلزي يذوب في الماء لإنتاج حمض',
      'لأنه أكسيد فلزي يذوب في الماء مكوناً هيدروكسيد الليثيوم LiOH الذي يتأين كلياً منتجاً OH⁻',
      'لأنه مادة غير قابلة للذوبان في الماء وتتفاعل مع القواعد',
      'لأنه يحتوي على مجموعة هيدروكسيد صلبة في بنيته الجافة'
    ],
    optionsEn: [
      'Because it is a non-metal oxide producing an acid',
      'Because it is a soluble metal oxide forming LiOH which fully ionizes to release OH⁻',
      'Because it is insoluble and reacts with bases',
      'Because it contains dry solid hydroxide groups'
    ],
    correctIndex: 1,
    curriculumRef: 'كتاب كولينز: ص 50',
    category: 'Bases',
    explanation: 'القلويات (ص 50) هي أكاسيد وهيدروكسيدات الفلزات الذائبة في الماء؛ حيث يذوب Li₂O مكوناً LiOH الذي يتأين كلياً: Li₂O + H₂O → 2LiOH → 2Li⁺ + 2OH⁻.'
  },
  {
    id: 5,
    question: 'عند مقارنة شدة إضاءة المصباح في دارتين متساويتين في التركيز (0.1 M) لحمض HCl وحمض CH₃COOH، ماذا نلاحظ؟',
    questionEn: 'Comparing lamp brightness in 0.1 M HCl vs 0.1 M CH₃COOH circuits, what do we observe?',
    options: [
      'إضاءة المصباح في حمض HCl أقوى بكثير لأن تأينه كلي منتجاً وفرة من الأيونات الحرة',
      'إضاءة المصباح في حمض CH₃COOH أقوى لأن وزنه الجزيئي أكبر',
      'شدة الإضاءة متطابقة تماماً لأن التركيز الابتدائي متساوٍ',
      'المصباح لا يضيء في أي من المحلولين'
    ],
    optionsEn: [
      'HCl bulb glows much brighter due to complete ionization releasing abundant free ions',
      'CH₃COOH bulb glows brighter due to larger molecular weight',
      'Brightness is completely identical since initial concentrations are equal',
      'Bulbs remain off in both solutions'
    ],
    correctIndex: 0,
    curriculumRef: 'كتاب كولينز: ص 52',
    category: 'Strength',
    explanation: 'حمض HCl قوي يتأين كلياً (→) منتجاً نسبة عالية من الأيونات الحرة الموصلة للتيار، بينما CH₃COOH حمض ضعيف يتأين جزئياً (⇌).'
  },
  {
    id: 6,
    question: 'ما هو الناتج الغازي المتصاعد عند وضع شريط من فلز المغنيسيوم Mg في أنبوب يحتوي على حمض الهيدروكلوريك HCl؟',
    questionEn: 'What gas evolves when magnesium ribbon is placed into hydrochloric acid?',
    options: [
      'غاز الأكسجين (O₂)',
      'غاز الكلور السام (Cl₂)',
      'غاز الهيدروجين (H₂) الذي يشتعل بفرقعة مع الشظية',
      'غاز ثاني أكسيد الكربون (CO₂)'
    ],
    optionsEn: [
      'Oxygen gas (O₂)',
      'Toxic chlorine gas (Cl₂)',
      'Hydrogen gas (H₂) which ignites with a pop sound',
      'Carbon dioxide gas (CO₂)'
    ],
    correctIndex: 2,
    curriculumRef: 'كتاب كولينز: ص 48',
    category: 'Acids',
    explanation: 'يحل المغنيسيوم محل الهيدروجين: Mg + 2HCl → MgCl₂ + H₂ ↑ ويتصاعد غاز الهيدروجين سريع الاشتعال.'
  },
  {
    id: 7,
    question: 'لماذا يُحافظ صانعو منظفات الشعر (الشامبو) على درجة حموضة له ضمن النطاق (4.5 - 6) وتقريباً pH ≈ 5.5؟',
    questionEn: 'Why do shampoo manufacturers formulate hair products around pH 4.5 - 6 (~5.5)?',
    options: [
      'لأن الشعر يتكون من بروتين الكيراتين وهذا النطاق يحميه من التلف والتقصف',
      'لزيادة القدرة على تبييض لون الشعر كيميائياً',
      'لجعل الوسط شديد القاعدية لإذابة الدهون بعنف',
      'لمعادلة حموضة ماء البحر أثناء السباحة'
    ],
    optionsEn: [
      'Because hair consists of keratin protein and this pH protects it from damage and split ends',
      'To chemically bleach hair color',
      'To make it strongly alkaline for severe degreasing',
      'To neutralize sea water pH'
    ],
    correctIndex: 0,
    curriculumRef: 'كتاب كولينز: ص 54 (الربط بالحياة)',
    category: 'RealWorld',
    explanation: 'يتكون الشعر من بروتين الكيراتين، وتعد درجة الحموضة (4.5 - 6) مناسبة للحفاظ عليه من التلف والتقصف والحفاظ على حيويته.'
  },
  {
    id: 8,
    question: 'إذا كانت التربة الزراعية شديدة الحموضة، ما المادة القاعدية المناسبة الموصى بها لمعادلتها وفق المنهاج؟',
    questionEn: 'If agricultural soil is excessively acidic, what recommended basic substance neutralizes it?',
    options: [
      'حمض الكبريتيك المركز (H₂SO₄)',
      'محلول هيدروكسيد الكالسيوم Ca(OH)₂ (الجير المطفأ)',
      'غاز ثاني أكسيد الكربون (CO₂)',
      'حمض الهيدروكلوريك (HCl)'
    ],
    optionsEn: [
      'Concentrated sulfuric acid (H₂SO₄)',
      'Calcium hydroxide Ca(OH)₂ solution (Slaked Lime)',
      'Carbon dioxide gas (CO₂)',
      'Hydrochloric acid (HCl)'
    ],
    correctIndex: 1,
    curriculumRef: 'كتاب كولينز: ص 55 (الربط بالزراعة)',
    category: 'RealWorld',
    explanation: 'تُعالج التربة شديدة الحموضة بإضافة مادة قاعدية مثل محلول هيدروكسيد الكالسيوم Ca(OH)₂ لمعادلة أيونات H⁺ الفائضة.'
  },
  {
    id: 9,
    question: 'ما هو التغير اللوني لكاشف أزرق البروموثيمول (Bromothymol Blue) عند الانتقال من الوسط الحمضي إلى الوسط القاعدي؟',
    questionEn: 'What is the color transition of Bromothymol Blue from acidic to basic medium?',
    options: [
      'من الأصفر في الوسط الحمضي إلى الأزرق في الوسط القاعدي (وأخضر عند التعادل)',
      'من الوردي إلى عديم اللون تماماً',
      'من الأحمر القاني إلى البنفسجي الغامق',
      'يبقى ثابتاً بلون واحد دون تغير'
    ],
    optionsEn: [
      'From yellow in acid to blue in base (and green at neutral pH 7)',
      'From pink to completely colorless',
      'From deep red to dark violet',
      'Remains unchanged'
    ],
    correctIndex: 0,
    curriculumRef: 'كتاب كولينز: ص 55',
    category: 'Indicators',
    explanation: 'يتغير لون أزرق البروموثيمول من الأصفر في الوسط الحمضي (pH < 6) إلى الأخضر في المتعادل (pH = 7) ثم الأزرق في القاعدي (pH > 7.6).'
  },
  {
    id: 10,
    question: 'أي من المواد التالية يُعد مثالاً على قاعدة ضعيفة تتأين جزئياً دون أن تحتوي صيغتها الأولية على أيون الهيدروكسيد؟',
    questionEn: 'Which substance is a weak base that partially ionizes without containing an initial OH in its formula?',
    options: [
      'هيدروكسيد الصوديوم (NaOH)',
      'هيدروكسيد البوتاسيوم (KOH)',
      'غاز الأمونيا (NH₃)',
      'حمض النيتريك (HNO₃)'
    ],
    optionsEn: [
      'Sodium hydroxide (NaOH)',
      'Potassium hydroxide (KOH)',
      'Ammonia gas (NH₃)',
      'Nitric acid (HNO₃)'
    ],
    correctIndex: 2,
    curriculumRef: 'كتاب كولينز: ص 50، 53',
    category: 'Bases',
    explanation: 'غاز الأمونيا NH₃ لا يحتوي على OH⁻ في صيغته، ولكنه يتفاعل مع الماء جزئياً منتجاً OH⁻: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻.'
  }
];

export default function QuizPage() {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');

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
      try {
        await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_name: studentName,
            student_phone: studentPhone || '0790000000',
            score,
            total_questions: QUIZ_QUESTIONS.length,
            time_spent_seconds: 60,
            answers: selectedAnswers
          })
        });
      } catch (err) {
        // quiet
      }
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header - Clean Light Style */}
      <div className="bg-white border border-slate-200 p-6 space-y-3 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              {t('اختبار التقويم التكويني والتشخيصي', 'Formative Assessment & Diagnostic Quiz')}
            </h1>
            <p className="text-xs text-slate-500">
              {t('اختبار تقويمي يقيس استيعاب المفاهيم والمعادلات وتطبيقات المنهاج', 'Diagnostic test evaluating concepts, chemical equations, and applications')}
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-700 bg-slate-50 px-3 py-1 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>10 {t('أسئلة', 'Questions')}</span>
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        <div className="bg-white border border-slate-200 p-6 sm:p-8 space-y-5 shadow-2xs">
          
          {/* Progress Tracker */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>{t('السؤال', 'Question')} {currentIdx + 1} / {QUIZ_QUESTIONS.length}</span>
              <span className="text-emerald-800 bg-emerald-50 px-2 py-0.2 border border-emerald-200">{currentQ.curriculumRef}</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-700 h-1.5 transition-all duration-200"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Options List */}
          <div className="space-y-2 pt-1">
            {currentQ.options.map((opt, optIdx) => {
              const isSelectedOption = selectedAnswers[currentIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-right p-3.5 border transition flex items-center justify-between ${
                    isSelectedOption
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                  <span className={`w-3.5 h-3.5 border shrink-0 ${
                    isSelectedOption ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              {t('السؤال السابق', 'Previous')}
            </button>

            {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentIdx((prev) => Math.min(QUIZ_QUESTIONS.length - 1, prev + 1))}
                disabled={!isSelected}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-bold border border-emerald-800 transition"
              >
                {t('السؤال التالي', 'Next')}
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                disabled={!isSelected}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-bold border border-emerald-900 transition flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>{t('إنهاء الاختبار', 'Submit')}</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="bg-white border border-slate-200 p-6 sm:p-8 space-y-6 text-center shadow-2xs">
          
          <div className="space-y-2">
            <div className="w-20 h-20 mx-auto bg-emerald-50 border border-emerald-300 flex items-center justify-center">
              <span className="text-2xl font-black text-emerald-800 font-mono">{percentage}%</span>
            </div>
            
            <h2 className="text-xl font-black text-slate-900">
              {percentage >= 80 ? '🎉 أداء متميز ومتقن جداً!' : percentage >= 60 ? '👍 أداء جيد جداً!' : '📚 مراجعة مقترحة للمفاهيم'}
            </h2>
            <p className="text-xs text-slate-600">
              حصلت على <strong className="text-emerald-800 font-mono">{score}</strong> من أصل <strong className="font-mono">{QUIZ_QUESTIONS.length}</strong> أسئلة صحيحة.
            </p>
          </div>

          <div className="space-y-2.5 text-right pt-4 border-t border-slate-100">
            <h3 className="font-bold text-xs text-slate-700">مراجعة الإجابات والتحليل العلمي:</h3>
            
            <div className="space-y-2">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div key={idx} className={`p-3 border text-xs space-y-1.5 ${
                    isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50/50 border-red-200'
                  }`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-1.5">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        )}
                        <span className="font-bold text-slate-900">{idx + 1}. {q.question}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">{q.curriculumRef}</span>
                    </div>

                    <div className="space-y-1 text-slate-700 pr-5">
                      <p><strong>الإجابة الصحيحة:</strong> {q.options[q.correctIndex]}</p>
                      <p className="text-slate-600 bg-white p-2 border border-slate-200">
                        💡 <strong>التفسير العلمي:</strong> {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('إعادة الاختبار', 'Retake Quiz')}</span>
            </button>

            <Link
              href="/virtual-lab"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-800 transition"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{t('تطبيق في المختبر الافتراضي', 'Go to Virtual Lab')}</span>
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
