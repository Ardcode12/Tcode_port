import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import '../../styles/components/Projects.css';

const caseStudies = [
  {
    id: 1,
    title: 'A professional portfolio for a Client developed usind Three.js and the 3d models .',
    client: 'A working professional',
    problem: 'Client does not have an online presence. Struggling to showcase work and attract new clients. Needs a modern, visually stunning portfolio to stand out in a competitive market',
    solution: 'Built a custom portfolio website using Three.js for interactive 3D elements, showcasing the client \'s work in a unique and engaging way. Implemented responsive design, SEO optimization, and integrated contact forms to drive inquiries.',
    results: [
      'More inquiries from potential clients',
      'More oppurtunities to showcase work',
      'Increased online visibility and credibility',
    ],
    image: '/assets/three.png',
    category: 'Starter Pack (₹2.5k - 5k)',
    duration: '2 weeks',
  },
  {
    id: 2,
    title: 'A visualization platform of bank schemes .',
    client: 'A bank employee.',
    problem: 'Explaining the bank schemes to the customers is a difficult task. The client needed a solution to make it easier for customers to understand the schemes and make informed decisions.',
    solution: 'Developed an interactive visualization platform that simplifies complex banking schemes using intuitive graphics and user-friendly interfaces. The platform allows customers to explore different schemes, compare benefits, and understand eligibility criteria, leading to increased customer engagement and satisfaction.',
    results: [
'Increased customer engagement and satisfaction',
'Improved understanding of banking schemes among customers',
'Higher conversion rates for bank products and services',
    ],
    image: '/assets/banking.png',
    category: 'Growth Pack (₹9k - 12k)',
    duration: '1 month',
  },
  {
    id: 3,
    title: 'A advanced E Commerce Platform',
    client: 'A scaling e-commerce business',
    problem: 'The client had outgrown thier business and need a custom solution to manage the orders and then make their business better and more efficient.',
    solution: 'Built a custom e-commerce platform with inventory management, real-time order tracking, customer accounts, advanced analytics, and seamless payment integration. Optimized for performance and scalability.',
    results: [
      'Handled 10X more orders without performance issues',
      'Improved customer satisfaction with real-time tracking',
      'Increased repeat purchases with customer accounts',
    ],
    image: '/assets/ecom.png',
    category: 'Pro Pack (₹18k - 25k)',
    duration: '2 months',
  },
];

const Projects = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section className="projects-section" id="projects" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          data-aos="fade-up"
        >
          <span className="section-subtitle">Real Results</span>
          <h2 className="section-title">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="section-description">
            See how we've helped businesses like yours achieve measurable growth through strategic digital marketing.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="projects-grid">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedCase(caseStudy)}
              data-aos="zoom-in-up"
              data-aos-delay={index * 150}
            >
              <div className="project-image">
                <img src={caseStudy.image} alt={caseStudy.title} />
                <div className="project-overlay">
                  <span className="view-text">View Case Study</span>
                </div>
              </div>
              <div className="project-info">
                <span className="case-category">{caseStudy.category}</span>
                <h3 className="project-title">{caseStudy.title}</h3>
                <p className="project-description">{caseStudy.client}</p>
                <div className="project-tech">
                  {caseStudy.results.slice(0, 2).map((result, idx) => (
                    <span key={idx} className="tech-tag">✓ {result}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedCase(null)}
              >
                ✕
              </button>

              <div className="modal-image">
                <img src={selectedCase.image} alt={selectedCase.title} />
                <div className="modal-badge">{selectedCase.category}</div>
              </div>

              <div className="modal-body">
                <h2>{selectedCase.title}</h2>
                <p className="modal-client">Client: {selectedCase.client}</p>

                <div className="case-section">
                  <h4>🎯 The Challenge</h4>
                  <p>{selectedCase.problem}</p>
                </div>

                <div className="case-section">
                  <h4>💡 Our Solution</h4>
                  <p>{selectedCase.solution}</p>
                </div>

                <div className="case-section">
                  <h4>📊 Results Achieved ({selectedCase.duration})</h4>
                  <ul className="results-list">
                    {selectedCase.results.map((result, index) => (
                      <li key={index}>✓ {result}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-actions">
                  <button
                    className="modal-btn primary"
                    onClick={() => {
                      setSelectedCase(null);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        const offset = 80;
                        const elementPosition = contactSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }}
                  >
                    Get Similar Results →
                  </button>
                  <button
                    className="modal-btn secondary"
                    onClick={() => setSelectedCase(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;