"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Tilt3D from "@/components/shared/Tilt3D";
import TextReveal from "@/components/shared/TextReveal";
import SuitIcon from "@/components/shared/SuitIcon";

export default function Hero() {
  const containerRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className="flex overflow-hidden relative justify-center items-center px-4 pt-16 min-h-screen sm:px-6 lg:px-8"
    >
      {/* Decorative suit icons in corners */}
      <div className="absolute top-8 left-8 opacity-10">
        <SuitIcon suit="spades" size={80} />
      </div>
      <div className="absolute top-8 right-8 opacity-10">
        <SuitIcon suit="hearts" size={80} />
      </div>
      <div className="absolute bottom-8 left-8 opacity-10">
        <SuitIcon suit="clubs" size={80} />
      </div>
      <div className="absolute right-8 bottom-8 opacity-10">
        <SuitIcon suit="diamonds" size={80} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          style={{ y, opacity, scale }}
          className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2"
        >
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Name with suit accent */}
            <motion.div
              className="flex gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-serif font-normal text-display-sm md:text-display text-foreground">
                hi, i&apos;m Ani Potts
              </h1>
            </motion.div>

            {/* Tagline with scroll-based text reveal */}
            <div className="text-xl leading-relaxed md:text-2xl text-muted-foreground">
              <TextReveal>
                i&apos;m a software engineer who ships platforms and scales them
                to millions of users
              </TextReveal>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col gap-4 pt-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/hire"
                className="inline-flex justify-center items-center px-8 py-4 font-semibold rounded-lg transition-all duration-200 bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 group"
              >
                Work with me
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={handleScrollToProjects}
                className="inline-flex justify-center items-center px-8 py-4 font-semibold rounded-lg border-2 transition-all duration-200 border-border bg-background text-foreground hover:border-accent hover:text-accent"
              >
                See my work
              </button>
            </motion.div>
          </motion.div>

          {/* Image with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <Tilt3D className="relative w-full aspect-square" intensity={10}>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r opacity-50 blur-3xl from-accent/20 via-accent/30 to-accent/20 -z-10" />

              {/* Image container */}
              <div className="overflow-hidden relative w-full h-full rounded-2xl ring-2 shadow-2xl ring-accent/10">
                <Image
                  src="/assets/images/ani_pfp.jpg"
                  alt="Ani Potts"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 500px"
                />
              </div>
            </Tilt3D>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={`scroll-indicator hidden absolute bottom-8 left-1/2 -translate-x-1/2 md:block ${hasScrolled ? "hidden" : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: hasScrolled ? 0 : 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col gap-2 items-center cursor-pointer text-muted-foreground"
          onClick={handleScrollToProjects}
        >
          <span className="text-xs tracking-wider uppercase font-serif">
            Scroll
          </span>
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
