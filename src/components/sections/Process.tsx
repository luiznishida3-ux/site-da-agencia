import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { Compass, Layers, Code2, Send } from 'lucide-react'
import { Reveal, SectionHeading } from '../ui/Reveal'

const steps = [
  {
    icon: Compass,
    title: 'Descoberta',
    text: 'Entendemos seu negócio, seu público e seus objetivos. É aqui que definimos o que o site precisa resolver.',
  },
  {
    icon: Layers,
    title: 'Planejamento',
    text: 'Estrutura de páginas, conteúdo e direção visual. Você aprova o caminho antes de qualquer linha de código.',
  },
  {
    icon: Code2,
    title: 'Desenvolvimento',
    text: 'Design e código ganham vida: layout responsivo, performance e cada detalhe de interação ajustado.',
  },
  {
    icon: Send,
    title: 'Publicação',
    text: 'Testes finais, configuração do domínio e site no ar, pronto para receber seus clientes.',
  },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="processo" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Processo"
          align="center"
          title={
            <>
              Da ideia à <span className="text-gradient">presença digital.</span>
            </>
          }
          text="Um processo claro, em quatro etapas, para você saber exatamente o que acontece em cada momento do projeto."
        />

        <div ref={ref} className="relative mt-20">
          {/* track + progress: horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute top-7 bottom-7 left-7 w-px bg-line lg:top-7 lg:right-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:h-px lg:w-auto" />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-7 bottom-7 left-7 w-px origin-top bg-gradient-to-b from-violet to-mint lg:hidden"
          />
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px origin-left bg-gradient-to-r from-violet to-mint shadow-[0_0_12px_rgb(139_124_255/0.8)] lg:block"
          />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.1} className="relative flex gap-6 lg:flex-col lg:items-center lg:text-center">
                  <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-violet/40 bg-surface text-violet shadow-[0_0_0_6px_var(--color-navy),0_0_30px_rgb(139_124_255/0.3)]">
                    <s.icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="font-display text-sm font-semibold text-mint">Etapa 0{i + 1}</span>
                    <h3 className="mt-1 text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink/60 lg:px-2">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
