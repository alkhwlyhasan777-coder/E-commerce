import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order items are required",
      });
    }
    const orderItems = [];

    for (const item of items) {
      const { productId, quantity } = item;

      if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({
          message: "Invalid productId or quantity",
        });
      }

      // Get product from DummyJSON
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );

      if (!response.ok) {
        return res.status(404).json({
          message: `Product ${productId} not found`,
        });
      }

      const product = await response.json();

      orderItems.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity,
      });
    }

    // Calculate total on backend
    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      items: orderItems,
      total,
      currency: "usd",
    });

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      message: "Failed to create order",
    });
  }
};