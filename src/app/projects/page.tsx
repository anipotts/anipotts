import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import ProjectGrid from '@/components/projects/ProjectGrid'

export const metadata = {
  title: 'Projects',
  description: 'A curated selection of projects showcasing rapid development, technical depth, and real-world impact.',
}

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <ProjectGrid />
      </main>
      <Footer />
    </>
  )
}

