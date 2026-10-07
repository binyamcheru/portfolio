import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Markdown from "@/components/ui/Markdown";
import { blogPosts } from "@/lib/blog-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[820px] px-6 py-8 sm:px-10 sm:py-10">
      <div>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={12} aria-hidden="true" />
        Writing
      </Link>

      <header className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
          {post.category} · {post.date} · {post.readTime}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
      </header>

      <div className="article mt-10 border-t border-line pt-10">
        <Markdown source={post.content} />

        {post.challenge && (
          <blockquote>
            <p className="font-mono text-xs uppercase tracking-wider text-subtle">Why it matters</p>
            <p className="mt-2">{post.challenge}</p>
          </blockquote>
        )}

        {post.codeSnippet && (
          <pre>
            <code>{post.codeSnippet}</code>
          </pre>
        )}
      </div>
      </div>
    </article>
  );
}
