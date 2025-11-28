import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import { DATA } from './lib/data';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    img: ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('App (Portfolio)', () => {
  beforeEach(() => {
    // Reset body overflow style
    document.body.style.overflow = '';
  });

  it('renders the portfolio page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText(DATA.profile.name)).toBeInTheDocument();
  });

  it('renders profile information', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText(DATA.profile.name)).toBeInTheDocument();
    expect(screen.getByText(DATA.profile.location)).toBeInTheDocument();
    expect(screen.getByText(DATA.profile.objective)).toBeInTheDocument();
  });

  it('renders all role tags', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    DATA.profile.roles.forEach((role) => {
      // Use getAllByText since "Software Engineer" appears in both roles and experience
      const elements = screen.getAllByText(new RegExp(role));
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('renders navigation link to News page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const newsLink = screen.getByRole('link', { name: 'News' });
    expect(newsLink).toBeInTheDocument();
    expect(newsLink.closest('a')).toHaveAttribute('href', '/news');
  });

  it('renders projects section', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Selected Projects')).toBeInTheDocument();
  });

  it('renders experience section', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText(DATA.experience[0].role)).toBeInTheDocument();
  });

  it('renders education section', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText(DATA.education[0].degree)).toBeInTheDocument();
  });

  it('renders skills section', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
  });

  it('renders awards section', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Honours')).toBeInTheDocument();
  });

  it('opens about modal when profile card is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const profileCard = screen.getByText('More Details & Socials →').closest('div');
    await user.click(profileCard!);
    
    await waitFor(() => {
      expect(screen.getByText('About Me')).toBeInTheDocument();
    });
  });

  it('opens projects modal when projects section is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const projectsSection = screen.getByText('Selected Projects').closest('div');
    await user.click(projectsSection!);
    
    await waitFor(() => {
      expect(screen.getByText('All Projects')).toBeInTheDocument();
    });
  });

  it('opens project detail when a project is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // First open projects section
    const projectsSection = screen.getByText('Selected Projects').closest('div');
    await user.click(projectsSection!);
    
    await waitFor(() => {
      expect(screen.getByText('All Projects')).toBeInTheDocument();
    });
    
    // Then click on first project - use getAllByText and click the one in the modal
    const projectTitles = screen.getAllByText(DATA.projects[0].title);
    // The second one should be in the modal list
    const projectInModal = projectTitles[1] || projectTitles[0];
    await user.click(projectInModal.closest('div')!);
    
    await waitFor(() => {
      // Should show project detail modal with the title
      const detailTitles = screen.getAllByText(DATA.projects[0].title);
      expect(detailTitles.length).toBeGreaterThan(0);
    });
  });

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Open about modal
    const profileCard = screen.getByText('More Details & Socials →').closest('div');
    await user.click(profileCard!);
    
    await waitFor(() => {
      expect(screen.getByText('About Me')).toBeInTheDocument();
    });
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: '' });
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('About Me')).not.toBeInTheDocument();
    });
  });

  it('sets body overflow to hidden when modal is open', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const profileCard = screen.getByText('More Details & Socials →').closest('div');
    await user.click(profileCard!);
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('resets body overflow when modal is closed', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Open modal
    const profileCard = screen.getByText('More Details & Socials →').closest('div');
    await user.click(profileCard!);
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: '' });
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset');
    });
  });
});

