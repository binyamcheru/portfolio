"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import Spotlight from "@/components/ui/Spotlight";
import { personaKnowledge } from "@/lib/persona/knowledge";

export default function Projects() {
    return (
        <section id="projects" className="py-20 space-y-12">
            <div className="space-y-4">
                <h2 className="text-primary font-mono text-sm tracking-tighter uppercase font-bold">Portfolio / projects</h2>
                <h1 className="text-4xl font-bold text-white tracking-tight">High-Impact Projects.</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {personaKnowledge.projects.map((project) => {
                    const card = project.card;
                    if (!card) return null;

                    return (
                    <Spotlight key={project.name} className="rounded-2xl">
                        <div className="bg-[#0B0118]/40 backdrop-blur-sm h-full border border-white/5 group overflow-hidden flex flex-col hover:border-primary/20 transition-all duration-500">
                            <div className="relative h-56 w-full overflow-hidden border-b border-white/5">
                                <Image
                                    src={card.image}
                                    alt={project.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-[#0B0118]/40" />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <div className="px-2 py-0.5 rounded-sm bg-black/60 border border-white/10 text-[10px] font-mono text-white/60">
                                        {card.status}
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6">
                                    <h4 className="text-2xl font-bold text-white tracking-tight">{project.name}</h4>
                                    <p className="text-white/40 text-xs font-mono">{project.subtitle}</p>
                                </div>
                            </div>

                            <div className="p-8 space-y-8 flex-1 flex flex-col">
                                <div className="space-y-6 flex-1">
                                    <div className="space-y-2 border-l-2 border-primary/20 pl-4 py-1">
                                        <p className="text-[10px] uppercase tracking-widest text-primary font-bold">The Problem</p>
                                        <p className="text-sm text-white/50 leading-relaxed">{card.problem}</p>
                                    </div>
                                    <div className="space-y-2 border-l-2 border-primary/20 pl-4 py-1">
                                        <p className="text-[10px] uppercase tracking-widest text-primary font-bold">The Action</p>
                                        <p className="text-sm text-white/50 leading-relaxed">{card.action}</p>
                                    </div>
                                    <div className="space-y-2 border-l-2 border-white/10 pl-4 py-1">
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">The Quantified Result</p>
                                        <p className="text-sm text-white/80 leading-relaxed font-bold">{card.result}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex gap-2">
                                        {project.technologies.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] font-mono text-white/30">
                                                #{tag.toLowerCase().replace('.', '')}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        {project.repository && (
                                            <a href={project.repository} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source code`} className="text-white/40 hover:text-white transition-colors">
                                                <Github size={18} />
                                            </a>
                                        )}
                                        <a href={project.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name}`} className="text-white/40 hover:text-white transition-colors">
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Spotlight>
                    );
                })}
            </div>
        </section>
    );
}
