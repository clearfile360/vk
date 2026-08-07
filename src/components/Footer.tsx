import React from 'react';
import { NavTab } from '../types';
import { ShieldCheck, Phone, Mail, MapPin, Award, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#002147] text-slate-200 border-t-4 border-[#D4AF37] pt-12 pb-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Licence Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#002147] flex items-center justify-center font-bold shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">V.K. பத்திரப் பதிவு & இ-சேவை</h3>
                <span className="text-xs text-[#D4AF37] font-bold">L.No: A 3 VLR 2018</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              தமிழ்நாடு அரசு பதிவுத்துறை அங்கீகாரம் பெற்ற பத்திர எழுத்தாளர். கிரையம், தானம், பாகப்பிரிவினை, அடமானம், வாடகை ஒப்பந்தங்கள் தயாரிப்பு & ஆன்லைன் பட்டா/சிட்டா இ-சேவைகள்.
            </p>

            <div className="p-3 rounded-xl bg-[#001733] border border-[#D4AF37]/30 text-xs space-y-1">
              <span className="font-bold text-[#D4AF37] block">பத்திர எழுத்தாளர்:</span>
              <span className="font-bold text-white">பொன்.குமார் D.Pharm</span>
              <span className="text-slate-300 block text-[11px]">அரசு உரிம எண்: L.No. A 3 VLR 2018</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-[#D4AF37]">சேவைகள் & கருவிகள்</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#D4AF37] transition-colors text-slate-200">
                  📜 பத்திரப் பதிவுகள் & ஆவண வரைவு
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-[#D4AF37] transition-colors text-slate-200">
                  🧮 முத்திரைக் கட்டணக் கணிப்பான் (Calculator)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('converter')} className="hover:text-[#D4AF37] transition-colors text-slate-200">
                  📐 நில அளவை மாற்றி (Cent, Sqft, Acre)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('laws')} className="hover:text-[#D4AF37] transition-colors text-slate-200">
                  ⚖️ 1908 பதிவுச் சட்டம் & பிரிவு 77A
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('templates')} className="hover:text-[#D4AF37] transition-colors text-slate-200">
                  📝 மாதிரி பத்திரங்கள் (Templates)
                </button>
              </li>
            </ul>
          </div>

          {/* E-Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-[#D4AF37]">நில வருவாய் இ-சேவைகள்</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• வில்லங்க சான்றிதழ் (Encumbrance Certificate - EC)</li>
              <li>• கணினி பட்டா & சிட்டா பெயர் மாற்றம்</li>
              <li>• 'ஆ' பதிவேடு விவரங்கள் ('A' Register)</li>
              <li>• FMB புல வரைபடம் நகல்</li>
              <li>• TNREGINET ஆன்லைன் டோக்கன் முன்பதிவு</li>
              <li>• A4, A3 Xerox & பிரிண்ட் சேவைகள்</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-[#D4AF37]">அலுவலக தொடர்பு</h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-200">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>கதவு எண்: 1078/1, P.J.N. சாலை, வாணியம்பாடி, திருப்பத்தூர் மாவட்டம் - 635 751.</span>
              </div>

              <div className="flex items-center gap-2 text-slate-200">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href="tel:8056413318" className="hover:underline font-bold text-white">
                  8056413318 / 8220995651
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-200">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:ponkumar69@gmail.com" className="hover:underline">
                  ponkumar69@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-300 pt-1">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>திங்கள் - சனி: காலை 9:00 - இரவு 8:30</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#001733] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <p>© 2026 V.K. பத்திரப் பதிவு & இ-சேவை மையம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</p>
          <div className="flex items-center gap-4 text-[#D4AF37] font-semibold">
            <span>தமிழ்நாடு அரசு அங்கீகரிக்கப்பட்ட மையம்</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
