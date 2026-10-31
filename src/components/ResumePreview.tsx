import React from 'react';
import {
  ResumeData,
  AccentColor,
  FontFamily,
  FontSize,
  TemplateId,
  SectionKey,
} from '../types/resume';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
  Award as AwardIcon,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
  onEditSection?: (section: SectionKey) => void;
}

const ACCENT_COLORS: Record<
  AccentColor,
  {
    primary: string;
    primaryBg: string;
    border: string;
    text: string;
    tagBg: string;
    tagText: string;
    badgeBg: string;
    sidebarBg: string;
  }
> = {
  blue: {
    primary: '#2563eb',
    primaryBg: 'bg-blue-600',
    border: 'border-blue-500',
    text: 'text-blue-600',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-700',
    badgeBg: 'bg-blue-100',
    sidebarBg: 'bg-blue-50/60',
  },
  indigo: {
    primary: '#4f46e5',
    primaryBg: 'bg-indigo-600',
    border: 'border-indigo-500',
    text: 'text-indigo-600',
    tagBg: 'bg-indigo-50',
    tagText: 'text-indigo-700',
    badgeBg: 'bg-indigo-100',
    sidebarBg: 'bg-indigo-50/60',
  },
  emerald: {
    primary: '#059669',
    primaryBg: 'bg-emerald-600',
    border: 'border-emerald-500',
    text: 'text-emerald-700',
    tagBg: 'bg-emerald-50',
    tagText: 'text-emerald-800',
    badgeBg: 'bg-emerald-100',
    sidebarBg: 'bg-emerald-50/60',
  },
  slate: {
    primary: '#334155',
    primaryBg: 'bg-slate-800',
    border: 'border-slate-700',
    text: 'text-slate-800',
    tagBg: 'bg-slate-100',
    tagText: 'text-slate-800',
    badgeBg: 'bg-slate-200',
    sidebarBg: 'bg-slate-100/70',
  },
  teal: {
    primary: '#0d9488',
    primaryBg: 'bg-teal-600',
    border: 'border-teal-500',
    text: 'text-teal-700',
    tagBg: 'bg-teal-50',
    tagText: 'text-teal-800',
    badgeBg: 'bg-teal-100',
    sidebarBg: 'bg-teal-50/60',
  },
  amber: {
    primary: '#d97706',
    primaryBg: 'bg-amber-600',
    border: 'border-amber-500',
    text: 'text-amber-700',
    tagBg: 'bg-amber-50',
    tagText: 'text-amber-800',
    badgeBg: 'bg-amber-100',
    sidebarBg: 'bg-amber-50/60',
  },
  rose: {
    primary: '#e11d48',
    primaryBg: 'bg-rose-600',
    border: 'border-rose-500',
    text: 'text-rose-600',
    tagBg: 'bg-rose-50',
    tagText: 'text-rose-700',
    badgeBg: 'bg-rose-100',
    sidebarBg: 'bg-rose-50/60',
  },
  purple: {
    primary: '#9333ea',
    primaryBg: 'bg-purple-600',
    border: 'border-purple-500',
    text: 'text-purple-600',
    tagBg: 'bg-purple-50',
    tagText: 'text-purple-700',
    badgeBg: 'bg-purple-100',
    sidebarBg: 'bg-purple-50/60',
  },
};

const FONT_CLASSES: Record<FontFamily, string> = {
  inter: 'font-inter',
  merriweather: 'font-merriweather',
  roboto: 'font-roboto',
  poppins: 'font-poppins',
  mono: 'font-mono',
};

const FONT_SIZE_MAP: Record<
  FontSize,
  {
    container: string;
    name: string;
    heading: string;
    subheading: string;
    body: string;
    small: string;
  }
> = {
  compact: {
    container: 'text-[12.5px] leading-relaxed',
    name: 'text-2xl',
    heading: 'text-sm tracking-wider font-bold',
    subheading: 'text-xs font-semibold',
    body: 'text-[12px] leading-normal',
    small: 'text-[11px]',
  },
  normal: {
    container: 'text-[13.5px] leading-relaxed',
    name: 'text-3xl',
    heading: 'text-base tracking-wide font-bold',
    subheading: 'text-sm font-semibold',
    body: 'text-[13px] leading-relaxed',
    small: 'text-xs',
  },
  relaxed: {
    container: 'text-[14.5px] leading-loose',
    name: 'text-3xl',
    heading: 'text-lg tracking-wide font-bold',
    subheading: 'text-base font-semibold',
    body: 'text-[14px] leading-relaxed',
    small: 'text-[13px]',
  },
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume, onEditSection }) => {
  const {
    templateId = 'modern',
    accentColor = 'blue',
    fontFamily = 'inter',
    fontSize = 'normal',
  } = resume.templateSettings || {};

  const colors = ACCENT_COLORS[accentColor] || ACCENT_COLORS.blue;
  const fontClass = FONT_CLASSES[fontFamily] || 'font-inter';
  const sizeConfig = FONT_SIZE_MAP[fontSize] || FONT_SIZE_MAP.normal;

  const { personalInfo, workExperience, education, skills, projects, certifications, awards, languages } = resume;

  // Render individual sections
  const renderSummary = () => {
    if (!resume.professionalSummary) return null;
    return (
      <section className="mb-4">
        {renderSectionHeader('Professional Summary', 'summary')}
        <p className={`${sizeConfig.body} text-slate-700 whitespace-pre-line text-justify`}>
          {resume.professionalSummary}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!workExperience || workExperience.length === 0) return null;
    return (
      <section className="mb-5">
        {renderSectionHeader('Work Experience', 'experience')}
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id} className="group">
              <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                <div>
                  <span className={`${sizeConfig.subheading} text-slate-900 font-bold`}>
                    {exp.jobTitle}
                  </span>
                  {exp.company && (
                    <span className={`${sizeConfig.body} text-slate-700 ml-1.5 font-medium`}>
                      — {exp.company}
                    </span>
                  )}
                </div>
                <div className={`${sizeConfig.small} text-slate-500 font-medium`}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                  {exp.location && ` | ${exp.location}`}
                </div>
              </div>

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="list-disc ml-4 space-y-1 text-slate-700 marker:text-slate-400">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className={`${sizeConfig.body} leading-normal`}>
                      {resp}
                    </li>
                  ))}
                </ul>
              )}

              {exp.achievements && exp.achievements.length > 0 && (
                <div className="mt-1.5 ml-4 space-y-1">
                  {exp.achievements.map((ach, i) => (
                    <div key={i} className={`${sizeConfig.small} text-slate-800 flex items-start gap-1.5`}>
                      <span className={`font-semibold ${colors.text}`}>Key Achievement:</span>
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 ml-4">
                  <span className={`${sizeConfig.small} text-slate-500 mr-1 self-center`}>Tech:</span>
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`${sizeConfig.small} px-2 py-0.5 rounded ${colors.tagBg} ${colors.tagText} font-medium`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducation = () => {
    if (!education || education.length === 0) return null;
    return (
      <section className="mb-4">
        {renderSectionHeader('Education', 'education')}
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <div>
                  <span className={`${sizeConfig.subheading} text-slate-900 font-bold`}>
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </span>
                  {edu.institution && (
                    <span className={`${sizeConfig.body} text-slate-700 ml-1.5 font-medium`}>
                      | {edu.institution}
                    </span>
                  )}
                </div>
                <div className={`${sizeConfig.small} text-slate-500 font-medium`}>
                  {edu.startYear} - {edu.endYear || 'Present'}
                </div>
              </div>
              {edu.grade && (
                <div className={`${sizeConfig.small} text-slate-600 italic mt-0.5`}>
                  Grade / Honors: {edu.grade}
                </div>
              )}
              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="list-disc ml-4 mt-1 space-y-0.5 text-slate-600 marker:text-slate-400">
                  {edu.achievements.map((ach, i) => (
                    <li key={i} className={sizeConfig.small}>
                      {ach}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    if (!skills || skills.length === 0) return null;
    return (
      <section className="mb-4">
        {renderSectionHeader('Skills & Competencies', 'skills')}
        <div className="space-y-2">
          {skills.map((cat, i) => (
            <div key={i} className="flex flex-wrap items-baseline gap-2">
              <span className={`${sizeConfig.small} font-bold text-slate-800 min-w-32`}>
                {cat.category}:
              </span>
              <div className="flex flex-wrap gap-1.5 flex-1">
                {cat.skills.map((skill, j) => (
                  <span
                    key={j}
                    className={`${sizeConfig.small} px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-800 font-medium`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (!projects || projects.length === 0) return null;
    return (
      <section className="mb-4">
        {renderSectionHeader('Key Projects', 'projects')}
        <div className="space-y-3">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <div className="flex items-center gap-1.5">
                  <span className={`${sizeConfig.subheading} text-slate-900 font-bold`}>
                    {proj.name}
                  </span>
                  {proj.url && (
                    <span className={`${sizeConfig.small} ${colors.text} flex items-center gap-0.5 underline`}>
                      {proj.url}
                    </span>
                  )}
                </div>
              </div>
              {proj.description && (
                <p className={`${sizeConfig.body} text-slate-700 mt-0.5 leading-normal`}>
                  {proj.description}
                </p>
              )}
              {proj.technologies && proj.technologies.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {proj.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`${sizeConfig.small} px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[11px]`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderCertifications = () => {
    if (!certifications || certifications.length === 0) return null;
    return (
      <section className="mb-4">
        {renderSectionHeader('Certifications & Licenses', 'certifications')}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-start gap-2">
              <span className={`w-1.5 h-1.5 rounded-full mt-2 ${colors.primaryBg}`} />
              <div>
                <span className={`${sizeConfig.subheading} text-slate-900`}>{cert.name}</span>
                <div className={`${sizeConfig.small} text-slate-500`}>
                  {cert.issuer} ({cert.issueDate}
                  {cert.expiryDate ? ` - ${cert.expiryDate}` : ''})
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderAwards = () => {
    if (!awards || awards.length === 0) return null;
    return (
      <section className="mb-4">
        {renderSectionHeader('Honors & Awards', 'awards')}
        <div className="space-y-1.5">
          {awards.map((award) => (
            <div key={award.id} className="flex items-start justify-between">
              <div>
                <span className={`${sizeConfig.subheading} text-slate-900`}>{award.title}</span>
                <span className={`${sizeConfig.small} text-slate-600 ml-1.5`}>— {award.issuer}</span>
                {award.description && (
                  <p className={`${sizeConfig.small} text-slate-500`}>{award.description}</p>
                )}
              </div>
              <span className={`${sizeConfig.small} text-slate-400 font-medium`}>{award.year}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderLanguages = () => {
    if (!languages || languages.length === 0) return null;
    return (
      <section className="mb-4">
        {renderSectionHeader('Languages', 'languages')}
        <p className={`${sizeConfig.body} text-slate-700`}>{languages.join('  •  ')}</p>
      </section>
    );
  };

  // Section Header Generator based on current template style
  const renderSectionHeader = (title: string, sectionKey: SectionKey) => {
    if (templateId === 'classic') {
      return (
        <div className="mb-2 border-b-2 border-slate-700 pb-1 flex items-center justify-between">
          <h2 className={`${sizeConfig.heading} uppercase tracking-wider text-slate-900 font-serif`}>
            {title}
          </h2>
          {onEditSection && (
            <button
              onClick={() => onEditSection(sectionKey)}
              className="no-print text-[11px] text-slate-400 hover:text-slate-600 font-normal"
            >
              Edit
            </button>
          )}
        </div>
      );
    }

    if (templateId === 'minimal') {
      return (
        <div className="mb-2 border-b border-slate-200 pb-1 flex items-center justify-between">
          <h2 className={`${sizeConfig.heading} tracking-widest uppercase text-slate-500 text-xs font-semibold`}>
            {title}
          </h2>
          {onEditSection && (
            <button
              onClick={() => onEditSection(sectionKey)}
              className="no-print text-[11px] text-slate-400 hover:text-slate-600 font-normal"
            >
              Edit
            </button>
          )}
        </div>
      );
    }

    if (templateId === 'executive') {
      return (
        <div className="mb-2.5 flex items-center gap-2 border-b border-slate-200 pb-1 justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 ${colors.primaryBg} rounded-sm`} />
            <h2 className={`${sizeConfig.heading} uppercase font-bold text-slate-900 tracking-wide`}>
              {title}
            </h2>
          </div>
          {onEditSection && (
            <button
              onClick={() => onEditSection(sectionKey)}
              className="no-print text-[11px] text-slate-400 hover:text-slate-600 font-normal"
            >
              Edit
            </button>
          )}
        </div>
      );
    }

    if (templateId === 'technical') {
      return (
        <div className="mb-2 border-b-2 border-slate-800 pb-1 flex items-center justify-between">
          <h2 className={`${sizeConfig.heading} font-mono uppercase font-bold ${colors.text} flex items-center gap-2`}>
            <span>#</span> {title}
          </h2>
          {onEditSection && (
            <button
              onClick={() => onEditSection(sectionKey)}
              className="no-print text-[11px] text-slate-400 hover:text-slate-600 font-normal font-sans"
            >
              Edit
            </button>
          )}
        </div>
      );
    }

    // Default Modern & Academic & Entry-level
    return (
      <div className={`mb-2.5 border-b-2 ${colors.border} pb-1 flex items-center justify-between`}>
        <h2 className={`${sizeConfig.heading} uppercase font-bold ${colors.text}`}>
          {title}
        </h2>
        {onEditSection && (
          <button
            onClick={() => onEditSection(sectionKey)}
            className="no-print text-[11px] text-slate-400 hover:text-slate-600 font-normal"
          >
            Edit
          </button>
        )}
      </div>
    );
  };

  const renderSectionByKey = (key: SectionKey) => {
    switch (key) {
      case 'summary':
        return renderSummary();
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      case 'certifications':
        return renderCertifications();
      case 'awards':
        return renderAwards();
      case 'languages':
        return renderLanguages();
      default:
        return null;
    }
  };

  const sectionOrder: SectionKey[] = resume.sectionOrder || [
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'awards',
    'languages',
  ];

  // TEMPLATE 5: CREATIVE (Sidebar Layout)
  if (templateId === 'creative') {
    return (
      <div
        id="resume-preview-sheet"
        className={`w-full max-w-[850px] min-h-[1100px] bg-white mx-auto shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row ${fontClass} ${sizeConfig.container}`}
      >
        {/* Left Sidebar */}
        <div className={`w-full md:w-72 p-6 md:p-8 ${colors.sidebarBg} border-r border-slate-200 flex flex-col justify-between`}>
          <div>
            <div className="mb-6">
              <h1 className={`${sizeConfig.name} font-bold text-slate-900 leading-tight`}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className={`${sizeConfig.subheading} font-semibold ${colors.text} mt-1`}>
                {personalInfo.jobTitle || 'Professional Title'}
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-2 mb-8">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">
                Contact Details
              </h3>
              {personalInfo.email && (
                <div className="flex items-center gap-2 text-slate-700 text-xs break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2 text-slate-700 text-xs">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 text-slate-700 text-xs break-all">
                  <Linkedin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex items-center gap-2 text-slate-700 text-xs break-all">
                  <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personalInfo.portfolio}</span>
                </div>
              )}
            </div>

            {/* Sidebar Skills */}
            {skills && skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.flatMap((s) => s.skills).map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 bg-white border border-slate-200 rounded font-medium text-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar Languages */}
            {languages && languages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">
                  Languages
                </h3>
                <ul className="text-xs space-y-1 text-slate-700">
                  {languages.map((l, i) => (
                    <li key={i}>• {l}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Main Content */}
        <div className="flex-1 p-6 md:p-8 bg-white">
          {sectionOrder
            .filter((k) => k !== 'languages')
            .map((k) => (
              <React.Fragment key={k}>{renderSectionByKey(k)}</React.Fragment>
            ))}
        </div>
      </div>
    );
  }

  // TEMPLATE 4: EXECUTIVE (Top Dark Banner + Grid)
  if (templateId === 'executive') {
    return (
      <div
        id="resume-preview-sheet"
        className={`w-full max-w-[850px] min-h-[1100px] bg-white mx-auto shadow-2xl rounded-sm overflow-hidden ${fontClass} ${sizeConfig.container}`}
      >
        {/* Executive Banner */}
        <div className="bg-slate-900 text-white p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className={`${sizeConfig.name} font-bold tracking-tight text-white`}>
                {personalInfo.fullName || 'Executive Name'}
              </h1>
              <p className={`text-base font-medium ${colors.text} text-blue-400 mt-1 uppercase tracking-widest`}>
                {personalInfo.jobTitle || 'Executive Title'}
              </p>
            </div>
            <div className="text-right text-xs text-slate-300 space-y-1">
              <div>{personalInfo.email}</div>
              <div>{personalInfo.phone}</div>
              <div>{personalInfo.location}</div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {sectionOrder.map((k) => (
            <React.Fragment key={k}>{renderSectionByKey(k)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // STANDARD TEMPLATES (Modern, Classic, Minimal, Technical, Academic, Entry-Level)
  return (
    <div
      id="resume-preview-sheet"
      className={`w-full max-w-[850px] min-h-[1100px] bg-white mx-auto shadow-2xl rounded-sm p-8 md:p-10 ${fontClass} ${sizeConfig.container}`}
    >
      {/* Header block */}
      <header className={`mb-6 ${templateId === 'classic' ? 'text-center' : ''}`}>
        <h1
          className={`${sizeConfig.name} font-bold text-slate-900 tracking-tight leading-none mb-1.5`}
        >
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p
          className={`${sizeConfig.subheading} font-semibold ${colors.text} tracking-wide uppercase mb-3`}
        >
          {personalInfo.jobTitle || 'Your Professional Role'}
        </p>

        {/* Contact info row */}
        <div
          className={`flex flex-wrap gap-x-4 gap-y-1.5 ${sizeConfig.small} text-slate-600 ${
            templateId === 'classic' ? 'justify-center' : ''
          }`}
        >
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.portfolio}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Render sections according to resume.sectionOrder */}
      <div className="space-y-4">
        {sectionOrder.map((sectionKey) => (
          <React.Fragment key={sectionKey}>{renderSectionByKey(sectionKey)}</React.Fragment>
        ))}
      </div>
    </div>
  );
};
