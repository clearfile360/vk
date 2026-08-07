import React, { useState } from 'react';
import { LAW_ACTS } from '../data/tamilData';
import { LawAct } from '../types';
import { 
  BookOpen, 
  ShieldAlert, 
  FileCheck, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Gavel, 
  ChevronDown, 
  ChevronUp,
  FileText,
  BadgeAlert
} from 'lucide-react';

export const LawsAndRules: React.FC = () => {
  const [selectedActId, setSelectedActId] = useState<string>('registration-act-1908');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const selectedAct = LAW_ACTS.find(act => act.id === selectedActId) || LAW_ACTS[0];

  const filteredActs = LAW_ACTS.filter(act => 
    act.tamilTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1">
            <Gavel className="w-3.5 h-3.5" /> தமிழ்நாடு பத்திரப் பதிவு & நிலச் சட்ட வழிகாட்டுதல்கள்
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-50">
            சட்டங்கள், விதிகள் & வருவாய்த்துறை வழிகாட்டுதல்கள்
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            1908 இந்திய பத்திரப் பதிவுச் சட்டம், 1899 இந்திய முத்திரைச் சட்டம், பிரிவு 77A போலி பத்திர ரத்து விதிகள் மற்றும் அங்கீகரிக்கப்பட்ட பத்திர எழுத்தாளர்களின் சட்டக் கடமைகளை அறிந்துகொள்ளுங்கள்.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="சட்டம் அல்லது பிரிவைத் தேடுக (எ.கா: 77A, 22A, முத்திரை, பட்டா)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 font-medium text-xs sm:text-sm bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            சட்டங்கள் & விதிகள் அடைவு ({filteredActs.length})
          </h3>

          {filteredActs.map((act) => {
            const isSelected = act.id === selectedActId;
            return (
              <div
                key={act.id}
                onClick={() => setSelectedActId(act.id)}
                className={`p-4 rounded-xl cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-400 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <span className="text-[11px] font-bold text-amber-600 block">{act.actName}</span>
                <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{act.tamilTitle}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{act.summary}</p>
              </div>
            );
          })}

          {/* Special Banner Section 77A & 22A */}
          <div className="p-4 rounded-xl bg-slate-900 text-white border border-amber-500/30 space-y-2 mt-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <ShieldAlert className="w-4 h-4" />
              <span>முக்கிய சட்டத் திருத்தங்கள்:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              **பிரிவு 77A:** போலி பத்திரங்களை ரத்து செய்ய மாவட்டப் பதிவாளருக்கு அதிகாரம்.
              <br />
              **பிரிவு 22A:** அரசு, திருக்கோயில் & கோயில் நிலங்கள் பதிவு செய்யத் தடை.
            </p>
          </div>
        </div>

        {/* Right Detail Inspector Panel */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded text-xs">
              {selectedAct.actName}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">{selectedAct.tamilTitle}</h3>
            <p className="text-xs text-slate-500 font-semibold">{selectedAct.title}</p>
            <p className="text-xs text-slate-700 leading-relaxed pt-2">{selectedAct.summary}</p>
          </div>

          {/* Key Law Sections */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Gavel className="w-4 h-4 text-amber-600" />
              முக்கிய சட்டப் பிரிவுகள் (Key Legal Sections)
            </h4>

            <div className="space-y-3">
              {selectedAct.keySections.map((sec, idx) => {
                const isExpanded = expandedSection === sec.sectionNumber;
                return (
                  <div 
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-slate-50/50"
                  >
                    <button
                      onClick={() => setExpandedSection(isExpanded ? null : sec.sectionNumber)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-100/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded">
                          {sec.sectionNumber}
                        </span>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {sec.sectionTitle}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    <div className="px-4 pb-4 pt-1 text-xs text-slate-700 leading-relaxed border-t border-slate-200/60 bg-white">
                      {sec.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guidelines & Practice rules */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ஆவணம் தாக்கல் செய்யும் போது பின்பற்ற வேண்டிய வழிகாட்டுதல்கள்
            </h4>

            <div className="space-y-2">
              {selectedAct.guidelines.map((guide, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950">
                  <span className="font-bold text-emerald-700 min-w-[20px]">{idx + 1}.</span>
                  <span className="leading-relaxed">{guide}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Parent document verification checklist box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <h5 className="font-bold text-amber-950 text-xs flex items-center gap-2">
              <BadgeAlert className="w-4 h-4 text-amber-700" />
              சொத்து மூலப் பத்திரங்கள் சரிபார்ப்பு வழிகாட்டி (Parent Verification Rules)
            </h5>
            <p className="text-xs text-amber-900 leading-relaxed">
              பத்திரப் பதிவு செய்வதற்கு முன்பு 13 முதல் 30 ஆண்டுகளுக்கான வில்லங்க சான்றிதழ் (EC) மற்றும் தாய் பத்திரங்களின் தொடர்ச்சி (Link Documents) சரியாக உள்ளதா என்பதை அங்கீகரிக்கப்பட்ட பத்திர எழுத்தாளரிடம் சரிபார்ப்பது எதிர்கால வழக்குகளைத் தவிர்க்கும்.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
