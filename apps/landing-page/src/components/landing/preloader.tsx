import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const overlay = overlayRef.current
    const counter = counterRef.current
    const tagline = taglineRef.current
    if (!overlay || !counter || !tagline) return

    document.body.style.overflow = 'hidden'

    const obj = { value: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        setVisible(false)
      },
    })

    // Tagline fade in
    tl.fromTo(
      tagline,
      { opacity: 0, y: 10 },
      { opacity: 0.5, y: 0, duration: 0.4, ease: 'power2.out' },
    )

    // Count 0 → 100
    tl.to(
      obj,
      {
        value: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          counter.textContent = `${String(Math.round(obj.value)).padStart(3, '0')}`
        },
      },
      '-=0.2',
    )

    // Exit: blur + scale + slide up
    tl.to(overlay, {
      opacity: 0,
      scale: 0.96,
      filter: 'blur(24px)',
      y: -20,
      duration: 0.5,
      ease: 'power3.inOut',
    })
  }, [])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <p
        ref={taglineRef}
        className="text-[10px] font-medium uppercase tracking-[6px] text-muted"
        style={{ opacity: 0 }}
      >
        NeverSleep is forming. Be ready to align.
      </p>
      <span
        ref={counterRef}
        className="mt-6 font-mono text-7xl font-bold tabular-nums text-accent md:text-9xl"
      >
        000
      </span>
      <div className="mt-8 h-px w-16 bg-border-light" />
    </div>
  )
}
