import { notFound } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Clock } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects
    .filter((p) => p.caseStudy && p.public)
    .map((project) => ({
      slug: project.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.shortSummary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.caseStudy) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Button */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          {/* Header */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <span className="text-sm px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                {project.category.toUpperCase()}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {project.duration}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground">
              {project.shortSummary}
            </p>

            <div className="flex items-center gap-4">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-border hover:border-accent hover:text-accent transition-all"
                >
                  <Github className="h-5 w-5" />
                  View Code
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
                >
                  <ExternalLink className="h-5 w-5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Media */}
          {(project.hasVideo || project.screenshot) && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-12 bg-muted">
              {project.screenshot && (
                <Image
                  src={project.screenshot}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              )}
              {project.hasVideo && project.videoFilename && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="text-white/90 text-center space-y-2">
                    <p className="text-sm">Video demo available</p>
                    <p className="text-xs text-white/70">
                      (Video will be embedded once provided:{" "}
                      {project.videoFilename})
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. This
                  is a placeholder case study that will be replaced with real
                  content from Payload CMS once it&apos;s set up. The project
                  demonstrates rapid development and technical excellence.
                </p>
              </section>

              {/* Key Results */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                  Key Results
                </h2>
                <div className="space-y-4">
                  {project.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-muted-foreground pt-1">{point}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Technical Details */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  Technical Approach
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The technical implementation focused on speed, reliability,
                  and scalability. Each technology choice was made to maximize
                  development velocity while maintaining production quality.
                </p>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h3>Architecture</h3>
                  <p>
                    [Detailed architecture explanation will go here from Payload
                    CMS. This will include diagrams, code samples, and technical
                    deep-dives.]
                  </p>

                  <h3>Challenges</h3>
                  <p>
                    [Key technical challenges and how they were solved will be
                    documented here.]
                  </p>

                  <h3>Performance</h3>
                  <p>
                    [Performance metrics, optimization strategies, and
                    benchmarks will be detailed here.]
                  </p>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Info */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Project Info
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Role</p>
                    <p className="text-foreground font-medium">
                      {project.role}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Duration
                    </p>
                    <p className="text-foreground font-medium">
                      {project.duration}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent border border-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-accent bg-accent/5 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Interested in similar work?
                </h3>
                <p className="text-sm text-muted-foreground">
                  I&apos;m available for select projects. Let&apos;s discuss how
                  I can help bring your ideas to life.
                </p>
                <Link
                  href="/contact"
                  className="block w-full py-3 px-6 bg-accent text-accent-foreground text-center font-semibold rounded-lg hover:bg-accent/90 transition-all"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
