"use client";

import { Heart, Diamond, Club, Spade } from "lucide-react";
import { cn } from "@/lib/utils";

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

interface SuitIconProps {
  suit: Suit;
  className?: string;
  size?: number;
}

/**
 * Playing card suit icon component
 * Uses Lucide icons for hearts, diamonds, clubs, and spades
 */
export default function SuitIcon({
  suit,
  className,
  size = 24,
}: SuitIconProps) {
  const suitConfig = {
    hearts: {
      Icon: Heart,
      color: "text-suit-hearts",
      fillColor: "fill-suit-hearts",
    },
    diamonds: {
      Icon: Diamond,
      color: "text-suit-diamonds",
      fillColor: "fill-suit-diamonds",
    },
    clubs: {
      Icon: Club,
      // White in dark mode, black in light mode
      color: "text-suit-clubs dark:text-white",
      fillColor: "fill-suit-clubs dark:fill-white",
    },
    spades: {
      Icon: Spade,
      // White in dark mode, black in light mode
      color: "text-suit-spades dark:text-white",
      fillColor: "fill-suit-spades dark:fill-white",
    },
  };

  const { Icon, color, fillColor } = suitConfig[suit];

  return (
    <Icon
      size={size}
      className={cn(color, fillColor, className)}
      fill="currentColor"
    />
  );
}

// Suit pattern component for decorative backgrounds
interface SuitPatternProps {
  className?: string;
  opacity?: number;
}

export function SuitPattern({ className, opacity = 0.05 }: SuitPatternProps) {
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden",
        className
      )}
      style={{ opacity }}
    >
      <div className="absolute inset-0 grid grid-cols-8 gap-8 p-8">
        {Array.from({ length: 32 }).map((_, i) => (
          <SuitIcon
            key={i}
            suit={suits[i % 4]}
            className="opacity-50"
            size={32}
          />
        ))}
      </div>
    </div>
  );
}
