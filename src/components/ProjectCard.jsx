import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGoogledrive } from "react-icons/si";
import { MdFlipCameraAndroid } from "react-icons/md";

const ProjectCard = ({ project }) => {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      style={{ width: 300, height: 420 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card scene */}
      <div
        style={{
          width: "100%",
          height: "100%",
          perspective: "1000px",
        }}
      >
        {/* Card wrapper — flips */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition:
              "transform 0.7s cubic-bezier(0.45,0.05,0.15,1.0), box-shadow 0.4s ease",
            borderRadius: 20,
            transform: flipped
              ? `rotateY(180deg) scale(${hovered ? 1.025 : 1})`
              : `rotateY(0deg) scale(${hovered ? 1.025 : 1})`,
            boxShadow: hovered
              ? "0 18px 40px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.14)"
              : "0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)",
          }}
        >
          {/* ── FRONT ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              overflow: "hidden",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background:
                "linear-gradient(160deg,rgba(30,32,42,0.92),rgba(18,20,28,0.97))",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(16px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Status badge */}
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 10,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 999,
                background: "rgba(220,50,50,0.80)",
                color: "#fff",
                border: "1px solid rgba(255,100,100,0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              {project.status}
            </div>

            {/* Cover image */}
            <img
              src={project.frontImg}
              alt={project.name}
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: "16px 16px 0 0",
                flexShrink: 0,
              }}
            />

            {/* Body */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "18px 20px 20px",
              }}
            >
              <h3
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontSize: 16,
                  fontWeight: 600,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                {project.name}
              </h3>

              <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 18,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#e83535")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                    }
                  >
                    <FaGithub />
                  </a>
                )}
                {project.linkedin && (
                  <a
                    href={project.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 18,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#e83535")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                    }
                  >
                    <FaLinkedin />
                  </a>
                )}
                {project.drive && (
                  <a
                    href={project.drive}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 18,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#e83535")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                    }
                  >
                    <SiGoogledrive />
                  </a>
                )}
              </div>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: 2,
                    padding: "8px 22px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "transparent",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(220,50,50,0.85)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* ── BACK ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              overflow: "hidden",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <img
              src={project.backImg}
              alt="back"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* ── FLIP BUTTON ── */}
      <button
        onClick={() => setFlipped((f) => !f)}
        style={{
          position: "absolute",
          bottom: -18,
          left: "50%",
          transform: `translateX(-50%) rotate(${flipped ? 180 : 0}deg)`,
          transition:
            "transform 0.7s cubic-bezier(0.45,0.05,0.15,1.0), background 0.2s",
          zIndex: 20,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(30,32,42,0.95)",
          border: "1.5px solid rgba(255,255,255,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.30)",
          backdropFilter: "blur(10px)",
          color: "rgba(255,255,255,0.85)",
          fontSize: 16,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(220,50,50,0.90)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(30,32,42,0.95)")
        }
      >
        <MdFlipCameraAndroid />
      </button>
    </div>
  );
};

export default ProjectCard;
