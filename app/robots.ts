import type { MetadataRoute } from "next";
import { personaKnowledge } from "@/lib/persona/knowledge";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${personaKnowledge.contact.portfolio}/sitemap.xml`,
    };
}
