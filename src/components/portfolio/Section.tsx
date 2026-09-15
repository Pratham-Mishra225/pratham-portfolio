import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28 lg:py-32", className)}>
      <div className="mx-auto max-w-7xl px-6">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-12 max-w-3xl"
          >
            {eyebrow && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-brand" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
            )}
            {description && (
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
