import { useLang } from '../i18n'

/** EN / ES, with the language you are reading held bright. */
export default function LangToggle() {
  const { lang, copy, toggle } = useLang()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={copy.langLabel}
      className="flex shrink-0 items-center gap-1 text-[10px] tracking-wide transition-opacity duration-300 hover:opacity-80 sm:text-xs"
    >
      {(['en', 'es'] as const).map((code, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && <span className="text-primary/25">/</span>}
          <span
            className="transition-colors duration-300"
            style={{ color: lang === code ? '#E1E0CC' : 'rgba(225,224,204,0.35)' }}
          >
            {code.toUpperCase()}
          </span>
        </span>
      ))}
    </button>
  )
}
