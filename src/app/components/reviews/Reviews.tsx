import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface ReviewsProps {
  image: string;
  review: string;
  name: string;
  position: string;
  rating: number;
}

const ReviewsCard: React.FC<ReviewsProps> = ({
  image,
  review,
  name,
  position,
  rating,
}) => {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-sm bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
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
    </div>
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
    <div className="py-12 px-4 bg-gray-50 text-black">
      <h2 className="font-semibold text-3xl text-center mb-8">
        What people are saying about ChatCast
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <ReviewsCard
            key={index}
            image={review.image}
            review={review.review}
            name={review.name}
            position={review.position}
            rating={review.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;