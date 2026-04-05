import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import {
  About,
  Contact,
  Hero,
  Tech,
  Navbar,
  HouseSection,
  Projects,
} from "./components";

import Footer from "./components/Footer";
import PreLoader from "./components/PreLoader";

// 🔥 Lazy load Experience
const Experience = lazy(() => import("./components/Experience"));

const App = () => {
  const [loading, setLoading] = useState(true);

  // 👇 scroll detection
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 1200);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>

        <About />

        {/* 🔥 Lazy + Scroll load */}
        <div ref={ref}>
          {inView && (
            <Suspense
              fallback={
                <div className="text-white text-center py-10">
                  Loading Experience...
                </div>
              }
            >
              <Experience />
            </Suspense>
          )}
        </div>

        <Tech />
        <Projects />

        <div className="relative z-0">
          <Contact />
          <HouseSection />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
