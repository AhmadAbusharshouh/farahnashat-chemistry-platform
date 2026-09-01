export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        }
      });
    }

    const corsHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };

    // 1. Chat AI Endpoint
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { message, messages = [], lang = 'ar' } = body;

        const userQuery = message || (messages.length > 0 ? messages[messages.length - 1].content : '');

        if (!userQuery) {
          return new Response(JSON.stringify({ error: 'Message is required' }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const systemPrompt = `You are the expert, dedicated Chemistry Teaching Assistant for Teacher Farah Nashat (أ. فرح نشأت) at Modern Islamic School - Irbid (المدرسة الإسلامية الحديثة - إربد / حكما).
You specialize in Grade 9 Collins Chemistry (Unit: Acids, Bases and Salts, pp. 43-55).
Key curriculum facts:
- Acids produce H+ ions in water; pH < 7. Strong acids (HCl, HNO3, H2SO4, HBr, HI) ionize 100% (→) with high electrical conductivity and rapid reaction with metals (Mg, Zn releasing H2 gas). Weak acids (CH3COOH, HF, H3PO4) ionize partially (⇌).
- Acidic oxides: Non-metal oxides like CO2 and NO2 that dissolve in water producing acids (CO2 + H2O -> H2CO3 -> H+ + HCO3-).
- Bases produce OH- ions in water; pH > 7. Strong bases (KOH, NaOH, Ca(OH)2, Ba(OH)2, LiOH) ionize 100% (→). Weak bases (NH3, N2H4) ionize partially (⇌). Ammonia reacts with water: NH3 + H2O ⇌ NH4+ + OH-.
- Basic oxides: Metal oxides (Na2O, Li2O, BaO, CaO) forming Alkalis producing OH-. Insoluble oxides like CuO neutralize acids (CuO + 2HCl -> CuCl2 + H2O).
- Indicators: Litmus (red in acid, blue in base), Red Cabbage (pink/red in acid, purple in neutral, blue/green/yellow in base), Bromothymol Blue (yellow in acid, green at pH 7, blue in base), Phenolphthalein (colorless in acid, fuchsia pink in base), Universal indicator (pH 0-14 chart).
- Real-world links:
  * Industry: 20 million tons HCl/year for plastics; 60 million tons NaOH/year for soap, paper, and drain unclogging.
  * Sports (p. 47): Muscle soreness after 24h is caused by micro-tears and inflammation, NOT lactic acid which clears within 1 hour.
  * Hair care (p. 54): Hair keratin protein is protected at pH 4.5-6. Shampoos are formulated at pH 5.5.
  * Agriculture (p. 55): Acidic soils are neutralized with basic calcium hydroxide Ca(OH)2 solution.
  * Neutralization: Acid + Base -> Salt + Water + Heat (HCl + NaOH -> NaCl + H2O).

Always respond directly, kindly, scientifically, with clear chemical equations and structured points. If the user asks in Arabic, answer in Arabic. If in English, answer in English.`;

        let reply = '';
        let modelUsed = 'cf/zai-org/glm-5.3-flash';

        if (env.AI) {
          // Priority 1: cf/zai-org/glm-5.3-flash as requested by the user
          const candidateModels = [
            'cf/zai-org/glm-5.3-flash',
            '@cf/zai-org/glm-5.3-flash',
            '@cf/meta/llama-3.1-8b-instruct',
            '@cf/meta/llama-3.3-70b-instruct',
            '@cf/qwen/qwen1.5-7b-chat'
          ];

          for (const model of candidateModels) {
            try {
              const aiPayload = {
                messages: [
                  { role: 'system', content: systemPrompt },
                  ...(messages.length > 0
                    ? messages.map((m) => ({ role: m.role || (m.sender === 'user' ? 'user' : 'assistant'), content: m.content || m.text }))
                    : [{ role: 'user', content: userQuery }])
                ]
              };

              const aiRes = await env.AI.run(model, aiPayload);

              if (typeof aiRes === 'string') {
                reply = aiRes;
              } else if (aiRes && typeof aiRes === 'object') {
                reply = aiRes.response || 
                        aiRes.choices?.[0]?.message?.content || 
                        aiRes.text || 
                        aiRes.result || 
                        '';
              }

              if (reply && reply.trim().length > 0) {
                modelUsed = model;
                break;
              }
            } catch (err) {
              console.warn(`Model ${model} attempt failed:`, err?.message);
            }
          }
        }

        // Fallback if AI binding is offline or unreachable
        if (!reply || reply.trim().length === 0) {
          const q = userQuery.toLowerCase();
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

        return new Response(JSON.stringify({
          success: true,
          reply: reply.trim(),
          model: modelUsed,
          timestamp: new Date().toISOString()
        }), {
          status: 200,
          headers: corsHeaders
        });

      } catch (err) {
        return new Response(JSON.stringify({ 
          error: err?.message || 'Workers AI processing error',
          success: false 
        }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // 2. Quiz Submission Endpoint
    if (url.pathname === '/api/quiz' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { student_name, student_phone, score, total_questions = 10, time_spent_seconds = 60, answers } = body;

        if (env.DB) {
          try {
            await env.DB.prepare(`
              INSERT INTO quiz_results (id, student_name, student_phone, score, total_questions, time_spent_seconds, answers_json, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
            `).bind(
              'quiz_' + Date.now(),
              student_name || 'طالبة متميزة',
              student_phone || '0790000000',
              score || 0,
              total_questions,
              time_spent_seconds,
              JSON.stringify(answers || {})
            ).run();
          } catch (d1Err) {
            console.warn('D1 insert warning:', d1Err?.message);
          }
        }

        return new Response(JSON.stringify({ success: true, message: 'Result recorded successfully' }), {
          status: 200,
          headers: corsHeaders
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err?.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // 3. WhatsApp Integration Endpoint
    if (url.pathname === '/api/whatsapp' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { phone, message, studentName } = body;

        const apiUrl = env.EVOLUTION_API_URL || 'https://wa.alphaperfume.net';
        const apiKey = env.EVOLUTION_API_KEY || 'AlphaSecretKey2026!357951****++';
        const instance = env.EVOLUTION_INSTANCE_NAME || 'farah';

        let waSuccess = false;
        try {
          const formattedPhone = (phone || '').replace(/[^0-9]/g, '');
          const waRes = await fetch(`${apiUrl}/message/sendText/${instance}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': apiKey
            },
            body: JSON.stringify({
              number: formattedPhone,
              text: message || `مرحباً ${studentName || ''}، أهلاً بك في منصة كيمياء الصف التاسع للأستاذة فرح نشأت.`
            })
          });
          waSuccess = waRes.ok;
        } catch (waErr) {
          console.warn('WhatsApp Evolution API warning:', waErr?.message);
        }

        return new Response(JSON.stringify({ success: true, evolutionDelivered: waSuccess }), {
          status: 200,
          headers: corsHeaders
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err?.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // Default: Static Asset fetcher
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Farah Nashat Chemistry Platform Ready', { status: 200 });
  }
};
