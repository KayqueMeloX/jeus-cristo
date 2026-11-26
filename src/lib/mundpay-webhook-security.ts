import { z } from "zod";

const cents = z.union([z.number(), z.string().regex(/^\d+(?:\.\d+)?$/)])
  .refine((value) => Number.isFinite(Number(value)) && Number(value) >= 0);
const offerSchema = z.object({
  id: z.string().max(100).optional(),
  name: z.string().max(500).optional(),
  price: cents,
  type: z.string().max(40).optional(),
  sku: z.string().max(100).optional(),
});
const saleSchema = z.object({
  id: z.string().uuid(),
  status: z.string().min(1).max(60).optional(),
  amount: cents,
  currency: z.string().regex(/^[A-Za-z]{3}$/).optional(),
  customer: z.object({
    email: z.string().trim().email().max(254),
    name: z.string().max(200).optional(),
    phone: z.string().max(50).optional(),
  }),
  offers: z.array(offerSchema).min(1).max(30),
  tracking: z.record(z.union([z.string().max(2000), z.null()])).optional(),
});

/** Accept the documented flat payload and the previously supported data envelope. */
export const mundpayWebhookSchema = z.union([
  saleSchema.extend({ status: z.string().min(1).max(60) }),
  z.object({ event: z.string().max(60).optional(), data: saleSchema })
    .refine((body) => Boolean(body.data.status || body.event)),
]);

/** Fail closed; this shared URL credential replaces the unconfirmed orders API. */
export async function authorizeMundpayWebhook(
  request: Request,
  secret: string | undefined,
): Promise<Response | null> {
  if (!secret || secret.length < 32) {
    return new Response("Webhook security not configured", { status: 503 });
  }
  const supplied = new URL(request.url).searchParams.get("token");
  if (!supplied || supplied.length > 512) {
    return new Response("Unauthorized", { status: 401 });
  }
  // Compare fixed-length digests without an early mismatch exit.
  const encoder = new TextEncoder();
  const [expected, actual] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(secret)),
    crypto.subtle.digest("SHA-256", encoder.encode(supplied)),
  ]);
  const expectedBytes = new Uint8Array(expected);
  const actualBytes = new Uint8Array(actual);
  let difference = 0;
  for (let i = 0; i < expectedBytes.length; i += 1) {
    difference |= (expectedBytes[i] ?? 0) ^ (actualBytes[i] ?? 0);
  }
  return difference === 0 ? null : new Response("Unauthorized", { status: 401 });
}