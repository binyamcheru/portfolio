"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

export function useIsDark() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
}

export function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch {
    /* storage unavailable */
  }
}

/** Runs before hydration so the stored theme applies without a flash. */
export const themeInitScript = `(function(){try{if(localStorage.getItem("${STORAGE_KEY}")==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`;

export function ThemeIconButton({ className }: { className?: string }) {
  const dark = useIsDark();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-card text-muted transition-colors hover:text-foreground",
        className,
      )}
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

export function ThemeSwitchCard() {
  const dark = useIsDark();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={dark}
      className="flex w-full items-center justify-between gap-3 rounded-xl bg-heading p-4 text-left text-card transition-opacity hover:opacity-90 dark:bg-surface-2 dark:text-foreground"
    >
      <span>
        <span className="flex items-center gap-2 text-sm font-medium">
          {dark ? <Sun size={14} /> : <Moon size={14} />}
          {dark ? "Light mode" : "Dark mode"}
        </span>
        <span className="mt-1 block text-[11px] leading-snug opacity-70">
          {dark ? "Back to the light theme." : "Switch to dark theme for a different experience."}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors",
          dark ? "bg-foreground/80" : "bg-white/25",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform dark:bg-card",
            dark ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}
