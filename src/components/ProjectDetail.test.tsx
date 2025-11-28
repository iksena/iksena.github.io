import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectDetail } from './ProjectDetail';
import type { Project } from '../lib/types';

const mockProject: Project = {
  id: 'p1',
  title: 'Test Project',
  role: 'Software Engineer',
  stack: ['React', 'Node.js', 'TypeScript'],
  desc: 'This is a test project description.',
  images: ['image1.jpg', 'image2.jpg'],
  learnMoreLink: 'https://example.com',
  demoLink: 'https://demo.example.com',
};

describe('ProjectDetail', () => {
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders project title', () => {
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project role', () => {
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    expect(screen.getByText('This is a test project description.')).toBeInTheDocument();
  });

  it('renders all stack items', () => {
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders ImageCarousel when images are provided', () => {
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('does not render ImageCarousel when images are not provided', () => {
    const projectWithoutImages: Project = { ...mockProject, images: [] };
    render(<ProjectDetail project={projectWithoutImages} onClose={vi.fn()} />);
    
    const img = screen.queryByRole('img');
    expect(img).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    const { container } = render(<ProjectDetail project={mockProject} onClose={handleClose} />);
    
    const closeButton = container.querySelector('button');
    closeButton?.click();
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('opens learn more link when Learn More button is clicked', () => {
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    const learnMoreButton = screen.getByText('Learn More');
    learnMoreButton.click();
    
    expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
  });

  it('opens demo link when Live Demo button is clicked', () => {
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    const demoButton = screen.getByText('Live Demo');
    demoButton.click();
    
    expect(window.open).toHaveBeenCalledWith('https://demo.example.com', '_blank', 'noopener,noreferrer');
  });

  it('does not render Learn More button when link is not provided', () => {
    const projectWithoutLearnMore = { ...mockProject, learnMoreLink: undefined };
    render(<ProjectDetail project={projectWithoutLearnMore} onClose={vi.fn()} />);
    
    expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
  });

  it('does not render Live Demo button when link is not provided', () => {
    const projectWithoutDemo = { ...mockProject, demoLink: undefined };
    render(<ProjectDetail project={projectWithoutDemo} onClose={vi.fn()} />);
    
    expect(screen.queryByText('Live Demo')).not.toBeInTheDocument();
  });
});

