import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Hero,
  Tech,
  Works,
  Navbar,
  StarsCanvas,
  HouseSection,
  Projects,
} from "./components";
import Footer from "./components/Footer";

const App = () => {
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
