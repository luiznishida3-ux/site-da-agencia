import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { nav, whatsapp, ease } from '../../lib/site'
import { useMedia } from '../../hooks/useMedia'

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))
  const desktop = useMedia('(min-width: 1024px)')
  useEffect(() => {
    if (desktop) setOpen(false) // menu is hidden on desktop; don't leave scroll locked
  }, [desktop])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: ease.out, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <nav
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-4 transition-[background-color,border-color,box-shadow] duration-300 ease-[ease] sm:px-5 ${
          scrolled || open
            ? 'border border-line bg-navy/75 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl'
            : 'border border-transparent'
        }`}
        aria-label="Principal"
      >
        <a href="#topo" aria-label="Empirium Labs, início" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="rounded-full px-4 py-2 text-sm text-ink/70 transition-colors duration-150 ease-[ease] hover:bg-ink/5 hover:text-ink"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <motion.a
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
            className="hidden h-10 items-center rounded-full bg-violet px-5 font-display text-sm font-semibold text-navy transition-[filter] duration-200 ease-[ease] hover:brightness-110 sm:inline-flex"
          >
            Solicitar orçamento
          </motion.a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors duration-150 hover:bg-ink/5 active:scale-95 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22, ease: ease.out }}
            style={{ transformOrigin: 'top center' }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-line bg-navy/95 p-3 backdrop-blur-xl lg:hidden"
          >
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3.5 font-display text-lg font-medium text-ink/85 active:bg-ink/5"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex h-12 items-center justify-center rounded-xl bg-violet font-display font-semibold text-navy"
            >
              Solicitar orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
