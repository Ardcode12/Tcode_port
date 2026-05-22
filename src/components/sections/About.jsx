import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import '../../styles/components/About.css';

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const codeLines = [
    'const agency = {',
    '  name: "T Code Digital",',
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
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      number: '20+',
      label: 'Websites Built',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      number: '1+',
      label: 'Years Experience',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    {
      number: '24/7',
      label: 'Support',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
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
          data-aos="fade-up"
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
            <GlassCard className="about-card" data-aos="fade-right" data-aos-delay="100">
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
            <div className="code-card" data-aos="fade-left" data-aos-delay="200">
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