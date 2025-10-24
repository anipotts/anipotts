import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Hire Me',
  description: 'Work with me to build fast, reliable products. I convert ideas into production apps quickly and professionally.',
}

const pricingTiers = [
  {
    name: 'Starter',
    description: 'Perfect for small features, MVPs, or quick prototypes',
    placeholder: '$5k-15k',
    features: [
      'Single feature or small app',
      '1-2 week turnaround',
      'Modern tech stack',
      'Mobile responsive',
      'Production-ready code',
      'Documentation included',
    ],
  },
  {
    name: 'Standard',
    description: 'Full product builds with integrated features and polish',
    placeholder: '$15k-30k',
    features: [
      'Complete product build',
      '3-6 week turnaround',
      'Database & API integration',
      'Authentication & payments',
      'Admin dashboard',
      'Testing & deployment',
      'Ongoing support (2 weeks)',
    ],
    featured: true,
  },
  {
    name: 'Product',
    description: 'Complex platforms with real-time features and scale',
    placeholder: '$30k+',
    features: [
      'Multi-feature platform',
      'Custom timeline',
      'Real-time functionality',
      'Advanced integrations',
      'Performance optimization',
      'Scalable architecture',
      'Extended support & iteration',
    ],
  },
]

export default function HirePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
              Work with me
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              I convert ideas into production apps, quickly and reliably. Pricing depends on scope—tell me your budget
              and I&apos;ll tell you what I can ship.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border ${
                  tier.featured
                    ? 'border-accent shadow-xl shadow-accent/20 bg-accent/5'
                    : 'border-border bg-card'
                } p-8 space-y-6 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-foreground">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm">{tier.description}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-4xl font-bold text-foreground">{tier.placeholder}</p>
                  <p className="text-sm text-muted-foreground">per project</p>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all duration-200 ${
                    tier.featured
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'border-2 border-border hover:border-accent hover:text-accent'
                  }`}
                >
                  Start a conversation
                </Link>
              </div>
            ))}
          </div>

          {/* Process Timeline */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">
              How we&apos;ll work together
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Kick-off',
                  description: 'Share your idea, timeline, and budget. I&apos;ll respond within 48 hours with a plan.',
                },
                {
                  step: '02',
                  title: 'Build',
                  description: 'Weekly updates with working prototypes. Fast iterations based on your feedback.',
                },
                {
                  step: '03',
                  title: 'Review',
                  description: 'Test everything together. Refine until it&apos;s exactly what you envisioned.',
                },
                {
                  step: '04',
                  title: 'Ship',
                  description: 'Deploy to production with full documentation and handoff.',
                },
              ].map((phase) => (
                <div key={phase.step} className="space-y-3">
                  <div className="text-4xl font-serif font-bold text-accent/30">{phase.step}</div>
                  <h3 className="text-xl font-semibold text-foreground">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center space-y-6">
            <h2 className="text-3xl font-serif font-bold text-foreground">
              Ready to build something great?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:scale-105 group"
            >
              Get in touch
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

