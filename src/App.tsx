import { useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import { useScene } from './useScene'

export default function App() {
  const { scene, toggle } = useScene()

  // Sections mount after the browser has already tried to resolve the hash,
  // so re-run the jump once they exist.
  useEffect(() => {
    if (!window.location.hash) return
    const target = document.querySelector(window.location.hash)
    target?.scrollIntoView({ behavior: 'auto' })
  }, [])

  return (
    <main className="min-h-screen w-full bg-black">
      <Hero scene={scene} onToggleScene={toggle} />
      <About />
      <Services />
      <Contact scene={scene} />
    </main>
  )
}
