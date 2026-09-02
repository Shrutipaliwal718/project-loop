import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";

import Hero from "@/components/Landing/Hero";
import AnalyticsPreview from "@/components/Landing/AnalyticsPreview";
import TrustBar from "@/components/Landing/TrustBar";
import ProductOverview from "@/components/Landing/ProductOverview";
import Features from "@/components/Landing/Features";
import HowItWorks from "@/components/Landing/HowItWorks";
import AIInsights from "@/components/Landing/AIInsights";
import FAQ from "@/components/Landing/FAQ";
import CTA from "@/components/Landing/CTA";

export default function Home() {
  return (
    <main className="loop-page">
      <Navbar />
      <Hero />
      <AnalyticsPreview />
      <TrustBar />
      <ProductOverview />
      <Features />
      <HowItWorks />
      <AIInsights />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
