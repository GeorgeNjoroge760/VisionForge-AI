import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

let _stripe: Stripe | null = null;
function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return _stripe;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "customer.subscription.created":
      // Handle subscription created
      break;
    case "customer.subscription.updated":
      // Handle subscription updated
      break;
    case "customer.subscription.deleted":
      // Handle subscription deleted
      break;
    case "invoice.payment_succeeded":
      // Handle successful payment
      break;
    case "invoice.payment_failed":
      // Handle failed payment
      break;
  }

  return NextResponse.json({ received: true });
}
