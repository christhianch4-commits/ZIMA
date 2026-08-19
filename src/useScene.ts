import { useCallback, useEffect, useState } from 'react'

export type Scene = 'day' | 'night'

const STORAGE_KEY = 'zima-scene'

function readStored(): Scene {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'night' ? 'night' : 'day'
  } catch {
    return 'day'
  }
}

/** Scene state for the hero, mirrored onto <html data-scene> and persisted. */
export function useScene() {
  const [scene, setScene] = useState<Scene>(readStored)

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
