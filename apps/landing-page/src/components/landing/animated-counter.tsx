import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  target: number
  suffix?: string
  className?: string
}

/** Counts 0 → target on scroll. GSAP easeOut, 1.5s */
export function AnimatedCounter({ target, suffix = '', className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || started) return

    const obj = { value: 0 }

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (started) return
        setStarted(true)
        gsap.to(obj, {
          value: target,
          duration: 1.5,
          ease: 'expo.out',
          onUpdate: () => {
            el.textContent = `${Math.round(obj.value)}${suffix}`
          },
        })
      },
    })
  }, [target, suffix, started])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
