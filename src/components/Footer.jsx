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

const Footer = () => {
  return (
    <footer className="w-full py-10 flex flex-col items-center justify-center relative">
      {/* 🔥 GLASS BACKGROUND */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md -z-10 border-t border-gray-800" />

      {/* 🔘 ICONS */}
      <div className="flex flex-wrap justify-center gap-5 mb-6">
        <a href="#" className="icon">
          <FaInstagram />
        </a>

        <a href="#" className="icon">
          <FaTwitter />
        </a>

        <a
          href="https://github.com/Sreeharips1"
          target="_blank"
          rel="noreferrer"
          className="icon"
        >
          <FaGithub />
        </a>

        <a
          href="https://linkedin.com/in/sreehari-p-ba7b62244/"
          target="_blank"
          rel="noreferrer"
          className="icon"
        >
          <FaLinkedin />
        </a>

        <a href="mailto:sreehariwsree@gmail.com" className="icon">
          <MdEmail />
        </a>

        <a
          href="https://wa.me/919526308646"
          target="_blank"
          rel="noreferrer"
          className="icon"
        >
          <FaWhatsapp />
        </a>

        <a href="tel:9995258646" className="icon">
          <FaPhone />
        </a>
      </div>

      {/* 🔻 COPYRIGHT */}
      <p className="text-gray-400 text-sm text-center">
        © 2026 Sreehari P Shaiju. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
