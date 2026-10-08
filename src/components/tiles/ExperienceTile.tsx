import { Briefcase } from 'lucide-react';
import type { ReactElement } from 'react';
import { DATA } from '../../lib/data.ts';
import { parseDateRange, toYearSpan } from '../../lib/format.ts';
import { THEME } from '../../lib/theme.ts';
import { Card } from '../Card.tsx';
import { SectionIcon } from '../SectionIcon.tsx';

interface TileProps {
  onOpen: () => void;
}

export const ExperienceTile = ({ onOpen }: TileProps): ReactElement => {
  const [current, ...previous] = DATA.experience;
  const isCurrent = parseDateRange(current.date).current;

  return (
    <Card delay={0.16} label="Work experience" onClick={onOpen} className="flex flex-col">
      <div className="flex items-start justify-between">
        <SectionIcon icon={Briefcase} />
        <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6F4E37]/70 border border-[#E8DCCA]">
          {DATA.experience.length} roles
        </span>
      </div>
      <h3 className={`text-xl font-bold ${THEME.text}`}>Experience</h3>

      <div className="mt-2 flex items-start gap-2">
        {isCurrent && (
          <span className="relative mt-1.5 flex h-2 w-2 shrink-0" title="Current role">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8A9A5B] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8A9A5B]" />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-sm text-[#6F4E37] font-semibold">{current.role}</p>
          <p className="text-xs text-[#8A9A5B] truncate">{current.company}</p>
        </div>
      </div>

      {previous.length > 0 && (
        <ol className="mt-3 space-y-1.5 border-l-2 border-[#E8DCCA] pl-3">
          {previous.map((exp) => (
            <li
              key={exp.id}
              className="relative flex items-baseline justify-between gap-2 text-xs text-[#6F4E37]/80 transition-colors hover:text-[#4B3832]"
            >
              <span className="absolute -left-[17px] top-1.5 h-2 w-2 rounded-full border-2 border-[#FFF8F0] bg-[#D2B48C]" />
              <span className="truncate">{exp.company.replace(/^PT\s+/, '').replace(/\s+Tbk\.?$/, '')}</span>
              <span className="shrink-0 tabular-nums text-[10px] text-[#6F4E37]/60">{toYearSpan(exp.date)}</span>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
};
