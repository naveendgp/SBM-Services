import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import type { Mesh, Group } from "three";
import { OrbitControls, Stars, Billboard, Text } from "@react-three/drei";

interface GlobeHeroProps {
  orbitText?: string;
  isRotationEnabled?: boolean;
}

const Scene = ({ orbitText = "SBM", isRotationEnabled = true }: GlobeHeroProps) => {
  const earthRef = useRef<Mesh>(null);
  const textRef = useRef<Group>(null);

  const [colorMap, normalMap, specularMap] = useLoader(TextureLoader, [
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (earthRef.current && isRotationEnabled) {
      earthRef.current.rotation.y = t * 0.055;
    }

    if (textRef.current) {
      const r = 1.9;
      const a = t * 0.4;

      textRef.current.position.set(
        Math.cos(a) * r,
        Math.sin(a * 0.45) * 0.25,
        Math.sin(a) * r
      );
    }
  });

  return (
    <>
      {/* BRIGHT LIGHTING FOR LIGHT BACKGROUND */}
      <ambientLight intensity={1.5} color="#ffffff" />

      {/* Multiple directional lights for bright, even illumination */}
      <directionalLight
        position={[8, 6, 8]}
        intensity={3.5}
        color="#ffffff"
        castShadow
      />

      <directionalLight
        position={[-6, 4, -6]}
        intensity={2.5}
        color="#e0f2fe"
      />

      <directionalLight
        position={[0, 8, 0]}
        intensity={2}
        color="#ffffff"
      />

      {/* Point lights for extra brightness */}
      <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#3b82f6" />

      {/* EARTH with bright, vibrant material */}
      <mesh
        ref={earthRef}
        rotation={[0, 0, 23.5 * Math.PI / 180]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={40}
          specular="#60a5fa"
          emissive="#1e3a5f"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Orbit ring for visual interest */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.01, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>

      {/* ORBITING TEXT - Vibrant blue color that pops on light background */}
      <group ref={textRef}>
        <Billboard>
          <Text
            fontSize={0.68}
            color="#1e40af" // Deep blue that stands out
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#ffffff"
            outlineOpacity={0.8}
          >
            {orbitText}
          </Text>
        </Billboard>
      </group>

      {/* SUBTLE STARS - Less visible but add depth */}
      <Stars
        radius={300}
        depth={70}
        count={2000}
        factor={2}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Atmospheric glow around Earth */}
      <mesh scale={1.05}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
    </>
  );
};

export default function GlobeHero({ orbitText, isRotationEnabled }: GlobeHeroProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [2.7, 0.3, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene orbitText={orbitText} isRotationEnabled={isRotationEnabled} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
}