import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const milestones = [
  {
    date: '12 Nov 2023',
    title: 'Awal Bertemu',
    desc:
      'Sebuah perkenalan sederhana yang pelan-pelan menjadi rumah. Kita tertawa canggung, tapi hangatnya masih terasa hingga kini.',
    images: [
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80&fm=webp',
    ],
  },
  {
    date: 'Jan 2024',
    title: 'Kopi Pagi Pertama',
    desc:
      'Kamu bercerita tentang mimpi, aku menyiapkan gula. Pagi itu kita belajar: bahagia bisa sesederhana duduk berdua.',
    images: [
      'https://images.unsplash.com/photo-1502465771179-51f3535da42f?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80&fm=webp',
    ],
  },
  {
    date: 'Mar 2024',
    title: 'Langit Senja Kita',
    desc:
      'Kita mengejar langit oranye, memotret siluet, dan menyimpan senja itu di antara cerita favorit.',
    images: [
      'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=800&auto=format&fit=crop&q=80&fm=webp',
    ],
  },
  {
    date: 'Jun 2024',
    title: 'Liburan Spontan',
    desc:
      'Tanpa rencana panjang, kita berangkat. Yang penting: berdua. Sisanya mengikuti.',
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format&fit=crop&q=80&fm=webp',
    ],
  },
  {
    date: 'Sep 2024',
    title: 'Ujian Kecil',
    desc:
      'Ada harimu, ada hariku. Tapi kita selalu memilih duduk, mendengar, dan memeluk. Kita menang karena saling.',
    images: [
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80&fm=webp',
    ],
  },
  {
    date: 'Nov 2024',
    title: 'Dua Tahun',
    desc:
      'Terima kasih sudah tinggal—di hati, di cerita, di doa. Mari menulis bab berikutnya, pelan-pelan tapi pasti.',
    images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format&fit=crop&q=80&fm=webp',
    ],
  },
]

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true)
        })
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, visible }
}

function Carousel({ images, alt }) {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setIdx((i) => (i + 1) % images.length)

  return (
    <div className="relative group">
      <img
        src={images[idx]}
        alt={alt}
        loading="lazy"
        className="w-full h-56 object-cover rounded-lg shadow-md transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
      />
      <button
        onClick={prev}
        aria-label="Sebelumnya"
        className="absolute top-1/2 -translate-y-1/2 left-2 p-2 rounded-full bg-white/80 text-[#3A2F2F] shadow focus:outline-none focus:ring-2 focus:ring-rose-400"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={next}
        aria-label="Berikutnya"
        className="absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-full bg-white/80 text-[#3A2F2F] shadow focus:outline-none focus:ring-2 focus:ring-rose-400"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function TimelineSection() {
  return (
    <section id="timeline" className="bg-[#FFF6F2] dark:bg-[#2b2323] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#3A2F2F] dark:text-rose-100 mb-10">Jejak Waktu Kita</h2>
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#C78FA3]" aria-hidden />
          <ol className="space-y-10">
            {milestones.map((m, i) => (
              <TimelineItem key={i} m={m} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ m }) {
  const { ref, visible } = useReveal()
  return (
    <li
      ref={ref}
      className="relative grid sm:grid-cols-5 gap-4 items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(16px)',
        transition: 'all 500ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="absolute left-0 top-3 h-3 w-3 bg-[#C78FA3] rounded-full shadow" aria-hidden />
      <div className="sm:col-span-2">
        <div className="text-sm text-[#3A2F2F]/70 dark:text-rose-100/70">{m.date}</div>
        <h3 className="font-serif text-xl text-[#3A2F2F] dark:text-rose-100">{m.title}</h3>
        <p className="mt-2 text-[#3A2F2F]/90 dark:text-rose-100/90 leading-relaxed">{m.desc}</p>
      </div>
      <div className="sm:col-span-3">
        <Carousel images={m.images} alt={m.title} />
      </div>
    </li>
  )
}
