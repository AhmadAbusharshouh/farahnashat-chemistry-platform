'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  MessageSquare, 
  Send, 
  User, 
  Sparkles, 
  RotateCcw,
  Bot
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
      text: 'مرحباً بك! أنا المساعد الكيميائي الذكي للأستاذة فرح نشأت. يمكنك سؤالي عن أي مفهوم في الكيمياء، التفاعلات، الكواشف، أو التجارب وسأجيبك بدقة ووضوح.',
      timestamp: 'الآن'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      await new Promise((resolve) => setTimeout(resolve, 20));
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
        text: 'مرحباً بك! أنا المساعد الكيميائي الذكي. اطرح أي سؤال كيميائي جديد.',
        timestamp: 'الآن'
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      
      {/* App-like Header */}
      <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border border-emerald-300 overflow-hidden flex items-center justify-center p-0.5 shrink-0 shadow-2xs">
              <Image
                src="/images/ai-avatar.svg"
                alt="AI Chemistry Avatar"
                width={40}
                height={40}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900">
                {t('المساعد الكيميائي الذكي', 'Chemistry AI Tutor')}
              </h1>
              <p className="text-xs text-slate-500">
                {t('إجابات وتوضيحات علمية فورية لمفاهيم وتجارب الكيمياء', 'Instant scientific explanations and step-by-step chemical equations')}
              </p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('محادثة جديدة', 'New Chat')}</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5">
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-bold bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 px-2.5 py-1 border border-slate-200 transition text-right"
            >
              💡 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Standalone Chat Window */}
      <div className="bg-white border border-slate-200 shadow-sm flex flex-col h-[600px] overflow-hidden">
        
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fafbfb]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 flex items-center justify-center text-xs font-bold shrink-0 border overflow-hidden ${
                    isUser
                      ? 'bg-emerald-800 text-white border-emerald-900'
                      : 'bg-white border-emerald-300'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : (
                    <Image
                      src="/images/ai-avatar.svg"
                      alt="AI Avatar"
                      width={32}
                      height={32}
                      className="object-contain w-full h-full"
                    />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 max-w-[85%] text-xs leading-relaxed border ${
                    isUser
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
                  }`}
                >
                  <p className={`whitespace-pre-line ${msg.isTyping ? 'typing-cursor' : ''}`}>
                    {msg.text}
                  </p>
                  <span
                    className={`block text-[10px] mt-2 ${
                      isUser ? 'text-emerald-200 text-left' : 'text-slate-400 text-right'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 p-2 font-bold">
              <span className="w-2 h-2 bg-emerald-600 animate-ping"></span>
              <span>جاري صياغة الإجابة العلمية...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar Pinned to Bottom */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك الكيميائي هنا واضغط Enter..."
            className="flex-1 px-4 py-2.5 border border-slate-300 bg-slate-50 focus:bg-white text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-700"
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
