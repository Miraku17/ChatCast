import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-center w-full">
      <div className="w-full max-w-7xl px-4 py-3 bg-white rounded-md mt-6">
        <div className="flex items-center justify-between">
          <div className="items-center">
            <h1 className="text-3xl font-extrabold font-league-spartan ml-4 pt-2">
              ChatCast
            </h1>
          </div>

          <div className="flex space-x-6 font-semibold text-md">
            <p className="hover:text-purple-600 cursor-pointer">Features</p>
            <p className="hover:text-purple-600 cursor-pointer">Convert</p>
            <p className="hover:text-purple-600 cursor-pointer">About</p>
          </div>

          <div className="mr-4">
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 font-bold">
              Generate PDFs
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
