import { describe, it, expect } from 'vitest';
import { IMAGES } from './images';

describe('IMAGES', () => {
  it('exports IMAGES object', () => {
    expect(IMAGES).toBeDefined();
    expect(typeof IMAGES).toBe('object');
  });

  it('has DP property', () => {
    expect(IMAGES).toHaveProperty('DP');
    expect(IMAGES.DP).toBeDefined();
  });

  it('has JENIUS object with all required images', () => {
    expect(IMAGES).toHaveProperty('JENIUS');
    expect(IMAGES.JENIUS).toHaveProperty('JENIUS_APP');
    expect(IMAGES.JENIUS).toHaveProperty('JENIUS_MF');
    expect(IMAGES.JENIUS).toHaveProperty('INVESTMENT_PORTFOLIO');
    expect(IMAGES.JENIUS).toHaveProperty('INVESTMENT_PRODUCTS');
    expect(IMAGES.JENIUS).toHaveProperty('INVESTMENT_PURCHASE');
    expect(IMAGES.JENIUS).toHaveProperty('INVESTMENT_SELL');
    expect(IMAGES.JENIUS).toHaveProperty('INVESTMENT_RP');
    expect(IMAGES.JENIUS).toHaveProperty('JENIUS_INSURANCE');
  });

  it('has EDULENS object with required images', () => {
    expect(IMAGES).toHaveProperty('EDULENS');
    expect(IMAGES.EDULENS).toHaveProperty('EDULENS_LOGO');
    expect(IMAGES.EDULENS).toHaveProperty('EDULENS_PHOTO');
  });

  it('has DBANKPRO object with required images', () => {
    expect(IMAGES).toHaveProperty('DBANKPRO');
    expect(IMAGES.DBANKPRO).toHaveProperty('DBANKPRO');
    expect(IMAGES.DBANKPRO).toHaveProperty('DBANKPRO_HOME');
    expect(IMAGES.DBANKPRO).toHaveProperty('DBANKPRO_LOGIN');
    expect(IMAGES.DBANKPRO).toHaveProperty('DBANKPRO_MOBILE_HOME');
    expect(IMAGES.DBANKPRO).toHaveProperty('DBANKPRO_STRAPI');
  });

  it('has NATUREHELM object with required images', () => {
    expect(IMAGES).toHaveProperty('NATUREHELM');
    expect(IMAGES.NATUREHELM).toHaveProperty('NATUREHELM');
    expect(IMAGES.NATUREHELM).toHaveProperty('NATUREHELM_ANALYTICS');
    expect(IMAGES.NATUREHELM).toHaveProperty('NATUREHELM_VOLUNTEER');
    expect(IMAGES.NATUREHELM).toHaveProperty('NATUREHELM_KML');
    expect(IMAGES.NATUREHELM).toHaveProperty('NATUREHELM_CIRCLE');
    expect(IMAGES.NATUREHELM).toHaveProperty('NATUREHELM_ORG');
  });

  it('has COMO object with required images', () => {
    expect(IMAGES).toHaveProperty('COMO');
    expect(IMAGES.COMO).toHaveProperty('COMO');
    expect(IMAGES.COMO).toHaveProperty('COMO_SHOPIFY');
    expect(IMAGES.COMO).toHaveProperty('COMO_CART');
    expect(IMAGES.COMO).toHaveProperty('COMO_RANKING');
    expect(IMAGES.COMO).toHaveProperty('COMO_SUMMER');
  });

  it('has FITHAPPY object with required images', () => {
    expect(IMAGES).toHaveProperty('FITHAPPY');
    expect(IMAGES.FITHAPPY).toHaveProperty('FITHAPPY');
    expect(IMAGES.FITHAPPY).toHaveProperty('FITHAPPY_MARKETING');
    expect(IMAGES.FITHAPPY).toHaveProperty('FITHAPPY_PARTNERSHIP');
  });
});

