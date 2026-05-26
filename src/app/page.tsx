import LoadingScreen from '@/components/LoadingScreen'
import ReadingProgress from '@/components/ReadingProgress'
import BackToTop from '@/components/BackToTop'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import PortfolioSection from '@/components/PortfolioSection'
import ClientsSection from '@/components/ClientsSection'
import StoriesSection from '@/components/StoriesSection'
import WhyUsSection from '@/components/WhyUsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import FloatingWA from '@/components/FloatingWA'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ReadingProgress />
      <BackToTop />
      <Cursor />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ClientsSection />
        <StoriesSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileBottomNav />
      <FloatingWA />
    </>
  )
}
