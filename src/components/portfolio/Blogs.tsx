import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { Section } from "./Section";

const posts = [
  { cat: "Analytics", title: "How I think about KPIs that actually move decisions", time: "6 min", summary: "Most dashboards measure what's easy. Here's a framework for measuring what matters." },
  { cat: "Technology", title: "The underrated power of SQL window functions", time: "8 min", summary: "Window functions changed how I model analytical questions in production data." },
  { cat: "Business", title: "Frameworks aren't answers — they're scaffolding", time: "5 min", summary: "Porter, SWOT, and 5-Whys are starting points, not conclusions." },
  { cat: "Entrepreneurship", title: "Validating an idea in 14 customer conversations", time: "7 min", summary: "A repeatable script I used to test 2 startup concepts on campus." },
  { cat: "Analytics", title: "From notebook to narrative: storytelling with data", time: "9 min", summary: "Why the last 10% of an analysis is what makes leaders act." },
  { cat: "Technology", title: "A student's roadmap to AWS fundamentals", time: "6 min", summary: "What to learn in what order — without drowning in services." },
];

export function Blogs() {
  return (
    <Section id="blog" eyebrow="Writing" title="From the blog" description="Notes on technology, analytics, and the business of building.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <motion.a
            key={p.title}
            href="#"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:scale-[1.01] hover:border-brand/50 hover:shadow-elegant"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-brand">
                {p.cat}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {p.time}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight">
              {p.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.summary}</p>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
              Read article
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
