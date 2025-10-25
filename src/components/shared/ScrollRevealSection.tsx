"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A section that reveals content with creative scroll-based animations
 * Features: parallax, opacity fade, and scale transforms
 */
export default function ScrollRevealSection({
  children,
  className = "",
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Creative transforms
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  return (
    <div ref={ref} className={`relative py-20 ${className}`}>
      <motion.div
        style={{
          opacity,
          scale,
          y,
          rotateX,
        }}
        className="perspective-1000"
      >
        {children}
      </motion.div>

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, var(--accent) 0%, transparent 70%)",
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 2]),
        }}
      />
    </div>
  );
}

