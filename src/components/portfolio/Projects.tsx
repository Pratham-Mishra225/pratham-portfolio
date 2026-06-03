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
    title: "AIDIS",
    tagline: "AI-powered decision intelligence platform for business strategy and operations",
    problem: "Organizations frequently face complex decisions involving multiple objectives, trade-offs, and uncertain outcomes. Existing BI tools explain what happened but rarely recommend what to do next.",
    solution: "Developed an Autonomous AI Decision Intelligence System that leverages multiple AI agents to analyze business inputs, generate strategic recommendations, evaluate alternatives, and support iterative decision-making.",
    tech: [
      "FastAPI",
      "LangGraph",
      "LangChain",
      "Google Gemini",
      "Next.js",
      "React",
      "TypeScript",
      "SQLite",
      "JWT"
    ],
    impact: "Bridges the gap between business analytics and strategic decision-making by converting raw inputs into actionable recommendations and structured executive insights.",
    github: "https://github.com/Pratham-Mishra225/AIDIS",
    demo: "#",
    architecture: "Multi-agent backend architecture coordinates specialized AI agents responsible for analysis, recommendation generation, trade-off evaluation, and refinement. A modern frontend provides intake workflows, live AI reasoning streams, and executive-friendly reports.",
    features: [
      "AI decision-support workflows",
      "Executive recommendation reports",
      "Strategic trade-off evaluation",
      "Scenario analysis",
      "Multi-agent reasoning pipeline",
      "Interactive refinement loop",
      "Secure user authentication",
      "Persistent analysis sessions"
    ],
    learnings: "Learned advanced AI system architecture, multi-agent orchestration, business strategy modeling, decision-support frameworks, and how to build enterprise-style AI applications that combine analytics with strategic recommendations.",
    span: "lg:col-span-1 lg:row-span-2",
    accent: "from-amber-500/20 to-brand/20",
  },
  {
    title: "Social Media Crisis Agent",
    tagline: "AI-powered social media crisis detection and response system",
    problem: "Brands and organizations struggle to identify and respond quickly to negative social media trends, viral complaints, and reputation-threatening conversations before they escalate.",
    solution: "Built an AI-driven crisis monitoring agent that analyzes social media content, detects potential reputation risks, classifies crisis severity, and generates actionable response recommendations in real time.",
    tech: ["Python", "AI/ML", "NLP", "React", "TypeScript", "API Integration"],
    impact: "Enabled faster crisis identification and reduced manual monitoring effort by automating sentiment analysis and risk assessment workflows.",
    github: "https://github.com/Pratham-Mishra225/Social_Media_Crisis_Agent",
    demo: "https://social-media-crisis-agent.vercel.app/",
    architecture: "Data ingestion layer collects social media content through APIs, NLP models process sentiment and context, a classification engine determines crisis severity, and a dashboard presents insights and recommended actions.",
    features:[
        "Real-time sentiment analysis",
        "Crisis severity classification",
        "Automated alert generation",
        "Trend and keyword monitoring",
        "AI-powered response suggestions",
        "Interactive analytics dashboard"],
    learnings: "Learned how AI agents can be applied to reputation management, explored NLP-based sentiment analysis, and designed workflows that convert large volumes of unstructured social media data into actionable business insights.",
    span: "lg:col-span-1 lg:row-span-2",
    accent: "from-brand/30 to-brand-glow/20",
  },
  {
    title: "PromptVault",
    tagline: "Centralized AI prompt management and productivity platform",
    problem: "AI users often lose effective prompts across chats, notes, and documents, making prompt reuse, organization, and optimization difficult.",
    solution: "Built a prompt management platform that allows users to store, organize, search, and manage AI prompts through a structured and user-friendly interface.",
    tech: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "Local Storage"],
    impact: "Created a centralized workspace for prompt engineering, improving prompt discoverability and reducing time spent recreating prompts.",
    github: "https://github.com/Pratham-Mishra225/PromptVault",
    demo: "https://prompt-vault-225.vercel.app/",
    architecture: "Frontend-first application with client-side storage, prompt categorization system, search functionality, and responsive UI optimized for productivity workflows.",
    features: [
        "Prompt creation and management",
        "Category-based organization",
        "Keyword search and filtering",
        "Responsive dashboard",
        "Prompt editing and updating",
        "Local data persistence"
      ],
    learnings: "Learned how to design productivity-focused applications, manage structured user-generated content, implement efficient search workflows, and create intuitive interfaces for AI-powered use cases.",
    accent: "from-emerald-500/20 to-brand/20",
  },
  {
    title: "Quiz Master Hub",
    tagline: "Interactive quiz platform for learning, assessment, and performance tracking",
    problem: "Students and learners often lack engaging platforms to test their knowledge, track progress, and identify learning gaps through structured assessments.",
    solution: "Developed a full-featured quiz management platform where users can attempt quizzes, view results, monitor performance, and improve learning through interactive assessments.",
    tech: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    impact: "Created a scalable assessment platform that transforms static learning into an interactive and measurable experience.",
    github: "https://github.com/Pratham-Mishra225/Quiz-Master-Hub",
    demo: "#",
    architecture: "Frontend application with modular quiz components, state management for question flow, score calculation engine, and responsive user interface for seamless participation across devices.",
    features: [
      "Multiple quiz categories",
      "Real-time score calculation",
      "Timer-based assessments",
      "Instant result generation",
      "Performance tracking",
      "Responsive user experience"
    ],
    learnings: "Learned how to design assessment systems, manage application state for multi-step workflows, implement scoring logic, and create engaging educational user experiences.",
    accent: "from-blue-500/20 to-brand/20",
  },
  {
    title: "BlogSpace",
    tagline: "Full-stack publishing platform for long-form writing and creator communities",
    problem: "Most blogging platforms either overwhelm writers with complexity or lack the social and editorial features needed to build an engaged publishing community.",
    solution: "Built a full-stack publishing platform that provides a distraction-free writing experience, rich-text content creation, reader engagement features, and a scalable backend architecture for future multi-author publishing workflows.",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Router",
      "Tailwind CSS",
      "Zustand",
      "TipTap",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT Authentication",
      "Zod",
      "Radix UI"
    ],
    impact: "Created a production-style publishing platform that combines modern frontend engineering with scalable backend architecture, supporting both content creators and readers.",
    github: "https://github.com/Pratham-Mishra225/BlogSpace",
    demo: "#",
    architecture: "React frontend built with TanStack Router, Zustand, and TipTap communicates with an Express API backed by MongoDB. JWT authentication secures user access while Mongoose models manage users, posts, drafts, likes, and follows. The system is designed to evolve from a mock-data prototype into a fully integrated production platform.",
    features: [
      "Rich-text article editor",
      "Draft saving and publishing workflow",
      "Authentication and profile management",
      "Like and follow system",
      "Article search and filtering",
      "Public author profiles",
      "Light and dark themes",
      "Responsive editorial reading experience",
      "Markdown rendering support",
      "Role-ready backend API foundation"
    ],
    learnings: "Learned full-stack application architecture, JWT-based authentication, MongoDB schema design, rich-text editor integration, state management with Zustand, API design with Express, and building scalable content-management workflows.",
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
