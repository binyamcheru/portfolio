"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Download, FileCode, ChevronRight, ExternalLink } from "lucide-react";

export default function Hero() {
    return (
        <section id="introduction" className="py-6 lg:py-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Documentation Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-white/30 border-b border-white/5 pb-4">
                <span className="hover:text-primary cursor-pointer transition-colors">Docs</span>
                <ChevronRight size={10} />
                <span className="text-white/60">Introduction</span>
            </div>

            <div className="flex flex-col-reverse lg:flex-row items-start gap-12 w-full">
                <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                            Binyam Cheru
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
                                Junior Fullstack Engineer
                            </span>
                            <span className="text-white/20 text-xs font-mono">v1.1.0-stable</span>
                        </div>
                    </div>

                    <div className="space-y-6 max-w-2xl">
                        <div className="prose prose-invert prose-purple max-w-none">
                            <p className="text-lg text-white/60 leading-relaxed font-medium">
                                A passionate <span className="text-white">Junior Fullstack Engineer</span> dedicated to building
                                <span className="text-white font-bold"> clean</span>,
                                <span className="text-white"> user-centric</span> web applications.
                                I focus on learning best practices and delivering reliable code while exploring modern technologies.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Problem</p>
                                <p className="text-xs text-white/50 leading-relaxed">Static, non-responsive web experiences with inconsistent user flows.</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Action</p>
                                <p className="text-xs text-white/50 leading-relaxed">Leveraging modern frameworks like Next.js and React to build dynamic interfaces.</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Result</p>
                                <p className="text-xs text-white/50 leading-relaxed">Seamless user experiences and high-quality, maintainable codebases.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a
                            href="#contact"
                            className="px-6 py-3 rounded-md bg-primary text-white font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            Contact Me <ArrowRight size={16} />
                        </a>
                        <a
                            href="https://drive.google.com/file/d/1CpoApg893HCTbGLKyHDr3ceri1yfbIem/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-md glass border border-white/5 text-white font-bold text-sm flex items-center gap-2 hover:bg-white/5 transition-all"
                        >
                            View Resume <ExternalLink size={16} className="text-primary" />
                        </a>
                        <a
                            href="/Binyam_Cheru_Resume.pdf"
                            download
                            className="px-6 py-3 rounded-md glass border border-white/5 text-white font-bold text-sm flex items-center gap-2 hover:bg-white/5 transition-all"
                        >
                            Download Resume <Download size={16} className="text-primary" />
                        </a>
                    </div>
                </div>

                <div className="relative group shrink-0">
                    <div className="absolute -inset-4 bg-primary/10 blur-[80px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative w-40 h-40 lg:w-56 lg:h-56 rounded-2xl overflow-hidden glass border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 p-2">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <Image
                                src="/bini-dev.webp"
                                alt="Binyam Cheru"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
