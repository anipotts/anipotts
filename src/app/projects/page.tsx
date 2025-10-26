import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata = {
  title: "Projects",
  description: "Here are some of the projects I've worked on.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <ProjectGrid />
      </main>
      <Footer />
    </>
  );
}
