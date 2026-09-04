import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Scene } from '../useScene'

/**
 * Two trajectories leaving the same point. One stays flat, the other climbs
 * clear of a field of noise. That is the whole pitch — a partner who bends the
 * curve — so the panel carries the idea instead of decorating around it.
 *
 * The viewBox is landscape to match the band it sits in. It is drawn with
 * `slice`, so anything that has to stay readable lives well inside the edges.
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
const BASE_Y = 348

// The undifferentiated noise everyone else is competing inside of.
const NOISE = Array.from({ length: 46 }, (_, i) => {
  const x = 62 + i * 12.8
  const bell = Math.sin((i / 45) * Math.PI)
  return { x, h: 6 + bell * (16 + random() * 48) }
})

const GROWTH_PATH =
  'M 62 336 C 190 332, 300 316, 382 262 C 462 208, 546 142, 646 94'
const FLAT_PATH = 'M 62 336 C 230 332, 430 322, 658 306'

const EASE = [0.22, 1, 0.36, 1] as const

export default function GrowthPanel({ scene }: { scene: Scene }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const warm = scene === 'day'

  return (
    <svg
      ref={ref}
      viewBox="0 0 720 460"
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

        <radialGradient id="zgGlow" cx="0.85" cy="0.16" r="0.7">
          <stop offset="0" stopColor={warm ? '#ffc98a' : '#8fb0ff'} stopOpacity="0.3" />
          <stop offset="1" stopColor={warm ? '#ffc98a' : '#8fb0ff'} stopOpacity="0" />
        </radialGradient>

        <linearGradient id="zgFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DEDBC8" stopOpacity="0.2" />
          <stop offset="1" stopColor="#DEDBC8" stopOpacity="0" />
        </linearGradient>

        <filter id="zgSoft" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <rect x="0" y="0" width="720" height="460" fill="url(#zgBg)" />
      <rect x="0" y="0" width="720" height="460" fill="url(#zgGlow)" />

      {/* measure lines */}
      <g stroke="#DEDBC8" strokeOpacity="0.06" strokeWidth="1">
        {[112, 172, 232, 292, 348].map((y) => (
          <line key={y} x1="48" y1={y} x2="672" y2={y} />
        ))}
      </g>

      {/* the noise */}
      <g>
        {NOISE.map((bar, i) => (
          <motion.rect
            key={i}
            x={bar.x}
            y={BASE_Y - bar.h}
            width="3.4"
            height={bar.h}
            rx="1.7"
            fill="#DEDBC8"
            fillOpacity="0.2"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.011, ease: EASE }}
            style={{ transformOrigin: `${bar.x + 1.7}px ${BASE_Y}px` }}
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
        d={`${GROWTH_PATH} L 646 348 L 62 348 Z`}
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
        style={{ transformOrigin: '646px 94px' }}
      >
        <circle cx="646" cy="94" r="18" fill="#E1E0CC" opacity="0.28" filter="url(#zgSoft)" />
        <circle cx="646" cy="94" r="4.8" fill="#E1E0CC" />
      </motion.g>

      {/* the two outcomes, named */}
      <motion.text
        x="646"
        y="66"
        textAnchor="end"
        fill="#E1E0CC"
        fontSize="15"
        letterSpacing="0.4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 2.25, ease: EASE }}
      >
        With Zima
      </motion.text>
      <motion.text
        x="658"
        y="326"
        textAnchor="end"
        fill="#7c7a70"
        fontSize="13"
        letterSpacing="0.4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 1.7, ease: EASE }}
      >
        On your own
      </motion.text>
    </svg>
  )
}
