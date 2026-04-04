import React from "react";
import PhoneModel from "./canvas/phone";
import { GraduationCap, Briefcase, Code } from "lucide-react";
import sign from "../assets/sreehari/signsree.png";

const About = () => {
  return (
    <section
      id="about"
      className="w-full min-h-screen flex flex-col items-center px-6 md:px-20 lg:px-32 py-16 "
    >
      {/* 🔴 TOP CENTER HEADER */}

      {/* CONTENT ROW */}
      <div className="w-[80%] mx-auto flex flex-col md:flex-row items-center justify-around gap-12">
        {/* LEFT SIDE TEXT */}
        <div className="w-full md:w-1/2 max-w-2xl pl-4 md:pl-8 lg:pl-12">
          <h1 className="text-4xl md:text-5xl text-red-500 mb-12 text-center italic font-[cursive]">
            About Me
          </h1>
          {/* PARAGRAPH */}
          <p className="text-gray-300 text-lg leading-relaxed text-justify">
            I am{" "}
            <span className="text-white font-medium">Sreehari P Shaiju</span>,
            born in Thrissur, Kerala. I completed my Bachelor of Technology in
            Electronics and Communication Engineering from Federal Institute of
            Science.
            <span className="text-red-500 font-semibold"> Pass Out: 2025</span>,
            with a CGPA of 7.67. I have completed a six-month internship in Web
            Development at
            <span className="text-white"> Webgeon</span>, where I gained
            practical experience in building modern web applications.
            Additionally, I have been trained in Full Stack Development and Java
            from <span className="text-white"> EMERTXE WSA</span>, which
            strengthened my foundation in both frontend and backend
            technologies. I am passionate about creating interactive,
            user-friendly applications and continuously improving my skills in
            modern web and software development.
          </p>

          {/* ICONS */}
          <div className="flex gap-6 mt-6">
            <GraduationCap className="text-red-500 w-6 h-6" />
            <Briefcase className="text-red-500 w-6 h-6" />
            <Code className="text-red-500 w-6 h-6" />
          </div>

          {/* SIGNATURE */}
          <div className="mt-6">
            <img src={sign} alt="signature" className="w-32 opacity-80" />
          </div>
        </div>

        {/* RIGHT SIDE MODEL */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[650px] flex items-center justify-center">
          <PhoneModel />
        </div>
      </div>
    </section>
  );
};

export default About;
