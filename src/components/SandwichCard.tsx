"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { storeConfig } from "@/lib/config";

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
  const [isAdding, setIsAdding] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const isOutOfStock = sandwich.inventory === 0;

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart({
      sandwichId: sandwich._id,
      quantity,
      name: sandwich.name,
      price: sandwich.price,
    });
    setQuantity(1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= sandwich.inventory) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200">
      {/* Gradient overlay for visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header with name and price */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 font-playfair leading-tight flex-1">
            {sandwich.name}
          </h3>
          <div className="flex items-center space-x-1 ml-3">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-600">4.8</span>
          </div>
        </div>

        {/* Description with better typography */}
        {sandwich.description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {sandwich.description}
          </p>
        )}

        {/* Ingredients with modern styling */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Ingredients
          </h4>
          <div className="flex flex-wrap gap-1">
            {sandwich.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full font-medium"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Price and availability with enhanced styling */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold text-orange-600">
              {storeConfig.currencySymbol}{sandwich.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">each</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            sandwich.inventory > 10
              ? 'bg-green-100 text-green-700'
              : sandwich.inventory > 0
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
          }`}>
            {sandwich.inventory > 0 ? `${sandwich.inventory} available` : "Sold out"}
          </div>
        </div>

        {/* Quantity selector with modern design */}
        {!isOutOfStock && (
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <span className="w-8 text-center font-bold text-gray-900 text-lg">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= sandwich.inventory}
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {/* Enhanced add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
            isOutOfStock
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : isAdding
                ? "bg-green-600 text-white"
                : "bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-xl"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                <span>{isOutOfStock ? "Sold Out" : "Add to Cart"}</span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Subtle bottom accent */}
      <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}