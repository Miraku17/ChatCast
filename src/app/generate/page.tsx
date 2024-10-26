"use client";

import React, { useState, useEffect } from "react";
import { Link, Loader } from "lucide-react";
import { motion, useAnimate } from "framer-motion";
import Image from "next/image";

interface Conversation {
  role: string;
  content: string;
}

const Page: React.FC = () => {
  const [linkInput, setLinkInput] = useState<string>("");
  const [scope, animate] = useAnimate();
  const [placeholderText, setPlaceholderText] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://chatcast-production.up.railway.app/generate/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: linkInput }),
      });

      if (response.ok) {
        // This will trigger the browser's download mechanism
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = ""; // Let the server's Content-Disposition header set the filename
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
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

  const formatMessage = (content: string) => {
    const lines = content.split("\n");

    return lines.map((line, index) => {
      if (line.startsWith("###")) {
        const headerText = line
          .replace(/^###\s*/, "")
          .replace(/\*\*(.*?)\*\*/, "$1");
        return (
          <p key={index} className="mt-2 py-3 font-bold text-xl">
            {headerText}
          </p>
        );
      }

      if (/\*\*(.*?)\*\*/.test(line)) {
        const boldText = line.replace(/\*\*(.*?)\*\*/, "$1");
        return (
          <p key={index} className="font-bold">
            {boldText}
          </p>
        );
      }

      if (line.includes("- ")) {
        const bulletText = line.replace(/^\s*-\s*/, "").trim();
        return (
          <li key={index} className="list-disc ml-4">
            {bulletText}
          </li>
        );
      }

      return <p key={index}>{line}</p>;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-24  text-black  mt-20">
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
          <Image
            src="/images/robot-2.png"
            alt="ChatGPT Link Processor"
            width={500}
            height={500}
            layout="responsive"
            priority
            className="rounded-lg"
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
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="mr-2 animate-spin" size={20} />
              ) : (
                <Link className="mr-2" size={20} />
              )}
              {isLoading ? "Processing..." : "Process Link"}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
