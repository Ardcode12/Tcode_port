import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Float, ContactShadows, Center, Html } from '@react-three/drei';
import { FiUsers, FiGlobe, FiAward, FiHeadphones } from 'react-icons/fi';
import GlassCard from '../ui/GlassCard';
import '../../styles/components/About.css';

/* =========================================================================
   DESKTOP 3D LAPTOP MODEL SETTINGS (> 768px)
   Customize laptop size, position, rotation, camera, and effects for Desktop:
   ========================================================================= */
export const LAPTOP_SETTINGS = {
  // Size / Scale of the laptop model on Desktop
  scale: 0.50,

  // Position in 3D space [X (left/right), Y (up/down), Z (near/far)]
  position: [0, -0.22, 0],

  // Initial angle [X (tilt up/down), Y (facing angle), Z (roll)]
  rotation: [0.12, -0.38, 0],

  // Auto-rotation (Turntable rotation)
  autoRotate: true,
  rotationSpeed: 0.5,           // Rotation speed (higher = faster)
  rotateAfterAnimation: true,   // Only rotate once the laptop has finished opening!

  // Built-in Laptop Opening Animation
  playModelAnimation: true,     // Opens the laptop lid
  modelAnimationSpeed: 0.85,    // Speed of opening animation (1.0 = normal)

  // Floating hover effect
  enableFloat: true,
  floatSpeed: 1.8,              // Speed of gentle floating
  floatIntensity: 0.35,         // Amplitude of vertical float
  rotationIntensity: 0.12,      // Subtle tilt while floating

  // Drag interaction (disabled as requested)
  enableOrbitControls: false,
  enableZoom: false,

  // Camera settings
  cameraPosition: [0, 0.7, 5.5],
  cameraFov: 40,

  // Lighting intensities
  ambientIntensity: 1.8,
  directionalIntensity: 2.8,
  accentLightColor: '#d4af37',   // Gold accent reflection
};

/* =========================================================================
   MOBILE 3D LAPTOP MODEL SETTINGS (<= 768px)
   Customize laptop size, position, rotation, and camera specifically for Mobile:
   ========================================================================= */
export const MOBILE_LAPTOP_SETTINGS = {
  // Size / Scale of the laptop model on Mobile screens
  scale: 0.42,

  // Position in 3D space [X, Y, Z] on Mobile
  position: [0, -0.10, 0],

  // Initial angle [X (tilt up/down), Y (facing angle), Z (roll)]
  rotation: [0.14, -0.35, 0],

  // Auto-rotation (Turntable rotation)
  autoRotate: true,
  rotationSpeed: 0.5,           // Rotation speed on mobile
  rotateAfterAnimation: true,   // Starts rotating once the opening animation finishes

  // Built-in Laptop Opening Animation
  playModelAnimation: true,     // Opens the laptop lid
  modelAnimationSpeed: 0.85,    // Speed of opening animation

  // Floating hover effect on mobile
  enableFloat: true,
  floatSpeed: 1.5,
  floatIntensity: 0.25,
  rotationIntensity: 0.08,

  // Drag interaction (disabled on mobile to avoid trapping page scroll gestures)
  enableOrbitControls: false,
  enableZoom: false,

  // Camera settings optimized for portrait mobile screens
  cameraPosition: [0, 0.65, 5.8],
  cameraFov: 44,

  // Lighting intensities
  ambientIntensity: 1.8,
  directionalIntensity: 2.8,
  accentLightColor: '#d4af37',
};

// Preload the GLTF laptop model for instant rendering
useGLTF.preload('/assets/asus_rog_flow_x16.glb');

// 3D Model Loading Fallback
const ModelLoader = () => (
  <Html center>
    <div className="laptop-loader">
      <div className="laptop-spinner" />
      <span className="laptop-loader-text">Loading 3D Laptop...</span>
    </div>
  </Html>
);

// Laptop 3D Model Component with single-run opening animation & subsequent turntable rotation
const LaptopModel = ({ config, isInView = true }) => {
  const groupRef = useRef();
  const { scene, animations } = useGLTF('/assets/asus_rog_flow_x16.glb');
  const { actions, names, mixer } = useAnimations(animations, groupRef);
  const [isAnimationComplete, setIsAnimationComplete] = useState(!config.playModelAnimation);

  // Play the laptop screen opening animation once when scrolled into view
  useEffect(() => {
    if (!isInView) return;
    if (!actions || !names || names.length === 0) {
      setIsAnimationComplete(true);
      return;
    }

    const actionName = names[0];
    const action = actions[actionName];
    if (!action) {
      setIsAnimationComplete(true);
      return;
    }

    if (config.playModelAnimation) {
      action.reset();
      // Play only ONCE and keep the laptop screen in the opened state
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.timeScale = config.modelAnimationSpeed;
      action.play();

      const onFinished = () => {
        setIsAnimationComplete(true);
      };

      mixer.addEventListener('finished', onFinished);

      // Safety fallback timer matching the animation clip duration
      const clipDuration = action.getClip() ? action.getClip().duration : 2.5;
      const durationMs = ((clipDuration / (config.modelAnimationSpeed || 1)) * 1000) + 150;
      const fallbackTimer = setTimeout(() => {
        setIsAnimationComplete(true);
      }, durationMs);

      return () => {
        mixer.removeEventListener('finished', onFinished);
        clearTimeout(fallbackTimer);
      };
    } else {
      setIsAnimationComplete(true);
    }
  }, [isInView, actions, names, mixer, config.playModelAnimation, config.modelAnimationSpeed]);

  // Turntable auto-rotation: starts once the opening animation has finished playing
  useFrame((state, delta) => {
    if (groupRef.current && config.autoRotate) {
      if (!config.rotateAfterAnimation || isAnimationComplete) {
        groupRef.current.rotation.y += delta * config.rotationSpeed;
      }
    }
  });

  const modelNode = (
    <group
      ref={groupRef}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
    >
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );

  if (config.enableFloat) {
    return (
      <Float
        speed={config.floatSpeed}
        rotationIntensity={config.rotationIntensity}
        floatIntensity={config.floatIntensity}
      >
        {modelNode}
      </Float>
    );
  }

  return modelNode;
};

// Interactive 3D Canvas Showcase with Mobile vs Desktop Settings
const LaptopCanvas = ({ isInView = true }) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Select mobile or desktop configuration dynamically
  const config = isMobile ? MOBILE_LAPTOP_SETTINGS : LAPTOP_SETTINGS;

  return (
    <div className="laptop-3d-container">
      {/* Background ambient gold lighting glow */}
      <div className="laptop-3d-glow" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: config.cameraPosition, fov: config.cameraFov }}
        className="laptop-canvas"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={config.ambientIntensity} />
        <directionalLight position={[5, 8, 5]} intensity={config.directionalIntensity} />
        <directionalLight position={[-5, 3, -2]} intensity={1.0} />
        <pointLight position={[0, 4, 3]} intensity={1.8} color={config.accentLightColor} />

        <Suspense fallback={<ModelLoader />}>
          <LaptopModel config={config} isInView={isInView} />
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.4}
            scale={8.5}
            blur={2.2}
            far={4}
            color="#000000"
          />
        </Suspense>

        {config.enableOrbitControls && (
          <OrbitControls
            enableZoom={config.enableZoom}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.1}
            minPolarAngle={Math.PI / 6}
          />
        )}
      </Canvas>
    </div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const stats = [
    {
      number: '10+',
      label: 'Clients Served',
      icon: <FiUsers size={24} />
    },
    {
      number: '20+',
      label: 'Websites Built',
      icon: <FiGlobe size={24} />
    },
    {
      number: '1+',
      label: 'Years Experience',
      icon: <FiAward size={24} />
    },
    {
      number: '24/7',
      label: 'Support',
      icon: <FiHeadphones size={24} />
    },
  ];

  return (
    <section className="about-section" id="about" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">About Our Agency</span>
          <h2 className="section-title">
            Your Trusted <span className="text-gradient">Digital Partner</span>
          </h2>
        </motion.div>

        <div className="about-content">
          {/* Info Section */}
          <motion.div
            className="about-info"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="about-card">
              <h3>Who We Are</h3>
              <p>
                We're a results-driven digital agency based in Coimbatore, specializing in helping small businesses and startups dominate their local market online.
              </p>

              <h3 style={{ marginTop: '2rem' }}>What We Do</h3>
              <p>
                We build fast, beautiful websites that rank on Google, run targeted ad campaigns that bring in qualified leads, and create brands that customers trust and remember.
              </p>

              <h3 style={{ marginTop: '2rem' }}>Why We're Different</h3>
              <p>
                Unlike agencies that disappear after launch, we become your long-term growth partner. We focus on measurable results - more traffic, more leads, more revenue. Your success is our success.
              </p>
            </GlassCard>

            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <span className="stat-icon">{stat.icon}</span>
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Laptop Showcase (Replaces previous code block) */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <LaptopCanvas isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;