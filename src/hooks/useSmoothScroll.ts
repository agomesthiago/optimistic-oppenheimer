import { useEffect } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
  useEffect(() => {
    // Disable smooth scrolling if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis: Lenis | null = null;
    const initLenis = () => {
      if (lenis) return;
      cleanup();
      lenis = new Lenis({
        autoRaf: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });
    };

    const events = ['scroll', 'wheel', 'pointerdown', 'touchstart'];
    const cleanup = () => {
      events.forEach(ev => window.removeEventListener(ev, initLenis));
      clearTimeout(timer);
    };

    events.forEach(ev => window.addEventListener(ev, initLenis, { passive: true, once: true }));
    const timer = setTimeout(initLenis, 8000);

    return () => {
      cleanup();
      if (lenis) lenis.destroy();
    };
  }, []);
}

