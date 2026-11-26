import type { UpsellKey } from "@/lib/whop-webhook";

/** What the buyer receives for a Mundpay offer. */
export type MundpayProduct = { kind: "tier"; count: 20 | 40 | 60 | 80 } | { kind: "upsell"; key: UpsellKey };

export interface MundpayOffer { id?: string; name?: string; price?: number | string; type?: string; sku?: string }
export interface MundpaySale {
  orderId: string; status: string; email: string; name: string; phone: string;
  amount: number; currency: string; offers: MundpayOffer[]; tracking: Record<string, string>;
}

/** Normalises the Mundpay sales webhook JSON (amounts arrive in cents). */
export function parseMundpaySale(body: unknown): MundpaySale {
  const b = (body ?? {}) as Record<string, unknown>;
  const data = (b["data"] && typeof b["data"] === "object" ? b["data"] : b) as Record<string, unknown>;
  const customer = (data["customer"] || {}) as Record<string, unknown>;
  const trackingRaw = (data["tracking"] || {}) as Record<string, unknown>;
  const tracking: Record<string, string> = {};
  for (const [k, v] of Object.entries(trackingRaw)) if (typeof v === "string" && v) tracking[k] = v;
  const cents = Number(data["amount"] ?? 0);
  return {
    orderId: String(data["id"] ?? ""),
    status: String(data["status"] || data["event_type"] || b["event"] || "").replace(/^order\./, ""),
    email: String(customer["email"] ?? "").trim().toLowerCase(),
    name: String(customer["name"] ?? "").trim() || "Blessed Friend",
    phone: String(customer["phone"] ?? ""),
    amount: Number.isFinite(cents) ? cents / 100 : 0,
    currency: String(data["currency"] ?? "USD").toUpperCase(),
    offers: Array.isArray(data["offers"]) ? (data["offers"] as MundpayOffer[]) : [],
    tracking,
  };
}

/** Identifies the product by offer role + price (USD), independent of offer IDs. */
export function productForOffer(offer: MundpayOffer): MundpayProduct | null {
  const usd = Math.round(Number(offer.price ?? 0) / 100);
  const upsell = offer.type === "up_sell" || offer.type === "down_sell";
  const name = (offer.name ?? "").toLowerCase();
  if (upsell || name.includes("activation") || name.includes("protection")) {
    if (usd === 97) return { kind: "upsell", key: "activation" };
    if (name.includes("protection")) return { kind: "upsell", key: "protection" };
    if (usd === 47) return offer.type === "down_sell" ? { kind: "upsell", key: "activationDiscount" } : { kind: "upsell", key: "protection" };
  }
  const tiers: Record<number, 20 | 40 | 60 | 80> = { 27: 20, 47: 40, 77: 60, 100: 80 };
  const count = tiers[usd];
  return count ? { kind: "tier", count } : null;
}
