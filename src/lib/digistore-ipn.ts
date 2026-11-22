import type { UpsellKey } from "@/lib/whop-webhook";

/** Digistore24 product ID -> what the buyer gets. */
export type Ds24Product = { kind: "tier"; count: 20 | 40 | 60 | 80 } | { kind: "upsell"; key: UpsellKey };

export const DS24_PRODUCTS: Record<string, Ds24Product> = {
  "769703": { kind: "tier", count: 20 },
  "769704": { kind: "tier", count: 40 },
  "769705": { kind: "tier", count: 60 },
  "769706": { kind: "tier", count: 80 },
  "769707": { kind: "upsell", key: "activation" },
  "769708": { kind: "upsell", key: "activationDiscount" },
  "769709": { kind: "upsell", key: "protection" },
};

export interface Ds24Ipn {
  event: string;
  orderId: string;
  productId: string;
  email: string;
  name: string;
  amount: number;
  currency: string;
  country: string | null;
  raw: Record<string, string>;
}

/** Parses the form-encoded IPN body Digistore24 sends. */
export function parseDs24Ipn(body: string): Ds24Ipn {
  const raw: Record<string, string> = {};
  for (const [k, v] of new URLSearchParams(body)) raw[k] = v;
  const name = [raw["address_first_name"], raw["address_last_name"]].filter(Boolean).join(" ").trim();
  const amount = Number(raw["amount"] ?? raw["transaction_amount"] ?? "0");
  return {
    event: raw["event"] ?? "",
    orderId: raw["order_id"] ?? "",
    productId: raw["product_id"] ?? "",
    email: (raw["email"] ?? raw["address_email"] ?? "").trim().toLowerCase(),
    name: name || "Blessed Friend",
    amount: Number.isFinite(amount) ? amount : 0,
    currency: (raw["currency"] ?? "USD").toUpperCase(),
    country: raw["address_country"] || null,
    raw,
  };
}
