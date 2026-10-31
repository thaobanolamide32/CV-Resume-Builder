import React, { useState, useEffect } from 'react';
import { ResumeData, AtsCheckResult } from '../types/resume';
import { checkAtsAI } from '../services/api';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  RefreshCw,
  Search,
  Check,
} from 'lucide-react';

interface AtsCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onAddSkills: (skills: string[]) => void;
}

export const AtsCheckerModal: React.FC<AtsCheckerModalProps> = ({
  isOpen,
  onClose,
  resume,
  onAddSkills,
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState(resume.personalInfo.jobTitle || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AtsCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addedKeywords, setAddedKeywords] = useState<string[]>([]);

  const runScan = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await checkAtsAI({
        resume,
        targetRole: targetRole || resume.personalInfo.jobTitle,
        jobDescription: jobDescription || undefined,
      });
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to scan resume. Check network connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !result) {
      runScan();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddKeyword = (kw: string) => {
    onAddSkills([kw]);
    setAddedKeywords((prev) => [...prev, kw]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 border-emerald-500 bg-emerald-50';
    if (score >= 60) return 'text-amber-600 border-amber-500 bg-amber-50';
    return 'text-rose-600 border-rose-500 bg-rose-50';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">ATS Resume Checker</h2>
              <p className="text-xs text-slate-500">
                Applicant Tracking System compatibility & keyword analyzer
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
          {/* Target Role & Optional Job Ad Input */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="sm:self-end">
                <button
                  onClick={runScan}
                  disabled={loading}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      Re-scan Resume
                    </>
                  )}
                </button>
              </div>
            </div>

            <details className="text-xs text-slate-600">
              <summary className="cursor-pointer font-medium text-blue-600 hover:underline">
                + Paste specific job description to benchmark against
              </summary>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job advertisement requirements here for laser-targeted ATS keyword matching..."
                rows={3}
                className="w-full mt-2 text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </details>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
              <div>
                <p className="font-semibold">Scan Error</p>
                <p className="text-xs mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {loading && !result && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-700">
                Gemma 4 is inspecting keywords, structure, readability & ATS factors...
              </p>
              <p className="text-xs text-slate-400 max-w-sm">
                Evaluating against standard hiring filters for {targetRole || 'your role'}.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Score & Summary Banner */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white">
                <div
                  className={`w-24 h-24 shrink-0 rounded-2xl border-4 flex flex-col items-center justify-center shadow-inner ${getScoreColor(
                    result.score
                  )}`}
                >
                  <span className="text-3xl font-black">{result.score}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider">ATS Score</span>
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <span className="text-base font-bold text-slate-900">
                      Overall Rating: {result.overallRating}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full font-medium">
                      Role: {targetRole || resume.personalInfo.jobTitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{result.summary}</p>
                  <p className="text-[11px] text-slate-400 italic">
                    *ATS score estimates recruiter keyword parsing algorithms and is not an interview guarantee.
                  </p>
                </div>
              </div>

              {/* Keywords Detected & Missing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Detected Keywords */}
                <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/30">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wide mb-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Keywords Detected ({result.keywordsFound?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.keywordsFound && result.keywordsFound.length > 0 ? (
                      result.keywordsFound.map((kw, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-white border border-emerald-200 text-emerald-800 rounded-md font-medium"
                        >
                          {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">No industry keywords found yet.</span>
                    )}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/30">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs uppercase tracking-wide mb-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Missing High-Value Keywords ({result.missingKeywords?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords && result.missingKeywords.length > 0 ? (
                      result.missingKeywords.map((kw, i) => {
                        const isAdded = addedKeywords.includes(kw);
                        return (
                          <button
                            key={i}
                            onClick={() => !isAdded && handleAddKeyword(kw)}
                            disabled={isAdded}
                            className={`text-xs px-2 py-1 rounded-md font-medium border flex items-center gap-1 transition ${
                              isAdded
                                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                                : 'bg-white border-amber-300 text-amber-900 hover:bg-amber-100 cursor-pointer'
                            }`}
                            title="Click to add to your skills"
                          >
                            {isAdded ? <Check className="w-3 h-3 text-emerald-600" /> : '+'} {kw}
                          </button>
                        );
                      })
                    ) : (
                      <span className="text-xs text-slate-500">Great job! No major keywords missing.</span>
                    )}
                  </div>
                  <p className="text-[10px] text-amber-700 mt-2 italic">
                    Tip: Click any missing keyword to instantly add it to your resume skills.
                  </p>
                </div>
              </div>

              {/* Actionable Suggestions */}
              {result.contentSuggestions && result.contentSuggestions.length > 0 && (
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-2">
                  <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                    Content & Impact Recommendations
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {result.contentSuggestions.map((sug, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Section Completeness Checklist */}
              {result.sectionCompleteness && result.sectionCompleteness.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
                    Section Checklist
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {result.sectionCompleteness.map((sec, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2"
                      >
                        {sec.status === 'complete' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : sec.status === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="text-xs font-bold text-slate-900">{sec.section}</div>
                          <div className="text-[11px] text-slate-500">{sec.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Powered by Google AI Model
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
