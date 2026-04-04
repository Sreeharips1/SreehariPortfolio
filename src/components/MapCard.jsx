// MapCard.jsx
import React from "react";

const MapCard = () => {
  return (
    <div className="w-[260px] h-[480px] rounded-[40px] bg-black border border-gray-700 shadow-xl overflow-hidden flex flex-col">
      {/* notch */}
      <div className="w-24 h-5 bg-gray-800 rounded-full mx-auto mt-2 mb-2"></div>

      {/* map */}
      <div className="flex-1 overflow-hidden rounded-b-[40px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31403.36147576352!2d76.33165279999999!3d10.308218200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080269866481a9%3A0x6b5ec1dc50c0402d!2sChalakudy%2C%20Kerala"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          title="Map"
        ></iframe>
      </div>

      {/* bottom bar */}
      <div className="w-20 h-1 bg-gray-700 rounded-full mx-auto my-2"></div>
    </div>
  );
};

export default MapCard;
