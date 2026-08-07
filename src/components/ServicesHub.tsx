import React, { useState } from 'react';
import { DEED_TYPES, REVENUE_SERVICES } from '../data/tamilData';
import { DeedType, NavTab } from '../types';
import { 
  FileCheck, 
  HeartHandshake, 
  GitMerge, 
  Building2, 
  KeyRound, 
  ShieldCheck, 
  SearchCheck, 
  Landmark, 
  Map,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Bot,
  ChevronRight,
  Printer,
  BadgePercent
} from 'lucide-react';

interface ServicesHubProps {
  setActiveTab: (tab: NavTab) => void;
  onSelectDeedForBooking?: (deedName: string) => void;
}

export const ServicesHub: React.FC<ServicesHubProps> = ({ setActiveTab, onSelectDeedForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<'deeds' | 'revenue' | 'print'>('deeds');
  const [selectedDeed, setSelectedDeed] = useState<DeedType | null>(DEED_TYPES[0]);

  const renderIcon = (name: string) => {
    switch (name) {
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-amber-500" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-500" />;
      case 'GitMerge': return <GitMerge className="w-6 h-6 text-indigo-500" />;
      case 'BuildingBank': return <Building2 className="w-6 h-6 text-emerald-500" />;
      case 'KeyRound': return <KeyRound className="w-6 h-6 text-blue-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-purple-500" />;
      case 'SearchCheck': return <SearchCheck className="w-6 h-6 text-amber-500" />;
      case 'Landmark': return <Landmark className="w-6 h-6 text-emerald-500" />;
      case 'Map': return <Map className="w-6 h-6 text-blue-500" />;
      default: return <FileText className="w-6 h-6 text-amber-500" />;
    }
  };

  const currentList = activeCategory === 'deeds' ? DEED_TYPES : activeCategory === 'revenue' ? REVENUE_SERVICES : [];

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto space-y-8">
      
      {/* Header title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-[#002147] text-[#D4AF37] border border-[#D4AF37]/50 font-bold px-3.5 py-1 rounded-full text-xs uppercase tracking-wider shadow-sm">
          தமிழ்நாடு அரசு இ-சேவைகள் & பத்திரத் தயாரிப்பு
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
          பத்திரப் பதிவுகள் & நில வருவாய்த்துறை ஆவண சேவைகள்
        </h2>
        <p className="text-slate-600 text-sm">
          அங்கீகரிக்கப்பட்ட பத்திர எழுத்தாளரால் அனைத்து விதமான பத்திரங்களும் துல்லியமான சட்ட விதிகளின்படி வரைவு செய்யப்பட்டு TNREGINET ஆன்லைன் டோக்கன் பதிவுடன் செய்து தரப்படும்.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center border-b border-slate-200">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              setActiveCategory('deeds');
              setSelectedDeed(DEED_TYPES[0]);
            }}
            className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-t-xl transition-all border-b-2 ${
              activeCategory === 'deeds'
                ? 'border-[#D4AF37] text-[#002147] bg-[#002147]/5 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-[#002147] hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span>1. பத்திர வகைகள் (Deed Registration)</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('revenue');
              setSelectedDeed(REVENUE_SERVICES[0]);
            }}
            className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-t-xl transition-all border-b-2 ${
              activeCategory === 'revenue'
                ? 'border-[#D4AF37] text-[#002147] bg-[#002147]/5 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-[#002147] hover:bg-slate-50'
            }`}
          >
            <Landmark className="w-4 h-4 text-[#D4AF37]" />
            <span>2. நில வருவாய் சேவைகள் (EC, Patta, FMB)</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('print');
              setSelectedDeed(null);
            }}
            className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-t-xl transition-all border-b-2 ${
              activeCategory === 'print'
                ? 'border-[#D4AF37] text-[#002147] bg-[#002147]/5 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-[#002147] hover:bg-slate-50'
            }`}
          >
            <Printer className="w-4 h-4 text-[#D4AF37]" />
            <span>3. முத்திரைத் தாள் & அச்சு (Xerox / Print)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeCategory !== 'print' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Cards List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              ஆவண சேவையைத் தேர்ந்தெடுக்கவும் ({currentList.length})
            </h3>

            {currentList.map((deed) => {
              const isSelected = selectedDeed?.id === deed.id;
              return (
                <div
                  key={deed.id}
                  onClick={() => setSelectedDeed(deed)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-[#002147]/5 border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-[#002147]/10">
                        {renderIcon(deed.iconName)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#002147] text-sm">{deed.tamilName}</h4>
                        <span className="text-xs text-[#002147]/70 font-semibold">{deed.title}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-[#D4AF37] translate-x-1' : 'text-slate-400'}`} />
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{deed.description}</p>
                </div>
              );
            })}
          </div>

          {/* Right Detailed Inspector Panel */}
          {selectedDeed && (
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border-2 border-[#D4AF37]/30 shadow-xl space-y-6">
              
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#002147]/5 border border-[#D4AF37]/40">
                    {renderIcon(selectedDeed.iconName)}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#002147]">{selectedDeed.tamilName}</h3>
                    <p className="text-xs text-[#002147]/80 font-bold">{selectedDeed.title}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onSelectDeedForBooking) onSelectDeedForBooking(selectedDeed.tamilName);
                    setActiveTab('appointment');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#b8952b] text-[#002147] font-extrabold text-xs shadow transition-all hover:scale-[1.02]"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>முன்பதிவு செய்ய</span>
                </button>
              </div>

              {/* Fee Structure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                    <BadgePercent className="w-3.5 h-3.5 text-amber-600" /> முத்திரைக் கட்டணம் (Stamp Duty)
                  </span>
                  <p className="text-sm font-black text-slate-900 mt-1">{selectedDeed.stampDutyRate}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600" /> பதிவுக் கட்டணம் (Registration Fee)
                  </span>
                  <p className="text-sm font-black text-slate-900 mt-1">{selectedDeed.regFeeRate}</p>
                </div>
              </div>

              {selectedDeed.maxCap && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>அரசு சலுகை வரம்பு: {selectedDeed.maxCap}</span>
                </div>
              )}

              {/* Required Documents Checklist */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  தேவையான ஆவணங்கள் சரிபார்ப்பு பட்டியல் (Mandatory Checklist)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDeed.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 text-xs text-slate-700 border border-slate-200">
                      <span className="font-bold text-amber-600 min-w-[18px]">{idx + 1}.</span>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Rules */}
              {selectedDeed.keyRules && selectedDeed.keyRules.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    முக்கிய சட்ட விதிகள் & எச்சரிக்கைகள்
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                    {selectedDeed.keyRules.map((rule, idx) => (
                      <li key={idx} className="leading-relaxed">{rule}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setActiveTab('ai-chat')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#002147]/10 hover:bg-[#002147]/20 text-[#002147] font-bold text-xs transition-colors"
                >
                  <Bot className="w-4 h-4 text-[#D4AF37]" />
                  <span>இந்த ஆவணம் குறித்து AI-யிடம் கேள்</span>
                </button>

                <button
                  onClick={() => setActiveTab('templates')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#002147] hover:bg-[#001733] text-[#D4AF37] font-bold text-xs transition-colors shadow"
                >
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>மாதிரி பத்திரம் பார்க்க</span>
                </button>
              </div>

            </div>
          )}
        </div>
      ) : (
        /* Print / Xerox / Stamp paper section */
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <Printer className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">V.K. XEROX & முத்திரைத் தாள் சேவைகள்</h3>
              <p className="text-sm text-slate-500">A4, A3 வண்ண அச்சு, ஆன்லைன் இ-செலான் மற்றும் அனைத்து வகையான நகல் சேவைகள்</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">📜 முத்திரைத் தாள்கள் (Stamp Papers)</h4>
              <p className="text-xs text-slate-600">ரூ. 20, 50, 100, 500 மற்றும் இ-ஸ்டாம்ப் (E-Stamp) அரசாங்க முத்திரைத் தாள்கள் விநியோகம்.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">🖨️ A4, A3 பிரிண்ட்ஸ் & ஜெராக்ஸ்</h4>
              <p className="text-xs text-slate-600">கருப்பு-வெள்ளை (Black & White) மற்றும் வண்ண அச்சு (Colour Prints & Xerox), ஆவண லேமினேஷன்.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">💳 ஆன்லைன் பேமண்ட்ஸ் & இ-செலான்</h4>
              <p className="text-xs text-slate-600">TNREGINET பதிவுக் கட்டணம், கருவூல இ-செலான் செலுத்தல்கள் மற்றும் ஆன்லைன் விண்ணப்ப கட்டணங்கள்.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
