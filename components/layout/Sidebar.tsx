"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  Briefcase,
  Code2,
  GraduationCap,
  Github,
  Home,
  Linkedin,
  Link2,
  Mail,
  MapPin,
  Menu,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ThemeSwitchCard } from "@/components/layout/Theme";
import { personaKnowledge } from "@/lib/persona/knowledge";
import { cn } from "@/lib/utils";

const nav: Array<{ id: string; label: string; icon: LucideIcon }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

const { profile, contact } = personaKnowledge;
const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const contactLinks = [
  { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
  { icon: MapPin, label: profile.location },
  { icon: Link2, label: host(contact.portfolio), href: contact.portfolio },
  { icon: Github, label: host(contact.github), href: contact.github },
  { icon: Linkedin, label: host(contact.linkedin), href: contact.linkedin },
];

function Monogram() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-card font-display text-base font-extrabold tracking-tighter text-heading">
      BC
    </span>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const body = (
    <div className="flex h-full flex-col gap-8 p-5">
      <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
        <Monogram />
        <span>
          <span className="block font-display text-[15px] font-bold leading-tight text-heading">{profile.displayName}</span>
          <span className="block text-xs text-muted">{profile.shortTitle}</span>
        </span>
      </Link>

      <nav aria-label="Sections">
        <ul className="space-y-1">
          {nav.map(({ id, label, icon: Icon }) => {
            const isActive = pathname === "/" && active === id;
            return (
              <li key={id}>
                <Link
                  href={id === "home" ? "/" : `/#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors",
                    isActive
                      ? "bg-surface-2 font-medium text-heading"
                      : "text-muted hover:bg-surface-2/60 hover:text-heading",
                  )}
                >
                  <Icon size={15} className={isActive ? "text-heading" : "text-subtle"} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <figure className="rounded-xl border border-line bg-card p-4">
        <blockquote className="font-display text-[13px] font-semibold leading-snug text-heading">
          &ldquo;{profile.motto}&rdquo;
        </blockquote>
        <figcaption className="mt-3 h-px w-6 bg-line-strong" aria-hidden="true" />
      </figure>

      <div>
        <h2 className="font-display text-sm font-bold text-heading">Contact</h2>
        <ul className="mt-3 space-y-2.5">
          {contactLinks.map(({ icon: Icon, label, href }) => (
            <li key={label} className="flex items-center gap-2.5 text-xs text-muted">
              <Icon size={13} className="shrink-0 text-subtle" />
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="truncate transition-colors hover:text-heading"
                >
                  {label}
                </a>
              ) : (
                <span className="truncate">{label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <ThemeSwitchCard />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile bar */}
      <div className="no-print flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <Monogram />
          <span className="font-display text-sm font-bold text-heading">{profile.displayName}</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-muted hover:text-heading"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="absolute inset-y-0 left-0 w-[280px] overflow-y-auto bg-surface shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-3 rounded-lg p-2 text-muted hover:text-heading"
            >
              <X size={18} />
            </button>
            {body}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="no-print hidden border-r border-line bg-surface lg:block">
        <div className="sticky top-0 h-screen max-h-[calc(100vh-4rem)] overflow-y-auto">{body}</div>
      </aside>
    </>
  );
}
