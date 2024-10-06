import React from "react";
import CreatePDFsUI from "./components/hero/hero";
import FeaturesComponent from "./components/features/featuresComponent";
import Reviews from "./components/reviews/Reviews";
const page = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto">
        <CreatePDFsUI />
        <FeaturesComponent />
      </div>

      <div className="bg-white mt-12 rounded-lg shadow-lg">
            <Reviews />
      </div>
    </div>
  );
};

export default page;
