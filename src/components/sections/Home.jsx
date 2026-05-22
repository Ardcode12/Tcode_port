import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import FrameScrollAnimation from '../ui/FrameScrollAnimation';
import '../../styles/components/Home.css';

const TypeWriter = ({ words, speed = 100, deleteSpeed = 50, delay = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, delay]);

  return (
    <span className="typewriter">
      {currentText}
      <span className="cursor">|</span>
    </span>
  );
};

// Enhanced Scroll Text Overlay with advanced animations
const ScrollTextOverlay = ({
  scrollProgress,
  startAt,
  endAt,
  position = 'center',
  children
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const midPoint = (startAt + endAt) / 2;
  const fadeInEnd = startAt + (midPoint - startAt) * 0.35;
  const fadeOutStart = midPoint + (endAt - midPoint) * 0.65;

  const opacity = useTransform(
    scrollProgress,
    [startAt, fadeInEnd, fadeOutStart, endAt],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollProgress,
    [startAt, fadeInEnd, fadeOutStart, endAt],
    [40, 0, 0, -40]
  );

  const scale = useTransform(
    scrollProgress,
    [startAt, fadeInEnd, fadeOutStart, endAt],
    [0.9, 1, 1, 0.9]
  );

  // Calculate x position based on screen size and position
  const getXPosition = () => {
    if (isMobile) {
      return '-50%'; // Always center on mobile
    }
    // On desktop/tablet, let CSS handle left/right positioning
    if (position === 'left' || position === 'right') {
      return 0;
    }
    return '-50%'; // Center position
  };

  return (
    <motion.div
      className={`scroll-text-overlay scroll-text-${position}`}
      style={{
        opacity,
        y,
        scale,
        x: getXPosition(),
      }}
    >
      {children}
    </motion.div>
  );
};


// Floating particles component for enhanced visual effect
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5
  }));

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const frameScrollRef = useRef(null);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: frameScrollProgress } = useScroll({
    target: frameScrollRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(heroScrollProgress, [0, 0.5], [0, 50]);

  const typingWords = ['Website Development', 'SEO & Google Ranking', 'Digital Marketing', 'Branding & Design'];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Enhanced text overlay content with more dynamic messages
  const textOverlays = [
    {
      startAt: 0.0,
      endAt: 0.22,
      position: 'center',
      title: 'Growth Starts Here',
      subtitle: 'Digital Solutions That Work',
      description: 'From startups to established businesses - we scale your online presence'
    },
    {
      startAt: 0.22,
      endAt: 0.44,
      position: 'left',
      title: 'Rank #1 on Google',
      subtitle: 'SEO That Delivers Results',
      description: 'Get found by customers searching for your services in Coimbatore'
    },
    {
      startAt: 0.44,
      endAt: 0.66,
      position: 'right',
      title: 'Modern Websites',
      subtitle: 'That Convert Visitors Into Customers',
      description: 'Fast, mobile-friendly, and designed to generate leads'
    },
    {
      startAt: 0.66,
      endAt: 0.85,
      position: 'center',
      title: 'Complete Digital Marketing',
      subtitle: 'Strategy + Execution',
      description: "Social media, ads, content - everything you need to grow"
    },
    {
      startAt: 0.85,
      endAt: 1.0,
      position: 'bottom',
      title: 'Start Growing Today',
      subtitle: 'Free Consultation Available',
      description: 'No commitment. Just honest advice on how to grow your business online.'
    }
  ];

  return (
    <>
      {/* Hero Section with Single Background */}
      <section className="home-section" id="home" ref={heroRef}>
        {/* Single Background Image */}
        <div className="hero-background">
          <div
            className="hero-bg-image"
            style={{ backgroundImage: 'url(/assets/web1.png)' }}
          />
          <div className="hero-bg-overlay" />
          <FloatingParticles />
        </div>

        <motion.div
          className="home-content"
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY
          }}
        >
          <motion.div
            className="pre-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="line" />
            <span>Coimbatore's Leading Digital Agency</span>
            <span className="line" />
          </motion.div>

          <motion.h1
            className="main-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="title-line">Transform Your Business With</span>
            <span className="title-line gradient">
              <TypeWriter words={typingWords} />
            </span>
          </motion.h1>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Full digital solutions for startups and small businesses. We build websites that rank on Google, attract customers, and grow revenue. Based in Coimbatore, serving businesses across India.
          </motion.p>

          {/* Benefits List */}
        

          <motion.div
            className="cta-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <MagneticButton onClick={() => scrollToSection('contact')}>
              <span>Get Free Consultation</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>

            <motion.a
              href="#services"
              className="secondary-cta"
              onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Services
            </motion.a>
          </motion.div>

          <motion.div
            className="stats-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {[
              { number: '10+', label: 'Happy Clients' },
              { number: '20+', label: 'Projects Delivered' },
              { number: '1+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="scroll-mouse"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="scroll-wheel" />
          </motion.div>
          <span className="scroll-text">Scroll to explore</span>
        </motion.div>
      </section>

      {/* Enhanced Frame Scroll Animation Section */}
      <FrameScrollAnimation ref={frameScrollRef} scrollProgress={frameScrollProgress}>
        {textOverlays.map((overlay, index) => (
          <ScrollTextOverlay
            key={index}
            scrollProgress={frameScrollProgress}
            startAt={overlay.startAt}
            endAt={overlay.endAt}
            position={overlay.position}
          >
            <h2>
              {overlay.title}<br />
              <span className="gradient-text">{overlay.subtitle}</span>
            </h2>
            <p>{overlay.description}</p>
            {overlay.position === 'bottom' && (
              <motion.button
                className="scroll-cta-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
              >
                Book Free Call →
              </motion.button>
            )}
          </ScrollTextOverlay>
        ))}
      </FrameScrollAnimation>
    </>
  );
};

export default Home;