'use client';

import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import AnimatedHero from '@/components/AnimatedHero';
import FloatingBookGrid from '@/components/FloatingBookGrid';
import UploadModal from '@/components/UploadModal';
import { motion } from 'framer-motion';
import { storePollOnChain } from '@/lib/soroban';

interface Poll {
  id: string;
  title: string;
  author: string;
  votes: number;
  published: string;
  image?: string;
  options?: string[];
  transactionHash?: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
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
  ]);

  const handleCreatePoll = async (data: any) => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const newPoll: Poll = {
        id: Date.now().toString(),
        title: data.title,
        author: 'You',
        votes: 0,
        published: new Date().toISOString(),
        options: data.options,
      };

      // Store on blockchain
      if (walletAddress) {
        alert('Creating poll on blockchain...');
        const txHash = await storePollOnChain(
          {
            ...newPoll,
            author: walletAddress,
            timestamp: Date.now(),
          },
          walletAddress
        );
        newPoll.transactionHash = txHash;
        alert(`Poll created! Transaction: ${txHash}`);
      }

      setPolls([newPoll, ...polls]);
    } catch (error) {
      console.error('Error creating poll:', error);
      alert(`Failed to create poll: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setIsWalletConnected(true);
    console.log('Wallet connected:', address);
  };

  return (
    <>
      <ParticleBackground />
      <Navigation 
        onCreatePoll={() => setIsModalOpen(true)} 
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        onWalletConnect={handleWalletConnect}
      />
      
      <main className="relative z-10 min-h-screen">
        {/* Y2K Main Grid Layout */}
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Left Sidebar - Profile/About Section */}
          <div className="md:col-span-1">
            {/* About Section */}
            <div className="y2k-section mb-4 neon-chrome">
              <div className="y2k-section-title">📌 About SimplePoll</div>
              <p className="font-caveat text-y2k-hotpink text-xl mb-2" style={{textShadow: '0 0 10px rgba(255, 20, 147, 0.5)'}}>Welcome 2 the future of voting! 🚀</p>
              <p className="text-white text-xs leading-relaxed">
                Create and vote on decentralized polls powered by Soroban smart contracts on the Stellar blockchain. Your voice, secured on-chain.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="y2k-section mb-4 neon-chrome">
              <div className="y2k-section-title">📊 Stats</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white">
                  <span>Total Polls:</span>
                  <span className="font-bold text-y2k-cyan">{polls.length}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Total Votes:</span>
                  <span className="font-bold text-y2k-lime">12.5K+</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Active Users:</span>
                  <span className="font-bold text-y2k-hotpink">2.3K</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="y2k-section neon-chrome">
              <div className="y2k-section-title">🔗 Links</div>
              <div className="space-y-2">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full text-left text-y2k-cyan hover:text-y2k-hotpink text-sm py-1 page-link"
                >
                  → Create Poll
                </button>
                <button 
                  className="w-full text-left text-y2k-cyan hover:text-y2k-hotpink text-sm py-1 page-link"
                >
                  → View Library
                </button>
                <button 
                  className="w-full text-left text-y2k-cyan hover:text-y2k-hotpink text-sm py-1 page-link"
                >
                  → Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            {/* Featured Polls Widget */}
            <div className="y2k-section mb-4">
              <div className="y2k-section-title cursive">⭐ Featured Polls</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {polls.slice(0, 4).map((poll) => (
                  <motion.div
                    key={poll.id}
                    whileHover={{ y: -4 }}
                    className="poll-card"
                  >
                    <div className="poll-card-content">
                      <h4 className="poll-card-title">
                        {poll.title}
                      </h4>
                      <div className="poll-card-meta">
                      <p className="poll-card-author doodle-accent">By: {poll.author}</p>
                      <p className="poll-card-votes doodle-accent"><span className="circle-accent"></span> {poll.votes} votes</p>
                      </div>
                    </div>
                    <div className="poll-card-footer">
                      <span className="text-y2k-cyan text-xs"></span>
                      <button className="poll-vote-btn">
                        Vote →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Why SimplePoll Widget */}
            <div className="y2k-section mb-4">
              <div className="y2k-section-title">💡 Why SimplePoll?</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="border-2 border-y2k-purple p-3 bg-y2k-black neon-chrome rounded">
                  <p className="font-ranade text-y2k-purple font-black mb-1" style={{textShadow: '0 0 8px rgba(157, 0, 255, 0.5)'}}>⚙️ Decentralized</p>
                  <p className="text-white text-xs">Powered by Soroban smart contracts</p>
                </div>
                <div className="border-2 border-y2k-cyan p-3 bg-y2k-black neon-chrome rounded">
                  <p className="font-ranade text-y2k-cyan font-black mb-1" style={{textShadow: '0 0 8px rgba(0, 255, 255, 0.5)'}}>👁️ Transparent</p>
                  <p className="text-white text-xs">All votes visible on-chain</p>
                </div>
                <div className="border-2 border-y2k-lime p-3 bg-y2k-black neon-chrome rounded">
                  <p className="font-ranade text-y2k-lime font-black mb-1" style={{textShadow: '0 0 8px rgba(0, 255, 0, 0.5)'}}>🔒 Secure</p>
                  <p className="text-white text-xs">Blockchain immutability</p>
                </div>
              </div>
            </div>

            {/* All Polls Widget */}
            <div className="y2k-section">
              <div className="y2k-section-title">🗳️ All Polls</div>
              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {polls.map((poll) => (
                  <motion.div
                    key={poll.id}
                    whileHover={{ x: 4 }}
                    className="border-2 border-y2k-hotpink p-4 bg-y2k-dark hover:bg-y2k-black transition-colors neon-chrome rounded"
                  >
                    <h5 className="font-ranade text-y2k-deeppink font-black text-sm mb-2 break-words" style={{textShadow: '0 0 8px rgba(255, 16, 240, 0.5)'}}>{poll.title}</h5>
                    <div className="flex justify-between text-xs mb-2 gap-2">
                      <span className="font-sreda text-white text-xs flex-1" style={{wordBreak: 'break-word'}}>By: {poll.author}</span>
                      <span className="text-y2k-hotpink doodle-accent whitespace-nowrap" style={{textShadow: '0 0 6px rgba(255, 20, 147, 0.5)'}}><span className="circle-accent"></span> {poll.votes}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-y2k-cyan text-xs font-bold hover:text-y2k-hotpink">
                        Vote
                      </button>
                      <span className="text-white text-xs">·</span>
                      <button className="text-y2k-cyan text-xs font-bold hover:text-y2k-hotpink">
                        Share
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
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
