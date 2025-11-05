import { useEffect, useRef, useState } from 'react'
import HeaderBar from './components/HeaderBar'
import HeroSection from './components/HeroSection'
import TimelineSection from './components/TimelineSection'
import GalleryGuestbook from './components/GalleryGuestbook'

function App() {
  const audioRef = useRef(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth')
  }, [])

  const toggleMusic = async () => {
    if (!audioRef.current) return
    try {
      if (isMusicPlaying) {
        audioRef.current.pause()
        setIsMusicPlaying(false)
      } else {
        await audioRef.current.play()
        setIsMusicPlaying(true)
      }
    } catch (e) {
      // ignore autoplay restrictions errors
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF6F2] text-[#3A2F2F] dark:bg-[#1f1a1a] dark:text-rose-50">
      <HeaderBar onToggleMusic={toggleMusic} isMusicPlaying={isMusicPlaying} />
      <main>
        <HeroSection />
        <TimelineSection />
        <GalleryGuestbook />
      </main>

      {/* Hidden audio element for background music */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_2d7c9a6d2f.mp3?filename=romantic-ambient-110126.mp3"
        loop
        preload="none"
        aria-hidden="true"
      />
    </div>
  )
}

export default App
