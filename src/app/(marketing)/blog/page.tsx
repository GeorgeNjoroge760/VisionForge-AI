import { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { SITE_CONFIG } from "@/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: `Tips, tutorials, and news about AI image editing from the ${SITE_CONFIG.name} team.`,
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Blog</h1>
              <p className="text-xl text-muted-foreground">
                Tips, tutorials, and news about AI image editing.
              </p>
            </div>
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Blog coming soon. Stay tuned for updates!
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
