import { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Features } from "@/components/landing/features";
import { SITE_CONFIG } from "@/constants";

export const metadata: Metadata = {
  title: "Features",
  description: `Discover all the powerful features of ${SITE_CONFIG.name}. AI-powered image editing, style transfer, background removal, and more.`,
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <Features />
      </div>
      <Footer />
    </main>
  );
}
