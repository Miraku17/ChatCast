"use client";
import React, { useState, useEffect } from "react";
import { Link } from "lucide-react";
import { motion, useAnimate } from "framer-motion";

const Page = () => {
  const [linkInput, setLinkInput] = useState("");
  const [scope, animate] = useAnimate();
  const [placeholderText, setPlaceholderText] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Submitted link:", linkInput);
    // Add your logic here to process the ChatGPT link
  };

  useEffect(() => {
    const text = "Paste your ChatGPT prompt link here";
    let i = 0;
    const intervalId = setInterval(() => {
      setPlaceholderText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
        setShowInput(true);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (showInput) {
      animate(
        scope.current,
        { y: [20, 0], opacity: [0, 1] },
        { duration: 0.5 }
      );
    }
  }, [animate, scope, showInput]);

  return (
    <div className="flex items-center justify-center py-8 mt-8">
      <div className="flex flex-col md:flex-row items-center max-w-4xl w-full">
        <motion.div
          className="w-full md:w-1/2 p-4"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
            transition: {
              duration: 2,
              y: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
                ease: "easeInOut",
              },
            },
          }}
        >
          <img
            src="/images/robot-2.png"
            alt="ChatGPT Link Processor"
            className="w-full h-auto rounded-lg"
          />
        </motion.div>
        <div className="w-full md:w-1/2 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {showInput ? (
              <motion.input
                ref={scope}
                type="url"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder={placeholderText}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
            ) : (
              <div className="w-full px-4 py-2 border border-gray-300 rounded-md">
                {placeholderText}
              </div>
            )}
            <motion.button
              type="submit"
              className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300 ease-in-out flex items-center justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
                delay: 0.5,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link className="mr-2" size={20} />
              Process Link
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
