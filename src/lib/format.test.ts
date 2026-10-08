import { describe, expect, it } from 'vitest';
import {
  extractGpa,
  extractParenthetical,
  headline,
  parseDateRange,
  parseMonthYear,
  rangeProgress,
  toYearSpan,
} from './format';

describe('format', () => {
  it('parses month-year strings with full or short month names', () => {
    expect(parseMonthYear('Feb 2025')).toEqual(new Date(2025, 1, 1));
    expect(parseMonthYear('July 2025')).toEqual(new Date(2025, 6, 1));
    expect(parseMonthYear('Nov 2026 (Expected)')).toEqual(new Date(2026, 10, 1));
    expect(parseMonthYear('Present')).toBeNull();
  });

  it('parses ranges and flags ongoing ones', () => {
    expect(parseDateRange('July 2025 - Present')).toEqual({ start: new Date(2025, 6, 1), end: null, current: true });
    expect(parseDateRange('Oct 2019 - June 2023').end).toEqual(new Date(2023, 5, 1));
  });

  it('formats year spans', () => {
    expect(toYearSpan('Oct 2019 - June 2023')).toBe('2019 – 2023');
    expect(toYearSpan('July 2025 - Present')).toBe('2025 – Now');
    expect(toYearSpan('May 2018 - Dec 2018')).toBe('2018');
    expect(toYearSpan('Ongoing')).toBe('Ongoing');
  });

  it('computes progress through a fixed range', () => {
    const range = 'Jan 2025 - Jan 2027';
    expect(rangeProgress(range, new Date(2026, 0, 1))).toBeCloseTo(0.5, 2);
    expect(rangeProgress(range, new Date(2024, 0, 1))).toBe(0);
    expect(rangeProgress(range, new Date(2030, 0, 1))).toBe(1);
    expect(rangeProgress('July 2025 - Present')).toBeNull();
  });

  it('extracts GPA without trailing punctuation', () => {
    expect(extractGpa('GPA: 6.50 / 7.00. Coursework: Algorithms')).toBe('6.50/7.00');
    expect(extractGpa('No grades listed')).toBeNull();
  });

  it('extracts parentheticals and headlines', () => {
    expect(extractParenthetical('Founder (May 2018 - Jun 2018)')).toBe('May 2018 - Jun 2018');
    expect(extractParenthetical('Founder')).toBeNull();
    expect(headline('LPDP Scholarship (2024) - Full scholarship')).toBe('LPDP Scholarship (2024)');
  });
});
