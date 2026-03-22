'use client';

import { motion } from 'framer-motion';
import BookCard from './BookCard';

interface Book {
  id: string;
  title: string;
  author: string;
  image?: string;
  votes?: number;
  published?: string;
}

interface FloatingBookGridProps {
  books: Book[];
  title?: string;
  description?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function FloatingBookGrid({
  books,
  title = 'Poll Library',
  description = 'Explore community polls and cast your vote',
}: FloatingBookGridProps) {
  return (
    <section className="w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-ranade text-5xl md:text-6xl font-bold mb-4 border-b-6 border-neo-black pb-4">
            {title}
          </h2>
          <p className="font-inter text-lg text-gray-700 max-w-2xl">
            {description}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {books.map((book, idx) => (
            <motion.div key={book.id} variants={itemVariants}>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  delay: idx * 0.2,
                  repeat: Infinity,
                }}
              >
                <BookCard {...book} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
