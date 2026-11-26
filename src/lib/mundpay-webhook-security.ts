import { z } from "zod";

// Mundpay sends null for absent optional fields, so secondary fields accept null or undefined.
const cents = z.union([z.number(), z.string().regex(/^\d+(?:\.\d+)?$/)])
  .refine((value) => Number.isFinite(Number(value)) && Number(value) >= 0);
const offerSchema = z.object({
  id: z.string().max(100).nullish(),
  name: z.string().max(500).nullish(),
  price: cents.nullish(),
  type: z.string().max(40).nullish(),
  sku: z.string().max(100).nullish(),
}).passthrough();
const saleSchema = z.object({
  id: z.string().trim().min(1).max(100),
  status: z.string().max(60).nullish(),
  event_type: z.string().max(60).nullish(),
  amount: cents.nullish(),
  currency: z.string().regex(/^[A-Za-z]{3}$/).nullish(),
  customer: z.object({
    email: z.string().trim().email().max(254),
    name: z.string().max(200).nullish(),
    phone: z.string().max(50).nullish(),
  }).passthrough(),
  offers: z.array(offerSchema).min(1).max(30),
  tracking: z.record(z.union([z.string().max(2000), z.null()])).nullish(),
}).passthrough();

/** Accept the documented flat payload and the previously supported data envelope. */
export const mundpayWebhookSchema = z.union([
  saleSchema.refine((body) => Boolean(body.status || body.event_type)),
  z.object({ event: z.string().max(60).nullish(), data: saleSchema })
    .refine((body) => Boolean(body.data.status || body.data.event_type || body.event)),
]);

/**
 * Mundpay offers no signing secret. When MUNDPAY_WEBHOOK_SECRET is configured the
 * ?token= URL credential is enforced; otherwise the strictly validated payload is accepted.
 */
export async function authorizeMundpayWebhook(
  request: Request,
  secret: string | undefined,
): Promise<Response | null> {
  if (!secret) return null;
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