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
  CheckCircle2, 
  FileText, 
  Activity, 
  Zap, 
  Flame, 
  Dna,
  Sprout,
  ShieldAlert,
  ArrowRight,
  Boxes
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

interface TopicNode {
  id: string;
  title: string;
  titleEn: string;
  pages: string;
  summary: string;
  summaryEn: string;
  keyPoints: string[];
  keyPointsEn: string[];
  equations: { title: string; equation: string }[];
  realWorldConnection: { title: string; desc: string; category: string };
  checkQuestions: { question: string; answer: string }[];
}

const CURRICULUM_MODULES: TopicNode[] = [
  {
    id: 'intro_and_exploratory',
    title: '1. الإحصاءات الصناعية والتجربة الاستهلالية',
    titleEn: '1. Global Industrial Statistics & Exploratory Lab',
    pages: 'كتاب كولينز: ص 43 - 45',
    summary: 'نظرة عامة على انتشار الحموض والقواعد في حياتنا، إنتاج 20 مليون طن من HCl للبلاستيك و60 مليون طن من NaOH للصابون والورق، مع التجربة الاستهلالية لفحص المواد المنزلية.',
    summaryEn: 'Overview of global industrial production (~20M tons HCl, ~60M tons NaOH) and exploratory inquiry lab classifying household substances.',
    keyPoints: [
      'الاستهلاك العالمي: يُصنع 20 مليون طن من حمض HCl سنوياً (صناعة البلاستيك)، و60 مليون طن من هيدروكسيد الصوديوم NaOH (صناعة الورق والصابون).',
      'التجربة الاستهلالية (ص 45): فحص عصير الليمون، الخل، رب البندورة، اللبن، منظف الزجاج، مبيض الغسيل، ومنظف الأفران بأوراق الكاشف العام.',
      'تصنيف المواد: ترتيب المواد وفق تزايد الرقم الهيدروجيني pH وتحديد أيها أكثر حمضية أو أكثر قاعدية.',
      'إرشادات السلامة في المختبر: ارتداء معطف المختبر، النظارات الواقية، والقفازات، والامتناع عن تذوق أو لمس الكيماويات.'
    ],
    keyPointsEn: [
      'Global scale: 20M tons HCl (plastics) and 60M tons NaOH (paper, soap) manufactured annually.',
      'Exploratory Lab (p. 45): Testing lemon juice, vinegar, tomato paste, yogurt, glass cleaner, bleach, oven cleaner using universal indicator.',
      'pH Data Sorting: Arranging substances by ascending pH value and determining relative acidity/basicity.',
      'Lab Safety Rules: Mandatory lab coats, safety goggles, gloves; never taste or touch laboratory reagents.'
    ],
    equations: [
      {
        title: 'استخدام أوراق الكاشف العام لمطابقة دليل الألوان القياسي',
        equation: 'Sample + Universal Indicator Strip → Match Standard Color Chart (pH 0 - 14)'
      }
    ],
    realWorldConnection: {
      title: 'الربط بالصناعة العالمية (ص 43)',
      desc: 'تدخل الحموض والقواعد كركائز استراتيجية في خطوط إنتاج البلاستيك، الورق، الصابون، والمنظفات المنزلية على نطاق ملايين الأطنان.',
      category: 'الصناعة'
    },
    checkQuestions: [
      {
        question: 'ما الهدف من إجراء التجربة الاستهلالية في بداية وحدة الحموض والقواعد (ص 45)؟',
        answer: 'استقصاء وتصنيف المواد المنزلية الشائعة إلى حمضية وقاعدية ومتعادلة بناءً على ألوان الكاشف العام وقيم الرقم الهيدروجيني pH.'
      }
    ]
  },
  {
    id: 'acids_properties',
    title: '2. مفهوم الحموض وخصائصها والأكاسيد الحمضية',
    titleEn: '2. Properties of Acids, Ionization & Acidic Oxides',
    pages: 'كتاب كولينز: ص 46 - 48',
    summary: 'الحموض مواد تنتج أيونات الهيدروجين الموجبة (H⁺) عند ذوبانها في الماء، محاليلها موصلة للكهرباء، تتفاعل مع الفلزات النشطة مطلقة غاز H₂، وتغير لون تباع الشمس إلى الأحمر.',
    summaryEn: 'Acids produce H⁺ ions in water, conduct electricity via mobile ions, react with active metals releasing H₂(g), and turn litmus paper red.',
    keyPoints: [
      'تعريف الحمض: مادة تطلق أيون الهيدروجين الموجب (H⁺) عند ذوبانها في الماء.',
      'حموض طبيعية: حمض الستريك (الليمون والبرتقال)، حمض اللاكتيك (اللبن)، وحمض الإيثانويك/الأسيتيك (الخل).',
      'الأكاسيد الحمضية (Acidic Oxides): أكاسيد اللافلزات (مثل CO₂ و NO₂) تذوب في الماء مكونة حموضاً وتنتج أيونات H⁺ (مثال: CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻).',
      'التوصيل الكهربائي: محاليل الحموض موصلة للتيار بسبب وجود أيونات H⁺ والأيونات السالبة حرة الحركة.',
      'التفاعل مع الفلزات: يتفاعل المغنيسيوم مع حمض HCl ليحل محل الهيدروجين وينتج كلوريد المغنيسيوم وغاز H₂.'
    ],
    keyPointsEn: [
      'Acid Definition: Substances producing H⁺ ions upon aqueous dissolution.',
      'Natural Acids: Citric (citrus), Lactic (yogurt), Ethanoic/Acetic (vinegar).',
      'Acidic Oxides: Non-metal oxides (CO₂, NO₂) dissolving in water to form acids producing H⁺.',
      'Conductivity: Acidic solutions conduct electricity due to free mobile aqueous ions.',
      'Reaction with Metals: Mg single-displaces H in HCl producing MgCl₂ and hydrogen gas H₂(g).'
    ],
    equations: [
      {
        title: 'تأين حمض الهيدروكلوريك في الماء',
        equation: 'HCl (aq) → H⁺ (aq) + Cl⁻ (aq)'
      },
      {
        title: 'تأين حمض الكبريتيك في الماء',
        equation: 'H₂SO₄ (aq) → 2H⁺ (aq) + SO₄²⁻ (aq)'
      },
      {
        title: 'تكوين حمض الكربونيك من أكسيد الكربون الحامضي CO₂',
        equation: 'CO₂ (g) + H₂O (l) → H₂CO₃ (aq) → H⁺ (aq) + HCO₃⁻ (aq)'
      },
      {
        title: 'تفاعل المغنيسيوم مع حمض الهيدروكلوريك وتصاعد الهيدروجين',
        equation: 'Mg (s) + 2HCl (aq) → MgCl₂ (aq) + H₂ (g) ↑'
      }
    ],
    realWorldConnection: {
      title: 'الربط بالرياضة - خرافة حمض اللاكتيك (ص 47)',
      desc: 'أثبتت الدراسات الحديثة أن ألم العضلات بعد 24 ساعة من التمارين الشاقة يعود لتمزقات عضلية دقيقة والتهابات، وليس لتراكم حمض اللاكتيك الذي يختفي من العضلات بعد ساعة واحدة تقريباً.',
      category: 'الرياضة والصحة'
    },
    checkQuestions: [
      {
        question: 'أتحقق (ص 47): اكتب معادلة كيميائية تبين تأين حمض الهيدرويوديك HI في الماء؟',
        answer: 'HI (aq) → H⁺ (aq) + I⁻ (aq)'
      },
      {
        question: 'أتحقق (ص 48): أفسر: محلول حمض الهيدروبروميك HBr موصل للتيار الكهربائي؟',
        answer: 'لأن حمض HBr يتأين في الماء منتجاً أيونات هيدروجين موجبة (H⁺) وأيونات بروميد سالبة (Br⁻) حرة الحركة في المحلول المائي.'
      },
      {
        question: 'أتحقق (ص 48): اكتب معادلة كيميائية تمثل تفاعل فلز الصوديوم Na مع محلول حمض الكبريتيك H₂SO₄؟',
        answer: '2Na (s) + H₂SO₄ (aq) → Na₂SO₄ (aq) + H₂ (g) ↑'
      }
    ]
  },
  {
    id: 'bases_properties',
    title: '3. مفهوم القواعد والقلويات والأكاسيد القاعدية',
    titleEn: '3. Bases, Alkalis & Basic Oxides',
    pages: 'كتاب كولينز: ص 49 - 51',
    summary: 'القواعد مواد تنتج أيونات الهيدروكسيد السالبة (OH⁻) عند ذوبانها في الماء، تتميز بملمس زلق وطعم مر، وتغير لون تباع الشمس إلى الأزرق.',
    summaryEn: 'Bases produce OH⁻ ions in water, possess a slippery texture and bitter taste, and change red litmus paper to blue.',
    keyPoints: [
      'تعريف القاعدة: مادة تطلق أيون الهيدروكسيد السالب (OH⁻) عند ذوبانها في الماء.',
      'قواعد بدون OH في صيغتها الأولية: الأمونيا NH₃ تتفاعل مع الماء لتنتج هيدروكسيد الأمونيوم وأيونات OH⁻.',
      'الأكاسيد القاعدية (Basic Oxides): أكاسيد الفلزات؛ الذائب منها في الماء يسمى قلويات (Alkalis) مثل Na₂O و K₂O و BaO و Li₂O.',
      'الأكاسيد غير الذائبة: أكسيد النحاس CuO لا يذوب في الماء لكنه يتفاعل مع الحموض لإنتاج ملح وماء.',
      'القلويات (Alkalis): تشمل أكاسيد وهيدروكسيدات عناصر المجموعة الأولى IA ومعظم عناصر المجموعة الثانية IIA.',
      'تأثير الكواشف: تحول ورقة تباع الشمس الحمراء إلى زرقاء، وتغير كاشف الفينولفثالين من عديم اللون إلى الزهري (Pink).'
    ],
    keyPointsEn: [
      'Base Definition: Substances releasing OH⁻ ions upon aqueous dissolution.',
      'Ammonia Base: NH₃ reacts with H₂O yielding NH₄⁺ and OH⁻ ions.',
      'Basic Oxides: Metal oxides; soluble ones form Alkalis (Na₂O, K₂O, BaO, Li₂O).',
      'Insoluble Oxides: CuO does not dissolve in water but neutralizes acids forming copper salt and water.',
      'Alkalis: Group IA and Group IIA metal hydroxides and soluble oxides.',
      'Indicators Effect: Turns red litmus blue, and phenolphthalein from colorless to fuchsia pink.'
    ],
    equations: [
      {
        title: 'تأين هيدروكسيد البوتاسيوم في الماء',
        equation: 'KOH (s) —(H₂O)→ K⁺ (aq) + OH⁻ (aq)'
      },
      {
        title: 'تأين هيدروكسيد الكالسيوم في الماء',
        equation: 'Ca(OH)₂ (s) —(H₂O)→ Ca²⁺ (aq) + 2OH⁻ (aq)'
      },
      {
        title: 'تفاعل الأمونيا القاعدية مع الماء لإنتاج OH⁻',
        equation: 'NH₃ (g) + H₂O (l) ⇌ NH₄⁺ (aq) + OH⁻ (aq)'
      },
      {
        title: 'ذوبان أكسيد الصوديوم القاعدي في الماء وتكوين القلوي',
        equation: 'Na₂O (s) + H₂O (l) → 2NaOH (aq) → 2Na⁺ (aq) + 2OH⁻ (aq)'
      }
    ],
    realWorldConnection: {
      title: 'الربط بالصناعة - تسليك المصارف المنزلية (ص 50)',
      desc: 'يُستخدم هيدروكسيد الصوديوم NaOH في صناعة منظفات المصارف لإزالة أسباب الانسداد، حيث يقوم بتكسير وإذابة الدهون والمواد العضوية العالقة كيميائياً.',
      category: 'الصناعة والمنزل'
    },
    checkQuestions: [
      {
        question: 'أتحقق (ص 50): أفسر: مستعيناً بمعادلات كيميائية؛ لماذا يُعد أكسيد الليثيوم Li₂O قلوياً؟',
        answer: 'لأنه أكسيد فلزي يذوب في الماء مكوناً هيدروكسيد الليثيوم LiOH الذي يتأين كلياً في الماء منتجاً أيونات الهيدروكسيد OH⁻: \nLi₂O (s) + H₂O (l) → 2LiOH (aq) → 2Li⁺ (aq) + 2OH⁻ (aq)'
      },
      {
        question: 'أتحقق (ص 51): أفسر: محلول هيدروكسيد الصوديوم NaOH موصل للتيار الكهربائي؟',
        answer: 'بسبب تأينه في الماء وإنتاجه أيونات الصوديوم الموجبة (Na⁺) وأيونات الهيدروكسيد السالبة (OH⁻) حرة الحركة في المحلول.'
      }
    ]
  },
  {
    id: 'strength_and_ionization',
    title: '4. قوة الحموض والقواعد ودرجة التأين ومعدل التفاعل',
    titleEn: '4. Acid & Base Strength, Degree of Ionization & Reaction Rates',
    pages: 'كتاب كولينز: ص 52 - 53',
    summary: 'تعتمد قوة الحمض أو القاعدة على درجة تأينه في الماء، حيث تتأين المواد القوية كلياً (سهم باتجاه واحد →) بينما تتأين المواد الضعيفة جزئياً (سهمان متعاكسان ⇌).',
    summaryEn: 'Strength depends on the degree of ionization. Strong electrolytes ionize completely (→) exhibiting higher conductivity and faster reaction rates.',
    keyPoints: [
      'درجة التأين (Degree of Ionization): نسبة جزيئات الحمض أو القاعدة التي تحولت إلى أيونات مقارنة بالجزيئات الكلية في المحلول.',
      'الحمض القوي: يتأين كلياً في الماء (سهم باتجاه واحد →) ومحلوله يحتوي فقط على أيونات موجبة وسالبة. أمثلة: HCl, HBr, HI, HNO₃, H₂SO₄.',
      'الحمض الضعيف: يتأين جزئياً في الماء (سهمان متعاكسان ⇌) ويحتوي محلوله على جزيئات غير متأينة وأيونات. أمثلة: CH₃COOH, HF, H₃PO₄, H₂CO₃.',
      'القواعد القوية: تتأين كلياً في الماء مثل KOH, NaOH, Ca(OH)₂, Ba(OH)₂, LiOH.',
      'القواعد الضعيفة: تتأين جزئياً مثل الأمونيا NH₃ والهيدرازين N₂H₄.',
      'الموصلية الكهربائية: إضاءة المصباح في محلول 0.1M HCl أقوى بكثير من إضاءته في محلول 0.1M CH₃COOH بسبب وفرة الأيونات الحرة.',
      'سرعة تفاعل الفلزات: تفاعل فلز الخارصين Zn مع حمض HCl القوي أسرع بكثير ويتصاعد غاز H₂ بمعدل أعلى مقارنة بحمض الإيثانويك CH₃COOH.'
    ],
    keyPointsEn: [
      'Degree of Ionization: Ratio of ionized molecules to total solute molecules in solution.',
      'Strong Acids: 100% ionized (single arrow →). Examples: HCl, HBr, HI, HNO₃, H₂SO₄.',
      'Weak Acids: Partially ionized in equilibrium (⇌). Examples: CH₃COOH, HF, H₃PO₄.',
      'Strong Bases: KOH, NaOH, Ca(OH)₂, Ba(OH)₂, LiOH.',
      'Weak Bases: Ammonia NH₃, Hydrazine N₂H₄.',
      'Conductivity Contrast: Equimolar HCl bulb glows bright white; CH₃COOH glows dim orange.',
      'Reaction Rate with Zn: Reaction of Zn with strong HCl proceeds much faster releasing H₂ vigorously compared to weak CH₃COOH.'
    ],
    equations: [
      {
        title: 'تأين كلي لحمض النيتريك القوي (سهم واحد)',
        equation: 'HNO₃ (aq) → H⁺ (aq) + NO₃⁻ (aq)'
      },
      {
        title: 'تأين جزئي لحمض الإيثانويك الضعيف (سهمان متعاكسان)',
        equation: 'CH₃COOH (aq) ⇌ H⁺ (aq) + CH₃COO⁻ (aq)'
      },
      {
        title: 'تأين كلي لقاعدة هيدروكسيد الليثيوم القوية',
        equation: 'LiOH (s) —(H₂O)→ Li⁺ (aq) + OH⁻ (aq)'
      },
      {
        title: 'تأين جزئي لقاعدة الهيدرازين الضعيفة في الماء',
        equation: 'N₂H₄ (aq) + H₂O (l) ⇌ N₂H₅⁺ (aq) + OH⁻ (aq)'
      }
    ],
    realWorldConnection: {
      title: 'مقارنة شدة الإضاءة ومعدل التفاعل المخبري (ص 52 - 53)',
      desc: 'عند تساوي التركيز، يقود الحمض القوي دارة المصباح للتوهج الساطع ويستهلك فلز الخارصين في زمن أقل بكثير من الحمض الضعيف.',
      category: 'المختبر والاستقصاء'
    },
    checkQuestions: [
      {
        question: 'أتحقق (ص 53): أفسر: التوصيل الكهربائي لمحلول هيدروكسيد البوتاسيوم KOH أكبر منه لمحلول الأمونيا NH₃ المساوي له في التركيز؟',
        answer: 'لأن KOH قاعدة قوية تتأين كلياً في الماء منتجة تركيزاً عالياً من أيونات K⁺ و OH⁻، بينما NH₃ قاعدة ضعيفة تتأين جزئياً فقط مما ينتج تركيزاً منخفضاً من الأيونات الحرة.'
      },
      {
        question: 'سؤال الجدول 3 (ص 53): أي الحمضين أكثر قدرة على توصيل التيار الكهربائي عند الظروف نفسها: HF أم HNO₃؟',
        answer: 'حمض النيتريك HNO₃ أكثر قدرة على التوصيل لأنه حمض قوي يتأين كلياً، بينما حمض الهيدروفلوريك HF حمض ضعيف يتأين جزئياً.'
      }
    ]
  },
  {
    id: 'ph_scale_and_applications',
    title: '5. الرقم الهيدروجيني pH والكواشف والتطبيقات الحياتية والزراعية',
    titleEn: '5. pH Scale, Indicators & Agricultural/Hair Applications',
    pages: 'كتاب كولينز: ص 54 - 55',
    summary: 'تدريج الرقم الهيدروجيني من 0 إلى 14، الطيف الحياتي لـ 16 مادة شائعة، العناية ببروتين كيراتين الشعر (pH 5.5)، ومعالجة حموضة التربة الزراعية بـ Ca(OH)₂.',
    summaryEn: 'The 0-14 pH scale, 16 everyday substances, hair keratin preservation (pH 5.5), agricultural soil remediation using Ca(OH)₂, and pH meters vs indicators.',
    keyPoints: [
      'تدريج pH: مدرج من 0 إلى 14 (pH=7 متعادل، pH<7 حمضي يزداد تركيز H⁺ نحو الصفر، pH>7 قاعدي يزداد تركيز OH⁻ نحو 14).',
      'طيف المواد اليومية: حمض البطارية (0.5)، حمض المعدة (1)، الليمون (2.2)، الخل (2.8)، الطماطم (4.2)، القهوة (5)، الحليب (6.6)، الماء النقي (7)، ماء البحر (8.2)، صودا الخبيز (8.5)، مضاد الحموضة (10)، الأمونيا (11.2)، مبيض الغسيل (12.5)، منظف المصارف (13.8).',
      'الربط بالحياة - كيراتين الشعر (ص 54): يتكون الشعر من بروتين الكيراتين، وتعد درجة الحموضة (4.5 - 6) مناسبة لحمايته من التلف والتقصف، لذا يُصمم الشامبو عند pH ≈ 5.5.',
      'الربط بالزراعة - معالجة التربة (ص 55): تعتمد المحاصيل على pH التربة؛ وتُعالج التربة شديدة الحموضة بإضافة مادة قاعدية مثل محلول هيدروكسيد الكالسيوم Ca(OH)₂.',
      'الكواشف ومقياس pH: كواشف طبيعية (الملفوف، الشاي)، كواشف صناعية (تباع الشمس، الفينولفثالين، أزرق البروموثيمول)، الكاشف العام، ومقياس الرقم الهيدروجيني الرقمي (pH meter).'
    ],
    keyPointsEn: [
      'pH Scale Range: 0 to 14 (pH 7 neutral, <7 acidic with higher [H⁺], >7 basic with higher [OH⁻]).',
      'Everyday Substance Continuum: Battery acid (0.5), stomach (1), vinegar (2.8), water (7), bleach (12.5), drain cleaner (13.8).',
      'Hair Keratin Care: Hair protein keratin is protected in pH 4.5-6. Shampoos are formulated at pH 5.5.',
      'Agricultural Soil Treatment: Acidic soils are neutralized with calcium hydroxide Ca(OH)₂ slaked lime.',
      'pH Measurement Instruments: Natural indicators, synthetic indicators, universal indicator paper, and high-precision digital pH meters.'
    ],
    equations: [
      {
        title: 'معادلة حموضة التربة بواسطة هيدروكسيد الكالسيوم',
        equation: '2H⁺ (Soil Acid) + Ca(OH)₂ (aq) → Ca²⁺ (aq) + 2H₂O (l)'
      },
      {
        title: 'تغير لون كاشف أزرق البروموثيمول حسب الوسط',
        equation: 'Bromothymol: Yellow (Acidic pH < 6) ⇌ Green (Neutral pH 7) ⇌ Blue (Basic pH > 7.6)'
      }
    ],
    realWorldConnection: {
      title: 'الربط بالزراعة وكيراتين الشعر (ص 54 - 55)',
      desc: 'حماية كيراتين الشعر من التقصف بضبط شامبو الشعر عند pH 5.5، وتحسين خصوبة التربة الزراعية المتعادلة بإضافة الجير المطفأ Ca(OH)₂.',
      category: 'الزراعة والحياة'
    },
    checkQuestions: [
      {
        question: 'أتحقق (ص 54): أي المحلولين أكثر قاعدية: ماء البحر أم الماء النقي؟',
        answer: 'ماء البحر أكثر قاعدية (pH ≈ 8.2) مقارنة بالماء النقي المتعادل (pH = 7.0).'
      },
      {
        question: 'أتحقق (ص 54): أيهما يكون تركيز H⁺ فيه أكبر: الخل أم البندورة؟',
        answer: 'الخل يكون تركيز H⁺ فيه أكبر لأن رقمه الهيدروجيني أقل (pH الخل ≈ 2.8 بينما pH البندورة ≈ 4.2)، فكلما انخفض pH زاد تركيز H⁺.'
      },
      {
        question: 'أتحقق (ص 55): كيف يُحدد الرقم الهيدروجيني لمحلول ما باستخدام الكاشف العام؟',
        answer: 'تُغمس ورقة الكاشف العام (أو يُضاف السائل) في المحلول، ثم يُطابق اللون الناتج مع دليل الألوان القياسي المرفق لتحديد قيمة pH المقابلة.'
      }
    ]
  }
];

export default function CurriculumMapPage() {
  const { t, dir } = useLanguage();
  const [selectedModule, setSelectedModule] = useState<TopicNode>(CURRICULUM_MODULES[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'equations' | 'checkpoints' | 'real_world'>('overview');
  const [showAnswerIdx, setShowAnswerIdx] = useState<{ [key: number]: boolean }>({});

  const toggleAnswer = (idx: number) => {
    setShowAnswerIdx((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header - Clean Light Style */}
      <div className="bg-white border border-slate-200 p-6 space-y-3 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              {t('خارطة المفاهيم والمعادلات الكيميائية', 'Comprehensive Curriculum Knowledge Map')}
            </h1>
            <p className="text-xs text-slate-500">
              {t('تفكيك شامل لوحدة الحموض والقواعد والأملاح مع كافة المعادلات وتطبيقات المنهاج', 'Detailed breakdown of chemical units, balanced ionic equations, and textbook checkpoints')}
            </p>
          </div>
          <Link
            href="/virtual-lab"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-800 transition"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>{t('المختبر الافتراضي (3D)', 'Launch Lab')}</span>
          </Link>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Module Nav Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-1.5">
          {CURRICULUM_MODULES.map((mod) => {
            const isSelected = selectedModule.id === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  setSelectedModule(mod);
                  setActiveTab('overview');
                  setShowAnswerIdx({});
                }}
                className={`w-full text-right p-3.5 border transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-2xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-bold">{mod.title}</div>
                  <div className={`text-[11px] font-mono ${isSelected ? 'text-emerald-800' : 'text-slate-400'}`}>{mod.pages}</div>
                </div>
                <ChevronLeft className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-800 -translate-x-1' : 'text-slate-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Detailed Stage (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 p-6 space-y-5 shadow-2xs">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-emerald-800 font-mono bg-emerald-50 px-2 py-0.2 border border-emerald-200">
                {selectedModule.pages}
              </span>
              <h3 className="text-lg font-black text-slate-900">{selectedModule.title}</h3>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1 bg-slate-50 p-1 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1 transition ${activeTab === 'overview' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-600'}`}
              >
                {t('الملخص', 'Overview')}
              </button>
              <button
                onClick={() => setActiveTab('equations')}
                className={`px-3 py-1 transition ${activeTab === 'equations' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-600'}`}
              >
                {t('المعادلات', 'Equations')}
              </button>
              <button
                onClick={() => setActiveTab('real_world')}
                className={`px-3 py-1 transition ${activeTab === 'real_world' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-600'}`}
              >
                {t('الربط بالحياة', 'Real-world')}
              </button>
              <button
                onClick={() => setActiveTab('checkpoints')}
                className={`px-3 py-1 transition ${activeTab === 'checkpoints' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-slate-600'}`}
              >
                {t('أسئلة "أتحقق"', 'Checkpoints')}
              </button>
            </div>
          </div>

          {/* TAB: Overview & Key Points */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 border border-slate-200">
                {selectedModule.summary}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700">
                  {t('المفاهيم والنتاجات الرئيسة:', 'Key Concepts & Outcomes:')}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedModule.keyPoints.map((pt, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 text-xs flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-slate-800 leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Equations */}
          {activeTab === 'equations' && (
            <div className="space-y-2.5">
              {selectedModule.equations.map((eq, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-slate-800">{eq.title}</div>
                  <div className="font-mono text-xs font-bold text-emerald-900 dir-ltr bg-white p-2.5 border border-slate-200">
                    {eq.equation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: Real-World Link */}
          {activeTab === 'real_world' && (
            <div className="p-5 bg-emerald-50/70 border border-emerald-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 border border-emerald-300">
                  {selectedModule.realWorldConnection.category}
                </span>
                <span className="text-xs font-mono text-slate-500">{selectedModule.pages}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{selectedModule.realWorldConnection.title}</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedModule.realWorldConnection.desc}
              </p>
            </div>
          )}

          {/* TAB: Checkpoints */}
          {activeTab === 'checkpoints' && (
            <div className="space-y-2.5">
              {selectedModule.checkQuestions.map((cq, idx) => {
                const isOpen = showAnswerIdx[idx];
                return (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                        <h5 className="font-bold text-xs sm:text-sm text-slate-900">{cq.question}</h5>
                      </div>
                      <button
                        onClick={() => toggleAnswer(idx)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-emerald-900 shrink-0"
                      >
                        {isOpen ? t('إخفاء الإجابة', 'Hide Answer') : t('إظهار الإجابة', 'Show Answer')}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium leading-relaxed whitespace-pre-line">
                        {cq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
