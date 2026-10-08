import { AnimatePresence, motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useState, type ReactElement } from 'react';
import { DATA } from '../../lib/data.ts';
import { headline } from '../../lib/format.ts';
import { useCountUp, useRotatingIndex } from '../../lib/hooks.ts';
import { THEME } from '../../lib/theme.ts';
import { Card } from '../Card.tsx';
import { SectionIcon } from '../SectionIcon.tsx';

interface TileProps {
  onOpen: () => void;
}

const Count = ({ value, label }: { value: number; label: string }): ReactElement => {
  const current = useCountUp(value);
  return (
    <div>
      <p className={`text-3xl font-bold leading-none tabular-nums ${THEME.text}`}>{current}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6F4E37]/60">{label}</p>
    </div>
  );
};

export const HonoursTile = ({ onOpen }: TileProps): ReactElement => {
  const [paused, setPaused] = useState(false);
  const index = useRotatingIndex(DATA.awards.length, 2800, paused);

  return (
    <Card delay={0.34} label="Awards and certificates" onClick={onOpen} className="flex flex-col">
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="flex flex-1 flex-col">
        <SectionIcon icon={Award} />
        <h3 className={`text-xl font-bold ${THEME.text}`}>Honours</h3>

        <div className="mt-3 flex gap-6">
          <Count value={DATA.awards.length} label="Awards" />
          <Count value={DATA.certificates.length} label="Certs" />
        </div>

        <div className="relative mt-3 h-9 overflow-hidden" aria-live="off">
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 flex items-start gap-1.5 text-xs font-semibold text-[#6F4E37]"
            >
              <span aria-hidden>🏆</span>
              <span className="line-clamp-2">{headline(DATA.awards[index])}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};
