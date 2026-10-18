import { useState, useRef, useEffect, useMemo } from "react";

interface Language {
  code: string;
  name: string;
  native: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦" },
  {
    code: "zh-CN",
    name: "Chinese (Simplified)",
    native: "简体中文",
    flag: "🇨🇳",
  },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  { code: "tr", name: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "Thai", native: "ไทย", flag: "🇹🇭" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "jv", name: "Javanese", native: "Basa Jawa", flag: "🇮🇩" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
];

function getActiveLanguage(): string {
  if (typeof document === "undefined") return "id";
  const match = document.cookie.match(/(?:^|; )googtrans=([^;]*)/);
  if (match) {
    const parts = decodeURIComponent(match[1]).split("/");
    return parts[2] || "id";
  }
  return "id";
}

// Utility terisolasi di luar komponen agar lolos linting react-hooks/immutability
function setGoogleTranslateCookie(code: string) {
  const cookieValue = `/id/${code}`;
  document.cookie = `googtrans=${cookieValue}; path=/;`;
  document.cookie = `googtrans=${cookieValue}; domain=${window.location.hostname}; path=/;`;
  window.location.reload();
}

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCode] = useState(getActiveLanguage);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Autofocus tanpa memicu setState di dalam effect
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filteredLanguages = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        lang.native.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q),
    );
  }, [search]);

  const currentLang = useMemo(
    () => LANGUAGES.find((l) => l.code === activeCode) || LANGUAGES[0],
    [activeCode],
  );

  const handleOpenToggle = () => {
    if (isOpen) {
      setSearch("");
    }
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (code: string) => {
    setIsOpen(false);
    setSearch("");
    setGoogleTranslateCookie(code);
  };

  return (
    <div className="relative notranslate" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleOpenToggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/80 transition-all text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span>{currentLang.native}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
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

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
          {/* Search Box */}
          <div className="relative mb-2">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search language..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Language Options List */}
          <div className="max-h-60 overflow-y-auto space-y-0.5 pr-1">
            {filteredLanguages.length === 0 ? (
              <div className="py-4 text-center text-xs text-slate-500">
                Bahasa tidak ditemukan
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === activeCode;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                      isSelected
                        ? "bg-indigo-600/20 text-indigo-300 font-semibold"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base leading-none">
                        {lang.flag}
                      </span>
                      <div className="truncate">
                        <span className="block truncate">{lang.native}</span>
                        <span className="text-[10px] text-slate-500 block">
                          {lang.name}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
