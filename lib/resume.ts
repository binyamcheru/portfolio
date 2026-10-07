import { personaKnowledge } from "@/lib/persona/knowledge";
import { getProject } from "@/lib/projects";

/**
 * Resume-specific selection and copy. The site stays verbose; the PDF needs
 * one page of tight, impact-first bullets. Keep every claim consistent with
 * knowledge.ts.
 */

export const resumeSummary =
  "Full-stack developer who ships end to end: REST APIs, auth and data models in Node/TypeScript and Django, and fast, accessible interfaces in Next.js and React. Internship experience on production platforms, a published Chrome extension, and a habit of writing clean, documented code.";

type ResumeProject = {
  slug: string;
  tagline: string;
  bullets: string[];
  /** Short stack line; overrides the full technologies list. */
  stack: string;
  /** Which link to print; falls back to website, then repository. */
  link?: string;
  /** Display text for the link when the URL is too long to print. */
  linkLabel?: string;
};

const picks: ResumeProject[] = [
  {
    slug: "boardwave",
    tagline: "Real-time collaborative whiteboard with peer-to-peer video",
    bullets: [
      "Built a shared drawing canvas with live cursors synced over WebSockets, plus WebRTC mesh video/audio with STUN/TURN fallback; rooms with join codes, roles and peer limits.",
      "Designed the Express 5 + Prisma/PostgreSQL backend: JWT auth for REST and the socket handshake, email verification, debounced board persistence and reconnect with backoff.",
    ],
    stack: "React 19, TypeScript, Express 5, WebSockets, WebRTC, Prisma, PostgreSQL",
    link: "boardwave.vercel.app",
  },
  {
    slug: "bank-system-api",
    tagline: "Production-grade banking REST API",
    bullets: [
      "Implemented OTP email verification, Google OAuth, JWT access/refresh rotation with Redis revocation, and role-based admin endpoints.",
      "Built accounts, cards, atomic transfers and paginated statements; hardened with Zod validation, helmet, rate limiting and NoSQL-injection sanitisation.",
    ],
    stack: "Node.js, TypeScript, Express 5, MongoDB, Redis, Swagger/OpenAPI",
    link: "github.com/binyamcheru/bank-system-api",
  },
  {
    slug: "scrollshot",
    tagline: "Chrome extension published on the Chrome Web Store",
    bullets: [
      "Phone-style incremental scroll capture (full page, region, element, nested scroll areas, PDFs) with a full annotation and beautify workspace.",
      "Export to PNG/JPEG/PDF including searchable PDFs via on-device OCR in 13 languages; privacy-first, no account or upload.",
    ],
    stack: "TypeScript, Chrome Extensions API, Canvas, OCR",
    link: "chromewebstore.google.com/detail/cilmjodgabkgkfgmbjafklkbleelhfeh",
    linkLabel: "Chrome Web Store",
  },
];

/** Extra context printed under an employer name (the Stenar internship built the YeMuyaWeg platform). */
export const employerNotes: Record<string, string> = {
  "Stenar Trading": "YeMuyaWeg Initiative platform · yemuyaweginitiative.com",
};

export const resumeProjects = picks.map((pick) => {
  const project = getProject(pick.slug);
  if (!project) throw new Error(`Resume references unknown project: ${pick.slug}`);
  return { ...pick, project };
});

export const resumeContact = personaKnowledge.contact;
export const resumeProfile = personaKnowledge.profile;
