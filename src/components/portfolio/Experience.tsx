import { motion } from "framer-motion";
import { Briefcase, Code2, Trophy, Rocket } from "lucide-react";
import { Section } from "./Section";

const items = [
  {
    icon: Briefcase,
    period: "2025",
    title: "Operations & Strategy Intern",
    org: "Cross-functional team",
    points: [
      "Mapped 4 core operational processes and identified 18% efficiency gains.",
      "Built a KPI dashboard adopted by leadership for weekly reviews.",
    ],
  },
  {
    icon: Code2,
    period: "2024 – Present",
    title: "College Projects",
    org: "Independent & team",
    points: [
      "Shipped 10+ academic and personal projects across web, data, and cloud.",
      "Maintained a public GitHub with documented case studies.",
    ],
  },
  {
    icon: Trophy,
    period: "2024",
    title: "Hackathons",
    org: "Inter-college finalists",
    points: [
      "Built MVPs under 36-hour constraints solving real business problems.",
      "Pitched solutions to industry judges and earned top-10 placements.",
    ],
  },
  {
    icon: Rocket,
    period: "Ongoing",
    title: "Entrepreneurship Activities",
    org: "Student innovation cell",
    points: [
      "Validated 2 startup ideas through customer interviews and SWOT.",
      "Drafted go-to-market and pricing strategies for prototypes.",
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've put the work in" description="A career trajectory shaped by hands-on building, structured analysis, and entrepreneurial curiosity.">
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand via-border to-transparent sm:left-1/2" />
        <div className="space-y-12">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative flex flex-col gap-4 sm:flex-row ${i % 2 === 0 ? "" : "sm:flex-row-reverse"}`}
            >
              <div className="absolute left-4 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-border bg-background sm:left-1/2">
                <it.icon className="h-4 w-4 text-brand" />
              </div>
              <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-12">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant transition-transform hover:-translate-y-1">
                  <div className="text-xs uppercase tracking-wider text-brand">{it.period}</div>
                  <div className="mt-1 font-display text-lg font-semibold">{it.title}</div>
                  <div className="text-sm text-muted-foreground">{it.org}</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
