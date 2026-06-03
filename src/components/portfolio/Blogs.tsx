import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Section } from "./Section";
import { BlogCard } from "./BlogCard";
import { blogData } from "@/data/blogData";

export function Blogs() {
  return (
    <Section
      id="blog"
      eyebrow="Writing"
      title="From the blog"
      description="Notes on technology, analytics, and the business of building."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogData.map((blog, i) => (
          <BlogCard key={blog.id} blog={blog} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-10 flex justify-center"
      >
        <Link
          to="/blog"
          className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-brand/50 hover:bg-accent hover:text-foreground hover:shadow-elegant"
        >
          View all articles
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </Section>
  );
}
