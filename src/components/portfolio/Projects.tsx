import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ArrowUpRight, Layers, Zap, LineChart } from "lucide-react";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  tech: string[];
  impact: string;
  github: string;
  demo: string;
  architecture: string;
  features: string[];
  learnings: string;
  span?: string;
  accent?: string;
};

const projects: Project[] = [
  {
    title: "InsightOps Dashboard",
    tagline: "Real-time KPI tracking for ops teams",
    problem: "Leadership lacked visibility into daily operational KPIs scattered across spreadsheets.",
    solution: "Built a Power BI–style React dashboard pulling unified data with role-based views.",
    tech: ["React", "TypeScript", "Tailwind", "SQL"],
    impact: "Cut review prep time by 60% across 4 teams.",
    github: "#",
    demo: "#",
    architecture: "React frontend + REST API layer over a normalized SQL warehouse. Cached aggregates refreshed every 5 minutes.",
    features: ["Drill-down charts", "CSV export", "Role-based access", "Threshold alerts"],
    learnings: "Designed for the executive eye first; data engineers second.",
    span: "lg:col-span-2 lg:row-span-2",
    accent: "from-brand/30 to-brand-glow/20",
  },
  {
    title: "Zomato Demand Modeller",
    tagline: "Forecasting restaurant order spikes",
    problem: "Demand patterns varied wildly across cuisines and timeslots.",
    solution: "Built a Python notebook with regression + seasonality decomposition.",
    tech: ["Python", "Pandas", "Scikit-learn"],
    impact: "Reduced forecast error from 22% → 9%.",
    github: "#",
    demo: "#",
    architecture: "Pandas pipeline → SARIMAX & gradient boosting → matplotlib visuals.",
    features: ["Feature engineering", "Hyperparameter tuning", "Backtesting"],
    learnings: "Simple baselines beat fancy models when data is noisy.",
    accent: "from-emerald-500/20 to-brand/20",
  },
  {
    title: "Cloud Cost Auditor",
    tagline: "AWS spend insights for students",
    problem: "Free-tier students often overshoot accidentally.",
    solution: "Built a lightweight CLI that audits services & alerts on anomalies.",
    tech: ["Python", "AWS SDK", "Boto3"],
    impact: "Prevented overruns for 25+ student accounts.",
    github: "#",
    demo: "#",
    architecture: "Boto3 polling + local SQLite history + Slack webhook alerts.",
    features: ["Cost trend graphs", "Budget thresholds", "Email digest"],
    learnings: "Observability is a product feature, not an afterthought.",
    accent: "from-blue-500/20 to-brand/20",
  },
  {
    title: "ClassroomQ",
    tagline: "Anonymous Q&A for lectures",
    problem: "Students hesitated to ask questions during class.",
    solution: "Real-time anonymous Q&A web app with upvotes for professors.",
    tech: ["React", "Firebase", "Tailwind"],
    impact: "Used in 6 courses; 3x more questions per session.",
    github: "#",
    demo: "#",
    architecture: "Firestore realtime + auth-less session tokens.",
    features: ["Live upvotes", "Moderation", "Session archive"],
    learnings: "UX friction is what kept good ideas from surfacing.",
    accent: "from-amber-500/20 to-brand/20",
  },
  {
    title: "PlacementLens",
    tagline: "Analytics for campus placements",
    problem: "Placement cells lacked structured analysis of outcomes.",
    solution: "Designed a Tableau workbook + intake form pipeline.",
    tech: ["Tableau", "MySQL", "Excel"],
    impact: "Surfaced 5 actionable insights to faculty leadership.",
    github: "#",
    demo: "#",
    architecture: "Google Forms → CSV → MySQL → Tableau live connection.",
    features: ["Cohort comparison", "Company breakdowns", "Skill–offer correlation"],
    learnings: "Clean schemas save weeks downstream.",
    span: "lg:col-span-2",
    accent: "from-brand-glow/20 to-brand/20",
  },
];

const icons = [Layers, Zap, LineChart, Layers, LineChart];

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Section id="projects" eyebrow="Featured projects" title="Things I've built" description="A mix of software engineering and analytics work — each starts with a real problem and ends with measurable impact.">
      <div className="grid auto-rows-[14rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.button
              key={p.title}
              type="button"
              onClick={() => setOpen(p)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-brand/60 hover:shadow-glow",
                p.span
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity group-hover:opacity-70", p.accent)} />
              <div className="absolute inset-0 bg-grid opacity-[0.06]" />
              <div className="relative flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card/80 text-brand backdrop-blur">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <div className="relative">
                <h3 className="font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs text-muted-foreground backdrop-blur">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-background/70 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-8 shadow-elegant"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="text-xs uppercase tracking-widest text-brand">Case study</div>
              <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">{open.title}</h3>
              <p className="mt-1 text-muted-foreground">{open.tagline}</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Block label="Problem" body={open.problem} />
                <Block label="Solution" body={open.solution} />
                <Block label="Architecture" body={open.architecture} />
                <Block label="Impact" body={open.impact} />
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Features</div>
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {open.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="h-1 w-1 rounded-full bg-brand" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Tech</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {open.tech.map((t) => (
                    <span key={t} className="rounded-md border border-border bg-accent px-2 py-1 text-xs">{t}</span>
                  ))}
                </div>
              </div>

              <Block className="mt-6" label="Key learnings" body={open.learnings} />

              <div className="mt-8 flex flex-wrap gap-2">
                <a href={open.github} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:bg-accent">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href={open.demo} className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm text-brand-foreground">
                  <ExternalLink className="h-4 w-4" /> Live demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function Block({ label, body, className }: { label: string; body: string; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-background/60 p-4", className)}>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <p className="mt-1.5 text-sm text-foreground/90">{body}</p>
    </div>
  );
}
