import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/constants";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">{SITE_CONFIG.name}</span>
          </Link>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground mt-2">
            Start transforming your images with AI today
          </p>
        </div>

        <div className="flex justify-center">
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl",
              },
            }}
          />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
