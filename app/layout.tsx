import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://binyam-cheru.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Binyam Cheru | Full-Stack Systems Architect",
    template: "%s | Binyam Cheru",
  },
  description:
    "Full-Stack Systems Architect specializing in building testable, scalable, and documented web applications. Explore projects, tech stack, and certifications.",
  keywords: [
    "Binyam Cheru",
    "Full-Stack Developer",
    "Systems Architect",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Binyam Cheru", url: siteUrl }],
  creator: "Binyam Cheru",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Binyam Cheru — Portfolio",
    title: "Binyam Cheru | Full-Stack Systems Architect",
    description:
      "Full-Stack Systems Architect specializing in building testable, scalable, and documented web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Binyam Cheru — Full-Stack Systems Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binyam Cheru | Full-Stack Systems Architect",
    description:
      "Full-Stack Systems Architect specializing in building testable, scalable, and documented web applications.",
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
      </body>
    </html>
  );
}
