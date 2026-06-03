import "@/index.css";
import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth";
import { queryClient } from "@/lib/queryClient";

// Wraps every Vike page. The existing client-side singletons (queryClient,
// AuthProvider, ThemeProvider, Toaster) carry over unchanged so mutations and
// client-only effects keep working post-hydration. Data needed for the SSR
// render is delivered via Vike's +data loaders and read with useData(); no
// query-cache rehydration is needed.
export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <AuthProvider>{children}</AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
