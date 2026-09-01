// Cloudflare Environment Types and Bindings
export interface CloudflareEnv {
  DB: any;
  STORAGE: any;
  AI: any;
  NEXT_PUBLIC_SCHOOL_NAME: string;
  NEXT_PUBLIC_TEACHER_NAME: string;
  EVOLUTION_API_URL: string;
  EVOLUTION_INSTANCE_NAME: string;
  EVOLUTION_API_KEY: string;
}

export interface StudentQuizResult {
  id: string;
  student_phone: string;
  student_name: string;
  score: number;
  total_questions: number;
  time_spent_seconds: number;
  answers_json?: string;
  created_at: string;
}

export interface ChemicalSubstance {
  id: string;
  name: string;
  formula: string;
  type: 'acid_strong' | 'acid_weak' | 'neutral' | 'base_weak' | 'base_strong';
  typeName: string;
  ph: number;
  h_ion_relative: number;
  oh_ion_relative: number;
  color: string;
  litmusReaction: string;
  cabbageReaction: string;
  dailyUse: string;
  safetyRule: string;
}

export const SUBSTANCES_DATA: ChemicalSubstance[] = [
  {
    id: 'lemon',
    name: 'عصير الليمون (حمض الستريك)',
    formula: 'C₆H₈O₇',
    type: 'acid_weak',
    typeName: 'حمض طبيعي (ضعيف)',
    ph: 2.3,
    h_ion_relative: 85,
    oh_ion_relative: 1,
    color: '#ef4444', // Red on pH scale
    litmusReaction: 'يحول ورقة تباع الشمس الزرقاء إلى اللون الأحمر',
    cabbageReaction: 'يتحول مستخلص الملفوف الأحمر إلى الوردي الفاقع / الأحمر',
    dailyUse: 'نكهة الأطعمة وحفظ المواد الغذائية وفيتامين C',
    safetyRule: 'آمن غذائياً، يسبب وخزاً خفيفاً في حال ملامسة الجروح'
  },
  {
    id: 'vinegar',
    name: 'الخل المنزلي (حمض الإيثانويك / الأسيتيك)',
    formula: 'CH₃COOH',
    type: 'acid_weak',
    typeName: 'حمض طبيعي (ضعيف)',
    ph: 2.9,
    h_ion_relative: 75,
    oh_ion_relative: 2,
    color: '#f97316', // Orange-Red
    litmusReaction: 'يحول ورقة تباع الشمس الزرقاء إلى اللون الأحمر',
    cabbageReaction: 'يتحول مستخلص الملفوف الأحمر إلى الوردي المحمر',
    dailyUse: 'تخليل الأطعمة، التنظيف والتعقيم الخفيف',
    safetyRule: 'تجنب استنشاق أبخرته المركزة أو ملامسة العينين'
  },
  {
    id: 'hcl',
    name: 'حمض الهيدروكلوريك (حمض المعدة / روح الملح)',
    formula: 'HCl',
    type: 'acid_strong',
    typeName: 'حمض صناعي معدني (قوي جداً)',
    ph: 1.0,
    h_ion_relative: 100,
    oh_ion_relative: 0,
    color: '#dc2626', // Deep Red
    litmusReaction: 'يحول ورقة تباع الشمس الزرقاء فورياً إلى الأحمر القاني',
    cabbageReaction: 'يتحول إلى لون أحمر دموي قوي وشديد الوضوح',
    dailyUse: 'هضم البروتينات في المعدة، تنظيف المعادن والمنشآت الصناعية',
    safetyRule: 'كاوٍ وحارق للجلد والأقمشة! يجب ارتداء القفازات والنظارات الواقية'
  },
  {
    id: 'water',
    name: 'الماء النقي (المقطر)',
    formula: 'H₂O',
    type: 'neutral',
    typeName: 'مادة متعادلة كيميائياً',
    ph: 7.0,
    h_ion_relative: 10,
    oh_ion_relative: 10,
    color: '#10b981', // Emerald Green
    litmusReaction: 'لا يغير لون ورقة تباع الشمس (تبقى كما هي)',
    cabbageReaction: 'يبقى لون مستخلص الملفوف بنفسجياً هادئاً دون تغير',
    dailyUse: 'أساس الحياة والوسط المذيب لجميع التفاعلات الحيوية',
    safetyRule: 'آمن تماماً وصالح للاستخدام المخبري والشرب'
  },
  {
    id: 'baking_soda',
    name: 'كربونات الصوديوم الهيدروجينية (البيكنج صودا)',
    formula: 'NaHCO₃',
    type: 'base_weak',
    typeName: 'قاعدة ضعيفة / ملح قاعدي',
    ph: 8.4,
    h_ion_relative: 2,
    oh_ion_relative: 30,
    color: '#06b6d4', // Cyan
    litmusReaction: 'يحول ورقة تباع الشمس الحمراء إلى اللون الأزرق الهادئ',
    cabbageReaction: 'يتحول مستخلص الملفوف الأحمر إلى اللون الأزرق النيلي',
    dailyUse: 'نفخ المخبوزات وصناعة أدوية علاج حموضة المعدة',
    safetyRule: 'آمن غذائياً، تجنب استنشاق المسحوق الجاف'
  },
  {
    id: 'soap',
    name: 'محلول الصابون المنزلي',
    formula: 'R-COONa',
    type: 'base_weak',
    typeName: 'قاعدة متوسطة ذات ملمس صابوني زلق',
    ph: 9.8,
    h_ion_relative: 1,
    oh_ion_relative: 60,
    color: '#3b82f6', // Blue
    litmusReaction: 'يحول ورقة تباع الشمس الحمراء إلى الأزرق الصريح',
    cabbageReaction: 'يتحول مستخلص الملفوف إلى الأزرق المخضر',
    dailyUse: 'إذابة الدهون والجراثيم في عمليات النظافة الشخصية',
    safetyRule: 'يسبب تهيج العينين والحرقة عند ملامستهما'
  },
  {
    id: 'naoh',
    name: 'هيدروكسيد الصوديوم (الصودا الكاوية / تسليك المجاري)',
    formula: 'NaOH',
    type: 'base_strong',
    typeName: 'قاعدة صناعية قوية جداً',
    ph: 13.5,
    h_ion_relative: 0,
    oh_ion_relative: 100,
    color: '#7c3aed', // Purple
    litmusReaction: 'يحول ورقة تباع الشمس الحمراء فورياً إلى اللون الأزرق/البنفسجي القاتم',
    cabbageReaction: 'يتحول مستخلص الملفوف إلى اللون الأخضر الزيتوني ثم الأصفر الفاقع',
    dailyUse: 'صناعة الصابون والورق وتنظيف وتذويب دهون المصارف المسدودة',
    safetyRule: 'مادة كاوية ومسببة للتآكل الشديد للجلد! يُحظر لمسها أو تذوقها قطعياً'
  }
];
