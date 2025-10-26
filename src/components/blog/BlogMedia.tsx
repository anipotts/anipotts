"use client";

import Image from "next/image";
import Video from "next-video";
import chainedChat from "../../../public/assets/projects/videos/chained_chat.mp4";

// Helper function to check if file is a video
function isVideoFile(filename: string): boolean {
  const videoExtensions = [".mp4", ".mov", ".avi", ".webm", ".mkv"];
  return videoExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
}

// Video mapping for blog media
const videoMap: Record<string, typeof chainedChat> = {
  "chained_chat.mp4": chainedChat,
};

interface BlogMediaProps {
  src: string;
  alt: string;
}

export default function BlogMedia({ src, alt }: BlogMediaProps) {
  if (isVideoFile(src)) {
    const videoFilename = src.split("/").pop();
    const videoAsset = videoFilename ? videoMap[videoFilename] : null;

    if (videoAsset) {
      return (
        <Video
          src={videoAsset}
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
