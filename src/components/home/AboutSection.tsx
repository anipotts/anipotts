"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/shared/TextReveal";
import PlayingCard from "@/components/shared/PlayingCard";

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
        <div className="flex flex-col gap-8 justify-center items-center">
          <TextReveal className="font-serif text-3xl font-semibold leading-tight text-center md:text-4xl lg:text-5xl text-foreground">
            currently, i&apos;m building a research networking platform for 300+
            quants at PGI.
          </TextReveal>
          <div className="font-serif text-3xl font-semibold leading-tight text-center md:text-4xl lg:text-5xl text-foreground">
            <TextReveal>
              previously, ive built internal analytics dashboards for
            </TextReveal>
            <motion.a
              href="https://atlanticrecords.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mx-2 transition-all duration-300 hover:scale-110 hover:brightness-110"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/logos/atlantic_records.png"
                alt="Atlantic Records"
                width={120}
                height={40}
                className="h-8 w-auto md:h-10 lg:h-12 object-contain filter brightness-0 dark:brightness-100"
              />
            </motion.a>
            <TextReveal>
              , scaled leads for
            </TextReveal>
            <motion.a
              href="https://dadadigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mx-2 transition-all duration-300 hover:scale-110 hover:brightness-110"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/logos/dadadigital.png"
                alt="DADA Digital"
                width={120}
                height={40}
                className="h-8 w-auto md:h-10 lg:h-12 object-contain filter brightness-0 dark:brightness-100"
              />
            </motion.a>
            <TextReveal>
              , built proprietary software for
            </TextReveal>
            <motion.a
              href="https://rangemediapartners.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mx-2 transition-all duration-300 hover:scale-110 hover:brightness-110"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/logos/range.jpeg"
                alt="Range Media Partners"
                width={120}
                height={40}
                className="h-8 w-auto md:h-10 lg:h-12 object-contain filter brightness-0 dark:brightness-100"
              />
            </motion.a>
            <TextReveal>
              , and founded two profitable startups.
            </TextReveal>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 gap-8 mt-20 md:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              number: "10",
              rank: "10",
              suit: "days",
              desc: "Average time from idea to MVP",
              cardSuit: "hearts" as const,
            },
            {
              number: "50k+",
              rank: "K",
              suit: "users",
              desc: "Served by platforms I've built",
              cardSuit: "diamonds" as const,
            },
            {
              number: "250k+",
              rank: "A",
              suit: "generated",
              desc: "Revenue generated for clients",
              cardSuit: "spades" as const,
            },
            {
              number: "2.5m+",
              rank: "J",
              suit: "views",
              desc: "Views on my projects",
              cardSuit: "spades" as const,
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, rotateY: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
            >
              <PlayingCard
                suit={stat.cardSuit}
                rank={stat.rank}
                className="p-8 min-h-[280px] flex items-center justify-center"
                showCorners={true}
                hover3D={true}
              >
                <div className="pt-8 text-center">
                  <div className="mb-3 font-serif text-5xl font-bold md:text-6xl text-accent">
                    {stat.number}
                  </div>
                  <div className="mb-2 text-lg font-semibold tracking-wide uppercase text-foreground">
                    {stat.suit}
                  </div>
                  <div className="text-xs text-muted-foreground max-w-[200px] mx-auto">
                    {stat.desc}
                  </div>
                </div>
              </PlayingCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
