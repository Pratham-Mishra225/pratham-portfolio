import { motion } from "framer-motion";
import { GraduationCap, Code2, Cpu, Database, BookOpen } from "lucide-react";
import { Section } from "./Section";

const timeline = [
  { year: "2024 – Present", title: "B.E. Computer Engineering", place: "Thakur College of Engineering and Technology (9.23 CGPA)", icon: GraduationCap },
  { year: "2023 – 2024", title: "Higher Secondary, Science", place: "MGM College (88%)", icon: BookOpen },
];

const interests = [
  { label: "Software Engineering", icon: Code2 },
  { label: "AI/ML Systems", icon: Cpu },
  { label: "Data Analytics", icon: Database },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Building intelligent systems" description="I'm a Computer Engineering student focused on software engineering, AI/ML, and data analytics — turning complex problems into scalable solutions.">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              I build software systems, develop AI/ML applications, and analyze data to solve real problems. My work spans
              <span className="text-foreground"> full-stack development with React and Node.js</span>,
              <span className="text-foreground"> machine learning with Python and Scikit-learn</span>, and
              <span className="text-foreground"> data analytics with SQL and visualization tools</span>.
            </p>
            <p>
              I'm pursuing roles where I can apply software engineering fundamentals to build intelligent,
              data-driven applications — from backend APIs and database design to ML pipelines and analytics dashboards.
            </p>
            <div className="rounded-xl border border-border bg-card p-5 shadow-elegant">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Focus</div>
              <p className="mt-2 font-display text-lg text-foreground">
                "Build scalable software, leverage AI/ML for intelligent solutions, and use data to drive decisions."
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-4 text-sm font-medium text-muted-foreground">Technical interests</div>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <span
                  key={i.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-all hover:border-brand hover:shadow-glow"
                >
                  <i.icon className="h-3.5 w-3.5 text-brand" />
                  {i.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="relative pl-6">
            <div className="absolute inset-y-0 left-2 w-px bg-gradient-to-b from-brand via-border to-transparent" />
            {timeline.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative mb-8 last:mb-0"
              >
                <div className="absolute -left-[18px] grid h-4 w-4 place-items-center rounded-full border border-border bg-background">
                  <div className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                </div>
                <div className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-elegant">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                    <t.icon className="h-3.5 w-3.5 text-brand" />
                    {t.year}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold">{t.title}</div>
                  <div className="text-sm text-muted-foreground">{t.place}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
