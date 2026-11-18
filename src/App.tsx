import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { Marquee } from './components/sections/Marquee'
import { About } from './components/sections/About'
import { Services } from './components/sections/Services'
import { Portfolio } from './components/sections/Portfolio'
import { Process } from './components/sections/Process'
import { Differentials } from './components/sections/Differentials'
import { FinalCTA } from './components/sections/FinalCTA'
import { Footer } from './components/sections/Footer'
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp'

export default function App() {
  return (
    <>
      <a
        href="#sobre"
        className="sr-only z-[70] rounded-full bg-ink px-4 py-2 text-navy focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Differentials />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
