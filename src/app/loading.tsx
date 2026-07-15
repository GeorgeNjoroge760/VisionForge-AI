import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
