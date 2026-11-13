import { z } from "zod";

/** A customer support message. The email is mandatory so the owner can reply. */
export const supportMessageSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  name: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(4000),
  page: z.string().max(500).optional(),
});
