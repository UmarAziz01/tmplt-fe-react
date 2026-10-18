import { useState, useRef, useEffect } from "react";
import { useCustomTheme, PRESETS, type ColorPreset } from "@/hooks/useColor";

export function AccentSelector() {
  const { activePreset, selectPreset, customHex, setCustomColor } =
    useCustomTheme();
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

  const currentColor =
    activePreset === "custom"
      ? customHex
      : PRESETS.find((p) => p.id === activePreset)?.color || PRESETS[1].color;

  return (
    <div className="relative notranslate" ref={containerRef}>
      {/* Tombol Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title="Pilih Color Accent"
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] hover:border-[var(--accent)] transition-all text-xs font-medium shadow-sm focus:outline-none"
      >
        <span
          className="w-3 h-3 rounded-full shrink-0 shadow-sm border border-black/15 ring-1 ring-white/20"
          style={{ backgroundColor: currentColor }}
        />
        <span className="capitalize">{activePreset}</span>
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

      {/* Dropdown Accent Picker */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-3 z-50 space-y-3">
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase block mb-2 px-1">
              Color Accent Presets
            </span>
            <div className="grid grid-cols-6 gap-1.5 px-1">
              {PRESETS.map((preset: ColorPreset) => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      selectPreset(preset);
                      setIsOpen(false);
                    }}
                    title={preset.name}
                    className="relative w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                    style={{ backgroundColor: preset.color }}
                  >
                    {isSelected && (
                      <svg
                        className="w-3.5 h-3.5 text-white drop-shadow-md"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between px-1">
            <span className="text-xs text-[var(--text-muted)]">Custom Hex</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="color"
                value={customHex}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent p-0"
              />
              <span className="text-[11px] font-mono text-[var(--text-main)] uppercase">
                {customHex}
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
