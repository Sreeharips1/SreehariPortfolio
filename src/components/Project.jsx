import React from "react";
import { projects } from "../constants/projects";
import ProjectCard from "./ProjectCard";

const ArrowCurved = ({ flip = false, opacity = 1 }) => (
  <svg width="48" height="72" viewBox="0 0 48 72" fill="none">
    <path
      d={flip ? "M6 6 Q 6 66, 44 36" : "M6 66 Q 6 6, 44 36"}
      stroke="#dc2626"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      opacity={opacity}
    />
    <polyline
      points="38,30 44,36 38,42"
      stroke="#dc2626"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    />
  </svg>
);

const Projects = () => {
  const topRow = projects.slice(0, 2);
  const bottomRow = projects.slice(2, 4);

  return (
    <section
      id="projects"
      className="w-full min-h-screen flex items-center px-6 md:px-16 lg:px-24 xl:px-32 py-24"
      // style={{
      //   background:
      //     "radial-gradient(ellipse 70% 60% at 65% 50%, rgba(160,10,10,0.07) 0%, transparent 70%), #080808",
      // }}
    >
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* LEFT + ARROWS */}
        <div className="flex flex-col items-center lg:items-start lg:min-w-[220px] shrink-0">
          {/* TITLE */}
          <div className="text-center lg:text-left">
            <h2
              className="font-black leading-[1.05] tracking-tight text-white mb-6"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(30px, 3.5vw, 42px)",
              }}
            >
              Web<span className="block text-red-600">dev.</span>
            </h2>

            <p
              className="text-white/25 uppercase leading-relaxed"
              style={{ fontSize: 11, letterSpacing: "0.12em" }}
            >
              Selected
              <br />
              projects
            </p>
          </div>

          {/* ARROWS (hidden on mobile) */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-4 mt-6">
            <ArrowCurved flip={false} opacity={0.75} />
            <ArrowCurved flip={true} opacity={0.35} />
          </div>
        </div>

        {/* RIGHT — CARDS */}
        <div className="flex-1 w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...topRow, ...bottomRow].map((project, i) => (
              <div key={i} className="flex justify-center">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
