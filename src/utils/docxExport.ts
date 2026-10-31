import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from 'docx';
import { ResumeData } from '../types/resume';

export async function exportResumeToDocx(resume: ResumeData): Promise<Blob> {
  const children: Paragraph[] = [];

  // Header / Name
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: resume.personalInfo.fullName || 'Untitled Resume',
          bold: true,
          size: 36, // 18pt
          font: 'Calibri',
          color: '1E293B',
        }),
      ],
    })
  );

  // Subtitle / Job Title
  if (resume.personalInfo.jobTitle) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: resume.personalInfo.jobTitle,
            size: 24, // 12pt
            color: '2563EB',
            bold: true,
          }),
        ],
      })
    );
  }

  // Contact Info Line
  const contactParts: string[] = [];
  if (resume.personalInfo.email) contactParts.push(resume.personalInfo.email);
  if (resume.personalInfo.phone) contactParts.push(resume.personalInfo.phone);
  if (resume.personalInfo.location) contactParts.push(resume.personalInfo.location);
  if (resume.personalInfo.linkedin) contactParts.push(resume.personalInfo.linkedin);
  if (resume.personalInfo.portfolio) contactParts.push(resume.personalInfo.portfolio);
  if (resume.personalInfo.github) contactParts.push(resume.personalInfo.github);

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 280 },
        children: [
          new TextRun({
            text: contactParts.join('  |  '),
            size: 19, // 9.5pt
            color: '64748B',
          }),
        ],
      })
    );
  }

  // Helper for Section Heading
  const addSectionHeader = (title: string) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 100 },
        border: {
          bottom: {
            color: '2563EB',
            space: 4,
            style: BorderStyle.SINGLE,
            size: 12,
          },
        },
        children: [
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: 22, // 11pt
            color: '1E293B',
            font: 'Calibri',
          }),
        ],
      })
    );
  };

  // Render sections in order
  const sectionOrder = resume.sectionOrder || [
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'awards',
    'languages',
  ];

  for (const section of sectionOrder) {
    if (section === 'summary' && resume.professionalSummary) {
      addSectionHeader('Professional Summary');
      children.push(
        new Paragraph({
          spacing: { after: 180, line: 276 },
          children: [
            new TextRun({
              text: resume.professionalSummary,
              size: 21,
              font: 'Calibri',
            }),
          ],
        })
      );
    } else if (section === 'experience' && resume.workExperience && resume.workExperience.length > 0) {
      addSectionHeader('Work Experience');
      for (const exp of resume.workExperience) {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 40 },
            children: [
              new TextRun({
                text: exp.jobTitle,
                bold: true,
                size: 22,
                font: 'Calibri',
              }),
              new TextRun({
                text: exp.company ? `  —  ${exp.company}` : '',
                bold: true,
                color: '334155',
                size: 22,
              }),
              new TextRun({
                text: `  (${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}${
                  exp.location ? ` | ${exp.location}` : ''
                })`,
                italics: true,
                color: '64748B',
                size: 19,
              }),
            ],
          })
        );

        if (exp.responsibilities && exp.responsibilities.length > 0) {
          for (const resp of exp.responsibilities) {
            children.push(
              new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: resp,
                    size: 20,
                    font: 'Calibri',
                  }),
                ],
              })
            );
          }
        }

        if (exp.achievements && exp.achievements.length > 0) {
          for (const ach of exp.achievements) {
            children.push(
              new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: 'Key Achievement: ',
                    bold: true,
                    size: 20,
                  }),
                  new TextRun({
                    text: ach,
                    size: 20,
                    font: 'Calibri',
                  }),
                ],
              })
            );
          }
        }

        if (exp.technologies && exp.technologies.length > 0) {
          children.push(
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: 'Technologies: ',
                  italics: true,
                  size: 19,
                  color: '64748B',
                }),
                new TextRun({
                  text: exp.technologies.join(', '),
                  size: 19,
                  color: '475569',
                }),
              ],
            })
          );
        }
      }
    } else if (section === 'education' && resume.education && resume.education.length > 0) {
      addSectionHeader('Education');
      for (const edu of resume.education) {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 40 },
            children: [
              new TextRun({
                text: `${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}`,
                bold: true,
                size: 21,
                font: 'Calibri',
              }),
              new TextRun({
                text: edu.institution ? `  |  ${edu.institution}` : '',
                bold: false,
                color: '334155',
                size: 21,
              }),
              new TextRun({
                text: `  (${edu.startYear || ''} - ${edu.endYear || ''})`,
                italics: true,
                color: '64748B',
                size: 19,
              }),
            ],
          })
        );
        if (edu.grade) {
          children.push(
            new Paragraph({
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: `Grade / GPA: ${edu.grade}`,
                  italics: true,
                  size: 19,
                  color: '64748B',
                }),
              ],
            })
          );
        }
        if (edu.achievements && edu.achievements.length > 0) {
          for (const ach of edu.achievements) {
            children.push(
              new Paragraph({
                bullet: { level: 0 },
                spacing: { after: 30 },
                children: [
                  new TextRun({
                    text: ach,
                    size: 20,
                    font: 'Calibri',
                  }),
                ],
              })
            );
          }
        }
      }
    } else if (section === 'skills' && resume.skills && resume.skills.length > 0) {
      addSectionHeader('Skills & Competencies');
      for (const cat of resume.skills) {
        if (cat.skills && cat.skills.length > 0) {
          children.push(
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: `${cat.category}: `,
                  bold: true,
                  size: 20,
                  font: 'Calibri',
                }),
                new TextRun({
                  text: cat.skills.join('  •  '),
                  size: 20,
                  font: 'Calibri',
                  color: '334155',
                }),
              ],
            })
          );
        }
      }
    } else if (section === 'projects' && resume.projects && resume.projects.length > 0) {
      addSectionHeader('Key Projects');
      for (const proj of resume.projects) {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 30 },
            children: [
              new TextRun({
                text: proj.name,
                bold: true,
                size: 21,
                font: 'Calibri',
              }),
              new TextRun({
                text: proj.url ? `  (${proj.url})` : '',
                italics: true,
                size: 19,
                color: '2563EB',
              }),
            ],
          })
        );
        if (proj.description) {
          children.push(
            new Paragraph({
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: proj.description,
                  size: 20,
                  font: 'Calibri',
                }),
              ],
            })
          );
        }
        if (proj.technologies && proj.technologies.length > 0) {
          children.push(
            new Paragraph({
              spacing: { after: 60 },
              children: [
                new TextRun({
                  text: 'Tech Stack: ',
                  bold: true,
                  size: 19,
                  color: '64748B',
                }),
                new TextRun({
                  text: proj.technologies.join(', '),
                  size: 19,
                  color: '475569',
                }),
              ],
            })
          );
        }
      }
    } else if (section === 'certifications' && resume.certifications && resume.certifications.length > 0) {
      addSectionHeader('Certifications & Licenses');
      for (const cert of resume.certifications) {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: cert.name,
                bold: true,
                size: 20,
              }),
              new TextRun({
                text: ` — ${cert.issuer} (${cert.issueDate}${cert.expiryDate ? ` - ${cert.expiryDate}` : ''})`,
                size: 19,
                color: '475569',
              }),
            ],
          })
        );
      }
    } else if (section === 'awards' && resume.awards && resume.awards.length > 0) {
      addSectionHeader('Honors & Awards');
      for (const award of resume.awards) {
        children.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: award.title,
                bold: true,
                size: 20,
              }),
              new TextRun({
                text: ` — ${award.issuer} (${award.year})${award.description ? `: ${award.description}` : ''}`,
                size: 19,
                color: '475569',
              }),
            ],
          })
        );
      }
    } else if (section === 'languages' && resume.languages && resume.languages.length > 0) {
      addSectionHeader('Languages');
      children.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: resume.languages.join('  •  '),
              size: 20,
              font: 'Calibri',
            }),
          ],
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 in
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
