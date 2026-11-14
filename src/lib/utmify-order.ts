/* eslint-disable @typescript-eslint/no-explicit-any */
/** Builds and sends an approved order to UTMify's external orders API. */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type UtmKey = (typeof UTM_KEYS)[number];

export interface UtmifyOrderInput {
  orderId: string;
  email: string;
  name: string;
  amount: number; // in dollars
  prayerCount: number;
  approvedAt: Date;
  tracking: Partial<Record<UtmKey, string | null | undefined>>;
}

function fmt(d: Date): string {
  return d.toISOString().replace("T", " ").slice(0, 19);
}

export function buildUtmifyOrder(i: UtmifyOrderInput) {
  const cents = Math.round(i.amount * 100);
  const trackingParameters = Object.fromEntries(
    UTM_KEYS.map((k) => [k, i.tracking[k] ? String(i.tracking[k]) : null]),
  ) as Record<UtmKey, string | null>;
  return {
    orderId: i.orderId,
    platform: "Whop",
    paymentMethod: "credit_card",
    status: "paid",
    createdAt: fmt(i.approvedAt),
    approvedDate: fmt(i.approvedAt),
    refundedAt: null,
    customer: { name: i.name, email: i.email, phone: null, document: null },
    products: [{
      id: `seed_${Math.round(i.amount)}`,
      name: `Seed of Faith — ${i.prayerCount} Sacred Prayers`,
      planId: `seed_${Math.round(i.amount)}`,
      planName: `$${Math.round(i.amount)}`,
      quantity: 1,
      priceInCents: cents,
    }],
    trackingParameters,
    commission: { totalPriceInCents: cents, gatewayFeeInCents: 0, userCommissionInCents: cents },
  };
}

/** Pulls utm_* from any metadata-like object in the Whop payload. */
export function extractUtms(data: unknown): Partial<Record<UtmKey, string>> {
  const d = (data ?? {}) as any;
  const sources = [d.metadata, d.checkout_configuration?.metadata, d.membership?.metadata, d.tracking, d];
  const out: Partial<Record<UtmKey, string>> = {};
  for (const k of UTM_KEYS) {
    for (const s of sources) {
      const v = s && typeof s === "object" ? s[k] : undefined;
      if (typeof v === "string" && v) { out[k] = v; break; }
    }
  }
  return out;
}

export async function sendUtmifyOrder(token: string, order: ReturnType<typeof buildUtmifyOrder>) {
  const res = await fetch("https://api.utmify.com.br/api-credentials/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-token": token },
    body: JSON.stringify(order),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}
