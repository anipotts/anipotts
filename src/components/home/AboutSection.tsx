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
      className="flex overflow-hidden relative items-center px-4 py-32 min-h-screen sm:px-6 lg:px-8"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-accent/10"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [0.5, 1.5]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]),
          }}
        />
      </div>

      <motion.div style={{ opacity, scale }} className="mx-auto max-w-5xl">
        <TextReveal className="font-serif text-3xl font-bold leading-tight md:text-5xl lg:text-6xl text-foreground">
          I build products that solve real problems. From AI-powered apps to
          full-stack platforms, I ship fast without cutting corners. Every line
          of code has purpose. Every feature has impact.
        </TextReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 gap-8 mt-20 md:grid-cols-3"
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
              <div className="mb-2 text-5xl font-bold md:text-6xl text-accent">
                {stat.number}
              </div>
              <div className="mb-1 text-lg font-semibold text-foreground">
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
