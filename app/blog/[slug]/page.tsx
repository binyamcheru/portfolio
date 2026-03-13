"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";

import { useParams } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <h1 className="text-2xl font-bold text-white">Post not found</h1>
                <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="pb-20">
            {/* Back Button */}
            <Link
                href="/blog"
                className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-10 group"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Blog</span>
            </Link>

            <div className="flex flex-col lg:flex-row gap-12 relative">
                {/* Main Content */}
                <article className="flex-1 space-y-10 prose prose-invert prose-purple max-w-none">
                    <header className="space-y-6 pb-10 border-b border-white/10">
                        <div className="flex items-center gap-4 text-white/40 text-sm font-mono tracking-tighter uppercase font-bold">
                            <span className="text-primary">{post.category}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <div className="flex items-center gap-2">
                                <Calendar size={14} />
                                {post.date}
                            </div>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <div className="flex items-center gap-2">
                                <Clock size={14} />
                                {post.readTime}
                            </div>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-white/60 leading-relaxed font-medium italic">
                            "{post.excerpt}"
                        </p>
                    </header>

                    <div className="space-y-8 text-white/70 leading-relaxed text-lg whitespace-pre-wrap">
                        {post.content.split('\n\n').map((paragraph, idx) => {
                            if (paragraph.startsWith('###')) {
                                return <h3 key={idx} className="text-xl font-bold text-white pt-4">{paragraph.replace('### ', '')}</h3>
                            }
                            if (paragraph.startsWith('##')) {
                                return <h2 key={idx} className="text-2xl font-bold text-white pt-6">{paragraph.replace('## ', '')}</h2>
                            }
                            return <p key={idx}>{paragraph}</p>
                        })}

                        {post.challenge && (
                            <div className="glass p-8 rounded-2xl border border-white/10 my-10 bg-gradient-to-br from-primary/5 to-transparent">
                                <h3 className="text-xl font-bold text-white mb-4">The Challenge</h3>
                                <p className="text-white/60 italic">
                                    {post.challenge}
                                </p>
                            </div>
                        )}

                        {post.codeSnippet && (
                            <pre className="glass p-6 rounded-xl border border-white/10 overflow-x-auto text-sm font-mono text-primary/80">
                                <code>{post.codeSnippet}</code>
                            </pre>
                        )}
                    </div>
                </article>

                {/* Sticky Table of Contents */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-12 glass p-6 rounded-2xl border border-white/10 space-y-6">
                        <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold border-b border-white/5 pb-3">
                            Connect & Share
                        </h4>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm text-white/40">Sharing knowledge is the best way to grow. Share this insights with your network.</p>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <button className="text-white/40 hover:text-primary transition-colors p-2 rounded-lg hover:glass border border-transparent">
                                <Share2 size={18} />
                            </button>
                            <button className="text-white/40 hover:text-primary transition-colors p-2 rounded-lg hover:glass border border-transparent">
                                <Bookmark size={18} />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
