"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Section({
    children,
    id
}: {
    children: React.ReactNode;
    id?: string;
}) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });

        timeline.fromTo(
            element,
            {
                opacity: 0,
                y: 60,
                scale: 0.98
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power4.out",
            }
        );

        // Stagger all direct children if they are not the only child
        const children = element.children[0]?.children;
        if (children && children.length > 1) {
            timeline.fromTo(
                children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                },
                "-=0.6"
            );
        }
    }, []);

    return (
        <section ref={sectionRef} id={id}>
            {children}
        </section>
    );
}
