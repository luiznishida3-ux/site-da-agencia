import { motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode, PointerEvent } from 'react'

type Props = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  icon?: ReactNode
  external?: boolean
  magnetic?: boolean
  className?: string
}

const styles = {
  primary:
    'bg-ink text-navy shadow-[0_0_0_1px_rgb(244_245_250/0.4),0_10px_40px_-10px_rgb(139_124_255/0.7)] hover:shadow-[0_0_0_1px_rgb(244_245_250/0.6),0_14px_50px_-8px_rgb(139_124_255/0.95)]',
  ghost: 'glass text-ink hover:bg-ink/10 hover:border-ink/25',
}

export function Button({ href, children, variant = 'primary', icon, external, magnetic, className = '' }: Props) {
  // magnetic pull: discreet spring, interruptible because it re-targets on every pointer move
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!magnetic || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.18)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.97, transition: { duration: 0.12, ease: 'easeOut' } }}
      className={`group relative inline-flex h-13 items-center justify-center gap-2.5 rounded-full px-7 font-display text-[15px] font-semibold whitespace-nowrap transition-[background-color,box-shadow,border-color] duration-200 ease-[ease] select-none ${styles[variant]} ${className}`}
    >
      {icon}
      <span>{children}</span>
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2.2}
      />
    </motion.a>
  )
}
