import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import PlayingCard from "@/components/shared/PlayingCard";
import type { Suit } from "@/components/shared/SuitIcon";

export const metadata = {
  title: "Build with Ani",
  description:
    "I turn half‑baked ideas into fast, production‑grade apps. Minimal meetings, ruthless shipping, clean code, clear pricing.",
};

const pricingTiers = [
  {
    name: "Quick Win",
    suit: "clubs" as Suit,
    rank: "J",
    description: "Single feature or MVP slice shipped fast.",
    placeholder: "$1k–5k",
    features: [
      "One focused feature",
      "1–2 week delivery",
      "Modern stack",
      "Mobile responsive",
      "Production ready",
      "Clean handoff docs",
    ],
  },
  {
    name: "Full Build",
    suit: "hearts" as Suit,
    rank: "Q",
    description: "Complete product with polish and integrations.",
    placeholder: "$5k–10k",
    features: [
      "End‑to‑end product",
      "3–4 week timeline",
      "Database + API setup",
      "Auth & payments",
      "Admin dashboard",
      "Testing + deployment",
      "2 weeks post‑launch support",
    ],
  },
  {
    name: "Scale Ready",
    suit: "spades" as Suit,
    rank: "K",
    description: "Complex platforms built to handle real growth.",
    placeholder: "$10k–20k",
    features: [
      "Multi‑feature platform",
      "4–6 week build",
      "Real‑time capabilities",
      "Advanced integrations",
      "Performance tuning",
      "Scalable architecture",
      "4 weeks ongoing support",
    ],
  },
  {
    name: "White Glove",
    suit: "diamonds" as Suit,
    rank: "A",
    description: "Personal partnership for your most ambitious project.",
    placeholder: "$20k+",
    features: [
      "Your dedicated engineer",
      "Custom timeline & scope",
      "Weekly strategy calls",
      "Iterative development",
      "Premium architecture",
      "Unlimited revisions",
      "Long‑term partnership",
    ],
    featured: true,
  },
];

export default function HirePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 space-y-6 text-center">
            <h1 className=" text-4xl font-bold md:text-6xl text-foreground">
              Build with Me
            </h1>
            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-muted-foreground">
              I build maintainable, scalable, and secure apps on a very fast
              timeline. <br /> Share your vision, and I&apos;ll give you a
              quote.
            </p>
          </div>

          {/* Pricing Grid - Playing Cards */}
          <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
            {pricingTiers.map((tier) => (
              <div key={tier.name} className="relative">
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 z-10 px-4 py-1 text-xs font-medium rounded-full shadow-lg -translate-x-1/2 bg-accent text-accent-foreground">
                    Premium
                  </div>
                )}

                <PlayingCard
                  suit={tier.suit}
                  rank={tier.rank}
                  showCorners={true}
                  hover3D={true}
                  className={`p-8 space-y-6 h-full flex flex-col ${
                    tier.featured
                      ? "ring-2 ring-accent shadow-2xl shadow-accent/30"
                      : ""
                  }`}
                >
                  <div className="pt-4 space-y-2">
                    <h3 className=" text-2xl font-bold text-foreground">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground min-h-[40px]">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mb-2 space-y-1">
                    <p className=" text-3xl font-bold text-accent">
                      {tier.placeholder}
                    </p>
                    <p className="text-xs tracking-wide uppercase text-muted-foreground">
                      project rate
                    </p>
                  </div>

                  <ul className="flex-grow mb-4 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 items-start text-sm"
                      >
                        <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`block w-full py-3 px-6 rounded-lg text-center text-sm font-semibold transition-all duration-200 mt-auto ${
                      tier.featured
                        ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
                        : "border-2 border-border hover:border-accent hover:text-accent"
                    }`}
                  >
                    Let&apos;s talk scope
                  </Link>
                </PlayingCard>
              </div>
            ))}
          </div>

          {/* Process Timeline */}
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12  text-3xl font-bold text-center text-foreground">
              How we&apos;ll work
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Scope",
                  description:
                    "Send your idea, timeline, and budget. I reply within 24–48h with a clear plan + quote.",
                },
                {
                  step: "02",
                  title: "Sprint",
                  description:
                    "Short sprints. Weekly working builds you can click, not PDFs.",
                },
                {
                  step: "03",
                  title: "Polish",
                  description:
                    "QA together. Tighten UX, performance, and edge cases until it feels right.",
                },
                {
                  step: "04",
                  title: "Launch",
                  description:
                    "Ship to prod with docs, envs, and a clean handoff so you can run.",
                },
              ].map((phase) => (
                <div key={phase.step} className="space-y-3">
                  <div className=" text-4xl font-bold text-accent/30">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 space-y-6 text-center">
            <h2 className=" text-3xl font-bold text-foreground">
              Pick your card, let&apos;s build
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Not sure which package fits? Let&apos;s talk through your project
              and I&apos;ll help you choose.
            </p>
            <Link
              href="/contact"
              className="inline-flex gap-2 items-center px-8 py-4 font-semibold rounded-lg transition-all duration-200 bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 group"
            >
              Start the conversation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
