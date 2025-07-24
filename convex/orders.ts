import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getOrders = query({
  args: {
    userId: v.optional(v.string()),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("completed"),
      v.literal("cancelled")
    )),
  },
  handler: async (ctx, args) => {
    if (args.userId) {
      return await ctx.db
        .query("orders")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect();
    }

    if (args.status) {
      return await ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    }

    return await ctx.db.query("orders").collect();
  },
});

export const getOrder = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createOrder = mutation({
  args: {
    userId: v.optional(v.string()),
    items: v.array(v.object({
      itemId: v.id("items"),
      quantity: v.number(),
      price: v.number(),
      name: v.string(),
    })),
    total: v.number(),
    customerEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    stripeSessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { orderId, status, stripeSessionId } = args;
    const order = await ctx.db.get(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    const updates: any = { status };

    if (stripeSessionId) {
      updates.stripeSessionId = stripeSessionId;
    }

    // Update the order status
    await ctx.db.patch(orderId, updates);

    // Handle inventory changes based on status
    if (status === "paid" && order.status !== "paid") {
      // Decrement inventory only when order becomes paid
      for (const item of order.items) {
        const id = item.itemId;
        if (id) {
          const dbItem = await ctx.db.get(id);
          if (dbItem) {
            await ctx.db.patch(id, {
              inventory: Math.max(0, dbItem.inventory - item.quantity),
            });
          }
        }
      }
    }

    return order;
  },
});

export const processOrderPayment = mutation({
  args: {
    orderId: v.id("orders"),
    stripeSessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Only process if order is not already paid
    if (order.status === "paid") {
      return order; // Already processed
    }

    // Update order status to paid
    await ctx.db.patch(args.orderId, {
      status: "paid",
      stripeSessionId: args.stripeSessionId,
    });

    // Decrement inventory for each item (only for paid orders)
    for (const item of order.items) {
      const id = item.itemId;
      if (id) {
        const dbItem = await ctx.db.get(id);
        if (dbItem) {
          await ctx.db.patch(id, {
            inventory: Math.max(0, dbItem.inventory - item.quantity),
          });
        }
      }
    }

    return order;
  },
});

// Separate function to decrement inventory for paid orders
export const decrementInventoryForOrder = mutation({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Only decrement inventory if order is paid
    if (order.status !== "paid") {
      throw new Error("Cannot decrement inventory for unpaid order");
    }

    // Decrement inventory for each item
    for (const item of order.items) {
      const id = item.itemId;
      if (id) {
        const dbItem = await ctx.db.get(id);
        if (dbItem) {
          await ctx.db.patch(id, {
            inventory: Math.max(0, dbItem.inventory - item.quantity),
          });
        }
      }
    }

    return order;
  },
});

export const deleteOrder = mutation({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});