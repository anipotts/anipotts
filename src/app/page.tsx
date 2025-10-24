import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import Hero from '@/components/home/Hero'
import StatsRibbon from '@/components/home/StatsRibbon'
import ProjectGrid from '@/components/projects/ProjectGrid'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsRibbon />
        <div id="projects">
          <ProjectGrid />
        </div>
      </main>
      <Footer />
    </>
  )
}
