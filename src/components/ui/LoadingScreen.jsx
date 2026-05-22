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
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-content">
            <motion.div
              className="loading-logo"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="logo-circle">
                <span>T</span>
              </div>
            </motion.div>

            <motion.h1
              className="loading-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              T Code
            </motion.h1>

            <div className="loading-progress-container">
              <motion.div
                className="loading-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <motion.span
              className="loading-percentage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;