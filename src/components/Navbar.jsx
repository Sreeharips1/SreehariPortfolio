import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";
import sreelogo from "../assets/sreelogo.png";
import ResumeButton from "./ResumeButton";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, settoggle] = useState(false);
  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-50 bg-primary font-Cardo`}
    >
      <div className="w-[90%] flex justify-between items-center max-w-7xl mx-auto">
        <Link
          className="flex items-center gap-2"
          to="/"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={sreelogo} alt="logo" className="w-16 h-16 object-contain" />
          <p className="text-white text-[12px] font-bold cursor-pointer hover:text-blue-400">
            SREEHARI P SHAIJU |
            <span className="sm:block hidden hover:text-red-400">
              DEVELOPER
            </span>
            <ResumeButton />
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-red-500" : "text-secondary"
              } 
              
              hover:text-blue-400 text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="togglemenu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => settoggle(!toggle)}
          />
          <div
            className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[150px] z-10 rounded-xl`}
          >
            <ul className="list-none flex  items-center flex-col gap-4 w-full">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-red-500" : "text-secondary"
                  } 
              
              font-Caveat font-medium cursor-pointer text-[16px] text-center w-full`}
                  onClick={() => {
                    settoggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
