"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProjectGallery({
  images,
  title,
  url,
  portrait = false,
}: {
  images: string[];
  title: string;
  url?: string | null;
  portrait?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const many = images.length > 1;

  useEffect(() => {
    if (!playing || !many) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 3500);
    return () => window.clearInterval(id);
  }, [playing, many, images.length]);

  const go = (d: number) => setIndex((i) => (i + d + images.length) % images.length);
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : title.toLowerCase().replace(/\s+/g, "-");

  return (
    <section aria-label="Project gallery">
      <div className="flex items-center justify-between gap-4">
        <h2 className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-accent">
          <Images size={12} /> Project gallery
          <span className="text-subtle">({images.length} {images.length === 1 ? "shot" : "shots"})</span>
        </h2>
        {many && (
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-subtle">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-1.5 rounded border border-line px-2 py-1 transition-colors hover:text-heading"
            >
              {playing ? <Pause size={10} /> : <Play size={10} />} {playing ? "Pause" : "Autoplay"}
            </button>
            <span className="rounded border border-line px-2 py-1">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-line bg-surface">
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="flex-1 truncate rounded bg-surface-2 px-3 py-1 font-mono text-[11px] text-subtle">{host}</span>
        </div>

        <div className={cn("group relative bg-surface-2", portrait ? "aspect-[16/9] bg-[radial-gradient(ellipse_at_center,var(--surface-2),var(--surface))]" : "aspect-[16/9]")}>
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 900px, 100vw"
              className={cn(
                "transition-opacity duration-500",
                portrait ? "object-contain p-4" : "object-cover object-top",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          {many && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card/80 text-heading opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card/80 text-heading opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        <p className="border-t border-line px-4 py-2 text-center font-mono text-[11px] text-subtle">
          {title} — {many ? `Screenshot ${index + 1}` : "Cover preview"}
        </p>

        {many && (
          <ul className="flex gap-2 overflow-x-auto border-t border-line p-3">
            {images.map((src, i) => (
              <li key={src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "relative overflow-hidden rounded border transition-colors",
                    portrait ? "h-16 w-9" : "h-12 w-20",
                    i === index ? "border-accent" : "border-line opacity-60 hover:opacity-100",
                  )}
                >
                  <Image src={src} alt="" fill sizes="80px" className={portrait ? "object-cover object-top" : "object-cover object-top"} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
