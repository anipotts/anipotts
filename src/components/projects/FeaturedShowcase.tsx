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
                className="overflow-hidden relative w-full h-full rounded-3xl border-2 shadow-2xl transition-all duration-500 border-border group-hover:border-accent"
              >
                {/* Full Card Background Video/Image */}
                <div className="absolute inset-0">
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

                {/* Hover Overlay - Only visible on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all duration-500 ease-out" />

                {/* Content - Hidden by default, visible on hover */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.2 }}
                    className="space-y-4"
                  >
                    {/* Category Badge */}
                    <div className="inline-block px-4 py-2 text-sm font-medium tracking-wider uppercase rounded-full bg-accent text-accent-foreground border border-accent/30">
                      {project.category}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-3xl font-bold text-white md:text-4xl">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-base text-gray-200 leading-relaxed">
                      {project.shortSummary}
                    </p>

                    {/* Key Points */}
                    {project.keyPoints.length > 0 && (
                      <ul className="space-y-2 text-sm text-gray-300">
                        {project.keyPoints.slice(0, 3).map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Meta */}
                    <div className="flex gap-4 items-center text-sm text-gray-300">
                      <span className="px-3 py-1 rounded-md bg-white/10 backdrop-blur-sm">
                        {project.duration}
                      </span>
                      <span>•</span>
                      <span className="px-3 py-1 rounded-md bg-white/10 backdrop-blur-sm">
                        {project.role}
                      </span>
                    </div>
                  </motion.div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-md border backdrop-blur-sm bg-white/10 text-white border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2 items-center font-medium text-accent hover:text-accent/80 transition-colors">
                      <span className="text-sm">View Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
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
