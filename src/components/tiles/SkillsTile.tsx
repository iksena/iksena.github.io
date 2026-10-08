import { Cpu } from 'lucide-react';
import type { ReactElement } from 'react';
import { DATA } from '../../lib/data.ts';
import { THEME } from '../../lib/theme.ts';
import { Card } from '../Card.tsx';
import { SectionIcon } from '../SectionIcon.tsx';

interface TileProps {
  onOpen: () => void;
}

const TECH = DATA.skills.categories.filter((cat) => cat.name !== 'Languages').flatMap((cat) => cat.items);
const ROWS = [TECH.filter((_, i) => i % 2 === 0), TECH.filter((_, i) => i % 2 === 1)];

export const SkillsTile = ({ onOpen }: TileProps): ReactElement => (
  <Card delay={0.28} label="Technical skills" onClick={onOpen} className="flex flex-col">
    <div className="flex items-start justify-between">
      <SectionIcon icon={Cpu} />
      <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6F4E37]/70 border border-[#E8DCCA]">
        {TECH.length} tools
      </span>
    </div>
    <h3 className={`text-xl font-bold ${THEME.text} mb-3`}>Tech Stack</h3>

    {/* Two counter-scrolling rows; hover the card to pause */}
    <div className="-mx-6 space-y-1.5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="marquee flex w-max group-hover/card:[animation-play-state:paused]"
          style={{ animationDirection: rowIndex % 2 ? 'reverse' : 'normal' }}
        >
          {[...row, ...row].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              aria-hidden={i >= row.length}
              className="mr-1.5 whitespace-nowrap rounded-md bg-[#E8DCCA] px-2 py-1 text-[11px] font-medium text-[#4B3832] transition-colors hover:bg-[#8A9A5B] hover:text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      ))}
    </div>
  </Card>
);
