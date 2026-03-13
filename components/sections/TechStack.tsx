"use client";

import React from "react";
import Spotlight from "@/components/ui/Spotlight";
import {
    Code2,
    Server,
    Database,
    Cloud,
    Wrench,
    Target
} from "lucide-react";

const stackItems = [
    {
        title: "Frontend",
        category: "React / Next.js",
        items: [
            { name: "Next.js", icon: Code2 },
            { name: "React", icon: Code2 },
            { name: "TypeScript", icon: Code2 },
            { name: "Tailwind", icon: Code2 },
        ],
        mainIcon: Code2,
    },
    {
        title: "Backend",
        category: "Node.js / Python",
        items: [
            { name: "Node.js", icon: Server },
            { name: "Express", icon: Server },
            { name: "Django", icon: Server },
            { name: "NestJS", icon: Server },
        ],
        mainIcon: Server,
    },
    {
        title: "Database",
        category: "Storage & Cache",
        items: [
            { name: "PostgreSQL", icon: Database },
            { name: "MongoDB", icon: Database },
            { name: "Redis", icon: Database },
            { name: "Prisma", icon: Database },
        ],
        mainIcon: Database,
    },
    {
        title: "Infrastructure",
        category: "DevOps",
        items: [
            { name: "AWS", icon: Cloud },
            { name: "Docker", icon: Cloud },
            { name: "CI/CD", icon: Cloud },
            { name: "Vercel", icon: Cloud },
        ],
        mainIcon: Cloud,
    },
    {
        title: "Tools",
        category: "Productivity",
        items: [
            { name: "Git", icon: Wrench },
            { name: "Jest", icon: Wrench },
            { name: "Postman", icon: Wrench },
            { name: "Figma", icon: Wrench },
        ],
        mainIcon: Wrench,
    },
    {
        title: "Current Focus",
        category: "Systems Design",
        items: [
            { name: "Microservices", icon: Target },
            { name: "Event-Driven", icon: Target },
            { name: "Web3", icon: Target },
            { name: "AI Integration", icon: Target },
        ],
        mainIcon: Target,
    },
];

export default function TechStack() {
    return (
        <section id="tech-stack" className="py-20 space-y-10">
            <div className="space-y-4">
                <h2 className="text-primary font-mono text-sm tracking-tighter uppercase font-bold">Docs / core-concepts</h2>
                <h1 className="text-4xl font-bold text-white tracking-tight">Technical Proficiency.</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stackItems.map((item, idx) => (
                    <Spotlight key={idx} className="rounded-2xl h-full">
                        <div className="bg-[#0B0118]/40 backdrop-blur-sm p-8 h-full border border-white/5 flex flex-col gap-6 group transition-all duration-300 hover:border-primary/20 hover:translate-y-[-4px]">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                                    <item.mainIcon className="text-primary" size={24} />
                                </div>
                                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                    {item.category}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xl font-bold text-white">{item.title}</h4>
                                <div className="h-0.5 w-12 bg-primary/30 group-hover:w-24 transition-all duration-500" />
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                {item.items.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-white/50 group/item hover:bg-primary/5 hover:text-white transition-all cursor-default"
                                    >
                                        <skill.icon size={12} className="text-primary/40 group-hover/item:text-primary transition-colors" />
                                        <span>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Spotlight>
                ))}
            </div>
        </section>
    );
}
