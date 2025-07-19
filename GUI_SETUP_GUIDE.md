# 🖥️ GUI Settings Guide

## 🎯 How to Use the Settings GUI

### **1. Access the Settings Page**
1. Go to `http://localhost:3000/admin`
2. Click on "Store Settings" in the Quick Actions section
3. Or navigate directly to `http://localhost:3000/admin/settings`

### **2. What You Can Customize**

#### **🏪 Store Identity**
- **Store Name**: Change "Underbite" to your store name
- **Store Description**: Brief description of your business
- **Tagline**: Catchy slogan for your store
- **Hero Title**: Main title on the home page (e.g., "Saddle up for flavor")
- **Hero Subtitle**: Subtitle below the main title
- **Logo**: Click on emoji options (🍕, 🍔, ☕, etc.)
- **Primary Color**: Choose from Orange, Blue, Green, Purple, Red

#### **📞 Contact Information**
- **Email**: Your store's email address
- **Phone**: Your store's phone number
- **Address**: Your store's physical address

#### **⚙️ Business Settings**
- **Currency**: USD, EUR, GBP, etc.
- **Currency Symbol**: $, €, £, etc.
- **Tax Rate**: Set your local tax rate
- **Features**: Toggle delivery, pickup, catering, loyalty

#### **🕐 Operating Hours**
- Set hours for each day of the week
- Format: "9:00 AM - 9:00 PM"

#### **🔍 SEO Settings**
- **Page Title**: What appears in browser tabs
- **Meta Description**: Description for search engines
- **Keywords**: SEO keywords for your store

#### **📱 Social Media**
- **Website**: Your main website URL
- **Instagram**: Your Instagram handle
- **Facebook**: Your Facebook page
- **Twitter**: Your Twitter handle

### **3. How to Apply Changes**

1. **Fill out the form** with your store information
2. **Click "Copy Settings"** at the top of the page
3. **Paste the content** into your .env.local file (replace existing content)
4. **Restart your development server**: `npm run dev`
5. **Your store is now rebranded!** 🎉

### **4. Quick Examples**

#### **Pizza Restaurant:**
- Store Name: "Pizza Palace"
- Logo: 🍕
- Primary Color: Red
- Email: orders@pizzapalace.com

#### **Coffee Shop:**
- Store Name: "Brew & Bean"
- Logo: ☕
- Primary Color: Brown
- Email: orders@brewandbean.com

#### **Burger Joint:**
- Store Name: "Burger Barn"
- Logo: 🍔
- Primary Color: Orange
- Email: orders@burgerbarn.com

### **5. Tips**

- **Start with Store Identity** - This affects the most visible parts
- **Use realistic contact info** - Customers will see this
- **Set proper hours** - Important for customer expectations
- **Choose appropriate colors** - Match your brand
- **Test after changes** - Make sure everything looks right

### **6. Troubleshooting**

- **Changes not appearing?** Make sure you restarted the dev server
- **File not downloading?** Check your browser's download settings
- **Form not saving?** Try refreshing the page and try again

## 🎉 That's it!

Your GUI makes it super easy to rebrand your store without touching any code!