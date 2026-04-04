import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const FloatingMenu = ({ setSection }) => {
  const [open, setOpen] = useState(false);

  const items = [
    { name: "Address", index: 0 },
    { name: "Education", index: 1 },
    { name: "Hackathons", index: 2 },
    { name: "Certifications", index: 3 },
  ];

  return (
    <div className="absolute bottom-8 right-8 z-50">
      {/* 🔘 MAIN BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full 
        bg-red-500 flex items-center justify-center 
        shadow-[0_0_20px_rgba(255,0,0,0.5)]
        hover:scale-110 transition"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 📂 DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-48 p-4 rounded-xl 
            bg-gray-900/80 backdrop-blur-xl 
            border border-gray-700 shadow-xl"
          >
            <ul className="flex flex-col gap-3">
              {items.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      setSection(item.index);
                      setOpen(false);
                    }}
                    className="w-full text-left text-gray-300 
                    hover:text-red-500 transition"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingMenu;
