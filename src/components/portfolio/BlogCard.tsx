import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Blog } from "@/data/blogData";

const categoryColors: Record<string, string> = {
  Analytics: "bg-violet-500/10 text-violet-500 dark:bg-violet-500/20 dark:text-violet-400",
  Technology: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  Business: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  Entrepreneurship: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
};

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

export function BlogCard({ blog, index = 0 }: BlogCardProps) {
  const catClass =
    categoryColors[blog.category] ??
    "bg-accent text-brand";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: blog.slug }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-brand/50 hover:shadow-elegant cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${catClass}`}
          >
            {blog.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {blog.readTime}
          </span>
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight group-hover:text-brand transition-colors duration-200">
          {blog.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground flex-1">
          {blog.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{blog.publishedDate}</span>
          <div className="inline-flex items-center gap-1 text-sm font-medium text-brand">
            Read article
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
