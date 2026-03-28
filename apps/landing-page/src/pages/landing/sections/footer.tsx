export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Full-bleed landscape bg */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-3d.webp"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        {/* Gradient overlay — heavy dark veil so text reads cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-deep via-background-deep/90 to-background-deep/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-10 pt-24 md:px-12 md:pt-40">
        {/* Large split typography */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
          <span
            className="font-mono text-[clamp(3rem,10vw,8rem)] leading-none text-accent"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            Echoed
          </span>

          {/* Horizontal rule — hidden on mobile */}
          <div className="hidden flex-1 mx-8 h-px bg-accent/30 md:block" />

          <span
            className="font-serif text-[clamp(3rem,10vw,8rem)] italic leading-none text-text"
          >
            Truth
          </span>
        </div>

        {/* Dot-grid decorative rule */}
        <div className="axiom-rule mt-10">
          <div className="dot-grid">
            {Array.from({ length: 9 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: decorative only
              <span key={i} />
            ))}
          </div>
          <div className="rule-line" />
          <div className="dot-grid">
            {Array.from({ length: 9 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: decorative only
              <span key={i} />
            ))}
          </div>
        </div>

        {/* 3-column credits bar */}
        <div className="mt-8 grid grid-cols-1 gap-4 border-t border-border/40 pt-8 text-center text-[10px] uppercase tracking-[2px] text-muted md:grid-cols-3 md:text-left">
          <span>Built with React, GSAP &amp; purpose</span>
          <span className="md:text-center">Crafted with intention &amp; curiosity</span>
          <span className="md:text-right">
            &copy; 2026 &middot; NeverSleep &middot; HR Agentic AI
          </span>
        </div>
      </div>
    </footer>
  )
}
