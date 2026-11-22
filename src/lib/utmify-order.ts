/* eslint-disable @typescript-eslint/no-explicit-any */
/** Builds and sends an approved order to UTMify's external orders API (values in USD). */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type UtmKey = (typeof UTM_KEYS)[number];

export interface UtmifyOrderInput {
  orderId: string;
  email: string;
  name: string;
  amount: number; // in US dollars
  prayerCount: number;
  /** Overrides the product name (used for upsells). */
  productName?: string;
  approvedAt: Date;
  country?: string | null;
  tracking: Partial<Record<UtmKey, string | null | undefined>>;
}

function fmt(d: Date): string {
  return d.toISOString().replace("T", " ").slice(0, 19);
}

/** Removes Meta click-id suffixes ("::IwZ...") and source junk so UTMify can match the ad. */
export function cleanUtm(key: UtmKey, v: string | null | undefined): string | null {
  if (!v) return null;
  let s = String(v).split("::")[0]!.trim();
  if (key === "utm_source" && /^FB/i.test(s)) s = "FB";
  return s || null;
}

export function buildUtmifyOrder(i: UtmifyOrderInput) {
  const cents = Math.round(i.amount * 100);
  const trackingParameters = {
    src: null as string | null,
    sck: null as string | null,
    ...(Object.fromEntries(UTM_KEYS.map((k) => [k, cleanUtm(k, i.tracking[k])])) as Record<UtmKey, string | null>),
  };
  return {
    orderId: i.orderId,
    platform: "Whop",
    paymentMethod: "credit_card",
    status: "paid",
    createdAt: fmt(i.approvedAt),
    approvedDate: fmt(i.approvedAt),
    refundedAt: null,
    customer: { name: i.name, email: i.email, phone: null, document: null, ...(i.country ? { country: i.country } : {}) },
    products: [{
      id: `seed_${Math.round(i.amount)}`,
      name: i.productName ?? `Seed of Faith — ${i.prayerCount} Sacred Prayers`,
      planId: `seed_${Math.round(i.amount)}`,
      planName: `$${Math.round(i.amount)}`,
      quantity: 1,
      priceInCents: cents,
    }],
    trackingParameters,
    commission: { totalPriceInCents: cents, gatewayFeeInCents: 0, userCommissionInCents: cents, currency: "USD" },
    isTest: false,
  };
}

/** Pulls utm_* from the Whop payload (acquisition_data first, then metadata). */
export function extractUtms(data: unknown): Partial<Record<UtmKey, string>> {
  const d = (data ?? {}) as any;
  const sources = [d.acquisition_data, d.membership?.acquisition_data, d.metadata, d.membership_metadata,
    d.checkout_configuration?.metadata, d.membership?.metadata, d.tracking, d];
  const out: Partial<Record<UtmKey, string>> = {};
  for (const k of UTM_KEYS) {
    for (const s of sources) {
      const v = s && typeof s === "object" ? s[k] : undefined;
      if (typeof v === "string" && v) { out[k] = v; break; }
    }
  }
  return out;
}

/** True when the tracking has enough to tie the sale to a campaign/ad. */
export function hasAdAttribution(t: Partial<Record<UtmKey, string>>): boolean {
  return Boolean(t.utm_campaign || t.utm_content);
}

/**
 * Whop webhooks omit acquisition_data, so we read it from Whop's payment API (v2, then v5).
 * Returns {} when nothing is found or the API fails — the sale is still sent.
 */
export async function fetchWhopUtms(paymentId: string | undefined, apiKey: string | undefined,
  fetchImpl: typeof fetch = fetch): Promise<Partial<Record<UtmKey, string>>> {
  if (!paymentId || !apiKey) return {};
  for (const v of ["v2/payments", "v5/company/payments"]) {
    try {
      const r = await fetchImpl(`https://api.whop.com/api/${v}/${encodeURIComponent(paymentId)}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!r.ok) continue;
      const t = extractUtms(await r.json());
      if (hasAdAttribution(t)) return t;
    } catch { /* try next */ }
  }
  return {};
}

export async function sendUtmifyOrder(token: string, order: ReturnType<typeof buildUtmifyOrder>) {
  const res = await fetch("https://api.utmify.com.br/api-credentials/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-token": token, "User-Agent": "Mozilla/5.0 (compatible; FaithSanctuary/1.0)" },
    body: JSON.stringify(order),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}
