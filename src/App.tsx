import React, { useState } from 'react';
import { NavTab } from './types';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesHub } from './components/ServicesHub';
import { StampDutyCalculator } from './components/Calculators/StampDutyCalculator';
import { LandAreaConverter } from './components/Calculators/LandAreaConverter';
import { DocumentChecklist } from './components/DocumentChecklist';
import { FAQComponent } from './components/FAQComponent';
import { LawsAndRules } from './components/LawsAndRules';
import { DeedTemplates } from './components/DeedTemplates';
import { StatusTracker } from './components/StatusTracker';
import { AppointmentBooking } from './components/AppointmentBooking';
import { AIChatbot } from './components/AIChatbot';
import { Footer } from './components/Footer';

import { 
  Bot, 
  X, 
  MessageSquare, 
  Calculator, 
  ArrowRightLeft, 
  BookOpen, 
  CheckCircle2, 
  Award,
  ShieldCheck,
  Calendar,
  FileText,
  FileCheck,
  HelpCircle
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedDeedForBooking, setSelectedDeedForBooking] = useState<string>('');
  const [floatingChatOpen, setFloatingChatOpen] = useState<boolean>(false);
  const { t } = useLanguage();

  const handleSelectDeedForBooking = (deedName: string) => {
    setSelectedDeedForBooking(deedName);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-[#D4AF37] selection:text-[#002147]">
      
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <Hero setActiveTab={setActiveTab} />
            
            {/* Dynamic Document Checklist Section */}
            <DocumentChecklist />

            <ServicesHub setActiveTab={setActiveTab} onSelectDeedForBooking={handleSelectDeedForBooking} />
            
            {/* Embedded Quick Tools Section */}
            <div className="bg-slate-100 py-12 border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-4 space-y-10">
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <span className="bg-[#D4AF37] text-[#002147] font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                    {t('துரிதக் கணக்கீட்டுக் கருவிகள்', 'Quick Calculations Toolbox')}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    {t('முத்திரைக் கட்டணம் & நில அளவை உடனடிக் கணிப்பான்', 'Stamp Duty & Land Area Calculator')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <StampDutyCalculator />
                  <LandAreaConverter />
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <FAQComponent setActiveTab={setActiveTab} />

            <LawsAndRules />
            <StatusTracker />
            <AppointmentBooking initialDeedName={selectedDeedForBooking} />
          </div>
        )}

        {activeTab === 'services' && (
          <ServicesHub setActiveTab={setActiveTab} onSelectDeedForBooking={handleSelectDeedForBooking} />
        )}

        {activeTab === 'checklist' && (
          <DocumentChecklist />
        )}

        {activeTab === 'calculator' && (
          <StampDutyCalculator />
        )}

        {activeTab === 'converter' && (
          <LandAreaConverter />
        )}

        {activeTab === 'faq' && (
          <FAQComponent setActiveTab={setActiveTab} />
        )}

        {activeTab === 'laws' && (
          <LawsAndRules />
        )}

        {activeTab === 'templates' && (
          <DeedTemplates />
        )}

        {activeTab === 'tracker' && (
          <StatusTracker />
        )}

        {activeTab === 'ai-chat' && (
          <div className="py-8 px-4">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="bg-[#D4AF37] text-[#002147] font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                {t('AI தமிழ் உதவியாளர்', 'AI Assistant')}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {t('தமிழ்நாடு பத்திரப் பதிவு & வருவாய்த்துறை AI உதவியாளர்', 'Tamil Nadu Property Registration AI Assistant')}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {t('பத்திரப்பதிவு விதிகள், வில்லங்கம், பட்டா மற்றும் முத்திரைக் கட்டணம் குறித்து உடனடியாக உரையாடலாம்.', 'Ask anything about registration rules, EC search, Patta transfer, and stamp duty rates.')}
              </p>
            </div>
            <AIChatbot isFloating={false} />
          </div>
        )}

        {activeTab === 'appointment' && (
          <AppointmentBooking initialDeedName={selectedDeedForBooking} />
        )}
      </main>

      {/* Persistent Floating Bottom-Right AI Chat Button & Popup */}
      <div className="fixed bottom-5 right-5 z-50">
        {!floatingChatOpen ? (
          <button
            onClick={() => setFloatingChatOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#002147] hover:bg-[#001733] text-[#D4AF37] font-black text-xs shadow-2xl shadow-[#002147]/40 border border-[#D4AF37] transition-all hover:scale-105"
            aria-label="Open AI Chat"
          >
            <Bot className="w-5 h-5 text-[#D4AF37]" />
            <span className="hidden sm:inline">{t('AI தமிழ் உதவியாளர்', 'AI Assistant')}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        ) : (
          <div className="w-[360px] sm:w-[420px] shadow-2xl rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 bg-white">
            <div className="flex justify-end bg-[#002147] p-2 border-b border-slate-800">
              <button
                onClick={() => setFloatingChatOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#001733] transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <AIChatbot isFloating={true} />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
