/**
 * Turns the built app into one static HTML page per language.
 *
 * Search engines can only rank a URL that exists. A single page that swaps its
 * text with JavaScript offers them one URL and one language to index, however
 * good the translation is. This writes /index.html and /es/index.html, each
 * with the full markup, its own head, and hreflang pointing at the other.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const { render, LANGS, SITE_URL } = await import(
  resolve(root, 'dist-ssr/entry-server.js')
)

const template = readFileSync(resolve(dist, 'index.html'), 'utf-8')
const origin = process.env.SITE_URL || SITE_URL

for (const lang of LANGS) {
  const { html, head } = render(lang)

  const page = template
    .replace('<html lang="en"', `<html lang="${lang}"`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html)

  const outDir = lang === 'en' ? dist : resolve(dist, lang)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), page)
  console.log(`  ${lang} -> ${resolve(outDir, 'index.html').replace(root + '/', '')}`)
}

// Crawl instructions, so both languages get found instead of guessed at.
writeFileSync(
  resolve(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
)

const today = new Date().toISOString().slice(0, 10)
const path = (lang) => `${origin}${lang === 'es' ? '/es/' : '/'}`
const urls = LANGS.map((lang) => {
  const alts = LANGS.map(
    (code) =>
      `    <xhtml:link rel="alternate" hreflang="${code}" href="${path(code)}"/>`,
  ).join('\n')
  return `  <url>\n    <loc>${path(lang)}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`
}).join('\n')

writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
)

console.log('  robots.txt + sitemap.xml')
