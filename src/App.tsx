import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  Briefcase,
  ChevronRight,
  Code,
  Cpu,
  ExternalLink,
  FileCheck,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from './components/Card.tsx';
import { GenericModal } from './components/GenericModal.tsx';
import { ProjectDetail } from './components/ProjectDetail.tsx';
import { SectionIcon } from './components/SectionIcon.tsx';
import { DATA } from './lib/data.ts';
import { THEME } from './lib/theme.ts';

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
                 <motion.img
                   src={DATA.profile.avatar}
                   alt={DATA.profile.name}
                   className="h-full w-full object-cover rounded-full"
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 0.5 }}
                 />
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
          <div className="flex justify-between items-center mb-1">
            <SectionIcon icon={Code} />
            <span className="text-xs uppercase tracking-widest text-[#8A9A5B] font-bold">View All</span>
          </div>
          <h3 className={`text-2xl font-bold ${THEME.text} mb-3`}>Selected Projects</h3>
          <div className="space-y-3 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
            {DATA.projects.map((project) => (
              <div 
                key={project.id}
                onClick={(e) => openProject(project, e)}
                className="bg-white p-3 rounded-xl hover:shadow-md transition-all border border-transparent hover:border-[#D2B48C] cursor-pointer group/item flex gap-4 items-center"
              >
                <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
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
                      className="p-4 border border-[#E8DCCA] rounded-xl hover:shadow-md hover:bg-[#FFF8F0] cursor-pointer transition-colors flex gap-4 items-center"
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
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-[#8A9A5B] mb-1 font-medium">
                      <span>{exp.company}</span>
                      <span>{exp.date}</span>
                    </div>
                    <p className="text-xs text-[#888] mb-1">{exp.location}</p>
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
                       <Award size={16} className="text-[#8A9A5B] mt-1 shrink-0"/>
                       <span>{a}</span>
                     </li>
                   ))}
                 </ul>
                 
                 <h5 className="font-bold text-[#4B3832] mb-2 text-lg">Certifications</h5>
                 <ul className="space-y-3">
                   {DATA.certificates.map((c, i) => (
                     <li key={i} className="flex items-start gap-3 text-[#6F4E37] text-sm">
                       <FileCheck size={16} className="text-[#8A9A5B] mt-1 shrink-0"/>
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
