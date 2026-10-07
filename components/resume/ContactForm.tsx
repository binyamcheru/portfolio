"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

const field =
  "w-full rounded-lg border border-line bg-card px-3 py-2 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-line-strong focus:outline-none";

type Status = { kind: "idle" } | { kind: "sent" } | { kind: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setSubmitting(true);
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        form.reset();
        setStatus({ kind: "sent" });
      } else {
        setStatus({ kind: "error", message: json.error ?? "Something went wrong. Try again or email me." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Try again or email me." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1 block text-[11px] font-medium text-muted">Name</label>
          <input id="c-name" name="name" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1 block text-[11px] font-medium text-muted">Email</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1 block text-[11px] font-medium text-muted">Message</label>
        <textarea id="c-message" name="message" rows={4} required className={`${field} resize-y`} />
      </div>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-heading px-4 text-sm font-medium text-card transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-accent dark:text-accent-fg"
        >
          {submitting ? "Sending…" : "Send message"} <Send size={13} />
        </button>
        <p role="status" aria-live="polite" className="text-xs text-muted">
          {status.kind === "sent" && "Thanks, I'll get back to you soon."}
          {status.kind === "error" && status.message}
        </p>
      </div>
    </form>
  );
}
