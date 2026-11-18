import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { MousePointerClick, PenTool, Cpu } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { ease } from '../../lib/site'

const pillars = [
  {
    icon: PenTool,
    title: 'Design estratégico',
    text: 'Cada layout nasce do posicionamento do seu negócio: identidade, hierarquia e conteúdo pensados para gerar confiança no primeiro olhar.',
  },
  {
    icon: Cpu,
    title: 'Tecnologia',
    text: 'Código moderno, carregamento rápido e estrutura sólida. Seu site funciona bem em qualquer tela e está pronto para crescer.',
  },
  {
    icon: MousePointerClick,
    title: 'Experiência do usuário',
    text: 'Navegação clara e caminhos diretos até o contato. O visitante entende o que você faz e sabe exatamente como falar com você.',
  },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bigX = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['8%', '-18%'])

  return (
    <section ref={ref} id="sobre" className="relative overflow-hidden py-28 sm:py-36">
      {/* oversized kinetic type */}
      <motion.div
        aria-hidden
        style={{ x: bigX }}
        className="text-outline pointer-events-none absolute top-10 left-0 font-display text-[22vw] leading-none font-bold whitespace-nowrap select-none"
      >
        DIGITAL LAB
      </motion.div>

      <div className="container-x relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-3">
                <span className="h-px w-8 bg-mint" />
                Sobre a Empirium Labs
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[2.6rem] leading-[0.98] font-bold sm:text-6xl lg:text-7xl">
                Não criamos apenas sites. <span className="text-gradient">Criamos experiências digitais.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="text-base leading-relaxed text-ink/65 sm:text-lg">
              A Empirium Labs é um estúdio digital focado em uma missão: dar a pequenos negócios, empreendedores e
              empresas uma presença profissional na internet à altura do que eles entregam. Unimos design, tecnologia
              e estratégia para que o seu site trabalhe por você todos os dias.
            </p>
          </Reveal>
        </div>

        {/* pillars connected by a digital line */}
        <div className="relative mt-20">
          <svg
            className="absolute top-14 left-0 hidden h-4 w-full md:block"
            viewBox="0 0 1000 16"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.path
              d="M0 8 H1000"
              stroke="url(#about-line)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: ease.inOut }}
            />
            <defs>
              <linearGradient id="about-line" x1="0" x2="1">
                <stop offset="0" stopColor="#8B7CFF" stopOpacity="0" />
                <stop offset="0.5" stopColor="#8B7CFF" />
                <stop offset="1" stopColor="#35D6C2" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="h-full">
                <article className="group relative h-full rounded-3xl border border-line bg-gradient-to-b from-surface to-navy p-7 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] transition-[translate,border-color] duration-300 ease-[ease] hover:-translate-y-1 hover:border-violet/35">
                  <div className="relative mb-8 grid h-14 w-14 place-items-center rounded-2xl border border-violet/30 bg-violet/10 text-violet shadow-[0_0_30px_rgb(139_124_255/0.25)]">
                    <p.icon className="h-6 w-6" strokeWidth={1.8} />
                    <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-navy bg-mint" />
                  </div>
                  <span className="font-display text-sm text-slate">0{i + 1}</span>
                  <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/60">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
