import { useState, useRef, useEffect } from "react";
import { useTheme, type ThemeType } from "@/hooks/useTheme";

interface ThemeOption {
  id: ThemeType;
  label: string;
  badgeColor: string;
}

const THEME_LIST: ThemeOption[] = [
  {
    id: "theme-subframe",
    label: "Subframe (Editorial Serif)",
    badgeColor: "#171717",
  },
  { id: "theme-dala", label: "Dala (Void Minimal)", badgeColor: "#8052ff" },
  {
    id: "theme-mercury",
    label: "Mercury (Alpine Clean)",
    badgeColor: "#5266eb",
  },
  {
    id: "theme-shadcn-ui",
    label: "shadcn/ui (Hairline)",
    badgeColor: "#737373",
  },
  { id: "theme-base", label: "Base Minimal", badgeColor: "#aa3bff" },
  { id: "theme-github", label: "GitHub", badgeColor: "#2f81f7" },
  { id: "theme-nord", label: "Nord Frost", badgeColor: "#88c0d0" },
  { id: "theme-tokyo-night", label: "Tokyo Night", badgeColor: "#7aa2f7" },
  { id: "theme-catppuccin", label: "Catppuccin", badgeColor: "#c6a0f6" },
  { id: "theme-dracula", label: "Dracula", badgeColor: "#bd93f9" },
  { id: "theme-rose-pine", label: "Rose Pine", badgeColor: "#eb6f92" },
  { id: "theme-one-dark", label: "One Dark", badgeColor: "#61afef" },
  { id: "theme-solarized", label: "Solarized", badgeColor: "#2aa198" },
  { id: "theme-everforest", label: "Everforest", badgeColor: "#a7c080" },
  { id: "theme-gruvbox", label: "Gruvbox", badgeColor: "#fe8019" },
  { id: "theme-horizon", label: "Horizon", badgeColor: "#e95678" },
  { id: "theme-emerald", label: "Emerald Slate", badgeColor: "#10b981" },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = THEME_LIST.find((t) => t.id === theme) || THEME_LIST[0];

  return (
    <div className="relative notranslate" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] hover:border-[var(--accent)] transition-all text-xs font-medium shadow-sm focus:outline-none"
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
          style={{ backgroundColor: current.badgeColor }}
        />
        <span>{current.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-2xl p-1.5 z-50 max-h-64 overflow-y-auto">
          {THEME_LIST.map((item) => {
            const isSelected = item.id === theme;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setTheme(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                  isSelected
                    ? "bg-[var(--accent)] text-white font-semibold"
                    : "text-[var(--text-main)] hover:bg-[var(--bg-primary)]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/10"
                    style={{ backgroundColor: item.badgeColor }}
                  />
                  <span>{item.label}</span>
                </div>
                {isSelected && <span>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
