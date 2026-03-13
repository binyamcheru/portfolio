"use client";

import React from "react";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Spotlight from "@/components/ui/Spotlight";
import { Calendar, Clock, ArrowRight } from "lucide-react";

import { blogPosts } from "@/lib/blog-data";


export default function BlogPage() {
    return (
        <div className="pb-20 space-y-10">
            <div className="space-y-4 pt-10">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">Technical Insights</h1>
                <p className="text-white/60 max-w-2xl leading-relaxed">
                    Sharing my thoughts on systems architecture, frontend performance, and the tools that power the modern web.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-10">
                {blogPosts.map((post) => (
                    <Section key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>
                            <Spotlight className="rounded-2xl">
                                <div className="glass p-8 border border-white/5 hover:border-primary/20 transition-all group">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-4 text-white/40 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={14} />
                                                {post.readTime}
                                            </div>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{post.title}</h2>
                                    <p className="text-white/60 leading-relaxed max-w-3xl mb-6">{post.excerpt}</p>

                                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                        Read Post <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Spotlight>
                        </Link>
                    </Section>
                ))}
            </div>
        </div>
    );
}
