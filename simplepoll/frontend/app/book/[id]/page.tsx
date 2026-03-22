'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import VerificationBadge from '@/components/VerificationBadge';
import { motion } from 'framer-motion';

interface Option {
  id: string;
  text: string;
  votes: number;
}

export default function PollPage({ params }: { params: { id: string } }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Mock poll data - in real app, fetch based on params.id
  const poll = {
    id: params.id,
    title: 'Best Programming Language?',
    author: 'Dev Community',
    description:
      'Which programming language do you think is the best for building modern applications? Share your preference!',
    createdAt: '2024-03-10',
    endsAt: '2024-03-20',
    totalVotes: 1234,
    verified: true,
    options: [
      { id: '1', text: 'TypeScript', votes: 524 },
      { id: '2', text: 'Python', votes: 398 },
      { id: '3', text: 'Go', votes: 189 },
      { id: '4', text: 'Rust', votes: 123 },
    ] as Option[],
  };

  const handleVote = (optionId: string) => {
    setSelectedOption(optionId);
    setHasVoted(true);
  };

  const getPercentage = (votes: number) => {
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-neo-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Poll Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-12">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="font-space text-5xl font-bold text-neo-black flex-1">
                  {poll.title}
                </h1>
                {poll.verified && (
                  <VerificationBadge verified={true} animated={true} />
                )}
              </div>
              
              <p className="font-inter text-lg text-gray-600 mb-4">
                by {poll.author}
              </p>

              <p className="font-inter text-gray-700 mb-6 leading-relaxed">
                {poll.description}
              </p>

              <div className="flex gap-6 text-sm font-mono text-gray-600 border-t-4 border-neo-black pt-4">
                <span>📅 Created: {poll.createdAt}</span>
                <span>⏰ Ends: {poll.endsAt}</span>
                <span>🗳️ Total Votes: {poll.totalVotes.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Voting Section */}
          <div className="border-6 border-neo-black bg-neo-white p-8 shadow-neo-lg mb-12">
            <h2 className="font-space text-2xl font-bold mb-8 uppercase">
              Cast Your Vote
            </h2>

            <div className="space-y-4 mb-8">
              {poll.options.map((option, idx) => {
                const percentage = getPercentage(option.votes);
                const isSelected = selectedOption === option.id;

                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <button
                      onClick={() => !hasVoted && handleVote(option.id)}
                      disabled={hasVoted}
                      className={`
                        w-full relative overflow-hidden border-4
                        ${
                          isSelected
                            ? 'border-neo-blue bg-neo-blue text-neo-white'
                            : 'border-neo-black bg-neo-white text-neo-black'
                        }
                        ${hasVoted ? 'cursor-default' : 'cursor-pointer'}
                        p-4 text-left font-inter font-bold transition-all hover:shadow-neo-lg
                      `}
                    >
                    {/* Progress Bar Background */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: hasVoted ? `${percentage}%` : 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: isSelected ? 'rgba(0, 102, 255, 0.4)' : '#f3f4f6',
                      }}
                    />

                    {/* Content */}
                    <div className="relative flex items-center justify-between">
                      <span>{option.text}</span>
                      {hasVoted && (
                        <span className="text-sm font-mono">
                          {option.votes} ({percentage}%)
                        </span>
                      )}
                    </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {!hasVoted ? (
              <button
                onClick={() => selectedOption && handleVote(selectedOption)}
                disabled={!selectedOption}
                className={`
                  w-full border-4 border-neo-black px-6 py-4
                  font-space font-bold text-lg uppercase shadow-neo-lg
                  transition-all
                  ${
                    selectedOption
                      ? 'bg-neo-yellow text-neo-black hover:shadow-neo-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Submit Vote
              </button>
            ) : (
              <div className="w-full border-4 border-neo-green bg-neo-green text-neo-white p-4 font-space font-bold text-lg text-center uppercase shadow-neo-lg">
                ✓ Vote Submitted Successfully
              </div>
            )}
          </div>

          {/* Results Section */}
          <div>
            <h2 className="font-space text-2xl font-bold mb-8 uppercase border-b-4 border-neo-black pb-4">
              Live Results
            </h2>

            <div className="space-y-6">
              {poll.options
                .sort((a, b) => b.votes - a.votes)
                .map((option, idx) => {
                  const percentage = getPercentage(option.votes);

                  return (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="border-4 border-neo-black bg-neo-white p-6 shadow-neo">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-inter font-bold text-lg">
                          {option.text}
                        </h4>
                        <span className="font-space font-bold text-2xl">
                          {percentage}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-12 border-4 border-neo-black bg-gray-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                          style={{
                            height: '100%',
                            backgroundImage: 'linear-gradient(to right, #FFD700, #0066FF)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <span className="text-neo-black font-bold text-sm font-mono px-2">
                            {option.votes} votes
                          </span>
                        </motion.div>
                      </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-16 border-6 border-neo-black bg-neo-yellow p-8 shadow-neo-lg text-center">
            <h3 className="font-space text-2xl font-bold mb-4 uppercase">
              Share This Poll
            </h3>
            <div className="flex gap-4 justify-center">
              <button className="border-4 border-neo-black bg-neo-white px-6 py-3 font-space font-bold uppercase text-sm shadow-neo hover:shadow-neo-lg transition-all">
                Twitter
              </button>
              <button className="border-4 border-neo-black bg-neo-white px-6 py-3 font-space font-bold uppercase text-sm shadow-neo hover:shadow-neo-lg transition-all">
                Discord
              </button>
              <button className="border-4 border-neo-black bg-neo-white px-6 py-3 font-space font-bold uppercase text-sm shadow-neo hover:shadow-neo-lg transition-all">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
