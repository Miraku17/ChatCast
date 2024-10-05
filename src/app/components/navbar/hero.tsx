"use client";
import React from "react";
import { FileText } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const CreatePDFsUI = () => {
  return (
    <div className="bg-[#EFE7F7]  flex flex-col items-center p-4 sm:p-8 text-center relative overflow-hidden h[100vh]">
      <div className="max-w-7xl w-full relative">
        <motion.div
          className="absolute left-0 top-1/4 transform -translate-y-1/2 w-1/6 h-1/3 hidden lg:block"
          animate={{
            y: ["-50%", "-70%", "-50%"],
            x: ["-10%", "10%", "-10%"],
            transition: {
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
        >
          <Image
            src="/images/bubble-1.png"
            alt="Left decorative image"
            layout="fill"
            objectFit="contain"
          />
        </motion.div>
        <motion.div
          className="absolute right-0 top-1/4 transform -translate-y-1/2 w-1/6 h-1/3 hidden lg:block"
          animate={{
            y: ["-50%", "-30%", "-50%"],
            rotate: [0, 10, 0, -10, 0],
            x: ["10%", "-10%", "10%"],
            transition: {
              y: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
        >
          <Image
            src="/images/bubble-2.png"
            alt="Right decorative image"
            layout="fill"
            objectFit="contain"
          />
        </motion.div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center">
            CREATE PDFs
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-center">
            INSTANTLY
          </h1>
          <p className="text-base sm:text-lg mb-8 sm:mb-12 px-4">
            Preserve AI-generated insights: Turn ephemeral ChatGPT conversations
            into lasting resources
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly mb-8 sm:mb-12 space-y-4 md:space-y-0 md:space-x-4 relative z-10 py-4">
          <FeatureCard
            number="1"
            title="Easy PDF Download"
            description="Transform ChatGPT conversations into professional PDFs instantly"
            color="bg-purple-200"
          />
          <FeatureCard
            icon={<FileText size={24} />}
            title="One Click Away!"
            description="Simply paste your ChatGPT conversation link, click 'Generate PDF', and download your formatted document"
            color="bg-yellow-200"
            mainCard={true}
          />
          <FeatureCard
            icon="⭐"
            title="4.9"
            description="#satisfied"
            subDescription="chatCasters"
            color="bg-purple-200"
            image={"/images/robot.png"}
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  number?: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  subDescription?: string;
  color: string;
  image?: string;
  mainCard?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  number,
  icon,
  title,
  description,
  subDescription,
  color,
  image,
  mainCard = false,
}) => {
  const hoverAnimation = {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
    },
  };

  if (!mainCard) {
    return (
      <motion.div
        whileHover={hoverAnimation}
        className={`${color} w-56 h-56 mt-2 p-6 rounded-3xl flex flex-col items-center justify-start relative border-2 border-black`}
      >
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-black rounded-full flex items-center justify-center border-2 border-black">
          {number && (
            <span className="text-white text-sm font-bold">#{number}</span>
          )}
          {icon && <span className="text-white text-sm">{icon}</span>}
        </div>

        <div className="text-center mt-4">
          <h3
            className={`font-bold ${title === "4.9" ? "text-4xl" : "text-xl"}`}
          >
            {title}
          </h3>
          <div className="mt-1">
            <p className="text-sm ">{description}</p>
            <p className="font-bold text-2xl">{subDescription}</p>

            {image && (
              <Image
                src={image}
                alt="Feature illustration"
                height={70}
                width={70}
                objectFit="cover"
                className="mx-auto"
              />
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Original design for the main card
  return (
    <motion.div
      whileHover={hoverAnimation}
      className={`${color} w-full md:w-1/3 p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center relative border-2 border-black`}
    >
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-black">
        {icon && <span className="text-black text-sm">{icon}</span>}
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 mt-6">{title}</h3>
      <p className="text-xs sm:text-sm">{description}</p>
      <button className="mt-4 bg-white text-black px-3 sm:px-4 py-1 sm:py-2  text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors ">
        Use Now
      </button>
    </motion.div>
  );
};

export default CreatePDFsUI;
