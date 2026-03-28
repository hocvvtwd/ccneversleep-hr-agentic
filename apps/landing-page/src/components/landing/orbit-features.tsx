import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BarChart3, Gift, Link2, Search, User } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    id: 'birthday',
    eyebrow: 'Automation',
    title: 'Intuition Aware',
    desc: "HR Assistant doesn't just respond — it anticipates. Checks your calendar, generates personalized cards, sends via Telegram after approval.",
    Icon: Gift,
  },
  {
    id: 'linkedin',
    eyebrow: 'Content',
    title: 'Contextual Awareness',
    desc: 'The more you use it, the sharper it becomes. Paste a JD, AI writes 3 optimized variants tuned to your hiring style.',
    Icon: Link2,
  },
  {
    id: 'candidate',
    eyebrow: 'Intelligence',
    title: 'Seamless Motion',
    desc: 'Every shift, scroll, and interaction is fluid. Upload a JD — AI parses, scores, and ranks candidates in seconds.',
    Icon: Search,
  },
  {
    id: 'profile',
    eyebrow: 'Context',
    title: 'Deep Personalization',
    desc: "No two hiring journeys are alike. Reads each candidate's full profile, crafts context-aware outreach — not copy-paste.",
    Icon: User,
  },
  {
    id: 'analytics',
    eyebrow: 'Insights',
    title: 'Beyond Search',
    desc: 'Ask, explore, and discover — without knowing the exact question. Response rates, funnel health, what works in real time.',
    Icon: BarChart3,
  },
]

/**
 * 3D orbital card carousel around a central brain model.
 * Cards orbit in 3D: enter from right BEHIND the brain,
 * swing forward to the active position IN FRONT of the brain,
 * then exit left BEHIND the brain again.
 * Brain z-index sits in the middle — active card is above, others below.
 */

// z values: brain is z-index 5. Cards > 5 = in front, < 5 = behind.
const SLOTS = [
  { x: -65, scale: 0.5, blur: 14, opacity: 0, z: 1, rotY: 25 },    // offscreen left (behind)
  { x: -35, scale: 0.65, blur: 10, opacity: 0.2, z: 3, rotY: 18 },  // far left (behind brain)
  { x: -15, scale: 0.85, blur: 4, opacity: 0.5, z: 4, rotY: 8 },    // near left (emerging)
  { x: -12, scale: 1, blur: 0, opacity: 1, z: 8, rotY: 0 },          // active (in front of brain)
  { x: 15, scale: 0.75, blur: 5, opacity: 0.45, z: 3, rotY: -12 },   // near right (behind brain)
  { x: 40, scale: 0.6, blur: 10, opacity: 0.2, z: 2, rotY: -20 },    // far right (behind brain)
  { x: 65, scale: 0.4, blur: 14, opacity: 0, z: 1, rotY: -25 },      // offscreen right (behind)
]
const CENTER_SLOT = 3

type SlotState = (typeof SLOTS)[number]

function lerpSlot(a: SlotState, b: SlotState, t: number): SlotState {
  const inv = 1 - t
  return {
    x: a.x * inv + b.x * t,
    scale: a.scale * inv + b.scale * t,
    blur: a.blur * inv + b.blur * t,
    opacity: a.opacity * inv + b.opacity * t,
    z: Math.round(a.z * inv + b.z * t),
    rotY: a.rotY * inv + b.rotY * t,
  }
}

function getSlotProps(relativePos: number): SlotState {
  const slotIdx = CENTER_SLOT + relativePos
  if (slotIdx <= 0) return SLOTS[0]
  if (slotIdx >= SLOTS.length - 1) return SLOTS[SLOTS.length - 1]
  const lo = Math.floor(slotIdx)
  const hi = Math.ceil(slotIdx)
  if (lo === hi) return SLOTS[lo]
  return lerpSlot(SLOTS[lo], SLOTS[hi], slotIdx - lo)
}

export function OrbitFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const brainRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef({ value: 0 })
  const activeIdxRef = useRef(0)

  // 3D tilt on hover — only active card responds
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    if (Math.round(activeIdxRef.current) !== idx) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(card, {
      rotateY: cx * 8,
      rotateX: -cy * 8,
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [])

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const brain = brainRef.current
    if (!section || !brain) return

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    const n = cards.length
    if (n === 0) return
    const scrollPerCard = 500
    const totalScroll = (n - 1) * scrollPerCard

    gsap.set(cards, { force3D: true, willChange: 'transform, opacity, filter' })

    const updateCards = () => {
      const activeIndex = progressRef.current.value * (n - 1)
      activeIdxRef.current = activeIndex
      for (let i = 0; i < n; i++) {
        const relPos = i - activeIndex
        const props = getSlotProps(relPos)
        gsap.set(cards[i], {
          x: `${props.x}vw`,
          scale: props.scale,
          rotateY: props.rotY,
          filter: `blur(${props.blur}px)`,
          opacity: props.opacity,
          zIndex: props.z,
        })
      }
    }

    updateCards()

    gsap.to(progressRef.current, {
      value: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${totalScroll}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: updateCards,
      },
    })

    // Brain: subtle parallax shift during scroll
    gsap.fromTo(
      brain,
      { x: '-3vw', scale: 0.92, rotateZ: -2 },
      {
        x: '2vw',
        scale: 1,
        rotateZ: 2,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: true,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill()
      })
    }
  }, [])

  return (
    <div ref={sectionRef} className="relative">
      <div
        className="relative mx-auto flex min-h-[80vh] max-w-[1400px] flex-col items-center justify-center px-6 md:px-8"
        style={{ perspective: 1200 }}
      >
        {/* Brain — center-right, z-index 5 (cards orbit around it) */}
        <div
          ref={brainRef}
          className="absolute top-1/2 w-[280px] -translate-y-1/2 md:w-[420px] lg:w-[480px]"
          style={{ left: '52%', transform: 'translate(-40%, -50%)', zIndex: 5 }}
        >
          <video
            src="/home_page_hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full object-contain"
          />
          <div className="absolute inset-0 -z-10 scale-[2] rounded-full bg-accent/5 blur-3xl" />
        </div>

        {/* Cards orbit layer */}
        <div className="relative flex items-center justify-center">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.id}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              className="absolute"
              style={{ transformStyle: 'preserve-3d' }}
              data-cursor-hover
              onMouseMove={(e) => handleCardMouseMove(e, i)}
              onMouseLeave={handleCardMouseLeave}
            >
              {/* Blueprint-style card */}
              <div
                className="relative w-[280px] border border-dashed border-[#6a6d5a] p-8 md:w-[380px] md:p-10"
                style={{ background: '#CED5A6' }}
              >
                {/* 3 dots top-left */}
                <div className="absolute left-4 top-4 flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#3D4034]/40" />
                  <span className="h-2 w-2 rounded-full bg-[#3D4034]/40" />
                  <span className="h-2 w-2 rounded-full bg-[#3D4034]/40" />
                </div>

                {/* Corner + marks */}
                <span className="absolute -left-2 -top-2 text-xs text-[#3D4034]/30">+</span>
                <span className="absolute -right-2 -top-2 text-xs text-[#3D4034]/30">+</span>
                <span className="absolute -bottom-2 -left-2 text-xs text-[#3D4034]/30">+</span>
                <span className="absolute -bottom-2 -right-2 text-xs text-[#3D4034]/30">+</span>

                {/* Icon */}
                <div className="mb-6 mt-4 flex h-14 w-14 items-center justify-center">
                  <feature.Icon size={32} strokeWidth={1.2} className="text-[#3D4034]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold uppercase tracking-wide text-[#1E201A] md:text-2xl">
                  {feature.title}
                </h3>
              </div>

              {/* Description text below card */}
              <p className="mt-6 max-w-[380px] text-sm leading-relaxed text-text-secondary">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
