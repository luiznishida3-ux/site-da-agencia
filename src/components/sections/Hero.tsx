import { lazy, Suspense, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { SceneFallback } from '../three/SceneFallback'
import { hasWebGL, useIsMobile } from '../../hooks/useMedia'
import { ease, whatsapp } from '../../lib/site'

const HeroScene = lazy(() => import('../three/HeroScene'))

const headline = 'Pare de ter presença virtual fraca na internet, eleva seu negócio.'
const words = headline.split(' ')
const accentFrom = words.indexOf('eleva')

function Word({ w, i, accent }: { w: string; i: number; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        className={`inline-block ${accent ? 'text-gradient' : ''}`}
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: ease.out, delay: 0.25 + i * 0.04 }}
      >
        {w}
      </motion.span>
      &nbsp;
    </span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const mobile = useIsMobile()
  const reduced = !!useReducedMotion()
  const [webgl] = useState(hasWebGL)
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 160])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.88])

  return (
    <section ref={ref} id="topo" className="noise relative isolate min-h-[100svh] overflow-hidden">
      {/* backdrop: grid + controlled volumetric light */}
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
      <div
        aria-hidden
        className="absolute top-[-20%] right-[-10%] -z-10 h-[80vh] w-[80vh] rounded-full bg-violet/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-30%] left-[-15%] -z-10 h-[60vh] w-[60vh] rounded-full bg-mint/10 blur-[140px]"
      />

      {/* 3D stage: right half on desktop, top band on mobile */}
      <motion.div
        style={{ y: sceneY, scale: sceneScale }}
        className="absolute inset-x-0 top-16 h-[46svh] md:top-0 md:right-0 md:left-auto md:h-full md:w-[58%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: ease.out, delay: 0.2 }}
      >
        {webgl ? (
          <Suspense fallback={<SceneFallback />}>
            <HeroScene mobile={mobile} reduced={reduced} active={inView} />
          </Suspense>
        ) : (
          <SceneFallback />
        )}
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-x relative flex min-h-[100svh] flex-col justify-end pt-[50svh] pb-16 md:justify-center md:pt-28 md:pb-24"
      >
        <div className="pointer-events-none max-w-3xl md:max-w-[52%]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ease.out, delay: 0.15 }}
            className="glass pointer-events-auto inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-ink/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            Estúdio digital · Sites profissionais
          </motion.div>

          <h1 className="mt-6 text-[2.2rem] leading-[1] font-bold sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem]">
            <span className="sr-only">{headline}</span>
            <span aria-hidden>
              {words.map((w, i) => (
                <Word key={i} w={w} i={i} accent={i >= accentFrom} />
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: ease.out, delay: 0.75 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg"
          >
            Sites profissionais, design estratégico e tecnologia para transformar a presença digital da sua empresa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: ease.out, delay: 0.88 }}
            className="pointer-events-auto mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#projetos" magnetic>
              Explorar projetos
            </Button>
            <Button
              href={whatsapp('Olá, Empirium Labs! Gostaria de solicitar um orçamento para o meu site.')}
              external
              variant="ghost"
              icon={<WhatsAppIcon className="h-4 w-4 text-mint" />}
            >
              Solicitar orçamento
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs tracking-[0.25em] text-slate uppercase transition-colors hover:text-ink md:flex"
      >
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" /> Role para explorar
      </motion.a>
    </section>
  )
}
