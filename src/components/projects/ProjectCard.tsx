"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isRevamping = project.status === "revamp_pending";
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.article
      ref={cardRef}
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
        "hover:border-accent hover:shadow-xl hover:shadow-accent/10",
        isRevamping && "opacity-80"
      )}
    >
      {/* Media */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {project.hasVideo && project.videoFilename ? (
          <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
            <Play className="h-16 w-16 text-accent/60" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-4 text-sm text-white/90 bg-black/50 px-3 py-1 rounded-full">
              Video Demo Available
            </div>
          </div>
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
          <div className="absolute top-4 right-4 bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-medium">
            Revamp Pending
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-accent transition-colors">
              {project.title}
            </h3>
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
    </motion.article>
  );
}
