import { useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import resumePdf from "../../assets/Pratham_Mishra_Resume_2026.pdf";
const ROLES = [
  "Computer Engineering Student",
  "Aspiring Analyst",
  "Technology Enthusiast",
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  const handleResumeClick = () => {
    void fetch(resumePdf, { method: "HEAD" })
      .then((response) => {
        if (!response.ok) {
          console.error(`Resume not found at ${resumePdf} (status ${response.status}).`);
        }
      })
      .catch((error) => {
        console.error(`Failed to check resume at ${resumePdf}.`, error);
      });
  };

  return (
    <section id="top" className="relative isolate flex min-h-screen items-center overflow-hidden pt-24">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-brand" />
            Available for internships & analyst roles
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient-brand">Pratham Mishra</span>
            <br />
            <span className="inline-flex h-[1.2em] items-baseline overflow-hidden text-foreground">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROLES[idx]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl font-medium text-muted-foreground sm:text-4xl lg:text-5xl"
                >
                  {ROLES[idx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Bridging Technology, Data, and Business Strategy — building intelligent systems and
            uncovering insights that move organizations forward.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={resumePdf}
              onClick={handleResumeClick}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-accent"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {[
              { v: 10, s: "+", l: "Projects" },
              { v: 6, s: "+", l: "Certifications" },
              { v: 6, s: "+", l: "Blogs" },
              { v: 4, s: "+", l: "Case Studies" },
            ].map((s) => (
              <div key={s.l} className="bg-card p-5">
                <div className="font-display text-3xl font-semibold text-gradient-brand">
                  <CountUp to={s.v} suffix={s.s} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
