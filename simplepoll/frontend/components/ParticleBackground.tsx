'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleProps {
  count?: number;
  [key: string]: any;
}

function Particle({ count = 5000 }: ParticleProps) {
  const ref = useRef<THREE.Points>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 2000;
    positions[i + 1] = (Math.random() - 0.5) * 2000;
    positions[i + 2] = (Math.random() - 0.5) * 2000;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.0001;
      ref.current.rotation.y += 0.0002;

      // Mouse interaction
      ref.current.position.x += mousePosition.x * 0.01;
      ref.current.position.y += mousePosition.y * 0.01;
    }
  });

  return (
    <Points
      ref={ref}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#0066FF"
        size={2}
        sizeAttenuation={true}
        opacity={0.5}
      />
    </Points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        <Particle count={5000} />
      </Canvas>
    </div>
  );
}
