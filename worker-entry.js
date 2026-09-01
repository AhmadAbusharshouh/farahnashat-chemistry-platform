const SUB_MAP = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎'
};

const SUP_MAP = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
};

function toSubscript(str) {
  return str.split('').map(c => SUB_MAP[c] || c).join('');
}

function toSuperscript(str) {
  return str.split('').map(c => SUP_MAP[c] || c).join('');
}

function sanitizeChemistryText(rawText) {
  if (!rawText) return '';
  let text = rawText;

  // Convert LaTeX arrows & symbols
  text = text
    .replace(/\\rightleftharpoons|\\leftrightharpoons|\\leftrightarrow/g, ' ⇌ ')
    .replace(/\\rightarrow|\\to|\\longrightarrow/g, ' → ')
    .replace(/\\leftarrow|\\longleftarrow/g, ' ← ')
    .replace(/\\times/g, ' × ')
    .replace(/\\cdot/g, ' · ')
    .replace(/\\pm/g, ' ± ')
    .replace(/\\approx/g, ' ≈ ')
    .replace(/\\neq/g, ' ≠ ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\degree|\\circ/g, '°');

  // Strip LaTeX wrappers
  text = text
    .replace(/\\(?:text|mathrm|mathbf|ce|mathit)\{([^}]+)\}/g, '$1')
    .replace(/\\(?:text|mathrm|mathbf|ce|mathit)\s+/g, '');

  // Convert phase states
  text = text
    .replace(/_\{(aq)\}|_\(aq\)/gi, ' (aq)')
    .replace(/_\{(s)\}|_\(s\)/gi, ' (s)')
    .replace(/_\{(l)\}|_\(l\)/gi, ' (l)')
    .replace(/_\{(g)\}|_\(g\)/gi, ' (g)');

  // Convert Superscripts & Subscripts
  text = text.replace(/\^\{([^}]+)\}/g, (_, content) => toSuperscript(content));
  text = text.replace(/\^([0-9\+\-]+)/g, (_, content) => toSuperscript(content));
  text = text.replace(/_\{([^}]+)\}/g, (_, content) => toSubscript(content));
  text = text.replace(/_([0-9]+)/g, (_, content) => toSubscript(content));

  // Clean dollar signs and escapes
  text = text
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    .replace(/\\\[/g, '')
    .replace(/\\\]/g, '')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')');

  // Clean triple asterisks
  text = text
    .replace(/\*\*\*([^*]+)\*\*\*/g, '**$1**')
    .replace(/\*\*\*([^*]+)\*\*/g, '**$1**')
    .replace(/\*\*([^*]+)\*\*\*/g, '**$1**');

  text = text.replace(/\\/g, '');
  text = text.replace(/\s*→\s*/g, ' → ').replace(/\s*⇌\s*/g, ' ⇌ ');

  return text.trim();
}

function formatForWhatsApp(rawText) {
  let text = sanitizeChemistryText(rawText);
  text = text.replace(/^(?:#{1,6})\s*(.+)$/gm, '\n*$1*');
  text = text.replace(/\*\*([^*]+)\*\*/g, '*$1*');
  text = text.replace(/^(?:---+|\*\*\*+|___+)\s*$/gm, '───────────────');
  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

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
        const { 
          message, 
          messages = [], 
          lang = 'ar', 
          userName, 
          studentName, 
          whatsappName, 
          registeredName, 
          phoneNumber, 
          phone 
        } = body;

        const userQuery = message || (messages.length > 0 ? messages[messages.length - 1].content : '');

        if (!userQuery) {
          return new Response(JSON.stringify({ error: 'Message is required' }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const activeName = registeredName || userName || studentName || '';
        const isEnglish = /[a-zA-Z]/.test(userQuery) && !/[\u0600-\u06FF]/.test(userQuery);
        
        let systemPrompt = isEnglish
          ? `You are the friendly and smart AI Chemistry Tutor for Teacher Farah Nashat (Modern Islamic School - Irbid / Hakama, Jordanian Chemistry Curriculum).

🎯 Persona & Tone:
1. Warm, engaging, encouraging, and student-friendly (approachable and lively, not robotic or overly formal).
2. Use educational chemistry emojis (🧪, ⚗️, ✨, 💡, 🌿, 🌸) to make answers visually clear and engaging.
3. Welcome students positively and praise their scientific curiosity.

📋 Core Guidelines:
1. Provide accurate, clear, and structured answers (concise bullet points).
2. Write balanced chemical equations with state symbols and step-by-step clarity.
3. Connect chemical concepts to daily life, health, environment, and industry.
4. Support the complete Jordanian curriculum across all secondary and middle school chemistry levels.

🚫 Formatting Rules:
1. NEVER use LaTeX syntax, dollar signs ($ or $$), or commands like \\rightarrow, \\rightleftharpoons, \\text{}, _{2}, or ^{2+}.
2. ALWAYS use direct clean Unicode chemical symbols:
   - Arrows: → and ⇌
   - Subscripts: ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ (e.g. H₂O, CO₂, H₂SO₄, HNO₃, Ca(OH)₂)
   - Superscripts: ⁺ ⁻ ²⁺ ²⁻ ³⁺ ³⁻ (e.g. H⁺, OH⁻, Na⁺, Cl⁻, Ca²⁺, SO₄²⁻)
   - State symbols: (aq), (s), (l), (g)
3. Avoid Markdown header hashes (###) or triple asterisks (***). Use clean bullets (•) and clean bold text (**bold**).`
          : `أنت المساعد الكيميائي الذكي واللطيف للأستاذة فرح نشأت (معلمة الكيمياء في المدرسة الإسلامية الحديثة - إربد / حكما).
منهاج الكيمياء هو المنهاج الأردني هنا.

🎯 شخصيتك وأسلوبك في الحوار:
1. أسلوب ودود، لطيف ومشجع ومليء بالحيوية (مش رسمي بجمود، بل كمعلم ومساعد قريب من الطلاب ويشجعهم على حب الكيمياء والعلوم).
2. استخدم الإيموجي المناسبة واللطيفة مثل 🧪، ⚗️، ✨، 💡، 🌿، 🌸 لتزيين الشرح وتسهيل قراءته.
3. الترحيب بالطلاب بابتسامة وتشجيعهم دائماً (مثل: "يا هلا بك! سؤال كيميائي رائع 🧪"، "أهلاً ببطل الكيمياء ✨") مش شرط تلتزم بالأمثلة أبدًا، هي مجرد أمثلة.

📋 قواعد وتوجيهات الإجابة العلمية:
1. إجابات علمية دقيقة، واضحة ومباشرة مع تنظيمها في نقاط (Bullet Points) أنيقة وسهلة الفهم وملخصة بسيطة بشكل غير مخل.
2. كتابة المعادلات الكيميائية موزونة وبخطوات مبسطة مع توضيح الحالة الفيزيائية عند الحاجة.
3. ربط الكيمياء بالحياة اليومية، الصحة، الصناعة، البيئة والأردن (مثل كيراتين الشعر وpH الشامبو 5.5، حموضة التربة ومعالجتها، الرياضة وحقيقة اللاكتيك، المطر الحمضي، والصناعات الدوائية والغذائية) وهاي مجرد أمثلة لا أكثر.

🚫 ضوابط التنسيق الصارمة (Formatting Rules):
1. يُمنع منعاً باتاً استخدام صيغ LaTeX أو علامات الدولار ($ أو $$) أو أوامر السلاش مثل \\rightarrow أو \\rightleftharpoons أو \\text{} أو _{2} أو ^{2+}.
2. اكتب المعادلات الكيميائية برموز يونيكود مباشرة واضحة ومقروءة:
   - سهم التفاعل: →
   - سهم الاتزان: ⇌
   - الأرقام السفلية: ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ (مثل: H₂O, CO₂, H₂SO₄, HNO₃, Ca(OH)₂)
   - الشحنات العلوية: ⁺ ⁻ ²⁺ ²⁻ ³⁺ ³⁻ (مثل: H⁺, OH⁻, Na⁺, Cl⁻, Ca²⁺, SO₄²⁻)
   - الحالات الفيزيائية بين قوسين: (aq), (s), (l), (g)
3. لا تستخدم وسوم الهاش (###) بكثرة ولا النجوم الثلاثية (***). استعض عنها بنقاط مرتبة (•) وعناوين واضحة بخط عريض (**عنوان**).`;

        // Inject personalized user context
        if (activeName) {
          systemPrompt += isEnglish
            ? `\n\n👤 Student Info: Account Registered Name: "${activeName}". Address the student warmly and personally by name.`
            : `\n\n👤 معلومات الطالب المتحدث:\n- اسم الطالب المسجل في الحساب: "${activeName}"\n💡 توجيه: رحب بالطالب وخاطبه باسمه ("${activeName}") بلطف واهتمام في إجابتك.`;
        } else if (whatsappName) {
          systemPrompt += isEnglish
            ? `\n\n👤 User Info: WhatsApp Display Name: "${whatsappName}". Address the user warmly by name.`
            : `\n\n👤 معلومات المستخدم (عبر الواتساب):\n- اسم حسابه على الواتساب: "${whatsappName}"\n💡 توجيه: رحب به وخاطبه باسمه على الواتساب ("${whatsappName}") بلطف وتشجيع.`;
        }

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
          const greetingName = activeName || whatsappName || '';
          reply = isEnglish
            ? (greetingName ? `Welcome ${greetingName} to Teacher Farah Nashat Chemistry Platform! 🌸🧪 Feel free to ask any chemistry question! ✨` : 'Welcome to Teacher Farah Nashat Chemistry Platform! 🌸🧪 Feel free to ask any chemistry question! ✨')
            : (greetingName ? `أهلاً وسهلاً بك يا ${greetingName} في منصة كيمياء الأستاذة فرح نشأت! 🌸🧪 تفضل بسؤالي عن أي شيء في الكيمياء وسأجيبك فوراً! ✨` : 'أهلاً وسهلاً بك في منصة كيمياء الأستاذة فرح نشأت! 🌸🧪 تفضل بسؤالي عن أي شيء في الكيمياء وسأجيبك فوراً! ✨');
        }

        const cleanWebReply = sanitizeChemistryText(reply);

        return new Response(JSON.stringify({
          success: true,
          reply: cleanWebReply,
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

            // Link / register student into students table as well
            if (student_name && student_phone) {
              await env.DB.prepare(`
                INSERT INTO students (id, phone, name)
                VALUES (?, ?, ?)
                ON CONFLICT(phone) DO UPDATE SET name = excluded.name
              `).bind(
                'std_' + Date.now(),
                student_phone,
                student_name
              ).run();
            }
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

    // 3. WhatsApp Integration Endpoint (Send Message & Link Account)
    if (url.pathname === '/api/whatsapp' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { phone, message, studentName } = body;

        const apiUrl = env.EVOLUTION_API_URL || 'https://wa.alphaperfume.net';
        const apiKey = env.EVOLUTION_API_KEY || 'AlphaSecretKey2026!357951****++';
        const instance = env.EVOLUTION_INSTANCE_NAME || 'farah';

        const formattedPhone = (phone || '').replace(/[^0-9]/g, '');

        if (env.DB && studentName && formattedPhone) {
          try {
            await env.DB.prepare(`
              INSERT INTO students (id, phone, name)
              VALUES (?, ?, ?)
              ON CONFLICT(phone) DO UPDATE SET name = excluded.name
            `).bind(
              'std_' + Date.now(),
              formattedPhone,
              studentName
            ).run();
          } catch (stdErr) {
            console.warn('D1 student link warning:', stdErr?.message);
          }
        }

        let waSuccess = false;
        try {
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

    // 4. WhatsApp Webhook Endpoint
    if (url.pathname === '/api/whatsapp/webhook' && request.method === 'POST') {
      try {
        const payload = await request.json();
        const rawData = payload?.data || payload;
        const msgItem = Array.isArray(rawData) 
          ? rawData[0] 
          : (rawData?.messages && Array.isArray(rawData.messages) ? rawData.messages[0] : rawData);

        const messageKey = msgItem?.key || {};
        if (messageKey?.fromMe) {
          return new Response(JSON.stringify({ status: 'ignored', reason: 'fromMe is true' }), {
            status: 200,
            headers: corsHeaders
          });
        }

        const remoteJid = messageKey?.remoteJid || msgItem?.remoteJid || msgItem?.phone || msgItem?.number;
        if (!remoteJid || remoteJid.includes('status@broadcast') || remoteJid.includes('@newsletter')) {
          return new Response(JSON.stringify({ status: 'ignored', reason: 'Broadcast or no jid' }), {
            status: 200,
            headers: corsHeaders
          });
        }

        const whatsappName = (
          msgItem?.pushName ||
          rawData?.pushName ||
          payload?.pushName ||
          payload?.data?.pushName ||
          msgItem?.verifiedName ||
          payload?.senderName ||
          ''
        ).trim();

        const cleanPhone = remoteJid.replace(/@.*$/, '').replace(/\D/g, '');
        const localPhone = cleanPhone.startsWith('962') ? '0' + cleanPhone.slice(3) : cleanPhone;

        const messageObj = msgItem?.message || {};
        const incomingText = (
          messageObj?.conversation ||
          messageObj?.extendedTextMessage?.text ||
          messageObj?.imageMessage?.caption ||
          msgItem?.text ||
          payload?.text ||
          ''
        ).trim();

        if (!incomingText) {
          return new Response(JSON.stringify({ status: 'ignored', reason: 'Empty text' }), {
            status: 200,
            headers: corsHeaders
          });
        }

        // Check if student has registered / logged-in name linked in D1
        let registeredName = '';
        if (env.DB) {
          try {
            const studentRecord = await env.DB.prepare(`
              SELECT name FROM students WHERE phone = ? OR phone = ? LIMIT 1
            `).bind(cleanPhone, localPhone).first();

            if (studentRecord?.name) {
              registeredName = studentRecord.name;
            } else {
              const quizRecord = await env.DB.prepare(`
                SELECT student_name FROM quiz_results WHERE student_phone = ? OR student_phone = ? ORDER BY created_at DESC LIMIT 1
              `).bind(cleanPhone, localPhone).first();
              if (quizRecord?.student_name) {
                registeredName = quizRecord.student_name;
              }
            }
          } catch (dbErr) {
            console.warn('DB student lookup:', dbErr?.message);
          }
        }

        const isEnglish = /[a-zA-Z]/.test(incomingText) && !/[\u0600-\u06FF]/.test(incomingText);
        let systemPrompt = isEnglish
          ? `You are the friendly and smart AI Chemistry Tutor for Teacher Farah Nashat (Modern Islamic School - Irbid / Hakama, Jordanian Chemistry Curriculum).

🎯 Persona & Tone:
1. Warm, engaging, encouraging, and student-friendly (approachable and lively, not robotic or overly formal).
2. Use educational chemistry emojis (🧪, ⚗️, ✨, 💡, 🌿, 🌸) to make answers visually clear and engaging.
3. Welcome students positively and praise their scientific curiosity.

📋 Core Guidelines:
1. Provide accurate, clear, and structured answers (concise bullet points).
2. Write balanced chemical equations with state symbols and step-by-step clarity.
3. Connect chemical concepts to daily life, health, environment, and industry.
4. Support the complete Jordanian curriculum across all secondary and middle school chemistry levels.

🚫 Formatting Rules:
1. NEVER use LaTeX syntax, dollar signs ($ or $$), or commands like \\rightarrow, \\rightleftharpoons, \\text{}, _{2}, or ^{2+}.
2. ALWAYS use direct clean Unicode chemical symbols:
   - Arrows: → and ⇌
   - Subscripts: ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ (e.g. H₂O, CO₂, H₂SO₄, HNO₃, Ca(OH)₂)
   - Superscripts: ⁺ ⁻ ²⁺ ²⁻ ³⁺ ³⁻ (e.g. H⁺, OH⁻, Na⁺, Cl⁻, Ca²⁺, SO₄²⁻)
   - State symbols: (aq), (s), (l), (g)
3. Avoid Markdown header hashes (###) or triple asterisks (***). Use clean bullets (•) and clean bold text (**bold**).`
          : `أنت المساعد الكيميائي الذكي واللطيف للأستاذة فرح نشأت (معلمة الكيمياء في المدرسة الإسلامية الحديثة - إربد / حكما).
منهاج الكيمياء هو المنهاج الأردني هنا.

🎯 شخصيتك وأسلوبك في الحوار:
1. أسلوب ودود، لطيف ومشجع ومليء بالحيوية (مش رسمي بجمود، بل كمعلم ومساعد قريب من الطلاب ويشجعهم على حب الكيمياء والعلوم).
2. استخدم الإيموجي المناسبة واللطيفة مثل 🧪، ⚗️، ✨، 💡، 🌿، 🌸 لتزيين الشرح وتسهيل قراءته.
3. الترحيب بالطلاب بابتسامة وتشجيعهم دائماً (مثل: "يا هلا بك! سؤال كيميائي رائع 🧪"، "أهلاً ببطل الكيمياء ✨") مش شرط تلتزم بالأمثلة أبدًا، هي مجرد أمثلة.

📋 قواعد وتوجيهات الإجابة العلمية:
1. إجابات علمية دقيقة، واضحة ومباشرة مع تنظيمها في نقاط (Bullet Points) أنيقة وسهلة الفهم وملخصة بسيطة بشكل غير مخل.
2. كتابة المعادلات الكيميائية موزونة وبخطوات مبسطة مع توضيح الحالة الفيزيائية عند الحاجة.
3. ربط الكيمياء بالحياة اليومية، الصحة، الصناعة، البيئة والأردن (مثل كيراتين الشعر وpH الشامبو 5.5، حموضة التربة ومعالجتها، الرياضة وحقيقة اللاكتيك، المطر الحمضي، والصناعات الدوائية والغذائية) وهاي مجرد أمثلة لا أكثر.

🚫 ضوابط التنسيق الصارمة (Formatting Rules):
1. يُمنع منعاً باتاً استخدام صيغ LaTeX أو علامات الدولار ($ أو $$) أو أوامر السلاش مثل \\rightarrow أو \\rightleftharpoons أو \\text{} أو _{2} أو ^{2+}.
2. اكتب المعادلات الكيميائية برموز يونيكود مباشرة واضحة ومقروءة:
   - سهم التفاعل: →
   - سهم الاتزان: ⇌
   - الأرقام السفلية: ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ (مثل: H₂O, CO₂, H₂SO₄, HNO₃, Ca(OH)₂)
   - الشحنات العلوية: ⁺ ⁻ ²⁺ ²⁻ ³⁺ ³⁻ (مثل: H⁺, OH⁻, Na⁺, Cl⁻, Ca²⁺, SO₄²⁻)
   - الحالات الفيزيائية بين قوسين: (aq), (s), (l), (g)
3. لا تستخدم وسوم الهاش (###) بكثرة ولا النجوم الثلاثية (***). استعض عنها بنقاط مرتبة (•) وعناوين واضحة بخط عريض (**عنوان**).`;

        // Inject WhatsApp sender name & linked account registered name
        if (registeredName && whatsappName && registeredName !== whatsappName) {
          systemPrompt += isEnglish
            ? `\n\n👤 User Profile (via WhatsApp):
- Registered Account Name: "${registeredName}"
- WhatsApp Display Name: "${whatsappName}"
- Phone: ${localPhone}
💡 Directive: Warmly greet and address the student by their registered name ("${registeredName}").`
            : `\n\n👤 معلومات الطالب المتحدث (عبر الواتساب):
- الاسم المسجل في حسابه بالمنصة: "${registeredName}"
- اسم حسابه على الواتساب: "${whatsappName}"
- رقم الهاتف: ${localPhone}
💡 توجيه: رحب بالطالب وخاطبه باسمه المسجل ("${registeredName}") وكن ودوداً ومشجعاً له.`;
        } else if (registeredName) {
          systemPrompt += isEnglish
            ? `\n\n👤 User Profile: Registered Account Name: "${registeredName}". Address the student warmly by name.`
            : `\n\n👤 معلومات الطالب المتحدث:\n- اسم الطالب المسجل في حسابه بالمنصة: "${registeredName}"\n💡 توجيه: رحب بالطالب وخاطبه باسمه ("${registeredName}") بلطف واهتمام في إجابتك.`;
        } else if (whatsappName) {
          systemPrompt += isEnglish
            ? `\n\n👤 User Profile (via WhatsApp): WhatsApp Display Name: "${whatsappName}". Address the user warmly by name.`
            : `\n\n👤 معلومات المستخدم (عبر الواتساب):\n- اسم حسابه على الواتساب: "${whatsappName}"\n💡 توجيه: رحب به وخاطبه باسمه على الواتساب ("${whatsappName}") بلطف وتشجيع.`;
        }

        let reply = '';
        if (env.AI) {
          const candidateModels = [
            'cf/zai-org/glm-5.3-flash',
            'cf/google/gemma-4-26b-a4b-it'
          ];

          for (const model of candidateModels) {
            try {
              const aiRes = await env.AI.run(model, {
                messages: [
                  { role: 'system', content: systemPrompt },
                  { role: 'user', content: incomingText }
                ]
              });

              if (typeof aiRes === 'string') {
                reply = aiRes;
              } else if (aiRes && typeof aiRes === 'object') {
                reply = aiRes.response || aiRes.choices?.[0]?.message?.content || aiRes.text || '';
              }

              if (reply && reply.trim().length > 0) break;
            } catch (err) {
              console.warn('Webhook AI run err:', err?.message);
            }
          }
        }

        if (!reply || reply.trim().length === 0) {
          const greetingName = registeredName || whatsappName || '';
          reply = isEnglish
            ? (greetingName ? `Welcome ${greetingName} to Teacher Farah Nashat Chemistry Platform! 🌸🧪 Feel free to ask any chemistry question! ✨` : 'Welcome to Teacher Farah Nashat Chemistry Platform! 🌸🧪 Feel free to ask any chemistry question! ✨')
            : (greetingName ? `أهلاً وسهلاً بك يا ${greetingName} في منصة كيمياء الأستاذة فرح نشأت! 🌸🧪 تفضل بسؤالي عن أي شيء في الكيمياء وسأجيبك فوراً! ✨` : 'أهلاً وسهلاً بك في منصة كيمياء الأستاذة فرح نشأت! 🌸🧪 تفضل بسؤالي عن أي شيء في الكيمياء وسأجيبك فوراً! ✨');
        }

        const cleanWhatsAppReply = formatForWhatsApp(reply);

        const formattedReply = `✨ *المساعد الكيميائي الذكي (أ. فرح نشأت)*\n` +
          `━━━━━━━━━━━━━━━\n\n` +
          `${cleanWhatsAppReply}\n\n` +
          `━━━━━━━━━━━━━━━\n` +
          `🧪 *منصة كيمياء أ. فرح نشأت*\n` +
          `🔗 https://farahnashat.com`;

        const apiUrl = env.EVOLUTION_API_URL || 'https://wa.alphaperfume.net';
        const apiKey = env.EVOLUTION_API_KEY || 'AlphaSecretKey2026!357951****++';
        const instance = env.EVOLUTION_INSTANCE_NAME || 'farah';

        try {
          await fetch(`${apiUrl}/message/sendText/${instance}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': apiKey },
            body: JSON.stringify({ number: cleanPhone, text: formattedReply })
          });
        } catch (postErr) {
          console.warn('Webhook send reply err:', postErr?.message);
        }

        return new Response(JSON.stringify({
          status: 'success',
          recipient: remoteJid,
          whatsappName,
          registeredName
        }), {
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
