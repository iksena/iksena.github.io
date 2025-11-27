import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { THEME } from '../lib/theme.ts';

export const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    if (isInteracting) return;

    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images, isInteracting]);

  return (
    <div className="relative w-full h-64 md:h-80 bg-gray-200 rounded-2xl overflow-hidden mb-6 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={images[index]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="absolute w-full h-full object-contain"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsInteracting(true)}
          onDragEnd={(e, info) => {
            const offsetX = info.offset.x;
            const velocityX = info.velocity.x;
            const swipeThreshold = 100; 
            const velocityThreshold = 500; 
            const isSwipe = Math.abs(offsetX) > swipeThreshold || Math.abs(velocityX) > velocityThreshold;
            if (!isSwipe) {
              setIsInteracting(false);
              return;
            }

            if (offsetX < 0) {
              paginate(1);
            } else {
              paginate(-1);
            }

            setIsInteracting(false);
          }}
          style={{ touchAction: 'pan-y' }}
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); paginate(-1); }} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <ChevronLeft size={20} className={THEME.text} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); paginate(1); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <ChevronRight size={20} className={THEME.text} />
          </button>
        </>
      )}
    </div>
  );
};