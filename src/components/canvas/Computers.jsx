import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";

// 🌈 RGB Lights
const RGBLights = () => {
  const light1 = useRef();
  const light2 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const r = (Math.sin(t) + 1) / 2;
    const g = (Math.sin(t + 2) + 1) / 2;
    const b = (Math.sin(t + 4) + 1) / 2;

    if (light1.current) light1.current.color.setRGB(r, g, b);
    if (light2.current) light2.current.color.setRGB(b, r, g);
  });

  return (
    <>
      <pointLight ref={light1} position={[3, 2, 2]} intensity={2} />
      <pointLight ref={light2} position={[-3, 2, 2]} intensity={2} />
    </>
  );
};

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return (
    <mesh>
      <hemisphereLight intensity={0.5} groundColor="black" />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
      <pointLight intensity={1} />
      <spotLight
        position={[10, 20, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />

      {/* ✅ RGB Glow */}
      <RGBLights />

      <primitive
        object={computer.scene}
        // scale={0.75}
        // position={[0, -3.25, -1.5]}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="canvas-load"></span>
      <p
        style={{
          fontSize: 14,
          color: "#f1f1f1",
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
