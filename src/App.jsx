import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandStatement from './components/BrandStatement'
import Gallery from './components/Gallery'
import CTABanner from './components/CTABanner'
import StyleTransformer from './components/StyleTransformer'
import Services from './components/Services'
import WhyUnreel from './components/WhyUnreel'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <BrandStatement />
      <Gallery />
      <CTABanner />
      <StyleTransformer />
      <Services />
      <WhyUnreel />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
