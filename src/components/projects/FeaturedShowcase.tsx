"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import TextReveal from "@/components/shared/TextReveal";

// Video component for featured showcase
function FeaturedVideo({ src, alt }: { src: string; alt: string }) {
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

  return (
    <video
      ref={videoRef}
      src={src}
      className="object-contain w-full h-full"
      loop
      muted
      playsInline
      style={{
        pointerEvents: "none",
      }}
    />
  );
}

export default function FeaturedShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const featuredProjects = getFeaturedProjects();

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="flex overflow-hidden sticky top-0 items-center h-screen bg-gradient-to-b from-background via-accent/5 to-background">
        {/* Section Header with text reveal */}
        <div className="absolute right-0 left-0 top-20 z-10 px-4 text-center">
          <TextReveal className="font-serif text-4xl font-bold md:text-6xl text-foreground">
            Some of my most impactful work
          </TextReveal>
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div
          style={{ x }}
          className="flex gap-8 px-[10vw] h-[75vh] items-center mt-8 lg:mt-16"
        >
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative flex-shrink-0 w-[90vw] md:w-[70vw] lg:w-[55vw] h-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="overflow-hidden relative w-full h-full rounded-3xl border-2 shadow-2xl transition-all duration-500 border-border group-hover:border-accent bg-cardTheme-face dark:bg-card"
              >
                {/* Media Display - Top Half */}
                <div className="absolute top-0 left-0 right-0 h-1/2">
                  {project.hasVideo && project.videoFilename ? (
                    <FeaturedVideo
                      src={`/assets/projects/videos/${project.videoFilename}`}
                      alt={project.title}
                    />
                  ) : project.screenshot ? (
                    <Image
                      src={project.screenshot}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 via-accent/10 to-background" />
                  )}
                </div>

                {/* Content Overlay - Bottom Half */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/95 via-background/80 to-transparent" />

                {/* Content */}
                <div className="flex relative flex-col justify-end p-6 h-full md:p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.2 }}
                    className="space-y-3"
                  >
                    {/* Category Badge */}
                    <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full bg-accent/20 text-accent border border-accent/30">
                      {project.category}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-bold transition-colors duration-300 md:text-3xl text-foreground group-hover:text-accent line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {project.shortSummary}
                    </p>

                    {/* Meta */}
                    <div className="flex gap-3 items-center text-xs text-muted-foreground">
                      <span className="px-2 py-1 rounded-md bg-muted/50">{project.duration}</span>
                      <span>•</span>
                      <span className="px-2 py-1 rounded-md bg-muted/50">{project.role}</span>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2 items-center font-medium transition-all duration-300 text-accent group-hover:gap-3 pt-2">
                      <span className="text-sm">View Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>

                {/* Floating Tech Stack */}
                <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {project.stack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-md border backdrop-blur-sm bg-background/90 text-foreground border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}

          {/* End Spacer */}
          <div className="flex-shrink-0 w-[20vw]" />
        </motion.div>

        {/* Scroll Hint */}
        <div className="flex absolute bottom-8 left-1/2 gap-2 items-center text-sm -translate-x-1/2 text-muted-foreground">
          <span>Scroll to explore</span>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
