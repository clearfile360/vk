import React, { useState, useEffect } from 'react';
import { SAMPLE_TEMPLATES } from '../data/tamilData';
import { DeedTemplate } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileCode, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  Search, 
  Edit3, 
  Eye, 
  RefreshCw, 
  Sparkles, 
  FileText,
  User,
  MapPin,
  Calendar,
  IndianRupee,
  ShieldCheck
} from 'lucide-react';

export const DeedTemplates: React.FC = () => {
  const { t } = useLanguage();
  const [draftLevel, setDraftLevel] = useState<'level1' | 'level2'>('level2');
  const [selectedTemplate, setSelectedTemplate] = useState<DeedTemplate>(SAMPLE_TEMPLATES[0]);
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Dynamic template fields
  const [sellerName, setSellerName] = useState('இராமசாமி, த/பெ கோவிந்தசாமி (ஆதார்: XXXX-XXXX-4589)');
  const [buyerName, setBuyerName] = useState('செல்வம், த/பெ நடராஜன் (ஆதார்: XXXX-XXXX-9812)');
  const [propertyAddress, setPropertyAddress] = useState('கதவு எண் 12, P.J.N. சாலை, வாணியம்பாடி தாலுகா, திருப்பத்தூர் மாவட்டம்');
  const [surveyNo, setSurveyNo] = useState('SF No. 142/3B (கணினி பட்டா எண்: 1048)');
  const [amount, setAmount] = useState('₹ 15,00,000/- (ரூபாய் பதினைந்து லட்சம் மட்டும்)');
  const [executionDate, setExecutionDate] = useState(new Date().toISOString().split('T')[0]);
  const [ecNumber, setEcNumber] = useState('EC No: 2026/VNB/452109');

  // Editable content
  const [customContent, setCustomContent] = useState(selectedTemplate.content);

  // Auto-fill template variables when template changes or inputs change
  useEffect(() => {
    let filled = selectedTemplate.content;
    filled = filled.replace(/\[விற்பனையாளர் பெயர்\]/g, sellerName || '[விற்பனையாளர் பெயர்]');
    filled = filled.replace(/\[வாங்குபவர் பெயர்\]/g, buyerName || '[வாங்குபவர் பெயர்]');
    filled = filled.replace(/\[முகவரி\]/g, propertyAddress || '[முகவரி]');
    filled = filled.replace(/\[சர்வே எண்\]/g, surveyNo || '[சர்வே எண்]');
    filled = filled.replace(/\[தொகை\]/g, amount || '[தொகை]');
    filled = filled.replace(/\[தேதி\]/g, executionDate || '[தேதி]');

    if (draftLevel === 'level2') {
      const level2Clauses = `\n\n======================================================
[நிலை 2 சட்டப்பூர்வ பாதுகாப்புப் பிரிவுகள் / LEVEL 2 LEGAL CLAUSES]
======================================================
1. வில்லங்கமின்மை உறுதிப்பாடு (Zero Encumbrance Guarantee):
எழுதுவித்துக் கொடுத்தவர் இந்தச் சொத்தின் மீது எந்தவிதமான அடமானம், வழக்கு, குத்தகை, வங்கிப் பிணை அல்லது வாரிசுச் சிக்கல்கள் இல்லை என்று உறுதி கூறுகிறார். (${ecNumber})

2. பிரிவு 77A மற்றும் 22A உறுதிமொழி (Sec 77A Registration Act Anti-Fraud Declaration):
இந்தச் சொத்து அரசு நிலமோ, நீர்நிலையோ அல்லது ஆள்மாறாட்ட ஆவணமோ அல்ல. போலிப்பத்திரப் பதிவு தடுப்புச் சட்டம் பிரிவு 77A இன் கீழ் முழுமையான உண்மைத்தன்மையுடன் எழுதப்படுகிறது.

3. சொத்தின் நான்கு பக்க எல்லைகள் & அளவுகள் (Linear Boundary Dimensions):
- வடக்கு எல்லை: 40 அடி - இராமகிருஷ்ணன் மனை
- தெற்கு எல்லை: 40 அடி - 20 அடி அகலப் பாதை
- கிழக்கு எல்லை: 60 அடி - கந்தசாமி மனை
- மேற்கு எல்லை: 60 அடி - SF No. 142/3A நிலம்
மொத்தப் பரப்பளவு: 2400 சதுர அடி (5.5 சென்ட்)

4. எதிர்கால நஷ்ட ஈடு உத்திரவாதம் (Indemnity Guarantee):
எதிர்காலத்தில் இந்தச் சொத்தின் மீது மூலப்பத்திர வழக்குகளோ அல்லது சட்டச் சிக்கல்களோ ஏற்பட்டால், அதற்கான முழு இழப்பீட்டையும் எழுதுவித்துக் கொடுத்தவரே ஏற்கக் கடமைப்பட்டவர்.`;

      filled = filled + level2Clauses;
    }

    setCustomContent(filled);
  }, [selectedTemplate, sellerName, buyerName, propertyAddress, surveyNo, amount, executionDate, draftLevel, ecNumber]);

  const filteredTemplates = SAMPLE_TEMPLATES.filter(t => 
    t.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(customContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${selectedTemplate.title} - PDF Export</title>
            <style>
              @page {
                size: A4;
                margin: 20mm;
              }
              body {
                font-family: 'Times New Roman', Times, serif, 'Latha', 'Anek Tamil', sans-serif;
                font-size: 13pt;
                line-height: 1.8;
                color: #000000;
                padding: 10px;
              }
              .watermark {
                position: fixed;
                top: 40%;
                left: 10%;
                width: 80%;
                text-align: center;
                opacity: 0.05;
                font-size: 40pt;
                font-weight: bold;
                transform: rotate(-30deg);
                z-index: -1;
                text-transform: uppercase;
              }
              .header-seal {
                text-align: center;
                border-bottom: 2px solid #000;
                padding-bottom: 12px;
                margin-bottom: 25px;
              }
              .header-seal h1 {
                font-size: 16pt;
                margin: 0;
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              .header-seal p {
                font-size: 10pt;
                margin: 4px 0 0 0;
              }
              .deed-title {
                text-align: center;
                font-size: 15pt;
                font-weight: bold;
                text-decoration: underline;
                margin-bottom: 25px;
              }
              .content {
                white-space: pre-wrap;
                text-align: justify;
                word-wrap: break-word;
              }
              .signatures {
                margin-top: 60px;
                display: flex;
                justify-content: space-between;
                page-break-inside: avoid;
              }
              .sig-box {
                width: 45%;
                text-align: center;
              }
              .sig-line {
                border-top: 1px solid #000;
                margin-top: 50px;
                padding-top: 5px;
                font-weight: bold;
                font-size: 11pt;
              }
              .witness-box {
                margin-top: 40px;
                border-top: 1px dashed #666;
                padding-top: 15px;
                font-size: 11pt;
                page-break-inside: avoid;
              }
              .footer-writer {
                margin-top: 50px;
                border: 1px solid #000;
                padding: 10px;
                font-size: 10pt;
                text-align: center;
                page-break-inside: avoid;
              }
            </style>
          </head>
          <body>
            <div class="watermark">V.K. DOCUMENT WRITING CENTER</div>

            <div class="header-seal">
              <h1>தமிழ்நாடு அரசு ஆவணப் படிவம் (SAMPLE DEED FORMAT)</h1>
              <p>தயாரிப்பு & சரிபார்ப்பு: V.K. பத்திரப் பதிவு & இ-சேவை மையம், வாணியம்பாடி | L.No: A 3 VLR 2018</p>
            </div>

            <div class="deed-title">${selectedTemplate.title}</div>

            <div class="content">${customContent}</div>

            <div class="signatures">
              <div class="sig-box">
                <div class="sig-line">எழுதுவித்துக் கொடுத்தவர் (Seller/Executant)</div>
              </div>
              <div class="sig-box">
                <div class="sig-line">எழுதிக்கொண்டவர் (Buyer/Claimant)</div>
              </div>
            </div>

            <div class="witness-box">
              <strong>சாட்சிகள் (Witnesses):</strong>
              <br/><br/>
              1. கையொப்பம்: ___________________________ முகவரி: __________________________________________
              <br/><br/>
              2. கையொப்பம்: ___________________________ முகவரி: __________________________________________
            </div>

            <div class="footer-writer">
              <strong>பத்திர எழுத்தாளர் சான்றொப்பம்:</strong><br/>
              வரைவு செய்தவர்: <strong>பொன்.குமார் D.Pharm</strong> (அரசு உரிம எண்: A 3 VLR 2018)<br/>
              வாணியம்பாடி சார்பதிவாளர் அலுவலகம் அருகில் ☎ 8056413318
            </div>

            <script>
              window.onload = function() {
                window.print();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#002147] text-white rounded-2xl p-6 sm:p-8 shadow-xl border-b-4 border-[#D4AF37] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <span className="bg-[#D4AF37] text-[#002147] font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1 shadow">
            <FileCode className="w-3.5 h-3.5" />
            {t('மாதிரி பத்திர வடிவங்கள் (Deed Templates)', 'Deed Templates & Formatting Center')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t('மாதிரி பத்திரங்கள் வரைவு & PDF பதிவிறக்கம்', 'Deed Template Customization & PDF Export')}
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm">
            {t(
              'கிரைய பத்திரம், வாடகை ஒப்பந்தம் மற்றும் தான செட்டில்மென்ட் மாதிரிகளில் பெயர், தொகை மற்றும் முகவரிகளைப் பூர்த்தி செய்து உடனடியாக PDF ஆகப் பதிவிறக்கலாம்.',
              'Fill in party names, property details, and consideration amounts to generate and export custom PDF deeds.'
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Template Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          
          <div className="relative mb-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={t('மாதிரி பத்திரம் தேடுக...', 'Search templates...')}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
            />
          </div>

          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {t('மாதிரி வடிவங்கள்', 'Available Formats')} ({filteredTemplates.length})
          </h3>

          <div className="space-y-2">
            {filteredTemplates.map((tpl) => {
              const isSelected = tpl.id === selectedTemplate.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => {
                    setSelectedTemplate(tpl);
                    setEditMode(false);
                  }}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-[#002147] text-white border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/40'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${isSelected ? 'bg-[#D4AF37] text-[#002147]' : 'bg-slate-100 text-slate-700'}`}>
                    {tpl.category}
                  </span>
                  <h4 className={`font-extrabold text-sm mt-1 ${isSelected ? 'text-white' : 'text-[#002147]'}`}>
                    {tpl.title}
                  </h4>
                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                    {tpl.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Reader, Form Fields & Export Panel */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-xl space-y-5">
          
          {/* Header Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-[#002147]">{selectedTemplate.title}</h3>
              <p className="text-xs text-slate-500">{selectedTemplate.description}</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold text-xs transition-colors ${
                  editMode
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <Edit3 className="w-4 h-4 text-[#002147]" />
                <span>{editMode ? t('பார்வை பயன்முறை', 'View Mode') : t('நேரடி உரை திருத்தம்', 'Edit Direct Text')}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t('நகலெடுக்கப்பட்டது!', 'Copied!') : t('நகலெடு', 'Copy Text')}</span>
              </button>

              <button
                onClick={handleExportPDF}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#002147] hover:bg-[#001733] text-[#D4AF37] font-extrabold text-xs shadow transition-all hover:scale-[1.02]"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('PDF அச்சிடு / பதிவிறக்கு', 'Export / Print PDF')}</span>
              </button>
            </div>
          </div>

          {/* Draft Level Switcher */}
          <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase">
                LEVEL 2
              </span>
              <span className="text-xs font-bold text-slate-200">
                {t('வரைவு மாதிரித் தரம் (Deed Draft Quality):', 'Deed Clause Quality:')}
              </span>
            </div>

            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                type="button"
                onClick={() => setDraftLevel('level1')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  draftLevel === 'level1'
                    ? 'bg-slate-100 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('நிலை 1 (அடிப்படை மாதிரி)', 'Level 1 (Standard)')}
              </button>
              <button
                type="button"
                onClick={() => setDraftLevel('level2')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                  draftLevel === 'level2'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>{t('நிலை 2 (சட்டப் பிரிவுகளுடன்)', 'Level 2 (Legal Clauses)')}</span>
              </button>
            </div>
          </div>

          {/* Quick Field Auto-Filler Form */}
          <div className="bg-[#002147]/5 p-4 rounded-xl border border-[#002147]/10 space-y-3">
            <h4 className="text-xs font-black uppercase text-[#002147] tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              {t('மாதிரி விவரங்களை மாற்றி அமைக்க (Quick Field Fill)', 'Quick Fill Document Variables')}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#002147]" /> {t('விற்பனையாளர் / வழங்குபவர்:', 'Executant / Seller Name:')}
                </label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#002147]" /> {t('வாங்குபவர் / பெறுபவர்:', 'Claimant / Buyer Name:')}
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#002147]" /> {t('சொத்து முகவரி / தாலுகா:', 'Property Address / Location:')}
                </label>
                <input
                  type="text"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1 flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-[#002147]" /> {t('கிரையத் தொகை:', 'Consideration Amount:')}
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Template Document Display / Direct Editor */}
          {editMode ? (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                {t('நேரடி உரை எடிட்டர் (Direct Document Editor):', 'Editable Document Text:')}
              </label>
              <textarea
                value={customContent}
                onChange={(e) => setCustomContent(e.target.value)}
                rows={16}
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 font-mono text-xs text-slate-900 leading-relaxed focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              />
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-900 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
              {customContent}
            </div>
          )}

          <div className="p-3 rounded-lg bg-amber-50 border border-[#D4AF37]/50 text-xs text-amber-900 font-medium flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#002147] flex-shrink-0 mt-0.5" />
            <span>
              {t(
                'சட்டப்பூர்வ குறிப்பு: இந்த மாதிரி வடிவம் பொதுவான தகவலுக்கு மட்டுமே. உங்கள் சொத்தின் எல்லையளவுகள் (Boundaries) மற்றும் மூலப்பத்திர எண்களுடன் அசல் பத்திரத்தை சட்டப் பிழையின்றி வரைவு செய்ய எங்களது அரசு உரிமம் பெற்ற ஆவண எழுத்தாளரை நேரடியாக அணுகலாம்.',
                'Legal Note: This document draft is for reference purposes. For execution and registration at Sub-Registrar offices, contact our licensed document writer.'
              )}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
