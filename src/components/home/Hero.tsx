'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              i&apos;m a software engineer who{' '}
              <motion.span
                className="text-accent font-semibold relative inline-block"
                initial={{ backgroundSize: '0% 100%' }}
                animate={{ backgroundSize: '100% 100%' }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
                style={{
                  backgroundImage: 'linear-gradient(to right, rgba(217, 119, 6, 0.2), rgba(217, 119, 6, 0.2))',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '0 100%',
                }}
              >
                doesn&apos;t waste time
              </motion.span>{' '}
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
              <Link
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-border bg-background text-foreground font-semibold rounded-lg hover:border-accent hover:text-accent transition-all duration-200"
              >
                View projects
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-3xl" />
              <Image
                src="/assets/images/ani_pfp.jpg"
                alt="Ani Potts"
                fill
                className="relative z-10 object-cover rounded-2xl shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

