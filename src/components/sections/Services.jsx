import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiLayout, FiTrendingUp, FiTarget, FiPenTool, FiZap, FiBarChart2 } from 'react-icons/fi';
import {
  SiReact, SiNextdotjs, SiThreedotjs, SiJavascript, SiTailwindcss,
  SiHtml5, SiCss3, SiNodedotjs, SiPython, SiDjango, SiFastapi,
  SiMongodb, SiPostgresql, SiShopify, SiWordpress, SiGoogleads,
  SiGooglesearchconsole, SiFigma
} from 'react-icons/si';
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

const categories = ['All', 'Frontend', 'Backend', 'CMS & Store', 'Marketing & SEO'];

const technologies = [
  { name: 'React', category: 'Frontend', role: 'Interactive UI', color: '#087ea4', Icon: SiReact },
  { name: 'Next.js', category: 'Frontend', role: 'Fullstack & SEO', color: '#111111', Icon: SiNextdotjs },
  { name: 'Three.js', category: 'Frontend', role: '3D Graphics', color: '#111111', Icon: SiThreedotjs },
  { name: 'JavaScript', category: 'Frontend', role: 'Modern ES6+', color: '#F7DF1E', Icon: SiJavascript },
  { name: 'Tailwind CSS', category: 'Frontend', role: 'Design Systems', color: '#06B6D4', Icon: SiTailwindcss },
  { name: 'HTML5', category: 'Frontend', role: 'Semantic Web', color: '#E34F26', Icon: SiHtml5 },
  { name: 'CSS3', category: 'Frontend', role: 'Modern Layouts', color: '#1572B6', Icon: SiCss3 },
  { name: 'Node.js', category: 'Backend', role: 'Scalable Runtime', color: '#339933', Icon: SiNodedotjs },
  { name: 'Python', category: 'Backend', role: 'Backend & AI', color: '#3776AB', Icon: SiPython },
  { name: 'Django', category: 'Backend', role: 'Enterprise Web', color: '#092E20', Icon: SiDjango },
  { name: 'FastAPI', category: 'Backend', role: 'High-speed APIs', color: '#009688', Icon: SiFastapi },
  { name: 'MongoDB', category: 'Backend', role: 'Cloud NoSQL DB', color: '#47A248', Icon: SiMongodb },
  { name: 'PostgreSQL', category: 'Backend', role: 'Relational DB', color: '#4169E1', Icon: SiPostgresql },
  { name: 'Shopify', category: 'CMS & Store', role: 'E-Commerce Stores', color: '#7AB55C', Icon: SiShopify },
  { name: 'WordPress', category: 'CMS & Store', role: 'CMS & Portals', color: '#21759B', Icon: SiWordpress },
  { name: 'Google Ads', category: 'Marketing & SEO', role: 'PPC Campaigns', color: '#EA4335', Icon: SiGoogleads },
  { name: 'Search Console', category: 'Marketing & SEO', role: 'Rankings & SEO', color: '#458CF5', Icon: SiGooglesearchconsole },
  { name: 'Figma', category: 'Marketing & SEO', role: 'UI/UX Design', color: '#F24E1E', Icon: SiFigma },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const filteredTechnologies = activeCategory === 'All'
    ? technologies
    : technologies.filter((tech) => tech.category === activeCategory);

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
          <div className="tech-header">
            <span className="section-subtitle">Modern Stack</span>
            <h3 className="tech-title">
              Technologies That <span className="text-gradient">Power Your Growth</span>
            </h3>
            <p className="tech-subtitle">
              We leverage enterprise-grade tools, modern frameworks, and proven technologies to build fast, scalable, and revenue-generating digital products.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="tech-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`tech-filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filtered Technology Grid */}
          <motion.div layout className="tech-grid">
            <AnimatePresence mode="popLayout">
              {filteredTechnologies.map((tech) => (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="tech-card"
                  style={{ '--tech-color': tech.color }}
                >
                  <div className="tech-icon-wrapper">
                    <tech.Icon size={30} style={{ color: tech.color }} />
                  </div>
                  <div className="tech-info">
                    <span className="tech-name">{tech.name}</span>
                    <span className="tech-role">{tech.role}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;