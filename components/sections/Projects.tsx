"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Spotlight from "@/components/ui/Spotlight";

const projects = [
    {
        title: "Yemuyaweg Initiative Website",
        subtitle: "Multilingual Official Platform",
        image: "/yemuyaweg.png",
        status: "Production",
        tags: ["Next.js", "Tailwind CSS", "Shadcn/UI", "Zod"],
        problem: "Need for a pixel-perfect, accessible, and multilingual official website to represent the initiative's activities.",
        action: "Converted Figma designs into a responsive site with multi-language support (Amharic, English, French, Arabic) and integrated APIs.",
        result: "Delivered a fully functional platform that secured an internship extension and provides global accessibility.",
        link: "https://yemuyaweginitiative.com/",
        github: "#", // Private repository
    },
    {
        title: "DevFlow",
        subtitle: "AI-Powered Developer Q&A",
        image: "/devFlow.png",
        status: "Live",
        tags: ["Next.js", "MongoDB", "Tailwind CSS", "Gemini API"],
        problem: "Developers need a modern knowledge-sharing platform with AI assistance to improve collaboration and problem-solving.",
        action: "Built a Stack Overflow-inspired platform using Auth.js and Gemini API for AI-assisted responses and developer collaboration features.",
        result: "Created a scalable application with smart features and responsive design for thousands of potential developer queries.",
        link: "https://devflow-nextjs-project-xnxb.vercel.app/",
        github: "https://github.com/binyamcheru/Devflow-Nextjs-Project",
    },
    {
        title: "KetemaFarm",
        subtitle: "Urban Farmers Marketplace",
        image: "/ketema-farm.png",
        status: "Hackathon",
        tags: ["React", "Tailwind CSS", "Marketplace"],
        problem: "Urban farmers struggle to connect directly with city consumers to sell fresh produce efficiently.",
        action: "Developed a marketplace UI for product browsing and listings during a fast-paced development sprint.",
        result: "Successfully built a connecting platform for city farms, improving local produce visibility and accessibility.",
        link: "https://ketemafarm-mu.vercel.app/",
        github: "#", // Private repository
    },
    {
        title: "Comfy Store",
        subtitle: "Furniture E-commerce Frontend",
        image: "/comfy-store.png",
        status: "Stable",
        tags: ["React", "Tailwind CSS", "Redux"],
        problem: "The requirement for a modern, responsive furniture store interface that integrates seamlessly with existing backend APIs.",
        action: "Implemented a complete shopping cart flow, product filtering, and responsive browsing experience.",
        result: "Delivered a high-performance frontend with 100% functional shopping experience and product discovery.",
        link: "https://comfy-store-website.vercel.app/",
        github: "https://github.com/binyamcheru/Comfy-Store-Website",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 space-y-12">
            <div className="space-y-4">
                <h2 className="text-primary font-mono text-sm tracking-tighter uppercase font-bold">Portfolio / projects</h2>
                <h1 className="text-4xl font-bold text-white tracking-tight">High-Impact Projects.</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <Spotlight key={idx} className="rounded-2xl">
                        <div className="bg-[#0B0118]/40 backdrop-blur-sm h-full border border-white/5 group overflow-hidden flex flex-col hover:border-primary/20 transition-all duration-500">
                            <div className="relative h-56 w-full overflow-hidden border-b border-white/5">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-[#0B0118]/40" />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <div className="px-2 py-0.5 rounded-sm bg-black/60 border border-white/10 text-[10px] font-mono text-white/60">
                                        {project.status}
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6">
                                    <h4 className="text-2xl font-bold text-white tracking-tight">{project.title}</h4>
                                    <p className="text-white/40 text-xs font-mono">{project.subtitle}</p>
                                </div>
                            </div>

                            <div className="p-8 space-y-8 flex-1 flex flex-col">
                                <div className="space-y-6 flex-1">
                                    <div className="space-y-2 border-l-2 border-primary/20 pl-4 py-1">
                                        <p className="text-[10px] uppercase tracking-widest text-primary font-bold">The Problem</p>
                                        <p className="text-sm text-white/50 leading-relaxed">{project.problem}</p>
                                    </div>
                                    <div className="space-y-2 border-l-2 border-primary/20 pl-4 py-1">
                                        <p className="text-[10px] uppercase tracking-widest text-primary font-bold">The Action</p>
                                        <p className="text-sm text-white/50 leading-relaxed">{project.action}</p>
                                    </div>
                                    <div className="space-y-2 border-l-2 border-white/10 pl-4 py-1">
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">The Quantified Result</p>
                                        <p className="text-sm text-white/80 leading-relaxed font-bold">{project.result}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex gap-2">
                                        {project.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] font-mono text-white/30">
                                                #{tag.toLowerCase().replace('.', '')}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <a href={project.github} target="_blank" className="text-white/40 hover:text-white transition-colors">
                                            <Github size={18} />
                                        </a>
                                        <a href={project.link} target="_blank" className="text-white/40 hover:text-white transition-colors">
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Spotlight>
                ))}
            </div>
        </section>
    );
}
