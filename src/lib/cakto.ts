/** Cakto webhook parsing and product mapping (offer short IDs from the Cakto account). */
import type { UpsellKey } from "@/lib/whop-webhook";

export type CaktoProduct =
  | { kind: "tier"; count: 20 | 40 | 60 | 80 }
  | { kind: "upsell"; key: UpsellKey };

/** Cakto offer IDs and product IDs mapped to what we deliver. */
const BY_ID: Record<string, CaktoProduct> = {
  "6dzpif7": { kind: "tier", count: 20 }, "0c06bf2c-d4fa-49fb-9409-eebedb1acff2": { kind: "tier", count: 20 },
  modpahe: { kind: "tier", count: 40 }, "edbc0fcf-ba93-47e6-91f5-c91921988956": { kind: "tier", count: 40 },
  "3d4v2w7": { kind: "tier", count: 60 }, "95770e33-7e4f-48bd-904e-aa8f2efae32b": { kind: "tier", count: 60 },
  "3bsodw8": { kind: "tier", count: 80 }, "96156b48-2e2f-4b59-86a7-7a01337db43b": { kind: "tier", count: 80 },
  "34vceic": { kind: "upsell", key: "activation" }, "2250deb1-c695-4bc0-9edd-8d8563c9adee": { kind: "upsell", key: "activation" },
  h6v6rxr: { kind: "upsell", key: "activationDiscount" }, "c130ece4-312a-45ad-9955-ad3756ccca10": { kind: "upsell", key: "activationDiscount" },
  "5sisn3q": { kind: "upsell", key: "protection" }, "8749744d-7293-4589-8996-7f3d30be022a": { kind: "upsell", key: "protection" },
};

const str = (v: unknown): string => (typeof v === "string" ? v : typeof v === "number" ? String(v) : "");
const obj = (v: unknown): Record<string, unknown> => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});

export interface CaktoSale {
  event: string; secret: string; orderId: string; email: string; name: string;
  amount: number; status: string; product: CaktoProduct | undefined;
  tracking: Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term", string | null>;
}

export function productFor(data: Record<string, unknown>): CaktoProduct | undefined {
  const offer = obj(data["offer"]); const product = obj(data["product"]);
  for (const id of [str(offer["id"]), str(product["short_id"]), str(product["id"]), str(data["offer_id"]), str(data["product_id"])]) {
    if (id && BY_ID[id]) return BY_ID[id];
  }
  return undefined;
}

export function parseCaktoWebhook(body: unknown): CaktoSale {
  const b = obj(body); const d = obj(b["data"]); const c = obj(d["customer"]);
  const t = (k: string) => str(d[k]) || null;
  return {
    event: str(b["event"]), secret: str(b["secret"]),
    orderId: str(d["id"]) || str(d["refId"]),
    email: str(c["email"]).trim().toLowerCase(), name: str(c["name"]),
    amount: Number(d["amount"] ?? d["baseAmount"] ?? 0) || 0, status: str(d["status"]),
    product: productFor(d),
    tracking: { utm_source: t("utm_source"), utm_medium: t("utm_medium"), utm_campaign: t("utm_campaign"), utm_content: t("utm_content"), utm_term: t("utm_term") },
  };
}

/** Constant-time string compare. */
export function safeEqual(a: string, b: string): boolean {
  if (!a || a.length !== b.length) return false;
  let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
