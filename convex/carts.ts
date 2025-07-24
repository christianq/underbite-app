import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCart = query({
  args: {
    userId: v.optional(v.string()),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.userId) {
      return await ctx.db
        .query("carts")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .first();
    } else if (args.sessionId) {
      return await ctx.db
        .query("carts")
        .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
        .first();
    }
    return null;
  },
});

export const addToCart = mutation({
  args: {
    userId: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    itemId: v.id("items"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const { userId, sessionId, itemId, quantity } = args;

    // Get existing cart
    let cart = null;
    if (userId) {
      cart = await ctx.db
        .query("carts")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .first();
    } else if (sessionId) {
      cart = await ctx.db
        .query("carts")
        .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
        .first();
    }

    if (cart) {
      // Update existing cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.itemId === itemId
      );

      const updatedItems = [...cart.items];
      if (existingItemIndex >= 0) {
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        updatedItems.push({ itemId, quantity });
      }

      return await ctx.db.patch(cart._id, {
        items: updatedItems,
        updatedAt: Date.now(),
      });
    } else {
      // Create new cart
      return await ctx.db.insert("carts", {
        userId,
        sessionId,
        items: [{ itemId, quantity }],
        updatedAt: Date.now(),
      });
    }
  },
});

export const updateCartItem = mutation({
  args: {
    cartId: v.id("carts"),
    itemId: v.id("items"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const cart = await ctx.db.get(args.cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const updatedItems = cart.items.map((item) =>
      item.itemId === args.itemId
        ? { ...item, quantity: args.quantity }
        : item
    );

    return await ctx.db.patch(args.cartId, {
      items: updatedItems,
      updatedAt: Date.now(),
    });
  },
});

export const removeFromCart = mutation({
  args: {
    cartId: v.id("carts"),
    itemId: v.id("items"),
  },
  handler: async (ctx, args) => {
    const cart = await ctx.db.get(args.cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const updatedItems = cart.items.filter(
      (item) => item.itemId !== args.itemId
    );

    return await ctx.db.patch(args.cartId, {
      items: updatedItems,
      updatedAt: Date.now(),
    });
  },
});

export const clearCart = mutation({
  args: { cartId: v.id("carts") },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.cartId, {
      items: [],
      updatedAt: Date.now(),
    });
  },
});

export const clearCartBySession = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();

    if (cart) {
      return await ctx.db.delete(cart._id);
    }
    return null;
  },
});

export const updateCartItemQuantity = mutation({
  args: {
    sessionId: v.string(),
    itemId: v.id("items"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const { sessionId, itemId, quantity } = args;

    // Get existing cart
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .first();

    if (cart) {
      const updatedItems = cart.items.map((item) =>
        item.itemId === itemId
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0); // Remove items with quantity 0

      return await ctx.db.patch(cart._id, {
        items: updatedItems,
        updatedAt: Date.now(),
      });
    }
    return null;
  },
});

export const clearAbandonedCarts = mutation({
  args: {
    maxAgeMinutes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const maxAgeMinutes = args.maxAgeMinutes || 60; // Default 60 minutes (increased from 30)
    const cutoffTime = Date.now() - (maxAgeMinutes * 60 * 1000);

    const carts = await ctx.db.query("carts").collect();
    let deletedCount = 0;

    for (const cart of carts) {
      // Check if cart is older than the cutoff time
      if (cart.updatedAt && cart.updatedAt < cutoffTime) {
        await ctx.db.delete(cart._id);
        deletedCount++;
      }
    }

    return { deleted: deletedCount };
  },
});



