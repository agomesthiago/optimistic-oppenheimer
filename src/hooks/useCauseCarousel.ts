import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCauseCarouselOptions {
  totalItems: number;
  autoSlideMs?: number;
}

export function useCauseCarousel({ totalItems, autoSlideMs = 7000 }: UseCauseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isPaused = isPausedByUser || isHovered;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, autoSlideMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused, nextSlide, autoSlideMs]);

  return {
    currentIndex,
    setCurrentIndex,
    isPausedByUser,
    setIsPausedByUser,
    isHovered,
    setIsHovered,
    isPaused,
    nextSlide,
    prevSlide,
  };
}
