import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    // ID المنتج الموجود في External API
    productId: {
      type: String,
      required: [true, "Product ID is required"],
      trim: true,
    },

    // Snapshot of product information at purchase time
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: 300,
    },

    image: {
      type: String,
      trim: true,
      maxlength: 2048,
    },

    // Price at the moment of creating the order
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      max: [100, "Quantity cannot exceed 100"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },

    // Calculated by the backend
    subtotal: {
      type: Number,
      required: true,
      min: [0, "Subtotal cannot be negative"],
    },

    currency: {
      type: String,
      required: true,
      default: "usd",
      lowercase: true,
      trim: true,
      enum: ["usd", "eur", "gbp"],
    },

    // Stripe information
    stripeSessionId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    stripePaymentIntentId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "paid",
        "failed",
        "refunded",
        "partially_refunded",
      ],
      default: "pending",
      index: true,
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    customer: {
      email: {
        type: String,
        required: [true, "Customer email is required"],
        lowercase: true,
        trim: true,
        maxlength: 254,
      },
    },

    metadata: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Prevent saving negative/invalid totals
orderSchema.pre("validate", function (next) {
  if (this.subtotal < 0) {
    return next(new Error("Invalid order subtotal"));
  }

  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;