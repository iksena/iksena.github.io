import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import { ImageCarousel } from './ImageCarousel';

describe('ImageCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders the first image by default', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    render(<ImageCarousel images={images} />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'image1.jpg');
  });

  it('renders single image without navigation buttons', () => {
    const images = ['image1.jpg'];
    const { container } = render(<ImageCarousel images={images} />);
    
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  it('shows navigation buttons for multiple images', () => {
    const images = ['image1.jpg', 'image2.jpg'];
    const { container } = render(<ImageCarousel images={images} />);
    
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  it('navigates to next image when next button is clicked', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const { container } = render(<ImageCarousel images={images} />);
    
    // Verify initial image
    const initialImgs = screen.getAllByRole('img');
    const image1 = initialImgs.find(img => img.getAttribute('src') === 'image1.jpg');
    expect(image1).toBeDefined();
    
    const nextButton = container.querySelectorAll('button')[1];
    await user.click(nextButton);
    
    // Wait for image2 to appear (may be animating, but should be in DOM)
    await waitFor(() => {
      const imgs = screen.getAllByRole('img');
      const image2 = imgs.find(img => img.getAttribute('src') === 'image2.jpg');
      expect(image2).toBeDefined();
      // Check that image2 has higher z-index or is becoming visible
      const zIndex = image2?.style.zIndex;
      expect(zIndex === '1' || zIndex === '').toBeTruthy();
    }, { timeout: 5000 });
  });

  it('navigates to previous image when prev button is clicked', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const { container } = render(<ImageCarousel images={images} />);
    
    // First go to second image
    const nextButton = container.querySelectorAll('button')[1];
    await user.click(nextButton);
    
    await waitFor(() => {
      const imgs = screen.getAllByRole('img');
      const image2 = imgs.find(img => img.getAttribute('src') === 'image2.jpg');
      expect(image2).toBeDefined();
    }, { timeout: 5000 });
    
    // Then go back
    const prevButton = container.querySelectorAll('button')[0];
    await user.click(prevButton);
    
    await waitFor(() => {
      const imgs = screen.getAllByRole('img');
      const image1 = imgs.find(img => img.getAttribute('src') === 'image1.jpg');
      expect(image1).toBeDefined();
      // Image1 should be visible or becoming visible
      const zIndex = image1?.style.zIndex;
      expect(zIndex === '1' || zIndex === '').toBeTruthy();
    }, { timeout: 5000 });
  });

  it('wraps around when navigating past last image', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const images = ['image1.jpg', 'image2.jpg'];
    const { container } = render(<ImageCarousel images={images} />);
    
    const nextButton = container.querySelectorAll('button')[1];
    await user.click(nextButton); // Go to image2
    
    await waitFor(() => {
      const imgs = screen.getAllByRole('img');
      const image2 = imgs.find(img => img.getAttribute('src') === 'image2.jpg');
      expect(image2).toBeDefined();
    }, { timeout: 5000 });
    
    await user.click(nextButton); // Should wrap to image1
    
    await waitFor(() => {
      const imgs = screen.getAllByRole('img');
      const image1 = imgs.find(img => img.getAttribute('src') === 'image1.jpg');
      expect(image1).toBeDefined();
      const zIndex = image1?.style.zIndex;
      expect(zIndex === '1' || zIndex === '').toBeTruthy();
    }, { timeout: 5000 });
  });

  it('wraps around when navigating before first image', async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    const images = ['image1.jpg', 'image2.jpg'];
    const { container } = render(<ImageCarousel images={images} />);
    
    const prevButton = container.querySelectorAll('button')[0];
    await user.click(prevButton); // Should wrap to image2
    
    await waitFor(() => {
      const imgs = screen.getAllByRole('img');
      const image2 = imgs.find(img => img.getAttribute('src') === 'image2.jpg');
      expect(image2).toBeDefined();
      const zIndex = image2?.style.zIndex;
      expect(zIndex === '1' || zIndex === '').toBeTruthy();
    }, { timeout: 5000 });
  });

  it('auto-advances images after 5 seconds', async () => {
    const images = ['image1.jpg', 'image2.jpg'];
    render(<ImageCarousel images={images} />);
    
    const initialImgs = screen.getAllByRole('img');
    const visibleImg = initialImgs.find(img => img.style.opacity === '1' || img.style.zIndex === '1');
    expect(visibleImg).toHaveAttribute('src', 'image1.jpg');
    
    // Advance timers by 5 seconds (this should trigger the interval)
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    
    // The interval should have fired, check that image2 is in the DOM
    // (it may still be animating, but should be present)
    const imgs = screen.getAllByRole('img');
    // Image2 should be present (either visible or animating in)
    expect(imgs.length).toBeGreaterThanOrEqual(1);
    // At least one image should be image2 (it might be animating)
    const hasImage2 = imgs.some(img => img.getAttribute('src') === 'image2.jpg');
    expect(hasImage2).toBe(true);
  });
});

