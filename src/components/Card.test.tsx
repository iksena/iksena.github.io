import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <div>Test</div>
      </Card>
    );
    
    const card = container.querySelector('.custom-class');
    expect(card).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Card onClick={handleClick}>
        <div>Test</div>
      </Card>
    );
    
    const card = container.querySelector('div');
    card?.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders without onClick handler', () => {
    render(
      <Card>
        <div>Test</div>
      </Card>
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

