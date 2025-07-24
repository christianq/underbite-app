"use client";

import Link from "next/link";
import { ShoppingCart, Home, User, HelpCircle } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { useStoreConfig, getColorClasses } from "@/lib/config";

export function Navbar() {
  const [itemCount, setItemCount] = useState(0);
  const getItemCount = useCartStore((state) => state.getItemCount);
  const storeConfig = useStoreConfig();

  useEffect(() => {
    setItemCount(getItemCount());

    // Subscribe to store changes
    const unsubscribe = useCartStore.subscribe((state) => {
      setItemCount(state.getItemCount());
    });

    return unsubscribe;
  }, [getItemCount]);

  return (
    <nav className="bg-[#f4f0e3] shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <Home size={20} />
              <span>Menu</span>
            </Link>

            <Link
              href="/orders"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <User size={20} />
              <span>My Orders</span>
            </Link>

            <Link
              href="/help"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <HelpCircle size={20} />
              <span>Help</span>
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#db4f43] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center cursor-pointer">
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