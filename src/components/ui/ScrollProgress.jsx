import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
      setIsVisible(latest > 0.02);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <>
      {/* Top progress bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Side progress - hidden on mobile */}
      <motion.div 
        className="scroll-progress-side"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <svg viewBox="0 0 100 100" className="progress-circle">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--color-accent-primary)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * scrollPercentage) / 100}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        </svg>
        <span className="progress-text">{scrollPercentage}%</span>
      </motion.div>
    </>
  );
};

export default ScrollProgress;