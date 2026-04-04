// import { FaDownload } from "react-icons/fa";

// const ResumeButton = () => {
//   return (
//     <a
//       href="/sreeharipshaiju_resume.pdf"
//       download="Sreehari_P_Shaiju_Resume.pdf"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="inline-flex items-center gap-2 px-5 py-2.5
//       bg-red-500 text-white text-sm font-semibold rounded-lg
//       border border-red-500
//       transition duration-300
//       hover:bg-white hover:text-red-500 hover:shadow-lg"
//     >
//       <FaDownload size={16} />
//       Download Resume
//     </a>
//   );
// };

// export default ResumeButton;

import React from "react";
import { FaDownload } from "react-icons/fa";

const ResumeButton = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/sreeharipshaiju_resume.pdf";
    link.download = "Sreehari_P_Shaiju_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-5 py-2.5
      bg-red-500 text-white text-sm font-semibold rounded-lg
      border border-red-500
      transition duration-300
      hover:bg-white hover:text-red-500 hover:shadow-lg"
    >
      <FaDownload size={16} />
      Download Resume
    </button>
  );
};

export default ResumeButton;
