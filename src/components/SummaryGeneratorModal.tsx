import React, { useState } from 'react';
import { generateSummariesAI } from '../services/api';
import { ResumeData } from '../types/resume';
import {
  X,
  Sparkles,
  Check,
  RefreshCw,
  Copy,
  Layers,
} from 'lucide-react';

interface SummaryGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onSelectSummary: (summary: string) => void;
}

export const SummaryGeneratorModal: React.FC<SummaryGeneratorModalProps> = ({
  isOpen,
  onClose,
  resume,
  onSelectSummary,
}) => {
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState<
    { style: string; text: string; targetAudience?: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const skillsFlat = (resume.skills || []).flatMap((c) => c.skills);
      const experienceHighlights = (resume.workExperience || [])
        .map((e) => `${e.jobTitle} at ${e.company}: ${(e.responsibilities || []).slice(0, 2).join('; ')}`)
        .join('\n');

      const data = await generateSummariesAI({
        jobTitle: resume.personalInfo.jobTitle || 'Professional',
        careerLevel: resume.careerLevel,
        skills: skillsFlat,
        experienceHighlights,
        currentSummary: resume.professionalSummary,
      });
      setSummaries(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate summary options');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleApply = (text: string) => {
    onSelectSummary(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Professional Summary Generator</h2>
              <p className="text-xs text-slate-500">
                Gemma 4 creates 3 distinct positioning options tailored to {resume.personalInfo.jobTitle || 'your role'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {summaries.length === 0 && !loading && (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Generate 3 Tailored Resume Summaries
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  AI will craft three distinct variations: Result &amp; Impact-Focused, Technical &amp; Domain Expertise, and Modern Career Narrative.
                </p>
              </div>
              <button
                onClick={handleGenerate}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate Summary Options
              </button>
            </div>
          )}

          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-700">
                Crafting professional summaries for {resume.personalInfo.jobTitle}...
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
              {error}
            </div>
          )}

          {summaries.length > 0 && !loading && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase">
                  Select a Summary to Apply
                </span>
                <button
                  onClick={handleGenerate}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </button>
              </div>

              {summaries.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-white shadow-xs transition space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide px-2 py-0.5 rounded bg-blue-50">
                      Option {idx + 1}: {item.style}
                    </span>
                    <button
                      onClick={() => handleCopy(item.text, idx)}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 text-[11px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed text-justify">
                    {item.text}
                  </p>

                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => handleApply(item.text)}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Use this Summary
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
