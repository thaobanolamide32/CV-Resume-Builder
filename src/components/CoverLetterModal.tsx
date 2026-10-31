import React, { useState } from 'react';
import { ResumeData, CoverLetterData } from '../types/resume';
import { generateCoverLetterAI } from '../services/api';
import {
  X,
  FileCheck,
  Sparkles,
  Copy,
  Check,
  Download,
  RefreshCw,
} from 'lucide-react';

interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({
  isOpen,
  onClose,
  resume,
}) => {
  const [targetRole, setTargetRole] = useState(resume.personalInfo.jobTitle || '');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState('Professional & Confident');
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<CoverLetterData | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateCoverLetterAI({
        resume,
        targetRole,
        companyName,
        jobDescription,
        tone,
      });
      setCoverLetter(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate cover letter');
    } finally {
      setLoading(false);
    }
  };

  const getFullText = () => {
    if (!coverLetter) return '';
    const dateStr = coverLetter.date || new Date().toLocaleDateString();
    return `${resume.personalInfo.fullName}\n${resume.personalInfo.email} | ${resume.personalInfo.phone}\n${resume.personalInfo.location}\n\n${dateStr}\n\nHiring Team\n${companyName || '[Company Name]'}\n\n${coverLetter.salutation || 'Dear Hiring Manager,'}\n\n${(coverLetter.bodyParagraphs || []).join('\n\n')}\n\n${coverLetter.closing || 'Sincerely,'}\n${resume.personalInfo.fullName}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = getFullText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(resume.personalInfo.fullName || 'Candidate').replace(/\s+/g, '_')}_Cover_Letter.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/10 text-purple-600 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">AI Cover Letter Generator</h2>
              <p className="text-xs text-slate-500">
                Customized, compelling letter based on your verified credentials
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
          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Stripe, Google, Mayo Clinic"
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Tone &amp; Style
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option>Professional &amp; Confident</option>
                <option>Modern &amp; Conversational</option>
                <option>Executive &amp; Visionary</option>
                <option>Enthusiastic &amp; Early-Career</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Target Job Description / Key Company Themes (Optional)
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={2}
                placeholder="Paste key responsibilities or company values to tailor the opening and closing hooks..."
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating Cover Letter with Gemma 4...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Tailored Cover Letter
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
              {error}
            </div>
          )}

          {/* Generated Cover Letter preview */}
          {coverLetter && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Generated Cover Letter
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-xs font-medium text-white flex items-center gap-1.5 transition shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download (.txt)
                  </button>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-800 font-serif space-y-4 shadow-inner">
                <div>
                  <div className="font-bold text-slate-900">{resume.personalInfo.fullName}</div>
                  <div className="text-slate-500 text-[11px] font-sans">
                    {resume.personalInfo.email} | {resume.personalInfo.phone} | {resume.personalInfo.location}
                  </div>
                </div>

                <div className="text-slate-500 text-[11px] font-sans">
                  {coverLetter.date || new Date().toLocaleDateString()}
                </div>

                <div>
                  <div className="font-semibold text-slate-900">Hiring Team</div>
                  <div className="text-slate-700">{companyName || '[Company Name]'}</div>
                </div>

                <div className="font-bold text-slate-900">{coverLetter.salutation}</div>

                <div className="space-y-3 font-sans text-xs text-slate-700 leading-relaxed">
                  {coverLetter.bodyParagraphs?.map((p, i) => (
                    <p key={i} className="text-justify">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="text-slate-700">{coverLetter.closing}</div>
                  <div className="font-bold text-slate-900 mt-1">{resume.personalInfo.fullName}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
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
