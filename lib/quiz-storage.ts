'use client';

export interface QuestionAnswerDetail {
  questionId: number;
  questionText: string;
  options: string[];
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  chosenText: string;
  correctText: string;
  category: string;
  curriculumRef: string;
  explanation: string;
}

export interface QuizSubmission {
  id: string;
  student_name: string;
  student_phone: string;
  school?: string;
  governorate?: string;
  quiz_id: string;
  quiz_title: string;
  unit_title: string;
  score: number;
  total_questions: number;
  percentage: number;
  time_spent_seconds: number;
  created_at: string;
  answers: Record<number, QuestionAnswerDetail>;
}

const STORAGE_KEY = 'farah_chem_quiz_submissions';

export function getAllQuizSubmissions(): QuizSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list: QuizSubmission[] = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (err) {
    console.error('Error reading quiz submissions:', err);
    return [];
  }
}

export function saveQuizSubmission(submission: QuizSubmission): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getAllQuizSubmissions();
    const updated = [submission, ...existing.filter((s) => s.id !== submission.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Try posting to API route asynchronously for server/D1 integration
    try {
      fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      }).catch(() => {
        // quiet in static export
      });
    } catch {
      // quiet
    }
  } catch (err) {
    console.error('Error saving quiz submission:', err);
  }
}

export function deleteQuizSubmission(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getAllQuizSubmissions();
    const filtered = existing.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Error deleting submission:', err);
  }
}

export function clearAllQuizSubmissions(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing submissions:', err);
  }
}

export function seedDemoQuizSubmissions(): QuizSubmission[] {
  const demoList: QuizSubmission[] = [
    {
      id: 'sub-demo-01',
      student_name: 'سارة أحمد العبداللات',
      student_phone: '0798765432',
      school: 'المدرسة الإسلامية الحديثة',
      governorate: 'عمان',
      quiz_id: 'unit1_lesson1',
      quiz_title: 'الدرس الأول: مكوّنات الذرّة والنماذج الذرية والنظائر',
      unit_title: 'الوحدة الأولى: بِنية الذرّة',
      score: 10,
      total_questions: 10,
      percentage: 100,
      time_spent_seconds: 142,
      created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      answers: {
        0: {
          questionId: 101,
          questionText: 'ما هو الفرض الأساسي الذي وضعه العالم جون دالتون في نموذجه الذري؟',
          options: ['الذرة جسيم كروي مصمت متجانس غير قابل للتجزئة أو الفناء'],
          selectedIndex: 0,
          correctIndex: 0,
          isCorrect: true,
          chosenText: 'الذرة جسيم كروي مصمت متجانس غير قابل للتجزئة أو الفناء',
          correctText: 'الذرة جسيم كروي مصمت متجانس غير قابل للتجزئة أو الفناء',
          category: 'النماذج الذرية',
          curriculumRef: 'كتاب الطالب: ص 10',
          explanation: 'افترض دالتون أن الذرة كرة مصمتة متجانسة غير قابلة للتجزئة.',
        },
      },
    },
    {
      id: 'sub-demo-02',
      student_name: 'عمر خالد بني هاني',
      student_phone: '0781234567',
      school: 'مدارس الملك عبد الله الثاني للتميز',
      governorate: 'إربد',
      quiz_id: 'unit1_lesson2',
      quiz_title: 'الدرس الثاني: التوزيع الإلكتروني والجدول الدوري',
      unit_title: 'الوحدة الأولى: بِنية الذرّة',
      score: 9,
      total_questions: 10,
      percentage: 90,
      time_spent_seconds: 198,
      created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      answers: {},
    },
    {
      id: 'sub-demo-03',
      student_name: 'رند طارق المجالي',
      student_phone: '0779871122',
      school: 'مدارس الحكمة الثانوية',
      governorate: 'الكرك',
      quiz_id: 'unit2_lesson1',
      quiz_title: 'الدرس الأول: خصائص الحموض والقواعد والرقم الهيدروجيني',
      unit_title: 'الوحدة الثانية: الحُموض والقواعد والأملاح',
      score: 10,
      total_questions: 10,
      percentage: 100,
      time_spent_seconds: 115,
      created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      answers: {},
    },
    {
      id: 'sub-demo-04',
      student_name: 'حمزة يوسف العبادي',
      student_phone: '0795554321',
      school: 'أكاديمية الرواد الدولية',
      governorate: 'البلقاء',
      quiz_id: 'unit2_lesson2',
      quiz_title: 'الدرس الثاني: تفاعلات التعادل والمعايرة والأملاح',
      unit_title: 'الوحدة الثانية: الحُموض والقواعد والأملاح',
      score: 8,
      total_questions: 10,
      percentage: 80,
      time_spent_seconds: 240,
      created_at: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
      answers: {},
    },
    {
      id: 'sub-demo-05',
      student_name: 'ميساء إبراهيم قاسم',
      student_phone: '0788877665',
      school: 'مدارس الرأي',
      governorate: 'الزرقاء',
      quiz_id: 'comprehensive',
      quiz_title: 'الاختبار الشامل للفصل الدراسي الأول (تحدي أوائل الكيمياء)',
      unit_title: 'الكيمياء - الصف التاسع',
      score: 9,
      total_questions: 10,
      percentage: 90,
      time_spent_seconds: 285,
      created_at: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
      answers: {},
    },
  ];

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoList));
  }
  return demoList;
}
