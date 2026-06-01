import { motion } from "framer-motion";
import { GraduationCap, Target, Compass, BookOpen, Cloud, BarChart3, Briefcase, Lightbulb } from "lucide-react";
import { Section } from "./Section";

const timeline = [
  { year: "2023 – Present", title: "B.E. Computer Engineering", place: "Engineering College", icon: GraduationCap },
  { year: "2022 – 2023", title: "Higher Secondary, Science", place: "Topped class with distinction", icon: BookOpen },
  { year: "2025", title: "Operations & Strategy Intern", place: "Cross-functional analyst exposure", icon: Briefcase },
];

const interests = [
  { label: "Data Analytics", icon: BarChart3 },
  { label: "Business Analysis", icon: Target },
  { label: "Cloud Computing", icon: Cloud },
  { label: "Technology Strategy", icon: Compass },
  { label: "Entrepreneurship", icon: Lightbulb },
  { label: "Consulting", icon: Briefcase },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineer's mind. Analyst's curiosity." description="I'm a Computer Engineering student fascinated by the intersection of technology and business — where elegant systems meet rigorous analysis to create measurable outcomes.">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              I build software, study data, and frame problems the way a consultant would — starting with the
              question, not the tooling. My toolkit spans <span className="text-foreground">Java, Python, SQL</span>,
              dashboarding with <span className="text-foreground">Power BI &amp; Tableau</span>, and cloud
              fundamentals on <span className="text-foreground">AWS &amp; GCP</span>.
            </p>
            <p>
              I'm pursuing roles where I can sit at the table with engineers <em>and</em> executives — turning
              ambiguous problems into structured analyses, prototypes, and recommendations.
            </p>
            <div className="rounded-xl border border-border bg-card p-5 shadow-elegant">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Mission</div>
              <p className="mt-2 font-display text-lg text-foreground">
                "Translate complexity into clarity, and clarity into compounding business value."
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-4 text-sm font-medium text-muted-foreground">Career interests</div>
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
