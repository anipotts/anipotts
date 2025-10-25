import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/home/Hero";
import StatsRibbon from "@/components/home/StatsRibbon";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ScrollProgress from "@/components/shared/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
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
  );
}
