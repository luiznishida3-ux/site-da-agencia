import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { ReactNode, PointerEvent } from 'react'
import { useFinePointer } from '../../hooks/useMedia'

const MAX = 7 // degrees, discreet on purpose

export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const fine = useFinePointer()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 220, damping: 22 })
  const sy = useSpring(py, { stiffness: 220, damping: 22 })
  const rotateY = useTransform(sx, [0, 1], [-MAX, MAX])
  const rotateX = useTransform(sy, [0, 1], [MAX, -MAX])
  const lx = useTransform(px, (v) => `${v * 100}%`)
  const ly = useTransform(py, (v) => `${v * 100}%`)
  const light = useMotionTemplate`radial-gradient(420px circle at ${lx} ${ly}, rgb(139 124 255 / 0.22), transparent 60%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={fine ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className={`group relative h-full rounded-3xl border border-line bg-surface/70 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] transition-[border-color] duration-200 ease-[ease] hover:border-violet/40 ${className}`}
      >
        {fine && (
          <motion.div
            aria-hidden
            style={{ background: light }}
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 ease-[ease] group-hover:opacity-100"
          />
        )}
        {children}
      </motion.div>
    </div>
  )
}
