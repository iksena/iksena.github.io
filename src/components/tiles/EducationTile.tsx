import { GraduationCap } from 'lucide-react';
import type { ReactElement } from 'react';
import { DATA } from '../../lib/data.ts';
import { extractGpa, parseDateRange, rangeProgress, toYearSpan } from '../../lib/format.ts';
import { THEME } from '../../lib/theme.ts';
import { Card } from '../Card.tsx';
import { SectionIcon } from '../SectionIcon.tsx';

interface TileProps {
  onOpen: () => void;
}

export const EducationTile = ({ onOpen }: TileProps): ReactElement => {
  const [latest, ...earlier] = DATA.education;
  const gpa = extractGpa(latest.details);
  const progress = rangeProgress(latest.date);
  const inProgress = progress !== null && progress < 1;
  const end = parseDateRange(latest.date).end;
  const endLabel = end?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <Card delay={0.22} label="Education" onClick={onOpen} className="flex flex-col">
      <div className="flex items-start justify-between">
        <SectionIcon icon={GraduationCap} />
        {gpa && (
          <span className="rounded-full bg-[#8A9A5B]/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#5E6B3A]">
            GPA {gpa}
          </span>
        )}
      </div>
      <h3 className={`text-xl font-bold ${THEME.text}`}>Education</h3>
      <p className="text-sm text-[#6F4E37] mt-2 font-semibold">{latest.degree}</p>
      <p className="text-xs text-[#8A9A5B]">{latest.school}</p>

      {inProgress && (
        <div className="mt-3" title={`${Math.round(progress * 100)}% through the degree`}>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#E8DCCA]">
            <div
              className="grow-x h-full rounded-full bg-linear-to-r from-[#8A9A5B] to-[#B5C17E]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="mt-1 flex justify-between text-[10px] font-semibold text-[#6F4E37]/60">
            <span className="tabular-nums">{Math.round(progress * 100)}% complete</span>
            {endLabel && <span>Grad {endLabel}</span>}
          </p>
        </div>
      )}

      {earlier.map((edu) => (
        <p key={edu.id} className="mt-2 flex justify-between gap-2 text-xs text-[#6F4E37]/80">
          <span className="truncate">{edu.school}</span>
          <span className="shrink-0 tabular-nums text-[10px] text-[#6F4E37]/60">{toYearSpan(edu.date)}</span>
        </p>
      ))}
    </Card>
  );
};
