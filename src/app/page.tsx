import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ProjectGrid from "@/components/projects/ProjectGrid";
import FeaturedShowcase from "@/components/projects/FeaturedShowcase";
import ScrollProgress from "@/components/shared/ScrollProgress";
import SectionTransition from "@/components/shared/SectionTransition";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SectionTransition />
        <AboutSection />
        <SectionTransition />
        <FeaturedShowcase />
        <SectionTransition />
        <div id="projects">
          <ProjectGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
