import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import IntakeForm from "@/components/forms/IntakeForm";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch to discuss your project. I respond within 48 hours.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-6xl  font-bold text-foreground">
              Let&apos;s talk
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell me your idea, timeline, and budget—I&apos;ll reply within 48
              hours.
            </p>
          </div>

          {/* Form */}
          <IntakeForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
