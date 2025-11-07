"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
// import Link from "next/link";
// import { Calendar, Clock } from "lucide-react";
// import { getBlogPosts } from "@/data/blog";
// import BlogMedia from "@/components/blog/BlogMedia";

export default function BlogPage() {
  // const posts = getBlogPosts(); // Hidden for now

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 space-y-4 text-center">
            <h1 className="text-4xl font-bold md:text-6xl text-foreground">
              Blog
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Nothing here yet... keep an eye out in the future for some thoughts!
            </p>
          </div>

          {/* Posts Grid - Hidden for now */}
          {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="overflow-hidden rounded-2xl border transition-all duration-300 group border-border bg-card hover:border-accent hover:shadow-xl hover:shadow-accent/10"
              >
                {post.coverImage && (
                  <div className="overflow-hidden relative w-full aspect-video bg-muted">
                    <BlogMedia src={post.coverImage} alt={post.title} />
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md border bg-accent/10 text-accent border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold transition-colors text-foreground group-hover:text-accent">
                    {post.title}
                  </h2>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex gap-4 items-center pt-2 text-xs border-t text-muted-foreground border-border">
                    <div className="flex gap-1 items-center">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex gap-1 items-center">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )} */}
        </div>
      </main>
      <Footer />
    </>
  );
}
