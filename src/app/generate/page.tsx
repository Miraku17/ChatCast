"use client";
import React, { useState, useEffect } from "react";
import { Link, Loader } from "lucide-react";
import { motion, useAnimate } from "framer-motion";

// Define the structure of the conversation data
interface Conversation {
  user: string;
  ai: string;
}

const Page: React.FC = () => {
  const [linkInput, setLinkInput] = useState<string>("");
  const [scope, animate] = useAnimate();
  const [placeholderText, setPlaceholderText] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setConversations([]);

    try {
      const response = await fetch('/api/fetchData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: linkInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      
      // Ensure the data structure matches the expected format
      if (Array.isArray(data.conversations)) {
        setConversations(data.conversations);
      } else {
        throw new Error('Invalid data structure');
      }
    } catch (error) {
      console.error('Error:', error);
      setError("Failed to process the link. Please try again.");
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

  return (
    <div className="flex flex-col items-center justify-center py-8 mt-8 text-black">
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
          <img
            src="/images/robot-2.png"
            alt="ChatGPT Link Processor"
            className="w-full h-auto rounded-lg"
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
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
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
          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}
        </div>
      </div>
      {conversations.length > 0 && (
        <motion.div
          className="mt-8 w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Conversation</h2>
          {conversations.map((conv, index) => (
            <motion.div
              key={index}
              className="mb-4 p-4 border rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="font-semibold mb-2">User: {conv.user}</p>
              <p>AI: {conv.ai}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Page;
