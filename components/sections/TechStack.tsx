"use client";

import React from "react";
import Spotlight from "@/components/ui/Spotlight";
import { Code2, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { personaKnowledge } from "@/lib/persona/knowledge";

type SkillGroupKey = keyof typeof personaKnowledge.skills;

const skillGroups = [
    {
        key: "programmingLanguages",
        title: "Programming Languages",
        category: "Core Languages",
        mainIcon: Code2,
    },
    {
        key: "frameworksAndTechnologies",
        title: "Frameworks & Technologies",
        category: "Web Development",
        mainIcon: Server,
    },
    {
        key: "toolsAndPlatforms",
        title: "Tools & Platforms",
        category: "Development Workflow",
        mainIcon: Wrench,
    },
] satisfies Array<{
    key: SkillGroupKey;
    title: string;
    category: string;
    mainIcon: LucideIcon;
}>;

export default function TechStack() {
    return (
        <section id="tech-stack" className="py-20 space-y-10">
            <div className="space-y-4">
                <h2 className="text-primary font-mono text-sm tracking-tighter uppercase font-bold">Docs / core-concepts</h2>
                <h1 className="text-4xl font-bold text-white tracking-tight">Technical Proficiency.</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillGroups.map((group) => {
                    const skills = personaKnowledge.skills[group.key];

                    return (
                    <Spotlight key={group.key} className="rounded-2xl h-full">
                        <div className="bg-[#0B0118]/40 backdrop-blur-sm p-8 h-full border border-white/5 flex flex-col gap-6 group transition-all duration-300 hover:border-primary/20 hover:translate-y-[-4px]">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                                    <group.mainIcon className="text-primary" size={24} />
                                </div>
                                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                    {group.category}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xl font-bold text-white">{group.title}</h4>
                                <div className="h-0.5 w-12 bg-primary/30 group-hover:w-24 transition-all duration-500" />
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                {skills.map((skill) => (
                                    <div
                                        key={skill}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-white/50 group/item hover:bg-primary/5 hover:text-white transition-all cursor-default"
                                    >
                                        <group.mainIcon size={12} className="text-primary/40 group-hover/item:text-primary transition-colors" />
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Spotlight>
                    );
                })}
            </div>
        </section>
    );
}
