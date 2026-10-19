import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiLayout, FiTrendingUp, FiTarget, FiPenTool, FiZap, FiBarChart2 } from 'react-icons/fi';
import GlassCard from '../ui/GlassCard';
import '../../styles/components/Services.css';

const services = [
  {
    icon: <FiLayout size={32} />,
    title: 'Website Development',
    description: 'Custom, fast-loading websites built with modern technology. Mobile-responsive designs that turn visitors into customers. Starting at ₹15,000.',
  },
  {
    icon: <FiTrendingUp size={32} />,
    title: 'SEO & Google Ranking',
    description: 'Rank #1 on Google for keywords your customers search. Local SEO for Coimbatore businesses. Proven strategies that drive organic traffic.',
  },
  {
    icon: <FiTarget size={32} />,
    title: 'Digital Marketing',
    description: 'Facebook & Instagram ads, Google Ads, email marketing. Data-driven campaigns that generate qualified leads and maximize ROI.',
  },
  {
    icon: <FiPenTool size={32} />,
    title: 'Branding & Design',
    description: 'Professional logos, business cards, social media designs. Create a memorable brand identity that stands out from competitors.',
  },
  {
    icon: <FiZap size={32} />,
    title: 'Automation & Lead Management',
    description: 'Automated follow-ups, CRM integration, WhatsApp Business automation. Never miss a lead again with our smart systems.',
  },
  {
    icon: <FiBarChart2 size={32} />,
    title: 'Analytics & Reporting',
    description: 'Track what matters. Monthly reports showing traffic, leads, and conversions. Make data-driven decisions to grow faster.',
  },
];

const technologies = [
  { name: 'HTML5', icon: '/assets/html.png' },
  { name: 'CSS3', icon: '/assets/css.png' },
  { name: 'JavaScript', icon: '/assets/js.png' },
  { name: 'React', icon: '/assets/react.png' },
  { name: 'Node.js', icon: '/assets/node.png' },
  { name: 'MongoDB', icon: '/assets/mongo.png' },
  { name: 'Three.js', icon: 'https://cdn.simpleicons.org/threedotjs/FFFFFF' },
  { name: 'React Native', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask/000000' },
  { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20' },
  { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
];

const Services = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section className="services-section" id="services" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Complete Digital Solutions</span>
          <h2 className="section-title">
            Services That <span className="text-gradient">Drive Growth</span>
          </h2>
          <p className="section-description">Everything you need to build, grow, and scale your business online</p>
        </motion.div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCard className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Technologies Section */}
        <motion.div
          className="tech-section"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="tech-title">Technologies We Use</h3>

          <div className="tech-grid">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="tech-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.08 }}
              >
                <div className="tech-icon-wrapper">
                  <img src={tech.icon} alt={tech.name} />
                </div>
                <span className="tech-name">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;