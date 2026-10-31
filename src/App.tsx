import React, { useState, useEffect } from 'react';
import { ResumeData, CareerLevel } from './types/resume';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ResumeBuilder } from './components/ResumeBuilder';
import { AtsCheckerModal } from './components/AtsCheckerModal';
import { JobMatcherModal } from './components/JobMatcherModal';
import { CoverLetterModal } from './components/CoverLetterModal';
import { CareerSuggestionsModal } from './components/CareerSuggestionsModal';
import { SummaryGeneratorModal } from './components/SummaryGeneratorModal';
import { ImproveResumeModal } from './components/ImproveResumeModal';

const STORAGE_KEY = 'resumai_saved_resumes_v1';

export default function App() {
  const [resumes, setResumes] = useState<ResumeData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    // Default initial collection with 5 distinct test professions
    return [
      SAMPLE_RESUMES.technical,
      SAMPLE_RESUMES.business,
      SAMPLE_RESUMES.creative,
      SAMPLE_RESUMES.academic,
      SAMPLE_RESUMES.entryLevel,
    ];
  });

  const [activeResumeId, setActiveResumeId] = useState<string>(
    resumes[0]?.id || SAMPLE_RESUMES.technical.id
  );
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'builder'>('landing');

  // Modals state
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isJobMatcherModalOpen, setIsJobMatcherModalOpen] = useState(false);
  const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isImproveModalOpen, setIsImproveModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    } catch (e) {
      console.error(e);
    }
  }, [resumes]);

  const activeResume = resumes.find((r) => r.id === activeResumeId) || resumes[0];

  const handleUpdateResume = (updated: ResumeData) => {
    setResumes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleCreateNewResume = () => {
    const newResume: ResumeData = {
      id: `resume-${Date.now()}`,
      title: 'New Professional Resume',
      lastModified: Date.now(),
      careerLevel: 'Mid-Level Professional',
      personalInfo: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
      },
      professionalSummary: '',
      workExperience: [
        {
          id: `exp-${Date.now()}`,
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: true,
          responsibilities: [],
          achievements: [],
          technologies: [],
        },
      ],
      education: [],
      skills: [
        { category: 'Technical', skills: [] },
        { category: 'Core Competencies', skills: [] },
        { category: 'Industry Tools', skills: [] },
        { category: 'Soft Skills', skills: [] },
      ],
      projects: [],
      certifications: [],
      awards: [],
      languages: [],
      sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
      templateSettings: {
        templateId: 'modern',
        accentColor: 'blue',
        fontFamily: 'inter',
        fontSize: 'normal',
      },
    };

    setResumes((prev) => [newResume, ...prev]);
    setActiveResumeId(newResume.id);
    setCurrentView('builder');
  };

  const handleSelectPreset = (key: 'technical' | 'business' | 'creative' | 'academic' | 'entryLevel') => {
    const sample = SAMPLE_RESUMES[key];
    if (!sample) return;
    // Check if already in resumes, or clone
    const existing = resumes.find((r) => r.id === sample.id);
    if (!existing) {
      setResumes((prev) => [sample, ...prev]);
    }
    setActiveResumeId(sample.id);
    setCurrentView('builder');
  };

  const handleDuplicateResume = (id: string) => {
    const orig = resumes.find((r) => r.id === id);
    if (!orig) return;
    const duplicated: ResumeData = {
      ...JSON.parse(JSON.stringify(orig)),
      id: `resume-${Date.now()}`,
      title: `${orig.title} (Copy)`,
      lastModified: Date.now(),
    };
    setResumes((prev) => [duplicated, ...prev]);
    setActiveResumeId(duplicated.id);
  };

  const handleDeleteResume = (id: string) => {
    if (resumes.length <= 1) return;
    setResumes((prev) => prev.filter((r) => r.id !== id));
    if (activeResumeId === id) {
      const next = resumes.find((r) => r.id !== id);
      if (next) setActiveResumeId(next.id);
    }
  };

  const handleApplyImprovedResume = (improved: Partial<ResumeData>) => {
    const newResume: ResumeData = {
      id: `resume-${Date.now()}`,
      title: `${improved.personalInfo?.fullName || 'Imported'} Resume`,
      lastModified: Date.now(),
      careerLevel: 'Mid-Level Professional',
      personalInfo: {
        fullName: improved.personalInfo?.fullName || '',
        jobTitle: improved.personalInfo?.jobTitle || '',
        email: improved.personalInfo?.email || '',
        phone: improved.personalInfo?.phone || '',
        location: improved.personalInfo?.location || '',
        linkedin: improved.personalInfo?.linkedin || '',
        portfolio: improved.personalInfo?.portfolio || '',
      },
      professionalSummary: improved.professionalSummary || '',
      workExperience: improved.workExperience || [],
      education: improved.education || [],
      skills:
        improved.skills && improved.skills.length > 0
          ? improved.skills
          : [
              { category: 'Technical', skills: [] },
              { category: 'Core Competencies', skills: [] },
            ],
      projects: improved.projects || [],
      certifications: improved.certifications || [],
      awards: [],
      languages: [],
      sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
      templateSettings: {
        templateId: 'modern',
        accentColor: 'blue',
        fontFamily: 'inter',
        fontSize: 'normal',
      },
    };

    setResumes((prev) => [newResume, ...prev]);
    setActiveResumeId(newResume.id);
    setCurrentView('builder');
  };

  const handleAddSkillsFromAts = (newSkills: string[]) => {
    if (!activeResume) return;
    const skillsList = [...activeResume.skills];
    let cat = skillsList.find((c) => c.category === 'Technical' || c.category === 'Core Competencies');
    if (!cat) {
      cat = { category: 'Technical', skills: [] };
      skillsList.unshift(cat);
    }
    for (const sk of newSkills) {
      if (!cat.skills.includes(sk)) {
        cat.skills.push(sk);
      }
    }
    handleUpdateResume({
      ...activeResume,
      skills: skillsList,
      lastModified: Date.now(),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {currentView === 'landing' && (
        <LandingPage
          onCreateNew={handleCreateNewResume}
          onImproveExisting={() => setIsImproveModalOpen(true)}
          onSelectPreset={handleSelectPreset}
          onGoToDashboard={() => setCurrentView('dashboard')}
          hasResumes={resumes.length > 0}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard
          resumes={resumes}
          onSelectResume={(id) => {
            setActiveResumeId(id);
            setCurrentView('builder');
          }}
          onCreateNew={handleCreateNewResume}
          onImproveExisting={() => setIsImproveModalOpen(true)}
          onDuplicateResume={handleDuplicateResume}
          onDeleteResume={handleDeleteResume}
          onSelectPreset={handleSelectPreset}
          onOpenAtsModal={(r) => {
            setActiveResumeId(r.id);
            setIsAtsModalOpen(true);
          }}
          onOpenCoverLetterModal={(r) => {
            setActiveResumeId(r.id);
            setIsCoverLetterModalOpen(true);
          }}
          onOpenJobMatcherModal={(r) => {
            setActiveResumeId(r.id);
            setIsJobMatcherModalOpen(true);
          }}
          onOpenCareerModal={(r) => {
            setActiveResumeId(r.id);
            setIsCareerModalOpen(true);
          }}
        />
      )}

      {currentView === 'builder' && activeResume && (
        <ResumeBuilder
          resume={activeResume}
          onChange={handleUpdateResume}
          onBackToDashboard={() => setCurrentView('dashboard')}
          onOpenAtsModal={() => setIsAtsModalOpen(true)}
          onOpenCoverLetterModal={() => setIsCoverLetterModalOpen(true)}
          onOpenJobMatcherModal={() => setIsJobMatcherModalOpen(true)}
          onOpenCareerModal={() => setIsCareerModalOpen(true)}
          onOpenSummaryModal={() => setIsSummaryModalOpen(true)}
          onOpenImproveModal={() => setIsImproveModalOpen(true)}
        />
      )}

      {/* Global Modals */}
      {activeResume && (
        <>
          <AtsCheckerModal
            isOpen={isAtsModalOpen}
            onClose={() => setIsAtsModalOpen(false)}
            resume={activeResume}
            onAddSkills={handleAddSkillsFromAts}
          />

          <JobMatcherModal
            isOpen={isJobMatcherModalOpen}
            onClose={() => setIsJobMatcherModalOpen(false)}
            resume={activeResume}
          />

          <CoverLetterModal
            isOpen={isCoverLetterModalOpen}
            onClose={() => setIsCoverLetterModalOpen(false)}
            resume={activeResume}
          />

          <CareerSuggestionsModal
            isOpen={isCareerModalOpen}
            onClose={() => setIsCareerModalOpen(false)}
            jobTitle={activeResume.personalInfo.jobTitle}
            careerLevel={activeResume.careerLevel}
            existingSkills={(activeResume.skills || []).flatMap((c) => c.skills)}
          />

          <SummaryGeneratorModal
            isOpen={isSummaryModalOpen}
            onClose={() => setIsSummaryModalOpen(false)}
            resume={activeResume}
            onSelectSummary={(sum) => {
              handleUpdateResume({
                ...activeResume,
                professionalSummary: sum,
                lastModified: Date.now(),
              });
            }}
          />
        </>
      )}

      <ImproveResumeModal
        isOpen={isImproveModalOpen}
        onClose={() => setIsImproveModalOpen(false)}
        onApplyImprovedResume={handleApplyImprovedResume}
      />
    </div>
  );
}
