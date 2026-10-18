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

  // Autofocus input pencarian saat dropdown terbuka
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
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] hover:border-[var(--accent)] transition-all text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 cursor-pointer"
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span>{currentLang.native}</span>
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

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-2 z-50">
          {/* Search Box */}
          <div className="relative mb-2">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]"
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
              placeholder="Cari bahasa..."
              className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          {/* Language Options List */}
          <div className="max-h-60 overflow-y-auto space-y-0.5 pr-1">
            {filteredLanguages.length === 0 ? (
              <div className="py-4 text-center text-xs text-[var(--text-muted)]">
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
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer ${
                      isSelected
                        ? "bg-[var(--accent)] text-white font-semibold shadow-sm"
                        : "text-[var(--text-main)] hover:bg-[var(--bg-primary)]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base leading-none">
                        {lang.flag}
                      </span>
                      <div className="truncate">
                        <span className="block truncate">{lang.native}</span>
                        <span
                          className={`text-[10px] block truncate ${
                            isSelected
                              ? "text-white/80"
                              : "text-[var(--text-muted)]"
                          }`}
                        >
                          {lang.name}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
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
