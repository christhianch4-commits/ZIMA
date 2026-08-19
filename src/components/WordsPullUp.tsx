import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface WordsPullUpProps {
  text: string
  className?: string
  /** Renders a superscript asterisk hanging off the last character of the last word. */
  showAsterisk?: boolean
  /** Seconds added before the first word starts. */
  delayOffset?: number
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  delayOffset = 0,
}: WordsPullUpProps) {
  const words = text.split(' ')
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        const head = word.slice(0, -1)
        const tail = word.slice(-1)

        return (
          <span key={`${word}-${i}`} className="contents">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.9,
              delay: delayOffset + i * 0.08,
              ease: EASE,
            }}
            className={`inline-block ${isLast ? '' : 'pr-[0.25em]'}`}
          >
            {showAsterisk && isLast ? (
              <>
                {head}
                <span className="relative inline-block">
                  {tail}
                  <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] font-normal">
                    *
                  </span>
                </span>
              </>
            ) : (
              word
            )}
          </motion.span>{isLast ? null : ' '}
          </span>
        )
      })}
    </span>
  )
}
