import { Palette, Smartphone, MousePointerClick, Gauge, Search, MessageCircle } from 'lucide-react'
import { Reveal, SectionHeading } from '../ui/Reveal'

const items = [
  { icon: Palette, title: 'Design personalizado', text: 'Nada de modelo pronto. Visual criado para a identidade do seu negócio.' },
  { icon: Smartphone, title: 'Responsividade', text: 'Experiência impecável no celular, tablet e computador.' },
  { icon: MousePointerClick, title: 'Navegação intuitiva', text: 'Informação organizada para o cliente encontrar o que procura sem esforço.' },
  { icon: Gauge, title: 'Performance', text: 'Páginas leves e otimizadas, que carregam rápido mesmo em conexões lentas.' },
  { icon: Search, title: 'Estrutura SEO', text: 'Base técnica preparada para o Google entender e indexar o seu site.' },
  { icon: MessageCircle, title: 'Facilidade de contato', text: 'WhatsApp, telefone e redes a um toque, em todas as páginas.' },
]

/** Pure CSS 3D cube: supporting visual, no extra WebGL context. */
function Cube() {
  const faces = [
    'rotateY(0deg)',
    'rotateY(90deg)',
    'rotateY(180deg)',
    'rotateY(-90deg)',
    'rotateX(90deg)',
    'rotateX(-90deg)',
  ]
  return (
    <div className="relative h-40 w-40 sm:h-48 sm:w-48" style={{ perspective: 800 }} aria-hidden>
      <div className="absolute inset-0 animate-cube" style={{ transformStyle: 'preserve-3d' }}>
        {faces.map((t, i) => (
          <div
            key={t}
            className={`absolute inset-0 rounded-2xl border backdrop-blur-[2px] ${
              i % 2 ? 'border-mint/40 bg-mint/[0.06]' : 'border-violet/50 bg-violet/[0.08]'
            }`}
            style={{ transform: `${t} translateZ(var(--half))` }}
          />
        ))}
        <div className="absolute inset-[30%] rounded-full bg-violet/60 blur-xl" />
      </div>
    </div>
  )
}

export function Differentials() {
  return (
    <section id="diferenciais" className="relative overflow-hidden py-28 sm:py-36">
      <div className="grid-bg absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            eyebrow="Diferenciais"
            title={
              <>
                Tecnologia e design <span className="text-gradient">trabalhando pelo seu negócio.</span>
              </>
            }
          />
          <Reveal className="mx-auto lg:mr-16 [--half:5rem] sm:[--half:6rem]">
            <Cube />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.06} className="h-full">
              <div className="group h-full bg-navy p-8 transition-colors duration-200 ease-[ease] hover:bg-surface">
                <it.icon
                  className="h-7 w-7 text-mint transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
                  strokeWidth={1.7}
                />
                <h3 className="mt-6 text-xl font-semibold">{it.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/60">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
