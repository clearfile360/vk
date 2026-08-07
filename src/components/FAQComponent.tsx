import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';
import { FAQItem, NavTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Bot, 
  Tag, 
  ThumbsUp, 
  MessageSquareQuote,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface FAQComponentProps {
  setActiveTab?: (tab: NavTab) => void;
}

export const FAQComponent: React.FC<FAQComponentProps> = ({ setActiveTab }) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(FAQ_DATA[0].id);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', titleTa: 'அனைத்து கேள்விகள்', titleEn: 'All Questions' },
    { id: 'registration', titleTa: 'பத்திரப் பதிவு', titleEn: 'Registration' },
    { id: 'stamp_duty', titleTa: 'முத்திரைக் கட்டணம்', titleEn: 'Stamp Duty' },
    { id: 'ec', titleTa: 'வில்லங்க சான்றிதழ் (EC)', titleEn: 'Encumbrance (EC)' },
    { id: 'laws_rules', titleTa: '22A & 77A சட்டங்கள்', titleEn: 'Registration Laws' },
    { id: 'patta', titleTa: 'பட்டா பெயர் மாற்றம்', titleEn: 'Patta Transfer' },
    { id: 'writer_rights', titleTa: 'பத்திர எழுத்தாளர்', titleEn: 'Document Writer' },
  ];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      item.questionTa.toLowerCase().includes(query) ||
      item.questionEn.toLowerCase().includes(query) ||
      item.answerTa.toLowerCase().includes(query) ||
      item.answerEn.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  const toggleExpand = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  const handleVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      
      {/* Title Header */}
      <div className="bg-[#002147] text-white rounded-2xl p-6 sm:p-8 shadow-xl border-b-4 border-[#D4AF37] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <span className="bg-[#D4AF37] text-[#002147] font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1 shadow">
            <HelpCircle className="w-3.5 h-3.5" />
            {t('அடிக்கடி கேட்கப்படும் கேள்விகள்', 'Frequently Asked Questions')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t('பத்திரப் பதிவு & இ-சேவை தகவல்கள் (FAQ)', 'Registration & Property Knowledge Base')}
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm">
            {t(
              'சொத்து பதிவு, முத்திரைக் கட்டணம், வில்லங்கம் மற்றும் பட்டா பெயர் மாற்றம் குறித்த சந்தேகங்களுக்குத் துல்லியமான விடைகள்.',
              'Clear answers regarding property registration, stamp duty calculations, EC searches, and Patta transfers.'
            )}
          </p>
        </div>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('கேள்விகள் அல்லது சொற்களைத் தேடுக... (எ.கா. EC, பட்டா, முத்திரைக் கட்டணம்)', 'Search questions or keywords... (e.g. EC, Patta, Stamp Duty)')}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const title = language === 'ta' ? cat.titleTa : cat.titleEn;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#002147] text-[#D4AF37] border-2 border-[#D4AF37] shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-transparent'
                }`}
              >
                {title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isExpanded = expandedFaqId === faq.id;
            const question = language === 'ta' ? faq.questionTa : faq.questionEn;
            const answer = language === 'ta' ? faq.answerTa : faq.answerEn;
            const isVoted = helpfulVotes[faq.id];

            return (
              <div 
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all ${
                  isExpanded 
                    ? 'border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/30' 
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div 
                  onClick={() => toggleExpand(faq.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#002147]/10 text-[#002147] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      Q{index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-[#002147] leading-snug">
                        {question}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-[10px] font-bold bg-[#002147]/5 text-[#002147] px-2 py-0.5 rounded border border-[#002147]/10">
                          {faq.categoryTa}
                        </span>
                        {faq.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="p-1 rounded-lg text-slate-400 hover:text-[#002147]">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 text-sm space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed font-normal">
                      <MessageSquareQuote className="w-5 h-5 text-[#D4AF37] mb-2" />
                      {answer}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                      <button
                        onClick={(e) => handleVote(faq.id, e)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold transition-colors ${
                          isVoted
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{isVoted ? t('பயனுள்ளது! (நன்றி)', 'Helpful! (Thank you)') : t('இந்த விடை பயனுள்ளதா?', 'Was this helpful?')}</span>
                      </button>

                      {setActiveTab && (
                        <button
                          onClick={() => setActiveTab('ai-chat')}
                          className="flex items-center gap-1.5 text-[#002147] font-bold hover:underline"
                        >
                          <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{t('கூடுதல் சந்தேகங்களை AI-யிடம் கேட்க', 'Ask AI for more details')}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">
              {t('கேள்விகள் எதுவும் கிடைக்கவில்லை', 'No matching questions found')}
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {t('வேறு சொற்களைத் தேடிப் பார்க்கவும் அல்லது எங்களது AI தமிழ் உதவியாளரிடம் நேரடியாக உங்களது சந்தேகத்தைக் கேட்கவும்.', 'Try different search keywords or ask our AI Tamil Assistant directly.')}
            </p>
            {setActiveTab && (
              <button
                onClick={() => setActiveTab('ai-chat')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002147] text-[#D4AF37] font-bold text-xs shadow hover:bg-[#001733]"
              >
                <Bot className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('AI தமிழ் உதவியாளரிடம் கேள்', 'Ask AI Assistant')}</span>
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
