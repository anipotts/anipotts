"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollWaveProps {
  className?: string;
  color?: string;
}

/**
 * An animated wave divider that responds to scroll
 * Creates a smooth, flowing visual effect between sections
 */
export default function ScrollWave({
  className = "",
  color = "var(--accent)",
}: ScrollWaveProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Wave animations
  const wave1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const wave3Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={ref} className={`relative w-full h-32 overflow-hidden ${className}`}>
      {/* Wave 1 - Background */}
      <motion.div
        style={{ y: wave1Y, opacity }}
        className="absolute inset-0"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C150,90 350,0 600,60 C850,120 1050,30 1200,60 L1200,120 L0,120 Z"
            fill={color}
            fillOpacity="0.1"
          />
        </svg>
      </motion.div>

      {/* Wave 2 - Middle */}
      <motion.div
        style={{ y: wave2Y, opacity }}
        className="absolute inset-0"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C200,100 400,20 600,80 C800,140 1000,40 1200,80 L1200,120 L0,120 Z"
            fill={color}
            fillOpacity="0.2"
          />
        </svg>
      </motion.div>

      {/* Wave 3 - Foreground */}
      <motion.div
        style={{ y: wave3Y, opacity }}
        className="absolute inset-0"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C250,30 450,110 600,50 C750,0 950,90 1200,50 L1200,120 L0,120 Z"
            fill={color}
            fillOpacity="0.3"
          />
        </svg>
      </motion.div>
    </div>
  );
}

