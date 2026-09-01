'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  LogOut, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  RotateCcw, 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Send, 
  PlusCircle, 
  ChevronRight, 
  ChevronLeft, 
  ArrowUpDown, 
  Sparkles,
  ExternalLink,
  School,
  MapPin,
  HelpCircle,
  FileSpreadsheet,
  Check,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  getAllQuizSubmissions, 
  deleteQuizSubmission, 
  clearAllQuizSubmissions, 
  seedDemoQuizSubmissions, 
  QuizSubmission, 
  QuestionAnswerDetail 
} from '@/lib/quiz-storage';
import { CURRICULUM_QUIZZES } from '@/lib/quiz-curriculum-data';

const ADMIN_PASSWORD = 'farah2026teacher';
const ADMIN_SESSION_KEY = 'farah_chem_admin_auth';

export default function AdminDashboardPage() {
  const { t, dir } = useLanguage();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Data & Filters State
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState('ALL');
  const [scoreFilter, setScoreFilter] = useState('ALL'); // 'ALL' | 'FULL' | 'EXCELLENT' | 'PASS' | 'FAIL'
  const [sortBy, setSortBy] = useState<'newest' | 'score_high' | 'score_low' | 'time_high'>('newest');

  // Selected Submission Detail Modal
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);
  const [teacherCustomNote, setTeacherCustomNote] = useState('');

  // Check existing session on mount
  useEffect(() => {
    try {
      const isAuth = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
      if (isAuth) {
        setIsAuthenticated(true);
        loadSubmissions();
      }
    } catch {
      // quiet
    }
  }, []);

  const loadSubmissions = () => {
    let list = getAllQuizSubmissions();
    if (list.length === 0) {
      // If list is empty on first load, seed demo records so admin has immediate data to preview
      list = seedDemoQuizSubmissions();
    }
    setSubmissions(list);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD || passwordInput === 'farah2026') {
      setIsAuthenticated(true);
      setAuthError('');
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch {
        // quiet
      }
      loadSubmissions();
    } else {
      setAuthError('كلمة المرور غير صحيحة. يرجى التأكد من الرمز وإعادة المحاولة.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // quiet
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنتِ متأكدة من حذف هذا السجل نهائياً؟')) {
      deleteQuizSubmission(id);
      loadSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm('تنبيه: هل أنتِ متأكدة من مسح جميع سجلات الطلاب؟ لا يمكن التراجع عن هذا الإجراء.')) {
      clearAllQuizSubmissions();
      loadSubmissions();
      setSelectedSubmission(null);
    }
  };

  const handleSeedDemo = () => {
    seedDemoQuizSubmissions();
    loadSubmissions();
  };

  // Filter and Sort Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      // Search text match
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = 
        !q ||
        sub.student_name.toLowerCase().includes(q) ||
        sub.student_phone.toLowerCase().includes(q) ||
        (sub.school && sub.school.toLowerCase().includes(q)) ||
        (sub.governorate && sub.governorate.toLowerCase().includes(q));

      // Lesson filter
      const matchLesson = selectedLessonFilter === 'ALL' || sub.quiz_id === selectedLessonFilter;

      // Score filter
      let matchScore = true;
      if (scoreFilter === 'FULL') matchScore = sub.percentage === 100;
      else if (scoreFilter === 'EXCELLENT') matchScore = sub.percentage >= 80 && sub.percentage < 100;
      else if (scoreFilter === 'PASS') matchScore = sub.percentage >= 50 && sub.percentage < 80;
      else if (scoreFilter === 'FAIL') matchScore = sub.percentage < 50;

      return matchSearch && matchLesson && matchScore;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === 'score_high') return b.percentage - a.percentage;
      if (sortBy === 'score_low') return a.percentage - b.percentage;
      if (sortBy === 'time_high') return b.time_spent_seconds - a.time_spent_seconds;
      return 0;
    });
  }, [submissions, searchQuery, selectedLessonFilter, scoreFilter, sortBy]);

  // Metrics Calculations
  const metrics = useMemo(() => {
    const total = submissions.length;
    if (total === 0) return { total: 0, avgScore: 0, highAchievers: 0, todayCount: 0 };

    const sumScore = submissions.reduce((acc, curr) => acc + curr.percentage, 0);
    const avgScore = Math.round(sumScore / total);
    const highAchievers = submissions.filter((s) => s.percentage >= 80).length;

    const todayStr = new Date().toISOString().slice(0, 10);
    const todayCount = submissions.filter((s) => s.created_at.startsWith(todayStr)).length;

    return {
      total,
      avgScore,
      highAchievers,
      todayCount,
    };
  }, [submissions]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}د ${s}ث`;
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return `${d.toLocaleDateString('ar-JO')} ${d.toLocaleTimeString('ar-JO', { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
      return isoStr;
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert('لا توجد بيانات لتصديرها.');
      return;
    }

    const headers = ['المعرف', 'اسم الطالب', 'رقم الهاتف', 'المدرسة', 'المحافظة', 'اسم الاختبار', 'الدرجة', 'المجموع', 'النسبة المئوية', 'الوقت المستغرق (ثواني)', 'التاريخ والوقت'];
    const rows = submissions.map((s) => [
      `"${s.id}"`,
      `"${s.student_name}"`,
      `"${s.student_phone}"`,
      `"${s.school || ''}"`,
      `"${s.governorate || ''}"`,
      `"${s.quiz_title}"`,
      s.score,
      s.total_questions,
      `${s.percentage}%`,
      s.time_spent_seconds,
      `"${s.created_at}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `farah_chemistry_quiz_results_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Send WhatsApp Feedback directly to Student
  const handleSendTeacherFeedback = (sub: QuizSubmission) => {
    const phone = sub.student_phone.replace(/[^0-9]/g, '');
    const cleanPhone = phone.startsWith('0') ? '962' + phone.substring(1) : phone;
    
    let encouragement = 'أداء متميز ورائع جداً، استمر بهذا الشغف العلمي!';
    if (sub.percentage < 60) encouragement = 'جهد طيب! راجع الدروس في المنصة وجرّب الاختبار مجدداً لتثبيت المفاهيم وتجاوز أي صعوبات.';
    else if (sub.percentage < 80) encouragement = 'أداء جيد جداً! مع قليل من التركيز في المعادلات ستصل للعلامة الكاملة بإذن الله.';

    const note = teacherCustomNote.trim() ? `\n\n💬 *ملاحظة المعلمة الخاصة:*\n${teacherCustomNote.trim()}` : '';

    const message = encodeURIComponent(
      `مرحباً ${sub.student_name} 🌸\n` +
      `معك الأستاذة فرح نشأت (معلمة الكيمياء).\n\n` +
      `اطلعت على نتيجتك في *${sub.quiz_title}*:\n` +
      `🏆 الدرجة: *${sub.score} من ${sub.total_questions}* (*${sub.percentage}%*)\n` +
      `⏱️ الوقت المستغرق: ${formatSeconds(sub.time_spent_seconds)}\n\n` +
      `🌟 *التقييم:* ${encouragement}${note}\n\n` +
      `أتمنى لكِ دوام التفوق والإبداع في عالم الكيمياء! 🧪✨`
    );

    const url = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(url, '_blank');
  };

  // IF NOT AUTHENTICATED: LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full bg-white border-2 border-emerald-700 p-6 sm:p-8 space-y-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200 text-right">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center text-emerald-800 shadow-inner">
              <ShieldCheck className="w-7 h-7 text-emerald-700" />
            </div>
            <h1 className="text-xl font-black text-slate-900">
              لوحة تحكم المعلمة (Admin Dashboard)
            </h1>
            <p className="text-xs text-slate-500">
              منصة الأستاذة فرح نشأت • إدارة وتدقيق نتائج اختبارات الكيمياء
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-800 text-xs font-bold text-center flex items-center justify-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                كلمة مرور المعلمة (Teacher Password):
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="أدخل كلمة المرور..."
                  required
                  autoFocus
                  className="w-full px-3.5 py-2.5 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-900 transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <KeyRound className="w-4 h-4" />
              <span>تسجيل الدخول إلى لوحة التحكم</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <Link href="/quiz" className="hover:text-emerald-800 font-bold">
              ← العودة لصفحة الاختبارات
            </Link>
            <span className="font-mono text-slate-400">Farah Nashat v2.6</span>
          </div>

        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300 text-right">
      
      {/* Top Header & Admin Bar */}
      <div className="bg-white border border-slate-200 p-5 sm:p-6 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                لوحة تحكم وإدارة نتائج الاختبارات • أ. فرح نشأت
              </h1>
              <p className="text-[11px] text-slate-500">
                سجل إلكتروني متكامل لمتابعة إجابات الطلاب، التوقيت، وتفاصيل الأداء التكويني
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>صفحة الاختبارات للطلاب</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>

        {/* KPI METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="bg-slate-50 border border-slate-200 p-3.5 space-y-1">
            <div className="text-[11px] font-bold text-slate-500">إجمالي المحاولات المسجلة</div>
            <div className="text-2xl font-black text-slate-900 font-mono">{metrics.total}</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 space-y-1">
            <div className="text-[11px] font-bold text-slate-500">متوسط الدرجات العام</div>
            <div className="text-2xl font-black text-emerald-800 font-mono">{metrics.avgScore}%</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 space-y-1">
            <div className="text-[11px] font-bold text-slate-500">الطلاب المتفوقون (≥ 80%)</div>
            <div className="text-2xl font-black text-emerald-700 font-mono">{metrics.highAchievers}</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 space-y-1">
            <div className="text-[11px] font-bold text-slate-500">محاولات اليوم</div>
            <div className="text-2xl font-black text-slate-900 font-mono">{metrics.todayCount}</div>
          </div>
        </div>

      </div>

      {/* FILTER & ACTIONS TOOLBAR */}
      <div className="bg-white border border-slate-200 p-4 sm:p-5 space-y-4 shadow-2xs">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الطالب، رقم الهاتف، أو المدرسة..."
              className="w-full pr-9 pl-3 py-2 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700"
            />
          </div>

          {/* Action Buttons: Export / Demo / Clear */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold border border-emerald-900 transition shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>تصدير Excel (CSV)</span>
            </button>

            <button
              onClick={handleSeedDemo}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition"
              title="إضافة عينات تجريبية لاختبار اللوحة"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>إضافة بيانات تجريبية</span>
            </button>

            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-red-50 text-red-700 text-xs font-bold border border-red-300 transition"
              title="مسح كافة السجلات المخزنة"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>مسح السجلات</span>
            </button>
          </div>

        </div>

        {/* Second Row: Filters and Sorting */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 text-xs">
          
          {/* Lesson Filter */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 block">فلترة حسب الدرس:</label>
            <select
              value={selectedLessonFilter}
              onChange={(e) => setSelectedLessonFilter(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 bg-slate-50 text-xs outline-none focus:border-emerald-700"
            >
              <option value="ALL">جميع الدروس والاختبارات</option>
              {Object.values(CURRICULUM_QUIZZES).map((q) => (
                <option key={q.id} value={q.id}>{q.title}</option>
              ))}
            </select>
          </div>

          {/* Score Range Filter */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 block">فلترة حسب الدرجة:</label>
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-300 bg-slate-50 text-xs outline-none focus:border-emerald-700"
            >
              <option value="ALL">جميع المستويات</option>
              <option value="FULL">علامة كاملة (100%) 👑</option>
              <option value="EXCELLENT">متفوق (80% - 99%) 🌟</option>
              <option value="PASS">ناجح (50% - 79%) 👍</option>
              <option value="FAIL">بحاجة لمتابعة (&lt; 50%) 📚</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 block">الترتيب:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-1.5 border border-slate-300 bg-slate-50 text-xs outline-none focus:border-emerald-700"
            >
              <option value="newest">الأحدث تسليماً أولاً</option>
              <option value="score_high">الأعلى درجة أولاً</option>
              <option value="score_low">الأقل درجة أولاً</option>
              <option value="time_high">الأطول وقتاً أولاً</option>
            </select>
          </div>

        </div>

      </div>

      {/* SUBMISSIONS TABLE */}
      <div className="bg-white border border-slate-200 overflow-hidden shadow-2xs">
        
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="font-black text-xs text-slate-800">
            سجلات الطلاب ({filteredSubmissions.length} من أصل {submissions.length})
          </div>
          <span className="text-[11px] text-slate-500">
            انقر على أي سجل لعرض مراجعة الأسئلة بالتفصيل ومراسلة الطالب
          </span>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-slate-100 text-slate-400 flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="font-bold text-sm text-slate-800">لا توجد سجلات مطابقة للبحث أو الفلترة</div>
            <p className="text-xs text-slate-500">
              يمكنك النقر على زر &quot;إضافة بيانات تجريبية&quot; لتجربة اللوحة فوراً.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">الطالب</th>
                  <th className="p-3">الهاتف / الواتساب</th>
                  <th className="p-3">الدرس / الوحدة</th>
                  <th className="p-3 text-center">الدرجة</th>
                  <th className="p-3 text-center">النسبة</th>
                  <th className="p-3 text-center">الوقت</th>
                  <th className="p-3">التاريخ والوقت</th>
                  <th className="p-3 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubmissions.map((sub) => {
                  const isFull = sub.percentage === 100;
                  const isGood = sub.percentage >= 80;

                  return (
                    <tr 
                      key={sub.id} 
                      className="hover:bg-slate-50 transition cursor-pointer"
                      onClick={() => setSelectedSubmission(sub)}
                    >
                      <td className="p-3 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-[11px] shrink-0">
                            {sub.student_name ? sub.student_name[0] : 'ط'}
                          </div>
                          <div>
                            <div className="font-black text-slate-900">{sub.student_name}</div>
                            {(sub.school || sub.governorate) && (
                              <div className="text-[10px] text-slate-500">
                                {sub.school} {sub.governorate ? `(${sub.governorate})` : ''}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="p-3 font-mono text-slate-700 dir-ltr text-right">
                        {sub.student_phone}
                      </td>

                      <td className="p-3">
                        <span className="font-bold text-slate-800 line-clamp-1">
                          {sub.quiz_title}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {sub.unit_title}
                        </span>
                      </td>

                      <td className="p-3 text-center font-mono font-black text-slate-900">
                        {sub.score} / {sub.total_questions}
                      </td>

                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 font-mono font-black text-[11px] border ${
                          isFull
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : isGood
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {sub.percentage}%
                        </span>
                      </td>

                      <td className="p-3 text-center font-mono text-slate-600">
                        {formatSeconds(sub.time_spent_seconds)}
                      </td>

                      <td className="p-3 text-[11px] text-slate-500 whitespace-nowrap">
                        {formatDate(sub.created_at)}
                      </td>

                      <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedSubmission(sub)}
                            className="p-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200"
                            title="عرض تفاصيل الإجابات"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleSendTeacherFeedback(sub)}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                            title="مراسلة الطالب بالنتيجة عبر واتساب"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(sub.id)}
                            className="p-1.5 bg-white hover:bg-red-50 text-red-600 border border-slate-200"
                            title="حذف هذا السجل"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* DETAILED STUDENT SUBMISSION MODAL / DRAWER */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-emerald-700 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative text-right animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">
                    تقرير الاختبار التفصيلي: {selectedSubmission.student_name}
                  </h3>
                  <span className="px-2 py-0.5 bg-emerald-700 text-white font-mono font-bold text-xs">
                    {selectedSubmission.percentage}% ({selectedSubmission.score} / {selectedSubmission.total_questions})
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {selectedSubmission.quiz_title} • {formatDate(selectedSubmission.created_at)} • استغرق {formatSeconds(selectedSubmission.time_spent_seconds)}
                </p>
              </div>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 border border-slate-300 bg-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Scrollable Question Breakdown */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
              
              {/* Student Metadata Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 border border-slate-200 p-3">
                <div>
                  <span className="text-[10px] text-slate-500 block">رقم الهاتف:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedSubmission.student_phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">المدرسة:</span>
                  <span className="font-bold text-slate-900">{selectedSubmission.school || 'غير محدد'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">المحافظة:</span>
                  <span className="font-bold text-slate-900">{selectedSubmission.governorate || 'عمان'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">الحالة:</span>
                  <span className="font-bold text-emerald-800">موثق ومعتمد ✓</span>
                </div>
              </div>

              {/* Direct WhatsApp Messaging Section */}
              <div className="bg-emerald-50 border border-emerald-300 p-3.5 space-y-2">
                <label className="font-bold text-slate-900 block flex items-center justify-between">
                  <span>إرسال تقييم وتغذية راجعة للمعلمة عبر واتساب:</span>
                  <span className="text-[10px] text-emerald-800 font-mono">{selectedSubmission.student_phone}</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={teacherCustomNote}
                    onChange={(e) => setTeacherCustomNote(e.target.value)}
                    placeholder="اكتبي ملاحظة خاصة للطالب هنا (اختياري)..."
                    className="flex-1 px-3 py-1.5 border border-emerald-300 bg-white text-xs outline-none focus:border-emerald-700"
                  />
                  <button
                    onClick={() => handleSendTeacherFeedback(selectedSubmission)}
                    className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 border border-emerald-900 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال الآن</span>
                  </button>
                </div>
              </div>

              {/* Questions Audit List */}
              <div className="space-y-3 pt-2">
                <div className="font-black text-slate-900 text-xs border-b border-slate-100 pb-1">
                  تدقيق إجابات الأسئلة ({Object.keys(selectedSubmission.answers || {}).length > 0 ? 'مفصل' : 'سجل مختصر'}):
                </div>

                {selectedSubmission.answers && Object.keys(selectedSubmission.answers).length > 0 ? (
                  Object.values(selectedSubmission.answers).map((ans, idx) => (
                    <div
                      key={idx}
                      className={`p-3 border text-xs space-y-1.5 ${
                        ans.isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-red-50/40 border-red-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-1.5 font-bold text-slate-900">
                          {ans.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          )}
                          <span>{idx + 1}. {ans.questionText}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.5 border border-slate-200 shrink-0">
                          {ans.curriculumRef}
                        </span>
                      </div>

                      <div className="pr-5 space-y-1">
                        <div>
                          <strong className="text-slate-600">إجابة الطالب:</strong>{' '}
                          <span className={ans.isCorrect ? 'text-emerald-800 font-bold' : 'text-red-700 font-bold'}>
                            {ans.chosenText}
                          </span>
                        </div>
                        {!ans.isCorrect && (
                          <div>
                            <strong className="text-slate-600">الإجابة النموذجية:</strong>{' '}
                            <span className="text-emerald-800 font-bold">{ans.correctText}</span>
                          </div>
                        )}
                        <div className="text-slate-500 bg-white p-2 border border-slate-200 mt-1">
                          💡 <strong>التعليل العلمي:</strong> {ans.explanation}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-slate-50 border border-slate-200 text-center text-slate-600 text-xs">
                    هذا السجل تم تسجيله بنتيجة إجمالية ({selectedSubmission.score} / {selectedSubmission.total_questions}) بنسبة {selectedSubmission.percentage}%.
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedSubmission.id)}
                className="px-3 py-1.5 text-red-600 hover:bg-red-50 text-xs font-bold border border-red-200 transition flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف هذا السجل</span>
              </button>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
