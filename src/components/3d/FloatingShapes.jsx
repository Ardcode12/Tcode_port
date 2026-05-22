import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const FloatingShape = ({ position, scale, color, speed, distort }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
};

const FloatingShapes = () => {
  const shapes = useMemo(
    () => [
      { position: [-4, 2, -5], scale: 1.5, color: '#f5f5dc', speed: 1.5, distort: 0.3 },
      { position: [4, -2, -3], scale: 1, color: '#d4af37', speed: 2, distort: 0.4 },
      { position: [0, 3, -4], scale: 0.8, color: '#00d4ff', speed: 1.8, distort: 0.35 },
      { position: [-3, -3, -6], scale: 1.2, color: '#f5f5dc', speed: 1.2, distort: 0.25 },
      { position: [5, 1, -5], scale: 0.6, color: '#d4af37', speed: 2.2, distort: 0.5 },
    ],
    []
  );

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
        {shapes.map((shape, index) => (
          <FloatingShape key={index} {...shape} />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingShapes;