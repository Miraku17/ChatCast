"use client"
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex justify-center w-full text-black">
      <div className="w-full max-w-7xl px-4 py-3 bg-white rounded-md mt-6 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-league-spartan ml-2 sm:ml-4 pt-2 hover:cursor-pointer" onClick={() => handleNavigation("/")}>
              ChatCast
            </h1>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 font-semibold text-md">
            <p className="hover:text-purple-600 cursor-pointer" onClick={() => handleNavigation("/")}>Features</p>
            <p className="hover:text-purple-600 cursor-pointer" onClick={() => handleNavigation("/generate")}>Convert</p>
            <p className="hover:text-purple-600 cursor-pointer" onClick={() => handleNavigation("/about")}>About</p>
          </div>

          <div className="hidden md:block">
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 font-bold text-sm sm:text-base" onClick={() => handleNavigation("/generate")}>
              Generate PDFs
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4 font-semibold text-md">
              <p className="hover:text-purple-600 cursor-pointer" onClick={() => handleNavigation("/")}>Features</p>
              <p className="hover:text-purple-600 cursor-pointer" onClick={() => handleNavigation("/generate")}>Convert</p>
              <p className="hover:text-purple-600 cursor-pointer" onClick={() => handleNavigation("/about")}>About</p>
            </div>
            <div className="mt-4">
              <button className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 font-bold text-sm sm:text-base" onClick={() => handleNavigation("/generate")}>
                Generate PDFs
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;