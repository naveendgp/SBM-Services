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
      {/* === LIGHTING (THIS IS THE MAIN FIX) === */}
      <ambientLight intensity={0.25} />

      {/* Key light */}
      <directionalLight
        position={[6, 4, 6]}
        intensity={2.6}
        color="#ffffff"
      />

      {/* Rim light */}
      <directionalLight
        position={[-6, -2, -6]}
        intensity={1.4}
        color="#1e40af"
      />

      {/* === EARTH === */}
      <mesh
        ref={earthRef}
        rotation={[0, 0, 23.5 * Math.PI / 180]}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={18}
          specular="#93c5fd"
        />
      </mesh>

      {/* === ORBITING TEXT (CLEAN, PREMIUM GOLD) === */}
      <group ref={textRef}>
        <Billboard>
          <Text
            fontSize={.68}
            color="#eab308" // muted gold
            anchorX="center"
            anchorY="middle"
          >
            {orbitText}
          </Text>
        </Billboard>
      </group>

      {/* === STARS (SUBTLE, NOT NOISY) === */}
      <Stars
        radius={300}
        depth={70}
        count={4500}
        factor={3}
        saturation={0}
        fade
        speed={0.4}
      />
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
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
