import { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { SITE_CONFIG } from "@/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_CONFIG.name} and our mission to make AI-powered image editing accessible to everyone.`,
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                About {SITE_CONFIG.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We&apos;re on a mission to make AI-powered image editing accessible to everyone.
              </p>
              <div className="prose prose-invert max-w-none">
                <p>
                  {SITE_CONFIG.name} was born from a simple idea: everyone should be able to
                  transform their images without needing expensive software or design skills.
                </p>
                <p>
                  Our team of AI engineers and designers built a platform that understands
                  natural language and creates stunning visual transformations in seconds.
                </p>
                <p>
                  Whether you&apos;re a professional photographer, content creator, or just
                  someone who wants to enhance their photos, {SITE_CONFIG.name} is here to help.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
