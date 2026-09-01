'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  MessageSquare, 
  Send, 
  User, 
  X, 
  Sparkles, 
  RotateCcw, 
  Maximize2,
  Minimize2,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isTyping?: boolean;
}

const QUICK_PROMPTS = [
  'ما الفرق بين الحمض القوي والحمض الضعيف؟',
  'كيف يتغير لون مستخلص الملفوف الأحمر؟',
  'لماذا يُعد غاز CO₂ أكسيداً حمضياً؟',
  'ما علاقة درجة حموضة الشامبو بكيراتين الشعر؟'
];

export function AIAssistantWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'أهلاً بك! أنا المساعد الكيميائي الذكي للأستاذة فرح نشأت. كيف يمكنني مساعدتك في استكشاف المفاهيم أو المعادلات الكيميائية؟',
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
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

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
      const reply = data.reply || 'تمت معالجة السؤال الكيميائي بنجاح.';

      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          sender: 'assistant',
          text: '',
          timestamp: new Date().toLocaleTimeString('ar-JO', { hour: '2-digit', minute: '2-digit' }),
          isTyping: true
        }
      ]);
      setLoading(false);
      await streamResponse(assistantMsgId, reply);
    } catch (err) {
      const fallbackText = 'تتأين الحموض في الماء مطلقة أيونات H⁺ بينما تطلق القواعد أيونات OH⁻، ومقياس pH يحدد درجة الحموضة بدقة.';
      setMessages((prev) => [
        ...prev,
        { id: assistantMsgId, sender: 'assistant', text: '', timestamp: 'الآن', isTyping: true }
      ]);
      setLoading(false);
      await streamResponse(assistantMsgId, fallbackText);
    }
  };

  return (
    <>
      {/* FLOATING ACTION LAUNCHER BUTTON */}
      {!isOpen && (
        <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 bg-white hover:bg-emerald-50 border-2 border-emerald-600 p-2 sm:p-2.5 shadow-xl transition-all hover:scale-105"
            title="المساعد الكيميائي الذكي"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-emerald-100 border border-emerald-300 overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src="/images/ai-avatar.svg"
                alt="AI Chemistry Avatar"
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            </div>

            <div className="hidden sm:block text-right pr-1">
              <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <span>المساعد الذكي</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-[10px] text-emerald-800 font-bold">اسأل عن الكيمياء</div>
            </div>
          </button>
        </div>
      )}

      {/* CHAT MODAL / FULLSCREEN ON MOBILE */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:left-6 z-50 flex items-end sm:items-center justify-center">
          <div className="w-full h-full sm:h-[580px] sm:w-[420px] bg-white border-2 border-emerald-700 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Widget Top Header */}
            <div className="bg-emerald-800 text-white p-3.5 flex items-center justify-between border-b border-emerald-900 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-white border border-emerald-300 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                  <Image
                    src="/images/ai-avatar.svg"
                    alt="AI Avatar"
                    width={36}
                    height={36}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-black">المساعد الكيميائي الذكي</h3>
                  <p className="text-[10px] text-emerald-200">منصة كيمياء أ. فرح نشأت</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([{
                    id: 'init-1',
                    sender: 'assistant',
                    text: 'مرحباً بك! أنا المساعد الكيميائي الذكي. اطرح أي سؤال كيميائي جديد.',
                    timestamp: 'الآن'
                  }])}
                  className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700 border border-emerald-700"
                  title="محادثة جديدة"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700 border border-emerald-700"
                  title="إغلاق"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-1.5 overflow-x-auto whitespace-nowrap shrink-0">
              {QUICK_PROMPTS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="text-[10px] font-bold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 px-2 py-1 border border-slate-200 shrink-0"
                >
                  💡 {q}
                </button>
              ))}
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafbfb]">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold shrink-0 border ${
                        isUser
                          ? 'bg-emerald-800 text-white border-emerald-900'
                          : 'bg-white text-emerald-800 border-emerald-300'
                      }`}
                    >
                      {isUser ? <User className="w-3 h-3" /> : (
                        <Image
                          src="/images/ai-avatar.svg"
                          alt="Bot"
                          width={24}
                          height={24}
                          className="object-contain w-full h-full"
                        />
                      )}
                    </div>

                    <div
                      className={`p-3 max-w-[85%] text-xs leading-relaxed border ${
                        isUser
                          ? 'bg-emerald-700 text-white border-emerald-800'
                          : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
                      }`}
                    >
                      <p className={`whitespace-pre-line ${msg.isTyping ? 'typing-cursor' : ''}`}>
                        {msg.text}
                      </p>
                      <span
                        className={`block text-[9px] mt-1.5 ${
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
                <div className="flex items-center gap-2 text-xs text-slate-500 p-1 font-bold">
                  <span className="w-2 h-2 bg-emerald-600 animate-ping"></span>
                  <span>جاري صياغة الإجابة العلمية...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Fixed Chat Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اكتب سؤالك الكيميائي هنا..."
                className="flex-1 px-3 py-2 border border-slate-300 bg-slate-50 focus:bg-white text-xs outline-none focus:border-emerald-700"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputVal.trim() || loading}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white font-bold text-xs border border-emerald-800 transition flex items-center gap-1"
              >
                <span>إرسال</span>
                <Send className="w-3 h-3 rotate-180" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
