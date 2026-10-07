import type { Metadata } from "next";
import { personaKnowledge } from "@/lib/persona/knowledge";
import { shortName } from "@/lib/projects";
import { employerNotes, resumeContact, resumeProfile, resumeProjects, resumeSummary } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume",
  robots: { index: false, follow: false },
};

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const abbr = (period: string) =>
  period.replace(/(January|February|March|April|June|July|August|September|October|November|December)/g, (m) => m.slice(0, 3));

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-1 mt-3 border-b border-[#111] pb-0.5 font-display text-[11pt] font-bold uppercase tracking-[0.08em] text-[#111] first:mt-0">
      {children}
    </h2>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-1 space-y-[2px] pl-4">
      {items.map((b) => (
        <li key={b} className="list-disc text-[9.1pt] leading-[1.3] text-[#222] marker:text-[#777]">
          {b}
        </li>
      ))}
    </ul>
  );
}

function Row({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div className="min-w-0">{left}</div>
      {right && <div className="shrink-0 text-[9pt] text-[#555]">{right}</div>}
    </div>
  );
}

export default function ResumePage() {
  const { experience, skills, educationAndTraining, credentials } = personaKnowledge;
  const jobs = [...experience].reverse();
  const awards = credentials.filter((c) => c.type === "award");
  const certs = credentials.filter((c) => c.type === "certificate");

  return (
    <main className="resume-doc mx-auto min-h-screen max-w-[210mm] bg-white px-[16mm] py-[13mm] font-sans text-[#111] print:min-h-0 print:px-0 print:py-0">
      {/* Header */}
      <header className="text-center">
        <h1 className="font-display text-[21pt] font-extrabold uppercase leading-none tracking-tight">
          {resumeProfile.fullName}
        </h1>
        <p className="mt-1 text-[10.5pt] italic text-[#333]">{resumeProfile.professionalTitle}</p>
        <p className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[8.8pt] text-[#333]">
          <a href={`mailto:${resumeContact.email}`}>{resumeContact.email}</a>
          <span className="text-[#aaa]">|</span>
          <span>{resumeContact.phone}</span>
          <span className="text-[#aaa]">|</span>
          <span>{resumeProfile.location}</span>
        </p>
        <p className="mt-0.5 flex flex-wrap justify-center gap-x-3 text-[8.8pt] text-[#333]">
          <a href={resumeContact.linkedin}>{host(resumeContact.linkedin)}</a>
          <span className="text-[#aaa]">|</span>
          <a href={resumeContact.portfolio}>{host(resumeContact.portfolio)}</a>
          <span className="text-[#aaa]">|</span>
          <a href={resumeContact.github}>{host(resumeContact.github)}</a>
        </p>
      </header>

      {/* Summary */}
      <section className="mt-3">
        <H2>Professional Summary</H2>
        <p className="text-[9.1pt] leading-[1.3] text-[#222]">{resumeSummary}</p>
      </section>

      {/* Experience */}
      <section>
        <H2>Professional Experience</H2>
        <div className="space-y-2">
          {jobs.map((job) => (
            <article key={`${job.organization}-${job.role}`}>
              <Row
                left={<h3 className="font-display text-[10.2pt] font-bold">{job.role}</h3>}
                right={`${abbr(job.period)} | ${job.location}`}
              />
              <p className="text-[9.2pt] italic text-[#444]">
                {job.organization}
                {employerNotes[job.organization] && <span className="not-italic text-[#666]"> — {employerNotes[job.organization]}</span>}
              </p>
              <Bullets items={job.responsibilities.slice(0, 3)} />
              <p className="mt-1 text-[8.8pt] text-[#333]">
                <span className="font-semibold">Tech:</span> {job.technologies.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <H2>Selected Projects</H2>
        <div className="space-y-2">
          {resumeProjects.map(({ project, tagline, bullets, stack, link, linkLabel }) => {
            const url = link ?? host(project.website ?? project.repository ?? "");
            return (
              <article key={project.slug}>
                <Row
                  left={
                    <h3 className="font-display text-[10.2pt] font-bold">
                      {shortName(project)}
                      <span className="font-sans text-[9.2pt] font-normal italic text-[#444]"> — {tagline}</span>
                    </h3>
                  }
                  right={url && <a href={`https://${url}`}>{linkLabel ?? url}</a>}
                />
                <Bullets items={bullets} />
                <p className="mt-1 text-[8.8pt] text-[#333]">
                  <span className="font-semibold">Tech:</span> {stack}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Skills */}
      <section>
        <H2>Skills</H2>
        <dl className="space-y-0.5 text-[9.1pt] leading-[1.3]">
          {(
            [
              ["Languages", skills.programmingLanguages],
              ["Frameworks & Tech", skills.frameworksAndTechnologies],
              ["Tools & Platforms", skills.toolsAndPlatforms],
            ] as const
          ).map(([label, items]) => (
            <div key={label} className="flex gap-2">
              <dt className="w-[34mm] shrink-0 font-semibold">{label}</dt>
              <dd className="text-[#222]">{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Education + Certifications side by side */}
      <div className="grid grid-cols-[1fr_1.25fr] gap-x-6">
        <section>
          <H2>Education & Training</H2>
          <ul className="space-y-[3px] text-[9.1pt] leading-[1.3]">
            {educationAndTraining.map((item) => (
              <li key={`${item.institution}-${item.program}`}>
                <span className="font-display font-bold">
                  {item.institution.replace("Addis Ababa Science and Technology University", "AASTU").replace("Google Developer Groups (GDG)", "GDG")}
                </span>
                <span className="text-[#444]">
                  {" · "}
                  {item.program.replace("ALX Back-End Web Development Program", "Back-End Web Development")}
                  {"period" in item && item.period && ` · ${abbr(item.period).replace(/ 20(\d\d)/g, " '$1")}`}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <H2>Certifications & Awards</H2>
          <ul className="space-y-[3px] text-[9.1pt] leading-[1.3]">
            {awards.map((c) => (
              <li key={c.name}>
                <span className="font-display font-bold">{c.name}</span>
                <span className="text-[#444]"> · {c.issuer.replace("Addis Ababa Science and Technology University", "AASTU")} · GPA 3.88/4.00</span>
              </li>
            ))}
            {certs.map((c) => (
              <li key={c.name}>
                <span className="font-display font-bold">{c.name.replace(" — YeMuya Weg Initiative", "")}</span>
                <span className="text-[#444]">
                  {" · "}
                  {c.issuer.replace("Google Developer Groups (GDG)", "GDG")}
                  {c.period && ` · ${abbr(c.period).replace(/ 20(\d\d)/g, " '$1")}`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
