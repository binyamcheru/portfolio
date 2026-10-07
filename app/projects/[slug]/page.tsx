import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Globe, Lock, Tag } from "lucide-react";
import ProjectGallery from "@/components/resume/ProjectGallery";
import { Bullets } from "@/components/resume/primitives";
import { categoryLabel, galleryOf, getAdjacentProjects, getProject, isPortrait, projects, shortName } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: shortName(project),
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: shortName(project),
      description: project.description,
      ...(project.card && { images: [{ url: project.card.image, alt: project.name }] }),
    },
  };
}

const badge = "inline-flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-wider";
const btn = "inline-flex h-9 items-center gap-2 rounded-md border px-3 font-mono text-[11px] uppercase tracking-wider transition-colors";

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const card = project.card;
  const images = galleryOf(project);
  const isPublic = Boolean(project.website || project.repository);

  return (
    <article className="px-6 py-8 sm:px-10 sm:py-10">
      <Link href="/projects" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-heading">
        <ArrowLeft size={12} /> Back to projects
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap gap-2">
          <span className={cn(badge, "border-line text-muted")}>
            <Tag size={10} /> {categoryLabel(project.category)}
          </span>
          <span className={cn(badge, isPublic ? "border-accent/40 text-accent" : "border-line text-muted")}>
            {isPublic ? <Globe size={10} /> : <Lock size={10} />} {isPublic ? "Public" : "Private"}
          </span>
          {card && (
            <span className={cn(badge, "border-line text-muted")}>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {card.status}
            </span>
          )}
          <span className={cn(badge, "border-line text-muted")}>{project.year}</span>
        </div>

        <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-heading sm:text-5xl">
          {shortName(project)}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-3 text-base text-muted">{project.subtitle}</p>

        {isPublic && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.website && (
              <a href={project.website} target="_blank" rel="noopener noreferrer" className={cn(btn, "border-accent text-accent hover:bg-accent hover:text-accent-fg")}>
                <ArrowUpRight size={12} /> Live demo
              </a>
            )}
            {project.repository && (
              <a href={project.repository} target="_blank" rel="noopener noreferrer" className={cn(btn, "border-line text-muted hover:border-line-strong hover:text-heading")}>
                <Github size={12} /> Source code
              </a>
            )}
          </div>
        )}
      </header>

      {images.length > 0 && (
        <div className="mt-10">
          <ProjectGallery images={images} title={shortName(project)} url={project.website} portrait={isPortrait(project)} />
        </div>
      )}

      <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1fr_260px] lg:gap-16">
        <div className="min-w-0 space-y-10">
          <section>
            <h2 className="font-display text-lg font-bold text-heading">Overview</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.description}</p>
            {card && (
              <>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{card.problem}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{card.action}</p>
              </>
            )}
          </section>

          {card && (
            <section className="rounded-xl border border-line bg-surface p-5">
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-accent">Outcome</h2>
              <p className="mt-2 font-display text-base font-semibold leading-snug text-heading">{card.result}</p>
            </section>
          )}

          <section>
            <h2 className="font-display text-lg font-bold text-heading">What I did</h2>
            <div className="mt-4">
              <Bullets items={project.contributions} />
            </div>
          </section>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
          <div>
            <h2 className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-accent">
              <Tag size={11} /> Technologies
            </h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <li key={t} className="rounded border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-accent">Links</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {project.website && (
                <li>
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-heading hover:text-accent">
                    Production deployment <ArrowUpRight size={12} />
                  </a>
                </li>
              )}
              {project.repository && (
                <li>
                  <a href={project.repository} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-heading hover:text-accent">
                    Repository <ArrowUpRight size={12} />
                  </a>
                </li>
              )}
              {!isPublic && <li className="text-muted">No public links for this project.</li>}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-accent">Role</h2>
            <p className="mt-2 text-sm text-heading">{project.role}</p>
          </div>
        </aside>
      </div>

      <nav aria-label="More projects" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="rounded-lg border border-line p-4 transition-colors hover:border-line-strong">
            <p className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-subtle">
              <ArrowLeft size={10} /> Previous
            </p>
            <p className="mt-2 font-display text-sm font-bold text-heading">{shortName(prev)}</p>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="rounded-lg border border-line p-4 text-right transition-colors hover:border-line-strong">
            <p className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-subtle">
              Next <ArrowRight size={10} />
            </p>
            <p className="mt-2 font-display text-sm font-bold text-heading">{shortName(next)}</p>
          </Link>
        )}
      </nav>
    </article>
  );
}
