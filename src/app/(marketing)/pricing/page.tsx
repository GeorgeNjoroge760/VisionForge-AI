import { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Pricing } from "@/components/landing/pricing";
import { SITE_CONFIG } from "@/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Simple, transparent pricing for ${SITE_CONFIG.name}. Start free, upgrade when you need more.`,
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
}
