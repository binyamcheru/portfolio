import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import PersonaChat from "@/components/persona/PersonaChat";
import Sidebar from "@/components/layout/Sidebar";
import { themeInitScript } from "@/components/layout/Theme";
import { personaKnowledge } from "@/lib/persona/knowledge";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const { profile, contact } = personaKnowledge;
const siteUrl = contact.portfolio;
const pageTitle = `${profile.displayName} | ${profile.professionalTitle}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s | ${profile.displayName}`,
  },
  description: profile.summary,
  keywords: [
    profile.displayName,
    profile.fullName,
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: profile.displayName,
    title: pageTitle,
    description: profile.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: profile.summary,
    creator: "@bini_code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable} ${jakarta.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) inject attributes on <body>. */}
      <body className="min-h-screen" suppressHydrationWarning>
        <div className="shell mx-auto max-w-[1200px] p-3 sm:p-5 lg:p-8">
          <div className="shell-card grid overflow-hidden rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-24px_rgba(0,0,0,0.25)] lg:grid-cols-[232px_1fr]">
            <Sidebar />
            <main className="min-w-0">{children}</main>
          </div>
        </div>
        <div className="no-print">
          <PersonaChat />
        </div>
      </body>
    </html>
  );
}
