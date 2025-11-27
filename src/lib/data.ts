import { Cloud, Database, Layout, Linkedin, Mail, Server, Terminal, Github, Newspaper } from 'lucide-react';
import { IMAGES } from '../assets/images.ts';

export const DATA = {
  profile: {
    name: "I Komang Sena Aji Buwana",
    roles: ["Software Engineer", "Technical Lead", "Master of Computing Student"],
    objective: "Experienced software engineer with 5+ years in full-stack fintech application development. Specializing in scalable systems, Agile leadership, and currently pursuing advanced studies in AI/ML and cloud-native architecture.",
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
      role: "Software Engineer Intern", 
      company: "Wildlife Drones Pty. Ltd.", 
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
      date: "Feb 2025 - Present",
      details: "GPA: 6.50/7.00. Coursework: Structured Programming, Relational Databases, Logic, Discrete Mathematics." 
    },
    { 
      id: 2, 
      degree: "Bachelor of Science in Engineering", 
      school: "Institut Teknologi Bandung", 
      date: "Aug 2015 - Sept 2019",
      details: "GPA: 3.43/4.00. Teaching Assistant for Intro to IT. Coursework: Numerical Methods, Data Acquisition." 
    }
  ],
  projects: [
    { 
      id: 'p1', 
      title: "Jenius", 
      role: "Software Engineer & Technical Lead",
      stack: ["Node.js", "React Native", "Microservices", "Kafka", "MongoDB", "Agile", "Docker", "Kubernetes"], 
      desc: "Developed and optimised investment and insurance microservices for the Jenius banking app.", 
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
      role: "Software Engineer",
      stack: ["Node.js", "Angular", "React", "Cordova", "PostgreSQL", "Java Spring", "Docker"], 
      desc: "Built cashless withdrawal and gold investment features for Danamon's D-Bank PRO app, enhancing user engagement.", 
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
      role: "Software Engineer Intern",
      stack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "Step Functions", "Agile"], 
      desc: "Developing NatureHelm platform for biodiversity analytics for corporate sustainability as part of ANU internship.",
      learnMoreLink: "https://naturehelm.com",
      demoLink: "https://linktr.ee/naturehelmsena?utm_source=sena.web.id",
      images: [
        "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=1000&auto=format&fit=crop",
      ]
    },
    { 
      id: 'p4', 
      title: "Como 1907 Football Club", 
      role: "Freelance Full-stack Engineer",
      stack: ["Shopify", "PHP", "Liquid", "Wordpress", "Laravel", "JavaScript", "HTML", "CSS"], 
      desc: "Developed Shopify e-commerce platform and landing page for Como 1907 Italian football club.",
      learnMoreLink: "https://comofootball.com/en/",
      demoLink: "https://shop.comofootball.com/",
      images: [
        "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=1000&auto=format&fit=crop",
      ]
    },
    { 
      id: 'p5', 
      title: "FitHappy iOS App", 
      role: "Senior Frontend Engineer",
      stack: ["React Native", "iOS", "Redux"], 
      desc: "Released the first iOS wellness app helping 500+ users start their health journey.",
      learnMoreLink: "https://east.vc/portfolio/fithappy",
      images: [
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    { 
      id: 'p6', 
      title: "EduLens Ed-Tech", 
      role: "Co-founder",
      stack: ["Startup", "Product Management", "Python", "Django", "Angular", "TypeScript", "PostgreSQL"], 
      desc: "Founded an ed-tech startup for university admission assistance. Funded by ITB startup bootcamp.",
      learnMoreLink: "https://web.archive.org/web/20201023030128/https:/lpik.itb.ac.id/tenant/detail/46ba9f2a6976570b0353203ec4474217",
      images: [
        IMAGES.EDULENS.EDULENS_LOGO,
        IMAGES.EDULENS.EDULENS_PHOTO,
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
  ]
};