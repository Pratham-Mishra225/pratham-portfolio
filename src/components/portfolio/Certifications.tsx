import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Section } from "./Section";

const certs = [
  { title: "Google Data Analytics", issuer: "Google", date: "2025", link: "#" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2024", link: "#" },
  { title: "Microsoft Power BI Analyst", issuer: "Microsoft", date: "2024", link: "#" },
  { title: "IBM Business Analyst", issuer: "IBM", date: "2024", link: "#" },
  { title: "Tableau Desktop Specialist", issuer: "Tableau", date: "2024", link: "#" },
  { title: "SQL for Data Science", issuer: "UC Davis / Coursera", date: "2023", link: "#" },
  { title: "Python for Everybody", issuer: "Coursera", date: "2023", link: "#" },
  { title: "Design Thinking", issuer: "IDEO U", date: "2023", link: "#" },
];

export function Certifications() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Verified credentials" description="Continuous learning across data, cloud, business analysis, and design thinking.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certs.map((c, i) => (
          <motion.a
            key={c.title}
            href={c.link}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-brand/60 hover:shadow-glow"
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/15 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-brand-foreground">
                <Award className="h-5 w-5" />
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            </div>
            <div className="relative mt-4">
              <div className="font-medium leading-snug">{c.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.issuer} · {c.date}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
