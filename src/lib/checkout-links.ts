/**
 * Mundpay checkout links — single source of truth for every buy button.
 * Fill each value with the link copied from the Mundpay dashboard.
 * Empty values fall back to the support page so no button ever breaks.
 */
export const MUNDPAY_LINKS: Record<string, string> = {
  "27": "https://checkout.mundpay.com/01a20f28-5c62-7096-b0dc-ad271dfb3b93",
  "47": "https://checkout.mundpay.com/01a213d2-be00-736c-aab1-b861e17e4ea9",
  "77": "https://checkout.mundpay.com/01a213da-ea60-7399-a43b-6999815c8937",
  "100": "https://checkout.mundpay.com/01a213df-e59f-71ec-b914-859eeb17cb34",
  activation: "https://checkout.mundpay.com/01a213ef-53cf-717b-9f77-c552791d6456",
  activationDiscount: "https://checkout.mundpay.com/01a213fa-643b-73f7-a5f4-63c80913b32f",
  protection: "https://checkout.mundpay.com/01a21917-8712-73dc-af0f-ed41e90f0dda",
};

export const FALLBACK_CHECKOUT = "/support";

export function checkoutLink(key: string): string {
  return MUNDPAY_LINKS[key] || FALLBACK_CHECKOUT;
}
