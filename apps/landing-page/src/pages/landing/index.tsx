import { CustomCursor } from '@/components/landing/custom-cursor'
import { Navbar } from '@/components/landing/navbar'
import { Preloader } from '@/components/landing/preloader'
import { ScrollProgressNav } from '@/components/landing/scroll-progress-nav'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'
import { AgenticSection } from './sections/agentic'
import { ComparisonSection } from './sections/comparison'
import { CostSection } from './sections/cost'
import { FaqSection } from './sections/faq'
import { FinalCtaSection } from './sections/final-cta'
import { Footer } from './sections/footer'
import { HeroSection } from './sections/hero'
import { MindSection } from './sections/mind-section'
import { PricingSection } from './sections/pricing'

export function LandingPage() {
  useSmoothScroll()

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <ScrollProgressNav />
      <Preloader />
      <Navbar />
      <HeroSection />
      <ComparisonSection />
      <CostSection />
      <AgenticSection />
      <MindSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </div>
  )
}
