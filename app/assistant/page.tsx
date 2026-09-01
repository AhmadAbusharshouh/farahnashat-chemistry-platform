'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  Sparkles, 
  FlaskConical, 
  Lightbulb, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SAMPLE_QUESTIONS = [
  'ما الفرق بين الحمض القوي والحمض الضعيف ودرجة تأينهما؟',
  'كيف يتغير لون مستخلص الملفوف الأحمر في الوسط الحمضي والقاعدي؟',
  'ما هو تفسير تفاعل التعادل كيميائياً؟',
  'لماذا يُعد أكسيد الليثيوم Li₂O قلوياً؟',
  'ما هي علاقة درجة حموضة الشامبو (pH 5.5) ببروتين كيراتين الشعر؟'
];

export default function AssistantPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'أهلاً وسهلاً بك! أنا المساعد التعليمي لمراجعة منهاج كيمياء الصف التاسع (كتاب كولينز ص 43 - 55). يمكنك سؤالي عن أي مفهوم في درس الحموض والقواعد، المعادلات الكيميائية، الكواشف، أو تفاصيل وخطة الحصة النموذجية.',
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
      const fallbackMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        text: 'أهلاً بك! تطلق الحموض أيونات H⁺ عند ذوبانها في الماء بينما تطلق القواعد أيونات OH⁻، ومقياس pH يعبر عن تركيزها بدقة.',
        timestamp: 'الآن'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
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
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {t('مراجعة المنهاج التفاعلية', 'Interactive Study Assistant')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
              {t('المساعد التعليمي لدرس الكيمياء', 'Chemistry Study & Concept Assistant')}
            </h1>
          </div>
          <div className="text-xs text-slate-600 font-bold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            {t('منهاج كولينز - الصف التاسع (ص 43 - 55)', 'Collins Grade 9 (pp. 43-55)')}
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
          {t(
            'اطرح أي استفسار علمي حول مفاهيم وتجارب درس الحموض والقواعد والكواشف، معادلات التأين، وتطبيقات المنهاج الحياتية والصناعية.',
            'Ask any question regarding acid-base concepts, ionization equations, indicators, or curriculum applications.'
          )}
        </p>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-slate-500 block px-1">أسئلة شائعة من المنهاج للمراجعة السريعة:</span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs font-bold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 px-3 py-2 rounded-xl border border-slate-200 transition text-right"
            >
              💡 {q}
            </button>
          ))}
        </div>
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
                      : 'bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
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
            <div className="flex items-center gap-2 text-xs text-slate-500 p-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>جاري استرجاع الإجابة من مفاهيم المنهاج...</span>
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
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim() || loading}
            className="p-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white font-bold rounded-xl transition shadow-xs"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </div>

      </div>

    </div>
  );
}
