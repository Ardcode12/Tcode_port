import { useState, useEffect } from 'react';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverElement, setHoverElement] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setIsHovering(true);
        setHoverElement(target.getAttribute('data-cursor') || 'pointer');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setIsHovering(false);
        setHoverElement(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return { mousePosition, isHovering, hoverElement };
};

export default useMousePosition;