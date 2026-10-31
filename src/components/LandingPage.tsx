import React from 'react';
import {
  Sparkles,
  FileText,
  CheckCircle2,
  Download,
  Target,
  Wand2,
  FileCheck,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { TemplateId } from '../types/resume';

interface LandingPageProps {
  onCreateNew: () => void;
  onImproveExisting: () => void;
  onSelectPreset: (key: 'technical' | 'business' | 'creative' | 'academic' | 'entryLevel') => void;
  onGoToDashboard: () => void;
  hasResumes: boolean;
}

const TEMPLATES_SHOWCASE: { id: TemplateId; name: string; desc: string; tag: string }[] = [
  { id: 'modern', name: 'Modern Professional', desc: 'Sleek header accents and balanced dual-weight typography for tech & corporate roles.', tag: 'Popular' },
  { id: 'classic', name: 'Classic Corporate', desc: 'Traditional centered layout with serif headers, favored by finance, law, and consulting.', tag: 'Executive' },
  { id: 'minimal', name: 'Swiss Minimalist', desc: 'Airy whitespace, clean divider lines, and elegant hierarchy for design & modern tech.', tag: 'Clean' },
  { id: 'executive', name: 'Executive Leader', desc: 'Distinguished dark header block and prominent core competencies matrix for C-suite and directors.', tag: 'Senior' },
  { id: 'creative', name: 'Creative Portfolio', desc: 'Split sidebar layout highlighting branding, core competencies, and digital projects.', tag: 'Design' },
  { id: 'technical', name: 'Technical Stack', desc: 'Structured for developers & engineers with categorized toolsets and GitHub project metrics.', tag: 'Engineering' },
  { id: 'academic', name: 'Academic CV', desc: 'Curriculum Vitae prioritizing research citations, publications, grants, and teaching honors.', tag: 'Research' },
  { id: 'entry-level', name: 'Early Career & Grad', desc: 'Elevates coursework, capstone projects, and transferable skills above entry positions.', tag: 'Student' },
];

const ROLES_LIST = [
  'Software Engineer',
  'Corporate Accountant',
  'Project Manager',
  'UI/UX Designer',
  'Data Scientist',
  'Medical Doctor',
  'Registered Nurse',
  'Biomedical Researcher',
  'Civil Engineer',
  'Digital Marketer',
  'High School Teacher',
  'Financial Analyst',
  'Sales Director',
  'Operations Manager',
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onCreateNew,
  onImproveExisting,
  onSelectPreset,
  onGoToDashboard,
  hasResumes,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20">
              R
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900">ResumAI</span>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-2 border border-blue-200">
                Google Gemma 4
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition">
              AI Features
            </a>
            <a href="#templates" className="hover:text-blue-600 transition">
              8 Templates
            </a>
            <a href="#samples" className="hover:text-blue-600 transition">
              Sample Roles
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition">
              How It Works
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            {hasResumes && (
              <button
                onClick={onGoToDashboard}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg transition"
              >
                My Resumes
              </button>
            )}
            <button
              onClick={onCreateNew}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/25 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Build Resume
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Next-Gen AI Resume &amp; CV Builder powered by Google Gemma 4
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Build a Professional,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              ATS-Optimized Resume
            </span>{' '}
            with AI
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Create high-converting resumes tailored to virtually any job title or industry. Transform rough duties into measurable achievements without fabricated data.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onCreateNew}
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Create My Resume
            </button>
            <button
              onClick={onImproveExisting}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4 text-amber-500" />
              Improve Existing Resume
            </button>
          </div>

          {/* Role pills banner */}
          <div className="pt-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-3">
              Intelligent role-specific terminology for any profession:
            </span>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {ROLES_LIST.map((role) => (
                <span
                  key={role}
                  className="text-xs px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-full shadow-2xs font-medium"
                >
                  {role}
                </span>
              ))}
              <span className="text-xs px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full font-bold">
                + Any Custom Job Title
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Instant 5-Profession Presets Showcase */}
      <section id="samples" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Tested Across 5 Diverse Professional Fields
            </h2>
            <p className="text-xs text-slate-600">
              Click any verified role below to immediately load a full real-world resume and preview its tailored AI structure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            <button
              onClick={() => onSelectPreset('technical')}
              className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 hover:bg-blue-100/60 text-left transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 inline-block mb-2">
                  Technical
                </span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                  Senior Full-Stack Engineer
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Microservices, Kafka, React 19, distributed caching metrics.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-600 mt-3 flex items-center gap-1">
                Load Sample <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => onSelectPreset('business')}
              className="p-4 rounded-xl border border-slate-300 bg-slate-100/50 hover:bg-slate-200/50 text-left transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 inline-block mb-2">
                  Business
                </span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-900">
                  Senior Financial Analyst &amp; CPA
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  $145M corporate budgets, GAAP, NetSuite ERP, DCF models.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-700 mt-3 flex items-center gap-1">
                Load Sample <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => onSelectPreset('creative')}
              className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 hover:bg-indigo-100/60 text-left transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 inline-block mb-2">
                  Creative
                </span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">
                  Lead UI/UX &amp; Brand Designer
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Figma design tokens, user testing, Red Dot design award.
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 mt-3 flex items-center gap-1">
                Load Sample <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => onSelectPreset('academic')}
              className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-100/60 text-left transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 inline-block mb-2">
                  Academic
                </span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                  Biomedical Postdoctoral Fellow
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  CRISPR screening, scRNA-seq, NIH R01 grant co-author.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 mt-3 flex items-center gap-1">
                Load Sample <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            <button
              onClick={() => onSelectPreset('entryLevel')}
              className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 hover:bg-purple-100/60 text-left transition flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 inline-block mb-2">
                  Entry-Level
                </span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700">
                  Junior CS Graduate
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Internships, campus projects, coursework, Meta certificate.
                </p>
              </div>
              <span className="text-xs font-semibold text-purple-600 mt-3 flex items-center gap-1">
                Load Sample <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 8 Templates Gallery */}
      <section id="templates" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              8 Professional, ATS-Ready Resume Templates
            </h2>
            <p className="text-xs text-slate-600">
              Choose from classic corporate to sleek modern layouts. Fully customizable fonts, sizes, and accent colors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEMPLATES_SHOWCASE.map((tpl) => (
              <div
                key={tpl.id}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{tpl.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{tpl.desc}</p>
                </div>
                <button
                  onClick={onCreateNew}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 self-start pt-2 flex items-center gap-1"
                >
                  Use Template <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-16 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              All-In-One AI Career Suite
            </h2>
            <p className="text-xs text-slate-600">
              Everything required to land interviews faster, built around truthful, ethical AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">ATS Resume Checker</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Objective compatibility scores, keyword gap detection, and formatting audits against employer filtering systems.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Experience Enhancer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Elevates mundane duty lists into powerful, action-verb driven bullets with clear business and technical outcomes.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Targeted Cover Letters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates high-impact cover letters matching your actual experience directly to the employer’s job posting.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Instant PDF &amp; DOCX Export</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download pristine vector PDFs or genuine Microsoft Word DOCX files with one click, perfectly formatted.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Zero Hallucination Guardrails</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strict behavioral rules prohibit fabricating companies, degrees, dates, or non-existent metrics.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">AI Career Roadmap</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strategic recommendations on in-demand certifications, high-impact projects, and promotion milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
            <p className="text-xs text-slate-600">
              Three simple steps to generate a job-winning resume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Enter Your Role &amp; History</h3>
              <p className="text-xs text-slate-500">
                Input any job title and career level, along with basic duty notes or paste an existing resume.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">AI Enhances &amp; Optimizes</h3>
              <p className="text-xs text-slate-500">
                Gemma 4 crafts compelling summaries, strengthens achievement bullets, and audits ATS keyword matches.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Pick Template &amp; Download</h3>
              <p className="text-xs text-slate-500">
                Choose from 8 distinct templates and export immediately to PDF or Microsoft Word DOCX.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">ResumAI</span> — Powered by Google AI Gemma 4
          </div>
          <div className="text-slate-400">
            Professional AI Resume &amp; CV Builder
          </div>
        </div>
      </footer>
    </div>
  );
};
