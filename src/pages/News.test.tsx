import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import News from './News';
import { DATA } from '../lib/data.ts';

describe('News Page', () => {
  it('renders the News page title', () => {
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
    
    const title = screen.getByText('News');
    expect(title).toBeInTheDocument();
  });

  it('renders a back link to the portfolio', () => {
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
    
    const backLink = screen.getByText('Back to Home');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders all news items from data', () => {
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
    
    DATA.news.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(item.category)).toBeInTheDocument();
      expect(screen.getByText(item.date)).toBeInTheDocument();
    });
  });

  it('renders CTA button when ctaLink and ctaText are provided', () => {
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
    
    const newsItemWithCTA = DATA.news.find(item => item.ctaLink && item.ctaText);
    if (newsItemWithCTA) {
      const ctaButton = screen.getByText(newsItemWithCTA.ctaText!);
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton.closest('a')).toHaveAttribute('href', newsItemWithCTA.ctaLink);
      expect(ctaButton.closest('a')).toHaveAttribute('target', '_blank');
      expect(ctaButton.closest('a')).toHaveAttribute('rel', 'noreferrer');
    }
  });

  it('does not render CTA button when ctaLink is not provided', () => {
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
    
    const newsItemWithoutCTA = DATA.news.find(item => !item.ctaLink);
    if (newsItemWithoutCTA) {
      // Should not find any CTA buttons for this item
      const allLinks = screen.getAllByRole('link');
      const ctaLinks = allLinks.filter(link => 
        link.getAttribute('target') === '_blank' && 
        link.textContent?.includes(newsItemWithoutCTA.title || '')
      );
      expect(ctaLinks.length).toBe(0);
    }
  });

  it('renders the page description', () => {
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
    
    const description = screen.getByText(/Stay updated with the latest news and updates/i);
    expect(description).toBeInTheDocument();
  });

  it('has a Newspaper icon', () => {
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
    
    // The icon is rendered as an SVG, so we check for the parent element
    const iconContainer = screen.getByText('News').closest('div')?.querySelector('svg');
    expect(iconContainer).toBeInTheDocument();
  });
});

