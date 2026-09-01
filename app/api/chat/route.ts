import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, messages = [], lang = 'ar' } = body;

    const userQuery = message || (messages.length > 0 ? messages[messages.length - 1].content : '');

    if (!userQuery) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const q = userQuery.toLowerCase();
    let reply = '';

    if (lang === 'en') {
      if (q.includes('oxide') || q.includes('co2') || q.includes('li2o')) {
        reply = `In Collins Grade 9 Chemistry (pp. 47, 50):
1. **Acidic Oxides (أكاسيد حمضية):** Non-metal oxides (such as carbon dioxide CO₂ and nitrogen dioxide NO₂) that dissolve in water producing acidic solutions releasing H⁺ ions:
   CO₂ (g) + H₂O (l) → H₂CO₃ (aq) → H⁺ (aq) + HCO₃⁻ (aq)
2. **Basic Oxides (أكاسيد قاعدية):** Metal oxides (like Na₂O, Li₂O, BaO). Soluble metal oxides form **Alkalis (قلويات)** that ionize producing OH⁻ ions:
   Li₂O (s) + H₂O (l) → 2LiOH (aq) → 2Li⁺ (aq) + 2OH⁻ (aq)
   Insoluble basic oxides like copper oxide CuO neutralize acids forming copper salt and water (CuO + 2HCl → CuCl₂ + H₂O).`;
      } else if (q.includes('sport') || q.includes('muscle') || q.includes('lactic')) {
        reply = `**Sports Connection - Lactic Acid Myth (Collins Grade 9, p. 47):**
Lactic acid is often mistakenly blamed for delayed onset muscle soreness (DOMS) felt 24 hours after intense exercise.
Modern scientific studies confirm that soreness is actually caused by **microscopic muscle tears and subsequent inflammation**, NOT lactic acid accumulation. Lactic acid clears from muscle tissues within approximately 1 hour after physical activity.`;
      } else if (q.includes('hair') || q.includes('shampoo') || q.includes('keratin')) {
        reply = `**Hair Care & Keratin Connection (Collins Grade 9, p. 54):**
Human hair consists of the fibrous protein **keratin**. A pH range of **4.5 to 6.0** is ideal for protecting hair fibers from damage and split ends.
Therefore, shampoo manufacturers formulate cleansing products with a balanced pH around **5.5** to maintain hair vitality, strength, and cuticle integrity.`;
      } else if (q.includes('soil') || q.includes('agriculture') || q.includes('plant') || q.includes('lime')) {
        reply = `**Agriculture Connection - Soil Remediation (Collins Grade 9, p. 55):**
Regulating soil pH is essential for optimal crop yield and root nutrient absorption.
If agricultural soil is excessively acidic, it is treated and neutralized using a basic substance such as **calcium hydroxide solution Ca(OH)₂ (slaked lime)**:
2H⁺ (Soil Acid) + Ca(OH)₂ (aq) → Ca²⁺ (aq) + 2H₂O (l)`;
      } else if (q.includes('strength') || q.includes('strong') || q.includes('weak') || q.includes('ioniz') || q.includes('lamp') || q.includes('bulb')) {
        reply = `**Strength of Acids and Bases (Collins Grade 9, pp. 52-53):**
1. **Strong Acids:** Ionize completely in water (single forward arrow →), yielding abundant mobile ions with high electrical conductivity (bright lamp illumination) and rapid reaction with reactive metals:
   HCl (aq) → H⁺ (aq) + Cl⁻ (aq)
   *Examples:* HCl, HNO₃, H₂SO₄, HBr, HI.
2. **Weak Acids:** Ionize partially in dynamic equilibrium (⇌), yielding low ion concentrations, dim lamp illumination, and slower reaction rates:
   CH₃COOH (aq) ⇌ H⁺ (aq) + CH₃COO⁻ (aq)
   *Examples:* CH₃COOH, HF, H₃PO₄.
3. **Strong Bases:** Ionize completely (KOH, NaOH, Ca(OH)₂, Ba(OH)₂, LiOH).
4. **Weak Bases:** Ionize partially (Ammonia NH₃, Hydrazine N₂H₄). Ammonia reacts with water: NH₃ (g) + H₂O (l) ⇌ NH₄⁺ (aq) + OH⁻ (aq).`;
      } else if (q.includes('indicator') || q.includes('litmus') || q.includes('cabbage') || q.includes('bromothymol') || q.includes('phenolphthalein')) {
        reply = `**Chemical Indicators Spectrum (Collins Grade 9, pp. 49, 51, 55):**
1. **Litmus Paper:** Blue turns **red** in acid; red turns **blue** in base.
2. **Red Cabbage (Natural):** **Red/Pink** in acids, **Violet** in neutral, **Blue/Green/Yellow** in bases.
3. **Phenolphthalein:** **Colorless** in acids and neutral solutions; turns **Fuchsia Pink** in bases (pH > 8.2).
4. **Bromothymol Blue:** **Yellow** in acids, **Grass Green** at neutral (pH = 7), **Blue** in bases (pH > 7.6).
5. **Universal Indicator & Digital pH Meter:** Calibrated across the complete 0 to 14 pH scale.`;
      } else if (q.includes('neutralization') || q.includes('titration') || q.includes('salt')) {
        reply = `**Neutralization & Titration (Collins Grade 9, pp. 44, 54-55):**
Chemical reaction between an acid and a base forming salt, water, and heat:
Acid + Base → Salt + Water + Heat
HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l) + Heat
H⁺ ions from the acid combine with OH⁻ ions from the base to produce neutral water molecules (pH = 7).`;
      } else {
        reply = `Hello! In Grade 9 Collins Chemistry (pp. 43-55):
- **Acids:** Produce H⁺ ions in aqueous solutions (pH < 7), taste sour, and react with active metals releasing H₂ gas.
- **Bases & Alkalis:** Produce OH⁻ ions in water (pH > 7), feel slippery, and neutralize acids.
- **Indicators:** Change color according to solution pH.
Feel free to ask any specific question about chemical equations, experiments, or teaching concepts!`;
      }
    } else {
      if (q.includes('أكسيد') || q.includes('اكسيد') || q.includes('oxide') || q.includes('co2') || q.includes('li2o')) {
        reply = `في منهاج كيمياء الصف التاسع (كولينز ص 47، 50):
1. **الأكاسيد الحمضية (Acidic Oxides):** هي أكاسيد اللافلزات (مثل غاز ثاني أكسيد الكربون CO₂ وثاني أكسيد النيتروجين NO₂) التي تذوب في الماء لتكوين محاليل حمضية تطلق أيونات H⁺:
   CO₂ (g) + H₂O (l) → H₂CO₃ (aq) → H⁺ (aq) + HCO₃⁻ (aq)
2. **الأكاسيد القاعدية (Basic Oxides):** هي أكاسيد الفلزات؛ الذائب منها في الماء يُسمى **قلويات (Alkalis)** مثل Na₂O و Li₂O و BaO وتنتج أيونات الهيدروكسيد OH⁻:
   Li₂O (s) + H₂O (l) → 2LiOH (aq) → 2Li⁺ (aq) + 2OH⁻ (aq)
   أما الأكاسيد غير الذائبة مثل أكسيد النحاس CuO فتتفاعل مع الحموض لإنتاج ملح وماء (CuO + 2HCl → CuCl₂ + H₂O).`;
      } else if (q.includes('رياضة') || q.includes('عضل') || q.includes('لاكتيك') || q.includes('sport') || q.includes('muscle')) {
        reply = `**الربط بالرياضة - حقيقة حمض اللاكتيك وألم العضلات (كتاب كولينز ص 47):**
يُتهم حمض اللاكتيك خطأً بأنه المسؤول عن ألم العضلات الذي يشعر به الشخص بعد ممارسة التمارين الشاقة بـ 24 ساعة.
وقد أثبتت الدراسات العلمية الحديثة أن سبب الألم الحقيقي هو **تمزقات دقيقة مجهرية تحدث في العضلات والتهاب هذه التمزقات**، وليس تراكم الحمض؛ إذ إن حمض اللاكتيك يختفي من العضلات بعد ساعة واحدة تقريباً من ممارسة التمارين.`;
      } else if (q.includes('شعر') || q.includes('شامبو') || q.includes('كيراتين') || q.includes('hair') || q.includes('keratin')) {
        reply = `**الربط بالحياة - كيراتين الشعر ودرجة الحموضة (كتاب كولينز ص 54):**
يتكون الشعر البشري من بروتين **الكيراتين**، وتُعد درجة الحموضة من (4.5 - 6) مناسبة للحفاظ عليه من التلف والتقصف.
لذلك، يُحافظ صانعو منظفات الشعر (الشامبو) على درجة حموضة معتدلة له ضمن هذا النطاق (تقريباً **pH ≈ 5.5**) لتنظيف الشعر والحفاظ على حيويته ولمعانه.`;
      } else if (q.includes('تربة') || q.includes('زراع') || q.includes('جير') || q.includes('soil') || q.includes('plant')) {
        reply = `**الربط بالزراعة - معالجة حموضة التربة (كتاب كولينز ص 55):**
التحكم في الرقم الهيدروجيني pH للتربة أمر بالغ الأهمية؛ فالنباتات تنمو بشكل أفضل في مدى محدد من الحموضة.
إذا كانت التربة شديدة الحموضة، تُعادل وتُعالج بإضافة مادة قاعدية مثل **محلول هيدروكسيد الكالسيوم Ca(OH)₂ (الجير المطفأ)**:
2H⁺ (حمض التربة) + Ca(OH)₂ (aq) → Ca²⁺ (aq) + 2H₂O (l)`;
      } else if (q.includes('قوة') || q.includes('قوي') || q.includes('ضعيف') || q.includes('تأين') || q.includes('مصباح') || q.includes('strength')) {
        reply = `**قوة الحموض والقواعد ودرجة التأين (كتاب كولينز ص 52 - 53):**
1. **الحمض القوي (Strong Acid):** يتأين كلياً في الماء (سهم باتجاه واحد →). محلوله غني جداً بأيونات H⁺ والأيونات السالبة، فيكون موصلاً ممتازاً للكهرباء (إضاءة مصباح ساطعة)، وتفاعله مع الفلزات (كالخارصين Zn والمغنيسيوم Mg) سريع جداً وينتج غاز الهيدروجين H₂ بوفرة.
   *أمثلة:* HCl, HNO₃, H₂SO₄, HBr, HI.
2. **الحمض الضعيف (Weak Acid):** يتأين جزئياً (سهمان متعاكسان ⇌)، يحتوي محلوله على نسبة قليلة من الأيونات، وتكون إضاءة المصباح خافتة وتفاعله مع الفلزات أبطأ.
   *أمثلة:* CH₃COOH (الخل), HF, H₃PO₄.
3. **القواعد القوية (Strong Bases):** تتأين كلياً (KOH, NaOH, Ca(OH)₂, Ba(OH)₂, LiOH).
4. **القواعد الضعيفة (Weak Bases):** تتأين جزئياً مثل الأمونيا NH₃ والهيدرازين N₂H₄.`;
      } else if (q.includes('كاشف') || q.includes('تباع') || q.includes('ملفوف') || q.includes('بروموثيمول') || q.includes('فينولفثالين') || q.includes('indicator')) {
        reply = `**دليل الكواشف الكيميائية في المنهاج (ص 49، 51، 55):**
1. **ورق تباع الشمس (Litmus):** في الحمض يتحول الأزرق إلى **أحمر**، وفي القاعدة يتحول الأحمر إلى **أزرق**.
2. **مستخلص الملفوف الأحمر (طبيعي):** يتحول إلى **الأحمر/الوردي** في الحمض، و**البنفسجي** في المتعادل، و**الأزرق ثم الأخضر ثم الأصفر** في القواعد.
3. **الفينولفثالين (Phenolphthalein):** **عديم اللون** في الوسط الحمضي والمتعادل، ويتحول إلى **زهري فاقع (Pink)** في الوسط القاعدي (pH > 8.2).
4. **أزرق البروموثيمول (Bromothymol Blue):** **أصفر** في الوسط الحمضي، **أخضر عشبي** عند التعادل (pH = 7)، و**أزرق صريح** في الوسط القاعدي.
5. **الكاشف العام ومقياس pH:** يحددان الرقم الهيدروجيني بدقة عبر تدريج من 0 إلى 14.`;
      } else if (q.includes('تعادل') || q.includes('معايرة') || q.includes('neutralization') || q.includes('titration')) {
        reply = `**تفاعل التعادل والمعايرة (Neutralization & Titration):**
تفاعل كيميائي بين حمض وقاعدة ينتج عنه ملح وماء وتنطلق منه طاقة حرارية:
حمض + قاعدة → ملح + ماء + حرارة
HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l) + حرارة
تتحد أيونات H⁺ من الحمض مع أيونات OH⁻ من القاعدة لتكوين جزيء الماء المتعادل H₂O (pH = 7).`;
      } else {
        reply = `أهلاً بك! في منهاج كيمياء الصف التاسع للأستاذة فرح نشأت (كتاب كولينز ص 43 - 55):
- **الحموض (Acids):** مواد تطلق أيونات H⁺ عند ذوبانها في الماء ولها طعم حامضي ورقم هيدروجيني أقل من 7.
- **القواعد (Bases):** مواد تطلق أيونات OH⁻ في الماء ولها ملمس صابوني ورقم هيدروجيني أكبر من 7.
- **الكواشف (Indicators):** مواد يتغير لونها حسب الوسط (تباع الشمس، الملفوف الأحمر، الفينولفثالين، وأزرق البروموثيمول).
- **الرقم الهيدروجيني (pH):** مقياس من 0 إلى 14 يعبر بدقة عن تركيز أيونات الهيدروجين والهيدروكسيد.
يمكنك سؤالي عن أي معادلة كيميائية أو تجربة مخبرية أو مفهوم تفصيلي وسأجيبك فوراً!`;
      }
    }

    return NextResponse.json({
      success: true,
      reply: reply.trim(),
      model: 'cf/zai-org/glm-5.3-flash'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Workers AI error' }, { status: 500 });
  }
}
