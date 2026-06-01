import { motion } from "framer-motion";
import {
  GitBranch, Github, Code, FileSpreadsheet, BarChart2, Database, Cloud,
  CloudCog, NotebookPen, LayoutGrid, PieChart, Server,
} from "lucide-react";
import { Section } from "./Section";

const tools = [
  { name: "Git", icon: GitBranch, cat: "Development", desc: "Version control workflows & branching strategies." },
  { name: "GitHub", icon: Github, cat: "Development", desc: "Collaboration, PR reviews, CI integrations." },
  { name: "VS Code", icon: Code, cat: "Development", desc: "Daily driver editor with tuned extensions." },
  { name: "Excel", icon: FileSpreadsheet, cat: "Data", desc: "Modeling, pivot tables, advanced formulas." },
  { name: "Power BI", icon: BarChart2, cat: "Data", desc: "Interactive dashboards & DAX measures." },
  { name: "Tableau", icon: PieChart, cat: "Data", desc: "Storytelling visualizations & exploration." },
  { name: "MySQL", icon: Database, cat: "Data", desc: "Schema design, joins, window functions." },
  { name: "AWS", icon: Cloud, cat: "Cloud", desc: "EC2, S3, IAM fundamentals." },
  { name: "Google Cloud", icon: CloudCog, cat: "Cloud", desc: "BigQuery & app deployment basics." },
  { name: "Notion", icon: NotebookPen, cat: "Productivity", desc: "Knowledge base, planning, documentation." },
  { name: "Google Workspace", icon: LayoutGrid, cat: "Productivity", desc: "Docs, Sheets, Slides for collaboration." },
  { name: "REST APIs", icon: Server, cat: "Development", desc: "Designing and consuming HTTP services." },
];

const marquee = [...tools, ...tools];

export function Tools() {
  return (
    <Section id="tools" eyebrow="Stack" title="Tools & technologies" description="The instruments I reach for — from code editors to BI platforms to cloud consoles.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: (i % 8) * 0.05 }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-elegant"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-brand transition-transform group-hover:scale-110 group-hover:rotate-3">
                <t.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.cat}</div>
              </div>
            </div>
            <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
              <p className="overflow-hidden text-sm text-muted-foreground">
                <span className="mt-3 block">{t.desc}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-xl border border-border bg-card/60 py-5 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {marquee.map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <t.icon className="h-4 w-4 text-brand" />
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
