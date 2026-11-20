import { Logo } from '../ui/Logo'
import { InstagramIcon, WhatsAppIcon } from '../ui/BrandIcons'
import { nav, site, whatsapp } from '../../lib/site'

export function Footer() {
  const contacts = [
    { icon: <InstagramIcon className="h-4 w-4" />, label: site.instagramHandle, href: site.instagram },
    { icon: <WhatsAppIcon className="h-4 w-4" />, label: site.whatsappDisplay, href: whatsapp() },
  ]

  return (
    <footer className="border-t border-line pt-16 pb-24 sm:pb-10">
      <div className="container-x grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm leading-relaxed text-ink/55">
            Estúdio digital que cria sites profissionais para pequenos negócios, empreendedores e empresas.{' '}
            {site.slogan}
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h3 className="font-display text-sm font-semibold tracking-[0.2em] text-slate uppercase">Navegação</h3>
          <ul className="mt-5 space-y-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-ink/70 transition-colors duration-150 hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-[0.2em] text-slate uppercase">Contato</h3>
          <ul className="mt-5 space-y-3">
            {contacts.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-ink/70 transition-colors duration-150 hover:text-mint"
                >
                  {c.icon}
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x mt-14 flex flex-col justify-between gap-3 border-t border-line pt-6 text-sm text-slate sm:flex-row">
        <span>© {new Date().getFullYear()} Empirium Labs. Todos os direitos reservados.</span>
        <a href="#topo" className="transition-colors hover:text-ink">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  )
}
