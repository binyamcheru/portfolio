"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { categories, categoryLabel, isPortrait, projects, shortName, type Project, type ProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const btn =
  "inline-flex h-9 items-center gap-2 rounded-md border px-3 font-mono text-[11px] uppercase tracking-wider transition-colors";

function Row({
  project,
  index,
  open,
  onToggle,
  onHover,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
  onHover: (p: Project | null, e?: MouseEvent) => void;
}) {
  const card = project.card;
  const panelId = `project-panel-${project.slug}`;

  return (
    <li
      className="border-b border-line"
      onMouseEnter={(e) => !open && onHover(project, e)}
      onMouseLeave={() => onHover(null)}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[3rem_1fr_auto_2rem] sm:gap-6"
      >
        <span className="font-mono text-[11px] text-subtle">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-display text-xl font-bold leading-tight tracking-tight text-heading transition-colors group-hover:text-accent sm:text-2xl">
          {shortName(project)}
        </span>
        <span className="hidden font-mono text-[11px] uppercase tracking-wider text-subtle sm:block">
          {categoryLabel(project.category)}
        </span>
        <ArrowRight
          size={16}
          className={cn("justify-self-end text-subtle transition-transform duration-300", open ? "rotate-90 text-accent" : "group-hover:translate-x-1")}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="grid gap-8 pb-8 sm:grid-cols-[3rem_1fr] sm:gap-6"
      >
        <span aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            <p className="max-w-xl text-sm leading-relaxed text-muted">{project.description}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <li key={t} className="rounded border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href={`/projects/${project.slug}`} className={cn(btn, "border-accent text-accent hover:bg-accent hover:text-accent-fg")}>
                View details
              </Link>
              {project.repository && (
                <a href={project.repository} target="_blank" rel="noopener noreferrer" className={cn(btn, "border-line text-muted hover:border-line-strong hover:text-heading")}>
                  <Github size={12} /> Source code
                </a>
              )}
              {project.website && (
                <a href={project.website} target="_blank" rel="noopener noreferrer" className={cn(btn, "border-line text-muted hover:border-line-strong hover:text-heading")}>
                  <ArrowUpRight size={12} /> Live demo
                </a>
              )}
            </div>
          </div>

          {card && (
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`${shortName(project)} details`}
              className="relative hidden aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:-rotate-1 lg:block"
            >
              <Image src={card.image} alt="" fill sizes="320px" className={cn("object-top", isPortrait(project) ? "object-contain" : "object-cover")} />
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

export default function ProjectList({
  items = projects,
  initialOpen,
  showFilters = true,
}: {
  items?: readonly Project[];
  initialOpen?: string;
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(initialOpen ?? null);
  const [hovered, setHovered] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const shown = filter === "all" ? items : items.filter((p) => p.category === filter);
  const tabs: Array<{ key: Filter; label: string }> = [{ key: "all", label: "All" }, ...categories.map((c) => ({ key: c.key, label: c.label }))];

  function place(e: MouseEvent, instant = false) {
    const el = previewRef.current;
    if (!el) return;
    gsap.to(el, { x: e.clientX + 24, y: e.clientY - 90, duration: instant ? 0 : 0.5, ease: "power3.out", overwrite: "auto" });
  }

  function onMove(e: MouseEvent<HTMLUListElement>) {
    if (hovered) place(e);
  }

  function onHover(p: Project | null, e?: MouseEvent) {
    if (p && e) place(e, true);
    setHovered(p);
  }

  const previewImage = hovered?.card?.image;

  return (
    <div>
      {showFilters && (
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const selected = tab.key === filter;
          return (
            <button
              key={tab.key}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => {
                setFilter(tab.key);
                setOpenSlug(null);
              }}
              className={cn(
                btn,
                selected ? "border-accent bg-accent/10 text-accent" : "border-line text-muted hover:border-line-strong hover:text-heading",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      )}

      {shown.length > 0 ? (
        <ul
          className={cn("border-t border-line", showFilters && "mt-8")}
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(null)}
        >
          {shown.map((project, i) => (
            <Row
              key={project.slug}
              project={project}
              index={i}
              open={openSlug === project.slug}
              onToggle={() => {
                setOpenSlug((cur) => (cur === project.slug ? null : project.slug));
                setHovered(null);
              }}
              onHover={onHover}
            />
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-lg border border-dashed border-line-strong p-8 text-center text-sm text-muted">
          No {categoryLabel(filter as ProjectCategory).toLowerCase()} projects yet. Coming soon.
        </p>
      )}

      {/* Cursor-following preview for collapsed rows (desktop only) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-30 hidden w-[300px] overflow-hidden rounded-lg border border-line bg-surface-2 shadow-2xl shadow-black/30 transition-opacity duration-200 lg:block",
          previewImage && !openSlug ? "opacity-100" : "opacity-0",
        )}
        style={{ rotate: "-2deg" }}
      >
        {previewImage && (
          <div className="relative aspect-[16/10]">
            <Image src={previewImage} alt="" fill sizes="300px" className={cn("object-top", hovered && isPortrait(hovered) ? "object-contain" : "object-cover")} />
          </div>
        )}
      </div>
    </div>
  );
}
