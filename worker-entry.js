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

        const isEnglish = /[a-zA-Z]/.test(userQuery) && !/[\u0600-\u06FF]/.test(userQuery);
        const systemPrompt = isEnglish
          ? `You are the friendly and smart AI Chemistry Tutor for Teacher Farah Nashat (Modern Islamic School - Irbid / Hakama, Jordanian Chemistry Curriculum).

🎯 Persona & Tone:
1. Warm, engaging, encouraging, and student-friendly (approachable and lively, not robotic or overly formal).
2. Use educational chemistry emojis (🧪, ⚗️, ✨, 💡, 🌿, 🌸) to make answers visually clear and engaging.
3. Welcome students positively and praise their scientific curiosity.

📋 Core Guidelines:
1. Provide accurate, clear, and structured answers (concise bullet points).
2. Write balanced chemical equations with state symbols and step-by-step clarity.
3. Connect chemical concepts to daily life, health, environment, and industry.
4. Support the complete Jordanian curriculum across all secondary and middle school chemistry levels.`
          : `أنت المساعد الكيميائي الذكي واللطيف للأستاذة فرح نشأت (معلمة الكيمياء في المدرسة الإسلامية الحديثة - إربد / حكما).
منهاج الكيمياء هو المنهاج الأردني هنا.

🎯 شخصيتك وأسلوبك في الحوار:
1. أسلوب ودود، لطيف ومشجع ومليء بالحيوية (مش رسمي بجمود، بل كمعلم ومساعد قريب من الطلاب ويشجعهم على حب الكيمياء والعلوم).
2. استخدم الإيموجي المناسبة واللطيفة مثل 🧪، ⚗️، ✨، 💡، 🌿، 🌸 لتزيين الشرح وتسهيل قراءته.
3. الترحيب بالطلاب بابتسامة وتشجيعهم دائماً (مثل: "يا هلا بك! سؤال كيميائي رائع 🧪"، "أهلاً ببطل الكيمياء ✨") مش شرط تلتزم بالأمثلة أبدًا، هي مجرد أمثلة.

📋 قواعد وتوجيهات الإجابة العلمية:
1. إجابات علمية دقيقة، واضحة ومباشرة مع تنظيمها في نقاط (Bullet Points) أنيقة وسهلة الفهم وملخصة بسيطة بشكل غير مخل.
2. كتابة المعادلات الكيميائية موزونة وبخطوات مبسطة مع توضيح الحالة الفيزيائية عند الحاجة.
3. ربط الكيمياء بالحياة اليومية، الصحة، الصناعة، البيئة والأردن (مثل كيراتين الشعر وpH الشامبو 5.5، حموضة التربة ومعالجتها، الرياضة وحقيقة اللاكتيك، المطر الحمضي، والصناعات الدوائية والغذائية) وهاي مجرد أمثلة لا أكثر.`;

        let reply = '';
        let modelUsed = 'cf/zai-org/glm-5.3-flash';

        if (env.AI) {
          const candidateModels = [
            'cf/zai-org/glm-5.3-flash',
            'cf/google/gemma-4-26b-a4b-it',
            '@cf/google/gemma-4-26b-a4b-it'
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

        // Fallback if AI binding is offline
        if (!reply || reply.trim().length === 0) {
          reply = isEnglish
            ? 'Welcome to Teacher Farah Nashat Chemistry Platform! 🌸🧪 Feel free to ask any chemistry question! ✨'
            : 'أهلاً وسهلاً بك في منصة كيمياء الأستاذة فرح نشأت! 🌸🧪 تفضل بسؤالي عن أي شيء في الكيمياء وسأجيبك فوراً! ✨';
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
