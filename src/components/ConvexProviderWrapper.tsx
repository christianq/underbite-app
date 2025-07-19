"use client";

import { ConvexProvider, convex } from "@/lib/convex";
import { Navbar } from "@/components/Navbar";

interface ConvexProviderWrapperProps {
  children: React.ReactNode;
}

export function ConvexProviderWrapper({ children }: ConvexProviderWrapperProps) {
  return (
    <ConvexProvider client={convex}>
      <Navbar />
      {children}
    </ConvexProvider>
  );
}