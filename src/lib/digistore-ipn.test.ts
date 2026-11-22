import { describe, it, expect } from "vitest";
import { DS24_PRODUCTS, parseDs24Ipn } from "./digistore-ipn";

describe("Digistore24 IPN", () => {
  it("maps each front-end product to its prayer count", () => {
    expect(DS24_PRODUCTS["769703"]).toEqual({ kind: "tier", count: 20 });
    expect(DS24_PRODUCTS["769704"]).toEqual({ kind: "tier", count: 40 });
    expect(DS24_PRODUCTS["769705"]).toEqual({ kind: "tier", count: 60 });
    expect(DS24_PRODUCTS["769706"]).toEqual({ kind: "tier", count: 80 });
  });
  it("maps upsells", () => {
    expect(DS24_PRODUCTS["769707"]).toEqual({ kind: "upsell", key: "activation" });
    expect(DS24_PRODUCTS["769709"]).toEqual({ kind: "upsell", key: "protection" });
  });
  it("parses the payment notification", () => {
    const p = parseDs24Ipn("event=on_payment&order_id=ABC123&product_id=769706&email=Jo%40X.com&address_first_name=Jo&address_last_name=Doe&amount=100.00&currency=USD&utm_content=ad1");
    expect(p).toMatchObject({ event: "on_payment", orderId: "ABC123", productId: "769706", email: "jo@x.com", name: "Jo Doe", amount: 100, currency: "USD" });
    expect(p.raw["utm_content"]).toBe("ad1");
  });
});
