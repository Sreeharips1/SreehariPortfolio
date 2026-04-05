import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#350505",
        color: "#d9d6d6",
      }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            loading="lazy" // 🔥 IMPORTANT
            className="w-full h-full object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[22px] font-bold">{experience.title}</h3>
        <p className="text-secondary text-[15px] font-semibold">
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-4 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li key={index} className="text-gray-300 text-[14px] tracking-wide">
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      {/* 🔥 FIXED MOTION */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={textVariant()}
      >
        <p className="text-red-400 text-[14px] sm:text-[18px] uppercase tracking-wider text-center">
          What I have done so far
        </p>

        <h2
          id="work"
          className={`${styles.sectionHeadText} text-center text-red-500 italic font-[cursive]`}
        >
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex justify-center">
        <VerticalTimeline className="!before:bg-red-500 w-full max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
