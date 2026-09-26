import { z } from "zod";

const checkoutItemSchema = z.object({
  productId: z
    .string()
    .trim()
    .min(1, "Product ID is required")
    .max(100, "Product ID is too long"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1")
    .max(100, "Quantity cannot exceed 100"),
});

export const checkoutSchema = z.object({
  items: z
    .array(checkoutItemSchema)
    .min(1, "Cart cannot be empty")
    .max(50, "Cart cannot contain more than 50 products"),

  customerEmail: z
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .max(254, "Email is too long"),
});