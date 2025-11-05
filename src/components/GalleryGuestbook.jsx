import { useEffect, useRef, useState } from 'react'
import { Download, X } from 'lucide-react'

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1200&auto=format&fit=crop&q=80&fm=webp',
    alt: 'Tertawa bersama di tepi pantai',
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&auto=format&fit=crop&q=80&fm=webp',
    alt: 'Langkah berdua menyusuri kota',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&auto=format&fit=crop&q=80&fm=webp',
    alt: 'Mata yang saling mencari',
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80&fm=webp',
    alt: 'Kopi pagi favorit',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80&fm=webp',
    alt: 'Pemandangan jalanan saat liburan',
  },
  {
    src: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&auto=format&fit=crop&q=80&fm=webp',
    alt: 'Senja keemasan',
  },
]

export default function GalleryGuestbook() {
  const [lightbox, setLightbox] = useState(null)
  const [messages, setMessages] = useState([
    { name: 'Rani', msg: 'Selamat dua tahun! Semoga selalu jadi tim terbaik.' },
  ])
  const nameRef = useRef(null)
  const msgRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const addMessage = (e) => {
    e.preventDefault()
    const name = nameRef.current?.value.trim()
    const msg = msgRef.current?.value.trim()
    if (!name || !msg) return
    setMessages((prev) => [{ name, msg }, ...prev])
    e.currentTarget.reset()
    nameRef.current?.focus()
  }

  const downloadPdf = () => {
    // Use print dialog for PDF download with a print-friendly layout
    window.print()
  }

  return (
    <section id="gallery" className="bg-[#F6E7E9] dark:bg-[#3A2F2F] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2F2F] dark:text-rose-100">Galeri & Pesan</h2>
            <p className="text-[#3A2F2F]/80 dark:text-rose-100/80">Fragmen kecil yang ingin kita simpan.</p>
          </div>
          <button
            onClick={downloadPdf}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#3A2F2F] shadow hover:scale-[1.03] transition-transform duration-300"
          >
            <Download className="h-4 w-4" /> Unduh PDF Kenangan
          </button>
        </div>

        {/* Masonry */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((g, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="block group focus:outline-none focus:ring-2 focus:ring-rose-400 rounded"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                srcSet={`${g.src}&dpr=1 800w, ${g.src}&dpr=2 1200w`}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </button>
          ))}
        </div>

        {/* Video */}
        <div className="mt-16">
          <h3 className="font-serif text-2xl text-[#3A2F2F] dark:text-rose-100 mb-4">Video Kompilasi</h3>
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/2Vv-BfVoq4g?rel=0"
              title="Video kompilasi"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Guestbook */}
        <div id="guestbook" className="mt-16">
          <h3 className="font-serif text-2xl text-[#3A2F2F] dark:text-rose-100 mb-4">Guestbook</h3>
          <form onSubmit={addMessage} className="grid sm:grid-cols-3 gap-3 mb-6">
            <input
              ref={nameRef}
              type="text"
              required
              aria-label="Nama"
              placeholder="Namamu"
              className="sm:col-span-1 px-4 py-3 rounded-lg bg-white text-[#3A2F2F] shadow placeholder-[#3A2F2F]/50 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <input
              ref={msgRef}
              type="text"
              required
              aria-label="Pesan"
              placeholder="Tulis pesan hangat"
              className="sm:col-span-2 px-4 py-3 rounded-lg bg-white text-[#3A2F2F] shadow placeholder-[#3A2F2F]/50 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              type="submit"
              className="sm:col-span-3 justify-self-start px-5 py-3 rounded-full bg-[#C78FA3] text-white shadow hover:scale-[1.03] transition-transform duration-300"
            >
              Kirim Pesan
            </button>
          </form>
          <ul className="space-y-3">
            {messages.map((m, i) => (
              <li key={i} className="bg-white text-[#3A2F2F] rounded-lg p-4 shadow">
                <div className="font-semibold">{m.name}</div>
                <div className="opacity-80">{m.msg}</div>
              </li>
            ))}
          </ul>
        </div>

        <footer className="mt-20 text-center text-sm text-[#3A2F2F]/70 dark:text-rose-100/70">
          © {new Date().getFullYear()} A & N — Dengan cinta.
        </footer>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-[#3A2F2F] focus:outline-none focus:ring-2 focus:ring-rose-400"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={gallery[lightbox].src}
            alt={gallery[lightbox].alt}
            className="max-h-[85vh] w-auto rounded-lg shadow-lg"
          />
        </div>
      )}
    </section>
  )
}
