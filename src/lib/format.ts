const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export interface DateRange {
  start: Date | null;
  end: Date | null;
  current: boolean;
}

/** Parses strings such as "Feb 2025" or "July 2025 (Expected)" into the first day of that month. */
export const parseMonthYear = (value: string): Date | null => {
  const match = value.trim().match(/^([A-Za-z]+)\s+(\d{4})/);
  if (!match) return null;
  const month = MONTHS.indexOf(match[1].slice(0, 3).toLowerCase());
  if (month < 0) return null;
  return new Date(Number(match[2]), month, 1);
};

/** Parses ranges such as "Oct 2019 - June 2023" or "July 2025 - Present". */
export const parseDateRange = (range: string): DateRange => {
  const [startPart = '', endPart = ''] = range.split(/\s+-\s+/);
  const current = /present/i.test(endPart);
  return {
    start: parseMonthYear(startPart),
    end: current ? null : parseMonthYear(endPart),
    current,
  };
};

/** "Oct 2019 - June 2023" → "2019 – 2023", "July 2025 - Present" → "2025 – Now". */
export const toYearSpan = (range: string): string => {
  const years = range.match(/\d{4}/g) ?? [];
  if (years.length === 0) return range;
  if (/present/i.test(range)) return `${years[0]} – Now`;
  const first = years[0];
  const last = years[years.length - 1];
  return first === last ? first : `${first} – ${last}`;
};

/** Fraction (0–1) of the range that has elapsed, or null when the range has no fixed end. */
export const rangeProgress = (range: string, now: Date = new Date()): number | null => {
  const { start, end } = parseDateRange(range);
  if (!start || !end) return null;
  const total = end.getTime() - start.getTime();
  if (total <= 0) return null;
  return Math.min(1, Math.max(0, (now.getTime() - start.getTime()) / total));
};

export const extractGpa = (details: string): string | null =>
  details.match(/GPA:\s*(\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?)/)?.[1].replace(/\s+/g, '') ?? null;

/** "Software Engineer (July 2025 - Present)" → "July 2025 - Present". */
export const extractParenthetical = (text: string): string | null => text.match(/\(([^)]+)\)/)?.[1] ?? null;

/** "LPDP Scholarship (2024) - Full scholarship" → "LPDP Scholarship (2024)". */
export const headline = (text: string): string => text.split(' - ')[0];
