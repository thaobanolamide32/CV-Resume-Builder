import React, { useState } from 'react';
import { ResumeData, JobMatchResult } from '../types/resume';
import { matchJobDescriptionAI } from '../services/api';
import {
  X,
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  RefreshCw,
  Plus,
} from 'lucide-react';

interface JobMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onApplySuggestions?: (suggestions: string[]) => void;
}

export const JobMatcherModal: React.FC<JobMatcherModalProps> = ({
  isOpen,
  onClose,
  resume,
  onApplySuggestions,
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState(resume.personalInfo.jobTitle || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste the job advertisement or requirements.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await matchJobDescriptionAI({
        resume,
        jobDescription,
        targetRole,
      });
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze job matching. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Job Description Matcher</h2>
              <p className="text-xs text-slate-500">
                Benchmark your qualifications against specific job advertisement requirements
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Target Role for this Vacancy
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Lead Product Manager"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Job Advertisement / Requirements Text
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={5}
                placeholder="Paste the full job post description, required qualifications, technical stack, responsibilities, etc..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
              />
            </div>

            <button
              onClick={handleMatch}
              disabled={loading || !jobDescription.trim()}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Job Match with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Match &amp; Generate Tailored Suggestions
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-6 pt-2 border-t border-slate-200">
              {/* Match Score */}
              <div className="flex items-center gap-5 p-4 rounded-xl border border-indigo-100 bg-indigo-50/50">
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-white border-2 border-indigo-500 flex flex-col items-center justify-center shadow-sm">
                  <span className="text-2xl font-black text-indigo-600">
                    {result.matchPercentage}%
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Match</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Match Analysis for: {result.roleTitle || targetRole}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Evaluated candidate credentials against employer requirements with strict truthfulness enforcement.
                  </p>
                </div>
              </div>

              {/* Skills breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Matching Skills ({result.matchingSkills?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchingSkills?.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 bg-white border border-emerald-200 text-emerald-800 rounded font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase mb-2">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    Missing or Desired Qualifications
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingSkills?.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 bg-white border border-rose-200 text-rose-800 rounded font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Unsupported requirements warning */}
              {result.unsupportedRequirements && result.unsupportedRequirements.length > 0 && (
                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
                  <h4 className="text-xs font-bold text-amber-900 uppercase mb-1">
                    Requirements Not Supported in Current Resume:
                  </h4>
                  <p className="text-[11px] text-amber-800 mb-2">
                    Per our AI ethics rules, these cannot be fabricated. Only add them if you have genuine prior experience:
                  </p>
                  <ul className="list-disc ml-4 space-y-0.5 text-xs text-amber-900">
                    {result.unsupportedRequirements.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tailored bullet improvements */}
              {result.tailoredSuggestions && result.tailoredSuggestions.length > 0 && (
                <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/20 space-y-2">
                  <h4 className="text-xs font-bold text-indigo-900 uppercase">
                    Tailored Bullet Suggestions for this Vacancy
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {result.tailoredSuggestions.map((sug, i) => (
                      <li key={i} className="p-2.5 bg-white border border-slate-200 rounded-lg">
                        {sug}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
