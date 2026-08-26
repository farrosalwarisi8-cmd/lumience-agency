import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TeamSection from "@/components/TeamSection";
import LocationsSection from "@/components/LocationsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="section-divider" />
      <ServicesSection />
      <div className="section-divider" />
      <PortfolioSection />
      <div className="section-divider" />
      <TeamSection />
      <div className="section-divider" />
      <LocationsSection />
      <div className="section-divider" />
      <FAQSection />
      <div className="section-divider" />
      <ContactSection />
      <Footer />
    </>
  );
}