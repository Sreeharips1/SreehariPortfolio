import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import FloatingMenu from "./FloatingMenu";
import ContactCard from "./ContactCard";
import MapCard from "./MapCard";

/* ================= MODEL ================= */
function HouseModel({ section, mouse }) {
  const { scene } = useGLTF("./models/carv1.glb");
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;

    let targetRotation = 0;
    let targetX = 0;

    if (section === 1) {
      targetRotation = -0.4;
      targetX = 0.6;
    } else if (section === 2) {
      targetRotation = 0.4;
      targetX = -0.6;
    } else if (section === 3) {
      targetRotation = 0.2;
      targetX = 0;
    }

    ref.current.rotation.y +=
      (targetRotation + mouse.x * 0.5 - ref.current.rotation.y) * 0.05;

    ref.current.rotation.x += (mouse.y * 0.2 - ref.current.rotation.x) * 0.05;

    ref.current.position.x += (targetX - ref.current.position.x) * 0.05;

    ref.current.position.y = -1 + Math.sin(Date.now() * 0.001) * 0.05;
  });

  return (
    <primitive ref={ref} object={scene} scale={1.5} position={[0, -1, 0]} />
  );
}

/* ================= CAMERA ================= */
function CameraController({ section }) {
  const { camera } = useThree();

  useFrame(() => {
    let targetZ = 5;

    if (section === 1) targetZ = 4.5;
    if (section === 2) targetZ = 5.5;
    if (section === 3) targetZ = 4.8;

    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ================= MAIN ================= */
const HouseSection = () => {
  const [section, setSection] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  /* 🖱️ Mouse */
  useEffect(() => {
    const handleMouse = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  /* 🔄 Scroll + Swipe */
  useEffect(() => {
    let startY = 0;

    const wheel = (e) => {
      if (e.deltaY > 0) setSection((p) => Math.min(p + 1, 3));
      else setSection((p) => Math.max(p - 1, 0));
    };

    const touchStart = (e) => (startY = e.touches[0].clientY);
    const touchEnd = (e) => {
      const diff = startY - e.changedTouches[0].clientY;
      if (diff > 50) setSection((p) => Math.min(p + 1, 3));
      if (diff < -50) setSection((p) => Math.max(p - 1, 0));
    };

    window.addEventListener("wheel", wheel);
    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);

    return () => {
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
    };
  }, []);

  /* 📦 CONTENT (UPDATED ✅) */
  const content = [
    {
      title: "Address",
      text: "Poothillath House, Kuttichira P.O, Thrissur, Kerala, India.",
    },
    {
      title: "Education",
      text1: "B.Tech in Electronics & Communication Engineering (CGPA: 7.67)",
      text2: "St. Sebastian HSS Kuttikad – 97%",
      text3: "Vyasa Vidyanikethan Chalakudy – 89%",
    },
    {
      title: "Hackathons",
      text1: "Super Hack 2025",
      text2: "ACTA Global 24-Hour Hackathon",
      text3: "ET AI Hackathon",
    },
    {
      title: "Certifications",
      text: "Oracle Certified Foundations Associate – AI Foundations",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=A6B4EC735BD24F6FD6FA96A24FFD6076F1A2E069CAE69689137273200E5754D9",
    },
  ];

  const isLeft = section % 2 === 0;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 🌈 Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-gray-900 to-black animate-gradient" />

      {/* 3D */}
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <Environment preset="studio" />
        <CameraController section={section} />
        <HouseModel section={section} mouse={mouse} />
      </Canvas>

      {/* 🪟 CARD */}
      <div className="absolute inset-0 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, x: isLeft ? -120 : 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLeft ? -120 : 120 }}
            transition={{ duration: 0.6 }}
            className={`absolute ${
              isLeft ? "left-6 md:left-20" : "right-6 md:right-20"
            } ${section === 0 ? "top-[35%]" : "top-1/2 -translate-y-1/2"}
            w-[280px] md:w-[360px] p-6 rounded-2xl 
            bg-gray-800/30 backdrop-blur-xl 
            border border-gray-500/20 
            shadow-[0_0_25px_rgba(255,255,255,0.15)]
            text-white`}
          >
            <h2 className="text-red-500 text-2xl font-bold mb-3">
              {content[section].title}
            </h2>

            {/* 🧠 MULTI TEXT SUPPORT */}
            {content[section].text && (
              <p className="text-gray-300 text-sm leading-relaxed">
                {content[section].text}
              </p>
            )}

            {(content[section].text1 ||
              content[section].text2 ||
              content[section].text3) && (
              <ul className="mt-3 space-y-2 text-gray-300 text-sm">
                {content[section].text1 && <li>• {content[section].text1}</li>}
                {content[section].text2 && <li>• {content[section].text2}</li>}
                {content[section].text3 && <li>• {content[section].text3}</li>}
              </ul>
            )}

            {/* 🔗 LINK */}
            {content[section].link && (
              <a
                href={content[section].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-red-400 hover:text-white transition"
              >
                View Certificate →
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🔘 MENU */}
      <FloatingMenu setSection={setSection} />
    </section>
  );
};

export default HouseSection;
