import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import {
  blogData,
  getBlogBySlug,
  getAdjacentBlogs,
} from "@/data/blogData";
import { BlogCard } from "@/components/portfolio/BlogCard";

const categoryColors: Record<string, string> = {
  Analytics:
    "bg-violet-500/10 text-violet-500 dark:bg-violet-500/20 dark:text-violet-400",
  Technology:
    "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  Business:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  Entrepreneurship:
    "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
};

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const blog = getBlogBySlug(params.slug);
    return {
      meta: blog
        ? [
            {
              title: `${blog.title} — Pratham Mishra`,
            },
            {
              name: "description",
              content: blog.description,
            },
            {
              property: "og:title",
              content: blog.title,
            },
            {
              property: "og:description",
              content: blog.description,
            },
            {
              property: "og:type",
              content: "article",
            },
            {
              name: "twitter:card",
              content: "summary_large_image",
            },
            {
              name: "twitter:title",
              content: blog.title,
            },
            {
              name: "twitter:description",
              content: blog.description,
            },
          ]
        : [{ title: "Article not found — Pratham Mishra" }],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const blog = getBlogBySlug(slug);
  const { prev, next } = getAdjacentBlogs(slug);
  const articleRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: articleRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    if (!blog) {
      navigate({ to: "/blog" });
    }
  }, [blog, navigate]);

  if (!blog) return null;

  const catClass =
    categoryColors[blog.category] ?? "bg-accent text-brand";

  function handleShare(platform: "twitter" | "linkedin" | "copy") {
    const url = window.location.href;
    const text = encodeURIComponent(blog!.title);
    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  }

  const relatedBlogs = blogData
    .filter((b) => b.id !== blog.id && b.category === blog.category)
    .slice(0, 2);

  return (
    <ThemeProvider>
      {/* Article-specific reading progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-brand"
      />

      <CursorGlow />
      <Navbar />

      <main className="min-h-screen pt-24">
        {/* Hero / Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative py-16 sm:py-24"
        >
          <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
          <div className="mx-auto max-w-4xl px-6">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${catClass}`}
              >
                {blog.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {blog.publishedDate}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {blog.readTime} read
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
              {blog.title}
            </h1>

            {/* Description */}
            <p className="mt-5 text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {blog.description}
            </p>

            {/* Share buttons */}
            <div className="mt-8 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Share2 className="h-4 w-4" />
                Share:
              </span>
              <button
                onClick={() => handleShare("twitter")}
                title="Share on X (Twitter)"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                title="Share on LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Linkedin className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleShare("copy")}
                title="Copy link"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Link2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-border" />
        </div>

        {/* Article body */}
        <motion.article
          ref={articleRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-4xl px-6 py-16"
        >
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: blog.fullContent }}
          />
        </motion.article>

        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-border" />
        </div>

        {/* Share bar (bottom) */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display text-sm font-semibold">
                Enjoyed this article?
              </p>
              <p className="text-sm text-muted-foreground">
                Share it with someone who'd find it useful.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare("twitter")}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Twitter className="h-4 w-4" />
                Share on X
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Link2 className="h-4 w-4" />
                Copy link
              </button>
            </div>
          </div>
        </section>

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <section className="border-t border-border">
            <div className="mx-auto max-w-4xl px-6 py-12">
              <div className="grid gap-4 sm:grid-cols-2">
                {prev ? (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: prev.slug }}
                    className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-elegant"
                  >
                    <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                      Previous article
                    </div>
                    <p className="font-display text-sm font-semibold leading-snug group-hover:text-brand transition-colors">
                      {prev.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {prev.category} · {prev.readTime}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {next ? (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: next.slug }}
                    className="group flex flex-col items-end gap-2 rounded-2xl border border-border bg-card p-6 text-right transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-elegant"
                  >
                    <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      Next article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="font-display text-sm font-semibold leading-snug group-hover:text-brand transition-colors">
                      {next.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {next.category} · {next.readTime}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </section>
        )}

        {/* Related articles */}
        {relatedBlogs.length > 0 && (
          <section className="border-t border-border bg-card/30">
            <div className="mx-auto max-w-7xl px-6 py-16">
              <h2 className="font-display text-2xl font-semibold tracking-tight mb-8">
                More in {blog.category}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {relatedBlogs.map((b, i) => (
                  <BlogCard key={b.id} blog={b} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </ThemeProvider>
  );
}
