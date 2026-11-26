import { describe, expect, it } from "vitest";
import { mundpayWebhookSchema } from "./mundpay-webhook-security";

describe("Mundpay panel test postback", () => {
  it("accepts order ids with the test- prefix", () => {
    const body = {
      id: "test-4bda7f74-c111-4b60-90d9-3a6327a2a528",
      status: "paid",
      amount: "44200",
      currency: "BRL",
      customer: { email: "teste@mundpay.com", name: "Brando Matos" },
      offers: [{ id: "693b2088", name: "Seed of Faith — 60 Sacred Prayers", price: 7700, type: "principal" }],
      tracking: { utm_source: "test", utm_content: null },
    };
    expect(mundpayWebhookSchema.safeParse(body).success).toBe(true);
  });

  it("still rejects an empty order id", () => {
    const body = { id: "", status: "paid", amount: 100, customer: { email: "a@b.com" }, offers: [{ price: 100 }] };
    expect(mundpayWebhookSchema.safeParse(body).success).toBe(false);
  });
});
