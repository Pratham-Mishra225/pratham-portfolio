import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const nav = ["About", "Skills", "Projects", "Case Studies", "Experience", "Certifications", "Blog", "Contact"];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Computer Engineering student bridging technology, data, and business strategy.
            </p>
           <div className="mt-4 flex gap-2">
    <a
      href="https://github.com/Pratham-Mishra225"
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
      <Github className="h-4 w-4" />
    </a>

    <a
      href="https://linkedin.com/in/prathammishraa"
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
      <Linkedin className="h-4 w-4" />
    </a>

    <a
      href="mailto:prathammishra225@gmail.com"
      className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
      <Mail className="h-4 w-4" />
    </a>
  </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Navigate</div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {nav.map((n) => (
                <li key={n}>
                  <a href={`#${n.toLowerCase().replace(" ", "-")}`} className="text-muted-foreground hover:text-foreground">
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start lg:items-end">
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-accent"
            >
              <ArrowUp className="h-4 w-4" />
              Back to top
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row"
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "0vh",
      }}>
          <div>© {new Date().getFullYear()} Pratham Mishra. Crafted with care.</div>
        </div>
      </div>
    </footer>
  );
}
