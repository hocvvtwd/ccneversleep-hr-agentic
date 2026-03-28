import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function ComparisonSection() {
  const leftRef = useScrollReveal({ blur: 12, y: 20, duration: 0.8 })
  const rightRef = useScrollReveal({ blur: 12, y: 20, duration: 0.8, start: 'top 80%' })

  return (
    <section className="px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-2">
        <div ref={leftRef}>
          <p className="text-xs tracking-[3px] text-muted">You're awakening</p>
        </div>
        <div ref={rightRef}>
          <p className="text-sm leading-relaxed tracking-[1px] text-text-secondary md:text-base">
            NeverSleep serves as your intelligent HR companion, designed to observe, comprehend, and respond with remarkable accuracy. It goes beyond merely providing answers: it grows and adapts alongside you, enhancing your recruitment and understanding.
          </p>
        </div>
      </div>
      {/* Axiom decorative rule with dot-grid endpoints */}
      <div className="axiom-rule mx-auto mt-16 max-w-[1200px]">
        <DotGrid />
        <div className="rule-line" />
        <DotGrid />
      </div>
    </section>
  )
}

function DotGrid() {
  return (
    <div className="dot-grid">
      {Array.from({ length: 9 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static decorative grid
        <span key={i} />
      ))}
    </div>
  )
}
