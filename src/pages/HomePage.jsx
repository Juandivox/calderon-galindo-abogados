import { useScrollAnimation } from '../hooks/useScrollAnimation'
import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import QuienesSomosSection from '../components/home/QuienesSomosSection'
import AreasPracticaSection from '../components/home/AreasPracticaSection'
import ProcesoSection from '../components/home/ProcesoSection'
import AboutSection from '../components/home/AboutSection'
import TeamSection from '../components/home/TeamSection'
import TestimonioSection from '../components/home/TestimonioSection'
import FaqSection from '../components/home/FaqSection'
import ContactSection from '../components/home/ContactSection'

export default function HomePage() {
  const animRef = useScrollAnimation()

  return (
    <main ref={animRef}>
      <HeroSection />
      <StatsSection />
      <QuienesSomosSection />
      <AreasPracticaSection />
      <ProcesoSection />
      <AboutSection />
      <TeamSection />
      <TestimonioSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}
