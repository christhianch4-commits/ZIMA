import { useCopy } from '../i18n'
import { EMAIL, SOCIALS } from '../site'
import { track } from '../analytics'

export default function Footer() {
  const copy = useCopy()
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-primary/10 bg-black px-4 py-14 sm:px-6 md:px-8">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p
            className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl"
            style={{ color: '#E1E0CC' }}
          >
            Zima<span className="align-super text-sm">*</span>
          </p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-gray-500 sm:text-sm">
            {copy.footer.tagline}
          </p>
        </div>

        <nav className="md:col-span-3" aria-label={copy.footer.siteTitle}>
          <p className="mb-4 text-[10px] text-primary sm:text-xs">
            {copy.footer.siteTitle}
          </p>
          <ul className="space-y-2.5">
            {copy.nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-xs text-gray-400 transition-colors duration-300 hover:text-primary sm:text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="mb-4 text-[10px] text-primary sm:text-xs">
            {copy.footer.reachTitle}
          </p>
          <a
            href={`mailto:${EMAIL}`}
            onClick={() => track('email_click', { place: 'footer' })}
            className="text-xs text-gray-400 transition-colors duration-300 hover:text-primary sm:text-sm"
          >
            {EMAIL}
          </a>
          <ul className="mt-4 flex gap-5">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => track('social_click', { network: social.label })}
                  className="text-xs text-gray-400 transition-colors duration-300 hover:text-primary sm:text-sm"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1400px] border-t border-primary/10 pt-6">
        <p className="text-[10px] text-gray-600 sm:text-xs">
          © {year} Zima. {copy.footer.rights}
        </p>
      </div>
    </footer>
  )
}
