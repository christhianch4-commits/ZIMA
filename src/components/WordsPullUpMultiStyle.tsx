import { useRef, type ElementType } from 'react'
import { motion, useInView } from 'framer-motion'

export interface Segment {
  text: string
  className?: string
  /** Forces the segment onto a new line inside the wrapping flex container. */
  newLine?: boolean
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  className?: string
  /** Horizontal alignment of the wrapping words. */
  justify?: 'start' | 'center' | 'end'
  delayOffset?: number
  /** Rendered element. Use a heading where this is one, so it lands in the outline. */
  as?: ElementType
}

const EASE = [0.16, 1, 0.3, 1] as const

const JUSTIFY = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
} as const

interface Word {
  text: string
  className: string
  breakBefore: boolean
}

export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  justify = 'center',
  delayOffset = 0,
  as: Tag = 'div',
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  // Flatten every segment into single words while keeping its own styling.
  const words: Word[] = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((text, i) => ({
        text,
        className: segment.className ?? '',
        breakBefore: Boolean(segment.newLine) && i === 0,
      })),
  )

  return (
    <Tag
      ref={ref}
      className={`inline-flex flex-wrap ${JUSTIFY[justify]} ${className}`}
    >
      {words.map((word, i) => (
        <span key={`${word.text}-${i}`} className="contents">
          {word.breakBefore && <span className="basis-full h-0" aria-hidden />}
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.9,
              delay: delayOffset + i * 0.08,
              ease: EASE,
            }}
            className={`inline-block pr-[0.22em] ${word.className}`}
          >
            {word.text}
          </motion.span>{' '}
        </span>
      ))}
    </Tag>
  )
}
