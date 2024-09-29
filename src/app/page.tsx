import React from 'react';
import { FileText, Folder } from 'lucide-react';

const CreatePDFsUI = () => {
  return (
    <div className="bg-[#EFE7F7] min-h-screen flex flex-col items-center p-8 text-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-7xl font-extrabold text-center">CREATE PDFs</h1>
        <h1 className="text-7xl font-extrabold mb-4 text-center">INSTANTLY</h1>
        <p className="text-lg mb-12">
          Preserve AI-generated insights: Turn ephemeral ChatGPT conversations into lasting resources
        </p>
        
        <div className="flex justify-between mb-12">
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
            description="#satisfied chatCasters"
            color="bg-purple-200"
          />
        </div>
        
        <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
          Use Now
        </button>
      </div>
    </div>
  );
};

const FeatureCard = ({ number, icon, title, description, color, mainCard = false }) => {
  return (
    <div className={`${color} ${mainCard ? 'w-1/3' : 'w-1/4'} p-6 rounded-2xl flex flex-col items-center justify-center`}>
      {number && <div className="text-2xl font-bold mb-2">#{number}</div>}
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
      {mainCard && (
        <button className="mt-4 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
          Use Now
        </button>
      )}
    </div>
  );
};

export default CreatePDFsUI;