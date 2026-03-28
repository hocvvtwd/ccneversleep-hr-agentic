import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function FinalCtaSection() {
  const ref = useScrollReveal({ blur: 16, y: 30, duration: 1 })
  return (
    <section className="px-6 py-24 md:px-12 md:py-40">
      <div ref={ref} className="text-center">
        <p className="text-[clamp(1.2rem,3vw,2rem)] leading-relaxed tracking-[1px] text-text">
          Quiet intelligence for the chaos of hiring.
        </p>
      </div>
    </section>
  )
}
