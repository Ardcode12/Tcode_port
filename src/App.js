import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

// UI Components
import LoadingScreen from './components/ui/LoadingScreen';
import Navbar from './components/ui/Navbar';
import ScrollProgress from './components/ui/ScrollProgress';

// Layout
import SmoothScroll from './components/layout/SmoothScroll';

// Sections
import Home from './components/sections/Home';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Pricing from './components/sections/Pricing';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Projects from './components/sections/Projects';
import CTA from './components/sections/CTA';
import Contact from './components/sections/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Set light theme permanently
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  useEffect(() => {
    const preloadImages = [
      '/assets/logo.png',
      '/assets/logo_nav.png',
      '/assets/img1.jpg',
      '/assets/pic.jpg',
    ];

    Promise.all(
      preloadImages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    ).then(() => {
      setTimeout(() => { }, 500);
    });
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <SmoothScroll>
          <div className="app">
            {/* Noise Overlay */}
            <div className="noise-overlay" />

            {/* Navigation */}
            <Navbar />

            {/* Scroll Progress */}
            <ScrollProgress />

            {/* Page Sections */}
            <main>
              <Home />
              <About />
              <Services />
              <Pricing />
              <WhyChooseUs />
              <Projects />
              <CTA />
              <Contact />
            </main>

            {/* Footer */}
            <footer className="footer">
              <div className="footer-content">
                <div className="footer-main">
                  <div className="footer-brand">
                    <h3>TWS Digital Solutions</h3>
                    <p className="footer-tagline">Toward The Success</p>
                  </div>

                  <div className="footer-contact">
                    <h4>Get In Touch</h4>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiMail size={16} style={{ color: 'var(--color-accent-primary)', flexShrink: 0 }} />
                      <a href="mailto:tcode.webs00@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>tcode.webs00@gmail.com</a>
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiPhone size={16} style={{ color: 'var(--color-accent-primary)', flexShrink: 0 }} />
                      <a href="tel:+919080176624" style={{ color: 'inherit', textDecoration: 'none' }}>+91-9080176624</a>
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiMapPin size={16} style={{ color: 'var(--color-accent-primary)', flexShrink: 0 }} />
                      <span>Coimbatore, Tamil Nadu, India</span>
                    </p>
                  </div>

                  <div className="footer-links">
                    <h4>Quick Links</h4>
                    <a href="#services">Services</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#projects">Case Studies</a>
                    <a href="#contact">Contact</a>
                  </div>
                </div>

                <div className="footer-bottom">
                  <p>© 2026 TWS Digital Solutions. All rights reserved.</p>
                  <p>Transforming Businesses Through Digital Marketing | Web Development Company in Coimbatore</p>
                </div>
              </div>
            </footer>
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;