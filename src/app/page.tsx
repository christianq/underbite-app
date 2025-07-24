"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ItemCard } from "@/components/ItemCard";
import { useStoreConfig } from "@/lib/config";
import Image from "next/image";

export default function HomePage() {
  const items = useQuery(api.items.getItems) || [];
  const categories = useQuery(api.categories.getCategories) || [];
  const storeConfig = useStoreConfig();

  // Group items by categoryId
  const itemsByCategory = categories.map((cat) => ({
    category: cat,
    items: items.filter((item) => item.categoryId === cat._id),
  }));
  // Items with no category
  const uncategorized = items.filter((item) => !item.categoryId);

  if (items === undefined) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#db4f43]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="max-w-[500px] mx-auto">
        <div className="text-center">
          <img src="/logo.png" alt="Cowboy Jane's" className="w-full" />
        </div>

        {/* Show menu or message based on settings */}
        {storeConfig.menu.showMenu ? (
          <>
            {/* Category submenu */}
            {categories.length > 0 && (
              <nav className="flex flex-row flex-wrap gap-2 justify-start mt-4 overflow-x-auto pb-2 max-w-[500px] mx-auto">
                {categories.map((cat) => (
                  <a
                    key={cat._id}
                    href={`#category-${cat._id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(`category-${cat._id}`);
                      if (element) {
                        const navbarHeight = 64;
                        const extraOffset = 20;
                        const elementPosition = element.offsetTop - navbarHeight - extraOffset;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="px-3 py-1 rounded-full bg-[#f6d2c0] text-[#db4f43] font-semibold text-sm hover:bg-[#db4f43] hover:text-white transition-colors whitespace-nowrap"
                  >
                    {cat.name}
                  </a>
                ))}
                {uncategorized.length > 0 && (
                  <a
                    href="#category-uncategorized"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById('category-uncategorized');
                      if (element) {
                        const navbarHeight = 64; // 16 * 4 = 64px
                        const elementPosition = element.offsetTop - navbarHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="px-3 py-1 rounded-full bg-[#f6d2c0] text-[#db4f43] font-semibold text-sm hover:bg-[#db4f43] hover:text-white transition-colors whitespace-nowrap"
                  >
                    Other
                  </a>
                )}
              </nav>
            )}

            {/* Items by category */}
            <div className="max-w-[500px] mx-auto space-y-8">
              {itemsByCategory.map(({ category, items }) =>
                items.length > 0 && (
                  <section key={category._id} id={`category-${category._id}`} className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#db4f43] mb-2 mt-[40px] text-left">{category.name}</h2>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <ItemCard key={item._id} item={item} showQty={item.showQty !== false} />
                      ))}
                    </div>
                  </section>
                )
              )}
              {uncategorized.length > 0 && (
                <section id="category-uncategorized" className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#db4f43] mb-2 text-left">Other</h2>
                  <div className="space-y-4">
                    {uncategorized.map((item) => (
                      <ItemCard key={item._id} item={item} showQty={item.showQty !== false} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {items.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items available at the moment.</p>
              </div>
            )}
          </>
        ) : (
          /* Show message when store is closed */
          <div className="text-center py-12 max-w-[500px] mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#db4f43] mb-4">Store Temporarily Closed</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {storeConfig.menu.menuMessage}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hero Title - Sticky to Top */}
      <div
        className="sticky top-16 flex items-center justify-center z-10"
        style={{ height: 'calc(100vh - 64px)' }} // Full viewport height minus navbar
      >
        <h1
          id="hero-title"
          className="text-4xl font-bold text-gray-900 cowboy-title text-center"
        >
          {storeConfig.heroTitle}
        </h1>
      </div>
    </div>
  );
}
