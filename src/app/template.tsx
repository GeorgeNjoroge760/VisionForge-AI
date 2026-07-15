"use client";

import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";

export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
