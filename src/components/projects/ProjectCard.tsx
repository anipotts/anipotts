"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import MagneticCard from "@/components/shared/MagneticCard";
import SuitIcon from "@/components/shared/SuitIcon";
import PlayingCard from "@/components/shared/PlayingCard";
import Video from "next-video";
import chainedChat from "../../../public/assets/projects/videos/chained_chat.mp4";
import nyuPurityTest from "../../../public/assets/projects/videos/nyu_purity_test.mp4";
import pgiDemo from "../../../public/assets/projects/videos/pgi-demo.mp4";
import quantercise from "../../../public/assets/projects/videos/quantercise.mov";
import rss from "../../../public/assets/projects/videos/rss.mov";

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Video mapping for project cards
const videoMap: Record<string, typeof chainedChat> = {
  "chained_chat.mp4": chainedChat,
  "nyu_purity_test.mp4": nyuPurityTest,
  "pgi-demo.mp4": pgiDemo,
  "quantercise.mov": quantercise,
  "rss.mov": rss,
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isRevamping = project.status === "revamp_pending";
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Creative scroll transforms
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);

  // Card rank based on category
  const rankMap: Record<string, string> = {
    ai: "A",
    product: "K",
    quant: "Q",
    music: "J",
  };

  return (
    <MagneticCard className={cn(isRevamping && "opacity-80")} strength={0.15}>
      <motion.article
        ref={cardRef}
        style={{ y, opacity, scale, rotate }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
      >
        <PlayingCard
          suit={project.suit}
          rank={rankMap[project.category]}
          showCorners={true}
          hover3D={false}
          className="h-full"
        >
          {/* Media */}
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            {project.hasVideo && project.videoFilename ? (
              <Video
                src={videoMap[project.videoFilename]}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                style={{
                  pointerEvents: "none",
                }}
              />
            ) : project.screenshot ? (
              <Image
                src={project.screenshot}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                <span className="text-6xl font-serif font-bold text-accent/20">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}

            {isRevamping && (
              <div className="absolute top-4 right-4 bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-medium z-20">
                Revamp Pending
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Header with suit badge */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <SuitIcon suit={project.suit} size={20} />
                  <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {project.duration}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.shortSummary}
              </p>
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent-foreground border border-accent/20"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="text-xs px-2 py-1 text-muted-foreground">
                  +{project.stack.length - 4} more
                </span>
              )}
            </div>

            {/* Key Points */}
            {project.keyPoints.length > 0 && (
              <ul className="space-y-1">
                {project.keyPoints.slice(0, 2).map((point, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-accent mt-0.5">•</span>
                    <span className="line-clamp-1">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors"
                    aria-label="View repository"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors"
                    aria-label="View demo"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>

              {project.caseStudy ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
                >
                  Read case study
                  <ExternalLink className="h-3 w-3" />
                </Link>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {project.role}
                </span>
              )}
            </div>
          </div>
        </PlayingCard>
      </motion.article>
    </MagneticCard>
  );
}
