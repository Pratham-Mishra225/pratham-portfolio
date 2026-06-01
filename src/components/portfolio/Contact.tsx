import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Check } from "lucide-react";
import { z } from "zod";
import { Section } from "./Section";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "Tell me a little more").max(1500),
});

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSent(false), 3500);
    }, 700);
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something" description="Open to internships, analyst roles, consulting opportunities, and student collaborations.">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-3">
            <ContactLink icon={Mail} label="Email" value="prathammishra225@gmail.com" href="mailto:prathammishra@gmail.com" />
            <ContactLink icon={Linkedin} label="LinkedIn" value="prathammishraa" href="https://www.linkedin.com/in/prathammishraa/" />
            <ContactLink icon={Github} label="GitHub" value="Pratham-Mishra225" href="https://github.com/Pratham-Mishra225" />
          </div>
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-brand">Currently</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Based in India · Open to remote and on-site internships · Replies within 24 hours.
            </p>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 rounded-2xl border border-border bg-card p-7 shadow-elegant"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Name" error={errors.name} />
            <Field name="email" label="Email" type="email" error={errors.email} />
          </div>
          <div className="mt-4">
            <Field name="subject" label="Subject" error={errors.subject} />
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea
              name="message"
              rows={5}
              maxLength={1500}
              className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading || sent}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70"
          >
            {sent ? <><Check className="h-4 w-4" /> Sent</> : loading ? "Sending..." : <><Send className="h-4 w-4" /> Send message</>}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({ name, label, type = "text", error }: { name: string; label: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        maxLength={200}
        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ContactLink({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-elegant"
    >
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-brand-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </a>
  );
}
