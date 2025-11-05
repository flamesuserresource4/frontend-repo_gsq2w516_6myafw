import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const hearts = new Array(12).fill(0).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  scale: 0.6 + Math.random() * 0.8,
}))

export default function HeroSection() {
  const bgRef = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(window.scrollY * 0.25)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const easing = [0.22, 1, 0.36, 1]

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#FFF6F2] dark:bg-[#3A2F2F]">
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset}px) scale(1.1)`,
          transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1)',
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(6px) saturate(1.05)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#FFF6F2] dark:to-[#3A2F2F] pointer-events-none" />

      {/* Floating hearts (Lottie-like) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '-20%', opacity: [0, 1, 0] }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: h.delay,
              ease: easing,
            }}
            className="absolute"
            style={{ left: `${h.left}%` }}
          >
            <svg
              width={24 * h.scale}
              height={24 * h.scale}
              viewBox="0 0 24 24"
              fill="#C78FA3"
              className="drop-shadow"
              aria-hidden="true"
            >
              <path d="M12 21s-7.5-4.438-9.75-8.25C.75 9.938 3 6 6.75 6a5.25 5.25 0 0 1 5.25 4.5A5.25 5.25 0 0 1 17.25 6C21 6 23.25 9.938 21.75 12.75 19.5 16.563 12 21 12 21Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <h1 className="font-serif text-4xl sm:text-6xl text-white drop-shadow-md mb-4">
          A & N — Bab 2 Tahun Cinta
        </h1>
        <p className="text-white/90 text-lg sm:text-xl leading-relaxed">
          Dua hati yang bertaut, tumbuh bersama dalam tawa, air mata, dan doa. Inilah jejak kecil kita — dari sapaan pertama hingga mimpi yang kita rajut berdua.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="#timeline"
            className="px-5 py-3 rounded-full bg-[#C78FA3] text-white shadow hover:scale-[1.03] active:scale-100 transition-transform duration-300"
          >
            Lihat Timeline
          </a>
          <a
            href="#gallery"
            className="px-5 py-3 rounded-full bg-white/90 text-[#3A2F2F] shadow hover:scale-[1.03] transition-transform duration-300"
          >
            Buka Galeri
          </a>
        </div>
      </div>
    </section>
  )
}
