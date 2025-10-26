"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import TextReveal from "@/components/shared/TextReveal";

const categories = [
  { value: "all", label: "All" },
  { value: "ai", label: "AI" },
  { value: "product", label: "Product" },
  { value: "quant", label: "Quant" },
  { value: "music", label: "Music" },
];

export default function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const filteredProjects =
    selectedCategory === "all"
      ? projects.filter((p) => p.public)
      : projects.filter((p) => p.category === selectedCategory && p.public);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--accent) 0%, transparent 50%)",
          y: backgroundY,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with text reveal */}
        <div className="text-center mb-12">
          <TextReveal className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            A curated selection of projects showcasing rapid development,
            technical depth, and real-world impact
          </TextReveal>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
                selectedCategory === category.value
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                  : "bg-card border border-border text-muted-foreground hover:border-accent hover:text-accent"
              )}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
