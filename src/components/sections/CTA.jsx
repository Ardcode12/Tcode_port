import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiClock, FiArrowRight, FiPhoneCall, FiShield } from 'react-icons/fi';
import MagneticButton from '../ui/MagneticButton';
import '../../styles/components/CTA.css';

const CTA = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section className="cta-section" id="cta" ref={containerRef}>
      <div className="cta-background">
        <div className="cta-gradient-overlay" />
      </div>

      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="cta-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FiClock size={15} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }} />
            Limited Spots Available
          </motion.div>

          <motion.h2
            className="cta-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Ready to <span className="text-gradient">Grow Your Business?</span>
          </motion.h2>

          <motion.p
            className="cta-description"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Don't let your competitors dominate the market. Get a free consultation and
            discover how we can help you attract more customers, increase revenue, and scale your business online.
          </motion.p>

        
          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <MagneticButton onClick={() => window.location.href = 'mailto:twsdigitalsolutionsofficial@gmail.com'}>
              <span>Book Free Call Now</span>
              <FiArrowRight size={20} />
            </MagneticButton>

            <motion.a
              href="tel:+919080176624"
              className="cta-phone"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPhoneCall size={18} />
              <span>Call: +91-9080176624</span>
            </motion.a>
          </motion.div>

          <motion.p
            className="cta-trust"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <span className="trust-badge">
              <FiShield size={18} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
            </span>
            Join 50+ businesses already growing with us
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
