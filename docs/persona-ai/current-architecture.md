# Persona AI: Current Portfolio Architecture (M0)

## Purpose

This document records how the portfolio works before Persona AI is added. It is the baseline for making small, explainable changes without prematurely designing the future npm package.

## Technology baseline

- Next.js 16.1.6 with the App Router
- React 19.2.3 and TypeScript in strict mode
- Tailwind CSS 4 through PostCSS
- GSAP and ScrollTrigger for section entrance animations
- Lucide React for icons
- npm with a committed `package-lock.json`
- Vercel as the deployed environment

There is currently no AI SDK, AI provider package, test framework, API route, environment file, or centralized portfolio data layer.

## Directory map

```text
app/
  layout.tsx              Root shell, metadata, fonts, background, sidebar
  page.tsx                Home-page section composition
  projects/page.tsx       Project archive page
  blog/page.tsx           Blog index
  blog/[slug]/page.tsx    Client-rendered blog detail
  globals.css             Tailwind theme and global utilities
  opengraph-image.tsx     Generated social image
  robots.ts               Crawler rules
  sitemap.ts              Public route sitemap

components/
  sections/               Hero, skills, projects, certificates, contact
  sidebar/Sidebar.tsx     Global navigation and mobile menu
  ui/                     GSAP Section wrapper and Spotlight effect

lib/
  blog-data.ts            Typed blog records
  gsap.ts                 Client-only GSAP plugin registration

public/                   Images and resume PDF
```

The project uses root-level `app`, `components`, and `lib` folders. It does not use a `src` folder, so Persona AI should follow the existing convention.

## Rendering and request boundaries

```text
RootLayout (server component)
├── global metadata, Google fonts, and background
├── Sidebar (client component)
└── route page
    └── section components (currently client components)
        ├── hardcoded display data
        ├── UI rendering
        └── browser interactions
```

Files without `"use client"` are server components by default. `app/layout.tsx` and `app/page.tsx` are server components, but every portfolio section is currently a client component. Some need the browser (`Contact`, `Section`, `Spotlight`, and `Sidebar`); others are client components even though their displayed data is static.

There are no `app/api/**/route.ts` files. The only live browser-side network request is the contact form's direct POST to Web3Forms. Persona AI will introduce the first application-owned server endpoint.

## Route map

| Route | Rendering role | Main responsibility |
| --- | --- | --- |
| `/` | Static page composition | Hero, stack, projects, certificates, contact |
| `/projects` | Client page | Reuses the same `Projects` component |
| `/blog` | Client page | Lists records from `lib/blog-data.ts` |
| `/blog/[slug]` | Dynamic client page | Finds a blog record using `useParams()` |
| `/opengraph-image` | Edge runtime | Generates the social preview image |
| `/robots.txt` | Metadata route | Search crawler rules |
| `/sitemap.xml` | Metadata route | Lists public routes |

The sidebar is mounted by the root layout, so it appears on every route. The future chat UI should also be mounted at this global level when it is ready to work across the entire site.

## Styling and interaction model

The visual language is defined in `app/globals.css` and repeated Tailwind utilities:

- deep purple background (`#0B0118`)
- purple primary color (`#A855F7`)
- glass panels and subtle white borders
- Geist and Geist Mono fonts
- fixed sidebar on desktop and fixed header/drawer on mobile
- `Spotlight` pointer-following card effect
- `Section` GSAP scroll entrance animation

The future chat should reuse these tokens and glass styling. Its floating trigger must avoid the mobile header, sidebar, contact controls, and viewport edges. The chat itself will require a client component because it owns open/close state and later message state.

## Current portfolio knowledge

| Knowledge | Current location | Reuse status |
| --- | --- | --- |
| Name, role, summary, resume | `components/sections/Hero.tsx` | Embedded in UI |
| Projects and project evidence | `components/sections/Projects.tsx` | Embedded in UI |
| Skills and current interests | `components/sections/TechStack.tsx` | Embedded in UI |
| Certificates, award, GPA | `components/sections/Certificates.tsx` | Embedded in UI |
| Email, location, availability | `components/sections/Contact.tsx` | Embedded in UI |
| Social profiles | `components/sidebar/Sidebar.tsx` | Embedded in UI |
| Blog content | `lib/blog-data.ts` | Already typed and reusable |
| Public identity and SEO claims | `app/layout.tsx`, `app/opengraph-image.tsx` | Duplicated metadata |

The project currently has no employment/experience dataset, even though the product plan expects questions about Kuraz Technologies and internships. Those facts must not be invented. They need to be explicitly supplied and verified in a later knowledge milestone.

Some identity language is inconsistent: metadata says “Full-Stack Systems Architect,” while visible UI says “Junior Fullstack Engineer.” Before grounding the assistant, Binyam should decide which descriptions are accurate and how they relate.

## Security and environment baseline

- `.gitignore` already excludes `.env*`, which protects a future `.env.local` by default.
- No environment files currently exist.
- The OpenAI key must be read only inside a server Route Handler. It must never use a `NEXT_PUBLIC_` prefix or enter a client component.
- The contact form currently includes a Web3Forms access key in client code. That is unrelated to the future OpenAI secret and should not be treated as a pattern for AI credentials.
- The public AI endpoint will eventually require validation, usage limits, and rate limiting, but those belong to the production-readiness milestone rather than M1.

## Recommended integration boundaries

For the first UI milestone, use this minimal shape:

```text
components/persona/
  PersonaChat.tsx          Owns temporary chat UI state

app/layout.tsx             Mounts PersonaChat once for all routes
```

For the later server milestone:

```text
app/api/persona/route.ts   Receives validated POST requests server-side
```

Do not create retrievers, parsers, provider interfaces, vector stores, or package-style abstractions during the early milestones.

When knowledge separation becomes the active milestone, move verified facts into shared typed modules under a project-consistent location such as `lib/persona/` or `data/persona/`. Then update both the visible sections and assistant to consume those modules. Do not maintain separate “website facts” and “AI facts.”

## Expected request lifecycle after the early milestones

```text
Visitor
  ↓ types a message
PersonaChat (client)
  ↓ POST /api/persona with UI messages
Route Handler (server)
  ↓ validates input and supplies trusted Binyam context
Vercel AI SDK
  ↓ calls the configured OpenAI model with a server-only key
OpenAI
  ↓ streams generated tokens
Route Handler
  ↓ streams the response protocol
PersonaChat
  ↓ updates the visible assistant message progressively
Visitor
```

The Vercel AI SDK will manage the streaming protocol and model integration. Portfolio knowledge, retrieval, grounding, source mapping, actions, validation policy, and product UI remain our responsibility.

## M0 decisions

1. Follow the repository's root-level folder convention; do not introduce `src/`.
2. Mount the eventual global chat component from `app/layout.tsx`.
3. Use `app/api/persona/route.ts` as the server boundary when the server milestone begins.
4. Build the UI with temporary local messages before connecting OpenAI.
5. Use npm for all dependency changes.
6. Keep the OpenAI key exclusively server-side in `.env.local` and document its name in `.env.example` only when AI integration begins.
7. Do not duplicate current portfolio facts for the long term; centralize them in the dedicated knowledge milestone.
8. Treat unsupported experience claims as missing data rather than inferring them from skills or projects.

## Risks to watch

- Hardcoded facts can drift between UI, metadata, and the assistant.
- Most static sections are client components, so importing server-only knowledge or secrets into them would be dangerous.
- A globally fixed chat can conflict with the fixed mobile header/sidebar if its stacking and responsive placement are not tested.
- `Projects` uses `#` for private repositories; rich assistant actions must not render those as usable external links.
- The current lint baseline has existing errors and warnings. New Persona AI code should not add more, and unrelated cleanup should remain separate.
- A successful local build may need network access because `next/font` downloads Google fonts during the build.

## M0 definition of done

- Existing routing, layout, styling, data, and client/server boundaries are documented.
- Reusable and embedded portfolio knowledge is identified.
- The future UI and server integration points are selected.
- No Persona AI feature code or dependencies have been added.
- Open questions are explicit rather than silently assumed.

