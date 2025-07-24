import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSettings = query({
  args: {},
  handler: async (ctx) => {
    // Get the first (and should be only) settings record
    const settings = await ctx.db.query("settings").first();
    return settings;
  },
});

export const createSettings = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("settings", {
      ...args,
      updatedAt: Date.now(),
    });
  },
});

export const updateSettings = mutation({
  args: {
    // Store Identity
    storeName: v.optional(v.string()),
    storeDescription: v.optional(v.string()),
    storeTagline: v.optional(v.string()),
    heroTitle: v.optional(v.string()),
    heroSubtitle: v.optional(v.string()),
    storeLogo: v.optional(v.string()),
    primaryColor: v.optional(v.string()),

    // Contact Information
    storeEmail: v.optional(v.string()),
    storePhone: v.optional(v.string()),
    storeAddress: v.optional(v.string()),

    // Business Settings
    currency: v.optional(v.string()),
    currencySymbol: v.optional(v.string()),
    taxRate: v.optional(v.number()),

    // Operating Hours
    hours: v.optional(v.object({
      monday: v.string(),
      tuesday: v.string(),
      wednesday: v.string(),
      thursday: v.string(),
      friday: v.string(),
      saturday: v.string(),
      sunday: v.string(),
    })),

    // SEO
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    metaKeywords: v.optional(v.string()),

    // Social Media
    website: v.optional(v.string()),
    instagram: v.optional(v.string()),
    facebook: v.optional(v.string()),
    twitter: v.optional(v.string()),

    // Features
    enableDelivery: v.optional(v.boolean()),
    enablePickup: v.optional(v.boolean()),
    enableCatering: v.optional(v.boolean()),
    enableLoyalty: v.optional(v.boolean()),

    // Store Availability
    showMenu: v.optional(v.boolean()),
    menuMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get the first settings record
    const settings = await ctx.db.query("settings").first();

    if (settings) {
      // Update existing settings
      return await ctx.db.patch(settings._id, {
        ...args,
        updatedAt: Date.now(),
      });
    } else {
      // Create new settings with defaults for missing fields
      const defaultSettings = {
        storeName: "Cowboy Picnic",
        storeDescription: "Saddle up for flavor",
        storeTagline: "Sandwiches done the cowboy picnic way",
        heroTitle: "Saddle up for flavor",
        heroSubtitle: "Sandwiches done the cowboy picnic way. Order your favorite today!",
        storeLogo: "🤠",
        primaryColor: "orange",
        storeEmail: "orders@underbite.com",
        storePhone: "+1 (555) 123-4567",
        storeAddress: "123 Main St, City, State 12345",
        currency: "USD",
        currencySymbol: "$",
        taxRate: 0,
        hours: {
          monday: "9:00 AM - 9:00 PM",
          tuesday: "9:00 AM - 9:00 PM",
          wednesday: "9:00 AM - 9:00 PM",
          thursday: "9:00 AM - 9:00 PM",
          friday: "9:00 AM - 10:00 PM",
          saturday: "10:00 AM - 10:00 PM",
          sunday: "10:00 AM - 8:00 PM",
        },
        metaTitle: "Cowboy Picnic - Sandwich Ordering",
        metaDescription: "Saddle up for flavor with our cowboy-themed sandwiches",
        metaKeywords: "sandwiches, cowboy, food delivery, online ordering",
        website: "https://underbite.com",
        instagram: "",
        facebook: "",
        twitter: "",
        enableDelivery: true,
        enablePickup: true,
        enableCatering: false,
        enableLoyalty: false,
        showMenu: true,
        menuMessage: "Our store is currently closed. Please check back soon!",
        updatedAt: Date.now(),
      };

      return await ctx.db.insert("settings", {
        ...defaultSettings,
        ...args,
      });
    }
  },
});