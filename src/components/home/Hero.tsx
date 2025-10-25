"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import Tilt3D from "@/components/shared/Tilt3D";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector<HTMLElement>("#projects");
    if (element && typeof window !== "undefined" && window.lenis) {
      window.lenis.scrollTo(element, {
        offset: -80,
        duration: 1.5,
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          style={{ y, opacity, scale }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Name */}
            <motion.h1
              className="font-serif text-display-sm md:text-display font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ani Potts
            </motion.h1>

            {/* Tagline with animated highlight */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              i&apos;m a software engineer who{" "}
              <motion.span
                className="text-accent font-semibold relative inline-block"
                initial={{ backgroundSize: "0% 100%" }}
                animate={{ backgroundSize: "100% 100%" }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 100%",
                }}
              >
                doesn&apos;t waste time
              </motion.span>{" "}
              turning ideas into apps.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/hire"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:scale-105 group"
              >
                Work with me
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={handleScrollToProjects}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-border bg-background text-foreground font-semibold rounded-lg hover:border-accent hover:text-accent transition-all duration-200"
              >
                View projects
              </button>
            </motion.div>
          </motion.div>

          {/* Image with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <Tilt3D className="relative w-full aspect-square max-w-md mx-auto" intensity={10}>
              <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-3xl" />
              <Image
                src="/assets/images/ani_pfp.jpg"
                alt="Ani Potts"
                fill
                className="relative z-10 object-cover rounded-2xl shadow-2xl ring-2 ring-accent/10"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Tilt3D>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
          onClick={handleScrollToProjects}
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
