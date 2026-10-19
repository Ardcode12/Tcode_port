import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCheck, FiArrowRight, FiPackage, FiZap, FiAward, FiStar } from 'react-icons/fi';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import '../../styles/components/Pricing.css';

const pricingPlans = [
  {
    name: 'Starter',
    icon: <FiPackage size={22} />,
    price: '₹2.5k - 5k',
    period: '',
    description: 'Perfect for local businesses & startups',
    popular: false,
    features: [
      'Professional Landing Page or Portfolio Site',
      'Restaurant Menu Website with Online Ordering',
      'Small Business Brochure Website',
      'Event/Wedding Invitation Website',
      'Personal Blog or Resume Site',
      'Mobile-First Responsive Design',
      'Fast Loading & SEO Optimized',
      'Contact Form & Social Integration',
      'Free Domain & Hosting Setup',
    ],
  },
  {
    name: 'Growth',
    icon: <FiZap size={22} />,
    price: '₹9k - 12k',
    period: '',
    description: 'For businesses expanding their digital presence',
    popular: true,
    features: [
      'Full-Featured E-commerce Store',
      'Service Booking Website (Salon, Clinic, etc.)',
      'Educational Platform with Course Management',
      'Multi-page Corporate Website',
      'Real Estate Listing Portal',
      'Payment Gateway Integration',
      'Advanced Analytics & Reporting',
      'SEO & Local Search Optimization',
      'Social Media Integration & Management',
    ],
  },
  {
    name: 'Pro',
    icon: <FiAward size={22} />,
    price: '₹18k - 25k',
    period: '',
    description: 'Enterprise-level digital transformation',
    popular: false,
    features: [
      'Custom Web Application Development',
      'Multi-vendor Marketplace Platform',
      'SaaS Product or Dashboard',
      'Complex Inventory Management System',
      'Custom CRM or ERP Solution',
      'API Integration & Third-party Services',
      'Advanced Security & Performance',
      'Scalable Cloud Infrastructure',
      'Ongoing Maintenance & Support',
    ],
  },
];

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

const Pricing = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section className="pricing-section" id="pricing" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Transparent Pricing</span>
          <h2 className="section-title">
            Plans That <span className="text-gradient">Fit Your Budget</span>
          </h2>
          <p className="section-description">
            No hidden fees. No surprises. Choose the plan that matches your growth goals.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className="pricing-card-wrapper"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <GlassCard className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge">
                    <FiStar size={13} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '5px' }} />
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="pricing-header">
                  <div className="plan-name-row" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <span className="plan-icon" style={{ color: 'var(--color-accent-primary)', display: 'flex', alignItems: 'center' }}>{plan.icon}</span>
                    <h3 className="plan-name" style={{ margin: 0 }}>{plan.name}</h3>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                  <div className="price-wrapper">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                </div>

                <div className="features-list">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="feature-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                    >
                      <span className="check-icon">
                        <FiCheck size={12} strokeWidth={3} />
                      </span>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <MagneticButton
                  className={`cta-btn ${plan.popular ? 'primary' : 'secondary'}`}
                  onClick={() => scrollToSection('contact')}
                >
                  <span>Get Started</span>
                  <FiArrowRight size={16} />
                </MagneticButton>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        
      </div>
    </section>
  );
};

export default Pricing;
