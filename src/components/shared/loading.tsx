"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative">
        <div
          className={cn(
            "rounded-full bg-primary/20 flex items-center justify-center animate-pulse",
            sizes[size]
          )}
        >
          <Sparkles
            className={cn(
              "text-primary animate-spin",
              size === "sm" ? "h-2 w-2" : size === "md" ? "h-4 w-4" : "h-6 w-6"
            )}
          />
        </div>
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-primary/20 animate-ping",
            sizes[size]
          )}
        />
      </div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 animate-pulse">
      <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
      <div className="h-4 bg-white/10 rounded w-1/2 mb-2" />
      <div className="h-4 bg-white/10 rounded w-2/3" />
    </div>
  );
}
