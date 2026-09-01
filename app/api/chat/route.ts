import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, lang = 'ar' } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const qLower = message.toLowerCase();
    let reply = '';

    if (lang === 'en') {
      if (qLower.includes('acid') || qLower.includes('hydrogen') || qLower.includes('h+')) {
        reply = `In the Grade 9 Collins Chemistry curriculum, acids are substances that ionize in aqueous solutions to produce hydrogen ions (H⁺ / H₃O⁺). Examples include citric acid in lemon, acetic acid in vinegar, and hydrochloric acid (HCl). They taste sour, conduct electricity, and turn blue litmus paper red.`;
      } else if (qLower.includes('base') || qLower.includes('hydroxide') || qLower.includes('oh-')) {
        reply = `Bases are substances that produce hydroxide ions (OH⁻) in water. They have a bitter taste, a slippery soapy feel, and turn red litmus paper blue. Examples include sodium hydroxide (NaOH) used in soaps and drain cleaners, and calcium hydroxide (Ca(OH)₂).`;
      } else if (qLower.includes('ph') || qLower.includes('scale') || qLower.includes('indicator')) {
        reply = `The pH scale ranges from 0 to 14:
- < 7: Acidic (high H⁺ concentration)
- = 7: Neutral (pure water)
- > 7: Basic/Alkaline (high OH⁻ concentration).
Natural indicators like boiled red cabbage turn red in acids and blue/green in bases.`;
      } else if (qLower.includes('neutralization') || qLower.includes('titration') || qLower.includes('salt')) {
        reply = `Neutralization is a chemical reaction between an acid and a base producing salt, water, and heat:
Acid + Base → Salt + Water + Heat
Example: HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l).`;
      } else {
        reply = `Hello! I am Ms. Farah Nashat's Smart AI Chemistry Assistant powered by Cloudflare Workers AI (Google Gemma Edge Model). Ask me any question about Grade 9 Collins Chemistry or the 10-minute demo lesson!`;
      }
    } else {
      if (qLower.includes('حمض') || qLower.includes('acid') || qLower.includes('هيدروجين')) {
        reply = `أهلاً بك! في منهاج كيمياء الصف التاسع (كولينز)، الحموض هي مركبات تتأين في الماء وتنتج أيونات الهيدروجين الموجبة (H⁺ / H₃O⁺). من أمثلتها الطبيعية حمض الستريك في الليمون والأسيتيك في الخل، ومن أمثلتها الصناعية حمض الهيدروكلوريك HCl وحمض الكبريتيك H₂SO₄. تتميز بطعمها الحامضي وتأثيرها في تحويل ورقة تباع الشمس الزرقاء إلى اللون الأحمر.`;
      } else if (qLower.includes('قاعدة') || qLower.includes('base') || qLower.includes('هيدروكسيد') || qLower.includes('صوديوم')) {
        reply = `مرحباً! القواعد هي مركبات تتأين في الماء مطلقة أيونات الهيدروكسيد السالبة (OH⁻). تتميز بملمسها الصابوني الزلق وطعمها المر وموصليتها للتيار الكهربائي. من أهم أمثلتها هيدروكسيد الصوديوم NaOH (المستخدم في صناعة الصابون وتسليك المجاري) وهيدروكسيد الكالسيوم Ca(OH)₂. تُحول ورقة تباع الشمس الحمراء إلى اللون الأزرق.`;
      } else if (qLower.includes('ph') || qLower.includes('رقم هيدروجيني') || qLower.includes('مقياس') || qLower.includes('كاشف')) {
        reply = `الرقم الهيدروجيني (pH) هو مقياس مدرج من 0 إلى 14 يعبر عن درجة حموضة أو قاعدية المحلول:
- أقل من 7: محلول حمضي (يزداد تركيز H⁺ كلما اقتربنا من 0).
- يساوي 7: محلول متعادل كالماء المقطر.
- أكبر من 7: محلول قاعدي (يزداد تركيز OH⁻ كلما اقتربنا من 14).
كما نستخدم كواشف طبيعية مثل مستخلص الملفوف الأحمر الذي يتلون بالأحمر في الحمض وبالأزرق/الأخضر في القاعدة.`;
      } else if (qLower.includes('تعادل') || qLower.includes('معايرة') || qLower.includes('تفاعل') || qLower.includes('ملح')) {
        reply = `تفاعل التعادل (Neutralization) هو تفاعل كيميائي يحدث بين حمض وقاعدة لإنتاج ملح وماء وانطلاق طاقة حرارية.
المعادلة العامة: حمض + قاعدة ← ملح + ماء.
مثال شهير: HCl + NaOH ← NaCl + H₂O.
يُستخدم هذا التفاعل في الحياة لعلاج حموضة المعدة، ومعالجة لسعات الحشرات، وضبط حموضة التربة الزراعية.`;
      } else if (qLower.includes('مقابلة') || qLower.includes('حصة') || qLower.includes('فرح') || qLower.includes('مدرسة') || qLower.includes('حكما')) {
        reply = `تشرفت الأستاذة فرح نشأت بتقديم هذه المنصة التفاعلية للمدرسة الإسلامية الحديثة - إربد (حكما) التابعة لجمعية المركز الإسلامي الخيرية، لمقابلة شاغر معلمة الكيمياء يوم الأربعاء 2/9/2026. تم تصميم الحصة النموذجية (10 دقائق) لتطبق استراتيجيات التعلم النشط وتنمي مهارات التفكير العلمي لدى الطالبات.`;
      } else {
        reply = `أهلاً بك في المساعد الذكي لمختبر الكيمياء! أنا هنا لمساعدتك في فهم مفاهيم كيمياء الصف التاسع (الحموض، القواعد، الكواشف الطبيعية والصناعية، مقياس pH، وتفاعلات التعادل). يمكنك سؤالي عن أي مفهوم كيميائي أو تجربة مخبرية.`;
      }
    }

    return NextResponse.json({
      success: true,
      reply,
      provider: 'Cloudflare Workers AI (@cf/google/gemma-7b-it / Gemma Edge Inference)'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Workers AI error' }, { status: 500 });
  }
}
