/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Whop webhook helpers (Standard Webhooks spec).
 * Signed content = `${webhook-id}.${webhook-timestamp}.${body}`, HMAC-SHA256,
 * header `webhook-signature` = space-separated "v1,<base64>" entries.
 */
function b64(bytes: ArrayBuffer): string {
  let s = "";
  const u = new Uint8Array(bytes);
  for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]!);
  return btoa(s);
}

function candidateKeys(secret: string): Uint8Array<ArrayBuffer>[] {
  const enc = new TextEncoder();
  const keys: Uint8Array<ArrayBuffer>[] = [enc.encode(secret)];
  const raw = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  try {
    const bin = atob(raw);
    keys.push(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
  } catch {
    /* not base64 */
  }
  return keys;
}

export async function verifyWhopSignature(
  body: string,
  headers: { id: string | null; timestamp: string | null; signature: string | null },
  secret: string,
): Promise<boolean> {
  const { id, timestamp, signature } = headers;
  if (!id || !timestamp || !signature) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 600) return false;
  const provided = signature.split(" ").map((p) => p.split(",")[1]).filter(Boolean);
  const content = new TextEncoder().encode(`${id}.${timestamp}.${body}`);
  for (const key of candidateKeys(secret)) {
    const k = await crypto.subtle.importKey("raw", key as BufferSource, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const expected = b64(await crypto.subtle.sign("HMAC", k, content));
    if (provided.some((p) => p === expected)) return true;
  }
  return false;
}

export interface WhopPayment {
  id: string | undefined;
  email: string | undefined;
  name: string | undefined;
  amount: number;
  currency: string;
  /** Prayer count of the plan bought, from the Whop checkout/plan IDs (independent of coupons/currency). */
  tier: 20 | 40 | 60 | 80 | undefined;
  /** Upsell product bought (post-purchase offers), when this payment is not a front-end prayer tier. */
  upsell: UpsellKey | undefined;
}

export type UpsellKey = "activation" | "activationDiscount" | "journey" | "protection";
/** Whop checkout + plan IDs of the post-purchase upsells. Checked before price fallback so a $47 upsell never ships the 40-prayer PDF. */
export const UPSELL_BY_ID: Record<string, UpsellKey> = {
  ch_yjwshMx2SirMfDS: "activation", plan_xOAgZjifkAAWd: "activation",
  ch_MGxxrvLHMtSOu0p: "activationDiscount", plan_DI8gFJ6XmFmu1: "activationDiscount",
  ch_zwV7RtOonIHJNYU: "journey", plan_iTpoKl5SkZ8ps: "journey",
  ch_z3uXxmMYAFuaeV3: "protection", plan_F8gGYIH1LDTbM: "protection",
};
export const UPSELL_NAMES: Record<UpsellKey, string> = {
  activation: "90-Day Faith Activation Plan",
  activationDiscount: "90-Day Faith Activation Plan",
  journey: "Faith Daily Sanctuary App",
  protection: "The 7 Holy Seals — Family Prayer Study",
};
/** PDF deliverable (in /media/ebooks) emailed for each upsell. */
export const UPSELL_PDFS: Record<UpsellKey, string> = {
  activation: "90-Day-Faith-Activation-Plan.pdf",
  activationDiscount: "90-Day-Faith-Activation-Plan.pdf",
  journey: "Faith-Daily-Sanctuary-Devotional.pdf",
  protection: "The-7-Holy-Seals-Family-Prayer-Study.pdf",
};

function idsOf(d: any): unknown[] {
  return [d.checkout_configuration_id, d.variant_id, d.plan_id, d.plan?.id, d.variant?.id, d.checkout_configuration?.id,
    ...(Array.isArray(d.line_items) ? d.line_items.map((l: any) => l?.variant_id) : [])];
}

export function upsellForWhopPayment(d: any): UpsellKey | undefined {
  for (const id of idsOf(d)) if (typeof id === "string" && UPSELL_BY_ID[id]) return UPSELL_BY_ID[id];
  return undefined;
}

/** Whop checkout config + plan IDs for each offer. */
const TIER_BY_ID: Record<string, 20 | 40 | 60 | 80> = {
  ch_7TaY3pR1yLmblJM: 20, plan_OtTwB9YlhFKef: 20,
  ch_auUghEk76RLYamk: 40, plan_vOp19uSJJHI79: 40,
  ch_5ndgWE0bS0XQZqr: 60, plan_yTgaDFwhDlkvv: 60,
  ch_mVSDwAjxTtq7Hhl: 80, plan_q1cIquPUPcfcA: 80,
  ch_BIYDSurST8auzgU: 20,
  ch_oBUGokyOMnDkBDp: 40,
  ch_NpwHFMT88pWtlBu: 60,
  ch_I8Zyqs9rlQEl00b: 80,
  ch_Syja7DUXGhmJUnM: 20,
  ch_vqS1bj7iXF2KYmr: 40,
  ch_4epwqogPOb1XMND: 60,
  ch_izAZjRpNTw93aTj: 80,
};
const TIER_BY_PRICE: Record<number, 20 | 40 | 60 | 80> = { 27: 20, 47: 40, 77: 60, 100: 80 };

function num(v: any): number | undefined {
  if (v && typeof v === "object" && "amount" in v) v = v.amount;
  const n = Number(v);
  return v !== undefined && v !== null && Number.isFinite(n) ? n : undefined;
}

export function tierForWhopPayment(d: any): 20 | 40 | 60 | 80 | undefined {
  if (upsellForWhopPayment(d)) return undefined;
  const ids = idsOf(d);
  for (const id of ids) if (typeof id === "string" && TIER_BY_ID[id]) return TIER_BY_ID[id];
  const title = String(d.product?.title ?? d.line_items?.[0]?.product_title ?? "");
  const m = title.match(/\b(20|40|60|80) Sacred/);
  if (m) return Number(m[1]) as 20 | 40 | 60 | 80;
  const usd = num(d.subtotal);
  return usd !== undefined ? TIER_BY_PRICE[Math.round(usd)] : undefined;
}

/** Reads both current (`type`, `data.total`, `data.user.email`) and legacy (`action`, `final_amount`) shapes. */
export function parseWhopPayment(payload: unknown): { event: string; payment: WhopPayment } {
  const p = (payload ?? {}) as any;
  const event = String(p.type ?? p.action ?? "");
  const d = (p.data ?? {}) as any;
  const rawAmount = d.usd_total ?? d.total ?? d.subtotal ?? d.final_amount ?? d.amount ?? 0;
  let amount = num(rawAmount) ?? 0;
  if (d.final_amount !== undefined && d.total === undefined && amount > 500) amount = amount / 100;
  const email = d.customer_email ?? d.user?.email ?? d.user_email ?? d.email ?? d.member?.email ?? d.billing_address?.email;
  const name = d.user?.name ?? d.user?.username ?? d.billing_address?.name;
  return {
    event,
    payment: {
      id: d.id,
      email: typeof email === "string" ? email : undefined,
      name: typeof name === "string" ? name : undefined,
      amount,
      currency: String(d.currency ?? "usd").toUpperCase(),
      tier: tierForWhopPayment(d),
      upsell: upsellForWhopPayment(d),
    },
  };
}
