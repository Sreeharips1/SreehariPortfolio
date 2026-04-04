import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

function Model({ isMobile }) {
  const { scene } = useGLTF("./models/s21sree.glb");
  const modelRef = useRef();

  // 🔄 Auto rotation (left ↔ right smooth)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    modelRef.current.rotation.y = Math.sin(t / 2) * 0.5;
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={isMobile ? 1 : 0.7}
      position={[0, isMobile ? 0.06 : 0.6, 0]} // adjust height
      rotation={[0, 0.2, 0]} // slight angle
    />
  );
}

const PhoneModel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    setIsMobile(mediaQuery.matches);

    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, -1, 6], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* 🌍 HDRI Environment (BIG DIFFERENCE) */}
      <Environment preset="studio" />

      {/* 💡 Lights (FULL COVERAGE) */}

      {/* Base light */}
      <ambientLight intensity={1.2} />

      {/* Main front light */}
      <directionalLight position={[3, 3, 5]} intensity={2} />

      {/* Side light */}
      <directionalLight position={[-3, 2, 5]} intensity={1.5} />

      {/* Back light (edge highlight) */}
      <directionalLight position={[0, 3, -5]} intensity={1.2} />

      {/* Top light */}
      <pointLight position={[0, 5, 0]} intensity={1.5} />

      {/* Bottom fill light */}
      <pointLight position={[0, -5, 1]} intensity={1.5} />

      <pointLight position={[5, 0, 3]} intensity={2.2} />
      <directionalLight position={[0, 0, 5]} intensity={2.5} />

      {/* Model */}
      <Model isMobile={isMobile} />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default PhoneModel;
