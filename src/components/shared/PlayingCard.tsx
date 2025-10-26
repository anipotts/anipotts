"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SuitIcon, { Suit } from "./SuitIcon";

interface PlayingCardProps {
  children: React.ReactNode;
  suit?: Suit;
  rank?: string;
  className?: string;
  showCorners?: boolean;
  hover3D?: boolean;
}

/**
 * Playing card styled container
 * Mimics the look and feel of a real playing card
 */
export default function PlayingCard({
  children,
  suit,
  rank,
  className,
  showCorners = true,
  hover3D = true,
}: PlayingCardProps) {
  return (
    <motion.div
      className={cn(
        "relative bg-cardTheme-face rounded-lg border-2 border-cardTheme-border shadow-lg",
        "overflow-hidden",
        hover3D && "transition-transform hover:scale-[1.02]",
        className
      )}
      whileHover={hover3D ? { rotateY: 2, rotateX: -2 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Card corners (rank and suit) */}
      {showCorners && suit && rank && (
        <>
          {/* Top-left corner */}
          <div className="absolute top-2 left-2 flex flex-col items-center gap-0.5">
            <span className="text-xs font-bold leading-none">{rank}</span>
            <SuitIcon suit={suit} size={12} />
          </div>

          {/* Bottom-right corner (upside down) */}
          <div className="absolute bottom-2 right-2 flex flex-col items-center gap-0.5 rotate-180">
            <span className="text-xs font-bold leading-none">{rank}</span>
            <SuitIcon suit={suit} size={12} />
          </div>
        </>
      )}

      {/* Card content */}
      <div className="relative z-10">{children}</div>

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}
