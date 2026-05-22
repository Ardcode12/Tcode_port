import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import '../../styles/components/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: 'tcode.webs00@gmail.com',
      link: 'mailto:tcode.webs00@gmail.com',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      label: 'Phone',
      value: '+91-9080176624',
      link: 'tel:+919080176624',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Location',
      value: 'Coimbatore, India',
      link: '#',
    },
  ];

  return (
    <section className="contact-section" id="contact" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          data-aos="fade-up"
        >
          <span className="section-subtitle">Let's Talk</span>
          <h2 className="section-title">
            Start Your <span className="text-gradient">Digital Growth</span>
          </h2>
          <p className="section-description">
            Ready to take your business to the next level? Get in touch for a free consultation. No pressure, just honest advice on growing your business online.
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="contact-form-card" data-aos="fade-right" data-aos-delay="100">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell Us About Your Business</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What are your goals? What challenges are you facing?"
                    rows="4"
                    required
                  />
                </div>

                <MagneticButton
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading-spinner" />
                  ) : (
                    <>
                      <span>Request Free Consultation</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </>
                  )}
                </MagneticButton>

                {submitStatus === 'success' && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Thank you! We'll contact you within 24 hours.
                  </motion.div>
                )}
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="contact-info-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Info Cards */}
            <div className="contact-info-cards">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="info-card"
                  data-aos="fade-left"
                  data-aos-delay={index * 100}
                >
                  <span className="info-icon">{info.icon}</span>
                  <div className="info-content">
                    <span className="info-label">{info.label}</span>
                    <span className="info-value">{info.value}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Info */}
            <div className="quick-info" data-aos="fade-up" data-aos-delay="300">
              <h3>Office Hours</h3>
              <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
              <p>Sunday: By Appointment</p>

              <div className="response-time">
                <span className="time-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  We respond within 2 hours during business hours
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;