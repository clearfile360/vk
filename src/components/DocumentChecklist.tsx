import React, { useState } from 'react';
import { DOCUMENT_CHECKLISTS } from '../data/checklistData';
import { DocumentChecklistCategory, RequiredDocumentItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  CheckSquare, 
  Square, 
  FileCheck, 
  Printer, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  Download
} from 'lucide-react';

export const DocumentChecklist: React.FC = () => {
  const { language, t } = useLanguage();
  const [verificationLevel, setVerificationLevel] = useState<'level1' | 'level2'>('level2');
  const [selectedCategory, setSelectedCategory] = useState<DocumentChecklistCategory>(DOCUMENT_CHECKLISTS[0]);
  const [checkedDocIds, setCheckedDocIds] = useState<Record<string, boolean>>({});
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setCheckedDocIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isChecked = (id: string) => !!checkedDocIds[id];

  // Level 2 Additional Audit Checks
  const level2AuditItems = [
    {
      id: 'l2_1',
      titleTa: '30 ஆண்டு மூல பத்திர சங்கிலித் தொடர் (Parent Title Lineage Audit 30-40 Yrs)',
      titleEn: 'Parent Title Lineage Audit (30-40 Years Trace)',
      descTa: 'முந்தைய 30 வருடங்களின் அனைத்து முந்தைய கிரைய/செட்டில்மென்ட் பத்திரங்களின் நகல்களையும் அவற்றின் சார்பதிவாளர் எண்களையும் ஆய்வு செய்தல்.',
      descEn: 'Tracing previous title deeds over 30-40 years to guarantee unbroken chain of title.',
      mandatory: true
    },
    {
      id: 'l2_2',
      titleTa: 'பிரிவு 22A தடை செய்யப்பட்ட நிலப் பட்டியல் ஆய்வு (Sec 22A Prohibited Land Audit)',
      titleEn: 'Sec 22A Prohibited Land & Govt Reservation Audit',
      descTa: 'சொத்து அரசு நிலம், கோவில் நிலம் (HR&CE), வக்ஃப் வாரியம் அல்லது நீர்நிலை நிலம் அல்ல என்பதை சார்பதிவாளர் போர்ட்டலில் சரிபார்த்தல்.',
      descEn: 'Verifying that property is not tagged as Govt land, HR&CE temple property, Waqf board, or water body.',
      mandatory: true
    },
    {
      id: 'l2_3',
      titleTa: 'FMB வரைபட எல்லை & அக்கம் பக்கம் அளவீடு (FMB Field Measurement Audit)',
      titleEn: 'FMB Sketch & Boundary Measurement Audit',
      descTa: 'கிராம நில அளவை வரைபடத்தின்படி (FMB Sketch) நான்கு பக்க எல்லைகளும், முந்தைய பத்திரத்தின் சதுர அடிகளும் சரியாகப் பொருந்துகிறதா என ஆய்வு செய்தல்.',
      descEn: 'Cross-checking North/South/East/West linear boundary dimensions against Village FMB survey map.',
      mandatory: true
    },
    {
      id: 'l2_4',
      titleTa: 'வழிகாட்டி மதிப்பு & பிரிவு 47A அபராதக் கட்டுப்பாடு (Guideline Value Mismatch Check)',
      titleEn: 'Guideline Value Mismatch & Sec 47A Risk Audit',
      descTa: 'அரசு வழிகாட்டி மதிப்பீட்டை விட குறைவாக எழுதி பிரிவு 47A இன் கீழ் சொத்து முடக்கம் செய்யப்படுவதைத் தவிர்க்கும் கணக்கீடு.',
      descEn: 'Auditing consideration price against TNREGINET guideline value to eliminate Section 47A valuation penalty risks.',
      mandatory: true
    },
    {
      id: 'l2_5',
      titleTa: 'வாரிசு மரபியல் சான்று & பிரிவு 77A போலிப் பத்திரத் தடிப்பு (Sec 77A Anti-Fraud Audit)',
      titleEn: 'Genealogy Verification & Sec 77A Anti-Fraud Verification',
      descTa: 'ஆள்மாறாட்டம் அல்லது போலிப் பத்திரப் பதிவைத் தவிர்க்க பிரிவு 77A விதிகளின் கீழ் அசல் நபரின் ஆதார் மற்றும் வாரிசுச் சான்றிதழ் சரிபார்ப்பு.',
      descEn: 'Strict identity audit under Section 77A Registration Act to prevent impersonation or fraudulent title transfers.',
      mandatory: true
    }
  ];

  const currentDocs = selectedCategory.documents;
  const activeDocList = verificationLevel === 'level1' ? currentDocs : [...currentDocs, ...level2AuditItems.map(item => ({
    id: item.id,
    titleTa: item.titleTa,
    titleEn: item.titleEn,
    descriptionTa: item.descTa,
    descriptionEn: item.descEn,
    isMandatory: item.mandatory,
    isLevel2Advanced: true,
    issuingAuthorityTa: 'சார்பதிவாளர் & நில வருவாய்த்துறை நிலை 2 ஆய்வு',
    issuingAuthorityEn: 'Sub-Registrar & Land Revenue Level 2 Audit',
    howToGetTa: 'எங்கள் V.K. ஆவண மையத்தில் மூலப்பத்திரங்களை நேரடியாக சமர்ப்பித்து இந்த ஆய்வை இலவசமாகப் பெறலாம்.',
    howToGetEn: 'Submit your parent documents at our V.K. center for free Level 2 legal title audit.'
  }))];

  const totalDocs = activeDocList.length;
  const readyCount = activeDocList.filter(doc => checkedDocIds[doc.id]).length;
  const progressPercent = totalDocs > 0 ? Math.round((readyCount / totalDocs) * 100) : 0;

  const handlePrintChecklist = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const docTitle = language === 'ta' ? selectedCategory.titleTa : selectedCategory.titleEn;
      const docListHtml = currentDocs.map((doc, idx) => {
        const isReady = checkedDocIds[doc.id];
        const title = language === 'ta' ? doc.titleTa : doc.titleEn;
        const desc = language === 'ta' ? doc.descriptionTa : doc.descriptionEn;
        const auth = language === 'ta' ? doc.issuingAuthorityTa : doc.issuingAuthorityEn;
        
        return `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; width: 40px; text-align: center;">${idx + 1}</td>
            <td style="padding: 10px;">
              <strong style="color: #002147; font-size: 14px;">${title}</strong>
              ${doc.isMandatory ? '<span style="color: #c53030; font-size: 11px; margin-left: 8px; font-weight: bold;">[அவசியம் / Mandatory]</span>' : ''}
              <p style="margin: 4px 0 0 0; color: #4a5568; font-size: 12px;">${desc}</p>
              <div style="font-size: 11px; color: #718096; margin-top: 4px;">வழங்கும் துறை: ${auth}</div>
            </td>
            <td style="padding: 10px; text-align: center; width: 120px;">
              <span style="display: inline-block; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 12px; ${isReady ? 'background-color: #c6f6d5; color: #22543d;' : 'background-color: #edf2f7; color: #718096;'}">
                ${isReady ? (language === 'ta' ? '✓ தயார்' : '✓ Ready') : (language === 'ta' ? '☐ நிலுவை' : '☐ Pending')}
              </span>
            </td>
          </tr>
        `;
      }).join('');

      printWindow.document.write(`
        <html>
          <head>
            <title>${docTitle} - ஆவண பட்டியல்</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #1a202c; }
              .header { border-bottom: 3px solid #D4AF37; padding-bottom: 15px; margin-bottom: 20px; }
              h1 { color: #002147; font-size: 20px; margin: 0 0 5px 0; }
              .sub { color: #4a5568; font-size: 13px; }
              table { width: 100%; border-collapse: collapse; margin-top: 15px; }
              th { background-color: #002147; color: #ffffff; padding: 10px; text-align: left; font-size: 13px; }
              .footer { margin-top: 40px; border-top: 1px solid #cbd5e0; pt: 15px; font-size: 11px; color: #718096; display: flex; justify-content: space-between; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>V.K. பத்திரப் பதிவு & இ-சேவை மையம், வாணியம்பாடி</h1>
              <div class="sub">பத்திர எழுத்தாளர்: பொன்.குமார் D.Pharm (L.No: A 3 VLR 2018) | ☎ 8056413318</div>
              <h2 style="font-size: 16px; color: #002147; margin-top: 15px;">📋 ${docTitle} - சரிபார்ப்புப் பட்டியல் (Checklist)</h2>
            </div>

            <table>
              <thead>
                <tr>
                  <th style="width: 40px; text-align: center;">எண்</th>
                  <th>தேவையான அசல் ஆவணங்கள் (Required Documents)</th>
                  <th style="width: 120px; text-align: center;">நிலை (Status)</th>
                </tr>
              </thead>
              <tbody>
                ${docListHtml}
              </tbody>
            </table>

            <div style="margin-top: 25px; padding: 12px; background-color: #f7fafc; border-left: 4px solid #D4AF37; font-size: 12px;">
              <strong>குறிப்பு:</strong> சார்பதிவாளர் அலுவலகப் பதிவின் போது மேற்கண்ட அசல் ஆவணங்களுடன் வாங்குபவர், விற்பவர் மற்றும் 2 சாட்சிகள் ஆதார் அட்டை நகல்களுடன் நேரில் ஆஜராக வேண்டும்.
            </div>

            <div class="footer" style="margin-top: 40px;">
              <div>அச்சிடப்பட்ட தேதி: ${new Date().toLocaleDateString('ta-IN')}</div>
              <div>V.K. Document Writing & E-Sevai Center</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#002147] text-white rounded-2xl p-6 sm:p-8 shadow-xl border-b-4 border-[#D4AF37] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <span className="bg-[#D4AF37] text-[#002147] font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1 shadow">
            <FileCheck className="w-3.5 h-3.5" />
            {t('அசல் ஆவணங்கள் சரிபார்ப்பு', 'Original Document Verification Checklist')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {t('பத்திரப் பதிவு ஆவணப் பட்டியல் (Dynamic Checklist)', 'Dynamic Document Checklist for Registration')}
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm">
            {t(
              'பதிவு செய்ய விரும்பும் பத்திர வகையைத் தேர்ந்தெடுத்து, தேவைப்படும் அசல் ஆவணங்களின் பட்டியலைச் சரிபார்க்கவும். தயார்செய்த ஆவணங்களைக் குறிக்கலாம்.',
              'Select your property deed type to inspect required original documents. Tick collected items to track your readiness.'
            )}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Category Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {t('பத்திர / சேவை வகை', 'Deed & Service Category')}
          </h3>

          <div className="space-y-2">
            {DOCUMENT_CHECKLISTS.map((category) => {
              const isSelected = category.id === selectedCategory.id;
              const title = language === 'ta' ? category.titleTa : category.titleEn;
              const desc = language === 'ta' ? category.descriptionTa : category.descriptionEn;

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category);
                    setExpandedDocId(null);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#002147] text-white border-[#D4AF37] shadow-lg ring-2 ring-[#D4AF37]/50'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-[#D4AF37]/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-[#002147]'}`}>
                      {title}
                    </h4>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${isSelected ? 'bg-[#D4AF37] text-[#002147]' : 'bg-slate-100 text-slate-600'}`}>
                      {category.documents.length} {t('ஆவணங்கள்', 'Docs')}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                    {desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-[#D4AF37]/40 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#002147]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('பத்திர எழுத்தாளர் ஆலோசனை', 'Document Writer Advice')}</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {t(
                'ஆவணங்களில் பெயர், கதவு எண் அல்லது சர்வே எண்களில் சிறு பிழை இருப்பினும் சார்பதிவாளர் அலுவலகத்தில் பதிவு நிறுத்தப்படலாம். எங்களது அலுவலகத்தில் இலவச ஆவணப் பரிசீலனை பெறலாம்.',
                'Discrepancies in names, door numbers, or survey bounds can halt registration. Visit our office for a free pre-registration audit.'
              )}
            </p>
          </div>
        </div>

        {/* Right Active Checklist & Tracker */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-xl space-y-6">
          
          {/* Active Checklist Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h3 className="text-xl font-black text-[#002147]">
                {language === 'ta' ? selectedCategory.titleTa : selectedCategory.titleEn}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'ta' ? selectedCategory.descriptionTa : selectedCategory.descriptionEn}
              </p>
            </div>

            <button
              onClick={handlePrintChecklist}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002147] hover:bg-[#001733] text-[#D4AF37] font-extrabold text-xs shadow transition-all hover:scale-[1.02] self-start sm:self-auto"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('பட்டியலை அச்சிடு / Print', 'Print / PDF Checklist')}</span>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="bg-[#002147]/5 p-4 rounded-xl border border-[#002147]/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#002147]">
              <span>
                {t('ஆவணங்கள் தயார் நிலை', 'Preparedness Progress')}: {readyCount} / {totalDocs} {t('ஆவணங்கள் சேகரிக்கப்பட்டன', 'Documents ready')}
              </span>
              <span className="text-emerald-700 font-extrabold text-sm">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-emerald-500 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Level 1 vs Level 2 Verification Mode Toggle */}
          <div className="bg-slate-900 text-white p-4 rounded-xl border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-500 text-slate-950 font-black text-xs">
                LEVEL 2
              </span>
              <div>
                <h4 className="font-extrabold text-sm text-white">
                  {t('சரிபார்ப்புத் தரம் (Verification Depth Level)', 'Document Verification Depth Level')}
                </h4>
                <p className="text-xs text-slate-300">
                  {t('நிலை 2 ஆழ்ந்த சட்டப் பரிசீலனை மூலம் 100% பாதுகாப்பான பத்திரம் வரைவு செய்யுங்கள்.', 'Switch to Level 2 for deep parent title lineage & Sec 77A anti-fraud audit.')}
                </p>
              </div>
            </div>

            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={() => setVerificationLevel('level1')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  verificationLevel === 'level1'
                    ? 'bg-slate-100 text-slate-900 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('நிலை 1 (அடிப்படை)', 'Level 1 (Basic)')}
              </button>

              <button
                type="button"
                onClick={() => setVerificationLevel('level2')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  verificationLevel === 'level2'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>{t('நிலை 2 (ஆழ்ந்த சட்ட ஆய்வு)', 'Level 2 (Deep Legal Audit)')}</span>
              </button>
            </div>
          </div>

          {/* Document Items List */}
          <div className="space-y-3">
            {activeDocList.map((doc, index) => {
              const checked = isChecked(doc.id);
              const isExpanded = expandedDocId === doc.id;
              const title = language === 'ta' ? doc.titleTa : doc.titleEn;
              const desc = language === 'ta' ? doc.descriptionTa : doc.descriptionEn;
              const auth = language === 'ta' ? doc.issuingAuthorityTa : doc.issuingAuthorityEn;
              const howTo = language === 'ta' ? doc.howToGetTa : doc.howToGetEn;

              return (
                <div 
                  key={doc.id}
                  className={`rounded-xl border transition-all ${
                    doc.isLevel2Advanced
                      ? checked 
                        ? 'bg-amber-50/80 border-amber-400' 
                        : 'bg-amber-50/20 border-amber-300 hover:border-amber-400'
                      : checked 
                        ? 'bg-emerald-50/50 border-emerald-300' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="p-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 cursor-pointer flex-1" onClick={() => toggleCheck(doc.id)}>
                      <button className="mt-0.5 text-emerald-600 focus:outline-none">
                        {checked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-extrabold text-[#002147]">#{index + 1}</span>
                          <h4 className={`text-sm font-bold ${checked ? 'line-through text-slate-500' : 'text-[#002147]'}`}>
                            {title}
                          </h4>
                          {doc.isLevel2Advanced && (
                            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
                              LEVEL 2 AUDIT
                            </span>
                          )}
                          {doc.isMandatory ? (
                            <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-2 py-0.5 rounded">
                              {t('அவசியம்', 'Mandatory')}
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                              {t('விருப்பத்தேர்வு', 'Optional')}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#002147] hover:bg-slate-100 transition-colors"
                      title={t('மேலும் விவரங்கள்', 'More details')}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Expanded Help Box */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-100 text-xs space-y-2 bg-slate-50/80 rounded-b-xl">
                      <div className="flex items-start gap-2 text-slate-700">
                        <Info className="w-4 h-4 text-[#002147] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#002147]">{t('வழங்கும் துறை / ஆணையம்:', 'Issuing Authority:')} </strong>
                          <span>{auth}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-slate-700">
                        <HelpCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#002147]">{t('பெற எவ்வாறு அணுகுவது?:', 'How to Obtain?:')} </strong>
                          <span>{howTo}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>💡 {t('குறிப்பு: சந்தேகங்களுக்கு எங்களது AI உதவியாளரிடம் கேட்கலாம்.', 'Tip: Ask our AI assistant if you have doubts about document formats.')}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
