# 🔧 Stripe Setup Guide

## 🚨 Current Issue
The Stripe integration is failing because the API keys are not set in your Convex environment.

## 📋 Steps to Fix

### 1. **Get Your Stripe Keys**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Make sure you're in **Test mode** (toggle in top right)
3. Copy these keys:
   - **Secret key**: `sk_test_...` (starts with sk_test_)
   - **Publishable key**: `pk_test_...` (starts with pk_test_)

### 2. **Set Environment Variables in Convex**

Run these commands with your actual keys:

```bash
# Set the Stripe secret key
npx convex env set STRIPE_SECRET_KEY "sk_test_your_actual_secret_key_here"

# Set the publishable key (for frontend)
npx convex env set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "pk_test_your_actual_publishable_key_here"

# Set the app URL
npx convex env set NEXT_PUBLIC_APP_URL "http://localhost:3000"
```

### 3. **Verify the Setup**

```bash
# Check that the variables are set
npx convex env list
```

### 4. **Test the Integration**

After setting the keys:
1. Refresh your app at `http://localhost:3000`
2. Add items to cart
3. Try the checkout process
4. Use test card: `4242 4242 4242 4242`

## 🔑 Example Keys (Test Mode)
- **Secret**: `sk_test_your_actual_secret_key_here`
- **Publishable**: `pk_test_your_actual_publishable_key_here`

## ⚠️ Important Notes
- Use **test keys** for development
- Never commit real keys to git
- The keys above are examples - use your own from Stripe dashboard
- Make sure you're in **test mode** in Stripe dashboard

## 🎯 After Setup
Once you've set the keys, the checkout process should work perfectly!