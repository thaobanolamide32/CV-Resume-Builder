import React, { useState } from 'react';
import {
  ResumeData,
  TemplateId,
  AccentColor,
  FontFamily,
  FontSize,
  SectionKey,
} from '../types/resume';
import { ResumeEditor } from './ResumeEditor';
import { ResumePreview } from './ResumePreview';
import { exportResumeToDocx } from '../utils/docxExport';
import { generateResumeAI } from '../services/api';
import {
  Sparkles,
  Download,
  Printer,
  FileText,
  Palette,
  Eye,
  ArrowLeft,
  Target,
  FileCheck,
  Compass,
  Check,
  RefreshCw,
  Layers,
  Wand2,
  Share2,
} from 'lucide-react';

interface ResumeBuilderProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
  onBackToDashboard: () => void;
  onOpenAtsModal: () => void;
  onOpenCoverLetterModal: () => void;
  onOpenJobMatcherModal: () => void;
  onOpenCareerModal: () => void;
  onOpenSummaryModal: () => void;
  onOpenImproveModal: () => void;
}

const TEMPLATE_OPTIONS: { id: TemplateId; label: string }[] = [
  { id: 'modern', label: 'Modern Professional' },
  { id: 'classic', label: 'Classic Corporate' },
  { id: 'minimal', label: 'Minimalist' },
  { id: 'executive', label: 'Executive Leader' },
  { id: 'creative', label: 'Creative Split' },
  { id: 'technical', label: 'Technical Stack' },
  { id: 'academic', label: 'Academic CV' },
  { id: 'entry-level', label: 'Entry-Level' },
];

const ACCENT_COLOR_OPTIONS: { id: AccentColor; label: string; bg: string }[] = [
  { id: 'blue', label: 'Blue', bg: 'bg-blue-600' },
  { id: 'indigo', label: 'Indigo', bg: 'bg-indigo-600' },
  { id: 'emerald', label: 'Emerald', bg: 'bg-emerald-600' },
  { id: 'slate', label: 'Slate', bg: 'bg-slate-800' },
  { id: 'teal', label: 'Teal', bg: 'bg-teal-600' },
  { id: 'amber', label: 'Amber', bg: 'bg-amber-600' },
  { id: 'rose', label: 'Rose', bg: 'bg-rose-600' },
  { id: 'purple', label: 'Purple', bg: 'bg-purple-600' },
];

const FONT_OPTIONS: { id: FontFamily; label: string }[] = [
  { id: 'inter', label: 'Inter (Modern)' },
  { id: 'merriweather', label: 'Merriweather (Serif)' },
  { id: 'roboto', label: 'Roboto (Clean)' },
  { id: 'poppins', label: 'Poppins (Geometric)' },
  { id: 'mono', label: 'Mono (Tech)' },
];

const FONT_SIZE_OPTIONS: { id: FontSize; label: string }[] = [
  { id: 'compact', label: 'Compact' },
  { id: 'normal', label: 'Standard' },
  { id: 'relaxed', label: 'Relaxed' },
];

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  resume,
  onChange,
  onBackToDashboard,
  onOpenAtsModal,
  onOpenCoverLetterModal,
  onOpenJobMatcherModal,
  onOpenCareerModal,
  onOpenSummaryModal,
  onOpenImproveModal,
}) => {
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [showStyleDrawer, setShowStyleDrawer] = useState(false);
  const [isGeneratingRole, setIsGeneratingRole] = useState(false);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDocx = async () => {
    setIsExportingDocx(true);
    try {
      const blob = await exportResumeToDocx(resume);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const cleanName = (resume.personalInfo.fullName || 'Resume').replace(/\s+/g, '_');
      link.download = `${cleanName}_CV.docx`;
      link.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded Word (.docx) resume successfully!');
    } catch (err) {
      console.error('Failed to export docx', err);
      showToast('Could not export DOCX. Try PDF print.');
    } finally {
      setIsExportingDocx(false);
    }
  };

  // Full AI Generation for Current Role
  const handleAIGenerateFullResume = async () => {
    if (!resume.personalInfo.jobTitle) {
      showToast('Please enter a Job Title / Role first!');
      return;
    }
    setIsGeneratingRole(true);
    try {
      const result = await generateResumeAI({
        jobTitle: resume.personalInfo.jobTitle,
        careerLevel: resume.careerLevel,
        personalInfo: resume.personalInfo,
        rawExperience: (resume.workExperience || []).map((w) => `${w.jobTitle} at ${w.company}`).join('; '),
      });

      if (result) {
        onChange({
          ...resume,
          lastModified: Date.now(),
          professionalSummary: result.professionalSummary || resume.professionalSummary,
          summaryOptions: result.summaryOptions || resume.summaryOptions,
          workExperience:
            result.workExperience?.length > 0
              ? result.workExperience.map((w: any, idx: number) => ({
                  id: `ai-exp-${Date.now()}-${idx}`,
                  jobTitle: w.jobTitle || resume.personalInfo.jobTitle,
                  company: w.company || 'Enterprise Solutions',
                  location: w.location || resume.personalInfo.location || 'Remote',
                  startDate: w.startDate || '2021',
                  endDate: w.endDate || 'Present',
                  current: w.current ?? true,
                  responsibilities: w.responsibilities || [],
                  achievements: w.achievements || [],
                  technologies: w.technologies || [],
                }))
              : resume.workExperience,
          skills: result.skills?.length > 0 ? result.skills : resume.skills,
          projects:
            result.projects?.length > 0
              ? result.projects.map((p: any, idx: number) => ({
                  id: `ai-proj-${Date.now()}-${idx}`,
                  name: p.name || 'Core Initiative',
                  description: p.description || '',
                  technologies: p.technologies || [],
                  url: p.url || '',
                }))
              : resume.projects,
        });
        showToast(`AI successfully generated tailored resume for ${resume.personalInfo.jobTitle}!`);
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'AI generation failed. Check connection.');
    } finally {
      setIsGeneratingRole(false);
    }
  };

  const updateTemplateSetting = (
    key: 'templateId' | 'accentColor' | 'fontFamily' | 'fontSize',
    val: any
  ) => {
    onChange({
      ...resume,
      lastModified: Date.now(),
      templateSettings: {
        ...resume.templateSettings,
        [key]: val,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Toast notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-slide-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Main Workspace Navigation */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          {/* Left: Back + Resume title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <input
                type="text"
                value={resume.title}
                onChange={(e) =>
                  onChange({ ...resume, title: e.target.value, lastModified: Date.now() })
                }
                className="text-sm font-bold text-slate-900 bg-transparent hover:bg-slate-50 px-1 py-0.5 rounded border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="Resume Title"
              />
              <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1">
                <span className="font-medium text-blue-600">
                  {resume.personalInfo.jobTitle || 'Custom Role'}
                </span>
                <span>•</span>
                <span>Autosaved</span>
              </div>
            </div>
          </div>

          {/* Center AI action buttons */}
          <div className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={handleAIGenerateFullResume}
              disabled={isGeneratingRole}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
              title="Generate complete resume tailored to current role"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGeneratingRole ? 'animate-spin' : ''}`} />
              {isGeneratingRole ? 'Generating...' : 'AI Generate Resume'}
            </button>

            <button
              onClick={onOpenAtsModal}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition flex items-center gap-1"
            >
              <Target className="w-3.5 h-3.5 text-blue-600" />
              ATS Check
            </button>

            <button
              onClick={onOpenJobMatcherModal}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Match Job Ad
            </button>

            <button
              onClick={onOpenCoverLetterModal}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition flex items-center gap-1"
            >
              <FileCheck className="w-3.5 h-3.5 text-purple-600" />
              Cover Letter
            </button>

            <button
              onClick={onOpenCareerModal}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              Career Roadmap
            </button>
          </div>

          {/* Right Export & Style Options */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowStyleDrawer(!showStyleDrawer)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition flex items-center gap-1.5"
            >
              <Palette className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Design &amp; Template</span>
            </button>

            <button
              onClick={handleDownloadDocx}
              disabled={isExportingDocx}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
              title="Download Microsoft Word document"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">DOCX</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition shadow-sm"
              title="Print or Save as Vector PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="md:hidden flex border-t border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-2 text-center border-b-2 ${
              mobileTab === 'editor'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-500'
            }`}
          >
            Form Editor
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2 text-center border-b-2 ${
              mobileTab === 'preview'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-500'
            }`}
          >
            Live Preview
          </button>
        </div>
      </header>

      {/* Style & Template Customizer Drawer (Top/Collapsible) */}
      {showStyleDrawer && (
        <div className="no-print bg-white border-b border-slate-200 px-6 py-4 shadow-sm animate-fade-in">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Template Selector */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Template Style
              </label>
              <select
                value={resume.templateSettings.templateId}
                onChange={(e) => updateTemplateSetting('templateId', e.target.value as TemplateId)}
                className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                {TEMPLATE_OPTIONS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Accent Color */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Accent Color
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {ACCENT_COLOR_OPTIONS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => updateTemplateSetting('accentColor', col.id)}
                    className={`w-5 h-5 rounded-full ${col.bg} transition ${
                      resume.templateSettings.accentColor === col.id
                        ? 'ring-2 ring-offset-2 ring-slate-800 scale-110'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    title={col.label}
                  />
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Typography Font
              </label>
              <select
                value={resume.templateSettings.fontFamily}
                onChange={(e) => updateTemplateSetting('fontFamily', e.target.value as FontFamily)}
                className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Layout Density / Font Size
              </label>
              <div className="flex gap-1">
                {FONT_SIZE_OPTIONS.map((sz) => (
                  <button
                    key={sz.id}
                    onClick={() => updateTemplateSetting('fontSize', sz.id)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition ${
                      resume.templateSettings.fontSize === sz.id
                        ? 'bg-blue-600 text-white border-blue-600 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Two-Panel Workspace */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Multi-Section Form Editor */}
        <div
          className={`no-print md:col-span-5 lg:col-span-5 xl:col-span-5 w-full ${
            mobileTab === 'editor' ? 'block' : 'hidden md:block'
          }`}
        >
          {/* Quick AI Trigger Banner */}
          <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  AI Role Intelligence Active
                </span>
                <span className="text-[11px] text-slate-500">
                  Target: {resume.personalInfo.jobTitle || 'Enter role below'}
                </span>
              </div>
            </div>
            <button
              onClick={handleAIGenerateFullResume}
              disabled={isGeneratingRole}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition disabled:opacity-50"
            >
              {isGeneratingRole ? 'Writing...' : 'Generate with AI'}
            </button>
          </div>

          <ResumeEditor
            resume={resume}
            onChange={onChange}
            onOpenSummaryModal={onOpenSummaryModal}
          />
        </div>

        {/* RIGHT PANEL: Live Resume Preview */}
        <div
          className={`md:col-span-7 lg:col-span-7 xl:col-span-7 w-full flex flex-col items-center sticky top-20 ${
            mobileTab === 'preview' ? 'block' : 'hidden md:block'
          }`}
        >
          {/* Live Preview Control bar */}
          <div className="no-print w-full max-w-[850px] mb-3 flex items-center justify-between px-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-700">Live Interactive Preview</span>
              <span className="text-slate-400">({resume.templateSettings.templateId} template)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / PDF
              </button>
              <span>•</span>
              <button
                onClick={handleDownloadDocx}
                className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                Download DOCX
              </button>
            </div>
          </div>

          {/* Sheet Preview Container */}
          <div className="w-full flex justify-center overflow-x-auto pb-12">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};
