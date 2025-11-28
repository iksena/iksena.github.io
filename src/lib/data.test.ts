import { describe, it, expect } from 'vitest';
import { DATA } from './data';

describe('DATA', () => {
  describe('profile', () => {
    it('has all required profile properties', () => {
      expect(DATA.profile).toHaveProperty('name');
      expect(DATA.profile).toHaveProperty('roles');
      expect(DATA.profile).toHaveProperty('objective');
      expect(DATA.profile).toHaveProperty('location');
      expect(DATA.profile).toHaveProperty('email');
      expect(DATA.profile).toHaveProperty('avatar');
    });

    it('has name as a string', () => {
      expect(typeof DATA.profile.name).toBe('string');
      expect(DATA.profile.name.length).toBeGreaterThan(0);
    });

    it('has roles as an array', () => {
      expect(Array.isArray(DATA.profile.roles)).toBe(true);
      expect(DATA.profile.roles.length).toBeGreaterThan(0);
    });

    it('has location as a string', () => {
      expect(typeof DATA.profile.location).toBe('string');
      expect(DATA.profile.location.length).toBeGreaterThan(0);
    });
  });

  describe('socials', () => {
    it('is an array', () => {
      expect(Array.isArray(DATA.socials)).toBe(true);
    });

    it('each social has required properties', () => {
      DATA.socials.forEach((social) => {
        expect(social).toHaveProperty('id');
        expect(social).toHaveProperty('platform');
        expect(social).toHaveProperty('link');
        expect(social).toHaveProperty('icon');
      });
    });
  });

  describe('experience', () => {
    it('is an array', () => {
      expect(Array.isArray(DATA.experience)).toBe(true);
      expect(DATA.experience.length).toBeGreaterThan(0);
    });

    it('each experience has required properties', () => {
      DATA.experience.forEach((exp) => {
        expect(exp).toHaveProperty('id');
        expect(exp).toHaveProperty('role');
        expect(exp).toHaveProperty('company');
        expect(exp).toHaveProperty('date');
        expect(exp).toHaveProperty('location');
        expect(exp).toHaveProperty('desc');
      });
    });
  });

  describe('education', () => {
    it('is an array', () => {
      expect(Array.isArray(DATA.education)).toBe(true);
      expect(DATA.education.length).toBeGreaterThan(0);
    });

    it('each education has required properties', () => {
      DATA.education.forEach((edu) => {
        expect(edu).toHaveProperty('id');
        expect(edu).toHaveProperty('degree');
        expect(edu).toHaveProperty('school');
        expect(edu).toHaveProperty('date');
        expect(edu).toHaveProperty('details');
      });
    });
  });

  describe('projects', () => {
    it('is an array', () => {
      expect(Array.isArray(DATA.projects)).toBe(true);
      expect(DATA.projects.length).toBeGreaterThan(0);
    });

    it('each project has required properties', () => {
      DATA.projects.forEach((project) => {
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('role');
        expect(project).toHaveProperty('stack');
        expect(project).toHaveProperty('desc');
        expect(project).toHaveProperty('images');
      });
    });

    it('each project has stack as an array', () => {
      DATA.projects.forEach((project) => {
        expect(Array.isArray(project.stack)).toBe(true);
      });
    });

    it('each project has images as an array', () => {
      DATA.projects.forEach((project) => {
        expect(Array.isArray(project.images)).toBe(true);
      });
    });
  });

  describe('skills', () => {
    it('has categories property', () => {
      expect(DATA.skills).toHaveProperty('categories');
      expect(Array.isArray(DATA.skills.categories)).toBe(true);
    });

    it('each category has required properties', () => {
      DATA.skills.categories.forEach((cat) => {
        expect(cat).toHaveProperty('name');
        expect(cat).toHaveProperty('items');
        expect(cat).toHaveProperty('icon');
        expect(Array.isArray(cat.items)).toBe(true);
      });
    });
  });

  describe('awards', () => {
    it('is an array', () => {
      expect(Array.isArray(DATA.awards)).toBe(true);
    });

    it('each award is a string', () => {
      DATA.awards.forEach((award) => {
        expect(typeof award).toBe('string');
        expect(award.length).toBeGreaterThan(0);
      });
    });
  });

  describe('certificates', () => {
    it('is an array', () => {
      expect(Array.isArray(DATA.certificates)).toBe(true);
    });

    it('each certificate is a string', () => {
      DATA.certificates.forEach((cert) => {
        expect(typeof cert).toBe('string');
        expect(cert.length).toBeGreaterThan(0);
      });
    });
  });

  describe('news', () => {
    it('is an array', () => {
      expect(Array.isArray(DATA.news)).toBe(true);
      expect(DATA.news.length).toBeGreaterThan(0);
    });

    it('each news item has required properties', () => {
      DATA.news.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('category');
        expect(item).toHaveProperty('date');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('description');
      });
    });

    it('each news item has optional CTA properties', () => {
      DATA.news.forEach((item) => {
        // CTA properties are optional, but if one exists, both should exist
        if (item.ctaLink || item.ctaText) {
          expect(item.ctaLink).toBeDefined();
          expect(item.ctaText).toBeDefined();
          expect(typeof item.ctaLink).toBe('string');
          expect(typeof item.ctaText).toBe('string');
        }
      });
    });
  });
});

