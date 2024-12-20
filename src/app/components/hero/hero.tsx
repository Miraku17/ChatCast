"use client";
import React from "react";
import { FileText } from "lucide-react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

const CreatePDFsUI = () => {
  const controls = useAnimation();
  const lines = ["CREATE PDFs", "INSTANTLY"];

  React.useEffect(() => {
    const animateText = async () => {
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        await controls.start(i => ({
          opacity: 1,
          transition: { delay: i * 0.1 }
        }));
        // Pause between lines
        if (lineIndex < lines.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 550));
        }
      }
    };
    animateText();
  }, [controls, lines]);

  return (
    <div className="bg-[#EFE7F7] flex flex-col items-center p-4 sm:p-6 md:p-8 text-center relative overflow-hidden text-black mt-4">
      <div className="max-w-7xl w-full relative py-4 sm:py-6 md:py-8">
        <motion.div
          className="absolute left-0 top-1/4 transform -translate-y-1/2 w-1/6 h-1/3 hidden lg:block"
          animate={{
            y: ["-50%", "-70%", "-50%"],
            x: ["-10%", "10%", "-10%"],
            transition: {
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
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
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
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
        <div className="relative z-10 mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center leading-tight">
            {lines.map((line, lineIndex) => (
              <div key={lineIndex}>
                {line.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    custom={charIndex + lineIndex * line.length}
                    animate={controls}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg mt-3 sm:mt-4 md:mt-5 px-2 sm:px-4 max-w-2xl mx-auto"
          >
            Preserve AI-generated insights: Turn ephemeral ChatGPT conversations
            into lasting resources
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row justify-evenly space-y-6 sm:space-y-0 sm:space-x-2 md:space-x-4 relative z-10">
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
  icon?: React.ReactNode | string;
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
    transition: { duration: 0.3 },
  };

  if (!mainCard) {
    return (
      <motion.div
        whileHover={hoverAnimation}
        className={`${color} w-full sm:w-48 md:w-56 p-3 sm:p-4 md:p-5 rounded-3xl flex flex-col items-center justify-start relative border-2 border-black`}
      >
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-black rounded-full flex items-center justify-center border-2 border-black">
          {number && (
            <span className="text-white text-xs sm:text-sm font-bold">
              #{number}
            </span>
          )}
          {typeof icon === "string" && (
            <span className="text-white text-xs sm:text-sm">{icon}</span>
          )}
        </div>

        <div className="text-center mt-4 sm:mt-6">
          <h3
            className={`font-bold ${
              title === "4.9"
                ? "text-2xl sm:text-3xl md:text-4xl"
                : "text-base sm:text-lg md:text-xl"
            } mb-2`}
          >
            {title}
          </h3>
          <div className="mt-1 sm:mt-2">
            <p className="text-xs sm:text-sm">{description}</p>
            <p className="font-bold text-lg sm:text-xl md:text-2xl mt-1 sm:mt-2">
              {subDescription}
            </p>

            {image && (
              <div className="mt-3 sm:mt-4">
                <Image
                  src={image}
                  alt="Feature illustration"
                  height={40}
                  width={40}
                  objectFit="cover"
                  className="mx-auto"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={hoverAnimation}
      className={`${color} w-full sm:w-48 md:w-56 lg:w-1/3 p-3 sm:p-4 md:p-5 rounded-2xl flex flex-col items-center justify-center relative border-2 border-black`}
    >
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center border-2 border-black">
        {icon}
      </div>
      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2 sm:mb-3 mt-4 sm:mt-6">
        {title}
      </h3>
      <p className="text-xs sm:text-sm mb-3 sm:mb-4">{description}</p>
      <button className="mt-1 sm:mt-2 bg-white text-black px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors">
        Use Now
      </button>
    </motion.div>
  );
};

export default CreatePDFsUI;
