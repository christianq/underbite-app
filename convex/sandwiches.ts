import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSandwiches = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("sandwiches")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();
  },
});

export const getSandwich = query({
  args: { id: v.id("sandwiches") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createSandwich = mutation({
  args: {
    name: v.string(),
    ingredients: v.array(v.string()),
    price: v.number(),
    inventory: v.number(),
    image: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sandwiches", {
      ...args,
      isActive: true,
    });
  },
});

export const updateSandwich = mutation({
  args: {
    id: v.id("sandwiches"),
    name: v.optional(v.string()),
    ingredients: v.optional(v.array(v.string())),
    price: v.optional(v.number()),
    inventory: v.optional(v.number()),
    image: v.optional(v.string()),
    description: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const deleteSandwich = mutation({
  args: { id: v.id("sandwiches") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const decrementInventory = mutation({
  args: {
    sandwichId: v.id("sandwiches"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const sandwich = await ctx.db.get(args.sandwichId);
    if (!sandwich) {
      throw new Error("Sandwich not found");
    }

    const newInventory = Math.max(0, sandwich.inventory - args.quantity);
    return await ctx.db.patch(args.sandwichId, { inventory: newInventory });
  },
});