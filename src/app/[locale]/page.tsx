import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import TrustBadges from "@/components/TrustBadges";
import Authority from "@/components/Authority";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import Fleet from "@/components/Fleet";
import Coverage from "@/components/Coverage";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <Services />
        <Fleet />
        <Differentials />
        <Authority />
        <Clients />
        <Coverage />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
