import { personaKnowledge } from "@/lib/persona/knowledge";

export type Project = (typeof personaKnowledge.projects)[number];
export type ProjectCategory = "frontend" | "backend" | "fullstack" | "extension";

export const projects = personaKnowledge.projects;

/** Hand-picked "selected work" shown on the home page. */
export const featuredProjects = projects.filter((p) => p.featured);

export const categories: ReadonlyArray<{ key: ProjectCategory; label: string; blurb: string }> = [
  { key: "fullstack", label: "Full-stack", blurb: "End to end: data model, API and UI." },
  { key: "frontend", label: "Frontend", blurb: "Interfaces, interaction and performance." },
  { key: "backend", label: "Backend", blurb: "APIs, auth, databases and services." },
  { key: "extension", label: "Extension", blurb: "Browser extensions and developer tools." },
];

export function categoryLabel(key: ProjectCategory) {
  return categories.find((c) => c.key === key)?.label ?? key;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  };
}

export function shortName(project: Project) {
  return project.name.split(" - ")[0];
}

/** Screenshots for the gallery: the card image plus any optional `gallery` entries. */
export function galleryOf(project: Project): string[] {
  const extra = "gallery" in project && Array.isArray(project.gallery) ? [...project.gallery] : [];
  return project.card ? [project.card.image, ...extra] : extra;
}

/** Phone screenshots are tall; the gallery renders them contained instead of cropped. */
export function isPortrait(project: Project) {
  return "portrait" in project && project.portrait === true;
}
