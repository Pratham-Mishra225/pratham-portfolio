import { motion } from "framer-motion";
import { Section } from "./Section";
import { Target, Microscope, Sparkles, ClipboardList } from "lucide-react";

const cases = [
  {
    title: "Improving College Placement Process",
    industry: "Education",
    problem: "Placement cell suffered from low company-student match rates.",
    analysis: "Reviewed 3 years of placement data, ran SWOT, interviewed 12 students.",
    findings: "Mismatched skill expectations and weak pre-placement signaling.",
    recommendations: "Skill-mapping form, mock interviews per stream, recruiter-facing brochure.",
  },
  {
    title: "Zomato Business Analysis",
    industry: "Foodtech",
    problem: "Restaurant churn rising in tier-2 cities.",
    analysis: "Built cohort + Porter's 5 forces analysis on public data.",
    findings: "Commission structure misaligned with low-AOV markets.",
    recommendations: "Tiered commissions, micro-marketing toolkits, listing audits.",
  },
  {
    title: "Hospital Queue Optimization",
    industry: "Healthcare",
    problem: "OPD waiting time averaged 95 minutes.",
    analysis: "Time-motion study + Little's Law modeling across 5 stations.",
    findings: "Two bottlenecks accounted for 60% of waiting time.",
    recommendations: "Token batching, kiosk pre-triage, staff rotation policy.",
  },
  {
    title: "Student Productivity Analysis",
    industry: "Higher Ed",
    problem: "Students reported feeling overwhelmed but low output.",
    analysis: "Survey of 200+ students, time-use diaries, correlation analysis.",
    findings: "Context switching, not workload, drove perceived overload.",
    recommendations: "Time-blocking workshops, syllabus consolidation, focus rooms.",
  },
];

const labels = [
  { k: "Problem", icon: Target },
  { k: "Analysis", icon: Microscope },
  { k: "Findings", icon: Sparkles },
  { k: "Recommendations", icon: ClipboardList },
];

export function CaseStudies() {
  return (
    <Section id="case-studies" eyebrow="Case studies" title="Thinking like a consultant" description="Structured problem-framing, evidence-based analysis, and crisp recommendations — the way a consulting team would deliver them.">
      <div className="grid gap-6 lg:grid-cols-2">
        {cases.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-brand/50 hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-brand">{c.industry}</div>
              <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                Case 0{i + 1}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{c.title}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {labels.map((l, idx) => (
                <div key={l.k} className="rounded-xl border border-border bg-background/60 p-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <l.icon className="h-3.5 w-3.5 text-brand" />
                    {l.k}
                  </div>
                  <p className="mt-1.5 text-sm text-foreground/90">{[c.problem, c.analysis, c.findings, c.recommendations][idx]}</p>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
