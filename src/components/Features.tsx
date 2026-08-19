import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Layers,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import GrowthPanel from './GrowthPanel'
import type { Scene } from '../useScene'

interface Feature {
  number: string
  title: string
  Icon: LucideIcon
  items: string[]
}

const FEATURES: Feature[] = [
  {
    number: '01',
    title: 'Growth Engine.',
    Icon: TrendingUp,
    items: [
      'Full-funnel acquisition mapped to real revenue',
      'Creative testing loops that never stall',
      'Lifecycle flows that pay for themselves',
      'Weekly reporting you can actually act on',
    ],
  },
  {
    number: '02',
    title: 'Brand System.',
    Icon: Layers,
    items: [
      'Positioning sharp enough to survive the scroll',
      'Design tokens, not one-off deliverables',
      'Ships to Figma, Webflow and production code',
    ],
  },
  {
    number: '03',
    title: 'AI Leverage.',
    Icon: Sparkles,
    items: [
      'Agents that draft, tag and route the busywork',
      'Audience and creative research in minutes',
      'Plugs into your CRM, analytics and stack',
    ],
  },
]

const CARD_EASE = [0.22, 1, 0.36, 1] as const

interface CardProps {
  index: number
  className?: string
  children: ReactNode
}

/** Shared entrance animation for every card in the grid. */
function Card({ index, className = '', children }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: CARD_EASE }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Features({ scene }: { scene: Scene }) {
  return (
    <section
      id="features"
      className="relative min-h-screen w-full bg-black px-4 py-20 sm:px-6 md:px-8 md:py-28"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <WordsPullUpMultiStyle
          as="h2"
          className="max-w-4xl text-xl font-normal leading-[1.15] sm:text-2xl md:text-3xl lg:text-4xl"
          justify="start"
          segments={[
            {
              text: 'Growth systems for brands that refuse to blend in.',
              className: 'text-[#E1E0CC]',
            },
            {
              text: 'Built on data. Powered by design.',
              className: 'text-gray-500',
              newLine: true,
            },
          ]}
        />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4 xl:mt-16">
          {/* Card 01 — the pitch, drawn */}
          <Card index={0} className="h-[360px] lg:h-full">
            <GrowthPanel scene={scene} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <p
              className="absolute bottom-5 left-5 z-10 text-sm sm:text-base"
              style={{ color: '#E1E0CC' }}
            >
              Above the noise.
            </p>
          </Card>

          {FEATURES.map((feature, i) => (
            <Card
              key={feature.number}
              index={i + 1}
              className="flex h-full min-h-[360px] flex-col bg-[#212121] p-5 sm:p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/25 to-primary/5 ring-1 ring-primary/10 sm:h-12 sm:w-12">
                <feature.Icon
                  className="h-4 w-4 text-primary sm:h-5 sm:w-5"
                  strokeWidth={1.6}
                />
              </span>

              <div className="mt-5 flex items-start justify-between gap-3">
                <h3
                  className="text-sm font-normal sm:text-base"
                  style={{ color: '#E1E0CC' }}
                >
                  {feature.title}
                </h3>
                <span className="shrink-0 text-[10px] text-gray-500 sm:text-xs">
                  {feature.number}
                </span>
              </div>

              <ul className="mt-auto space-y-3 pt-10">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5"
                      strokeWidth={2.5}
                    />
                    <span className="text-[11px] leading-snug text-gray-400 sm:text-xs">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="group mt-6 inline-flex items-center gap-1.5 text-[11px] transition-opacity duration-300 hover:opacity-70 sm:text-xs"
                style={{ color: '#E1E0CC' }}
              >
                Learn more
                <ArrowRight
                  className="h-3 w-3 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
