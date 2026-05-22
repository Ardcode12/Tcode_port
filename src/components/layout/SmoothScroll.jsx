import React, { useEffect, useRef } from 'react';

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Only initialize smooth scroll on desktop
    if (window.innerWidth < 768) {
      return;
    }

    let lenis;

    const initSmoothScroll = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch (error) {
        console.log('Smooth scroll not available');
      }
    };

    initSmoothScroll();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div ref={scrollRef} className="smooth-scroll-container">
      {children}
    </div>
  );
};

export default SmoothScroll;