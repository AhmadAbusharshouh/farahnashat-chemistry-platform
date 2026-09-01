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

  // Cloudflare Workers AI with primary model: cf/zai-org/glm-5.3-flash and fallback model: cf/google/gemma-4-26b-a4b-it
  const cfToken = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;
  const cfAccount = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.CF_ACCOUNT_ID;

  if (cfToken && cfAccount) {
    const models = [
      'cf/zai-org/glm-5.3-flash',
      'cf/google/gemma-4-26b-a4b-it'
    ];

    for (const model of models) {
      try {
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
            return { reply: text.trim(), source: 'workers-ai', model };
          }
        }
      } catch (e) {
        // try next fallback model
      }
    }
  }

  // Default friendly fallback if AI connection is offline
  return {
    reply: lang === 'ar'
      ? `أهلاً وسهلاً بك في منصة كيمياء الأستاذة فرح نشأت! 🌸🧪\n\nتفضل بسؤالي عن أي مفهوم أو معادلة أو تجربة كيميائية وسأجيبك بكل سرور! ✨`
      : `Welcome to Teacher Farah Nashat Chemistry Platform! 🌸🧪\n\nFeel free to ask any chemistry question! ✨`,
    source: 'knowledge-base',
    model: 'cf/zai-org/glm-5.3-flash'
  };
}
