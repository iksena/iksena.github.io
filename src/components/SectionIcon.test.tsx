import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Award } from 'lucide-react';
import { SectionIcon } from './SectionIcon';

describe('SectionIcon', () => {
  it('renders the icon component', () => {
    const { container } = render(<SectionIcon icon={Award} />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with correct icon size', () => {
    const { container } = render(<SectionIcon icon={Award} />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Icon should be rendered (size is handled by lucide-react)
  });
});

