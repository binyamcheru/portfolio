import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on backend systems, Next.js rendering and the tools behind modern web apps.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-8 sm:px-10 sm:py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-heading">
        <ArrowLeft size={12} /> Back to resume
      </Link>
      <header className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Writing</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Notes from the build
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Short explanations of things I’ve had to learn properly: runtimes,
          rendering strategies and the trade-offs behind them.
        </p>
      </header>

      <ul className="mt-12 divide-y divide-line border-t border-line">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-2 py-6 sm:grid-cols-[140px_1fr] sm:gap-10"
            >
              <p className="font-mono text-xs text-subtle">{post.date}</p>
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground underline-offset-4 group-hover:underline">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <p className="mt-3 font-mono text-[11px] text-subtle">
                  {post.category} · {post.readTime}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
