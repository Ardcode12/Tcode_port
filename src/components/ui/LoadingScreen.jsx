import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 350);
          return 100;
        }
        const remaining = 100 - prev;
        const step = Math.max(1, Math.min(remaining, Math.floor(Math.random() * 8) + 3));
        return prev + step;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getStatusText = (val) => {
    if (val < 30) return 'Initializing digital presence...';
    if (val < 60) return 'Crafting modern experience...';
    if (val < 85) return 'Optimizing speed and SEO...';
    if (val < 100) return 'Finalizing digital solutions...';
    return 'Ready to grow your business';
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient light glow behind */}
          <div className="loading-ambient-glow" />

          <div className="loading-content">
            {/* Logo Container with glowing backdrop */}
            <motion.div
              className="loading-logo-wrapper"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="loading-logo-glow" />
              <img
                src="/assets/logo.png"
                alt="TWS Digital Solutions Logo"
                className="loading-logo-img"
              />
            </motion.div>

            {/* Brand Title and Tagline */}
            <motion.div
              className="loading-brand"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="loading-brand-title">TWS Digital Solutions</h1>
              <span className="loading-brand-tagline">Toward The Success</span>
            </motion.div>

            {/* Progress Section */}
            <div className="loading-progress-block">
              <div className="loading-progress-track">
                <motion.div
                  className="loading-progress-fill"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <div className="loading-progress-meta">
                <span className="loading-status-text">{getStatusText(progress)}</span>
                <span className="loading-percentage">{Math.min(Math.round(progress), 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;