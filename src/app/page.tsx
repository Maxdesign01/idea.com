import Hero from "@/components/Hero";
import MarketplaceSection from "@/components/MarketplaceSection";
import BountiesSection from "@/components/BountiesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white selection:bg-orange-500 selection:text-white">
      <Hero />
      <MarketplaceSection />
      <BountiesSection />
      <HowItWorksSection />
      <FAQSection />
    </div>
  );
}
