import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiClock, FiZap } from 'react-icons/fi';
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
    setFormData({ name: '', email: '', phone: '', message: '' });

    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: <FiMail size={22} />,
      label: 'Email',
      value: 'tcode.webs00@gmail.com',
      link: 'mailto:tcode.webs00@gmail.com',
    },
    {
      icon: <FiPhone size={22} />,
      label: 'Phone',
      value: '+91-9080176624',
      link: 'tel:+919080176624',
    },
    {
      icon: <FiMapPin size={22} />,
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
            <GlassCard className="contact-form-card">
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
                      <FiSend size={18} />
                    </>
                  )}
                </MagneticButton>

                {submitStatus === 'success' && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <FiCheckCircle size={18} style={{ flexShrink: 0 }} />
                    <span>Thank you! We'll contact you within 24 hours.</span>
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
            <div className="quick-info">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiClock size={18} style={{ color: 'var(--color-accent-primary)' }} />
                <span>Office Hours</span>
              </h3>
              <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
              <p>Sunday: By Appointment</p>

              <div className="response-time">
                <span className="time-badge">
                  <FiZap size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }} />
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