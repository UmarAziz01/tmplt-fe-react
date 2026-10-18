import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeSelector } from "@/components/ThemeSelector";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col justify-between selection:bg-[var(--accent)] selection:text-white transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-surface)]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={viteLogo} className="w-7 h-7" alt="Vite Logo" />
            <span className="font-bold text-lg text-[var(--text-main)] tracking-tight notranslate">
              React + Vite Starter
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Tombol Switcher Tema */}
            <ThemeSelector />

            {/* Dropdown Bahasa */}
            <LanguageSelector />

            <a
              href="https://azizlab.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors notranslate"
            >
              azizlab.my.id
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full space-y-12">
        <section className="text-center space-y-6">
          <div className="flex justify-center items-center gap-6">
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img
                src={viteLogo}
                className="w-16 h-16 hover:scale-110 transition-transform"
                alt="Vite logo"
              />
            </a>
            <img
              src={heroImg}
              className="w-14 h-14 object-contain opacity-80"
              alt="Hero Icon"
            />
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img
                src={reactLogo}
                className="w-16 h-16 animate-spin hover:scale-110 transition-transform"
                style={{ animationDuration: "12s" }}
                alt="React logo"
              />
            </a>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--accent)]">
              Template Frontend React 19
            </h1>
            <p className="text-[var(--text-muted)] text-sm sm:text-base max-w-xl mx-auto">
              Template dasar siap pakai dengan Vite, Tailwind v4, React Router,
              dan TanStack Query.
            </p>
          </div>

          <div className="inline-flex items-center gap-4 bg-[var(--bg-surface)] border border-[var(--border-color)] px-4 py-2 rounded-xl shadow-inner">
            <span className="text-sm font-mono text-[var(--text-main)]">
              Counter State: {count}
            </span>
            <button
              type="button"
              onClick={() => setCount((prev) => prev + 1)}
              className="bg-[var(--accent)] hover:opacity-90 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            >
              Tambah +1
            </button>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-lg font-bold text-[var(--text-main)]">
                Menambahkan Halaman (Routing)
              </h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Buat komponen halaman baru di dalam folder{" "}
              <code className="text-[var(--accent)] bg-[var(--bg-primary)] px-1.5 py-0.5 rounded text-xs font-mono notranslate">
                src/pages/
              </code>
              , lalu daftarkan route di file router utama.
            </p>
            <div className="notranslate bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-color)] font-mono text-xs text-[var(--text-main)] overflow-x-auto">
              <pre>{`// Contoh pendaftaran route:
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
</BrowserRouter>`}</pre>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-lg font-bold text-[var(--text-main)]">
                Koneksi ke Backend & Proxy
              </h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Vite sudah memiliki reverse-proxy untuk path{" "}
              <code className="text-[var(--accent)] bg-[var(--bg-primary)] px-1.5 py-0.5 rounded text-xs font-mono notranslate">
                /api
              </code>
              . Set variabel target pada file{" "}
              <code className="text-[var(--accent)] bg-[var(--bg-primary)] px-1.5 py-0.5 rounded text-xs font-mono notranslate">
                .env
              </code>{" "}
              tanpa khawatir terkena isu CORS:
            </p>
            <div className="notranslate bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-color)] font-mono text-xs text-[var(--text-main)] overflow-x-auto">
              <pre>{`// .env
VITE_API_TARGET=http://localhost:8080

// Panggilan API di kode frontend (Axios):
import axios from "axios";
const response = await axios.get("/api/v1/users");`}</pre>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-lg font-bold text-[var(--text-main)]">
                Komponen UI & Styling
              </h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Komponen diletakkan di{" "}
              <code className="text-[var(--accent)] bg-[var(--bg-primary)] px-1.5 py-0.5 rounded text-xs font-mono notranslate">
                src/components/
              </code>
              . Styling menggunakan CSS Variables tema yang dinamis.
            </p>
            <div className="notranslate bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-color)] font-mono text-xs text-[var(--text-main)] overflow-x-auto">
              <pre>{`// Import alias @ sudah terkonfigurasi:
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";`}</pre>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-lg font-bold text-[var(--text-main)]">
                Data Fetching & Global State
              </h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Gunakan <strong>TanStack Query</strong> untuk server-state
              fetching & caching, dan <strong>Zustand</strong> untuk
              client-state auth/session.
            </p>
            <div className="notranslate bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-color)] font-mono text-xs text-[var(--text-main)] overflow-x-auto">
              <pre>{`// Contoh query data dengan TanStack Query:
const { data, isLoading } = useQuery({
  queryKey: ["profile"],
  queryFn: fetchProfile,
});`}</pre>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-6 text-center text-xs text-[var(--text-muted)]">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://azizlab.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-main)] font-semibold hover:text-[var(--accent)] transition-colors underline decoration-[var(--border-color)] underline-offset-4 notranslate"
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
