import React from 'react';
import { ResumeData } from '../types/resume';
import {
  Sparkles,
  Plus,
  Wand2,
  FileText,
  Copy,
  Trash2,
  Eye,
  Download,
  Target,
  FileCheck,
  Compass,
  ArrowRight,
  Clock,
  Layers,
} from 'lucide-react';

interface DashboardProps {
  resumes: ResumeData[];
  onSelectResume: (resumeId: string) => void;
  onCreateNew: () => void;
  onImproveExisting: () => void;
  onDuplicateResume: (resumeId: string) => void;
  onDeleteResume: (resumeId: string) => void;
  onSelectPreset: (key: 'technical' | 'business' | 'creative' | 'academic' | 'entryLevel') => void;
  onOpenAtsModal: (resume: ResumeData) => void;
  onOpenCoverLetterModal: (resume: ResumeData) => void;
  onOpenJobMatcherModal: (resume: ResumeData) => void;
  onOpenCareerModal: (resume: ResumeData) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  resumes,
  onSelectResume,
  onCreateNew,
  onImproveExisting,
  onDuplicateResume,
  onDeleteResume,
  onSelectPreset,
  onOpenAtsModal,
  onOpenCoverLetterModal,
  onOpenJobMatcherModal,
  onOpenCareerModal,
}) => {
  const activeResume = resumes[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20">
              R
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900">ResumAI</span>
              <span className="text-xs text-slate-500 ml-2">Workspace Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onImproveExisting}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-500" />
              Improve Existing Resume
            </button>
            <button
              onClick={onCreateNew}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/25 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Create New Resume
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        {/* Welcome Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Google AI Model
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome to Your Career Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Create and manage professional, ATS-optimized resumes tailored to any role. Optimize with real-time AI keyword scanning, cover letter drafting, and job description matching.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={onCreateNew}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                Start From Scratch
              </button>
              <button
                onClick={onImproveExisting}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
              >
                <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                Upload or Paste Existing Resume
              </button>
            </div>
          </div>
        </div>

        {/* AI Tools Quick Launcher */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            AI Resume Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => activeResume && onOpenAtsModal(activeResume)}
              disabled={!activeResume}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md transition text-left space-y-2 group disabled:opacity-50"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                ATS Resume Checker
              </h3>
              <p className="text-[11px] text-slate-500 leading-normal">
                Audit keyword coverage and ATS score for your active resume.
              </p>
            </button>

            <button
              onClick={() => activeResume && onOpenCoverLetterModal(activeResume)}
              disabled={!activeResume}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-400 hover:shadow-md transition text-left space-y-2 group disabled:opacity-50"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <FileCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-600">
                Cover Letter Generator
              </h3>
              <p className="text-[11px] text-slate-500 leading-normal">
                Draft tailored, persuasive application letters for target employers.
              </p>
            </button>

            <button
              onClick={() => activeResume && onOpenJobMatcherModal(activeResume)}
              disabled={!activeResume}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-md transition text-left space-y-2 group disabled:opacity-50"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                Job Description Matcher
              </h3>
              <p className="text-[11px] text-slate-500 leading-normal">
                Paste any job vacancy to find gaps and tailored bullet phrases.
              </p>
            </button>

            <button
              onClick={() => activeResume && onOpenCareerModal(activeResume)}
              disabled={!activeResume}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-md transition text-left space-y-2 group disabled:opacity-50"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-teal-600">
                AI Career Advisor
              </h3>
              <p className="text-[11px] text-slate-500 leading-normal">
                Discover high-demand certifications, projects, and progression steps.
              </p>
            </button>
          </div>
        </section>

        {/* 5 Profession Presets */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              Verified Multi-Profession Samples
            </h2>
            <span className="text-xs text-slate-400">One-click live test</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <button
              onClick={() => onSelectPreset('technical')}
              className="p-3 bg-white hover:bg-blue-50/50 border border-slate-200 rounded-xl text-left transition group"
            >
              <span className="text-[10px] uppercase font-bold text-blue-600 block mb-1">
                Technical
              </span>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                Senior Full-Stack Dev
              </div>
              <div className="text-[11px] text-slate-400">Microservices, Go, React</div>
            </button>

            <button
              onClick={() => onSelectPreset('business')}
              className="p-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition group"
            >
              <span className="text-[10px] uppercase font-bold text-slate-700 block mb-1">
                Business
              </span>
              <div className="text-xs font-bold text-slate-900 group-hover:text-slate-800">
                Financial Analyst &amp; CPA
              </div>
              <div className="text-[11px] text-slate-400">GAAP, $145M Budgeting</div>
            </button>

            <button
              onClick={() => onSelectPreset('creative')}
              className="p-3 bg-white hover:bg-indigo-50/50 border border-slate-200 rounded-xl text-left transition group"
            >
              <span className="text-[10px] uppercase font-bold text-indigo-600 block mb-1">
                Creative
              </span>
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                Lead UI/UX Designer
              </div>
              <div className="text-[11px] text-slate-400">Design Systems, Tokens</div>
            </button>

            <button
              onClick={() => onSelectPreset('academic')}
              className="p-3 bg-white hover:bg-emerald-50/50 border border-slate-200 rounded-xl text-left transition group"
            >
              <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-1">
                Academic
              </span>
              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                Biomedical Fellow (Ph.D.)
              </div>
              <div className="text-[11px] text-slate-400">CRISPR, scRNA-seq, NIH</div>
            </button>

            <button
              onClick={() => onSelectPreset('entryLevel')}
              className="p-3 bg-white hover:bg-purple-50/50 border border-slate-200 rounded-xl text-left transition group"
            >
              <span className="text-[10px] uppercase font-bold text-purple-600 block mb-1">
                Entry-Level
              </span>
              <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700">
                Junior CS Graduate
              </div>
              <div className="text-[11px] text-slate-400">Internship, Campus apps</div>
            </button>
          </div>
        </section>

        {/* My Resumes List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              My Resumes ({resumes.length})
            </h2>
            <button
              onClick={onCreateNew}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              New Resume
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {r.title || r.personalInfo.fullName || 'Untitled Resume'}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600 mt-0.5">
                        {r.personalInfo.jobTitle || 'No title set'}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {r.careerLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {r.professionalSummary || 'No summary entered yet.'}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Edited {new Date(r.lastModified).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="capitalize">{r.templateSettings?.templateId}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectResume(r.id)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Open &amp; Edit
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDuplicateResume(r.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {resumes.length > 1 && (
                      <button
                        onClick={() => onDeleteResume(r.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        ResumAI Workspace — Real-time AI Resume Engineering
      </footer>
    </div>
  );
};
