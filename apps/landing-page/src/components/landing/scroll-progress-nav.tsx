import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

const NAV_ITEMS = [
  { label: 'W.', section: 'hero' },
  { label: 'C.', section: 'comparison' },
  { label: 'F.', section: 'features' },
  { label: 'M.', section: 'mind' },
  { label: 'P.', section: 'pricing' },
  { label: 'H.', section: 'footer' },
]

/**
 * Axiom-style fixed right-side scroll progress indicator.
 * Vertical dots with section labels, white connecting line
 * that fills based on scroll progress.
 */
export function ScrollProgressNav() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Track overall page scroll progress
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)

      // Update progress bar fill
      if (progressRef.current) {
        progressRef.current.style.height = `${progress * 100}%`
      }

      // Determine active section based on scroll position
      const sectionProgress = progress * (NAV_ITEMS.length - 1)
      setActiveIdx(Math.round(sectionProgress))
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-0 md:flex"
      data-cursor-hover
    >
      {/* Track line (background) */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
      {/* Track line (filled progress) */}
      <div className="absolute left-1/2 top-0 w-px -translate-x-1/2 overflow-hidden" style={{ height: '100%' }}>
        <div ref={progressRef} className="w-full bg-white/60 transition-[height] duration-100" style={{ height: 0 }} />
      </div>

      {NAV_ITEMS.map((item, i) => (
        <div
          key={item.section}
          className="relative flex items-center py-3"
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* Dot */}
          <div
            className="relative z-10 rounded-full border transition-all duration-300"
            style={{
              width: activeIdx === i ? 8 : 5,
              height: activeIdx === i ? 8 : 5,
              background: activeIdx === i ? '#F8F5EC' : 'transparent',
              borderColor: activeIdx === i ? '#F8F5EC' : 'rgba(248,245,236,0.3)',
            }}
          />

          {/* Label — appears on hover or when active */}
          <div
            className="absolute right-6 whitespace-nowrap rounded px-2 py-0.5 text-[11px] tracking-[2px] transition-all duration-200"
            style={{
              opacity: hoveredIdx === i || activeIdx === i ? 1 : 0,
              transform: hoveredIdx === i || activeIdx === i ? 'translateX(0)' : 'translateX(4px)',
              background: hoveredIdx === i ? 'rgba(248,245,236,0.1)' : 'transparent',
              color: '#F8F5EC',
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}
