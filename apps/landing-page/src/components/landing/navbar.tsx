import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md' : ''
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        {/* Logo */}
        <span className="font-pixel text-xs tracking-[3px] text-accent">NEVERSLEEP</span>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <span className="hidden text-[10px] tracking-[3px] text-muted md:block">EXPLORE</span>
          <button
            type="button"
            aria-label="Explore"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-light transition-colors hover:border-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </button>
        </div>
      </div>
    </nav>
  )
}
