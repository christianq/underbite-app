"use client";

import { useState, useMemo } from "react";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { storeConfig } from "@/lib/config";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface Sandwich {
  _id: string;
  name: string;
  ingredients: string[];
  price: number;
  inventory: number;
  image?: string;
  description?: string;
}

interface SandwichCardProps {
  sandwich: Sandwich;
}

export function SandwichCard({ sandwich }: SandwichCardProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);
  const addToCartMutation = useMutation(api.carts.addToCart);
  const isOutOfStock = sandwich.inventory === 0;

  // Generate a stable session ID for this user
  const sessionId = useMemo(() => {
    if (typeof window === 'undefined') return 'default';
    return `session-${window.location.hostname}-${window.navigator.userAgent}`;
  }, []);
  const cartCounts = useQuery(api.carts.getCartCounts, { excludeSessionId: sessionId });
  const cartCount = cartCounts?.[sandwich._id] || 0;

    const handleAddToCart = async () => {
    // Add to local cart store
    addToCart({
      sandwichId: sandwich._id,
      quantity,
      name: sandwich.name,
      price: sandwich.price,
    });

    // Add to Convex database for cart counter
    await addToCartMutation({
      sandwichId: sandwich._id as any, // Type assertion for Convex ID
      quantity,
      sessionId: sessionId, // Use consistent session ID
    });

    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= sandwich.inventory) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {sandwich.image && (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <img
            src={sandwich.image}
            alt={sandwich.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">
          {sandwich.name}
        </h3>

        {sandwich.description && (
          <p className="text-gray-600 mb-3">{sandwich.description}</p>
        )}

        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Ingredients:</h4>
          <p className="text-sm text-gray-600">
            {sandwich.ingredients.join(", ")}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-orange-600">
            {storeConfig.currencySymbol}{sandwich.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {sandwich.inventory > 0 ? `${sandwich.inventory} available` : "Sold out"}
          </span>
        </div>

        {cartCount > 0 && (
          <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800 font-medium">
              🤠 Better lasso it now, there {cartCount === 1 ? 'is' : 'are'} {cartCount} in other pilgrim{cartCount === 1 ? '' : 's'}' cart{cartCount === 1 ? '' : 's'}!
            </p>
          </div>
        )}

        {!isOutOfStock && (
          <div className="flex items-center space-x-2 mb-4">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= sandwich.inventory}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isOutOfStock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-600 text-white hover:bg-orange-700"
          }`}
        >
          {isOutOfStock ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}