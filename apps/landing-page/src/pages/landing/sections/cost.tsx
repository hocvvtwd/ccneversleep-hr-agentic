import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function CostSection() {
  const textRef = useScrollReveal({ blur: 16, y: 30, duration: 1 })
  const imgRef = useScrollReveal({ blur: 20, scale: 0.92, duration: 1.2, start: 'top 75%' })

  return (
    <section className="px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div ref={textRef} className="max-w-lg">
          <p className="text-xs tracking-[3px] text-muted">Why NeverSleep exists</p>
          <p className="mt-6 text-base leading-relaxed tracking-[0.5px] text-text md:text-lg">
            Modern HR is noise. NeverSleep cuts through it — processing candidates, patterns, and nuance to give you the signal you need, exactly when you need it.
          </p>
        </div>
        <div ref={imgRef} className="mt-16 flex justify-center md:mt-24">
          <img
            src="/images/hero-3d.webp"
            alt="3D crystalline structure"
            className="h-auto w-full max-w-2xl object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
