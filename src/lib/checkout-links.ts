/**
 * Mundpay checkout links — single source of truth for every buy button.
 * Fill each value with the link copied from the Mundpay dashboard.
 * Empty values fall back to the support page so no button ever breaks.
 */
export const MUNDPAY_LINKS: Record<string, string> = {
  "27": "",
  "47": "",
  "77": "",
  "100": "",
  activation: "",
  activationDiscount: "",
  protection: "",
};

export const FALLBACK_CHECKOUT = "/support";

export function checkoutLink(key: string): string {
  return MUNDPAY_LINKS[key] || FALLBACK_CHECKOUT;
}
