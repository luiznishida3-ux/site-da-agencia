const words = [
  'Sites que impõem presença',
  'Design que vende',
  'Tecnologia que acelera',
  'Seu negócio em outro nível',
  'Presença digital extraordinária',
]

/** Brand ticker: two tilted bands crossing, pure CSS transform animation. */
export function Marquee() {
  const row = (outline: boolean) => (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span
            className={`px-6 font-display text-3xl font-bold whitespace-nowrap uppercase sm:text-5xl ${
              outline ? 'text-outline' : ''
            }`}
          >
            {w}
          </span>
          <svg viewBox="0 0 24 24" className={`h-6 w-6 shrink-0 sm:h-8 sm:w-8 ${outline ? 'text-violet' : 'text-navy'}`} aria-hidden>
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  )

  return (
    <div className="relative z-10 -my-6 overflow-hidden py-10" aria-hidden>
      <div className="-rotate-2 border-y border-violet/40 bg-violet py-3 text-navy shadow-[0_0_60px_rgb(139_124_255/0.35)] sm:py-4">
        <div className="flex w-max animate-marquee" aria-hidden>
          {row(false)}
          {row(false)}
        </div>
      </div>
      <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 rotate-2 border-y border-line bg-surface py-3 sm:py-4">
        <div className="flex w-max animate-marquee [animation-direction:reverse]" aria-hidden>
          {row(true)}
          {row(true)}
        </div>
      </div>
    </div>
  )
}
