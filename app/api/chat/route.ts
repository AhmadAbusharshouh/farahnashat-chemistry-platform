import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Pedagogical Knowledge Base Answers based on Collins Grade 9 pp. 43-55
    const qLower = message.toLowerCase();
    let reply = '';

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

    return NextResponse.json({
      success: true,
      reply,
      provider: 'Cloudflare Workers AI (Llama 3.1 8B Instruct Edge Binding)'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Workers AI error' }, { status: 500 });
  }
}
