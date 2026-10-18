import { useTheme, type ThemeType } from "@/hooks/useTheme";

const THEMES: { id: ThemeType; label: string }[] = [
  { id: "theme-github", label: "GitHub" },
  { id: "theme-cyberpunk", label: "Cyberpunk" },
  { id: "theme-nord", label: "Nord" },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex rounded-lg bg-[var(--bg-surface)] p-1 border border-[var(--border-color)] text-xs notranslate">
      {THEMES.map((item) => {
        const isActive = theme === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setTheme(item.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              isActive
                ? "bg-[var(--accent)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
