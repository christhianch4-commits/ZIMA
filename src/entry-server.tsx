import { renderToString } from 'react-dom/server'
import App from './App'
import { LangProvider, pathForLang } from './i18n'
import { COPY, type Lang } from './copy'
import { SITE_URL, EMAIL, SOCIALS } from './site'

const LANGS: Lang[] = ['en', 'es']

/** Everything that belongs in <head> and depends on the language. */
function head(lang: Lang) {
  const copy = COPY[lang]
  const url = `${SITE_URL}${pathForLang(lang)}`
  const image = `${SITE_URL}/hero-day.jpg`

  const alternates = LANGS.map(
    (code) =>
      `<link rel="alternate" hreflang="${code}" href="${SITE_URL}${pathForLang(code)}" />`,
  ).join('\n    ')

  // Tells search engines this is one business serving clients anywhere, which
  // is the whole point of shipping it in two languages.
  const org = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Zima',
    url: SITE_URL,
    email: EMAIL,
    logo: `${SITE_URL}/favicon.svg`,
    image,
    description: copy.meta.description,
    areaServed: 'Worldwide',
    availableLanguage: ['en', 'es'],
    sameAs: SOCIALS.map((s) => s.href),
    serviceType: copy.services.pillars.map((p) => p.title),
  }

  return `<title>${copy.meta.title}</title>
    <meta name="description" content="${copy.meta.description}" />
    <link rel="canonical" href="${url}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${copy.meta.title}" />
    <meta property="og:description" content="${copy.meta.description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:locale" content="${copy.ogLocale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${copy.meta.title}" />
    <meta name="twitter:description" content="${copy.meta.description}" />
    <meta name="twitter:image" content="${image}" />

    <script type="application/ld+json">${JSON.stringify(org)}</script>`
}

export function render(lang: Lang) {
  return {
    html: renderToString(
      <LangProvider forced={lang}>
        <App />
      </LangProvider>,
    ),
    head: head(lang),
    lang,
  }
}

export { LANGS, SITE_URL }
