"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Layers,
  Briefcase,
  FileText,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Menu,
  X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type NavItem = {
  name: string;
  href: string;
  icon: any;
  isSection?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

// Navigation grouped by sections
const navGroups: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "introduction", icon: Home, isSection: true },
      { name: "Technical Proficiency", href: "tech-stack", icon: Layers, isSection: true },
      { name: "High-Impact Projects", href: "projects", icon: Briefcase, isSection: true },
      { name: "Certificates & Awards", href: "certificates", icon: FileText, isSection: true },
      { name: "Connect", href: "contact", icon: Mail, isSection: true },
    ]
  },
  {
    title: "Deep Dives",
    items: [
      { name: "All Projects", href: "/projects", icon: Briefcase },
      { name: "Blog", href: "/blog", icon: FileText },
    ]
  }
];

const socials = [
  { name: "GitHub", href: "https://github.com/binyamcheru", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/binyam-cheru-189b892b4/", icon: Linkedin },
  { name: "X", href: "https://x.com/bini_code", icon: Twitter },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ["introduction", "tech-stack", "projects", "certificates", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 glass border-b border-white/5">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
          <div className="text-sm font-bold text-white">Binyam Cheru</div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:text-primary transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-[#0B0118]/80 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo & Brand */}
          <div className="mb-10 flex items-center justify-between">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                <Image src="/logo.png" alt="Logo" fill className="object-contain p-1" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Binyam Cheru</div>
                <div className="text-[10px] text-white/40 font-mono tracking-tighter">Junior Fullstack Engineer</div>
              </div>
            </Link>
            <div className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
              v1.0.0
            </div>
          </div>

          {/* Navigation Groups */}
          <nav className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                <h4 className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                  {group.title}
                </h4>
                <div className="space-y-1 relative">
                  {group.items.map((item) => {
                    const isHashLink = item.isSection;
                    const isActive = isHashLink
                      ? activeSection === item.href
                      : pathname === item.href;

                    const href = isHashLink ? `/#${item.href}` : item.href;

                    return (
                      <Link
                        key={item.name}
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 group text-[13px] relative",
                          isActive
                            ? "text-primary"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 w-1 h-4 bg-primary rounded-r-full animate-in fade-in slide-in-from-left-2 duration-300" />
                        )}
                        <item.icon size={14} className={cn("transition-colors duration-300", isActive ? "text-primary scale-110" : "group-hover:text-primary")} />
                        <span className={cn("font-medium transition-colors duration-300", isActive ? "translate-x-1" : "")}>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Social Links */}
          <div className="pt-6 border-t border-white/5 flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-primary transition-colors"
                title={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
