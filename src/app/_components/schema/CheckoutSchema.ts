import { z } from "zod";

export const checkoutSchema = z.object({
  details: z.string().min(3, "Details must be at least 3 characters"),
  city: z.string().min(2, "City is required"),
  phone: z
    .string()
    .regex(/^\+?\d{10,14}$/, "Phone number is invalid"),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
