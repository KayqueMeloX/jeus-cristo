/** Post-purchase upsell funnel: front offer → activation → journey → protection → member app. */
export type UpsellKey = "activation" | "activationDiscount" | "journey" | "protection";

const PURCHASE_KEY = "fs_purchase_query";
const PURCHASE_PARAMS = ["paid", "amt", "tier", "email"] as const;

/** Remembers the front-purchase params (paid/amt/tier) so the member app unlocks at the end of the funnel. */
export function rememberPurchase(search: string): void {
  try {
    const p = new URLSearchParams(search);
    if (p.get("paid") !== "true") return;
    const keep = new URLSearchParams();
    for (const k of PURCHASE_PARAMS) { const v = p.get(k); if (v) keep.set(k, v); }
    localStorage.setItem(PURCHASE_KEY, keep.toString());
  } catch { /* storage unavailable */ }
}

/** Member app URL carrying the remembered purchase so access is granted on this device. */
export function memberAppUrl(): string {
  let q = "paid=true";
  try { q = localStorage.getItem(PURCHASE_KEY) || q; } catch { /* ignore */ }
  return `/faith-app?${q}`;
}

/** Checkout URL for an upsell, forwarding UTMs but not purchase params. */
export function upsellCheckoutUrl(plan: UpsellKey, search: string): string {
  const p = new URLSearchParams(search);
  const out = new URLSearchParams({ plan });
  p.forEach((v, k) => { if (!(PURCHASE_PARAMS as readonly string[]).includes(k) && k !== "upsell_paid") out.set(k, v); });
  return `/checkout?${out.toString()}`;
}
