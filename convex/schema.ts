import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sandwiches: defineTable({
    name: v.string(),
    ingredients: v.array(v.string()),
    price: v.number(),
    inventory: v.number(),
    image: v.optional(v.string()),
    description: v.optional(v.string()),
    isActive: v.boolean(),
  }).index("by_active", ["isActive"]),

  orders: defineTable({
    userId: v.optional(v.string()),
    items: v.array(v.object({
      sandwichId: v.id("sandwiches"),
      quantity: v.number(),
      price: v.number(),
      name: v.string(),
    })),
    total: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    stripeSessionId: v.optional(v.string()),
    customerEmail: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]).index("by_status", ["status"]),

  carts: defineTable({
    userId: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    items: v.array(v.object({
      sandwichId: v.id("sandwiches"),
      quantity: v.number(),
    })),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]).index("by_session", ["sessionId"]),
});