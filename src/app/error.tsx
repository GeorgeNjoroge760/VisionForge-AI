"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Error</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Something went wrong!
        </p>
        <Button variant="gradient" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
