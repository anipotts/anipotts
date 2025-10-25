"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
}

interface WordProps {
  word: string;
  range: [number, number];
  scrollProgress: MotionValue<number>;
}

function Word({ word, range, scrollProgress }: WordProps) {
  const opacity = useTransform(scrollProgress, range, [0.2, 1]);
  
  return (
    <motion.span style={{ opacity }} className="inline-block mr-2">
      {word}
    </motion.span>
  );
}

export default function TextReveal({ children, className = "" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  });

  const words = children.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={i}
            word={word}
            range={[start, end]}
            scrollProgress={scrollYProgress}
          />
        );
      })}
    </div>
  );
}

