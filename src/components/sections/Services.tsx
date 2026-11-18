import { ArrowUpRight, Building2, Code2, Rocket, ShoppingBag } from 'lucide-react'
import { Reveal, SectionHeading } from '../ui/Reveal'
import { TiltCard } from '../ui/TiltCard'
import { whatsapp } from '../../lib/site'

const services = [
  {
    icon: Building2,
    title: 'Sites institucionais',
    text: 'A sede digital da sua empresa: quem você é, o que faz e por que confiar em você, com visual profissional e contato a um clique.',
    tag: 'Autoridade',
  },
  {
    icon: Rocket,
    title: 'Landing Pages',
    text: 'Páginas focadas em uma única ação: gerar contatos, vender um serviço ou lançar uma oferta, com estrutura pensada para conversão.',
    tag: 'Conversão',
  },
  {
    icon: ShoppingBag,
    title: 'Sites comerciais',
    text: 'Vitrine online para apresentar produtos e serviços com clareza, destacar diferenciais e levar o cliente direto ao atendimento.',
    tag: 'Vendas',
  },
  {
    icon: Code2,
    title: 'Desenvolvimento personalizado',
    text: 'Necessidade fora do padrão? Desenhamos e desenvolvemos a solução sob medida para o fluxo e os objetivos do seu negócio.',
    tag: 'Sob medida',
  },
]

export function Services() {
  return (
    <section id="servicos" className="relative py-28 sm:py-36">
      <div aria-hidden className="absolute top-1/3 left-1/2 -z-10 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full bg-violet/10 blur-[160px]" />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Serviços"
            title={
              <>
                O site certo para <span className="text-gradient">cada objetivo.</span>
              </>
            }
          />
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-ink/60">
              Do primeiro site à solução personalizada: escolha o formato e nós cuidamos de design, desenvolvimento e
              publicação.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07} className="h-full">
              <TiltCard>
                <div className="flex h-full flex-col p-7" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="flex items-start justify-between transition-transform duration-300 ease-out group-hover:[transform:translateZ(40px)]">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet to-violet/40 text-navy shadow-[0_12px_30px_-8px_rgb(139_124_255/0.8)] transition-transform duration-300 ease-out group-hover:-translate-y-1">
                      <s.icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <span className="rounded-full border border-mint/30 px-3 py-1 text-[11px] font-medium tracking-wider text-mint uppercase">
                      {s.tag}
                    </span>
                  </div>
                  <div className="mt-10 flex-1 transition-transform duration-300 ease-out group-hover:[transform:translateZ(24px)]">
                    <span className="font-display text-sm text-slate">0{i + 1}</span>
                    <h3 className="mt-1 text-2xl leading-tight font-semibold">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{s.text}</p>
                  </div>
                  <a
                    href={whatsapp(`Olá, Empirium Labs! Tenho interesse em: ${s.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2.5 font-display text-sm font-semibold transition-[background-color,color,border-color] duration-200 ease-[ease] hover:border-ink hover:bg-ink hover:text-navy active:scale-[0.97]"
                  >
                    Quero este
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
