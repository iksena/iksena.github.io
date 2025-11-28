import type { LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';
import { THEME } from '../lib/theme.ts';

interface SectionIconProps {
  icon: LucideIcon;
}

export const SectionIcon = ({ icon: Icon }: SectionIconProps): ReactElement => (
  <div className={`p-2 rounded-full w-fit mb-4 ${THEME.accent} text-white`}>
    <Icon size={20} />
  </div>
);