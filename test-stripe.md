# 🧪 Stripe Integration Test Guide

## ✅ Current Status
- ✅ Stripe keys added to `.env.local`
- ✅ Convex functions deployed successfully
- ✅ Database seeded with 6 sandwiches
- ✅ App running at `http://localhost:3000`
- ✅ Fixed Stripe action call (useAction instead of useMutation)
- ✅ Fixed hydration error (client-side cart count)
- ✅ Fixed order status flow (pending → paid)
- ✅ Updated order history (only shows paid orders)
- ✅ Added admin order management (shows all orders)
- ✅ Enhanced inventory management (only decrements for paid orders)

## 🧪 Testing Steps

### 1. **Visit the App**
Open `http://localhost:3000` in your browser

### 2. **Browse Sandwiches**
- You should see 6 sandwiches loaded from the database
- Each sandwich shows: name, ingredients, price, inventory
- "Add to Cart" buttons should be functional

### 3. **Test Shopping Cart**
- Click "Add to Cart" on any sandwich
- Navigate to `/cart` to see your items
- Adjust quantities using +/- buttons
- View the total calculation

### 4. **Test Stripe Checkout**
- In the cart, click "Proceed to Checkout"
- You should be redirected to Stripe Checkout
- Use these test card numbers:
  - **Success**: `4242 4242 4242 4242`
  - **Decline**: `4000 0000 0000 0002`
  - **Expiry**: Any future date
  - **CVC**: Any 3 digits

### 5. **Test Payment Flow**
- Complete the Stripe checkout
- You should be redirected to `/confirmation`
- The order status will change from "pending" to "paid"
- Check that inventory decreases after successful payment
- Verify order appears in `/orders` with "paid" status

## 🔍 Expected Behavior

### ✅ Working Features
- Real-time inventory tracking
- "Sold Out" status for items with 0 inventory
- Shopping cart with quantity controls
- Stripe checkout integration
- Order confirmation and history (only shows paid orders)
- Admin dashboard with metrics
- Admin order management (shows all orders including pending)
- **Inventory only decrements after successful payment**

### ⚠️ Potential Issues
- If sandwiches don't load, check Convex connection
- If Stripe checkout fails, verify keys are correct
- If inventory doesn't update, check Convex functions

## 🎯 Success Criteria

1. **Sandwiches Load**: 6 sandwiches visible on home page
2. **Cart Works**: Can add items and adjust quantities
3. **Stripe Redirects**: Checkout button redirects to Stripe
4. **Payment Completes**: Can complete test payment
5. **Inventory Updates**: Stock decreases after successful payment
6. **Order History**: Order appears in `/orders` page (only after payment)
7. **Admin Orders**: All orders visible in `/admin/orders` (including pending)

## 🚀 Ready for Production

Once testing is complete, the app is ready for:
- Production deployment
- Real Stripe keys (live mode)
- Custom domain setup
- Additional features

The app demonstrates all requested features with a complete e-commerce flow!