// src/hooks/useTheme.ts

import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "app:theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  const effective = theme === "system" ? getSystemTheme() : theme;

  root.dataset.theme = effective;

  if (effective === "dark") {
    root.style.setProperty("--background", "#0a0a0a");
    root.style.setProperty("--foreground", "#e5e5e5");
  } else {
    root.style.setProperty("--background", "#fafafa");
    root.style.setProperty("--foreground", "#1a1a1a");
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored || "system";

    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const effective = theme === "system" ? getSystemTheme() : theme;

    const next = effective === "light" ? "dark" : "light";

    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  return {
    theme,
    toggleTheme,
    effectiveTheme: theme === "system" ? getSystemTheme() : theme,
  };
}