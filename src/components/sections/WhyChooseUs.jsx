import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import '../../styles/components/WhyChooseUs.css';

const reasons = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
    title: 'Results-Driven Approach',
    description: 'We don\'t just build websites. We build revenue-generating machines. Every strategy is backed by data and focused on your ROI.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
      </svg>
    ),
    title: 'Proven Track Record',
    description: 'Over 50+ businesses trust us with their digital growth. From local shops to scaling startups, we\'ve delivered consistent results.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Transparent Pricing & ROI',
    description: 'No hidden costs. No vague promises. You see exactly what you\'re paying for and the returns you\'re getting. Most clients 3x their investment in 6 months.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Fast Turnaround Time',
    description: 'Your website live in 7-14 days. SEO results in 30-60 days. We move fast so you can start seeing results while competitors are still planning.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
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
          data-aos="fade-up"
        >
          <span className="section-subtitle">Why Partner With Us</span>
          <h2 className="section-title">
            Why Businesses Choose <span className="text-gradient">T Code Digital</span>
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
              data-aos="fade-up"
              data-aos-delay={index * 100}
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
