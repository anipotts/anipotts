"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/shared/TextReveal";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [0.5, 1.5]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]),
          }}
        />
      </div>

      <motion.div style={{ opacity, scale }} className="max-w-5xl mx-auto">
        <TextReveal className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-foreground">
          I build products that solve real problems. From AI-powered apps to
          full-stack platforms, I ship fast without cutting corners. Every line
          of code has purpose. Every feature has impact.
        </TextReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              number: "2",
              label: "weeks",
              desc: "Average time from idea to production",
            },
            {
              number: "300+",
              label: "users",
              desc: "Served by platforms I've built",
            },
            {
              number: "100%",
              label: "focused",
              desc: "On shipping products that matter",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
