import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('is keyboard accessible when clickable', () => {
    const handleClick = vi.fn();
    render(
      <Card onClick={handleClick} label="Open section">
        <div>Test</div>
      </Card>
    );

    const card = screen.getByRole('button', { name: 'Open section' });
    expect(card).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
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

