/**
 * The handful of real-world values that change when the business changes.
 * Everything else in the app reads from here.
 */

/** Where the contact form and the mail links land. */
export const EMAIL = 'hola@zima.agency'

/**
 * POST target for the contact form. Any service that accepts a JSON or
 * form-encoded POST works (Formspree, Web3Forms, a Vercel function).
 * Left empty the form still works: it falls back to opening the visitor's
 * mail client with everything already filled in.
 */
export const FORM_ENDPOINT = ''

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
]
