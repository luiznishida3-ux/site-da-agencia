import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Eye, X } from 'lucide-react'
import { SectionHeading } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { Laptop, Phone, ConceptScreen } from '../mockups/Devices'
import { concepts } from '../mockups/concepts'
import { ease, whatsapp } from '../../lib/site'
import { useFinePointer } from '../../hooks/useMedia'

export function Portfolio() {
  const [active, setActive] = useState(0)
  const [preview, setPreview] = useState(false)
  const c = concepts[active]
  const fine = useFinePointer()

  // stage leans toward the cursor
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, -4]), { stiffness: 120, damping: 20 })
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, 2]), { stiffness: 120, damping: 20 })
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section id="projetos" className="relative overflow-hidden py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Portfólio"
          title={
            <>
              Design que transforma a <span className="text-gradient">primeira impressão.</span>
            </>
          }
          text="Projetos conceito criados pela Empirium Labs para mostrar como cada segmento pode se apresentar online. Escolha um setor e explore."
        />

        {/* category tabs */}
        <div aria-label="Setores" role="group" className="mt-12 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {concepts.map((k, i) => (
            <button
              key={k.id}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 font-display text-sm font-medium transition-colors duration-200 ease-[ease] ${
                i === active ? 'text-navy' : 'text-ink/65 hover:text-ink'
              }`}
            >
              {i === active && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              {i !== active && <span className="absolute inset-0 rounded-full border border-line" />}
              <span className="relative">{k.category}</span>
            </button>
          ))}
        </div>

        {/* stage */}
        <div
          onPointerMove={onMove}
          onPointerLeave={() => (mx.set(0), my.set(0))}
          className="relative mt-10 grid items-center gap-10 rounded-[2rem] border border-line bg-gradient-to-br from-surface via-navy to-surface p-6 sm:p-10 lg:grid-cols-[1.6fr_1fr] lg:p-14"
        >
          <div aria-hidden className="absolute top-1/2 left-1/3 h-2/3 w-1/2 -translate-1/2 rounded-full bg-violet/20 blur-[100px]" />
          <div style={{ perspective: 1400 }} className="relative">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.18, ease: 'easeOut' } }}
                transition={{ duration: 0.5, ease: ease.out }}
                className="relative"
              >
                <motion.div style={{ rotateY: rotY, rotateX: rotX, transformStyle: 'preserve-3d' }} className="relative pr-[16%] pb-[6%]">
                  <Laptop c={c} />
                  <motion.div
                    className="absolute right-0 bottom-0 w-[22%]"
                    style={{ z: 60 }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: ease.out, delay: 0.12 }}
                  >
                    <Phone c={c} />
                  </motion.div>
                </motion.div>
                {/* floor shadow */}
                <div aria-hidden className="mx-auto mt-4 h-6 w-3/4 rounded-[50%] bg-black/60 blur-xl" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative">
            <span className="inline-flex rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-mint uppercase">
              Projeto conceito
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
                transition={{ duration: 0.3, ease: ease.out }}
              >
                <h3 className="mt-5 text-3xl font-bold sm:text-4xl">{c.name}</h3>
                <p className="mt-2 text-sm tracking-wide text-slate uppercase">{c.category}</p>
                <p className="mt-5 leading-relaxed text-ink/65">
                  Conceito de site para {c.category.toLowerCase()}: apresentação forte da marca, serviços organizados e
                  chamada clara para “{c.cta.toLowerCase()}”, adaptado para computador e celular.
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <motion.button
                type="button"
                onClick={() => setPreview(true)}
                whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 font-display text-[15px] font-semibold text-navy transition-shadow duration-200 ease-[ease] hover:shadow-[0_10px_40px_-8px_rgb(139_124_255/0.9)]"
              >
                <Eye className="h-4 w-4" /> Visualizar projeto
              </motion.button>
              <Button href={whatsapp(`Olá, Empirium Labs! Quero um site para ${c.category.toLowerCase()} como o conceito ${c.name}.`)} external variant="ghost">
                Quero um assim
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PreviewModal open={preview} onClose={() => setPreview(false)} index={active} />
    </section>
  )
}

function PreviewModal({ open, onClose, index }: { open: boolean; onClose: () => void; index: number }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const c = concepts[index]
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') e.preventDefault() // close button is the only stop: keeps focus inside the dialog
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-navy/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização do conceito ${c.name}`}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.28, ease: ease.out }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 hidden text-xs text-slate sm:inline">{c.name} · projeto conceito</span>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Fechar visualização"
                className="grid h-9 w-9 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/10 hover:text-ink active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="hidden aspect-[16/9] sm:block">
              <ConceptScreen c={c} />
            </div>
            <div className="h-[70vh] sm:hidden">
              <ConceptScreen c={c} mobile />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
