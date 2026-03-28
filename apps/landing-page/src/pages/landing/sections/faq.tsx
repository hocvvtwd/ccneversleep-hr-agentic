import * as Accordion from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    q: 'What exactly is NeverSleep?',
    a: 'NeverSleep is a cognitive HR platform — an AI system that automates birthday recognition, recruitment outreach, and candidate discovery. It reads before it writes, thinks before it acts.',
  },
  {
    q: 'How is it different from other HR tools?',
    a: "Unlike tools that wait for input, NeverSleep anticipates. It reads each candidate's full profile, understands context, and crafts personalized outreach — not copy-paste templates.",
  },
  {
    q: 'Do I need any special setup?',
    a: 'No special setup required. Connect your calendar, invite your team, and the AI starts learning your preferences immediately. Most teams are live in under 15 minutes.',
  },
  {
    q: 'Will my data be safe?',
    a: 'All data is encrypted at rest and in transit. We never share with third parties. Enterprise plans include on-premise deployment and SSO/SAML support.',
  },
  {
    q: 'Is this the final release?',
    a: "NeverSleep is in active development. What you see is an early preview of the intelligence model. The agents grow smarter with every hiring cycle — this is just the beginning.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="px-6 py-20 md:px-12 md:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        {/* Left: description anchored to bottom */}
        <div className="flex flex-col justify-end">
          <p className="text-xs font-semibold uppercase tracking-[4px] text-accent">
            Questions &amp; Clarity
          </p>
          <p className="mt-6 text-sm leading-relaxed text-text-secondary">
            Even before you ask, NeverSleep anticipates. These are the things people wonder about
            most — answered plainly, without the sales language.
          </p>
        </div>

        {/* Right: accordion */}
        <div>
          <Accordion.Root type="single" collapsible>
            {FAQS.map((faq, i) => (
              <Accordion.Item
                key={faq.q}
                value={`faq-${i}`}
                className="border-b border-border/60"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left">
                    <span className="pr-4 text-sm font-semibold uppercase tracking-wide text-accent md:text-base">
                      {faq.q}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border text-muted transition-all duration-300 group-data-[state=open]:border-accent group-data-[state=open]:text-accent">
                      <Plus
                        size={16}
                        className="transition-transform duration-300 group-data-[state=open]:rotate-[135deg]"
                      />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="pb-6 text-sm leading-relaxed text-text-secondary">{faq.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  )
}
