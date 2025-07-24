"use client";

import { ConvexProvider, convex } from "@/lib/convex";
import { Navbar } from "@/components/Navbar";
import { CartCleanup } from "@/components/CartCleanup";

interface ConvexProviderWrapperProps {
  children: React.ReactNode;
}

export function ConvexProviderWrapper({ children }: ConvexProviderWrapperProps) {
  return (
    <ConvexProvider client={convex}>
      <CartCleanup />
      <Navbar />
      {children}
    </ConvexProvider>
  );
}