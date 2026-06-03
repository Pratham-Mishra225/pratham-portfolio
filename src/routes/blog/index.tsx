import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { BlogCard } from "@/components/portfolio/BlogCard";
import { blogData } from "@/data/blogData";

const categories = ["All", "Analytics", "Technology", "Business", "Entrepreneurship"];

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Pratham Mishra | Analytics, Technology & Business" },
      {
        name: "description",
        content:
          "Notes on technology, analytics, SQL, cloud computing, and the business of building — by Pratham Mishra.",
      },
      { property: "og:title", content: "Blog — Pratham Mishra" },
      {
        property: "og:description",
        content: "Notes on technology, analytics, and the business of building.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const filtered =
    activeCategory === "All"
      ? blogData
      : blogData.filter((b) => b.category === activeCategory);

  return (
    <ThemeProvider>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main className="min-h-screen pt-24">
        {/* Hero section */}
        <section className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to portfolio
              </Link>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-brand" />
                Writing
              </div>

              <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                From the blog
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Notes on technology, analytics, and the business of building.
                Ideas I'm working through, frameworks I'm testing, and lessons
                learned along the way.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 text-brand" />
                <span>{blogData.length} articles</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category filter */}
        <section className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-brand text-brand-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog grid */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((blog, i) => (
                  <BlogCard key={blog.id} blog={blog} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center text-muted-foreground"
              >
                No articles in this category yet.
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </ThemeProvider>
  );
}
