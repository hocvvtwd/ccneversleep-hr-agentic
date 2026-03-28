interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <a href="/" className={`flex items-center gap-2 ${className}`}>
      <img src="/logo.svg" alt="HR Assistant AI" className="h-8 w-8" />
      {showText && (
        <span className="text-base font-bold tracking-tight text-text">HR Assistant</span>
      )}
    </a>
  )
}
