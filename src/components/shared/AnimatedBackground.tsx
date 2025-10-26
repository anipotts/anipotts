"use client";

import { motion } from "framer-motion";

/**
 * Subtle animated background with floating gradient orbs
 * Modern, minimal, and performant
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-15"
        style={{
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 left-1/3 w-3/4 h-3/4 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 60%)",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
