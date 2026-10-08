import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  Bell,
  ChevronRight,
  FileDown,
  FileCheck,
  MapPin,
  Menu,
  MessageSquare,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { GenericModal } from './components/GenericModal.tsx';
import { ProjectDetail } from './components/ProjectDetail.tsx';
import { EducationTile } from './components/tiles/EducationTile.tsx';
import { ExperienceTile } from './components/tiles/ExperienceTile.tsx';
import { HonoursTile } from './components/tiles/HonoursTile.tsx';
import { ProfileTile } from './components/tiles/ProfileTile.tsx';
import { ProjectsTile } from './components/tiles/ProjectsTile.tsx';
import { SkillsTile } from './components/tiles/SkillsTile.tsx';
import { DATA } from './lib/data.ts';
import { THEME } from './lib/theme.ts';
import type { Project, SectionKey } from './lib/types.ts';

export default function Portfolio(): ReactElement {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<SectionKey | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPageMenu, setShowPageMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirect');
    if (redirectPath) {
      sessionStorage.removeItem('redirect');
      const path = new URL(redirectPath, window.location.origin).pathname;
      if (path !== '/' && path !== '') {
        navigate(path);
      }
    }
  }, [navigate]);

  useEffect(() => {
    document.body.style.overflow = selectedSection || selectedProject ? 'hidden' : 'unset';
  }, [selectedSection, selectedProject]);

  useEffect(() => {
    if (!selectedSection && !selectedProject) return undefined;
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return;
      if (selectedProject) setSelectedProject(null);
      else setSelectedSection(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [selectedSection, selectedProject]);

  useEffect(() => {
    if (!showPageMenu) return undefined;
    const closeOnOutsideClick = (event: PointerEvent): void => {
      if (!menuRef.current?.contains(event.target as Node)) setShowPageMenu(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [showPageMenu]);

  const closeModal = (): void => {
    setSelectedSection(null);
    setSelectedProject(null);
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32 }} className={`min-h-screen ${THEME.bg} bg-[radial-gradient(#E8DCCA_1px,transparent_1px)] [background-size:22px_22px] px-4 py-4 md:px-6 lg:px-8 font-sans`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <header className="flex items-center justify-between gap-4">
          <p className="text-sm text-[#6F4E37]">
            <span className="font-bold tracking-tight text-[#4B3832]">sena<span className="text-[#8A9A5B]">.</span>web<span className="text-[#8A9A5B]">.</span>id</span>
            <span className="hidden sm:inline"> · {greeting}, thanks for stopping by</span>
          </p>

          {/* Pages Menu */}
          <div className="relative z-40" ref={menuRef}>
            <button
              type="button"
              aria-label="Pages Menu"
              aria-expanded={showPageMenu}
              onClick={() => setShowPageMenu(!showPageMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-[#E8DCCA] text-[#4B3832] hover:bg-white hover:shadow-md transition-all font-semibold"
            >
              <Menu size={18} />
            </button>
            {showPageMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E8DCCA] overflow-hidden">
                <Link
                  to="/news"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFF8F0] transition-colors text-[#4B3832]"
                  onClick={() => setShowPageMenu(false)}
                >
                  <Bell size={18} className="text-[#8A9A5B]" />
                  <span className="font-medium">News</span>
                </Link>
                <Link
                  to="/chat"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFF8F0] transition-colors text-[#4B3832] border-t border-[#E8DCCA]"
                  onClick={() => setShowPageMenu(false)}
                >
                  <MessageSquare size={18} className="text-[#8A9A5B]" />
                  <span className="font-medium">Chat</span>
                </Link>
              </div>
            )}
          </div>
        </header>

        {/*
          Bento grid. On large screens the two hero tiles share the top two rows and the
          four compact tiles sit on an auto-height row, so nothing gets clipped on short viewports.
        */}
        <main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[1fr_1fr_auto] lg:min-h-[calc(100dvh-5.5rem)]">
          <ProfileTile onOpen={() => setSelectedSection('about')} />
          <ProjectsTile onOpen={() => setSelectedSection('projects')} onSelect={setSelectedProject} />
          <ExperienceTile onOpen={() => setSelectedSection('experience')} />
          <EducationTile onOpen={() => setSelectedSection('education')} />
          <SkillsTile onOpen={() => setSelectedSection('skills')} />
          <HonoursTile onOpen={() => setSelectedSection('awards')} />
        </main>
      </div>

      {/* --- MODAL CONTROLLER --- */}
      <AnimatePresence>
        {(selectedSection || selectedProject) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#4B3832]/60 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            
            {/* 1. Project Detail */}
            {selectedProject && (
              <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}

            {/* 2. About / Profile Modal */}
            {!selectedProject && selectedSection === 'about' && (
              <GenericModal title="About Me" onClose={() => setSelectedSection(null)}>
                <ReactMarkdown className="text-[#6F4E37] leading-relaxed text-lg">
                  {DATA.profile.objective}
                </ReactMarkdown>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
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
                  <a
                    href="/cv.pdf"
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-2 px-4 py-4 rounded-lg text-sm font-semibold text-white bg-[#8A9A5B] hover:bg-[#7A8A4B] transition-colors shadow-sm border border-transparent"
                  >
                    <FileDown size={16} /> Download CV
                  </a>
                </div>
              </GenericModal>
            )}

            {/* 3. Projects List */}
            {!selectedProject && selectedSection === 'projects' && (
              <GenericModal title="All Projects" onClose={() => setSelectedSection(null)}>
                <div className="grid gap-4">
                    {DATA.projects.map((p) => (
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
                    <div className="text-[#6F4E37] text-sm leading-relaxed"><ReactMarkdown>{exp.desc}</ReactMarkdown></div>
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
                    <div className="text-[#6F4E37] mt-2 text-sm"><ReactMarkdown>{edu.details}</ReactMarkdown></div>
                  </div>
                ))}
              </GenericModal>
            )}

            {/* 6. Skills (Categorized) */}
            {!selectedProject && selectedSection === 'skills' && (
              <GenericModal title="Technical Skills" onClose={() => setSelectedSection(null)}>
                 <div className="space-y-6">
                  {DATA.skills.categories.map((cat) => (
                    <div key={cat.name}>
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
    </motion.div>
  );
}
