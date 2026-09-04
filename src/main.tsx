import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { LangProvider } from './i18n'
import './index.css'

const container = document.getElementById('root')!

const tree = (
  <React.StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
)

// The production build ships prerendered markup, so adopt it instead of
// throwing it away. `npm run dev` serves an empty root, hence the check.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
