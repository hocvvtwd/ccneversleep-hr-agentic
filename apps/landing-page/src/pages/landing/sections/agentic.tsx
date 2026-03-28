import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const FEATURES = [
  {
    id: 'f1',
    label: '01 — INTUITIVE AUTOMATION',
    title: 'Intuitive Automation',
    desc: 'Handles repetitive HR tasks without being told twice. Learns your team rhythm and acts autonomously.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
        <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="1.5" />
        <line x1="32" y1="4" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" />
        <line x1="32" y1="48" x2="32" y2="60" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="32" x2="16" y2="32" stroke="currentColor" strokeWidth="1.5" />
        <line x1="48" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'f2',
    label: '02 — CONTEXTUAL RECRUITMENT',
    title: 'Contextual Recruitment',
    desc: 'Reads full candidate profiles before writing a single word. Context, trajectory, fit — not keywords.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
        <rect x="8" y="8" width="48" height="48" stroke="currentColor" strokeWidth="1.5" />
        <rect x="18" y="18" width="28" height="28" stroke="currentColor" strokeWidth="1.5" />
        <rect x="28" y="28" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'f3',
    label: '03 — SEAMLESS SEARCH',
    title: 'Seamless Search',
    desc: 'From requirement to ranked candidates in minutes. Cross-references ERP data and LinkedIn signals.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
        <polygon points="32,6 58,54 6,54" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="32,20 46,44 18,44" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="36" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'f4',
    label: '04 — ADAPTIVE MESSAGING',
    title: 'Adaptive Messaging',
    desc: 'Crafts personalized outreach that sounds human. Adjusts tone per channel, per candidate, per role.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
        <circle cx="22" cy="32" r="14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="42" cy="32" r="14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'f5',
    label: '05 — DEEP ANALYTICS',
    title: 'Deep Analytics',
    desc: 'Surfaces patterns across your entire hiring pipeline. Know what works before results confirm it.',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={16 + col * 16}
              cy={16 + row * 16}
              r="4"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          )),
        )}
      </svg>
    ),
  },
  {
    id: 'f6',
    label: '06 — BEYOND MATCHING',
    title: 'Beyond Matching',
    desc: "Looks past the resume to culture, growth potential, and team dynamics. Hire who fits, not who fits the JD.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
        <rect
          x="16"
          y="16"
          width="32"
          height="32"
          transform="rotate(45 32 32)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="24"
          y="24"
          width="16"
          height="16"
          transform="rotate(45 32 32)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
]

export function AgenticSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const headerRef = useScrollReveal({ blur: 12, y: 30 })

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollContainerRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' })
  }

  return (
    <section id="features" className="px-6 py-20 md:px-12 md:py-32">
      {/* Header */}
      <div ref={headerRef} className="mb-14 flex items-end justify-between gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[4px] text-accent">
            Platform Capabilities
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-text md:text-5xl">
            Six ways NeverSleep
          </h2>
          <h2 className="text-3xl font-bold leading-tight text-accent md:text-5xl">
            works for you.
          </h2>
        </div>

        <div className="hidden shrink-0 gap-2 md:flex">
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
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollContainerRef}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:-mx-12 md:px-12"
        style={{ scrollbarWidth: 'none' }}
      >
        {FEATURES.map((feat) => (
          <div key={feat.id} className="corner-marks w-[300px] shrink-0 snap-start md:w-[340px]">
            <div className="blueprint-card flex h-full flex-col p-0">
              {/* Chrome bar */}
              <div className="flex items-center gap-2 border-b border-background/20 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-background/40" />
                <span className="h-2 w-2 rounded-full bg-background/40" />
                <span className="h-2 w-2 rounded-full bg-background/40" />
                <div className="ml-2 h-px flex-1 bg-background/20" />
              </div>

              {/* Icon area */}
              <div className="flex items-center justify-center bg-background/10 py-10 text-background">
                {feat.icon}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[3px] text-background/50">
                  {feat.label}
                </p>
                <h3 className="text-base font-bold uppercase tracking-wide text-background">
                  {feat.title}
                </h3>
                <p className="text-xs leading-relaxed text-background/70">
                  {feat.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
