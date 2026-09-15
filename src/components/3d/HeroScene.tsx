'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  const isDark = !mounted || theme === 'dark';

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Smoothly follow the mouse with some inertia (Parallax)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (state.pointer.x * Math.PI) / 6 + t * 0.15,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (state.pointer.y * Math.PI) / 6,
        0.05
      );

      // Smoothly drift further left and right (Base position 3.0, moving by 2.5 units)
      groupRef.current.position.x = 3.0 + Math.sin(t * 0.4) * 2.5;
    }
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.8} color="#ffffff" />
      
      {/* Top light: Bright/Light Grey to illuminate the top */}
      <directionalLight position={[0, 10, 5]} intensity={isDark ? 3.5 : 2} color="#ffffff" />
      
      {/* Bottom light: Muted Purple/Grey to shade the bottom */}
      <directionalLight position={[0, -10, 5]} intensity={isDark ? 4 : 2} color="#a390ba" />
      
      {/* Side fill light for depth */}
      <directionalLight position={[10, 0, 5]} intensity={1} color="#ffffff" />

      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Positioned to the right to fill empty space without being overly massive */}
        <group ref={groupRef} position={[3.5, 0, 0]}>
          <mesh scale={2.5}>
            <sphereGeometry args={[1, 128, 128]} />
            <MeshDistortMaterial 
              color="#ffffff" // Clean glossy white
              envMapIntensity={2.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
              metalness={0.6}
              roughness={0.1}
              distort={0.45} // Amount of distortion (Perlin noise blob effect)
              speed={2.5}     // Speed of the morphing
            />
          </mesh>
        </group>
      </Float>
    </>
  );
}
