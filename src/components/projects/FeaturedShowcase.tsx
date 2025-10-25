"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";

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
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-gradient-to-b from-background via-accent/5 to-background">
        {/* Section Header */}
        <div className="absolute top-20 left-0 right-0 z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scroll horizontally through my most impactful projects
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div
          style={{ x }}
          className="flex gap-8 px-[10vw] h-[60vh] items-center"
        >
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] h-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-border group-hover:border-accent transition-all duration-500 bg-card shadow-2xl"
              >
                {/* Image/Video Placeholder */}
                <div className="absolute inset-0">
                  {project.screenshot ? (
                    <Image
                      src={project.screenshot}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-accent/20 via-accent/10 to-background" />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.2 }}
                  >
                    {/* Category Badge */}
                    <div className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium uppercase tracking-wider mb-4">
                      {project.category}
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">
                      {project.shortSummary}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                      <span>{project.duration}</span>
                      <span>•</span>
                      <span>{project.role}</span>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-4 transition-all duration-300">
                      <span>View Case Study</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </motion.div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex gap-2">
                    {project.stack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-accent/10 backdrop-blur-sm text-xs text-accent border border-accent/20"
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
          <div className="flex-shrink-0 w-[10vw]" />
        </motion.div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-sm flex items-center gap-2">
          <span>Scroll to explore</span>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
