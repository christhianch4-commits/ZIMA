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

/** Spanish lives under /es/. The path is the single source of truth. */
export const ES_PREFIX = '/es'

export function langFromPath(pathname: string): Lang {
  return pathname === ES_PREFIX || pathname.startsWith(`${ES_PREFIX}/`) ? 'es' : 'en'
}

export function pathForLang(lang: Lang): string {
  return lang === 'es' ? `${ES_PREFIX}/` : '/'
}

/**
 * Reading the language off the URL rather than off the browser keeps the
 * server and the client in agreement. Detecting it from `navigator` would make
 * the prerendered markup and the hydrated markup disagree, and React would
 * throw the whole tree away and rebuild it.
 */
function detect(): Lang {
  if (typeof window === 'undefined') return 'en'
  return langFromPath(window.location.pathname)
}

interface LangValue {
  lang: Lang
  copy: Copy
  toggle: () => void
}

const LangContext = createContext<LangValue | null>(null)

interface LangProviderProps {
  children: ReactNode
  /** Set by the prerender so each page is built in its own language. */
  forced?: Lang
}

export function LangProvider({ children, forced }: LangProviderProps) {
  const [lang, setLang] = useState<Lang>(() => forced ?? detect())

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Switching language is a navigation, not a state change: that is what gives
  // each language a real URL for search engines to index.
  const toggle = useCallback(() => {
    const next: Lang = lang === 'en' ? 'es' : 'en'
    track('language_switch', { to: next })
    if (typeof window !== 'undefined') {
      window.location.assign(pathForLang(next) + window.location.hash)
      return
    }
    setLang(next)
  }, [lang])

  const value = useMemo(() => ({ lang, copy: COPY[lang], toggle }), [lang, toggle])

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
