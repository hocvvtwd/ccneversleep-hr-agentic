import { SectionWrapper } from '@/components/landing/section-wrapper'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const FEATURES = [
  {
    num: '01',
    eyebrow: 'Automation',
    title: 'Birthday & Onboarding',
    desc: 'AI checks your calendar, generates personalized cards, sends via Telegram after your approval. No one gets forgotten.',
    gradient: 'from-violet-900/20 to-transparent',
  },
  {
    num: '02',
    eyebrow: 'Content',
    title: 'LinkedIn Recruitment',
    desc: 'Paste a job description. AI writes 3 optimized post variants. Pick one, schedule it, track engagement.',
    gradient: 'from-cyan-900/20 to-transparent',
  },
  {
    num: '03',
    eyebrow: 'Intelligence',
    title: 'Candidate Finder',
    desc: 'Upload a JD. AI parses requirements, searches LinkedIn via Proxycurl, scores and ranks every match.',
    gradient: 'from-emerald-900/20 to-transparent',
  },
  {
    num: '04',
    eyebrow: 'Context',
    title: 'Profile Analysis',
    desc: "Reads each candidate's full profile before writing. Context-aware outreach, not copy-paste spam.",
    gradient: 'from-amber-900/20 to-transparent',
  },
  {
    num: '05',
    eyebrow: 'Insights',
    title: 'Analytics & Reports',
    desc: "Response rates, time saved, hiring funnel health. Know what works and what doesn't — in real time.",
    gradient: 'from-rose-900/20 to-transparent',
  },
  {
    num: '06',
    eyebrow: 'Delivery',
    title: 'Multi-Channel',
    desc: 'Slack, Telegram, WhatsApp, LinkedIn — one dashboard to manage every channel your HR team uses.',
    gradient: 'from-indigo-900/20 to-transparent',
  },
]

export function ModulesSection() {
  const gridRef = useScrollReveal({ stagger: 0.08, blur: 16, duration: 0.8 })

  return (
    <SectionWrapper id="features">
      <div className="mb-16 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-accent">
          What you&rsquo;re awakening
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-text md:text-5xl">
          Six capabilities.
          <br />
          One AI colleague.
        </h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.num}
            className={`group relative overflow-hidden border border-border bg-gradient-to-b ${f.gradient} p-7 transition-all duration-300 hover:border-border-light`}
          >
            {/* Number watermark */}
            <span className="absolute -right-2 -top-4 font-mono text-[80px] font-bold leading-none text-white/[0.03]">
              {f.num}
            </span>

            <span className="relative text-xs font-semibold uppercase tracking-[3px] text-accent">
              {f.eyebrow}
            </span>
            <h3 className="relative mt-4 text-xl font-bold text-text">{f.title}</h3>
            <p className="relative mt-3 text-sm leading-relaxed text-text-secondary">{f.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
