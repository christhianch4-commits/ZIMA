import { Moon, Sun } from 'lucide-react'
import type { Scene } from '../useScene'

interface SceneToggleProps {
  scene: Scene
  onToggle: () => void
}

/** Swaps the hero between golden hour and the lit-lamp night. */
export default function SceneToggle({ scene, onToggle }: SceneToggleProps) {
  const isNight = scene === 'night'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isNight}
      aria-label={isNight ? 'Switch to daylight' : 'Switch to night'}
      className="group relative flex h-6 w-12 shrink-0 items-center rounded-full border border-primary/20 bg-primary/[0.07] transition-colors duration-500 hover:border-primary/40 sm:h-7 sm:w-14"
    >
      <Sun
        className={`pointer-events-none absolute left-[7px] h-3 w-3 transition-opacity duration-500 ${
          isNight ? 'opacity-30' : 'opacity-0'
        }`}
        style={{ color: '#E1E0CC' }}
        strokeWidth={2}
      />
      <Moon
        className={`pointer-events-none absolute right-[7px] h-3 w-3 transition-opacity duration-500 ${
          isNight ? 'opacity-0' : 'opacity-30'
        }`}
        style={{ color: '#E1E0CC' }}
        strokeWidth={2}
      />
      <span
        className="absolute flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary shadow-[0_0_12px_rgba(222,219,200,0.35)] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[22px] sm:w-[22px]"
        style={{ transform: `translateX(${isNight ? 'calc(100% + 12px)' : '3px'})` }}
      >
        {isNight ? (
          <Moon className="h-2.5 w-2.5 text-black sm:h-3 sm:w-3" strokeWidth={2.4} />
        ) : (
          <Sun className="h-2.5 w-2.5 text-black sm:h-3 sm:w-3" strokeWidth={2.4} />
        )}
      </span>
    </button>
  )
}
