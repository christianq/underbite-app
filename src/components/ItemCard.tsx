"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useCartStore, getSessionId } from "@/lib/store";
import { useStoreConfig } from "@/lib/config";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface Item {
  _id: string;
  name: string;
  ingredients: string[];
  price: number;
  inventory: number;
  image?: string;
  description?: string;
  emoji?: string; // Added emoji to the interface
}

interface ItemCardProps {
  item: Item;
  showQty?: boolean;
}

export function ItemCard({ item, showQty = true }: ItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);
  const addToCartMutation = useMutation(api.carts.addToCart);
  const isOutOfStock = item.inventory === 0;
  const storeConfig = useStoreConfig();

  // Use consistent session ID
  const sessionId = getSessionId();

  const handleAddToCart = async () => {
    // Add to local cart store
    addToCart({
      itemId: item._id,
      quantity,
      name: item.name,
      price: item.price,
      emoji: item.emoji,
    });

    // Add to Convex database
    await addToCartMutation({
      itemId: item._id as any, // Type assertion for Convex ID
      quantity,
      sessionId: sessionId, // Use consistent session ID
    });

    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= item.inventory) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {item.image && (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">
          {item.emoji && <span className="mr-2">{item.emoji}</span>}
          {item.name}
        </h3>

        {item.description && (
          <p className="text-gray-600 mb-3">{item.description}</p>
        )}

        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Ingredients:</h4>
          <p className="text-sm text-gray-600">
            {item.ingredients.join(", ")}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#db4f43]">
            {storeConfig.currencySymbol}{item.price.toFixed(2)}
          </span>
          <span className={`text-sm ${item.inventory > 0 ? 'text-gray-500' : 'text-[#db4f43] font-bold'}`}>
            {item.inventory} available
          </span>
        </div>

        {/* Show quantity controls if showQty is true, otherwise just Add to Cart button */}
        {!isOutOfStock && showQty && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className={
                  `p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 ${quantity <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`
                }
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= item.inventory}
                className={
                  `p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 ${quantity >= item.inventory ? 'cursor-not-allowed' : 'cursor-pointer'}`
                }
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`py-2 px-6 rounded-lg font-medium transition-colors ${
                isOutOfStock
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#db4f43] text-white hover:bg-[#c73d37] cursor-pointer"
              }`}
            >
              {isOutOfStock ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
        )}

        {/* If showQty is false, just show Add to Cart button (or Sold Out) */}
        {!isOutOfStock && !showQty && (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              isOutOfStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#db4f43] text-white hover:bg-[#c73d37] cursor-pointer"
            }`}
          >
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </button>
        )}

        {isOutOfStock && (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              isOutOfStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#db4f43] text-white hover:bg-[#c73d37]"
            }`}
          >
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}