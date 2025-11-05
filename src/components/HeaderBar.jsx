import { useEffect, useState } from 'react'
import { Moon, Sun, Music2, PauseCircle, Heart } from 'lucide-react'

export default function HeaderBar({ onToggleMusic, isMusicPlaying }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [dark])

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[#FFF6F2]/70 dark:bg-[#3A2F2F]/60 border-b border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-rose-400 rounded px-1">
          <div className="h-9 w-9 rounded-full bg-[#C78FA3] text-white flex items-center justify-center shadow">
            <Heart className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-xl text-[#3A2F2F] dark:text-rose-100">A ❤ N</div>
            <div className="text-xs text-[#3A2F2F]/70 dark:text-rose-100/70">12 Nov 2023 — 2 Years</div>
          </div>
        </a>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <a href="#timeline" className="hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400 rounded px-1 text-[#3A2F2F] dark:text-rose-100">Timeline</a>
          <a href="#gallery" className="hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400 rounded px-1 text-[#3A2F2F] dark:text-rose-100">Galeri</a>
          <a href="#guestbook" className="hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400 rounded px-1 text-[#3A2F2F] dark:text-rose-100">Guestbook</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMusic}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F6E7E9] dark:bg-[#3A2F2F] text-[#3A2F2F] dark:text-rose-100 shadow focus:outline-none focus:ring-2 focus:ring-rose-400"
            aria-pressed={isMusicPlaying}
            aria-label={isMusicPlaying ? 'Matikan musik' : 'Nyalakan musik'}
          >
            {isMusicPlaying ? (
              <PauseCircle className="h-4 w-4" />
            ) : (
              <Music2 className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Musik</span>
          </button>
          <button
            onClick={() => setDark((v) => !v)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F6E7E9] dark:bg-[#3A2F2F] text-[#3A2F2F] dark:text-rose-100 shadow focus:outline-none focus:ring-2 focus:ring-rose-400"
            aria-pressed={dark}
            aria-label="Toggle tema"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">Tema</span>
          </button>
        </div>
      </div>
    </header>
  )
}
