import React, { useState } from 'react';
import { NavTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileText, 
  Calculator, 
  ArrowRightLeft, 
  BookOpen, 
  FileCode, 
  Search, 
  Bot, 
  Calendar, 
  Phone, 
  Award, 
  Menu, 
  X,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Globe,
  FileCheck,
  HelpCircle
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navItems: { id: NavTab; labelTa: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'home', labelTa: 'முகப்பு', labelEn: 'Home', icon: <FileText className="w-4 h-4" /> },
    { id: 'services', labelTa: 'இ-சேவைகள்', labelEn: 'E-Services', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'checklist', labelTa: 'ஆவண பட்டியல்', labelEn: 'Doc Checklist', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'calculator', labelTa: 'முத்திரைக் கணிப்பான்', labelEn: 'Stamp Duty Calc', icon: <Calculator className="w-4 h-4" /> },
    { id: 'converter', labelTa: 'நில அளவை மாற்றி', labelEn: 'Land Converter', icon: <ArrowRightLeft className="w-4 h-4" /> },
    { id: 'faq', labelTa: 'கேள்வி பதில்கள்', labelEn: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'laws', labelTa: 'சட்டங்கள் & விதிகள்', labelEn: 'Laws & Acts', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'templates', labelTa: 'மாதிரி பத்திரங்கள்', labelEn: 'Deed Templates', icon: <FileCode className="w-4 h-4" /> },
    { id: 'tracker', labelTa: 'விண்ணப்ப நிலை', labelEn: 'Status Tracker', icon: <Search className="w-4 h-4" /> },
    { id: 'ai-chat', labelTa: 'AI உதவியாளர்', labelEn: 'AI Assistant', icon: <Bot className="w-4 h-4 text-[#D4AF37]" /> },
    { id: 'appointment', labelTa: 'முன்பதிவு', labelEn: 'Book Appointment', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <header className="w-full bg-[#002147] text-slate-100 shadow-xl sticky top-0 z-50 border-b-4 border-[#D4AF37]">
      {/* Top Banner Notice: Govt Licenced Document Writer Info */}
      <div className="bg-[#001733] text-slate-100 font-medium text-xs sm:text-sm py-2 px-4 border-b border-[#002b5c]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="bg-[#D4AF37] text-[#002147] font-extrabold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider flex items-center gap-1 shadow">
              <Award className="w-3.5 h-3.5" /> {t('அரசு அங்கீகாரம்', 'Govt Licensed')}
            </span>
            <span className="font-bold text-white">{t('பத்திர எழுத்தாளர்: பொன்.குமார் D.Pharm', 'Document Writer: Pon.Kumar D.Pharm')}</span>
            <span className="hidden md:inline text-[#D4AF37] font-extrabold">•</span>
            <span className="text-slate-200 font-bold">{t('உரிம எண் (L.No): A 3 VLR 2018', 'Licence No: A 3 VLR 2018')}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            {/* Language Switcher Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#002147] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#002147] transition-all font-bold"
              title={t('Switch Language', 'மொழியை மாற்றவும்')}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
            </button>

            <a href="tel:8056413318" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-slate-200">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> 8056413318 / 8220995651
            </a>
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> 9:00 AM - 8:30 PM
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Brand Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          onClick={() => setActiveTab('home')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          {/* Emblem Icon */}
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md border-2 border-[#D4AF37] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#002147] rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                {t('V.K. பத்திரப் பதிவு & இ-சேவை மையம்', 'V.K. Document Writing & E-Sevai Center')}
              </h1>
            </div>
            <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold flex items-center gap-1 mt-0.5">
              <span>{t('தமிழ்நாடு அரசு பதிவுத்துறை & நில வருவாய்த்துறை ஆவணச் சேவைகள்', 'TN Govt Registration & Land Revenue Services')}</span>
              <span className="text-white font-bold hidden sm:inline">• Vaniyambadi</span>
            </p>
          </div>
        </div>

        {/* Desktop Call to Action & AI Chat Quick Launch */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setActiveTab('ai-chat')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#b8952b] text-[#002147] font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
          >
            <Bot className="w-4 h-4 text-[#002147]" />
            <span>{t('AI தமிழ் உதவி', 'AI Assistant')}</span>
          </button>

          <button
            onClick={() => setActiveTab('appointment')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#001733] hover:bg-[#002b5c] text-white font-bold text-xs border border-[#D4AF37]/50 transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('முன்பதிவு செய்ய', 'Book Appointment')}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-[#001733] text-slate-200 hover:text-white hover:bg-[#002b5c] border border-[#D4AF37]/30"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Main Navigation Tabs - Desktop */}
      <nav className="hidden lg:block bg-[#001733]/90 border-t border-[#002b5c]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const label = language === 'ta' ? item.labelTa : item.labelEn;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#002147] shadow-sm'
                      : 'text-slate-200 hover:text-[#D4AF37] hover:bg-[#002147]'
                  }`}
                >
                  {item.icon}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#001733] border-t border-[#002b5c] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const label = language === 'ta' ? item.labelTa : item.labelEn;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#002147] font-bold'
                    : 'text-slate-200 hover:bg-[#002147] hover:text-[#D4AF37]'
                }`}
              >
                {item.icon}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

