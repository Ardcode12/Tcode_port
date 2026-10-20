import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Float, ContactShadows, Center, Html } from '@react-three/drei';
import { FiUsers, FiGlobe, FiAward, FiHeadphones, FiMove } from 'react-icons/fi';
import GlassCard from '../ui/GlassCard';
import '../../styles/components/About.css';

/* =========================================================================
   3D LAPTOP MODEL CONFIGURATION SETTINGS
   All settings are kept right here in code for easy adjustments:
   - scale: Overall size of the laptop (0.8 - 1.2 is ideal)
   - position: [X (left/right), Y (up/down), Z (near/far)]
   - rotation: [X (tilt), Y (facing angle), Z (roll)] in radians
   - autoRotate: Whether the laptop rotates continuously
   - rotationSpeed: Speed of continuous turntable rotation
   - rotateAfterAnimation: If true, starts continuous rotation after opening animation finishes
   - playModelAnimation: Play the laptop screen opening animation
   - modelAnimationSpeed: Speed of the screen opening animation
   - enableFloat: Gentle floating/hovering effect
   - cameraPosition & cameraFov: View angle and zoom distance
   ========================================================================= */
export const LAPTOP_SETTINGS = {
  // Size / Scale of the laptop model (adjusted for comfortable fitting without clipping)
  scale: 0.50,

  // Position in 3D space [X, Y, Z]
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

  // Interactive mouse/touch dragging
  enableOrbitControls: true,
  enableZoom: false,            // Set to true to allow scroll zooming

  // Camera settings - positioned so the model window is spacious and never clipped
  cameraPosition: [0, 0.7, 5.5],
  cameraFov: 40,

  // Lighting intensities
  ambientIntensity: 1.8,
  directionalIntensity: 2.8,
  accentLightColor: '#d4af37',   // Gold accent reflection
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
const LaptopModel = ({ config = LAPTOP_SETTINGS, isInView = true }) => {
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

// Interactive 3D Canvas Showcase
const LaptopCanvas = ({ isInView = true }) => {
  const config = LAPTOP_SETTINGS;

  return (
    <div className="laptop-3d-container">
      {/* Background ambient gold lighting glow */}
      <div className="laptop-3d-glow" />

      {/* Drag interaction hint */}
      <div className="laptop-interaction-badge">
        <FiMove size={13} />
        <span>Drag to rotate</span>
      </div>

      {/* 3D Canvas without boundary card */}
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