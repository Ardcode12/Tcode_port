import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiTrendingUp, FiAward, FiShield, FiZap, FiGlobe } from 'react-icons/fi';
import GlassCard from '../ui/GlassCard';
import '../../styles/components/WhyChooseUs.css';

const reasons = [
  {
    icon: <FiTrendingUp size={44} />,
    title: 'Results-Driven Approach',
    description: 'We don\'t just build websites. We build revenue-generating machines. Every strategy is backed by data and focused on your ROI.',
  },
  {
    icon: <FiAward size={44} />,
    title: 'Proven Track Record',
    description: 'Over 50+ businesses trust us with their digital growth. From local shops to scaling startups, we\'ve delivered consistent results.',
  },
  {
    icon: <FiShield size={44} />,
    title: 'Transparent Pricing & ROI',
    description: 'No hidden costs. No vague promises. You see exactly what you\'re paying for and the returns you\'re getting. Most clients 3x their investment in 6 months.',
  },
  {
    icon: <FiZap size={44} />,
    title: 'Fast Turnaround Time',
    description: 'Your website live in 7-14 days. SEO results in 30-60 days. We move fast so you can start seeing results while competitors are still planning.',
  },
  {
    icon: <FiGlobe size={44} />,
    title: 'Local Expertise, Global Standards',
    description: 'Based in Coimbatore with deep understanding of local markets. We combine local knowledge with international best practices to give you the competitive edge.',
  },
];

const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section className="why-choose-section" id="why-choose" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Why Partner With Us</span>
          <h2 className="section-title">
            Why Businesses Choose <span className="text-gradient">TWS Digital Solutions</span>
          </h2>
          <p className="section-description">
            We're not just another agency. We're your growth partner committed to your success.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="reason-card-wrapper"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="reason-card">
                <div className="reason-icon">{reason.icon}</div>
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
      
      </div>
    </section>
  );
};

export default WhyChooseUs;
