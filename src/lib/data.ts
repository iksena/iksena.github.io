import { Cloud, Database, Layout, Linkedin, Mail, Server, Terminal, Github, Newspaper } from 'lucide-react';
import { IMAGES } from '../assets/images.ts';
import type { PortfolioData } from './types.ts';

export const DATA: PortfolioData = {
  profile: {
    name: "I Komang Sena Aji Buwana",
    roles: ["Software Engineer", "Technical Lead", "Master of Computing Student"],
    objective: "Results-driven software engineer with 5+ years of experience building **full-stack fintech and digital products used by millions of users** in leading Indonesian banks and startups. Skilled in designing and delivering scalable, cloud-ready systems with modern JavaScript/TypeScript stacks, React/React Native, Node.js, GraphQL, and containerized microservices, complemented by strong DevOps exposure on Docker, Kubernetes, and OpenShift. Demonstrated leadership through **technical lead roles, Agile team enablement, and end-to-end ownership** of wealth management, payments, and investment features that improved user growth, automation, and code quality metrics. Entrepreneurial and product-minded, with experience co-founding an ed-tech startup, freelancing across banking, wellness, and ecommerce domains, and consistently winning national-level competitions and scholarships for innovation and impact. Currently pursuing a **Master of Computing at the Australian National University** with a focus on algorithms, machine learning, and AI-driven, cloud-native architectures, and eager to drive high-impact solutions at the intersection of **software engineering and intelligent systems.**",
    location: "Canberra 🇦🇺 / Jakarta 🇮🇩",
    email: "mail@sena.web.id",
    avatar: IMAGES.DP,
  },
  socials: [
    { id: 'em', platform: "Email", link: "mailto:mail@sena.web.id", icon: Mail },
    { id: 'li', platform: "LinkedIn", link: "https://linkedin.com/in/iksena", icon: Linkedin },
    { id: 'gh', platform: "GitHub", link: "https://github.com/iksena", icon: Github },
    { id: 'md', platform: "Medium", link: "https://iksena.medium.com", icon: Newspaper },
  ],
  experience: [
    { 
      id: 1, 
      role: "Software Engineer", 
      company: "NatureHelm Pty. Ltd.", 
      date: "July 2025 - Present", 
      location: "Canberra, Australia",
      desc: "Developing the NatureHelm platform for biodiversity monitoring as part of the ANU internship program." 
    },
    { 
      id: 2, 
      role: "Software Engineer", 
      company: "PT Bank Danamon Indonesia Tbk.", 
      date: "June 2023 - June 2024", 
      location: "Jakarta, Indonesia",
      desc: "Delivered D-Bank PRO features (cashless withdrawal, gold investment) driving 30% user growth. Built back-office automation reducing manual workloads by 25%." 
    },
    { 
      id: 3, 
      role: "Technical Lead & Full-stack Engineer", 
      company: "PT Bank SMBC Indonesia Tbk.", 
      date: "Oct 2019 - June 2023", 
      location: "Jakarta, Indonesia",
      desc: "Led a 15-member team for Jenius App wealth management features (5M+ users). Designed architecture for mutual funds and insurance integration." 
    },
  ],
  education: [
    { 
      id: 1, 
      degree: "Master of Computing", 
      school: "Australian National University", 
      date: "Feb 2025 - Nov 2026 (Expected)",
      details: "GPA: 6.50 / 7.00. Coursework: Algorithms, Machine Learning, Structured Programming, Relational Databases, Logic, Discrete Mathematics, Computing Internships." 
    },
    { 
      id: 2, 
      degree: "Bachelor of Science in Engineering", 
      school: "Institut Teknologi Bandung", 
      date: "Aug 2015 - Sept 2019",
      details: "GPA: 3.43 / 4.00. Teaching Assistant for Intro to IT. Coursework: Numerical Methods, Data Acquisition & Analysis, Calculus, Statistics." 
    }
  ],
  projects: [
    { 
      id: 'p1', 
      title: "Jenius", 
      role: "Software Engineer & Technical Lead (Oct 2019 - Feb 2025)",
      stack: ["Node.js", "React Native", "Microservices", "Kafka", "MongoDB", "Agile Scrum", "Docker", "Kubernetes"], 
      desc: `- Led a 15 member cross-functional engineering team delivering Jenius wealth management features (priority banking, mutual funds, insurance) for a **5M+ user digital banking platform**.
- Initiated and designed the **end-to-end system architecture** for wealth management, enabling the successful launch of mutual fund investments that acquired 20,000 users and IDR 3B in transactions within one month.
- Collaborated with R&D to implement a distributed GraphQL architecture across microservices, significantly improving scalability and front-end integration patterns.
- Led system migration and integration of a new investment core service with an international partner, aligning Jenius with global technology and compliance standards.
- Published front-end coding conventions and championed clean code practices to **standardize development workflows and improve maintainability across teams**.
- Proposed and applied Atomic Design principles to the Jenius revamp, creating reusable UI components and a **more maintainable design system**.
- Designed and implemented **full-stack features** using React, React Native, Express.js, Node.js, MongoDB, Redis, Elasticsearch, and Apache Kafka for both customer-facing and internal tools.
- Acted as technical lead for Jenius2 Admin (back-office MERN application), delivering key capabilities such as enhanced KYC for priority banking, push notification management, and mutual fund operations support.
- Identified and remediated security vulnerabilities in Jenius, **strengthening the platform's resilience against cybersecurity threats**.
- Provided mentorship, code reviews, and architectural guidance to full-stack, front-end, and back-end developers, **elevating overall engineering quality and delivery velocity.**
`, 
      learnMoreLink: "https://www.jenius.com",
      demoLink: "https://jenius.onelink.me/iXQC/JeniusAppPage",
      images: [
        IMAGES.JENIUS.JENIUS_MF,
        IMAGES.JENIUS.JENIUS_APP,
        IMAGES.JENIUS.INVESTMENT_PORTFOLIO,
        IMAGES.JENIUS.INVESTMENT_PRODUCTS,
        IMAGES.JENIUS.INVESTMENT_PURCHASE,
        IMAGES.JENIUS.INVESTMENT_SELL,
        IMAGES.JENIUS.INVESTMENT_RP,
        IMAGES.JENIUS.JENIUS_INSURANCE,
      ]
    },
    { 
      id: 'p2', 
      title: "D-Bank PRO", 
      role: "Software Engineer (June 2023 - June 2024)",
      stack: ["Typescript", "Angular", "React", "Node.js", "Cordova", "PostgreSQL", "Java Spring", "Docker", "Kotlin", "Swift"], 
      desc: `Spearheaded the end-to-end modernization of the D-Bank PRO digital banking platform by initiating a strategic migration from a legacy Cordova codebase to native Android (Kotlin) and iOS (Swift) while onboarding and leading a cross-functional team of 30 developers. 
        Simultaneously architected a new React and Node.js-based back-office automation platform that reduced manual workloads by 25% and optimized content delivery frequency by fourfold. 
        Beyond infrastructure, I engineered high-impact features, including Gold Investment, Cashless Withdrawal, and NFC E-money top-ups, that drove a 30% YoY increase in the user base to 400k+ active users, all while establishing strict engineering standards that achieved 90% unit test coverage.`, 
      learnMoreLink: "https://www.danamon.co.id/en/e-banking/personal/d-bank-pro",
      demoLink: "https://play.google.com/store/apps/details?id=com.dbank.mobile&hl=en",
      images: [
        IMAGES.DBANKPRO.DBANKPRO,
        IMAGES.DBANKPRO.DBANKPRO_HOME,
        IMAGES.DBANKPRO.DBANKPRO_LOGIN,
        IMAGES.DBANKPRO.DBANKPRO_MOBILE_HOME,
        IMAGES.DBANKPRO.DBANKPRO_STRAPI,
      ]
    },
    { 
      id: 'p3', 
      title: "NatureHelm", 
      role: "Software Engineer (July 2025 - Present)",
      stack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "Step Functions", "Agile"], 
      desc: `- Built core features for the NatureHelm biodiversity monitoring platform as part of a Master of Computing internship, contributing across backend, frontend, and cloud workflows.
- Implemented a 5-step **client onboarding** wizard (Accounts, Users, Organisations, Sites, Boundaries) backed by a transactional PostgreSQL + NestJS API to **guarantee atomic, consistent data operations**.  
- Developed an accessible, responsive React UI for onboarding flows, focusing on usability for non-technical conservation stakeholders.  
- **Integrated geospatial capabilities** using Google geocoding and Mapbox, including multipolygon boundary creation, editing, and validation with PostGIS.  
- Designed in-portal **data ingestion flows orchestrated with AWS Step Functions** to replace manual, fragmented data handling and enable repeatable, automated pipelines.
- Collaborated with the team to align database, API, and geospatial design decisions with **biodiversity monitoring requirements and long-term maintainability.**`,
      learnMoreLink: "https://naturehelm.com",
      demoLink: "https://linktr.ee/naturehelmsena?utm_source=sena.web.id",
      images: [
        IMAGES.NATUREHELM.NATUREHELM,
        IMAGES.NATUREHELM.NATUREHELM_ANALYTICS,
        IMAGES.NATUREHELM.NATUREHELM_VOLUNTEER,
        IMAGES.NATUREHELM.NATUREHELM_KML,
        IMAGES.NATUREHELM.NATUREHELM_CIRCLE,
        IMAGES.NATUREHELM.NATUREHELM_ORG,
      ]
    },
    { 
      id: 'p4', 
      title: "Como 1907 Football Club", 
      role: "Freelance Full-stack Engineer (Jul 2024 - Aug 2024)",
      stack: ["Shopify", "PHP", "Liquid", "Wordpress", "Laravel", "JavaScript", "HTML", "CSS"], 
      desc: `- Developed and customized Shopify e-commerce stores for Como 1907 (Shop.ComoFootball.com, ComoComoComo.com, Como4Como.com) using Liquid, JavaScript, HTML, and CSS to **support merchandising and fan engagement.**
- Built and maintained marketing and content sites with WordPress, PHP, and JavaScript for ComoFootball.com and DestinationCalcio.com, **aligning implementations with brand and campaign requirements.**
- Created **technical assessments and implementation plans for new microsite e-commerce experiences and payment gateway integrations** to support emerging business initiatives.
- Reviewed and fixed bugs across existing **WordPress and Shopify properties**, including root-cause analysis, regression-safe fixes, and documentation of changes to ensure stable operation of live platforms.
- Finalised and optimised the frontend of edventura.it (children's class reservation platform) for performance, responsiveness, and cross-browser compatibility as part of the broader Mola/Como web ecosystem.
- Collaborated using Git and API testing tools (e.g., Postman) within a JavaScript/Laravel-based stack to support **reliable integrations and maintain clean delivery workflows.**`,
      learnMoreLink: "https://comofootball.com/en/",
      demoLink: "https://shop.comofootball.com/",
      images: [
        IMAGES.COMO.COMO,
        IMAGES.COMO.COMO_SHOPIFY,
        IMAGES.COMO.COMO_CART,
        IMAGES.COMO.COMO_RANKING,
        IMAGES.COMO.COMO_SUMMER,
      ]
    },
    { 
      id: 'p5', 
      title: "FitHappy", 
      role: "Senior Frontend Engineer (Apr 2022 - Sep 2022)",
      stack: ["React Native", "iOS", "Redux"], 
      desc: `- Part-time Senior Frontend Engineer for FitHappy, a wellness startup focused on behaviour-based health, mentorship, and healthy product offerings.
- Used JavaScript and React Native to develop and ship FitHappy's first iOS application, helping 500+ users start their wellness journey.
- Collaborated closely with two other frontend and three backend engineers to build a reliable, user-friendly mobile experience.
- Helped establish frontend best practices, code conventions, and architectural patterns to strengthen the long-term maintainability of the app.
- Focused on delivering a smooth onboarding and daily-use experience tailored to non-technical users pursuing health and lifestyle improvements.`,
      learnMoreLink: "https://east.vc/portfolio/fithappy",
      images: [
        IMAGES.FITHAPPY.FITHAPPY,
        IMAGES.FITHAPPY.FITHAPPY_MARKETING,
        IMAGES.FITHAPPY.FITHAPPY_PARTNERSHIP,
      ]
    },
    { 
      id: 'p6', 
      title: "EduLens Ed-Tech", 
      role: "Co-founder (May 2018 - Mar 2019)",
      stack: ["Startup", "Product Management", "Python", "Django", "Angular", "TypeScript", "PostgreSQL"], 
      desc: `- Co-founded EduLens, an education technology startup focused on helping students prepare for university admissions through a dedicated digital platform.
- Secured multi-stage funding support, including ITB’s LPIK startup bootcamp, PMW ITB local competition, and the national PKMI programme from the Indonesian Ministry of Research, Technology, and Higher Education.
- Built the web application using Angular, delivering core flows for exploration of information and preparation resources for prospective university students.
- Developed the companion mobile application in Java and implemented backend services with Python and Django to support authentication, data management, and business logic.
- Worked end-to-end across product, engineering, and competition pitches, helping validate the problem space and demonstrate EduLens as a viable, scalable ed-tech solution.`,
      learnMoreLink: "https://web.archive.org/web/20201023030128/https:/lpik.itb.ac.id/tenant/detail/46ba9f2a6976570b0353203ec4474217",
      images: [
        IMAGES.EDULENS.EDULENS_LOGO,
        IMAGES.EDULENS.EDULENS_PHOTO,
      ]
    },
    {
      id: 'p7',
      title: "AR-PRO",
      role: "Software Engineer (May 2018 - Dec 2018)",
      stack: ["Augmented Reality", "Android", "Java", "Unity", "Vuforia", "C#"], 
      desc: `- Built AR-PRO, an augmented reality application for construction companies to communicate structural and architectural drawings digitally, supporting paperless workflows and BIM-aligned visualization.
- Designed and implemented the web interface using JavaScript, enabling project owners and site workers to access and explore 3D building information from standard devices.
- Developed the Android prototype in Java and C#, integrating Vuforia SDK and Unity to overlay 3D structural models on markers for real-time on-site visualization.
- Worked in a small cross-functional team of two developers and two product managers, contributing to both technical implementation and product direction.
- Helped the project win three national-level technology and business competitions and earn the Ganesha Karsa Award from Institut Teknologi Bandung for innovation impact.`,
      learnMoreLink: "https://itb.ac.id/berita/lewat-teknologi-digitalisasi-konstruksi-mahasiswa-itb-juara-ajang-rekkinovation-2018/56946",
      demoLink: "https://web.archive.org/web/20230225024646/https://issuu.com/hmsitb/docs/cremona_2018",
      images: [
        IMAGES.ARPRO.ARPRO_MAG_1,
        IMAGES.ARPRO.ARPRO_MAG_2,
        IMAGES.ARPRO.ARPRO,
      ]
    },
    {
      id: 'p8',
      title: "Buana App",
      role: "Founder (May 2018 - Jun 2018)",
      stack: ["Android", "Java", "Machine Learning", "Google Cloud", "Microsoft Azure"],
      desc: `- Built **Buana**, a solo Android app that detects types of waste around the user and suggests correct disposal to promote everyday recycling behaviour.
- Designed user flows to let people share their eco-friendly actions with friends and social networks, turning proper waste sorting into a visible, viral campaign for environmental awareness.  
- Integrated cloud-based machine learning and computer vision services from Google Cloud and Microsoft Azure to classify waste from camera input in real time.
- Implemented the full mobile stack independently, covering Android UI, model integration, and network communication with cloud APIs.  
- Earned national recognition by winning competitions organized by Microsoft Azure and DBS Bank in collaboration with Dicoding Indonesia, showcasing Buana as an innovative green-technology solution.`,
      learnMoreLink: "https://www.dicoding.com/blog/selamat-kepada-para-pemenang-microsoft-azure-mobile-app-service-challenge/",
      demoLink: "https://apkcombo.com/buana-waste-detector/xyz.iksena.buana/",
      images: [
        IMAGES.BUANA.BUANA,
        IMAGES.BUANA.BUANA_2,
        IMAGES.BUANA.BUANA_3,
      ]
    }
  ],
  skills: {
    categories: [
      { name: "Languages", items: ["Indonesian (Native)", "English (Advanced C1)"], icon: Terminal },
      { name: "Frontend & Mobile", items: ["React.js", "Next.js", "React Native", "Flutter", "Angular", "Tailwind CSS", "HTML5"], icon: Layout },
      { name: "Backend", items: ["Node.js", "Express.js", "Java", "PHP", "Python", "C++", "GraphQL", "Kafka"], icon: Server },
      { name: "Database", items: ["PostgreSQL", "MongoDB", "Redis"], icon: Database },
      { name: "DevOps & Cloud", items: ["Docker", "Kubernetes", "Red Hat OpenShift", "Jenkins", "Git"], icon: Cloud },
    ]
  },
  awards: [
    "LPDP Scholarship (2024) - Full scholarship for ANU Master's",
    "Ganesha Karsa Award (2019) - ITB Outstanding Student",
    "1st Winner Rekkinnovation (2018)",
    "1st Winner Bursa National Business Competition (2018)",
    "2nd Winner of Computer Science Innovation Challenge (2018)",
    "Winner Microsoft Azure Mobile App Challenge (2018)",
    "Winner DBS Bank: Live More Society Challenge (2018)"
  ],
  certificates: [
    "Scikit-Learn for ML Classification (Coursera 2024)",
    "Build ML Web App with Streamlit (Coursera 2024)",
    "Containerize NodeJS in Docker (Coursera 2024)",
    "DevOps Foundations (LinkedIn 2022)",
    "Certified Risk Manager Level 1 (GARP 2020)",
    "Associate Android Developer (Google 2018)"
  ],
  news: [
    {
      id: 1,
      category: "Featured",
      date: "21 November 2025",
      title: "Featured by NatureHelm",
      description: "I was featured by NatureHelm as a software engineer intern. I developed the NatureHelm platform for biodiversity analytics for corporate sustainability as part of ANU internship.",
      ctaLink: "https://www.linkedin.com/posts/naturehelm_naturehelm-internship-techforgood-activity-7396424458422534144-YF3M?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAwnXRYBkZJ-mc_vbZQ0aD3kpvV88fY-ziM",
      ctaText: "View on LinkedIn",
    },
    {
      id: 2,
      category: "Updates",
      date: "17 February 2025",
      title: "Started studying at ANU",
      description: `I started studying at ANU as a Master of Computing student. My study is fully funded by LPDP Scholarship. I will focus my coursework on AI/ML and cloud-native architecture.`,
      ctaLink: "https://programsandcourses.anu.edu.au/2026/program/7706XMCOMP",
      ctaText: "Master of Computing",
    }
  ]
};