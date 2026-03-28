import type { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
  /** Extra vertical padding — defaults to Swiss 120px (py-[120px]) */
  compact?: boolean
}

/** Grid-aligned section: 12-col, 1200px max, Swiss vertical rhythm */
export function SectionWrapper({
  children,
  id,
  className = '',
  compact = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-[1200px] px-6 md:px-8 ${
        compact ? 'py-16 md:py-20' : 'py-20 md:py-[120px]'
      } ${className}`}
    >
      {children}
    </section>
  )
}
