import { useState, useEffect } from "react";

export type ThemeType =
  | "theme-base"
  | "theme-dala"
  | "theme-shadcn-ui"
  | "theme-subframe"
  | "theme-mercury"
  | "theme-github"
  | "theme-nord"
  | "theme-tokyo-night"
  | "theme-tokyo-void"
  | "theme-tokyo-blueprint"
  | "theme-tokyo-vellum"
  | "theme-tokyo-gallery"
  | "theme-tokyo-alpine"
  | "theme-catppuccin"
  | "theme-dracula"
  | "theme-rose-pine"
  | "theme-one-dark"
  | "theme-solarized"
  | "theme-everforest"
  | "theme-gruvbox"
  | "theme-horizon"
  | "theme-emerald";

export const ALL_THEMES: ThemeType[] = [
  "theme-base",
  "theme-dala",
  "theme-shadcn-ui",
  "theme-subframe",
  "theme-mercury",
  "theme-github",
  "theme-nord",
  "theme-tokyo-night",
  "theme-tokyo-void",
  "theme-tokyo-blueprint",
  "theme-tokyo-vellum",
  "theme-tokyo-gallery",
  "theme-tokyo-alpine",
  "theme-catppuccin",
  "theme-dracula",
  "theme-rose-pine",
  "theme-one-dark",
  "theme-solarized",
  "theme-everforest",
  "theme-gruvbox",
  "theme-horizon",
  "theme-emerald",
];

const THEME_STORAGE_KEY = "app-theme";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window === "undefined") return "theme-subframe";
    return (
      (localStorage.getItem(THEME_STORAGE_KEY) as ThemeType) || "theme-subframe"
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...ALL_THEMES);
    root.classList.add(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme };
}
