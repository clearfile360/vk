import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Bot, Send, Mic, RefreshCw, Sparkles, User, AlertCircle, PhoneCall, HelpCircle, ShieldCheck } from 'lucide-react';

interface AIChatbotProps {
  isFloating?: boolean;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ isFloating = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: `வணக்கம்! 📜 நான் உங்களது **தமிழ் பத்திரப் பதிவு & நில வருவாய்த்துறை AI உதவியாளர்**.

நிலப் பத்திரப்பதிவு, முத்திரைக் கட்டணம், வில்லங்க சான்றிதழ் (EC), பட்டா/சிட்டா மாற்றம், 1908 பதிவுச் சட்டம் அல்லது நில அளவீடுகள் குறித்து ஏதேனும் கேள்விகள் இருந்தால் தயங்காமல் கேட்கலாம்!`,
      timestamp: new Date().toLocaleTimeString('ta-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'வீடு வாங்க கிரைய பத்திரத்திற்கு கட்டணம் எவ்வளவு?',
    'வில்லங்க சான்றிதழ் (EC) எடுப்பது எப்படி?',
    'பட்டா பெயர் மாற்றம் செய்ய என்ன ஆவணங்கள் வேண்டும்?',
    '1 ஏக்ரா நிலத்தில் எத்தனை சென்ட் மற்றும் சதுர அடி உள்ளது?',
    'குடும்ப செட்டில்மென்ட் பத்திரத்தின் முத்திரைக் கட்டணம் என்ன?'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('ta-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Build history payload
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload
        })
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.reply || data.error || 'மன்னிக்கவும், விடை உருவாக்க இயலவில்லை.',
        timestamp: new Date().toLocaleTimeString('ta-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: 'மன்னிக்கவும், நெட்வொர்க் பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
          timestamp: new Date().toLocaleTimeString('ta-IN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Speech Recognition setup for Tamil voice input
  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('உங்கள் உலாவியில் குரல் உள்ளீடு வசதி ஆதரிக்கப்படவில்லை.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ta-IN'; // Tamil language input
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  return (
    <div className={`flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden ${isFloating ? 'h-[500px]' : 'h-[650px] max-w-4xl mx-auto my-6'}`}>
      
      {/* Chat Header */}
      <div className="bg-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              தமிழ் பத்திர & வருவாய் AI உதவியாளர்
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded border border-amber-500/30 font-bold">
                AI Assistant
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">100% தமிழ் | TNREGINET & நில வருவாய்த்துறை வழிகாட்டி</p>
          </div>
        </div>

        <button
          onClick={() => setMessages(messages.slice(0, 1))}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 text-xs flex items-center gap-1 transition-colors"
          title="உரையாடலை தொடக்கு"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">புதிய உரை</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
        
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm ${
                isUser ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-amber-400'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm text-xs sm:text-sm leading-relaxed space-y-1 ${
                isUser
                  ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div className={`text-[10px] text-right pt-1 ${isUser ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 w-fit text-xs text-slate-600">
            <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
            <span>பதில் தட்டச்சு செய்யப்படுகிறது...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Question Chips */}
      <div className="p-2.5 bg-slate-100 border-t border-slate-200 overflow-x-auto scrollbar-none flex gap-2">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-amber-100 hover:text-amber-950 border border-slate-200 text-slate-700 font-semibold text-[11px] whitespace-nowrap transition-colors flex-shrink-0 shadow-xs"
          >
            💬 {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={startVoiceInput}
          className={`p-2.5 rounded-xl border transition-colors ${
            isListening
              ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
          }`}
          title="தமிழ் குரல் உள்ளீடு (Voice Input)"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="உங்கள் சந்தேகத்தை தமிழில் கேட்கவும் (எ.கா: கிரைய கட்டணம் எவ்வளவு?)..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50"
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs shadow flex items-center gap-1.5 transition-colors"
        >
          <span>அனுப்பு</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
