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
  it("sends values in USD", () => {
    const o = buildUtmifyOrder({ orderId: "p", email: "a@b.com", name: "A", amount: 27, prayerCount: 20, approvedAt: new Date(), tracking: {} });
    expect(o.commission.currency).toBe("USD");
    expect(o.commission.totalPriceInCents).toBe(2700);
  });
  it("reads Whop acquisition_data and cleans Meta suffixes", () => {
    const t = extractUtms({ acquisition_data: { utm_source: "FBjLj6af99", utm_content: "ANUNCIO 1|1201::IwZXh0bg::" } });
    const o = buildUtmifyOrder({ orderId: "p", email: "a@b.com", name: "A", amount: 27, prayerCount: 20, approvedAt: new Date(), tracking: t });
    expect(o.trackingParameters.utm_source).toBe("FB");
    expect(o.trackingParameters.utm_content).toBe("ANUNCIO 1|1201");
  });
});
