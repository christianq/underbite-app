import { action } from "./_generated/server";
import { v } from "convex/values";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-06-30.basil",
    })
  : null;

export const createCheckoutSession = action({
  args: {
    orderId: v.id("orders"),
    items: v.array(v.object({
      name: v.string(),
      quantity: v.number(),
      price: v.number(),
    })),
    customerEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!stripe) {
      throw new Error("Stripe is not configured");
    }

    const { orderId, items, customerEmail } = args;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      customer_email: customerEmail,
      metadata: {
        orderId,
      },
    });

    return session;
  },
});

export const getSession = action({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    if (!stripe) {
      throw new Error("Stripe is not configured");
    }

    const session = await stripe.checkout.sessions.retrieve(args.sessionId);
    return session;
  },
});