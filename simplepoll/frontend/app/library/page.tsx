'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import FloatingBookGrid from '@/components/FloatingBookGrid';
import UploadModal from '@/components/UploadModal';
import { motion } from 'framer-motion';

interface Poll {
  id: string;
  title: string;
  author: string;
  votes: number;
  published: string;
  image?: string;
}

export default function LibraryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      title: 'Best Programming Language?',
      author: 'Dev Community',
      votes: 1234,
      published: '2024-03-10',
    },
    {
      id: '2',
      title: 'Favorite React Patterns',
      author: 'Frontend Guild',
      votes: 856,
      published: '2024-03-09',
    },
    {
      id: '3',
      title: 'Web3 Future Predictions',
      author: 'Crypto Collective',
      votes: 2145,
      published: '2024-03-08',
    },
    {
      id: '4',
      title: 'Best TypeScript Features',
      author: 'Type Safety Team',
      votes: 567,
      published: '2024-03-07',
    },
    {
      id: '5',
      title: 'Next.js vs Other Frameworks',
      author: 'Next.js Community',
      votes: 1892,
      published: '2024-03-06',
    },
    {
      id: '6',
      title: 'CSS-in-JS Solutions Showdown',
      author: 'Style Squad',
      votes: 743,
      published: '2024-03-05',
    },
    {
      id: '7',
      title: 'API Design Patterns',
      author: 'Backend Architects',
      votes: 923,
      published: '2024-03-04',
    },
    {
      id: '8',
      title: 'Best State Management',
      author: 'State Masters',
      votes: 1456,
      published: '2024-03-03',
    },
    {
      id: '9',
      title: 'Frontend Testing Strategies',
      author: 'QA Community',
      votes: 678,
      published: '2024-03-02',
    },
  ]);

  const filteredPolls = polls.filter((poll) =>
    poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poll.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePoll = (data: any) => {
    const newPoll: Poll = {
      id: Date.now().toString(),
      title: data.title,
      author: 'You',
      votes: 0,
      published: new Date().toISOString(),
    };
    setPolls([newPoll, ...polls]);
  };

  return (
    <>
      <Navigation onCreatePoll={() => setIsModalOpen(true)} />

      <main className="min-h-screen bg-neo-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-16">
              <h1 className="font-space text-6xl font-bold mb-4 border-b-6 border-neo-black pb-4">
                Poll Library
              </h1>
              <p className="font-inter text-lg text-gray-700">
                Explore {polls.length} community polls and cast your vote
              </p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-12">
              <input
                type="text"
                placeholder="Search polls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-6 border-neo-black p-4 font-inter text-lg focus:outline-none focus:border-neo-blue placeholder-gray-400"
              />
            </div>
          </motion.div>

          {/* Filter & Sort */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-12 flex gap-4 flex-wrap">
              <button className="border-4 border-neo-black bg-neo-yellow text-neo-black px-6 py-3 font-space font-bold uppercase text-sm shadow-neo hover:shadow-neo-lg transition-all">
                Most Voted
              </button>
              <button className="border-4 border-neo-black bg-neo-white text-neo-black px-6 py-3 font-space font-bold uppercase text-sm shadow-neo hover:shadow-neo-lg transition-all">
                Newest
              </button>
              <button className="border-4 border-neo-black bg-neo-white text-neo-black px-6 py-3 font-space font-bold uppercase text-sm shadow-neo hover:shadow-neo-lg transition-all">
                Trending
              </button>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-8 font-space text-sm uppercase font-bold text-gray-600">
            {filteredPolls.length} polls found
          </div>

          {/* Polls Grid */}
          <FloatingBookGrid
            books={filteredPolls}
            title=""
            description=""
          />

          {filteredPolls.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center py-20">
                <p className="font-space text-2xl font-bold mb-4">No polls found</p>
                <p className="font-inter text-gray-600">Try adjusting your search</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePoll}
      />
    </>
  );
}
