import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const AGENTS = [
  {
    id: 'a1',
    mono: 'B',
    label: 'Automation',
    title: 'Birthday Agent',
    desc: 'An empathetic mind that never forgets. Tracks employee birthdays, drafts warm personal messages, and dispatches them via calendar integrations and Telegram — without being prompted.',
    tags: ['Calendar', 'Content', 'Telegram'],
  },
  {
    id: 'a2',
    mono: 'R',
    label: 'Content',
    title: 'Recruitment Agent',
    desc: 'Drives multi-channel outreach with precision. Optimizes job descriptions, crafts LinkedIn posts, and sequences candidate communications across every relevant platform.',
    tags: ['JD Optimization', 'Multi-Channel', 'LinkedIn'],
  },
  {
    id: 'a3',
    mono: 'S',
    label: 'Intelligence',
    title: 'Search Agent',
    desc: 'Transforms a hiring requirement into a ranked candidate list. Cross-references ERP data with LinkedIn signals to surface the most contextually aligned profiles.',
    tags: ['ERP', 'LinkedIn', 'Ranking'],
  },
]

export function PricingSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const headerRef = useScrollReveal({ blur: 12, y: 30 })

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollContainerRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' })
  }

  return (
    <section id="pricing" className="px-6 py-20 md:px-12 md:py-32">
      {/* Header — split layout */}
      <div ref={headerRef} className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[4px] text-muted">The System</p>
          <h2 className="font-serif text-5xl italic leading-none text-text md:text-7xl">
            Intelligence
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[4px] text-muted">Model</p>
        </div>

        <div className="max-w-sm">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-accent">Your Tools, Enhanced</p>
          <p className="text-sm leading-relaxed text-text-secondary">
            Three specialized agents, each with a distinct cognitive role. Together they cover the
            full arc of HR — from retention to recruitment to intelligence.
          </p>
        </div>
      </div>

      {/* Agent cards — horizontal scroll */}
      <div className="mb-6 flex justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="border border-border p-3 text-muted transition-all duration-200 hover:border-accent hover:text-accent"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="border border-border p-3 text-muted transition-all duration-200 hover:border-accent hover:text-accent"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:-mx-12 md:px-12"
        style={{ scrollbarWidth: 'none' }}
      >
        {AGENTS.map((agent) => (
          <div
            key={agent.id}
            className="corner-marks w-[320px] shrink-0 snap-start md:w-[380px]"
          >
            <div className="blueprint-card flex h-full flex-col p-0">
              {/* Chrome bar */}
              <div className="flex items-center gap-2 border-b border-background/20 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-background/40" />
                <span className="h-2 w-2 rounded-full bg-background/40" />
                <span className="h-2 w-2 rounded-full bg-background/40" />
                <div className="ml-2 h-px flex-1 bg-background/20" />
              </div>

              {/* Mono letter visual */}
              <div className="flex items-center justify-center bg-background/10 py-14">
                <span
                  className="font-mono font-bold text-background/20 select-none"
                  style={{ fontSize: 'clamp(5rem, 12vw, 8rem)', lineHeight: 1 }}
                >
                  {agent.mono}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[3px] text-background/50">
                    {agent.label}
                  </p>
                  <h3 className="mt-1 text-lg font-bold uppercase tracking-wide text-background">
                    {agent.title}
                  </h3>
                </div>

                <p className="text-xs leading-relaxed text-background/70">{agent.desc}</p>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2">
                  {agent.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-background/20 px-2 py-1 text-[10px] uppercase tracking-[2px] text-background/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
