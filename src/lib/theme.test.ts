import { describe, it, expect } from 'vitest';
import { THEME } from './theme';

describe('THEME', () => {
  it('exports theme object with all required properties', () => {
    expect(THEME).toHaveProperty('bg');
    expect(THEME).toHaveProperty('text');
    expect(THEME).toHaveProperty('card');
    expect(THEME).toHaveProperty('accent');
    expect(THEME).toHaveProperty('border');
  });

  it('has correct background color class', () => {
    expect(THEME.bg).toBe('bg-[#F5F5DC]');
  });

  it('has correct text color class', () => {
    expect(THEME.text).toBe('text-[#4B3832]');
  });

  it('has correct card color class', () => {
    expect(THEME.card).toBe('bg-[#FFF8F0]');
  });

  it('has correct accent color class', () => {
    expect(THEME.accent).toBe('bg-[#8A9A5B]');
  });

  it('has correct border color class', () => {
    expect(THEME.border).toBe('border-[#D2B48C]');
  });
});

