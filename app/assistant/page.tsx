'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  User, 
  Sparkles, 
  RotateCcw,
  Bot,
  Copy,
  Check,
  FlaskConical,
  Atom,
  Lightbulb,
  Zap,
  ArrowDown
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { FormattedChemistryMessage } from '@/lib/format-chemistry';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isTyping?: boolean;
}

const STARTER_CATEGORIES = [
  {
    icon: FlaskConical,
    titleAr: 'الحموض والقواعد والتأين',
    titleEn: 'Acids, Bases & Ionization',
    promptAr: 'ما الفرق بين الحمض القوي والحمض الضعيف ودرجة تأينهما في الماء؟',
    promptEn: 'What is the difference between strong and weak acids and their degree of ionization?'
  },
  {
    icon: Atom,
    titleAr: 'الرقم الهيدروجيني pH',
    titleEn: 'pH Scale & Calculations',
    promptAr: 'كيف نحسب الرقم الهيدروجيني pH لمحلول حمض قوي مقابل قاعدة قوية؟',
    promptEn: 'How do we calculate the pH for a strong acid versus a strong base solution?'
  },
  {
    icon: Lightbulb,
    titleAr: 'الكواشف وتغير الألوان',
    titleEn: 'Indicators & Color Changes',
    promptAr: 'كيف يتغير لون مستخلص الملفوف الأحمر والفينولفثالين في الوسط الحمضي والقاعدي؟',
    promptEn: 'How do red cabbage extract and phenolphthalein change color in acidic and basic media?'
  },
  {
    icon: Zap,
    titleAr: 'تطبيقات الحياة اليومية',
    titleEn: 'Real-world Applications',
    promptAr: 'ما هي علاقة درجة حموضة الشامبو (pH 5.5) بكيراتين الشعر ومعالجة التربة؟',
    promptEn: 'How does shampoo pH (5.5) relate to hair keratin and soil neutralization?'
  }
];

const CHEMICAL_SHORTCUTS = [
  'H⁺', 'OH⁻', 'H₃O⁺', 'pH', '→', '⇌', 'HCl', 'NaOH', 'H₂SO₄', 'Ca(OH)₂', 'H₂O', 'CO₂'
];

export default function AssistantPage() {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom(messages.length <= 2 ? 'auto' : 'smooth');
  }, [messages]);

  // Track scroll position to show/hide scroll-to-bottom button
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    setShowScrollBottom(distanceToBottom > 150);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
      await new Promise((resolve) => setTimeout(resolve, 18));
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    // Dismiss virtual mobile keyboard to ensure optimal UX on iOS & Android
    if (textareaRef.current) {
      textareaRef.current.blur();
    }

    const userMsgId = 'user-' + Date.now();
    const assistantMsgId = 'ai-' + Date.now();

    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString(lang === 'ar' ? 'ar-JO' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      let loggedUser: any = null;
      try {
        const saved = localStorage.getItem('farah_chem_user');
        if (saved) loggedUser = JSON.parse(saved);
      } catch (e) {}

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          userName: loggedUser?.name || undefined,
          registeredName: loggedUser?.name || undefined,
          phoneNumber: loggedUser?.phone || undefined,
          lang
        })
      });
      const data = await res.json();
      const fullReply = data.reply || (lang === 'ar' ? 'تمت معالجة السؤال واسترجاع الإجابة العلمية.' : 'Scientific answer retrieved successfully.');

      const aiMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        text: '',
        timestamp: new Date().toLocaleTimeString(lang === 'ar' ? 'ar-JO' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        isTyping: true
      };

      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
      await streamResponse(assistantMsgId, fullReply);

    } catch (err) {
      const fallbackText = lang === 'ar'
        ? 'تتأين الحموض في الماء مطلقة أيونات H⁺ بينما تطلق القواعد أيونات OH⁻، ومقياس pH يعبر عن درجة الحموضة بدقة.'
        : 'Acids ionize in water releasing H⁺ ions while bases release OH⁻ ions, with pH measuring hydrogen ion concentration.';
      const aiMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        text: '',
        timestamp: lang === 'ar' ? 'الآن' : 'Now',
        isTyping: true
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
      await streamResponse(assistantMsgId, fallbackText);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setInputVal('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const insertShortcut = (sym: string) => {
    setInputVal((prev) => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + sym + ' ');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-5.5rem)] sm:h-[calc(100dvh-6.5rem)] max-w-5xl mx-auto w-full bg-white border-x border-slate-200 shadow-sm relative overflow-hidden">
      
      {/* Top Header Bar */}
      <header className="px-4 sm:px-6 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                {t('المساعد الكيميائي الذكي', 'Chemistry AI Tutor')}
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{t('متصل', 'Active')}</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              {t('إجابات وتوضيحات علمية فورية مع معادلات كيميائية منسقة', 'Instant scientific explanations and step-by-step chemical equations')}
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition"
            title={t('محادثة جديدة', 'New Chat')}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('محادثة جديدة', 'New Chat')}</span>
          </button>
        )}
      </header>

      {/* Main Messages Stream / Empty Hero State */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#fafbfb]"
      >
        {messages.length === 0 ? (
          /* Sleek Empty State with Curated Chemistry Starters */
          <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto py-8 text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-inner">
                <Sparkles className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {t('كيف يمكنني مساعدتك في الكيمياء اليوم؟', 'How can I assist your chemistry study today?')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                {t(
                  'اطرح أي سؤال في مفاهيم الحموض والقواعد، معادلات التأين، حسابات pH، أو تجارب الكواشف المخبرية.',
                  'Ask any question regarding acid-base concepts, ionization equations, pH calculations, or chemical laboratory indicators.'
                )}
              </p>
            </div>

            {/* Starter Prompt Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-right">
              {STARTER_CATEGORIES.map((cat, idx) => {
                const IconComponent = cat.icon;
                const prompt = lang === 'ar' ? cat.promptAr : cat.promptEn;
                const title = lang === 'ar' ? cat.titleAr : cat.titleEn;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="p-4 bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-400 rounded-xl text-right transition-all group shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                      <IconComponent className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                      <span>{title}</span>
                    </div>
                    <p className="text-xs text-slate-600 group-hover:text-slate-900 leading-relaxed font-medium">
                      {prompt}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Active Conversation Messages */
          <div className="space-y-5 max-w-3xl mx-auto">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in duration-200`}
                >
                  {/* Clean Icon Avatar */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 border shadow-2xs ${
                      isUser
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-emerald-700 text-white border-emerald-800'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`relative p-4 sm:p-5 rounded-2xl max-w-[88%] sm:max-w-[80%] text-xs leading-relaxed border transition-all ${
                      isUser
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-line text-xs font-medium text-slate-100">
                        {msg.text}
                      </p>
                    ) : (
                      <FormattedChemistryMessage text={msg.text} isTyping={msg.isTyping} />
                    )}

                    {/* Bubble Bottom Meta & Action Buttons */}
                    <div className="flex items-center justify-between gap-3 pt-2 mt-2 border-t border-slate-100/20 text-[10px]">
                      <span className={isUser ? 'text-slate-400' : 'text-slate-400'}>
                        {msg.timestamp}
                      </span>

                      {!isUser && !msg.isTyping && msg.text && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-700 px-1.5 py-0.5 rounded transition"
                            title={t('نسخ النص', 'Copy Text')}
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-[10px] text-emerald-600">{t('تم النسخ', 'Copied')}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="text-[10px]">{t('نسخ', 'Copy')}</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2.5 text-xs text-slate-500 p-2 font-medium bg-emerald-50/60 border border-emerald-200/60 rounded-lg max-w-xs animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>{t('جاري صياغة الإجابة العلمية وتنسيق المعادلات...', 'Generating scientific explanation...')}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          onClick={() => scrollToBottom('smooth')}
          className="absolute bottom-32 sm:bottom-28 right-6 z-20 p-2 rounded-full bg-white border border-slate-300 shadow-md hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-all active:scale-95"
          title={t('النزول للأسفل', 'Scroll to bottom')}
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      )}

      {/* Bottom Fixed Chat Composer Bar */}
      <footer className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0 space-y-2.5 z-10">
        
        {/* Quick Chemical Symbols Shortcut Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] font-bold text-slate-400 shrink-0 px-1">
            {t('رموز كيميائية سريعة:', 'Quick symbols:')}
          </span>
          {CHEMICAL_SHORTCUTS.map((sym, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => insertShortcut(sym)}
              className="px-2 py-0.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 rounded text-[11px] font-mono font-bold text-slate-700 transition shrink-0"
            >
              {sym}
            </button>
          ))}
        </div>

        {/* Input Bar with Auto-Expanding Textarea and Mobile Keyboard Dismissal on Send */}
        <div className="flex items-end gap-2 bg-slate-50 border border-slate-300 focus-within:border-emerald-600 focus-within:bg-white rounded-xl p-1.5 transition-colors shadow-2xs">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputVal}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={t('اكتب سؤالك الكيميائي هنا... (اضغط Enter للإرسال)', 'Type your chemistry question... (Press Enter to send)')}
            className="flex-1 px-3 py-2 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none resize-none min-h-[38px] max-h-[120px] leading-relaxed"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim() || loading}
            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white font-bold rounded-lg transition-all flex items-center justify-center shrink-0 shadow-xs hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:shadow-none"
            title={t('إرسال', 'Send')}
            aria-label="Send message"
          >
            <Send className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>{t('منصة الكيمياء للأستاذة فرح نشأت', 'Farah Nashat Chemistry Platform')}</span>
          <span className="hidden sm:inline">{t('Shift + Enter لسطر جديد', 'Shift + Enter for new line')}</span>
        </div>
      </footer>

    </div>
  );
}