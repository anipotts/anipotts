"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SuitIcon from "./SuitIcon";

/**
 * Modern section transition with card suit animations
 * Smooth, minimal, and visually interesting
 */
export default function SectionTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Card suit animations
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-45, 0, 45]);

  // Staggered suit appearances
  const suit1Y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const suit2Y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const suit3Y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const suit4Y = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -70]);

  const suits: Array<"hearts" | "diamonds" | "clubs" | "spades"> = [
    "hearts",
    "diamonds",
    "clubs",
    "spades",
  ];

  return (
    <div ref={ref} className="relative h-48 flex items-center justify-center overflow-hidden">
      {/* Center divider line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        style={{ opacity }}
      />

      {/* Animated card suits */}
      <div className="relative flex items-center justify-center gap-6">
        <motion.div style={{ opacity, scale, rotate, y: suit1Y }}>
          <SuitIcon suit={suits[0]} size={24} className="opacity-30" />
        </motion.div>

        <motion.div
          style={{
            opacity,
            scale,
            rotate: useTransform(rotate, (v) => -v),
            y: suit2Y,
          }}
        >
          <SuitIcon suit={suits[1]} size={32} className="opacity-50" />
        </motion.div>

        {/* Center focal point */}
        <motion.div
          className="relative"
          style={{
            opacity,
            scale: useTransform(scale, (v) => v * 1.2),
          }}
        >
          <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent animate-ping opacity-75" />
        </motion.div>

        <motion.div
          style={{
            opacity,
            scale,
            rotate: useTransform(rotate, (v) => v * 0.5),
            y: suit3Y,
          }}
        >
          <SuitIcon suit={suits[2]} size={32} className="opacity-50" />
        </motion.div>

        <motion.div
          style={{
            opacity,
            scale,
            rotate: useTransform(rotate, (v) => -v * 0.7),
            y: suit4Y,
          }}
        >
          <SuitIcon suit={suits[3]} size={24} className="opacity-30" />
        </motion.div>
      </div>

      {/* Gradient fade edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
    </div>
  );
}

