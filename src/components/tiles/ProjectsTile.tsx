import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Code } from 'lucide-react';
import { useState, type KeyboardEvent, type ReactElement } from 'react';
import { DATA } from '../../lib/data.ts';
import { extractParenthetical, toYearSpan } from '../../lib/format.ts';
import { THEME } from '../../lib/theme.ts';
import type { Project } from '../../lib/types.ts';
import { Card } from '../Card.tsx';
import { SectionIcon } from '../SectionIcon.tsx';

interface ProjectsTileProps {
  onOpen: () => void;
  onSelect: (project: Project) => void;
}

const projectYears = (project: Project): string => {
  const range = extractParenthetical(project.role);
  return range ? toYearSpan(range) : '';
};

export const ProjectsTile = ({ onOpen, onSelect }: ProjectsTileProps): ReactElement => {
  const { projects } = DATA;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const project = projects[active];

  const advance = (): void => setActive((current) => (current + 1) % projects.length);

  const select = (item: Project): void => onSelect(item);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, item: Project): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      select(item);
    }
  };

  return (
    <Card
      delay={0.08}
      label="All projects"
      onClick={onOpen}
      className="md:col-span-2 lg:row-span-2 flex flex-col"
    >
      <div className="flex items-start justify-between">
        <SectionIcon icon={Code} />
        <span className="flex items-center gap-1 text-xs uppercase tracking-widest text-[#8A9A5B] font-bold transition-transform group-hover/card:translate-x-0.5">
          View All <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className={`text-2xl font-bold ${THEME.text}`}>Selected Projects</h3>
        <span className="text-xs font-semibold tabular-nums text-[#6F4E37]/60">
          {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      <div
        className="relative mt-4 flex-1 lg:min-h-[300px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="grid gap-3 sm:grid-cols-[1.15fr_1fr] lg:grid-cols-2 xl:grid-cols-[1.15fr_1fr] lg:absolute lg:inset-0 lg:grid-rows-[minmax(0,1fr)]">
          {/* Featured preview */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`Open ${project.title} details`}
            onClick={(e) => { e.stopPropagation(); select(project); }}
            onKeyDown={(e) => handleKeyDown(e, project)}
            className="group/feature relative overflow-hidden rounded-2xl bg-[#4B3832] aspect-[4/3] sm:aspect-auto sm:min-h-[280px] lg:min-h-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A9A5B]"
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={project.id}
                src={project.images[0]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/feature:scale-105"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-t from-[#2E211D]/90 via-[#2E211D]/25 to-transparent" />

            {/* Story-style progress: the active segment drives auto-advance */}
            <div className="absolute inset-x-3 top-3 flex gap-1" aria-hidden>
              {projects.map((item, index) => (
                <span key={item.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                  {index < active && <span className="block h-full w-full bg-white" />}
                  {index === active && (
                    <span
                      key={active}
                      className="progress-fill block h-full bg-white"
                      style={{ animationPlayState: paused ? 'paused' : 'running' }}
                      onAnimationEnd={advance}
                    />
                  )}
                </span>
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">{projectYears(project)}</p>
              <p className="text-xl font-bold leading-tight">{project.title}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {project.stack.slice(0, 3).map((tech) => (
                  <span key={tech} className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold opacity-0 translate-y-1 transition-all group-hover/feature:opacity-100 group-hover/feature:translate-y-0 group-focus-visible/feature:opacity-100">
                View case study <ArrowUpRight size={13} />
              </span>
            </div>
          </div>

          {/* Project list — hover or focus to preview */}
          <ul className="custom-scrollbar max-h-72 sm:max-h-[280px] lg:max-h-none space-y-1.5 overflow-y-auto pr-1">
            {projects.map((item, index) => {
              const isActive = index === active;
              return (
                <li
                  key={item.id}
                  tabIndex={0}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={(e) => { e.stopPropagation(); select(item); }}
                  onKeyDown={(e) => handleKeyDown(e, item)}
                  className={`relative flex cursor-pointer items-center gap-3 rounded-xl border p-2 pr-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A9A5B] ${
                    isActive
                      ? 'border-[#D2B48C] bg-white shadow-sm'
                      : 'border-transparent bg-white/50 hover:bg-white'
                  }`}
                >
                  <span
                    className={`absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[#8A9A5B] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#E8DCCA]">
                    <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-bold text-[#4B3832]">{item.title}</h4>
                    <p className="truncate text-[11px] text-[#6F4E37]/70">{item.stack.slice(0, 2).join(' · ')}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-semibold tabular-nums text-[#8A9A5B] lg:hidden xl:inline">
                    {projectYears(item).split(' – ')[0]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Card>
  );
};
