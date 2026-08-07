import { FAQItem } from '../types';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq_1',
    category: 'registration',
    categoryTa: 'பத்திரப் பதிவு நடைமுறைகள்',
    questionTa: 'பத்திரப் பதிவு செய்ய சார்பதிவாளர் அலுவலகத்திற்கு யார் யார் நேரில் வர வேண்டும்?',
    questionEn: 'Who must appear in person at the Sub-Registrar Office for property registration?',
    answerTa: 'சொத்தை விற்பவர் (Executant), சொத்தை வாங்குபவர் (Claimant) மற்றும் இருவருக்குமான அடையாளச் சான்றுகளுடன் (ஆதார்) 2 சாட்சிகள் (Identifier Witnesses) நேரில் ஆஜராக வேண்டும். அனைவரும் அசல் ஆதார் அட்டை மற்றும் புகைப்படங்கள் கொண்டு வர வேண்டும்.',
    answerEn: 'The Seller (Executant), Buyer (Claimant), and 2 Identifier Witnesses with valid Aadhaar IDs must appear in person at the Sub-Registrar Office with original ID proofs and photos.',
    tags: ['பதிவு', 'சாட்சிகள்', 'ஆதார்', 'Registration', 'Witnesses']
  },
  {
    id: 'faq_2',
    category: 'stamp_duty',
    categoryTa: 'முத்திரைக் கட்டணம் & வழிகாட்டி மதிப்பு',
    questionTa: 'தமிழ்நாட்டில் கிரைய பத்திரத்திற்கு முத்திரைக் கட்டணம் மற்றும் பதிவுக் கட்டணம் எவ்வளவு?',
    questionEn: 'What is the stamp duty and registration fee for a Sale Deed in Tamil Nadu?',
    answerTa: 'தமிழ்நாட்டில் சொத்து விற்பனைப் பத்திரத்திற்கு (Sale Deed) சந்தை மதிப்பு அல்லது வழிகாட்டி மதிப்பில் 7% முத்திரைக் கட்டணமும் (Stamp Duty) மற்றும் 2% பதிவுக் கட்டணமும் (Registration Fee) ஆக மொத்தம் 9% அரசுக்கு செலுத்த வேண்டும்.',
    answerEn: 'For a Sale Deed in Tamil Nadu, the total government fee is 9% of the property value (7% Stamp Duty + 2% Registration Fee based on market value or guideline value, whichever is higher).',
    tags: ['முத்திரைக் கட்டணம்', 'வழிகாட்டி மதிப்பு', '7%', 'Stamp Duty', 'Guideline Value']
  },
  {
    id: 'faq_3',
    category: 'ec',
    categoryTa: 'வில்லங்க சான்றிதழ் (EC)',
    questionTa: 'வில்லங்க சான்றிதழ் (EC) என்றால் என்ன? அதை எங்கு பெறலாம்?',
    questionEn: 'What is an Encumbrance Certificate (EC) and where can I get it?',
    answerTa: 'ஒரு சொத்தின் மீது முந்தைய காலங்களில் செய்யப்பட்ட பத்திரப் பதிவுகள், வங்கி அடமானங்கள், நீதிமன்ற உத்தரவுகள் அல்லது வழக்குகள் உள்ளதா என்பதைத் தெரிவிக்கும் அரசு ஆவணமே வில்லங்க சான்றிதழ் (EC) ஆகும். இதை TN Reginet இணையதளம் வழியாகவோ அல்லது எங்கள் இ-சேவை மையத்தில் 10 நிமிடங்களில் பெறலாம்.',
    answerEn: 'An Encumbrance Certificate (EC) verifies whether a property is free from legal liabilities, mortgages, or litigation. It covers all registered transactions over a given timeframe and can be issued instantly at our E-Sevai counter or online.',
    tags: ['வில்லங்கம்', 'EC', 'Encumbrance Certificate', 'TN Reginet']
  },
  {
    id: 'faq_4',
    category: 'laws_rules',
    categoryTa: 'பிரிவு 22A & 77A சட்ட விதிகள்',
    questionTa: 'பிரிவு 22A தடை செய்யப்பட்ட நிலங்கள் என்றால் என்ன? அதை எவ்வாறு அறிவது?',
    questionEn: 'What are Section 22A restricted lands and how can I check them?',
    answerTa: '1908 பதிவுச் சட்டப் பிரிவு 22Aன்படி, அரசு நிலங்கள், கோவில்/அறநிலையத்துறை நிலங்கள், வஃபு வாரிய நிலங்கள், பூமிதான நிலங்கள் மற்றும் அங்கீகரிக்கப்படாத மனைப்பிரிவுகள் (Unapproved Layouts) பதிவு செய்யத் தடை செய்யப்பட்டுள்ளது. பத்திரப் பதிவுக்கு முன் இத்தகைய தடை இல்லை என்பதை வில்லங்கம் மற்றும் TN Reginet போர்ட்டலில் சரிபார்க்க வேண்டும்.',
    answerEn: 'Under Section 22A of the Registration Act 1908, Sub-Registrars are strictly prohibited from registering government lands, temple/HR&CE properties, Wakf board lands, and unapproved plots. You should verify status before paying advance.',
    tags: ['பிரிவு 22A', 'தடை நிலங்கள்', 'Section 22A', 'Prohibited Land']
  },
  {
    id: 'faq_5',
    category: 'patta',
    categoryTa: 'பட்டா & சிட்டா பெயர் மாற்றம்',
    questionTa: 'பத்திரப் பதிவு முடிந்தவுடன் பட்டா பெயர் மாற்றம் செய்ய எவ்வளவு காலம் ஆகும்?',
    questionEn: 'How long does Patta transfer take after registering a property?',
    answerTa: 'சார்பதிவாளர் அலுவலகத்திலேயே தானியங்கி பட்டா பெயர் மாற்றக் கோரிக்கை (Automatic Patta Transfer) பதிவுத்துறையால் வருவாய்த்துறையான கிராம நிர்வாக அலுவலர் (VAO) மற்றும் வருவாய் ஆய்வாளருக்கு (RI) அனுப்பப்படும். உட்பிரிவு இல்லாத நிலங்களுக்கு 15 முதல் 30 நாட்களுக்குள் கணினி பட்டா பெயர் மாற்றம் முடிவடையும்.',
    answerEn: 'Automatic Patta Transfer requests are initiated electronically from the Sub-Registrar office to the Revenue Department (VAO/Tahsildar). For non-subdivision land, Patta transfer is usually processed within 15 to 30 days.',
    tags: ['பட்டா', 'Patta Transfer', 'VAO', 'சிட்டா']
  },
  {
    id: 'faq_6',
    category: 'writer_rights',
    categoryTa: 'பத்திர எழுத்தாளர் வழிகாட்டல்',
    questionTa: 'அரசு அங்கீகாரம் பெற்ற பத்திர எழுத்தாளரின் முக்கிய பங்கு என்ன?',
    questionEn: 'What is the role of a Government Licensed Document Writer?',
    answerTa: 'அரசு உரிமம் பெற்ற பத்திர எழுத்தாளர் (Licensed Document Writer - L.No: A 3 VLR 2018), சொத்தின் மூல ஆவணங்களை ஆய்வு செய்து, சட்டப்பூர்வ பிழைகள் இன்றி பத்திரத்தின் வரைவை உருவாக்கி, சரியான முத்திரைக் கட்டணம் கணக்கிட்டு, சார்பதிவாளர் அலுவலகத்தில் தடையின்றி பதிவு செய்து கொடுக்கப் சட்டப்பூர்வ அதிகாரம் பெற்றவர் ஆவார்.',
    answerEn: 'A Government Licensed Document Writer verifies title history, drafts legally sound deeds without defects, accurately calculates stamp duty/registration fees, and facilitates seamless registration at the Sub-Registrar Office.',
    tags: ['பத்திர எழுத்தாளர்', 'Licensed Document Writer', 'பொன்.குமார்', 'L.No']
  },
  {
    id: 'faq_7',
    category: 'settlement_duty',
    categoryTa: 'முத்திரைக் கட்டணம் & வழிகாட்டி மதிப்பு',
    questionTa: 'குடும்ப உறுப்பினர்களுக்குள் தான செட்டில்மென்ட் பத்திரத்திற்கு முத்திரைக் கட்டணம் எவ்வளவு?',
    questionEn: 'What is the stamp duty for a Settlement Deed among family members?',
    answerTa: 'இரத்த சொந்தங்களுக்கு இடையே (தந்தை, தாய், கணவன், மனைவி, மகன், மகள், பேரன், பேத்தி, சகோதரன், சகோதரி) செய்யப்படும் தான செட்டில்மென்ட் பத்திரத்திற்கு சந்தை மதிப்பில் 1% முத்திரைக் கட்டணமும் (அதிகபட்சம் ₹ 40,000) + 1% பதிவுக் கட்டணமும் (அதிகபட்சம் ₹ 10,000) செலுத்தினால் போதுமானது.',
    answerEn: 'For Settlement Deeds between specified blood relatives, government stamp duty is capped at 1% (maximum ₹ 40,000) plus 1% registration fee (maximum ₹ 10,000).',
    tags: ['தான பத்திரம்', 'Settlement Deed', '1% Cap', 'குடும்பம்']
  },
  {
    id: 'faq_8',
    category: 'laws_rules',
    categoryTa: 'பிரிவு 22A & 77A சட்ட விதிகள்',
    questionTa: 'போலி பத்திரப் பதிவு செய்யப்பட்டிருந்தால் பிரிவு 77A மூலம் ரத்து செய்ய முடியுமா?',
    questionEn: 'Can fraudulent property registrations be cancelled under Section 77A?',
    answerTa: 'ஆம். 1908 பதிவுச் சட்டத்தில் சேர்க்கப்பட்ட பிரிவு 77Aன்படி, ஆள்மாறாட்டம், போலி ஆவணங்கள் தயாரித்து முறைகேடாகப் பதிவு செய்யப்பட்ட பத்திரங்களை மாவட்ட பதிவாளர் (District Registrar) விசாரணை நடத்தி நேரடியாக ரத்து செய்ய அதிகாரம் அளிக்கப்பட்டுள்ளது.',
    answerEn: 'Yes. Section 77A empowers District Registrars to investigate complaints regarding fraudulent or impersonated registrations and issue cancellation orders directly without lengthy civil litigation.',
    tags: ['பிரிவு 77A', 'போலி பத்திரம் ரத்து', 'Section 77A', 'District Registrar']
  }
];
