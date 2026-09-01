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
  nameEn: string;
  formula: string;
  type: 'acid_strong' | 'acid_weak' | 'neutral' | 'base_weak' | 'base_strong';
  typeName: string;
  typeNameEn: string;
  strength: 'strong' | 'weak' | 'neutral';
  ph: number;
  h_ion_relative: number;
  oh_ion_relative: number;
  color: string;
  conductivity: 'high' | 'low' | 'none';
  ionizationEquation: string;
  litmusReaction: string;
  cabbageReaction: string;
  bromothymolReaction: string;
  phenolphthaleinReaction: string;
  dailyUse: string;
  safetyRule: string;
  curriculumPage: string;
  realWorldCategory: 'industry' | 'sports' | 'biology' | 'agriculture' | 'food' | 'home';
  realWorldNote: string;
}

export const SUBSTANCES_DATA: ChemicalSubstance[] = [
  {
    id: 'battery_acid',
    name: 'حمض بطارية السيارة (حمض الكبريتيك)',
    nameEn: 'Car Battery Acid (Sulfuric Acid)',
    formula: 'H₂SO₄',
    type: 'acid_strong',
    typeName: 'حمض صناعي معدني (قوي جداً)',
    typeNameEn: 'Strong Industrial Mineral Acid',
    strength: 'strong',
    ph: 0.5,
    h_ion_relative: 100,
    oh_ion_relative: 0,
    color: '#b91c1c',
    conductivity: 'high',
    ionizationEquation: 'H₂SO₄ (aq) → 2H⁺ (aq) + SO₄²⁻ (aq)',
    litmusReaction: 'يحول ورقة تباع الشمس الزرقاء فورياً إلى الأحمر القاني',
    cabbageReaction: 'يتحول إلى لون أحمر دموي شديد الوضوح',
    bromothymolReaction: 'يتحول إلى لون أصفر فاقع',
    phenolphthaleinReaction: 'عديم اللون تماماً',
    dailyUse: 'كهرل سائل في بطاريات السيارات لتوليد الطاقة الكهربائية',
    safetyRule: 'حارق وكاوٍ جداً للجلد والأنسجة، يسبب حروقاً بالغة وتآكل المواد',
    curriculumPage: 'ص 47، 54',
    realWorldCategory: 'industry',
    realWorldNote: 'تأين كلي ينتج تركيزاً عالياً جداً من أيونات H⁺، موصليته الكهربائية فائقة.'
  },
  {
    id: 'hcl',
    name: 'حمض الهيدروكلوريك (حمض المعدة / روح الملح)',
    nameEn: 'Hydrochloric Acid (Stomach Acid)',
    formula: 'HCl',
    type: 'acid_strong',
    typeName: 'حمض معدني قوي (تأين كلي)',
    typeNameEn: 'Strong Mineral Acid (Full Ionization)',
    strength: 'strong',
    ph: 1.0,
    h_ion_relative: 98,
    oh_ion_relative: 0,
    color: '#dc2626',
    conductivity: 'high',
    ionizationEquation: 'HCl (aq) → H⁺ (aq) + Cl⁻ (aq)',
    litmusReaction: 'يحول ورقة تباع الشمس الزرقاء فورياً إلى الأحمر القاني',
    cabbageReaction: 'يتحول إلى أحمر قرمزي فاقع',
    bromothymolReaction: 'يتحول إلى لون أصفر صريح',
    phenolphthaleinReaction: 'عديم اللون (شفاف)',
    dailyUse: 'يفرز في معدة الإنسان للمساعدة في الهضم وتنشيط الإنزيمات، ويصنع منه 20 مليون طن سنوياً لصناعة البلاستيك وتنظيف المعادن',
    safetyRule: 'سائل كاوٍ وحارق ومسبب لتآكل المعادن والجلد، يُمنع لمسه أو استنشاق أبخرته',
    curriculumPage: 'ص 43، 46، 47، 52، 54',
    realWorldCategory: 'biology',
    realWorldNote: 'يُصنع عالمياً بنحو 20 مليون طن سنوياً، وهو المسؤول عن الحموضة الهضمية في المعدة.'
  },
  {
    id: 'lemon',
    name: 'عصير الليمون والبرتقال (حمض الستريك)',
    nameEn: 'Lemon / Citrus Juice (Citric Acid)',
    formula: 'C₆H₈O₇',
    type: 'acid_weak',
    typeName: 'حمض طبيعي عضوي (ضعيف)',
    typeNameEn: 'Weak Natural Organic Acid',
    strength: 'weak',
    ph: 2.2,
    h_ion_relative: 85,
    oh_ion_relative: 1,
    color: '#ea580c',
    conductivity: 'low',
    ionizationEquation: 'C₆H₈O₇ (aq) ⇌ H⁺ (aq) + C₆H₇O₇⁻ (aq)',
    litmusReaction: 'يحول ورقة تباع الشمس الزرقاء إلى اللون الأحمر',
    cabbageReaction: 'يتحول مستخلص الملفوف الأحمر إلى الوردي الفاقع / الأحمر',
    bromothymolReaction: 'يتحول إلى لون أصفر',
    phenolphthaleinReaction: 'عديم اللون',
    dailyUse: 'إضفاء الطعم الحامضي المميز، مصدر غني بفيتامين C، وحفظ الأغذية',
    safetyRule: 'آمن غذائياً، قد يسبب وخزاً بسيطاً في حال ملامسة الجروح أو العينين',
    curriculumPage: 'ص 45، 46، 54',
    realWorldCategory: 'food',
    realWorldNote: 'يعطي الحمضيات طعمها اللاذع اللطيف، ويتأين جزئياً فقط في المحلول.'
  },
  {
    id: 'vinegar',
    name: 'الخل المنزلي (حمض الإيثانويك / الأسيتيك)',
    nameEn: 'Household Vinegar (Ethanoic / Acetic Acid)',
    formula: 'CH₃COOH',
    type: 'acid_weak',
    typeName: 'حمض عضوي ضعيف (تأين جزئي)',
    typeNameEn: 'Weak Organic Acid (Partial Ionization)',
    strength: 'weak',
    ph: 2.8,
    h_ion_relative: 72,
    oh_ion_relative: 2,
    color: '#f97316',
    conductivity: 'low',
    ionizationEquation: 'CH₃COOH (aq) ⇌ H⁺ (aq) + CH₃COO⁻ (aq)',
    litmusReaction: 'يحول ورقة تباع الشمس الزرقاء إلى اللون الأحمر',
    cabbageReaction: 'يتحول مستخلص الملفوف الأحمر إلى الوردي المحمر',
    bromothymolReaction: 'يتحول إلى أصفر',
    phenolphthaleinReaction: 'عديم اللون',
    dailyUse: 'تتبيل وحفظ الأطعمة والمخللات، التنظيف الخفيف وإزالة الترسبات الكلسية',
    safetyRule: 'آمن عند التراكيز الغذائية، تجنب استنشاق أبخرة حمض الأسيتيك الجليدي المركز',
    curriculumPage: 'ص 46، 52، 54',
    realWorldCategory: 'home',
    realWorldNote: 'تأين جزئي بسهمين متعاكسين (⇌) وموصليته أقل من حمض HCl المساوي له في التركيز.'
  },
  {
    id: 'tomato',
    name: 'رب البندورة وعصير الطماطم',
    nameEn: 'Tomato Paste / Juice',
    formula: 'Organic Acids Mix',
    type: 'acid_weak',
    typeName: 'وسط غذائي حمضي خفيف',
    typeNameEn: 'Mildly Acidic Food Medium',
    strength: 'weak',
    ph: 4.2,
    h_ion_relative: 50,
    oh_ion_relative: 3,
    color: '#fb923c',
    conductivity: 'low',
    ionizationEquation: 'R-COOH (aq) ⇌ H⁺ (aq) + R-COO⁻ (aq)',
    litmusReaction: 'يحول ورقة تباع الشمس الزرقاء ببطء إلى اللون الأحمر الوردي',
    cabbageReaction: 'يتحول إلى لون وردي أرجواني',
    bromothymolReaction: 'يميل إلى اللون الأصفر المخضر',
    phenolphthaleinReaction: 'عديم اللون',
    dailyUse: 'إعداد الوجبات الغذائية وصناعة معجون الطماطم والصلصات',
    safetyRule: 'آمن غذائياً تماماً',
    curriculumPage: 'ص 45، 54',
    realWorldCategory: 'food',
    realWorldNote: 'تجربة استهلالية ص 45: تركيز أيون H⁺ فيه أقل من الخل ولكن أعلى من الحليب والماء.'
  },
  {
    id: 'milk_lactic',
    name: 'اللبن والحليب (حمض اللاكتيك)',
    nameEn: 'Yogurt & Milk (Lactic Acid)',
    formula: 'C₃H₆O₃',
    type: 'acid_weak',
    typeName: 'حمض عضوي ضعيف (حمض اللبن)',
    typeNameEn: 'Weak Organic Acid (Lactic Acid)',
    strength: 'weak',
    ph: 6.6,
    h_ion_relative: 25,
    oh_ion_relative: 8,
    color: '#84cc16',
    conductivity: 'low',
    ionizationEquation: 'C₃H₆O₃ (aq) ⇌ H⁺ (aq) + C₃H₅O₃⁻ (aq)',
    litmusReaction: 'تأثير ضعيف جداً يكاد لا يغير ورقة تباع الشمس الزرقاء',
    cabbageReaction: 'بنفسجي فاتح مائل للزرقة الخفيفة',
    bromothymolReaction: 'أخضر مائل للصفرة',
    phenolphthaleinReaction: 'عديم اللون',
    dailyUse: 'منتج غذائي يومي غني بالكالسيوم والبروتينات ومفيد لصحة الجهاز الهضمي',
    safetyRule: 'آمن غذائياً وصحي',
    curriculumPage: 'ص 45، 46، 47، 54',
    realWorldCategory: 'sports',
    realWorldNote: 'الربط بالرياضة ص 47: ألم العضلات بعد 24 ساعة يعود لتمزقات دقيقة والتهابات وليس لتراكم حمض اللاكتيك الذي يختفي بعد ساعة.'
  },
  {
    id: 'water',
    name: 'الماء النقي المقطر (تعادل كيميائي)',
    nameEn: 'Pure Distilled Water (Neutral)',
    formula: 'H₂O',
    type: 'neutral',
    typeName: 'مادة متعادلة كيميائياً (pH = 7.0)',
    typeNameEn: 'Chemically Neutral (pH = 7.0)',
    strength: 'neutral',
    ph: 7.0,
    h_ion_relative: 10,
    oh_ion_relative: 10,
    color: '#10b981',
    conductivity: 'none',
    ionizationEquation: 'H₂O (l) ⇌ H⁺ (aq) + OH⁻ (aq)',
    litmusReaction: 'لا يغير لون ورقتي تباع الشمس الزرقاء أو الحمراء',
    cabbageReaction: 'يبقى لون مستخلص الملفوف بنفسجياً هادئاً كما هو دون تغير',
    bromothymolReaction: 'أخضر عشبي نقي (نقطة التعادل)',
    phenolphthaleinReaction: 'عديم اللون تماماً',
    dailyUse: 'أساس الحياة لجميع الكائنات الحية والمذيب العام لجميع التفاعلات الكيميائية',
    safetyRule: 'آمن تماماً وصالح للاستخدام المخبري والشرب',
    curriculumPage: 'ص 45، 54',
    realWorldCategory: 'biology',
    realWorldNote: 'يتساوى فيه تركيز [H⁺] = [OH⁻] = 1×10⁻⁷ M عند درجة حرارة 25°C.'
  },
  {
    id: 'sea_water',
    name: 'ماء البحر (وسط قاعدي خفيف)',
    nameEn: 'Sea Water (Mild Alkaline)',
    formula: 'H₂O + Mineral Salts',
    type: 'base_weak',
    typeName: 'محلول مائي قاعدي طبيعي خفيف',
    typeNameEn: 'Natural Mildly Alkaline Salt Water',
    strength: 'weak',
    ph: 8.2,
    h_ion_relative: 5,
    oh_ion_relative: 25,
    color: '#06b6d4',
    conductivity: 'high',
    ionizationEquation: 'HCO₃⁻ (aq) + H₂O (l) ⇌ H₂CO₃ (aq) + OH⁻ (aq)',
    litmusReaction: 'يحول ورقة تباع الشمس الحمراء ببطء إلى اللون الأزرق الفاتح',
    cabbageReaction: 'يتحول مستخلص الملفوف إلى الأزرق النيلي الهادئ',
    bromothymolReaction: 'أزرق فاتح مخضر',
    phenolphthaleinReaction: 'عديم اللون أو وردي باهت جداً',
    dailyUse: 'بيئة بحرية حيوية للمرجان والكائنات البحرية الغنية بالأملاح المعدنية',
    safetyRule: 'آمن للسباحة، غير صالح للشرب المباشر لارتفاع ملوحته',
    curriculumPage: 'ص 54',
    realWorldCategory: 'biology',
    realWorldNote: 'ص 54: أكثر قاعدية من الماء النقي بسبب ذوبان كربونات وأملاح المعادن فيه.'
  },
  {
    id: 'baking_soda',
    name: 'كربونات الصوديوم الهيدروجينية (البيكنج صودا)',
    nameEn: 'Sodium Bicarbonate (Baking Soda)',
    formula: 'NaHCO₃',
    type: 'base_weak',
    typeName: 'قاعدة ضعيفة / ملح ذو أثر قاعدي',
    typeNameEn: 'Weak Base / Alkaline Salt',
    strength: 'weak',
    ph: 8.5,
    h_ion_relative: 3,
    oh_ion_relative: 35,
    color: '#0284c7',
    conductivity: 'low',
    ionizationEquation: 'HCO₃⁻ (aq) + H₂O (l) ⇌ H₂CO₃ (aq) + OH⁻ (aq)',
    litmusReaction: 'يحول ورقة تباع الشمس الحمراء إلى اللون الأزرق الهادئ',
    cabbageReaction: 'يتحول مستخلص الملفوف الأحمر إلى اللون الأزرق النيلي الصريح',
    bromothymolReaction: 'أزرق صريح',
    phenolphthaleinReaction: 'وردي باهت جداً',
    dailyUse: 'نفخ المخبوزات والكعك، وصناعة أقراص فوارة لعلاج حموضة المعدة، ومعالجة لدغات النمل الحمضية',
    safetyRule: 'آمن غذائياً، تجنب ملامسته للعينين بكميات كبيرة',
    curriculumPage: 'ص 45، 54',
    realWorldCategory: 'home',
    realWorldNote: 'يتفاعل مع الأحماض ليطلق غاز ثاني أكسيد الكربون CO₂ الذي يرفع العجين ويعادل الحموضة.'
  },
  {
    id: 'ammonia',
    name: 'محلول الأمونيا (هيدروكسيد الأمونيوم)',
    nameEn: 'Ammonia Solution (Ammonium Hydroxide)',
    formula: 'NH₃',
    type: 'base_weak',
    typeName: 'قاعدة ضعيفة (تأين جزئي بدون OH أولي)',
    typeNameEn: 'Weak Base (Partial Ionization Without Initial OH)',
    strength: 'weak',
    ph: 11.2,
    h_ion_relative: 1,
    oh_ion_relative: 65,
    color: '#4f46e5',
    conductivity: 'low',
    ionizationEquation: 'NH₃ (g) + H₂O (l) ⇌ NH₄⁺ (aq) + OH⁻ (aq)',
    litmusReaction: 'يحول ورقة تباع الشمس الحمراء إلى اللون الأزرق',
    cabbageReaction: 'يتحول مستخلص الملفوف إلى اللون الأخضر الزيتوني',
    bromothymolReaction: 'أزرق قاتم',
    phenolphthaleinReaction: 'وردي فاقع',
    dailyUse: 'منظفات الزجاج المنزلية، صناعة الأسمدة النيتروجينية الزراعية',
    safetyRule: 'غاز ذو رائحة نفاذة جداً ومثيرة للجهاز التنفسي، يجب التعامل معه في مكان جيد التهوية',
    curriculumPage: 'ص 50، 53، 54',
    realWorldCategory: 'home',
    realWorldNote: 'ص 50: الأمونيا لا تحتوي على OH⁻ في صيغتها لكنها تتفاعل مع الماء لتنتج OH⁻.'
  },
  {
    id: 'slaked_lime',
    name: 'هيدروكسيد الكالسيوم (الجير المطفأ / معالجة التربة)',
    nameEn: 'Calcium Hydroxide (Slaked Lime / Soil Neutralizer)',
    formula: 'Ca(OH)₂',
    type: 'base_strong',
    typeName: 'قاعدة قوية / قلوي ذائب (Strong Alkali)',
    typeNameEn: 'Strong Base / Alkali for Agricultural Soil Treatment',
    strength: 'strong',
    ph: 12.4,
    h_ion_relative: 0,
    oh_ion_relative: 85,
    color: '#7c3aed',
    conductivity: 'high',
    ionizationEquation: 'Ca(OH)₂ (s) → Ca²⁺ (aq) + 2OH⁻ (aq)',
    litmusReaction: 'يحول ورقة تباع الشمس الحمراء إلى الأزرق الداكن',
    cabbageReaction: 'يتحول مستخلص الملفوف إلى اللون الأخضر المصفر',
    bromothymolReaction: 'أزرق داكن شديد الوضوح',
    phenolphthaleinReaction: 'وردي قرمزي قوي (Fuchsia Pink)',
    dailyUse: 'معالجة ومعادلة حموضة التربة الزراعية الزائدة لتوفير بيئة مثالية لنمو المحاصيل، وصناعة الإسمنت ومواد البناء',
    safetyRule: 'مادة قلوية كاوية ومسببة للتهيج، تجنب استنشاق غبارها أو ملامسة الجلد',
    curriculumPage: 'ص 49، 53، 55',
    realWorldCategory: 'agriculture',
    realWorldNote: 'الربط بالزراعة ص 55: يُستخدم محلول Ca(OH)₂ لمعادلة التربة شديدة الحموضة لإعادة التوازن للرقم الهيدروجيني.'
  },
  {
    id: 'naoh',
    name: 'هيدروكسيد الصوديوم (الصودا الكاوية / منظف المصارف)',
    nameEn: 'Sodium Hydroxide (Caustic Soda / Drain Cleaner)',
    formula: 'NaOH',
    type: 'base_strong',
    typeName: 'قاعدة قوية جداً / قلوي قوي (Strong Alkali)',
    typeNameEn: 'Strong Alkali (Full Ionization)',
    strength: 'strong',
    ph: 13.8,
    h_ion_relative: 0,
    oh_ion_relative: 100,
    color: '#6d28d9',
    conductivity: 'high',
    ionizationEquation: 'NaOH (s) → Na⁺ (aq) + OH⁻ (aq)',
    litmusReaction: 'يحول ورقة تباع الشمس الحمراء فورياً إلى اللون الأزرق / البنفسجي القاتم',
    cabbageReaction: 'يتحول مستخلص الملفوف فورياً إلى الأخضر المصفر ثم الأصفر الفاقع',
    bromothymolReaction: 'أزرق داكن قوي',
    phenolphthaleinReaction: 'وردي فوشيا داكن ومركز جداً',
    dailyUse: 'صناعة الصابون والورق (60 مليون طن سنوياً عالمياً)، وتسليك المصارف المنزلية المسدودة بإذابة الدهون العالقة',
    safetyRule: 'شديد الكي والحرق للأنسجة والجلد مسبباً تآكلاً حاداً! يُحظر لمسه أو تذوقه نهائياً',
    curriculumPage: 'ص 43، 49، 50، 53، 54',
    realWorldCategory: 'industry',
    realWorldNote: 'الربط بالصناعة ص 43 و 50: يُنتج منه 60 مليون طن سنوياً، وهو الفاعل الأساسي في تسليك المصارف وإذابة المواد العضوية.'
  }
];

export interface IndicatorData {
  id: string;
  name: string;
  nameEn: string;
  type: 'natural' | 'synthetic' | 'universal';
  acidColor: string;
  neutralColor: string;
  baseColor: string;
  phTransitionRange: string;
  description: string;
  curriculumReference: string;
}

export const INDICATORS_DATA: IndicatorData[] = [
  {
    id: 'litmus',
    name: 'كاشف تباع الشمس (أحمر وأزرق)',
    nameEn: 'Litmus Paper (Red & Blue)',
    type: 'synthetic',
    acidColor: '#ef4444', // Red in acid
    neutralColor: '#a855f7', // Purple/Unchanged in neutral
    baseColor: '#3b82f6', // Blue in base
    phTransitionRange: 'pH 4.5 - 8.3',
    description: 'يوجد على شكل أشرطة ورقية أو محلول باللونين الأزرق والأحمر. في الحمض يتحول الأزرق إلى الأحمر، وفي القاعدة يتحول الأحمر إلى الأزرق.',
    curriculumReference: 'ص 49، 51'
  },
  {
    id: 'cabbage',
    name: 'مستخلص الملفوف الأحمر الطبيعي',
    nameEn: 'Red Cabbage Natural Extract',
    type: 'natural',
    acidColor: '#e11d48', // Bright Pink/Red
    neutralColor: '#9333ea', // Natural Violet/Purple
    baseColor: '#10b981', // Blue -> Green -> Yellow
    phTransitionRange: 'pH 1 - 14 (Continuous Spectrum)',
    description: 'كاشف طبيعي يحتوي على صبغة الأنثوسيانين، يعطي تدرجاً واسعاً من الأحمر الفاقع في الأحماض القوية إلى البنفسجي في التعادل، والأزرق والأخضر والأصفر في القواعد.',
    curriculumReference: 'ص 55'
  },
  {
    id: 'phenolphthalein',
    name: 'كاشف الفينولفثالين (Phenolphthalein)',
    nameEn: 'Phenolphthalein Indicator',
    type: 'synthetic',
    acidColor: '#ffffff', // Colorless (Transparent)
    neutralColor: '#ffffff', // Colorless
    baseColor: '#ec4899', // Bright Fuchsia Pink
    phTransitionRange: 'pH 8.2 - 10.0',
    description: 'كاشف صناعي حساس جداً للمعايرة؛ يكون عديم اللون تماماً في الوسط الحمضي والمتعادل، ويتحول إلى لون زهري/وردي فاقع في الوسط القاعدي.',
    curriculumReference: 'ص 49، 51'
  },
  {
    id: 'bromothymol',
    name: 'كاشف أزرق البروموثيمول (Bromothymol Blue)',
    nameEn: 'Bromothymol Blue',
    type: 'synthetic',
    acidColor: '#eab308', // Yellow
    neutralColor: '#22c55e', // Green
    baseColor: '#2563eb', // Blue
    phTransitionRange: 'pH 6.0 - 7.6',
    description: 'كاشف صناعي عالي الدقة لنقطة التعادل؛ يكون أصفر في الوسط الحمضي، أخضر عند التعادل التام (pH=7)، وأزرق في الوسط القاعدي.',
    curriculumReference: 'ص 55'
  },
  {
    id: 'universal',
    name: 'الكاشف العام (Universal Indicator)',
    nameEn: 'Universal Indicator (Paper & Solution)',
    type: 'universal',
    acidColor: '#dc2626', // Red-Orange (0-6)
    neutralColor: '#16a34a', // Emerald Green (7)
    baseColor: '#7c3aed', // Blue-Violet (8-14)
    phTransitionRange: 'pH 0 - 14',
    description: 'مزيج مركب من عدة كواشف على شكل شريط ورقي أو سائل ملحق بدليل ألوان قياسي مدرج لتقدير قيمة pH من 0 إلى 14.',
    curriculumReference: 'ص 45، 55'
  }
];

