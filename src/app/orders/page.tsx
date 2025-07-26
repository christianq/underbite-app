"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { format } from "date-fns";
import { getPageClasses, getCardClasses, getStatusClasses } from "@/lib/theme";

export default function OrdersPage() {
  const orders = useQuery(api.orders.getOrders, { status: "paid" });
  const pageClasses = getPageClasses();
  const cardClasses = getCardClasses();
  const statusClasses = getStatusClasses();

  if (orders === undefined) {
    return (
      <div className={pageClasses.wrapper}>
        <div className={pageClasses.container}>
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return statusClasses.success;
      case "pending":
        return statusClasses.warning;
      case "completed":
        return statusClasses.info;
      case "cancelled":
        return statusClasses.error;
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "pending":
        return "Pending";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <div className={pageClasses.wrapper}>
      <div className={pageClasses.container}>
        <h1 className={pageClasses.title}>Completed Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No completed orders found.</p>
            <p className="text-gray-500 text-sm mt-2">Orders will appear here after payment is processed.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className={cardClasses.wrapper}>
                <div className={cardClasses.content}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order._id.slice(-8)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {format(new Date(order.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-gray-500 ml-2">× {item.quantity}</span>
                        </div>
                        <span className="text-gray-900">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-orange-600">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}