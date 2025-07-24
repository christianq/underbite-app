"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { setupCartCleanup } from "@/lib/store";

export function CartCleanup() {
  const clearCartBySession = useMutation(api.carts.clearCartBySession);

  useEffect(() => {
    const cleanup = setupCartCleanup(clearCartBySession);

    // Return cleanup function to remove event listeners when component unmounts
    return cleanup;
  }, [clearCartBySession]);

  return null; // This component doesn't render anything
}