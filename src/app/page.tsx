import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import WhySection from "@/components/WhySection";
import JourneySection from "@/components/JourneySection";
import DeliverablesSection from "@/components/DeliverablesSection";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import PricingSection from "@/components/PricingSection";
import CtaSection from "@/components/CtaSection"; // <--- Import CTA Baru
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] font-sans selection:bg-teal-500/30 selection:text-teal-200 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <WhySection />
      <JourneySection />
      <DeliverablesSection />
      <TestimonialMarquee />
      <PricingSection />
      
      {/* Formulir Konversi Utama (Menyatu dengan WhatsApp) */}
      <CtaSection /> 
      
      <FaqSection />
      <Footer />
    </main>
  );
}
