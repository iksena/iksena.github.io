import { motion } from 'framer-motion';
import { type KeyboardEvent, type MouseEvent, type ReactElement, type ReactNode } from 'react';
import { THEME } from '../lib/theme.ts';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  /** Entrance delay in seconds, used to stagger the grid. */
  delay?: number;
  /** Accessible name for the card when it acts as a button. */
  label?: string;
}

const trackSpotlight = (event: MouseEvent<HTMLDivElement>): void => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
};

export const Card = ({ children, className, onClick, delay = 0, label }: CardProps): ReactElement => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (!onClick || event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      onMouseMove={trackSpotlight}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={label}
      className={`spotlight group/card relative overflow-hidden rounded-3xl p-6 shadow-sm border border-[#E8DCCA] ${THEME.card} transition-[border-color,box-shadow] duration-300 hover:border-[#D2B48C] hover:shadow-[0_18px_40px_-18px_rgba(75,56,50,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A9A5B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F5DC] ${onClick ? 'cursor-pointer' : ''} ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
};
