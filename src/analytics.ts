/**
 * A single funnel-tracking entry point, deliberately provider-agnostic.
 *
 * Nothing is loaded by default, so this is a no-op until a provider is added.
 * To turn it on with Plausible, put one tag in index.html:
 *
 *   <script defer data-domain="zima.agency"
 *           src="https://plausible.io/js/script.js"></script>
 *
 * Google Analytics works too — it exposes `gtag` and is picked up below.
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
    gtag?: (command: string, event: string, params?: Record<string, string>) => void
  }
}

export function track(event: string, props: Record<string, string> = {}) {
  try {
    if (typeof window === 'undefined') return
    window.plausible?.(event, { props })
    window.gtag?.('event', event, props)
  } catch {
    // Analytics must never take the page down with it.
  }
}
