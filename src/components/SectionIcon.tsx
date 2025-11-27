import { THEME } from '../lib/theme.ts';

export const SectionIcon = ({ icon: Icon }) => (
  <div className={`p-2 rounded-full w-fit mb-4 ${THEME.accent} text-white`}>
    <Icon size={20} />
  </div>
);