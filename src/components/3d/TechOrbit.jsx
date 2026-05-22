import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Float } from '@react-three/drei';

const TechIcon = ({ texturePath, orbitRadius, orbitSpeed, orbitOffset }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const texture = useLoader(TextureLoader, texturePath);

  useFrame((state) => {
    const time = state.clock.elapsedTime * orbitSpeed + orbitOffset;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(time) * orbitRadius;
      groupRef.current.position.z = Math.sin(time) * orbitRadius;
      groupRef.current.position.y = Math.sin(time * 2) * (orbitRadius * 0.2);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial map={texture} transparent />
        </mesh>
      </Float>
    </group>
  );
};

const CentralSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#f5f5dc"
        metalness={0.8}
        roughness={0.2}
        emissive="#d4af37"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const OrbitRing = ({ radius }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color="#f5f5dc" transparent opacity={0.2} />
    </mesh>
  );
};

const TechOrbitScene = () => {
  const technologies = [
    { path: '/assets/html.png', orbitRadius: 3, orbitSpeed: 0.5, orbitOffset: 0 },
    { path: '/assets/css.png', orbitRadius: 3, orbitSpeed: 0.5, orbitOffset: Math.PI * 0.66 },
    { path: '/assets/js.png', orbitRadius: 3, orbitSpeed: 0.5, orbitOffset: Math.PI * 1.33 },
    { path: '/assets/react.png', orbitRadius: 5, orbitSpeed: 0.3, orbitOffset: 0 },
    { path: '/assets/node.png', orbitRadius: 5, orbitSpeed: 0.3, orbitOffset: Math.PI },
    { path: '/assets/mongo.png', orbitRadius: 7, orbitSpeed: 0.2, orbitOffset: Math.PI * 0.5 },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
      <CentralSphere />
      <OrbitRing radius={3} />
      <OrbitRing radius={5} />
      <OrbitRing radius={7} />
      {technologies.map((tech, index) => (
        <TechIcon
          key={index}
          texturePath={tech.path}
          orbitRadius={tech.orbitRadius}
          orbitSpeed={tech.orbitSpeed}
          orbitOffset={tech.orbitOffset}
        />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

const TechOrbit = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
        <Suspense fallback={null}>
          <TechOrbitScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechOrbit;