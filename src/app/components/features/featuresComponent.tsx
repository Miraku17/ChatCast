"use client"
import React from "react";
import { Download, Zap, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const Card: React.FC<CardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center w-full max-w-sm mx-auto p-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="bg-white p-3 rounded-xl mb-4 shadow-md">
        {icon}
      </div>
      <h2 className="text-lg font-semibold mb-2 text-black">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

const FeaturesComponent = () => {
  const features = [
    {
      icon: <Download className="text-blue-500" size={24} />,
      title: "Instant Download",
      description: "Get your files immediately with our quick download feature."
    },
    {
      icon: <Zap className="text-yellow-400" size={24} />,
      title: "Fast",
      description: "Experience lightning-fast processing and conversion speeds."
    },
    {
      icon: <ThumbsUp className="text-green-500" size={24} />,
      title: "Easy",
      description: "User-friendly interface for effortless file management."
    }
  ];

  return (
    <div className="py-12 px-4">
      <motion.h1 
        className="font-normal text-3xl text-center mb-12 text-black"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        Features
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesComponent;