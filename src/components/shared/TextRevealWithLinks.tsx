"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextRevealWithLinksProps {
  children: ReactNode;
  className?: string;
}

interface WordProps {
  content: ReactNode;
  range: [number, number];
  scrollProgress: MotionValue<number>;
}

function Word({ content, range, scrollProgress }: WordProps) {
  const opacity = useTransform(scrollProgress, range, [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block mr-2">
      {content}
    </motion.span>
  );
}

export default function TextRevealWithLinks({
  children,
  className = "",
}: TextRevealWithLinksProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"],
  });

  // Convert children to array of words and links
  const parts: ReactNode[] = [];
  
  const processChildren = (node: ReactNode): void => {
    if (typeof node === "string") {
      // Split string into words
      node.split(" ").forEach((word, i, arr) => {
        if (word) parts.push(word);
        if (i < arr.length - 1) parts.push(" ");
      });
    } else if (Array.isArray(node)) {
      node.forEach(processChildren);
    } else {
      // It's a link or other React element
      parts.push(node);
    }
  };

  processChildren(children);

  // Filter out empty strings
  const filteredParts = parts.filter(part => part !== " " && part !== "");

  return (
    <div ref={ref} className={className}>
      {filteredParts.map((part, i) => {
        const start = i / filteredParts.length;
        const end = start + 1 / filteredParts.length;

        return (
          <Word
            key={i}
            content={part}
            range={[start, end]}
            scrollProgress={scrollYProgress}
          />
        );
      })}
    </div>
  );
}

