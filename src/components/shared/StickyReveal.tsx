"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickyRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function StickyReveal({
  children,
  className = "",
}: StickyRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [15, 0, 0, -15]);

  return (
    <div ref={containerRef} className={`relative min-h-screen ${className}`}>
      <div className="sticky top-1/4 flex items-center justify-center">
        <motion.div
          style={{ opacity, scale, rotateX }}
          className="w-full max-w-7xl mx-auto px-4"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

