import { useScrollAnimation } from '../hooks/useScrollAnimation'
import HeroSection from '../components/home/HeroSection'
import QuienesSomosSection from '../components/home/QuienesSomosSection'
import AreasPracticaSection from '../components/home/AreasPracticaSection'
import TestimonioSection from '../components/home/TestimonioSection'
import AboutSection from '../components/home/AboutSection'
import TeamSection from '../components/home/TeamSection'
import ContactSection from '../components/home/ContactSection'

export default function HomePage() {
  const animRef = useScrollAnimation()

  return (
    <main ref={animRef}>
      <HeroSection />
      <QuienesSomosSection />
      <AreasPracticaSection />
      <TestimonioSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
    </main>
  )
}
