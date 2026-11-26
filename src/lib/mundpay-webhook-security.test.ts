import { describe, expect, it } from "vitest";
import { authorizeMundpayWebhook, mundpayWebhookSchema } from "./mundpay-webhook-security";

const testSecret = "test-only-mundpay-shared-token-00000001";
const endpoint = "https://example.test/api/public/mundpay-webhook";
const paidSale = {
  id: "01a20f28-5c62-7096-b0dc-ad271dfb3b93",
  amount: "2700", currency: "USD", status: "paid",
  customer: { email: "buyer@example.test", name: "Buyer" },
  offers: [{ id: "01a20f28-5c62-7096-b0dc-ad271dfb3b93", price: 2700, type: "principal" }],
  tracking: { utm_campaign: "validation", utm_content: "creative-123", src: null },
};

describe("Mundpay webhook security", () => {
  it("accepts the shared token without a Mundpay API key", async () => {
    const request = new Request(`${endpoint}?token=${testSecret}`, { method: "POST" });
    expect(await authorizeMundpayWebhook(request, testSecret)).toBeNull();
  });
  it("rejects missing credentials before processing a purchase", async () => {
    expect((await authorizeMundpayWebhook(new Request(endpoint), testSecret))?.status).toBe(401);
  });
  it("rejects a forged token", async () => {
    expect((await authorizeMundpayWebhook(new Request(`${endpoint}?token=forged`), testSecret))?.status).toBe(401);
  });
  it("does not enable unauthenticated purchases when no secret is saved", async () => {
    expect(await authorizeMundpayWebhook(new Request(endpoint), undefined)).toBeNull();
  });
  it("accepts the documented paid payload and preserves campaign attribution", () => {
    const result = mundpayWebhookSchema.safeParse(paidSale);
    expect(result.success).toBe(true);
    if (!result.success || !("tracking" in result.data)) throw new Error("Expected flat sale");
    expect(result.data.tracking?.["utm_content"]).toBe("creative-123");
  });
  it("accepts the supported envelope", () => {
    expect(mundpayWebhookSchema.safeParse({ data: paidSale }).success).toBe(true);
  });
  it("rejects a purchase without a valid customer email", () => {
    expect(mundpayWebhookSchema.safeParse({ ...paidSale, customer: { email: "invalid" } }).success).toBe(false);
  });
  it("rejects a negative amount", () => {
    expect(mundpayWebhookSchema.safeParse({ ...paidSale, amount: -2700 }).success).toBe(false);
  });
});