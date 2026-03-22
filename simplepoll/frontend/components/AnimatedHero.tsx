'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface AnimatedHeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundGradient?: boolean;
}

export default function AnimatedHero({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaHref = '/library',
  backgroundGradient = true,
}: AnimatedHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Simple fade-in animation for title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'back.out' }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'back.out' }
      );
    }

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.6, ease: 'back.out' }
      );
    }
  }, []);

  const ctaVariants = {
    initial: { y: 0 },
    hover: {
      y: -4,
      boxShadow: '0px 16px 0px -4px rgba(0, 0, 0, 0.8)',
    },
    tap: {
      y: 0,
      boxShadow: '0px 4px 0px -2px rgba(0, 0, 0, 0.8)',
    },
  };

  return (
    <section
      className={`w-full min-h-screen flex items-center justify-center px-6 relative overflow-hidden py-20 ${
        backgroundGradient ? 'bg-white' : ''
      }`}
    >
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border-6 border-neo-blue"
        animate={{
          rotate: 360,
          y: [0, 20, 0],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 border-6 border-neo-yellow"
        animate={{
          rotate: -360,
          y: [0, -20, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Content */}
      <motion.div className="max-w-5xl mx-auto text-center z-10 w-full">
        <h1
          ref={titleRef}
          className="font-ranade text-5xl md:text-7xl font-bold mb-8 text-neo-black leading-snug"
          style={{ visibility: 'visible' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            ref={subtitleRef}
            className="font-inter text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </p>
        )}

        <motion.a
          ref={ctaRef}
          href={ctaHref}
          variants={ctaVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="inline-block border-6 border-neo-black bg-neo-yellow text-neo-black px-12 py-6 font-ranade font-bold text-xl uppercase shadow-neo-lg transition-all duration-200"
        >
          {ctaText}
        </motion.a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="border-4 border-neo-black w-8 h-12 flex items-center justify-center">
          <motion.div
            className="w-1 h-2 bg-neo-black rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
