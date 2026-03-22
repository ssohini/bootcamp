'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  image?: string;
  votes?: number;
  published?: string;
  onHover?: (isHovered: boolean) => void;
}

export default function BookCard({
  id,
  title,
  author,
  image,
  votes = 0,
  published,
  onHover,
}: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hover: boolean) => {
    setIsHovered(hover);
    onHover?.(hover);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -16 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => handleHover(true)}
      onHoverEnd={() => handleHover(false)}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full"
    >
      <div
        className={`
          h-full border-6 border-neo-black bg-neo-white p-6
          shadow-neo-lg transition-all duration-300 
          ${isHovered ? 'shadow-neo-xl' : 'shadow-neo'}
          flex flex-col justify-between
        `}
      >
        {/* Book Image Placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-neo-yellow to-neo-blue mb-6 border-4 border-neo-black flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center font-mono text-sm font-bold">
              [BOOK IMAGE]
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1">
          <h3 className="font-ranade text-xl font-bold mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="font-inter text-sm mb-3 text-gray-600">by {author}</p>

          {published && (
            <p className="font-mono text-xs mb-4 uppercase">
              Published: {new Date(published).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Vote Count */}
        <motion.div
          className="mb-4 p-3 bg-neo-yellow border-4 border-neo-black text-neo-black font-bold text-center"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        >
          {votes} VOTES
        </motion.div>

        {/* Action Button */}
        <button
          className="w-full border-4 border-neo-black bg-neo-white p-3 font-ranade font-bold uppercase text-sm shadow-neo hover:shadow-neo-lg hover:bg-neo-blue hover:text-neo-white transition-all duration-200"
        >
          View Poll
        </button>
      </div>
    </motion.div>
  );
}
