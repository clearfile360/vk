import React from 'react';
import { NavTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileCheck, 
  Calculator, 
  ArrowRightLeft, 
  BookOpen, 
  Bot, 
  Award, 
  ShieldCheck, 
  CheckCircle, 
  Calendar,
  FileText,
  Landmark,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-[#002147] text-white overflow-hidden border-b-2 border-[#D4AF37]">
      {/* Background Decorative Gradient Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#001733] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Government Licence Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#001733] border border-[#D4AF37] text-[#D4AF37] text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-sm">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('தமிழ்நாடு அரசு அங்கீகரிக்கப்பட்ட பத்திர எழுத்தாளர்', 'TN Govt Licensed Document Writer')}</span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="text-white font-bold hidden sm:inline">L.No: A 3 VLR 2018</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {t('தமிழ்நாடு', 'Tamil Nadu')} <span className="text-[#D4AF37]">{t('பத்திரப் பதிவு', 'Deed Registration')}</span> {t('& நில வருவாய்த்துறை இ-சேவை மையம்', '& Land Revenue E-Sevai Center')}
            </h1>

            {/* Subtext */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed opacity-95">
              {t(
                'கிரைய பத்திரம், தான பத்திரம், பாகப்பிரிவினை, அடமானம், வாடகை ஒப்பந்தங்கள் எழுதுதல், வில்லங்க சான்றிதழ் (EC), கணினி பட்டா/சிட்டா மாறுதல், வழிகாட்டி மதிப்பு கணக்கீடு மற்றும் 1908 பத்திரப் பதிவுச் சட்ட வழிகாட்டல்கள் — 100% துல்லியமாகவும் சட்டப்பூர்வமாகவும்!',
                'Sale deeds, Settlement gifts, Partition, Mortgages, Rent agreements, Encumbrance Certificates (EC), Patta transfers, Stamp Duty calculations & Registration Act 1908 guidance — 100% accurate & legally verified!'
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('calculator')}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#b8952b] text-[#002147] font-extrabold text-sm shadow-lg transition-all hover:scale-[1.02]"
              >
                <Calculator className="w-4 h-4 text-[#002147]" />
                <span>{t('முத்திரைக் கட்டணம் கணக்கிடு', 'Calculate Stamp Duty')}</span>
              </button>

              <button
                onClick={() => setActiveTab('checklist')}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#001733] hover:bg-[#002b5c] text-white font-bold text-sm border border-[#D4AF37]/60 shadow-md transition-all hover:scale-[1.02]"
              >
                <FileCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('தேவையான ஆவணப் பட்டியல்', 'Document Checklist')}</span>
              </button>

              <button
                onClick={() => setActiveTab('appointment')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#001229] hover:bg-[#001733] text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('நேரடி முன்பதிவு', 'Book Appointment')}</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#002b5c]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs text-slate-200 font-medium">{t('அங்கீகரிக்கப்பட்ட உரிமம்', 'Government Licensed')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs text-slate-200 font-medium">{t('100% சட்ட ஆவணம்', '100% Legal Validity')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs text-slate-200 font-medium">{t('உடனடி EC & பட்டா', 'Instant EC & Patta')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs text-slate-200 font-medium">{t('ஆன்லைன் முன்பதிவு', 'Online Appointment')}</span>
              </div>
            </div>

          </div>

          {/* Right Column Quick Interactive Launcher Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#001733] rounded-2xl p-6 border-2 border-[#D4AF37]/40 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-[#002b5c] pb-4 mb-4">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    {t('வேகமான இ-சேவைகள் கருவிக்கூடு', 'Quick E-Services Toolbox')}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">{t('உடனடியாகக் கணக்கிட அல்லது அறிய கிளிக் செய்க', 'Click to access instant utilities')}</p>
                </div>
                <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[11px] font-bold px-2 py-1 rounded border border-[#D4AF37]/40">
                  {t('இலவசம்', 'Free')}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="w-full text-left p-3.5 rounded-xl bg-[#002147] hover:bg-[#002b5c] border border-[#003570] hover:border-[#D4AF37] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#002147] transition-colors">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100 group-hover:text-[#D4AF37]">
                        {t('முத்திரைக் கட்டணம் & பதிவுக் கட்டணம்', 'Stamp Duty & Registration Fee')}
                      </h4>
                      <p className="text-xs text-slate-300">{t('கிரையம், செட்டில்மென்ட், பாகப்பிரிவினை கட்டணங்கள்', 'Sale, Settlement, Partition rates')}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => setActiveTab('checklist')}
                  className="w-full text-left p-3.5 rounded-xl bg-[#002147] hover:bg-[#002b5c] border border-[#003570] hover:border-[#D4AF37] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-[#D4AF37] group-hover:text-[#002147] transition-colors">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100 group-hover:text-[#D4AF37]">
                        {t('தேவையான அசல் ஆவணங்கள் பட்டியல்', 'Original Documents Checklist')}
                      </h4>
                      <p className="text-xs text-slate-300">{t('பதிவுக்குத் தேவைப்படும் அசல் ஆவணங்கள்', 'Required proofs for Sub-Registrar Office')}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => setActiveTab('converter')}
                  className="w-full text-left p-3.5 rounded-xl bg-[#002147] hover:bg-[#002b5c] border border-[#003570] hover:border-[#D4AF37] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-[#D4AF37] group-hover:text-[#002147] transition-colors">
                      <ArrowRightLeft className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100 group-hover:text-[#D4AF37]">
                        {t('நில அளவை மாற்றி (Cent, Sqft, Acre)', 'Land Measurement Converter')}
                      </h4>
                      <p className="text-xs text-slate-300">{t('சென்ட், சதுர அடி, மனை, ஏக்ரா உடனடி மாற்றம்', 'Convert Cent, Sqft, Ground, Acre')}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => setActiveTab('laws')}
                  className="w-full text-left p-3.5 rounded-xl bg-[#002147] hover:bg-[#002b5c] border border-[#003570] hover:border-[#D4AF37] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-[#D4AF37] group-hover:text-[#002147] transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100 group-hover:text-[#D4AF37]">
                        {t('1908 பதிவுச் சட்டம் & 77A விதிகள்', '1908 Registration Act & Sec 77A')}
                      </h4>
                      <p className="text-xs text-slate-300">{t('போலி பத்திர ரத்து, பிரிவு 22A தடை நிலங்கள்', 'Cancel fraudulent deeds & Sec 22A rules')}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              {/* Office Contact Strip */}
              <div className="mt-5 pt-4 border-t border-[#002b5c] flex items-center justify-between text-xs text-slate-200">
                <span>📍 {t('வாணியம்பாடி சார்பதிவாளர் அலுவலக அருகில்', 'Near Sub-Registrar Office, Vaniyambadi')}</span>
                <span className="font-bold text-[#D4AF37]">☎ 8056413318</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

