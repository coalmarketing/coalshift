"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "./themeScript";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  root.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable — the choice still applies for this session */
  }
}

/**
 * Accessible light/dark control. It reflects the class the inline bootstrap
 * already set, so it renders a stable icon after hydration without causing a
 * flash. `aria-pressed` communicates the on/off state of "dark mode".
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"}
      aria-pressed={mounted ? isDark : undefined}
      title="Přepnout světlý / tmavý režim"
      className={`inline-flex size-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800 ${className}`}
    >
      {/* Sun (shown in dark mode: action = go light) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`size-5 ${isDark ? "block" : "hidden"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Moon (shown in light mode: action = go dark) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`size-5 ${isDark ? "hidden" : "block"}`}
        fill="currentColor"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
