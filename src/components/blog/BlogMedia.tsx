"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

// Helper function to check if file is a video
function isVideoFile(filename: string): boolean {
  const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv'];
  return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

interface BlogMediaProps {
  src: string;
  alt: string;
}

export default function BlogMedia({ src, alt }: BlogMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {
              // Ignore autoplay errors
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  if (isVideoFile(src)) {
    return (
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        style={{
          pointerEvents: "none",
        }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      priority
      sizes="(max-width: 1024px) 100vw, 1024px"
    />
  );
}
