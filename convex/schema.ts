import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  items: defineTable({
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
  }).index("by_active", ["isActive"]),

  categories: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
  }),

  orders: defineTable({
    userId: v.optional(v.string()),
    items: v.array(v.object({
      itemId: v.id("items"),
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
      itemId: v.id("items"),
      quantity: v.number(),
    })),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]).index("by_session", ["sessionId"]),

  settings: defineTable({
    // Store Identity
    storeName: v.string(),
    storeDescription: v.string(),
    storeTagline: v.string(),
    heroTitle: v.string(),
    heroSubtitle: v.string(),
    storeLogo: v.string(),
    primaryColor: v.string(),

    // Contact Information
    storeEmail: v.string(),
    storePhone: v.string(),
    storeAddress: v.string(),

    // Business Settings
    currency: v.string(),
    currencySymbol: v.string(),
    taxRate: v.number(),

    // Operating Hours
    hours: v.object({
      monday: v.string(),
      tuesday: v.string(),
      wednesday: v.string(),
      thursday: v.string(),
      friday: v.string(),
      saturday: v.string(),
      sunday: v.string(),
    }),

    // SEO
    metaTitle: v.string(),
    metaDescription: v.string(),
    metaKeywords: v.string(),

    // Social Media
    website: v.string(),
    instagram: v.string(),
    facebook: v.string(),
    twitter: v.string(),

    // Features
    enableDelivery: v.boolean(),
    enablePickup: v.boolean(),
    enableCatering: v.boolean(),
    enableLoyalty: v.boolean(),

    // Store Availability
    showMenu: v.boolean(),
    menuMessage: v.string(),

    updatedAt: v.number(),
  }),
});