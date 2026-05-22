import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import './CustomCursor.css';

const CustomCursor = () => {
  const { mousePosition, isHovering, hoverElement } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mousePosition.x, springConfig);
  const cursorY = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    cursorX.set(mousePosition.x);
    cursorY.set(mousePosition.y);
  }, [mousePosition, cursorX, cursorY]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <motion.div
        className={`cursor-main ${isHovering ? 'hovering' : ''} ${hoverElement || ''}`}
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <span className="cursor-text">
          {hoverElement === 'view' && 'View'}
          {hoverElement === 'drag' && 'Drag'}
        </span>
      </motion.div>

      <motion.div
        className="cursor-trail"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
    </>
  );
};

export default CustomCursor;