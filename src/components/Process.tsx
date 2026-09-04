import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import { useCopy } from '../i18n'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The four steps of an engagement, on a line that fills as you scroll past.
 * Different mechanic from the services tabs on purpose: that one you drive,
 * this one just tracks where you already are.
 */
export default function Process() {
  const copy = useCopy()
  const trackRef = useRef<HTMLOListElement>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.85', 'end 0.6'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const height = useTransform(fill, (value) => `${Math.min(1, Math.max(0, value)) * 100}%`)

  return (
    <section
      id="process"
      className="relative w-full bg-black px-4 py-20 sm:px-6 md:px-8 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <p className="mb-6 text-[10px] text-primary sm:text-xs">{copy.process.label}</p>

        <WordsPullUpMultiStyle
          as="h2"
          className="max-w-4xl text-xl font-normal leading-[1.15] sm:text-2xl md:text-3xl lg:text-4xl"
          justify="start"
          segments={[
            { text: copy.process.headOne, className: 'text-[#E1E0CC]' },
            { text: copy.process.headTwo, className: 'text-gray-500', newLine: true },
          ]}
        />

        <ol ref={trackRef} className="relative mt-14 sm:mt-20">
          {/* the rail, and the part of it you have already travelled */}
          <div className="absolute bottom-0 left-[15px] top-2 w-px bg-primary/10 sm:left-[19px]" />
          <motion.div
            style={{ height }}
            className="absolute left-[15px] top-2 w-px origin-top bg-primary/70 sm:left-[19px]"
          />

          {copy.process.steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="relative grid gap-3 pb-14 pl-12 last:pb-0 sm:pl-16 md:grid-cols-12 md:gap-8"
            >
              <span
                className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-black text-[10px] tabular-nums ring-1 ring-primary/20 sm:h-10 sm:w-10 sm:text-xs"
                style={{ color: '#E1E0CC' }}
              >
                {step.number}
              </span>

              <h3
                className="text-lg font-normal leading-tight md:col-span-4 md:text-xl lg:text-2xl"
                style={{ color: '#E1E0CC' }}
              >
                {step.title}
              </h3>
              <p className="max-w-2xl text-xs leading-relaxed text-gray-400 md:col-span-8 sm:text-sm">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
