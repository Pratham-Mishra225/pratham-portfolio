import { motion } from "framer-motion";
import { Code2, BarChart3, Briefcase, Users } from "lucide-react";
import { Section } from "./Section";

const groups = [
  {
    icon: Code2,
    title: "Technical",
    items: ["Java", "Python", "C++", "SQL", "HTML", "CSS", "JavaScript"],
  },
  {
    icon: BarChart3,
    title: "Analytics",
    items: ["Data Analysis", "Business Analysis", "Dashboard Design", "Process Analysis", "KPI Analysis"],
  },
  {
    icon: Briefcase,
    title: "Business",
    items: ["Strategic Thinking", "Market Research", "Problem Solving", "Presentation Skills"],
  },
  {
    icon: Users,
    title: "Soft Skills",
    items: ["Communication", "Leadership", "Team Collaboration"],
  },
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="A T-shaped skill profile" description="Deep technical foundations, broad analytical and business range — combined to solve problems end-to-end.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/50 hover:shadow-glow"
          >
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-brand-foreground">
                <g.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{g.title}</h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-brand" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
