"use client";

import { useStoreConfig } from "@/lib/config";

export default function HelpPage() {
  const storeConfig = useStoreConfig();
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & Support</h1>

      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How do I place an order?</h3>
              <p className="text-gray-600">
                Browse our menu, add items to your cart, and proceed to checkout. You'll be redirected to Stripe to complete your payment securely.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards through our secure Stripe payment system.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">How long does it take to prepare my order?</h3>
              <p className="text-gray-600">
                Most orders are ready within 10-15 minutes. You'll receive a notification when your order is ready for pickup.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Can I cancel my order?</h3>
              <p className="text-gray-600">
                Orders can be cancelled within 5 minutes of placement. Contact us immediately if you need to cancel.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">What if an item is out of stock?</h3>
              <p className="text-gray-600">
                Items that are out of stock will be marked as "Sold Out" and cannot be added to your cart. We update our inventory in real-time.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Phone</h3>
              <p className="text-gray-600">{storeConfig.phone}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">Email</h3>
              <p className="text-gray-600">{storeConfig.email}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">Address</h3>
              <p className="text-gray-600">
                {storeConfig.address}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">Hours</h3>
              <p className="text-gray-600">
                Monday: {storeConfig.hours.monday}<br />
                Tuesday: {storeConfig.hours.tuesday}<br />
                Wednesday: {storeConfig.hours.wednesday}<br />
                Thursday: {storeConfig.hours.thursday}<br />
                Friday: {storeConfig.hours.friday}<br />
                Saturday: {storeConfig.hours.saturday}<br />
                Sunday: {storeConfig.hours.sunday}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Issues</h2>

          <p className="text-gray-600 mb-4">
            If you're experiencing issues with your order, please contact us immediately with your order number and a description of the problem.
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-medium text-orange-800 mb-2">Need Immediate Assistance?</h3>
            <p className="text-orange-700 text-sm">
              For urgent order issues, please call us directly at {storeConfig.phone} during business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}