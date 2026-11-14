import { describe, it, expect } from "vitest";
import { buildUtmifyOrder, extractUtms } from "./utmify-order";

describe("utmify order", () => {
  it("$100 sale becomes 10000 cents, paid, with UTMs", () => {
    const o = buildUtmifyOrder({ orderId: "pay_1", email: "a@b.com", name: "A", amount: 100, prayerCount: 80,
      approvedAt: new Date("2026-11-14T22:00:00Z"), tracking: { utm_campaign: "ESCALA", utm_content: "ad1" } });
    expect(o.commission.totalPriceInCents).toBe(10000);
    expect(o.status).toBe("paid");
    expect(o.trackingParameters.utm_campaign).toBe("ESCALA");
    expect(o.trackingParameters.utm_source).toBeNull();
  });
  it("reads UTMs from Whop metadata", () => {
    expect(extractUtms({ metadata: { utm_source: "FB" } }).utm_source).toBe("FB");
  });
});
