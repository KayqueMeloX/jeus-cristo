import { describe, it, expect } from "vitest";
import { parseMundpaySale, productForOffer } from "./mundpay";

describe("mundpay", () => {
  it("converts cents and reads customer", () => {
    const s = parseMundpaySale({ id: "a", amount: "2700", currency: "usd", status: "paid", customer: { email: "X@Y.com", name: "Ann" }, offers: [], tracking: { utm_source: "FB", src: null } });
    expect(s.amount).toBe(27);
    expect(s.email).toBe("x@y.com");
    expect(s.tracking).toEqual({ utm_source: "FB" });
  });
  it("maps $27/$47/$77/$100 to 20/40/60/80 prayers", () => {
    expect(productForOffer({ price: 2700, type: "principal" })).toEqual({ kind: "tier", count: 20 });
    expect(productForOffer({ price: 4700, type: "principal" })).toEqual({ kind: "tier", count: 40 });
    expect(productForOffer({ price: 7700, type: "principal" })).toEqual({ kind: "tier", count: 60 });
    expect(productForOffer({ price: 10000, type: "principal" })).toEqual({ kind: "tier", count: 80 });
  });
  it("maps upsells by role", () => {
    expect(productForOffer({ price: 9700, type: "up_sell" })).toEqual({ kind: "upsell", key: "activation" });
    expect(productForOffer({ price: 4700, type: "down_sell" })).toEqual({ kind: "upsell", key: "activationDiscount" });
  });
});
