import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiUsers, FiGlobe, FiAward, FiHeadphones } from 'react-icons/fi';
import GlassCard from '../ui/GlassCard';
import '../../styles/components/About.css';

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const codeLines = [
    'const agency = {',
    '  name: "TWS Digital Solutions",',
    '  location: "Coimbatore",',
    '  mission: "Grow Local Businesses",',
    '  services: [',
    '    "Web Development",',
    '    "SEO & Marketing",',
    '    "Lead Generation"',
    '  ],',
    '  results: "Guaranteed"',
    '};',
  ];

  const stats = [
    {
      number: '10+',
      label: 'Clients Served',
      icon: <FiUsers size={24} />
    },
    {
      number: '20+',
      label: 'Websites Built',
      icon: <FiGlobe size={24} />
    },
    {
      number: '1+',
      label: 'Years Experience',
      icon: <FiAward size={24} />
    },
    {
      number: '24/7',
      label: 'Support',
      icon: <FiHeadphones size={24} />
    },
  ];

  return (
    <section className="about-section" id="about" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">About Our Agency</span>
          <h2 className="section-title">
            Your Trusted <span className="text-gradient">Digital Partner</span>
          </h2>
        </motion.div>

        <div className="about-content">
          {/* Info Section */}
          <motion.div
            className="about-info"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="about-card">
              <h3>Who We Are</h3>
              <p>
                We're a results-driven digital agency based in Coimbatore, specializing in helping small businesses and startups dominate their local market online.
              </p>

              <h3 style={{ marginTop: '2rem' }}>What We Do</h3>
              <p>
                We build fast, beautiful websites that rank on Google, run targeted ad campaigns that bring in qualified leads, and create brands that customers trust and remember.
              </p>

              <h3 style={{ marginTop: '2rem' }}>Why We're Different</h3>
              <p>
                Unlike agencies that disappear after launch, we become your long-term growth partner. We focus on measurable results - more traffic, more leads, more revenue. Your success is our success.
              </p>
            </GlassCard>

            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <span className="stat-icon">{stat.icon}</span>
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code Animation */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="code-card">
              <div className="code-header">
                <div className="code-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-filename">about.js</span>
              </div>
              <div className="code-content">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    className="code-line"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.08 }}
                  >
                    <span className="line-number">{index + 1}</span>
                    <span className="line-code">{line}</span>
                  </motion.div>
                ))}
                <motion.span
                  className="typing-cursor"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;