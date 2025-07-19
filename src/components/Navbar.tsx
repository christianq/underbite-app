"use client";

import Link from "next/link";
import { ShoppingCart, Home, User, HelpCircle } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { storeConfig, getColorClasses } from "@/lib/config";

export function Navbar() {
  const [itemCount, setItemCount] = useState(0);
  const getItemCount = useCartStore((state) => state.getItemCount);

  useEffect(() => {
    setItemCount(getItemCount());

    // Subscribe to store changes
    const unsubscribe = useCartStore.subscribe((state) => {
      setItemCount(state.getItemCount());
    });

    return unsubscribe;
  }, [getItemCount]);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-600">{storeConfig.logo}</span>
            <span className="text-xl font-bold text-gray-900 font-playfair">{storeConfig.name}</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home size={20} />
              <span>Menu</span>
            </Link>

            <Link
              href="/orders"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User size={20} />
              <span>My Orders</span>
            </Link>

            <Link
              href="/help"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <HelpCircle size={20} />
              <span>Help</span>
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}