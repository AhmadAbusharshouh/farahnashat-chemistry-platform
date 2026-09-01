'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Award, 
  RotateCcw, 
  Clock, 
  Share2, 
  Phone, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  FlaskConical, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  Send, 
  Check, 
  AlertCircle,
  HelpCircle,
  BarChart3,
  User,
  GraduationCap,
  ChevronDown,
  Layers,
  FileCheck,
  ShieldCheck,
  Zap,
  Flame,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { CURRICULUM_QUIZZES, LessonQuiz, QuizQuestion } from '@/lib/quiz-curriculum-data';
import { saveQuizSubmission, QuizSubmission, QuestionAnswerDetail } from '@/lib/quiz-storage';
import { soundFX } from '@/lib/sound-effects';

const TEACHER_WHATSAPP = '962781745778';
const TEACHER_DISPLAY_PHONE = '0781745778';

export default function QuizPage() {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const PrevArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  // Selected Quiz Key
  const [selectedQuizKey, setSelectedQuizKey] = useState<string>('unit1_lesson1');
  const activeQuiz: LessonQuiz = useMemo(() => {
    return CURRICULUM_QUIZZES[selectedQuizKey] || CURRICULUM_QUIZZES['unit1_lesson1'];
  }, [selectedQuizKey]);

  // Quiz State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [key: number]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Student Info
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [studentGovernorate, setStudentGovernorate] = useState('عمان');
  const [showStudentInfoModal, setShowStudentInfoModal] = useState(false);

  // Timer State
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // WhatsApp Share Feedback
  const [copiedLink, setCopiedLink] = useState(false);

  // Load student info from session
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('farah_chem_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed?.name) setStudentName(parsed.name);
        if (parsed?.phone) setStudentPhone(parsed.phone);
        if (parsed?.school) setStudentSchool(parsed.school);
        if (parsed?.governorate) setStudentGovernorate(parsed.governorate);
      }
    } catch {
      // quiet
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    if (isTimerRunning && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isSubmitted]);

  // Switch Quiz
  const handleSelectQuiz = (key: string) => {
    if (key === selectedQuizKey) return;
    setSelectedQuizKey(key);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setIsSubmitted(false);
    setTimeSpent(0);
    setIsTimerRunning(true);
  };

  const currentQ: QuizQuestion = activeQuiz.questions[currentIdx] || activeQuiz.questions[0];
  const isSelected = selectedAnswers[currentIdx] !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    if (soundEnabled) soundFX.playSelect();
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx });
  };

  const handleToggleFlag = (idx: number) => {
    setFlaggedQuestions({ ...flaggedQuestions, [idx]: !flaggedQuestions[idx] });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate Final Score
  const calculateScore = () => {
    let score = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / activeQuiz.questions.length) * 100);

  // Submit and Save Quiz
  const handleFinishQuiz = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
    if (soundEnabled) soundFX.playVictory();

    // Prepare detailed answers dictionary for admin
    const detailedAnswers: Record<number, QuestionAnswerDetail> = {};
    activeQuiz.questions.forEach((q, idx) => {
      const chosen = selectedAnswers[idx];
      detailedAnswers[idx] = {
        questionId: q.id,
        questionText: q.question,
        options: q.options,
        selectedIndex: chosen !== undefined ? chosen : -1,
        correctIndex: q.correctIndex,
        isCorrect: chosen === q.correctIndex,
        chosenText: chosen !== undefined ? q.options[chosen] : 'لم تتم الإجابة',
        correctText: q.options[q.correctIndex],
        category: q.category,
        curriculumRef: q.curriculumRef,
        explanation: q.explanation,
      };
    });

    const submission: QuizSubmission = {
      id: `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      student_name: studentName.trim() || 'طالب منصة الكيمياء',
      student_phone: studentPhone.trim() || '0790000000',
      school: studentSchool.trim() || 'الصف التاسع الأساسي',
      governorate: studentGovernorate || 'عمان',
      quiz_id: activeQuiz.id,
      quiz_title: activeQuiz.title,
      unit_title: activeQuiz.unitTitle,
      score,
      total_questions: activeQuiz.questions.length,
      percentage,
      time_spent_seconds: timeSpent,
      created_at: new Date().toISOString(),
      answers: detailedAnswers,
    };

    saveQuizSubmission(submission);

    // Save student profile in localStorage
    if (studentName.trim()) {
      localStorage.setItem(
        'farah_chem_user',
        JSON.stringify({
          name: studentName.trim(),
          phone: studentPhone.trim(),
          school: studentSchool.trim(),
          governorate: studentGovernorate,
        })
      );
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setTimeSpent(0);
    setIsTimerRunning(true);
  };

  // WhatsApp Message Generator
  const generateWhatsAppMessage = () => {
    const sName = studentName.trim() || 'طالب متميز';
    const sSchool = studentSchool.trim() ? `\n🏫 *المدرسة:* ${studentSchool.trim()}` : '';
    const ratingEmoji = percentage >= 90 ? '👑 ممتاز ومتقن جداً' : percentage >= 80 ? '🌟 جيد جداً مرتفع' : percentage >= 60 ? '👍 جيد' : '📚 بحاجة لمتابعة ومراجعة';
    
    return (
      `🧪 *تقرير نتيجة اختبار الكيمياء - منصة المعلمة فرح نشأت*\n` +
      `═════════════════════\n` +
      `👤 *اسم الطالب:* ${sName}\n` +
      `📱 *رقم الهاتف:* ${studentPhone.trim() || 'غير مسجل'}${sSchool}\n` +
      `📍 *المحافظة:* ${studentGovernorate}\n` +
      `📚 *الدرس / الاختبار:* ${activeQuiz.title}\n` +
      `📖 *الوحدة:* ${activeQuiz.unitTitle}\n` +
      `🏆 *الدرجة النهائية:* ${score} من ${activeQuiz.questions.length} (*${percentage}%*)\n` +
      `⏱️ *الوقت المستغرق:* ${formatTime(timeSpent)}\n` +
      `📊 *التقدير العام:* ${ratingEmoji}\n` +
      `📅 *التاريخ:* ${new Date().toLocaleDateString('ar-JO')} - ${new Date().toLocaleTimeString('ar-JO', { hour: '2-digit', minute: '2-digit' })}\n` +
      `═════════════════════\n` +
      `✨ *ملاحظة:* تم إجراء الاختبار وفق المنهاج الأردني المطور (كولينز) - الصف التاسع الأساسي 🧪🌸`
    );
  };

  const handleSendToTeacherWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppMessage());
    const url = `https://wa.me/${TEACHER_WHATSAPP}?text=${text}`;
    window.open(url, '_blank');
  };

  const handleShareWhatsAppGeneral = () => {
    const text = encodeURIComponent(generateWhatsAppMessage());
    const url = `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank');
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.setEnabled(next);
  };

  // Performance Assessment Tag
  const getEvaluation = (p: number) => {
    if (p === 100) return { title: '👑 أداء أسطوري وعلامة كاملة!', desc: 'استيعاب مذهل لجميع مفاهيم ومعادلات الدرس وفق أعلى المعايير.', color: 'text-emerald-800 bg-emerald-50 border-emerald-300' };
    if (p >= 80) return { title: '🌟 أداء متميز ومتقن جداً!', desc: 'أحسنت! إتقان رائع للمفاهيم والتطبيقات الكيميائية.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (p >= 60) return { title: '👍 أداء جيد مع وجود فرص للتحسين', desc: 'تم اجتياز الاختبار بنجاح، راجع الأسئلة الخاطئة لترسيخ المفاهيم.', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { title: '📚 مراجعة مقترحة للدرس والتجارب', desc: 'يُنصح بمراجعة صفحات الكتاب المدرسي وإجراء التجارب في المختبر الافتراضي.', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  const evalInfo = getEvaluation(percentage);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER: TITLE + LESSON PICKER + STUDENT BAR */}
      <div className="bg-white border border-slate-200 p-5 sm:p-6 space-y-5 shadow-2xs">
        
        {/* Top bar with Breadcrumb & Admin link */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold">منهاج كولينز الأردني</span>
            <span>•</span>
            <span>الصف التاسع - الفصل الأول</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 transition"
              title="لوحة تحكم المعلمة الخاصة بالنتائج"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>لوحة المعلمة (Admin)</span>
            </Link>

            <button
              onClick={toggleSound}
              className={`p-1.5 border text-xs font-bold transition flex items-center gap-1 ${
                soundEnabled ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
              title={soundEnabled ? 'كتم المؤثرات الصوتية' : 'تفعيل المؤثرات الصوتية'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Header Title and Description */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            <span>{t('منظومة الاختبارات والتقويم التكويني والتشخيصي', 'Formative Assessment & Diagnostic Quizzes')}</span>
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            {t(
              'اختبارات دقيقة تغطي جميع دروس كتاب الكيمياء للصف التاسع (الفصل الأول) مع ربط مباشر بالواتساب وتوثيق كامل للإجابات والتفسيرات العلمية.',
              'Detailed curriculum-aligned diagnostic tests for Grade 9 Chemistry with WhatsApp reporting and scientific explanations.'
            )}
          </p>
        </div>

        {/* LESSON PICKER TABS */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-700 block">
            {t('اختر الدرس أو الاختبار المطلوب:', 'Select Lesson / Exam:')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {Object.values(CURRICULUM_QUIZZES).map((quiz) => {
              const isCurrent = quiz.id === activeQuiz.id;
              return (
                <button
                  key={quiz.id}
                  onClick={() => handleSelectQuiz(quiz.id)}
                  className={`text-right p-3 border transition-all relative flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[10px] font-mono font-black px-1.5 py-0.2 border ${
                        isCurrent ? 'bg-emerald-800 border-emerald-600 text-emerald-100' : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}>
                        {quiz.pageRange}
                      </span>
                      <span className={`text-[10px] font-bold ${isCurrent ? 'text-emerald-200' : 'text-emerald-700'}`}>
                        {quiz.badge}
                      </span>
                    </div>
                    <div className="text-xs font-black leading-snug">
                      {quiz.title}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 mt-2 border-t border-slate-100/30">
                    <span className={isCurrent ? 'text-emerald-100 font-mono' : 'text-slate-500 font-mono'}>
                      10 {t('أسئلة معتمدة', 'Questions')}
                    </span>
                    <span className="text-xs">{isCurrent ? '● جاري الاختبار' : 'بدء ←'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Student Quick Name Banner */}
        <div className="bg-slate-50 border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-black text-slate-900">
                {studentName.trim() ? studentName : 'طالب زائر (غير مسجل اسمك)'}
              </div>
              <div className="text-[10px] text-slate-500">
                {studentPhone ? `واتساب: ${studentPhone}` : 'يمكنك توثيق اسمك ورقمك لإرسال النتيجة للمعلمة'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowStudentInfoModal(true)}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 transition flex items-center gap-1"
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
            <span>{studentName.trim() ? 'تعديل بيانات الطالب' : 'تسجيل بيانات الطالب'}</span>
          </button>
        </div>

      </div>

      {/* ACTIVE QUIZ SCREEN */}
      {!isSubmitted ? (
        <div className="bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          
          {/* Top Info Bar: Question Counter + Timer + Page Ref */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            
            {/* Question Counter */}
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-700 text-white font-mono font-bold text-xs flex items-center justify-center">
                {currentIdx + 1}
              </span>
              <span className="text-xs font-black text-slate-800">
                {t('السؤال', 'Question')} {currentIdx + 1} {t('من', 'of')} {activeQuiz.questions.length}
              </span>
              <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                {currentQ.category}
              </span>
            </div>

            {/* Timer & Page Reference */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 border border-slate-200 font-mono text-xs font-bold text-slate-700">
                <Clock className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                <span>{formatTime(timeSpent)}</span>
              </div>

              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                {currentQ.curriculumRef}
              </span>

              <button
                onClick={() => handleToggleFlag(currentIdx)}
                className={`p-1 border text-xs font-bold transition flex items-center gap-1 ${
                  flaggedQuestions[currentIdx]
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-amber-700'
                }`}
                title="تحديد السؤال للمراجعة لاحقاً"
              >
                {flaggedQuestions[currentIdx] ? (
                  <BookmarkCheck className="w-4 h-4 text-amber-700" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>

          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="w-full bg-slate-100 h-2 overflow-hidden">
              <div 
                className="bg-emerald-700 h-2 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / activeQuiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* QUESTION NAVIGATOR PILLS (1 to 10) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {activeQuiz.questions.map((q, idx) => {
              const isAns = selectedAnswers[idx] !== undefined;
              const isFlag = flaggedQuestions[idx];
              const isCur = idx === currentIdx;

              let btnStyle = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50';
              if (isCur) {
                btnStyle = 'ring-2 ring-emerald-700 bg-emerald-50 text-emerald-950 font-black border-emerald-600';
              } else if (isAns) {
                btnStyle = 'bg-emerald-700 text-white border-emerald-700 font-bold';
              } else if (isFlag) {
                btnStyle = 'bg-amber-100 text-amber-900 border-amber-400 font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-8 h-8 shrink-0 text-xs font-mono border transition flex items-center justify-center relative ${btnStyle}`}
                  title={`السؤال ${idx + 1}`}
                >
                  {idx + 1}
                  {isFlag && (
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full absolute -top-0.5 -right-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Question Prompt */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5 pt-1">
            {currentQ.options.map((opt, optIdx) => {
              const isSelectedOption = selectedAnswers[currentIdx] === optIdx;
              const optionLabel = ['أ', 'ب', 'ج', 'د'][optIdx] || (optIdx + 1);

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-right p-3.5 sm:p-4 border transition flex items-center justify-between gap-3 ${
                    isSelectedOption
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 shrink-0 flex items-center justify-center text-xs font-bold font-mono border ${
                      isSelectedOption
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {optionLabel}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                  </div>

                  <span className={`w-4 h-4 border shrink-0 flex items-center justify-center ${
                    isSelectedOption ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                  }`}>
                    {isSelectedOption && <Check className="w-3 h-3" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <PrevArrow className="w-3.5 h-3.5" />
              <span>{t('السؤال السابق', 'Previous')}</span>
            </button>

            <div className="flex items-center gap-2">
              {currentIdx < activeQuiz.questions.length - 1 ? (
                <button
                  onClick={() => {
                    if (soundEnabled) soundFX.playNext();
                    setCurrentIdx((prev) => Math.min(activeQuiz.questions.length - 1, prev + 1));
                  }}
                  disabled={!isSelected}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-bold border border-emerald-800 transition"
                >
                  <span>{t('السؤال التالي', 'Next')}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  disabled={!isSelected}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-black border border-emerald-950 transition shadow-sm"
                >
                  <Award className="w-4 h-4" />
                  <span>{t('إنهاء وتسليم الاختبار', 'Submit Quiz')}</span>
                </button>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* COMPREHENSIVE DETAILED RESULTS & WHATSAPP SHARING VIEW */
        <div className="bg-white border border-slate-200 p-6 sm:p-8 space-y-8 shadow-2xs">
          
          {/* Top Score Banner */}
          <div className="text-center space-y-4 max-w-xl mx-auto">
            
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border-4 border-emerald-600 bg-emerald-50 flex flex-col items-center justify-center shadow-inner">
                <span className="text-3xl font-black text-emerald-900 font-mono">{percentage}%</span>
                <span className="text-[10px] font-bold text-emerald-700 font-mono">{score} / {activeQuiz.questions.length}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {evalInfo.title}
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                {evalInfo.desc}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200 p-3 text-center">
              <div>
                <div className="text-[10px] text-slate-500 font-bold">الدرجة النهائية</div>
                <div className="text-sm font-black text-slate-900 font-mono">{score} / {activeQuiz.questions.length}</div>
              </div>
              <div className="border-x border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold">الوقت المستغرق</div>
                <div className="text-sm font-black text-slate-900 font-mono">{formatTime(timeSpent)}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold">حالة التوثيق</div>
                <div className="text-sm font-black text-emerald-700">تم الحفظ بنجاح ✓</div>
              </div>
            </div>

          </div>

          {/* DIRECT WHATSAPP ACTION CARD */}
          <div className="bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-emerald-50 border-2 border-emerald-600 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900">
                    إرسال النتيجة الموثقة للمعلمة فرح نشأت عبر واتساب
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  قم بإرسال تقرير النتيجة الكامل بضغطة زر واحدة لتسجيل درجتك في سجل إنجاز المعلمة: <strong className="font-mono text-emerald-900">{TEACHER_DISPLAY_PHONE}</strong>
                </p>
              </div>

              <button
                onClick={handleSendToTeacherWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs border border-emerald-900 transition shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>إرسال النتيجة للمعلمة فرح (WhatsApp)</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-emerald-200/60">
              <button
                onClick={handleShareWhatsAppGeneral}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 transition"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>مشاركة النتيجة مع ولي الأمر / الأصدقاء</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateWhatsAppMessage());
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 transition"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <FileCheck className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedLink ? 'تم نسخ التقرير للنص!' : 'نسخ نص التقرير'}</span>
              </button>

              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition mr-auto"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>عرض سجلات الطلاب في لوحة المعلمة</span>
              </Link>
            </div>
          </div>

          {/* DETAILED QUESTION-BY-QUESTION SCIENTIFIC BREAKDOWN */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>المراجعة العلمية التفصيلية لجميع الأسئلة والصفحات:</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">
                {score} / {activeQuiz.questions.length} صحيحة
              </span>
            </div>

            <div className="space-y-3">
              {activeQuiz.questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div
                    key={idx}
                    className={`p-4 border text-xs space-y-3 transition ${
                      isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-red-50/40 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="font-bold text-slate-900 leading-relaxed">
                            {idx + 1}. {q.question}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 border border-slate-200 text-slate-600">
                          {q.curriculumRef}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          {q.category}
                        </span>
                      </div>
                    </div>

                    {/* Choices & Explanation */}
                    <div className="space-y-1.5 pr-6 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">إجابتك:</span>
                        <span className={`font-bold ${isCorrect ? 'text-emerald-800' : 'text-red-700 line-through'}`}>
                          {userAns !== undefined ? q.options[userAns] : 'لم تتم الإجابة'}
                        </span>
                      </div>

                      {!isCorrect && (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700">الإجابة الصحيحة:</span>
                          <span className="font-bold text-emerald-800">
                            {q.options[q.correctIndex]}
                          </span>
                        </div>
                      )}

                      <div className="bg-white p-3 border border-slate-200 text-slate-700 space-y-1 mt-2">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>💡 التفسير العلمي وفق المنهاج:</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM CONTROLS / NEXT ACTIONS */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('إعادة هذا الاختبار', 'Retake Quiz')}</span>
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/virtual-lab"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-800 transition shadow-xs"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>{t('تطبيق في المختبر الافتراضي (3D)', 'Go to 3D Virtual Lab')}</span>
              </Link>
            </div>
          </div>

        </div>
      )}

      {/* STUDENT PROFILE MODAL */}
      {showStudentInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-emerald-700 p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl relative">
            <div className="space-y-1 text-center">
              <div className="w-10 h-10 mx-auto bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                تسجيل وتوثيق بيانات الطالب
              </h3>
              <p className="text-xs text-slate-500">
                تُرفق هذه البيانات رسمياً في تقرير النتائج الموجه للمعلمة ولولي الأمر.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowStudentInfoModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">اسم الطالب الثلاثي:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="مثال: سارة أحمد العبداللات"
                  required
                  className="w-full px-3.5 py-2 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">رقم هاتف الواتساب:</label>
                <input
                  type="tel"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  placeholder="079XXXXXXXX"
                  className="w-full px-3.5 py-2 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">المدرسة:</label>
                  <input
                    type="text"
                    value={studentSchool}
                    onChange={(e) => setStudentSchool(e.target.value)}
                    placeholder="اسم مدرستك"
                    className="w-full px-3 py-2 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">المحافظة:</label>
                  <select
                    value={studentGovernorate}
                    onChange={(e) => setStudentGovernorate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700"
                  >
                    {['عمان', 'إربد', 'الزرقاء', 'البلقاء', 'الكرك', 'مأدبا', 'العقبة', 'جرش', 'عجلون', 'المفرق', 'الطفيلة', 'معان'].map((gov) => (
                      <option key={gov} value={gov}>{gov}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-900 transition flex items-center justify-center gap-1.5 mt-2"
              >
                <Check className="w-4 h-4" />
                <span>حفظ البيانات ومتابعة الاختبار</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
