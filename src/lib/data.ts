import { Cloud, Database, Layout, Linkedin, Mail, Server, Terminal } from 'lucide-react';

export const DATA = {
  profile: {
    name: "I Komang Sena Aji Buwana",
    roles: ["Software Engineer", "Full-Stack Developer", "Master of Computing Student"],
    objective: "Experienced software engineer with 5+ years in full-stack fintech application development. Specializing in scalable systems, Agile leadership, and currently pursuing advanced studies in AI/ML and cloud-native architecture.",
    location: "Canberra / Jakarta",
    email: "i.buwana@anu.edu.au"
  },
  socials: [
    { id: 'li', platform: "LinkedIn", link: "https://linkedin.com/in/iksena", icon: Linkedin },
    { id: 'em', platform: "Email", link: "mailto:i.buwana@anu.edu.au", icon: Mail },
  ],
  experience: [
    { 
      id: 1, 
      role: "Software Engineer Intern", 
      company: "Wildlife Drones Pty. Ltd.", 
      date: "July 2025 – Present", 
      location: "Canberra, Australia",
      desc: "Developing the NatureHelm platform for biodiversity monitoring as part of the ANU internship program." 
    },
    { 
      id: 2, 
      role: "Software Engineer", 
      company: "PT Bank Danamon Indonesia Tbk.", 
      date: "June 2023 – June 2024", 
      location: "Jakarta, Indonesia",
      desc: "Delivered D-Bank PRO features (cashless withdrawal, gold investment) driving 30% user growth. Built back-office automation reducing manual workloads by 25%." 
    },
    { 
      id: 3, 
      role: "Technical Lead & Full-stack Engineer", 
      company: "PT Bank SMBC Indonesia Tbk.", 
      date: "Oct 2019 – June 2023", 
      location: "Jakarta, Indonesia",
      desc: "Led a 15-member team for Jenius App wealth management features (5M+ users). Designed architecture for mutual funds and insurance integration." 
    },
  ],
  education: [
    { 
      id: 1, 
      degree: "Master of Computing", 
      school: "Australian National University", 
      date: "Feb 2025 – Present",
      details: "GPA: 6.50/7.00. Coursework: Structured Programming, Relational Databases, Logic, Discrete Mathematics." 
    },
    { 
      id: 2, 
      degree: "Bachelor of Science in Engineering", 
      school: "Institut Teknologi Bandung", 
      date: "Aug 2015 – Sept 2019",
      details: "GPA: 3.43/4.00. Teaching Assistant for Intro to IT. Coursework: Numerical Methods, Data Acquisition." 
    }
  ],
  projects: [
    { 
      id: 'p1', 
      title: "Jenius Investment Features", 
      role: "Freelance Full-stack Engineer",
      stack: ["Node.js", "React Native", "Microservices"], 
      desc: "Developed and optimised investment and insurance microservices for the Jenius banking app.", 
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Finance placeholder
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    { 
      id: 'p2', 
      title: "Como 1907 E-commerce", 
      role: "Freelance Full-stack Engineer",
      stack: ["Shopify", "PHP", "Liquid"], 
      desc: "Developed Shopify e-commerce platform and landing page for Como 1907 Italian football club.",
      images: [
        "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=1000&auto=format&fit=crop", // Football/Store placeholder
      ]
    },
    { 
      id: 'p3', 
      title: "FitHappy iOS App", 
      role: "Senior Frontend Engineer",
      stack: ["React Native", "iOS", "Redux"], 
      desc: "Released the first iOS wellness app helping 500+ users start their health journey.",
      images: [
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop" // Fitness placeholder
      ]
    },
    { 
      id: 'p4', 
      title: "EduLens Ed-Tech", 
      role: "Co-founder",
      stack: ["Startup", "Product Management"], 
      desc: "Founded an ed-tech startup for university admission assistance. Funded by ITB startup bootcamp.",
      images: [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop" // Education placeholder
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
    "Winner Microsoft Azure Mobile App Challenge (2018)"
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