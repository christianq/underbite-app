# 🏷️ Whitelabel Setup Guide

## 🎯 Overview
This app is designed to be a whitelabel solution where you can customize the store name, branding, and business information through environment variables.

## 🔧 Configuration

### **1. Store Information**
Set these environment variables in your `.env.local`:

```env
# Store Identity
NEXT_PUBLIC_STORE_NAME="Your Store Name"
NEXT_PUBLIC_STORE_DESCRIPTION="Your store description"
NEXT_PUBLIC_STORE_TAGLINE="Your catchy tagline"

# Branding
NEXT_PUBLIC_STORE_LOGO="🍕"  # Emoji or URL to logo
NEXT_PUBLIC_PRIMARY_COLOR="orange"  # orange, blue, green, purple, red
NEXT_PUBLIC_ACCENT_COLOR="orange-600"

# Contact Information
NEXT_PUBLIC_STORE_EMAIL="orders@yourstore.com"
NEXT_PUBLIC_STORE_PHONE="+1 (555) 123-4567"
NEXT_PUBLIC_STORE_ADDRESS="123 Main St, City, State 12345"

# Business Settings
NEXT_PUBLIC_CURRENCY="USD"
NEXT_PUBLIC_CURRENCY_SYMBOL="$"
NEXT_PUBLIC_TAX_RATE="0.08"  # 8% tax rate

# Social Media (optional)
NEXT_PUBLIC_STORE_WEBSITE="https://yourstore.com"
NEXT_PUBLIC_INSTAGRAM="yourstore"
NEXT_PUBLIC_FACEBOOK="yourstore"
NEXT_PUBLIC_TWITTER="yourstore"

# Operating Hours
NEXT_PUBLIC_HOURS_MONDAY="9:00 AM - 9:00 PM"
NEXT_PUBLIC_HOURS_TUESDAY="9:00 AM - 9:00 PM"
NEXT_PUBLIC_HOURS_WEDNESDAY="9:00 AM - 9:00 PM"
NEXT_PUBLIC_HOURS_THURSDAY="9:00 AM - 9:00 PM"
NEXT_PUBLIC_HOURS_FRIDAY="9:00 AM - 10:00 PM"
NEXT_PUBLIC_HOURS_SATURDAY="10:00 AM - 10:00 PM"
NEXT_PUBLIC_HOURS_SUNDAY="10:00 AM - 8:00 PM"

# Features (true/false)
NEXT_PUBLIC_ENABLE_DELIVERY="true"
NEXT_PUBLIC_ENABLE_PICKUP="true"
NEXT_PUBLIC_ENABLE_CATERING="false"
NEXT_PUBLIC_ENABLE_LOYALTY="false"

# SEO
NEXT_PUBLIC_META_TITLE="Your Store - Online Ordering"
NEXT_PUBLIC_META_DESCRIPTION="Order delicious food online from Your Store"
NEXT_PUBLIC_META_KEYWORDS="food, delivery, online ordering, your city"
```

### **2. Color Schemes**
Available primary colors:
- `orange` (default)
- `blue`
- `green`
- `purple`
- `red`

### **3. Logo Options**
- **Emoji**: `🍕`, `🍔`, `🥪`, `🌮`, etc.
- **URL**: `https://yourdomain.com/logo.png`
- **Text**: `"YOUR"` (for text-based logos)

## 🚀 Quick Setup Examples

### **Pizza Restaurant**
```env
NEXT_PUBLIC_STORE_NAME="Pizza Palace"
NEXT_PUBLIC_STORE_LOGO="🍕"
NEXT_PUBLIC_PRIMARY_COLOR="red"
NEXT_PUBLIC_STORE_EMAIL="orders@pizzapalace.com"
NEXT_PUBLIC_STORE_PHONE="+1 (555) 123-4567"
NEXT_PUBLIC_STORE_ADDRESS="456 Pizza Ave, Food City, FC 12345"
```

### **Coffee Shop**
```env
NEXT_PUBLIC_STORE_NAME="Brew & Bean"
NEXT_PUBLIC_STORE_LOGO="☕"
NEXT_PUBLIC_PRIMARY_COLOR="brown"
NEXT_PUBLIC_STORE_EMAIL="orders@brewandbean.com"
NEXT_PUBLIC_STORE_PHONE="+1 (555) 987-6543"
NEXT_PUBLIC_STORE_ADDRESS="789 Coffee St, Brew City, BC 54321"
```

### **Burger Joint**
```env
NEXT_PUBLIC_STORE_NAME="Burger Barn"
NEXT_PUBLIC_STORE_LOGO="🍔"
NEXT_PUBLIC_PRIMARY_COLOR="orange"
NEXT_PUBLIC_STORE_EMAIL="orders@burgerbarn.com"
NEXT_PUBLIC_STORE_PHONE="+1 (555) 456-7890"
NEXT_PUBLIC_STORE_ADDRESS="321 Burger Blvd, Meat City, MC 67890"
```

## 📝 What Gets Customized

### **✅ Automatically Updated:**
- Store name in navbar and titles
- Logo/emoji in header
- Contact information in help page
- Operating hours
- Color scheme throughout the app
- Meta tags for SEO
- Currency and tax settings

### **🔧 Manual Updates Needed:**
- Product names and descriptions (in Convex database)
- Product images (upload to your hosting)
- Stripe account (for payments)
- Domain name and hosting

## 🎨 Customization Levels

### **Level 1: Basic Whitelabel**
- Change store name, logo, colors
- Update contact information
- Set operating hours

### **Level 2: Advanced Whitelabel**
- Custom product catalog
- Branded Stripe checkout
- Custom domain
- Social media integration

### **Level 3: Full Customization**
- Custom product categories
- Advanced features (delivery, loyalty, etc.)
- Custom email templates
- Analytics integration

## 🚀 Deployment Steps

1. **Set environment variables** in `.env.local`
2. **Update product data** in Convex database
3. **Configure Stripe** with your account
4. **Deploy to your hosting** (Vercel, Netlify, etc.)
5. **Set up custom domain** (optional)

## 📋 Checklist

- [ ] Store name and description
- [ ] Logo/emoji selection
- [ ] Color scheme
- [ ] Contact information
- [ ] Operating hours
- [ ] Currency and tax settings
- [ ] Product catalog
- [ ] Stripe configuration
- [ ] Domain setup
- [ ] SEO optimization

## 🎯 Benefits

- **Quick setup** - Change branding in minutes
- **Consistent branding** - All components use the same config
- **Scalable** - Easy to deploy multiple stores
- **Maintainable** - Centralized configuration
- **SEO friendly** - Custom meta tags for each store

**Your whitelabel store is ready to go!** 🎉