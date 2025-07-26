"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { BarChart3, Package, Users, DollarSign } from "lucide-react";
import { getPageClasses, getCardClasses } from "@/lib/theme";

export default function AdminPage() {
  const items = useQuery(api.items.getItems);
  const orders = useQuery(api.orders.getOrders, {});
  const pageClasses = getPageClasses();
  const cardClasses = getCardClasses();

  const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;
  const totalOrders = orders?.length || 0;
  const totalItems = items?.length || 0;
  const lowStockItems = items?.filter((item: any) => item.inventory < 5).length || 0;

  return (
    <div className={pageClasses.wrapper}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className={pageClasses.title}>Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={cardClasses.wrapper}>
            <div className={cardClasses.content}>
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="text-blue-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={cardClasses.wrapper}>
            <div className={cardClasses.content}>
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart3 className="text-green-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={cardClasses.wrapper}>
            <div className={cardClasses.content}>
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Package className="text-orange-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Menu Items</p>
                  <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={cardClasses.wrapper}>
            <div className={cardClasses.content}>
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Users className="text-red-600" size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={cardClasses.wrapper}>
            <div className={cardClasses.content}>
              <h2 className={cardClasses.header}>Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/admin/items"
                  className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">Manage Items</h3>
                  <p className="text-sm text-gray-600">Add, edit, or remove items from the menu</p>
                </Link>

                <Link
                  href="/admin/orders"
                  className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">View Orders</h3>
                  <p className="text-sm text-gray-600">Track and manage customer orders</p>
                </Link>

                <Link
                  href="/admin/settings"
                  className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">Store Settings</h3>
                  <p className="text-sm text-gray-600">Customize store branding and information</p>
                </Link>
              </div>
            </div>
          </div>

          <div className={cardClasses.wrapper}>
            <div className={cardClasses.content}>
              <h2 className={cardClasses.header}>Recent Orders</h2>
              {orders && orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order._id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Order #{order._id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'paid' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No recent orders</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}