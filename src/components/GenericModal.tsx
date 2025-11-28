import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { type MouseEvent, type ReactElement, type ReactNode } from 'react';
import { THEME } from '../lib/theme.ts';

interface GenericModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const GenericModal = ({ title, children, onClose }: GenericModalProps): ReactElement => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className={`${THEME.card} w-full max-w-lg p-8 rounded-3xl shadow-2xl relative m-4 max-h-[80vh] overflow-y-auto`}
    onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
  >
    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-20" type="button">
      <X size={24} className={THEME.text} />
    </button>
    <h2 className={`text-2xl font-bold mb-6 ${THEME.text}`}>{title}</h2>
    <div className="space-y-4">{children}</div>
  </motion.div>
);