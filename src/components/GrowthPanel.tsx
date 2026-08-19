import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Scene } from '../useScene'

/**
 * The first feature card: two trajectories leaving the same point. One stays
 * flat, the other climbs clear of a field of noise. That is the whole pitch —
 * a partner who bends the curve — so the card carries the idea rather than
 * decorating around it.
 */

function mulberry32(seed: number) {
  return function next() {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const random = mulberry32(23)
const BASE_Y = 350

// The undifferentiated noise everyone else is competing inside of.
const NOISE = Array.from({ length: 38 }, (_, i) => {
  const x = 44 + i * 8.2
  // Taller towards the middle, so the rising curve has something to clear.
  const bell = Math.sin((i / 37) * Math.PI)
  return { x, h: 6 + bell * (18 + random() * 52) }
})

const GROWTH_PATH =
  'M 46 340 C 120 337, 172 322, 212 268 C 252 213, 292 148, 352 96'
const FLAT_PATH = 'M 46 340 C 140 337, 240 327, 356 312'

const EASE = [0.22, 1, 0.36, 1] as const

export default function GrowthPanel({ scene }: { scene: Scene }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const warm = scene === 'day'

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="zgBg" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#1d1d1b" />
          <stop offset="1" stopColor="#0b0b0a" />
        </linearGradient>

        <radialGradient id="zgGlow" cx="0.82" cy="0.2" r="0.65">
          <stop
            offset="0"
            stopColor={warm ? '#ffc98a' : '#8fb0ff'}
            stopOpacity="0.3"
          />
          <stop offset="1" stopColor={warm ? '#ffc98a' : '#8fb0ff'} stopOpacity="0" />
        </radialGradient>

        <linearGradient id="zgFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DEDBC8" stopOpacity="0.2" />
          <stop offset="1" stopColor="#DEDBC8" stopOpacity="0" />
        </linearGradient>

        <filter id="zgSoft" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <rect x="0" y="0" width="400" height="480" fill="url(#zgBg)" />
      <rect x="0" y="0" width="400" height="480" fill="url(#zgGlow)" />

      {/* measure lines */}
      <g stroke="#DEDBC8" strokeOpacity="0.06" strokeWidth="1">
        {[112, 170, 228, 286, 344].map((y) => (
          <line key={y} x1="30" y1={y} x2="370" y2={y} />
        ))}
      </g>

      {/* the noise */}
      <g>
        {NOISE.map((bar, i) => (
          <motion.rect
            key={i}
            x={bar.x}
            y={BASE_Y - bar.h}
            width="3"
            height={bar.h}
            rx="1.5"
            fill="#DEDBC8"
            fillOpacity="0.2"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.012, ease: EASE }}
            style={{ transformOrigin: `${bar.x + 1.5}px ${BASE_Y}px` }}
          />
        ))}
      </g>

      {/* going it alone */}
      <motion.path
        d={FLAT_PATH}
        fill="none"
        stroke="#7c7a70"
        strokeWidth="1.6"
        strokeDasharray="4 4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
      />

      {/* with a partner */}
      <motion.path
        d={`${GROWTH_PATH} L 352 350 L 46 350 Z`}
        fill="url(#zgFill)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: EASE }}
      />
      <motion.path
        d={GROWTH_PATH}
        fill="none"
        stroke="#E1E0CC"
        strokeWidth="2.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.7, delay: 0.6, ease: EASE }}
      />

      {/* where it lands */}
      <motion.g
        initial={{ opacity: 0, scale: 0.4 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.7, delay: 2.1, ease: EASE }}
        style={{ transformOrigin: '352px 96px' }}
      >
        <circle cx="352" cy="96" r="17" fill="#E1E0CC" opacity="0.28" filter="url(#zgSoft)" />
        <circle cx="352" cy="96" r="4.6" fill="#E1E0CC" />
      </motion.g>

      {/* the two outcomes, named */}
      <motion.text
        x="352"
        y="70"
        textAnchor="end"
        fill="#E1E0CC"
        fontSize="12"
        letterSpacing="0.5"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 2.25, ease: EASE }}
      >
        With Zima
      </motion.text>
      <motion.text
        x="356"
        y="331"
        textAnchor="end"
        fill="#7c7a70"
        fontSize="11"
        letterSpacing="0.5"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 1.7, ease: EASE }}
      >
        On your own
      </motion.text>
    </svg>
  )
}
