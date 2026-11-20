import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FlaskConical, RotateCcw, Sparkles } from 'lucide-react'
import { concepts } from '../mockups/concepts'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { ease, whatsapp } from '../../lib/site'

type Option = { label: string; color: string }

const groups: { key: string; title: string; options: Option[] }[] = [
  { key: 'segmento', title: 'Seu negócio', options: concepts.map((c) => ({ label: c.category, color: c.theme.accent })) },
  {
    key: 'objetivo',
    title: 'Seu objetivo',
    options: [
      { label: 'Atrair mais clientes', color: '#35D6C2' },
      { label: 'Vender pela internet', color: '#8B7CFF' },
      { label: 'Passar autoridade', color: '#5B8CFF' },
    ],
  },
  {
    key: 'estilo',
    title: 'O estilo',
    options: [
      { label: 'Elegante', color: '#B9A7FF' },
      { label: 'Ousado', color: '#FF4D8D' },
      { label: 'Minimalista', color: '#9FE8DC' },
    ],
  },
]

const LEVELS = [0, 52, 98, 142] // liquid height per number of ingredients
const BOTTOM = 240

type Phase = 'pick' | 'mixing' | 'done'

/** Mini-game: pick 3 ingredients, each drips into the flask, mix, get a WhatsApp-ready brief. */
export function LabFormula() {
  const [picks, setPicks] = useState<(Option | null)[]>([null, null, null])
  const [drop, setDrop] = useState<{ id: number; color: string } | null>(null)
  const [phase, setPhase] = useState<Phase>('pick')

  const count = picks.filter(Boolean).length
  const level = phase === 'pick' ? LEVELS[count] : 150
  const surface = BOTTOM - level
  const colors = picks.map((p, i) => p?.color ?? picks.slice(0, i).reverse().find(Boolean)?.color ?? '#8B7CFF')

  const pick = (g: number, o: Option) => {
    if (phase !== 'pick') return
    setPicks((p) => p.map((v, i) => (i === g ? o : v)))
    setDrop({ id: Date.now(), color: o.color })
  }

  const mix = () => {
    setPhase('mixing')
    setTimeout(() => setPhase('done'), 1500)
  }

  const reset = () => {
    setPicks([null, null, null])
    setPhase('pick')
  }

  const [segmento, objetivo, estilo] = picks
  const message =
    phase === 'done' && segmento && objetivo && estilo
      ? `Olá, Empirium Labs! Montei minha fórmula no laboratório do site: um site ${estilo.label.toLowerCase()} para ${segmento.label.toLowerCase()}, com foco em ${objetivo.label.toLowerCase()}. Quero começar meu projeto!`
      : 'Olá, Empirium Labs! Quero começar o meu projeto.'

  return (
    <div className="glass mx-auto mt-12 grid max-w-5xl items-center gap-8 rounded-[2rem] p-5 text-left sm:p-8 md:grid-cols-[0.9fr_1.1fr]">
      {/* flask */}
      <div className="relative mx-auto w-full max-w-[140px] md:max-w-[260px]">
        <div aria-hidden className="absolute inset-x-6 bottom-2 h-10 rounded-[50%] blur-2xl" style={{ background: colors[2], opacity: count ? 0.45 : 0.15 }} />
        <motion.svg
          viewBox="0 0 200 260"
          className="relative w-full overflow-visible"
          role="img"
          aria-label={`Frasco com ${count} de 3 ingredientes`}
          animate={phase === 'mixing' ? { rotate: [0, -6, 6, -4, 4, 0] } : { rotate: 0 }}
          transition={phase === 'mixing' ? { duration: 0.6, repeat: 2, ease: 'easeInOut' } : { duration: 0.3 }}
        >
          <defs>
            <clipPath id="flask-clip">
              <path d="M84 20 H116 V94 L174 214 Q182 232 164 240 H36 Q18 232 26 214 L84 94 Z" />
            </clipPath>
            <clipPath id="liquid-clip">
              <motion.rect x="0" width="200" height="260" initial={false} animate={{ y: surface }} transition={{ type: 'spring', stiffness: 90, damping: 16 }} />
            </clipPath>
            <linearGradient id="liquid-grad" x1="0" y1="1" x2="0" y2="0">
              {(phase === 'pick' ? colors : ['#35D6C2', '#8B7CFF', '#B9A7FF']).map((c, i) => (
                <motion.stop key={i} offset={`${i * 25}%`} initial={false} animate={{ stopColor: c }} transition={{ duration: 0.6 }} />
              ))}
            </linearGradient>
          </defs>

          {/* falling drop */}
          <AnimatePresence>
            {drop && phase === 'pick' && (
              <motion.circle
                key={drop.id}
                cx="100"
                r="7"
                fill={drop.color}
                initial={{ cy: -14, opacity: 1 }}
                animate={{ cy: surface + 4, opacity: [1, 1, 0] }}
                transition={{ duration: 0.65, ease: 'easeIn' }}
                onAnimationComplete={() => setDrop(null)}
              />
            )}
          </AnimatePresence>

          <g clipPath="url(#flask-clip)">
            <rect width="200" height="260" fill="rgb(244 245 250 / 0.04)" />
            <g clipPath="url(#liquid-clip)">
              <rect width="200" height="260" fill="url(#liquid-grad)" opacity="0.92" />
              {count > 0 &&
                [40, 70, 95, 120, 150, 82].map((x, i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={236}
                    r={2 + (i % 3)}
                    fill="rgb(255 255 255 / 0.55)"
                    className="animate-bubble"
                    style={{ animationDelay: `${i * 0.35}s`, animationDuration: phase === 'mixing' ? '0.7s' : '2.6s' }}
                  />
                ))}
            </g>
            {/* glass highlight */}
            <path d="M92 28 V96 L40 206" stroke="rgb(255 255 255 / 0.22)" strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>
          <path d="M84 20 H116 V94 L174 214 Q182 232 164 240 H36 Q18 232 26 214 L84 94 Z" fill="none" stroke="rgb(244 245 250 / 0.55)" strokeWidth="3" strokeLinejoin="round" />
          <rect x="76" y="12" width="48" height="10" rx="5" fill="none" stroke="rgb(244 245 250 / 0.55)" strokeWidth="3" />
          {[60, 100, 140].map((y) => (
            <line key={y} x1="142" x2="154" y1={BOTTOM - y + 30} y2={BOTTOM - y + 30} stroke="rgb(244 245 250 / 0.25)" strokeWidth="2" />
          ))}
        </motion.svg>
        <p className="mt-3 text-center font-display text-sm text-slate">{count}/3 ingredientes</p>
      </div>

      {/* controls */}
      <div aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {phase !== 'done' ? (
            <motion.div key="pick" exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}>
              <p className="eyebrow inline-flex items-center gap-2">
                <FlaskConical className="h-4 w-4" /> Laboratório Empirium
              </p>
              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">Monte a fórmula do seu site</h3>
              <div className="mt-6 space-y-5">
                {groups.map((g, gi) => (
                  <div key={g.key} role="group" aria-label={g.title}>
                    <p className="mb-2 text-xs font-semibold tracking-widest text-ink/50 uppercase">
                      0{gi + 1} · {g.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {g.options.map((o) => {
                        const on = picks[gi]?.label === o.label
                        return (
                          <motion.button
                            key={o.label}
                            type="button"
                            aria-pressed={on}
                            disabled={phase !== 'pick'}
                            onClick={() => pick(gi, o)}
                            whileTap={{ scale: 0.96, transition: { duration: 0.12 } }}
                            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors duration-150 ease-[ease] ${
                              on ? 'border-ink bg-ink font-semibold text-navy' : 'border-line text-ink/75 hover:border-ink/40 hover:text-ink'
                            }`}
                          >
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: o.color }} />
                            {o.label}
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <motion.button
                type="button"
                onClick={mix}
                disabled={count < 3 || phase !== 'pick'}
                whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
                className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-violet px-6 font-display font-semibold text-navy transition-[opacity,filter] duration-200 ease-[ease] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Sparkles className="h-4 w-4" />
                {phase === 'mixing' ? 'Misturando…' : count < 3 ? `Escolha mais ${3 - count}` : 'Misturar fórmula'}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: ease.out }}
            >
              <p className="eyebrow inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Fórmula pronta
              </p>
              <h3 className="mt-3 text-2xl leading-tight font-bold sm:text-3xl">
                Um site <span className="text-gradient">{estilo?.label.toLowerCase()}</span> para{' '}
                {segmento?.label.toLowerCase()}, feito para{' '}
                <span className="text-gradient">{objetivo?.label.toLowerCase()}</span>.
              </h3>
              <p className="mt-4 text-ink/65">
                Essa é a sua combinação. Mande para a gente no WhatsApp e transformamos a fórmula no site do seu negócio.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={whatsapp(message)} external magnetic icon={<WhatsAppIcon className="h-5 w-5" />}>
                  Enviar minha fórmula
                </Button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm text-ink/60 transition-colors hover:text-ink"
                >
                  <RotateCcw className="h-4 w-4" /> Refazer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
