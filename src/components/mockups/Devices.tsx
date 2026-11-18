import type { Concept } from './concepts'

/**
 * A believable site UI built from divs, so no images need to download.
 * Every size is in cqw (container width units), so the same UI scales to any frame:
 * laptop, phone, or the large preview modal.
 */
export function ConceptScreen({ c, mobile = false }: { c: Concept; mobile?: boolean }) {
  const t = c.theme
  const W = mobile ? 180 : 560 // design width in px
  const u = (n: number) => `${((n * 100) / W).toFixed(3)}cqw`

  return (
    <div className="h-full w-full overflow-hidden" style={{ containerType: 'inline-size', background: t.bg }}>
      <div className="text-left" style={{ color: t.fg, fontFamily: 'Inter, sans-serif' }}>
        {/* nav */}
        <div className="flex items-center justify-between" style={{ padding: mobile ? `${u(22)} ${u(12)} ${u(10)}` : `${u(12)} ${u(22)}` }}>
          <span className="font-display font-bold" style={{ fontSize: u(mobile ? 11 : 13), letterSpacing: '0.04em' }}>
            {c.name}
          </span>
          {mobile ? (
            <span className="flex flex-col" style={{ gap: u(3) }}>
              <i className="block" style={{ height: u(1.5), width: u(12), background: t.fg }} />
              <i className="block" style={{ height: u(1.5), width: u(12), background: t.fg }} />
            </span>
          ) : (
            <span className="flex items-center" style={{ gap: u(16), fontSize: u(9), color: t.muted }}>
              {c.nav.map((n) => (
                <span key={n}>{n}</span>
              ))}
              <span className="rounded-full font-semibold" style={{ background: t.accent, color: t.bg, padding: `${u(4)} ${u(12)}` }}>
                {c.cta}
              </span>
            </span>
          )}
        </div>

        {/* hero */}
        <div
          className="relative"
          style={{ background: t.hero, margin: `0 ${u(mobile ? 8 : 14)}`, borderRadius: u(mobile ? 10 : 12), padding: mobile ? `${u(18)} ${u(12)}` : `${u(30)} ${u(24)}`, minHeight: u(mobile ? 130 : 150) }}
        >
          <div style={{ fontSize: u(7), color: t.accent, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>{c.category}</div>
          <div className="font-display font-bold" style={{ fontSize: u(mobile ? 16 : 22), lineHeight: 1.05, maxWidth: mobile ? '100%' : '60%', marginTop: u(6) }}>
            {c.tagline}
          </div>
          <span
            className="inline-block rounded-full font-semibold"
            style={{ background: t.accent, color: t.bg, fontSize: u(mobile ? 8 : 8.5), padding: `${u(6)} ${u(12)}`, marginTop: u(12) }}
          >
            {c.cta} →
          </span>
          {!mobile && (
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ right: u(24), width: u(80), height: u(80), borderRadius: u(16), background: t.accent, opacity: 0.85, boxShadow: `0 ${u(20)} ${u(40)} -${u(10)} ${t.accent}` }}
            />
          )}
        </div>

        {/* cards */}
        <div className={`grid ${mobile ? 'grid-cols-1' : 'grid-cols-3'}`} style={{ gap: u(8), padding: mobile ? `${u(10)} ${u(8)}` : `${u(12)} ${u(14)}` }}>
          {c.items.map((it) => (
            <div key={it} style={{ background: t.card, padding: `${u(mobile ? 8 : 10)} ${u(mobile ? 10 : 12)}`, border: `1px solid ${t.muted}22`, borderRadius: u(8) }}>
              {!mobile && <div style={{ height: u(26), marginBottom: u(8), borderRadius: u(4), background: `${t.accent}22` }} />}
              <div style={{ fontSize: u(9), fontWeight: 600 }}>{it}</div>
              <div style={{ height: u(4), width: '66%', marginTop: u(4), borderRadius: u(4), background: `${t.muted}44` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Laptop({ c }: { c: Concept }) {
  return (
    <div className="relative w-full">
      <div className="rounded-t-[14px] border border-white/10 bg-[#0b0e16] p-[1.6%] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[6px]">
          <ConceptScreen c={c} />
          {/* screen glare */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.08),transparent_40%)]" />
        </div>
      </div>
      <div className="relative mx-[-6%] h-3 rounded-b-xl bg-gradient-to-b from-[#c9ccd6] to-[#7c8090] sm:h-4">
        <div className="absolute top-0 left-1/2 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-[#9a9eac]" />
      </div>
    </div>
  )
}

export function Phone({ c }: { c: Concept }) {
  return (
    <div className="rounded-[18%/8.5%] border border-white/15 bg-[#0b0e16] p-[4%] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[15%/7%]">
        <ConceptScreen c={c} mobile />
        <div className="absolute top-[1.5%] left-1/2 h-[3%] w-[36%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  )
}
