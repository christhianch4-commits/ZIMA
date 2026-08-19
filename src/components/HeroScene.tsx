import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../useReducedMotion'
import type { Scene } from '../useScene'

/**
 * The two matched takes of the same clifftop, stacked and cross-faded.
 *
 * Three movements sit on separate elements so their transforms never fight:
 *   1. parallax   — outer, driven by page scroll
 *   2. ken burns  — middle, a slow CSS scale that never stops
 *   3. cross-fade — inner, the day/night swap
 *
 * Anyone who asked their system for less motion gets the still frames instead
 * of the loops, and each layer keeps a gradient behind it that stands in while
 * the media loads, or entirely if it fails.
 */

const FADE_MS = 1600

interface Layer {
  scene: Scene
  video: string
  poster: string
  /** Stands in while the video loads: golden hour, and the lamp's warm pool. */
  fallback: string
  /** Each take needs its own scrim: the day plate is far brighter. */
  scrim: string
  filter?: string
}

const LAYERS: Layer[] = [
  {
    scene: 'day',
    video: '/hero-day.mp4',
    poster: '/hero-day.jpg',
    fallback:
      'radial-gradient(120% 95% at 78% 32%, #ffdda6 0%, #e5b076 16%, #a89177 34%, #5d7484 56%, #23405a 80%, #0e1c29 100%)',
    scrim:
      'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.74) 13%, rgba(0,0,0,0.5) 27%, rgba(0,0,0,0.16) 48%, rgba(0,0,0,0.12) 74%, rgba(0,0,0,0.34) 100%)',
    filter: 'contrast(1.08) saturate(1.06)',
  },
  {
    scene: 'night',
    video: '/hero-night.mp4',
    poster: '/hero-night.jpg',
    fallback:
      'radial-gradient(100% 80% at 52% 26%, #ffc074 0%, #b07a4e 7%, #3d4d68 26%, #16263c 52%, #060c16 100%)',
    scrim:
      'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.34) 24%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.16) 80%, rgba(0,0,0,0.42) 100%)',
  },
]

export default function HeroScene({ scene }: { scene: Scene }) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const [failed, setFailed] = useState<Partial<Record<Scene, boolean>>>({})
  // The off-screen take is not worth blocking the first paint for, so it only
  // mounts once the page has settled. Until then its layer shows the still.
  const [warmed, setWarmed] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const timer = window.setTimeout(() => setWarmed(true), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // The plate trails the page as the hero scrolls away.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '9%'])

  // Only the visible take decodes; the hidden one is parked once it has faded.
  useEffect(() => {
    if (reducedMotion) return

    const timers: number[] = []

    for (const layer of LAYERS) {
      const video = videoRefs.current[layer.scene]
      if (!video) continue

      if (layer.scene === scene) {
        void video.play().catch(() => {})
      } else {
        timers.push(window.setTimeout(() => video.pause(), FADE_MS + 120))
      }
    }

    return () => timers.forEach(window.clearTimeout)
  }, [scene, reducedMotion])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -top-[8%] left-0 h-[116%] w-full will-change-transform"
      >
        <div className="zKenBurns absolute inset-0">
          {LAYERS.map((layer) => (
            <div
              key={layer.scene}
              className="absolute inset-0 transition-opacity ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                opacity: scene === layer.scene ? 1 : 0,
                transitionDuration: `${FADE_MS}ms`,
                backgroundImage: layer.fallback,
              }}
            >
              {reducedMotion ||
              failed[layer.scene] ||
              !(layer.scene === scene || warmed) ? (
                <img
                  src={layer.poster}
                  alt=""
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                  style={{ filter: layer.filter }}
                />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[layer.scene] = el
                  }}
                  src={layer.video}
                  poster={layer.poster}
                  autoPlay={layer.scene === scene}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  onError={() =>
                    setFailed((current) => ({ ...current, [layer.scene]: true }))
                  }
                  className="h-full w-full select-none object-cover"
                  style={{ filter: layer.filter }}
                />
              )}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ backgroundImage: layer.scrim }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
