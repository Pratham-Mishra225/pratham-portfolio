import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Send, Check, Loader2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Section } from "./Section";

// ── Config ──────────────────────────────────────────────────────────────────
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;
const SUBMISSION_COOLDOWN_MS = 30_000; // 30-second cooldown between submissions
const MESSAGE_MAX_CHARS = 1500;

// ── Validation schema ────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Enter a valid email address").max(160),
  subject: z.string().trim().min(2, "Subject is required").max(120),
  message: z.string().trim().min(10, "Tell me a little more (min 10 characters)").max(MESSAGE_MAX_CHARS),
});

type FormErrors = Record<string, string>;

// ── Submit status types ─────────────────────────────────────────────────────
type SubmitStatus = "idle" | "loading" | "success" | "error";

// ── Main Contact Component ───────────────────────────────────────────────────
export function Contact() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [msgLen, setMsgLen] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const lastSubmitRef = useRef<number>(0);

  const loading = status === "loading";
  const sent = status === "success";

  // ── Submit handler ─────────────────────────────────────────────────────────
  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cooldown check
    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMISSION_COOLDOWN_MS) {
      const remaining = Math.ceil((SUBMISSION_COOLDOWN_MS - (now - lastSubmitRef.current)) / 1000);
      toast.warning(`Please wait ${remaining}s before sending another message.`);
      return;
    }

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    // Zod validation
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: FormErrors = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      toast.error("Please fix the errors below before sending.");
      return;
    }
    setErrors({});
    setStatus("loading");

    // Honeypot check (client-side, double-checked server-side)
    if ((data.honeypot as string)?.trim() !== "") {
      // Silent reject — look like success to bots
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      formRef.current?.reset();
      setMsgLen(0);
      return;
    }

    // No script URL configured → show friendly dev message
    if (!SCRIPT_URL || SCRIPT_URL.includes("YOUR_SCRIPT_ID")) {
      await new Promise((r) => setTimeout(r, 600));
      setStatus("error");
      toast.error(
        "Contact form not yet connected. See DEPLOYMENT.md to set up Google Apps Script.",
        { duration: 6000 }
      );
      setStatus("idle");
      return;
    }

    try {
      // Use FormData (not JSON) so the browser sends a simple POST request
      // with no custom Content-Type header — this bypasses the CORS preflight
      // that Google Apps Script cannot handle.
      const formData = new FormData();
      formData.append("name",      parsed.data.name);
      formData.append("email",     parsed.data.email);
      formData.append("subject",   parsed.data.subject);
      formData.append("message",   parsed.data.message);
      formData.append("honeypot",  String(data.honeypot ?? ""));
      formData.append("userAgent", navigator.userAgent);

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body:   formData,
        // Do NOT set Content-Type — the browser sets it automatically
        // with the correct multipart boundary for FormData.
      });

      // Apps Script always returns 200 even for errors; parse the body
      let json: { success: boolean; error?: string } = { success: false };
      try {
        json = await res.json();
      } catch {
        throw new Error("Unexpected response from server.");
      }

      if (!json.success) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      lastSubmitRef.current = Date.now();
      setStatus("success");
      formRef.current?.reset();
      setMsgLen(0);
      toast.success("Message sent! I'll get back to you within 24 hours. 🎉", {
        duration: 5000,
      });

      // Auto-reset success state after 4s
      setTimeout(() => setStatus("idle"), 4000);

    } catch (err: unknown) {
      setStatus("error");
      const message =
        err instanceof Error ? err.message : "Network error. Please try again.";
      toast.error(message, { duration: 6000 });
      setStatus("idle");
    }
  }, []);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="Open to internships, analyst roles, consulting opportunities, and student collaborations."
    >
      <div className="grid gap-10 lg:grid-cols-5">
        {/* Left column */}
        <div className="lg:col-span-2">
          <div className="space-y-3">
            <ContactLink icon={Mail} label="Email" value="prathammishra225@gmail.com" href="mailto:prathammishra225@gmail.com" />
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

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 rounded-2xl border border-border bg-card p-7 shadow-elegant"
          noValidate
        >
          {/* Honeypot — hidden from real users, visible to bots */}
          <input
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="name"
              label="Name"
              placeholder="Your full name"
              error={errors.name}
              disabled={loading || sent}
            />
            <Field
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email}
              disabled={loading || sent}
            />
          </div>

          <div className="mt-4">
            <Field
              name="subject"
              label="Subject"
              placeholder="What's this about?"
              error={errors.subject}
              disabled={loading || sent}
            />
          </div>

          {/* Message with character counter */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <span
                className={`text-xs tabular-nums transition-colors ${msgLen > MESSAGE_MAX_CHARS * 0.9
                    ? msgLen >= MESSAGE_MAX_CHARS
                      ? "text-destructive"
                      : "text-amber-500"
                    : "text-muted-foreground"
                  }`}
              >
                {msgLen}/{MESSAGE_MAX_CHARS}
              </span>
            </div>
            <textarea
              name="message"
              rows={5}
              maxLength={MESSAGE_MAX_CHARS}
              disabled={loading || sent}
              placeholder="Tell me about your project, idea, or opportunity…"
              onChange={(e) => setMsgLen(e.target.value.length)}
              className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand disabled:opacity-60 placeholder:text-muted-foreground/50"
            />
            {errors.message && (
              <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              id="contact-submit-btn"
              disabled={loading || sent}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" /> Message sent!
                  </motion.span>
                ) : loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" /> Send message
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-destructive"
                >
                  Something went wrong — check the notification above.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Privacy note */}
          <p className="mt-4 text-[11px] text-muted-foreground/60">
            Your message is stored securely and never shared. I'll reply to your email directly.
          </p>
        </motion.form>
      </div>
    </Section>
  );
}

// ── Field component ─────────────────────────────────────────────────────────
function Field({
  name,
  label,
  type = "text",
  error,
  placeholder,
  disabled,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        maxLength={200}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand disabled:opacity-60 placeholder:text-muted-foreground/50"
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── ContactLink component ───────────────────────────────────────────────────
function ContactLink({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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
