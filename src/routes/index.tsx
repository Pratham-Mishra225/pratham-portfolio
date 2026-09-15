import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Tools } from "@/components/portfolio/Tools";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Certifications } from "@/components/portfolio/Certifications";
import { Blogs } from "@/components/portfolio/Blogs";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pratham Mishra — Software Engineer | AI/ML & Data Analytics" },
      { name: "description", content: "Portfolio of Pratham Mishra — Software Engineer building AI/ML systems and data-driven applications. Full-stack development, machine learning, and analytics projects." },
      { property: "og:title", content: "Pratham Mishra — Software Engineer | AI/ML & Data Analytics" },
      { property: "og:description", content: "Software engineering, AI/ML systems, and data analytics projects." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Tools />
        <Experience />
        <Projects />
        <Certifications />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
