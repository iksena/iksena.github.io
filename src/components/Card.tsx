import { motion } from 'framer-motion';
import { useId, type MouseEvent, type ReactElement, type ReactNode } from 'react';
import { THEME } from '../lib/theme.ts';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Card = ({ children, className, onClick }: CardProps): ReactElement => {
  const id = useId();
  return (
    <motion.div
      layoutId={`card-${id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, boxShadow: '0px 10px 20px rgba(75, 56, 50, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`rounded-3xl p-6 cursor-pointer shadow-sm border border-[#E8DCCA] relative overflow-hidden ${THEME.card} ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
};