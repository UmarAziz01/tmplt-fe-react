import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeSelector } from "@/components/ThemeSelector";
import { AccentSelector } from "@/components/ColorSelector";
import { ThemeToggle } from "@/components/ThemeToggle";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col justify-between selection:bg-[var(--accent)] selection:text-white transition-colors duration-200"
      style={{ fontFamily: "var(--font-family-body)" }}
    >
      {/* Header */}
      <header
        className="bg-[var(--bg-surface)] backdrop-blur sticky top-0 z-50 transition-all"
        style={{
          borderBottom: "var(--border-width) solid var(--border-color)",
        }}
      >
        <div
          className="mx-auto px-6 py-4 flex items-center justify-between"
          style={{ maxWidth: "var(--spacing-container-max, 64rem)" }}
        >
          <div className="flex items-center gap-3">
            <img src={viteLogo} className="w-7 h-7" alt="Vite Logo" />
            <span
              className="text-lg tracking-tight notranslate"
              style={{
                fontFamily: "var(--font-family-heading)",
                fontWeight: "var(--heading-weight)",
              }}
            >
              React + Vite Starter
            </span>
          </div>

          {/* Action Bar: Dark Mode, Color Accent, Layout Theme, Language */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <AccentSelector />
            <ThemeSelector />
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content dengan Spacing & Layout Adaptif */}
      <main
        className="mx-auto px-6 py-12 flex-1 w-full transition-all duration-300 flex flex-col"
        style={{
          maxWidth: "var(--spacing-container-max, 64rem)",
          gap: "var(--spacing-section-gap, 4rem)",
        }}
      >
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="flex justify-center items-center gap-6">
            <img
              src={viteLogo}
              className="w-16 h-16 hover:scale-105 transition-transform"
              alt="Vite logo"
            />
            <img
              src={heroImg}
              className="w-14 h-14 object-contain opacity-80"
              alt="Hero Icon"
            />
            <img
              src={reactLogo}
              className="w-16 h-16 animate-spin hover:scale-105 transition-transform"
              style={{ animationDuration: "14s" }}
              alt="React logo"
            />
          </div>

          <div className="space-y-3">
            <h1
              className="text-4xl sm:text-6xl transition-all"
              style={{
                fontFamily: "var(--font-family-heading)",
                fontWeight: "var(--heading-weight)",
                letterSpacing: "var(--heading-tracking)",
              }}
            >
              Template Frontend React 19
            </h1>
            <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Dukungan variasi tata letak, tipografi font, spasi adaptif, serta
              aksen warna independen yang tetap kontras di light & dark mode.
            </p>
          </div>

          {/* Interactive Counter Box */}
          <div>
            <div
              className="inline-flex items-center gap-4 bg-[var(--bg-surface)] px-5 py-2.5 transition-all"
              style={{
                borderRadius: "var(--radius-btn)",
                border: "var(--border-width) solid var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <span className="text-sm font-mono text-[var(--text-main)]">
                Counter: {count}
              </span>
              <button
                type="button"
                onClick={() => setCount((prev) => prev + 1)}
                className="bg-[var(--accent)] hover:opacity-90 active:scale-95 text-white text-xs font-semibold px-4 py-2 transition-all cursor-pointer shadow-sm"
                style={{ borderRadius: "var(--radius-btn)" }}
              >
                Tambah +1
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Cards Grid */}
        <section
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "var(--spacing-card-gap, 2rem)" }}
        >
          {[
            {
              num: 1,
              title: "Menambahkan Halaman (Routing)",
              desc: "Buat komponen halaman baru di dalam folder src/pages/, lalu daftarkan route di router utama.",
              code: `import { BrowserRouter, Routes, Route } from "react-router-dom";\n\n<BrowserRouter>\n  <Routes>\n    <Route path="/" element={<App />} />\n  </Routes>\n</BrowserRouter>`,
            },
            {
              num: 2,
              title: "Koneksi ke Backend & Proxy",
              desc: "Vite sudah memiliki reverse-proxy untuk path /api. Set variabel target pada file .env tanpa terkena CORS.",
              code: `// .env\nVITE_API_TARGET=http://localhost:8080\n\nconst res = await axios.get("/api/v1/users");`,
            },
            {
              num: 3,
              title: "Komponen UI & Styling",
              desc: "Komponen diletakkan di src/components/. Styling responsif mengikuti konfigurasi tema & aksen aktif.",
              code: `import { Button } from "@/components/ui/button";\nimport { cn } from "@/lib/utils";`,
            },
            {
              num: 4,
              title: "Data Fetching & State",
              desc: "Gunakan TanStack Query untuk server-state caching, dan Zustand untuk client session auth.",
              code: `const { data, isLoading } = useQuery({\n  queryKey: ["profile"],\n  queryFn: fetchProfile,\n});`,
            },
          ].map((card) => (
            <div
              key={card.num}
              className="bg-[var(--bg-surface)] space-y-4 transition-all"
              style={{
                padding: "var(--spacing-card-pad, 2rem)",
                borderRadius: "var(--radius-card)",
                border: "var(--border-width) solid var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold bg-[var(--accent)] text-white shadow-sm"
                  style={{ borderRadius: "var(--radius-btn)" }}
                >
                  {card.num}
                </span>
                <h2
                  className="text-xl"
                  style={{
                    fontFamily: "var(--font-family-heading)",
                    fontWeight: "var(--heading-weight)",
                  }}
                >
                  {card.title}
                </h2>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {card.desc}
              </p>
              <div
                className="notranslate p-4 font-mono text-xs text-[var(--text-main)] overflow-x-auto bg-[var(--bg-primary)] transition-all"
                style={{
                  borderRadius: "calc(var(--radius-card) * 0.6)",
                  border: "var(--border-width) solid var(--border-color)",
                }}
              >
                <pre>{card.code}</pre>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer
        className="bg-[var(--bg-surface)] py-8 text-center text-xs text-[var(--text-muted)] transition-all"
        style={{ borderTop: "var(--border-width) solid var(--border-color)" }}
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://azizlab.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-main)] font-semibold hover:underline notranslate"
          >
            Umar Abdul Aziz
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
