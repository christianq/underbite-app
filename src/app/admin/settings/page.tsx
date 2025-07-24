"use client";

import { useState, useEffect } from "react";
import { Store, Mail, Clock, Globe, Settings, Copy } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface SettingsForm {
  // Store Identity
  storeName: string;
  storeDescription: string;
  storeTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  storeLogo: string;
  primaryColor: string;

  // Contact Information
  storeEmail: string;
  storePhone: string;
  storeAddress: string;

  // Business Settings
  currency: string;
  currencySymbol: string;
  taxRate: string;

  // Operating Hours
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  // Social Media
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;

  // Features
  enableDelivery: boolean;
  enablePickup: boolean;
  enableCatering: boolean;
  enableLoyalty: boolean;

  // Menu Display
  showMenu: boolean;
  menuMessage: string;
}

export default function SettingsPage() {
  const settings = useQuery(api.settings.getSettings);
  const updateSettings = useMutation(api.settings.updateSettings);

  const [form, setForm] = useState<SettingsForm>({
    storeName: "",
    storeDescription: "",
    storeTagline: "",
    heroTitle: "",
    heroSubtitle: "",
    storeLogo: "",
    primaryColor: "",
    storeEmail: "",
    storePhone: "",
    storeAddress: "",
    currency: "",
    currencySymbol: "",
    taxRate: "",
    hours: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    website: "",
    instagram: "",
    facebook: "",
    twitter: "",
    enableDelivery: true,
    enablePickup: true,
    enableCatering: false,
    enableLoyalty: false,
    showMenu: true,
    menuMessage: "",
  });

  // Load settings from database when available
  useEffect(() => {
    if (settings) {
      setForm({
        storeName: settings.storeName,
        storeDescription: settings.storeDescription,
        storeTagline: settings.storeTagline,
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        storeLogo: settings.storeLogo,
        primaryColor: settings.primaryColor,
        storeEmail: settings.storeEmail,
        storePhone: settings.storePhone,
        storeAddress: settings.storeAddress,
        currency: settings.currency,
        currencySymbol: settings.currencySymbol,
        taxRate: settings.taxRate.toString(),
        hours: settings.hours,
        metaTitle: settings.metaTitle,
        metaDescription: settings.metaDescription,
        metaKeywords: settings.metaKeywords,
        website: settings.website,
        instagram: settings.instagram,
        facebook: settings.facebook,
        twitter: settings.twitter,
        enableDelivery: settings.enableDelivery,
        enablePickup: settings.enablePickup,
        enableCatering: settings.enableCatering,
        enableLoyalty: settings.enableLoyalty,
        showMenu: settings.showMenu,
        menuMessage: settings.menuMessage,
      });
    }
  }, [settings]);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHoursChange = (day: string, value: string) => {
    setForm(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      await updateSettings({
        storeName: form.storeName,
        storeDescription: form.storeDescription,
        storeTagline: form.storeTagline,
        heroTitle: form.heroTitle,
        heroSubtitle: form.heroSubtitle,
        storeLogo: form.storeLogo,
        primaryColor: form.primaryColor,
        storeEmail: form.storeEmail,
        storePhone: form.storePhone,
        storeAddress: form.storeAddress,
        currency: form.currency,
        currencySymbol: form.currencySymbol,
        taxRate: parseFloat(form.taxRate),
        hours: form.hours,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        metaKeywords: form.metaKeywords,
        website: form.website,
        instagram: form.instagram,
        facebook: form.facebook,
        twitter: form.twitter,
        enableDelivery: form.enableDelivery,
        enablePickup: form.enablePickup,
        enableCatering: form.enableCatering,
        enableLoyalty: form.enableLoyalty,
        showMenu: form.showMenu,
        menuMessage: form.menuMessage,
      });

      setSaveMessage("✅ Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveMessage("❌ Error saving settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const colorOptions = [
    { value: "orange", label: "Orange", class: "bg-orange-500" },
    { value: "blue", label: "Blue", class: "bg-blue-500" },
    { value: "green", label: "Green", class: "bg-green-500" },
    { value: "purple", label: "Purple", class: "bg-purple-500" },
    { value: "red", label: "Red", class: "bg-red-500" },
  ];

  const logoOptions = [
    { value: "🍔", label: "Burger" },
    { value: "🍕", label: "Pizza" },
    { value: "🥪", label: "Sandwich" },
    { value: "🌮", label: "Taco" },
    { value: "☕", label: "Coffee" },
    { value: "🍦", label: "Ice Cream" },
    { value: "🍰", label: "Cake" },
    { value: "🥗", label: "Salad" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-playfair">Store Settings</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
        >
          <Copy size={20} />
          <span>{isSaving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      {saveMessage && (
        <div className={`mb-6 p-4 rounded-lg ${
          saveMessage.includes("✅") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
        }`}>
          {saveMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Store Identity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Store size={24} className="text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">Store Identity</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name
              </label>
              <input
                type="text"
                value={form.storeName}
                onChange={(e) => handleInputChange("storeName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your Store Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Description
              </label>
              <textarea
                value={form.storeDescription}
                onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={3}
                placeholder="Brief description of your store"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={form.storeTagline}
                onChange={(e) => handleInputChange("storeTagline", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your catchy tagline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Title
              </label>
              <input
                type="text"
                value={form.heroTitle}
                onChange={(e) => handleInputChange("heroTitle", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Main page title (e.g., Saddle up for flavor)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Subtitle
              </label>
              <textarea
                value={form.heroSubtitle}
                onChange={(e) => handleInputChange("heroSubtitle", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={2}
                placeholder="Subtitle below the main title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo (Emoji)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {logoOptions.map((logo) => (
                  <button
                    key={logo.value}
                    onClick={() => handleInputChange("storeLogo", logo.value)}
                    className={`p-3 text-2xl rounded-lg border-2 ${
                      form.storeLogo === logo.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {logo.value}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleInputChange("primaryColor", color.value)}
                    className={`p-3 rounded-lg border-2 ${
                      form.primaryColor === color.value
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded ${color.class}`}></div>
                    <span className="text-xs mt-1 block">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Mail size={24} className="text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">Contact Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.storeEmail}
                onChange={(e) => handleInputChange("storeEmail", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="orders@yourstore.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={form.storePhone}
                onChange={(e) => handleInputChange("storePhone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={form.storeAddress}
                onChange={(e) => handleInputChange("storeAddress", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={3}
                placeholder="123 Main St, City, State 12345"
              />
            </div>
          </div>
        </div>

        {/* Business Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Settings size={24} className="text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">Business Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <input
                  type="text"
                  value={form.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="USD"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  value={form.currencySymbol}
                  onChange={(e) => handleInputChange("currencySymbol", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="$"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.taxRate}
                onChange={(e) => handleInputChange("taxRate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="8.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="space-y-2">
                {[
                  { key: "enableDelivery", label: "Enable Delivery" },
                  { key: "enablePickup", label: "Enable Pickup" },
                  { key: "enableCatering", label: "Enable Catering" },
                  { key: "enableLoyalty", label: "Enable Loyalty Program" },
                ].map((feature) => (
                  <label key={feature.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={form[feature.key as keyof SettingsForm] as boolean}
                      onChange={(e) => handleInputChange(feature.key, e.target.checked)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{feature.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Clock size={24} className="text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">Operating Hours</h2>
          </div>

          <div className="space-y-3">
            {Object.entries(form.hours).map(([day, hours]) => (
              <div key={day}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {day}
                </label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => handleHoursChange(day, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="9:00 AM - 9:00 PM"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Globe size={24} className="text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">SEO Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your Store - Online Ordering"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={form.metaDescription}
                onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={3}
                placeholder="Order delicious food online from Your Store"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <input
                type="text"
                value={form.metaKeywords}
                onChange={(e) => handleInputChange("metaKeywords", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="food, delivery, online ordering, your city"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Globe size={24} className="text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">Social Media</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="https://yourstore.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="text"
                value={form.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="yourstore"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="text"
                value={form.facebook}
                onChange={(e) => handleInputChange("facebook", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="yourstore"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter
              </label>
              <input
                type="text"
                value={form.twitter}
                onChange={(e) => handleInputChange("twitter", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="yourstore"
              />
            </div>
          </div>
        </div>

        {/* Menu Display Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Settings size={24} className="text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900 font-playfair">Store Availability</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Status
              </label>
              <select
                value={form.showMenu ? "true" : "false"}
                onChange={(e) => handleInputChange("showMenu", e.target.value === "true")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="true">Store Open</option>
                <option value="false">Store Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Closed Message
              </label>
              <textarea
                value={form.menuMessage}
                onChange={(e) => handleInputChange("menuMessage", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={3}
                placeholder="Message to display when store is closed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Apply Changes</h3>
        <ol className="text-blue-800 space-y-1">
          <li>1. Click "Save Settings" to save your changes to the database.</li>
          <li>2. Your store will automatically reload with the new settings.</li>
          <li>3. No need to restart your dev server.</li>
        </ol>
      </div>
    </div>
  );
}