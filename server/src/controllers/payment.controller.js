import Order from "../models/Order.js";
import { checkoutSchema } from "../schemas/checkout.schema.js";
import { createCheckoutSession } from "../services/stripe.service.js";

export async function createCheckoutSessionController(req, res) {
  try {
    // Validate request body
    const result = checkoutSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid checkout data",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { items, customerEmail } = result.data;

    // Get trusted product data from server-side source
    const trustedItems = await Promise.all(
      items.map(async (item) => {
        const response = await fetch(
          `https://dummyjson.com/products/${item.productId}`
        );

        if (!response.ok) {
          throw new Error(
            `Product ${item.productId} could not be retrieved`
          );
        }

        const product = await response.json();

        return {
          productId: String(product.id),
          title: product.title,
          image: product.thumbnail,
          price: Number(product.price),
          quantity: item.quantity,
        };
      })
    );

    // Calculate subtotal on the server
    const subtotal = trustedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Create pending order
    const order = await Order.create({
      items: trustedItems,
      subtotal,
      currency: "usd",
      paymentStatus: "pending",
      orderStatus: "pending",
      customer: {
        email: customerEmail,
      },
    });

    try {
      // Create Stripe Checkout Session
      const session = await createCheckoutSession({
        items: trustedItems,
        customerEmail,
        orderId: order._id,
      });

      // Save Stripe session ID
      order.stripeSessionId = session.id;

      await order.save();

      return res.status(201).json({
        success: true,
        checkoutUrl: session.url,
        sessionId: session.id,
        orderId: order._id,
      });
    } catch (stripeError) {
      order.paymentStatus = "failed";
      order.orderStatus = "cancelled";

      await order.save();

      throw stripeError;
    }
  } catch (error) {
    console.error("Create checkout session error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create checkout session",
    });
  }
}