import {
  ResumeData,
  AtsCheckResult,
  JobMatchResult,
  CoverLetterData,
  CareerSuggestion,
  SkillCategory,
} from '../types/resume';

export async function generateResumeAI(payload: {
  jobTitle: string;
  careerLevel: string;
  personalInfo?: any;
  rawExperience?: string;
  rawEducation?: string;
  rawSkills?: string;
  jobDescription?: string;
}) {
  const res = await fetch('/api/ai/generate-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Failed to generate resume');
  }
  const data = await res.json();
  return data.data;
}

export async function generateSummariesAI(payload: {
  jobTitle: string;
  careerLevel: string;
  skills: string[];
  experienceHighlights: string;
  currentSummary?: string;
}): Promise<{ style: string; text: string; targetAudience?: string }[]> {
  const res = await fetch('/api/ai/generate-summaries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Failed to generate summaries');
  }
  const data = await res.json();
  return data.data || [];
}

export async function enhanceExperienceAI(payload: {
  jobTitle: string;
  company: string;
  rawResponsibilities: string[];
  rawAchievements?: string[];
  technologies?: string[];
  careerLevel: string;
}): Promise<{
  enhancedResponsibilities: string[];
  enhancedAchievements: string[];
  recommendedTechnologies: string[];
}> {
  const res = await fetch('/api/ai/enhance-experience', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Failed to enhance experience');
  }
  const data = await res.json();
  return data.data;
}

export async function checkAtsAI(payload: {
  resume: ResumeData;
  targetRole?: string;
  jobDescription?: string;
}): Promise<AtsCheckResult> {
  const res = await fetch('/api/ai/ats-checker', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Failed to run ATS check');
  }
  const data = await res.json();
  return data.data;
}

export async function matchJobDescriptionAI(payload: {
  resume: ResumeData;
  jobDescription: string;
  targetRole?: string;
}): Promise<JobMatchResult> {
  const res = await fetch('/api/ai/match-job', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Failed to match job description');
  }
  const data = await res.json();
  return data.data;
}

export async function generateCoverLetterAI(payload: {
  resume: ResumeData;
  targetRole?: string;
  companyName?: string;
  jobDescription?: string;
  tone?: string;
}): Promise<CoverLetterData> {
  const res = await fetch('/api/ai/generate-cover-letter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Failed to generate cover letter');
  }
  const data = await res.json();
  return data.data;
}

export async function getCareerSuggestionsAI(payload: {
  targetRole: string;
  careerLevel: string;
  existingSkills: string[];
}): Promise<CareerSuggestion> {
  const res = await fetch('/api/ai/career-suggestions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Failed to get career suggestions');
  }
  const data = await res.json();
  return data.data;
}

export async function recommendSkillsAI(payload: {
  jobTitle: string;
  careerLevel: string;
}): Promise<SkillCategory[]> {
  const res = await fetch('/api/ai/recommend-skills', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Failed to recommend skills');
  }
  const data = await res.json();
  return data.data || [];
}

export async function improveResumeAI(payload: {
  rawResumeText: string;
  targetRole?: string;
}) {
  const res = await fetch('/api/ai/improve-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Failed to improve resume');
  }
  const data = await res.json();
  return data.data;
}
