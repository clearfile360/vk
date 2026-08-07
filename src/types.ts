export type NavTab = 
  | 'home'
  | 'services'
  | 'calculator'
  | 'converter'
  | 'checklist'
  | 'faq'
  | 'laws'
  | 'templates'
  | 'tracker'
  | 'ai-chat'
  | 'appointment';

export type Language = 'ta' | 'en';

export type VerificationLevel = 'level1' | 'level2';

export interface RequiredDocumentItem {
  id: string;
  titleTa: string;
  titleEn: string;
  descriptionTa: string;
  descriptionEn: string;
  isMandatory: boolean;
  isLevel2Advanced?: boolean;
  level2NoteTa?: string;
  level2NoteEn?: string;
  issuingAuthorityTa: string;
  issuingAuthorityEn: string;
  howToGetTa: string;
  howToGetEn: string;
}

export interface DocumentChecklistCategory {
  id: string;
  titleTa: string;
  titleEn: string;
  descriptionTa: string;
  descriptionEn: string;
  iconName: string;
  documents: RequiredDocumentItem[];
}

export interface FAQItem {
  id: string;
  category: string;
  categoryTa: string;
  questionTa: string;
  questionEn: string;
  answerTa: string;
  answerEn: string;
  tags: string[];
}

export interface DeedType {
  id: string;
  title: string;
  tamilName: string;
  description: string;
  stampDutyRate: string;
  regFeeRate: string;
  maxCap?: string;
  requiredDocuments: string[];
  keyRules: string[];
  sampleSnippet: string;
  iconName: string;
  category: 'deeds' | 'revenue' | 'eservices';
}

export interface LawAct {
  id: string;
  title: string;
  tamilTitle: string;
  actName: string;
  category: 'registration' | 'stamp' | 'revenue' | 'document_writer';
  summary: string;
  keySections: {
    sectionNumber: string;
    sectionTitle: string;
    description: string;
  }[];
  guidelines: string[];
}

export interface DeedTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
}

export interface ServiceStatus {
  referenceNo: string;
  applicantName: string;
  serviceType: string;
  status: 'விண்ணப்பிக்கப்பட்டது' | 'ஆவணங்கள் சரிபார்ப்பு' | 'பதிவு முடிந்தது' | 'பட்டா மாற்றத்திற்கு அனுப்பப்பட்டது' | 'தயாராக உள்ளது';
  progressPercent: number;
  submittedDate: string;
  expectedDate: string;
  subRegistrarOffice: string;
  notes: string;
  steps: {
    title: string;
    completed: boolean;
    date?: string;
  }[];
}

export interface AppointmentFormData {
  applicantName: string;
  mobileNumber: string;
  email: string;
  serviceType: string;
  subRegistrarOffice: string;
  preferredDate: string;
  preferredTime: string;
  propertyAddress: string;
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
