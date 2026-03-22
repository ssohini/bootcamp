'use client';

import { motion } from 'framer-motion';

interface VerificationBadgeProps {
  verified: boolean;
  text?: string;
  animated?: boolean;
}

export default function VerificationBadge({
  verified,
  text = 'Blockchain Verified',
  animated = true,
}: VerificationBadgeProps) {
  if (!verified) return null;

  return (
    <motion.div
      initial={animated ? { scale: 0, rotate: -180 } : {}}
      animate={animated ? { scale: 1, rotate: 0 } : {}}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={animated ? { scale: 1.1 } : {}}
      className="inline-flex items-center gap-2 border-4 border-neo-green bg-neo-green text-neo-white px-4 py-2 font-ranade font-bold text-sm uppercase shadow-neo"
    >
      <motion.span
        animate={animated ? { rotate: 360 } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="text-lg"
      >
        ✓
      </motion.span>
      {text}
    </motion.div>
  );
}
