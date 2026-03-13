"use client";

import React from "react";
import Spotlight from "@/components/ui/Spotlight";
import { Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";

const certificates = [
    {
        title: "ALX Backend Development Certification",
        issuer: "ALX",
        date: "2024",
        link: "https://drive.google.com/file/d/1sH2-5wMb99LKrCZ5MWipNzEOeRSMETup/view?usp=drive_link",
        skills: ["Django", "REST APIs", "SQL", "Architecture"],
    },
    {
        title: "Frontend Development with React",
        issuer: "Google Developer Groups (GDG)",
        date: "2024",
        link: "https://drive.google.com/file/d/12pd5wToypXEpnGFrl2_hasKsB5AoqpKy/view?usp=drive_link",
        skills: ["React", "State Management", "Responsive UI", "Modern JS"],
    },
    {
        title: "Presidential Academic Award",
        issuer: "Software Engineering Department",
        date: "2024",
        link: "https://drive.google.com/file/d/10KXTy-pmsVsSJfln1RRVGXDUKjZyugu-/view?usp=drive_link",
        skills: ["Academic Excellence", "Eng. Principles", "3.88 GPA"],
    },
    {
        title: "Certificate of Appreciation",
        issuer: "YeMuya Weg Initiative",
        date: "2024",
        link: "https://drive.google.com/file/d/1B0IyQxRrs1mn8DYD57ky8QJMW9jylUuM/view?usp=drive_link",
        skills: ["Professionalism", "Web Development", "Dedication"],
    },
];

export default function Certificates() {
    return (
        <section id="certificates" className="py-20 space-y-10">
            <div className="space-y-4">
                <h2 className="text-primary font-mono text-sm tracking-tighter uppercase font-bold">Files / achievements</h2>
                <h1 className="text-4xl font-bold text-white tracking-tight">Certificates & Awards.</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert, idx) => (
                    <Spotlight key={idx} className="rounded-2xl">
                        <div className="bg-[#0B0118]/40 backdrop-blur-sm p-8 border border-white/5 flex flex-col gap-6 group hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Award className="text-primary" size={24} />
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
                                    <Calendar size={10} />
                                    {cert.date}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{cert.title}</h4>
                                <p className="text-sm text-white/40 font-medium">{cert.issuer}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {cert.skills.map(skill => (
                                    <span key={skill} className="flex items-center gap-1 text-[10px] font-mono text-white/30">
                                        <CheckCircle2 size={10} className="text-primary/40" />
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 flex items-center justify-center gap-2 py-3 rounded-lg border border-white/5 bg-white/5 text-white text-xs font-bold hover:bg-primary/10 hover:border-primary/20 transition-all group/btn"
                            >
                                View Certificate <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </Spotlight>
                ))}
            </div>
        </section>
    );
}
