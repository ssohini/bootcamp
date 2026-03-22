'use client';

import Navigation from '@/components/Navigation';
import VerificationBadge from '@/components/VerificationBadge';
import { motion } from 'framer-motion';

interface UserPoll {
  id: string;
  title: string;
  votes: number;
  status: 'active' | 'closed';
  createdAt: string;
  endsAt: string;
}

export default function DashboardPage() {
  const userPolls: UserPoll[] = [
    {
      id: '1',
      title: 'Best Programming Language?',
      votes: 1234,
      status: 'active',
      createdAt: '2024-03-10',
      endsAt: '2024-03-20',
    },
    {
      id: '2',
      title: 'Favorite Framework',
      votes: 856,
      status: 'active',
      createdAt: '2024-03-09',
      endsAt: '2024-03-19',
    },
    {
      id: '3',
      title: 'Backend Preferences',
      votes: 2145,
      status: 'closed',
      createdAt: '2024-02-28',
      endsAt: '2024-03-08',
    },
  ];

  const stats = [
    { label: 'Total Polls Created', value: '12' },
    { label: 'Total Votes Received', value: '4,235' },
    { label: 'Active Polls', value: '2' },
    { label: 'Completed Polls', value: '10' },
  ];

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-neo-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="font-space text-6xl font-bold border-b-6 border-neo-black pb-4">
                  Dashboard
                </h1>
                <VerificationBadge verified={true} text="Verified" animated={true} />
              </div>
              <p className="font-inter text-lg text-gray-700">
                Manage your polls and view voting analytics
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                >
                  <div className="border-6 border-neo-black bg-neo-white p-6 shadow-neo-lg text-center">
                    <p className="font-inter text-3xl md:text-4xl font-bold mb-2">
                      {stat.value}
                    </p>
                    <p className="font-space text-sm uppercase font-bold text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* My Polls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-space text-3xl font-bold mb-8 border-b-4 border-neo-black pb-4">
              Your Polls
            </h2>

            <div className="space-y-6">
              {userPolls.map((poll, idx) => (
                <motion.div
                  key={poll.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="border-6 border-neo-black bg-neo-white p-6 shadow-neo-lg hover:shadow-neo-xl transition-all">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-space text-2xl font-bold mb-2">
                        {poll.title}
                      </h3>
                      <div className="flex gap-4 text-sm font-mono">
                        <span>Created: {poll.createdAt}</span>
                        <span>Ends: {poll.endsAt}</span>
                      </div>
                    </div>
                    <span
                      className={`
                        px-4 py-2 font-space font-bold uppercase text-sm border-4
                        ${
                          poll.status === 'active'
                            ? 'border-neo-green bg-neo-green text-neo-white'
                            : 'border-neo-black bg-neo-white text-neo-black'
                        }
                      `}
                    >
                      {poll.status}
                    </span>
                  </div>

                  <div className="mb-4 p-4 bg-gray-100 border-4 border-neo-black">
                    <p className="font-inter text-sm text-gray-600">
                      Total Votes
                    </p>
                    <p className="font-space text-3xl font-bold">
                      {poll.votes.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 border-4 border-neo-black bg-neo-white text-neo-black px-4 py-2 font-space font-bold uppercase text-sm shadow-neo hover:shadow-neo-lg transition-all">
                      View Results
                    </button>
                    <button className="flex-1 border-4 border-neo-black bg-neo-white text-neo-black px-4 py-2 font-space font-bold uppercase text-sm shadow-neo hover:shadow-neo-lg transition-all">
                      Edit
                    </button>
                    {poll.status === 'active' && (
                      <button className="flex-1 border-4 border-neo-red bg-neo-white text-neo-red px-4 py-2 font-space font-bold uppercase text-sm shadow-neo hover:shadow-neo-lg hover:bg-neo-red hover:text-neo-white transition-all">
                        Close
                      </button>
                    )}
                  </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Empty State Message */}
          {userPolls.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center py-20">
                <p className="font-space text-2xl font-bold mb-4">
                  No polls created yet
                </p>
                <p className="font-inter text-gray-600 mb-6">
                  Create your first poll to get started!
                </p>
                <button className="border-4 border-neo-black bg-neo-yellow text-neo-black px-8 py-3 font-space font-bold uppercase shadow-neo hover:shadow-neo-lg transition-all">
                  Create Poll
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
