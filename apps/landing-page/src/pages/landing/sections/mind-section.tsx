import { useState } from 'react'

const CAPABILITIES = [
  {
    word: 'Talent Engine',
    desc: 'Candidate-Driven Long-Term Intelligence',
  },
  {
    word: 'Pattern Core',
    desc: 'Your hiring signals, never lost',
  },
  {
    word: 'Adaptive Reach',
    desc: 'Responsive Multi-Channel Outreach Layer',
  },
  {
    word: 'Context Lattice',
    desc: 'Interlinked Role-Candidate Awareness Matrix',
  },
  {
    word: 'Memory Sphere',
    desc: 'Multi-Dimensional Recruitment Archive',
  },
]

export function MindSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <section className="bg-background-deep px-6 py-20 md:px-12 md:py-32">
      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-accent">
          System Architecture
        </p>
        <h2 className="mt-4 text-3xl font-bold text-text md:text-5xl">
          Inside the mind of NeverSleep
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
          Five interlocked cognitive layers that process, remember, and act on every hiring signal
          your team generates.
        </p>
      </div>

      {/* Hover prompt */}
      <p className="mb-8 text-center text-xs uppercase tracking-[4px] text-muted">
        — Hover on words —
      </p>

      {/* Words */}
      <div className="flex flex-col">
        {CAPABILITIES.map((cap, i) => (
          <div
            key={cap.word}
            className="group border-t border-border/40 py-2"
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <div className="flex cursor-default items-baseline gap-4">
              {/* Unicode corner bracket on active */}
              {activeIdx === i && (
                <span className="font-mono text-sm text-accent/60 select-none">⌐</span>
              )}
              <span
                className="font-sans font-bold text-accent transition-all duration-300"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 5rem)',
                  opacity: activeIdx === null || activeIdx === i ? 1 : 0.15,
                  letterSpacing: '-0.01em',
                }}
              >
                {cap.word}
              </span>
              {activeIdx === i && (
                <span className="font-mono text-sm text-accent/60 select-none">¬</span>
              )}
            </div>

            {/* Description — max-height animation */}
            <div
              className="overflow-hidden transition-all duration-500"
              style={{
                maxHeight: activeIdx === i ? '80px' : '0px',
                opacity: activeIdx === i ? 1 : 0,
              }}
            >
              <p className="pb-3 pl-1 text-xs uppercase tracking-[3px] text-text-secondary md:text-sm">
                {cap.desc}
              </p>
            </div>
          </div>
        ))}
        <div className="border-t border-border/40" />
      </div>
    </section>
  )
}
