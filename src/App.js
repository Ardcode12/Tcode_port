import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// AOS Library
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
      mirror: false,
    });
  }, []);

  // Refresh AOS when loading completes
  useEffect(() => {
    if (!isLoading) {
      AOS.refresh();
    }
  }, [isLoading]);

  useEffect(() => {
    const preloadImages = [
      '/assets/logo.png',
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
                    <h3>T Code Digital</h3>
                    <p className="footer-tagline">Your Growth Partner in the Digital World</p>
                  </div>

                  <div className="footer-contact">
                    <h4>Get In Touch</h4>
                    <p>tcode.webs00@gmail.com</p>
                    <p>+91-9080176624</p>
                    <p>Coimbatore, Tamil Nadu, India</p>
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
                  <p>© 2026 T Code Digital. All rights reserved.</p>
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