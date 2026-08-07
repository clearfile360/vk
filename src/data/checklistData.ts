import { DocumentChecklistCategory } from '../types';

export const DOCUMENT_CHECKLISTS: DocumentChecklistCategory[] = [
  {
    id: 'sale_deed',
    titleTa: 'கிரைய பத்திரம் (Sale Deed Registration)',
    titleEn: 'Sale Deed Registration',
    descriptionTa: 'சொத்து விற்பனை மற்றும் வாங்கலுக்கு தேவையான அசல் சான்றிதழ்கள் பட்டியல்.',
    descriptionEn: 'Essential original documents required for buying and selling property.',
    iconName: 'FileText',
    documents: [
      {
        id: 'sd_1',
        titleTa: 'மூல பத்திரம் (Parent Document / Previous Title Deed)',
        titleEn: 'Parent Document / Previous Title Deed',
        descriptionTa: 'விற்பனையாளர் பெயர் வரக் காரணமான அசல் முந்தைய பத்திரம் (கிரையம், செட்டில்மென்ட் அல்லது பாகப்பிரிவினை).',
        descriptionEn: 'Original title deed showing how the current seller acquired ownership.',
        isMandatory: true,
        issuingAuthorityTa: 'சார்பதிவாளர் அலுவலகம் (Sub-Registrar Office)',
        issuingAuthorityEn: 'Sub-Registrar Office',
        howToGetTa: 'விற்பனையாளரிடம் உள்ள அசல் ஆவணத்தைப் பெறவும். நகல் மட்டும் இருந்தால் சான்றளிக்கப்பட்ட நகல் (Certified Copy) விண்ணப்பிக்கவும்.',
        howToGetEn: 'Obtain original from seller. If lost, apply for a Certified Copy (CC) from Sub-Registrar.'
      },
      {
        id: 'sd_2',
        titleTa: 'வில்லங்க சான்றிதழ் - EC (Encumbrance Certificate - 30 Years)',
        titleEn: 'Encumbrance Certificate (EC - Minimum 30 Years)',
        descriptionTa: 'குறைந்தது கடந்த 30 ஆண்டுகளுக்கான வில்லங்க சான்றிதழ். இதில் பிற அடமானம் அல்லது வழக்குகள் இல்லை என்பதை உறுதி செய்ய வேண்டும்.',
        descriptionEn: 'EC covering at least 30 years to verify no prior mortgages, liens or legal disputes.',
        isMandatory: true,
        issuingAuthorityTa: 'TN Reginet இ-சேவை வலைத்தளம் / சார்பதிவாளர்',
        issuingAuthorityEn: 'TN Reginet Portal / Sub-Registrar Office',
        howToGetTa: 'TN Reginet இணையதளம் வாயிலாக ஆன்லைனில் அல்லது எங்கள் இ-சேவை மையத்தில் 10 நிமிடங்களில் பெறலாம்.',
        howToGetEn: 'Available online via TN Reginet portal or at our E-Sevai counter within 10 minutes.'
      },
      {
        id: 'sd_3',
        titleTa: 'கணினி பட்டா & சிட்டா (Computer Patta & Chitta)',
        titleEn: 'Computerized Patta & Chitta Extract',
        descriptionTa: 'விற்பனையாளரின் பெயரில் சமீபத்திய வருவாய்த்துறை கணினி பட்டா நகல்.',
        descriptionEn: 'Latest Revenue Department Patta copy issued in the current owner\'s name.',
        isMandatory: true,
        issuingAuthorityTa: 'தமிழ்நாடு நில வருவாய்த்துறை (Anytaluk portal)',
        issuingAuthorityEn: 'TN Land Revenue Department',
        howToGetTa: 'எங்கள் மையத்தில் சர்வே எண் / பட்டா எண் வழங்கி ஆன்லைன் சிட்டா பதிவிறக்கம் செய்து தரப்படும்.',
        howToGetEn: 'Downloadable online with Survey Number or Patta Number at our E-Sevai office.'
      },
      {
        id: 'sd_4',
        titleTa: 'வாங்குபவர் & விற்பவர் ஆதார் அட்டைகள் (Aadhaar Cards)',
        titleEn: 'Aadhaar Cards of Buyer & Seller',
        descriptionTa: 'இரு தரப்பினரின் அசல் ஆதார் அட்டை மற்றும் நகல்கள்.',
        descriptionEn: 'Original Aadhaar cards along with photocopies for buyer and seller.',
        isMandatory: true,
        issuingAuthorityTa: 'UIDAI',
        issuingAuthorityEn: 'UIDAI',
        howToGetTa: 'அசல் ஆதார் அட்டை கட்டாயம். பயோமெட்ரிக்/OTP சரிபார்ப்புக்கு மொபைல் எண் இணைப்பு இருக்க வேண்டும்.',
        howToGetEn: 'Must produce original Aadhaar cards. Linked mobile number recommended for OTP verification.'
      },
      {
        id: 'sd_5',
        titleTa: 'பான் அட்டை (PAN Card) / படிவம் 60 (Form 60)',
        titleEn: 'PAN Card / Form 60',
        descriptionTa: '₹ 5 லட்சத்திற்கு மேல் மதிப்பீடு உள்ள சொத்து பரிவர்த்தனைக்கு பான் அட்டை கட்டாயம்.',
        descriptionEn: 'Mandatory for property transactions valued over ₹ 5 Lakhs.',
        isMandatory: true,
        issuingAuthorityTa: 'வருமான வரித்துறை (Income Tax Department)',
        issuingAuthorityEn: 'Income Tax Department',
        howToGetTa: 'பான் அட்டை இல்லாத பட்சத்தில் படிவம் 60 (Form 60) பூர்த்தி செய்து வழங்க வேண்டும்.',
        howToGetEn: 'If PAN is not available, Form 60 needs to be filled and executed with ID proof.'
      },
      {
        id: 'sd_6',
        titleTa: 'சொத்து வரி / வீட்டு வரி ரசீது (Property Tax Receipt)',
        titleEn: 'Latest Property Tax / Building Tax Receipt',
        descriptionTa: 'நகராட்சி / கிராம ஊராட்சியில் செலுத்திய சமீபத்திய சொத்து வரி ரசீது (கட்டிடம் உள்ள நிலங்களுக்கு).',
        descriptionEn: 'Tax paid receipt from Municipality / Town Panchayat for constructed properties.',
        isMandatory: false,
        issuingAuthorityTa: 'உள்ளாட்சி மன்றம் / நகராட்சி (Municipality/Panchayat)',
        issuingAuthorityEn: 'Local Municipality / Town Panchayat',
        howToGetTa: 'சம்பந்தப்பட்ட நகராட்சி அலுவலகம் அல்லது ஆன்லைன் உள்ளாட்சி போர்ட்டலில் வரி செலுத்தி ரசீது பெறலாம்.',
        howToGetEn: 'Pay taxes online or directly at the local municipal revenue office.'
      },
      {
        id: 'sd_7',
        titleTa: 'சாட்சி கையொப்பமிடுபவர்கள் 2 பேர் (Two Identifier Witnesses)',
        titleEn: 'Two Identification Witnesses with ID Proofs',
        descriptionTa: 'பதிவின் போது சாட்சியாக கையொப்பமிட ஆதார் அட்டையுடன் 2 நபர்கள் நேரில் வர வேண்டும்.',
        descriptionEn: 'Two witnesses must appear in person at SRO with original Aadhaar cards.',
        isMandatory: true,
        issuingAuthorityTa: 'சாட்சிகள் (Individual Citizens)',
        issuingAuthorityEn: 'Witnesses',
        howToGetTa: 'விற்பவர் மற்றும் வாங்குபவரை நேரில் அறிந்த இரு நபர்கள் ஆதார் நகலுடன் வர வேண்டும்.',
        howToGetEn: 'Two acquainted individuals with original Aadhaar cards and photographs.'
      }
    ]
  },
  {
    id: 'settlement_deed',
    titleTa: 'தான செட்டில்மென்ட் பத்திரம் (Settlement Deed)',
    titleEn: 'Gift / Settlement Deed Registration',
    descriptionTa: 'குடும்ப உறுப்பினர்களுக்கு இடையே (இரத்த உறவு) சொத்து தானமாக வழங்கும் போது தேவையான ஆவணங்கள்.',
    descriptionEn: 'Required documents for transferring property among family/blood relatives.',
    iconName: 'Award',
    documents: [
      {
        id: 'set_1',
        titleTa: 'அசல் மூலப்பத்திரம் (Original Title Deed)',
        titleEn: 'Original Title Deed of Settlor',
        descriptionTa: 'தானம் வழங்குபவரின் பெயரில் உள்ள அசல் கிரைய பத்திரம் அல்லது பாகப்பிரிவினை ஆவணம்.',
        descriptionEn: 'Original title deed proving sole ownership of the donor/settlor.',
        isMandatory: true,
        issuingAuthorityTa: 'சார்பதிவாளர் அலுவலகம்',
        issuingAuthorityEn: 'Sub-Registrar Office',
        howToGetTa: 'தானம் வழங்குபவரிடம் உள்ள அசல் ஆவணம் சரிபார்க்கப்படும்.',
        howToGetEn: 'Must be produced at the time of registration.'
      },
      {
        id: 'set_2',
        titleTa: 'இரத்த உறவு சான்று (Legal Heirship / Family Relationship Proof)',
        titleEn: 'Family Relationship Proof (Legal Heir / Smart Ration Card)',
        descriptionTa: '1% குறைந்தபட்ச முத்திரைக் கட்டணச் சலுகை பெற குடும்ப அட்டை, வாரிசு சான்றிதழ் அல்லது பிறப்பு சான்றிதழ்.',
        descriptionEn: 'Proof establishing blood relation (Parents, Spouse, Children, Siblings) for 1% stamp duty cap.',
        isMandatory: true,
        issuingAuthorityTa: 'வருவாய்த்துறை (Tahsildar) / குடும்ப அட்டை',
        issuingAuthorityEn: 'Revenue Tahsildar / Smart Ration Card',
        howToGetTa: 'ஸ்மார்ட் ரேஷன் கார்டு நகல் அல்லது வட்டாட்சியர் வழங்கிய வாரிசு சான்றிதழ்.',
        howToGetEn: 'Smart Ration Card or Legal Heirship Certificate issued by Tahsildar.'
      },
      {
        id: 'set_3',
        titleTa: 'வில்லங்க சான்றிதழ் - EC (Encumbrance Certificate)',
        titleEn: 'Encumbrance Certificate (EC)',
        descriptionTa: 'சொத்தின் நடப்பு கால வில்லங்க விவரங்கள்.',
        descriptionEn: 'Current Encumbrance Certificate for the property.',
        isMandatory: true,
        issuingAuthorityTa: 'TN Reginet',
        issuingAuthorityEn: 'TN Reginet',
        howToGetTa: 'எங்கள் இ-சேவை மையத்தில் உடனடியாக அச்சிட்டு தரப்படும்.',
        howToGetEn: 'Obtained via online portal at our desk.'
      },
      {
        id: 'set_4',
        titleTa: 'கொடுப்பவர் & பெறுபவர் ஆதார் / பாஸ்போர்ட் அளவிலான புகைப்படங்கள்',
        titleEn: 'Aadhaar & Passport Photos of Settlor & Settlee',
        descriptionTa: 'இருவரின் அசல் ஆதார் அட்டை மற்றும் தலா 2 புகைப்படங்கள்.',
        descriptionEn: 'Aadhaar cards and 2 passport photos for both parties.',
        isMandatory: true,
        issuingAuthorityTa: 'UIDAI',
        issuingAuthorityEn: 'UIDAI',
        howToGetTa: 'நேரில் ஆஜராகி கையொப்பமிட்டு கைரேகை வைக்க வேண்டும்.',
        howToGetEn: 'Physical presence required at Sub-Registrar Office.'
      }
    ]
  },
  {
    id: 'partition_deed',
    titleTa: 'பாகப்பிரிவினை பத்திரம் (Partition Deed)',
    titleEn: 'Family Partition Deed Registration',
    descriptionTa: 'குடும்ப கூட்டுச் சொத்தை வாரிசுகளுக்குள் பிரித்துக்கொள்ள தேவையான ஆவணங்கள்.',
    descriptionEn: 'Documents required for dividing ancestral/joint family property among legal heirs.',
    iconName: 'Layers',
    documents: [
      {
        id: 'part_1',
        titleTa: 'மூதாதையர் / அசல் மூலப்பத்திரம் (Ancestral Title Deed)',
        titleEn: 'Ancestral / Original Property Deed',
        descriptionTa: 'குடும்ப உறுப்பினர்களுக்குச் சொந்தமான அசல் சொத்து ஆவணம்.',
        descriptionEn: 'Original deed under which the property was held jointly.',
        isMandatory: true,
        issuingAuthorityTa: 'சார்பதிவாளர் அலுவலகம்',
        issuingAuthorityEn: 'Sub-Registrar Office',
        howToGetTa: 'குடும்ப மூத்த உறுப்பினரிடமிருந்து அசல் ஆவணம்.',
        howToGetEn: 'Original property deed from family records.'
      },
      {
        id: 'part_2',
        titleTa: 'வாரிசு சான்றிதழ் (Legal Heirship Certificate)',
        titleEn: 'Legal Heirship Certificate',
        descriptionTa: 'சொத்தின் முந்தைய உரிமையாளர் இறந்திருந்தால், அவரது சட்டப்பூர்வ வாரிசுகளை உறுதிப்படுத்தும் சான்றிதழ்.',
        descriptionEn: 'Official certificate identifying all legal heirs of the deceased owner.',
        isMandatory: true,
        issuingAuthorityTa: 'வட்டாட்சியர் அலுவலகம் (Revenue Tahsildar)',
        issuingAuthorityEn: 'Revenue Tahsildar Office',
        howToGetTa: 'வட்டாட்சியரிடம் இ-சேவை மூலம் விண்ணப்பித்து பெறப்பட்ட வாரிசு சான்றிதழ்.',
        howToGetEn: 'Apply online via e-Sevai portal to Tahsildar.'
      },
      {
        id: 'part_3',
        titleTa: 'இறப்பு சான்றிதழ் (Death Certificate of Deceased Owner)',
        titleEn: 'Death Certificate of Deceased Property Owner',
        descriptionTa: 'சொத்து உரிமையாளர் மறைந்ததற்கான நகராட்சி/கிராம ஊராட்சி இறப்பு சான்றிதழ்.',
        descriptionEn: 'Official death certificate of the original owner.',
        isMandatory: true,
        issuingAuthorityTa: 'நகராட்சி / பிறப்பு இறப்பு பதிவாளர்',
        issuingAuthorityEn: 'Municipal Registrar of Births & Deaths',
        howToGetTa: 'இ-சேவை மையம் அல்லது நகராட்சி போர்ட்டலில் ஆன்லைனில் பெறலாம்.',
        howToGetEn: 'Downloadable from e-Sevai or Civil Registration System.'
      },
      {
        id: 'part_4',
        titleTa: 'அனைத்து பாகஸ்தர்களின் ஆதார் & பான் அட்டைகள்',
        titleEn: 'Aadhaar & PAN Cards of All Co-Sharers',
        descriptionTa: 'பாகம் பிரித்துக்கொள்ளும் அனைத்து வாரிசுகளின் அடையாளச் சான்றுகள்.',
        descriptionEn: 'ID and PAN documents for every family member sharing the property.',
        isMandatory: true,
        issuingAuthorityTa: 'அரசு அங்கீகாரம்',
        issuingAuthorityEn: 'Government Authority',
        howToGetTa: 'அனைத்து பாகஸ்தர்களும் நேரில் ஆஜராக வேண்டும்.',
        howToGetEn: 'All heirs must present themselves in person.'
      }
    ]
  },
  {
    id: 'patta_transfer',
    titleTa: 'கணினி பட்டா பெயர் மாற்றம் (Patta / Chitta Transfer)',
    titleEn: 'Patta & Chitta Transfer Service',
    descriptionTa: 'பத்திரப் பதிவுக்குப் பின் வருவாய்த்துறையில் பட்டா பெயர் மாற்றம் செய்ய தேவையானவை.',
    descriptionEn: 'Requirements for updating land ownership records with Revenue Dept after registration.',
    iconName: 'Landmark',
    documents: [
      {
        id: 'pt_1',
        titleTa: 'பதிவு செய்யப்பட்ட புதிய பத்திரம் (Registered New Deed Copy)',
        titleEn: 'Registered Sale / Settlement Deed Copy',
        descriptionTa: 'சார்பதிவாளர் அலுவலகத்தில் பதிவு செய்யப்பட்ட புதிய கிரைய பத்திரம் அல்லது தான பத்திரம்.',
        descriptionEn: 'Copy of recently registered deed from Sub-Registrar.',
        isMandatory: true,
        issuingAuthorityTa: 'சார்பதிவாளர் அலுவலகம்',
        issuingAuthorityEn: 'Sub-Registrar Office',
        howToGetTa: 'பதிவு முடிந்தவுடன் பெறப்பட்ட ஆவண நகல்.',
        howToGetEn: 'Provided upon completion of deed registration.'
      },
      {
        id: 'pt_2',
        titleTa: 'தற்போதைய பட்டா நகல் (Current Patta Copy)',
        titleEn: 'Existing Patta Copy (in Seller/Former Owner Name)',
        descriptionTa: 'விற்பனையாளர் பெயர் உள்ள பழைய கணினி பட்டா எண்/நகல்.',
        descriptionEn: 'Patta copy showing former owner name.',
        isMandatory: true,
        issuingAuthorityTa: 'தமிழ்நாடு நில வருவாய்த்துறை',
        issuingAuthorityEn: 'TN Land Revenue Department',
        howToGetTa: 'எங்கள் இ-சேவை மையத்தில் பதிவிறக்கம் செய்யலாம்.',
        howToGetEn: 'Obtainable at our center via Survey Number.'
      },
      {
        id: 'pt_3',
        titleTa: 'வில்லங்க சான்றிதழ் (Latest EC Copy)',
        titleEn: 'Latest Encumbrance Certificate',
        descriptionTa: 'புதிய பத்திரப் பதிவு பதிவாகியுள்ள சமீபத்திய வில்லங்க சான்று.',
        descriptionEn: 'EC showing entry of current registered transaction.',
        isMandatory: true,
        issuingAuthorityTa: 'TN Reginet',
        issuingAuthorityEn: 'TN Reginet',
        howToGetTa: 'பதிவு எண்ணைக் கொண்டு உடனடியாக அச்சிடப்படும்.',
        howToGetEn: 'Printed instantly with Document Number & Year.'
      },
      {
        id: 'pt_4',
        titleTa: 'மனுதாரரின் ஆதார் அட்டை & மொபைல் எண்',
        titleEn: 'Applicant Aadhaar & Mobile Number',
        descriptionTa: 'பட்டா மாற்றம் கோரும் புதிய உரிமையாளரின் ஆதார் நகல்.',
        descriptionEn: 'Aadhaar card of new owner requesting Patta transfer.',
        isMandatory: true,
        issuingAuthorityTa: 'UIDAI',
        issuingAuthorityEn: 'UIDAI',
        howToGetTa: 'OTP மற்றும் பட்டா மாறுதல் நிலவர குறுஞ்செய்தி பெற மொபைல் எண் அவசியம்.',
        howToGetEn: 'Mobile number required for receiving SMS updates from Village Administrative Officer (VAO).'
      }
    ]
  }
];
