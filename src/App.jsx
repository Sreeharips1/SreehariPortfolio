import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Tech,
  Navbar,
  HouseSection,
  Projects,
} from "./components";

import Footer from "./components/Footer";
import PreLoader from "./components/PreLoader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 1200); // ⏱️ smooth timing
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
        <Experience />
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
