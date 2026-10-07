import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Zap,
} from "lucide-react";
import { ThemeIconButton } from "@/components/layout/Theme";
import ProjectList from "@/components/resume/ProjectList";
import ContactForm from "@/components/resume/ContactForm";
import { Bullets, Chip, Section, TimelineItem } from "@/components/resume/primitives";
import { personaKnowledge } from "@/lib/persona/knowledge";
import { featuredProjects, projects } from "@/lib/projects";

const RESUME_PDF = "/Binyam_Cheru_Resume.pdf";

export default function Home() {
  const { profile, contact, experience, skills, educationAndTraining, credentials } = personaKnowledge;
  const jobs = [...experience].reverse();
  const headlineSkills = [...skills.frameworksAndTechnologies.slice(0, 4), ...skills.programmingLanguages.slice(0, 2)];
  const allSkills = [...skills.frameworksAndTechnologies, ...skills.programmingLanguages, ...skills.toolsAndPlatforms];

  return (
    <div className="resume">
      {/* Profile */}
      <section id="home" aria-label="Profile" className="relative px-6 pb-8 pt-8 sm:px-10 sm:pt-10">
        <div className="no-print mb-6 flex items-center gap-2 sm:absolute sm:right-10 sm:top-10 sm:mb-0">
          <ThemeIconButton />
          <a
            href={RESUME_PDF}
            download
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-card px-3 text-xs font-medium text-heading transition-colors hover:bg-surface"
          >
            <Download size={13} /> Download PDF
          </a>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-line bg-surface sm:h-28 sm:w-28">
            <Image src="/bini-dev.png" alt={`Portrait of ${profile.displayName}`} fill sizes="112px" priority className="object-cover" />
          </div>
          <div className="min-w-0 pt-1 sm:pr-56">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-heading sm:text-[34px]">{profile.displayName}</h1>
            <p className="mt-1 text-base text-muted print-muted">{profile.shortTitle}</p>
            <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-muted print-muted">{profile.shortSummary}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {headlineSkills.map((s) => (
                <li key={s}>
                  <Chip>{s}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience */}
      <Section id="experience" icon={Briefcase} title="Experience">
        <ol>
          {jobs.map((job, i) => (
            <TimelineItem
              key={`${job.organization}-${job.role}`}
              period={job.period}
              title={job.role}
              subtitle={job.organization}
              tag={job.technologies.slice(0, 2).join(" / ")}
              isLast={i === jobs.length - 1}
            >
              <Bullets items={job.responsibilities.slice(0, 3)} />
            </TimelineItem>
          ))}
        </ol>
      </Section>

      {/* Projects */}
      <Section id="projects" icon={Code2} title="Selected Work" action={{ label: `All ${projects.length} projects`, href: "/projects" }}>
        <ProjectList items={featuredProjects} showFilters={false} />
      </Section>

      {/* Skills + Education */}
      <div className="grid border-t border-line lg:grid-cols-[1fr_1.2fr]">
        <Section id="skills" icon={Zap} title="Skills" className="border-t-0">
          <ul className="flex flex-wrap gap-2">
            {allSkills.map((s) => (
              <li key={s}>
                <Chip className="px-2.5 py-1.5 text-xs">{s}</Chip>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="education" icon={GraduationCap} title="Education" className="border-t-0 lg:border-l lg:border-line">
          <ol className="space-y-5">
            {educationAndTraining.map((item) => (
              <li key={`${item.institution}-${item.program}`} className="grid gap-1 sm:grid-cols-[110px_1fr] sm:gap-4">
                <p className="font-mono text-[11px] text-subtle print-muted sm:pt-0.5">
                  {"period" in item && item.period ? item.period : "Ongoing"}
                </p>
                <div>
                  <h3 className="font-display text-[13.5px] font-bold leading-snug text-heading">{item.institution}</h3>
                  <p className="mt-0.5 text-xs text-muted print-muted">{item.program}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      {/* Certifications & awards */}
      <Section id="certifications" icon={Award} title="Certifications & Awards">
        <ul className="print-grid grid gap-3 sm:grid-cols-2">
          {credentials.map((c) => (
            <li key={c.name}>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group print-keep flex h-full gap-4 rounded-xl border border-line bg-card p-4 transition-colors hover:border-line-strong"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-heading">
                  <Award size={14} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-[13.5px] font-bold leading-snug text-heading">{c.name}</span>
                    <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-subtle transition-colors group-hover:text-heading" />
                  </span>
                  <span className="mt-1 block text-xs text-muted print-muted">
                    {c.issuer}
                    {c.period && <span className="text-subtle"> · {c.period}</span>}
                  </span>
                  <span className="mt-2.5 flex flex-wrap gap-1.5">
                    <Chip className="capitalize">{c.type}</Chip>
                    {c.evidence.slice(0, 2).map((e) => (
                      <Chip key={e}>{e}</Chip>
                    ))}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* Contact */}
      <Section id="contact" icon={Mail} title="Contact">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-[13.5px] leading-relaxed text-muted print-muted">
              Open to full-time roles and freelance work. I usually reply within a day.
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
                { icon: Phone, label: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, "")}` },
                { icon: MapPin, label: profile.location },
                { icon: Github, label: "github.com/binyamcheru", href: contact.github },
                { icon: Linkedin, label: "linkedin.com/in/binyam-cheru", href: contact.linkedin },
              ].map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3 text-muted">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface text-heading">
                    <Icon size={13} />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="transition-colors hover:text-heading"
                    >
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="no-print rounded-xl border border-line bg-surface p-5">
            <ContactForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
