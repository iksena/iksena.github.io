import { motion } from 'framer-motion';
import { FileDown, MapPin, Moon, Sun } from 'lucide-react';
import type { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { DATA } from '../../lib/data.ts';
import { useCountUp, useNow } from '../../lib/hooks.ts';
import { THEME } from '../../lib/theme.ts';
import type { ClockZone, Highlight } from '../../lib/types.ts';
import { Card } from '../Card.tsx';

interface ProfileTileProps {
  onOpen: () => void;
}

const Clock = ({ zone, now }: { zone: ClockZone; now: Date }): ReactElement => {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: zone.timeZone }).format(now));
  const time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: zone.timeZone }).format(now);
  const isDay = hour >= 6 && hour < 18;
  const Icon = isDay ? Sun : Moon;
  return (
    <span className="flex items-center gap-1.5 text-xs text-[#6F4E37]" title={`Local time in ${zone.city}`}>
      <Icon size={13} className={isDay ? 'text-[#C9A227]' : 'text-[#6F4E37]/70'} />
      <span className="font-semibold">{zone.city}</span>
      <span className="tabular-nums text-[#6F4E37]/80">{time}</span>
    </span>
  );
};

const Stat = ({ value, suffix, label }: Highlight): ReactElement => {
  const current = useCountUp(value);
  return (
    <div className="rounded-2xl bg-white/70 border border-[#E8DCCA] px-3 py-2.5 transition-colors group-hover/card:bg-white">
      <p className={`text-2xl font-bold ${THEME.text} tabular-nums leading-none`}>
        {current}
        <span className="text-[#8A9A5B]">{suffix}</span>
      </p>
      <p className="mt-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#6F4E37]/60">{label}</p>
    </div>
  );
};

export const ProfileTile = ({ onOpen }: ProfileTileProps): ReactElement => {
  const { profile, socials, projects } = DATA;
  const now = useNow();
  const highlights: Highlight[] = [
    ...profile.highlights,
    { value: projects.length, suffix: '', label: 'Key projects' },
  ];

  return (
    <Card
      label="About me"
      onClick={onOpen}
      className="md:col-span-2 lg:row-span-2 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="relative w-fit shrink-0">
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-full p-[3px] bg-linear-to-br from-[#8A9A5B] via-[#D2B48C] to-[#6F4E37] shadow-lg">
            <motion.img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full rounded-full object-cover border-2 border-[#FFF8F0]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span
            aria-hidden
            className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-white text-base shadow-md origin-[70%_70%] group-hover/card:[animation:wave_1.6s_ease-in-out_infinite]"
          >
            👋
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full border border-[#E8DCCA]">
            <MapPin size={14} className="text-[#8A9A5B] shrink-0" />
            <span className="text-xs text-[#6F4E37] font-bold uppercase tracking-wide">{profile.location}</span>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 sm:justify-end">
            {profile.clocks.map((zone) => (
              <Clock key={zone.city} zone={zone} now={now} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <h1 className={`text-3xl md:text-4xl font-bold ${THEME.text} leading-tight tracking-tight`}>{profile.name}</h1>
        <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2" data-testid="roles-list">
          {profile.roles.map((role, index) => (
            <span key={role} className="text-sm font-semibold text-[#8A9A5B]">
              {role}
              {index < profile.roles.length - 1 && ' •'}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-xs font-bold uppercase text-[#4B3832]/50 tracking-widest mb-2">Objective</h3>
        <ReactMarkdown className="text-[#6F4E37] md:text-lg leading-relaxed line-clamp-3 lg:line-clamp-4">
          {profile.objective}
        </ReactMarkdown>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {highlights.map((item) => (
          <Stat key={item.label} {...item} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          className="px-4 py-2 bg-white/70 rounded-lg text-sm font-semibold text-[#4B3832] hover:bg-white transition-colors border border-[#E8DCCA] shadow-sm"
        >
          More Details & Socials →
        </button>
        <a
          href="/cv.pdf"
          download
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#8A9A5B] hover:bg-[#7A8A4B] transition-colors shadow-sm"
        >
          <FileDown size={16} /> Download CV
        </a>
        <div className="flex items-center gap-1 sm:ml-auto">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              aria-label={social.platform}
              title={social.platform}
              onClick={(e) => e.stopPropagation()}
              className="grid h-9 w-9 place-items-center rounded-full text-[#6F4E37] transition-all hover:-translate-y-0.5 hover:bg-[#8A9A5B] hover:text-white"
            >
              <social.icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
};
