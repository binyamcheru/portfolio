"use client";

import React from "react";
import Projects from "@/components/sections/Projects";
import Section from "@/components/ui/Section";

export default function ProjectsPage() {
    return (
        <div className="pb-20 space-y-10">
            <div className="space-y-4 pt-10">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">Project Archive</h1>
                <p className="text-white/60 max-w-2xl leading-relaxed">
                    A comprehensive list of technical challenges I've tackled, including deep dives into architecture, problem-solving, and quantified results.
                </p>
            </div>

            <Section>
                <Projects />
            </Section>
        </div>
    );
}
