import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Tools } from "@/components/portfolio/Tools";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { CaseStudies } from "@/components/portfolio/CaseStudies";
import { Certifications } from "@/components/portfolio/Certifications";
import { Blogs } from "@/components/portfolio/Blogs";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pratham — Computer Engineering Student, Analyst & Future Consultant" },
      { name: "description", content: "Portfolio of Pratham — a Computer Engineering student bridging technology, data, and business strategy. Projects, case studies, and analytics work." },
      { property: "og:title", content: "Pratham — Technology, Data & Strategy" },
      { property: "og:description", content: "Premium portfolio: software projects, analytics case studies, certifications, and writing." },
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
        <CaseStudies />
        <Certifications />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
