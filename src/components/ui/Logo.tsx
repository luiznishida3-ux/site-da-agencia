export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="39" height="39" rx="10" fill="#171E2D" stroke="rgb(244 245 250 / 0.12)" />
      {/* E: spine + two arms */}
      <path d="M10 9h15v4.5H14.5v4.75H23v4.5h-8.5V31H10z" fill="#F4F5FA" />
      {/* L: violet stem + shared baseline */}
      <path d="M27 9h4.5v17.5H27z" fill="#8B7CFF" />
      <path d="M14.5 26.5H31.5V31H14.5z" fill="#8B7CFF" />
      {/* connection node */}
      <circle cx="29.25" cy="9" r="2.6" fill="#35D6C2" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-[15px] leading-none font-bold tracking-[0.14em]">
        EMPIRIUM<span className="text-violet"> LABS</span>
      </span>
    </span>
  )
}
