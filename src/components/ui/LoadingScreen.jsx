import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGLTF } from '@react-three/drei';
import { SHOW_3D_MODEL } from '../sections/About';
import './LoadingScreen.css';

// Preload the 3D GLTF laptop model into memory only if 3D model is active
if (SHOW_3D_MODEL) {
  useGLTF.preload('/assets/asus_rog_flow_x16.glb');
}

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Preload logo and images
    const imagesToPreload = [
      '/assets/logo_nav.png',
      '/assets/img1.jpg',
      '/assets/pic.jpg',
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    if (SHOW_3D_MODEL) {
      // Track real download progress of the 3D GLB model
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/assets/asus_rog_flow_x16.glb', true);
      xhr.responseType = 'blob';

      xhr.onprogress = (event) => {
        if (!isMounted) return;
        if (event.lengthComputable && event.total > 0) {
          const modelPercent = 10 + Math.round((event.loaded / event.total) * 85);
          setProgress((prev) => Math.max(prev, modelPercent));
        }
      };

      xhr.onload = () => {
        if (!isMounted) return;
        setProgress(100);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 450);
        }, 300);
      };

      xhr.onerror = () => {
        if (!isMounted) return;
        setProgress(100);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 350);
        }, 250);
      };

      const baselineTimer = setInterval(() => {
        if (!isMounted) return;
        setProgress((prev) => {
          if (prev < 20) return prev + 3;
          return prev;
        });
      }, 80);

      const fallbackTimeout = setTimeout(() => {
        if (isMounted) {
          setProgress(100);
          setTimeout(() => {
            setIsComplete(true);
            onComplete();
          }, 300);
        }
      }, 12000);

      xhr.send();

      return () => {
        isMounted = false;
        clearInterval(baselineTimer);
        clearTimeout(fallbackTimeout);
        xhr.abort();
      };
    } else {
      // Quick, smooth loading progression when 3D model is disabled
      const stepInterval = setInterval(() => {
        if (!isMounted) return;
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(stepInterval);
            setTimeout(() => {
              if (isMounted) {
                setIsComplete(true);
                setTimeout(onComplete, 350);
              }
            }, 250);
            return 100;
          }
          return Math.min(100, prev + 14);
        });
      }, 70);

      return () => {
        isMounted = false;
        clearInterval(stepInterval);
      };
    }
  }, [onComplete]);

  const getStatusText = (val) => {
    if (SHOW_3D_MODEL) {
      if (val < 25) return 'Initializing digital experience...';
      if (val < 70) return 'Loading 3D interactive model...';
      if (val < 95) return 'Preparing 3D environment & shaders...';
      if (val < 100) return 'Finalizing digital solutions...';
      return 'Ready to grow your business';
    } else {
      if (val < 40) return 'Initializing digital experience...';
      if (val < 80) return 'Loading digital solutions...';
      if (val < 100) return 'Preparing agency assets...';
      return 'Ready to grow your business';
    }
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