import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { projects } from "@/lib/projects";
import { personaKnowledge } from "@/lib/persona/knowledge";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = personaKnowledge.contact.portfolio;
    const now = new Date();

    return [
        { url: baseUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
        { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        ...projects.map((p) => ({
            url: `${baseUrl}/projects/${p.slug}`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.7,
        })),
        { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        ...blogPosts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.6,
        })),
    ];
}
