export type CareerLevel =
  | 'Student'
  | 'Internship Applicant'
  | 'Entry Level'
  | 'Junior Professional'
  | 'Mid-Level Professional'
  | 'Senior Professional'
  | 'Manager'
  | 'Executive'
  | 'Director'
  | 'Career Changer';

export type TemplateId =
  | 'modern'
  | 'classic'
  | 'minimal'
  | 'executive'
  | 'creative'
  | 'technical'
  | 'academic'
  | 'entry-level';

export type AccentColor =
  | 'blue'
  | 'indigo'
  | 'emerald'
  | 'slate'
  | 'teal'
  | 'amber'
  | 'rose'
  | 'purple';

export type FontFamily = 'inter' | 'merriweather' | 'roboto' | 'poppins' | 'mono';
export type FontSize = 'compact' | 'normal' | 'relaxed';

export type SectionKey =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'languages';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
  achievements?: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade?: string;
  achievements?: string[];
}

export interface SkillCategory {
  category: 'Technical' | 'Soft Skills' | 'Industry Tools' | 'Languages' | 'Core Competencies';
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies?: string[];
  url?: string;
  highlights?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface ResumeData {
  id: string;
  title: string;
  lastModified: number;
  careerLevel: CareerLevel;
  personalInfo: PersonalInfo;
  professionalSummary: string;
  summaryOptions?: string[];
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  languages: string[];
  sectionOrder: SectionKey[];
  templateSettings: {
    templateId: TemplateId;
    accentColor: AccentColor;
    fontFamily: FontFamily;
    fontSize: FontSize;
  };
}

export interface AtsCheckResult {
  score: number;
  overallRating: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical Issues';
  summary: string;
  keywordsFound: string[];
  missingKeywords: string[];
  formattingWarnings: string[];
  contentSuggestions: string[];
  sectionCompleteness: {
    section: string;
    status: 'complete' | 'warning' | 'missing';
    note: string;
  }[];
}

export interface JobMatchResult {
  matchPercentage: number;
  roleTitle: string;
  matchingSkills: string[];
  missingSkills: string[];
  unsupportedRequirements: string[];
  tailoredSuggestions: string[];
  recommendedKeywordsToAdd: string[];
}

export interface CoverLetterData {
  applicantName: string;
  targetRole: string;
  companyName: string;
  date: string;
  bodyParagraphs: string[];
  salutation: string;
  closing: string;
}

export interface CareerSuggestion {
  targetRole: string;
  overview: string;
  inDemandSkills: { name: string; priority: 'High' | 'Medium' | 'Nice to have'; why: string }[];
  recommendedCertifications: { name: string; issuer: string; estimatedTime: string }[];
  highImpactProjects: { title: string; tech: string; description: string }[];
  careerPath: { stage: string; timeframe: string; milestones: string }[];
}
