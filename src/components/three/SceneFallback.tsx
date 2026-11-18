/** Static CSS composition: used while the 3D chunk loads and when WebGL is unavailable. */
export function SceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      <div className="relative aspect-square w-[min(68vw,420px)]" style={{ perspective: 900 }}>
        <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_32%_28%,rgb(244_245_250/0.55),rgb(139_124_255/0.35)_35%,rgb(23_30_45/0.6)_70%)] shadow-[inset_0_0_60px_rgb(139_124_255/0.5),0_0_120px_rgb(139_124_255/0.35)]" />
        <div className="absolute inset-[36%] rotate-45 rounded-lg bg-violet/70 blur-[2px]" />
        <div
          className="absolute inset-[6%] rounded-full border-2 border-ink/30"
          style={{ transform: 'rotateX(70deg) rotateY(12deg)' }}
        />
        <div
          className="absolute inset-0 rounded-full border border-violet/60"
          style={{ transform: 'rotateX(75deg) rotateY(-28deg)' }}
        />
        <div
          className="absolute -inset-[6%] rounded-full border border-mint/40"
          style={{ transform: 'rotateX(30deg) rotateY(50deg)' }}
        />
      </div>
    </div>
  )
}
