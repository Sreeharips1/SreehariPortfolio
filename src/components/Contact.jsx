import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

// 🚗 CAR
const Car = ({ triggerMove, submitMove, pointerX }) => {
  const { scene } = useGLTF("/models/car.glb");

  const group = useRef();
  const baseX = -2.5;
  const targetX = useRef(baseX);

  useFrame(() => {
    if (!group.current) return;

    // combine pointer + animation
    const finalX = baseX + pointerX.current + (targetX.current - baseX);

    group.current.position.x += (finalX - group.current.position.x) * 0.08;
  });

  // ✍️ typing small movement
  useEffect(() => {
    if (triggerMove) {
      targetX.current += 0.4;
    }
  }, [triggerMove]);

  // 🚀 submit animation
  useEffect(() => {
    if (submitMove) {
      targetX.current = 8;

      setTimeout(() => {
        targetX.current = 0;
      }, 1200);
    }
  }, [submitMove]);

  return (
    <group
      ref={group}
      scale={1.9}
      position={[-2.5, -2.8, 1.5]}
      rotation={[-0.8, Math.PI / 2, 0.29]} // ✅ YOUR ORIGINAL ANGLE (unchanged)
    >
      <primitive object={scene} />
    </group>
  );
};

const Contact = () => {
  const [triggerMove, setTriggerMove] = useState(false);
  const [submitMove, setSubmitMove] = useState(false);

  const pointerX = useRef(0);

  // 🖱️ MOUSE + TOUCH
  useEffect(() => {
    const handleMove = (x) => {
      pointerX.current = (x / window.innerWidth - 0.5) * 3;
    };

    const mouseMove = (e) => handleMove(e.clientX);
    const touchMove = (e) => handleMove(e.touches[0].clientX);

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", touchMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
    };
  }, []);

  // typing trigger
  const handleTyping = (e) => {
    setTriggerMove((prev) => !prev);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit trigger
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmitMove(true);

  //   setTimeout(() => setSubmitMove(false), 1500);
  // };

  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✍️ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ VALIDATION FUNCTION
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  // 🚀 SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMove(true);
    setTimeout(() => setSubmitMove(false), 1500);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY,
      )
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setForm({ name: "", email: "", message: "" });

        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => {
        setLoading(false);
        alert("Something went wrong. Try again.");
      });
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen  flex items-center justify-center px-4 py-10"
    >
      {/* ✅ EQUAL FLEX */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-stretch">
        {/* IMAGE + CAR */}
        <div className="flex-1 relative h-[320px] lg:h-[450px] rounded-2xl overflow-hidden ">
          {/* ✅ NO CROP */}
          <img
            src="/images/sreehari.png"
            alt="Sreehari"
            className="w-full h-full object-contain"
          />

          <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 2.5, 7], fov: 50 }}>
              <ambientLight intensity={2} />
              <directionalLight position={[5, 5, 5]} intensity={2} />
              <directionalLight position={[-5, 3, -5]} intensity={1.5} />
              <directionalLight position={[-5, 5, 5]} intensity={2} />
              <directionalLight position={[0, 5, -5]} intensity={1.5} />
              <pointLight position={[0, 2, 2]} intensity={3} />
              <pointLight position={[0, 1, -2]} intensity={2} />
              <hemisphereLight intensity={1} groundColor="black" />

              <Suspense fallback={null}>
                <Car
                  triggerMove={triggerMove}
                  submitMove={submitMove}
                  pointerX={pointerX}
                />
                <OrbitControls enableZoom={false} enableRotate={false} />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* FORM */}

        <motion.div
          className="flex-1 flex items-center justify-center bg-white rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-gray-200 p-8 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 mx-2 sm:mx-0 sm:m-8"
          whileHover={{ rotateX: 3, rotateY: -3 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <div className="w-full max-w-md mx-auto px-2 sm:px-0">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-red-500">Contact Me</h2>

              <div className="flex gap-2">
                <a
                  href="https://twitter.com/sreehari_srz"
                  target="_blank"
                  className="p-2 bg-black rounded-full hover:bg-red-500 hover:text-white transition"
                >
                  <FaTwitter size={25} />
                </a>

                <a
                  href="https://instagram.com/sreehari_srz"
                  target="_blank"
                  className="p-2 bg-black rounded-full hover:bg-red-500 hover:text-white transition"
                >
                  <FaInstagram size={25} />
                </a>
              </div>
            </div>

            {/* FORM */}
            <div className="flex flex-col gap-5 mt-2 justify-center">
              <form
                noValidate
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                {/* NAME */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleTyping}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleTyping}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* MESSAGE */}
                <div>
                  <textarea
                    rows="4"
                    name="message"
                    value={form.message}
                    onChange={handleTyping}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition active:scale-95"
                >
                  {loading ? "Sending..." : "Send Message "}
                </button>

                {/* SUCCESS */}
                {success && (
                  <p className="text-green-600 text-center text-sm font-medium">
                    ✅ Message sent successfully!
                  </p>
                )}
              </form>

              {/* WHATSAPP */}

              <div className=" flex flex-col justify-center mt-6 sm:mt-4 ">
                <a
                  href="https://wa.me/919526308646"
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl shadow-md transition"
                >
                  <FaWhatsapp size={25} />
                  WhatsApp Me
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
