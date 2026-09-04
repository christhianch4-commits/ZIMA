import { useRef, useState, type FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import GrowthPanel from './GrowthPanel'
import { useCopy } from '../i18n'
import { EMAIL, FORM_ENDPOINT } from '../site'
import { track } from '../analytics'
import type { Scene } from '../useScene'

const EASE = [0.22, 1, 0.36, 1] as const

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIELD =
  'w-full rounded-lg border border-primary/15 bg-black/40 px-4 py-3 text-xs text-[#E1E0CC] outline-none transition-colors duration-300 placeholder:text-gray-600 focus:border-primary/50 sm:text-sm'

/** Closing band: the curve from earlier comes back as the argument to act. */
export default function Contact({ scene }: { scene: Scene }) {
  const copy = useCopy()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    track('contact_submit', { company: data.company ? 'yes' : 'no' })
    setStatus('sending')

    // With no endpoint configured the form still has to work, so it hands the
    // message to the visitor's mail client already filled in.
    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`${data.company || data.name} — zima.agency`)
      const body = encodeURIComponent(
        `${data.message}\n\n—\n${data.name}\n${data.email}\n${data.company}`,
      )
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(response.ok ? 'sent' : 'error')
      if (response.ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="w-full bg-black px-4 pb-20 sm:px-6 md:px-8 md:pb-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto grid max-w-[1400px] overflow-hidden rounded-2xl bg-[#141414] md:grid-cols-2 md:rounded-[2rem]"
      >
        <div className="relative min-h-[300px] overflow-hidden md:min-h-[560px]">
          <GrowthPanel scene={scene} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <p
            className="absolute bottom-5 left-6 z-10 text-sm sm:text-base"
            style={{ color: '#E1E0CC' }}
          >
            {copy.contact.caption}
          </p>
        </div>

        <div className="flex flex-col justify-center gap-6 p-8 sm:p-12 md:p-14">
          <p className="text-[10px] text-primary sm:text-xs">{copy.contact.label}</p>

          <h2
            className="text-2xl font-normal leading-[1.05] sm:text-3xl md:text-4xl"
            style={{ color: '#E1E0CC' }}
          >
            {copy.contact.heading}
          </h2>

          <p className="max-w-md text-xs leading-relaxed text-gray-400 sm:text-sm">
            {copy.contact.body}
          </p>

          <form onSubmit={onSubmit} className="mt-2 flex flex-col gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="zc-name">
                {copy.contact.name}
              </label>
              <input
                id="zc-name"
                name="name"
                required
                autoComplete="name"
                placeholder={copy.contact.name}
                className={FIELD}
              />

              <label className="sr-only" htmlFor="zc-email">
                {copy.contact.email}
              </label>
              <input
                id="zc-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={copy.contact.email}
                className={FIELD}
              />
            </div>

            <label className="sr-only" htmlFor="zc-company">
              {copy.contact.company}
            </label>
            <input
              id="zc-company"
              name="company"
              autoComplete="organization"
              placeholder={copy.contact.company}
              className={FIELD}
            />

            <label className="sr-only" htmlFor="zc-message">
              {copy.contact.message}
            </label>
            <textarea
              id="zc-message"
              name="message"
              required
              rows={3}
              placeholder={copy.contact.message}
              className={`${FIELD} resize-none`}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group mt-1 flex w-fit items-center gap-2 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3 disabled:opacity-60 sm:text-base"
            >
              {status === 'sending' ? copy.contact.sending : copy.contact.send}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                {status === 'sending' ? (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    style={{ color: '#E1E0CC' }}
                  />
                ) : (
                  <ArrowRight className="h-4 w-4" style={{ color: '#E1E0CC' }} />
                )}
              </span>
            </button>

            <p aria-live="polite" className="min-h-[18px] text-xs text-gray-400">
              {status === 'sent' && copy.contact.sent}
              {status === 'error' && (
                <>
                  {copy.contact.failed}{' '}
                  <a href={`mailto:${EMAIL}`} className="text-primary underline">
                    {EMAIL}
                  </a>
                </>
              )}
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
