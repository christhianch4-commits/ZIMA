import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import WordsPullUp from './WordsPullUp'
import HeroScene from './HeroScene'
import SceneToggle from './SceneToggle'
import type { Scene } from '../useScene'

const NAV_ITEMS = [
  { label: 'Studio', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Build', href: '#services' },
  { label: 'Grow', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const EASE = [0.16, 1, 0.3, 1] as const

interface HeroProps {
  scene: Scene
  onToggleScene: () => void
}

export default function Hero({ scene, onToggleScene }: HeroProps) {
  return (
    <section className="h-screen w-full p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black md:rounded-[2rem]">
        <HeroScene scene={scene} />

        {/* Grain. No blend mode: mixing over a playing video costs a full
            backdrop read every frame, and the hero loses the fast path. */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.22]" />

        {/* Navbar — a black pill hanging from the top edge */}
        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-5 md:gap-8 md:rounded-b-3xl md:px-8">
            <ul className="flex items-center gap-3 text-[10px] sm:gap-6 sm:text-xs md:gap-12 md:text-sm lg:gap-14">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="whitespace-nowrap transition-colors duration-300"
                    style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#E1E0CC'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)'
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <span className="h-4 w-px shrink-0 bg-primary/20" aria-hidden="true" />
            <SceneToggle scene={scene} onToggle={onToggleScene} />
          </div>
        </nav>

        {/* Bottom-aligned hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 sm:px-6 sm:pb-7 md:px-10 md:pb-9 lg:px-12">
          <div className="grid grid-cols-12 items-end gap-x-4 gap-y-6 md:gap-x-8">
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                style={{ color: '#E1E0CC' }}
              >
                <WordsPullUp text="Zima" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col items-start gap-5 pb-2 sm:gap-6 lg:col-span-4 lg:pb-16 xl:pb-24">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                className="max-w-md text-xs text-primary/70 sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
              >
                Zima is a growth partner for companies that refuse to blend in. We
                build the sites, apps and dashboards, run the marketing that sells,
                and wire AI into how your team already works.
              </motion.p>

              <motion.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
                className="group flex items-center gap-2 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3 sm:text-base"
              >
                Book a call
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4" style={{ color: '#E1E0CC' }} />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
