import React from 'react';
import { motion } from 'framer-motion';
import './GlassCard.css';

const GlassCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      className={`glass-card ${className}`}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      <div className="glass-card-content">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;