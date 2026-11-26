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

describe("Mundpay live postbacks with null fields", () => {
  const live = {
    id: "01a21917-8712-73dc-af0f-ed41e90f0dda",
    event_type: "order.paid",
    amount: 2700,
    currency: "USD",
    customer: { email: "buyer@example.com", name: null, phone: null },
    offers: [{ id: null, name: "Seed of Faith — 20 Sacred Prayers", price: 2700, type: null, sku: null }],
    tracking: null,
  };

  it("accepts null secondary fields and event_type instead of status", () => {
    expect(mundpayWebhookSchema.safeParse(live).success).toBe(true);
  });

  it("reads the paid status from event_type", async () => {
    const { parseMundpaySale } = await import("./mundpay");
    const sale = parseMundpaySale(live);
    expect(sale.status).toBe("paid");
    expect(sale.name).toBe("Blessed Friend");
  });

  it("still rejects a sale without any status", () => {
    const { event_type: _omit, ...noStatus } = live;
    expect(mundpayWebhookSchema.safeParse(noStatus).success).toBe(false);
  });
});
