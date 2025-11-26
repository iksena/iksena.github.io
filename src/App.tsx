import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Briefcase, Code, Award, FileCheck, 
  X, ExternalLink, Github, MapPin, Cpu, ChevronLeft, ChevronRight,
  Linkedin, Mail, Terminal, Layout, Server, Database, Cloud
} from 'lucide-react';

// --- Theme & Data ---
const THEME = {
  bg: "bg-[#F5F5DC]", // Beige
  text: "text-[#4B3832]", // Coffee Brown
  card: "bg-[#FFF8F0]", // Warm White
  accent: "bg-[#8A9A5B]", // Sage Green
  border: "border-[#D2B48C]", // Tan
};

const DATA = {
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

// --- Carousel Component ---
const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 md:h-80 bg-gray-200 rounded-2xl overflow-hidden mb-6 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={images[index]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); paginate(-1); }} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <ChevronLeft size={20} className={THEME.text} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); paginate(1); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <ChevronRight size={20} className={THEME.text} />
          </button>
        </>
      )}
    </div>
  );
};

// --- Shared Components ---
const Card = ({ children, className, onClick }) => {
  const id = useId();
  return (
    <motion.div
      layoutId={`card-${id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, boxShadow: "0px 10px 20px rgba(75, 56, 50, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`rounded-3xl p-6 cursor-pointer shadow-sm border border-[#E8DCCA] relative overflow-hidden ${THEME.card} ${className}`}
    >
      {children}
    </motion.div>
  );
};

const SectionIcon = ({ icon: Icon }) => (
  <div className={`p-2 rounded-full w-fit mb-4 ${THEME.accent} text-white`}>
    <Icon size={20} />
  </div>
);

// --- Details Modals ---
const GenericModal = ({ title, children, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className={`${THEME.card} w-full max-w-lg p-8 rounded-3xl shadow-2xl relative m-4 max-h-[80vh] overflow-y-auto`}
    onClick={(e) => e.stopPropagation()}
  >
    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-20">
      <X size={24} className={THEME.text} />
    </button>
    <h2 className={`text-2xl font-bold mb-6 ${THEME.text}`}>{title}</h2>
    <div className="space-y-4">{children}</div>
  </motion.div>
);

const ProjectDetail = ({ project, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className={`${THEME.card} w-full max-w-3xl p-8 rounded-3xl shadow-2xl relative m-4 max-h-[90vh] overflow-y-auto`}
    onClick={(e) => e.stopPropagation()}
  >
    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full z-20 shadow-sm">
      <X size={24} className={THEME.text} />
    </button>
    
    {project.images && <ImageCarousel images={project.images} />}

    <h2 className={`text-3xl font-bold mb-2 ${THEME.text}`}>{project.title}</h2>
    <p className="text-[#8A9A5B] font-bold mb-4">{project.role}</p>
    
    <div className="flex gap-2 mb-6 flex-wrap">
      {project.stack.map(tech => (
        <span key={tech} className="px-3 py-1 bg-[#E8DCCA] text-xs rounded-full font-medium text-[#4B3832]">{tech}</span>
      ))}
    </div>
    <p className={`text-lg mb-8 leading-relaxed text-[#6F4E37]`}>{project.desc}</p>
    
    <div className="flex gap-4">
      <button className={`flex items-center gap-2 px-6 py-3 ${THEME.accent} text-white rounded-xl font-semibold hover:opacity-90`}>
        <Github size={18} /> View Code
      </button>
      <button className={`flex items-center gap-2 px-6 py-3 border-2 ${THEME.border} ${THEME.text} rounded-xl font-semibold hover:bg-[#E8DCCA]`}>
        <ExternalLink size={18} /> Live Demo
      </button>
    </div>
  </motion.div>
);

// --- Main Application ---
export default function Portfolio() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.body.style.overflow = (selectedSection || selectedProject) ? 'hidden' : 'unset';
  }, [selectedSection, selectedProject]);

  const openProject = (project, e) => {
    e.stopPropagation();
    setSelectedProject(project);
  };

  return (
    <div className={`min-h-screen ${THEME.bg} p-4 md:p-8 font-sans flex items-center justify-center`}>
      
      <div className="max-w-7xl w-full h-full grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:h-[85vh]">
        
        {/* 1. Profile Box */}
        <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-between relative" onClick={() => setSelectedSection('about')}>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
               <div className={`h-20 w-20 rounded-full ${THEME.accent} flex items-center justify-center text-white shadow-lg text-2xl font-bold`}>
                 IS
               </div>
               <div className="flex gap-2 items-center px-3 py-1 bg-white/60 rounded-full border border-[#E8DCCA]">
                 <MapPin size={14} className="text-[#8A9A5B]" />
                 <span className="text-xs text-[#6F4E37] font-bold uppercase tracking-wide">{DATA.profile.location}</span>
               </div>
            </div>
            
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${THEME.text} leading-tight`}>{DATA.profile.name}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {DATA.profile.roles.map((role, i) => (
                  <span key={i} className="text-sm font-semibold text-[#8A9A5B]">{role} {i < DATA.profile.roles.length - 1 && "•"}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xs font-bold uppercase text-[#4B3832]/50 tracking-widest mb-2">Objective</h3>
            <p className="text-[#6F4E37] text-md md:text-lg leading-relaxed line-clamp-3">
              {DATA.profile.objective}
            </p>
          </div>

          <div className="mt-6 flex justify-between items-end">
             <div className="px-4 py-2 bg-white/50 rounded-lg text-sm font-semibold text-[#4B3832] hover:bg-white transition-colors">
               More Details & Socials →
             </div>
          </div>
        </Card>

        {/* 2. Projects List */}
        <Card className="md:col-span-2 md:row-span-2 overflow-hidden group" onClick={() => setSelectedSection('projects')}>
          <div className="flex justify-between items-center mb-4">
            <SectionIcon icon={Code} />
            <span className="text-xs uppercase tracking-widest text-[#8A9A5B] font-bold">View All</span>
          </div>
          <h3 className={`text-2xl font-bold ${THEME.text} mb-6`}>Selected Projects</h3>
          <div className="space-y-3 overflow-y-auto max-h-[200px] pr-2 custom-scrollbar">
            {DATA.projects.map((project) => (
              <div 
                key={project.id}
                onClick={(e) => openProject(project, e)}
                className="bg-white p-3 rounded-xl hover:shadow-md transition-all border border-transparent hover:border-[#D2B48C] cursor-pointer group/item flex gap-4 items-center"
              >
                <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img src={project.images[0]} alt={project.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-[#4B3832] truncate">{project.title}</h4>
                    <ExternalLink size={14} className="opacity-0 group-hover/item:opacity-100 text-[#8A9A5B]" />
                  </div>
                  <p className="text-sm text-[#888] line-clamp-1">{project.desc}</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                     {project.stack.slice(0, 3).map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 bg-[#F5F5DC] rounded text-[#6F4E37]">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 3. Experience */}
        <Card className="md:col-span-1 md:row-span-1" onClick={() => setSelectedSection('experience')}>
          <SectionIcon icon={Briefcase} />
          <h3 className={`text-xl font-bold ${THEME.text}`}>Experience</h3>
          <p className="text-sm text-[#6F4E37] mt-2 font-semibold">{DATA.experience[0].role}</p>
          <p className="text-xs text-[#8A9A5B]">{DATA.experience[0].company}</p>
        </Card>

        {/* 4. Education */}
        <Card className="md:col-span-1 md:row-span-1" onClick={() => setSelectedSection('education')}>
          <SectionIcon icon={GraduationCap} />
          <h3 className={`text-xl font-bold ${THEME.text}`}>Education</h3>
          <p className="text-sm text-[#6F4E37] mt-2 font-semibold">{DATA.education[0].degree}</p>
          <p className="text-xs text-[#8A9A5B]">{DATA.education[0].school}</p>
        </Card>

        {/* 5. Skills */}
        <Card className="md:col-span-1 md:row-span-1" onClick={() => setSelectedSection('skills')}>
           <SectionIcon icon={Cpu} />
           <h3 className={`text-xl font-bold ${THEME.text} mb-3`}>Tech Stack</h3>
           <div className="flex flex-wrap gap-1">
             {DATA.skills.categories[1].items.slice(0, 3).map(s => (
               <span key={s} className="text-[10px] px-2 py-1 bg-[#E8DCCA] rounded-md text-[#4B3832]">{s}</span>
             ))}
             <span className="text-[10px] px-2 py-1 text-[#888]">+ More</span>
           </div>
        </Card>

        {/* 6. Awards */}
        <Card className="md:col-span-1 md:row-span-1" onClick={() => setSelectedSection('awards')}>
           <SectionIcon icon={Award} />
           <h3 className={`text-xl font-bold ${THEME.text}`}>Honours</h3>
           <p className="text-sm text-[#6F4E37] mt-2">LPDP Scholarship & Awards</p>
        </Card>

      </div>

      {/* --- MODAL CONTROLLER --- */}
      <AnimatePresence>
        {(selectedSection || selectedProject) && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#4B3832]/60 backdrop-blur-sm p-4"
            onClick={() => { setSelectedSection(null); setSelectedProject(null); }}
          >
            
            {/* 1. Project Detail */}
            {selectedProject && (
              <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}

            {/* 2. About / Profile Modal */}
            {!selectedProject && selectedSection === 'about' && (
              <GenericModal title="About Me" onClose={() => setSelectedSection(null)}>
                <p className="text-[#6F4E37] leading-relaxed text-lg">
                  {DATA.profile.objective}
                </p>
                <div className="py-4 space-y-3">
                   <div className="flex items-center gap-3 p-3 bg-[#FFF8F0] border border-[#E8DCCA] rounded-xl">
                      <MapPin className="text-[#8A9A5B]" />
                      <div>
                        <h4 className="font-bold text-[#4B3832] text-sm">Current Location</h4>
                        <p className="text-[#6F4E37] text-sm">{DATA.profile.location}</p>
                      </div>
                   </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#4B3832] mb-3">Connect with me</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DATA.socials.map((social) => (
                      <a 
                        key={social.id}
                        href={social.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#D2B48C] text-[#4B3832] hover:bg-[#8A9A5B] hover:text-white hover:border-transparent transition-all font-medium"
                      >
                        <social.icon size={18} />
                        <span>{social.platform}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </GenericModal>
            )}

            {/* 3. Projects List */}
            {!selectedProject && selectedSection === 'projects' && (
              <GenericModal title="All Projects" onClose={() => setSelectedSection(null)}>
                <div className="grid gap-4">
                  {DATA.projects.map(p => (
                    <div 
                      key={p.id} 
                      onClick={(e) => { e.stopPropagation(); setSelectedProject(p); }}
                      className="p-4 border border-[#E8DCCA] rounded-xl hover:bg-[#FFF8F0] cursor-pointer transition-colors flex gap-4 items-center"
                    >
                      <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-lg object-cover bg-gray-200" />
                      <div className="flex-1">
                        <h4 className="font-bold text-[#4B3832]">{p.title}</h4>
                        <p className="text-xs text-[#8A9A5B] font-bold">{p.role}</p>
                        <p className="text-xs text-[#888] mt-1">{p.stack.join(' • ')}</p>
                      </div>
                      <ChevronRight size={18} className="text-[#D2B48C]" />
                    </div>
                  ))}
                </div>
              </GenericModal>
            )}

            {/* 4. Experience */}
            {!selectedProject && selectedSection === 'experience' && (
              <GenericModal title="Work Experience" onClose={() => setSelectedSection(null)}>
                {DATA.experience.map(exp => (
                  <div key={exp.id} className="pb-4 border-b border-[#E8DCCA] last:border-0 mb-4 last:mb-0">
                    <h4 className="font-bold text-lg text-[#4B3832]">{exp.role}</h4>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-[#8A9A5B] mb-2 font-medium">
                      <span>{exp.company}</span>
                      <span>{exp.date}</span>
                    </div>
                    <p className="text-[#6F4E37] text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </GenericModal>
            )}

            {/* 5. Education */}
            {!selectedProject && selectedSection === 'education' && (
              <GenericModal title="Education" onClose={() => setSelectedSection(null)}>
                {DATA.education.map(edu => (
                  <div key={edu.id} className="mb-6 last:mb-0">
                    <h4 className="font-bold text-lg text-[#4B3832]">{edu.school}</h4>
                    <p className="text-[#8A9A5B] font-bold">{edu.degree}</p>
                    <p className="text-xs text-[#888] mb-2">{edu.date}</p>
                    <p className="text-[#6F4E37] mt-2 text-sm">{edu.details}</p>
                  </div>
                ))}
              </GenericModal>
            )}

            {/* 6. Skills (Categorized) */}
            {!selectedProject && selectedSection === 'skills' && (
              <GenericModal title="Technical Skills" onClose={() => setSelectedSection(null)}>
                 <div className="space-y-6">
                   {DATA.skills.categories.map((cat, idx) => (
                     <div key={idx}>
                       <div className="flex items-center gap-2 mb-3 text-[#4B3832]">
                          <cat.icon size={18} className="text-[#8A9A5B]" />
                         <h4 className="font-bold">{cat.name}</h4>
                       </div>
                       <div className="flex flex-wrap gap-2">
                         {cat.items.map(s => (
                           <span key={s} className="px-3 py-1.5 bg-[#E8DCCA]/50 border border-[#E8DCCA] rounded-lg text-[#4B3832] text-sm font-medium">
                             {s}
                           </span>
                         ))}
                       </div>
                     </div>
                   ))}
                 </div>
              </GenericModal>
            )}

            {/* 7. Awards */}
            {!selectedProject && selectedSection === 'awards' && (
               <GenericModal title="Awards & Certificates" onClose={() => setSelectedSection(null)}>
                 <h5 className="font-bold text-[#4B3832] mb-2 text-lg">Honours & Awards</h5>
                 <ul className="space-y-3 mb-8">
                   {DATA.awards.map((a, i) => (
                     <li key={i} className="flex items-start gap-3 text-[#6F4E37] text-sm">
                       <Award size={16} className="text-[#8A9A5B] mt-1 flex-shrink-0"/>
                       <span>{a}</span>
                     </li>
                   ))}
                 </ul>
                 
                 <h5 className="font-bold text-[#4B3832] mb-2 text-lg">Certifications</h5>
                 <ul className="space-y-3">
                   {DATA.certificates.map((c, i) => (
                     <li key={i} className="flex items-start gap-3 text-[#6F4E37] text-sm">
                       <FileCheck size={16} className="text-[#8A9A5B] mt-1 flex-shrink-0"/>
                       <span>{c}</span>
                     </li>
                   ))}
                 </ul>
               </GenericModal>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
