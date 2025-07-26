"use client";

import { useEffect } from "react";
import { useStoreConfig } from "@/lib/config";

export function DynamicMeta() {
  const storeConfig = useStoreConfig();

  useEffect(() => {
    // Update document title
    if (storeConfig.meta?.title) {
      document.title = storeConfig.meta.title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && storeConfig.meta?.description) {
      metaDescription.setAttribute('content', storeConfig.meta.description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && storeConfig.meta?.keywords) {
      metaKeywords.setAttribute('content', storeConfig.meta.keywords);
    }
  }, [storeConfig.meta]);

  return null; // This component doesn't render anything
}