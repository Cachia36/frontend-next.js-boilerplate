import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "app:theme";
const COOKIE_KEY = "app_theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme>(STORAGE_KEY, "system");

  const setTheme = (next: Theme) => {
    setStoredTheme(next);

    if (typeof document !== "undefined") {
      const effective = next === "system" ? getSystemTheme() : next;

      //cookie stores the effective theme: light or dark
      document.cookie = `${COOKIE_KEY}=${effective}; path=/; max-age=31536000; samesite=lax`;
    }
  };

  useEffect(() => {
    applyTheme(storedTheme);
  }, [storedTheme]);

  const toggleTheme = () => {
    const effective = storedTheme === "system" ? getSystemTheme() : storedTheme;
    const next = effective === "light" ? "dark" : "light";

    setTheme(next);
  };

  return {
    theme: storedTheme,
    toggleTheme,
    effectiveTheme: storedTheme === "system" ? getSystemTheme() : storedTheme,
  };
}
