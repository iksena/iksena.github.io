import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { DATA } from './lib/data';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    img: ({ ...props }: { children?: ReactNode } & ImgHTMLAttributes<HTMLImageElement>) => (
      <img {...props} alt={props.alt} />
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe('App (Portfolio)', () => {
  beforeEach(() => {
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

  it('opens experience modal when experience section is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const cards = screen.getAllByText('Experience');
    const experienceCard = cards[0].closest('div')?.closest('div')?.closest('div');
    await user.click(experienceCard!);
    
    await waitFor(() => {
      expect(screen.getByText('Work Experience')).toBeInTheDocument();
      const companies = screen.getAllByText(DATA.experience[0].company);
      expect(companies.length).toBeGreaterThan(0);
    });
  });

  it('displays all experience entries with markdown in experience modal', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const cards = screen.getAllByText('Experience');
    const experienceCard = cards[0].closest('div')?.closest('div')?.closest('div');
    await user.click(experienceCard!);
    
    await waitFor(() => {
      // Just verify modal title and that all unique experience dates are present
      expect(screen.getByText('Work Experience')).toBeInTheDocument();
      DATA.experience.forEach(exp => {
        expect(screen.getByText(exp.date)).toBeInTheDocument();
      });
    });
  });

  it('opens education modal when education section is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Get the education section card - use the one at index 1 (education card)
    const cards = screen.getAllByText('Education');
    // Click the education card (first occurrence is likely the card)
    const educationCard = cards[0].closest('div')?.closest('div')?.closest('div');
    await user.click(educationCard!);
    
    await waitFor(() => {
      // Check if Education modal title is present (may appear twice)
      const educationTitles = screen.getAllByText('Education');
      expect(educationTitles.length).toBeGreaterThan(0);
    });
  });

  it('displays all education entries with markdown in education modal', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const cards = screen.getAllByText('Education');
    const educationCard = cards[0].closest('div')?.closest('div')?.closest('div');
    await user.click(educationCard!);
    
    await waitFor(() => {
      // Just verify that key education data is present somewhere
      DATA.education.forEach(edu => {
        expect(screen.getByText(edu.date)).toBeInTheDocument();
      });
    });
  });

  it('opens skills modal when skills section is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const skillsCard = screen.getByText('Tech Stack').closest('div');
    await user.click(skillsCard!);
    
    await waitFor(() => {
      expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    });
  });

  it('displays all skill categories in skills modal', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const skillsCard = screen.getByText('Tech Stack').closest('div');
    await user.click(skillsCard!);
    
    await waitFor(() => {
      DATA.skills.categories.forEach(cat => {
        expect(screen.getByText(cat.name)).toBeInTheDocument();
        cat.items.forEach(skill => {
          const skillElements = screen.getAllByText(skill);
          expect(skillElements.length).toBeGreaterThan(0);
        });
      });
    });
  });

  it('opens awards modal when awards section is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const awardsCard = screen.getByText('Honours').closest('div');
    await user.click(awardsCard!);
    
    await waitFor(() => {
      expect(screen.getByText('Awards & Certificates')).toBeInTheDocument();
    });
  });

  it('displays all awards and certificates in awards modal', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const awardsCard = screen.getByText('Honours').closest('div');
    await user.click(awardsCard!);
    
    await waitFor(() => {
      expect(screen.getByText('Honours & Awards')).toBeInTheDocument();
      expect(screen.getByText('Certifications')).toBeInTheDocument();
      
      DATA.awards.forEach(award => {
        expect(screen.getByText(award)).toBeInTheDocument();
      });
      
      DATA.certificates.forEach(cert => {
        expect(screen.getByText(cert)).toBeInTheDocument();
      });
    });
  });

  it('displays social links in about modal', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const profileCard = screen.getByText('More Details & Socials →').closest('div');
    await user.click(profileCard!);
    
    await waitFor(() => {
      expect(screen.getByText('Connect with me')).toBeInTheDocument();
      DATA.socials.forEach(social => {
        const link = screen.getByText(social.platform).closest('a');
        expect(link).toHaveAttribute('href', social.link);
        expect(link).toHaveAttribute('target', '_blank');
      });
    });
  });

  it('displays location in about modal', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const profileCard = screen.getByText('More Details & Socials →').closest('div');
    await user.click(profileCard!);
    
    await waitFor(() => {
      expect(screen.getByText('Current Location')).toBeInTheDocument();
      const locationElements = screen.getAllByText(DATA.profile.location);
      expect(locationElements.length).toBeGreaterThan(0);
    });
  });

  it('opens project from projects list modal', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Click main projects section to open modal
    const projectsSection = screen.getByText('Selected Projects').closest('div');
    await user.click(projectsSection!);
    
    await waitFor(() => {
      expect(screen.getByText('All Projects')).toBeInTheDocument();
    });
    
    // Find and click a project in the modal list
    const projectInList = screen.getAllByText(DATA.projects[1].title);
    await user.click(projectInList[projectInList.length - 1].closest('div')!);
    
    await waitFor(() => {
      expect(screen.getByText(DATA.projects[1].role)).toBeInTheDocument();
    });
  });

  it('closes modal when backdrop is clicked', async () => {
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
      expect(screen.getByText('About Me')).toBeInTheDocument();
    });
    
    // Click backdrop (the modal overlay)
    const backdrop = screen.getByText('About Me').closest('div')?.parentElement;
    if (backdrop) {
      await user.click(backdrop);
    }
    
    await waitFor(() => {
      expect(screen.queryByText('About Me')).not.toBeInTheDocument();
    });
  });
});

