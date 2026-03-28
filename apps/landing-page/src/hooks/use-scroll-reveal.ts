import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  /** Blur start value (px). Default 16 */
  blur?: number
  /** Scale start value. Default 0.98 */
  scale?: number
  /** translateY start (px). Default 20 */
  y?: number
  /** translateX start (px). Default 0 */
  x?: number
  /** Duration (s). Default 0.8 */
  duration?: number
  /** Stagger between children (s). Default 0 */
  stagger?: number
  /** ScrollTrigger start. Default 'top 85%' */
  start?: string
}

/**
 * Axiom-style scroll reveal: blur-fade + scale + translate.
 * Uses GSAP ScrollTrigger. Attach ref to container.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null)
  const {
    blur = 16,
    scale = 0.98,
    y = 20,
    x = 0,
    duration = 0.8,
    stagger = 0,
    start = 'top 85%',
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = stagger ? Array.from(el.children) : [el]

    gsap.fromTo(
      targets,
      {
        opacity: 0,
        scale,
        y,
        x,
        filter: `blur(${blur}px)`,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        filter: 'blur(0px)',
        duration,
        stagger: stagger || 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [blur, scale, y, x, duration, stagger, start])

  return ref
}
