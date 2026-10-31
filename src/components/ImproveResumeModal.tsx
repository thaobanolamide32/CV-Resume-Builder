import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { improveResumeAI } from '../services/api';
import {
  X,
  Wand2,
  Sparkles,
  Upload,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';

interface ImproveResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyImprovedResume: (improved: Partial<ResumeData>) => void;
}

export const ImproveResumeModal: React.FC<ImproveResumeModalProps> = ({
  isOpen,
  onClose,
  onApplyImprovedResume,
}) => {
  const [rawText, setRawText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImprove = async () => {
    if (!rawText.trim() || rawText.length < 25) {
      setError('Please paste the complete text of your resume (at least a few lines).');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await improveResumeAI({
        rawResumeText: rawText,
        targetRole,
      });
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to improve resume with AI');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!result) return;
    onApplyImprovedResume({
      personalInfo: result.personalInfo || {},
      professionalSummary: result.professionalSummary || '',
      workExperience: (result.workExperience || []).map((exp: any, i: number) => ({
        id: `exp-${Date.now()}-${i}`,
        jobTitle: exp.jobTitle || 'Role',
        company: exp.company || '',
        location: exp.location || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        current: !!exp.current,
        responsibilities: exp.responsibilities || [],
        achievements: exp.achievements || [],
        technologies: exp.technologies || [],
      })),
      education: (result.education || []).map((edu: any, i: number) => ({
        id: `edu-${Date.now()}-${i}`,
        institution: edu.institution || '',
        degree: edu.degree || '',
        fieldOfStudy: edu.fieldOfStudy || '',
        startYear: edu.startYear || '',
        endYear: edu.endYear || '',
        grade: edu.grade || '',
      })),
      skills: result.skills || [],
      projects: (result.projects || []).map((p: any, i: number) => ({
        id: `proj-${Date.now()}-${i}`,
        name: p.name || 'Project',
        description: p.description || '',
        technologies: p.technologies || [],
      })),
      certifications: (result.certifications || []).map((c: any, i: number) => ({
        id: `cert-${Date.now()}-${i}`,
        name: c.name || 'Certification',
        issuer: c.issuer || '',
        issueDate: c.issueDate || '',
      })),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Improve My Existing Resume</h2>
              <p className="text-xs text-slate-500">
                Paste your current resume or rough text to elevate wording, ATS keywords &amp; structure
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
          {!result ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Target Job Title (Optional - for tailored ATS terminology)
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Project Manager, Registered Nurse, Full-Stack Developer..."
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Paste Existing Resume Content (Raw text, plain text, or notes)
                </label>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  rows={10}
                  placeholder="Paste your resume here (Contact info, work experience, education, skills, rough notes). Gemma 4 will organize, rewrite bullets with active verbs, and format it into a polished resume."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                />
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
                  {error}
                </div>
              )}

              <button
                onClick={handleImprove}
                disabled={loading || !rawText.trim()}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Elevating &amp; Restructuring Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Improve &amp; Modernize Resume with AI
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Successfully restructured and improved resume! Review the summary and notes below before importing.
                </span>
              </div>

              {/* Notes */}
              {result.improvementNotes && result.improvementNotes.length > 0 && (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-800 uppercase">
                    AI Improvements Made
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {result.improvementNotes.map((note: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preview of Parsed info */}
              <div className="space-y-3 border border-slate-200 rounded-xl p-4 bg-white">
                <div className="text-sm font-bold text-slate-900">
                  {result.personalInfo?.fullName || 'Candidate Name'} —{' '}
                  <span className="text-amber-600">
                    {result.personalInfo?.jobTitle || 'Role'}
                  </span>
                </div>
                {result.professionalSummary && (
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{result.professionalSummary}"
                  </p>
                )}
                <div className="text-xs text-slate-500">
                  Detected {result.workExperience?.length || 0} work experiences,{' '}
                  {result.education?.length || 0} education entries, and{' '}
                  {result.skills?.length || 0} skill categories.
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-2 text-xs border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100"
                >
                  Back to Text Editor
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <ArrowRight className="w-4 h-4" />
                  Apply Improved Resume into Workspace
                </button>
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
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
