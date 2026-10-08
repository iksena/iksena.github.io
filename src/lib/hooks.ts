import { useEffect, useState, useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const subscribeReducedMotion = (onChange: () => void): (() => void) => {
  const query = window.matchMedia?.(REDUCED_MOTION_QUERY);
  query?.addEventListener('change', onChange);
  return () => query?.removeEventListener('change', onChange);
};

const getReducedMotion = (): boolean => window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;

export const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

/** Current time, refreshed every `intervalMs`. */
export const useNow = (intervalMs = 30_000): Date => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);
  return now;
};

/** Animates from 0 to `target` once on mount, with an ease-out curve. */
export const useCountUp = (target: number, durationMs = 1200): number => {
  const canAnimate = typeof window.requestAnimationFrame === 'function' && !getReducedMotion();
  const [value, setValue] = useState(() => (canAnimate ? 0 : target));

  useEffect(() => {
    if (!canAnimate) return undefined;
    let frame = 0;
    const start = performance.now();
    const tick = (time: number): void => {
      const progress = Math.min(1, (time - start) / durationMs);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [canAnimate, target, durationMs]);

  return value;
};

/** Index that advances every `intervalMs` through `length` items. */
export const useRotatingIndex = (length: number, intervalMs = 3200, paused = false): number => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused || length < 2) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % length), intervalMs);
    return () => window.clearInterval(timer);
  }, [length, intervalMs, paused]);
  return index;
};
