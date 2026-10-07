import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  icon: Icon,
  title,
  action,
  children,
  className,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  action?: { label: string; href: string };
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-6 border-t border-line px-6 py-8 sm:px-10", className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 id={`${id}-title`} className="flex items-center gap-2.5 font-display text-lg font-bold text-heading">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface text-heading">
            <Icon size={14} />
          </span>
          {title}
        </h2>
        {action && (
          <Link href={action.href} className="no-print inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-heading">
            {action.label} <ArrowRight size={12} />
          </Link>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border border-line bg-surface px-2 py-1 text-[11px] font-medium text-muted", className)}>
      {children}
    </span>
  );
}

export function Ext({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn("inline-flex items-center gap-1 text-heading underline decoration-line-strong underline-offset-4 hover:decoration-heading", className)}
    >
      {children}
      {external && <ArrowUpRight size={12} className="text-subtle" aria-hidden="true" />}
    </a>
  );
}

export function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1.5 text-[13px] leading-relaxed text-muted print-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-subtle" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Timeline row: date gutter, dot on the rail, content, optional tag on the right. */
export function TimelineItem({
  period,
  title,
  subtitle,
  tag,
  children,
  isLast,
}: {
  period: string;
  title: ReactNode;
  subtitle?: ReactNode;
  tag?: string;
  children?: ReactNode;
  isLast?: boolean;
}) {
  return (
    <li className="relative grid gap-2 sm:grid-cols-[120px_1fr]">
      <p className="font-mono text-[11px] text-subtle print-muted sm:pt-0.5">{period}</p>
      <div className={cn("relative pl-6 sm:pl-7", !isLast && "pb-8")}>
        <span aria-hidden="true" className="absolute left-0 top-[7px] h-2 w-2 rounded-full border-2 border-subtle bg-card sm:left-1" />
        {!isLast && <span aria-hidden="true" className="absolute left-[3px] top-5 bottom-0 w-px bg-line sm:left-[7px]" />}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div>
            <h3 className="font-display text-[14px] font-bold leading-snug text-heading">{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs text-muted print-muted">{subtitle}</p>}
          </div>
          {tag && <Chip className="font-mono">{tag}</Chip>}
        </div>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </li>
  );
}
