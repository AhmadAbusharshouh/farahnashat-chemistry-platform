// Comprehensive Jordanian Chemistry Grade 9 First Semester Curriculum Database
// Author: Farah Nashat Chemistry Platform & National Center for Curriculum Development (NCCD / Collins)

export interface QuizQuestion {
  id: number;
  question: string;
  questionEn: string;
  options: string[];
  optionsEn: string[];
  correctIndex: number;
  curriculumRef: string;
  category: string;
  explanation: string;
}

export interface LessonQuiz {
  id: string;
  unitNumber: number;
  lessonNumber: number;
  title: string;
  titleEn: string;
  unitTitle: string;
  unitTitleEn: string;
  pageRange: string;
  badge: string;
  description: string;
  questions: QuizQuestion[];
}

export const CURRICULUM_QUIZZES: Record<string, LessonQuiz> = {
  "unit1_lesson1": {
    "id": "unit1_lesson1",
    "unitNumber": 1,
    "lessonNumber": 1,
    "title": "الدرس الأول: مكوّنات الذرّة والنماذج الذرية والنظائر",
    "titleEn": "Lesson 1: Atomic Structure, Models & Isotopes",
    "unitTitle": "الوحدة الأولى: بِنية الذرّة",
    "unitTitleEn": "Unit 1: Structure of the Atom",
    "pageRange": "الصفحات 10 - 19",
    "badge": "بنية الذرة",
    "description": "نماذج دالتون وثومسون ورذرفورد، وتجارب التحليل والتفريغ الكهربائي، وحسابات البروتونات والإلكترونات والنيوترونات، ومفهوم النظائر وتطبيقاتها الطبية والجيولوجية.",
    "questions": [
      {
        "id": 101,
        "question": "ما هو الفرض الأساسي الذي وضعه العالم جون دالتون (John Dalton) في نموذجه الذري عام 1803؟",
        "questionEn": "What was Dalton’s fundamental postulate about the nature of atoms?",
        "options": [
          "الذرة جسيم كروي مصمت متجانس غير قابل للتجزئة أو الفناء",
          "الذرة تتكون من نواة موجبة كثيفة تدور حولها إلكترونات سالبة",
          "الذرة كرة موجبة مغروس بداخلها إلكترونات سالبة الشحنة",
          "الذرة فراغ هائل وتتكون من مستويات طاقة كمية محددة"
        ],
        "optionsEn": [
          "Atom is an indivisible, solid, indestructible sphere",
          "Atom consists of a dense positive nucleus orbited by electrons",
          "Atom is a positive sphere embedded with negative electrons",
          "Atom consists of vast empty space and quantized energy levels"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 10",
        "category": "النماذج الذرية",
        "explanation": "افترض دالتون في نموذجه (ص 10) أن المادة تتكون من جسيمات كروية مصمتة غير قابلة للتجزئة أو الفناء، وتتشابه ذرات العنصر الواحد في الشكل والكتلة والحجم."
      },
      {
        "id": 102,
        "question": "في تجربة التحليل الكهربائي لمصهور بروميد الرصاص PbBr₂، ماذا يتصاعد عند قطب المصعد (القطب الموجب)؟",
        "questionEn": "During electrolysis of molten lead bromide (PbBr₂), what is formed at the anode (+)?",
        "options": [
          "ترسب فلز الرصاص الفضي اللامع",
          "تصاعد أبخرة غاز البروم البنية المحمرة المميزة",
          "تصاعد غاز الهيدروجين سريع الاشتعال بفرقعة",
          "تصاعد غاز الأكسجين عديم اللون"
        ],
        "optionsEn": [
          "Shiny silver lead metal deposition",
          "Brown-reddish bromine vapors evolution",
          "Hydrogen gas with a popping sound",
          "Colorless oxygen gas"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 11 (تجربة 1)",
        "category": "التجارب المخبرية",
        "explanation": "تنجذب أيونات البروميد السالبة (Br⁻) نحو المصعد الموجب وتتأكسد متصاعدة كأبخرة بنية محمرة لغاز البروم (Br₂)، بينما تنجذب أيونات الرصاص (Pb²⁺) نحو المهبط السالب وتترسب كرصاص صلب."
      },
      {
        "id": 103,
        "question": "ما الدليل التجريبي الذي أثبت أن أشعة المهبط (Cathode Rays) في أنبوب التفريغ الكهربائي تحمل شحنة سالبة؟",
        "questionEn": "What experimental evidence proved that cathode rays carry a negative electrical charge?",
        "options": [
          "انحراف حزمة الأشعة نحو الصفيحة الموجبة عند تطبيق مجال كهربائي وانحرافها بالمجال المغناطيسي",
          "نفاذها بخط مستقيم دون أي تأثر بالمجالين الكهربائي والمغناطيسي",
          "انحرافها بشدة نحو القطب السالب عند تطبيق المجال الكهربائي",
          "تحول لون الغاز المتوهج إلى اللون البنفسجي عند رفع فرق الجهد"
        ],
        "optionsEn": [
          "Deflection toward the positive plate in an electric field and deflection by magnetic field",
          "Passing straight without deflection in any field",
          "Deflection toward the negative plate",
          "Turning violet under high voltage"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 12 - 13",
        "category": "التفريغ الكهربائي",
        "explanation": "بينت تجارب أنبوب التفريغ الكهربائي (ص 12-13) أن أشعة المهبط تنحرف مقتربة من الصفيحة الموجبة، مما دل على احتوائها على دقائق سالبة الشحنة سُميت الإلكترونات."
      },
      {
        "id": 104,
        "question": "كيف وصف العالم ثومسون (J.J. Thomson) بنية الذرة في نموذجه الشهير بعد اكتشاف الإلكترون؟",
        "questionEn": "How did Thomson describe atomic structure following his discovery of electrons?",
        "options": [
          "نواة مركزية صغيرة جداً موجبة ومحاطة بفراغ هائل تدور فيه الإلكترونات",
          "كرة متجانسة من الشحنة الموجبة مطمورة (مغروسة) بداخلها جسيمات سالبة الشحنة (الإلكترونات)",
          "سحابة إلكترونية ضبابية تتحرك في مستويات طاقة محددة الثمانية",
          "كتلة صلبة مفرغة تماماً خالية من أي شحنات كهربائية"
        ],
        "optionsEn": [
          "Small positive nucleus surrounded by vast space where electrons orbit",
          "A uniform positive sphere embedded with negative particles (electrons)",
          "A cloudy electron orbital system with octet levels",
          "A solid void completely devoid of charges"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 14",
        "category": "النماذج الذرية",
        "explanation": "اقترح ثومسون (ص 14) أن الذرة عبارة عن كرة مصمتة متجانسة موجبة الشحنة تنغرس وتتوزع بداخلها إلكترونات سالبة تكفي لجعل الذرة متعادلة الشحنة."
      },
      {
        "id": 105,
        "question": "ما الاستنتاج الرئيسي الذي توصل إليه رذرفورد عندما نفذت الغالبية العظمى من جسيمات ألفا عبر صفيحة الذهب دون انحراف؟",
        "questionEn": "What major conclusion did Rutherford draw from most alpha particles passing straight through gold foil?",
        "options": [
          "أن كتلة الذرة تتوزع بالتساوي في جميع أرجائها",
          "أن معظم حجم الذرة فراغ هائل وليست كرة مصمتة كما زعم دالتون وثومسون",
          "أن النواة تشغل معظم الحيز الفعلي لحجم الذرة",
          "أن جسيمات ألفا تكتسب شحنة سالبة داخل الذرة"
        ],
        "optionsEn": [
          "Atomic mass is uniformly distributed",
          "Most of the atom’s volume is empty space, not a solid sphere",
          "The nucleus occupies most of the atom’s actual volume",
          "Alpha particles gain negative charge"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 14 - 15",
        "category": "تجارب رذرفورد",
        "explanation": "نفاذ أكثر من 99% من دقائق ألفا على استقامتها (ص 15) أثبت أن معظم حجم الذرة فراغ، وأن شحنتها الموجبة وكتلتها تتركزان في حيز صغير جداً في المركز يُسمى النواة."
      },
      {
        "id": 106,
        "question": "ما هو الجسيم دون الذري الذي اكتشفه العالم جيمس تشادويك عام 1932 وما هي شحنته وموقعه في الذرة؟",
        "questionEn": "Which subatomic particle did James Chadwick discover in 1932 and what is its charge and location?",
        "options": [
          "البروتون؛ وموقعه داخل النواة وشحنته موجبة (+1)",
          "النيوترون؛ وموقعه داخل النواة وشحنته متعادلة (شحنته صفر)",
          "الإلكترون؛ وموقعه خارج النواة وشحنته سالبة (-1)",
          "البوزيترون؛ وموقعه في المدارات الخارجية وشحنته موجبة"
        ],
        "optionsEn": [
          "Proton: inside nucleus, positive charge (+1)",
          "Neutron: inside nucleus, neutral (0 charge)",
          "Electron: outside nucleus, negative charge (-1)",
          "Positron: outer orbitals, positive charge"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 15",
        "category": "مكونات الذرة",
        "explanation": "اكتشف العالم جيمس تشادويك عام 1932 النيوترونات (n⁰) وهي جسيمات متعادلة الشحنة الكهربائية توجد داخل النواة وكتلتها مساوية لكتلة البروتون تقريباً (1 amu)."
      },
      {
        "id": 107,
        "question": "ذرة متعادلة لعنصر الكلور تحتوي على 17 بروتوناً و 18 نيوتروناً. ما هو عددها الذري، وعددها الكتلي، وعدد إلكتروناتها؟",
        "questionEn": "A neutral chlorine atom has 17 protons and 18 neutrons. What are its atomic number, mass number, and electron count?",
        "options": [
          "العدد الذري = 17، العدد الكتلي = 35، عدد الإلكترونات = 17",
          "العدد الذري = 18، العدد الكتلي = 35، عدد الإلكترونات = 18",
          "العدد الذري = 35، العدد الكتلي = 17، عدد الإلكترونات = 18",
          "العدد الذري = 17، العدد الكتلي = 18، عدد الإلكترونات = 35"
        ],
        "optionsEn": [
          "Atomic Number = 17, Mass Number = 35, Electrons = 17",
          "Atomic Number = 18, Mass Number = 35, Electrons = 18",
          "Atomic Number = 35, Mass Number = 17, Electrons = 18",
          "Atomic Number = 17, Mass Number = 18, Electrons = 35"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 16",
        "category": "حسابات ذرية",
        "explanation": "العدد الذري Z = عدد البروتونات = 17، وفي الذرة المتعادلة عدد الإلكترونات = عدد البروتونات = 17. أما العدد الكتلي A = البروتونات + النيوترونات = 17 + 18 = 35."
      },
      {
        "id": 108,
        "question": "ما هو المفهوم العلمي الدقيق للنظائر (Isotopes) وفق المنهاج الأردني؟",
        "questionEn": "What is the precise definition of isotopes according to the Jordanian curriculum?",
        "options": [
          "ذرات لعناصر مختلفة تتشابه في الخصائص الفيزيائية وتختلف في العدد الذري",
          "ذرات للعنصر نفسه تتشابه في العدد الذري (البروتونات) وتختلف في العدد الكتلي لاختلاف عدد النيوترونات",
          "ذرات تفقد إلكترونات المدار الأخير وتتحول لأيونات موجبة",
          "جزيئات متطابقة تختلف في عدد روابطها التساهمية"
        ],
        "optionsEn": [
          "Atoms of different elements with similar physical properties but different atomic numbers",
          "Atoms of the same element with identical atomic numbers (protons) but different mass numbers due to neutron count",
          "Atoms losing valence electrons becoming cations",
          "Identical molecules differing in covalent bond count"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 16 - 17",
        "category": "النظائر",
        "explanation": "النظائر (ص 16) هي ذرات للعنصر الكيميائي نفسه تمتلك نفس العدد الذري والخصائص الكيميائية، ولكنها تختلف في عدد النيوترونات في أنويتها مما يغير عددها الكتلي."
      },
      {
        "id": 109,
        "question": "أي النظائر المشعة الآتية يُستخدم في المجال الطبي لتشخيص وتصوير وعلاج أورام الغدة الدرقية؟",
        "questionEn": "Which radioisotope is used in medicine to diagnose and treat thyroid gland tumors?",
        "options": [
          "نظير الكربون-14 (C-14)",
          "نظير اليود-131 (I-131)",
          "نظير الكوبالت-60 (Co-60)",
          "نظير اليورانيوم-235 (U-235)"
        ],
        "optionsEn": [
          "Carbon-14 (C-14)",
          "Iodine-131 (I-131)",
          "Cobalt-60 (Co-60)",
          "Uranium-235 (U-235)"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 18 (الربط بالطب)",
        "category": "الربط بالطب والحياة",
        "explanation": "تستفيد الخلايا الدرقية من اليود في وظائفها الحيوية، لذا يُستخدم نظير اليود المشع (I-131) كجرعة مشعة موجهة لتشخيص وتدمير الخلايا السرطانية في الغدة الدرقية."
      },
      {
        "id": 110,
        "question": "ما هو النظير الإشعاعي المستعمل من قِبل علماء الجيولوجيا والآثار لتقدير أعمار الأحافير والمومياوات القديمة؟",
        "questionEn": "Which radioisotope is used by archaeologists and geologists to date ancient fossils and mummies?",
        "options": [
          "نظير الكربون-14 (C-14)",
          "نظير الصوديوم-24 (Na-24)",
          "نظير الحديد-59 (Fe-59)",
          "نظير الفسفور-32 (P-32)"
        ],
        "optionsEn": [
          "Carbon-14 (C-14)",
          "Sodium-24 (Na-24)",
          "Iron-59 (Fe-59)",
          "Phosphorus-32 (P-32)"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 18 (الربط بعلوم الأرض)",
        "category": "الربط بالآثار والعلوم",
        "explanation": "يُستعمل نظير الكربون-14 المشع (ص 18) في تقدير أعمار الكائنات الحية والمتحجرات التي ماتت منذ آلاف السنين بالاعتماد على معدل تحلله الإشعاعي الثابت."
      }
    ]
  },
  "unit1_lesson2": {
    "id": "unit1_lesson2",
    "unitNumber": 1,
    "lessonNumber": 2,
    "title": "الدرس الثاني: التوزيع الإلكتروني والجدول الدوري",
    "titleEn": "Lesson 2: Electronic Configuration & The Periodic Table",
    "unitTitle": "الوحدة الأولى: بِنية الذرّة",
    "unitTitleEn": "Unit 1: Structure of the Atom",
    "pageRange": "الصفحات 20 - 39",
    "badge": "الجدول الدوري",
    "description": "التوزيع الإلكتروني للمستويات الرئيسية، إلكترونات التكافؤ، تحديد رقم الدورة والمجموعة، خواص الفلزات القلوية والهالوجينات والغازات النبيلة، وتدرج الحجم الذري والنشاط الكيميائي.",
    "questions": [
      {
        "id": 201,
        "question": "ما هي السعة القصوى من الإلكترونات التي يمكن أن يستوعبها مستوى الطاقة الرئيسي الثالث (n = 3) وفق القاعدة (2n²)؟",
        "questionEn": "What is the maximum electron capacity of the 3rd principal energy level (n = 3) based on the (2n²) rule?",
        "options": [
          "8 إلكترونات",
          "18 إلكتروناً",
          "32 إلكتروناً",
          "2 إلكترون"
        ],
        "optionsEn": [
          "8 electrons",
          "18 electrons",
          "32 electrons",
          "2 electrons"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 20 - 21",
        "category": "التوزيع الإلكتروني",
        "explanation": "تُحسب السعة القصوى لأي مستوى طاقة رئيسي بالقانون: 2n²، وعند التعويض عن n = 3 تكون السعة القصوى: 2 × (3)² = 2 × 9 = 18 إلكتروناً."
      },
      {
        "id": 202,
        "question": "ما هو التوزيع الإلكتروني الصحيح لذرة الكالسيوم (₂₀Ca) التي تمتلك عدداً ذرياً يساوي 20؟",
        "questionEn": "What is the correct electron configuration for a neutral Calcium atom (₂₀Ca)?",
        "options": [
          "2, 8, 10",
          "2, 8, 8, 2",
          "2, 18",
          "2, 8, 9, 1"
        ],
        "optionsEn": [
          "2, 8, 10",
          "2, 8, 8, 2",
          "2, 18",
          "2, 8, 9, 1"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 22",
        "category": "التوزيع الإلكتروني",
        "explanation": "وفق المنهاج (ص 22)، يستوعب المستوى الأول 2، والثاني 8، والمستوى الثالث يستقر بـ 8 إلكترونات قبل أن يبدأ ملء المستوى الرابع بـ 2 إلكترون: Ca: 2, 8, 8, 2."
      },
      {
        "id": 203,
        "question": "عنصر الفسفور (₁₅P) توزيعه الإلكتروني هو (2, 8, 5). في أي دورة وأي مجموعة من مجموعات الجدول الدوري يقع؟",
        "questionEn": "Phosphorus (₁₅P) has the electron configuration (2, 8, 5). What are its Period and Group numbers?",
        "options": [
          "الدورة الثانية، المجموعة الخامسة (5A / 15)",
          "الدورة الثالثة، المجموعة الخامسة (5A / 15)",
          "الدورة الخامسة، المجموعة الثالثة (3A / 13)",
          "الدورة الثالثة، المجموعة الثامنة (8A / 18)"
        ],
        "optionsEn": [
          "Period 2, Group 5A (15)",
          "Period 3, Group 5A (15)",
          "Period 5, Group 3A (13)",
          "Period 3, Group 8A (18)"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 23",
        "category": "موقع العنصر",
        "explanation": "رقم الدورة = عدد مستويات الطاقة المشغولة بالإلكترونات (3 مستويات = الدورة 3)، ورقم المجموعة = عدد إلكترونات التكافؤ في المستوى الخارجي (5 إلكترونات = المجموعة 5A أو 15)."
      },
      {
        "id": 204,
        "question": "لماذا تُحفظ فلزات المجموعة الأولى (الفلزات القلوية: Li, Na, K) تحت الكيروسين أو البرافين في المختبر؟",
        "questionEn": "Why are Group 1 alkali metals (Li, Na, K) stored under kerosene or paraffin oil in the lab?",
        "options": [
          "لحمايتها من الصدأ والتآكل البطيء فقط",
          "بسبب نشاطها الكيميائي العالي جداً وتفاعلها العنيف مع أكسجين وبخار ماء الهواء الجوي",
          "لزيادة لمعانها وبريقها الفضي عند التقطيع",
          "لمنع تحولها إلى غازات عند درجة حرارة الغرفة"
        ],
        "optionsEn": [
          "To protect them from slow rusting",
          "Due to extremely high chemical reactivity and vigorous reaction with air oxygen and moisture",
          "To increase their silver metallic shine",
          "To prevent them from sublimating into gases"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 26 - 27",
        "category": "الفلزات القلوية",
        "explanation": "الفلزات القلوية نشطة كيميائياً وتتفاعل بشدة وبسرعة مع الأكسجين وبخار الماء في الهواء، لذا تُحفظ معزولة تحت الكيروسين أو الزيوت المعدنية."
      },
      {
        "id": 205,
        "question": "ما هو الناتج المشترك المنطلق عند تفاعل فلز الصوديوم Na أو البوتاسيوم K مع الماء السائل؟",
        "questionEn": "What common gas is evolved when sodium (Na) or potassium (K) reacts with water?",
        "options": [
          "غاز الأكسجين (O₂)",
          "غاز الهيدروجين (H₂) سريع الاشتعال ويتصاعد مصحوباً بلهب وحرارة",
          "غاز الكلور (Cl₂)",
          "غاز ثاني أكسيد الكربون (CO₂)"
        ],
        "optionsEn": [
          "Oxygen gas (O₂)",
          "Hydrogen gas (H₂) which is highly flammable with heat and flame",
          "Chlorine gas (Cl₂)",
          "Carbon dioxide gas (CO₂)"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 27",
        "category": "تفاعلات الفلزات",
        "explanation": "تتفاعل فلزات المجموعة الأولى مع الماء بشدة منتجة هيدروكسيد الفلز وغاز الهيدروجين سريع الاشتعال: 2Na + 2H₂O → 2NaOH + H₂ ↑."
      },
      {
        "id": 206,
        "question": "كيف يتغير الحجم الذري (نصف القطر الذري) لعناصر الجدول الدوري الممثلة عبر الدورة الواحدة من اليسار إلى اليمين؟",
        "questionEn": "How does atomic radius change across a period from left to right in the periodic table?",
        "options": [
          "يزداد الحجم الذري باستمرار بسبب زيادة عدد البروتونات",
          "يقل الحجم الذري تدريجياً بسبب زيادة شحنة النواة الموجبة الفعالة وقوة جذبها لإلكترونات التكافؤ",
          "يبقى الحجم الذري ثابتاً تماماً لجميع عناصر الدورة",
          "يزداد أولاً ثم يتناقص فجأة عند الغازات النبيلة"
        ],
        "optionsEn": [
          "Increases steadily due to more protons",
          "Decreases gradually due to increasing effective nuclear charge and attraction on valence electrons",
          "Remains completely constant",
          "Increases then abruptly drops at noble gases"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 24 - 25",
        "category": "الخصائص الدورية",
        "explanation": "في الدورة الواحدة، يزداد العدد الذري مع بقاء عدد مستويات الطاقة ثابتاً، مما يزيد من شحنة النواة الموجبة الفعالة فيجذب الإلكترونات الخارجية بقوة أكبر ويقل الحجم الذري (ص 24)."
      },
      {
        "id": 207,
        "question": "ما هو الترتيب الصحيح لعناصر الفلزات القلوية (Li, Na, K) من حيث تزايد النشاط الكيميائي من الأقل نشاطاً إلى الأكثر نشاطاً؟",
        "questionEn": "What is the correct order of alkali metals (Li, Na, K) by increasing chemical reactivity (least to most)?",
        "options": [
          "K < Na < Li",
          "Li < Na < K",
          "Na < Li < K",
          "Li < K < Na"
        ],
        "optionsEn": [
          "K < Na < Li",
          "Li < Na < K",
          "Na < Li < K",
          "Li < K < Na"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 25، ص 27",
        "category": "نشاط الفلزات",
        "explanation": "يزداد النشاط الكيميائي لفلزات المجموعة الأولى بالانتقال من أعلى إلى أسفل المجموعة بسبب زيادة الحجم الذري وسهولة فقد إلكترون التكافؤ الخارجي، لذلك: Li < Na < K."
      },
      {
        "id": 208,
        "question": "ما هو الاسم الشائع لعناصر المجموعة السابعة (17) وما هي الشحنة التي يكتسبها أيونها للوصول لحالة الاستقرار؟",
        "questionEn": "What is the common name for Group 7 (17) elements and what charge does their ion acquire?",
        "options": [
          "الفلزات القلوية الترابية وشحنتها (+2)",
          "الهالوجينات (Halogens) وشحنتها (-1) باكتساب إلكترون واحد",
          "الغازات النبيلة وشحنتها (صفر)",
          "عناصر اللانثانيدات وشحنتها (+3)"
        ],
        "optionsEn": [
          "Alkaline earth metals (+2)",
          "Halogens (-1) by gaining one electron",
          "Noble gases (0 charge)",
          "Lanthanides (+3)"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 31",
        "category": "الهالوجينات",
        "explanation": "تُسمى عناصر المجموعة السابعة (F, Cl, Br, I) بالهالوجينات أو مكوّنات الأملاح، وتمتلك 7 إلكترونات تكافؤ فتميل لاكتساب إلكترون واحد لتكوين أيون سالب أحادي الشحنة X⁻."
      },
      {
        "id": 209,
        "question": "لماذا تتميز عناصر المجموعة الثامنة (18) مثل الهيليوم والنيون والآرجون بالخمول الكيميائي التام في الظروف العادية؟",
        "questionEn": "Why are Group 8 (18) noble gases like He, Ne, Ar chemically inert under standard conditions?",
        "options": [
          "لأن أنويتها لا تحتوي على نيوترونات متعادلة",
          "لأن مستوى طاقتها الخارجي مكتمل تماماً بالإلكترونات (حالة استقرار ثمانية)",
          "لأن حجومها الذرية أكبر حجوم في الجدول الدوري",
          "لأنها مواد صلبة لا تتفكك بروابط كيميائية"
        ],
        "optionsEn": [
          "Nuclei contain no neutrons",
          "Their outermost energy levels are completely filled with electrons (stable octet/duet)",
          "They have the largest atomic radii",
          "They are solid non-reactive lattices"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 32",
        "category": "الغازات النبيلة",
        "explanation": "الغازات النبيلة (ص 32) تمتلك توزيعاً إلكترونياً مكتملاً في غلافها الخارجي (8 إلكترونات، و2 في الهيليوم)، مما يجعلها مستقرة كيميائياً ولا تميل لكسب أو فقد أو مشاركة الإلكترونات."
      },
      {
        "id": 210,
        "question": "ذرة الألومنيوم (₁₃Al) توزع إلكتروناتها (2, 8, 3). كيف تصل هذه الذرة إلى التوزيع الإلكتروني المشابه لأقرب غاز نبيل؟",
        "questionEn": "An Aluminum atom (₁₃Al) has configuration (2, 8, 3). How does it reach the nearest noble gas configuration?",
        "options": [
          "باكتساب 5 إلكترونات وتكوين أيون Al⁵⁻",
          "بفقد 3 إلكترونات التكافؤ وتكوين أيون موجب ثلاثي Al³⁺ ذي توزيع (2, 8) المشابه للنيون",
          "بمشاركة إلكترون واحد وتكوين رابطة أحادية",
          "بفقد بروتون من النواة وتكوين نظير الماغنيسيوم"
        ],
        "optionsEn": [
          "By gaining 5 electrons forming Al⁵⁻",
          "By losing 3 valence electrons forming Al³⁺ cation with (2, 8) configuration like Neon",
          "By sharing 1 electron forming a single bond",
          "By losing a nuclear proton"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 34 - 35",
        "category": "تكوين الأيونات",
        "explanation": "تفقد ذرة الألومنيوم إلكترونات التكافؤ الثلاثة في مستواها الخارجي لتتحول إلى أيون موجب ثلاثي Al³⁺ بتوزيع إلكتروني مستقر (2, 8) مماثل لغاز النيون النبيل ₁₀Ne."
      }
    ]
  },
  "unit2_lesson1": {
    "id": "unit2_lesson1",
    "unitNumber": 2,
    "lessonNumber": 1,
    "title": "الدرس الأول: خصائص الحموض والقواعد والرقم الهيدروجيني",
    "titleEn": "Lesson 1: Properties of Acids & Bases, Indicators & pH",
    "unitTitle": "الوحدة الثانية: الحُموض والقواعد والأملاح",
    "unitTitleEn": "Unit 2: Acids, Bases, and Salts",
    "pageRange": "الصفحات 46 - 58",
    "badge": "الحموض والقواعد",
    "description": "تعريف الحموض والقواعد وأيوناتها (H⁺ / OH⁻)، الحموض القوية والضعيفة، أكاسيد الفلزات واللافلزات، الكواشف وتغيرات ألوانها، مقياس pH، وتطبيقات التربة والعضلات والشامبو.",
    "questions": [
      {
        "id": 301,
        "question": "ما هو الأيون المشترك المسؤول عن إكساب جميع المحاليل الحمضية صفاتها وخصائصها الكيميائية عند الذوبان في الماء؟",
        "questionEn": "What common ion is responsible for acidic properties in all aqueous acid solutions?",
        "options": [
          "أيون الهيدروكسيد السالب (OH⁻)",
          "أيون الهيدروجين الموجب (H⁺) الذي يرتبط بالماء مكوناً أيون الهيدرونيوم (H₃O⁺)",
          "أيون الكلوريد السالب (Cl⁻)",
          "أيون الكبريتات الثنائي (SO₄²⁻)"
        ],
        "optionsEn": [
          "Hydroxide ion (OH⁻)",
          "Hydrogen ion (H⁺) forming hydronium ion (H₃O⁺) with water",
          "Chloride ion (Cl⁻)",
          "Sulfate ion (SO₄²⁻)"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 46 - 47",
        "category": "مفاهيم الحموض",
        "explanation": "الحمض مادة تُنتج عند ذوبانها في الماء أيونات الهيدروجين الموجبة H⁺، وتُعد أيونات H⁺ (أو الهيدرونيوم H₃O⁺) المسؤولة عن الخصائص الحمضية وتوصيل التيار وتغيير لون الكواشف."
      },
      {
        "id": 302,
        "question": "أي الحموض الآتية يوجد بشكل طبيعي في ثمار الحمضيات مثل الليمون والبرتقال؟",
        "questionEn": "Which acid is naturally found in citrus fruits like lemons and oranges?",
        "options": [
          "حمض الكبريتيك (H₂SO₄)",
          "حمض السيتريك (Citric Acid)",
          "حمض الهيدروكلوريك (HCl)",
          "حمض النيتريك (HNO₃)"
        ],
        "optionsEn": [
          "Sulfuric acid (H₂SO₄)",
          "Citric acid (Citric Acid)",
          "Hydrochloric acid (HCl)",
          "Nitric acid (HNO₃)"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 46",
        "category": "الحموض الطبيعية",
        "explanation": "يحتوي الليمون والبرتقال والحمضيات على حمض السيتريك، بينما يحتوي اللبن الرائب على حمض اللاكتيك والخل على حمض الأسيتيك (حمض الإيثانويك)."
      },
      {
        "id": 303,
        "question": "لماذا يُعد غاز ثاني أكسيد الكربون (CO₂) أكسيداً حمضياً (Acidic Oxide)؟",
        "questionEn": "Why is carbon dioxide (CO₂) classified as an acidic oxide?",
        "options": [
          "لأنه أكسيد لافلزي يذوب في الماء مكوناً حمض الكربونيك (H₂CO₃) الذي يطلق أيونات H⁺",
          "لأنه يحتوي على ذرات هيدروجين صلبة في تركيبه البلوري",
          "لأنه يغير ورقة تباع الشمس الحمراء إلى اللون الأزرق",
          "لأنه يتفاعل مع الحموض القوية لتكوين قواعد قلوية"
        ],
        "optionsEn": [
          "Because it is a non-metal oxide dissolving in water to form carbonic acid (H₂CO₃) releasing H⁺",
          "Because it contains solid hydrogen atoms",
          "Because it turns red litmus blue",
          "Because it reacts with strong acids to form bases"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 47",
        "category": "الأكاسيد الحمضية",
        "explanation": "أكاسيد اللافلزات (مثل CO₂ و SO₂ و NO₂) تذوب في الماء مكونة محاليل حمضية: CO₂ + H₂O → H₂CO₃، وحمض الكربونيك يتأين في الماء منتجاً أيونات H⁺."
      },
      {
        "id": 304,
        "question": "ما هو التفسير العلمي الصحيح لآلام وتصلب العضلات الذي يشعر به الرياضي بعد 24 ساعة من أداء تمارين شاقة؟",
        "questionEn": "What is the accurate scientific cause of delayed muscle soreness 24 hours after strenuous exercise?",
        "options": [
          "تراكم مستمر لحمض اللاكتيك داخل الألياف العضلية لعدة أيام",
          "حدوث تمزقات مجهرية دقيقة في ألياف العضلات والتهابها، بينما يزول حمض اللاكتيك بعد ساعة تقريباً",
          "تحول بيئة العضلات إلى وسط قاعدي شديد القلوية",
          "نقص امتصاص الكالسيوم في العظام"
        ],
        "optionsEn": [
          "Continuous accumulation of lactic acid for days",
          "Microscopic muscle fiber tears and inflammation; lactic acid clears within ~1 hour",
          "Muscles turning strongly alkaline",
          "Impaired calcium absorption"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 47 (الربط بالرياضة)",
        "category": "الربط بالرياضة والصحة",
        "explanation": "أثبتت الدراسات الحديثة في المنهاج (ص 47) أن آلام العضلات بعد 24 ساعة ناتجة عن تمزقات مجهرية دقيقة والتهابها، في حين أن حمض اللاكتيك يُطرد من الجسم بعد نحو ساعة من التمرين."
      },
      {
        "id": 305,
        "question": "لماذا تُصنف مادة أكسيد الكالسيوم CaO أو أكسيد الليثيوم Li₂O كقاعدة / قلوي؟",
        "questionEn": "Why is Calcium oxide (CaO) or Lithium oxide (Li₂O) classified as a basic oxide / alkali?",
        "options": [
          "لأنها أكسيد لا فلزي يتفاعل مع الماء لإنتاج حمض قوي",
          "لأنها أكسيد فلزي يذوب في الماء مكوناً هيدروكسيد الفلز الذي يطلق أيونات الهيدروكسيد (OH⁻)",
          "لأنها مادة غير قابلة للذوبان وتتفاعل مع القواعد فقط",
          "لأنها تنتج غاز الهيدروجين عند ملامستها للهواء الجوي"
        ],
        "optionsEn": [
          "Non-metal oxide producing an acid",
          "Metal oxide dissolving in water forming metal hydroxide which releases hydroxide ions (OH⁻)",
          "Insoluble base-only reactant",
          "Produces hydrogen upon air contact"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 50",
        "category": "القواعد والأكاسيد القاعدية",
        "explanation": "أكاسيد الفلزات تذوب في الماء لتعطي هيدروكسيد الفلز (مثل: CaO + H₂O → Ca(OH)₂)، والذي يتأين كلياً في الماء منتجاً أيونات الهيدروكسيد السالبة OH⁻."
      },
      {
        "id": 306,
        "question": "أي المواد التالية يُعد مثالاً على قاعدة ضعيفة تتأين جزئياً دون أن تحتوي صيغتها الجزيئية الأولية على مجموعة هيدروكسيد؟",
        "questionEn": "Which substance is a weak base that partially ionizes in water without containing an initial OH group in its formula?",
        "options": [
          "هيدروكسيد الصوديوم (NaOH)",
          "هيدروكسيد البوتاسيوم (KOH)",
          "غاز الأمونيا / النشادر (NH₃)",
          "حمض النيتريك (HNO₃)"
        ],
        "optionsEn": [
          "Sodium hydroxide (NaOH)",
          "Potassium hydroxide (KOH)",
          "Ammonia gas (NH₃)",
          "Nitric acid (HNO₃)"
        ],
        "correctIndex": 2,
        "curriculumRef": "كتاب الطالب: ص 50، ص 53",
        "category": "القواعد الضعيفة",
        "explanation": "غاز الأمونيا NH₃ قاعدة ضعيفة لا تحتوي على OH⁻ في تركيبها، ولكن عند ذوبانها في الماء تتفاعل جزئياً معه: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻."
      },
      {
        "id": 307,
        "question": "عند مقارنة شدة إضاءة المصباح الكهربائي في محلول حمض الهيدروكلوريك HCl ومحلول حمض الإيثانويك CH₃COOH المتساويين في التركيز (0.1 M)، ماذا نلاحظ ولماذا؟",
        "questionEn": "Comparing lamp brightness in 0.1 M HCl vs 0.1 M CH₃COOH solutions, what is observed and why?",
        "options": [
          "إضاءة المصباح في HCl أقوى بكثير لأنه حمض قوي يتأين كلياً في الماء منتجاً وفرة من الأيونات الحرة",
          "إضاءة المصباح في CH₃COOH أقوى لأن كتلته المولية أكبر",
          "شدة الإضاءة متماثلة تماماً لتساوي التركيز الابتدائي",
          "المصباح لا يضيء في المحلولين لأنهما مركبات جزيئية"
        ],
        "optionsEn": [
          "HCl bulb glows much brighter because it is a strong acid completely ionizing into abundant free ions",
          "CH₃COOH glows brighter due to larger molar mass",
          "Identical brightness because initial concentrations are equal",
          "Bulbs do not glow in either solution"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 52",
        "category": "قوة الحموض وتوصيل الكهرباء",
        "explanation": "حمض HCl حمض قوي يتأين كلياً (→) في الماء فتكون الأيونات وفيرة وتوصيله ممتاز، بينما CH₃COOH حمض ضعيف يتأين جزئياً (⇌) فتكون الأيونات قليلة وإضاءة المصباح خافتة (ص 52)."
      },
      {
        "id": 308,
        "question": "محلول كيميائي مجهول قِيست درجة حموضته فوجد أن (pH = 2). ما هو تصنيف هذا المحلول ونوع الأيون السائد فيه؟",
        "questionEn": "An unknown solution has a measured pH = 2. What is its classification and predominant ion?",
        "options": [
          "محلول متعادل والماء هو السائد",
          "محلول حمضي قوي ويسود فيه تركيز أيون الهيدروجين الموجب (H⁺)",
          "محلول قاعدي قوي ويسود فيه تركيز أيون الهيدروكسيد (OH⁻)",
          "محلول قاعدي ضعيف"
        ],
        "optionsEn": [
          "Neutral solution with pure water",
          "Strongly acidic solution with high [H⁺] concentration",
          "Strongly basic solution with high [OH⁻]",
          "Weakly basic solution"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 54",
        "category": "الرقم الهيدروجيني pH",
        "explanation": "قيم مقياس pH الأقل من 7 تدل على وسط حمضي، وكلما اقتربت القيمة من 0 كان المحلول أكثر حموضة وأعلى في تركيز أيونات H⁺."
      },
      {
        "id": 309,
        "question": "ما هو التغير اللوني لكاشف الفينولفثالين (Phenolphthalein) عند إضافته إلى محلول هيدروكسيد الصوديوم القاعدي؟",
        "questionEn": "What is the color change of Phenolphthalein indicator when added to basic sodium hydroxide solution?",
        "options": [
          "يتحول من عديم اللون إلى اللون الوردي (الزهري)",
          "يتحول من الأزرق إلى الأصفر الفاقع",
          "يتحول من الأحمر إلى الأخضر المتعادل",
          "يبقى عديم اللون دون أي تغير"
        ],
        "optionsEn": [
          "Turns from colorless to pink / magenta",
          "Turns from blue to bright yellow",
          "Turns from red to neutral green",
          "Remains completely colorless"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 48، ص 51",
        "category": "الكواشف الكيميائية",
        "explanation": "كاشف الفينولفثالين يكون عديم اللون في الأوساط الحمضية والمتعادلة، ولكنه يتحول إلى اللون الوردي (الزهري) في الأوساط القاعدية (pH > 8.2)."
      },
      {
        "id": 310,
        "question": "لماذا يحرص مصنعو منظفات الشعر (الشامبو) على جعل درجة حموضته في النطاق (4.5 - 6) وتقريباً pH = 5.5؟",
        "questionEn": "Why do shampoo manufacturers formulate hair cleansers within the pH range of 4.5 - 6 (~5.5)?",
        "options": [
          "لأن الشعر يتكون من بروتين الكيراتين وهذا النطاق الحمضي الخفيف يحميه من التلف والتقصف",
          "لتبييض خصلات الشعر كيميائياً أثناء الاستحمام",
          "لجعل الوسط شديد القلوية لتذويب الدهون بعنف",
          "لمعادلة ملوحة ماء الاستحمام"
        ],
        "optionsEn": [
          "Because hair contains keratin protein and this mild acidic pH protects it from damage and split ends",
          "To bleach hair color chemically",
          "To make it strongly alkaline for extreme degreasing",
          "To neutralize bath water salinity"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 54 (الربط بالحياة)",
        "category": "الربط بالحياة اليومية",
        "explanation": "يتكون شعر الإنسان من بروتين الكيراتين، وتُعد درجة الحموضة الطفيفة (4.5 - 6) هي البيئة المثلى للمحافظة على تماسك حراشف الشعرة ومنع تلفها وتقصفها."
      }
    ]
  },
  "unit2_lesson2": {
    "id": "unit2_lesson2",
    "unitNumber": 2,
    "lessonNumber": 2,
    "title": "الدرس الثاني: تفاعلات التعادل والمعايرة والأملاح",
    "titleEn": "Lesson 2: Neutralization Reactions, Titration & Salts",
    "unitTitle": "الوحدة الثانية: الحُموض والقواعد والأملاح",
    "unitTitleEn": "Unit 2: Acids, Bases, and Salts",
    "pageRange": "الصفحات 59 - 73",
    "badge": "التعادل والأملاح",
    "description": "تفاعلات التعادل والمعادلة الأيونية الصافية، المعايرة المخبرية، تفاعل الحموض مع كربونات الفلزات، مفهوم الملح واستخدامات NaCl و CaCO₃ و CaSO₄ و NaHCO₃، وطرق تحضير الأملاح.",
    "questions": [
      {
        "id": 401,
        "question": "ما هو الناتج الأساسي المشترك في جميع تفاعلات التعادل (Neutralization) بين محلول حمض قوي وقاعدة قوية؟",
        "questionEn": "What are the essential common products of any neutralization reaction between a strong acid and strong base?",
        "options": [
          "ملح وغاز الهيدروجين",
          "ملح وماء سائل (H₂O)",
          "أكسيد فلزي وغاز ثاني أكسيد الكربون",
          "راسب غير ذائب وغاز الأكسجين"
        ],
        "optionsEn": [
          "Salt and hydrogen gas",
          "Salt and liquid water (H₂O)",
          "Metal oxide and carbon dioxide gas",
          "Insoluble precipitate and oxygen gas"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 59 - 60",
        "category": "تفاعل التعادل",
        "explanation": "تفاعل التعادل هو تفاعل بين محلول حمض ومحلول قاعدة لتكوين ملح وماء: Acid + Base → Salt + Water، مثل: HCl + NaOH → NaCl + H₂O."
      },
      {
        "id": 402,
        "question": "ما هي المعادلة الأيونية الصافية (Net Ionic Equation) لتفاعل محلول حمض الهيدروكلوريك HCl مع محلول هيدروكسيد الصوديوم NaOH بعد حذف الأيونات المتفرجة؟",
        "questionEn": "What is the net ionic equation for the reaction of HCl and NaOH after eliminating spectator ions?",
        "options": [
          "Na⁺(aq) + Cl⁻(aq) → NaCl(s)",
          "H⁺(aq) + OH⁻(aq) → H₂O(l)",
          "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)",
          "2H⁺(aq) + O²⁻(aq) → H₂O(l)"
        ],
        "optionsEn": [
          "Na⁺(aq) + Cl⁻(aq) → NaCl(s)",
          "H⁺(aq) + OH⁻(aq) → H₂O(l)",
          "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)",
          "2H⁺(aq) + O²⁻(aq) → H₂O(l)"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 60 - 61",
        "category": "المعادلات الأيونية",
        "explanation": "تُحذف الأيونات المتفرجة (Spectator Ions) وهي Na⁺ و Cl⁻ لأنها لا تشترك فعلياً في التفاعل، فتبقى المعادلة الأيونية الصافية: H⁺(aq) + OH⁻(aq) → H₂O(l)."
      },
      {
        "id": 403,
        "question": "ما الأداة المخبرية الزجاجية المدرجة بدقة المستعملة لإضافة المحلول القياسي قطرة قطرة أثناء تجربة المعايرة (Titration)؟",
        "questionEn": "Which precision graduated laboratory glassware is used to deliver the standard solution dropwise in titration?",
        "options": [
          "المخبار المدرج (Graduated Cylinder)",
          "السحاحة (Burette)",
          "الكأس الزجاجية (Beaker)",
          "الماصة العادية (Pipette)"
        ],
        "optionsEn": [
          "Graduated cylinder",
          "Burette",
          "Beaker",
          "Standard pipette"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 62",
        "category": "تجربة المعايرة",
        "explanation": "السحاحة (Burette) هي أنبوبة زجاجية طويلة مدرجة تنتهي بصنبور دقيق، تُستخدم في تجارب المعايرة للتحكم في إضافة المحلول القياسي بدقة بالغة حتى نقطة نهاية المعايرة."
      },
      {
        "id": 404,
        "question": "عند تفاعل حمض الهيدروكلوريك HCl مع كربونات الكالسيوم CaCO₃، ما هو الغاز المتصاعد وكيف نكشف عنه مخبرياً؟",
        "questionEn": "When HCl reacts with calcium carbonate (CaCO₃), what gas evolves and how is it detected in the lab?",
        "options": [
          "غاز الهيدروجين H₂، ويكشف عنه بتقريب شظية مشتعلة فتحدث فرقعة",
          "غاز ثاني أكسيد الكربون CO₂، ويكشف عنه بتمريره في ماء الجير الرائق Ca(OH)₂ فيتعكر",
          "غاز الأكسجين O₂، ويكشف عنه بزيادة اشتعال عود الثقاب",
          "غاز ثاني أكسيد الكبريت SO₂، ويكشف عنه برائحته الخانقة"
        ],
        "optionsEn": [
          "Hydrogen H₂ detected with pop sound splint",
          "Carbon dioxide CO₂ detected by turning clear limewater cloudy",
          "Oxygen O₂ detected by glowing splint",
          "Sulfur dioxide SO₂ detected by pungent odor"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 63",
        "category": "تفاعلات الكربونات",
        "explanation": "تتفاعل الحموض مع كربونات الفلزات منتجة ملحاً وماء وغاز ثاني أكسيد الكربون CO₂: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ ↑، ويعكر هذا الغاز ماء الجير الرائق Ca(OH)₂."
      },
      {
        "id": 405,
        "question": "ما هو الملح المستخدم على نطاق واسع في تحضير مسحوق الخبيز (Baking Powder) وطفايات الحريق ومعالجة حموضة المعدة؟",
        "questionEn": "Which salt is widely used in baking powder, dry chemical fire extinguishers, and antacids?",
        "options": [
          "كلوريد الصوديوم (NaCl)",
          "كربونات الصوديوم الهيدروجينية / بيكربونات الصوديوم (NaHCO₃)",
          "كبريتات الكالسيوم (CaSO₄)",
          "نترات البوتاسيوم (KNO₃)"
        ],
        "optionsEn": [
          "Sodium chloride (NaCl)",
          "Sodium hydrogen carbonate / Baking soda (NaHCO₃)",
          "Calcium sulfate (CaSO₄)",
          "Potassium nitrate (KNO₃)"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 63، ص 65",
        "category": "استخدامات الأملاح",
        "explanation": "بيكربونات الصوديوم NaHCO₃ تتفكك بالحرارة أو بالتفاعل مع الأحماض الخفيفة مطلقة غاز CO₂ الذي ينفخ المخبوزات ويخمد الحرائق، كما تعادل حموضة المعدة الزائدة."
      },
      {
        "id": 406,
        "question": "ما هو الملح المعروف باسم (الجبس) والمستعمل طبياً في تجبير وتثبيت العظام المكسورة وفي أعمال البناء والديكور؟",
        "questionEn": "Which salt is known as gypsum and used medically for casting broken bones and in drywall decoration?",
        "options": [
          "كبريتات الكالسيوم المائية (CaSO₄ · 2H₂O)",
          "كربونات الكالسيوم (CaCO₃)",
          "نترات الأمونيوم (NH₄NO₃)",
          "كلوريد البوتاسيوم (KCl)"
        ],
        "optionsEn": [
          "Hydrated Calcium Sulfate (CaSO₄ · 2H₂O)",
          "Calcium Carbonate (CaCO₃)",
          "Ammonium Nitrate (NH₄NO₃)",
          "Potassium Chloride (KCl)"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 65",
        "category": "استخدامات الأملاح الطبية",
        "explanation": "ملح كبريتات الكالسيوم المائية CaSO₄·2H₂O (الجبس) يتميز بقدرته على التصلب عند خلطه بالماء، لذا يُستخدم في تجبير العظام المكسورة وتصنيع قواطع الجبس بورد والديكورات."
      },
      {
        "id": 407,
        "question": "أي الأملاح الآتية يُعد مكوناً رئيساً في تصنيع الأسمدة الزراعية الكيميائية لتزويد النباتات بعنصري النيتروجين والبوتاسيوم؟",
        "questionEn": "Which salt is a primary component in chemical agricultural fertilizers supplying nitrogen and potassium to plants?",
        "options": [
          "نترات البوتاسيوم (KNO₃) ونترات الأمونيوم (NH₄NO₃)",
          "كلوريد الفضة (AgCl)",
          "كبريتات الباريوم (BaSO₄)",
          "كربونات المغنيسيوم (MgCO₃)"
        ],
        "optionsEn": [
          "Potassium nitrate (KNO₃) & Ammonium nitrate (NH₄NO₃)",
          "Silver chloride (AgCl)",
          "Barium sulfate (BaSO₄)",
          "Magnesium carbonate (MgCO₃)"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 65",
        "category": "الأسمدة الزراعية",
        "explanation": "أملاح النترات مثل KNO₃ و NH₄NO₃ تذوب بسهولة في ماء الري وتمتصها جذور النباتات لغناها بالنيتروجين والبوتاسيوم اللازمين لنمو المحاصيل الزراعية."
      },
      {
        "id": 408,
        "question": "ما هو لون وشكل بلورات ملح كبريتات النحاس المائية (CuSO₄ · 5H₂O) وفي ماذا تستخدم؟",
        "questionEn": "What is the color and crystal form of copper sulfate (CuSO₄ · 5H₂O) and what is its primary application?",
        "options": [
          "بلورات زرقاء لامعة، وتُستخدم كمبيد للفطريات والآفات الزراعية وفي الطلاء الكهربائي",
          "مسحوق أبيض ناعم، ويُستخدم في صناعة معجون الأسنان",
          "بلورات حمراء داكنة، وتُستخدم في تلوين الأغذية",
          "بلورات صفراء، وتُستخدم في تعقيم مياه الشرب"
        ],
        "optionsEn": [
          "Shiny blue crystals used as agricultural fungicide and in electroplating",
          "Fine white powder used in toothpaste",
          "Dark red crystals used in food coloring",
          "Yellow crystals used in drinking water disinfection"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 64 - 65",
        "category": "أملاح النحاس",
        "explanation": "توجد كبريتات النحاس المائية على شكل بلورات زرقاء جذابة وتُستخدم في رش المزروعات لمكافحة الفطريات الزراعية وفي أحواض الطلاء بالكهرباء."
      },
      {
        "id": 409,
        "question": "ما هي الطريقة الصناعية المعتمدة لإنتاج غاز الأمونيا (النشادر NH₃) بكميات تجارية ضخمة؟",
        "questionEn": "What is the industrial method used to produce ammonia gas (NH₃) in massive commercial quantities?",
        "options": [
          "طريقة هابر - بوش (Haber Process) بمفاعلة النيتروجين والهيدروجين تحت ضغط وحرارة وعامل مساعد",
          "طريقة التلامس (Contact Process)",
          "طريقة التقطير التجزيئي للنفط",
          "طريقة التحليل الكهربائي للماء"
        ],
        "optionsEn": [
          "Haber-Bosch process reacting N₂ and H₂ under high pressure, heat and iron catalyst",
          "Contact process",
          "Fractional distillation of petroleum",
          "Electrolysis of water"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 69 (الربط بالصناعة)",
        "category": "الصناعات الكيميائية",
        "explanation": "تُحضر الأمونيا صناعياً بطريقة هابر (ص 69) بمفاعلة غاز النيتروجين N₂ وغاز الهيدروجين H₂ بنسبة 1:3 عند درجات حرارة وضغط مرتفعين بوجود فلز الحديد كعامل مساعد."
      },
      {
        "id": 410,
        "question": "ما هي المواد الناتجة صناعياً عن التحليل الكهربائي لمحلول مركز من كلوريد الصوديوم NaCl (المحلول الملحي)؟",
        "questionEn": "What chemicals are produced industrially by the electrolysis of concentrated sodium chloride solution (brine)?",
        "options": [
          "غاز الكلور (Cl₂)، وغاز الهيدروجين (H₂)، ومحلول هيدروكسيد الصوديوم (NaOH)",
          "حمض الهيدروكلوريك وفلز الصوديوم فقط",
          "غاز الأكسجين وملح كبريتات الصوديوم",
          "غاز النيتروجين وغاز الميثان"
        ],
        "optionsEn": [
          "Chlorine gas (Cl₂), Hydrogen gas (H₂), and Sodium hydroxide solution (NaOH)",
          "Hydrochloric acid and sodium metal only",
          "Oxygen gas and sodium sulfate salt",
          "Nitrogen gas and methane gas"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 68",
        "category": "الصناعات والتحليل الكهربائي",
        "explanation": "يُعد التحليل الكهربائي للماء المالح (Brine) أساس صناعة الكلور-قلوي وينتج غاز الكلور عند المصعد وغاز الهيدروجين عند المهبط ومحلول NaOH في الوعاء."
      }
    ]
  },
  "comprehensive": {
    "id": "comprehensive",
    "unitNumber": 0,
    "lessonNumber": 0,
    "title": "الاختبار الشامل للفصل الدراسي الأول (تحدي أوائل الكيمياء)",
    "titleEn": "Comprehensive Semester 1 Mastery Exam (Chemistry Champions)",
    "unitTitle": "الكيمياء - الصف التاسع (الفصل الأول)",
    "unitTitleEn": "Grade 9 Chemistry (Semester 1)",
    "pageRange": "شامل كامل المنهاج (ص 10 - 76)",
    "badge": "الاختبار الشامل",
    "description": "اختبار تجميعي وتقويمي شامل يغطي مكوّنات الذرة، النماذج، النظائر، التوزيع الإلكتروني، الخصائص الدورية، الحموض، القواعد، الكواشف، المعايرة، وتحضير واستخدامات الأملاح.",
    "questions": [
      {
        "id": 501,
        "question": "إذا كان لعنصر ما العدد الذري Z = 12 والعدد الكتلي A = 24، فما هو عدد البروتونات والنيوترونات والإلكترونات في أيونه الثنائي الموجب (+2)؟",
        "questionEn": "For an element with Z = 12 and A = 24, how many protons, neutrons, and electrons are in its (+2) cation?",
        "options": [
          "12 بروتون، 12 نيوترون، 10 إلكترونات",
          "10 بروتونات، 12 نيوترون، 12 إلكترون",
          "12 بروتون، 14 نيوترون، 10 إلكترونات",
          "12 بروتون، 12 نيوترون، 12 إلكترون"
        ],
        "optionsEn": [
          "12 protons, 12 neutrons, 10 electrons",
          "10 protons, 12 neutrons, 12 electrons",
          "12 protons, 14 neutrons, 10 electrons",
          "12 protons, 12 neutrons, 12 electrons"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 16، ص 34",
        "category": "حسابات وتأين",
        "explanation": "البروتونات = العدد الذري = 12، والنيوترونات = A - Z = 24 - 12 = 12. وبما أن الأيون (+2) فقد إلكترونين، فإن الإلكترونات = 12 - 2 = 10 إلكترونات."
      },
      {
        "id": 502,
        "question": "أي العناصر الآتية يمتلك أكبر حجم ذري (نصف قطر ذري) في الجدول الدوري الحديث؟",
        "questionEn": "Which of the following elements possesses the largest atomic radius in the periodic table?",
        "options": [
          "الليثيوم (₃Li)",
          "البوتاسيوم (₁₉K)",
          "الصوديوم (₁₁Na)",
          "الكلور (₁₇Cl)"
        ],
        "optionsEn": [
          "Lithium (₃Li)",
          "Potassium (₁₉K)",
          "Sodium (₁₁Na)",
          "Chlorine (₁₇Cl)"
        ],
        "correctIndex": 1,
        "curriculumRef": "كتاب الطالب: ص 24",
        "category": "الخصائص الدورية",
        "explanation": "يزداد الحجم الذري بالانتقال إلى أسفل المجموعة (K > Na > Li) ويقل عبر الدورة باتجاه اليمين، لذا البوتاسيوم ₁₉K ذو الـ 4 مستويات طاقة يمتلك الحجم الأكبر."
      },
      {
        "id": 503,
        "question": "ما هو الترتيب التنازلي الصحيح للهالوجينات (F, Cl, Br, I) من حيث النشاط الكيميائي من الأقوى نشاطاً إلى الأقل نشاطاً؟",
        "questionEn": "What is the correct descending order of halogens by chemical reactivity (most to least reactive)?",
        "options": [
          "F > Cl > Br > I",
          "I > Br > Cl > F",
          "Cl > F > Br > I",
          "Br > Cl > F > I"
        ],
        "optionsEn": [
          "F > Cl > Br > I",
          "I > Br > Cl > F",
          "Cl > F > Br > I",
          "Br > Cl > F > I"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 31",
        "category": "نشاط اللافلزات",
        "explanation": "في مجموعة الهالوجينات، يزداد النشاط الكيميائي بالصعود للأعلى لصغر الحجم الذري وزيادة قدرة النواة على جذب الإلكترون، لذلك الفلور أنشطها: F > Cl > Br > I."
      },
      {
        "id": 504,
        "question": "ما الدليل المشاهد لتأكيد حدوث تفاعل كيميائي عند إضافة شريط من فلز المغنيسيوم إلى أنبوب اختبار يحتوي على حمض HCl؟",
        "questionEn": "What observable evidence confirms a chemical reaction when magnesium ribbon is added to HCl solution?",
        "options": [
          "تصاعد فقاعات غاز الهيدروجين H₂ وارتفاع درجة حرارة الأنبوب وتآكل شريط المغنيسيوم",
          "تكون راسب أزرق داكن في قاع الأنبوب",
          "تجمد المحلول فوراً وتحوله لجليد",
          "انبعاث غاز بني ذي رائحة خانقة"
        ],
        "optionsEn": [
          "Vigorous evolution of H₂ bubbles, temperature rise, and dissolution of magnesium ribbon",
          "Formation of dark blue precipitate",
          "Instant freezing of the solution",
          "Choking brown gas emission"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 48",
        "category": "تفاعلات الحموض",
        "explanation": "يحل المغنيسيوم محل الهيدروجين: Mg + 2HCl → MgCl₂ + H₂ ↑ فيتصاعد غاز الهيدروجين بفقاعات كثيفة ويسخن الوعاء دلالة على تفاعل طارد للحرارة."
      },
      {
        "id": 505,
        "question": "أي المحاليل المتساوية في التركيز (0.1 M) التالية يمتلك أعلى قيمة رقم هيدروجيني (أعلى pH)؟",
        "questionEn": "Which of the following 0.1 M solutions has the highest pH value?",
        "options": [
          "حمض الهيدروكلوريك (HCl)",
          "حمض الإيثانويك (CH₃COOH)",
          "الماء النقي (H₂O)",
          "محلول هيدروكسيد الصوديوم (NaOH)"
        ],
        "optionsEn": [
          "Hydrochloric acid (HCl)",
          "Acetic acid (CH₃COOH)",
          "Pure water (H₂O)",
          "Sodium hydroxide solution (NaOH)"
        ],
        "correctIndex": 3,
        "curriculumRef": "كتاب الطالب: ص 54",
        "category": "مقياس pH",
        "explanation": "هيدروكسيد الصوديوم NaOH قاعدة قوية تتأين كلياً منتجة أعلى تركيز من أيونات OH⁻ وبالتالي تمتلك أعلى قيمة pH (تقترب من 13-14 عند 0.1 M)."
      },
      {
        "id": 506,
        "question": "ما هو التغير اللوني لكاشف أزرق البروموثيمول (Bromothymol Blue) عند الانتقال من الوسط الحمضي إلى الوسط المتعادل ثم الوسط القاعدي؟",
        "questionEn": "What is the color progression of Bromothymol Blue from acidic to neutral to basic mediums?",
        "options": [
          "أصفر في الحمضي ← أخضر في المتعادل ← أزرق في القاعدي",
          "أزرق في الحمضي ← أحمر في المتعادل ← أصفر في القاعدي",
          "عديم اللون في الحمضي ← وردي في المتعادل ← بنفسجي في القاعدي",
          "أحمر في الحمضي ← برتقالي في المتعادل ← أصفر في القاعدي"
        ],
        "optionsEn": [
          "Yellow in acid → Green in neutral → Blue in base",
          "Blue in acid → Red in neutral → Yellow in base",
          "Colorless in acid → Pink in neutral → Violet in base",
          "Red in acid → Orange in neutral → Yellow in base"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 55",
        "category": "الكواشف الكيميائية",
        "explanation": "كاشف أزرق البروموثيمول (ص 55) يظهر باللون الأصفر عند pH < 6، وباللون الأخضر في الوسط المتعادل عند pH = 7، وباللون الأزرق في الوسط القاعدي عند pH > 7.6."
      },
      {
        "id": 507,
        "question": "ما المادة القاعدية الآمنة الموصى بها في المنهاج لمعادلة التربة الزراعية شديدة الحموضة وتحسين خصوبتها؟",
        "questionEn": "Which safe basic compound is recommended to neutralize excessively acidic farm soils?",
        "options": [
          "هيدروكسيد الكالسيوم Ca(OH)₂ (الجير المطفأ)",
          "حمض الكبريتيك المركز H₂SO₄",
          "غاز ثاني أكسيد الكربون CO₂",
          "حمض الهيدروكلوريك HCl"
        ],
        "optionsEn": [
          "Calcium hydroxide Ca(OH)₂ (Slaked lime)",
          "Concentrated sulfuric acid H₂SO₄",
          "Carbon dioxide gas CO₂",
          "Hydrochloric acid HCl"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 55 (الربط بالزراعة)",
        "category": "تطبيقات زراعية",
        "explanation": "تُعالج التربة الحامضية بإضافة الجير المطفأ Ca(OH)₂ أو الحجر الجيري لمعادلة أيونات الهيدروجين الزائدة ورفع رقم pH للتربة للمستوى المناسب لنمو النباتات."
      },
      {
        "id": 508,
        "question": "ما هو التفاعل الكيميائي الذي يحدث عند وصول تجربة المعايرة إلى نقطة نهاية المعايرة (End Point)؟",
        "questionEn": "What chemical event marks reaching the equivalence/end point in an acid-base titration?",
        "options": [
          "تتساوى كميات أيونات H⁺ الناتجة من الحمض مع كميات أيونات OH⁻ الناتجة من القاعدة تماماً ويتغير لون الكاشف",
          "ترسب جميع جزيئات الحمض في قاع الدورق",
          "تبخر كامل الماء وتصاعد غاز الكلور",
          "تحول المحلول إلى حمض مركز"
        ],
        "optionsEn": [
          "The moles of H⁺ ions exactly balance OH⁻ ions, triggering indicator color change",
          "Complete acid precipitation",
          "Total water evaporation with chlorine gas",
          "Transformation into concentrated acid"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 62",
        "category": "المعايرة والتعادل",
        "explanation": "عند نقطة نهاية المعايرة والتعادل (ص 62)، تتكافأ كمية أيونات الهيدروجين H⁺ مع أيونات الهيدروكسيد OH⁻ وينتج محلول متعادل يتغير عنده لون الكاشف فوراً."
      },
      {
        "id": 509,
        "question": "ما هو المركب الكيميائي المستخدم في صناعة الإسمنت، ومعالجة حموضة المعدة، ومعالجة حموضة التربة، ويُعرف باسم الحجر الجيري؟",
        "questionEn": "Which compound is used in cement, antacid medications, soil treatment, and is known as limestone?",
        "options": [
          "كربونات الكالسيوم (CaCO₃)",
          "كلوريد الصوديوم (NaCl)",
          "كبريتات المغنيسيوم (MgSO₄)",
          "نترات الصوديوم (NaNO₃)"
        ],
        "optionsEn": [
          "Calcium Carbonate (CaCO₃)",
          "Sodium Chloride (NaCl)",
          "Magnesium Sulfate (MgSO₄)",
          "Sodium Nitrate (NaNO₃)"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 65",
        "category": "استخدامات الأملاح",
        "explanation": "كربونات الكالسيوم CaCO₃ هي المكون الأساسي للحجر الجيري والرخام، وتدخل في صناعة الإسمنت ومواد البناء، وتستخدم طبياً كأقراص مضادة لحموضة المعدة."
      },
      {
        "id": 510,
        "question": "ما هي الطريقة الصناعية المستعملة لتحضير حمض الكبريتيك (H₂SO₄) تجارياً من الكبريت؟",
        "questionEn": "What is the commercial industrial method used to produce sulfuric acid (H₂SO₄)?",
        "options": [
          "طريقة التلامس (Contact Process) بأكسدة SO₂ إلى SO₃ بوجود خامس أكسيد الفاناديوم V₂O₅",
          "طريقة هابر - بوش (Haber Process)",
          "طريقة التقطير البسيط لمياه البحر",
          "طريقة الترسيب الكهروكيميائي"
        ],
        "optionsEn": [
          "Contact process oxidizing SO₂ to SO₃ using V₂O₅ catalyst",
          "Haber-Bosch process",
          "Simple sea water distillation",
          "Electrochemical precipitation"
        ],
        "correctIndex": 0,
        "curriculumRef": "كتاب الطالب: ص 68 (الربط بالصناعة)",
        "category": "الصناعات الكيميائية",
        "explanation": "يُحضر حمض الكبريتيك تجارياً بطريقة التلامس (ص 68) عبر حرق الكبريت ثم أكسدة SO₂ إلى SO₃ بوجود العامل المساعد V₂O₅ ثم إذابته في الماء وحمض الكبريتيك المركز."
      }
    ]
  }
};

export const ALL_QUIZ_KEYS = Object.keys(CURRICULUM_QUIZZES);
