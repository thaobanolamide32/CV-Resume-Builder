import { ResumeData } from '../types/resume';

export const SAMPLE_RESUMES: Record<string, ResumeData> = {
  technical: {
    id: 'sample-tech-1',
    title: 'Senior Full-Stack Engineer Resume',
    lastModified: Date.now() - 3600000 * 2,
    careerLevel: 'Senior Professional',
    personalInfo: {
      fullName: 'Alex Vance',
      jobTitle: 'Senior Full-Stack Engineer',
      email: 'alex.vance@techcorp.dev',
      phone: '+1 (555) 349-2810',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/alexvance-dev',
      github: 'github.com/alexvance',
      portfolio: 'alexvance.codes',
      website: 'alexvance.codes',
    },
    professionalSummary:
      'Performance-driven Senior Full-Stack Engineer with 7+ years of experience architecting distributed cloud applications, high-throughput microservices, and modern reactive web frontends. Proven track record reducing system latency by 42% and leading engineering teams across Agile sprints to ship reliable production systems.',
    workExperience: [
      {
        id: 'w-1',
        jobTitle: 'Lead Software Engineer',
        company: 'CloudScale Technologies',
        location: 'San Francisco, CA',
        startDate: '2022-03',
        endDate: '',
        current: true,
        responsibilities: [
          'Architected and deployed resilient event-driven microservices handling 25M+ daily API transactions using Node.js, Go, and Kafka.',
          'Spearheaded frontend modernization from legacy monolithic architecture to React 19 and Next.js, cutting page load time by 48%.',
          'Mentored 6 junior and mid-level developers through rigorous code reviews, technical workshops, and pair-programming sessions.',
        ],
        achievements: [
          'Engineered distributed Redis caching layer reducing database read load by 60%.',
          'Achieved 99.98% platform uptime across multi-region AWS Kubernetes clusters.',
        ],
        technologies: ['TypeScript', 'React', 'Node.js', 'Go', 'Docker', 'Kubernetes', 'PostgreSQL', 'AWS'],
      },
      {
        id: 'w-2',
        jobTitle: 'Full-Stack Developer',
        company: 'Veloce Data Labs',
        location: 'Austin, TX',
        startDate: '2019-06',
        endDate: '2022-02',
        current: false,
        responsibilities: [
          'Engineered customer-facing analytics dashboards using React, GraphQL, and Python FastAPI backend services.',
          'Built real-time data streaming pipelines using WebSockets and Redis pub/sub for financial telemetry monitoring.',
          'Automated CI/CD deployment pipelines using GitHub Actions, reducing release cycle time from bi-weekly to daily.',
        ],
        achievements: [
          'Authored reusable design system component library adopted by 4 cross-functional product squads.',
        ],
        technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'GraphQL', 'Tailwind CSS', 'Docker'],
      },
    ],
    education: [
      {
        id: 'e-1',
        institution: 'University of Texas at Austin',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startYear: '2015',
        endYear: '2019',
        grade: '3.85 GPA',
        achievements: ['Dean’s Honor List (4 Semesters)', 'President of ACM Student Chapter'],
      },
    ],
    skills: [
      {
        category: 'Technical',
        skills: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'Go', 'React', 'Next.js', 'Node.js', 'Express', 'GraphQL', 'REST APIs', 'PostgreSQL', 'Redis'],
      },
      {
        category: 'Industry Tools',
        skills: ['Docker', 'Kubernetes', 'AWS (S3, EC2, Lambda, ECS)', 'Git', 'GitHub Actions', 'Terraform', 'Datadog', 'Kafka'],
      },
      {
        category: 'Core Competencies',
        skills: ['Distributed Systems', 'System Design', 'CI/CD Pipelines', 'Database Optimization', 'Microservices', 'Agile/Scrum Leadership'],
      },
      {
        category: 'Soft Skills',
        skills: ['Technical Mentorship', 'Cross-Functional Collaboration', 'Root Cause Analysis', 'Stakeholder Communication'],
      },
    ],
    projects: [
      {
        id: 'p-1',
        name: 'NexusFlow: Distributed Task Queue',
        description: 'Open-source lightweight distributed message broker and background worker engine built in Go and Redis with sub-millisecond dispatching.',
        technologies: ['Go', 'Redis', 'Docker', 'gRPC'],
        url: 'github.com/alexvance/nexus-flow',
        highlights: ['Over 1,200 GitHub stars', 'Benchmarked to handle 85,000 tasks/sec with zero packet drop'],
      },
    ],
    certifications: [
      {
        id: 'c-1',
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        issueDate: '2023-08',
        expiryDate: '2026-08',
      },
    ],
    awards: [
      {
        id: 'a-1',
        title: 'Innovation Excellence Hackathon 1st Place',
        issuer: 'CloudScale Technologies',
        year: '2023',
        description: 'Built zero-downtime database migration tool adopted org-wide.',
      },
    ],
    languages: ['English (Native)', 'Spanish (Professional Working)'],
    sectionOrder: ['summary', 'experience', 'skills', 'projects', 'education', 'certifications', 'awards', 'languages'],
    templateSettings: {
      templateId: 'technical',
      accentColor: 'blue',
      fontFamily: 'mono',
      fontSize: 'normal',
    },
  },

  business: {
    id: 'sample-biz-1',
    title: 'Senior Financial Analyst & Accountant Resume',
    lastModified: Date.now() - 7200000,
    careerLevel: 'Senior Professional',
    personalInfo: {
      fullName: 'Marcus Sterling, CPA',
      jobTitle: 'Senior Financial Analyst & Corporate Accountant',
      email: 'm.sterling@sterlingadvisory.com',
      phone: '+1 (212) 884-9102',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/marcussterling-cpa',
      website: 'sterlingfinancial.ny',
    },
    professionalSummary:
      'Certified Public Accountant (CPA) and analytical Senior Financial Analyst with 8+ years of experience leading corporate budgeting, financial modeling, regulatory compliance, and variance analysis. Trusted advisor to C-suite executives in managing $120M+ operating budgets and optimizing cost structures.',
    workExperience: [
      {
        id: 'w-b1',
        jobTitle: 'Senior Corporate Financial Analyst',
        company: 'Vanguard Capital Partners',
        location: 'New York, NY',
        startDate: '2021-04',
        endDate: '',
        current: true,
        responsibilities: [
          'Direct quarterly rolling forecasts, annual budgeting, and long-range strategic financial planning for 4 business subsidiaries representing $145M in gross annual revenue.',
          'Prepare comprehensive monthly executive financial reviews (P&L, Balance Sheet, Cash Flow) with detailed variance analysis and risk mitigations.',
          'Lead corporate audit preparation in strict compliance with GAAP and SEC reporting guidelines.',
        ],
        achievements: [
          'Engineered dynamic DCF and sensitivity financial models that uncovered $3.2M in annual recurring operational savings.',
          'Streamlined month-end financial close schedule from 9 business days to 5 days using NetSuite automated reconciliation scripts.',
        ],
        technologies: ['Oracle NetSuite', 'SAP ERP', 'Excel (VBA & Power Query)', 'Tableau', 'Hyperion Essbase', 'Workday'],
      },
      {
        id: 'w-b2',
        jobTitle: 'Senior Staff Accountant',
        company: 'Deloitte & Touche LLP',
        location: 'Boston, MA',
        startDate: '2017-09',
        endDate: '2021-03',
        current: false,
        responsibilities: [
          'Executed financial statement audits for commercial clients in technology, healthcare, and retail sectors.',
          'Analyzed internal control systems, assessed fraud risks, and authored remediation memos for audit committees.',
          'Managed general ledger reconciliations, revenue recognition under ASC 606, and tax provisions under ASC 740.',
        ],
        achievements: [
          'Recognized with Outstanding Performer rating for three consecutive fiscal audit cycles.',
        ],
        technologies: ['SAP', 'QuickBooks Enterprise', 'Audit Command Language (ACL)', 'Microsoft Excel'],
      },
    ],
    education: [
      {
        id: 'e-b1',
        institution: 'Boston College, Carroll School of Management',
        degree: 'Master of Science',
        fieldOfStudy: 'Accounting & Corporate Finance',
        startYear: '2016',
        endYear: '2017',
        grade: '3.92 GPA',
      },
      {
        id: 'e-b2',
        institution: 'Boston College',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Finance & Economics',
        startYear: '2012',
        endYear: '2016',
        grade: 'Magna Cum Laude',
      },
    ],
    skills: [
      {
        category: 'Core Competencies',
        skills: ['Financial Modeling', 'Variance Analysis', 'Corporate Budgeting', 'GAAP & IFRS Compliance', 'ASC 606 Revenue Recognition', 'Capital Allocation', 'Auditing & Assurance'],
      },
      {
        category: 'Industry Tools',
        skills: ['Oracle NetSuite', 'SAP S/4HANA', 'Hyperion Essbase', 'Tableau', 'Power BI', 'Advanced Excel (VBA/Macros)', 'Bloomberg Terminal', 'QuickBooks'],
      },
      {
        category: 'Soft Skills',
        skills: ['Executive Presentation', 'Cross-Functional Leadership', 'Contract Negotiation', 'Strategic Risk Management'],
      },
    ],
    projects: [
      {
        id: 'p-b1',
        name: 'Enterprise ERP Financial System Migration',
        description: 'Led 6-month cross-departmental transition of GL and payroll data from legacy QuickBooks to Oracle NetSuite across 5 international entities.',
        technologies: ['Oracle NetSuite', 'Excel Power Query'],
        highlights: ['Zero data discrepancies upon go-live reconciliation audit'],
      },
    ],
    certifications: [
      {
        id: 'c-b1',
        name: 'Certified Public Accountant (CPA)',
        issuer: 'New York State Board of Public Accountancy',
        issueDate: '2018-05',
      },
      {
        id: 'c-b2',
        name: 'Chartered Financial Analyst (CFA) Level II Passed',
        issuer: 'CFA Institute',
        issueDate: '2022-06',
      },
    ],
    awards: [],
    languages: ['English (Fluent)', 'French (Conversational)'],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'],
    templateSettings: {
      templateId: 'classic',
      accentColor: 'slate',
      fontFamily: 'merriweather',
      fontSize: 'normal',
    },
  },

  creative: {
    id: 'sample-creative-1',
    title: 'Lead UI/UX & Brand Designer Resume',
    lastModified: Date.now() - 10800000,
    careerLevel: 'Senior Professional',
    personalInfo: {
      fullName: 'Elena Rostova',
      jobTitle: 'Lead UI/UX & Product Designer',
      email: 'elena@designstudio.co',
      phone: '+1 (415) 670-4491',
      location: 'Los Angeles, CA',
      linkedin: 'linkedin.com/in/elenarostova-design',
      portfolio: 'elenarostova.design',
      website: 'dribbble.com/elenarostova',
    },
    professionalSummary:
      'Human-centered Lead Product Designer with 6+ years of experience crafting intuitive digital experiences, design systems, and brand identities for high-growth tech platforms. Adept at translating ambiguous customer friction points into elegant, conversion-tested mobile and desktop interfaces.',
    workExperience: [
      {
        id: 'w-c1',
        jobTitle: 'Lead Product Designer',
        company: 'Aura Fintech Inc.',
        location: 'Los Angeles, CA',
        startDate: '2022-01',
        endDate: '',
        current: true,
        responsibilities: [
          'Lead end-to-end UX research, wireframing, rapid prototyping, and high-fidelity UI design for flagship consumer wealth management app with 850k active users.',
          'Built and maintained multi-platform Figma design system containing 200+ accessible components with semantic design tokens.',
          'Facilitated weekly user testing sessions and usability evaluations with diverse customer cohorts to drive iterative product refinements.',
        ],
        achievements: [
          'Redesigned user onboarding flow, boosting initial account funding conversion rate by 34%.',
          'Established WCAG 2.1 AA accessibility standards across entire web and iOS ecosystem.',
        ],
        technologies: ['Figma', 'FigJam', 'Principle', 'Adobe After Effects', 'Miro', 'UserTesting.com', 'Storybook'],
      },
      {
        id: 'w-c2',
        jobTitle: 'Senior UI/UX Designer',
        company: 'Starlight Creative Agency',
        location: 'Seattle, WA',
        startDate: '2019-03',
        endDate: '2021-12',
        current: false,
        responsibilities: [
          'Designed bespoke ecommerce, SaaS, and editorial web experiences for Fortune 500 retail and consumer brands.',
          'Produced interactive web prototypes, micro-animations, and visual asset libraries for web engineers.',
        ],
        achievements: [
          'Earned 2 Awwwards Site of the Day honors for client brand campaign experiences.',
        ],
        technologies: ['Figma', 'Adobe Photoshop', 'Illustrator', 'Webflow', 'Spline 3D'],
      },
    ],
    education: [
      {
        id: 'e-c1',
        institution: 'Rhode Island School of Design (RISD)',
        degree: 'Bachelor of Fine Arts (BFA)',
        fieldOfStudy: 'Graphic & Interaction Design',
        startYear: '2015',
        endYear: '2019',
        grade: 'Honors',
      },
    ],
    skills: [
      {
        category: 'Core Competencies',
        skills: ['UI/UX Design', 'Design Systems', 'User Research & Personas', 'Wireframing & Prototyping', 'Information Architecture', 'Usability Testing', 'Responsive Web Design', 'WCAG Accessibility'],
      },
      {
        category: 'Industry Tools',
        skills: ['Figma', 'Adobe Creative Cloud (Photoshop, Illustrator, After Effects)', 'Principle', 'Miro', 'Webflow', 'Framer', 'Zeroheight'],
      },
      {
        category: 'Soft Skills',
        skills: ['Design Sprint Facilitation', 'Engineering Collaboration', 'Storytelling & Pitching', 'Empathy-Driven Research'],
      },
    ],
    projects: [
      {
        id: 'p-c1',
        name: 'Prism Design System 2.0',
        description: 'Comprehensive multi-brand design tokens and component specification documented for React and React Native platforms.',
        technologies: ['Figma Tokens', 'Storybook', 'HTML/CSS'],
        url: 'prism-tokens.spec',
      },
    ],
    certifications: [
      {
        id: 'c-c1',
        name: 'Nielsen Norman Group UX Master Certified',
        issuer: 'NN/g',
        issueDate: '2021-11',
      },
    ],
    awards: [
      {
        id: 'a-c1',
        title: 'Red Dot Design Award Winner - Mobile UX',
        issuer: 'Design Zentrum Nordrhein Westfalen',
        year: '2023',
      },
    ],
    languages: ['English (Native)', 'Italian (Conversational)'],
    sectionOrder: ['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'awards'],
    templateSettings: {
      templateId: 'creative',
      accentColor: 'indigo',
      fontFamily: 'poppins',
      fontSize: 'normal',
    },
  },

  academic: {
    id: 'sample-acad-1',
    title: 'Biomedical Researcher & Postdoctoral Fellow CV',
    lastModified: Date.now() - 14400000,
    careerLevel: 'Senior Professional',
    personalInfo: {
      fullName: 'Dr. Priya S. Nair, Ph.D.',
      jobTitle: 'Postdoctoral Research Scientist in Molecular Genetics',
      email: 'priya.nair@genomics-institute.org',
      phone: '+1 (617) 492-3819',
      location: 'Cambridge, MA',
      linkedin: 'linkedin.com/in/dr-priya-nair',
      portfolio: 'scholar.google.com/citations?user=priyanair',
      website: 'priyanair-genomics.lab',
    },
    professionalSummary:
      'Molecular Geneticist and Postdoctoral Fellow with doctoral training in CRISPR-Cas9 genome editing, functional genomics, and bioinformatics sequence analysis. First-author on 4 peer-reviewed publications in high-impact cell biology journals with successful grant co-investigator track record.',
    workExperience: [
      {
        id: 'w-a1',
        jobTitle: 'Postdoctoral Research Fellow',
        company: 'Broad Institute of MIT and Harvard',
        location: 'Cambridge, MA',
        startDate: '2022-09',
        endDate: '',
        current: true,
        responsibilities: [
          'Design and execute high-throughput CRISPR knockout screening assays to investigate regulatory pathways in therapy-resistant oncogenic cells.',
          'Analyze single-cell RNA sequencing (scRNA-seq) datasets utilizing R, Bioconductor, and Python Seurat workflows.',
          'Co-mentor 3 graduate Ph.D. students in molecular cloning techniques, mammalian cell culture, and statistical experimental design.',
        ],
        achievements: [
          'Co-authored $1.2M NIH R01 grant proposal awarded in 2023 for targeted genetic therapeutic discovery.',
          'Developed novel bioinformatic variant pipeline decreasing false-positive indel identification rates by 31%.',
        ],
        technologies: ['CRISPR-Cas9', 'scRNA-seq', 'R (Bioconductor)', 'Python', 'Illumina NextSeq', 'Confocal Microscopy', 'Flow Cytometry'],
      },
      {
        id: 'w-a2',
        jobTitle: 'Graduate Research Assistant',
        company: 'Johns Hopkins University School of Medicine',
        location: 'Baltimore, MD',
        startDate: '2017-08',
        endDate: '2022-05',
        current: false,
        responsibilities: [
          'Investigated molecular mechanisms of DNA double-strand break repair in eukaryotic model systems.',
          'Delivered lectures for undergraduate courses in Molecular Genetics and Cell Biology.',
        ],
        achievements: [
          'Completed doctoral dissertation with Departmental Distinction.',
        ],
        technologies: ['Western Blotting', 'qPCR', 'Chromatin Immunoprecipitation (ChIP-seq)', 'GraphPad Prism'],
      },
    ],
    education: [
      {
        id: 'e-a1',
        institution: 'Johns Hopkins University School of Medicine',
        degree: 'Doctor of Philosophy (Ph.D.)',
        fieldOfStudy: 'Cellular & Molecular Genetics',
        startYear: '2017',
        endYear: '2022',
        grade: 'Summa Cum Laude Honors',
        achievements: ['NIH Ruth L. Kirschstein Predoctoral NRSA Fellow (F31)'],
      },
      {
        id: 'e-a2',
        institution: 'Cornell University',
        degree: 'Bachelor of Science (B.S.)',
        fieldOfStudy: 'Biological Sciences (Genetics Concentration)',
        startYear: '2013',
        endYear: '2017',
        grade: '3.91 GPA',
      },
    ],
    skills: [
      {
        category: 'Technical',
        skills: ['CRISPR Gene Editing', 'Single-Cell RNA-seq', 'Next-Generation Sequencing (NGS)', 'Mammalian Cell Culture', 'ChIP-seq', 'Flow Cytometry (FACS)', 'Confocal Imaging'],
      },
      {
        category: 'Industry Tools',
        skills: ['R / Bioconductor', 'Python (Pandas, SciPy, Scanpy)', 'Bash/Linux High-Performance Computing', 'GraphPad Prism', 'Benchling', 'IGV Genome Browser'],
      },
      {
        category: 'Core Competencies',
        skills: ['Experimental Design', 'Grant Writing (NIH/NSF)', 'Peer Reviewing', 'Scientific Manuscript Preparation', 'Scientific Mentorship'],
      },
    ],
    projects: [
      {
        id: 'p-a1',
        name: 'Single-Cell Lineage Tracing Suite',
        description: 'Bioinformatic algorithmic toolkit for tracing clonal evolution in heterogeneous cell populations during drug perturbation.',
        technologies: ['R', 'Python', 'Docker'],
        url: 'github.com/nairlab/lineage-trace',
        highlights: ['Published in Nature Biotechnology supplement'],
      },
    ],
    certifications: [
      {
        id: 'c-a1',
        name: 'Biosafety Level 2+ Certification & Radiation Safety Officer',
        issuer: 'Harvard Environmental Health & Safety',
        issueDate: '2022-10',
      },
    ],
    awards: [
      {
        id: 'a-a1',
        title: 'Outstanding Young Investigator Award',
        issuer: 'American Society of Human Genetics',
        year: '2023',
      },
    ],
    languages: ['English (Native)', 'Hindi (Native)', 'German (Elementary)'],
    sectionOrder: ['summary', 'education', 'experience', 'skills', 'projects', 'certifications', 'awards', 'languages'],
    templateSettings: {
      templateId: 'academic',
      accentColor: 'emerald',
      fontFamily: 'merriweather',
      fontSize: 'normal',
    },
  },

  entryLevel: {
    id: 'sample-entry-1',
    title: 'Junior Computer Science Graduate Resume',
    lastModified: Date.now() - 18000000,
    careerLevel: 'Entry Level',
    personalInfo: {
      fullName: 'Jordan Taylor',
      jobTitle: 'Junior Software Engineer / Computer Science Graduate',
      email: 'jordan.taylor.cs@gmail.com',
      phone: '+1 (312) 555-0198',
      location: 'Chicago, IL',
      linkedin: 'linkedin.com/in/jordantaylor-cs',
      github: 'github.com/jordantaylor-dev',
      portfolio: 'jordantaylor.dev',
    },
    professionalSummary:
      'Motivated Computer Science graduate with hands-on software engineering internship experience in React, Python, and SQL. Eager to contribute disciplined problem-solving, clean code principles, and collaborative energy to a forward-thinking engineering team.',
    workExperience: [
      {
        id: 'w-e1',
        jobTitle: 'Software Engineering Intern',
        company: 'Apex Media Solutions',
        location: 'Chicago, IL',
        startDate: '2025-05',
        endDate: '2025-08',
        current: false,
        responsibilities: [
          'Assisted development team in building customer portal features using React, TypeScript, and RESTful API endpoints.',
          'Wrote unit tests using Jest and React Testing Library, boosting frontend code coverage from 62% to 78%.',
          'Resolved 24+ bug tickets identified during QA regression testing cycles.',
        ],
        achievements: [
          'Built internal URL shortener utility used daily by 50+ staff members.',
        ],
        technologies: ['React', 'TypeScript', 'Jest', 'Git', 'CSS3', 'Node.js'],
      },
      {
        id: 'w-e2',
        jobTitle: 'Undergraduate Teaching Assistant - Intro to CS',
        company: 'University of Illinois Urbana-Champaign',
        location: 'Urbana, IL',
        startDate: '2024-08',
        endDate: '2025-05',
        current: false,
        responsibilities: [
          'Held 6 weekly office hours assisting 80+ students with Python data structures, algorithms, and debugging.',
          'Graded bi-weekly programming homework assignments and provided constructive code feedback.',
        ],
        technologies: ['Python', 'Linux', 'Git'],
      },
    ],
    education: [
      {
        id: 'e-e1',
        institution: 'University of Illinois Urbana-Champaign',
        degree: 'Bachelor of Science in Computer Science',
        fieldOfStudy: 'Computer Science',
        startYear: '2021',
        endYear: '2025',
        grade: '3.78 / 4.00 GPA',
        achievements: [
          'Dean’s List for 6 Consecutive Semesters',
          'Relevant Coursework: Data Structures & Algorithms, Database Systems, Computer Networks, Software Engineering Principles',
        ],
      },
    ],
    skills: [
      {
        category: 'Technical',
        skills: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'Java', 'C++', 'HTML5/CSS3', 'React', 'Node.js basics', 'SQL (PostgreSQL)'],
      },
      {
        category: 'Industry Tools',
        skills: ['Git & GitHub', 'VS Code', 'Postman', 'Docker basics', 'Linux Command Line', 'Jira'],
      },
      {
        category: 'Soft Skills',
        skills: ['Rapid Learner', 'Collaborative Problem Solving', 'Clear Technical Communication', 'Adaptability'],
      },
    ],
    projects: [
      {
        id: 'p-e1',
        name: 'Campus Eats: Student Food Sharing Platform',
        description: 'Full-stack web application enabling university students to coordinate dining hall meal shares and reduce food waste.',
        technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
        url: 'github.com/jordantaylor-dev/campus-eats',
        highlights: ['Deployed on Render with active user base of 300+ university peers'],
      },
      {
        id: 'p-e2',
        name: 'AlgoVisualizer: Interactive Sorting & Graph Tool',
        description: 'Interactive browser tool animating Dijkstra, A*, BFS, and QuickSort algorithms with adjustable speeds.',
        technologies: ['TypeScript', 'Canvas API', 'HTML5'],
        url: 'github.com/jordantaylor-dev/algo-visualizer',
      },
    ],
    certifications: [
      {
        id: 'c-e1',
        name: 'Meta Front-End Developer Professional Certificate',
        issuer: 'Coursera / Meta',
        issueDate: '2024-07',
      },
    ],
    awards: [
      {
        id: 'a-e1',
        title: 'HackIllinois 2024 Best Beginner Hack Award',
        issuer: 'HackIllinois',
        year: '2024',
      },
    ],
    languages: ['English (Native)'],
    sectionOrder: ['education', 'skills', 'experience', 'projects', 'certifications', 'awards'],
    templateSettings: {
      templateId: 'entry-level',
      accentColor: 'indigo',
      fontFamily: 'inter',
      fontSize: 'normal',
    },
  },
};
