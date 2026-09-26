import { stripe } from "../config/stripe.js";
import { env } from "../config/env.js";

export async function createCheckoutSession({
  items,
  customerEmail,
  orderId,
}) {
  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",

      customer_email: customerEmail,

      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",

          product_data: {
            name: item.title,

            ...(item.image
              ? {
                  images: [item.image],
                }
              : {}),
          },

          unit_amount: Math.round(item.price * 100),
        },

        quantity: item.quantity,
      })),

      success_url:
        `${env.CLIENT_URL}/checkout/success` +
        `?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${env.CLIENT_URL}/checkout/cancel`,

      metadata: {
        orderId: orderId.toString(),
      },

      payment_intent_data: {
        metadata: {
          orderId: orderId.toString(),
        },
      },
    },

    {
      idempotencyKey: `checkout-${orderId}`,
    }
  );

  return session;
}