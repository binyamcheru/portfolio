import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import PersonaChat from "@/components/persona/PersonaChat";
import { personaKnowledge } from "@/lib/persona/knowledge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    siteName: `${profile.displayName} — Portfolio`,
    title: pageTitle,
    description: profile.summary,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${profile.displayName} — ${profile.professionalTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: profile.summary,
    images: ["/og-image.png"],
    creator: "@binyamcheru",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 selection:text-white`}
      >
        {/* Cosmic Background */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#0B0118]">
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/background.png")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0118]/80 via-transparent to-[#0B0118]" />
          <div className="absolute inset-0 dotted-grid opacity-30" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_50%)]" />
        </div>

        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-[280px] min-h-screen overflow-y-auto px-4 py-8 lg:p-12 relative z-10">
            <div className="max-w-5xl mx-auto pt-16 lg:pt-0">
              {children}
            </div>
          </main>
        </div>
        <PersonaChat />
      </body>
    </html>
  );
}
