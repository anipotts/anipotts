"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import TextReveal from "@/components/shared/TextReveal";
import Video from "next-video";
import chainedChat from "/assets/projects/videos/chained_chat.mp4";
import nyuPurityTest from "/assets/projects/videos/nyu_purity_test.mp4";
import pgiDemo from "/assets/projects/videos/pgi-demo.mp4";
import quantercise from "/assets/projects/videos/quantercise.mov";
import rss from "/assets/projects/videos/rss.mov";
import { useRef } from "react";

// Video mapping for featured showcase
const videoMap: Record<string, any> = {
  "chained_chat.mp4": chainedChat,
  "nyu_purity_test.mp4": nyuPurityTest,
  "pgi-demo.mp4": pgiDemo,
  "quantercise.mov": quantercise,
  "rss.mov": rss,
};

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
          className="flex gap-8 px-[10vw] h-[60vh] items-center mt-8 lg:mt-16"
        >
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative flex-shrink-0 w-[80vw] md:w-[70vw] lg:w-[60vw] h-full aspect-[9/16]"
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
                    <Video
                      src={videoMap[project.videoFilename]}
                      className="object-cover w-full h-full"
                      loop
                      muted
                      playsInline
                      style={{
                        pointerEvents: "none",
                        objectPosition: "center center",
                      }}
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
                <div className="absolute inset-0 transition-all duration-500 ease-out bg-black/0 group-hover:bg-black/80" />

                {/* Content - Hidden by default, visible on hover */}
                <div className="flex absolute inset-0 flex-col justify-between p-6 opacity-0 transition-all duration-500 ease-out md:p-8 group-hover:opacity-100">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.2 }}
                    className="space-y-4"
                  >
                    {/* Category Badge */}
                    <div className="inline-block px-4 py-2 text-sm font-medium tracking-wider uppercase rounded-full border bg-accent text-accent-foreground border-accent/30">
                      {project.category}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-3xl font-bold text-white md:text-4xl">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-base leading-relaxed text-gray-200">
                      {project.shortSummary}
                    </p>

                    {/* Key Points */}
                    {project.keyPoints.length > 0 && (
                      <ul className="space-y-2 text-sm text-gray-300">
                        {project.keyPoints.slice(0, 3).map((point, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="mt-1 text-accent">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Meta */}
                    <div className="flex gap-4 items-center text-sm text-gray-300">
                      <span className="px-3 py-1 rounded-md backdrop-blur-sm bg-white/10">
                        {project.duration}
                      </span>
                      <span>•</span>
                      <span className="px-3 py-1 rounded-md backdrop-blur-sm bg-white/10">
                        {project.role}
                      </span>
                    </div>
                  </motion.div>

                  {/* Bottom Section */}
                  <div className="flex justify-between items-center">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs text-white rounded-md border backdrop-blur-sm bg-white/10 border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2 items-center font-medium transition-colors text-accent hover:text-accent/80">
                      <span className="text-sm">View Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}

          {/* End Spacer */}
          <div className="flex-shrink-0 w-[15vw]" />
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
