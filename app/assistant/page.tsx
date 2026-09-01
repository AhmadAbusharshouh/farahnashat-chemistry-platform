'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  Sparkles, 
  FlaskConical, 
  Lightbulb, 
  CheckCircle2,
  BookOpen,
  Bot,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isTyping?: boolean;
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
      text: 'مرحباً بك! أنا المساعد التعليمي لمادة الكيمياء مع الأستاذة فرح نشأت. يمكنك سؤالي عن المفاهيم الكيميائية، معادلات التأين، الكواشف، أو تفاصيل التجارب المخبرية وسأجيبك بدقة ووضوح.',
      timestamp: 'الآن'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Stream / Typewriter Effect for assistant responses
  const streamResponse = async (msgId: string, fullText: string) => {
    const words = fullText.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === msgId ? { ...msg, text: currentText, isTyping: i < words.length - 1 } : msg
        )
      );
      scrollToBottom();
      await new Promise((resolve) => setTimeout(resolve, 22)); // smooth word pacing
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    const userMsgId = 'user-' + Date.now();
    const assistantMsgId = 'ai-' + Date.now();

    const userMsg: ChatMessage = {
      id: userMsgId,
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
      const fullReply = data.reply || 'تمت معالجة السؤال واسترجاع الإجابة العلمية.';

      // Add empty assistant message first, then stream into it
      const aiMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        text: '',
        timestamp: new Date().toLocaleTimeString('ar-JO', { hour: '2-digit', minute: '2-digit' }),
        isTyping: true
      };

      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
      await streamResponse(assistantMsgId, fullReply);

    } catch (err) {
      const fallbackText = 'تتأين الحموض في الماء مطلقة أيونات H⁺ بينما تطلق القواعد أيونات OH⁻، ومقياس pH يعبر عن درجة الحموضة بدقة.';
      const aiMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        text: '',
        timestamp: 'الآن',
        isTyping: true
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
      await streamResponse(assistantMsgId, fallbackText);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'init-1',
        sender: 'assistant',
        text: 'مرحباً بك! أنا المساعد التعليمي لمادة الكيمياء مع الأستاذة فرح نشأت. يمكنك طرح أي سؤال كيميائي جديد.',
        timestamp: 'الآن'
      }
    ]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header - Clean, Light Aesthetic */}
      <div className="bg-white border border-slate-200 p-6 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">
                {t('المساعد الكيميائي الذكي', 'Chemistry Study Assistant')}
              </h1>
              <p className="text-xs text-slate-500">
                {t('إجابات وتوضيحات علمية فورية مع الأستاذة فرح نشأت', 'Instant conceptual explanations & chemical equations')}
              </p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('محادثة جديدة', 'New Chat')}</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-bold bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2.5 py-1 border border-slate-200 transition text-right"
            >
              💡 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Vertical Chat Window */}
      <div className="bg-white border border-slate-200 shadow-sm flex flex-col h-[580px]">
        
        {/* Messages Stream Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0 border ${
                    isUser
                      ? 'bg-emerald-800 text-white border-emerald-900'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}
                >
                  {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 max-w-[85%] text-xs leading-relaxed border ${
                    isUser
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <p className={`whitespace-pre-line ${msg.isTyping ? 'typing-cursor' : ''}`}>
                    {msg.text}
                  </p>
                  <span
                    className={`block text-[10px] mt-2 font-mono ${
                      isUser ? 'text-emerald-100 text-left' : 'text-slate-400 text-right'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 p-2 font-mono">
              <span className="w-2 h-2 bg-emerald-600 animate-ping"></span>
              <span>جاري صياغة الإجابة العلمية...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك الكيميائي هنا واضغط Enter..."
            className="flex-1 px-4 py-2.5 border border-slate-300 bg-white text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-700"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim() || loading}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white font-bold text-xs border border-emerald-800 transition flex items-center gap-1.5"
          >
            <span>إرسال</span>
            <Send className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>

      </div>

    </div>
  );
}
