import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Section } from "./Section";

const certs = [
  { title: "Career Essentials in Business Analysis by Microsoft and LinkedIn", issuer: "Microsoft", date: "2025", link: "https://www.linkedin.com/learning/certificates/1882e6fd484e918baa7b3276ba914a465753697fb73074b7cc743addc844da6f" },
  { title: "McKinsey.org Forward Program", issuer: "McKinsey", date: "2025", link: "https://www.credly.com/badges/c61ea0ed-fee8-4d1b-9294-e694fcb482c1" },
  { title: "CS207: Fundamentals of Machine Learning", issuer: "Saylor", date: "2026", link: "https://learn.saylor.org/pluginfile.php/1/tool_certificate/issues/1775742890/9219432660PM.pdf" },
  { title: "Career Essentials in Generative AI by Microsoft and LinkedIn", issuer: "Microsoft", date: "2025", link: "https://www.linkedin.com/learning/certificates/de45012f4e45454acc606123991367645237c20bccaaa4e95e38a7f852577e77" },
  { title: "Learning AI for Business Analysis", issuer: "LinkedIn", date: "2025", link: "https://www.linkedin.com/learning/certificates/408cb473d6e5a90a6b3b63df88aed59a5738cbe871f2a803a925e0c88fea9057" },
  { title: "Generative AI for Business Analysts", issuer: "LinkedIn", date: "2025", link: "https://www.linkedin.com/learning/certificates/325771e3ab9d366a8250ff47d50165ae0cb2dfa2e2bbcaffc4b306bb13b7ae57" },
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
