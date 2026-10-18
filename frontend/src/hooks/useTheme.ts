import { useState, useEffect } from "react";

export type ThemeType = "theme-github" | "theme-cyberpunk" | "theme-nord";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem("app-theme") as ThemeType) || "theme-github";
  });

  useEffect(() => {
    const root = document.documentElement;
    // Hapus kelas tema sebelumnya
    root.classList.remove("theme-github", "theme-cyberpunk", "theme-nord");
    // Pasang tema baru
    root.classList.add(theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
