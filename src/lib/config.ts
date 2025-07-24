"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Fallback configuration from environment variables
const fallbackConfig = {
  // Store Information
  name: process.env.NEXT_PUBLIC_STORE_NAME || "Cowboy Picnic",
  description: process.env.NEXT_PUBLIC_STORE_DESCRIPTION || "Saddle up for flavor",
  tagline: process.env.NEXT_PUBLIC_STORE_TAGLINE || "Sandwiches done the cowboy picnic way",
  heroTitle: process.env.NEXT_PUBLIC_HERO_TITLE || "Saddle up for flavor",
  heroSubtitle: process.env.NEXT_PUBLIC_HERO_SUBTITLE || "Sandwiches done the cowboy picnic way. Order your favorite today!",

  // Branding
  logo: process.env.NEXT_PUBLIC_STORE_LOGO || "🤠",
  primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "brown",
  accentColor: process.env.NEXT_PUBLIC_ACCENT_COLOR || "orange-600",

  // Contact Information
  email: process.env.NEXT_PUBLIC_STORE_EMAIL || "orders@underbite.com",
  phone: process.env.NEXT_PUBLIC_STORE_PHONE || "+1 (555) 123-4567",
  address: process.env.NEXT_PUBLIC_STORE_ADDRESS || "123 Main St, City, State 12345",

  // Business Information
  currency: process.env.NEXT_PUBLIC_CURRENCY || "USD",
  currencySymbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$",
  taxRate: parseFloat(process.env.NEXT_PUBLIC_TAX_RATE || "0"),

  // Social Media
  website: process.env.NEXT_PUBLIC_STORE_WEBSITE || "https://underbite.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || "",
  twitter: process.env.NEXT_PUBLIC_TWITTER || "",

  // Operating Hours
  hours: {
    monday: process.env.NEXT_PUBLIC_HOURS_MONDAY || "9:00 AM - 9:00 PM",
    tuesday: process.env.NEXT_PUBLIC_HOURS_TUESDAY || "9:00 AM - 9:00 PM",
    wednesday: process.env.NEXT_PUBLIC_HOURS_WEDNESDAY || "9:00 AM - 9:00 PM",
    thursday: process.env.NEXT_PUBLIC_HOURS_THURSDAY || "9:00 AM - 9:00 PM",
    friday: process.env.NEXT_PUBLIC_HOURS_FRIDAY || "9:00 AM - 10:00 PM",
    saturday: process.env.NEXT_PUBLIC_HOURS_SATURDAY || "10:00 AM - 10:00 PM",
    sunday: process.env.NEXT_PUBLIC_HOURS_SUNDAY || "10:00 AM - 8:00 PM",
  },

  // Features
  features: {
    delivery: process.env.NEXT_PUBLIC_ENABLE_DELIVERY === "true",
    pickup: process.env.NEXT_PUBLIC_ENABLE_PICKUP === "true",
    catering: process.env.NEXT_PUBLIC_ENABLE_CATERING === "true",
    loyalty: process.env.NEXT_PUBLIC_ENABLE_LOYALTY === "true",
  },

  // Menu Display
  menu: {
    showMenu: process.env.NEXT_PUBLIC_SHOW_MENU !== "false", // Default to true
    menuMessage: process.env.NEXT_PUBLIC_MENU_MESSAGE || "Our store is currently closed. Please check back soon!",
  },

  // SEO
  meta: {
    title: process.env.NEXT_PUBLIC_META_TITLE || "Cowboy Picnic - Sandwich Ordering",
    description: process.env.NEXT_PUBLIC_META_DESCRIPTION || "Saddle up for flavor with our cowboy-themed sandwiches",
    keywords: process.env.NEXT_PUBLIC_META_KEYWORDS || "sandwiches, cowboy, food delivery, online ordering",
  },
};

// Hook to get settings from database with fallback
export const useStoreConfig = () => {
  const settings = useQuery(api.settings.getSettings);

  if (!settings) {
    return fallbackConfig;
  }

  return {
    // Store Information
    name: settings.storeName,
    description: settings.storeDescription,
    tagline: settings.storeTagline,
    heroTitle: settings.heroTitle,
    heroSubtitle: settings.heroSubtitle,

    // Branding
    logo: settings.storeLogo,
    primaryColor: settings.primaryColor,
    accentColor: fallbackConfig.accentColor,

    // Contact Information
    email: settings.storeEmail,
    phone: settings.storePhone,
    address: settings.storeAddress,

    // Business Information
    currency: settings.currency,
    currencySymbol: settings.currencySymbol,
    taxRate: settings.taxRate,

    // Social Media
    website: settings.website,
    instagram: settings.instagram,
    facebook: settings.facebook,
    twitter: settings.twitter,

    // Operating Hours
    hours: settings.hours,

    // Features
    features: {
      delivery: settings.enableDelivery,
      pickup: settings.enablePickup,
      catering: settings.enableCatering,
      loyalty: settings.enableLoyalty,
    },

    // Menu Display
    menu: {
      showMenu: settings.showMenu,
      menuMessage: settings.menuMessage,
    },

    // SEO
    meta: {
      title: settings.metaTitle,
      description: settings.metaDescription,
      keywords: settings.metaKeywords,
    },
  };
};

// Legacy export for backward compatibility
export const storeConfig = fallbackConfig;

// Helper function to get CSS classes based on primary color
export const getColorClasses = () => {
  const color = storeConfig.primaryColor;
  switch (color) {
    case "blue":
      return {
        primary: "bg-blue-600 hover:bg-blue-700",
        text: "text-blue-600",
        border: "border-blue-600",
        accent: "text-blue-600",
      };
    case "green":
      return {
        primary: "bg-green-600 hover:bg-green-700",
        text: "text-green-600",
        border: "border-green-600",
        accent: "text-green-600",
      };
    case "purple":
      return {
        primary: "bg-purple-600 hover:bg-purple-700",
        text: "text-purple-600",
        border: "border-purple-600",
        accent: "text-purple-600",
      };
    case "red":
      return {
        primary: "bg-red-600 hover:bg-red-700",
        text: "text-red-600",
        border: "border-red-600",
        accent: "text-red-600",
      };
    default: // orange
      return {
        primary: "bg-orange-600 hover:bg-orange-700",
        text: "text-orange-600",
        border: "border-orange-600",
        accent: "text-orange-600",
      };
  }
};