import React from "react";
import { Download, Zap, ThumbsUp } from "lucide-react";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-sm mx-auto p-4">
      <div className="bg-white p-3 rounded-xl mb-4 shadow-md">
        {icon}
      </div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
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
    <div className="py-12 px-4 ">
      <h1 className="font-normal text-3xl text-center mb-12">Features</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesComponent;