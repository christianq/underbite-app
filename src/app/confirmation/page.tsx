"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { getPageClasses, getCardClasses, getButtonClasses } from "@/lib/theme";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderStatus, setOrderStatus] = useState<"loading" | "success" | "error">("loading");
  const clearCart = useCartStore((state) => state.clearCart);
  const processOrderPayment = useMutation(api.orders.processOrderPayment);
  const pageClasses = getPageClasses();
  const cardClasses = getCardClasses();
  const buttonClasses = getButtonClasses();

  useEffect(() => {
    if (sessionId) {
      // Get the orderId from localStorage
      const orderId = localStorage.getItem('pendingOrderId');

      if (orderId) {
        // Process the payment and update inventory
        processOrderPayment({ orderId: orderId as any, stripeSessionId: sessionId })
          .then(() => {
            setOrderStatus("success");
            clearCart(); // Clear the cart after successful payment
            localStorage.removeItem('pendingOrderId'); // Clean up
          })
          .catch((error) => {
            console.error("Payment processing error:", error);
            setOrderStatus("error");
          });
      } else {
        setOrderStatus("error");
      }
    } else {
      setOrderStatus("error");
    }
  }, [sessionId, processOrderPayment, clearCart]);

  if (orderStatus === "loading") {
    return (
      <div className={pageClasses.wrapper}>
        <div className={pageClasses.container}>
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing your order...</h1>
            <p className="text-gray-600">Please wait while we confirm your payment.</p>
          </div>
        </div>
      </div>
    );
  }

  if (orderStatus === "error") {
    return (
      <div className={pageClasses.wrapper}>
        <div className={pageClasses.container}>
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">✕</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h1>
            <p className="text-gray-600 mb-8">
              There was an issue processing your payment. Please try again or contact support.
            </p>
            <Link
              href="/cart"
              className={`inline-flex items-center space-x-2 ${buttonClasses.primary}`}
            >
              <span>Return to Cart</span>
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
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. Your payment has been processed successfully.
          </p>

          <div className={`${cardClasses.wrapper} mb-8`}>
            <div className={cardClasses.content}>
              <h2 className={cardClasses.header}>Order Details</h2>
              <div className="text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{localStorage.getItem('pendingOrderId') || sessionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-medium">Paid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              You will receive an email confirmation shortly. Your order will be ready for pickup soon!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className={`inline-flex items-center space-x-2 ${buttonClasses.primary}`}
              >
                <span>Order More</span>
                <ArrowRight size={20} />
              </Link>

              <Link
                href="/orders"
                className={`inline-flex items-center space-x-2 ${buttonClasses.secondary}`}
              >
                <span>View Orders</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  const pageClasses = getPageClasses();

  return (
    <Suspense fallback={
      <div className={pageClasses.wrapper}>
        <div className={pageClasses.container}>
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h1>
          </div>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}