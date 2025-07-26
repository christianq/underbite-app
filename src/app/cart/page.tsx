"use client";

import { useState } from "react";
import Link from "next/link";

import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCartStore, getSessionId } from "@/lib/store";
import { useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useStoreConfig } from "@/lib/config";
import { getPageClasses, getCardClasses, getButtonClasses } from "@/lib/theme";

export default function CartPage() {
  const pageClasses = getPageClasses();
  const cardClasses = getCardClasses();
  const buttonClasses = getButtonClasses();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore();
  const createOrder = useMutation(api.orders.createOrder);
  const createCheckoutSession = useAction(api.stripe.createCheckoutSession);
  const addToCartMutation = useMutation(api.carts.addToCart);
  const updateCartItemQuantityMutation = useMutation(api.carts.updateCartItemQuantity);
  const storeConfig = useStoreConfig();

  // Use consistent session ID
  const sessionId = getSessionId();

    const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);

      // Sync with Convex database for cart counter
      await updateCartItemQuantityMutation({
        itemId: itemId as any,
        quantity: newQuantity,
        sessionId: sessionId,
      });
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      // Create order in Convex
      const orderId = await createOrder({
        items: items.map(item => ({
          itemId: item.itemId as any,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
        total: getTotal(),
      });

      // Store orderId in localStorage for confirmation page
      localStorage.setItem('pendingOrderId', orderId);

      // Create Stripe checkout session
      const session = await createCheckoutSession({
        orderId,
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      // Redirect to Stripe checkout
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className={pageClasses.wrapper}>
        <div className={pageClasses.container}>
          <div className="text-center py-12">
            <h1 className={pageClasses.title}>Your Cart</h1>
            <p className="text-gray-600 mb-8">Your cart is empty.</p>
            <Link
              href="/"
              className={`inline-flex items-center space-x-2 ${buttonClasses.primary}`}
            >
              <span>Browse Menu</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={pageClasses.wrapper}>
      <div className={pageClasses.container}>
        <h1 className={pageClasses.title}>Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className={cardClasses.wrapper}>
              <div className={cardClasses.content}>
                <h2 className={cardClasses.header}>Cart Items</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.itemId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.emoji && <span className="mr-2">{item.emoji}</span>}
                          {item.name}
                        </h3>
                        <p className="text-gray-600">{storeConfig.currencySymbol}{item.price.toFixed(2)} each</p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className={`p-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 ${item.quantity <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {storeConfig.currencySymbol}{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={async () => {
                            removeItem(item.itemId);
                            // Sync with Convex database for cart counter
                            await updateCartItemQuantityMutation({
                              itemId: item.itemId as any,
                              quantity: 0,
                              sessionId: sessionId,
                            });
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className={`${cardClasses.wrapper} ${cardClasses.content}`}>
              <h2 className={cardClasses.header}>Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{storeConfig.currencySymbol}{getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold text-[#db4f43]">
                      {storeConfig.currencySymbol}{getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || items.length === 0}
                className={`w-full ${buttonClasses.primary} disabled:opacity-50 disabled:cursor-not-allowed ${isCheckingOut || items.length === 0 ? '' : 'cursor-pointer'}`}
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </button>

              <button
                onClick={async () => {
                  clearCart();
                  // Sync with Convex database for cart counter - clear all items
                  for (const item of items) {
                    await updateCartItemQuantityMutation({
                      itemId: item.itemId as any,
                      quantity: 0,
                      sessionId: sessionId,
                    });
                  }
                }}
                className={`w-full mt-3 ${buttonClasses.secondary}`}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}