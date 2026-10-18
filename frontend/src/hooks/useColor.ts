import { useEffect, useState } from "react";

export interface ColorPreset {
  id: string;
  name: string;
  color: string;
}

export const PRESETS: ColorPreset[] = [
  { id: "zinc", name: "Zinc", color: "#66667A" },
  { id: "blue", name: "Blue", color: "#2563eb" },
  { id: "emerald", name: "Emerald", color: "#16a34a" },
  { id: "violet", name: "Violet", color: "#7c3aed" },
  { id: "amber", name: "Amber", color: "#f59e0b" },
  { id: "rose", name: "Rose", color: "#e11d48" },
];

const PRESET_KEY = "onegate-theme-preset";
const CUSTOM_KEY = "onegate-custom-primary";
const DEFAULT_PRESET = "blue";
const DEFAULT_HEX = "#2563eb";

function readStored(): { preset: string; customHex: string } {
  if (typeof window === "undefined") {
    return { preset: DEFAULT_PRESET, customHex: DEFAULT_HEX };
  }
  try {
    const preset = window.localStorage.getItem(PRESET_KEY) ?? DEFAULT_PRESET;
    const customHex = window.localStorage.getItem(CUSTOM_KEY) ?? DEFAULT_HEX;
    return { preset, customHex };
  } catch {
    return { preset: DEFAULT_PRESET, customHex: DEFAULT_HEX };
  }
}

function applyColor(hex: string): void {
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", hex);
  root.style.setProperty("--primary", hex);
  root.style.setProperty("--accent", hex);
  root.style.setProperty("--ring", hex);
}

function resolveHex(preset: string, customHex: string): string {
  if (preset === "custom") return customHex;
  const found = PRESETS.find((p) => p.id === preset);
  return found ? found.color : DEFAULT_HEX;
}

export function useCustomTheme() {
  const initial = readStored();
  const [activePreset, setActivePreset] = useState<string>(initial.preset);
  const [customHex, setCustomHexState] = useState<string>(initial.customHex);

  useEffect(() => {
    applyColor(resolveHex(activePreset, customHex));
  }, [activePreset, customHex]);

  const selectPreset = (preset: ColorPreset) => {
    setActivePreset(preset.id);
    setCustomHexState(preset.color);
    try {
      window.localStorage.setItem(PRESET_KEY, preset.id);
      window.localStorage.setItem(CUSTOM_KEY, preset.color);
    } catch {
      /* abaikan */
    }
    applyColor(preset.color);
  };

  const setCustomColor = (hex: string) => {
    setActivePreset("custom");
    setCustomHexState(hex);
    try {
      window.localStorage.setItem(PRESET_KEY, "custom");
      window.localStorage.setItem(CUSTOM_KEY, hex);
    } catch {
      /* abaikan */
    }
    applyColor(hex);
  };

  return { activePreset, selectPreset, customHex, setCustomColor };
}
