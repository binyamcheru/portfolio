import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import ProjectList from "@/components/resume/ProjectList";
import { personaKnowledge } from "@/lib/persona/knowledge";

export const metadata: Metadata = {
  title: "Projects",
  description: `All projects by ${personaKnowledge.profile.displayName}: full-stack, frontend and backend work.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="px-6 py-8 sm:px-10 sm:py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-heading">
        <ArrowLeft size={12} /> Back to resume
      </Link>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Portfolio</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
            Selected Work<span className="text-accent">.</span>
          </h1>
        </div>
        <a
          href={personaKnowledge.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-md border border-line px-3 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-line-strong hover:text-heading"
        >
          <Github size={12} /> GitHub
        </a>
      </div>

      <div className="mt-10">
        <ProjectList />
      </div>
    </div>
  );
}
