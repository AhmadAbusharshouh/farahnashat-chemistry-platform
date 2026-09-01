// Comprehensive Chemistry AI Engine with Cloudflare Workers AI (cf/zai-org/glm-5.3-flash) & Jordanian Chemistry Curriculum

export interface AIResponse {
  reply: string;
  source: 'workers-ai' | 'openai' | 'knowledge-base';
  model?: string;
}

export const CURRENT_HARNESS_AR = `أنت المساعد الكيميائي الذكي واللطيف للأستاذة فرح نشأت (معلمة الكيمياء في المدرسة الإسلامية الحديثة - إربد / حكما).
منهاج الكيمياء هو المنهاج الأردني هنا.

🎯 شخصيتك وأسلوبك في الحوار:
1. أسلوب ودود، لطيف ومشجع ومليء بالحيوية (مش رسمي بجمود، بل كمعلم ومساعد قريب من الطلاب ويشجعهم على حب الكيمياء والعلوم).
2. استخدم الإيموجي المناسبة واللطيفة مثل 🧪، ⚗️، ✨، 💡، 🌿، 🌸 لتزيين الشرح وتسهيل قراءته.
3. الترحيب بالطلاب بابتسامة وتشجيعهم دائماً (مثل: "يا هلا بك! سؤال كيميائي رائع 🧪"، "أهلاً ببطل الكيمياء ✨") مش شرط تلتزم بالأمثلة أبدًا، هي مجرد أمثلة.

📋 قواعد وتوجيهات الإجابة العلمية:
1. إجابات علمية دقيقة، واضحة ومباشرة مع تنظيمها في نقاط (Bullet Points) أنيقة وسهلة الفهم وملخصة بسيطة بشكل غير مخل.
2. كتابة المعادلات الكيميائية موزونة وبخطوات مبسطة مع توضيح الحالة الفيزيائية عند الحاجة.
3. ربط الكيمياء بالحياة اليومية، الصحة، الصناعة، البيئة والأردن (مثل كيراتين الشعر وpH الشامبو 5.5، حموضة التربة ومعالجتها، الرياضة وحقيقة اللاكتيك، المطر الحمضي، والصناعات الدوائية والغذائية) وهاي مجرد أمثلة لا أكثر.`;

export const CURRENT_HARNESS_EN = `You are the friendly and smart AI Chemistry Tutor for Teacher Farah Nashat (Modern Islamic School - Irbid / Hakama, Jordanian Chemistry Curriculum).

🎯 Persona & Tone:
1. Warm, engaging, encouraging, and student-friendly (approachable and lively, not robotic or overly formal).
2. Use educational chemistry emojis (🧪, ⚗️, ✨, 💡, 🌿, 🌸) to make answers visually clear and engaging.
3. Welcome students positively and praise their scientific curiosity.

📋 Core Guidelines:
1. Provide accurate, clear, and structured answers (concise bullet points).
2. Write balanced chemical equations with state symbols and step-by-step clarity.
3. Connect chemical concepts to daily life, health, environment, and industry.
4. Support the complete Jordanian curriculum across all secondary and middle school chemistry levels.`;

export async function generateChemistryAnswer(userQuery: string, lang: 'ar' | 'en' = 'ar'): Promise<AIResponse> {
  const cleanQuery = userQuery.trim();
  if (!cleanQuery) {
    return {
      reply: lang === 'ar' ? 'يا هلا بك! يرجى كتابة سؤالك الكيميائي لنتعلمه معاً 🧪✨' : 'Welcome! Please type your chemistry question 🧪✨',
      source: 'knowledge-base',
      model: 'cf/zai-org/glm-5.3-flash'
    };
  }

  // 1. Try Cloudflare Workers AI with model: cf/zai-org/glm-5.3-flash
  const cfToken = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;
  const cfAccount = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CF_ACCOUNT_ID;

  if (cfToken && cfAccount) {
    try {
      const model = 'cf/zai-org/glm-5.3-flash';
      const cfRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccount}/ai/run/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cfToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: lang === 'ar' ? CURRENT_HARNESS_AR : CURRENT_HARNESS_EN },
            { role: 'user', content: cleanQuery }
          ],
          max_tokens: 500,
          temperature: 0.4
        })
      });

      if (cfRes.ok) {
        const cfData = await cfRes.json();
        const text = cfData?.result?.response;
        if (text) {
          return { reply: text.trim(), source: 'workers-ai', model: 'cf/zai-org/glm-5.3-flash' };
        }
      }
    } catch (e) {
      // fallback to enriched comprehensive knowledge base
    }
  }

  // 2. Curated Enriched Jordanian Chemistry Knowledge Base (Friendly, Clear, Educational)
  const q = cleanQuery.toLowerCase();
  let reply = '';

  if (lang === 'en') {
    if (q.includes('oxide') || q.includes('co2') || q.includes('li2o')) {
      reply = `🧪 **Hello! Here is a friendly summary of Chemical Oxides:**\n\n• **Acidic Oxides (Non-metals):** Like CO₂ and NO₂. When dissolved in water, they form acids and release H⁺ ions:\n  CO₂ (g) + H₂O (l) → H₂CO₃ (aq) → H⁺ (aq) + HCO₃⁻ (aq)\n\n• **Basic Oxides (Metals):** Like Li₂O and Na₂O. When dissolved, they form **Alkalis** releasing OH⁻ ions:\n  Li₂O (s) + H₂O (l) → 2LiOH (aq) → 2Li⁺ (aq) + 2OH⁻ (aq)\n\n💡 *Teacher Tip:* Insoluble basic oxides like CuO neutralize acids to make copper salt and water! ✨`;
    } else if (q.includes('sport') || q.includes('muscle') || q.includes('lactic')) {
      reply = `🏃 **Sports & Chemistry - The Lactic Acid Truth:**\n\n• That muscle soreness you feel 24 hours after intense workouts is caused by **microscopic muscle fiber tears and natural inflammation**, NOT lactic acid!\n• Lactic acid is actually metabolized and cleared within ~1 hour post-exercise. 💡✨`;
    } else if (q.includes('hair') || q.includes('shampoo') || q.includes('keratin')) {
      reply = `✨ **Hair Health & pH Balance:**\n\n• Human hair consists of the protein **keratin**, which thrives in a slightly acidic medium (pH 4.5 – 6.0).\n• Shampoos are formulated at **pH ≈ 5.5** to seal the hair cuticle and keep hair glossy and healthy! 🌸`;
    } else if (q.includes('soil') || q.includes('agriculture') || q.includes('plant') || q.includes('lime')) {
      reply = `🌱 **Agriculture & Soil Treatment:**\n\n• Plants need a balanced soil pH for optimal nutrient intake.\n• If soil is overly acidic, farmers neutralize it by adding slaked lime **Ca(OH)₂**:\n  2H⁺ (Soil Acid) + Ca(OH)₂ (aq) → Ca²⁺ (aq) + 2H₂O (l) ✨`;
    } else if (q.includes('strength') || q.includes('strong') || q.includes('weak') || q.includes('ioniz')) {
      reply = `⚡ **Acid and Base Strength Simplified:**\n\n• **Strong Acid (e.g. HCl):** 100% ionized (→). Lots of free ions = high conductivity & bright lamp! 💡\n• **Weak Acid (e.g. CH₃COOH / Vinegar):** Partially ionized (⇌). Few ions = dim light.\n• **Strong Base:** NaOH, KOH (→).\n• **Weak Base:** Ammonia NH₃ (⇌).`;
    } else if (q.includes('indicator') || q.includes('litmus') || q.includes('cabbage') || q.includes('phenolphthalein')) {
      reply = `🎨 **Chemical Indicators Color Spectrum:**\n\n• **Litmus Paper:** Red in Acid | Blue in Base.\n• **Phenolphthalein:** Colorless in Acid | Fuchsia Pink in Base (pH > 8.2).\n• **Bromothymol Blue:** Yellow in Acid | Green at Neutral (pH 7) | Blue in Base.\n• **Red Cabbage (Natural):** Pink/Red in Acid | Violet in Neutral | Blue/Green/Yellow in Base! 🌿`;
    } else if (q.includes('neutralization') || q.includes('titration') || q.includes('salt')) {
      reply = `⚖️ **Neutralization Reaction:**\n\n• Acid + Base → Salt + Water + Heat 🔥\n• HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l)\n• H⁺ from acid combines with OH⁻ from base to create neutral water (pH = 7). ✨`;
    } else {
      reply = `🧪 **Hello and welcome!**\n\nI am Ms. Farah Nashat's Smart AI Assistant at Modern Islamic School (Irbid / Hakama).\n\n• Feel free to ask about any chemistry concept, reaction, equation, or lab experiment across the Jordanian curriculum! ✨`;
    }
  } else {
    // Arabic Enriched Friendly Responses
    if (q.includes('أكسيد') || q.includes('اكسيد') || q.includes('oxide') || q.includes('co2') || q.includes('li2o')) {
      reply = `يا هلا بك! 🧪 إليك ملخص لطيف وشامل لموضوع *الأكاسيد في الكيمياء*:

• *الأكاسيد الحمضية (Acidic Oxides):* أكاسيد لافلزات (مثل غاز CO₂ و NO₂)، تذوب في الماء لتنتج محاليل حمضية تطلق أيونات الهيدروجين H⁺:
  CO₂ (g) + H₂O (l) → H₂CO₃ (aq) → H⁺ (aq) + HCO₃⁻ (aq)

• *الأكاسيد القاعدية (Basic Oxides):* أكاسيد فلزات (مثل Li₂O و Na₂O)، الذائب منها يُسمى *قلويات (Alkalis)* وتطلق أيونات الهيدروكسيد OH⁻:
  Li₂O (s) + H₂O (l) → 2LiOH (aq) → 2Li⁺ (aq) + 2OH⁻ (aq)

💡 *معلومة مميزة:* الأكاسيد غير الذائبة مثل أكسيد النحاس CuO تتعادل مع الحموض لتكوين ملح النحاس والماء! ✨`;
    } else if (q.includes('رياضة') || q.includes('عضل') || q.includes('لاكتيك') || q.includes('muscle')) {
      reply = `أهلاً ببطل الكيمياء والرياضة! 🏃‍♂️✨

• يُعتقد شائعاً أن حمض اللاكتيك هو سبب ألم العضلات بعد يوم كامل من التمارين، لكن العلم الحديث أثبت أن سبب الألم الحقيقي هو *تمزقات مجهرية دقيقة في ألياف العضلات والتهابها*!
• أما حمض اللاكتيك نفسه، فيتخلص منه الجسم تماماً خلال حوالي ساعة واحدة فقط من انتهاء التمرين. 💡🌸`;
    } else if (q.includes('شعر') || q.includes('شامبو') || q.includes('كيراتين') || q.includes('hair')) {
      reply = `يا هلا! سؤال كيميائي رائع من واقع حياتنا اليومية 🌸✨

• شعر الإنسان يتكون أساساً من بروتين اسمه *الكيراتين*، وأفضل بيئة لحمايته من التقصف والتلف هي الوسط الحمضي الخفيف (pH بين 4.5 و 6.0).
• لذلك، يحرص صانعو الشامبو على ضبط درجة الحموضة عند *pH ≈ 5.5* للحفاظ على طبقة الكيوتيكل وحيوية ولمعان الشعر! 💆‍♀️🧪`;
    } else if (q.includes('تربة') || q.includes('زراع') || q.includes('جير') || q.includes('soil')) {
      reply = `أهلاً بك! الكيمياء والزراعة في خدمة الطبيعة 🌿✨

• تحتاج جذور النباتات لدرجة حموضة معتدلة لامتصاص العناصر الغذائية من التربة.
• إذا كانت التربة حامضية زيادة عن اللزوم، يقوم المزارعون بمعادلتها بإضافة *الجير المطفأ Ca(OH)₂*:
  2H⁺ (حمض التربة) + Ca(OH)₂ (aq) → Ca²⁺ (aq) + 2H₂O (l)
وهيك بتصير التربة مثالية لنمو المحاصيل وإنتاج وفير! 🌾💡`;
    } else if (q.includes('قوة') || q.includes('قوي') || q.includes('ضعيف') || q.includes('تأين') || q.includes('مصباح')) {
      reply = `مرحباً! تعال نبسط فكرة *قوة الحموض والقواعد والتأين* بكل سهولة ⚡💡

• *الحمض القوي (مثل HCl):* يتأين 100% بالماء (سهم باتجاه واحد →). محلوله مليان أيونات حرة، فبيوصل كهرباء بقوة والمصباح بيضوي ساطع جداً! 💡
• *الحمض الضعيف (مثل حمض الخل CH₃COOH):* يتأين جزئياً (سهمان متعاكسان ⇌). أيوناته قليلة، فبيكون ضوء المصباح خافت.
• *القواعد القوية:* مثل هيدروكسيد الصوديوم NaOH وهيدروكسيد البوتاسيوم KOH (تأين كلي →).
• *القواعد الضعيفة:* مثل غاز الأمونيا NH₃ (تأين جزئي ⇌). ✨`;
    } else if (q.includes('كاشف') || q.includes('تباع') || q.includes('ملفوف') || q.includes('بروموثيمول') || q.includes('فينولفثالين')) {
      reply = `أهلاً بك! عالم الكواشف وتدرج الألوان هو من أمتع أسرار الكيمياء 🎨✨

• *ورق تباع الشمس:* أحمر في الحمض 🔴 | أزرق في القاعدة 🔵.
• *الفينولفثالين:* عديم اللون في الحمض والمتعادل ⚪ | زهري فاقع في القاعدة (pH > 8.2) 🌸.
• *أزرق البروموثيمول:* أصفر في الحمض 🟡 | أخضر عشبي عند التعادل 🟢 | أزرق في القاعدة 🔵.
• *مستخلص الملفوف الأحمر الطبيعي:* وردي/أحمر في الحمض 🌺 | بنفسجي عند التعادل 🟣 | أزرق ثم أخضر ثم أصفر في القواعد! 🌈`;
    } else if (q.includes('تعادل') || q.includes('معايرة') || q.includes('neutralization')) {
      reply = `يا هلا! *تفاعل التعادل والمعايرة* ببساطة ووضوح ⚖️✨

• هو تفاعل جميل بين حمض وقاعدة بينتج ملح وماء وبتنطلق حرارة دافئة 🔥:
  حمض + قاعدة → ملح + ماء + طاقة حرارية
  HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l)
• أيونات الهيدروجين H⁺ من الحمض تتحد بحب مع أيونات الهيدروكسيد OH⁻ من القاعدة لتكوين جزيء الماء المتعادل تماماً (pH = 7) 🧪💧`;
    } else {
      reply = `أهلاً وسهلاً بك في منصة كيمياء الأستاذة فرح نشأت! 🌸🧪
(المدرسة الإسلامية الحديثة - إربد / حكما | المنهاج الأردني)

أنا مساعدك الكيميائي الذكي واللطيف، جاهز لأشرح لك أي مفهوم، تفاعل، معادلة أو تجربة كيميائية بأسلوب ممتع ومبسط!

💡 تفضل بسؤالي عن أي شيء في الكيمياء وسأجيبك فوراً! ✨`;
    }
  }

  return {
    reply: reply.trim(),
    source: 'knowledge-base',
    model: 'cf/zai-org/glm-5.3-flash'
  };
}
