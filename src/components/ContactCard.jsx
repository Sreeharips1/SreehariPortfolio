// ContactCard.jsx
import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactCard = () => {
  return (
    <div className="w-[260px] h-[480px] rounded-[40px] bg-black border border-gray-700 shadow-xl p-5 flex flex-col justify-between">
      {/* 🔝 Top notch */}
      <div className="w-24 h-5 bg-gray-800 rounded-full mx-auto mb-4"></div>

      <div>
        <h2 className="text-red-500 text-xl font-bold mb-4 text-center">
          Contact
        </h2>

        {/* Phone */}
        <a
          href="tel:9995258646"
          className="flex items-center gap-2 mb-3 hover:text-red-400"
        >
          <FaPhone /> 9995258646
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/919526308646"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 mb-5 hover:text-red-400"
        >
          <FaWhatsapp /> WhatsApp
        </a>

        {/* Social icons */}
        <div className="flex justify-center gap-3 mt-4">
          <a href="#" className="icon">
            <FaInstagram />
          </a>
          <a href="#" className="icon">
            <FaTwitter />
          </a>

          <a href="https://github.com/Sreeharips1" className="icon">
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/sreehari-p-ba7b62244/"
            className="icon"
          >
            <FaLinkedin />
          </a>

          <a href="mailto:sreehariwsree@gmail.com" className="icon">
            <MdEmail />
          </a>
        </div>
      </div>

      {/* 🔻 bottom bar */}
      <div className="w-20 h-1 bg-gray-700 rounded-full mx-auto"></div>
    </div>
  );
};

export default ContactCard;
