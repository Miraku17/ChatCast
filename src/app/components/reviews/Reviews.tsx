"use client"
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface ReviewsProps {
  image: string;
  review: string;
  name: string;
  position: string;
  rating: number;
}

const ReviewsCard: React.FC<ReviewsProps & { index: number }> = ({
  image,
  review,
  name,
  position,
  rating,
  index,
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center w-full max-w-sm bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
    >
      <Image
        src={image}
        alt={`Portrait of ${name}`}
        height={100}
        width={100}
        objectFit="cover"
        className="rounded-full mb-4"
      />
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600 mb-4">{review}</p>
      <div className="mt-auto">
        <p className="text-sm font-bold text-gray-800">{name}</p>
        <p className="text-xs text-gray-600">{position}</p>
      </div>
    </motion.div>
  );
};

const Reviews = () => {
  const reviews = [
    {
      image: "/images/1.png",
      review: "ChatCast has revolutionized how I document my AI interactions. The AI-enhanced editing is a game-changer!",
      name: "Sarah T.",
      position: "Content Creator",
      rating: 5,
    },
    {
      image: "/images/2.png",
      review: "As a developer, I appreciate the clean format ChatCast provides. It makes reviewing and sharing AI conversations a breeze.",
      name: "Alex M.",
      position: "Software Engineer",
      rating: 4,
    },
    {
      image: "/images/3.png",
      review: "ChatCast's intuitive interface and quick PDF generation have significantly streamlined my workflow. Highly recommended!",
      name: "Emily R.",
      position: "UX Researcher",
      rating: 5,
    },
  ];

  return (
    <div className="py-12 px-4 bg-gray-50">
      <motion.h2 
        className="font-semibold text-3xl text-center mb-8 text-black"
        initial={{ opacity: 0, rotateX: -50 }}
        whileInView={{ opacity: 1, rotateX: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        What people are saying about ChatCast
      </motion.h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <ReviewsCard
            key={index}
            image={review.image}
            review={review.review}
            name={review.name}
            position={review.position}
            rating={review.rating}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;