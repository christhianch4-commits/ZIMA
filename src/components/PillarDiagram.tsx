import { motion } from 'framer-motion'

/**
 * One schematic per pillar. These are drawn rather than photographed on
 * purpose: the hero sets a very particular world, and stock photography beside
 * it reads as a different website. Each one shows the mechanic of its pillar
 * instead of decorating around it, and replays whenever the pillar changes
 * because the parent keys this component by id.
 */

const CREAM = '#E1E0CC'
const DIM = '#7c7a70'
const EASE = [0.22, 1, 0.36, 1] as const

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 480 380"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="pdGlow" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor={CREAM} stopOpacity="0.09" />
          <stop offset="1" stopColor={CREAM} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="480" height="380" fill="url(#pdGlow)" />
      <g stroke={CREAM} strokeOpacity="0.05" strokeWidth="1">
        {[70, 140, 210, 280, 350].map((y) => (
          <line key={y} x1="24" y1={y} x2="456" y2={y} />
        ))}
      </g>
      {children}
    </svg>
  )
}

/** Build — an interface assembling itself out of blocks. */
function BuildDiagram() {
  const blocks = [
    { x: 60, y: 108, w: 96, h: 152, o: 0.1 },
    { x: 172, y: 108, w: 248, h: 56, o: 0.16 },
    { x: 172, y: 176, w: 118, h: 84, o: 0.1 },
    { x: 302, y: 176, w: 118, h: 84, o: 0.1 },
    { x: 60, y: 272, w: 360, h: 40, o: 0.06 },
  ]
  return (
    <Frame>
      <motion.rect
        x="48"
        y="70"
        width="384"
        height="256"
        rx="12"
        fill="none"
        stroke={CREAM}
        strokeOpacity="0.3"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
      />
      <g fill={DIM}>
        {[66, 80, 94].map((cx, i) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy="88"
            r="3.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
          />
        ))}
      </g>
      {blocks.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="6"
          fill={CREAM}
          fillOpacity={b.o}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.11, ease: EASE }}
        />
      ))}
      {/* a chart inside the interface, because dashboards are the point */}
      <motion.path
        d="M 320 240 L 344 222 L 368 230 L 392 200"
        fill="none"
        stroke={CREAM}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
      />
    </Frame>
  )
}

/** Grow — reach spreading out from one signal. */
function GrowDiagram() {
  const dots = [
    [128, 118], [206, 92], [292, 116], [356, 158], [150, 262],
    [232, 288], [318, 268], [386, 222], [96, 190], [258, 176],
  ]
  return (
    <Frame>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="132"
          cy="200"
          r="30"
          fill="none"
          stroke={CREAM}
          strokeWidth="1.5"
          initial={{ scale: 0.4, opacity: 0.55 }}
          animate={{ scale: 4.4, opacity: 0 }}
          transition={{
            duration: 3.4,
            delay: i * 1.13,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transformOrigin: '132px 200px' }}
        />
      ))}
      {dots.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="4"
          fill={CREAM}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.85, 0.35], scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5 + i * 0.12, ease: EASE }}
        />
      ))}
      <motion.circle
        cx="132"
        cy="200"
        r="9"
        fill={CREAM}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </Frame>
  )
}

/** Automate — work flowing through a hub instead of through people. */
function AutomateDiagram() {
  const inputs = [110, 190, 270]
  const outputs = [150, 250]
  return (
    <Frame>
      {inputs.map((y, i) => (
        <g key={`in-${i}`}>
          <motion.path
            d={`M 84 ${y} C 150 ${y}, 170 190, 216 190`}
            fill="none"
            stroke={CREAM}
            strokeOpacity="0.22"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: EASE }}
          />
          {/* Flow shown with a travelling dash pattern. offset-path would be
              tidier but its SVG support is patchy, and a dash offset animates
              the same idea everywhere. */}
          <motion.path
            d={`M 84 ${y} C 150 ${y}, 170 190, 216 190`}
            fill="none"
            stroke={CREAM}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 16"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={{ strokeDashoffset: -42, opacity: 0.9 }}
            transition={{
              strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.5, delay: 1 + i * 0.12 },
            }}
          />
          <motion.rect
            x="52"
            y={y - 13}
            width="32"
            height="26"
            rx="6"
            fill={CREAM}
            fillOpacity="0.12"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
          />
        </g>
      ))}

      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        style={{ transformOrigin: '240px 190px' }}
      >
        <rect
          x="216"
          y="166"
          width="48"
          height="48"
          rx="12"
          fill={CREAM}
          fillOpacity="0.9"
        />
        <path
          d="M 232 190 l 6 8 l 12 -16"
          fill="none"
          stroke="#000"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {outputs.map((y, i) => (
        <g key={`out-${i}`}>
          <motion.path
            d={`M 264 190 C 312 190, 330 ${y}, 396 ${y}`}
            fill="none"
            stroke={CREAM}
            strokeOpacity="0.22"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.9 + i * 0.1, ease: EASE }}
          />
          <motion.path
            d={`M 264 190 C 312 190, 330 ${y}, 396 ${y}`}
            fill="none"
            stroke={CREAM}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 16"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={{ strokeDashoffset: -42, opacity: 0.9 }}
            transition={{
              strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.5, delay: 1.4 + i * 0.12 },
            }}
          />
          <motion.rect
            x="396"
            y={y - 13}
            width="32"
            height="26"
            rx="6"
            fill={CREAM}
            fillOpacity="0.18"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 + i * 0.09, ease: EASE }}
          />
        </g>
      ))}
    </Frame>
  )
}

/** Operate — phases running to a plan, with the work actually moving. */
function OperateDiagram() {
  const phases = [
    { y: 108, x: 72, w: 150 },
    { y: 152, x: 136, w: 172 },
    { y: 196, x: 210, w: 148 },
    { y: 240, x: 168, w: 210 },
    { y: 284, x: 268, w: 132 },
  ]
  return (
    <Frame>
      {phases.map((p, i) => (
        <g key={i}>
          <rect x="60" y={p.y} width="360" height="16" rx="8" fill={CREAM} fillOpacity="0.05" />
          <motion.rect
            x={p.x}
            y={p.y}
            height="16"
            rx="8"
            fill={CREAM}
            fillOpacity={i === 1 || i === 3 ? 0.55 : 0.25}
            initial={{ width: 0 }}
            animate={{ width: p.w }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.13, ease: EASE }}
          />
          <motion.circle
            cx={p.x + p.w}
            cy={p.y + 8}
            r="4"
            fill={CREAM}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.9 + i * 0.13, ease: EASE }}
          />
        </g>
      ))}
      <motion.line
        y1="92"
        y2="316"
        stroke={CREAM}
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeDasharray="3 4"
        initial={{ x1: 60, x2: 60, opacity: 0 }}
        animate={{ x1: 292, x2: 292, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.6, ease: EASE }}
      />
    </Frame>
  )
}

const DIAGRAMS: Record<string, () => JSX.Element> = {
  build: BuildDiagram,
  grow: GrowDiagram,
  automate: AutomateDiagram,
  operate: OperateDiagram,
}

export default function PillarDiagram({ id }: { id: string }) {
  const Diagram = DIAGRAMS[id] ?? BuildDiagram
  return <Diagram />
}
