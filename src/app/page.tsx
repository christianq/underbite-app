"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SandwichCard } from "@/components/SandwichCard";
import { storeConfig } from "@/lib/config";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HomePage() {
  const sandwiches = useQuery(api.sandwiches.getSandwiches);
  const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
      const titleElement = document.getElementById('hero-title');
      if (!titleElement) return;

      const rect = titleElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if title is at or past the center of viewport
      const isAtCenter = rect.top <= windowHeight / 2;
      setIsAtBottom(isAtCenter);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (sandwiches === undefined) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-[500px] mx-auto">
        <img src="/logo.png" alt="Cowboy Jane's" className="w-full" />
      </div>

      <div className="max-w-[500px] mx-auto space-y-4">
        {sandwiches.map((sandwich) => (
          <SandwichCard key={sandwich._id} sandwich={sandwich} />
        ))}
      </div>

      {sandwiches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No sandwiches available at the moment.</p>
        </div>
      )}
                              <h1
          id="hero-title"
          className={`text-4xl font-bold text-gray-900 cowboy-title max-w-[500px] mx-auto text-center z-10 transition-all duration-300 mb-[200px] mt-[200px] ${
            isAtBottom
              ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              : 'relative'
          }`}
        >
          {storeConfig.heroTitle}
        </h1>
    </div>
  );
}
