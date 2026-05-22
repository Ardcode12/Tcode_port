import React from 'react';
import { motion } from 'framer-motion';
import './MagneticButton.css';

const MagneticButton = ({ children, className = '', onClick, type = 'button', disabled = false, ...props }) => {
  return (
    <motion.button
      type={type}
      className={`magnetic-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="magnetic-button-content">
        {children}
      </span>
    </motion.button>
  );
};

export default MagneticButton;