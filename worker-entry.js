export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API Routes handler for Cloudflare Workers
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const { message, lang = 'ar' } = await request.json();
        
        let responseText = '';
        if (env.AI) {
          try {
            const aiResponse = await env.AI.run('@cf/google/gemma-7b-it', {
              messages: [
                { role: 'system', content: 'You are an expert Arabic chemistry tutor for Grade 9 Collins curriculum.' },
                { role: 'user', content: message }
              ]
            });
            responseText = aiResponse.response;
          } catch (e) {
            // fallback
          }
        }

        if (!responseText) {
          responseText = lang === 'en' 
            ? 'Acids produce H⁺ ions in aqueous solutions (pH < 7), while bases produce OH⁻ ions (pH > 7). Neutralization produces salt and water.'
            : 'الحموض تنتج أيونات الهيدروجين H⁺ في الماء وقيمة pH لها أقل من 7، بينما القواعد تنتج أيونات الهيدروكسيد OH⁻ وقيمة pH لها أكبر من 7. تفاعل التعادل ينتج ملحاً وماء.';
        }

        return new Response(JSON.stringify({ success: true, reply: responseText }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // Default asset fetcher (Static Asset binding)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Chemistry Platform Worker Active', { status: 200 });
  }
};
