import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

/**
 * Axiom-style custom trailing cursor.
 * A yellow dot follows the mouse with a slight GSAP-driven delay,
 * and expands when hovering over interactive elements ([data-cursor-hover]).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    // Track raw mouse position
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    // Smooth follow via GSAP ticker (~60fps)
    const follow = () => {
      gsap.to(dot, {
        x: pos.current.x,
        y: pos.current.y,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
    gsap.ticker.add(follow)

    // Expand on hover over [data-cursor-hover] elements
    const onEnter = () => {
      gsap.to(dot, { scale: 2.2, opacity: 0.85, duration: 0.25, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' })
    }

    // Use MutationObserver to also catch dynamically added elements
    const attach = () => {
      document.querySelectorAll('[data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(follow)
      observer.disconnect()
      document.querySelectorAll('[data-cursor-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: '#F0C46B',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
      }}
    />
  )
}
