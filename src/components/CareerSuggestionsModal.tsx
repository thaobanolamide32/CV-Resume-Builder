import React, { useState, useEffect } from 'react';
import { CareerSuggestion, CareerLevel } from '../types/resume';
import { getCareerSuggestionsAI } from '../services/api';
import {
  X,
  Compass,
  Sparkles,
  TrendingUp,
  Award,
  Layers,
  ArrowRight,
  RefreshCw,
  Info,
} from 'lucide-react';

interface CareerSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  careerLevel: CareerLevel;
  existingSkills: string[];
}

export const CareerSuggestionsModal: React.FC<CareerSuggestionsModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  careerLevel,
  existingSkills,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CareerSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCareerSuggestionsAI({
        targetRole: jobTitle || 'Professional',
        careerLevel,
        existingSkills,
      });
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to generate career suggestions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !data) {
      fetchSuggestions();
    }
  }, [isOpen, jobTitle]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600/10 text-teal-600 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">AI Career &amp; Growth Roadmap</h2>
              <p className="text-xs text-slate-500">
                Industry-specific career roadmap, certifications &amp; high-impact project suggestions
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
          {/* Disclaimer banner */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Ethical Notice:</strong> All items listed here are growth recommendations and future career suggestions, not existing qualifications you currently possess.
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">Role Analyzed:</span>
              <span className="text-sm font-bold text-slate-900 ml-1.5">{jobTitle || 'General'}</span>
              <span className="text-xs px-2 py-0.5 ml-2 rounded-full bg-slate-100 text-slate-600 font-medium">
                {careerLevel}
              </span>
            </div>
            <button
              onClick={fetchSuggestions}
              disabled={loading}
              className="px-3 py-1.5 text-xs text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg flex items-center gap-1.5 font-medium transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {loading && !data && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-slate-700">
                Analyzing industry standards &amp; emerging competencies...
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
              {error}
            </div>
          )}

          {data && (
            <div className="space-y-6">
              {/* Overview */}
              {data.overview && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-1">Career Landscape:</span>
                  {data.overview}
                </div>
              )}

              {/* In Demand Skills */}
              {data.inDemandSkills && data.inDemandSkills.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      High-Demand Skills to Learn Next
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {data.inDemandSkills.map((item, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-slate-200 bg-white hover:border-teal-300 transition"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-900">{item.name}</span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              item.priority === 'High'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{item.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Certifications */}
              {data.recommendedCertifications && data.recommendedCertifications.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-purple-600" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Respected Industry Certifications
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {data.recommendedCertifications.map((cert, i) => (
                      <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white">
                        <span className="text-xs font-bold text-slate-900 block">{cert.name}</span>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                          <span>Issuer: {cert.issuer}</span>
                          <span>Est: {cert.estimatedTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* High Impact Projects */}
              {data.highImpactProjects && data.highImpactProjects.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Standout Portfolio Projects to Build
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {data.highImpactProjects.map((proj, i) => (
                      <div key={i} className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                          <span className="text-[11px] font-mono text-blue-600">{proj.tech}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Progression Stages */}
              {data.careerPath && data.careerPath.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
                    Logical Career Progression
                  </h3>
                  <div className="relative pl-6 space-y-4 border-l-2 border-teal-200 ml-2">
                    {data.careerPath.map((step, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-teal-500 border-2 border-white" />
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-bold text-slate-900">{step.stage}</span>
                          <span className="text-[11px] text-teal-700 font-medium">({step.timeframe})</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{step.milestones}</p>
                      </div>
                    ))}
                  </div>
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
