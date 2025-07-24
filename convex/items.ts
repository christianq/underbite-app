import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getItems = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("items").collect();
  },
});

export const getItem = query({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createItem = mutation({
  args: {
    name: v.string(),
    ingredients: v.array(v.string()),
    price: v.number(),
    inventory: v.number(),
    image: v.optional(v.string()),
    description: v.optional(v.string()),
    isActive: v.boolean(),
    categoryId: v.optional(v.id("categories")),
    showQty: v.optional(v.boolean()),
    emoji: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("items", {
      ...args,
      showQty: args.showQty !== undefined ? args.showQty : true,
    });
  },
});

export const updateItem = mutation({
  args: {
    id: v.id("items"),
    name: v.optional(v.string()),
    ingredients: v.optional(v.array(v.string())),
    price: v.optional(v.number()),
    inventory: v.optional(v.number()),
    image: v.optional(v.string()),
    description: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    categoryId: v.optional(v.id("categories")),
    showQty: v.optional(v.boolean()),
    emoji: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const deleteItem = mutation({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});