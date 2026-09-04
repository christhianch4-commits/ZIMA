import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Check, Layers, Route, Sparkles, TrendingUp, type LucideIcon } from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import { useReducedMotion } from '../useReducedMotion'

/**
 * The four pillars, strung along a power line.
 *
 * The mechanic is lifted straight out of the hero: the utility poles and their
 * sagging cable become the navigation. The cable energises up to whichever
 * pillar is selected, which says the thing the copy is trying to say — these
 * are one connected system, not four services sold separately.
 */

interface Pillar {
  id: string
  number: string
  title: string
  tagline: string
  services: string[]
  Icon: LucideIcon
}

const PILLARS: Pillar[] = [
  {
    id: 'build',
    number: '01',
    title: 'Build',
    tagline: 'Everything the business runs on, built properly.',
    services: [
      'Websites that load fast and actually convert',
      'Web and mobile apps, brief to store',
      'Dashboards that answer the question you really asked',
      'Custom digital solutions when nothing off the shelf fits',
    ],
    Icon: Layers,
  },
  {
    id: 'grow',
    number: '02',
    title: 'Grow',
    tagline: 'Marketing that answers to revenue, not to vanity metrics.',
    services: [
      'Performance marketing across every paid channel',
      'Social growth with a content engine behind it',
      'Sales-focused funnels and lifecycle flows',
      'Creative testing loops that never stall',
    ],
    Icon: TrendingUp,
  },
  {
    id: 'automate',
    number: '03',
    title: 'Automate',
    tagline: 'AI wired into how your team already works.',
    services: [
      'AI implementation across your existing stack',
      'Agents that absorb the repetitive work',
      'Research and reporting that took days, in minutes',
      'Tooling your team will actually adopt',
    ],
    Icon: Sparkles,
  },
  {
    id: 'operate',
    number: '04',
    title: 'Operate',
    tagline: 'The discipline that keeps all of it shipping.',
    services: [
      'Project management from kickoff to handover',
      'Team training and enablement',
      'Process and methodology optimisation',
      'Full project development, brief to launch',
    ],
    Icon: Route,
  },
]

// Node centres as a fraction of the width: the middle of each of four columns.
const NODES = [0.125, 0.375, 0.625, 0.875]
const AUTO_ADVANCE_MS = 5500
const EASE = [0.22, 1, 0.36, 1] as const

export default function Services() {
  const [active, setActive] = useState(0)
  const [userTook, setUserTook] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-20%' })
  const reducedMotion = useReducedMotion()

  // Moves on its own so the section has a pulse, then hands over for good the
  // moment somebody actually engages with it.
  useEffect(() => {
    if (userTook || !inView || reducedMotion) return
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % PILLARS.length),
      AUTO_ADVANCE_MS,
    )
    return () => window.clearInterval(timer)
  }, [userTook, inView, reducedMotion])

  const choose = useCallback((index: number) => {
    setUserTook(true)
    setActive(index)
  }, [])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const delta =
        event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
      if (!delta) return
      event.preventDefault()
      const next = (active + delta + PILLARS.length) % PILLARS.length
      choose(next)
      const tabs = ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      tabs?.[next]?.focus()
    },
    [active, choose],
  )

  const pillar = PILLARS[active]

  return (
    <section
      id="services"
      className="relative w-full bg-black px-4 py-20 sm:px-6 md:px-8 md:py-28"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div ref={ref} className="relative z-10 mx-auto max-w-[1400px]">
        <p className="mb-6 text-[10px] text-primary sm:text-xs">What we do</p>

        <WordsPullUpMultiStyle
          as="h2"
          className="max-w-4xl text-xl font-normal leading-[1.15] sm:text-2xl md:text-3xl lg:text-4xl"
          justify="start"
          segments={[
            {
              text: 'Four pillars, wired into one system.',
              className: 'text-[#E1E0CC]',
            },
            {
              text: 'Build it, grow it, automate it, run it.',
              className: 'text-gray-500',
              newLine: true,
            },
          ]}
        />

        {/* The line, and the poles hanging off it */}
        <div className="relative mt-14 sm:mt-20">
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-14 w-full sm:block"
            viewBox="0 0 1000 56"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0 16 Q 62 30, 125 16 Q 250 32, 375 16 Q 500 32, 625 16 Q 750 32, 875 16 Q 938 30, 1000 16"
              fill="none"
              stroke="#DEDBC8"
              strokeOpacity="0.16"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            {/* The live stretch is revealed with a clip rect rather than a dash
                pattern. pathLength normalises in viewBox units while
                non-scaling-stroke measures dashes in screen pixels, and with
                preserveAspectRatio="none" stretching this box those two
                disagree — the trace stops short of its node. A clip rect is
                measured in user space, so it tracks the stretch exactly. */}
            <defs>
              <clipPath id="zWireClip">
                <motion.rect
                  x="0"
                  y="0"
                  height="56"
                  initial={false}
                  animate={{ width: NODES[active] * 1000 }}
                  transition={{ duration: 0.9, ease: EASE }}
                />
              </clipPath>
            </defs>
            <g clipPath="url(#zWireClip)">
              <path
                d="M 0 16 Q 62 30, 125 16 Q 250 32, 375 16 Q 500 32, 625 16 Q 750 32, 875 16 Q 938 30, 1000 16"
                fill="none"
                stroke="#E1E0CC"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            {NODES.map((x, i) => (
              <line
                key={i}
                x1={x * 1000}
                y1="16"
                x2={x * 1000}
                y2="56"
                stroke="#DEDBC8"
                strokeOpacity={i === active ? 0.5 : 0.14}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          <div
            role="tablist"
            aria-label="Service pillars"
            onKeyDown={onKeyDown}
            className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2 sm:pt-14"
          >
            {PILLARS.map((item, i) => {
              const on = i === active
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls="pillar-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => choose(i)}
                  onMouseEnter={() => choose(i)}
                  className="group flex flex-col items-center gap-2 rounded-xl px-2 py-4 text-center transition-colors duration-500"
                >
                  <span
                    className="relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 sm:h-12 sm:w-12"
                    style={{
                      backgroundColor: on ? '#E1E0CC' : 'rgba(222,219,200,0.07)',
                      boxShadow: on ? '0 0 26px rgba(222,219,200,0.35)' : 'none',
                    }}
                  >
                    <item.Icon
                      className="h-4 w-4 transition-colors duration-500 sm:h-5 sm:w-5"
                      style={{ color: on ? '#000000' : '#DEDBC8' }}
                      strokeWidth={1.7}
                    />
                  </span>
                  <span
                    className="text-[10px] tabular-nums transition-colors duration-500 sm:text-xs"
                    style={{ color: on ? 'rgba(222,219,200,0.7)' : '#6b6b63' }}
                  >
                    {item.number}
                  </span>
                  <span
                    className="text-sm transition-colors duration-500 sm:text-base"
                    style={{ color: on ? '#E1E0CC' : '#7c7a70' }}
                  >
                    {item.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* What that pillar actually covers */}
        <div
          id="pillar-panel"
          role="tabpanel"
          className="mt-8 min-h-[280px] rounded-2xl bg-[#141414] p-6 sm:mt-10 sm:p-10 md:rounded-[2rem] md:p-14"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid gap-8 md:grid-cols-12 md:gap-12"
            >
              <h3
                className="md:col-span-5 text-xl font-normal leading-[1.15] sm:text-2xl md:text-3xl"
                style={{ color: '#E1E0CC' }}
              >
                {pillar.tagline}
              </h3>

              <ul className="md:col-span-7 grid gap-4 sm:grid-cols-2">
                {pillar.services.map((service, i) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
                    className="flex items-start gap-3"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                      strokeWidth={2.4}
                    />
                    <span className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                      {service}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
