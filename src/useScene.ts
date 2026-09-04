import { useCallback, useEffect, useState } from 'react'

export type Scene = 'day' | 'night'

const STORAGE_KEY = 'zima-scene'

function readStored(): Scene {
  if (typeof window === 'undefined') return 'day'
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'night' ? 'night' : 'day'
  } catch {
    return 'day'
  }
}

/** Scene state for the hero, mirrored onto <html data-scene> and persisted. */
export function useScene() {
  // Starts where the prerendered markup starts. Reading the stored choice here
  // would make the first client render disagree with the server's, and React
  // would throw the prerendered tree away and rebuild it from scratch.
  const [scene, setScene] = useState<Scene>('day')

  useEffect(() => {
    const saved = readStored()
    if (saved !== 'day') setScene(saved)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.scene = scene
    try {
      window.localStorage.setItem(STORAGE_KEY, scene)
    } catch {
      // Private browsing — the choice just will not survive a reload.
    }
  }, [scene])

  const toggle = useCallback(
    () => setScene((current) => (current === 'day' ? 'night' : 'day')),
    [],
  )

  return { scene, toggle }
}
