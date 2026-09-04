import { Fragment, useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

/** Swap these for the real company line and the section rewrites itself. */
const FOUNDER_NAME = 'Yerika Rodriguez'
const COMPANY_ROLE = 'a growth partner.'

const BODY_TEXT =
  `Founded by ${FOUNDER_NAME}, we work as an extension of your team rather than a vendor kept at arm's length. Strategy, design, engineering and paid growth sit in the same room, so the site, the app, the dashboards and the campaigns are built to feed each other instead of competing for the same budget.`

interface AnimatedLetterProps {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}

/** One character whose opacity is driven by how far the paragraph has scrolled. */
function AnimatedLetter({ char, index, total, progress }: AnimatedLetterProps) {
  const charProgress = index / total
  const opacity = useTransform(
    progress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1],
  )

  return <motion.span style={{ opacity }}>{char}</motion.span>
}

export default function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  // Words keep the spaces as plain text nodes so the paragraph can still wrap;
  // only the inked characters get their own animated span.
  const total = BODY_TEXT.length
  const words = BODY_TEXT.split(' ')
  let cursor = 0

  return (
    <section id="about" className="bg-black px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="relative mx-auto max-w-6xl rounded-2xl bg-[#101010] px-5 py-16 text-center sm:px-10 sm:py-20 md:rounded-[2rem] md:px-16 md:py-28">
        <p className="mb-6 text-[10px] text-primary sm:mb-8 sm:text-xs">
          Growth partner
        </p>

        <WordsPullUpMultiStyle
          as="h2"
          className="mx-auto max-w-3xl text-3xl leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
          justify="center"
          segments={[
            { text: 'We are Zima,', className: 'font-normal' },
            {
              text: COMPANY_ROLE,
              className: 'font-serif italic font-normal',
            },
            {
              text: 'We design, build and scale the digital side of your business.',
              className: 'font-normal',
            },
          ]}
        />

        <p
          ref={paragraphRef}
          className="mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-[#DEDBC8] sm:mt-14 sm:text-sm md:text-base"
        >
          {words.map((word, wordIndex) => {
            const start = cursor
            cursor += word.length + 1

            return (
              <Fragment key={`${word}-${wordIndex}`}>
                {word.split('').map((char, i) => (
                  <AnimatedLetter
                    key={i}
                    char={char}
                    index={start + i}
                    total={total}
                    progress={scrollYProgress}
                  />
                ))}
                {wordIndex < words.length - 1 ? ' ' : null}
              </Fragment>
            )
          })}
        </p>
      </div>
    </section>
  )
}
