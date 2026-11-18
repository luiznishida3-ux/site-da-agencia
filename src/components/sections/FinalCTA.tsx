import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { whatsapp } from '../../lib/site'

export function FinalCTA() {
  return (
    <section id="contato" className="relative px-3 py-20 sm:px-5 sm:py-28">
      <div className="noise relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-violet/30 bg-surface px-6 py-24 text-center sm:px-12 sm:py-32">
        {/* orbit rings echo the hero object */}
        <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center" style={{ perspective: 900 }}>
          <div className="absolute h-[70vmin] w-[70vmin] rounded-full border border-violet/25" style={{ transform: 'rotateX(72deg)' }} />
          <div className="absolute h-[95vmin] w-[95vmin] rounded-full border border-mint/15" style={{ transform: 'rotateX(72deg) rotateY(14deg)' }} />
          <div className="absolute h-[40vmin] w-[40vmin] rounded-full bg-violet/30 blur-[100px]" />
        </div>
        <div
          aria-hidden
          className="text-outline pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 font-display text-[19vw] leading-none font-bold whitespace-nowrap select-none lg:text-[13rem]"
        >
          EMPIRIUM
        </div>

        <div className="relative">
          <Reveal>
            <span className="eyebrow">Vamos começar</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl leading-[1] font-bold text-balance sm:text-6xl lg:text-7xl">
              Seu próximo nível começa com uma <span className="text-gradient">presença digital melhor.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink/65">
              Vamos transformar a maneira como seus clientes enxergam seu negócio.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-10">
            <Button
              href={whatsapp('Olá, Empirium Labs! Quero começar o meu projeto.')}
              external
              magnetic
              icon={<WhatsAppIcon className="h-5 w-5" />}
              className="h-15 px-9 text-base"
            >
              Começar meu projeto
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
