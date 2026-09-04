import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { COPY, type Copy, type Lang } from './copy'
import { track } from './analytics'

const STORAGE_KEY = 'zima-lang'

function detect(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    // Private browsing; fall through to the browser's own preference.
  }
  const preferred = typeof navigator !== 'undefined' ? navigator.language : 'en'
  return preferred.toLowerCase().startsWith('es') ? 'es' : 'en'
}

interface LangValue {
  lang: Lang
  copy: Copy
  toggle: () => void
}

const LangContext = createContext<LangValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detect)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // The choice just will not survive a reload.
    }
  }, [lang])

  const toggle = useCallback(() => {
    setLang((current) => {
      const next = current === 'en' ? 'es' : 'en'
      track('language_switch', { to: next })
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ lang, copy: COPY[lang], toggle }),
    [lang, toggle],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const value = useContext(LangContext)
  if (!value) throw new Error('useLang must be used inside <LangProvider>')
  return value
}

/** Shorthand for the common case of only needing the strings. */
export function useCopy() {
  return useLang().copy
}
