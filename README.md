# Underbite - Sandwich Ordering App

A full-stack sandwich ordering web application built with Next.js, Convex, and Stripe.

## Features

- 🍔 **Sandwich Menu**: Browse delicious sandwiches with real-time inventory
- 🛒 **Shopping Cart**: Add items, adjust quantities, and manage your order
- 💳 **Secure Payments**: Stripe integration for safe checkout
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⚡ **Real-time Updates**: Live inventory tracking and order status
- 📊 **Admin Dashboard**: Manage sandwiches, view orders, and track revenue

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Convex (Database, Functions, Real-time)
- **Payments**: Stripe Checkout
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Convex account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd underbite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_url_here

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Seed the database**
   Run the seed function in the Convex dashboard or via the API to add initial sandwich data.

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
underbite/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home page (sandwich menu)
│   │   ├── cart/            # Cart page
│   │   ├── confirmation/    # Payment confirmation
│   │   ├── orders/          # Order history
│   │   ├── help/            # Help & support
│   │   └── admin/           # Admin dashboard
│   ├── components/          # React components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   └── SandwichCard.tsx # Sandwich display card
│   └── lib/                 # Utilities and configurations
│       ├── convex.ts        # Convex client setup
│       └── store.ts         # Zustand cart store
├── convex/                  # Convex backend functions
│   ├── schema.ts            # Database schema
│   ├── sandwiches.ts        # Sandwich operations
│   ├── carts.ts             # Cart operations
│   ├── orders.ts            # Order operations
│   ├── stripe.ts            # Stripe integration
│   └── seed.ts              # Database seeding
└── public/                  # Static assets
```

## Key Features

### Customer Features
- **Browse Menu**: View all available sandwiches with ingredients and prices
- **Real-time Inventory**: See live stock levels and "Sold Out" status
- **Shopping Cart**: Add items, adjust quantities, and view totals
- **Secure Checkout**: Stripe-powered payment processing
- **Order History**: Track your past orders and their status

### Admin Features
- **Dashboard**: Overview of revenue, orders, and inventory
- **Inventory Management**: Track low stock items
- **Order Management**: View and manage customer orders
- **Real-time Updates**: Live data synchronization

### Technical Features
- **Real-time Updates**: Convex provides live data synchronization
- **Type Safety**: Full TypeScript support throughout
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Zustand for cart state persistence
- **Payment Processing**: Secure Stripe integration

## API Endpoints

### Convex Functions
- `sandwiches.getSandwiches` - Get all active sandwiches
- `sandwiches.getSandwich` - Get specific sandwich
- `carts.getCart` - Get user's cart
- `carts.addToCart` - Add item to cart
- `orders.createOrder` - Create new order
- `orders.getOrders` - Get order history
- `stripe.createCheckoutSession` - Create Stripe checkout

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- Set up environment variables
- Build with `npm run build`
- Start with `npm start`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app's URL | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@underbite.com or create an issue in the repository.
