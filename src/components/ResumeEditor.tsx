import React, { useState } from 'react';
import {
  ResumeData,
  CareerLevel,
  WorkExperience,
  Education,
  SkillCategory,
  Project,
  Certification,
  Award,
  SectionKey,
} from '../types/resume';
import { enhanceExperienceAI, recommendSkillsAI } from '../services/api';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award as AwardIcon,
  Globe,
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Check,
  Zap,
} from 'lucide-react';

interface ResumeEditorProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
  onOpenSummaryModal: () => void;
  activeSectionKey?: SectionKey | null;
}

const CAREER_LEVELS: CareerLevel[] = [
  'Student',
  'Internship Applicant',
  'Entry Level',
  'Junior Professional',
  'Mid-Level Professional',
  'Senior Professional',
  'Manager',
  'Executive',
  'Director',
  'Career Changer',
];

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resume,
  onChange,
  onOpenSummaryModal,
  activeSectionKey,
}) => {
  const [openSection, setOpenSection] = useState<string>('personal');
  const [enhancingExpId, setEnhancingExpId] = useState<string | null>(null);
  const [recommendingSkills, setRecommendingSkills] = useState(false);
  const [recommendedCategories, setRecommendedCategories] = useState<SkillCategory[]>([]);

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    });
  };

  const updateCareerLevel = (level: CareerLevel) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      careerLevel: level,
    });
  };

  // Work Experience helpers
  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: true,
      responsibilities: [''],
      achievements: [],
      technologies: [],
    };
    onChange({
      ...resume,
      lastModified: Date.now(),
      workExperience: [newExp, ...resume.workExperience],
    });
  };

  const updateWorkExperience = (id: string, updatedFields: Partial<WorkExperience>) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      workExperience: resume.workExperience.map((exp) =>
        exp.id === id ? { ...exp, ...updatedFields } : exp
      ),
    });
  };

  const removeWorkExperience = (id: string) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      workExperience: resume.workExperience.filter((exp) => exp.id !== id),
    });
  };

  const handleEnhanceExperience = async (exp: WorkExperience) => {
    setEnhancingExpId(exp.id);
    try {
      const result = await enhanceExperienceAI({
        jobTitle: exp.jobTitle || resume.personalInfo.jobTitle,
        company: exp.company,
        rawResponsibilities: exp.responsibilities,
        rawAchievements: exp.achievements,
        technologies: exp.technologies,
        careerLevel: resume.careerLevel,
      });

      if (result) {
        updateWorkExperience(exp.id, {
          responsibilities: result.enhancedResponsibilities || exp.responsibilities,
          achievements: result.enhancedAchievements?.length
            ? result.enhancedAchievements
            : exp.achievements,
          technologies: result.recommendedTechnologies?.length
            ? Array.from(new Set([...(exp.technologies || []), ...result.recommendedTechnologies]))
            : exp.technologies,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancingExpId(null);
    }
  };

  // Education helpers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      grade: '',
      achievements: [],
    };
    onChange({
      ...resume,
      lastModified: Date.now(),
      education: [...resume.education, newEdu],
    });
  };

  const updateEducation = (id: string, updatedFields: Partial<Education>) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      education: resume.education.map((edu) =>
        edu.id === id ? { ...edu, ...updatedFields } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      education: resume.education.filter((edu) => edu.id !== id),
    });
  };

  // Skills helpers
  const handleRecommendSkills = async () => {
    if (!resume.personalInfo.jobTitle) return;
    setRecommendingSkills(true);
    try {
      const categories = await recommendSkillsAI({
        jobTitle: resume.personalInfo.jobTitle,
        careerLevel: resume.careerLevel,
      });
      setRecommendedCategories(categories);
    } catch (err) {
      console.error(err);
    } finally {
      setRecommendingSkills(false);
    }
  };

  const addRecommendedSkill = (catName: string, skill: string) => {
    const existing = [...resume.skills];
    let catIndex = existing.findIndex(
      (c) => c.category.toLowerCase() === catName.toLowerCase()
    );

    if (catIndex === -1) {
      existing.push({
        category: (catName as any) || 'Technical',
        skills: [skill],
      });
    } else {
      if (!existing[catIndex].skills.includes(skill)) {
        existing[catIndex].skills.push(skill);
      }
    }

    onChange({
      ...resume,
      lastModified: Date.now(),
      skills: existing,
    });
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = [...resume.skills];
    updated[categoryIndex].skills.splice(skillIndex, 1);
    onChange({
      ...resume,
      lastModified: Date.now(),
      skills: updated,
    });
  };

  const addSkillToCategory = (catIndex: number, newSkill: string) => {
    if (!newSkill.trim()) return;
    const updated = [...resume.skills];
    updated[catIndex].skills.push(newSkill.trim());
    onChange({
      ...resume,
      lastModified: Date.now(),
      skills: updated,
    });
  };

  // Projects helpers
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: [],
      url: '',
    };
    onChange({
      ...resume,
      lastModified: Date.now(),
      projects: [...resume.projects, newProj],
    });
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      projects: resume.projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      projects: resume.projects.filter((p) => p.id !== id),
    });
  };

  // Certifications helpers
  const addCertification = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
    };
    onChange({
      ...resume,
      lastModified: Date.now(),
      certifications: [...resume.certifications, newCert],
    });
  };

  const updateCertification = (id: string, updatedFields: Partial<Certification>) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      certifications: resume.certifications.map((c) =>
        c.id === id ? { ...c, ...updatedFields } : c
      ),
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      certifications: resume.certifications.filter((c) => c.id !== id),
    });
  };

  // Section Reordering
  const moveSection = (idx: number, direction: 'up' | 'down') => {
    const order = [...(resume.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'awards', 'languages'])];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= order.length) return;
    const temp = order[idx];
    order[idx] = order[targetIdx];
    order[targetIdx] = temp;
    onChange({
      ...resume,
      lastModified: Date.now(),
      sectionOrder: order,
    });
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 1. Personal & Role Header */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <button
          onClick={() => setOpenSection(openSection === 'personal' ? '' : 'personal')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between text-left transition"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-slate-800">
              1. Personal Information &amp; Professional Role
            </span>
          </div>
          {openSection === 'personal' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSection === 'personal' && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="e.g. Sarah Jenkins, M.Sc."
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Professional Role / Job Title * (Any Role)
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.jobTitle}
                  onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                  placeholder="e.g. Lead Cloud Architect, ICU Nurse, Financial Controller..."
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-blue-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Career Level
                </label>
                <select
                  value={resume.careerLevel}
                  onChange={(e) => updateCareerLevel(e.target.value as CareerLevel)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {CAREER_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Current Location
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="City, State / Country"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Professional Email *
                </label>
                <input
                  type="email"
                  value={resume.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={resume.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  LinkedIn Profile (optional)
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.linkedin || ''}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  GitHub / Portfolio / Website (optional)
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.portfolio || resume.personalInfo.github || ''}
                  onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                  placeholder="github.com/user or portfolio.dev"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Professional Summary */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <button
          onClick={() => setOpenSection(openSection === 'summary' ? '' : 'summary')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between text-left transition"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-slate-800">2. Professional Summary</span>
          </div>
          {openSection === 'summary' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSection === 'summary' && (
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Write manually or click to generate 3 tailored options with Google AI.
              </span>
              <button
                type="button"
                onClick={onOpenSummaryModal}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Generate 3 Options with AI
              </button>
            </div>

            <textarea
              value={resume.professionalSummary}
              onChange={(e) =>
                onChange({
                  ...resume,
                  lastModified: Date.now(),
                  professionalSummary: e.target.value,
                })
              }
              rows={4}
              placeholder="e.g. Results-driven Software Engineer with 5+ years of experience building scalable distributed web applications..."
              className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* 3. Work Experience */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <button
          onClick={() => setOpenSection(openSection === 'experience' ? '' : 'experience')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between text-left transition"
        >
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-slate-800">
              3. Work Experience ({resume.workExperience.length})
            </span>
          </div>
          {openSection === 'experience' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSection === 'experience' && (
          <div className="p-5 space-y-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addWorkExperience}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Experience
              </button>
            </div>

            {resume.workExperience.map((exp, idx) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-xs font-bold text-slate-700">
                    Position #{idx + 1}: {exp.jobTitle || 'Untitled Role'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEnhanceExperience(exp)}
                      disabled={enhancingExpId === exp.id}
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold rounded-md flex items-center gap-1 shadow-xs transition disabled:opacity-50"
                      title="AI transforms basic descriptions into professional achievement bullets"
                    >
                      {enhancingExpId === exp.id ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Polishing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3" />
                          AI Enhance Bullets
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(exp.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      title="Delete experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => updateWorkExperience(exp.id, { jobTitle: e.target.value })}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                      placeholder="e.g. Acme Corp"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateWorkExperience(exp.id, { location: e.target.value })}
                      placeholder="e.g. Remote, or New York, NY"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })}
                        placeholder="2021-03"
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        disabled={exp.current}
                        value={exp.current ? 'Present' : exp.endDate}
                        onChange={(e) => updateWorkExperience(exp.id, { endDate: e.target.value })}
                        placeholder="Present"
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:bg-slate-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`cur-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, {
                        current: e.target.checked,
                        endDate: e.target.checked ? '' : exp.endDate,
                      })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`cur-${exp.id}`} className="text-xs text-slate-600 cursor-pointer">
                    I currently work here
                  </label>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Responsibilities &amp; Achievements (One per line)
                  </label>
                  <textarea
                    value={(exp.responsibilities || []).join('\n')}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, {
                        responsibilities: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                      })
                    }
                    rows={4}
                    placeholder="Enter basic notes or full bullets. Click 'AI Enhance Bullets' to polish them into ATS-optimized power phrases."
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Tools / Technologies Used (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={(exp.technologies || []).join(', ')}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, {
                        technologies: e.target.value
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="React, TypeScript, AWS, Docker, Node.js"
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Education */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <button
          onClick={() => setOpenSection(openSection === 'education' ? '' : 'education')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between text-left transition"
        >
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-slate-800">
              4. Education ({resume.education.length})
            </span>
          </div>
          {openSection === 'education' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSection === 'education' && (
          <div className="p-5 space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addEducation}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Degree / Education
              </button>
            </div>

            {resume.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative"
              >
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-xs font-bold text-slate-700">
                    Institution #{idx + 1}: {edu.institution || 'School Name'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Institution Name
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      placeholder="e.g. Stanford University"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Degree / Qualification
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      placeholder="e.g. Bachelor of Science"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Field of Study / Major
                    </label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                      placeholder="e.g. Computer Science, Accounting, Biology"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Start Year
                      </label>
                      <input
                        type="text"
                        value={edu.startYear}
                        onChange={(e) => updateEducation(edu.id, { startYear: e.target.value })}
                        placeholder="2018"
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Graduation Year
                      </label>
                      <input
                        type="text"
                        value={edu.endYear}
                        onChange={(e) => updateEducation(edu.id, { endYear: e.target.value })}
                        placeholder="2022"
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Grade / GPA / Academic Honors (Optional)
                    </label>
                    <input
                      type="text"
                      value={edu.grade || ''}
                      onChange={(e) => updateEducation(edu.id, { grade: e.target.value })}
                      placeholder="e.g. 3.9 GPA, Magna Cum Laude, Dean’s List"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Skills */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <button
          onClick={() => setOpenSection(openSection === 'skills' ? '' : 'skills')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between text-left transition"
        >
          <div className="flex items-center gap-2.5">
            <Wrench className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-slate-800">
              5. Skills &amp; Competencies
            </span>
          </div>
          {openSection === 'skills' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSection === 'skills' && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Organized by Technical, Tools, and Core Competencies.
              </span>
              <button
                type="button"
                onClick={handleRecommendSkills}
                disabled={recommendingSkills || !resume.personalInfo.jobTitle}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {recommendingSkills ? 'Analyzing Role...' : 'Recommend Skills for Role'}
              </button>
            </div>

            {/* AI Skill Recommendations Pills */}
            {recommendedCategories.length > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2.5">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Recommended Skills for {resume.personalInfo.jobTitle}
                </div>
                <div className="space-y-2">
                  {recommendedCategories.map((cat, i) => (
                    <div key={i} className="text-xs">
                      <span className="font-semibold text-slate-700 block mb-1">
                        {cat.category}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s, j) => (
                          <button
                            key={j}
                            type="button"
                            onClick={() => addRecommendedSkill(cat.category, s)}
                            className="px-2 py-0.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs rounded-md flex items-center gap-1 transition"
                            title="Click to add to your resume"
                          >
                            + {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current user skills */}
            <div className="space-y-4">
              {resume.skills.map((category, catIdx) => (
                <div key={catIdx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">
                      {category.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-800 shadow-2xs"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(catIdx, sIdx)}
                          className="text-slate-400 hover:text-rose-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add skill input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Add new ${category.category.toLowerCase()} skill...`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkillToCategory(catIdx, e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="text-xs px-2.5 py-1 bg-white border border-slate-300 rounded-md flex-1 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. Projects & Key Work */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <button
          onClick={() => setOpenSection(openSection === 'projects' ? '' : 'projects')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between text-left transition"
        >
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-bold text-slate-800">
              6. Key Projects ({resume.projects.length})
            </span>
          </div>
          {openSection === 'projects' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSection === 'projects' && (
          <div className="p-5 space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addProject}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </button>
            </div>

            {resume.projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Project #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                      placeholder="e.g. Distributed Task Broker"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Project URL / GitHub
                    </label>
                    <input
                      type="text"
                      value={proj.url || ''}
                      onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                      placeholder="github.com/user/project"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Description &amp; Impact
                  </label>
                  <textarea
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                    rows={2}
                    placeholder="Brief description of project scope and architecture..."
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Technologies Used (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={(proj.technologies || []).join(', ')}
                    onChange={(e) =>
                      updateProject(proj.id, {
                        technologies: e.target.value
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="Go, Redis, Docker, gRPC"
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 7. Certifications */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <button
          onClick={() => setOpenSection(openSection === 'certifications' ? '' : 'certifications')}
          className="w-full px-5 py-3.5 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between text-left transition"
        >
          <div className="flex items-center gap-2.5">
            <AwardIcon className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-slate-800">
              7. Certifications &amp; Licenses ({resume.certifications.length})
            </span>
          </div>
          {openSection === 'certifications' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSection === 'certifications' && (
          <div className="p-5 space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addCertification}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Certification
              </button>
            </div>

            {resume.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 relative"
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeCertification(cert.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Certificate Name
                    </label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Issuing Body
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                      placeholder="Amazon Web Services"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 8. Section Reordering */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <span>↕</span> Reorder Resume Sections
        </h4>
        <p className="text-[11px] text-slate-500 mb-3">
          Move sections up or down to match your career focus (e.g. move Education to top for entry-level).
        </p>
        <div className="space-y-1.5">
          {resume.sectionOrder.map((sec, idx) => (
            <div
              key={sec}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
            >
              <span className="capitalize">{sec}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveSection(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(idx, 'down')}
                  disabled={idx === resume.sectionOrder.length - 1}
                  className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
