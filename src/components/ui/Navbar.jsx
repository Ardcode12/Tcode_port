import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { scrollToSection as smoothScrollTo } from '../layout/SmoothScroll';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Success Stories' },
    { id: 'pricing', label: 'Pricing' },
  ];

  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'pricing', 'why-us', 'projects', 'cta'];
    let ticking = false;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setIsScrolled(scrollY > 40);

      const scrollPosition = scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop - 100) {
            setActiveSection(id);
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (id) => {
    smoothScrollTo(id, 80);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="navbar-container">
          <a
            href="#home"
            className="navbar-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <div className="logo-icon">
              <img src="/assets/logo_nav.png" alt="TWS Digital Solutions" />
            </div>
            <div className="logo-text-group">
              <span className="logo-text">TWS Digital Solutions</span>
              <span className="logo-tagline">Toward The Success</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="navbar-nav desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#cta"
            className="navbar-cta desktop-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('cta');
            }}
          >
            Let's Talk
          </a>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <nav className="mobile-nav">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="mobile-nav-number">0{index + 1}</span>
                    <span className="mobile-nav-text">{item.label}</span>
                  </motion.a>
                ))}
              </nav>

              <a
                href="#cta"
                className="mobile-cta"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('cta');
                }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>Let's Talk</span>
                <FiArrowRight size={16} />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;