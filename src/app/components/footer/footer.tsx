"use client";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const robotVariants = {
    animate: {
      y: [-5, 5],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <div className="w-full max-w-5xl bg-[#F5EAE7] mt-16 mx-auto flex text-black border-t-2 border-l-2 border-r-2 border-black rounded-t-lg">
      <div className="p-4 flex flex-col sm:flex-row w-full items-center sm:items-start">
        <div className="hidden sm:block font-extrabold text-xl sm:text-2xl mb-4 sm:mb-0 sm:mr-4 text-center sm:text-left">
          <p>Learn Faster.</p>
          <p>Organized better</p>
          <p>Easy Sharing</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 justify-center mb-4 sm:mb-0 sm:flex-grow sm:justify-center order-first sm:order-none">
          <div className="flex flex-col items-center sm:hidden">
            <motion.img
              src="/images/f-1.png"
              alt="Robot 1"
              className="w-20 h-20"
              animate="animate"
              variants={robotVariants}
            />
            <p className="font-extrabold text-xl mt-2">Learn Faster.</p>
          </div>
          <motion.img
            src="/images/f-1.png"
            alt="Robot 1"
            className="hidden sm:block w-20 h-20"
            animate="animate"
            variants={robotVariants}
          />

          <div className="flex flex-col items-center sm:hidden">
            <motion.img
              src="/images/f-2.png"
              alt="Robot 2"
              className="w-20 h-20"
              animate="animate"
              variants={robotVariants}
              transition={{ delay: 0.2 }}
            />
            <p className="font-extrabold text-xl mt-2">Organized better</p>
          </div>
          <motion.img
            src="/images/f-2.png"
            alt="Robot 2"
            className="hidden sm:block w-20 h-20"
            animate="animate"
            variants={robotVariants}
            transition={{ delay: 0.2 }}
          />

          <div className="flex flex-col items-center sm:hidden">
            <motion.img
              src="/images/f-3.png"
              alt="Robot 3"
              className="w-20 h-20"
              animate="animate"
              variants={robotVariants}
              transition={{ delay: 0.4 }}
            />
            <p className="font-extrabold text-xl mt-2">Easy Sharing</p>
          </div>
          <motion.img
            src="/images/f-3.png"
            alt="Robot 3"
            className="hidden sm:block w-20 h-20"
            animate="animate"
            variants={robotVariants}
            transition={{ delay: 0.4 }}
          />
        </div>
        <div className="hidden sm:flex items-center space-x-1 sm:ml-auto my-auto">
          <img
            src="https://github.com/shadcn.png"
            alt="User 1"
            className="w-6 h-6 rounded-full"
          />
          <img
            src="https://github.com/shadcn.png"
            alt="User 2"
            className="w-6 h-6 rounded-full"
          />
          <img
            src="https://github.com/shadcn.png"
            alt="User 3"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-xs font-semibold ml-1">
            Used by 1k+ users worldwide
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
