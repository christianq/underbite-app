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
    sandwichId: v.id("sandwiches"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const { userId, sessionId, sandwichId, quantity } = args;

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
        (item) => item.sandwichId === sandwichId
      );

      const updatedItems = [...cart.items];
      if (existingItemIndex >= 0) {
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        updatedItems.push({ sandwichId, quantity });
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
        items: [{ sandwichId, quantity }],
        updatedAt: Date.now(),
      });
    }
  },
});

export const updateCartItem = mutation({
  args: {
    cartId: v.id("carts"),
    sandwichId: v.id("sandwiches"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const cart = await ctx.db.get(args.cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const updatedItems = cart.items.map((item) =>
      item.sandwichId === args.sandwichId
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
    sandwichId: v.id("sandwiches"),
  },
  handler: async (ctx, args) => {
    const cart = await ctx.db.get(args.cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const updatedItems = cart.items.filter(
      (item) => item.sandwichId !== args.sandwichId
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

export const updateCartItemQuantity = mutation({
  args: {
    sessionId: v.string(),
    sandwichId: v.id("sandwiches"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const { sessionId, sandwichId, quantity } = args;

    // Get existing cart
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .first();

    if (cart) {
      const updatedItems = cart.items.map((item) =>
        item.sandwichId === sandwichId
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

export const getCartCounts = query({
  args: {
    excludeSessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const carts = await ctx.db.query("carts").collect();

    // Count how many of each sandwich are in OTHER users' carts
    const cartCounts: Record<string, number> = {};

    for (const cart of carts) {
      // Skip the current user's cart
      if (args.excludeSessionId && cart.sessionId === args.excludeSessionId) {
        continue;
      }

      for (const item of cart.items) {
        const sandwichId = item.sandwichId;
        cartCounts[sandwichId] = (cartCounts[sandwichId] || 0) + item.quantity;
      }
    }

    return cartCounts;
  },
});