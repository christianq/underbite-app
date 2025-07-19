# 🏷️ Quick Whitelabel Example

## 🚀 Change "Underbite" to "Pizza Palace" in 30 seconds:

### **1. Update `.env.local`:**
```env
# Add these lines to your .env.local file
NEXT_PUBLIC_STORE_NAME="Pizza Palace"
NEXT_PUBLIC_STORE_LOGO="🍕"
NEXT_PUBLIC_PRIMARY_COLOR="red"
NEXT_PUBLIC_STORE_EMAIL="orders@pizzapalace.com"
NEXT_PUBLIC_STORE_PHONE="+1 (555) 123-4567"
NEXT_PUBLIC_STORE_ADDRESS="456 Pizza Ave, Food City, FC 12345"
NEXT_PUBLIC_META_TITLE="Pizza Palace - Online Ordering"
NEXT_PUBLIC_META_DESCRIPTION="Order delicious pizza online from Pizza Palace"
```

### **2. Restart the development server:**
```bash
npm run dev
```

### **3. What changes automatically:**
- ✅ Store name in navbar: "Underbite" → "Pizza Palace"
- ✅ Logo: 🍔 → 🍕
- ✅ Color scheme: Orange → Red
- ✅ Contact information in help page
- ✅ Page titles and meta tags
- ✅ Currency symbols throughout the app

### **4. What you still need to update manually:**
- Product names (sandwiches → pizzas)
- Product images
- Stripe account configuration
- Domain name

## 🎯 Other Quick Examples:

### **Coffee Shop:**
```env
NEXT_PUBLIC_STORE_NAME="Brew & Bean"
NEXT_PUBLIC_STORE_LOGO="☕"
NEXT_PUBLIC_PRIMARY_COLOR="brown"
```

### **Burger Joint:**
```env
NEXT_PUBLIC_STORE_NAME="Burger Barn"
NEXT_PUBLIC_STORE_LOGO="🍔"
NEXT_PUBLIC_PRIMARY_COLOR="orange"
```

### **Taco Shop:**
```env
NEXT_PUBLIC_STORE_NAME="Taco Town"
NEXT_PUBLIC_STORE_LOGO="🌮"
NEXT_PUBLIC_PRIMARY_COLOR="green"
```

## 🎉 That's it!
Your whitelabel store is now branded as "Pizza Palace" instead of "Underbite"!