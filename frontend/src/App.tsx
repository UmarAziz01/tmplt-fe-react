import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import { LanguageSelector } from "@/components/LanguageSelector";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={viteLogo} className="w-7 h-7" alt="Vite Logo" />
            <span className="font-bold text-lg text-slate-100 tracking-tight notranslate">
              React + Vite Starter
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Dropdown Bahasa dengan Search */}
            <LanguageSelector />

            <a
              href="https://azizlab.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors notranslate"
            >
              azizlab.my.id
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="flex justify-center items-center gap-6">
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img
                src={viteLogo}
                className="w-16 h-16 hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(100,108,255,0.4)]"
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
                className="w-16 h-16 animate-spin hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(97,218,251,0.4)]"
                style={{ animationDuration: "12s" }}
                alt="React logo"
              />
            </a>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-300 bg-clip-text text-transparent">
              Template Frontend React 19
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Template dasar siap pakai dengan Vite, Tailwind v4, React Router,
              dan TanStack Query.
            </p>
          </div>

          <div className="inline-flex items-center gap-4 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl shadow-inner">
            <span className="text-sm font-mono text-slate-300">
              Counter State: {count}
            </span>
            <button
              type="button"
              onClick={() => setCount((prev) => prev + 1)}
              className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-md shadow-indigo-600/20"
            >
              Tambah +1
            </button>
          </div>
        </section>

        {/* Documentation / Panduan Penggunaan */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-lg font-bold text-slate-100">
                Menambahkan Halaman (Routing)
              </h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Buat komponen halaman baru di dalam folder{" "}
              <code className="text-indigo-300 bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono notranslate">
                src/pages/
              </code>
              , lalu daftarkan route di file router utama.
            </p>
            <div className="notranslate bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
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

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-lg font-bold text-slate-100">
                Koneksi ke Backend & Proxy
              </h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Vite sudah memiliki reverse-proxy untuk path{" "}
              <code className="text-emerald-300 bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono notranslate">
                /api
              </code>
              . Set variabel target pada file{" "}
              <code className="text-emerald-300 bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono notranslate">
                .env
              </code>{" "}
              tanpa khawatir terkena isu CORS:
            </p>
            <div className="notranslate bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`// .env
VITE_API_TARGET=http://localhost:8080

// Panggilan API di kode frontend (Axios):
import axios from "axios";
const response = await axios.get("/api/v1/users");`}</pre>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-lg font-bold text-slate-100">
                Komponen UI & Styling
              </h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Komponen diletakkan di{" "}
              <code className="text-sky-300 bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono notranslate">
                src/components/
              </code>
              . Styling menggunakan utility-first Tailwind CSS v4 tanpa perlu
              konfigurasi JS manual.
            </p>
            <div className="notranslate bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`// Import alias @ sudah terkonfigurasi:
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";`}</pre>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-lg font-bold text-slate-100">
                Data Fetching & Global State
              </h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Gunakan <strong>TanStack Query</strong> untuk server-state
              fetching & caching, dan <strong>Zustand</strong> untuk
              client-state auth/session.
            </p>
            <div className="notranslate bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto">
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
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://azizlab.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 font-semibold hover:text-indigo-400 transition-colors underline decoration-slate-700 underline-offset-4 notranslate"
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
