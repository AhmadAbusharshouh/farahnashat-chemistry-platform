'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  FlaskConical, 
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SAMPLE_QUESTIONS = [
  'ما الفرق بين الحمض القوي والحمض الضعيف؟',
  'كيف يتغير لون مستخلص الملفوف الأحمر في الخل والصابون؟',
  'ما هو تفسير تفاعل التعادل كيميائياً؟',
  'كيف تم توزيع وقت الحصة النموذجية (10 دقائق)؟'
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'مرحباً بك! أنا المساعد الكيميائي الذكي لمنصة الأستاذة فرح نشأت، مدعوم بتقنيات Cloudflare Workers AI. كيف يمكنني مساعدتك في استكشاف منهاج كيمياء الصف التاسع أو تفاصيل الحصة النموذجية اليوم؟',
      timestamp: 'الآن'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('ar-JO', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: data.reply || 'عذراً، لم أتمكن من معالجة السؤال حالياً.',
        timestamp: new Date().toLocaleTimeString('ar-JO', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        text: 'أهلاً بك! تذكر أن الحموض تطلق أيونات H⁺ بينما تطلق القواعد أيونات OH⁻، ومقياس pH يعبر عن تركيزها بدقة.',
        timestamp: 'الآن'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cloudflare Workers AI (Llama 3.1)</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">
              المساعد الكيميائي الذكي (AI Chemistry Tutor)
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-bold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            مُدرب على منهاج كولينز للصف التاسع
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          اطرح أي سؤال حول التفاعلات، تأين الحموض والقواعد، كاشف الملفوف، أو تفاصيل وخطة الحصة النموذجية للمقابلة.
        </p>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="flex flex-wrap gap-2">
        {SAMPLE_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-xs font-bold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-3 py-2 rounded-xl border border-slate-200 transition text-right"
          >
            💡 {q}
          </button>
        ))}
      </div>

      {/* Chat Window Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col h-[520px]">
        
        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 pl-1">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isUser
                      ? 'bg-slate-800 text-white'
                      : 'bg-emerald-600 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-tl-none font-medium'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tr-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-2 font-mono ${
                      isUser ? 'text-slate-400 text-left' : 'text-slate-400 text-right'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <Bot className="w-4 h-4 animate-spin text-emerald-600" />
              <span>جاري صياغة الإجابة العلمية الدقيقة عبر Cloudflare AI...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك الكيميائي هنا..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim() || loading}
            className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white font-bold rounded-xl transition shadow-xs"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </div>

      </div>

    </div>
  );
}
