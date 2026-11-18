import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { ease } from '../../lib/site'

type Props = { children: ReactNode; delay?: number; y?: number; className?: string }

// scroll reveal: enters once, ease-out, transform + opacity only
export function Reveal({ children, delay = 0, y = 28, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
}: {
  eyebrow: string
  title: ReactNode
  text?: string
  align?: 'left' | 'center'
}) {
  const center = align === 'center'
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <Reveal>
        <span className="eyebrow inline-flex items-center gap-3">
          <span className="h-px w-8 bg-mint" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 text-4xl leading-[1.02] font-bold text-balance sm:text-5xl lg:text-6xl">{title}</h2>
      </Reveal>
      {text && (
        <Reveal delay={0.12}>
          <p className="mt-6 text-base leading-relaxed text-slate sm:text-lg">{text}</p>
        </Reveal>
      )}
    </div>
  )
}
