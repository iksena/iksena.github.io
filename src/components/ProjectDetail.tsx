import { motion } from 'framer-motion';
import { ExternalLink, Globe, X } from 'lucide-react';
import { THEME } from '../lib/theme.ts';
import { ImageCarousel } from './ImageCarousel.tsx';

export const ProjectDetail = ({ project, onClose }) => (
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
      {project.learnMoreLink && <button 
        className={`flex items-center gap-2 px-6 py-3 ${THEME.accent} text-white rounded-xl font-semibold hover:opacity-90`}
        onClick={() => window.open(project.learnMoreLink, '_blank')}
      >
        <Globe size={18} /> Learn More
      </button>}
      {project.demoLink && <button className={`flex items-center gap-2 px-6 py-3 border-2 ${THEME.border} ${THEME.text} rounded-xl font-semibold hover:bg-[#E8DCCA]`}
        onClick={() => window.open(project.demoLink, '_blank')}
      >
        <ExternalLink size={18} /> Live Demo
      </button>}
    </div>
  </motion.div>
);