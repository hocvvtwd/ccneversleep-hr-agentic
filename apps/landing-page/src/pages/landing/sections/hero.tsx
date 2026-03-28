import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const pixelWord = el.querySelector('[data-hero-pixel]')
    const serifWord = el.querySelector('[data-hero-serif]')
    const hr = el.querySelector('[data-hero-hr]')
    const desc = el.querySelector('[data-hero-desc]')

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 2.3 })
    tl.fromTo(pixelWord, { opacity: 0, y: 30, filter: 'blur(16px)', scale: 0.95 }, { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 1.4 })
      .fromTo(hr, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.8 }, '-=0.6')
      .fromTo(serifWord, { opacity: 0, y: 30, filter: 'blur(16px)', scale: 0.95 }, { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 1.4 }, '-=0.5')
      .fromTo(desc, { opacity: 0, y: 20, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '-=0.6')
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')
  }, [])

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Full-bleed looping video background */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/home_page_hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ objectPosition: 'center 60%', opacity: 0.2 }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-transparent to-background/80" />

      <div ref={containerRef} className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1
          data-hero-pixel
          className="font-mono text-[clamp(2rem,6vw,5rem)] leading-[1.1] text-accent"
          style={{ opacity: 0 }}
        >
          Tireless
        </h1>
        <hr
          data-hero-hr
          className="my-4 w-[min(50vw,400px)] border-accent/50 md:my-6"
          style={{ transform: 'scaleX(0)' }}
        />
        <h1
          data-hero-serif
          className="font-serif text-[clamp(3rem,10vw,9rem)] leading-[0.95] font-light italic text-accent"
          style={{ opacity: 0 }}
        >
          Precision
        </h1>
        <p
          data-hero-desc
          className="mt-8 max-w-md text-xs leading-relaxed tracking-[1px] text-text-secondary md:mt-12 md:text-sm"
          style={{ opacity: 0 }}
        >
          Shaping the future of HR and recruitment. Built to help you hire with clarity and act with intention
        </p>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[3px] text-muted">Scroll to begin</span>
          <div className="h-8 w-px bg-gradient-to-b from-muted to-transparent" />
        </div>
      </div>
    </section>
  )
}
