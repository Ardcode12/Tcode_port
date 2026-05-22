import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!options.repeat) {
            observer.unobserve(element);
          }
        } else if (options.repeat) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    const handleScroll = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      const visibleTop = Math.max(0, windowHeight - rect.top);
      const visibleBottom = Math.max(0, rect.bottom);
      const totalVisible = Math.min(visibleTop, visibleBottom, elementHeight);
      
      const progress = Math.min(Math.max(totalVisible / elementHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [options.threshold, options.rootMargin, options.repeat]);

  return { ref, isVisible, scrollProgress };
};

export default useScrollAnimation;