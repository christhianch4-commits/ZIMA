import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import GrowthPanel from './GrowthPanel'
import type { Scene } from '../useScene'

const EASE = [0.22, 1, 0.36, 1] as const

/** Closing band. The curve from earlier comes back as the argument to act. */
export default function Contact({ scene }: { scene: Scene }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="w-full bg-black px-4 pb-20 sm:px-6 md:px-8 md:pb-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto grid max-w-[1400px] overflow-hidden rounded-2xl bg-[#141414] md:grid-cols-2 md:rounded-[2rem]"
      >
        <div className="relative min-h-[300px] overflow-hidden md:min-h-[440px]">
          <GrowthPanel scene={scene} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <p
            className="absolute bottom-5 left-6 z-10 text-sm sm:text-base"
            style={{ color: '#E1E0CC' }}
          >
            Above the noise.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-6 p-8 sm:p-12 md:p-16">
          <p className="text-[10px] text-primary sm:text-xs">Start here</p>

          <h2
            className="text-2xl font-normal leading-[1.05] sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ color: '#E1E0CC' }}
          >
            Tell us where the growth
            <br />
            has stalled.
          </h2>

          <p className="max-w-md text-xs leading-relaxed text-gray-400 sm:text-sm">
            One call, no deck. We look at what you have running, say plainly what
            we would change first, and you decide whether it is worth doing
            together.
          </p>

          <a
            href="mailto:hola@zima.com"
            className="group mt-2 flex w-fit items-center gap-2 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3 sm:text-base"
          >
            Book a call
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
              <ArrowRight className="h-4 w-4" style={{ color: '#E1E0CC' }} />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
