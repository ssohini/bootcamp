'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import WalletConnect from './WalletConnect';
import { useState } from 'react';

interface NavigationProps {
  onCreatePoll?: () => void;
  isWalletConnected?: boolean;
  walletAddress?: string;
  onWalletConnect?: (address: string) => void;
}

export default function Navigation({
  onCreatePoll,
  isWalletConnected = false,
  walletAddress = '',
  onWalletConnect,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Library', href: '/library' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="border-b-4 border-y2k-hotpink bg-y2k-black shadow-lg sticky top-0 z-30" style={{boxShadow: '0 0 10px rgba(255, 20, 147, 0.5)'}}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* @ts-ignore */}
          <motion.div
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="font-golden text-3xl font-black border-3 border-y2k-hotpink px-3 py-1 bg-y2k-hotpink text-y2k-black"
            style={{textShadow: '0 0 5px rgba(255, 20, 147, 0.8)', letterSpacing: '0.05em'}}
          >
            POLL
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-ranade font-bold uppercase text-sm text-y2k-cyan border-b-3 border-y2k-cyan pb-1 hover:text-y2k-hotpink hover:border-y2k-hotpink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* @ts-ignore */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={onCreatePoll}
            type="button"
            className="hidden md:block border-3 border-y2k-hotpink bg-y2k-hotpink text-y2k-black px-4 py-2 font-ranade font-bold text-xs uppercase transition-all"
            style={{boxShadow: '0 0 10px rgba(255, 20, 147, 0.7)'}}
          >
            + Create
          </motion.button>

          <WalletConnect 
            isConnected={isWalletConnected} 
            address={walletAddress}
            onConnect={onWalletConnect}
          />

          {/* Mobile Menu Toggle */}
          {/* @ts-ignore */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="md:hidden border-3 border-y2k-hotpink bg-y2k-hotpink text-y2k-black p-2 font-bold text-lg"
          >
            ☰
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* @ts-ignore */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            className="md:hidden border-t-6 border-neo-black bg-neo-white"
          >
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block font-ranade font-bold uppercase text-sm border-4 border-neo-black p-3 bg-neo-white hover:bg-neo-yellow transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                onCreatePoll?.();
                setIsMenuOpen(false);
              }}
              className="w-full border-4 border-neo-black bg-neo-red text-neo-white p-3 font-ranade font-bold text-sm uppercase shadow-neo"
            >
              + Create Poll
            </button>
          </div>
        </motion.div>
        </>
      )}
    </nav>
  );
}
